import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContextClient';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();

    return isAuthenticated ? children : <Navigate to="/client/login" />;
};

export default ProtectedRoute;
