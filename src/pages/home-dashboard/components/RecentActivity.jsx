import React from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: "download",
      user: {
        name: "Emma Wilson",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
      },
      wallpaper: {
        title: "Sunset Mountains",
        thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100&h=100&fit=crop"
      },
      timestamp: "2 minutes ago"
    },
    {
      id: 2,
      type: "upload",
      user: {
        name: "David Chen",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
      },
      wallpaper: {
        title: "Abstract Geometry",
        thumbnail: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=100&h=100&fit=crop"
      },
      timestamp: "15 minutes ago"
    },
    {
      id: 3,
      type: "favorite",
      user: {
        name: "Sarah Johnson",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
      },
      wallpaper: {
        title: "Ocean Waves",
        thumbnail: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=100&h=100&fit=crop"
      },
      timestamp: "1 hour ago"
    },
    {
      id: 4,
      type: "upload",
      user: {
        name: "Michael Brown",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
      },
      wallpaper: {
        title: "City Skyline",
        thumbnail: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=100&h=100&fit=crop"
      },
      timestamp: "2 hours ago"
    },
    {
      id: 5,
      type: "download",
      user: {
        name: "Lisa Anderson",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
      },
      wallpaper: {
        title: "Forest Path",
        thumbnail: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=100&h=100&fit=crop"
      },
      timestamp: "3 hours ago"
    }
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'download':
        return { icon: 'Download', color: 'text-success', bgColor: 'bg-success-50' };
      case 'upload':
        return { icon: 'ImagePlus', color: 'text-primary', bgColor: 'bg-primary-50' };
      case 'favorite':
        return { icon: 'Heart', color: 'text-red-500', bgColor: 'bg-red-50' };
      default:
        return { icon: 'Activity', color: 'text-secondary-600', bgColor: 'bg-secondary-50' };
    }
  };

  const getActivityText = (activity) => {
    switch (activity.type) {
      case 'download':
        return `downloaded "${activity.wallpaper.title}"`;
      case 'upload':
        return `uploaded "${activity.wallpaper.title}"`;
      case 'favorite':
        return `favorited "${activity.wallpaper.title}"`;
      default:
        return 'performed an action';
    }
  };

  return (
    <div className="card p-4 md:p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">Recent Activity</h3>
        <Link
          to="/wallpaper-browse-search"
          className="text-primary hover:text-primary-700 text-sm font-medium transition-colors duration-150"
        >
          View All
        </Link>
      </div>

      <div className="space-y-4">
        {activities.map((activity) => {
          const activityConfig = getActivityIcon(activity.type);
          
          return (
            <div key={activity.id} className="flex items-start space-x-3">
              {/* Activity Icon */}
              <div className={`w-8 h-8 ${activityConfig.bgColor} rounded-full flex items-center justify-center flex-shrink-0 mt-1`}>
                <Icon name={activityConfig.icon} size={14} className={activityConfig.color} />
              </div>

              {/* Activity Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start space-x-2">
                  {/* User Avatar */}
                  <Image
                    src={activity.user.avatar}
                    alt={activity.user.name}
                    className="w-6 h-6 rounded-full flex-shrink-0 mt-0.5"
                  />
                  
                  {/* Activity Text */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-text-primary">
                      <span className="font-medium">{activity.user.name}</span>
                      {' '}
                      <span className="text-text-secondary">{getActivityText(activity)}</span>
                    </p>
                    <p className="text-xs text-text-secondary mt-1">{activity.timestamp}</p>
                  </div>
                  
                  {/* Wallpaper Thumbnail */}
                  <Link
                    to="/wallpaper-detail-download"
                    className="flex-shrink-0 group"
                  >
                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-secondary-100">
                      <Image
                        src={activity.wallpaper.thumbnail}
                        alt={activity.wallpaper.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-150"
                      />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Load More */}
      <div className="mt-4 pt-4 border-t border-border">
        <button className="w-full text-center text-sm text-primary hover:text-primary-700 font-medium transition-colors duration-150">
          Load More Activity
        </button>
      </div>
    </div>
  );
};

export default RecentActivity;