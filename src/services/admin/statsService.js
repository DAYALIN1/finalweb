import axios from 'axios';
import { BASE_URL } from '../../config/apiConfig'; // Asegúrate de tener definido BASE_URL en tu configuración

const API_URL = `${BASE_URL}/admin/analytics`;

// Obtener órdenes por mes (último año)
export const getOrdersCountLastYear = async () => {
  const token = localStorage.getItem('token'); // Obtiene el token de autorización
  const response = await axios.get(`${API_URL}/orders-count-last-year`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Obtener ganancias por mes (último año)
export const getEarningsLastYear = async () => {
  const token = localStorage.getItem('token'); // Obtiene el token de autorización
  const response = await axios.get(`${API_URL}/earnings-last-year`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Obtener los productos más populares
export const getPopularProducts = async () => {
  const token = localStorage.getItem('token'); // Obtiene el token de autorización
  const response = await axios.get(`${API_URL}/popular-products`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
