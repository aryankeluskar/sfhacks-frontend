import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

//import pages
  import LoginForm from "./pages/login";

function App() {
    return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginForm/>} />
            {/* <Route path="signup" element={<SignUp />} /> */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }

export default App
