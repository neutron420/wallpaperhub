import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';
import Header from 'components/ui/Header';
import BottomNavigation from 'components/ui/BottomNavigation';
import WallpaperActions from './components/WallpaperActions';
import CreatorInfo from './components/CreatorInfo';
import RelatedWallpapers from './components/RelatedWallpapers';
import CommentsSection from './components/CommentsSection';
import DownloadModal from './components/DownloadModal';
import ShareModal from './components/ShareModal';

const WallpaperDetailDownload = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [viewCount, setViewCount] = useState(0);

  // Mock wallpaper data
  const wallpaperData = {
    id: "wp_001",
    title: "Serene Mountain Landscape at Golden Hour",
    description: `A breathtaking view of snow-capped mountains during golden hour, with warm sunlight casting dramatic shadows across the peaks. This high-resolution wallpaper captures the perfect moment when day transitions to evening, creating a peaceful and inspiring atmosphere perfect for any device background.

The composition features layered mountain ranges extending into the distance, with rich textures and natural color gradients that showcase the raw beauty of untouched wilderness.`,
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop",
    thumbnailUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    originalWidth: 3840,
    originalHeight: 2160,
    fileSize: "4.2 MB",
    uploadDate: "2024-01-15",
    category: "Nature",
    tags: ["mountains", "landscape", "golden hour", "nature", "scenic", "peaceful", "wilderness", "sunset"],
    views: 15420,
    downloads: 3240,
    favorites: 892,
    creator: {
      id: "user_123",
      name: "Alex Chen",
      username: "@alexchen_photo",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      followers: 12500,
      totalUploads: 156,
      isVerified: true,
      bio: "Professional landscape photographer capturing the world\'s most beautiful moments"
    },
    downloadOptions: [
      { label: "Mobile (720p)", width: 720, height: 1280, size: "0.8 MB" },
      { label: "Tablet (1080p)", width: 1080, height: 1920, size: "1.5 MB" },
      { label: "Desktop (1440p)", width: 2560, height: 1440, size: "2.8 MB" },
      { label: "4K Original", width: 3840, height: 2160, size: "4.2 MB" }
    ],
    colors: ["#FF6B35", "#F7931E", "#FFD23F", "#06D6A0", "#118AB2"],
    camera: {
      make: "Canon",
      model: "EOS R5",
      lens: "RF 24-70mm f/2.8L",
      settings: "f/8, 1/125s, ISO 100"
    }
  };

  const relatedWallpapers = [
    {
      id: "wp_002",
      title: "Alpine Lake Reflection",
      imageUrl: "https://images.unsplash.com/photo-1464822759844-d150baec4ba5?w=400&h=300&fit=crop",
      creator: "Alex Chen",
      downloads: 2100
    },
    {
      id: "wp_003",
      title: "Forest Path Morning Light",
      imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop",
      creator: "Sarah Wilson",
      downloads: 1850
    },
    {
      id: "wp_004",
      title: "Desert Sunset Dunes",
      imageUrl: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=400&h=300&fit=crop",
      creator: "Mike Rodriguez",
      downloads: 3200
    },
    {
      id: "wp_005",
      title: "Ocean Waves at Dawn",
      imageUrl: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400&h=300&fit=crop",
      creator: "Emma Thompson",
      downloads: 2750
    },
    {
      id: "wp_006",
      title: "Autumn Forest Canopy",
      imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop",
      creator: "David Park",
      downloads: 1920
    }
  ];

  useEffect(() => {
    // Simulate view count increment
    setViewCount(wallpaperData.views + 1);
    
    // Check if wallpaper is favorited (mock check)
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorited(favorites.includes(wallpaperData.id));
    
    // Check if following creator (mock check)
    const following = JSON.parse(localStorage.getItem('following') || '[]');
    setIsFollowing(following.includes(wallpaperData.creator.id));
  }, [wallpaperData.id, wallpaperData.creator.id]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    let updatedFavorites;
    
    if (isFavorited) {
      updatedFavorites = favorites.filter(id => id !== wallpaperData.id);
    } else {
      updatedFavorites = [...favorites, wallpaperData.id];
    }
    
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setIsFavorited(!isFavorited);
  };

  const handleFollow = () => {
    const following = JSON.parse(localStorage.getItem('following') || '[]');
    let updatedFollowing;
    
    if (isFollowing) {
      updatedFollowing = following.filter(id => id !== wallpaperData.creator.id);
    } else {
      updatedFollowing = [...following, wallpaperData.creator.id];
    }
    
    localStorage.setItem('following', JSON.stringify(updatedFollowing));
    setIsFollowing(!isFollowing);
  };

  const handleDownload = (option = null) => {
    if (option) {
      console.log(`Downloading ${option.label}:`, option);
      // Simulate download
      const link = document.createElement('a');
      link.href = wallpaperData.imageUrl;
      link.download = `${wallpaperData.title.replace(/\s+/g, '_')}_${option.width}x${option.height}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setShowDownloadModal(false);
    } else {
      setShowDownloadModal(true);
    }
  };

  const handleShare = () => {
    setShowShareModal(true);
  };

  const handleTagClick = (tag) => {
    navigate(`/wallpaper-browse-search?tag=${encodeURIComponent(tag)}`);
  };

  const handleCreatorClick = () => {
    navigate(`/user-profile-collections?user=${wallpaperData.creator.username}`);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
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
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-14 md:pt-32 pb-20 md:pb-8">
        {/* Mobile Layout */}
        <div className="md:hidden">
          {/* Hero Image */}
          <div className="relative w-full aspect-[4/3] bg-secondary-100">
            <Image
              src={wallpaperData.imageUrl}
              alt={wallpaperData.title}
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                isImageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setIsImageLoaded(true)}
            />
            
            {/* Loading placeholder */}
            {!isImageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            
            {/* Overlay controls */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
              <button
                onClick={handleBack}
                className="w-10 h-10 bg-black bg-opacity-50 rounded-full flex items-center justify-center backdrop-blur-sm"
              >
                <Icon name="ArrowLeft" size={20} className="text-white" />
              </button>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleShare}
                  className="w-10 h-10 bg-black bg-opacity-50 rounded-full flex items-center justify-center backdrop-blur-sm"
                >
                  <Icon name="Share2" size={18} className="text-white" />
                </button>
                <button
                  onClick={handleFavorite}
                  className="w-10 h-10 bg-black bg-opacity-50 rounded-full flex items-center justify-center backdrop-blur-sm"
                >
                  <Icon 
                    name={isFavorited ? "Heart" : "Heart"} 
                    size={18} 
                    className={isFavorited ? "text-red-500 fill-current" : "text-white"} 
                  />
                </button>
              </div>
            </div>
            
            {/* Download button */}
            <div className="absolute bottom-4 right-4">
              <button
                onClick={() => handleDownload()}
                className="bg-primary hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium shadow-lg flex items-center space-x-2"
              >
                <Icon name="Download" size={18} />
                <span>Download</span>
              </button>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-4 space-y-6">
            {/* Title and metadata */}
            <div>
              <h1 className="text-xl font-semibold text-text-primary mb-2">
                {wallpaperData.title}
              </h1>
              <div className="flex items-center space-x-4 text-sm text-text-secondary">
                <span className="flex items-center space-x-1">
                  <Icon name="Eye" size={16} />
                  <span>{formatNumber(viewCount)}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Icon name="Download" size={16} />
                  <span>{formatNumber(wallpaperData.downloads)}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Icon name="Heart" size={16} />
                  <span>{formatNumber(wallpaperData.favorites)}</span>
                </span>
              </div>
            </div>
            
            {/* Creator info */}
            <CreatorInfo 
              creator={wallpaperData.creator}
              isFollowing={isFollowing}
              onFollow={handleFollow}
              onCreatorClick={handleCreatorClick}
            />
            
            {/* Tags */}
            <div>
              <h3 className="text-sm font-medium text-text-primary mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {wallpaperData.tags.map((tag, index) => (
                  <button
                    key={index}
                    onClick={() => handleTagClick(tag)}
                    className="px-3 py-1 bg-secondary-100 hover:bg-secondary-200 text-text-secondary text-sm rounded-full transition-colors duration-150"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Description */}
            {wallpaperData.description && (
              <div>
                <h3 className="text-sm font-medium text-text-primary mb-2">Description</h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {wallpaperData.description}
                </p>
              </div>
            )}
            
            {/* Technical details */}
            <div className="grid grid-cols-2 gap-4 p-4 bg-secondary-50 rounded-lg">
              <div>
                <span className="text-xs text-text-secondary">Resolution</span>
                <p className="text-sm font-medium text-text-primary">
                  {wallpaperData.originalWidth} × {wallpaperData.originalHeight}
                </p>
              </div>
              <div>
                <span className="text-xs text-text-secondary">File Size</span>
                <p className="text-sm font-medium text-text-primary">{wallpaperData.fileSize}</p>
              </div>
              <div>
                <span className="text-xs text-text-secondary">Category</span>
                <p className="text-sm font-medium text-text-primary">{wallpaperData.category}</p>
              </div>
              <div>
                <span className="text-xs text-text-secondary">Upload Date</span>
                <p className="text-sm font-medium text-text-primary">
                  {formatDate(wallpaperData.uploadDate)}
                </p>
              </div>
            </div>
            
            {/* Actions */}
            <WallpaperActions 
              wallpaper={wallpaperData}
              isFavorited={isFavorited}
              onFavorite={handleFavorite}
              onShare={handleShare}
              onDownload={() => handleDownload()}
            />
          </div>
        </div>
        
        {/* Desktop Layout */}
        <div className="hidden md:block">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="grid grid-cols-12 gap-8">
              {/* Image Preview - 8 columns */}
              <div className="col-span-8">
                <div className="sticky top-32">
                  <div className="relative aspect-video bg-secondary-100 rounded-lg overflow-hidden">
                    <Image
                      src={wallpaperData.imageUrl}
                      alt={wallpaperData.title}
                      className={`w-full h-full object-cover transition-opacity duration-300 ${
                        isImageLoaded ? 'opacity-100' : 'opacity-0'
                      }`}
                      onLoad={() => setIsImageLoaded(true)}
                    />
                    
                    {!isImageLoaded && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    )}
                    
                    {/* Overlay controls */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between opacity-0 hover:opacity-100 transition-opacity duration-200">
                      <button
                        onClick={handleBack}
                        className="w-10 h-10 bg-black bg-opacity-50 rounded-full flex items-center justify-center backdrop-blur-sm"
                      >
                        <Icon name="ArrowLeft" size={20} className="text-white" />
                      </button>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={handleShare}
                          className="w-10 h-10 bg-black bg-opacity-50 rounded-full flex items-center justify-center backdrop-blur-sm"
                        >
                          <Icon name="Share2" size={18} className="text-white" />
                        </button>
                        <button
                          onClick={handleFavorite}
                          className="w-10 h-10 bg-black bg-opacity-50 rounded-full flex items-center justify-center backdrop-blur-sm"
                        >
                          <Icon 
                            name={isFavorited ? "Heart" : "Heart"} 
                            size={18} 
                            className={isFavorited ? "text-red-500 fill-current" : "text-white"} 
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Sidebar - 4 columns */}
              <div className="col-span-4 space-y-6">
                {/* Title and metadata */}
                <div>
                  <h1 className="text-2xl font-semibold text-text-primary mb-3">
                    {wallpaperData.title}
                  </h1>
                  <div className="flex items-center space-x-6 text-sm text-text-secondary">
                    <span className="flex items-center space-x-1">
                      <Icon name="Eye" size={16} />
                      <span>{formatNumber(viewCount)} views</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Icon name="Download" size={16} />
                      <span>{formatNumber(wallpaperData.downloads)} downloads</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Icon name="Heart" size={16} />
                      <span>{formatNumber(wallpaperData.favorites)} favorites</span>
                    </span>
                  </div>
                </div>
                
                {/* Download button */}
                <button
                  onClick={() => handleDownload()}
                  className="w-full bg-primary hover:bg-primary-700 text-white py-3 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors duration-150"
                >
                  <Icon name="Download" size={20} />
                  <span>Download Wallpaper</span>
                </button>
                
                {/* Creator info */}
                <CreatorInfo 
                  creator={wallpaperData.creator}
                  isFollowing={isFollowing}
                  onFollow={handleFollow}
                  onCreatorClick={handleCreatorClick}
                />
                
                {/* Description */}
                {wallpaperData.description && (
                  <div>
                    <h3 className="text-sm font-medium text-text-primary mb-2">Description</h3>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      {wallpaperData.description}
                    </p>
                  </div>
                )}
                
                {/* Tags */}
                <div>
                  <h3 className="text-sm font-medium text-text-primary mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {wallpaperData.tags.map((tag, index) => (
                      <button
                        key={index}
                        onClick={() => handleTagClick(tag)}
                        className="px-3 py-1 bg-secondary-100 hover:bg-secondary-200 text-text-secondary text-sm rounded-full transition-colors duration-150"
                      >
                        #{tag}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Technical details */}
                <div className="space-y-3 p-4 bg-secondary-50 rounded-lg">
                  <h3 className="text-sm font-medium text-text-primary">Technical Details</h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-text-secondary">Resolution</span>
                      <p className="font-medium text-text-primary">
                        {wallpaperData.originalWidth} × {wallpaperData.originalHeight}
                      </p>
                    </div>
                    <div>
                      <span className="text-text-secondary">File Size</span>
                      <p className="font-medium text-text-primary">{wallpaperData.fileSize}</p>
                    </div>
                    <div>
                      <span className="text-text-secondary">Category</span>
                      <p className="font-medium text-text-primary">{wallpaperData.category}</p>
                    </div>
                    <div>
                      <span className="text-text-secondary">Upload Date</span>
                      <p className="font-medium text-text-primary">
                        {formatDate(wallpaperData.uploadDate)}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Color palette */}
                <div>
                  <h3 className="text-sm font-medium text-text-primary mb-2">Color Palette</h3>
                  <div className="flex space-x-2">
                    {wallpaperData.colors.map((color, index) => (
                      <div
                        key={index}
                        className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
                
                {/* Actions */}
                <WallpaperActions 
                  wallpaper={wallpaperData}
                  isFavorited={isFavorited}
                  onFavorite={handleFavorite}
                  onShare={handleShare}
                  onDownload={() => handleDownload()}
                />
              </div>
            </div>
            
            {/* Related wallpapers */}
            <div className="mt-12">
              <RelatedWallpapers wallpapers={relatedWallpapers} />
            </div>
            
            {/* Comments section */}
            <div className="mt-12">
              <CommentsSection wallpaperId={wallpaperData.id} />
            </div>
          </div>
        </div>
      </main>
      
      <BottomNavigation />
      
      {/* Modals */}
      {showDownloadModal && (
        <DownloadModal
          wallpaper={wallpaperData}
          onClose={() => setShowDownloadModal(false)}
          onDownload={handleDownload}
        />
      )}
      
      {showShareModal && (
        <ShareModal
          wallpaper={wallpaperData}
          onClose={() => setShowShareModal(false)}
        />
      )}
    </div>
  );
};

export default WallpaperDetailDownload;