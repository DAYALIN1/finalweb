import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContextClient"; // Contexto para clientes
import "../../assets/styles/Header.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faUser } from "@fortawesome/free-solid-svg-icons";
import Logo from "../../assets/images/logo.png";

const Header = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth(); // Verifica si está autenticado

  const handleLogout = () => {
    localStorage.removeItem("clientToken"); // Elimina el token
    navigate("/client/login"); // Redirige al login
  };

  const handleCartClick = () => {
    if (isAuthenticated) {
      navigate("/client/cart"); // Si está autenticado, ir al carrito
    } else {
      navigate("/client/login"); // Si no está autenticado, ir al login
    }
  };

  return (
    <header className="header">
      <div className="logo" onClick={() => navigate("/client/home")}>
        <img src={Logo} alt="eShop Logo" className="logo-image" />
      </div>

      <nav className="nav-links">
        <NavLink to="/client/home" className={({ isActive }) => (isActive ? "active" : "")}>
          Inicio
        </NavLink>
        <NavLink to="/client/products" className={({ isActive }) => (isActive ? "active" : "")}>
          Productos
        </NavLink>
        <NavLink to="/client/oursite" className={({ isActive }) => (isActive ? "active" : "")}>
          Nosotros
        </NavLink>
      </nav>

      <div className="icons">
        <a className="icon-button" onClick={handleCartClick}>
          <FontAwesomeIcon icon={faCartShopping} className="icon" />
        </a>
        <NavLink to="/client/profile">
          <FontAwesomeIcon icon={faUser} className="icon" />
        </NavLink>
      </div>
    </header>
  );
};

export default Header;
