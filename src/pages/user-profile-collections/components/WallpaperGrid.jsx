import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const WallpaperGrid = ({ wallpapers, viewMode = 'grid', onWallpaperClick, showAuthor = false }) => {
  const [hoveredId, setHoveredId] = useState(null);

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (wallpapers.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Image" size={24} className="text-secondary-400" />
        </div>
        <h3 className="text-lg font-semibold text-text-primary mb-2">No wallpapers found</h3>
        <p className="text-text-secondary">Start uploading some amazing wallpapers to share with the community!</p>
      </div>
    );
  }

  if (viewMode === 'list') {
    return (
      <div className="space-y-4">
        {wallpapers.map((wallpaper) => (
          <div
            key={wallpaper.id}
            className="card p-4 hover:shadow-md transition-all duration-200 cursor-pointer"
            onClick={() => onWallpaperClick(wallpaper)}
          >
            <div className="flex items-center space-x-4">
              {/* Thumbnail */}
              <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={wallpaper.url}
                  alt={wallpaper.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-text-primary truncate mb-1">
                      {wallpaper.title}
                    </h3>
                    {showAuthor && wallpaper.author && (
                      <p className="text-sm text-text-secondary mb-2">by {wallpaper.author}</p>
                    )}
                    <div className="flex items-center space-x-4 text-sm text-text-secondary">
                      <div className="flex items-center space-x-1">
                        <Icon name="Download" size={14} />
                        <span>{formatNumber(wallpaper.downloads)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Heart" size={14} />
                        <span>{formatNumber(wallpaper.likes)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Tag" size={14} />
                        <span>{wallpaper.category}</span>
                      </div>
                      {wallpaper.uploadDate && (
                        <div className="flex items-center space-x-1">
                          <Icon name="Calendar" size={14} />
                          <span>{formatDate(wallpaper.uploadDate)}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2 ml-4">
                    <span className="text-xs bg-primary-100 text-primary px-2 py-1 rounded-full">
                      {wallpaper.resolution}
                    </span>
                    <button className="p-2 rounded-lg hover:bg-secondary-100 transition-colors duration-150">
                      <Icon name="MoreVertical" size={16} className="text-secondary-600" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
      {wallpapers.map((wallpaper) => (
        <div
          key={wallpaper.id}
          className="group relative aspect-[3/4] rounded-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-200"
          onMouseEnter={() => setHoveredId(wallpaper.id)}
          onMouseLeave={() => setHoveredId(null)}
          onClick={() => onWallpaperClick(wallpaper)}
        >
          {/* Image */}
          <Image
            src={wallpaper.url}
            alt={wallpaper.title}
            className="w-full h-full object-cover"
          />

          {/* Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent transition-opacity duration-200 ${
            hoveredId === wallpaper.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
          }`}>
            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <h3 className="font-semibold text-white text-sm mb-1 truncate">
                {wallpaper.title}
              </h3>
              {showAuthor && wallpaper.author && (
                <p className="text-white/80 text-xs mb-2">by {wallpaper.author}</p>
              )}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 text-white/80 text-xs">
                  <div className="flex items-center space-x-1">
                    <Icon name="Download" size={12} />
                    <span>{formatNumber(wallpaper.downloads)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Heart" size={12} />
                    <span>{formatNumber(wallpaper.likes)}</span>
                  </div>
                </div>
                <span className="text-xs bg-white/20 text-white px-2 py-1 rounded-full backdrop-blur-sm">
                  {wallpaper.resolution}
                </span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className={`absolute top-2 right-2 flex items-center space-x-1 transition-opacity duration-200 ${
              hoveredId === wallpaper.id ? 'opacity-100' : 'opacity-0'
            }`}>
              <button className="p-1.5 bg-white/20 rounded-lg backdrop-blur-sm hover:bg-white/30 transition-colors duration-150">
                <Icon name="Heart" size={14} className="text-white" />
              </button>
              <button className="p-1.5 bg-white/20 rounded-lg backdrop-blur-sm hover:bg-white/30 transition-colors duration-150">
                <Icon name="Download" size={14} className="text-white" />
              </button>
            </div>
          </div>

          {/* Category Badge */}
          <div className="absolute top-2 left-2">
            <span className="text-xs bg-black/50 text-white px-2 py-1 rounded-full backdrop-blur-sm">
              {wallpaper.category}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WallpaperGrid;