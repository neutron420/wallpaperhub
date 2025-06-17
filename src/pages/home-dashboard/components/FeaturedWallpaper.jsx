// src/pages/home-dashboard/components/FeaturedWallpaper.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSupabase } from '../../../context/SupabaseContext';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const FeaturedWallpaper = () => {
  const [featuredWallpaper, setFeaturedWallpaper] = useState(null);
  const [loading, setLoading] = useState(true);
  const { getFeaturedWallpaper } = useSupabase();

  const loadFeaturedWallpaper = async () => {
    setLoading(true);
    const { data, error } = await getFeaturedWallpaper();
    
    if (!error && data) {
      setFeaturedWallpaper(data);
    } else {
      // Fallback to a default featured wallpaper
      setFeaturedWallpaper({
        id: 'default',
        title: 'Mountain Sunrise',
        image_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
        user_profiles: {
          username: 'Nature Lover',
          avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
        },
        wallpaper_categories: {
          name: 'Nature'
        },
        download_count: 15420,
        like_count: 892
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    loadFeaturedWallpaper();
  }, []);

  if (loading) {
    return (
      <div className="relative h-80 md:h-96 bg-secondary-100 rounded-2xl overflow-hidden animate-pulse">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent">
          <div className="absolute bottom-6 left-6 right-6">
            <div className="h-4 bg-white/20 rounded mb-2"></div>
            <div className="h-6 bg-white/30 rounded mb-4 w-3/4"></div>
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-white/20 rounded-full"></div>
              <div className="h-4 bg-white/20 rounded w-24"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!featuredWallpaper) {
    return null;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold text-text-primary mb-1">Featured Today</h2>
          <p className="text-text-secondary text-sm">Handpicked by our community</p>
        </div>
        <Link
          to="/wallpaper-browse-search"
          className="text-primary hover:text-primary-700 text-sm font-medium transition-colors duration-150"
        >
          Explore More
        </Link>
      </div>

      <Link
        to={`/wallpaper-detail-download?id=${featuredWallpaper.id}`}
        className="group block"
      >
        <div className="relative h-80 md:h-96 bg-secondary-100 rounded-2xl overflow-hidden">
          <Image
            src={featuredWallpaper.image_url}
            alt={featuredWallpaper.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent">
            {/* Category Badge */}
            <div className="absolute top-4 left-4">
              <span className="bg-black/30 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full">
                {featuredWallpaper.wallpaper_categories?.name || 'Featured'}
              </span>
            </div>
            
            {/* Action Buttons */}
            <div className="absolute top-4 right-4 flex space-x-2">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log('Like wallpaper:', featuredWallpaper.id);
                }}
                className="w-10 h-10 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/50 transition-colors duration-150"
              >
                <Icon name="Heart" size={18} />
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log('Download wallpaper:', featuredWallpaper.id);
                }}
                className="w-10 h-10 bg-primary/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-primary transition-colors duration-150"
              >
                <Icon name="Download" size={18} />
              </button>
            </div>
            
            {/* Content */}
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="TrendingUp" size={14} className="text-accent" />
                <span className="text-accent text-sm font-medium">Featured</span>
              </div>
              
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                {featuredWallpaper.title}
              </h3>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Image
                    src={featuredWallpaper.user_profiles?.avatar_url || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'}
                    alt={featuredWallpaper.user_profiles?.username || 'Creator'}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="text-white/90 text-sm">
                    by {featuredWallpaper.user_profiles?.username || 'Creator'}
                  </span>
                </div>
                
                <div className="flex items-center space-x-4 text-white/80 text-sm">
                  <div className="flex items-center space-x-1">
                    <Icon name="Download" size={14} />
                    <span>{(featuredWallpaper.download_count || 0).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Heart" size={14} />
                    <span>{(featuredWallpaper.like_count || 0).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default FeaturedWallpaper;