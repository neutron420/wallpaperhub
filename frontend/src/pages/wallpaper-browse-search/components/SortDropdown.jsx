import React, { useState, useRef, useEffect } from 'react';
import Icon from 'components/AppIcon';

const SortDropdown = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const sortOptions = [
    { value: 'relevance', label: 'Relevance', icon: 'Target' },
    { value: 'newest', label: 'Newest', icon: 'Clock' },
    { value: 'popular', label: 'Most Downloaded', icon: 'TrendingUp' },
    { value: 'likes', label: 'Most Liked', icon: 'Heart' },
    { value: 'views', label: 'Most Viewed', icon: 'Eye' }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = sortOptions.find(option => option.value === value);

  const handleSelect = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-surface border border-border rounded-lg hover:bg-secondary-50 transition-colors duration-150"
      >
        <Icon name={selectedOption?.icon || 'Target'} size={16} className="text-secondary-600" />
        <span className="text-sm font-medium text-text-primary hidden md:block">
          {selectedOption?.label || 'Sort by'}
        </span>
        <Icon 
          name={isOpen ? "ChevronUp" : "ChevronDown"} 
          size={16} 
          className="text-secondary-600" 
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1 w-48 bg-surface border border-border rounded-lg shadow-lg z-50 animate-scale-in">
          <div className="py-1">
            {sortOptions.map(option => (
              <button
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-secondary-50 transition-colors duration-150 ${
                  value === option.value ? 'bg-primary-50 text-primary' : 'text-text-primary'
                }`}
              >
                <Icon 
                  name={option.icon} 
                  size={16} 
                  className={value === option.value ? 'text-primary' : 'text-secondary-600'} 
                />
                <span className="text-sm font-medium">{option.label}</span>
                {value === option.value && (
                  <Icon name="Check" size={16} className="text-primary ml-auto" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SortDropdown;