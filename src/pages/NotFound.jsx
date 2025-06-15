import React from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center mb-6">
            <Icon name="ImageOff" size={64} className="text-primary-600" />
          </div>
          <h1 className="text-6xl font-bold text-primary mb-2">404</h1>
          <h2 className="text-2xl font-semibold text-text-primary mb-4">Page Not Found</h2>
          <p className="text-text-secondary mb-8">
            The wallpaper you're looking for seems to have disappeared into the digital void. 
            Let's get you back to discovering amazing wallpapers!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link
            to="/home-dashboard"
            className="btn btn-primary w-full h-12 text-base font-medium"
          >
            <Icon name="Home" size={20} className="mr-2" />
            Back to Home
          </Link>
          <Link
            to="/wallpaper-browse-search"
            className="btn btn-secondary w-full h-12 text-base font-medium"
          >
            <Icon name="Search" size={20} className="mr-2" />
            Browse Wallpapers
          </Link>
        </div>

        {/* Help Text */}
        <div className="mt-8 pt-6 border-t border-border">
          <p className="text-sm text-text-muted">
            If you believe this is an error, please{' '}
            <button className="text-primary hover:text-primary-700 font-medium">
              contact support
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;