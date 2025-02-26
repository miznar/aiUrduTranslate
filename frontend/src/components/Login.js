import './Login.css';
import { useState } from 'react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null); // Clear previous errors

        try {
            const response = await fetch('http://127.0.0.1:8000/login/', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log("Login Successful:", data);
                localStorage.setItem('token', data.token); // Store token for authentication
                window.location.href = '/'; // Redirect if needed
            } else {
                setError(data.error || 'Invalid credentials');
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
        }
    };

    return (
        <div>
            <h1 className="login-title">Welcome Back</h1>
            {error && <p className="error-message">{error}</p>} {/* Show error if any */}
            <form className="login-form" onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email address*"
                    className="login-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password*"
                    className="login-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                    <img src="/google.jpg" className="icon" alt="Google logo" />
                    Continue with Google
                </button>
                <button className="login-microsoft">
                    <img src="/microsoft.png" alt="Microsoft logo" className="icon" />
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
