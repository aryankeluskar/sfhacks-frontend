import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/login';
import SignUpPage from './pages/register';
import HomePage from './pages/homePage';
import Footer from './components/footer';
import Header from './components/header';
import Navbar from './components/navbar';
import Userdropdown from './components/userdropdown';
// import NotFoundPage from './components/NotFoundPage';

const App: React.FC = () => {
  const isLoggedIn = true; // Define isLoggedIn here or fetch it from your app's state/logic
  return (

    <div className="App">

      <Header />

      <Navbar isLoggedIn={isLoggedIn} />
      
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<SignUpPage />} />
          <Route path="/userdropdown" element={<Userdropdown isLoggedIn={isLoggedIn} user={{
            username: '',
            userId: ''
          }} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
      
      <Footer />
      
    </div>
  );
}
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from 'react';


//import pages
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Profile_Display from "./pages/Profile_Display"
import Profile_Input from "./pages/Profile_Input"
import Navbar from "./pages/Navbar"
import TopicsOfInterest from "./pages/TopicsOfInterest";
import Feed from "./pages/Feed";

function App() {

  function ExternalRedirect({ to }: { to: string }) {
    useEffect(() => {
      window.location.href = to;
    }, [to]);
  
    return null;
  }


  const profileProps = {
    name: "John Doe",
    age: 30,
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla at turpis vel libero tincidunt interdum.",
    profilePictureUrl: "./assets/loginbk.jpg",
    interests: ["Reading", "Cooking", "Traveling"]
};

    return (
      <div className="App">
        <BrowserRouter>
        <Navbar></Navbar>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path={`/:email/topics`} element={<TopicsOfInterest />} />
            <Route path={`/:email/feed`} element={<Feed />} />
            <Route path="/profile_display" element={<Profile_Display name={profileProps.name} age={profileProps.age} bio={profileProps.bio} profilePictureUrl={profileProps.profilePictureUrl} interests={profileProps.interests}/>}/>
            <Route path="/input_page" element={<Profile_Input/>}/>
            <Route path="*" element={<ExternalRedirect to="https://nypost.com/wp-content/uploads/sites/2/2021/03/sacha-baron-cohen-borat-2.jpg?quality=75&strip=all" />} />          </Routes>
        </BrowserRouter>
      </div>
    );
  }

export default App;
