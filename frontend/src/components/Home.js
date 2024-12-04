import React from 'react';
import './Home.css';
import Header from './Header';
import Footer from './Footer';

const Home = () => {
  return (
    <div>
      <Header />
      <section class="hero-section">
        <h1>
            Breaking Language Barriers
            <span>for Education</span>
        </h1>
        <h2>Where language meets Innovation</h2>
        <p class="intro-text">
            Step into a world of accessible learning. Bridge the gap <br />
            between language and education, one video at a time.
        </p>
        <div class="underline"></div>
</section>
<section class="hero-buttons">
  <div class="button-row">
    <button class="custom-button">
      <span class="button-text">Subjects</span>
      <span class="arrow">→</span>
    </button>
    <button class="custom-button">
      <span class="button-text">Upload Video and Start</span>
      <span class="arrow">→</span>
    </button>
  </div>
  <div class="button-row">
    <button class="custom-button">
      <span class="button-text">Explore All</span>
      <span class="arrow">→</span>
    </button>
  </div>
</section>

<section class="right-text-section">
  An Education That Speaks Your Language
</section>
<section className="subtext-section">
  At the intersection of innovation and accessibility, <br />
  we bring the world’s best educational content to Urdu-speaking learners.
</section>
<div class="feature-container">
  <div class="feature">
    <div class="feature-description">
      <h3>Learning for Everyone, Everywhere</h3>
      <p>Our platform eliminates language barriers, ensuring anyone, anywhere, can engage <br />
      with world-class educational content — translated into Urdu with precision and care.</p>

    </div>
    <div class="feature-word">Access</div>
  </div>
  
  <div class="feature">
    <div class="feature-description">
      <h3>Built for Excellence, Designed for You</h3>
      <p>Powered by advanced AI and expert insights, our translations capture not just <br />
      words but the essence of learning. Experience unmatched clarity and accuracy.</p>

    </div>
    <div class="feature-word">Quality</div>
  </div>

  <div class="feature">
    <div class="feature-description">
      <h3>Learning That Fits Your Life</h3>
      <p>Whether you're a student, a professional, or a lifelong learner, our platform <br />
      adapts to your schedule. Learn at your own pace, on your own terms.</p>
    </div>
    <div class="feature-word">Flexibility</div>
  </div>

  <div class="feature">
    <div class="feature-description">
      <h3>Empower Your Journey</h3>
      <p>Gain access to transformative knowledge and skills in your native language. <br />
      Empower yourself to succeed, inspire others, and shape a brighter future.</p>

    </div>
    <div class="feature-word">Impact</div>
  </div>
</div>

<div class="white-container">
  <div class="mustard-line"></div>
  <p>Main content of the container</p>
  <p class="additional-text">- Dr. Sana Shams</p>
  <p class="second-text">Principle Manager at CLE, KICKS, UET, Lahore</p>
  <button class="team-button">About Our Team</button>
</div>

      <Footer />
    </div>
    
  );
};

export default Home;
