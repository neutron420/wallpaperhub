import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";

// Page imports
import UserAuthentication from "pages/user-authentication-login-register";
import HomeDashboard from "pages/home-dashboard";
import WallpaperBrowse from "pages/wallpaper-browse-search";
import WallpaperDetail from "pages/wallpaper-detail-download";
import UploadWallpaper from "pages/upload-wallpaper";
import UserProfile from "pages/user-profile-collections";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          <Route path="/user-authentication-login-register" element={<UserAuthentication />} />
          <Route path="/home-dashboard" element={<HomeDashboard />} />
          <Route path="/wallpaper-browse-search" element={<WallpaperBrowse />} />
          <Route path="/wallpaper-detail-download" element={<WallpaperDetail />} />
          <Route path="/upload-wallpaper" element={<UploadWallpaper />} />
          <Route path="/user-profile-collections" element={<UserProfile />} />
          <Route path="/" element={<UserAuthentication />} />
          <Route path="*" element={<div>404 - Page Not Found</div>} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;