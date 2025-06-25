import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';  
import './Userdashboard.css';
// import { Link } from 'react-router-dom';
import Footer2 from './Footer2';
import './Footer2.css';
const Userdashboard = () => {
  const navigate = useNavigate();  
  const [user, setUser] = useState({
    fullName: '',
    username: '',
    email:'',
    interests: []  // Default to an empty array
  });

  useEffect(() => {
    // Retrieve user data from localStorage
    const userEmail = localStorage.getItem('email'); 
    const userFullName = localStorage.getItem('full_name');
    const userUsername = localStorage.getItem('username');
    const userInterests = localStorage.getItem('interests');

    if (userFullName && userUsername) {
      // Safely parse interests to ensure it's always an array
        let parsedInterests = userInterests ? JSON.parse(userInterests) : [];
        if (!Array.isArray(parsedInterests)) {
            parsedInterests = [];
        }

      setUser({
        email: userEmail,  
        fullName: userFullName,
        username: userUsername,
        interests: parsedInterests  // Ensure interests is always an array
      });
    }
  }, []);

  const handleEditProfileClick = () => {
    navigate('/LearnerHeader');  // Navigate to LearnerHeader page
  };

  return (
    <div className="profile-page">
      <header className="header-user">
        <div className="header-left">
          <div className="footer-logo-placeholder">
            <div className="footer-circle"></div>
          </div>
          <span className="header-logo">اردو فہم</span>
        </div>
        <div className="header-right">
          <span>Option1</span> | <span>Option1</span> | <span>Option1</span> | <span>Option1</span>
          <div className="profile-icon"></div>
        </div>
      </header>

      <div className="header-divider"></div>
      <div className="main-content">
        <aside className="sidebar-user">
          <div className="profile-picture"></div>
          <div className="profile-info">
            <div className="profile-name">{user.fullName}</div>
            <div className="profile-name">{user.email}</div>
            <div className="profile-username">@{user.username}</div>
          </div>
          <div className="menu">
            <button className="menu-item" onClick={handleEditProfileClick}>Edit Profile</button>
            <button className="menu-item">Settings</button>
          </div>
          <div className="interests">
            {/* Ensure interests is an array */}
            {user.interests && user.interests.length > 0 ? user.interests.join(', ') : 'No interests available'}
          </div>
        </aside>

        <div className="profile-content">
          <div className="score-section">
          <h3><i class="fa-solid fa-percent"></i>&nbsp;   Total Quiz Score</h3>
            <p>00</p>
          </div>

          <div className="discussion-section">
          <h3><i class="fa-solid fa-user-group"></i>&nbsp;   Your Discussions</h3>
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
      <div className="header-divider"></div>
      <Footer2 />
    </div>
  );
};

export default Userdashboard;
