import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section about">
            <h2>Camaraderie</h2>
            <p>Connecting travelers around the world based on preferences, budgets, and itineraries.</p>
            <div className="contact">
              <p><FaPhone /> &nbsp; +1 234 567 8900</p>
              <p><FaEnvelope /> &nbsp; info@camaraderie.com</p>
              <p><FaMapMarkerAlt /> &nbsp; 123 Travel Street, Adventure City</p>
            </div>
            <div className="socials">
              <a href="#"><FaFacebook /></a>
              <a href="#"><FaTwitter /></a>
              <a href="#"><FaInstagram /></a>
              <a href="#"><FaLinkedin /></a>
            </div>
          </div>
          
          <div className="footer-section links">
            <h2>Quick Links</h2>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#how-it-works">How It Works</a></li>
              <li><a href="#features">Features</a></li>
              <li><a href="#testimonials">Testimonials</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
            </ul>
          </div>
          
          <div className="footer-section newsletter">
            <h2>Subscribe to Our Newsletter</h2>
            <p>Stay updated with our latest features and travel tips.</p>
            <form>
              <input type="email" placeholder="Enter your email" required />
              <button type="submit" className="btn-subscribe">Subscribe</button>
            </form>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Camaraderie | All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
