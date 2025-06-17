// src/pages/home-dashboard/index.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSupabase } from '../../context/SupabaseContext';
import Icon from 'components/AppIcon';

import Header from 'components/ui/Header';
import BottomNavigation from 'components/ui/BottomNavigation';
import QuickActionButton from 'components/ui/QuickActionButton';
import FeaturedWallpaper from './components/FeaturedWallpaper';
import TrendingWallpapers from './components/TrendingWallpapers';
import CategoryShortcuts from './components/CategoryShortcuts';
import UserStatsWidget from './components/UserStatsWidget';
import RecentActivity from './components/RecentActivity';
import PersonalizedRecommendations from './components/PersonalizedRecommendations';

const HomeDashboard = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshOffset, setRefreshOffset] = useState(0);
  const [userStats, setUserStats] = useState(null);
  const { user, userProfile, getUserStats } = useSupabase();

  // Pull to refresh functionality
  const handleTouchStart = (e) => {
    if (window.scrollY === 0) {
      const startY = e.touches[0].clientY;
      
      const handleTouchMove = (e) => {
        const currentY = e.touches[0].clientY;
        const diff = currentY - startY;
        
        if (diff > 0 && diff < 100) {
          setRefreshOffset(diff);
        }
      };

      const handleTouchEnd = () => {
        if (refreshOffset > 60) {
          handleRefresh();
        }
        setRefreshOffset(0);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };

      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleTouchEnd);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Refresh user stats and other data
    await loadUserStats();
    // Simulate additional refresh time
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  const loadUserStats = async () => {
    if (user) {
      const { data, error } = await getUserStats();
      if (!error && data) {
        setUserStats(data);
      }
    }
  };

  useEffect(() => {
    document.addEventListener('touchstart', handleTouchStart);
    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
    };
  }, [refreshOffset]);

  useEffect(() => {
    loadUserStats();
  }, [user]);

  // Create user object for components that expect it
  const currentUser = {
    id: user?.id,
    name: userProfile?.full_name || userProfile?.username || 'User',
    avatar: userProfile?.avatar_url || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    stats: userStats || {
      uploads: 0,
      favorites: 0,
      downloads: 0
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BottomNavigation />
      <QuickActionButton />

      {/* Pull to refresh indicator */}
      {(refreshOffset > 0 || isRefreshing) && (
        <div 
          className="fixed top-14 left-0 right-0 z-90 flex items-center justify-center bg-primary text-white py-2 transition-all duration-300"
          style={{ transform: `translateY(${Math.min(refreshOffset - 60, 0)}px)` }}
        >
          <div className="flex items-center space-x-2">
            {isRefreshing ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm font-medium">Refreshing...</span>
              </>
            ) : (
              <>
                <Icon name="RefreshCw" size={16} className="text-white" />
                <span className="text-sm font-medium">Pull to refresh</span>
              </>
            )}
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="pt-14 md:pt-28 pb-20 md:pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Welcome Section */}
          <div className="mb-6 md:mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-1">
                  Welcome back, {currentUser.name.split(' ')[0]}!
                </h1>
                <p className="text-text-secondary">
                  Discover amazing wallpapers and share your creativity
                </p>
              </div>
              <div className="hidden md:block">
                <UserStatsWidget user={currentUser} />
              </div>
            </div>
          </div>

          {/* Mobile Stats Widget */}
          <div className="md:hidden mb-6">
            <UserStatsWidget user={currentUser} />
          </div>

          {/* Featured Wallpaper */}
          <div className="mb-8">
            <FeaturedWallpaper />
          </div>

          {/* Category Shortcuts */}
          <div className="mb-8">
            <CategoryShortcuts />
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:grid lg:grid-cols-12 lg:gap-8">
            {/* Main Content */}
            <div className="lg:col-span-8">
              {/* Trending Wallpapers */}
              <div className="mb-8">
                <TrendingWallpapers />
              </div>

              {/* Personalized Recommendations */}
              <div className="mb-8">
                <PersonalizedRecommendations />
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4">
              <div className="sticky top-32 space-y-6">
                {/* Recent Activity */}
                <RecentActivity />

                {/* Quick Actions */}
                <div className="card p-6">
                  <h3 className="text-lg font-semibold text-text-primary mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <Link
                      to="/upload-wallpaper"
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-secondary-50 transition-colors duration-150"
                    >
                      <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
                        <Icon name="ImagePlus" size={20} className="text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-text-primary">Upload Wallpaper</p>
                        <p className="text-sm text-text-secondary">Share your creativity</p>
                      </div>
                    </Link>
                    <Link
                      to="/wallpaper-browse-search"
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-secondary-50 transition-colors duration-150"
                    >
                      <div className="w-10 h-10 bg-accent-50 rounded-lg flex items-center justify-center">
                        <Icon name="Search" size={20} className="text-accent" />
                      </div>
                      <div>
                        <p className="font-medium text-text-primary">Browse Gallery</p>
                        <p className="text-sm text-text-secondary">Discover new wallpapers</p>
                      </div>
                    </Link>
                    <Link
                      to="/user-profile-collections"
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-secondary-50 transition-colors duration-150"
                    >
                      <div className="w-10 h-10 bg-success-50 rounded-lg flex items-center justify-center">
                        <Icon name="Heart" size={20} className="text-success" />
                      </div>
                      <div>
                        <p className="font-medium text-text-primary">My Collections</p>
                        <p className="text-sm text-text-secondary">View saved wallpapers</p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden space-y-8">
            {/* Trending Wallpapers */}
            <TrendingWallpapers />

            {/* Recent Activity */}
            <RecentActivity />

            {/* Personalized Recommendations */}
            <PersonalizedRecommendations />
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomeDashboard;