import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

// Import Layouts
import DashboardLayout from './components/layout/DashboardLayout';
import PublicLayout from './components/layout/PublicLayout'; // <-- NEW

// Import Pages
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminProtectedRoute from './components/common/AdminProtectedRoute';

// Placeholder pages for sidebar links
const PlaceholderPage = ({ title }) => (
  <div className="text-center">
    <h1 className="text-4xl font-bold">{title}</h1>
    <p className="mt-4 text-text-secondary">This page is a placeholder for future content.</p>
  </div>
);


function App() {
  const [walletAddress, setWalletAddress] = useState(null);

  return (
    <Routes>
      {/* Public Routes will use the PublicLayout */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
      </Route>
      
      {/* Main dApp with the full Sidebar Layout */}
      <Route element={<DashboardLayout walletAddress={walletAddress} setWalletAddress={setWalletAddress} />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/carbon-pools" element={<PlaceholderPage title="Carbon Pools" />} />
        <Route path="/explorer" element={<PlaceholderPage title="Explorer" />} />
        <Route path="/cross-chain" element={<PlaceholderPage title="Cross-Chain" />} />
        <Route path="/retirements" element={<PlaceholderPage title="Retirements" />} />
        <Route path="/docs" element={<PlaceholderPage title="Docs" />} />
        <Route path="/contracts" element={<PlaceholderPage title="Contracts" />} />
        <Route path="/github" element={<PlaceholderPage title="Github" />} />
        <Route path="/discord" element={<PlaceholderPage title="Discord" />} />
      </Route>
      
      {/* Admin Routes remain without a layout for the login screen */}
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route element={<AdminProtectedRoute />}>
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
      </Route>
    </Routes>
  );
}

export default App;