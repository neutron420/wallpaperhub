import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const PersonalizedRecommendations = () => {
  const [favorites, setFavorites] = useState(new Set());

  const recommendations = [
    {
      id: 1,
      title: "Misty Forest Morning",
      imageUrl: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=600&fit=crop",
      creator: "Nature Lover",
      downloads: 3420,
      reason: "Based on your love for nature wallpapers"
    },
    {
      id: 2,
      title: "Geometric Patterns",
      imageUrl: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=400&h=600&fit=crop",
      creator: "Abstract Artist",
      downloads: 2150,
      reason: "Similar to your recent downloads"
    },
    {
      id: 3,
      title: "Starry Night Sky",
      imageUrl: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=400&h=600&fit=crop",
      creator: "Sky Watcher",
      downloads: 5670,
      reason: "Popular in your favorite categories"
    },
    {
      id: 4,
      title: "Urban Architecture",
      imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=600&fit=crop",
      creator: "City Explorer",
      downloads: 1890,
      reason: "Trending among users like you"
    }
  ];

  const toggleFavorite = (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-text-primary mb-1">Recommended for You</h2>
          <p className="text-text-secondary text-sm">Curated based on your preferences</p>
        </div>
        <Link
          to="/wallpaper-browse-search"
          className="flex items-center space-x-1 text-primary hover:text-primary-700 text-sm font-medium transition-colors duration-150"
        >
          <span>More</span>
          <Icon name="ChevronRight" size={16} />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {recommendations.map((wallpaper) => (
          <Link
            key={wallpaper.id}
            to="/wallpaper-detail-download"
            className="group block"
          >
            <div className="relative bg-secondary-100 rounded-lg overflow-hidden">
              {/* Image Container */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={wallpaper.imageUrl}
                  alt={wallpaper.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                
                {/* Recommendation Badge */}
                <div className="absolute top-2 left-2">
                  <span className="bg-primary text-white text-xs font-medium px-2 py-1 rounded-full flex items-center space-x-1">
                    <Icon name="Sparkles" size={12} />
                    <span>For You</span>
                  </span>
                </div>
                
                {/* Action Buttons */}
                <div className="absolute top-2 right-2 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={(e) => toggleFavorite(wallpaper.id, e)}
                    className="w-8 h-8 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/40"
                  >
                    <Icon 
                      name="Heart" 
                      size={16} 
                      className={favorites.has(wallpaper.id) ? "text-red-500 fill-current" : "text-white"}
                    />
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      console.log('Download wallpaper:', wallpaper.id);
                    }}
                    className="w-8 h-8 bg-primary/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-primary"
                  >
                    <Icon name="Download" size={16} />
                  </button>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-3">
                <h3 className="font-medium text-text-primary text-sm mb-1 line-clamp-1">
                  {wallpaper.title}
                </h3>
                <p className="text-text-secondary text-xs mb-2">
                  by {wallpaper.creator}
                </p>
                
                {/* Recommendation Reason */}
                <div className="mb-2">
                  <p className="text-xs text-primary bg-primary-50 px-2 py-1 rounded-full line-clamp-1">
                    {wallpaper.reason}
                  </p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1 text-text-secondary">
                    <Icon name="Download" size={12} />
                    <span className="text-xs">{wallpaper.downloads.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span className="text-xs text-text-secondary">HD</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Personalization Tip */}
      <div className="mt-6 p-4 bg-accent-50 border border-accent-200 rounded-lg">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-accent-100 rounded-full flex items-center justify-center flex-shrink-0">
            <Icon name="Lightbulb" size={16} className="text-accent-600" />
          </div>
          <div>
            <h4 className="font-medium text-accent-800 mb-1">Improve Your Recommendations</h4>
            <p className="text-sm text-accent-700 mb-2">
              Like, download, and favorite more wallpapers to get better personalized suggestions.
            </p>
            <Link
              to="/user-profile-collections"
              className="text-sm text-accent-600 hover:text-accent-700 font-medium"
            >
              Manage Preferences →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalizedRecommendations;