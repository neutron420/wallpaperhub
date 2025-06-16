import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const ImagePreview = ({ 
  files, 
  currentFileIndex, 
  onFileIndexChange, 
  onRemoveFile, 
  onAddMore,
  showPreview,
  onTogglePreview 
}) => {
  const [imageTransform, setImageTransform] = useState({
    scale: 1,
    rotation: 0,
    brightness: 100,
    contrast: 100,
    saturation: 100
  });

  const currentFile = files[currentFileIndex];

  const handleTransformChange = (property, value) => {
    setImageTransform(prev => ({
      ...prev,
      [property]: value
    }));
  };

  const resetTransform = () => {
    setImageTransform({
      scale: 1,
      rotation: 0,
      brightness: 100,
      contrast: 100,
      saturation: 100
    });
  };

  const getImageStyle = () => ({
    transform: `scale(${imageTransform.scale}) rotate(${imageTransform.rotation}deg)`,
    filter: `brightness(${imageTransform.brightness}%) contrast(${imageTransform.contrast}%) saturate(${imageTransform.saturation}%)`
  });

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (!currentFile) return null;

  return (
    <div className="space-y-6">
      {/* Preview Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-text-primary">
          Image Preview
        </h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={onTogglePreview}
            className={`btn ${showPreview ? 'btn-primary' : 'btn-secondary'} px-3 py-2 text-sm`}
          >
            <Icon name="Eye" size={16} className="mr-2" />
            {showPreview ? 'Hide Preview' : 'Show Preview'}
          </button>
          <button
            onClick={onAddMore}
            className="btn btn-secondary px-3 py-2 text-sm"
          >
            <Icon name="Plus" size={16} className="mr-2" />
            Add More
          </button>
        </div>
      </div>

      {/* File Navigation */}
      {files.length > 1 && (
        <div className="flex items-center justify-between bg-secondary-50 rounded-lg p-3">
          <button
            onClick={() => onFileIndexChange(Math.max(0, currentFileIndex - 1))}
            disabled={currentFileIndex === 0}
            className="btn btn-secondary px-3 py-2 text-sm disabled:opacity-50"
          >
            <Icon name="ChevronLeft" size={16} className="mr-1" />
            Previous
          </button>
          
          <span className="text-sm font-medium text-text-primary">
            {currentFileIndex + 1} of {files.length}
          </span>
          
          <button
            onClick={() => onFileIndexChange(Math.min(files.length - 1, currentFileIndex + 1))}
            disabled={currentFileIndex === files.length - 1}
            className="btn btn-secondary px-3 py-2 text-sm disabled:opacity-50"
          >
            Next
            <Icon name="ChevronRight" size={16} className="ml-1" />
          </button>
        </div>
      )}

      {/* Main Preview */}
      <div className="card overflow-hidden">
        <div className="aspect-video bg-secondary-100 relative overflow-hidden">
          <Image
            src={currentFile.preview}
            alt={currentFile.name}
            className="w-full h-full object-contain transition-all duration-300"
            style={getImageStyle()}
          />
          
          {/* Remove Button */}
          <button
            onClick={() => onRemoveFile(currentFile.id)}
            className="absolute top-3 right-3 w-8 h-8 bg-error text-white rounded-full flex items-center justify-center hover:bg-error-600 transition-colors duration-150"
          >
            <Icon name="X" size={16} />
          </button>

          {/* Preview Mode Overlay */}
          {showPreview && (
            <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center">
              <div className="text-center text-white">
                <Icon name="Monitor" size={48} className="mx-auto mb-2 opacity-75" />
                <p className="text-sm opacity-75">Desktop Preview Mode</p>
              </div>
            </div>
          )}
        </div>

        {/* Image Controls */}
        <div className="p-4 space-y-4">
          {/* Transform Controls */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Scale: {imageTransform.scale}x
              </label>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={imageTransform.scale}
                onChange={(e) => handleTransformChange('scale', parseFloat(e.target.value))}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Rotation: {imageTransform.rotation}°
              </label>
              <input
                type="range"
                min="0"
                max="360"
                step="15"
                value={imageTransform.rotation}
                onChange={(e) => handleTransformChange('rotation', parseInt(e.target.value))}
                className="w-full"
              />
            </div>
          </div>

          {/* Filter Controls */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Brightness: {imageTransform.brightness}%
              </label>
              <input
                type="range"
                min="50"
                max="150"
                step="5"
                value={imageTransform.brightness}
                onChange={(e) => handleTransformChange('brightness', parseInt(e.target.value))}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Contrast: {imageTransform.contrast}%
              </label>
              <input
                type="range"
                min="50"
                max="150"
                step="5"
                value={imageTransform.contrast}
                onChange={(e) => handleTransformChange('contrast', parseInt(e.target.value))}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Saturation: {imageTransform.saturation}%
              </label>
              <input
                type="range"
                min="0"
                max="200"
                step="10"
                value={imageTransform.saturation}
                onChange={(e) => handleTransformChange('saturation', parseInt(e.target.value))}
                className="w-full"
              />
            </div>
          </div>

          {/* Reset Button */}
          <button
            onClick={resetTransform}
            className="btn btn-secondary w-full"
          >
            <Icon name="RotateCcw" size={16} className="mr-2" />
            Reset Adjustments
          </button>
        </div>
      </div>

      {/* File Information */}
      <div className="card p-4">
        <h4 className="font-medium text-text-primary mb-3">File Information</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-text-secondary">Name:</span>
            <p className="font-medium text-text-primary truncate">{currentFile.name}</p>
          </div>
          <div>
            <span className="text-text-secondary">Size:</span>
            <p className="font-medium text-text-primary">{formatFileSize(currentFile.size)}</p>
          </div>
          <div>
            <span className="text-text-secondary">Type:</span>
            <p className="font-medium text-text-primary">{currentFile.type}</p>
          </div>
          <div>
            <span className="text-text-secondary">Status:</span>
            <p className={`font-medium ${
              currentFile.status === 'completed' ? 'text-success' :
              currentFile.status === 'failed'? 'text-error' : 'text-warning'
            }`}>
              {currentFile.status.charAt(0).toUpperCase() + currentFile.status.slice(1)}
            </p>
          </div>
        </div>
      </div>

      {/* File Thumbnails */}
      {files.length > 1 && (
        <div className="card p-4">
          <h4 className="font-medium text-text-primary mb-3">All Files</h4>
          <div className="grid grid-cols-4 gap-3">
            {files.map((file, index) => (
              <button
                key={file.id}
                onClick={() => onFileIndexChange(index)}
                className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all duration-150 ${
                  index === currentFileIndex
                    ? 'border-primary shadow-md'
                    : 'border-secondary-200 hover:border-secondary-300'
                }`}
              >
                <Image
                  src={file.preview}
                  alt={file.name}
                  className="w-full h-full object-cover"
                />
                {index === currentFileIndex && (
                  <div className="absolute inset-0 bg-primary bg-opacity-20 flex items-center justify-center">
                    <Icon name="Eye" size={16} className="text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImagePreview;