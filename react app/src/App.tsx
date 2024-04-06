import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

//import pages
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

function App() {
    return (
      <div className="App">
        <BrowserRouter>
          <Routes>  
            <Route path="/" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }

export default App
