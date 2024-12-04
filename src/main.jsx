// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRouter from './router/AppRouter'; // Asegúrate de usar tu archivo de rutas
import './index.css'; // Si tienes estilos globales

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AppRouter />
    </React.StrictMode>
);
