import {
  FaPinterestSquare,
  FaInstagram,
  FaTwitter,
  FaFacebookSquare,
} from "react-icons/fa";

import "./index.css";

const Footer = () => (
  <footer className="footer-section">
    <div className="footer-content">
      <div className="logo-container">
        <img
          src="https://res.cloudinary.com/daehuqvdc/image/upload/v1731820394/Frame_275_iwv8gh.png"
          alt="website-footer-logo"
          className="footer-logo"
        />
        <h1 className="footer-heading">ShopVerse</h1>
      </div>

      <p className="footer-description">
        The only thing we are serious about is your satisfaction.
        <br />
        <span className="contact-text">Contact us on social media</span>
      </p>

      <div className="social-icons-container">
        <a href="https://pinterest.com" target="_blank" rel="noreferrer">
          <FaPinterestSquare className="social-icon" />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noreferrer">
          <FaInstagram className="social-icon" />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noreferrer">
          <FaTwitter className="social-icon" />
        </a>
        <a href="https://facebook.com" target="_blank" rel="noreferrer">
          <FaFacebookSquare className="social-icon" />
        </a>
      </div>

      <div className="footer-bottom">
        <hr className="footer-divider" />
        <p className="copyright-text">© 2026 ShopVerse. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
