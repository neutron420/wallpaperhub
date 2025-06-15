import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';

const UploadProgress = ({ files = [], onClose, onRetry, onCancel }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [uploadStats, setUploadStats] = useState({
    completed: 0,
    failed: 0,
    total: 0
  });

  useEffect(() => {
    const completed = files.filter(file => file.status === 'completed').length;
    const failed = files.filter(file => file.status === 'failed').length;
    const total = files.length;

    setUploadStats({ completed, failed, total });
  }, [files]);

  const getOverallProgress = () => {
    if (files.length === 0) return 0;
    const completedFiles = files.filter(file => file.status === 'completed').length;
    return Math.round((completedFiles / files.length) * 100);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'uploading':
        return <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />;
      case 'completed':
        return <Icon name="CheckCircle" size={16} className="text-success" />;
      case 'failed':
        return <Icon name="XCircle" size={16} className="text-error" />;
      case 'paused':
        return <Icon name="PauseCircle" size={16} className="text-warning" />;
      default:
        return <Icon name="Clock" size={16} className="text-secondary-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'uploading':
        return 'bg-primary';
      case 'completed':
        return 'bg-success';
      case 'failed':
        return 'bg-error';
      case 'paused':
        return 'bg-warning';
      default:
        return 'bg-secondary-300';
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatTime = (seconds) => {
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  if (files.length === 0) return null;

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 z-400 w-80 max-w-[calc(100vw-2rem)]">
      <div className="bg-surface rounded-lg shadow-xl border border-border overflow-hidden animate-slide-up">
        {/* Header */}
        <div 
          className="flex items-center justify-between p-4 cursor-pointer hover:bg-secondary-50 transition-colors duration-150"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-8 h-8 bg-primary-50 rounded-full flex items-center justify-center">
                <Icon name="Upload" size={16} className="text-primary" />
              </div>
              {uploadStats.total > 0 && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center font-medium">
                  {uploadStats.total}
                </div>
              )}
            </div>
            <div>
              <h3 className="font-medium text-text-primary">
                Uploading {uploadStats.total} file{uploadStats.total !== 1 ? 's' : ''}
              </h3>
              <p className="text-sm text-text-secondary">
                {uploadStats.completed} completed, {uploadStats.failed} failed
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-text-primary">
              {getOverallProgress()}%
            </span>
            <Icon 
              name={isExpanded ? "ChevronDown" : "ChevronUp"} 
              size={16} 
              className="text-secondary-600" 
            />
          </div>
        </div>

        {/* Overall Progress Bar */}
        <div className="px-4 pb-2">
          <div className="w-full bg-secondary-200 rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${getOverallProgress()}%` }}
            />
          </div>
        </div>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="border-t border-border max-h-64 overflow-y-auto">
            {files.map((file, index) => (
              <div key={index} className="p-4 border-b border-border last:border-b-0">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    {getStatusIcon(file.status)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium text-text-primary truncate">
                        {file.name}
                      </p>
                      {file.status === 'failed' && (
                        <button
                          onClick={() => onRetry && onRetry(file.id)}
                          className="text-xs text-primary hover:text-primary-700 font-medium"
                        >
                          Retry
                        </button>
                      )}
                    </div>
                    <div className="flex items-center justify-between text-xs text-text-secondary mb-2">
                      <span>{formatFileSize(file.size)}</span>
                      {file.status === 'uploading' && file.timeRemaining && (
                        <span>{formatTime(file.timeRemaining)} remaining</span>
                      )}
                    </div>
                    {file.status === 'uploading' && (
                      <div className="w-full bg-secondary-200 rounded-full h-1">
                        <div 
                          className={`h-1 rounded-full transition-all duration-300 ${getStatusColor(file.status)}`}
                          style={{ width: `${file.progress || 0}%` }}
                        />
                      </div>
                    )}
                    {file.error && (
                      <p className="text-xs text-error mt-1">{file.error}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between p-4 bg-secondary-50 border-t border-border">
          <div className="flex items-center space-x-2">
            {uploadStats.failed > 0 && (
              <button
                onClick={() => onRetry && onRetry('all')}
                className="text-sm text-primary hover:text-primary-700 font-medium"
              >
                Retry All
              </button>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onCancel && onCancel()}
              className="text-sm text-text-secondary hover:text-text-primary"
            >
              Cancel
            </button>
            <button
              onClick={onClose}
              className="text-sm text-primary hover:text-primary-700 font-medium"
            >
              {uploadStats.completed === uploadStats.total ? 'Done' : 'Hide'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadProgress;