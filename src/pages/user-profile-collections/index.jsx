import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from 'components/ui/Header';
import BottomNavigation from 'components/ui/BottomNavigation';
import QuickActionButton from 'components/ui/QuickActionButton';
import Icon from 'components/AppIcon';

import ProfileHeader from './components/ProfileHeader';
import ProfileStats from './components/ProfileStats';
import WallpaperGrid from './components/WallpaperGrid';
import CollectionGrid from './components/CollectionGrid';
import ActivityFeed from './components/ActivityFeed';
import EditProfileModal from './components/EditProfileModal';

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState('uploads');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const navigate = useNavigate();

  // Mock user data
  const currentUser = {
    id: 1,
    username: "alexcreative",
    displayName: "Alex Rodriguez",
    email: "alex@example.com",
    bio: `Digital artist and photographer passionate about creating stunning visual experiences. I specialize in nature photography, abstract art, and minimalist designs that bring peace and inspiration to your digital spaces.

Follow my journey as I explore the intersection of technology and art, sharing wallpapers that transform ordinary screens into windows of creativity and wonder.`,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    coverImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=400&fit=crop",
    joinDate: "2023-01-15",
    location: "San Francisco, CA",
    website: "https://alexcreative.com",
    isVerified: true,
    stats: {
      uploads: 247,
      downloads: 125430,
      favorites: 89,
      followers: 12500,
      following: 342,
      views: 890234,
      collections: 15
    }
  };

  // Mock wallpapers data
  const userWallpapers = [
    {
      id: 1,
      title: "Mountain Sunrise",
      url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop",
      downloads: 15420,
      likes: 892,
      category: "Nature",
      resolution: "4K",
      uploadDate: "2024-01-15"
    },
    {
      id: 2,
      title: "Abstract Waves",
      url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=600&fit=crop",
      downloads: 8930,
      likes: 567,
      category: "Abstract",
      resolution: "4K",
      uploadDate: "2024-01-10"
    },
    {
      id: 3,
      title: "City Lights",
      url: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=400&h=600&fit=crop",
      downloads: 12340,
      likes: 743,
      category: "Urban",
      resolution: "4K",
      uploadDate: "2024-01-08"
    },
    {
      id: 4,
      title: "Forest Path",
      url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=600&fit=crop",
      downloads: 9876,
      likes: 654,
      category: "Nature",
      resolution: "4K",
      uploadDate: "2024-01-05"
    },
    {
      id: 5,
      title: "Ocean Waves",
      url: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400&h=600&fit=crop",
      downloads: 11230,
      likes: 789,
      category: "Nature",
      resolution: "4K",
      uploadDate: "2024-01-03"
    },
    {
      id: 6,
      title: "Geometric Pattern",
      url: "https://images.unsplash.com/photo-1557683316-973673baf926?w=400&h=600&fit=crop",
      downloads: 7654,
      likes: 432,
      category: "Abstract",
      resolution: "4K",
      uploadDate: "2024-01-01"
    }
  ];

  // Mock favorites data
  const favoriteWallpapers = [
    {
      id: 7,
      title: "Sunset Beach",
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=600&fit=crop",
      author: "Sarah Johnson",
      downloads: 23450,
      likes: 1234,
      category: "Nature"
    },
    {
      id: 8,
      title: "Neon Lights",
      url: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop",
      author: "Mike Chen",
      downloads: 18760,
      likes: 987,
      category: "Urban"
    },
    {
      id: 9,
      title: "Space Galaxy",
      url: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=600&fit=crop",
      author: "Emma Davis",
      downloads: 31200,
      likes: 1567,
      category: "Space"
    },
    {
      id: 10,
      title: "Minimalist Design",
      url: "https://images.unsplash.com/photo-1557683304-673a23048d34?w=400&h=600&fit=crop",
      author: "David Kim",
      downloads: 14320,
      likes: 765,
      category: "Minimal"
    }
  ];

  // Mock collections data
  const userCollections = [
    {
      id: 1,
      name: "Nature Escapes",
      description: "Breathtaking landscapes and natural wonders",
      wallpaperCount: 45,
      coverImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop",
      isPrivate: false,
      createdDate: "2024-01-10"
    },
    {
      id: 2,
      name: "Abstract Art",
      description: "Modern and contemporary abstract designs",
      wallpaperCount: 32,
      coverImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop",
      isPrivate: false,
      createdDate: "2024-01-08"
    },
    {
      id: 3,
      name: "Urban Vibes",
      description: "City life and architectural photography",
      wallpaperCount: 28,
      coverImage: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=300&h=200&fit=crop",
      isPrivate: true,
      createdDate: "2024-01-05"
    }
  ];

  // Mock activity data
  const recentActivity = [
    {
      id: 1,
      type: "upload",
      title: "Mountain Sunrise",
      timestamp: "2 hours ago",
      details: "Uploaded new wallpaper",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=60&h=60&fit=crop"
    },
    {
      id: 2,
      type: "like",
      title: "Ocean Waves",
      timestamp: "5 hours ago",
      details: "Received 50 new likes",
      image: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=60&h=60&fit=crop"
    },
    {
      id: 3,
      type: "collection",
      title: "Nature Escapes",
      timestamp: "1 day ago",
      details: "Created new collection",
      image: null
    },
    {
      id: 4,
      type: "follow",
      title: "Sarah Johnson",
      timestamp: "2 days ago",
      details: "Started following you",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face"
    }
  ];

  const tabs = [
    { id: 'uploads', label: 'Uploads', count: currentUser.stats.uploads },
    { id: 'favorites', label: 'Favorites', count: currentUser.stats.favorites },
    { id: 'collections', label: 'Collections', count: currentUser.stats.collections },
    { id: 'activity', label: 'Activity', count: null }
  ];

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setIsLoading(true);
    // Simulate loading
    setTimeout(() => setIsLoading(false), 500);
  };

  const handleWallpaperClick = (wallpaper) => {
    navigate('/wallpaper-detail-download', { state: { wallpaper } });
  };

  const renderTabContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center py-16">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      );
    }

    switch (activeTab) {
      case 'uploads':
        return (
          <WallpaperGrid
            wallpapers={userWallpapers}
            viewMode={viewMode}
            onWallpaperClick={handleWallpaperClick}
            showAuthor={false}
          />
        );
      case 'favorites':
        return (
          <WallpaperGrid
            wallpapers={favoriteWallpapers}
            viewMode={viewMode}
            onWallpaperClick={handleWallpaperClick}
            showAuthor={true}
          />
        );
      case 'collections':
        return (
          <CollectionGrid
            collections={userCollections}
            onCollectionClick={(collection) => console.log('Collection clicked:', collection)}
          />
        );
      case 'activity':
        return <ActivityFeed activities={recentActivity} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BottomNavigation />
      <QuickActionButton />

      {/* Main Content */}
      <div className="pt-14 md:pt-28 pb-20 md:pb-8">
        {/* Profile Header */}
        <ProfileHeader
          user={currentUser}
          onEditProfile={() => setIsEditModalOpen(true)}
          onFollow={() => console.log('Follow user')}
          onMessage={() => console.log('Message user')}
        />

        {/* Desktop Layout */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar - Desktop Only */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="sticky top-32 space-y-6">
                {/* Profile Stats */}
                <ProfileStats stats={currentUser.stats} />

                {/* Quick Actions */}
                <div className="card p-4">
                  <h3 className="font-semibold text-text-primary mb-3">Quick Actions</h3>
                  <div className="space-y-2">
                    <Link
                      to="/upload-wallpaper"
                      className="flex items-center space-x-2 p-2 rounded-lg hover:bg-secondary-50 transition-colors duration-150"
                    >
                      <Icon name="Upload" size={16} className="text-primary" />
                      <span className="text-sm text-text-secondary">Upload Wallpaper</span>
                    </Link>
                    <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-secondary-50 transition-colors duration-150 w-full text-left">
                      <Icon name="FolderPlus" size={16} className="text-accent" />
                      <span className="text-sm text-text-secondary">Create Collection</span>
                    </button>
                    <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-secondary-50 transition-colors duration-150 w-full text-left">
                      <Icon name="Share2" size={16} className="text-secondary-600" />
                      <span className="text-sm text-text-secondary">Share Profile</span>
                    </button>
                  </div>
                </div>

                {/* Recent Activity Preview */}
                <div className="card p-4">
                  <h3 className="font-semibold text-text-primary mb-3">Recent Activity</h3>
                  <div className="space-y-3">
                    {recentActivity.slice(0, 3).map((activity) => (
                      <div key={activity.id} className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary-50 rounded-full flex items-center justify-center flex-shrink-0">
                          <Icon
                            name={activity.type === 'upload' ? 'Upload' : activity.type === 'like' ? 'Heart' : activity.type === 'collection' ? 'Folder' : 'UserPlus'}
                            size={14}
                            className="text-primary"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-text-secondary truncate">{activity.details}</p>
                          <p className="text-xs text-text-muted">{activity.timestamp}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Mobile Stats */}
              <div className="lg:hidden mb-6">
                <ProfileStats stats={currentUser.stats} />
              </div>

              {/* Tabs */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex space-x-1 bg-secondary-100 rounded-lg p-1">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => handleTabChange(tab.id)}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-150 ${
                          activeTab === tab.id
                            ? 'bg-surface text-primary shadow-sm'
                            : 'text-text-secondary hover:text-text-primary'
                        }`}
                      >
                        {tab.label}
                        {tab.count !== null && (
                          <span className={`ml-2 text-xs ${
                            activeTab === tab.id ? 'text-primary' : 'text-text-muted'
                          }`}>
                            {tab.count}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>

                  {/* View Mode Toggle - Only for uploads and favorites */}
                  {(activeTab === 'uploads' || activeTab === 'favorites') && (
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2 rounded-lg transition-colors duration-150 ${
                          viewMode === 'grid' ?'bg-primary text-white' :'bg-secondary-100 text-secondary-600 hover:bg-secondary-200'
                        }`}
                      >
                        <Icon name="Grid3X3" size={16} />
                      </button>
                      <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 rounded-lg transition-colors duration-150 ${
                          viewMode === 'list' ?'bg-primary text-white' :'bg-secondary-100 text-secondary-600 hover:bg-secondary-200'
                        }`}
                      >
                        <Icon name="List" size={16} />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Tab Content */}
              <div className="min-h-96">
                {renderTabContent()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        user={currentUser}
        onSave={(updatedUser) => {
          console.log('Updated user:', updatedUser);
          setIsEditModalOpen(false);
        }}
      />
    </div>
  );
};

export default UserProfile;