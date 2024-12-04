// src/App.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';

const App = () => {
    return (
        <div className="app-container">
            <header>
                <h1>eShop - Administración</h1>
            </header>
            <main>
                <Outlet /> {/* Renderiza las rutas internas */}
            </main>
            <footer>
                <p>© 2024 eShop. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
};

export default App;
