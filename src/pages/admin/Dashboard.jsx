import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
  PieChart,
  Pie,
} from 'recharts';
import {
  getOrdersCountLastYear,
  getEarningsLastYear,
  getPopularProducts,
} from '../../services/admin/statsService';
import { getOrders } from '../../services/admin/orderService';
import userIcon from '../../assets/icons/user.png';
import '../../assets/styles/dashboard.scss';

const Dashboard = () => {
  const [ordersByMonth, setOrdersByMonth] = useState([]);
  const [earningsByMonth, setEarningsByMonth] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);
  const [lastOrders, setLastOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ordersData, earningsData, productsData, ordersResponse] = await Promise.all([
          getOrdersCountLastYear(),
          getEarningsLastYear(),
          getPopularProducts(),
          getOrders(1, 10), // Página 1, límite 10
        ]);
  
        setOrdersByMonth(ordersData);
        setEarningsByMonth(earningsData);
        setPopularProducts(productsData);
  
        // Ajusta esto según la estructura de los datos
        setLastOrders(ordersResponse.data || ordersResponse || []); 
      } catch (error) {
        console.error('Error al cargar los datos:', error);
  
        // Asegúrate de que los estados no queden indefinidos
        setOrdersByMonth([]);
        setEarningsByMonth([]);
        setPopularProducts([]);
        setLastOrders([]);
      }
    };
  
    fetchData();
  }, []);
  

  return (
    <div className="dashboard">
      {/* Encabezado */}
      <header className="header">
        <h1>Dashboard</h1>
        <div className="profile-section">
          <span>Bienvenido, Admin</span>
          <img src={userIcon} alt="Perfil" />
        </div>
      </header>

      {/* Contenido Principal */}
      <div className="content">
        <div className="main-content">
          {/* Sección de Gráficos */}
          <div className="charts">
            <div className="chart-container">
              <h3>Órdenes por Mes</h3>
              <BarChart width={400} height={250} data={ordersByMonth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="ordersCount" fill="#f95a5a" />
              </BarChart>
            </div>
            <div className="chart-container">
              <h3>Productos Más Populares</h3>
              <PieChart width={400} height={250}>
                <Pie
                  data={popularProducts}
                  dataKey="totalQuantity"
                  nameKey="productInfo.name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#82ca9d"
                  label
                />
              </PieChart>
            </div>
            <div className="chart-container full-width">
              <h3>Ganancias por Mes</h3>
              <LineChart width={800} height={300} data={earningsByMonth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="totalEarnings" stroke="#f95a5a" />
              </LineChart>
            </div>
          </div>

          {/* Sección de Notificaciones */}
          <div className="notifications">
            <h3>Últimas Órdenes Realizadas</h3>
            <ul>
              {Array.isArray(lastOrders) && lastOrders.length > 0 ? (
                lastOrders.map((order, index) => (
                  <li key={order.uuid || order._id || index}>
                    <span>{`Orden: ${order.uuid || 'Sin UUID'}`}</span>
                    <small>{`Estado: ${order.status || 'Desconocido'}`}</small>
                    <small>{`Fecha: ${order.createdAt
                        ? new Date(order.createdAt).toLocaleString()
                        : 'Sin fecha'
                      }`}</small>
                  </li>
                ))
              ) : (
                <li>No hay órdenes recientes.</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
