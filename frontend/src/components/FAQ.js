import './FAQ.css';
import React, { useState, useEffect } from "react";
import Header from './creamHeader';
import LastContainer from './lastContainer';
import Footer from './Footer';

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);
    const [faqs, setFaqs] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/faqs/")  
            .then((res) => res.json())
            .then((data) => setFaqs(data))
            .catch((error) => console.error("Error fetching FAQs:", error));
    }, []);

    const toggleAnswer = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div>
            <Header />
            <div className="faq-page">
                <div className="faq-header">
                    <h1>Frequently Asked Questions</h1>
                    <p>
                        This page answers some frequently asked questions (FAQ) about getting
                        started with our platform.
                    </p>
                    <p>
                        Don’t see the answer to your question?{" "}
                        <a href="/contact" className="contact-link">
                            Contact Us
                        </a>
                    </p>
                </div>

                <div className="faq-list">
                    {faqs.length > 0 ? (
                        faqs.map((faq, index) => (
                            <div
                                key={faq.id || index}
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
                        ))
                    ) : (
                        <p className="loading-text">Loading FAQs...</p>
                    )}
                </div>
            </div>
            <LastContainer />
            <Footer />
        </div>
    );
};

export default FAQ;
