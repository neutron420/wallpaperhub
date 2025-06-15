import React from 'react';
import Icon from 'components/AppIcon';

const EmptyState = ({ searchQuery, hasFilters, onClearFilters, recentSearches }) => {
  const handleRecentSearchClick = (search) => {
    // In a real app, this would trigger a new search
    console.log('Searching for:', search);
  };

  const popularCategories = [
    { name: 'Nature', icon: 'TreePine', count: '1.2k' },
    { name: 'Abstract', icon: 'Palette', count: '890' },
    { name: 'Urban', icon: 'Building', count: '670' },
    { name: 'Minimalist', icon: 'Minus', count: '450' }
  ];

  if (searchQuery || hasFilters) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 mx-auto bg-gradient-to-br from-secondary-100 to-secondary-200 rounded-full flex items-center justify-center mb-6">
          <Icon name="SearchX" size={48} className="text-secondary-600" />
        </div>
        
        <h2 className="text-2xl font-semibold text-text-primary mb-4">
          No wallpapers found
        </h2>
        
        <p className="text-text-secondary mb-8 max-w-md mx-auto">
          {searchQuery 
            ? `We couldn't find any wallpapers matching "${searchQuery}". Try adjusting your search or filters.`
            : "No wallpapers match your current filters. Try adjusting your criteria."
          }
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {hasFilters && (
            <button
              onClick={onClearFilters}
              className="btn btn-primary px-6 py-3"
            >
              <Icon name="X" size={18} className="mr-2" />
              Clear All Filters
            </button>
          )}
          
          <button
            onClick={() => window.location.reload()}
            className="btn btn-secondary px-6 py-3"
          >
            <Icon name="RotateCcw" size={18} className="mr-2" />
            Reset Search
          </button>
        </div>

        {/* Recent Searches */}
        {recentSearches.length > 0 && (
          <div className="mt-12 max-w-md mx-auto">
            <h3 className="text-lg font-medium text-text-primary mb-4">Recent Searches</h3>
            <div className="flex flex-wrap gap-2 justify-center">
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => handleRecentSearchClick(search)}
                  className="px-4 py-2 bg-secondary-100 text-text-secondary rounded-full hover:bg-secondary-200 transition-colors duration-150 text-sm"
                >
                  {search}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="text-center py-16">
      <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center mb-6">
        <Icon name="Image" size={48} className="text-primary-600" />
      </div>
      
      <h2 className="text-2xl font-semibold text-text-primary mb-4">
        Discover Amazing Wallpapers
      </h2>
      
      <p className="text-text-secondary mb-8 max-w-md mx-auto">
        Explore thousands of high-quality wallpapers from talented creators around the world.
      </p>

      {/* Popular Categories */}
      <div className="max-w-2xl mx-auto">
        <h3 className="text-lg font-medium text-text-primary mb-6">Popular Categories</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {popularCategories.map(category => (
            <button
              key={category.name}
              onClick={() => console.log('Browse category:', category.name)}
              className="p-6 bg-surface border border-border rounded-lg hover:border-primary hover:bg-primary-50 transition-all duration-150 group"
            >
              <div className="w-12 h-12 mx-auto bg-secondary-100 group-hover:bg-primary-100 rounded-lg flex items-center justify-center mb-3 transition-colors duration-150">
                <Icon 
                  name={category.icon} 
                  size={24} 
                  className="text-secondary-600 group-hover:text-primary transition-colors duration-150" 
                />
              </div>
              <h4 className="font-medium text-text-primary mb-1">{category.name}</h4>
              <p className="text-sm text-text-secondary">{category.count} wallpapers</p>
            </button>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-12">
        <button
          onClick={() => console.log('Browse all wallpapers')}
          className="btn btn-primary px-8 py-3 text-base font-medium"
        >
          <Icon name="Compass" size={20} className="mr-2" />
          Browse All Wallpapers
        </button>
      </div>
    </div>
  );
};

export default EmptyState;