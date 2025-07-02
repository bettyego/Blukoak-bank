import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaTachometerAlt, 
  FaExchangeAlt, 
  FaHistory, 
  FaCreditCard, 
  FaUser, 
  FaCog, 
  FaSignOutAlt,
  FaChevronLeft,
  FaChevronRight
} from 'react-icons/fa';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();

  // Get user info from localStorage
  const userInfo = JSON.parse(localStorage.getItem('blueoak_user') || '{}');
  const isAdmin = userInfo.role === 'admin' || userInfo.role === 'manager';

  const menuItems = [
    {
      path: '/dashboard',
      icon: FaTachometerAlt,
      label: 'Dashboard',
      description: 'Overview'
    },
    {
      path: '/transfer',
      icon: FaExchangeAlt,
      label: 'Transfer',
      description: 'Send Money'
    },
    {
      path: '/transactions',
      icon: FaHistory,
      label: 'Transactions',
      description: 'History'
    },
    {
      path: '/cards',
      icon: FaCreditCard,
      label: 'Cards',
      description: 'Manage Cards'
    },
    {
      path: '/profile',
      icon: FaUser,
      label: 'Profile',
      description: 'Account Info'
    },
    {
      path: '/settings',
      icon: FaCog,
      label: 'Settings',
      description: 'Preferences'
    }
  ];

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full bg-white shadow-xl z-30 transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
        ${isOpen ? 'w-64' : 'w-64'}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Menu</h2>
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition duration-200"
          >
            <FaChevronLeft className="text-gray-600" />
          </button>
        </div>

        {/* User Info */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              isAdmin ? 'bg-purple-500' : 'bg-blue-500'
            }`}>
              <FaUser className="text-white" />
            </div>
            <div>
              <p className="font-semibold text-gray-800">{userInfo.name || 'User'}</p>
              <p className="text-sm text-gray-500">
                {isAdmin ? 'Admin Account' : 'Premium Account'}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = isActiveLink(item.path);
              
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`
                      flex items-center p-3 rounded-lg transition duration-200 group
                      ${isActive 
                        ? 'bg-blue-50 text-blue-700 border-r-4 border-blue-700' 
                        : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                      }
                    `}
                    onClick={() => window.innerWidth < 1024 && toggleSidebar()}
                  >
                    <Icon className={`
                      mr-3 text-lg
                      ${isActive ? 'text-blue-700' : 'text-gray-400 group-hover:text-blue-600'}
                    `} />
                    <div className="flex-1">
                      <p className="font-medium">{item.label}</p>
                      <p className="text-xs text-gray-500">{item.description}</p>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-200">
          <button className="flex items-center w-full p-3 text-red-600 hover:bg-red-50 rounded-lg transition duration-200">
            <FaSignOutAlt className="mr-3" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
