import { FaUserPlus, FaSearch, FaComments, FaSuitcase } from 'react-icons/fa';
import '../styles/HowItWorks.css';

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaUserPlus />,
      title: 'Create Your Profile',
      description: 'Sign up and build your travel profile with your preferences, interests, and travel style.'
    },
    {
      icon: <FaSearch />,
      title: 'Find Matches',
      description: 'Our algorithm will suggest compatible travel buddies based on your preferences and planned trips.'
    },
    {
      icon: <FaComments />,
      title: 'Connect & Plan',
      description: 'Chat with your matches, discuss details, and plan your perfect trip together.'
    },
    {
      icon: <FaSuitcase />,
      title: 'Travel Together',
      description: 'Embark on your journey with your new travel buddy and create unforgettable memories.'
    }
  ];

  return (
    <section id="how-it-works" className="how-it-works">
      <div className="container">
        <div className="section-header">
          <h2>How TravelBuddy Works</h2>
          <p>Finding your perfect travel companion is easy with our simple 4-step process</p>
        </div>
        
        <div className="steps-container">
          {steps.map((step, index) => (
            <div className="step" key={index}>
              <div className="step-number">{index + 1}</div>
              <div className="step-icon">{step.icon}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
