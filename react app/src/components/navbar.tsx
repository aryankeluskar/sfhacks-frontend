import React from 'react';

interface NavbarProps {
  isLoggedIn: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn }) => {
  return (
    <div className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item"><a href="/">Home</a></li>
        <li className="navbar-item"><a href="/">name</a></li> 
        {/* Add more navbar items as needed */}
        {isLoggedIn ? (
          <li className="navbar-item"> </li>
        ) : (
          <li className="navbar-item"><a href="/login">Login</a></li>
        )}
        <div className="navbar-marker"></div>

      </ul>
    </div>
  );
};

export default Navbar;
