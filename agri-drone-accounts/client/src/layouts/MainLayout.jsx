import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <Topbar />
      
      {/* Main Content */}
      <main className="ml-64 pt-16 min-h-screen">
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
