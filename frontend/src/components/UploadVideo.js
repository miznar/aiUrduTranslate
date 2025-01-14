import Header from './creamHeader';
import './UploadVideo.css';
import WhiteHeader from './whiteHeader';
import { Link } from 'react-router-dom';

const UploadVideo = () => {
    return (
        <div>
            <WhiteHeader />
            <div className="upload-page">
                <aside className="sidebar">
                    <ul>
                        <li><a href="#faqs">FAQs</a></li>
                        <li><a href="about">About Us</a></li>
                    </ul>
                </aside>
                <main className="upload-content">
                    <h1>Upload Video for Translation</h1>
                    <p>"Drag and Drop your file here, or click to upload"</p>
                    <button className="upload-button">Upload Video</button>
                    <p><small>Supported formats: MP4 | Max size: 10 MB.</small></p>
                    <div className="upload-box">
                        <p>Drag or Drop your video here</p>
                    </div>
                    <div className="progress-bar">
                        <div className="progress"></div>
                    </div>
                    <button className="translate-button">Translate Now</button>
                </main>
            </div>
            {/* Footer */}
            <footer className="footer-user">
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
}

export default UploadVideo;