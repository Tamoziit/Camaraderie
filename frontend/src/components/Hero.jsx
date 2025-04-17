import { Link } from 'react-router-dom';
import { FaSearch, FaMapMarkerAlt, FaUserFriends, FaUserPlus } from 'react-icons/fa';
import '../styles/Hero.css';

const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <h1>Find Your Perfect Travel Companion</h1>
        <p>Match with like-minded travelers based on your preferences, budget, and itineraries</p>

        <div className="search-container">
          <div className="search-box">
            <div className="search-input">
              <FaMapMarkerAlt className="icon" />
              <input type="text" placeholder="Where do you want to go?" />
            </div>

            <div className="search-input">
              <FaUserFriends className="icon" />
              <select>
                <option value="">Travel Preferences</option>
                <option value="adventure">Adventure</option>
                <option value="relaxation">Relaxation</option>
                <option value="culture">Cultural Experience</option>
                <option value="food">Food Tourism</option>
              </select>
            </div>

            <button className="search-btn">
              <FaSearch /> Find Buddies
            </button>
          </div>

          <div className="hero-cta">
            <Link to="/signup" className="btn-signup">
              <FaUserPlus /> Create Your Account
            </Link>
          </div>
        </div>

        <div className="hero-stats">
          <div className="stat">
            <h3>10,000+</h3>
            <p>Travel Buddies</p>
          </div>
          <div className="stat">
            <h3>10+</h3>
            <p>Countries</p>
          </div>
          <div className="stat">
            <h3>95%</h3>
            <p>Match Rate</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
