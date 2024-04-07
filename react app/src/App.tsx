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

export default App;
