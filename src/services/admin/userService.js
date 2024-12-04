// src/services/admin/userService.js
import axios from 'axios';
import { BASE_URL } from '../../config/apiConfig';

// Función para obtener usuarios (miembros)
export const getUsers = async () => {
  const token = localStorage.getItem('token'); // Obtener el token del almacenamiento local
  const response = await axios.get(`${BASE_URL}/admin/clients`, {
    headers: {
      Authorization: `Bearer ${token}`, // Autenticación
    },
  });
  return response.data; // Devuelve los datos de los usuarios
};

// Función para actualizar el estado del usuario
export const updateUserStatus = async (uuid, status) => {
  const token = localStorage.getItem('token');
  const response = await axios.patch(
    `${BASE_URL}/admin/clients/${uuid}/status`,
    { status }, // Nuevo estado
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
