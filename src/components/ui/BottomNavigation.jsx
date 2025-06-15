import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const BottomNavigation = () => {
  const location = useLocation();

  const navigationItems = [
    {
      label: 'Home',
      path: '/home-dashboard',
      icon: 'Home',
      activeIcon: 'Home'
    },
    {
      label: 'Browse',
      path: '/wallpaper-browse-search',
      icon: 'Search',
      activeIcon: 'Search'
    },
    {
      label: 'Upload',
      path: '/upload-wallpaper',
      icon: 'Plus',
      activeIcon: 'Plus'
    },
    {
      label: 'Profile',
      path: '/user-profile-collections',
      icon: 'User',
      activeIcon: 'User'
    }
  ];

  const isActive = (path) => {
    if (path === '/wallpaper-browse-search') {
      return location.pathname === '/wallpaper-browse-search' || location.pathname === '/wallpaper-detail-download';
    }
    return location.pathname === path;
  };

  // Hide bottom navigation on authentication page
  if (location.pathname === '/user-authentication-login-register') {
    return null;
  }

  return (
    <>
      {/* Desktop Navigation - Hidden on mobile */}
      <nav className="hidden md:flex fixed top-16 left-0 right-0 z-90 bg-surface border-b border-border">
        <div className="flex items-center justify-center w-full max-w-4xl mx-auto px-6">
          <div className="flex items-center space-x-8 py-3">
            {navigationItems.map((item) => {
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-150 ${
                    active
                      ? 'bg-primary text-white shadow-sm'
                      : 'text-secondary-600 hover:text-text-primary hover:bg-secondary-50'
                  }`}
                >
                  <Icon 
                    name={active ? item.activeIcon : item.icon} 
                    size={18} 
                    className={active ? 'text-white' : 'text-current'}
                  />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-100 bg-surface border-t border-border">
        <div className="flex items-center justify-around px-2 py-2">
          {navigationItems.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center justify-center min-w-0 flex-1 py-2 px-1 rounded-lg transition-all duration-150 ${
                  active ? 'text-primary' : 'text-secondary-500'
                }`}
              >
                <div className={`p-1 rounded-lg transition-all duration-150 ${
                  active ? 'bg-primary-50' : 'hover:bg-secondary-50'
                }`}>
                  <Icon 
                    name={active ? item.activeIcon : item.icon} 
                    size={20} 
                    className="text-current"
                  />
                </div>
                <span className={`text-xs font-medium mt-1 transition-all duration-150 ${
                  active ? 'text-primary' : 'text-secondary-500'
                }`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default BottomNavigation;