// src/services/admin/productService.js
import axios from 'axios';
import { BASE_URL } from '../../config/apiConfig';

/**
 * Obtiene la lista de productos desde el backend.
 * @param {number} page - Número de página para la paginación.
 * @param {number} limit - Límite de productos por página.
 * @returns {Promise<Object>} - Datos de los productos, incluyendo paginación.
 */
export const getProducts = async (page = 1, limit = 10) => {
    const token = localStorage.getItem('token'); // Token JWT
    const response = await axios.get(`${BASE_URL}/admin/product`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { page, limit },
    });
    return response.data;
};

/**
 * Obtiene la información de un producto específico por UUID.
 * @param {string} uuid - UUID del producto.
 * @returns {Promise<Object>} - Información del producto.
 */
export const getProductById = async (uuid) => {
    const token = localStorage.getItem('token'); // Token JWT
    const response = await axios.get(`${BASE_URL}/admin/product/${uuid}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

/**
 * Crea un nuevo producto en el backend.
 * @param {Object} formData - Datos del producto a crear.
 * @returns {Promise<Object>} - Producto creado.
 */
export const createProduct = async (formData) => {
    try {
        const token = localStorage.getItem('token'); // Si necesitas autenticación
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`, // Agrega si es necesario
            },
        };

        const response = await axios.post(`${BASE_URL}/admin/product`, formData, config);
        return response.data;
    } catch (error) {
        console.error('Error al crear producto:', error);
        throw error.response?.data || error.message;
    }
};

/**
 * Actualiza un producto existente en el backend.
 * @param {string} uuid - UUID del producto a actualizar.
 * @param {Object} product - Datos actualizados del producto.
 * @returns {Promise<Object>} - Producto actualizado.
 */
export const updateProduct = async (uuid, product) => {
    const token = localStorage.getItem('token');
    const response = await axios.put(
        `${BASE_URL}/admin/product/${uuid}`,
        product,
        { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
};

/**
 * Elimina un producto del backend.
 * @param {string} uuid - UUID del producto a eliminar.
 * @returns {Promise<void>} - Sin contenido en respuesta.
 */
export const deleteProduct = async (uuid) => {
    const token = localStorage.getItem('token');
    await axios.delete(`${BASE_URL}/admin/product/${uuid}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};
