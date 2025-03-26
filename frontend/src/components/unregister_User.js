import React, { useState, useEffect } from "react";
import "./unregister_User.css";
import { Link } from "react-router-dom";
//import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import LastContainer from "./lastContainer";
import WelcomeBackPopup from "./WelcomeBackPopup"; // Ensure this is correctly imported

const UnregisterUser = () => {
 // const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  // Show popup automatically when the component loads
  useEffect(() => {
    const hasSeenPopup = localStorage.getItem("seenPopup");

    if (!hasSeenPopup) {
      setShowPopup(true);
      localStorage.setItem("seenPopup", "true"); // Never show again
    }
  }, []);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div>
      {/* Show WelcomeBackPopup when showPopup is true */}
      {showPopup && <WelcomeBackPopup onClose={handleClosePopup} />}

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
              <Link to="/" style={{ fontWeight: "bold" }}>How it Works</Link>
            </li>
            <li>
              <Link to="/about" style={{ fontWeight: "bold" }}>About us</Link>
            </li>
            <li>
              <Link to="/contact" style={{ fontWeight: "bold" }}>Contact Us</Link>
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
          {/* Login and Signup Buttons with Links */}
          <Link to="/login" className="get-sign-btn">Log In</Link>
          <Link to="/signup" className="get-sign-btn">Sign Up</Link>
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

      <LastContainer />
      <Footer />
    </div>
  );
};

export default UnregisterUser;
