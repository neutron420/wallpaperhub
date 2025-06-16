import React from 'react';
import Icon from 'components/AppIcon';

const WallpaperActions = ({ wallpaper, isFavorited, onFavorite, onShare, onDownload }) => {
  const handleReport = () => {
    console.log('Reporting wallpaper:', wallpaper.id);
    // Handle report functionality
  };

  return (
    <div className="flex items-center justify-between p-4 bg-secondary-50 rounded-lg">
      <div className="flex items-center space-x-4">
        <button
          onClick={onFavorite}
          className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors duration-150 ${
            isFavorited 
              ? 'bg-red-100 text-red-600 hover:bg-red-200' :'bg-white text-text-secondary hover:bg-secondary-100'
          }`}
        >
          <Icon 
            name="Heart" 
            size={16} 
            className={isFavorited ? 'fill-current' : ''} 
          />
          <span className="text-sm font-medium">
            {isFavorited ? 'Favorited' : 'Favorite'}
          </span>
        </button>
        
        <button
          onClick={onShare}
          className="flex items-center space-x-2 px-3 py-2 bg-white text-text-secondary hover:bg-secondary-100 rounded-lg transition-colors duration-150"
        >
          <Icon name="Share2" size={16} />
          <span className="text-sm font-medium">Share</span>
        </button>
      </div>
      
      <div className="flex items-center space-x-2">
        <button
          onClick={handleReport}
          className="p-2 text-text-muted hover:text-text-secondary rounded-lg hover:bg-white transition-colors duration-150"
          title="Report inappropriate content"
        >
          <Icon name="Flag" size={16} />
        </button>
        
        <button
          onClick={onDownload}
          className="flex items-center space-x-2 px-4 py-2 bg-primary hover:bg-primary-700 text-white rounded-lg transition-colors duration-150"
        >
          <Icon name="Download" size={16} />
          <span className="text-sm font-medium">Download</span>
        </button>
      </div>
    </div>
  );
};

export default WallpaperActions;