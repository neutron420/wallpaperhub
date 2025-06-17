import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Header = () => {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Handle search logic here
      console.log('Searching for:', searchQuery);
    }
  };

  const handleSearchToggle = () => {
    setIsSearchExpanded(!isSearchExpanded);
    if (isSearchExpanded) {
      setSearchQuery('');
    }
  };

  const getContextualActions = () => {
    const path = location.pathname;
    
    if (path === '/wallpaper-detail-download') {
      return (
        <div className="flex items-center space-x-2">
          <button className="p-2 rounded-lg hover:bg-secondary-100 transition-colors duration-150">
            <Icon name="Heart" size={20} className="text-secondary-600" />
          </button>
          <button className="p-2 rounded-lg hover:bg-secondary-100 transition-colors duration-150">
            <Icon name="Share2" size={20} className="text-secondary-600" />
          </button>
          <button className="p-2 rounded-lg hover:bg-secondary-100 transition-colors duration-150">
            <Icon name="Download" size={20} className="text-secondary-600" />
          </button>
        </div>
      );
    }
    
    if (path === '/user-profile-collections') {
      return (
        <div className="flex items-center space-x-2">
          <button className="p-2 rounded-lg hover:bg-secondary-100 transition-colors duration-150">
            <Icon name="Settings" size={20} className="text-secondary-600" />
          </button>
          <button className="p-2 rounded-lg hover:bg-secondary-100 transition-colors duration-150">
            <Icon name="MoreVertical" size={20} className="text-secondary-600" />
          </button>
        </div>
      );
    }
    
    return null;
  };

  const showSearch = ['/home-dashboard', '/wallpaper-browse-search'].includes(location.pathname);

  return (
    <header className="fixed top-0 left-0 right-0 z-100 bg-surface border-b border-border">
      <div className="flex items-center justify-between h-14 px-4 md:h-16 md:px-6">
        {/* Logo */}
        <Link to="/home-dashboard" className="flex items-center space-x-2 flex-shrink-0">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-700 rounded-lg flex items-center justify-center">
            <Icon name="Image" size={18} className="text-white" />
          </div>
          <span className="font-inter font-semibold text-lg text-text-primary hidden sm:block">
            WallCraft
          </span>
        </Link>

        {/* Search Section */}
        {showSearch && (
          <div className="flex-1 max-w-2xl mx-4 md:mx-8">
            <form onSubmit={handleSearchSubmit} className="relative">
              <div className={`flex items-center transition-all duration-250 ${
                isSearchExpanded ? 'w-full' : 'w-full md:w-auto'
              }`}>
                <div className="relative flex-1 md:min-w-96">
                  <Icon 
                    name="Search" 
                    size={18} 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" 
                  />
                  <input
                    type="text"
                    placeholder="Search wallpapers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-secondary-50 border border-secondary-200 rounded-lg text-sm placeholder:text-secondary-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-150"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleSearchToggle}
                  className="ml-2 p-2 rounded-lg hover:bg-secondary-100 transition-colors duration-150 md:hidden"
                >
                  <Icon name={isSearchExpanded ? "X" : "SlidersHorizontal"} size={18} className="text-secondary-600" />
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Right Actions */}
        <div className="flex items-center space-x-2 flex-shrink-0">
          {getContextualActions()}
          
          {/* Notifications */}
          <button className="relative p-2 rounded-lg hover:bg-secondary-100 transition-colors duration-150">
            <Icon name="Bell" size={20} className="text-secondary-600" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full border-2 border-surface"></span>
          </button>

          {/* User Menu */}
          <button className="flex items-center space-x-2 p-1 rounded-lg hover:bg-secondary-100 transition-colors duration-150">
            <div className="w-8 h-8 bg-gradient-to-br from-accent to-accent-600 rounded-full flex items-center justify-center">
              <Icon name="User" size={16} className="text-white" />
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;