import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Para redirección
import promoImage from '../../assets/images/logo.png';
import '../../assets/styles/SignUp.scss';
import { loginUser } from '../../services/client/authService'; // Servicio para manejar el login
import { useAuth } from '../../context/AuthContextClient'; // Contexto para manejar la autenticación

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [formErrors, setFormErrors] = useState({
    email: false,
    password: false,
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const { login } = useAuth(); // Para actualizar el estado de autenticación
  const navigate = useNavigate(); // Para redirigir después del login

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    // Validar campos
    const errors = {
        email: formData.email.trim() === '',
        password: formData.password.trim() === '',
    };

    setFormErrors(errors);

    if (!Object.values(errors).some((error) => error)) {
        try {
            setLoading(true);
            const response = await loginUser(formData); // Llama al servicio de login
            setSuccessMessage(response.message || 'Login successful.');

            // Guardar el token y el UUID del usuario
            localStorage.setItem('token', response.token); // Token JWT
            localStorage.setItem('userUuid', response.user.uuid); // UUID del usuario

            // Redirigir al home o página deseada
            window.location.href = '/client/home';
        } catch (err) {
            setErrorMessage(err.message || 'Error during login.');
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
        <h3>Welcome Back</h3>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
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

          <label htmlFor="password">Password</label>
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
          {formErrors.password && <p className="error-text">Password is required.</p>}

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>

          <div className="terms-login-container">
            <p className="already-member">
              Don't have an account?{' '}
              <a href="/signup" className="login-link">
                Sign Up
              </a>
            </p>
            <p className="terms-text">
              By logging in, you agree to our{' '}
              <a href="/terms" className="terms-link">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="/privacy" className="privacy-link">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
