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

        try {
            // Send email and password to the backend to create the initial user
            const response = await fetch('http://127.0.0.1:8000/signup_email/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                // Navigate to the profile completion page with email and password
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
                <button type="submit" className="signup-button">
                    Continue
                </button>
            </form>
        </div>
    );
};

export default Signup;
