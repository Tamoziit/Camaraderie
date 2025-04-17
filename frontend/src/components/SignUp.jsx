import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaGlobe, FaMoneyBillWave } from 'react-icons/fa';
import '../styles/SignUp.css';

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    travelPreferences: [],
    budgetRange: '',
    agreeToTerms: false
  });

  const [errors, setErrors] = useState({});

  const travelPreferenceOptions = [
    { id: 'adventure', label: 'Adventure' },
    { id: 'relaxation', label: 'Relaxation' },
    { id: 'culture', label: 'Cultural Experience' },
    { id: 'food', label: 'Food Tourism' },
    { id: 'nature', label: 'Nature & Wildlife' },
    { id: 'city', label: 'City Exploration' }
  ];

  const budgetOptions = [
    { id: 'budget', label: 'Budget ($0-$50/day)' },
    { id: 'moderate', label: 'Moderate ($50-$150/day)' },
    { id: 'luxury', label: 'Luxury ($150+/day)' }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      if (name === 'agreeToTerms') {
        setFormData({ ...formData, [name]: checked });
      } else {
        // Handle travel preferences checkboxes
        const updatedPreferences = [...formData.travelPreferences];
        if (checked) {
          updatedPreferences.push(value);
        } else {
          const index = updatedPreferences.indexOf(value);
          if (index > -1) {
            updatedPreferences.splice(index, 1);
          }
        }
        setFormData({ ...formData, travelPreferences: updatedPreferences });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Validate full name
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    // Validate password
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    // Validate confirm password
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    // Validate travel preferences
    if (formData.travelPreferences.length === 0) {
      newErrors.travelPreferences = 'Please select at least one travel preference';
    }
    
    // Validate budget range
    if (!formData.budgetRange) {
      newErrors.budgetRange = 'Please select your budget range';
    }
    
    // Validate terms agreement
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Form is valid, proceed with submission
      console.log('Form submitted:', formData);
      // Here you would typically send the data to your backend
      alert('Sign up successful! Welcome to TravelBuddy!');
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-content">
        <div className="signup-header">
          <h1>Join TravelBuddy</h1>
          <p>Create your account and start finding your perfect travel companions</p>
        </div>
        
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="fullName">
              <FaUser className="form-icon" />
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className={errors.fullName ? 'error' : ''}
            />
            {errors.fullName && <span className="error-message">{errors.fullName}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="email">
              <FaEnvelope className="form-icon" />
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password">
                <FaLock className="form-icon" />
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                className={errors.password ? 'error' : ''}
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="confirmPassword">
                <FaLock className="form-icon" />
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className={errors.confirmPassword ? 'error' : ''}
              />
              {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
            </div>
          </div>
          
          <div className="form-group">
            <label className="label-with-icon">
              <FaGlobe className="form-icon" />
              Travel Preferences
            </label>
            <div className="checkbox-group">
              {travelPreferenceOptions.map(option => (
                <div key={option.id} className="checkbox-item">
                  <input
                    type="checkbox"
                    id={option.id}
                    name="travelPreferences"
                    value={option.id}
                    checked={formData.travelPreferences.includes(option.id)}
                    onChange={handleChange}
                  />
                  <label htmlFor={option.id}>{option.label}</label>
                </div>
              ))}
            </div>
            {errors.travelPreferences && <span className="error-message">{errors.travelPreferences}</span>}
          </div>
          
          <div className="form-group">
            <label className="label-with-icon">
              <FaMoneyBillWave className="form-icon" />
              Budget Range
            </label>
            <div className="radio-group">
              {budgetOptions.map(option => (
                <div key={option.id} className="radio-item">
                  <input
                    type="radio"
                    id={option.id}
                    name="budgetRange"
                    value={option.id}
                    checked={formData.budgetRange === option.id}
                    onChange={handleChange}
                  />
                  <label htmlFor={option.id}>{option.label}</label>
                </div>
              ))}
            </div>
            {errors.budgetRange && <span className="error-message">{errors.budgetRange}</span>}
          </div>
          
          <div className="form-group terms-group">
            <div className="checkbox-item">
              <input
                type="checkbox"
                id="agreeToTerms"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
              />
              <label htmlFor="agreeToTerms">
                I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
              </label>
            </div>
            {errors.agreeToTerms && <span className="error-message">{errors.agreeToTerms}</span>}
          </div>
          
          <button type="submit" className="btn-signup">Create Account</button>
        </form>
        
        <div className="signup-footer">
          <p>Already have an account? <Link to="/login">Log In</Link></p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
