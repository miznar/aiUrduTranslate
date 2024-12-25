import './Query.css';
import WhiteHeader from './whiteHeader';
import LastContainer from './lastContainer';
import Footer from './Footer';


const Query = () => {
    return (
        <div>
            <WhiteHeader />
            <div class="contact-form-container">
                <div class="form-content">
                    <h5> <span className="highlight">Have Questions? </span> We’re Here to Assist! </h5>
                    <p>
                        If you're curious about our features, tools, or translation<br></br> services, our dedicated team is ready to guide you every step of the way.
                    </p>
                    <h3>Let’s Personalize Your Experience!</h3>
                    <p>
                        Write down the topics you care about, and we’ll make sure you only hear about what truly matters to you.
                    </p>

                    <form>
                        <div class="form-group">
                            <label for="area-issue">Area of Issue <span>*</span></label>
                            <select id="area-issue" name="area-issue" required>
                                <option value="">Please Select</option>
                                <option value="feature">Feature</option>
                                <option value="bug">Bug</option>
                                <option value="feedback">Feedback</option>
                            </select>
                            <span class="required-message">Please enter this required field.</span>
                        </div>

                        <div class="form-group">
                            <label for="first-name">First Name <span>*</span></label>
                            <input type="text" id="first-name" name="first-name" required />
                        </div>

                        <div class="form-group">
                            <label for="last-name">Last Name <span>*</span></label>
                            <input type="text" id="last-name" name="last-name" required />
                        </div>

                        <div class="form-group">
                            <label for="email">Email <span>*</span></label>
                            <input type="email" id="email" name="email" required />
                        </div>

                        <div class="form-group">
                            <label for="issue">What exact issue are you facing while using our application? <span>*</span></label>
                            <input type="text" id="issue" name="issue" required />
                        </div>
                    </form>
                    <div className="submit-circle-container">
                        <div className="submit-circle">Submit</div>
                    </div>
                </div>

                <div class="image-section">
                    <div class="image-placeholder">An image will come here</div>
                </div>
            </div>

            <LastContainer />
            <Footer />
        </div>
    );
}

export default Query;