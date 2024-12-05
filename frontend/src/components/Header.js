import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      {/* Logo Section */}
      <div className="logo">
        <div className="headercircle"></div>
        <span>TranslateAI</span>
      </div>

      {/* Navigation Links */}
      <nav>
        <ul className="nav-links">
          <li>
            <Link to="/" style={{ fontWeight: 'bold' }}>How it Works</Link>
          </li>
          <li>
            <Link to="/about" style={{ fontWeight: 'bold' }}>About us</Link>
          </li>
          <li>
            <a href="#login" style={{ fontWeight: 'bold' }}>TranslateAI Login</a>
          </li>
        </ul>
      </nav>

      {/* Right Corner Icons */}
      <div className="header-right">
        <button className="get-info-btn">Get Info</button>
        <div className="icons">
          <div className="icon search-icon">
            <i className="fa fa-search"></i>
          </div>
          <div className="icon menu-icon">
            <i className="fa fa-bars"></i>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
