import React from 'react';
import { Bell, Search, User } from 'lucide-react';

const Topbar = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 h-16 flex items-center justify-between px-6 ml-64 fixed top-0 right-0 left-64 z-40">
      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <button 
          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
          aria-label="Notifications"
        >
          <Bell size={20} />
        </button>

        {/* User Profile */}
        <div className="flex items-center space-x-3">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">Accounts Manager</p>
            <p className="text-xs text-gray-500">accounts@agridrone.com</p>
          </div>
          <button 
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
            aria-label="User menu"
          >
            <User size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
