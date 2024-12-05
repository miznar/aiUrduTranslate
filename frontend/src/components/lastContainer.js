import React from 'react';
import './lastContainer.css';

const LastContainer = () => {
  return (
    <div className="last-container">
      {/* Main Text Section */}
      <h2>Unlock New Horizons</h2>
      <p>
        Our platform is now live for course access and translations!
      </p>
      <ul>
        <li>Explore Translations: Access expertly translated educational content in diverse subjects.</li>
        <li>Get Started: Begin your journey with seamless video translation today!</li>
      </ul>

      {/* Circle Buttons */}
      <div className="circle-container">
        <div className="circle">Learn More</div>
        <div className="circle">Start Translating</div>
      </div>

      {/* Mustard Underline */}
      <div className="underline"></div>

      {/* Footer Section Below the Line */}
      <div className="lastContainerfooter">
        <div className="lastContainerfooter-left">
          {/* Clickable Links */}
          <a href="/login" className="lastContainerfooter-link">MyTranslateAI Login</a>
          <a href="/contact" className="lastContainerfooter-link">Contact Us</a>
        </div>

        <div className="lastContainerfooter-right">
          <span>Follow TranslateAI</span>
          <div className="lastContainerfooter-icon">
            <i className="fab fa-youtube"></i>
          </div>
          <div className="lastContainerfooter-icon">
            <i className="fab fa-instagram"></i>
          </div>
          <div className="lastContainerfooter-icon">
            <i className="fab fa-linkedin"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LastContainer;
