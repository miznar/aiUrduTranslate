import './Signup.css';
import Signup2 from './Signup-pg2';

const Signup = () => {
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
                    <button type="submit" className="signup-button">
                        Continue
                    </button>
                </form>
                <p className="signup-login">
                    Already have an account? <a href="/login">Login</a>
                </p>
                <div className="signup-divider">
                    <hr className="divider-line" />
                    <span> OR </span>
                    <hr className="divider-line" />
                </div>

                <div className="signup-alternate">
                    <button className="signup-google">
                        <img
                            src="/google.jpg"
                            className="icon"
                        />
                        Continue with Google
                    </button>
                    <button className="signup-microsoft">
                        <img
                            src="/microsoft.png"
                            alt="Microsoft logo"
                            className="icon"
                        />
                        Continue with Microsoft Account
                    </button>
                </div>
                <div className="signup-footer">
                    <a href="/service">Terms of Use</a> | <a href="/privacypage">Privacy Policy</a>
                </div>
            </div>
    );
};

export default Signup;