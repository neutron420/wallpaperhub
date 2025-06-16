import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const QuickActionButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const quickActions = [
    {
      label: 'Upload Image',
      icon: 'ImagePlus',
      action: () => navigate('/upload-wallpaper'),
      color: 'bg-primary hover:bg-primary-700'
    },
    {
      label: 'Create Collection',
      icon: 'FolderPlus',
      action: () => console.log('Create collection'),
      color: 'bg-accent hover:bg-accent-600'
    },
    {
      label: 'Share Link',
      icon: 'Share2',
      action: () => console.log('Share link'),
      color: 'bg-secondary-600 hover:bg-secondary-700'
    }
  ];

  const shouldShow = ['/home-dashboard', '/wallpaper-browse-search'].includes(location.pathname);

  if (!shouldShow) return null;

  return (
    <div className="fixed bottom-24 md:bottom-8 right-4 z-300">
      {/* Expanded Actions */}
      {isExpanded && (
        <div className="mb-4 space-y-3 animate-slide-up">
          {quickActions.map((action, index) => (
            <div
              key={index}
              className="flex items-center justify-end space-x-3 animation-delay-100"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <span className="bg-text-primary text-white px-3 py-1 rounded-lg text-sm font-medium shadow-lg opacity-90">
                {action.label}
              </span>
              <button
                onClick={() => {
                  action.action();
                  setIsExpanded(false);
                }}
                className={`w-12 h-12 rounded-full ${action.color} text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-150 flex items-center justify-center`}
              >
                <Icon name={action.icon} size={20} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Main FAB */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-14 h-14 rounded-full bg-primary hover:bg-primary-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-250 flex items-center justify-center ${
          isExpanded ? 'rotate-45' : 'rotate-0'
        }`}
        aria-label="Quick actions"
      >
        <Icon name="Plus" size={24} />
      </button>

      {/* Backdrop for mobile */}
      {isExpanded && (
        <div
          className="fixed inset-0 bg-black bg-opacity-20 -z-10 md:hidden"
          onClick={() => setIsExpanded(false)}
        />
      )}
    </div>
  );
};

export default QuickActionButton;