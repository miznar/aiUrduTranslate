import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AccountSetting.css';

const AccountSetting = () => {
    const [username, setUsername] = useState(''); // optional
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (password !== confirmPassword) {
            setMessage("Passwords do not match.");
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/update-password/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`, // or however you're storing the token
                },
                body: JSON.stringify({
                    password: password,
                }),
            });
            if (response.ok) {
                setMessage("Password updated successfully!");
                setPassword('');
                setConfirmPassword('');
            } else {
                setMessage("Failed to update password.");
            }
        } catch (error) {
            console.error("Error:", error);
            setMessage("Something went wrong.");
        }
    };

    return (
        <div className="profile-page-account">
            {/* header and sidebar code stays the same */}
            
            <section className="Account-settings-account">
                <h2>Account Settings</h2>
                <form onSubmit={handleSubmit}>
                    {/* Optional username update */}
                    <div className="form-group-account">
                        <label htmlFor="Username">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="logged in user’s full name"
                        />
                    </div>
                    <div className="form-group-account">
                        <label htmlFor="Password">New Password</label>
                        <input
                            type="password"
                            id="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your new Password"
                        />
                    </div>
                    <div className="form-group-account">
                        <label htmlFor="Confirm-Password">Confirm Your New Password</label>
                        <input
                            type="password"
                            id="Confirm-Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm your new Password"
                        />
                    </div>

                    {message && <p className="message-account">{message}</p>}

                    <button type="submit" className="save-button-learner">Save Changes</button>
                    
                    {/* Delete section (optional) */}
                </form>
            </section>

            {/* footer code stays the same */}
        </div>
    );
};

export default AccountSetting;
