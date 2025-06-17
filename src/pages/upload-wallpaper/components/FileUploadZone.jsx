import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const FileUploadZone = ({ 
  onFileSelect, 
  onDrop, 
  onDragOver, 
  fileInputRef, 
  uploadMode 
}) => {
  const [isDragActive, setIsDragActive] = useState(false);

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragActive(false);
    onDrop(e);
  };

  const supportedFormats = ['JPEG', 'PNG', 'WebP', 'AVIF'];
  const maxFileSize = uploadMode === 'bulk' ? '10MB each' : '25MB';
  const maxFiles = uploadMode === 'bulk' ? '20 files' : '1 file';

  return (
    <div className="max-w-4xl mx-auto">
      {/* Upload Zone */}
      <div
        onDrop={handleDrop}
        onDragOver={onDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        className={`relative border-2 border-dashed rounded-xl p-8 md:p-12 text-center transition-all duration-300 ${
          isDragActive
            ? 'border-primary bg-primary-50 scale-102' :'border-secondary-300 hover:border-primary hover:bg-secondary-50'
        }`}
      >
        {/* Upload Icon */}
        <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center transition-all duration-300 ${
          isDragActive 
            ? 'bg-primary text-white' :'bg-secondary-100 text-secondary-600'
        }`}>
          <Icon 
            name={uploadMode === 'bulk' ? 'Images' : 'ImagePlus'} 
            size={32} 
          />
        </div>

        {/* Upload Text */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-text-primary mb-2">
            {isDragActive 
              ? 'Drop your images here' 
              : `Upload ${uploadMode === 'bulk' ? 'Multiple' : 'Your'} Wallpaper${uploadMode === 'bulk' ? 's' : ''}`
            }
          </h3>
          <p className="text-text-secondary mb-4">
            Drag and drop your images here, or click to browse
          </p>
          
          {/* File Requirements */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-text-muted">
            <div className="flex items-center">
              <Icon name="FileImage" size={16} className="mr-1" />
              <span>{supportedFormats.join(', ')}</span>
            </div>
            <div className="flex items-center">
              <Icon name="HardDrive" size={16} className="mr-1" />
              <span>Max {maxFileSize}</span>
            </div>
            <div className="flex items-center">
              <Icon name="Hash" size={16} className="mr-1" />
              <span>Up to {maxFiles}</span>
            </div>
          </div>
        </div>

        {/* Upload Button */}
        <button
          onClick={() => fileInputRef.current?.click()}
          className="btn btn-primary px-8 py-3 text-base font-medium"
        >
          <Icon name="Upload" size={20} className="mr-2" />
          Select Files
        </button>

        {/* Upload Tips */}
        <div className="mt-8 pt-6 border-t border-secondary-200">
          <h4 className="font-medium text-text-primary mb-3">Upload Tips:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-text-secondary">
            <div className="flex items-start">
              <Icon name="CheckCircle" size={16} className="text-success mr-2 mt-0.5 flex-shrink-0" />
              <span>High resolution images (1920x1080 or higher) get more downloads</span>
            </div>
            <div className="flex items-start">
              <Icon name="CheckCircle" size={16} className="text-success mr-2 mt-0.5 flex-shrink-0" />
              <span>Add descriptive titles and relevant tags for better discovery</span>
            </div>
            <div className="flex items-start">
              <Icon name="CheckCircle" size={16} className="text-success mr-2 mt-0.5 flex-shrink-0" />
              <span>Original content performs better than stock images</span>
            </div>
            <div className="flex items-start">
              <Icon name="CheckCircle" size={16} className="text-success mr-2 mt-0.5 flex-shrink-0" />
              <span>Multiple aspect ratios increase compatibility</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Upload Options */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card p-4 text-center hover:shadow-md transition-shadow duration-150">
          <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Icon name="Smartphone" size={24} className="text-primary" />
          </div>
          <h4 className="font-medium text-text-primary mb-1">Mobile Wallpapers</h4>
          <p className="text-sm text-text-secondary">9:16, 9:18, 9:19.5 ratios</p>
        </div>
        
        <div className="card p-4 text-center hover:shadow-md transition-shadow duration-150">
          <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Icon name="Monitor" size={24} className="text-accent" />
          </div>
          <h4 className="font-medium text-text-primary mb-1">Desktop Wallpapers</h4>
          <p className="text-sm text-text-secondary">16:9, 16:10, 21:9 ratios</p>
        </div>
        
        <div className="card p-4 text-center hover:shadow-md transition-shadow duration-150">
          <div className="w-12 h-12 bg-secondary-200 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Icon name="Tablet" size={24} className="text-secondary-600" />
          </div>
          <h4 className="font-medium text-text-primary mb-1">Tablet Wallpapers</h4>
          <p className="text-sm text-text-secondary">4:3, 3:2, 16:10 ratios</p>
        </div>
      </div>
    </div>
  );
};

export default FileUploadZone;