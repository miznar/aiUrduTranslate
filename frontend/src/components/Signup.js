import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';
import Header from './creamHeader';


const Signup = () => {
  const [email, setEmail] = useState(localStorage.getItem('email') || ''); // Get email from localStorage if exists
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('email', email); 
    navigate('/signup2', { state: { email } }); 
  };

  return (
    <div>
        <Header />
      <h1 className="signup-title">Create an Account</h1>
      <form className="signup-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email address*"
          className="signup-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Update the email
          required
        />
        <button type="submit" className="signup-button">
          Continue
        </button>
      </form>
      <p className="signup-login">
        Already have an account? <a href="/login">Login</a>
      </p>
      <div className="signup-divider">
        <hr className="divider-line" />
        <span> OR </span>
        <hr className="divider-line" />
      </div>

      <div className="signup-alternate">
        <button className="signup-google">
          <img src="/google.jpg" alt="Google logo" className="icon" />
          Continue with Google
        </button>
        <button className="signup-microsoft">
          <img src="/microsoft.png" alt="Microsoft logo" className="icon" />
          Continue with Microsoft Account
        </button>
      </div>
      <div className="signup-footer">
        <a href="/service">Terms of Use</a> | <a href="/privacypage">Privacy Policy</a>
      </div>
    </div>
  );
};

export default Signup;
