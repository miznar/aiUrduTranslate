import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Learner.css';
import Footer2 from './Footer2';
import './Userdashboard.css';
import { jwtDecode } from "jwt-decode";

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
  
    // Split the interests by commas, trim whitespace, and remove empty strings
    const trimmedInterests = interests
      .split(',')
      .map(item => item.trim())
      .filter(Boolean);
  
    // Handle case where no interests are provided
    if (trimmedInterests.length === 0) {
      alert("Please enter at least one interest.");
      return;
    }
  
    // Get the token from localStorage
    const token = localStorage.getItem('access_token');
    
    if (!token) {
      alert('No token found. Please log in.');
      return;  // Early exit if no token
    }
  
    // Decode and check token expiration
    try {
      const decoded = jwtDecode(token);
      console.log(decoded);  // Check the `exp` field

      const currentTime = Date.now() / 1000;  // Current time in seconds
  
      if (decoded.exp < currentTime) {
        alert('Session expired. Please log in again.');
        // Handle token expiry (e.g., redirect to login page)
        return;
      }
    } catch (err) {
      console.error('Invalid token:', err);
      alert('Error decoding token. Please log in again.');
      return;
    }
  
    console.log("Token:", token);
    console.log("Interests to update:", trimmedInterests);
    console.log("Sending token:", token); // Check if token is correct

    try {
      console.log("Sending token:", token); // Check if token is correct

      const response = await fetch('http://127.0.0.1:8000/update-interests/', {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          interests: trimmedInterests,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert('Interests updated successfully!');
        // Update interests in localStorage and state
        localStorage.setItem('interests', JSON.stringify(trimmedInterests));
        setInterests(trimmedInterests.join(', '));
      } else {
        alert(data.error || 'Failed to update interests');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Please try again.');
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
