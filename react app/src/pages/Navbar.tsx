import React from 'react';
import { Link } from 'react-router-dom'; // Import Link component from react-router-dom
import "./Navbar.css";

const Navbar: React.FC = () => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">Logo</Link> {/* Use Link component with 'to' prop */}
            </div>
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to="/">login</Link>
                </li>
                <li className="nav-item">
                    <Link to="/input_page">profile input</Link>
                </li>
                {/* <li className="nav-item">
                    <Link to="/services">Services</Link>
                </li>
                <li className="nav-item">
                    <Link to="/contact">Contact</Link>
                </li> */}
            </ul>
        </nav>
    );
};

export default Navbar;
