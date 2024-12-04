// src/services/orderService.js
import axios from 'axios';
import { BASE_URL } from '../config/apiConfig';

export const updateOrderStatus = async (uuid, status) => {
    const token = localStorage.getItem('token'); // Autorización JWT
    const response = await axios.patch(
        `${BASE_URL}/admin/orders/${uuid}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
};
