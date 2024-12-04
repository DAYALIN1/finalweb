import axios from 'axios';
import { BASE_URL } from '../../config/apiConfig';

export const loginAdmin = async (email, password) => {
    try {
        const response = await axios.post(`${BASE_URL}/admin/auth/login`, { email, password });
        const { token } = response.data;
        localStorage.setItem('token', token); // Guardar token JWT
        return response.data;
    } catch (error) {
        console.error('Error al iniciar sesión:', error.response?.data || error.message);
        throw error;
    }
};

export const registerAdmin = async (name, email, password) => {
    try {
        const response = await axios.post(`${BASE_URL}/adminAuth/register`, { name, email, password });
        return response.data;
    } catch (error) {
        console.error('Error al registrar administrador:', error.response?.data || error.message);
        throw error;
    }
};

// Cerrar sesión del administrador
export const logoutAdmin = async () => {
    try {
        const token = localStorage.getItem('token'); // Obtén el token del almacenamiento local

        if (!token) {
            console.warn('No se encontró token al cerrar sesión');
            return;
        }

        await axios.post(
            `${BASE_URL}/admin/auth/logout`,
            {}, // El cuerpo está vacío
            {
                headers: {
                    Authorization: `Bearer ${token}`, // Enviar el token en los encabezados
                },
            }
        );

        localStorage.removeItem('token'); // Elimina el token del almacenamiento local
        console.log('Sesión cerrada correctamente');
    } catch (error) {
        console.error('Error al cerrar sesión:', error.response?.data || error.message);
        throw error;
    }
};
