import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importing useNavigate
import './LearnerHeader.css'; // Import the CSS for styling

const LearnerHeader = () => {
  const navigate = useNavigate(); // Initialize navigate hook

  // Function to handle navigation to AccountSettings
  const handleAccountSettingsClick = () => {
    navigate('/AccountSetting');  // Navigate to AccountSettings page
  };

  return (
    <div className="profile-page">
      {/* Header Section */}
      <header className="header">
        <div className="header-left">
          <span className="header-logo">Translate AI</span>
        </div>
        <div className="header-right">
          <span>Option1</span> | <span>Option1</span> | <span>Option1</span> | <span>Option1</span>
          <div className="profile-icon">●</div>
        </div>
      </header>

      {/* Main Content Section */}
      <div className="main-content">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="profile-picture">●</div>
          <div className="profile-info">
            <div className="profile-name">Learner Name</div>
            <div className="profile-username">learner's username</div>
          </div>
          <div className="menu">
            <button className="menu-item">Profile</button>
            {/* Updated Accounts button to trigger navigation */}
            <button className="menu-item" onClick={handleAccountSettingsClick}>
              Accounts
            </button>
          </div>
        </aside>

        {/* Profile Settings Form */}
        <section className="profile-settings">
          <h2>Profile Settings</h2>
          <form>
            <div className="form-group">
              <label htmlFor="full-name">Full Name</label>
              <input
                type="text"
                id="full-name"
                placeholder="logged in user’s full name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="interests">Your Interests</label>
              <input
                type="text"
                id="interests"
                placeholder="Enter your interests"
              />
            </div>
            <button type="submit" className="save-button">Save Changes</button>
          </form>
        </section>
      </div>

      {/* Footer Section */}
      <footer className="footer">
        <div>Privacy</div>
        <div>TOS</div>
        <div>About</div>
        <div>Blogs</div>
        <div>Discussions</div>
        <div>Contact</div>
      </footer>
    </div>
  );
};

export default LearnerHeader;
