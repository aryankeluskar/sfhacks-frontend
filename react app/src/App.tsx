import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from 'react';

// Import pages
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Profile_Input from "./pages/Profile_Input";
import Navbar from "./pages/Navbar";
import TopicsOfInterest from "./pages/TopicsOfInterest";
import Feed from "./pages/Feed";

// External redirect component
function ExternalRedirect({ to }: { to: string }) {
  useEffect(() => {
    window.location.href = to;
  }, [to]);

  return null;
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/:email/topics" element={<TopicsOfInterest />} />
          <Route path="/:email/feed" element={<Feed />} />
          <Route path="/input_page" element={<Profile_Input />} />
          <Route 
            path="*" 
            element={
              <ExternalRedirect to="https://nypost.com/wp-content/uploads/sites/2/2021/03/sacha-baron-cohen-borat-2.jpg?quality=75&strip=all" />
            } 
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
