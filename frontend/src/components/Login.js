import './Login.css';

const Login = () => {
    return (
            <div >
                <h1 className="login-title">Welcome Back</h1>
                <form className="login-form">
                    <input
                        type="email"
                        placeholder="Email address*"
                        className="login-input"
                        required
                    />
                    <button type="submit" className="login-button">
                        Continue
                    </button>
                </form>
                <p className="login-login">
                    Don't have an account? <a href="/signup">Signup</a>
                </p>
                <div className="login-divider">
                    <hr className="divider-line" />
                    <span> OR </span>
                    <hr className="divider-line" />
                </div>

                <div className="login-alternate">
                    <button className="login-google">
                        <img
                            src="/google.jpg"
                            className="icon"
                        />
                        Continue with Google
                    </button>
                    <button className="login-microsoft">
                        <img
                            src="/microsoft.png"
                            alt="Microsoft logo"
                            className="icon"
                        />
                        Continue with Microsoft Account
                    </button>
                </div>
                <div className="login-footer">
                    <a href="/terms">Terms of Use</a> | <a href="/privacy">Privacy Policy</a>
                </div>
            </div>
    );
};

export default Login;