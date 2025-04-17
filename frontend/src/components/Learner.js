import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Learner.css';
import Footer2 from './Footer2';
import './Userdashboard.css';

const LearnerHeader = () => {
  const [user, setUser] = useState({
    fullName: '',
    username: '',
    email: ''
  });

  const [interests, setInterests] = useState('');

  useEffect(() => {
    // Retrieve user data from localStorage
    const fullName = localStorage.getItem('full_name');
    const username = localStorage.getItem('username');
    const email = localStorage.getItem('email');
    const storedInterests = localStorage.getItem('interests');

    setUser({
      fullName: fullName || '',
      username: username || '',
      email: email || ''
    });

    if (storedInterests) {
      try {
        setInterests(JSON.parse(storedInterests).join(', '));
      } catch {
        setInterests(storedInterests);
      }
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const trimmedInterests = interests
      .split(',')
      .map(item => item.trim())
      .filter(Boolean);
  
    const token = localStorage.getItem('token'); // ✅ Declare token here
  
    try {
      const response = await fetch('http://127.0.0.1:8000/update-interests/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`, 
        },
        body: JSON.stringify({
          email: user.email,
          interests: trimmedInterests, // ✅ Use the correct variable
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert('Interests updated successfully!');
        localStorage.setItem('interests', JSON.stringify(trimmedInterests));
      } else {
        alert(data.error || 'Failed to update interests');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong.');
    }
  };
  
  return (
    <div className="profile-page-learner">
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

      <div className="main-content-learner">
        <aside className="sidebar-learner">
          <div className="profile-picture-learner"></div>
          <div className="profile-info-learner">
            <div className="profile-name-learner">{user.fullName}</div>
            <div className="profile-username-learner">@{user.username}</div>
          </div>
          <div className="menu-learner">
            <div className="menu-item-learner-bold-profile">Profile</div>
            <Link to="/AccountSetting">
              <div className="menu-item-learner">Accounts</div>
            </Link>
          </div>
        </aside>

        <section className="profile-settings-learner">
          <h2>Profile Settings</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group-learner">
              <label htmlFor="full-name">Full Name</label>
              <input
                type="text"
                id="full-name"
                value={user.fullName}
                readOnly
              />
            </div>
            <div className="form-group-learner">
              <label htmlFor="interests">Your Interests</label>
              <input
                type="text"
                id="interests"
                placeholder="Enter your interests (comma-separated)"
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
              />
            </div>
            <button type="submit" className="save-button-account">Save Changes</button>
          </form>
        </section>
      </div>

      <div className="header-divider"></div>
      <Footer2 />
    </div>
  );
};

export default LearnerHeader;
