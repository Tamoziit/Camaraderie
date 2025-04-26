import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaLock, FaPhoneAlt } from 'react-icons/fa';
import '../../styles/SignUp.css';
import Spinner from '../../components/Spinner';
import useLogin from '../../hooks/useLogin';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    mobileNo: '',
    password: ''
  });
  const { loading, login } = useLogin();

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
    await login(formData);
  };

  return (
    <div className="signup-container">
      <div className="signup-content">
        <div className="signup-header">
          <h1 className="font-semibold !text-transparent !bg-clip-text bg-gradient-to-r from-blue-500 to-blue-800">
            Join Camaraderie
          </h1>
          <p className='text-lg italic'>Welcome back to your Travel Companinon Exploration Spree!!!</p>
        </div>

        <form className="signup-form" onSubmit={handleSubmit}>
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

          <button
            type="submit"
            className="btn-signup !items-center !justify-center !flex !font-bold !text-lg"
            disabled={loading}
          >
            {loading ? <Spinner /> : "Login"}
          </button>
        </form>

        <div className="signup-footer">
          <p>Do not have an account? <Link to="/signup">Signup</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Login