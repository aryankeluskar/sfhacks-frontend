import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

//import pages
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Profile_Display from "./pages/Profile_Display"
import Profile_Input from "./pages/Profile_Input"
import TopicsOfInterest from "./pages/TopicsOfInterest";

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
            <Route path="signup" element={<SignUp />} />
            <Route path="/topics" element={<TopicsOfInterest />} />
            <Route path="/profile_display" element={<Profile_Display name={profileProps.name} age={profileProps.age} bio={profileProps.bio} profilePictureUrl={profileProps.profilePictureUrl} interests={profileProps.interests}/>}/>
            <Route path="/input_page" element={<Profile_Input/>}/>
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }

export default App
