import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaPhoneAlt, FaIdCard, FaBirthdayCake, FaCalendarAlt, FaBriefcase, FaUniversity, FaBuilding, FaLocationArrow } from 'react-icons/fa';
import '../../styles/SignUp.css';
import useSignup from '../../hooks/useSignup';
import Spinner from '../../components/Spinner';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    mobileNo: '',
    aadharNo: '',
    dob: '',
    age: '',
    gender: '',
    address: '',
    profession: '',
    institute: '',
    company: '',
    otherProfession: '',
    agreeToTerms: false
  });
  const { loading, signup } = useSignup();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      if (name === 'agreeToTerms') {
        setFormData({ ...formData, [name]: checked });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(formData);
  };

  return (
    <div className="signup-container">
      <div className="signup-content">
        <div className="signup-header">
          <h1 className="font-semibold !text-transparent !bg-clip-text bg-gradient-to-r from-blue-500 to-blue-800">
            Join Camaraderie
          </h1>
          <p className='text-lg italic'>Create your account and start finding your perfect travel companions</p>
        </div>

        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="fullName">
              <FaUser className="form-icon" />
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
            />
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
            />
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
              />
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
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="mobileNo">
              <FaPhoneAlt className="form-icon" />
              Mobile Number
            </label>
            <input
              type="text"
              id="mobileNo"
              name="mobileNo"
              value={formData.mobileNo}
              onChange={handleChange}
              placeholder="Enter your mobile no."
            />
          </div>

          <div className="form-group">
            <label htmlFor="aadharNo">
              <FaIdCard className="form-icon" />
              Aadhar Number
            </label>
            <input
              type="text"
              id="aadharNo"
              name="aadharNo"
              value={formData.aadharNo}
              onChange={handleChange}
              placeholder="Enter your Aadhar no."
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">
              <FaLocationArrow className="form-icon" />
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your Aadhar no."
            />
          </div>

          {/* DOB and Age */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="dob"><FaBirthdayCake className="form-icon" /> Date of Birth</label>
              <input type="date" id="dob" name="dob" value={formData.dob} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="age"><FaCalendarAlt className="form-icon" /> Age</label>
              <input type="text" id="age" name="age" value={formData.age} onChange={handleChange} placeholder="Enter your Age" />
            </div>
          </div>

          <div className="form-group">
            <label>Gender</label>
            <div className="radio-group">
              {['Male', 'Female', 'Other'].map((gender) => (
                <label key={gender}>
                  <input type="radio" name="gender" value={gender[0]} checked={formData.gender === gender} onChange={handleChange} />
                  {gender}
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="profession"><FaBriefcase className="form-icon" /> Profession</label>
            <select id="profession" name="profession" value={formData.profession} onChange={handleChange}>
              <option value="">Select Profession</option>
              <option value="student">Student</option>
              <option value="professional">Professional</option>
              <option value="other">Other</option>
            </select>
          </div>

          {formData.profession === 'student' && (
            <div className="form-group">
              <label htmlFor="institute"><FaUniversity className="form-icon" /> Educational Institute</label>
              <input type="text" id="institute" name="institute" value={formData.institute} onChange={handleChange} placeholder="Enter your institute name" />
            </div>
          )}

          {formData.profession === 'professional' && (
            <div className="form-group">
              <label htmlFor="company"><FaBuilding className="form-icon" /> Company</label>
              <input type="text" id="company" name="company" value={formData.company} onChange={handleChange} placeholder="Enter your company name" />
            </div>
          )}

          {formData.profession === 'other' && (
            <div className="form-group">
              <label htmlFor="otherProfession"><FaBriefcase className="form-icon" /> Other Profession</label>
              <input type="text" id="otherProfession" name="otherProfession" value={formData.otherProfession} onChange={handleChange} placeholder="Describe your profession" />
            </div>
          )}

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
          </div>

          <button
            type="submit"
            className="btn-signup !items-center !justify-center !flex !font-bold !text-lg"
            disabled={loading}
          >
            {loading ? <Spinner /> : "Create Account"}
          </button>
        </form>

        <div className="signup-footer">
          <p>Already have an account? <Link to="/login">Log In</Link></p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;