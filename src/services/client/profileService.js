import axios from 'axios';
import { BASE_URL } from '../../config/apiConfig';

// Endpoint base para el perfil
const PROFILE_ENDPOINT = `${BASE_URL}/client/profile`;

// Obtener información del perfil
export const getProfile = async () => {
    try {
        const token = localStorage.getItem('token'); // Recuperar el token del localStorage
        if (!token) {
            throw new Error('Token no encontrado. Por favor inicia sesión.');
        }

        const response = await axios.get(PROFILE_ENDPOINT, {
            headers: {
                Authorization: `Bearer ${token}`, // Incluir el token en los headers
            },
        });

        return response.data; // Devolver la información del perfil
    } catch (error) {
        console.error('Error al obtener el perfil:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Error al obtener el perfil.');
    }
};

// Actualizar información del perfil
export const updateProfile = async (profileData) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Token no encontrado. Por favor inicia sesión.');
        }

        const response = await axios.put(PROFILE_ENDPOINT, profileData, {
            headers: {
                Authorization: `Bearer ${token}`, // Incluir el token en los headers
            },
        });

        return response.data; // Devolver la respuesta del servidor
    } catch (error) {
        console.error('Error al actualizar el perfil:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Error al actualizar el perfil.');
    }
};

// Cambiar contraseña
export const changePassword = async (passwordData) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Token no encontrado. Por favor inicia sesión.');
        }

        const response = await axios.put(`${PROFILE_ENDPOINT}/change-password`, passwordData, {
            headers: {
                Authorization: `Bearer ${token}`, // Incluir el token en los headers
            },
        });

        return response.data; // Devolver la respuesta del servidor
    } catch (error) {
        console.error('Error al cambiar la contraseña:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Error al cambiar la contraseña.');
    }
};
