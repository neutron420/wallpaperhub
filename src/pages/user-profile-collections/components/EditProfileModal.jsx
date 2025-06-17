import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const EditProfileModal = ({ isOpen, onClose, user, onSave }) => {
  const [formData, setFormData] = useState({
    displayName: '',
    username: '',
    bio: '',
    location: '',
    website: '',
    avatar: '',
    coverImage: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    if (isOpen && user) {
      setFormData({
        displayName: user.displayName || '',
        username: user.username || '',
        bio: user.bio || '',
        location: user.location || '',
        website: user.website || '',
        avatar: user.avatar || '',
        coverImage: user.coverImage || ''
      });
      setErrors({});
    }
  }, [isOpen, user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.displayName.trim()) {
      newErrors.displayName = 'Display name is required';
    }

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = 'Username can only contain letters, numbers, and underscores';
    }

    if (formData.website && !formData.website.startsWith('http')) {
      newErrors.website = 'Website must start with http:// or https://';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      onSave(formData);
    } catch (error) {
      setErrors({ submit: 'Failed to update profile. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (type) => {
    // Simulate image upload
    const mockImageUrl = type === 'avatar' 
      ? "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
      : "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=400&fit=crop";
    
    setFormData(prev => ({
      ...prev,
      [type]: mockImageUrl
    }));
  };

  if (!isOpen) return null;

  const tabs = [
    { id: 'profile', label: 'Profile Info', icon: 'User' },
    { id: 'privacy', label: 'Privacy', icon: 'Shield' },
    { id: 'notifications', label: 'Notifications', icon: 'Bell' }
  ];

  return (
    <div className="fixed inset-0 z-500 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-250"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-surface rounded-lg shadow-xl animate-scale-in max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-text-primary">Edit Profile</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-secondary-100 transition-colors duration-150"
          >
            <Icon name="X" size={20} className="text-secondary-600" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 text-sm font-medium transition-colors duration-150 ${
                activeTab === tab.id
                  ? 'text-primary border-b-2 border-primary' :'text-text-secondary hover:text-text-primary'
              }`}
            >
              <Icon name={tab.icon} size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === 'profile' && (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Cover Image */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Cover Image
                </label>
                <div className="relative h-32 bg-secondary-100 rounded-lg overflow-hidden">
                  {formData.coverImage ? (
                    <Image
                      src={formData.coverImage}
                      alt="Cover"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Icon name="Image" size={32} className="text-secondary-400" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
                    <button
                      type="button"
                      onClick={() => handleImageUpload('coverImage')}
                      className="btn btn-primary text-sm"
                    >
                      <Icon name="Upload" size={16} className="mr-2" />
                      Upload Cover
                    </button>
                  </div>
                </div>
              </div>

              {/* Avatar */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Profile Picture
                </label>
                <div className="flex items-center space-x-4">
                  <div className="relative w-20 h-20 rounded-full overflow-hidden bg-secondary-100">
                    {formData.avatar ? (
                      <Image
                        src={formData.avatar}
                        alt="Avatar"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Icon name="User" size={24} className="text-secondary-400" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
                      <button
                        type="button"
                        onClick={() => handleImageUpload('avatar')}
                        className="p-1"
                      >
                        <Icon name="Camera" size={16} className="text-white" />
                      </button>
                    </div>
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={() => handleImageUpload('avatar')}
                      className="btn btn-secondary text-sm"
                    >
                      Change Avatar
                    </button>
                    <p className="text-xs text-text-muted mt-1">
                      JPG, PNG or GIF. Max size 2MB.
                    </p>
                  </div>
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="displayName" className="block text-sm font-medium text-text-primary mb-1">
                    Display Name
                  </label>
                  <input
                    type="text"
                    id="displayName"
                    name="displayName"
                    value={formData.displayName}
                    onChange={handleInputChange}
                    className={`input ${errors.displayName ? 'border-error focus:ring-error' : ''}`}
                    placeholder="Your display name"
                  />
                  {errors.displayName && (
                    <p className="mt-1 text-sm text-error">{errors.displayName}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-text-primary mb-1">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className={`input ${errors.username ? 'border-error focus:ring-error' : ''}`}
                    placeholder="your_username"
                  />
                  {errors.username && (
                    <p className="mt-1 text-sm text-error">{errors.username}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-text-primary mb-1">
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows={4}
                  className="input resize-none"
                  placeholder="Tell us about yourself..."
                />
                <p className="mt-1 text-xs text-text-muted">
                  {formData.bio.length}/500 characters
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-text-primary mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="input"
                    placeholder="City, Country"
                  />
                </div>

                <div>
                  <label htmlFor="website" className="block text-sm font-medium text-text-primary mb-1">
                    Website
                  </label>
                  <input
                    type="url"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    className={`input ${errors.website ? 'border-error focus:ring-error' : ''}`}
                    placeholder="https://yourwebsite.com"
                  />
                  {errors.website && (
                    <p className="mt-1 text-sm text-error">{errors.website}</p>
                  )}
                </div>
              </div>

              {errors.submit && (
                <div className="p-3 bg-error-50 border border-error-200 rounded-lg">
                  <p className="text-sm text-error-700">{errors.submit}</p>
                </div>
              )}
            </form>
          )}

          {activeTab === 'privacy' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-text-primary mb-4">Privacy Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-text-primary">Profile Visibility</h4>
                      <p className="text-sm text-text-secondary">Control who can see your profile</p>
                    </div>
                    <select className="input w-32">
                      <option>Public</option>
                      <option>Private</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-text-primary">Show Activity</h4>
                      <p className="text-sm text-text-secondary">Display your recent activity</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-secondary-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-text-primary mb-4">Notification Preferences</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-text-primary">Email Notifications</h4>
                      <p className="text-sm text-text-secondary">Receive updates via email</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-secondary-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-text-primary">Push Notifications</h4>
                      <p className="text-sm text-text-secondary">Get notified on your device</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-secondary-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {activeTab === 'profile' && (
          <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Saving...
                </div>
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditProfileModal;