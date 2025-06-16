import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const MetadataForm = ({ 
  formData, 
  onFormDataChange, 
  categories, 
  popularTags, 
  onUpload, 
  isUploading, 
  canUpload 
}) => {
  const [tagInput, setTagInput] = useState('');
  const [showTagSuggestions, setShowTagSuggestions] = useState(false);

  const handleInputChange = (field, value) => {
    onFormDataChange({
      ...formData,
      [field]: value
    });
  };

  const addTag = (tag) => {
    if (tag && !formData.tags.includes(tag) && formData.tags.length < 10) {
      handleInputChange('tags', [...formData.tags, tag]);
      setTagInput('');
      setShowTagSuggestions(false);
    }
  };

  const removeTag = (tagToRemove) => {
    handleInputChange('tags', formData.tags.filter(tag => tag !== tagToRemove));
  };

  const handleTagInputKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag(tagInput.trim().toLowerCase());
    }
  };

  const filteredTagSuggestions = popularTags.filter(tag => 
    tag.toLowerCase().includes(tagInput.toLowerCase()) && 
    !formData.tags.includes(tag)
  );

  const resolutionOptions = [
    { value: '1920x1080', label: 'Full HD (1920×1080)' },
    { value: '2560x1440', label: '2K QHD (2560×1440)' },
    { value: '3840x2160', label: '4K UHD (3840×2160)' },
    { value: '1080x1920', label: 'Mobile HD (1080×1920)' },
    { value: '1440x2560', label: 'Mobile 2K (1440×2560)' },
    { value: 'custom', label: 'Custom Resolution' }
  ];

  return (
    <div className="space-y-6">
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-6">
          Wallpaper Details
        </h3>

        <form className="space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-text-primary mb-2">
              Title *
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Enter a descriptive title for your wallpaper"
              className="input w-full"
              maxLength={100}
            />
            <div className="flex justify-between mt-1">
              <p className="text-xs text-text-muted">
                A good title helps people find your wallpaper
              </p>
              <span className="text-xs text-text-muted">
                {formData.title.length}/100
              </span>
            </div>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-text-primary mb-2">
              Description
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Describe your wallpaper, inspiration, or creation process..."
              className="input w-full h-24 resize-none"
              maxLength={500}
            />
            <div className="flex justify-between mt-1">
              <p className="text-xs text-text-muted">
                Optional but helps with discovery
              </p>
              <span className="text-xs text-text-muted">
                {formData.description.length}/500
              </span>
            </div>
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-text-primary mb-2">
              Category *
            </label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
              className="input w-full"
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category.id} value={category.name}>
                  {category.name} ({category.count})
                </option>
              ))}
            </select>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Tags
            </label>
            <div className="relative">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => {
                  setTagInput(e.target.value);
                  setShowTagSuggestions(e.target.value.length > 0);
                }}
                onKeyPress={handleTagInputKeyPress}
                onFocus={() => setShowTagSuggestions(tagInput.length > 0)}
                onBlur={() => setTimeout(() => setShowTagSuggestions(false), 200)}
                placeholder="Type tags and press Enter"
                className="input w-full"
                maxLength={20}
              />
              
              {/* Tag Suggestions */}
              {showTagSuggestions && filteredTagSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-surface border border-border rounded-lg shadow-lg z-10 max-h-40 overflow-y-auto">
                  {filteredTagSuggestions.slice(0, 8).map(tag => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => addTag(tag)}
                      className="w-full text-left px-3 py-2 hover:bg-secondary-50 text-sm"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Selected Tags */}
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {formData.tags.map(tag => (
                  <span
                    key={tag}
                    className="inline-flex items-center bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-2 hover:text-primary-900"
                    >
                      <Icon name="X" size={14} />
                    </button>
                  </span>
                ))}
              </div>
            )}
            <p className="text-xs text-text-muted mt-1">
              {formData.tags.length}/10 tags • Tags help people discover your wallpaper
            </p>
          </div>

          {/* Resolution */}
          <div>
            <label htmlFor="resolution" className="block text-sm font-medium text-text-primary mb-2">
              Resolution
            </label>
            <select
              id="resolution"
              value={formData.resolution}
              onChange={(e) => handleInputChange('resolution', e.target.value)}
              className="input w-full"
            >
              <option value="">Auto-detect from image</option>
              {resolutionOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Orientation & Content Rating */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="orientation" className="block text-sm font-medium text-text-primary mb-2">
                Orientation
              </label>
              <select
                id="orientation"
                value={formData.orientation}
                onChange={(e) => handleInputChange('orientation', e.target.value)}
                className="input w-full"
              >
                <option value="landscape">Landscape</option>
                <option value="portrait">Portrait</option>
                <option value="square">Square</option>
              </select>
            </div>

            <div>
              <label htmlFor="contentRating" className="block text-sm font-medium text-text-primary mb-2">
                Content Rating
              </label>
              <select
                id="contentRating"
                value={formData.contentRating}
                onChange={(e) => handleInputChange('contentRating', e.target.value)}
                className="input w-full"
              >
                <option value="general">General</option>
                <option value="teen">Teen</option>
                <option value="mature">Mature</option>
              </select>
            </div>
          </div>

          {/* Commercial Use */}
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="allowCommercialUse"
              checked={formData.allowCommercialUse}
              onChange={(e) => handleInputChange('allowCommercialUse', e.target.checked)}
              className="mt-1 rounded border-border text-primary focus:ring-primary"
            />
            <div>
              <label htmlFor="allowCommercialUse" className="text-sm font-medium text-text-primary">
                Allow Commercial Use
              </label>
              <p className="text-xs text-text-muted">
                Let others use your wallpaper for commercial purposes
              </p>
            </div>
          </div>

          {/* Terms Acceptance */}
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="termsAccepted"
              checked={formData.termsAccepted}
              onChange={(e) => handleInputChange('termsAccepted', e.target.checked)}
              className="mt-1 rounded border-border text-primary focus:ring-primary"
            />
            <div>
              <label htmlFor="termsAccepted" className="text-sm font-medium text-text-primary">
                I accept the Terms of Service *
              </label>
              <p className="text-xs text-text-muted">
                By uploading, you confirm you own the rights to this image and agree to our{' '}
                <button type="button" className="text-primary hover:text-primary-700">
                  Terms of Service
                </button>
              </p>
            </div>
          </div>
        </form>
      </div>

      {/* Upload Button */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="font-medium text-text-primary">Ready to Upload?</h4>
            <p className="text-sm text-text-secondary">
              Your wallpaper will be reviewed before going live
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm text-text-muted mb-1">Approval Time</div>
            <div className="text-sm font-medium text-text-primary">~24 hours</div>
          </div>
        </div>

        <button
          onClick={onUpload}
          disabled={!canUpload || isUploading}
          className="btn btn-primary w-full h-12 text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isUploading ? (
            <div className="flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Uploading...
            </div>
          ) : (
            <>
              <Icon name="Upload" size={20} className="mr-2" />
              Upload Wallpaper
            </>
          )}
        </button>

        {!canUpload && (
          <p className="text-sm text-error mt-2 text-center">
            Please fill in all required fields and accept the terms
          </p>
        )}
      </div>
    </div>
  );
};

export default MetadataForm;