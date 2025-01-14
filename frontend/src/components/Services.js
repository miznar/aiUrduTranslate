import './Services.css';
import Header from './creamHeader';
import Footer2 from './Footer2';
import React from "react";
import { useNavigate } from "react-router-dom";

const Services = () => {
    const navigate = useNavigate();
    return (
        <div>
            <Header />
            <div className="tos-container">
                <div className="tabs">
                    <button
                        className="tab"
                        onClick={() => (window.location.href = "/privacypage")}
                    >
                        Privacy Policy
                    </button>
                    <button
                        className="tab active"
                        onClick={() => (window.location.href = "/service")}
                    >
                        TOS
                    </button>
                </div>
                <h1>Terms of Service</h1>
                <div className="section">
                    <h2>1. Introduction</h2>
                    <p>
                        Welcome to Urdu Faham. By accessing or using our platform, you agree
                        to comply with and be bound by these Terms of Service. If you do not
                        agree to these terms, please do not use our services.
                    </p>
                </div>
                <div className="section">
                    <h2>2. Eligibility</h2>
                    <p>
                        You must be 13 years old to use this platform. By using TranslateAI,
                        you represent that you meet this eligibility requirement.
                    </p>
                </div>
                <div className="section">
                    <h2>3. Use of the Service</h2>
                    <p>You may use the service only for lawful purposes. Prohibited uses:</p>
                    <p>• Uploading harmful, offensive, or illegal content.</p>
                    <p>• Interfering with the platform’s functionality.</p>
                </div>
                <div className="section">
                    <h2>4. User Accounts</h2>
                    <p>You are responsible for:</p>
                    <p>• Maintaining the confidentiality of your account.</p>
                    <p>• All activities under your account.</p>
                </div>
                <div className="section">
                    <h2>5. Uploading Content</h2>
                    <p>
                        When uploading videos, you grant us a limited license to process the
                        files for translation.
                    </p>
                </div>
                <div className="section">
                    <h2>6. Intellectual Property</h2>
                    <p>
                        We provide services "as is" and make no warranties about
                        uninterrupted service.
                    </p>
                </div>
                <div className="section">
                    <h2>7. Limitation of Liability</h2>
                    <p>
                        We are not liable for damages arising from the use or inability to
                        use the platform.
                    </p>
                </div>
                <div className="section">
                    <h2>8. Termination</h2>
                    <p>
                        We reserve the right to suspend or terminate access at our discretion.
                    </p>
                </div>
                <div className="section">
                    <h2>9. Changes to Terms</h2>
                    <p>
                        We may update these terms periodically, and continued use constitutes
                        acceptance of the changes.
                    </p>
                </div>
            </div>
            <Footer2 />
        </div>

    );
}

export default Services;