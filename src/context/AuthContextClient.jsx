import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContextClient = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = (token) => {
        localStorage.setItem('clientToken', token); // Guarda el token
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('clientToken'); // Limpia el token
        setIsAuthenticated(false);
    };

    useEffect(() => {
        const token = localStorage.getItem('clientToken'); // Obtiene el token
        setIsAuthenticated(!!token); // Verifica si hay token
    }, []);

    return (
        <AuthContextClient.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContextClient.Provider>
    );
};

export const useAuth = () => useContext(AuthContextClient);
