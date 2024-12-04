// src/pages/admin/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAdmin } from '../../services/admin/authService'; // Servicio para el login
import '../../assets/styles/login.scss';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState(''); // Cambiado de username a email
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null); // Para mostrar errores

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Llamar al servicio de login
            const response = await loginAdmin(email, password);
            alert('Inicio de sesión exitoso');
            navigate('/admin/dashboard'); // Redirige al dashboard después del login
        } catch (err) {
            // Manejar errores
            setError(err.response?.data?.message || 'Error al iniciar sesión');
        }
    };

    return (
        <div className="login-container">
            {/* Sección izquierda con contenido gráfico */}
            <div className="login-left"></div>

            {/* Sección derecha con el formulario */}
            <div className="login-right">
                <form onSubmit={handleSubmit} className="login-form">
                    <h2>Log In</h2>
                    {error && <p className="error-message">{error}</p>}
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-options">
                        <label>
                            <input type="checkbox" />
                            Keep me logged in
                        </label>
                        <a href="#">Forgot password?</a>
                    </div>
                    <button type="submit" className="login-button">
                        Next
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
