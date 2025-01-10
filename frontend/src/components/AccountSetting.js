import React from 'react';
import { Link } from 'react-router-dom'; // Import the Link component for navigation
import './AccountSetting.css'; // Import the CSS for styling

const AccountSetting = () => {
    return (
        <div className="profile-page-account">
            <header className="header-user">
                <div className="header-left">
                    <span className="header-logo">Translate AI</span>
                </div>
                <div className="header-right">
                    <span>Option1</span> | <span>Option2</span> | <span>Option3</span> | <span>Option4</span>
                    <div className="profile-icon"></div>
                </div>
            </header>

            {/* Main Content Section */}
            <div className="main-content-account">
                {/* Sidebar */}
                <aside className="sidebar-account">
                    <div className="profile-picture-account"></div>
                    <div className="profile-info-account">
                        <div className="profile-name-account">Learner Name</div>
                        <div className="profile-username-account">learner's username</div>
                    </div>
                    <div className="menu-account">
                        {/* Link to profile setting */}
                        <Link to="/LearnerHeader">
                            <div className="menu-item-account">Profile</div>
                        </Link>
                        <div className="menu-item-accounts">Accounts</div>
                    </div>
                </aside>

                {/* Profile Settings Form */}
                <section className="Account-settings-account">
                    <h2>Account Settings</h2>
                    <form>
                        <div className="form-group-account">
                            <label htmlFor="Username">Username</label>
                            <input
                                type="text"
                                id="full-name"
                                placeholder="logged in user’s full name"
                            />
                        </div>
                        <div className="form-group-account">
                            <label htmlFor="Password">Password</label>
                            <input
                                type="text"
                                id="Password"
                                placeholder="Enter your Password"
                            />
                        </div>
                        <div className="form-group-account">
                            <label htmlFor="Confirm Password">Confirm Your Password</label>
                            <input
                                type="text"
                                id="Confirm-Password"
                                placeholder="Enter your Confirm Password"
                            />
                        </div>
                        <button type="submit" className="save-button-learner">Save Changes</button>
                        
                        {/* Delete Account Section */}
                        <div className="delete-account-section-account">
                            <h3>Delete your Account</h3>
                            <p>Delete your TranslateAI account permanently. This action is irreversible.</p>
                            <button className="delete-button-account">Delete your Account</button>
                        </div>
                    </form>
                </section>
            </div>

            {/* Footer Section */}
            <footer className="footer-account">
                <Link to="/privacy">
                    <div>Privacy</div>
                </Link>
                <Link to="/tos">
                    <div>TOS</div>
                </Link>
                <Link to="/about">
                    <div>About</div>
                </Link>
                <Link to="/blogs">
                    <div>Blog</div>
                </Link>
                <Link to="/discussions">
                    <div>Discussions</div>
                </Link>
                <Link to="/contact">
                    <div>Contact-us</div>
                </Link>
            </footer>
        </div>
    );
};

export default AccountSetting;
