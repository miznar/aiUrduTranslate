import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup-pg2.css';

const Signup2 = () => {
  const navigate = useNavigate();
  const [email] = useState(localStorage.getItem('email') || ''); // Get email from localStorage
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can use the email and password values for further processing
    navigate('/Userdashboard'); // Redirect to User Dashboard
  };

  return (
    <div>
      <h1 className="signup-title">Create an Account</h1>
      <form className="signup-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email address*"
          className="signup-input"
          value={email}
          readOnly // Make it read-only since it was passed from Page 1
        />
        <input
          type="password"
          placeholder="Password*"
          className="signup-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="signup-button">
          Continue
        </button>
      </form>
      <p className="signup-login">
        <a href="/signup">Go Back</a> {/* Go Back button */}
      </p>
      <div className="signup-footer1">
        <a href="/service">Terms of Use</a> | <a href="/privacypage">Privacy Policy</a>
      </div>
    </div>
  );
};

export default Signup2;
