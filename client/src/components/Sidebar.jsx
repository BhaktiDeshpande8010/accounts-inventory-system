import React from 'react';
import { 
  LayoutDashboard, 
  Truck, 
  Users, 
  UserCheck, 
  ShoppingCart 
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { id: '/', label: 'Dashboard', icon: LayoutDashboard },
    { id: '/vendor', label: 'Vendor', icon: Truck },
    { id: '/customer', label: 'Customer', icon: Users },
    { id: '/employee', label: 'Employee', icon: UserCheck },
    { id: '/purchase', label: 'Purchase', icon: ShoppingCart }
  ];

  return (
    <div className="w-64 bg-white h-screen shadow-sm border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-lg font-semibold text-gray-800">Accounts IMS</h1>
      </div>

      {/* Menu Items */}
      <nav className="mt-6 flex-1">
        <ul className="space-y-1 px-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.id;

            return (
              <li key={item.id}>
                <Link
                  to={item.id}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon 
                    size={20} 
                    className={isActive ? 'text-blue-700' : 'text-gray-500'} 
                  />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
