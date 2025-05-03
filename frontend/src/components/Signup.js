import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Email and Password are required.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/signup_email/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("accessToken", data.access);
        localStorage.setItem("refreshToken", data.refresh);
        navigate('/completeUser', { state: { email, password } });
      } else {
        const data = await response.json();
        setError(data.error || 'An error occurred.');
      }
    } catch (err) {
      setError('Failed to connect to the server.');
    }
  };
  return (
    <div className="login-container">
        <h1 className="login-title">Create an Account</h1>
        {error && <p className="error-message">{error}</p>} {/* Show error if any */}
        <form className="login-form" onSubmit={handleSubmit}>
            <input
                type="email"
                placeholder="Email address*"
                className="login-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password*"
                className="login-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit" className="login-button">
                Continue
            </button>
        </form>
        <p className="login-login">
            Already have an account? <a href="/login">Log In</a>
        </p>
        <div className="login-divider">
            <hr className="divider-line" />
            <span> OR </span>
            <hr className="divider-line" />
        </div>
        <div className="login-alternate">
            <button className="login-google">
                <img src="/google.jpg" className="icon" alt="Google logo" />
                Continue with Google
            </button>
            <button className="login-microsoft">
                <img src="/microsoft.png" alt="Microsoft logo" className="icon" />
                Continue with Microsoft Account
            </button>
        </div>
        <div className="login-footer">
            <a href="/terms">Terms of Use</a> | <a href="/privacy">Privacy Policy</a>
        </div>
    </div>
);

};

export default Signup;
