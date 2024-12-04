// src/router/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        // Si no está autenticado, redirige al login
        return <Navigate to="/admin/login" replace />;
    }

    return children; // Si está autenticado, renderiza el contenido protegido
};

export default ProtectedRoute;
