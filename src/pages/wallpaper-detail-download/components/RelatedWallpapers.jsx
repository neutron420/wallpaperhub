import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const RelatedWallpapers = ({ wallpapers }) => {
  const navigate = useNavigate();

  const handleWallpaperClick = (wallpaper) => {
    navigate('/wallpaper-detail-download', { 
      state: { wallpaper },
      replace: false 
    });
  };

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text-primary">Related Wallpapers</h2>
        <button className="text-primary hover:text-primary-700 text-sm font-medium transition-colors duration-150">
          View All
        </button>
      </div>
      
      {/* Mobile horizontal scroll */}
      <div className="md:hidden">
        <div className="flex space-x-4 overflow-x-auto pb-4 -mx-4 px-4">
          {wallpapers.map((wallpaper) => (
            <div
              key={wallpaper.id}
              className="flex-shrink-0 w-48"
            >
              <button
                onClick={() => handleWallpaperClick(wallpaper)}
                className="w-full text-left group"
              >
                <div className="relative aspect-[4/3] bg-secondary-100 rounded-lg overflow-hidden mb-2">
                  <Image
                    src={wallpaper.imageUrl}
                    alt={wallpaper.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200" />
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs backdrop-blur-sm">
                    <Icon name="Download" size={12} className="inline mr-1" />
                    {formatNumber(wallpaper.downloads)}
                  </div>
                </div>
                <h3 className="font-medium text-text-primary text-sm truncate group-hover:text-primary transition-colors duration-150">
                  {wallpaper.title}
                </h3>
                <p className="text-text-secondary text-xs truncate">by {wallpaper.creator}</p>
              </button>
            </div>
          ))}
        </div>
      </div>
      
      {/* Desktop grid */}
      <div className="hidden md:grid grid-cols-5 gap-4">
        {wallpapers.map((wallpaper) => (
          <div key={wallpaper.id}>
            <button
              onClick={() => handleWallpaperClick(wallpaper)}
              className="w-full text-left group"
            >
              <div className="relative aspect-[4/3] bg-secondary-100 rounded-lg overflow-hidden mb-3">
                <Image
                  src={wallpaper.imageUrl}
                  alt={wallpaper.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200" />
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs backdrop-blur-sm">
                  <Icon name="Download" size={12} className="inline mr-1" />
                  {formatNumber(wallpaper.downloads)}
                </div>
              </div>
              <h3 className="font-medium text-text-primary text-sm truncate group-hover:text-primary transition-colors duration-150">
                {wallpaper.title}
              </h3>
              <p className="text-text-secondary text-xs truncate">by {wallpaper.creator}</p>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedWallpapers;