// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    const login = (username, password) => {
        if (username === 'admin' && password === 'password') {
            setIsAuthenticated(true);
            localStorage.setItem('auth', 'true'); // Almacena el estado en localStorage
            navigate('/admin/dashboard'); // Redirige al dashboard
        } else {
            alert('Usuario o contraseña incorrectos');
        }
    };

    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('auth'); // Limpia el estado de autenticación
        navigate('/admin/login'); // Redirige al login
    };

    useEffect(() => {
        // Recupera el estado de autenticación desde localStorage
        const savedAuth = localStorage.getItem('auth') === 'true';
        setIsAuthenticated(savedAuth);
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
