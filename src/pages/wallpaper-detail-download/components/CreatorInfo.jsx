import React from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const CreatorInfo = ({ creator, isFollowing, onFollow, onCreatorClick }) => {
  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white border border-border rounded-lg">
      <div className="flex items-center space-x-3">
        <button onClick={onCreatorClick} className="flex-shrink-0">
          <div className="relative">
            <Image
              src={creator.avatar}
              alt={creator.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            {creator.isVerified && (
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                <Icon name="Check" size={12} className="text-white" />
              </div>
            )}
          </div>
        </button>
        
        <div className="min-w-0 flex-1">
          <button
            onClick={onCreatorClick}
            className="text-left hover:text-primary transition-colors duration-150"
          >
            <h4 className="font-medium text-text-primary truncate">{creator.name}</h4>
            <p className="text-sm text-text-secondary truncate">{creator.username}</p>
          </button>
          
          <div className="flex items-center space-x-4 mt-1 text-xs text-text-muted">
            <span className="flex items-center space-x-1">
              <Icon name="Users" size={12} />
              <span>{formatNumber(creator.followers)} followers</span>
            </span>
            <span className="flex items-center space-x-1">
              <Icon name="Image" size={12} />
              <span>{creator.totalUploads} uploads</span>
            </span>
          </div>
        </div>
      </div>
      
      <button
        onClick={onFollow}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ${
          isFollowing
            ? 'bg-secondary-100 text-text-secondary hover:bg-secondary-200' :'bg-primary text-white hover:bg-primary-700'
        }`}
      >
        {isFollowing ? 'Following' : 'Follow'}
      </button>
    </div>
  );
};

export default CreatorInfo;