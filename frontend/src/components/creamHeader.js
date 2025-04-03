import React from 'react';
import { Link } from 'react-router-dom';
import './creamHeader.css';
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
    const handleButtonClick = () => {
      navigate("/Userdashboard");
    };

  return (
    <header className="header-cream">
      {/* Logo Section */}
      <div className="logo">
        <div className="headercircle"></div>
        <span>اردو فہم</span>
      </div>
      {/* Navigation Links */}
      <nav>
        <ul className="nav-links">
          <li>
            <Link to="/home" style={{ fontWeight: 'bold' }}>How it Works</Link>
          </li>
          <li>
            <Link to="/about" style={{ fontWeight: 'bold' }}>About us</Link>
          </li>
          <li>
            <a href="/contact" style={{ fontWeight: 'bold' }}>Contact Us</a>
          </li>
          {/* <li>
            <a href="/unregisterUser" style={{ fontWeight: 'bold' }}>unreg</a>
          </li> */}
        </ul>
      </nav>
      {/* Right Corner Icons */}
      <div className="header-right">
      <div className="icons">
      <div className="icon menu-icon">
            <Link to="/corner-navigation">
              <i className="fa fa-bars"></i>
            </Link>
          </div>
          <div className="icon search-icon">
            <Link to="/search">
              <i className="fa fa-search"></i>
            </Link>
          </div>
         
        </div>
        <button className="get-info-btn" onClick={handleButtonClick} >Get Info</button> 
       
      </div>
    </header>
  );
};

export default Header;
