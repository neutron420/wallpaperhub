// src/pages/home-dashboard/components/TrendingWallpapers.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSupabase } from '../../../context/SupabaseContext';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const TrendingWallpapers = () => {
  const [favorites, setFavorites] = useState(new Set());
  const [trendingWallpapers, setTrendingWallpapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getTrendingWallpapers } = useSupabase();

  const loadTrendingWallpapers = async () => {
    setLoading(true);
    const { data, error } = await getTrendingWallpapers(6);
    
    if (!error && data) {
      setTrendingWallpapers(data);
    } else {
      // Fallback to mock data
      setTrendingWallpapers([
        {
          id: 1,
          title: "Mountain Sunrise",
          image_url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop",
          user_profiles: { username: "John Doe" },
          download_count: 8420,
          created_at: new Date().toISOString()
        },
        {
          id: 2,
          title: "Ocean Waves",
          image_url: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400&h=600&fit=crop",
          user_profiles: { username: "Jane Smith" },
          download_count: 6230,
          created_at: new Date(Date.now() - 86400000).toISOString()
        },
        {
          id: 3,
          title: "City Lights",
          image_url: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=400&h=600&fit=crop",
          user_profiles: { username: "Mike Johnson" },
          download_count: 9150,
          created_at: new Date().toISOString()
        },
        {
          id: 4,
          title: "Forest Path",
          image_url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=600&fit=crop",
          user_profiles: { username: "Sarah Wilson" },
          download_count: 5670,
          created_at: new Date(Date.now() - 172800000).toISOString()
        },
        {
          id: 5,
          title: "Desert Dunes",
          image_url: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=400&h=600&fit=crop",
          user_profiles: { username: "Alex Brown" },
          download_count: 7890,
          created_at: new Date(Date.now() - 259200000).toISOString()
        },
        {
          id: 6,
          title: "Northern Lights",
          image_url: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=400&h=600&fit=crop",
          user_profiles: { username: "Emma Davis" },
          download_count: 12340,
          created_at: new Date().toISOString()
        }
      ]);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadTrendingWallpapers();
  }, []);

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

  const isNewWallpaper = (createdAt) => {
    const created = new Date(createdAt);
    const now = new Date();
    const diffTime = Math.abs(now - created);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7; // Consider wallpapers new if uploaded within 7 days
  };

  if (loading) {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-text-primary mb-1">Trending Now</h2>
            <p className="text-text-secondary text-sm">Most downloaded this week</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-secondary-100 rounded-lg overflow-hidden animate-pulse">
              <div className="aspect-[3/4] bg-secondary-200"></div>
              <div className="p-3">
                <div className="h-4 bg-secondary-200 rounded mb-2"></div>
                <div className="h-3 bg-secondary-200 rounded mb-2 w-3/4"></div>
                <div className="flex justify-between">
                  <div className="h-3 bg-secondary-200 rounded w-16"></div>
                  <div className="h-3 bg-secondary-200 rounded w-8"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-text-primary mb-1">Trending Now</h2>
          <p className="text-text-secondary text-sm">Most downloaded this week</p>
        </div>
        <Link
          to="/wallpaper-browse-search"
          className="flex items-center space-x-1 text-primary hover:text-primary-700 text-sm font-medium transition-colors duration-150"
        >
          <span>View All</span>
          <Icon name="ChevronRight" size={16} />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {trendingWallpapers.map((wallpaper) => (
          <Link
            key={wallpaper.id}
            to={`/wallpaper-detail-download?id=${wallpaper.id}`}
            className="group block"
          >
            <div className="relative bg-secondary-100 rounded-lg overflow-hidden">
              {/* Image Container */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={wallpaper.image_url || wallpaper.imageUrl}
                  alt={wallpaper.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                
                {/* New Badge */}
                {isNewWallpaper(wallpaper.created_at) && (
                  <div className="absolute top-2 left-2">
                    <span className="bg-accent text-white text-xs font-medium px-2 py-1 rounded-full">
                      New
                    </span>
                  </div>
                )}
                
                {/* Favorite Button */}
                <button
                  onClick={(e) => toggleFavorite(wallpaper.id, e)}
                  className="absolute top-2 right-2 w-8 h-8 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/40"
                >
                  <Icon 
                    name={favorites.has(wallpaper.id) ? "Heart" : "Heart"} 
                    size={16} 
                    className={favorites.has(wallpaper.id) ? "text-red-500 fill-current" : "text-white"}
                  />
                </button>
                
                {/* Download Button */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('Download wallpaper:', wallpaper.id);
                  }}
                  className="absolute bottom-2 right-2 w-8 h-8 bg-primary/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-primary"
                >
                  <Icon name="Download" size={16} />
                </button>
              </div>
              
              {/* Content */}
              <div className="p-3">
                <h3 className="font-medium text-text-primary text-sm mb-1 line-clamp-1">
                  {wallpaper.title}
                </h3>
                <p className="text-text-secondary text-xs mb-2">
                  by {wallpaper.user_profiles?.username || wallpaper.creator || 'Unknown'}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1 text-text-secondary">
                    <Icon name="Download" size={12} />
                    <span className="text-xs">{(wallpaper.download_count || wallpaper.downloads || 0).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span className="text-xs text-text-secondary">4K</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TrendingWallpapers;