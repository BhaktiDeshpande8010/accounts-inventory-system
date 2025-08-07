import React, { useState } from 'react';
import { 
  Bell, 
  User, 
  Settings, 
  LogOut, 
  ChevronDown 
} from 'lucide-react';

const Topbar = ({ userName = 'John Doe', userRole = 'Administrator' }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const notifications = [
    {
      id: 1,
      title: 'New vendor registration',
      message: 'XYZ International has submitted registration',
      time: '5 min ago',
      isRead: false
    },
    {
      id: 2,
      title: 'Payment reminder',
      message: 'ABC Suppliers payment due tomorrow',
      time: '2 hours ago',
      isRead: false
    },
    {
      id: 3,
      title: 'Employee payroll',
      message: 'Monthly payroll processed successfully',
      time: '1 day ago',
      isRead: true
    }
  ];

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleLogout = () => {
    console.log('Logging out...');
    // Add logout logic here
  };

  return (
    <div className="h-16 bg-white shadow-sm border-b border-gray-200 flex items-center justify-between px-6">
      {/* Left side - could add breadcrumbs or search here */}
      <div className="flex-1">
        {/* You can add breadcrumbs or search functionality here */}
      </div>

      {/* Right side - Notifications and Profile */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border z-20">
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-semibold text-gray-800">Notifications</h3>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                      !notification.isRead ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 text-sm">
                          {notification.title}
                        </h4>
                        <p className="text-gray-600 text-sm mt-1">
                          {notification.message}
                        </p>
                        <span className="text-xs text-gray-500 mt-2 block">
                          {notification.time}
                        </span>
                      </div>
                      {!notification.isRead && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-1"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-gray-200">
                <button className="text-blue-600 text-sm hover:text-blue-800">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-3 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <User size={16} className="text-white" />
            </div>
            <div className="text-left hidden md:block">
              <div className="text-sm font-medium text-gray-900">{userName}</div>
              <div className="text-xs text-gray-500">{userRole}</div>
            </div>
            <ChevronDown size={16} />
          </button>

          {showProfile && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-20">
              <div className="py-2">
                <div className="px-4 py-2 border-b border-gray-100">
                  <div className="font-medium text-gray-900">{userName}</div>
                  <div className="text-sm text-gray-500">{userRole}</div>
                </div>
                
                <button className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 text-left">
                  <User size={16} />
                  Profile
                </button>
                
                <button className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 text-left">
                  <Settings size={16} />
                  Settings
                </button>
                
                <div className="border-t border-gray-100 mt-2 pt-2">
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 text-left"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Topbar;