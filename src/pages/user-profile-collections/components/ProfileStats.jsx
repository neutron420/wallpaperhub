import React from 'react';
import Icon from 'components/AppIcon';

const ProfileStats = ({ stats }) => {
  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const statItems = [
    {
      label: 'Total Views',
      value: stats.views,
      icon: 'Eye',
      color: 'text-primary',
      bgColor: 'bg-primary-50'
    },
    {
      label: 'Downloads',
      value: stats.downloads,
      icon: 'Download',
      color: 'text-success',
      bgColor: 'bg-success-50'
    },
    {
      label: 'Uploads',
      value: stats.uploads,
      icon: 'Upload',
      color: 'text-accent',
      bgColor: 'bg-accent-50'
    },
    {
      label: 'Collections',
      value: stats.collections,
      icon: 'Folder',
      color: 'text-secondary-600',
      bgColor: 'bg-secondary-100'
    }
  ];

  return (
    <div className="card p-4">
      <h3 className="font-semibold text-text-primary mb-4">Statistics</h3>
      <div className="space-y-4">
        {statItems.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-lg ${item.bgColor} flex items-center justify-center`}>
                <Icon name={item.icon} size={18} className={item.color} />
              </div>
              <div>
                <div className="font-semibold text-text-primary">
                  {formatNumber(item.value)}
                </div>
                <div className="text-sm text-text-secondary">{item.label}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Progress Indicators */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-text-secondary">Profile Completion</span>
              <span className="text-text-primary font-medium">85%</span>
            </div>
            <div className="w-full bg-secondary-200 rounded-full h-2">
              <div className="bg-primary h-2 rounded-full" style={{ width: '85%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-text-secondary">Community Engagement</span>
              <span className="text-text-primary font-medium">92%</span>
            </div>
            <div className="w-full bg-secondary-200 rounded-full h-2">
              <div className="bg-success h-2 rounded-full" style={{ width: '92%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileStats;