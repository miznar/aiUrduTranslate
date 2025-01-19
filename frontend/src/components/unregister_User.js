import React from "react";
import "./unregister_User.css";
import { Link } from 'react-router-dom'; 
import { useNavigate } from "react-router-dom";

const Unregister_User = () => {
    const navigate = useNavigate();
        const handleButtonClick = () => {
          navigate("/query");
        };
  return (
    <div>
        <header className="header">
              {/* Logo Section */}
              <div className="logo">
                <div className="headercircle"></div>
                <span>اردو فہم</span>
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
                    <a href="/contact" style={{ fontWeight: 'bold' }}>Contact Us</a>
                  </li>
                </ul>
              </nav>
              {/* Right Corner Icons */}
              <div className="header-right"> 
                <div className="icons">
                  <div className="icon search-icon">
                    <Link to="/search">
                      <i className="fa fa-search"></i>
                    </Link>
                  </div>
                  <div className="icon menu-icon">
                    <Link to="/blog">
                      <i className="fa fa-bars"></i>
                    </Link>
                  </div>
                </div>
                <button className="get-sign-btn" onClick={handleButtonClick} >Log In</button>
                <button className="get-sign-btn" onClick={handleButtonClick} >Sign Up</button>
              </div>
            </header>
        <section className="hero-section">
                <h1>
                  Breaking Language Barriers
                  <span>for Education</span>
                </h1>
                <h2>Where language meets Innovation</h2>
                <p className="intro-text">
                  Step into a world of accessible learning. Bridge the gap <br />
                  between language and education, one video at a time.
                </p>
                <div className="underline"></div>
              </section>
        
              <section className="hero-buttons">
                <div className="button-row">
                  <button className="custom-button">
                    <span className="button-text">Subjects</span>
                    <span className="arrow">→</span>
                  </button>
                  <Link to="/uploadvideo" className="custom-link">
                    <button className="custom-button">
                      <span className="button-text">Upload Video and Start</span>
                      <span className="arrow">→</span>
                    </button>
                  </Link>
                </div>
                <Link to="/search" className="custom-link">
                  <div className="button-row">
                    <button className="custom-button">
                      <span className="button-text">Explore All</span>
                      <span className="arrow">→</span>
                    </button>
                  </div>
                </Link>
              </section>
    </div>
  );
};

export default Unregister_User;
