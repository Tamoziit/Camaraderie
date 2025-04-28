import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import '../styles/Header.css';
import useLogout from '../hooks/useLogout';
import Spinner from './Spinner';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { loading, logout } = useLogout();
  const isNotAuth = location.pathname === '/' || location.pathname === '/login' || location.pathname === '/signup';

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="logo flex items-center justify-center gap-2">
          <img src="/Logo.png" alt="logo" className='size-8 !-mt-1' />
          <Link to="/">
            <h1>Camaraderie</h1>
          </Link>
        </div>

        <div className="mobile-menu-btn" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </div>

        <nav className={`nav ${isMenuOpen ? 'active' : ''}`}>
          <ul>
            <li>
              {isNotAuth ? (
                <a href="#home" onClick={closeMenu}>Home</a>
              ) : (
                <Link to="/" onClick={closeMenu}>Home</Link>
              )}
            </li>
            <li>
              {isNotAuth ? (
                <a href="#how-it-works" onClick={closeMenu}>How It Works</a>
              ) : (
                <Link to="/#how-it-works" onClick={closeMenu}>How It Works</Link>
              )}
            </li>
            <li>
              {isNotAuth ? (
                <a href="#features" onClick={closeMenu}>Features</a>
              ) : (
                <Link to="/#features" onClick={closeMenu}>Features</Link>
              )}
            </li>
            <li>
              {isNotAuth ? (
                <a href="#testimonials" onClick={closeMenu}>Testimonials</a>
              ) : (
                <Link to="/#testimonials" onClick={closeMenu}>Testimonials</Link>
              )}
            </li>
            {isNotAuth ? (
              <li>
                <Link to="/login" className="btn-primary" onClick={closeMenu}>Login</Link>
              </li>
            ) : (
              <button
                className="btn-primary !ml-3"
                disabled={loading}
                onClick={() => logout()}
              >
                {loading ? <Spinner /> : "Logout"}
              </button>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
