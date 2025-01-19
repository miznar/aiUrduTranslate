import './Signup-pg2.css';
import React from "react";

const Signup2 = () => {
    return (
        <div >
            <h1 className="signup-title">Create an Account</h1>
            <form className="signup-form">
                <input
                    type="email"
                    placeholder="Email address*"
                    className="signup-input"
                    required
                />

                <input
                    type="password"
                    placeholder="Password*"
                    className="signup-input"
                    required
                />
                <button type="submit" className="signup-button">
                    Continue
                </button>
            </form>
            <p className="signup-login"> <a href="/signup">go back</a>
            </p>

            <div className="signup-footer1">
                <a href="/service">Terms of Use</a> | <a href="/privacypage">Privacy Policy</a>
            </div>
        </div>
    );
}

export default Signup2;
