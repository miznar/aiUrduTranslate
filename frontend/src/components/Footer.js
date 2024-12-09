import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Left Section */}
        <div className="footer-left">
          <h2>Empowering Learning, <br /> One Translation at a Time</h2>
          <p>
            Our platform bridges the gap between global educational content <br />
            and Urdu-speaking learners, making knowledge accessible for <br />
            everyone, everywhere.
          </p>
        </div>

        {/* Right Section */}
        <div className="footer-right">
          <div className="footer-item">
            <h2>
              What we offer? <span className="arrow">→</span>
            </h2>
            <p>
              Accurate and context-rich translations for educational content. <br />
              Enhance your learning with tools like vocabulary lists, summaries, and quizzes. <br />
              Education for everyone, from students to seasoned professionals.
            </p>
          </div>
          <div className="footer-item">
            <h2>
              Special Programs <span className="arrow">→</span>
            </h2>
            <p>
              Academic Success: Tailored translations for students at all levels. <br />
              Professional Growth: Expand your skills with translated materials for career advancement. <br />
              Community Learning: Join a network of learners united by a passion for Urdu.
            </p>
          </div>
          <div className="footer-item footer-item-full">
            <h2>
              Stay <br /> Connected <span className="arrow">→</span>
            </h2>
            <p>
              Blog & Updates: Explore the latest developments in translation and education. <br />
              Support & FAQs: Find answers and guidance for using our platform. <br />
              Contact Us: We're here to help you unlock your potential.
            </p>
          </div>
        </div>
      </div>

      {/* Mustard Line */}
      <div className="footer-line"></div>
    </footer>
  );
};

export default Footer;
