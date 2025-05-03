import './Query.css';
import Header from './creamHeader';
import LastContainer from './lastContainer';
import Footer from './Footer';
import { useState } from 'react';

const Query = () => {
    const [formData, setFormData] = useState({
        area_of_issue: '',
        first_name: '',
        last_name: '',
        email: '',
        issue_detail: ''  

    });

    const [submitStatus, setSubmitStatus] = useState(null); // success or error

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://127.0.0.1:8000/user-query/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSubmitStatus('success');
                setFormData({
                    area_of_issue: '',
                    first_name: '',
                    last_name: '',
                    email: '',
                    issue_detail: ''
                });
            } else {
                setSubmitStatus('error');
            }
        } catch (error) {
            setSubmitStatus('error');
        }
    };

    return (
        <div>
            <Header />
            <div className="contact-form-container">
                <div className="form-content">
                    <h5> <span className="highlight">Have Questions? </span> We’re Here to Assist! </h5>
                    <p>
                        If you're curious about our features, tools, or translation<br /> services, our dedicated team is ready to guide you every step of the way.
                    </p>
                    <h3>Let’s Personalize Your Experience!</h3>
                    <p>
                        Write down the topics you care about, and we’ll make sure you only hear about what truly matters to you.
                    </p>

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="area-issue">Area of Issue <span>*</span></label>
                            <select
                                id="area-issue"
                                name="area_of_issue"
                                value={formData.area_of_issue}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Please Select</option>
                                <option value="feature">Feature</option>
                                <option value="bug">Bug</option>
                                <option value="feedback">Feedback</option>
                            </select>
                            <span className="required-message">Please enter this required field.</span>
                        </div>

                        <div className="form-group">
                            <label htmlFor="first-name">First Name <span>*</span></label>
                            <input
                                type="text"
                                id="first-name"
                                name="first_name"
                                value={formData.first_name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="last-name">Last Name <span>*</span></label>
                            <input
                                type="text"
                                id="last-name"
                                name="last_name"
                                value={formData.last_name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email <span>*</span></label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="issue">What exact issue are you facing while using our application? <span>*</span></label>
                            <input
                                type="text"
                                id="issue_detail"
                                name="issue_detail"
                                value={formData.issue_detail}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="submit-circle-container">
                            <button type="submit" className="submit-circle">Submit</button>
                        </div>
                    </form>

                    {submitStatus === 'success' && <p style={{ color: 'green', marginTop: '10px' }}>Thank you! Your query has been submitted.</p>}
                    {submitStatus === 'error' && <p style={{ color: 'red', marginTop: '10px' }}>Oops! Something went wrong. Please try again.</p>}
                </div>

                <div className="image-section">
                    <div className="image-placeholder">An image will come here</div>
                </div>
            </div>

            <LastContainer />
            <Footer />
        </div>
    );
};

export default Query;
