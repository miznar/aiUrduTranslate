import './About.css';
import WhiteHeader from './whiteHeader';
import Footer from './Footer';
import LastContainer from './lastContainer';
import { useState } from 'react';

const About = () => {
  const [story, setStory] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!story.trim()) {
      setMessage('Please write your story before submitting.');
      return;
    }

    const token = localStorage.getItem('access_token') || localStorage.getItem('token'); 
    const email = localStorage.getItem('email');

    const headers = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = token.startsWith('Bearer') ? token : `Bearer ${token}`;
    }
    try {
      const response = await fetch('http://127.0.0.1:8000/learner-story/', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          story,
          email: email || null,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Your story has been successfully submitted!');
        setStory('');
      } else {
        setMessage(`Error: ${data.error || 'Something went wrong'}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <WhiteHeader />
      <div className="about-us">
        <h1 className="main-heading">About Us</h1>
        <p className="tagline">
          "Connecting Knowledge, Cultures, and Communities Through Language."
        </p>

        <div className="image-container">
          <div className="image-box"></div>
          <div className="image-box"></div>
          <div className="image-box"></div>
        </div>

        <div className="content-container">
          <div className="section white-box">
            <h2 className="section-heading">Who We Are?</h2>
            <p className="section-text">
              "We’re dreamers, doers, and problem-solvers.
              <br />
              <strong> Our mission?</strong> To ensure that language is no longer a barrier to education. By translating English educational content into Urdu, we’re opening doors for millions of learners to connect with world-class knowledge, wherever they are."
            </p>
          </div>

          <div className="section white-box">
            <h2 className="section-heading">Our Why</h2>
            <p className="section-text">
              <strong>Why did we start this journey? </strong>
              <br />
              Because we believe every learner, regardless of language or location, deserves access to the same opportunities.
              Because education is not just information—it's empowerment, and no one should be left behind."
            </p>
          </div>
        </div>

        <div className="video-container">
          <div className="video-placeholder">here comes the video</div>
        </div>

        <div className="section white-box">
          <h2 className="bigpicture-heading">The Big Picture</h2>
          <p className="section-text">
            We envision a future where language differences no longer stand in the way of academic excellence. With every translated lecture, we’re not just breaking linguistic barriers—we’re building educational bridges.
          </p>
        </div>

        <div className="what-sets-us-apart">
          <h2>What Sets Us Apart?</h2>
          <div className="apart-item">
            <h3>1. Focused on Educational Impact</h3>
            <p>We don’t just translate—we localize learning for Urdu-speaking students.</p>
          </div>
          <div className="apart-item">
            <h3>2. Powered by Technology</h3>
            <p>Using large language models to ensure quality and context-aware translations.</p>
          </div>
          <div className="apart-item">
            <h3>3. Cultural Sensitivity</h3>
            <p>We respect and integrate cultural nuances to improve student connection.</p>
          </div>
        </div>

        <div className="voices-container">
          <h2>Voices of Learners</h2>
          <div className="quotes-section">
            <div className="quote-item">
              <img
                className="profile-picture"
                src="https://via.placeholder.com/100"
                alt="User"
              />
              <p>
                “I never thought I’d understand such complex topics until I found content in Urdu. Thank you!”
              </p>
            </div>
            <div className="quote-item">
              <img
                className="profile-picture"
                src="https://via.placeholder.com/100"
                alt="User"
              />
              <p>
                “This has truly changed the way I learn. No more struggling with unfamiliar terms.”
              </p>
            </div>
          </div>
        </div>

        <div className="education-section">
          <h3>What Drives You?</h3>
          <form onSubmit={handleSubmit}>
            <textarea
              className="education-textarea"
              placeholder="Tell us how this helped you..."
              value={story}
              onChange={(e) => setStory(e.target.value)}
            />
            <br />
            <button className="submit-learner-story-btn" type="submit">
              Submit
            </button>
          </form>
          {message && <p style={{ color: 'green', marginTop: '10px' }}>{message}</p>}
        </div>
      </div>
      <LastContainer />
      <Footer />
    </div>
  );
};

export default About;
