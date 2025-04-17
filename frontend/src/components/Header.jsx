import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import '../styles/Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <Link to="/">
            <h1>TravelBuddy</h1>
          </Link>
        </div>

        <div className="mobile-menu-btn" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </div>

        <nav className={`nav ${isMenuOpen ? 'active' : ''}`}>
          <ul>
            <li>
              {isHomePage ? (
                <a href="#home" onClick={closeMenu}>Home</a>
              ) : (
                <Link to="/" onClick={closeMenu}>Home</Link>
              )}
            </li>
            <li>
              {isHomePage ? (
                <a href="#how-it-works" onClick={closeMenu}>How It Works</a>
              ) : (
                <Link to="/#how-it-works" onClick={closeMenu}>How It Works</Link>
              )}
            </li>
            <li>
              {isHomePage ? (
                <a href="#features" onClick={closeMenu}>Features</a>
              ) : (
                <Link to="/#features" onClick={closeMenu}>Features</Link>
              )}
            </li>
            <li>
              {isHomePage ? (
                <a href="#testimonials" onClick={closeMenu}>Testimonials</a>
              ) : (
                <Link to="/#testimonials" onClick={closeMenu}>Testimonials</Link>
              )}
            </li>
            <li>
              <Link to="/signup" className="btn-primary" onClick={closeMenu}>Sign Up</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
