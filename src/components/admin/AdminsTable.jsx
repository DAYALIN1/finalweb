import React, { useEffect, useState } from 'react';
import { getAdmins, updateAdminDetails, deleteAdmin, addAdmin } from '../../services/admin/adminService';
import userImage from '../../assets/images/user.png';
import AddAdminForm from './AddAdminForm'; // Importa el componente del formulario
import '../../assets/styles/userManage.scss';

const AdminsTable = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [showForm, setShowForm] = useState(false); // Nuevo estado para el formulario modal


  useEffect(() => {
    const fetchAdmins = async () => {
      setLoading(true);
      try {
        const data = await getAdmins();
        setAdmins(data);
      } catch (err) {
        console.error('Error al cargar administradores:', err);
        setError('No se pudieron cargar los administradores.');
      } finally {
        setLoading(false);
      }
    };

    fetchAdmins();
  }, []);

  const handleEdit = (admin) => {
    setEditingAdmin({ ...admin, password: '' }); // Inicializa la edición con los datos del admin y campo de contraseña vacío
  };

  const handleAddAdmin = async (newAdmin) => {
    try {
      const addedAdmin = await addAdmin(newAdmin); // Llama al servicio para agregar un admin
      setAdmins((prevAdmins) => [...prevAdmins, addedAdmin]); // Actualiza la lista local
      alert('Administrador agregado exitosamente.');
      setShowForm(false); // Cierra el formulario después de agregar
    } catch (err) {
      console.error('Error al agregar administrador:', err);
      setError('No se pudo agregar el administrador.');
    }
  };



  const handleDelete = async (uuid) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este administrador?')) {
      try {
        await deleteAdmin(uuid); // Aquí uuid debe ser un string
        setAdmins((prevAdmins) => prevAdmins.filter((admin) => admin.uuid !== uuid));
        alert('Administrador eliminado con éxito.');
      } catch (err) {
        console.error('Error al eliminar administrador:', err);
        setError('No se pudo eliminar el administrador.');
      }
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingAdmin((prev) => ({
      ...prev,
      [name]: value, // Actualiza dinámicamente el campo basado en su nombre
    }));
  };

  const handleSave = async () => {
    if (!editingAdmin) return;
    try {
      const updates = {
        name: editingAdmin.name,
        email: editingAdmin.email,
        ...(editingAdmin.password && { password: editingAdmin.password }), // Solo incluye la contraseña si fue proporcionada
      };

      console.log('Actualizando con los datos:', updates);

      await updateAdminDetails(editingAdmin.uuid, updates); // Actualiza en el backend

      // Actualiza el estado local
      setAdmins((prevAdmins) =>
        prevAdmins.map((admin) =>
          admin.uuid === editingAdmin.uuid ? { ...admin, ...updates } : admin
        )
      );

      alert('Administrador actualizado con éxito.');
      setEditingAdmin(null); // Limpia el estado de edición
    } catch (err) {
      console.error('Error al actualizar administrador:', err);
      setError('No se pudo actualizar el administrador.');
    }
  };

  if (loading) return <p>Cargando administradores...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="admins-table">
      <div className="header-button">
        <button className="add-admin" onClick={() => setShowForm(true)}>
          Agregar Administrador
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Foto</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Contraseña</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin) => (
            <tr key={admin.uuid}>
              <td><img src={admin.photo || userImage} alt={admin.name} className="circular" /></td>
              <td>
                {editingAdmin && editingAdmin.uuid === admin.uuid ? (
                  <input
                    type="text"
                    value={editingAdmin.name}
                    onChange={(e) => setEditingAdmin({ ...editingAdmin, name: e.target.value })}
                  />
                ) : (
                  admin.name
                )}
              </td>
              <td>
                {editingAdmin && editingAdmin.uuid === admin.uuid ? (
                  <input
                    type="email"
                    value={editingAdmin.email}
                    onChange={(e) => setEditingAdmin({ ...editingAdmin, email: e.target.value })}
                  />
                ) : (
                  admin.email
                )}
              </td>
              <td>
                {editingAdmin && editingAdmin.uuid === admin.uuid ? (
                  <input
                    type="password"
                    placeholder="Nueva contraseña"
                    onChange={(e) => setEditingAdmin({ ...editingAdmin, password: e.target.value })}
                  />
                ) : (
                  '••••••••'
                )}
              </td>
              <td>
                {editingAdmin && editingAdmin.uuid === admin.uuid ? (
                  <>
                    <button className="save" onClick={handleSave}>Guardar</button>
                    <button className="cancel" onClick={() => setEditingAdmin(null)}>Cancelar</button>
                  </>
                ) : (
                  <>
                    <button className="edit" onClick={() => handleEdit(admin)}>Editar</button>
                    <button className="delete" onClick={() => handleDelete(admin.uuid)}>Eliminar</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Renderizar el formulario modal si showForm es true */}
      {showForm && (
        <AddAdminForm
          onClose={() => setShowForm(false)}
          onAddAdmin={(newAdmin) => handleAddAdmin(newAdmin)}
        />
      )}
    </div>
  );
};

export default AdminsTable;
