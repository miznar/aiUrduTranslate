import React from 'react';
import './Questions.css';
import WhiteHeader from './whiteHeader';
import LastContainer from './lastContainer';
import Footer from './Footer';

const Question = () => {
    return (
        <div>
            <WhiteHeader />
            <div className="faq-page-container">
                <h1 className="faq-title">
                    <ul className="faq-list">
                        <li>Frequently Asked Questions</li>
                    </ul>
                </h1>
                <p className="faq-description">
                    This page answers some frequently asked questions (FAQ) about getting started at Harvard Extension School.
                </p>
            </div>
            <div className="faq-contact">
                <p>Don’t see the answer to your question? <a href="contact-us-link">Contact Us</a></p>
            </div>
            
            <div className="boxes-container">
                <div className="white-box"></div>
                <div className="white-box"></div>
            </div>

            <LastContainer />
            <Footer />
        </div>
    );
};

export default Question;
