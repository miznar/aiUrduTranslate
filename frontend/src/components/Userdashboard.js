import React from 'react';
import { useNavigate } from 'react-router-dom';  // Importing useNavigate
import './Userdashboard.css';
import { Link } from 'react-router-dom';
import Footer2 from './Footer2';

const Userdashboard = () => {
  const navigate = useNavigate();  // Initialize navigate hook
  // Function to handle navigation to LearnerHeader (Edit Profile)
  const handleEditProfileClick = () => {
    navigate('/LearnerHeader');  // Navigate to LearnerHeader page
  };

  return (
    <div className="profile-page">
      {/* Header Section */}
      <header className="header-user">
        <div className="header-left">
          <span className="header-logo">Translate AI</span>
        </div>
        <div className="header-right">
          <span>Option1</span> | <span>Option1</span> | <span>Option1</span> | <span>Option1</span>
          <div className="profile-icon"></div>
        </div>
      </header>
      {/* Main Content */}
      <div className="main-content">
        {/* Sidebar */}
        <aside className="sidebar-user">
          <div className="profile-picture"></div>
          <div className="profile-info">
            <div className="profile-name">Learner Name</div>
            <div className="profile-username">learner's username</div>
          </div>
          <div className="menu">
            {/* Updated Edit Profile button to trigger navigation */}
            <button className="menu-item" onClick={handleEditProfileClick}>Edit Profile</button>
            <button className="menu-item">Settings</button>
          </div>
          <div className="interests">Learner's Interests</div>
        </aside>

        {/* Profile Content */}
        <div className="profile-content">
          <div className="score-section">
            <h3>Total Quiz Score</h3>
            <p>00</p>
          </div>
          {/* Moved Discussion Section Below Total Quiz Score */}
          <div className="discussion-section">
            <h3>Your Discussions</h3>
            <div className="discussion-list">
              <div className="discussion">
                <div className="discussion-title">Discussion 01</div>
                <div className="lecture-name">[Video Lecture's Name]</div>
              </div>
              <div className="discussion">
                <div className="discussion-title">Discussion 02</div>
                <div className="lecture-name">[Video Lecture's Name]</div>
              </div>
              <div className="discussion">
                <div className="discussion-title">Discussion 03</div>
                <div className="lecture-name">[Video Lecture's Name]</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer2 />
    </div>
  );
};

export default Userdashboard;
