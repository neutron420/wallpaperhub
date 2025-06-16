/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'primary': '#2563EB', // Trust-building blue - blue-600
        'primary-50': '#EFF6FF', // Light blue tint - blue-50
        'primary-100': '#DBEAFE', // Lighter blue - blue-100
        'primary-500': '#3B82F6', // Medium blue - blue-500
        'primary-700': '#1D4ED8', // Darker blue - blue-700
        'primary-900': '#1E3A8A', // Darkest blue - blue-900
        
        // Secondary Colors
        'secondary': '#64748B', // Sophisticated slate - slate-500
        'secondary-50': '#F8FAFC', // Light slate - slate-50
        'secondary-100': '#F1F5F9', // Lighter slate - slate-100
        'secondary-200': '#E2E8F0', // Light slate - slate-200
        'secondary-300': '#CBD5E1', // Medium light slate - slate-300
        'secondary-400': '#94A3B8', // Medium slate - slate-400
        'secondary-600': '#475569', // Darker slate - slate-600
        'secondary-700': '#334155', // Dark slate - slate-700
        'secondary-800': '#1E293B', // Darker slate - slate-800
        'secondary-900': '#0F172A', // Darkest slate - slate-900
        
        // Accent Colors
        'accent': '#F59E0B', // Warm amber - amber-500
        'accent-50': '#FFFBEB', // Light amber - amber-50
        'accent-100': '#FEF3C7', // Lighter amber - amber-100
        'accent-200': '#FDE68A', // Light amber - amber-200
        'accent-300': '#FCD34D', // Medium light amber - amber-300
        'accent-400': '#FBBF24', // Medium amber - amber-400
        'accent-600': '#D97706', // Darker amber - amber-600
        'accent-700': '#B45309', // Dark amber - amber-700
        'accent-800': '#92400E', // Darker amber - amber-800
        'accent-900': '#78350F', // Darkest amber - amber-900
        
        // Background Colors
        'background': '#FAFAFA', // Off-white background - gray-50
        'surface': '#FFFFFF', // Pure white surface - white
        
        // Text Colors
        'text-primary': '#1E293B', // Deep charcoal - slate-800
        'text-secondary': '#64748B', // Secondary text - slate-500
        'text-muted': '#94A3B8', // Muted text - slate-400
        
        // Status Colors
        'success': '#10B981', // Fresh green - emerald-500
        'success-50': '#ECFDF5', // Light green - emerald-50
        'success-100': '#D1FAE5', // Lighter green - emerald-100
        'success-600': '#059669', // Darker green - emerald-600
        'success-700': '#047857', // Dark green - emerald-700
        
        'warning': '#F59E0B', // Warning amber - amber-500
        'warning-50': '#FFFBEB', // Light warning - amber-50
        'warning-100': '#FEF3C7', // Lighter warning - amber-100
        'warning-600': '#D97706', // Darker warning - amber-600
        'warning-700': '#B45309', // Dark warning - amber-700
        
        'error': '#EF4444', // Clear red - red-500
        'error-50': '#FEF2F2', // Light red - red-50
        'error-100': '#FEE2E2', // Lighter red - red-100
        'error-600': '#DC2626', // Darker red - red-600
        'error-700': '#B91C1C', // Dark red - red-700
        
        // Border Colors
        'border': '#E2E8F0', // Neutral border - slate-200
        'border-light': '#F1F5F9', // Light border - slate-100
        'border-dark': '#CBD5E1', // Dark border - slate-300
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        'inter': ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        'mono': ['JetBrains Mono', 'Fira Code', 'Monaco', 'Consolas', 'Ubuntu Mono', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        'lg': '8px',
        'md': '6px',
        'sm': '4px',
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'DEFAULT': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'elevation-1': '0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)',
        'elevation-2': '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
        'elevation-3': '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)',
        'elevation-4': '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)',
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-out',
        'fade-out': 'fadeOut 0.2s ease-out',
        'slide-up': 'slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        'slide-down': 'slideDown 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        'scale-in': 'scaleIn 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        'shimmer': 'shimmer 1.5s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200px 0' },
          '100%': { backgroundPosition: 'calc(200px + 100%) 0' },
        },
      },
      transitionTimingFunction: {
        'ease-out-smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        '150': '150ms',
        '250': '250ms',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
}