import React from 'react';
import './AccountSetting.css'; // Import the CSS for styling

const AccountSetting = () => {
    return (
        <div className="profile-page">
            {/* Header Section */}
            <header className="header">
                <div className="header-left">
                    <span className="header-logo">Translate AI</span>
                </div>
                <div className="header-right">
                    <span>Option1</span> | <span>Option1</span> | <span>Option1</span> | <span>Option1</span>
                    <div className="profile-icon">●</div>
                </div>
            </header>

            {/* Main Content Section */}
            <div className="main-content">
                {/* Sidebar */}
                <aside className="sidebar">
                    <div className="profile-picture">●</div>
                    <div className="profile-info">
                        <div className="profile-name">Learner Name</div>
                        <div className="profile-username">learner's username</div>
                    </div>
                    <div className="menu">
                        <button className="menu-item"> Profile</button>
                        <button className="menu-item">Accounts</button>
                    </div>
                </aside>

                {/* Profile Settings Form */}
                <section className="Account-settings">
                    <h2>Account Settings</h2>
                    <form>
                        <div className="form-group">
                            <label htmlFor="Username">Username</label>
                            <input
                                type="text"
                                id="full-name"
                                placeholder="logged in user’s full name"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="Passward">Passward</label>
                            <input
                                type="text"
                                id="Passward"
                                placeholder="Enter your Passward"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="Confirm Your Passward"> Confirm Your Passward</label>
                            <input
                                type="text"
                                id=" Confirm Passward"
                                placeholder="Enter your  Confirm Passward"
                            />
                        </div>
                        <button type="submit" className="save-button">Save Changes</button>
                        {/* Delete Account Section */}
                        <div className="delete-account-section">
                            <h3>Delete your Account</h3>
                            <p>Delete your TranslateAI account permanently. This action is irreversible.</p>
                            <button className="delete-button">Delete your Account</button>
                        </div>
                    </form>
                </section>
            </div>

            {/* Footer Section */
              <footer className="footer-account">
                <div>Privacy</div>
                <div>TOS</div>
                <div>About</div>
                <div>Blogs</div>
                <div>Discussions</div>
                <div>Contact</div>
            </footer> }
           
        </div>
    );
};

export default AccountSetting;
