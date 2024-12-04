import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider as AdminAuthProvider } from '../context/AuthContext'; // Contexto para admin
import { AuthProvider as ClientAuthProvider } from '../context/AuthContextClient'; // Contexto para cliente
import AdminRoutes from './AdminRoutes';
import ClientRoutes from './ClientRoutes';

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                {/* Rutas de administrador */}
                <Route
                    path="/admin/*"
                    element={
                        <AdminAuthProvider>
                            <AdminRoutes />
                        </AdminAuthProvider>
                    }
                />

                {/* Rutas de cliente */}
                <Route
                    path="/client/*"
                    element={
                        <ClientAuthProvider>
                            <ClientRoutes />
                        </ClientAuthProvider>
                    }
                />

                {/* Redirección genérica */}
                <Route path="*" element={<Navigate to="/client/home" />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;
