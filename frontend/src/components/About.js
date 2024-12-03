import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <h1 className="about-heading">About Us</h1>
      <p className="about-paragraph">
        TranslateAI is a platform dedicated to breaking language barriers in education by providing Urdu translations for global educational content.
      </p>
      <div className="about-buttons">
        <button>Learn More</button>
        <button>Contact Us</button>
      </div>
    </div>
  );
};

export default About;
