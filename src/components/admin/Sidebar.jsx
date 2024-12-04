import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { logoutAdmin } from '../../services/admin/authService';
import homeIcon from '../../assets/icons/home.png';
import ordersIcon from '../../assets/icons/orders.png';
import productsIcon from '../../assets/icons/edit_product.png';
import adminUsersIcon from '../../assets/icons/edit_user.png';
import logo from '../../assets/icons/logo.png';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutAdmin(); // Llamar a la función de cierre de sesión
      navigate('/login'); // Redirigir al login
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin/Dashboard', icon: homeIcon },
    { name: 'Gestión Órdenes', path: '/admin/manage-orders', icon: ordersIcon },
    { name: 'Gestión Productos', path: '/admin/manage-products', icon: productsIcon },
    { name: 'Gestión Usuarios', path: '/admin/manage-users', icon: adminUsersIcon },
  ];

  return (
    <aside
      style={{
        width: '80px',
        backgroundColor: '#1f1f1f',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '100vh',
        position: 'sticky',
        top: 0,
      }}
    >
      {/* Logo */}
      <div>
        <img
          src={logo}
          alt="Logo"
          style={{
            width: '40px',
            height: '40px',
            marginBottom: '30px',
          }}
        />
      </div>

      {/* Menú */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            style={({ isActive }) => ({
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '40px',
              height: '40px',
              backgroundColor: isActive ? 'transparent' : 'transparent',
              border: isActive ? '2px solid #f95a5a' : '2px solid transparent',
              borderRadius: '8px',
              transition: 'all 0.3s ease',
            })}
          >
            <img src={item.icon} alt={item.name} style={{ width: '24px', height: '24px' }} />
          </NavLink>
        ))}
      </nav>

      {/* Botón de cerrar sesión */}
      <button
        onClick={handleLogout}
        style={{
          marginTop: 'auto',
          marginBottom: '20px',
          padding: '10px',
          backgroundColor: '#f95a5a',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          width: '60px',
          textAlign: 'center',
        }}
      >
        Salir
      </button>

      {/* Footer */}
      <footer style={{ marginTop: 'auto', paddingBottom: '20px', color: '#aaa' }}>
        <small>© 2024</small>
      </footer>
    </aside>
  );
};

export default Sidebar;
