import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Signup-pg2.css';

const Signup2 = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const email = location.state?.email || '';
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleGoBack = () => {
        navigate('/signup', { state: { email } });
    };

    const handleContinue = async () => {
        if (!password) {
            setError('Password is required.');
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/signup_password/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                navigate('/completeUser');
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
            <form className="signup-form" onSubmit={(e) => e.preventDefault()}>
                <input
                    type="email"
                    value={email}
                    className="signup-input"
                    disabled
                />
                <input
                    type="password"
                    placeholder="Password*"
                    className="signup-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {error && <p className="error-message">{error}</p>}
                <button type="button" className="signup-button" onClick={handleContinue}>
                    Continue
                </button>
            </form>
            <p className="signup-login">
                <button type="button" onClick={handleGoBack} className="go-back-link">
                    Go Back
                </button>
            </p>
            <div className="signup-footer1">
                <a href="/service">Terms of Use</a> | <a href="/privacypage">Privacy Policy</a>
            </div>
        </div>
    );
};

export default Signup2;
