// src/services/client/cartService.js
import axios from 'axios';
import { BASE_URL } from '../../config/apiConfig';

const CART_ENDPOINT = `${BASE_URL}/client/cart`;

export const addToCart = async (cartData) => {
    try {
        const token = localStorage.getItem('token'); // Recupera el token del localStorage
        if (!token) {
            throw new Error('Token no encontrado. Por favor inicia sesión.');
        }

        const response = await axios.post(`${CART_ENDPOINT}/add`, cartData, {
            headers: {
                Authorization: `Bearer ${token}`, // Incluye el token en los headers
            },
        });

        return response.data; // Devuelve la respuesta del servidor
    } catch (error) {
        console.error('Error al agregar al carrito:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Error al agregar producto al carrito.');
    }
};


// Obtener el carrito de un usuario por su UUID
export const getCart = async (userUuid) => {
    try {
      const token = localStorage.getItem('token'); // Obtener el token del almacenamiento local
      const response = await axios.get(`${BASE_URL}/client/cart/${userUuid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data; // Retorna los datos del carrito
    } catch (error) {
      console.error('Error al obtener el carrito:', error);
      throw error.response?.data || 'Error al obtener el carrito';
    }
  };

  export const removeFromCart = async (userUuid, productUuid) => {
    try {
        const response = await axios.delete(`${BASE_URL}/client/cart/remove/${productUuid}`, {
            data: { userUuid }, // Incluir el userUuid en el cuerpo de la solicitud
        });
        return response.data;
    } catch (error) {
        console.error('Error al eliminar producto del carrito:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Error al eliminar producto del carrito.');
    }
};

export const processCart = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.put(`${BASE_URL}/client/cart/process`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error al procesar el carrito:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Error al procesar el carrito.');
    }
};