import Header from './creamHeader';
import './UploadVideo.css';
import WhiteHeader from './whiteHeader';
import Footer2 from './Footer2';

const UploadVideo = () => {
    return (
        <div>
            <WhiteHeader />
            <div className="upload-page">
                <aside className="sidebar">
                    <ul>
                        <li><a href="faq">FAQs</a></li>
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
            <Footer2 />
        </div>
    );
}

export default UploadVideo;