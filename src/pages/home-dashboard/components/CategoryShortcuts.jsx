// src/pages/home-dashboard/components/CategoryShortcuts.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSupabase } from '../../../context/SupabaseContext';
import Icon from 'components/AppIcon';

const CategoryShortcuts = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getCategories } = useSupabase();

  const loadCategories = async () => {
    setLoading(true);
    const { data, error } = await getCategories();
    
    if (!error && data) {
      // Take first 8 categories for display
      setCategories(data.slice(0, 8));
    } else {
      // Fallback to mock categories
      setCategories([
        { id: 1, name: "Nature", slug: "nature", icon_name: "Flower" },
        { id: 2, name: "Abstract", slug: "abstract", icon_name: "Palette" },
        { id: 3, name: "Architecture", slug: "architecture", icon_name: "Building" },
        { id: 4, name: "Space", slug: "space", icon_name: "Rocket" },
        { id: 5, name: "Animals", slug: "animals", icon_name: "Cat" },
        { id: 6, name: "Technology", slug: "technology", icon_name: "Cpu" },
        { id: 7, name: "Minimal", slug: "minimal", icon_name: "Minus" },
        { id: 8, name: "Dark", slug: "dark", icon_name: "Moon" }
      ]);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const getIconComponent = (iconName) => {
    // Map of icon names to components with fallbacks
    const iconMap = {
      'Flower': 'Flower',
      'Palette': 'Palette',
      'Building': 'Building',
      'Rocket': 'Rocket',
      'Cat': 'Cat',
      'Cpu': 'Cpu',
      'Minus': 'Minus',
      'Moon': 'Moon',
      'Sun': 'Sun',
      'Clock': 'Clock'
    };
    
    return iconMap[iconName] || 'Image';
  };

  if (loading) {
    return (
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-text-primary">Browse Categories</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="p-4 bg-secondary-100 rounded-xl text-center animate-pulse">
              <div className="w-12 h-12 bg-secondary-200 rounded-xl mx-auto mb-3"></div>
              <div className="h-4 bg-secondary-200 rounded mx-auto w-16"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-text-primary">Browse Categories</h2>
        <Link
          to="/wallpaper-browse-search"
          className="text-primary hover:text-primary-700 text-sm font-medium transition-colors duration-150"
        >
          View All
        </Link>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/wallpaper-browse-search?category=${category.slug}`}
            className="group p-4 bg-surface border border-border rounded-xl hover:border-primary hover:shadow-md transition-all duration-150 text-center"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:from-primary-200 group-hover:to-primary-300 transition-colors duration-150">
              <Icon 
                name={getIconComponent(category.icon_name)} 
                size={24} 
                className="text-primary-700 group-hover:text-primary-800" 
              />
            </div>
            <p className="text-sm font-medium text-text-primary group-hover:text-primary transition-colors duration-150">
              {category.name}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryShortcuts;