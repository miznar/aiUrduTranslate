import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Userdashboard.css';

const Userdashboard = () => {
  const navigate = useNavigate();

  const handleEditProfileClick = () => {
    navigate('/LearnerHeader');
  };

  return (
    <div className="profile-page">
      {/* Header Section */}
      <header className="header">
        <div className="header-left">
          <span className="header-logo">Translate AI</span>
        </div>
        <div className="header-right">
          <span className="header-option">Option1</span> 
          <span className="header-option">Option2</span> 
          <span className="header-option">Option3</span>
          <div className="profile-icon">●</div>
        </div>
      </header>

      {/* Main Content */}
      <div className="main-content">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="profile-picture">●</div>
          <div className="profile-info">
            <div className="profile-name">Learner Name</div>
            <div className="profile-username">learner's username</div>
          </div>
          <div className="button-container">
            <button className="edit-profile-btn" onClick={handleEditProfileClick}>
              Edit Profile
            </button>
            <button className="settings-btn">Settings</button>
          </div>
          <div className="interests">Learner's Interests</div>
        </aside>

        {/* Profile Content */}
        <section className="profile-content">
          <div className="score-section">
            <h3>Total Quiz Score</h3>
            <p>00</p>
          </div>
          <div className="discussion-section">
            <h3>Your Discussions</h3>
            <div className="discussion-list">
              {[1, 2, 3].map((num) => (
                <div className="discussion" key={num}>
                  <div className="discussion-title">Discussion {`0${num}`}</div>
                  <div className="lecture-name">[Video Lecture's Name]</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Footer*/ 
       <footer className="footer-dashboard">
        <div>Privacy</div>
        <div>TOS</div>
        <div>About</div>
        <div>Blogs</div>
        <div>Discussions</div>
        <div>Contact</div>
      </footer> }
     
    </div>
  );
};

export default Userdashboard;
