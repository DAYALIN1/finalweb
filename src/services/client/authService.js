import axios from 'axios';
import { BASE_URL } from '../../config/apiConfig'; // Asegúrate de que tengas un archivo de configuración para tu base URL

export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${BASE_URL}/client/auth/register`, userData);
        return response.data; // Devuelve la respuesta del servidor
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        throw error.response?.data || error.message;
    }
};

export const loginUser = async (userData) => {
    try {
        const response = await axios.post(`${BASE_URL}/client/auth/login`, userData);
        const { token } = response.data; // Extrae el token de la respuesta

        // Guarda el token en localStorage
        if (token) {
            localStorage.setItem('token', token); // Almacena el token para futuras solicitudes
        }

        return response.data; // Devuelve el token o la respuesta del servidor
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error during login.');
    }
};

