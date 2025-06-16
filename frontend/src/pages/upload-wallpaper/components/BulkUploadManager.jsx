import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const BulkUploadManager = ({ 
  files, 
  onUpdateFile, 
  categories, 
  popularTags, 
  onUpload, 
  isUploading,
  globalFormData,
  onGlobalFormDataChange
}) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [bulkEditMode, setBulkEditMode] = useState(false);
  const [expandedFile, setExpandedFile] = useState(null);

  const toggleFileSelection = (fileId) => {
    setSelectedFiles(prev => 
      prev.includes(fileId) 
        ? prev.filter(id => id !== fileId)
        : [...prev, fileId]
    );
  };

  const selectAllFiles = () => {
    setSelectedFiles(files.map(f => f.id));
  };

  const deselectAllFiles = () => {
    setSelectedFiles([]);
  };

  const applyBulkChanges = () => {
    selectedFiles.forEach(fileId => {
      onUpdateFile(fileId, globalFormData);
    });
    setBulkEditMode(false);
    setSelectedFiles([]);
  };

  const updateFileField = (fileId, field, value) => {
    const file = files.find(f => f.id === fileId);
    if (file) {
      onUpdateFile(fileId, {
        ...file.metadata,
        [field]: value
      });
    }
  };

  const getCompletionStatus = () => {
    const completed = files.filter(file => {
      const meta = file.metadata;
      return meta.title && meta.category && meta.termsAccepted;
    }).length;
    return { completed, total: files.length };
  };

  const { completed, total } = getCompletionStatus();
  const canUpload = completed === total && total > 0;

  return (
    <div className="space-y-6">
      {/* Bulk Actions Header */}
      <div className="card p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-text-primary">
              Bulk Upload Manager
            </h3>
            <p className="text-sm text-text-secondary">
              {completed}/{total} files ready • {selectedFiles.length} selected
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={selectAllFiles}
              className="btn btn-secondary px-3 py-2 text-sm"
            >
              Select All
            </button>
            <button
              onClick={deselectAllFiles}
              className="btn btn-secondary px-3 py-2 text-sm"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-secondary-200 rounded-full h-2 mb-4">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${total > 0 ? (completed / total) * 100 : 0}%` }}
          />
        </div>

        {/* Bulk Edit Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setBulkEditMode(!bulkEditMode)}
              className={`btn ${bulkEditMode ? 'btn-primary' : 'btn-secondary'} px-4 py-2 text-sm`}
            >
              <Icon name="Edit3" size={16} className="mr-2" />
              Bulk Edit
            </button>
            {selectedFiles.length > 0 && bulkEditMode && (
              <button
                onClick={applyBulkChanges}
                className="btn btn-accent px-4 py-2 text-sm"
              >
                Apply to {selectedFiles.length} files
              </button>
            )}
          </div>
          <div className="text-sm text-text-muted">
            {files.length} files total
          </div>
        </div>
      </div>

      {/* Bulk Edit Form */}
      {bulkEditMode && (
        <div className="card p-6">
          <h4 className="font-medium text-text-primary mb-4">
            Bulk Edit Settings
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Category
              </label>
              <select
                value={globalFormData.category}
                onChange={(e) => onGlobalFormDataChange({
                  ...globalFormData,
                  category: e.target.value
                })}
                className="input w-full"
              >
                <option value="">Select category</option>
                {categories.map(category => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Content Rating
              </label>
              <select
                value={globalFormData.contentRating}
                onChange={(e) => onGlobalFormDataChange({
                  ...globalFormData,
                  contentRating: e.target.value
                })}
                className="input w-full"
              >
                <option value="general">General</option>
                <option value="teen">Teen</option>
                <option value="mature">Mature</option>
              </select>
            </div>
          </div>
          <div className="mt-4 flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={globalFormData.allowCommercialUse}
                onChange={(e) => onGlobalFormDataChange({
                  ...globalFormData,
                  allowCommercialUse: e.target.checked
                })}
                className="rounded border-border text-primary focus:ring-primary mr-2"
              />
              <span className="text-sm">Allow Commercial Use</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={globalFormData.termsAccepted}
                onChange={(e) => onGlobalFormDataChange({
                  ...globalFormData,
                  termsAccepted: e.target.checked
                })}
                className="rounded border-border text-primary focus:ring-primary mr-2"
              />
              <span className="text-sm">Accept Terms</span>
            </label>
          </div>
        </div>
      )}

      {/* File List */}
      <div className="space-y-3">
        {files.map((file, index) => {
          const isExpanded = expandedFile === file.id;
          const isSelected = selectedFiles.includes(file.id);
          const isComplete = file.metadata.title && file.metadata.category && file.metadata.termsAccepted;

          return (
            <div key={file.id} className={`card transition-all duration-150 ${
              isSelected ? 'ring-2 ring-primary' : ''
            }`}>
              <div className="p-4">
                <div className="flex items-center space-x-4">
                  {/* Selection Checkbox */}
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleFileSelection(file.id)}
                    className="rounded border-border text-primary focus:ring-primary"
                  />

                  {/* Thumbnail */}
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-secondary-100 flex-shrink-0">
                    <Image
                      src={file.preview}
                      alt={file.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* File Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-text-primary truncate">
                        {file.name}
                      </h4>
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${
                          isComplete ? 'bg-success' : 'bg-warning'
                        }`} />
                        <span className={`text-xs font-medium ${
                          isComplete ? 'text-success' : 'text-warning'
                        }`}>
                          {isComplete ? 'Ready' : 'Incomplete'}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-text-secondary">
                      <span>{(file.size / 1024 / 1024).toFixed(1)} MB</span>
                      <span>{file.metadata.category || 'No category'}</span>
                      <span>{file.metadata.tags?.length || 0} tags</span>
                    </div>
                  </div>

                  {/* Expand Button */}
                  <button
                    onClick={() => setExpandedFile(isExpanded ? null : file.id)}
                    className="p-2 rounded-lg hover:bg-secondary-100 transition-colors duration-150"
                  >
                    <Icon 
                      name={isExpanded ? "ChevronUp" : "ChevronDown"} 
                      size={20} 
                      className="text-secondary-600" 
                    />
                  </button>
                </div>

                {/* Expanded Form */}
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">
                          Title *
                        </label>
                        <input
                          type="text"
                          value={file.metadata.title || ''}
                          onChange={(e) => updateFileField(file.id, 'title', e.target.value)}
                          placeholder="Enter title"
                          className="input w-full"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">
                          Category *
                        </label>
                        <select
                          value={file.metadata.category || ''}
                          onChange={(e) => updateFileField(file.id, 'category', e.target.value)}
                          className="input w-full"
                        >
                          <option value="">Select category</option>
                          {categories.map(category => (
                            <option key={category.id} value={category.name}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-text-primary mb-2">
                          Description
                        </label>
                        <textarea
                          value={file.metadata.description || ''}
                          onChange={(e) => updateFileField(file.id, 'description', e.target.value)}
                          placeholder="Optional description"
                          className="input w-full h-20 resize-none"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={file.metadata.termsAccepted || false}
                            onChange={(e) => updateFileField(file.id, 'termsAccepted', e.target.checked)}
                            className="rounded border-border text-primary focus:ring-primary mr-2"
                          />
                          <span className="text-sm">Accept Terms of Service *</span>
                        </label>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Upload Button */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="font-medium text-text-primary">
              Upload {files.length} Wallpapers
            </h4>
            <p className="text-sm text-text-secondary">
              {completed} ready, {total - completed} need attention
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm text-text-muted mb-1">Est. Review Time</div>
            <div className="text-sm font-medium text-text-primary">
              {Math.ceil(files.length / 10)} - {Math.ceil(files.length / 5)} hours
            </div>
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
              Uploading {files.length} files...
            </div>
          ) : (
            <>
              <Icon name="Upload" size={20} className="mr-2" />
              Upload All Wallpapers
            </>
          )}
        </button>

        {!canUpload && total > 0 && (
          <p className="text-sm text-warning-700 mt-2 text-center">
            Complete all required fields for {total - completed} remaining files
          </p>
        )}
      </div>
    </div>
  );
};

export default BulkUploadManager;