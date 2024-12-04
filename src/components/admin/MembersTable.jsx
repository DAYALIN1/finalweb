import React, { useEffect, useState } from 'react';
import { getUsers, updateUserStatus } from '../../services/admin/userService';
import userImage from '../../assets/images/user.png'; // Imagen de usuario por defecto
import '../../assets/styles/userManage.scss';

const MembersTable = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Obtener usuarios desde la API
  useEffect(() => {
    const fetchMembers = async () => {
      setLoading(true);
      try {
        const data = await getUsers(); // Llama a la API
        setMembers(data); // Actualiza los usuarios en el estado
      } catch (err) {
        console.error('Error al cargar usuarios:', err);
        setError('No se pudieron cargar los usuarios. Intenta nuevamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  // Función para manejar la actualización del estado del usuario
  const handleEditStatus = async (uuid, currentStatus) => {
    try {
      const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';
      await updateUserStatus(uuid, newStatus); // Llama a la API para actualizar
      setMembers((prevMembers) =>
        prevMembers.map((member) =>
          member.uuid === uuid ? { ...member, status: newStatus } : member
        )
      );
    } catch (err) {
      console.error('Error al actualizar el estado del usuario:', err);
      setError('No se pudo actualizar el estado del usuario.');
    }
  };

  if (loading) return <p>Cargando usuarios...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="members-table">
      <table>
        <thead>
          <tr>
            <th>Foto</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member.uuid}>
              <td>
                <img
                  src={member.photo || userImage}
                  alt={member.name}
                  className="circular"
                />
              </td>
              <td>{member.name}</td>
              <td>{member.email}</td>
              <td>{member.phone}</td>
              <td>
                <span
                  className={`status ${member.status.toLowerCase()}`}
                  onClick={() => handleEditStatus(member.uuid, member.status)}
                >
                  {member.status}
                </span>
              </td>
              <td className="actions">
                <button
                  className="edit"
                  onClick={() => handleEditStatus(member.uuid, member.status)}
                >
                  Editar Estado
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MembersTable;
