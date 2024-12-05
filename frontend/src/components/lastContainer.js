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
        <div className="footer-left">
          <span>MyTranslateAI Login</span>
          <span>Contact Us</span>
        </div>

        <div className="footer-right">
          <span>Follow TranslateAI</span>
          <div className="footer-icon">
            <i className="fab fa-youtube"></i>
          </div>
          <div className="footer-icon">
            <i className="fab fa-instagram"></i>
          </div>
          <div className="footer-icon">
            <i className="fab fa-linkedin"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LastContainer;
