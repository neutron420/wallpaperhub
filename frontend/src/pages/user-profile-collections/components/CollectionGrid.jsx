import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const CollectionGrid = ({ collections, onCollectionClick }) => {
  const [hoveredId, setHoveredId] = useState(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (collections.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Folder" size={24} className="text-secondary-400" />
        </div>
        <h3 className="text-lg font-semibold text-text-primary mb-2">No collections yet</h3>
        <p className="text-text-secondary mb-4">Create your first collection to organize your favorite wallpapers!</p>
        <button className="btn btn-primary">
          <Icon name="FolderPlus" size={16} className="mr-2" />
          Create Collection
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {collections.map((collection) => (
        <div
          key={collection.id}
          className="group card overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer"
          onMouseEnter={() => setHoveredId(collection.id)}
          onMouseLeave={() => setHoveredId(null)}
          onClick={() => onCollectionClick(collection)}
        >
          {/* Cover Image */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={collection.coverImage}
              alt={collection.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            
            {/* Overlay */}
            <div className={`absolute inset-0 bg-black/40 transition-opacity duration-200 ${
              hoveredId === collection.id ? 'opacity-100' : 'opacity-0'
            }`}>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                  <Icon name="Play" size={24} className="text-white" />
                </div>
              </div>
            </div>

            {/* Privacy Badge */}
            {collection.isPrivate && (
              <div className="absolute top-3 right-3">
                <div className="bg-black/50 backdrop-blur-sm rounded-full p-1.5">
                  <Icon name="Lock" size={14} className="text-white" />
                </div>
              </div>
            )}

            {/* Wallpaper Count */}
            <div className="absolute bottom-3 right-3">
              <div className="bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
                <span className="text-white text-xs font-medium">
                  {collection.wallpaperCount} items
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-text-primary group-hover:text-primary transition-colors duration-150 truncate">
                {collection.name}
              </h3>
              <button className="p-1 rounded-lg hover:bg-secondary-100 transition-colors duration-150 opacity-0 group-hover:opacity-100">
                <Icon name="MoreVertical" size={16} className="text-secondary-600" />
              </button>
            </div>

            {collection.description && (
              <p className="text-sm text-text-secondary mb-3 line-clamp-2">
                {collection.description}
              </p>
            )}

            <div className="flex items-center justify-between text-xs text-text-muted">
              <div className="flex items-center space-x-1">
                <Icon name="Calendar" size={12} />
                <span>Created {formatDate(collection.createdDate)}</span>
              </div>
              <div className="flex items-center space-x-1">
                {collection.isPrivate ? (
                  <>
                    <Icon name="Lock" size={12} />
                    <span>Private</span>
                  </>
                ) : (
                  <>
                    <Icon name="Globe" size={12} />
                    <span>Public</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Create New Collection Card */}
      <div className="group card border-2 border-dashed border-secondary-300 hover:border-primary transition-colors duration-200 cursor-pointer">
        <div className="aspect-[4/3] flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 bg-secondary-100 group-hover:bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-3 transition-colors duration-200">
              <Icon name="FolderPlus" size={20} className="text-secondary-600 group-hover:text-primary transition-colors duration-200" />
            </div>
            <h3 className="font-medium text-text-primary mb-1">Create Collection</h3>
            <p className="text-sm text-text-secondary">Organize your wallpapers</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionGrid;