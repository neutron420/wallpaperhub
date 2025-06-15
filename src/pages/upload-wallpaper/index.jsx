import React, { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';
import Header from 'components/ui/Header';
import BottomNavigation from 'components/ui/BottomNavigation';
import UploadProgress from 'components/ui/UploadProgress';
import QuickActionButton from 'components/ui/QuickActionButton';
import FileUploadZone from './components/FileUploadZone';
import ImagePreview from './components/ImagePreview';
import MetadataForm from './components/MetadataForm';
import BulkUploadManager from './components/BulkUploadManager';

const UploadWallpaper = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  const [uploadMode, setUploadMode] = useState('single'); // 'single' or 'bulk'
  const [files, setFiles] = useState([]);
  const [currentFileIndex, setCurrentFileIndex] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [isDraftSaved, setIsDraftSaved] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  // Mock categories and tags for autocomplete
  const categories = [
    { id: 1, name: 'Nature', count: 1250 },
    { id: 2, name: 'Abstract', count: 890 },
    { id: 3, name: 'Technology', count: 675 },
    { id: 4, name: 'Minimalist', count: 1100 },
    { id: 5, name: 'Photography', count: 2300 },
    { id: 6, name: 'Digital Art', count: 1450 },
    { id: 7, name: 'Landscape', count: 980 },
    { id: 8, name: 'Urban', count: 560 },
    { id: 9, name: 'Space', count: 420 },
    { id: 10, name: 'Animals', count: 780 }
  ];

  const popularTags = [
    'wallpaper', 'background', 'desktop', 'mobile', '4k', 'hd', 'dark', 'light',
    'colorful', 'gradient', 'pattern', 'texture', 'modern', 'vintage', 'artistic'
  ];

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    tags: [],
    resolution: '',
    orientation: 'landscape',
    contentRating: 'general',
    allowCommercialUse: false,
    termsAccepted: false
  });

  const handleFileSelect = useCallback((selectedFiles) => {
    const newFiles = Array.from(selectedFiles).map((file, index) => ({
      id: Date.now() + index,
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      preview: URL.createObjectURL(file),
      status: 'pending',
      progress: 0,
      metadata: { ...formData }
    }));

    setFiles(prev => [...prev, ...newFiles]);
    if (files.length === 0 && newFiles.length > 0) {
      setCurrentFileIndex(0);
    }
  }, [formData, files.length]);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    const droppedFiles = e.dataTransfer.files;
    handleFileSelect(droppedFiles);
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
  }, []);

  const removeFile = (fileId) => {
    setFiles(prev => {
      const newFiles = prev.filter(f => f.id !== fileId);
      if (currentFileIndex >= newFiles.length && newFiles.length > 0) {
        setCurrentFileIndex(newFiles.length - 1);
      }
      return newFiles;
    });
  };

  const updateFileMetadata = (fileId, metadata) => {
    setFiles(prev => prev.map(file => 
      file.id === fileId ? { ...file, metadata } : file
    ));
  };

  const handleFormDataChange = (newData) => {
    setFormData(newData);
    if (files.length > 0 && uploadMode === 'single') {
      updateFileMetadata(files[currentFileIndex]?.id, newData);
    }
  };

  const validateForm = () => {
    const currentFile = files[currentFileIndex];
    if (!currentFile) return false;
    
    const metadata = currentFile.metadata;
    return metadata.title.trim() && 
           metadata.category && 
           metadata.termsAccepted;
  };

  const startUpload = async () => {
    if (!validateForm()) {
      alert('Please fill in all required fields and accept the terms.');
      return;
    }

    setIsUploading(true);
    const filesToUpload = uploadMode === 'bulk' ? files : [files[currentFileIndex]];
    
    const progressFiles = filesToUpload.map(file => ({
      id: file.id,
      name: file.name,
      size: file.size,
      status: 'uploading',
      progress: 0,
      timeRemaining: Math.floor(Math.random() * 120) + 30
    }));

    setUploadProgress(progressFiles);

    // Simulate upload progress
    for (let i = 0; i < filesToUpload.length; i++) {
      const file = filesToUpload[i];
      
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise(resolve => setTimeout(resolve, 200));
        
        setUploadProgress(prev => prev.map(pFile => 
          pFile.id === file.id 
            ? { 
                ...pFile, 
                progress,
                status: progress === 100 ? 'completed' : 'uploading',
                timeRemaining: progress === 100 ? 0 : Math.max(0, pFile.timeRemaining - 2)
              }
            : pFile
        ));
      }
    }

    setIsUploading(false);
    
    // Show success message and redirect
    setTimeout(() => {
      navigate('/user-profile-collections', { 
        state: { message: 'Wallpapers uploaded successfully!' }
      });
    }, 2000);
  };

  const saveDraft = () => {
    // Simulate saving draft
    setIsDraftSaved(true);
    setTimeout(() => setIsDraftSaved(false), 3000);
  };

  const handleExit = () => {
    if (files.length > 0 && !isDraftSaved) {
      setShowExitConfirm(true);
    } else {
      navigate('/home-dashboard');
    }
  };

  const currentFile = files[currentFileIndex];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BottomNavigation />
      
      <div className="pt-14 md:pt-28 pb-20 md:pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-text-primary">
                  Upload Wallpaper
                </h1>
                <p className="text-text-secondary mt-1">
                  Share your amazing wallpapers with the community
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={saveDraft}
                  className="btn btn-secondary px-4 py-2 text-sm"
                  disabled={files.length === 0}
                >
                  <Icon name="Save" size={16} className="mr-2" />
                  {isDraftSaved ? 'Saved!' : 'Save Draft'}
                </button>
                <button
                  onClick={handleExit}
                  className="btn btn-secondary px-4 py-2 text-sm"
                >
                  <Icon name="X" size={16} className="mr-2" />
                  Cancel
                </button>
              </div>
            </div>

            {/* Upload Mode Toggle */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex bg-secondary-100 rounded-lg p-1">
                <button
                  onClick={() => setUploadMode('single')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-150 ${
                    uploadMode === 'single' ?'bg-white text-text-primary shadow-sm' :'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  <Icon name="Image" size={16} className="mr-2" />
                  Single Upload
                </button>
                <button
                  onClick={() => setUploadMode('bulk')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-150 ${
                    uploadMode === 'bulk' ?'bg-white text-text-primary shadow-sm' :'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  <Icon name="Images" size={16} className="mr-2" />
                  Bulk Upload
                </button>
              </div>
              
              {files.length > 0 && (
                <div className="flex items-center space-x-2 text-sm text-text-secondary">
                  <Icon name="FileImage" size={16} />
                  <span>{files.length} file{files.length !== 1 ? 's' : ''} selected</span>
                </div>
              )}
            </div>
          </div>

          {/* Main Content */}
          {files.length === 0 ? (
            <FileUploadZone
              onFileSelect={handleFileSelect}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              fileInputRef={fileInputRef}
              uploadMode={uploadMode}
            />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Preview Section */}
              <div className="lg:col-span-6">
                <ImagePreview
                  files={files}
                  currentFileIndex={currentFileIndex}
                  onFileIndexChange={setCurrentFileIndex}
                  onRemoveFile={removeFile}
                  onAddMore={() => fileInputRef.current?.click()}
                  showPreview={showPreview}
                  onTogglePreview={() => setShowPreview(!showPreview)}
                />
              </div>

              {/* Metadata Form Section */}
              <div className="lg:col-span-6">
                {uploadMode === 'single' ? (
                  <MetadataForm
                    formData={currentFile?.metadata || formData}
                    onFormDataChange={handleFormDataChange}
                    categories={categories}
                    popularTags={popularTags}
                    onUpload={startUpload}
                    isUploading={isUploading}
                    canUpload={validateForm()}
                  />
                ) : (
                  <BulkUploadManager
                    files={files}
                    onUpdateFile={updateFileMetadata}
                    categories={categories}
                    popularTags={popularTags}
                    onUpload={startUpload}
                    isUploading={isUploading}
                    globalFormData={formData}
                    onGlobalFormDataChange={setFormData}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Upload Progress */}
      <UploadProgress
        files={uploadProgress}
        onClose={() => setUploadProgress([])}
        onRetry={(fileId) => console.log('Retry upload:', fileId)}
        onCancel={() => {
          setIsUploading(false);
          setUploadProgress([]);
        }}
      />

      {/* Quick Action Button */}
      <QuickActionButton />

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={(e) => handleFileSelect(e.target.files)}
        className="hidden"
      />

      {/* Exit Confirmation Modal */}
      {showExitConfirm && (
        <div className="fixed inset-0 z-500 flex items-center justify-center">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowExitConfirm(false)} />
          <div className="relative bg-surface rounded-lg shadow-xl max-w-md mx-4 p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-warning-100 rounded-full flex items-center justify-center mr-3">
                <Icon name="AlertTriangle" size={20} className="text-warning-600" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary">Unsaved Changes</h3>
            </div>
            <p className="text-text-secondary mb-6">
              You have unsaved changes. Are you sure you want to leave? Your progress will be lost.
            </p>
            <div className="flex items-center justify-end space-x-3">
              <button
                onClick={() => setShowExitConfirm(false)}
                className="btn btn-secondary px-4 py-2"
              >
                Stay
              </button>
              <button
                onClick={saveDraft}
                className="btn btn-accent px-4 py-2"
              >
                Save & Exit
              </button>
              <button
                onClick={() => navigate('/home-dashboard')}
                className="btn btn-primary px-4 py-2"
              >
                Exit Without Saving
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadWallpaper;