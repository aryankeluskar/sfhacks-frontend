import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

//import pages
import Login from "./pages/Login";

function App() {
  const profileProps = {
    name: "John Doe",
    age: 30,
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla at turpis vel libero tincidunt interdum.",
    profilePictureUrl: "https://example.com/profile.jpg",
    interests: ["Reading", "Cooking", "Traveling"]
};

    return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            {/* <Route path="signup" element={<SignUp />} /> */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }

export default App
