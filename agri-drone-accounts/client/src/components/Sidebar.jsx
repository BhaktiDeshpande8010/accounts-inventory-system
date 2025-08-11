import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Building2, 
  Users, 
  UserCheck, 
  ShoppingCart,
  Plane
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { 
      id: 'dashboard', 
      label: 'Dashboard', 
      icon: LayoutDashboard, 
      path: '/' 
    },
    { 
      id: 'vendors', 
      label: 'Vendors', 
      icon: Building2, 
      path: '/vendors' 
    },
    { 
      id: 'customers', 
      label: 'Customers', 
      icon: Users, 
      path: '/customers' 
    },
    { 
      id: 'employees', 
      label: 'Employees', 
      icon: UserCheck, 
      path: '/employees' 
    },
    { 
      id: 'purchases', 
      label: 'Purchases', 
      icon: ShoppingCart, 
      path: '/purchases' 
    }
  ];

  return (
    <div className="w-64 bg-white h-screen shadow-lg border-r border-gray-200 flex flex-col fixed left-0 top-0">
      {/* Logo/Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="bg-primary-600 p-2 rounded-lg">
            <Plane className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">Agri-Drone</h1>
            <p className="text-sm text-gray-500">Accounts IMS</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.id}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                    isActive
                      ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon 
                    size={20} 
                    className={isActive ? 'text-primary-600' : 'text-gray-400'} 
                  />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="text-xs text-gray-500 text-center">
          <p>Agri-Drone Manufacturing</p>
          <p>Accounts Department</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
