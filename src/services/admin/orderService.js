// src/services/admin/orderService.js
import axios from 'axios';
import { BASE_URL } from '../../config/apiConfig';

export const getOrders = async (page = 1, limit = 10) => {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${BASE_URL}/admin/order`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { page, limit },
    });
    return response.data;
};

export const updateOrderStatus = async (uuid, status) => {
    const token = localStorage.getItem('token'); // Autorización JWT
    const response = await axios.patch(
        `${BASE_URL}/admin/order/${uuid}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
};
