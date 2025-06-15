import React from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const ProfileHeader = ({ user, onEditProfile, onFollow, onMessage, isOwnProfile = true }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long' 
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
    <div className="relative">
      {/* Cover Image */}
      <div className="h-48 md:h-64 lg:h-80 relative overflow-hidden">
        <Image
          src={user.coverImage}
          alt="Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      </div>

      {/* Profile Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="relative -mt-16 md:-mt-20">
          <div className="flex flex-col md:flex-row md:items-end md:space-x-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-surface overflow-hidden bg-surface">
                <Image
                  src={user.avatar}
                  alt={user.displayName}
                  className="w-full h-full object-cover"
                />
              </div>
              {user.isVerified && (
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary rounded-full flex items-center justify-center border-2 border-surface">
                  <Icon name="Check" size={16} className="text-white" />
                </div>
              )}
            </div>

            {/* Profile Info */}
            <div className="flex-1 mt-4 md:mt-0 md:pb-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <h1 className="text-2xl md:text-3xl font-bold text-text-primary">
                      {user.displayName}
                    </h1>
                    {user.isVerified && (
                      <Icon name="BadgeCheck" size={24} className="text-primary" />
                    )}
                  </div>
                  <p className="text-text-secondary mb-2">@{user.username}</p>
                  
                  {/* Mobile Stats */}
                  <div className="flex items-center space-x-4 md:hidden mb-4">
                    <div className="text-center">
                      <div className="font-semibold text-text-primary">{formatNumber(user.stats.uploads)}</div>
                      <div className="text-xs text-text-secondary">Uploads</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-text-primary">{formatNumber(user.stats.downloads)}</div>
                      <div className="text-xs text-text-secondary">Downloads</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-text-primary">{formatNumber(user.stats.followers)}</div>
                      <div className="text-xs text-text-secondary">Followers</div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-3">
                  {isOwnProfile ? (
                    <>
                      <button
                        onClick={onEditProfile}
                        className="btn btn-secondary px-4 py-2 text-sm"
                      >
                        <Icon name="Edit" size={16} className="mr-2" />
                        Edit Profile
                      </button>
                      <button className="btn btn-secondary p-2">
                        <Icon name="Settings" size={16} />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={onFollow}
                        className="btn btn-primary px-4 py-2 text-sm"
                      >
                        <Icon name="UserPlus" size={16} className="mr-2" />
                        Follow
                      </button>
                      <button
                        onClick={onMessage}
                        className="btn btn-secondary px-4 py-2 text-sm"
                      >
                        <Icon name="MessageCircle" size={16} className="mr-2" />
                        Message
                      </button>
                      <button className="btn btn-secondary p-2">
                        <Icon name="MoreHorizontal" size={16} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Bio and Details */}
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Bio */}
            <div className="lg:col-span-2">
              {user.bio && (
                <div className="mb-4">
                  <p className="text-text-secondary leading-relaxed whitespace-pre-line">
                    {user.bio}
                  </p>
                </div>
              )}
              
              {/* Details */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-text-secondary">
                <div className="flex items-center space-x-1">
                  <Icon name="Calendar" size={16} />
                  <span>Joined {formatDate(user.joinDate)}</span>
                </div>
                {user.location && (
                  <div className="flex items-center space-x-1">
                    <Icon name="MapPin" size={16} />
                    <span>{user.location}</span>
                  </div>
                )}
                {user.website && (
                  <div className="flex items-center space-x-1">
                    <Icon name="Link" size={16} />
                    <a
                      href={user.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary-700 transition-colors duration-150"
                    >
                      {user.website.replace('https://', '')}
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Desktop Stats */}
            <div className="hidden md:block">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-secondary-50 rounded-lg">
                  <div className="text-xl font-bold text-text-primary">{formatNumber(user.stats.followers)}</div>
                  <div className="text-sm text-text-secondary">Followers</div>
                </div>
                <div className="text-center p-3 bg-secondary-50 rounded-lg">
                  <div className="text-xl font-bold text-text-primary">{formatNumber(user.stats.following)}</div>
                  <div className="text-sm text-text-secondary">Following</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;