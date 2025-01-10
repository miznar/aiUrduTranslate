import React from 'react';// Import the Link component for navigation
import './Learner.css'; // Import the CSS for styling
import { Link } from 'react-router-dom';

const LearnerHeader = () => {
    return (
        <div className="profile-page-learner">
            <header className="header-learner">
                <div className="header-left">
                    <span className="header-logo">Translate AI</span>
                </div>
                <div className="header-right">
                    <span>Option1</span> | <span>Option2</span> | <span>Option3</span> | <span>Option4</span>
                    <div className="profile-icon"></div>
                </div>
            </header>

            {/* Main Content Section */}
            <div className="main-content-learner">
                {/* Sidebar */}
                <aside className="sidebar-learner">
                    <div className="profile-picture-learner"></div>
                    <div className="profile-info-learner">
                        <div className="profile-name-learner">Learner Name</div>
                        <div className="profile-username-learner">learner's username</div>
                    </div>
                    <div className="menu-learner">
                        <div className="menu-item-learner-bold-profile">Profile</div>
                        
                        {/* Link to Account Settings Page */}
                        <Link to="/AccountSetting">
                            <div className="menu-item-learner">Accounts</div>
                        </Link>
                    </div>
                </aside>

                {/* Profile Settings Form */}
                <section className="profile-settings-learner">
                    <h2>Profile Settings</h2>
                    <form>
                        <div className="form-group-learner">
                            <label htmlFor="Username">Username</label>
                            <input
                                type="text"
                                id="full-name"
                                placeholder="logged in user’s full name"
                            />
                        </div>
                        <div className="form-group-learner">
                            <label htmlFor="Password">Password</label>
                            <input
                                type="text"
                                id="Password"
                                placeholder="Enter your Password"
                            />
                        </div>
                        <button type="submit" className="save-button-account">Save Changes</button>
                    </form>
                </section>
            </div>

            {/* Footer Section */}
            <footer className="footer-learner">
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

export default LearnerHeader;
