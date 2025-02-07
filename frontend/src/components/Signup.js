import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
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
        navigate('/completeUser', { state: { email, password } });
      } else {
        const data = await response.json();
        setError(data.error || 'An error occurred.');
      }
    } catch (err) {
      setError('Failed to connect to the server.');
    }
  };

  const handleGoogleLogin = async (response) => {

    const googleToken = response.credential;
    console.log(googleToken);
    try {
      const googleLoginResponse = await fetch('http://127.0.0.1:8000/signup_google/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: googleToken }),
      });

      if (googleLoginResponse.ok) {
        navigate('/completeUser');
      } else {
        const data = await googleLoginResponse.json();
        setError(data.error || 'An error occurred during Google login.');
      }
    } catch (err) {
      setError('Failed to connect to the server.');
    }
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
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password*"
          className="signup-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="error-text">{error}</p>}
        <button type="submit" className="signup-button">Continue</button>
      </form>

      <p className="signup-login">Already have an account? <a href="/login">Login</a></p>

      <div className="signup-divider">
        <hr className="divider-line" />
        <span>OR</span>
        <hr className="divider-line" />
      </div>

      <div className="signup-alternate">
      <GoogleLogin
       onSuccess={(credentialResponse) => handleGoogleLogin(credentialResponse)}
       onError={() => setError('Google Login Failed.')}
       text="signup_with"
       size="large"
      />

        <button className="signup-microsoft">
          <img src="/microsoft.png" alt="Microsoft logo" className="icon" />
          Continue with Microsoft Account
        </button>
      </div>

      <div className="signup-footer">
        <a href="/terms">Terms of Use</a> | <a href="/privacy">Privacy Policy</a>
      </div>
    </div>
  );
};

export default Signup;
