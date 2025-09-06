import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLoginPage = () => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // In a real app, this would be a secure API call.
        if (password === 'admin123') {
            localStorage.setItem('admin_authenticated', 'true');
            navigate('/admin/dashboard');
        } else {
            setError('Invalid credentials.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-sm p-8 bg-surface rounded-lg shadow-md border border-border">
                <h1 className="text-2xl font-bold text-center text-text-primary">Admin Access</h1>
                <form onSubmit={handleLogin} className="mt-6 space-y-6">
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter Admin Password"
                        className="w-full px-4 py-2 border border-border rounded-md focus:ring-primary focus:border-primary"
                    />
                    <button type="submit" className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-hover">
                        Authenticate
                    </button>
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default AdminLoginPage;