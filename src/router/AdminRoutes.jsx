// src/router/AdminRoutes.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/admin/Login';
import Dashboard from '../pages/admin/Dashboard';
import ManageOrders from '../pages/admin/ManageOrders';
import ManageProducts from '../pages/admin/ManageProducts';
import ManageUsers from '../pages/admin/ManageUsers';
import ProtectedRoute from './ProtectedRoute'; // Componente para proteger rutas
import AdminLayout from '../layouts/AdminLayout'; // Importa el layout

const AdminRoutes = () => {
    return (
        <Routes>
            {/* Ruta de Login Pública */}
            <Route path="login" element={<Login />} />

            {/* Rutas protegidas con rol de admin */}
            <Route
                path="/"
                element={
                    <ProtectedRoute requiredRole="admin">
                        <AdminLayout /> {/* Asegura que el sidebar esté presente */}
                    </ProtectedRoute>
                }
            >
                {/* Subrutas protegidas */}
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="manage-orders" element={<ManageOrders />} />
                <Route path="manage-products" element={<ManageProducts />} />
                <Route path="manage-users" element={<ManageUsers />} />
                <Route path="*" element={<Navigate to="dashboard" />} />
            </Route>
        </Routes>
    );
};

export default AdminRoutes;
