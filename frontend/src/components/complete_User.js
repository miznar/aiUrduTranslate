import React, { useState, useEffect } from "react"; // Add useEffect here
import { useNavigate, useLocation } from 'react-router-dom'; // Add useLocation here
import "./complete_User.css";

const CompleteProfile = () => {
    const [username, setUsername] = useState('');
    const [fullName, setFullName] = useState('');
    const [interests, setInterests] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation(); // useLocation is now properly imported

    const { email, password } = location.state || {}; // Get email and password from the state

    useEffect(() => {
        if (!email || !password) {
            setError('Email and password are required.');
            navigate('/');
        }
    }, [email, password, navigate]); // The effect will run when email or password changes

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username || !fullName || !interests) {
            setError('All fields are required.');
            return;
        }

        try {
            // Send the complete user profile data
            const response = await fetch('http://127.0.0.1:8000/complete_profile/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, username, full_name: fullName, interests }),
            });

            if (response.ok) {
                navigate('/success');
            } else {
                const data = await response.json();
                setError(data.error || 'An error occurred.');
            }
        } catch (err) {
            setError('Failed to connect to the server.');
        }
    };

    return (
        <div className="profile-container">
            <div className="profile-header">
                <div className="profile-icon"></div>
                <h1>Complete your profile</h1>
            </div>
            <form className="profile-form" onSubmit={handleSubmit}>
                
                <div className="form-row">
                    <input
                        type="text"
                        placeholder="Username"
                        className="form-input"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Full Name"
                        className="form-input"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                    />
                </div>
                <textarea
                    placeholder="Your Interests"
                    className="form-textarea"
                    value={interests}
                    onChange={(e) => setInterests(e.target.value)}
                ></textarea>
                {error && <p className="error-text">{error}</p>}
                <button type="submit" className="submit-button">
                    Create Account
                </button>
            </form>
            <div className="footer-links">
                <a href="/service" className="link">Terms of Use</a>
                <span>|</span>
                <a href="/privacypage" className="link">Privacy Policy</a>
            </div>
        </div>
    );
};

export default CompleteProfile;
