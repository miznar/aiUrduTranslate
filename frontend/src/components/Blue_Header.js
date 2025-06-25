import React from 'react';
import { Link } from 'react-router-dom';
import './Blue_Header.css'; // Updated CSS file
import { useNavigate } from "react-router-dom";

const BlueHeader = () => {
  const navigate = useNavigate();
  
  const handleButtonClick = () => {
    navigate("/query");
  };

  return (
    <div>
      <header className="blue-header">
        {/* Logo Section */}
        <div className="blue-logo">
          <div className="blue-header-circle"></div>
          <span>اردو فہم</span>
        </div>

        {/* Navigation Links */}
        <nav>
          <ul className="blue-nav-links">
            <li>
              <Link to="/home" style={{ fontWeight: 'bold' }}>How it Works</Link>
            </li>
            <li>
              <Link to="/about" style={{ fontWeight: 'bold' }}>About us</Link>
            </li>
            <li>
              <a href="/contact" style={{ fontWeight: 'bold' }}>Contact Us</a>
            </li>
          </ul>
        </nav>

        {/* Right Corner Icons */}
        <div className="blue-header-right">
          <button className="blue-get-info-btn" onClick={handleButtonClick}>Get Info</button> 
          <div className="blue-icons">
            <div className="blue-icon blue-search-icon">
              <Link to="/search">
                <i className="fa fa-search"></i>
              </Link>
            </div>
            <div className="blue-icon blue-menu-icon">
              <Link to="/blog">
                <i className="fa fa-bars"></i>
              </Link>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default BlueHeader;
