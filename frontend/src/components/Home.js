import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Home.css';
import Header from './Header';
import Footer from './Footer';
import LastContainer from './lastContainer';

const Home = () => {
  return (
    <div>
      <Header />
      <section className="hero-section">
        <h1>
            Breaking Language Barriers
            <span>for Education</span>
        </h1>
        <h2>Where language meets Innovation</h2>
        <p className="intro-text">
            Step into a world of accessible learning. Bridge the gap <br />
            between language and education, one video at a time.
        </p>
        <div className="underline"></div>
      </section>
      
      <section className="hero-buttons">
        <div className="button-row">
          <button className="custom-button">
            <span className="button-text">Subjects</span>
            <span className="arrow">→</span>
          </button>
          <button className="custom-button">
            <span className="button-text">Upload Video and Start</span>
            <span className="arrow">→</span>
          </button>
        </div>
        <div className="button-row">
          <button className="custom-button">
            <span className="button-text">Explore All</span>
            <span className="arrow">→</span>
          </button>
        </div>
      </section>

      <section className="right-text-section">
        An Education That Speaks Your Language
      </section>
      <section className="subtext-section">
        At the intersection of innovation and accessibility, <br />
        we bring the world’s best educational content to Urdu-speaking learners.
      </section>

      <div className="feature-container">
        <div className="feature">
          <div className="feature-description">
            <h3>Learning for Everyone, Everywhere</h3>
            <p>Our platform eliminates language barriers, ensuring anyone, anywhere, can engage <br />
            with world-class educational content — translated into Urdu with precision and care.</p>
          </div>
          <div className="feature-word">Access</div>
        </div>

        <div className="feature">
          <div className="feature-description">
            <h3>Built for Excellence, Designed for You</h3>
            <p>Powered by advanced AI and expert insights, our translations capture not just <br />
            words but the essence of learning. Experience unmatched clarity and accuracy.</p>
          </div>
          <div className="feature-word">Quality</div>
        </div>

        <div className="feature">
          <div className="feature-description">
            <h3>Learning That Fits Your Life</h3>
            <p>Whether you're a student, a professional, or a lifelong learner, our platform <br />
            adapts to your schedule. Learn at your own pace, on your own terms.</p>
          </div>
          <div className="feature-word">Flexibility</div>
        </div>

        <div className="feature">
          <div className="feature-description">
            <h3>Empower Your Journey</h3>
            <p>Gain access to transformative knowledge and skills in your native language. <br />
            Empower yourself to succeed, inspire others, and shape a brighter future.</p>
          </div>
          <div className="feature-word">Impact</div>
        </div>
      </div>

      <div className="white-container">
        <div className="mustard-line"></div>
        <p>Main content of the container</p>
        <p className="additional-text">- Dr. Sana Shams</p>
        <p className="second-text">Principle Manager at CLE, KICKS, UET, Lahore</p>

        {/* Link to navigate to About page */}
        <Link to="/about">
          <button className="team-button">About Our Team</button>
        </Link>
      </div>
      <div class="new-container">
        <h1>
      Detailed lecture summaries
      </h1>
        <h2>Translated Lectures
      </h2>
        <h3> Interactive multiple-choice questions</h3>
      </div>
      <div className="centered-container">
        {/* Your content goes here */}
        <h2>What Sets Us Apart?</h2>
        <p>Discover the power of learning without boundaries through the experiences of our community.<br />
        Explore why learners choose our platform — whether it's our cutting-edge AI-driven translations, <br />
        the global reach of educational content, or the life-changing opportunities for Urdu-speaking students. </p>
        <button>Hear from our learners</button>

      </div>
      <LastContainer />

      <Footer />
    </div>
  );
};

export default Home;
