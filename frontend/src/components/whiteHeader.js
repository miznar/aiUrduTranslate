import React from 'react';
import { Link } from 'react-router-dom';
import './whiteHeader.css';

const WhiteHeader = () => {
  return (
    <header className="white-header">
      {/* Logo Section */}
      <div className="white-header-logo">
        <div className="white-header-circle"></div>
        <span>TranslateAI</span>
      </div>

      {/* Navigation Links */}
      <nav>
        <ul className="white-nav-links">
          <li>
            <Link to="/" style={{ fontWeight: 'bold' }}>How it Works</Link>
          </li>
          <li>
            <Link to="/about" style={{ fontWeight: 'bold' }}>About us</Link>
          </li>
          <li>
            <a href="/signup" style={{ fontWeight: 'bold' }}>TranslateAI Login</a>
          </li>
          <li>
            <a href="/contact" style={{ fontWeight: 'bold' }}>Contact Us</a>
          </li>
        </ul>
      </nav>

      {/* Right Corner Icons */}
      <div className="white-header-right">
        <button className="white-get-info-btn">Get Info</button>
        <div className="white-icons">
          <div className="white-icon search-icon">
            <Link to="/search">
              <i className="fa fa-search"></i>
            </Link>
          </div>

          <div className="white-icon menu-icon">
            <Link to="/blog">
              <i className="fa fa-bars"></i>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default WhiteHeader;
