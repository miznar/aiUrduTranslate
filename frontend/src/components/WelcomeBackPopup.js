// WelcomeBackPopup.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './WelcomeBackPopup.css';

const WelcomeBackPopup = ({ onClose }) => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate("/signup");
    onClose();
  };

  return (
    <div className="welcome-popup-overlay" onClick={onClose}>
      <div className="welcome-popup" onClick={(e) => e.stopPropagation()}>
        
        <h2>Welcome Back</h2>
        <p className="welcome-popup-message">
          Log in or Sign up to access subjects,
          <br />
          translate videos, and explore our full
          <br />
          educational catalog.
        </p>
        <button class="welcome-popup-login-btn">Log In</button>
        <button 
          className="welcome-popup-signup-btn"
          onClick={handleSignUp}
        >
          Sign up
        </button>
       
      </div>
    </div>
  );
};

export default WelcomeBackPopup;