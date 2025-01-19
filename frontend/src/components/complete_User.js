import React from "react";
import "./complete_User.css"; // Include the CSS file for styling

const CompleteProfile = () => {
  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-icon"></div>
        <h1>Complete your profile</h1>
      </div>
      <form className="profile-form">
        <div className="form-row">
          <input
            type="email"
            placeholder="entered email address"
            className="form-input"
          />
          <input type="text" placeholder="Full Name" className="form-input" />
        </div>
        <p className="form-helper">or change your username</p>
        <textarea
          placeholder="Your Interests"
          className="form-textarea"
        ></textarea>
        <button type="submit" className="submit-button">
          Create Account
        </button>
      </form>
      <div className="footer-links">
        <a href="/service" className="link">
          Terms of Use
        </a>
        <span>|</span>
        <a href="/privacypage" className="link">
          Privacy Policy
        </a>
      </div>
    </div>
  );
};

export default CompleteProfile;
