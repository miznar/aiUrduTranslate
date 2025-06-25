import './Footer2.css';
import { Link } from 'react-router-dom';

const Footer2 = () => {
    return (
        <div>
            <footer className="footer-user">
                <Link to="/privacypage">
                    <div>Privacy</div>
                </Link>
                <Link to="/service">
                    <div>TOS</div>
                </Link>
                <Link to="/about">
                    <div>About</div>
                </Link>
                <div className="footer-logo-placeholder">
                    <div className="footer-circle"></div>
                </div>
                <Link to="/search">
                    <div>Blogs</div>
                </Link>
                <Link to="/discussions">
                    <div>Discussions</div>
                </Link>
                <Link to="/contact">
                    <div>Contact</div>
                </Link>
            </footer>
        </div>
    );
}

export default Footer2;
