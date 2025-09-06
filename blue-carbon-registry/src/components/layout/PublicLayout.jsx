import React from 'react';
import { Outlet } from 'react-router-dom';
import PublicHeader from './PublicHeader';

const PublicLayout = () => {
  return (
    <div className="bg-background min-h-screen">
      <PublicHeader />
      <main className="pt-16"> {/* Add top padding to offset the fixed header */}
        <div className="container mx-auto p-4 md:p-8">
          <Outlet /> {/* The homepage will render here */}
        </div>
      </main>
    </div>
  );
};

export default PublicLayout;