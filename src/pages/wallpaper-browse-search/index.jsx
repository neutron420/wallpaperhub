import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from 'components/ui/Header';
import BottomNavigation from 'components/ui/BottomNavigation';
import QuickActionButton from 'components/ui/QuickActionButton';
import Icon from 'components/AppIcon';


// Components
import FilterPanel from './components/FilterPanel';
import WallpaperCard from './components/WallpaperCard';
import SortDropdown from './components/SortDropdown';
import EmptyState from './components/EmptyState';

const WallpaperBrowseSearch = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [wallpapers, setWallpapers] = useState([]);
  const [filteredWallpapers, setFilteredWallpapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [sortBy, setSortBy] = useState('relevance');
  const [activeFilters, setActiveFilters] = useState({
    categories: [],
    resolutions: [],
    orientations: [],
    tags: [],
    colors: [],
    dateRange: null
  });
  const [recentSearches, setRecentSearches] = useState([
    'Nature wallpapers',
    'Abstract art',
    '4K landscapes',
    'Minimalist designs'
  ]);

  const observer = useRef();
  const lastWallpaperElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMoreWallpapers();
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  // Mock wallpaper data
  const mockWallpapers = [
    {
      id: 1,
      title: "Mountain Sunrise",
      creator: "Alex Johnson",
      creatorAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
      imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      thumbnailUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      category: "Nature",
      tags: ["mountain", "sunrise", "landscape", "scenic"],
      resolution: "4K",
      orientation: "landscape",
      aspectRatio: "16:9",
      downloads: 1250,
      likes: 89,
      views: 3420,
      uploadDate: "2024-01-15",
      colors: ["orange", "blue", "yellow"],
      isFavorite: false,
      isPremium: false
    },
    {
      id: 2,
      title: "Abstract Geometry",
      creator: "Sarah Chen",
      creatorAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
      imageUrl: "https://images.unsplash.com/photo-1557683316-973673baf926?w=800&h=600&fit=crop",
      thumbnailUrl: "https://images.unsplash.com/photo-1557683316-973673baf926?w=400&h=300&fit=crop",
      category: "Abstract",
      tags: ["geometric", "modern", "colorful", "digital"],
      resolution: "2K",
      orientation: "portrait",
      aspectRatio: "9:16",
      downloads: 890,
      likes: 156,
      views: 2100,
      uploadDate: "2024-01-12",
      colors: ["purple", "pink", "blue"],
      isFavorite: true,
      isPremium: false
    },
    {
      id: 3,
      title: "Ocean Waves",
      creator: "Mike Rodriguez",
      creatorAvatar: "https://randomuser.me/api/portraits/men/18.jpg",
      imageUrl: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800&h=600&fit=crop",
      thumbnailUrl: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400&h=300&fit=crop",
      category: "Nature",
      tags: ["ocean", "waves", "blue", "peaceful"],
      resolution: "4K",
      orientation: "landscape",
      aspectRatio: "16:9",
      downloads: 2100,
      likes: 234,
      views: 5670,
      uploadDate: "2024-01-10",
      colors: ["blue", "white", "turquoise"],
      isFavorite: false,
      isPremium: true
    },
    {
      id: 4,
      title: "City Lights",
      creator: "Emma Wilson",
      creatorAvatar: "https://randomuser.me/api/portraits/women/22.jpg",
      imageUrl: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&h=600&fit=crop",
      thumbnailUrl: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=400&h=300&fit=crop",
      category: "Urban",
      tags: ["city", "night", "lights", "skyline"],
      resolution: "4K",
      orientation: "landscape",
      aspectRatio: "21:9",
      downloads: 1680,
      likes: 198,
      views: 4230,
      uploadDate: "2024-01-08",
      colors: ["yellow", "orange", "black"],
      isFavorite: true,
      isPremium: false
    },
    {
      id: 5,
      title: "Minimalist Design",
      creator: "David Kim",
      creatorAvatar: "https://randomuser.me/api/portraits/men/55.jpg",
      imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=600&fit=crop",
      thumbnailUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=300&fit=crop",
      category: "Minimalist",
      tags: ["minimal", "clean", "simple", "modern"],
      resolution: "2K",
      orientation: "portrait",
      aspectRatio: "9:16",
      downloads: 945,
      likes: 87,
      views: 1890,
      uploadDate: "2024-01-05",
      colors: ["white", "gray", "black"],
      isFavorite: false,
      isPremium: false
    },
    {
      id: 6,
      title: "Forest Path",
      creator: "Lisa Anderson",
      creatorAvatar: "https://randomuser.me/api/portraits/women/33.jpg",
      imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
      thumbnailUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop",
      category: "Nature",
      tags: ["forest", "path", "trees", "green"],
      resolution: "4K",
      orientation: "landscape",
      aspectRatio: "16:9",
      downloads: 1340,
      likes: 167,
      views: 3100,
      uploadDate: "2024-01-03",
      colors: ["green", "brown", "yellow"],
      isFavorite: false,
      isPremium: false
    }
  ];

  const categories = [
    { id: 'nature', name: 'Nature', count: 1250 },
    { id: 'abstract', name: 'Abstract', count: 890 },
    { id: 'urban', name: 'Urban', count: 670 },
    { id: 'minimalist', name: 'Minimalist', count: 450 },
    { id: 'space', name: 'Space', count: 320 },
    { id: 'animals', name: 'Animals', count: 280 }
  ];

  const resolutions = [
    { id: '4k', name: '4K (3840×2160)', count: 2100 },
    { id: '2k', name: '2K (2560×1440)', count: 1800 },
    { id: 'fhd', name: 'Full HD (1920×1080)', count: 3200 },
    { id: 'hd', name: 'HD (1280×720)', count: 890 }
  ];

  const orientations = [
    { id: 'landscape', name: 'Landscape', count: 4200 },
    { id: 'portrait', name: 'Portrait', count: 2800 },
    { id: 'square', name: 'Square', count: 650 }
  ];

  useEffect(() => {
    loadWallpapers();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [wallpapers, activeFilters, searchQuery, sortBy]);

  const loadWallpapers = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setWallpapers(mockWallpapers);
      setHasMore(false); // Since we're using mock data
    } catch (error) {
      console.error('Error loading wallpapers:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreWallpapers = async () => {
    if (loadingMore || !hasMore) return;
    
    setLoadingMore(true);
    try {
      // Simulate loading more wallpapers
      await new Promise(resolve => setTimeout(resolve, 1000));
      // In real app, append new wallpapers
      setPage(prev => prev + 1);
    } catch (error) {
      console.error('Error loading more wallpapers:', error);
    } finally {
      setLoadingMore(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...wallpapers];

    // Apply search query
    if (searchQuery) {
      filtered = filtered.filter(wallpaper =>
        wallpaper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        wallpaper.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        wallpaper.creator.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filters
    if (activeFilters.categories.length > 0) {
      filtered = filtered.filter(wallpaper =>
        activeFilters.categories.includes(wallpaper.category.toLowerCase())
      );
    }

    // Apply resolution filters
    if (activeFilters.resolutions.length > 0) {
      filtered = filtered.filter(wallpaper =>
        activeFilters.resolutions.includes(wallpaper.resolution.toLowerCase())
      );
    }

    // Apply orientation filters
    if (activeFilters.orientations.length > 0) {
      filtered = filtered.filter(wallpaper =>
        activeFilters.orientations.includes(wallpaper.orientation)
      );
    }

    // Apply tag filters
    if (activeFilters.tags.length > 0) {
      filtered = filtered.filter(wallpaper =>
        activeFilters.tags.some(tag =>
          wallpaper.tags.some(wallpaperTag =>
            wallpaperTag.toLowerCase().includes(tag.toLowerCase())
          )
        )
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));
        break;
      case 'popular':
        filtered.sort((a, b) => b.downloads - a.downloads);
        break;
      case 'likes':
        filtered.sort((a, b) => b.likes - a.likes);
        break;
      case 'views':
        filtered.sort((a, b) => b.views - a.views);
        break;
      default:
        // Relevance - keep original order for mock data
        break;
    }

    setFilteredWallpapers(filtered);
  };

  const handleFilterChange = (newFilters) => {
    setActiveFilters(newFilters);
  };

  const removeFilter = (filterType, value) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType].filter(item => item !== value)
    }));
  };

  const clearAllFilters = () => {
    setActiveFilters({
      categories: [],
      resolutions: [],
      orientations: [],
      tags: [],
      colors: [],
      dateRange: null
    });
    setSearchQuery('');
    setSearchParams({});
  };

  const handleWallpaperClick = (wallpaper) => {
    navigate('/wallpaper-detail-download', { state: { wallpaper } });
  };

  const toggleFavorite = (wallpaperId) => {
    setWallpapers(prev =>
      prev.map(wallpaper =>
        wallpaper.id === wallpaperId
          ? { ...wallpaper, isFavorite: !wallpaper.isFavorite }
          : wallpaper
      )
    );
  };

  const getActiveFilterCount = () => {
    return activeFilters.categories.length +
           activeFilters.resolutions.length +
           activeFilters.orientations.length +
           activeFilters.tags.length +
           activeFilters.colors.length +
           (activeFilters.dateRange ? 1 : 0);
  };

  const getActiveFilterChips = () => {
    const chips = [];
    
    activeFilters.categories.forEach(category => {
      const categoryData = categories.find(c => c.id === category);
      if (categoryData) {
        chips.push({
          type: 'categories',
          value: category,
          label: categoryData.name,
          count: categoryData.count
        });
      }
    });

    activeFilters.resolutions.forEach(resolution => {
      const resolutionData = resolutions.find(r => r.id === resolution);
      if (resolutionData) {
        chips.push({
          type: 'resolutions',
          value: resolution,
          label: resolutionData.name,
          count: resolutionData.count
        });
      }
    });

    activeFilters.orientations.forEach(orientation => {
      const orientationData = orientations.find(o => o.id === orientation);
      if (orientationData) {
        chips.push({
          type: 'orientations',
          value: orientation,
          label: orientationData.name,
          count: orientationData.count
        });
      }
    });

    activeFilters.tags.forEach(tag => {
      chips.push({
        type: 'tags',
        value: tag,
        label: `#${tag}`,
        count: null
      });
    });

    return chips;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <BottomNavigation />
        
        <div className="pt-14 md:pt-32 pb-20 md:pb-8">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            {/* Loading skeleton */}
            <div className="animate-pulse">
              <div className="flex items-center justify-between mb-6">
                <div className="h-8 bg-secondary-200 rounded w-48"></div>
                <div className="h-10 bg-secondary-200 rounded w-32"></div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {Array.from({ length: 12 }).map((_, index) => (
                  <div key={index} className="aspect-[3/4] bg-secondary-200 rounded-lg"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BottomNavigation />
      <QuickActionButton />

      <div className="pt-14 md:pt-32 pb-20 md:pb-8">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          {/* Filter Bar */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsFilterPanelOpen(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-surface border border-border rounded-lg hover:bg-secondary-50 transition-colors duration-150"
              >
                <Icon name="SlidersHorizontal" size={18} className="text-secondary-600" />
                <span className="text-sm font-medium text-text-primary">Filters</span>
                {getActiveFilterCount() > 0 && (
                  <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">
                    {getActiveFilterCount()}
                  </span>
                )}
              </button>

              {getActiveFilterCount() > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-secondary-600 hover:text-text-primary transition-colors duration-150"
                >
                  Clear all
                </button>
              )}
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-sm text-text-secondary hidden md:block">
                {filteredWallpapers.length.toLocaleString()} wallpapers
              </span>
              <SortDropdown value={sortBy} onChange={setSortBy} />
            </div>
          </div>

          {/* Active Filter Chips */}
          {getActiveFilterChips().length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {getActiveFilterChips().map((chip, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 px-3 py-1 bg-primary-50 border border-primary-200 rounded-full"
                >
                  <span className="text-sm text-primary-700">{chip.label}</span>
                  {chip.count && (
                    <span className="text-xs text-primary-600">({chip.count})</span>
                  )}
                  <button
                    onClick={() => removeFilter(chip.type, chip.value)}
                    className="text-primary-600 hover:text-primary-800 transition-colors duration-150"
                  >
                    <Icon name="X" size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Results */}
          {filteredWallpapers.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {filteredWallpapers.map((wallpaper, index) => (
                <WallpaperCard
                  key={wallpaper.id}
                  wallpaper={wallpaper}
                  onClick={() => handleWallpaperClick(wallpaper)}
                  onToggleFavorite={() => toggleFavorite(wallpaper.id)}
                  ref={index === filteredWallpapers.length - 1 ? lastWallpaperElementRef : null}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              searchQuery={searchQuery}
              hasFilters={getActiveFilterCount() > 0}
              onClearFilters={clearAllFilters}
              recentSearches={recentSearches}
            />
          )}

          {/* Loading More */}
          {loadingMore && (
            <div className="flex justify-center mt-8">
              <div className="flex items-center space-x-2 text-text-secondary">
                <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm">Loading more wallpapers...</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Filter Panel */}
      <FilterPanel
        isOpen={isFilterPanelOpen}
        onClose={() => setIsFilterPanelOpen(false)}
        filters={activeFilters}
        onFiltersChange={handleFilterChange}
        categories={categories}
        resolutions={resolutions}
        orientations={orientations}
      />
    </div>
  );
};

export default WallpaperBrowseSearch;