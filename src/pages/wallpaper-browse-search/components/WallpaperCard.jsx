import React, { forwardRef, useState } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const WallpaperCard = forwardRef(({ wallpaper, onClick, onToggleFavorite }, ref) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showActions, setShowActions] = useState(false);

  const handleDownload = (e) => {
    e.stopPropagation();
    console.log('Downloading wallpaper:', wallpaper.id);
    // Handle download logic
  };

  const handleShare = (e) => {
    e.stopPropagation();
    console.log('Sharing wallpaper:', wallpaper.id);
    // Handle share logic
  };

  const handleFavorite = (e) => {
    e.stopPropagation();
    onToggleFavorite();
  };

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  return (
    <div
      ref={ref}
      className="group relative bg-surface rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-250 cursor-pointer"
      onClick={onClick}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-secondary-200 animate-pulse flex items-center justify-center">
            <Icon name="Image" size={24} className="text-secondary-400" />
          </div>
        )}
        
        <Image
          src={wallpaper.thumbnailUrl}
          alt={wallpaper.title}
          className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-105 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />

        {/* Premium Badge */}
        {wallpaper.isPremium && (
          <div className="absolute top-2 left-2 bg-accent text-white px-2 py-1 rounded text-xs font-medium">
            <Icon name="Crown" size={12} className="inline mr-1" />
            Premium
          </div>
        )}

        {/* Quick Actions Overlay */}
        <div className={`absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center transition-opacity duration-250 ${
          showActions ? 'opacity-100' : 'opacity-0 md:opacity-0'
        }`}>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleFavorite}
              className={`p-2 rounded-full transition-all duration-150 ${
                wallpaper.isFavorite
                  ? 'bg-error text-white' :'bg-white bg-opacity-90 text-text-primary hover:bg-opacity-100'
              }`}
              title={wallpaper.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Icon name={wallpaper.isFavorite ? "Heart" : "Heart"} size={16} />
            </button>
            
            <button
              onClick={handleDownload}
              className="p-2 bg-white bg-opacity-90 text-text-primary rounded-full hover:bg-opacity-100 transition-all duration-150"
              title="Download wallpaper"
            >
              <Icon name="Download" size={16} />
            </button>
            
            <button
              onClick={handleShare}
              className="p-2 bg-white bg-opacity-90 text-text-primary rounded-full hover:bg-opacity-100 transition-all duration-150"
              title="Share wallpaper"
            >
              <Icon name="Share2" size={16} />
            </button>
          </div>
        </div>

        {/* Mobile Quick Actions */}
        <div className="md:hidden absolute top-2 right-2 flex space-x-1">
          <button
            onClick={handleFavorite}
            className={`p-1.5 rounded-full transition-all duration-150 ${
              wallpaper.isFavorite
                ? 'bg-error text-white' :'bg-black bg-opacity-50 text-white'
            }`}
          >
            <Icon name="Heart" size={14} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-3">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-text-primary text-sm truncate mb-1">
              {wallpaper.title}
            </h3>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src={wallpaper.creatorAvatar}
                  alt={wallpaper.creator}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xs text-text-secondary truncate">
                {wallpaper.creator}
              </span>
            </div>
          </div>
          
          <div className="flex flex-col items-end text-xs text-text-secondary ml-2">
            <span className="font-medium">{wallpaper.resolution}</span>
            <span className="capitalize">{wallpaper.orientation}</span>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-xs text-text-secondary">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <Icon name="Download" size={12} />
              <span>{formatNumber(wallpaper.downloads)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Heart" size={12} />
              <span>{formatNumber(wallpaper.likes)}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-1">
            <Icon name="Eye" size={12} />
            <span>{formatNumber(wallpaper.views)}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mt-2">
          {wallpaper.tags.slice(0, 2).map(tag => (
            <span
              key={tag}
              className="px-2 py-1 bg-secondary-100 text-text-secondary text-xs rounded"
            >
              #{tag}
            </span>
          ))}
          {wallpaper.tags.length > 2 && (
            <span className="text-xs text-text-secondary">
              +{wallpaper.tags.length - 2}
            </span>
          )}
        </div>
      </div>
    </div>
  );
});

WallpaperCard.displayName = 'WallpaperCard';

export default WallpaperCard;