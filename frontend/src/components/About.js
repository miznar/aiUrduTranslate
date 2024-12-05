<<<<<<< HEAD
import './About.css';
import Header from './Header';
import Footer from './Footer';
=======
import React from 'react';
>>>>>>> b1d0049bc32db985417a26cd2682e86011da5642

const About = () => {
  return (
    <div>
<<<<<<< HEAD
      <Header />

      {/* Video Section */}
      <div className="about-video">
        <video
          width="100%"
          height="auto"
          autoPlay
          loop
          muted
          playsInline
          controls={false} // This removes the controls (time, pause/play, etc.)
        >
          <source src="/videos/about-us.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* About Us */}
      <div className="about-content">
        <div className="about-text">
          <h2>About Us</h2>
          <p>
            Welcome to TranslateAI, where we bridge the gap between language and learning.
            Our mission is to empower Urdu-speaking students and educators by translating
            educational video lectures into Urdu, making knowledge accessible to everyone.
          </p>
          <p>
            Our platform leverages cutting-edge AI technology to ensure that each translation is
            accurate, contextually relevant, and easy to understand. Whether you're a student eager
            to learn or a teacher looking to enhance your lessons, TranslateAI offers a seamless
            experience that helps bridge the language divide.
          </p>
        </div>

        <div className="about-image">
          <img src="/trans.png" alt="About Us" />
        </div>
      </div>

      {/* Mission section */}
      <div class="mission-heading" >
      <section class="mission-container">
        <div class="mission-heading">
          <h2>Our Mission</h2>
        </div>
        <div class="mission-text">
          <p>"To eliminate language barriers in education by leveraging cutting-edge AI and
            machine learning technologies for precise and meaningful translations."</p>
          <div>
            <div className="about-buttons">
              <button>Learn More</button>
              <button>Contact Us</button>
            </div>
          </div>
        </div>
      </section>
      </div>


      <div>
        <section class="why-choose-us">
          <h2>Why Choose Us?</h2>
          <ul>
            <li><strong>Advanced AI-driven translation</strong> for accuracy and cultural relevance.</li>
            <li><strong>Comprehensive support</strong> for various educational fields.</li>
            <li><strong>A focus on inclusivity and accessibility</strong> for Urdu speakers.</li>
            <li><strong>Highly reliable</strong> and efficient translation models ensuring high-quality results.</li>
            <li><strong>Continuous improvements</strong> through feedback and advanced AI techniques.</li>
          </ul>
        </section>
      </div>
      <Footer />
=======
      <h1>About Our Team</h1>
      <p>Details about the team go here.</p>
>>>>>>> b1d0049bc32db985417a26cd2682e86011da5642
    </div>
  );
};

export default About;
