import React, { useState } from 'react';
import MembersTable from '../../components/admin/MembersTable';
import AdminsTable from '../../components/admin/AdminsTable';
import '../../assets/styles/userManage.scss';

const ManageUsers = () => {
  const [activeTab, setActiveTab] = useState('members'); // Controla el tab activo

  return (
    <div className="app-container">
      <div className="user-management">
        <div className="header">
          <h1>Gestionar Usuarios</h1>
          <div className="profile-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="#f77"
            >
              <path d="M12 2a7 7 0 1 1 0 14 7 7 0 0 1 0-14zm0 16c-4.42 0-8 3.58-8 8h16c0-4.42-3.58-8-8-8z" />
            </svg>
          </div>
        </div>

        <div className="top-bar">
          <div className="tabs">
            <button
              className={`tab ${activeTab === 'members' ? 'active' : ''}`}
              onClick={() => setActiveTab('members')}
            >
              Miembros
            </button>
            <button
              className={`tab ${activeTab === 'admins' ? 'active' : ''}`}
              onClick={() => setActiveTab('admins')}
            >
              Admins
            </button>
          </div>
          <div className="total-members">
            Total Usuarios: <strong>{activeTab === 'members' ? 200 : 50}</strong>
          </div>
        </div>

        <div className="content">
          {activeTab === 'members' && <MembersTable />} {/* Tabla de miembros */}
          {activeTab === 'admins' && <AdminsTable />} {/* Tabla de admins */}
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
