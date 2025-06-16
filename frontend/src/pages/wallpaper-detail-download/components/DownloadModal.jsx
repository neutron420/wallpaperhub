import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const DownloadModal = ({ wallpaper, onClose, onDownload }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async (option) => {
    setSelectedOption(option);
    setIsDownloading(true);
    
    // Simulate download process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    onDownload(option);
    setIsDownloading(false);
  };

  const getAspectRatio = (width, height) => {
    const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
    const divisor = gcd(width, height);
    return `${width / divisor}:${height / divisor}`;
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
          <h2 className="text-lg font-semibold text-text-primary">Download Options</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-secondary-100 transition-colors duration-150"
          >
            <Icon name="X" size={20} className="text-secondary-600" />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6">
          <div className="mb-4">
            <h3 className="font-medium text-text-primary mb-1">{wallpaper.title}</h3>
            <p className="text-sm text-text-secondary">Choose your preferred resolution</p>
          </div>
          
          <div className="space-y-3">
            {wallpaper.downloadOptions.map((option, index) => (
              <button
                key={index}
                onClick={() => handleDownload(option)}
                disabled={isDownloading}
                className="w-full p-4 border border-border rounded-lg hover:border-primary hover:bg-primary-50 transition-all duration-150 text-left disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium text-text-primary">{option.label}</h4>
                      {option.width === wallpaper.originalWidth && (
                        <span className="px-2 py-1 bg-accent text-white text-xs rounded-full">
                          Original
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-text-secondary">
                      <span>{option.width} × {option.height}</span>
                      <span>{getAspectRatio(option.width, option.height)}</span>
                      <span>{option.size}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    {isDownloading && selectedOption === option ? (
                      <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <Icon name="Download" size={20} className="text-secondary-600" />
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
          
          {/* Usage recommendations */}
          <div className="mt-6 p-4 bg-secondary-50 rounded-lg">
            <h4 className="font-medium text-text-primary mb-2 flex items-center">
              <Icon name="Info" size={16} className="mr-2 text-primary" />
              Recommended Usage
            </h4>
            <div className="space-y-1 text-sm text-text-secondary">
              <p><strong>Mobile (720p):</strong> Perfect for smartphones and small screens</p>
              <p><strong>Tablet (1080p):</strong> Ideal for tablets and medium displays</p>
              <p><strong>Desktop (1440p):</strong> Great for most desktop monitors</p>
              <p><strong>4K Original:</strong> Best quality for large displays and printing</p>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="flex items-center justify-between p-6 bg-secondary-50 border-t border-border rounded-b-lg">
          <div className="text-xs text-text-muted">
            Free for personal and commercial use
          </div>
          <button
            onClick={onClose}
            className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-150"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DownloadModal;