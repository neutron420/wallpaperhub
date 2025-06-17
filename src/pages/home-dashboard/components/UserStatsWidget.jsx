import React from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';

const UserStatsWidget = ({ user }) => {
  const stats = [
    {
      label: "Uploads",
      value: user.stats.uploads,
      icon: "ImagePlus",
      color: "text-primary",
      bgColor: "bg-primary-50"
    },
    {
      label: "Favorites",
      value: user.stats.favorites,
      icon: "Heart",
      color: "text-red-500",
      bgColor: "bg-red-50"
    },
    {
      label: "Downloads",
      value: user.stats.downloads,
      icon: "Download",
      color: "text-success",
      bgColor: "bg-success-50"
    }
  ];

  return (
    <div className="card p-4 md:p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">Your Stats</h3>
        <Link
          to="/user-profile-collections"
          className="text-primary hover:text-primary-700 transition-colors duration-150"
        >
          <Icon name="ExternalLink" size={16} />
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className={`w-12 h-12 ${stat.bgColor} rounded-full flex items-center justify-center mx-auto mb-2`}>
              <Icon name={stat.icon} size={20} className={stat.color} />
            </div>
            <div className="space-y-1">
              <p className="text-lg font-bold text-text-primary">
                {stat.value.toLocaleString()}
              </p>
              <p className="text-xs text-text-secondary">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Progress Indicators */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-text-secondary">Monthly Goal</span>
              <span className="text-text-primary font-medium">12/20</span>
            </div>
            <div className="w-full bg-secondary-200 rounded-full h-2">
              <div className="bg-primary h-2 rounded-full transition-all duration-300" style={{ width: '60%' }}></div>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs text-text-secondary">
            <span>Keep uploading to reach your goal!</span>
            <Icon name="Target" size={14} className="text-primary" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserStatsWidget;