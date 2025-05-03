import './Login.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null); // Clear previous errors
        console.log("Email:", email);
        console.log("Password:", password);
        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            setError("Please enter a valid email address.");
            return;
        }
    
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
    
                // Store token and user data in localStorage
                localStorage.setItem("email", data.email);
                localStorage.setItem("access_token", data.access_token); 
                localStorage.setItem("refresh_token", data.refresh_token);                 
                localStorage.setItem('username', data.username); 
                localStorage.setItem('full_name', data.full_name); 
                localStorage.setItem('interests', JSON.stringify(data.interests));
    
                // Navigate to home or dashboard page after successful login
                navigate('/home');
            } else {
                setError(data.error || 'Invalid credentials');
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
        }
    };
    
    
    return (
        <div className="login-container">
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
                Don't have an account? <a href="/signup">Sign Up</a>
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
