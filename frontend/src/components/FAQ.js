import './FAQ.css';
import React, { useState } from "react";
import Header from './creamHeader';
import LastContainer from './lastContainer';
import Footer from './Footer';


const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAnswer = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const faqs = [
        { question: "Question 01?", answer: "This is the answer to question 01." },
        { question: "Question 02?", answer: "This is the answer to question 02." },
    ];
    return (
        <div>
            <Header />
            <div className="faq-page">
            {/* <aside className="sidebar">
                    <ul>
                        <li><a href="faq">FAQs</a></li>
                        <li><a href="about">About Us</a></li>
                    </ul>
                </aside> */}
                <div className="faq-header">
                    <h1>Frequently Asked Questions</h1>
                    <p>
                        This page answers some frequently asked questions (FAQ) about getting
                        started at Harvard Extension School.
                    </p>
                    <p>
                        Don’t see the answer to your question?{" "}
                        <a href="/contact" className="contact-link">
                            Contact Us
                        </a>
                    </p>
                </div>

                <div className="faq-list">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`faq-item ${activeIndex === index ? "active" : ""}`}
                        >
                            <div className="faq-question" onClick={() => toggleAnswer(index)}>
                                <span className="faqicon">
                                    {activeIndex === index ? "-" : "+"}
                                </span>
                                {faq.question}
                            </div>
                            {activeIndex === index && (
                                <div className="faq-answer">{faq.answer}</div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <LastContainer />
            <Footer />
        </div>
    );
}

export default FAQ;