import './Contact-us.css';
import Header from './creamHeader';
import Footer from './Footer';
import LastContainer from './lastContainer';
import { useNavigate } from "react-router-dom";

const Contact = () => {
    const navigate = useNavigate();
    return (
        <div>
            <Header />
            <div className="contact-container">
                {/* Contact Header Section */}
                <div className="contact-header">
                    <h1>Contact Us</h1>
                    <h2>Need Assistance? We’re Here to Help!</h2>
                    <p>Reach Out to Us</p>
                    <h6>Share your contact information and area of issue so <br></br> we can follow up with you.</h6>
                    <button 
                        className="contact-button" 
                        onClick={() => navigate("/query")}
                        >
                        Get In Touch
                        </button>

                </div>

                {/* Connect with Team */}
                <div className="connect-team">
                    <div className="team-header">
                        <h2>Connect with our Team!</h2>
                        <p>Get in touch through email</p>
                    </div>
                </div>

                    {/* Contact Options */}
                    <div className="contact-options">
                        <div className="contact-option">
                            <span className="bullet">●</span>
                            <div>
                                <h3>Phone</h3>
                                <p>Our phone number detail will come here</p>
                            </div>
                        </div>
                        <div className="contact-option2">
                            <span className="bullet">●</span>
                            <div>
                                <h3>Email</h3>
                                <p>We respond back to all emails sent to the following accounts within 2-3 business days:</p>
                                <p>Our email detail will come here</p>
                            </div>
                        </div>
                    </div>
                

                {/* FAQ Section */}
                <div className="faq-section">
                    <h3>
                        <span className="faq-highlight">Got questions?</span> We’re here to assist with everything
                        you need—whether it’s about creating an account, exploring translation options, accessing tools,
                        understanding features, or using resources for registered users. Whatever your query, we’ve got you
                        covered!
                    </h3>
                    <h1 className= "faq-heading">
                        Frequently Asked Questions
                    </h1>
                    <button className="faq-button" onClick={() => navigate('/faq')}>
                        View Here
                    </button>
                </div>
            </div>

            <LastContainer />
            <Footer />
        </div>
    );
}

export default Contact; 