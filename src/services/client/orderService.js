// src/services/client/orderService.js
import axios from 'axios';
import { BASE_URL } from '../../config/apiConfig';

const ORDER_ENDPOINT = `${BASE_URL}/client/order`;

export const getUserOrders = async () => {
    try {
        const token = localStorage.getItem('token'); // Recupera el token del almacenamiento local
        if (!token) {
            throw new Error('Token no encontrado. Por favor inicia sesión.');
        }

        const response = await axios.get(`${ORDER_ENDPOINT}/orders`, {
            headers: {
                Authorization: `Bearer ${token}`, // Envía el token en los encabezados
            },
        });

        return response.data; // Retorna los datos de los pedidos
    } catch (error) {
        console.error('Error al obtener los pedidos:', error.response?.data || error.message);
        throw new Error(
            error.response?.data?.message || 'Error al obtener los pedidos del usuario.'
        );
    }
};
