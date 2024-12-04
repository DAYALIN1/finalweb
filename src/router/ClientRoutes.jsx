import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/client/Home';
import OurSite from '../pages/client/OurSite';
import ProductsPage from '../pages/client/ProductPage';
import ProductDetail from '../pages/client/ProductDetail';
import Login from '../pages/client/Login';
import SignUp from '../pages/client/SignUp';
import Cart from '../pages/client/Cart';
import Perfil from '../pages/client/Perfil';
import Header from '../components/client/Header';
import Footer from '../components/client/Footer';
import ProtectedRoute from './ProtectedRoutesClient'; // Ruta protegida para cliente

const ClientRoutes = () => {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/oursite" element={<OurSite />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/product/:uuid" element={<ProductDetail />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />

                {/* Ruta protegida para el carrito */}
                <Route
                    path="/cart"
                    element={
                        <ProtectedRoute>
                            <Cart />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <Perfil />
                        </ProtectedRoute>
                    }
                />
            </Routes>
            <Footer />
        </>
    );
};

export default ClientRoutes;
