import { ChangeEvent, useMemo, useState } from 'react'
import './App.css'

type Category = 'Pessoal' | 'Família' | 'Outros'

type Transaction = {
  id: string
  date: string
  description: string
  amount: number
  category: Category
}

type PdfTextItem = { str?: string }

type PdfPage = {
  getTextContent: () => Promise<{ items: PdfTextItem[] }>
}

type PdfJs = {
  GlobalWorkerOptions: { workerSrc: string }
  getDocument: (source: { data: Uint8Array }) => {
    promise: Promise<{ numPages: number; getPage: (pageNumber: number) => Promise<PdfPage> }>
  }
}

const CATEGORY_KEYWORDS: Record<Exclude<Category, 'Outros'>, string[]> = {
  Pessoal: ['ifood', 'uber', 'netflix', 'spotify', 'bar', 'academia', 'roupa', 'farmacia'],
  Família: ['mercado', 'supermercado', 'escola', 'pediatra', 'padaria', 'energia', 'agua', 'aluguel'],
}

const CATEGORIES: Category[] = ['Pessoal', 'Família', 'Outros']

const seedExample = `03/01 IFOOD *PEDIDO 54,90
04/01 MERCADO CENTRAL 238,77
06/01 NETFLIX.COM 39,90
08/01 ESCOLA FILHO 500,00
09/01 UBER *TRIP 26,45
11/01 FARMACIA SAUDE 74,15`

function normalizeCurrency(value: string) {
  const normalized = value.replace(/\./g, '').replace(',', '.')
  return Number.parseFloat(normalized)
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
}

function autoCategorize(description: string): Category {
  const normalized = description.toLowerCase()

  if (CATEGORY_KEYWORDS.Pessoal.some((item) => normalized.includes(item))) {
    return 'Pessoal'
  }

  if (CATEGORY_KEYWORDS.Família.some((item) => normalized.includes(item))) {
    return 'Família'
  }

  return 'Outros'
}

function parseStatement(raw: string): Transaction[] {
  const lines = raw
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)

  const result: Transaction[] = []

  lines.forEach((line, index) => {
    const match = line.match(/^(\d{2}\/\d{2})\s+(.+?)\s+(-?\d{1,3}(?:\.\d{3})*,\d{2})$/)

    if (!match) {
      return
    }

    const [, date, description, amount] = match

    result.push({
      id: `${date}-${index}`,
      date,
      description,
      amount: normalizeCurrency(amount),
      category: autoCategorize(description),
    })
  })

  return result
}

async function extractTextFromPdf(file: File) {
  const pdfModuleUrl = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/build/pdf.min.mjs'
  const pdfjs = (await import(/* @vite-ignore */ pdfModuleUrl)) as unknown as PdfJs
  pdfjs.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/build/pdf.worker.min.mjs'

  const buffer = await file.arrayBuffer()
  const pdf = await pdfjs.getDocument({ data: new Uint8Array(buffer) }).promise
  const pages: string[] = []

  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
    const page = await pdf.getPage(pageNumber)
    const textContent = await page.getTextContent()
    const pageText = textContent.items.map((item) => item.str ?? '').join(' ')
    pages.push(pageText)
  }

  return pages.join('\n')
}

function App() {
  const [statementText, setStatementText] = useState(seedExample)
  const [transactions, setTransactions] = useState<Transaction[]>(parseStatement(seedExample))
  const [importStatus, setImportStatus] = useState('')

  const totals = useMemo(() => {
    return transactions.reduce(
      (acc, item) => {
        acc[item.category] += item.amount
        acc.total += item.amount
        return acc
      },
      { Pessoal: 0, Família: 0, Outros: 0, total: 0 },
    )
  }, [transactions])

  const percentages = useMemo(() => {
    if (!totals.total) {
      return { Pessoal: 0, Família: 0, Outros: 0 }
    }

    return {
      Pessoal: (totals.Pessoal / totals.total) * 100,
      Família: (totals.Família / totals.total) * 100,
      Outros: (totals.Outros / totals.total) * 100,
    }
  }, [totals])

  const handleParse = () => {
    setTransactions(parseStatement(statementText))
  }

  const handleCategoryChange = (id: string, category: Category) => {
    setTransactions((current) => current.map((item) => (item.id === id ? { ...item, category } : item)))
  }

  const handleImportPdf = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setImportStatus('Lendo PDF...')

    try {
      const text = await extractTextFromPdf(file)
      setStatementText(text)
      const parsed = parseStatement(text)
      setTransactions(parsed)
      setImportStatus(`PDF importado com sucesso. ${parsed.length} transações reconhecidas.`)
    } catch {
      setImportStatus('Não foi possível extrair o texto automaticamente do PDF. Tente outro arquivo ou cole o texto manualmente.')
    }
  }

  return (
    <main className="dashboard">
      <header>
        <h1>Dashboard de Faturas Santander</h1>
        <p>
          Faça upload do <code>.pdf</code> da fatura e analise os gastos em Pessoal, Família e Outros. Você também pode
          colar o texto manualmente no formato <code>dd/mm descrição valor</code>.
        </p>
      </header>

      <section className="controls">
        <label htmlFor="statementInput">Texto da fatura</label>
        <textarea
          id="statementInput"
          value={statementText}
          onChange={(event) => setStatementText(event.target.value)}
          placeholder="Exemplo: 10/01 MERCADO CENTRAL 189,90"
          rows={9}
        />

        <div className="actions">
          <button onClick={handleParse}>Analisar fatura</button>
          <label className="fileInput">
            Importar PDF
            <input type="file" accept="application/pdf,.pdf" onChange={handleImportPdf} />
          </label>
        </div>
        {importStatus && <p className="importStatus">{importStatus}</p>}
      </section>

      <section className="summary">
        <article>
          <h2>Total da fatura</h2>
          <strong>{formatCurrency(totals.total)}</strong>
        </article>
        {CATEGORIES.map((category) => (
          <article key={category}>
            <h2>{category}</h2>
            <strong>{formatCurrency(totals[category])}</strong>
            <span>{percentages[category].toFixed(1)}%</span>
            <div className="barTrack">
              <div className="barFill" style={{ width: `${percentages[category]}%` }} />
            </div>
          </article>
        ))}
      </section>

      <section className="tableSection">
        <h2>Transações detectadas</h2>
        <table>
          <thead>
            <tr>
              <th>Data</th>
              <th>Descrição</th>
              <th>Valor</th>
              <th>Categoria</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((item) => (
              <tr key={item.id}>
                <td>{item.date}</td>
                <td>{item.description}</td>
                <td>{formatCurrency(item.amount)}</td>
                <td>
                  <select
                    value={item.category}
                    onChange={(event) => handleCategoryChange(item.id, event.target.value as Category)}
                  >
                    {CATEGORIES.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {transactions.length === 0 && <p>Nenhuma transação reconhecida. Revise o formato das linhas.</p>}
      </section>
    </main>
  )
}

export default App
