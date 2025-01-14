import './PrivacyPage.css';
import Header from './creamHeader';
import Footer2 from './Footer2';
import React from "react";
import { useNavigate } from "react-router-dom";

const PrivacyPage = () => {
    const navigate = useNavigate();
    return (
        <div>
            <Header />
            <div className="tos-container">
                <div className="tabs">
                    <button className="tab active" onClick={() => navigate("/privacypage")}>Privacy Policy</button>
                    <button className="tab" onClick={() => navigate("/service")}>TOS</button>
                </div>
                <div className="content">
                    <h1>1. Introduction</h1>
                    <p>
                        Welcome to Urdu Faham! We are committed to protecting your personal
                        information and your right to privacy. If you have any questions or
                        concerns about this policy, please contact us.
                    </p>

                    <h1>2. Information We Collect</h1>
                    <h2>Personal Information:</h2>
                    <p>
                        When you create an account, we may collect personal information such
                        as your name, email address, and preferences.
                    </p>
                    <h2>Uploaded Content:</h2>
                    <p>
                        When you upload videos for translation, we process the files solely
                        for the purpose of providing the requested service. We do not retain
                        or share your files beyond what is necessary to complete the
                        translation.
                    </p>
                    <h2>Usage Data:</h2>
                    <p>
                        We may collect information about how you interact with our website,
                        such as pages visited, actions taken, and timestamps, to improve our
                        service.
                    </p>

                    <h1>3. How We Use Your Information</h1>
                    <p>
                        The data we collect is used to:
                        <ul>
                            <li>Provide and improve the translation services.</li>
                            <li>Communicate with you regarding updates or support.</li>
                            <li>
                                Enhance user experience and ensure the security of our platform.
                            </li>
                        </ul>
                    </p>

                    <h1>4. Data Security</h1>
                    <p>
                        We prioritize the security of your data. Measures such as encryption,
                        secure servers, and restricted access ensure your information remains
                        confidential. However, no online platform can guarantee complete
                        security.
                    </p>

                    <h1>5. Data Sharing</h1>
                    <p>
                        We do not share your personal data or uploaded files with third
                        parties, except:
                        <ul>
                            <li>To comply with legal obligations.</li>
                            <li>
                                To protect the rights or safety of Urdu Faham and its users.
                            </li>
                        </ul>
                    </p>

                    <h1>6. Retention of Data</h1>
                    <p>
                        Uploaded files are stored temporarily to complete translations and are
                        deleted from our servers after 2 days. Personal data is retained only
                        as long as necessary for the purposes outlined in this policy.
                    </p>

                    <h1>7. Cookies and Tracking Technologies</h1>
                    <p>
                        We use cookies and similar technologies to enhance your browsing
                        experience. You can manage your cookie preferences through your
                        browser settings.
                    </p>

                    <h1>8. User Rights</h1>
                    <p>
                        You have the right to:
                        <ul>
                            <li>Access your data.</li>
                            <li>Request deletion of your account and personal data.</li>
                            <li>Opt-out of marketing communications.</li>
                        </ul>
                    </p>

                    <h1>9. Changes to the Policy</h1>
                    <p>
                        We may update this privacy policy from time to time. Changes will be
                        communicated via email or a notice on our website.
                    </p>
                </div>
            </div>
            <Footer2 />
        </div>
    );
}

export default PrivacyPage;