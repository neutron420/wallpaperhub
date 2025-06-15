import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const ShareModal = ({ wallpaper, onClose }) => {
  const [copied, setCopied] = useState(false);
  
  const shareUrl = `${window.location.origin}/wallpaper-detail-download?id=${wallpaper.id}`;
  
  const socialPlatforms = [
    {
      name: 'Twitter',
      icon: 'Twitter',
      color: 'bg-blue-500 hover:bg-blue-600',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out this amazing wallpaper: ${wallpaper.title}`)}&url=${encodeURIComponent(shareUrl)}`
    },
    {
      name: 'Facebook',
      icon: 'Facebook',
      color: 'bg-blue-600 hover:bg-blue-700',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
    },
    {
      name: 'Pinterest',
      icon: 'Instagram',
      color: 'bg-red-500 hover:bg-red-600',
      url: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(shareUrl)}&media=${encodeURIComponent(wallpaper.imageUrl)}&description=${encodeURIComponent(wallpaper.title)}`
    },
    {
      name: 'LinkedIn',
      icon: 'Linkedin',
      color: 'bg-blue-700 hover:bg-blue-800',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
    },
    {
      name: 'Reddit',
      icon: 'MessageCircle',
      color: 'bg-orange-500 hover:bg-orange-600',
      url: `https://reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(wallpaper.title)}`
    },
    {
      name: 'WhatsApp',
      icon: 'MessageSquare',
      color: 'bg-green-500 hover:bg-green-600',
      url: `https://wa.me/?text=${encodeURIComponent(`${wallpaper.title} - ${shareUrl}`)}`
    }
  ];

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleSocialShare = (platform) => {
    window.open(platform.url, '_blank', 'width=600,height=400');
  };

  const handleEmailShare = () => {
    const subject = encodeURIComponent(`Check out this wallpaper: ${wallpaper.title}`);
    const body = encodeURIComponent(`I found this amazing wallpaper and thought you'd like it:

${wallpaper.title}
${shareUrl}

Shared from WallCraft`);
    
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  return (
    <div className="fixed inset-0 z-500 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-250"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-md bg-surface rounded-lg shadow-xl animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-lg font-semibold text-text-primary">Share Wallpaper</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-secondary-100 transition-colors duration-150"
          >
            <Icon name="X" size={20} className="text-secondary-600" />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6">
          {/* Wallpaper preview */}
          <div className="flex items-center space-x-3 mb-6 p-3 bg-secondary-50 rounded-lg">
            <div className="w-12 h-12 bg-secondary-200 rounded-lg overflow-hidden flex-shrink-0">
              <img
                src={wallpaper.thumbnailUrl}
                alt={wallpaper.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-medium text-text-primary truncate">{wallpaper.title}</h3>
              <p className="text-sm text-text-secondary truncate">by {wallpaper.creator.name}</p>
            </div>
          </div>
          
          {/* Copy link */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-text-primary mb-2">
              Share Link
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={shareUrl}
                readOnly
                className="flex-1 px-3 py-2 bg-secondary-50 border border-border rounded-lg text-sm text-text-secondary"
              />
              <button
                onClick={handleCopyLink}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                  copied 
                    ? 'bg-success text-white' :'bg-primary text-white hover:bg-primary-700'
                }`}
              >
                {copied ? (
                  <div className="flex items-center space-x-1">
                    <Icon name="Check" size={16} />
                    <span>Copied!</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-1">
                    <Icon name="Copy" size={16} />
                    <span>Copy</span>
                  </div>
                )}
              </button>
            </div>
          </div>
          
          {/* Social platforms */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-text-primary mb-3">
              Share on Social Media
            </label>
            <div className="grid grid-cols-3 gap-3">
              {socialPlatforms.map((platform) => (
                <button
                  key={platform.name}
                  onClick={() => handleSocialShare(platform)}
                  className={`flex flex-col items-center justify-center p-3 rounded-lg text-white transition-colors duration-150 ${platform.color}`}
                >
                  <Icon name={platform.icon} size={20} className="mb-1" />
                  <span className="text-xs font-medium">{platform.name}</span>
                </button>
              ))}
            </div>
          </div>
          
          {/* Other sharing options */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">
              Other Options
            </label>
            <div className="space-y-2">
              <button
                onClick={handleEmailShare}
                className="w-full flex items-center space-x-3 p-3 border border-border rounded-lg hover:bg-secondary-50 transition-colors duration-150"
              >
                <Icon name="Mail" size={20} className="text-secondary-600" />
                <span className="text-sm font-medium text-text-primary">Share via Email</span>
              </button>
              
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: wallpaper.title,
                      text: `Check out this amazing wallpaper: ${wallpaper.title}`,
                      url: shareUrl
                    });
                  }
                }}
                className="w-full flex items-center space-x-3 p-3 border border-border rounded-lg hover:bg-secondary-50 transition-colors duration-150"
              >
                <Icon name="Share" size={20} className="text-secondary-600" />
                <span className="text-sm font-medium text-text-primary">More Options</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;