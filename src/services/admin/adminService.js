// src/services/admin/adminService.js
import axios from 'axios';
import { BASE_URL } from '../../config/apiConfig';

// Obtener la lista de administradores
export const getAdmins = async () => {
  const token = localStorage.getItem('token'); // Token para autorización
  const response = await axios.get(`${BASE_URL}/admin/admin-users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data; // Devuelve los datos de administradores
};

// Actualizar detalles del administrador
export const updateAdminDetails = async (uuid, updates) => {
    const token = localStorage.getItem('token');
    const response = await axios.put(
      `${BASE_URL}/admin/admin-users/${uuid}`,
      updates,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  };


// Eliminar un administrador
export const deleteAdmin = async (uuid) => {
  const token = localStorage.getItem('token');
  console.log(`URL generada: ${BASE_URL}/admin/admin-users/${uuid}`);
  const response = await axios.delete(`${BASE_URL}/admin/admin-users/${uuid}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// Función para agregar un administrador
export const addAdmin = async (newAdmin) => {
  const token = localStorage.getItem('token'); // Obtiene el token de autenticación
  const response = await axios.post(`${BASE_URL}/admin/admin-users`, newAdmin, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data; // Devuelve los datos del nuevo administrador
};