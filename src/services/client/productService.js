import axios from 'axios';
import { BASE_URL } from '../../config/apiConfig';


export const getLatestProducts = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/client/catalog`);
        const allProducts = response.data.products || response.data; // Intenta acceder a `products`, si existe

        // Asegúrate de que sea un arreglo
        if (!Array.isArray(allProducts)) {
            throw new Error("La respuesta del servidor no es un arreglo");
        }

        // Toma los últimos 6 productos
        const latestProducts = allProducts.slice(-6).reverse();
        return latestProducts;
    } catch (error) {
        console.error("Error al obtener los últimos productos:", error);
        throw error.response?.data || error.message;
    }
};


export const getPaginatedProducts = async (page = 1, limit = 10) => {
    try {
        const response = await axios.get(`${BASE_URL}/client/catalog`, {
            params: { page, limit }, // Pasar parámetros de paginación
        });

        // Asegúrate de que la respuesta tiene los datos necesarios
        if (!response.data.products || !response.data.totalPages) {
            throw new Error('Respuesta del servidor incompleta');
        }

        return response.data; // Retorna productos, totalPages y currentPage
    } catch (error) {
        console.error('Error al obtener productos paginados:', error);
        throw error.response?.data || error.message;
    }
};


export const getProductById = async (uuid) => {
    try {
        const response = await axios.get(`${BASE_URL}/client/catalog/${uuid}`);
        return response.data; // Retorna los datos del producto
    } catch (error) {
        console.error("Error al obtener el producto:", error);
        throw error.response?.data || error.message;
    }
};