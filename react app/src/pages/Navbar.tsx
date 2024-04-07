import React from 'react';
import { NavLink } from 'react-router-dom'; // Import NavLink from react-router-dom
import "./Navbar.css";

const Navbar: React.FC = () => {
    // Function to determine the class name based on isActive
    const getClassName = (isActive: boolean) => isActive ? 'nav-link active' : 'nav-link';

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                {/* Use NavLink with className. No need for `exact` prop */}
                <NavLink to="/" className={({ isActive }) => getClassName(isActive)}>
                    Logo
                </NavLink>
            </div>
            <ul className="navbar-nav">
                <li className="nav-item">
                    {/* Apply dynamic class based on active state */}
                    <NavLink to={`/:email/feed`} className={({ isActive }) => getClassName(isActive)}>
                        Home
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/" className={({ isActive }) => getClassName(isActive)}>
                        Login
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/input_page" className={({ isActive }) => getClassName(isActive)}>
                        Profile Input
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/topics" className={({ isActive }) => getClassName(isActive)}>
                        Topics
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/signup" className={({ isActive }) => getClassName(isActive)}>
                        Register
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
