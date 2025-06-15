// src/pages/user-authentication-login-register/index.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSupabase } from '../../context/SupabaseContext';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const UserAuthentication = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const navigate = useNavigate();
  const { signIn, signUp, signInWithGoogle, resetPassword, user } = useSupabase();

  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [registerForm, setRegisterForm] = useState({
    username: '',
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });

  const [forgotPasswordForm, setForgotPasswordForm] = useState({
    email: ''
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  // Featured wallpapers from Supabase or fallback to static URLs
  const featuredWallpapers = [
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop",
    "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?w=400&h=600&fit=crop",
    "https://images.pixabay.com/photo/2016/08/11/23/48/mountains-1587287_960_720.jpg",
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=600&fit=crop"
  ];

  // Redirect if already authenticated
  useEffect(() => {
    if (user) {
      navigate('/home-dashboard');
    }
  }, [user, navigate]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});
    setSuccessMessage('');

    // Validation
    const newErrors = {};
    if (!loginForm.email) newErrors.email = 'Email is required';
    if (!loginForm.password) newErrors.password = 'Password is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    // Attempt sign in
    const { error } = await signIn({
      email: loginForm.email,
      password: loginForm.password,
    });

    if (error) {
      setErrors({ submit: error.message });
    } else {
      navigate('/home-dashboard');
    }
    
    setIsLoading(false);
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});
    setSuccessMessage('');

    // Validation
    const newErrors = {};
    if (!registerForm.username) newErrors.username = 'Username is required';
    if (!registerForm.fullName) newErrors.fullName = 'Full name is required';
    if (!registerForm.email) newErrors.email = 'Email is required';
    if (!registerForm.password) newErrors.password = 'Password is required';
    if (registerForm.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (registerForm.password !== registerForm.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!registerForm.acceptTerms) newErrors.acceptTerms = 'You must accept the terms';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    // Attempt sign up
    const { error } = await signUp({
      email: registerForm.email,
      password: registerForm.password,
      username: registerForm.username,
      fullName: registerForm.fullName,
    });

    if (error) {
      setErrors({ submit: error.message });
    } else {
      setSuccessMessage('Account created successfully! Please check your email to verify your account.');
      // Reset form
      setRegisterForm({
        username: '',
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        acceptTerms: false
      });
    }
    
    setIsLoading(false);
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});
    
    if (!forgotPasswordForm.email) {
      setErrors({ email: 'Email is required' });
      setIsLoading(false);
      return;
    }

    const { error } = await resetPassword(forgotPasswordForm.email);
    
    if (error) {
      setErrors({ submit: error.message });
    } else {
      setShowForgotPassword(false);
      setForgotPasswordForm({ email: '' });
      setSuccessMessage('Password reset link sent to your email!');
    }
    
    setIsLoading(false);
  };

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    setErrors({});
    
    const { error } = await signInWithGoogle();
    
    if (error) {
      setErrors({ submit: error.message });
      setIsLoading(false);
    }
    // Navigation will be handled by the redirect
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-background to-accent-50 flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center px-4 py-8 lg:px-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-700 rounded-xl flex items-center justify-center">
                <Icon name="Image" size={24} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold text-text-primary">WallpaperHub</h1>
            </div>
            <p className="text-text-secondary">
              Discover and share amazing wallpapers
            </p>
            <div className="flex items-center justify-center space-x-4 mt-4 text-sm text-text-muted">
              <div className="flex items-center space-x-1">
                <Icon name="Users" size={16} />
                <span>50K+ Users</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Image" size={16} />
                <span>100K+ Wallpapers</span>
              </div>
            </div>
          </div>

          {/* Success Message */}
          {successMessage && (
            <div className="mb-4 p-3 bg-success-50 border border-success-200 rounded-lg">
              <p className="text-sm text-success-700">{successMessage}</p>
            </div>
          )}

          {/* Tabs */}
          <div className="flex bg-secondary-100 rounded-lg p-1 mb-6">
            <button
              onClick={() => setActiveTab('login')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-150 ${
                activeTab === 'login' ?'bg-surface text-text-primary shadow-sm' :'text-text-secondary hover:text-text-primary'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setActiveTab('register')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-150 ${
                activeTab === 'register' ?'bg-surface text-text-primary shadow-sm' :'text-text-secondary hover:text-text-primary'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Login Form */}
          {activeTab === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                  className={`input ${errors.email ? 'border-error' : ''}`}
                  placeholder="Enter your email"
                  disabled={isLoading}
                />
                {errors.email && <p className="text-sm text-error mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    className={`input pr-10 ${errors.password ? 'border-error' : ''}`}
                    placeholder="Enter your password"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-muted hover:text-text-secondary"
                    disabled={isLoading}
                  >
                    <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={18} />
                  </button>
                </div>
                {errors.password && <p className="text-sm text-error mt-1">{errors.password}</p>}
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={loginForm.rememberMe}
                    onChange={(e) => setLoginForm({ ...loginForm, rememberMe: e.target.checked })}
                    className="rounded border-border text-primary focus:ring-primary"
                    disabled={isLoading}
                  />
                  <span className="ml-2 text-sm text-text-secondary">Remember me</span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-sm text-primary hover:text-primary-700 font-medium"
                  disabled={isLoading}
                >
                  Forgot password?
                </button>
              </div>

              {errors.submit && (
                <div className="p-3 bg-error-50 border border-error-200 rounded-lg">
                  <p className="text-sm text-error-700">{errors.submit}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-primary w-full h-12 text-base font-medium"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Signing In...
                  </div>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>
          )}

          {/* Register Form */}
          {activeTab === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  Username
                </label>
                <input
                  type="text"
                  value={registerForm.username}
                  onChange={(e) => setRegisterForm({ ...registerForm, username: e.target.value })}
                  className={`input ${errors.username ? 'border-error' : ''}`}
                  placeholder="Choose a username"
                  disabled={isLoading}
                />
                {errors.username && <p className="text-sm text-error mt-1">{errors.username}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={registerForm.fullName}
                  onChange={(e) => setRegisterForm({ ...registerForm, fullName: e.target.value })}
                  className={`input ${errors.fullName ? 'border-error' : ''}`}
                  placeholder="Enter your full name"
                  disabled={isLoading}
                />
                {errors.fullName && <p className="text-sm text-error mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={registerForm.email}
                  onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                  className={`input ${errors.email ? 'border-error' : ''}`}
                  placeholder="Enter your email"
                  disabled={isLoading}
                />
                {errors.email && <p className="text-sm text-error mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={registerForm.password}
                    onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                    className={`input pr-10 ${errors.password ? 'border-error' : ''}`}
                    placeholder="Create a password"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-muted hover:text-text-secondary"
                    disabled={isLoading}
                  >
                    <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={18} />
                  </button>
                </div>
                {errors.password && <p className="text-sm text-error mt-1">{errors.password}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={registerForm.confirmPassword}
                    onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
                    className={`input pr-10 ${errors.confirmPassword ? 'border-error' : ''}`}
                    placeholder="Confirm your password"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-muted hover:text-text-secondary"
                    disabled={isLoading}
                  >
                    <Icon name={showConfirmPassword ? 'EyeOff' : 'Eye'} size={18} />
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-sm text-error mt-1">{errors.confirmPassword}</p>}
              </div>

              <div>
                <label className="flex items-start">
                  <input
                    type="checkbox"
                    checked={registerForm.acceptTerms}
                    onChange={(e) => setRegisterForm({ ...registerForm, acceptTerms: e.target.checked })}
                    className="rounded border-border text-primary focus:ring-primary mt-0.5"
                    disabled={isLoading}
                  />
                  <span className="ml-2 text-sm text-text-secondary">
                    I agree to the{' '}
                    <button type="button" className="text-primary hover:text-primary-700 font-medium">
                      Terms of Service
                    </button>{' '}
                    and{' '}
                    <button type="button" className="text-primary hover:text-primary-700 font-medium">
                      Privacy Policy
                    </button>
                  </span>
                </label>
                {errors.acceptTerms && <p className="text-sm text-error mt-1">{errors.acceptTerms}</p>}
              </div>

              {errors.submit && (
                <div className="p-3 bg-error-50 border border-error-200 rounded-lg">
                  <p className="text-sm text-error-700">{errors.submit}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-primary w-full h-12 text-base font-medium"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Creating Account...
                  </div>
                ) : (
                  'Create Account'
                )}
              </button>
            </form>
          )}

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-background text-text-secondary">Or continue with</span>
            </div>
          </div>

          {/* Google OAuth */}
          <button
            onClick={handleGoogleAuth}
            disabled={isLoading}
            className="w-full flex items-center justify-center px-4 py-3 border border-border rounded-lg hover:bg-secondary-50 transition-colors duration-150 font-medium"
          >
            <Icon name="Chrome" size={20} className="text-secondary-600 mr-3" />
            <span className="text-text-secondary">Continue with Google</span>
          </button>
        </div>
      </div>

      {/* Right Side - Featured Wallpapers (Desktop Only) */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-2/5 bg-gradient-to-br from-primary-100 to-accent-100 p-8">
        <div className="flex flex-col justify-center w-full">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              Discover Amazing Wallpapers
            </h2>
            <p className="text-lg text-text-secondary mb-6">
              Join our community of creators and discover thousands of high-quality wallpapers for all your devices.
            </p>
            <div className="flex items-center space-x-6 text-sm text-text-muted">
              <div className="flex items-center space-x-2">
                <Icon name="Download" size={16} />
                <span>Free Downloads</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Palette" size={16} />
                <span>HD Quality</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Heart" size={16} />
                <span>Curated Collection</span>
              </div>
            </div>
          </div>

          {/* Featured Wallpapers Grid */}
          <div className="grid grid-cols-2 gap-4">
            {featuredWallpapers.map((wallpaper, index) => (
              <div
                key={index}
                className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <Image
                  src={wallpaper}
                  alt={`Featured wallpaper ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div className="fixed inset-0 z-500 flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setShowForgotPassword(false)}
          />
          <div className="relative w-full max-w-md mx-4 bg-surface rounded-lg shadow-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text-primary">Reset Password</h3>
              <button
                onClick={() => setShowForgotPassword(false)}
                className="p-1 rounded-lg hover:bg-secondary-100"
                disabled={isLoading}
              >
                <Icon name="X" size={20} className="text-secondary-600" />
              </button>
            </div>
            <p className="text-text-secondary mb-4">
              Enter your email address and we'll send you a link to reset your password.
            </p>
            <form onSubmit={handleForgotPasswordSubmit}>
              <div className="mb-4">
                <input
                  type="email"
                  value={forgotPasswordForm.email}
                  onChange={(e) => setForgotPasswordForm({ email: e.target.value })}
                  className="input"
                  placeholder="Enter your email"
                  disabled={isLoading}
                  required
                />
                {errors.email && <p className="text-sm text-error mt-1">{errors.email}</p>}
              </div>
              {errors.submit && (
                <div className="mb-4 p-3 bg-error-50 border border-error-200 rounded-lg">
                  <p className="text-sm text-error-700">{errors.submit}</p>
                </div>
              )}
              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-primary w-full"
              >
                {isLoading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserAuthentication;