import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AdminProtectedRoute = () => {
    const isAuthenticated = localStorage.getItem('admin_authenticated') === 'true';
    return isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" />;
};

export default AdminProtectedRoute;