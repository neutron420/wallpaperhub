import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';

const FilterPanel = ({ 
  isOpen, 
  onClose, 
  filters, 
  onFiltersChange, 
  categories, 
  resolutions, 
  orientations 
}) => {
  const [localFilters, setLocalFilters] = useState(filters);
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    resolutions: true,
    orientations: true,
    tags: false,
    colors: false,
    advanced: false
  });

  const colors = [
    { id: 'red', name: 'Red', hex: '#EF4444' },
    { id: 'orange', name: 'Orange', hex: '#F97316' },
    { id: 'yellow', name: 'Yellow', hex: '#EAB308' },
    { id: 'green', name: 'Green', hex: '#22C55E' },
    { id: 'blue', name: 'Blue', hex: '#3B82F6' },
    { id: 'purple', name: 'Purple', hex: '#A855F7' },
    { id: 'pink', name: 'Pink', hex: '#EC4899' },
    { id: 'black', name: 'Black', hex: '#000000' },
    { id: 'white', name: 'White', hex: '#FFFFFF' },
    { id: 'gray', name: 'Gray', hex: '#6B7280' }
  ];

  const popularTags = [
    'nature', 'abstract', 'minimal', 'landscape', 'city', 'space',
    'ocean', 'mountain', 'forest', 'sunset', 'geometric', 'vintage'
  ];

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleFilterToggle = (filterType, value) => {
    setLocalFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType].includes(value)
        ? prev[filterType].filter(item => item !== value)
        : [...prev[filterType], value]
    }));
  };

  const handleApplyFilters = () => {
    onFiltersChange(localFilters);
    onClose();
  };

  const handleClearAll = () => {
    const clearedFilters = {
      categories: [],
      resolutions: [],
      orientations: [],
      tags: [],
      colors: [],
      dateRange: null
    };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const getActiveFilterCount = () => {
    return localFilters.categories.length +
           localFilters.resolutions.length +
           localFilters.orientations.length +
           localFilters.tags.length +
           localFilters.colors.length +
           (localFilters.dateRange ? 1 : 0);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-500 lg:hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-250"
        onClick={onClose}
      />
      
      {/* Panel */}
      <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-surface shadow-xl animate-slide-left">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-text-primary">Filters</h2>
          <div className="flex items-center space-x-2">
            {getActiveFilterCount() > 0 && (
              <button
                onClick={handleClearAll}
                className="text-sm text-secondary-600 hover:text-text-primary transition-colors duration-150"
              >
                Clear all
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-secondary-100 transition-colors duration-150"
            >
              <Icon name="X" size={20} className="text-secondary-600" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Categories */}
          <div>
            <button
              onClick={() => toggleSection('categories')}
              className="flex items-center justify-between w-full mb-3"
            >
              <h3 className="font-medium text-text-primary">Categories</h3>
              <Icon 
                name={expandedSections.categories ? "ChevronUp" : "ChevronDown"} 
                size={16} 
                className="text-secondary-600" 
              />
            </button>
            {expandedSections.categories && (
              <div className="space-y-2">
                {categories.map(category => (
                  <label key={category.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={localFilters.categories.includes(category.id)}
                        onChange={() => handleFilterToggle('categories', category.id)}
                        className="rounded border-border text-primary focus:ring-primary"
                      />
                      <span className="ml-2 text-sm text-text-primary">{category.name}</span>
                    </div>
                    <span className="text-xs text-text-secondary">{category.count}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Resolutions */}
          <div>
            <button
              onClick={() => toggleSection('resolutions')}
              className="flex items-center justify-between w-full mb-3"
            >
              <h3 className="font-medium text-text-primary">Resolution</h3>
              <Icon 
                name={expandedSections.resolutions ? "ChevronUp" : "ChevronDown"} 
                size={16} 
                className="text-secondary-600" 
              />
            </button>
            {expandedSections.resolutions && (
              <div className="space-y-2">
                {resolutions.map(resolution => (
                  <label key={resolution.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={localFilters.resolutions.includes(resolution.id)}
                        onChange={() => handleFilterToggle('resolutions', resolution.id)}
                        className="rounded border-border text-primary focus:ring-primary"
                      />
                      <span className="ml-2 text-sm text-text-primary">{resolution.name}</span>
                    </div>
                    <span className="text-xs text-text-secondary">{resolution.count}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Orientations */}
          <div>
            <button
              onClick={() => toggleSection('orientations')}
              className="flex items-center justify-between w-full mb-3"
            >
              <h3 className="font-medium text-text-primary">Orientation</h3>
              <Icon 
                name={expandedSections.orientations ? "ChevronUp" : "ChevronDown"} 
                size={16} 
                className="text-secondary-600" 
              />
            </button>
            {expandedSections.orientations && (
              <div className="space-y-2">
                {orientations.map(orientation => (
                  <label key={orientation.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={localFilters.orientations.includes(orientation.id)}
                        onChange={() => handleFilterToggle('orientations', orientation.id)}
                        className="rounded border-border text-primary focus:ring-primary"
                      />
                      <span className="ml-2 text-sm text-text-primary">{orientation.name}</span>
                    </div>
                    <span className="text-xs text-text-secondary">{orientation.count}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Tags */}
          <div>
            <button
              onClick={() => toggleSection('tags')}
              className="flex items-center justify-between w-full mb-3"
            >
              <h3 className="font-medium text-text-primary">Popular Tags</h3>
              <Icon 
                name={expandedSections.tags ? "ChevronUp" : "ChevronDown"} 
                size={16} 
                className="text-secondary-600" 
              />
            </button>
            {expandedSections.tags && (
              <div className="flex flex-wrap gap-2">
                {popularTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => handleFilterToggle('tags', tag)}
                    className={`px-3 py-1 rounded-full text-sm transition-colors duration-150 ${
                      localFilters.tags.includes(tag)
                        ? 'bg-primary text-white' :'bg-secondary-100 text-text-secondary hover:bg-secondary-200'
                    }`}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Colors */}
          <div>
            <button
              onClick={() => toggleSection('colors')}
              className="flex items-center justify-between w-full mb-3"
            >
              <h3 className="font-medium text-text-primary">Colors</h3>
              <Icon 
                name={expandedSections.colors ? "ChevronUp" : "ChevronDown"} 
                size={16} 
                className="text-secondary-600" 
              />
            </button>
            {expandedSections.colors && (
              <div className="grid grid-cols-5 gap-3">
                {colors.map(color => (
                  <button
                    key={color.id}
                    onClick={() => handleFilterToggle('colors', color.id)}
                    className={`w-10 h-10 rounded-full border-2 transition-all duration-150 ${
                      localFilters.colors.includes(color.id)
                        ? 'border-primary scale-110' :'border-secondary-300 hover:border-secondary-400'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  >
                    {localFilters.colors.includes(color.id) && (
                      <Icon 
                        name="Check" 
                        size={16} 
                        className={color.id === 'white' ? 'text-black' : 'text-white'} 
                      />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border">
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 btn btn-secondary h-11 text-base font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleApplyFilters}
              className="flex-1 btn btn-primary h-11 text-base font-medium"
            >
              Apply Filters
              {getActiveFilterCount() > 0 && (
                <span className="ml-2 bg-white bg-opacity-20 px-2 py-1 rounded-full text-xs">
                  {getActiveFilterCount()}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;