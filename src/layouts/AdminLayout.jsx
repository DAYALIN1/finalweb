// src/layouts/AdminLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/admin/Sidebar'; // Importa el Sidebar

const AdminLayout = () => {
    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            {/* Sidebar Persistente */}
            <Sidebar />

            {/* Contenido Principal */}
            <div style={{ flex: 1, overflow: 'auto', padding: '20px' }}>
                <Outlet /> {/* Renderiza el contenido de la ruta actual */}
            </div>
        </div>
    );
};

export default AdminLayout;
