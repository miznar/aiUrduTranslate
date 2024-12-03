import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <ul className="footer-links">
        <li><a href="/privacy">Privacy Policy</a></li>
        <li><a href="/terms">Terms of Service</a></li>
        <li><a href="/contact">Contact Us</a></li>
      </ul>
      <div className="footer-socials">
        <a href="https://facebook.com">Facebook</a>
        <a href="https://twitter.com">Twitter</a>
        <a href="https://instagram.com">Instagram</a>
      </div>
      <p className="footer-note">
        © 2024 TranslateAI. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
