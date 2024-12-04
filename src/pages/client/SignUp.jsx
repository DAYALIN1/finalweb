import React, { useState } from 'react';
import promoImage from '../../assets/images/logo.png';
import '../../assets/styles/SignUp.scss';
import { registerUser } from '../../services/client/authService'; // Asegúrate de tener este servicio implementado

const SignUp = () => {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    address: '',
    password: '',
    confirmPassword: '',
  });

  const [formErrors, setFormErrors] = useState({
    userName: false,
    email: false,
    address: false,
    password: false,
    confirmPassword: false,
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'password') {
      setFormErrors({
        ...formErrors,
        password: !validatePassword(value),
      });
    } else if (name === 'confirmPassword') {
      setFormErrors({
        ...formErrors,
        confirmPassword: value !== formData.password,
      });
    } else {
      setFormErrors({
        ...formErrors,
        [name]: value.trim() === '',
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {
      userName: formData.userName.trim() === '',
      email: formData.email.trim() === '',
      address: formData.address.trim() === '',
      password: !validatePassword(formData.password),
      confirmPassword: formData.confirmPassword !== formData.password,
    };

    setFormErrors(errors);

    if (!Object.values(errors).some((error) => error)) {
      try {
        setLoading(true);
        setErrorMessage('');
        const response = await registerUser({
          name: formData.userName,
          email: formData.email,
          password: formData.password,
        });
        setSuccessMessage(response.message || 'User registered successfully.');
        setFormData({
          userName: '',
          email: '',
          address: '',
          password: '',
          confirmPassword: '',
        });
      } catch (err) {
        setErrorMessage(err.message || 'Error registering user.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="login-container">
      <div className="promo-image-container">
        <img src={promoImage} alt="Promo Logo" className="promo-image" />
      </div>

      <div className="login">
        <h3>Join eShop</h3>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="userName">Username</label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={formData.userName}
            onChange={handleInputChange}
            required
            placeholder="Enter your username"
            className={formErrors.userName ? 'input-error' : ''}
          />
          {formErrors.userName && <p className="error-text">Username is required.</p>}

          <label htmlFor="email">Add your email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            placeholder="Enter your email"
            className={formErrors.email ? 'input-error' : ''}
          />
          {formErrors.email && <p className="error-text">Email is required.</p>}

          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
            placeholder="Enter your address"
            className={formErrors.address ? 'input-error' : ''}
          />
          {formErrors.address && <p className="error-text">Address is required.</p>}

          <label htmlFor="password">Choose a Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
            placeholder="Enter your password"
            className={formErrors.password ? 'input-error' : ''}
          />
          {formErrors.password && (
            <p className="error-text">
              Password must be at least 8 characters, include an uppercase letter, a lowercase letter, a number, and a special character.
            </p>
          )}

          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
            placeholder="Confirm your password"
            className={formErrors.confirmPassword ? 'input-error' : ''}
          />
          {formErrors.confirmPassword && <p className="error-text">Passwords do not match.</p>}

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Registering...' : 'Continue with Email'}
          </button>

          <div className="terms-login-container">
            <p className="already-member">
              Already a member? <a href="/login" className="login-link">Log In</a>
            </p>
            <p className="terms-text">
              By joining eShop I confirm that I have read and agree to the eShop{" "}
              <a href="/terms" className="terms-link">Terms of Service</a>,{" "}
              <a href="/privacy" className="privacy-link">Privacy Policy</a>, and to
              receive emails and updates.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
