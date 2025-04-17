import { FaUserFriends, FaMoneyBillWave, FaRoute, FaShieldAlt } from 'react-icons/fa';
import '../styles/Features.css';

const Features = () => {
  const features = [
    {
      icon: <FaUserFriends />,
      title: 'Preference Matching',
      description: 'Our advanced algorithm matches you with travelers who share your interests and travel style.'
    },
    {
      icon: <FaMoneyBillWave />,
      title: 'Budget Compatibility',
      description: 'Find travel companions with similar budget expectations to avoid financial disagreements.'
    },
    {
      icon: <FaRoute />,
      title: 'Itinerary Planning',
      description: 'Create and share itineraries, then find buddies who want to explore the same destinations.'
    },
    {
      icon: <FaShieldAlt />,
      title: 'Verified Profiles',
      description: 'All users are verified for your safety and peace of mind while traveling.'
    }
  ];

  return (
    <section id="features" className="features">
      <div className="container">
        <div className="section-header">
          <h2>Why Choose TravelBuddy?</h2>
          <p>Discover the features that make us the best platform for finding travel companions</p>
        </div>
        
        <div className="features-grid">
          {features.map((feature, index) => (
            <div className="feature-card" key={index}>
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
