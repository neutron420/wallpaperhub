import React from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const ActivityFeed = ({ activities }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'upload':
        return { icon: 'Upload', color: 'text-primary', bgColor: 'bg-primary-50' };
      case 'like':
        return { icon: 'Heart', color: 'text-error', bgColor: 'bg-error-50' };
      case 'collection':
        return { icon: 'Folder', color: 'text-accent', bgColor: 'bg-accent-50' };
      case 'follow':
        return { icon: 'UserPlus', color: 'text-success', bgColor: 'bg-success-50' };
      case 'comment':
        return { icon: 'MessageCircle', color: 'text-secondary-600', bgColor: 'bg-secondary-100' };
      case 'download':
        return { icon: 'Download', color: 'text-primary', bgColor: 'bg-primary-50' };
      default:
        return { icon: 'Activity', color: 'text-secondary-600', bgColor: 'bg-secondary-100' };
    }
  };

  const getActivityText = (activity) => {
    switch (activity.type) {
      case 'upload':
        return `Uploaded "${activity.title}"`;
      case 'like':
        return `"${activity.title}" received new likes`;
      case 'collection':
        return `Created collection "${activity.title}"`;
      case 'follow':
        return `${activity.title} started following you`;
      case 'comment':
        return `New comment on "${activity.title}"`;
      case 'download':
        return `"${activity.title}" was downloaded`;
      default:
        return activity.details;
    }
  };

  if (activities.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Activity" size={24} className="text-secondary-400" />
        </div>
        <h3 className="text-lg font-semibold text-text-primary mb-2">No recent activity</h3>
        <p className="text-text-secondary">Your activity will appear here as you interact with the platform.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {activities.map((activity) => {
        const iconConfig = getActivityIcon(activity.type);
        
        return (
          <div key={activity.id} className="card p-4 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-start space-x-4">
              {/* Icon */}
              <div className={`w-10 h-10 rounded-full ${iconConfig.bgColor} flex items-center justify-center flex-shrink-0`}>
                <Icon name={iconConfig.icon} size={18} className={iconConfig.color} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-text-primary font-medium mb-1">
                      {getActivityText(activity)}
                    </p>
                    <p className="text-sm text-text-secondary">
                      {activity.timestamp}
                    </p>
                  </div>

                  {/* Activity Image */}
                  {activity.image && (
                    <div className="w-12 h-12 rounded-lg overflow-hidden ml-4 flex-shrink-0">
                      <Image
                        src={activity.image}
                        alt={activity.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>

                {/* Additional Details */}
                {activity.type === 'like' && (
                  <div className="mt-2 flex items-center space-x-4 text-sm text-text-secondary">
                    <div className="flex items-center space-x-1">
                      <Icon name="Heart" size={14} className="text-error" />
                      <span>50 new likes</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="TrendingUp" size={14} className="text-success" />
                      <span>+15% this week</span>
                    </div>
                  </div>
                )}

                {activity.type === 'upload' && (
                  <div className="mt-2 flex items-center space-x-4 text-sm text-text-secondary">
                    <div className="flex items-center space-x-1">
                      <Icon name="Eye" size={14} />
                      <span>234 views</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Download" size={14} />
                      <span>12 downloads</span>
                    </div>
                  </div>
                )}

                {activity.type === 'collection' && (
                  <div className="mt-2 flex items-center space-x-4 text-sm text-text-secondary">
                    <div className="flex items-center space-x-1">
                      <Icon name="Image" size={14} />
                      <span>0 wallpapers</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Lock" size={14} />
                      <span>Private</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}

      {/* Load More */}
      <div className="text-center pt-4">
        <button className="btn btn-secondary">
          <Icon name="RotateCcw" size={16} className="mr-2" />
          Load More Activity
        </button>
      </div>
    </div>
  );
};

export default ActivityFeed;