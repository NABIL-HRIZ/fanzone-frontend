import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSideBar from './AdminSideBar';

const AdminDashboard = () => {
  return (
    <div className="admin-container">
      <AdminSideBar />
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;
