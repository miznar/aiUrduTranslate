import React from "react";
import "./unregister_User.css";

const Unregister_User = () => {
  return (
    <div className="homepage">
      <header className="navbar">
        <div className="logo">Translate AI</div>
        <nav className="nav-links">
          <a href="#how-it-works">How It Works</a>
          <a href="#about">About Us</a>
          <a href="#contact">Contact Us</a>
        </nav>
        <div className="nav-actions">
          <button className="lang-toggle">EN</button>
          <button className="login">Log In</button>
          <button className="signup">Sign Up</button>
        </div>
      </header>

      <main className="content">
        <h1>Breaking Language Barriers for Education</h1>
        <h2>Where language meets innovation</h2>
        <p>
          Step into a world of accessible learning. Bridge the gap between
          language and education, one video at a time.
        </p>
        <hr />

        <div className="cards">
          <div className="card">
            <h3>Subjects</h3>
            <a href="#subjects">→</a>
          </div>
          <div className="card">
            <h3>Upload Video and Start</h3>
            <a href="#upload">→</a>
          </div>
          <div className="card">
            <h3>Explore All</h3>
            <a href="#explore">→</a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Unregister_User;
