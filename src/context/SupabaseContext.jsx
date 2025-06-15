// src/context/SupabaseContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import supabase from '../lib/supabase';

const SupabaseContext = createContext();

export function SupabaseProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchUserProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        await fetchUserProfile(session.user.id);
      } else {
        setUserProfile(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching user profile:', error);
      } else {
        setUserProfile(data);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    } finally {
      setLoading(false);
    }
  };

  // Auth functions
  const signUp = async ({ email, password, username, fullName }) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
            full_name: fullName,
          },
        },
      });

      if (error) throw error;

      // Create user profile
      if (data.user) {
        const { error: profileError } = await supabase
          .from('user_profiles')
          .insert({
            id: data.user.id,
            username,
            full_name: fullName,
          });

        if (profileError) {
          console.error('Error creating user profile:', profileError);
        }
      }

      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  const signIn = async ({ email, password }) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  const signInWithGoogle = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/home-dashboard`,
        },
      });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
      setUserProfile(null);
      setSession(null);
      return { error: null };
    } catch (error) {
      return { error };
    }
  };

  const resetPassword = async (email) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;
      return { error: null };
    } catch (error) {
      return { error };
    }
  };

  const updateProfile = async (updates) => {
    try {
      if (!user) throw new Error('No user logged in');

      const { data, error } = await supabase
        .from('user_profiles')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single();

      if (error) throw error;
      
      setUserProfile(data);
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  // Wallpaper functions
  const getWallpapers = async ({ 
    limit = 20, 
    offset = 0, 
    categoryId = null, 
    searchQuery = null,
    sortBy = 'created_at',
    sortOrder = 'desc',
    featured = false
  } = {}) => {
    try {
      let query = supabase
        .from('wallpapers')
        .select(`
          *,
          user_profiles!wallpapers_user_id_fkey(username, avatar_url),
          wallpaper_categories!wallpapers_category_id_fkey(name, slug)
        `)
        .eq('is_public', true);

      if (categoryId) {
        query = query.eq('category_id', categoryId);
      }

      if (searchQuery) {
        query = query.or(`title.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`);
      }

      if (featured) {
        query = query.eq('is_featured', true);
      }

      query = query.order(sortBy, { ascending: sortOrder === 'asc' });
      
      if (limit) {
        query = query.range(offset, offset + limit - 1);
      }

      const { data, error } = await query;

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  const getWallpaperById = async (id) => {
    try {
      const { data, error } = await supabase
        .from('wallpapers')
        .select(`
          *,
          user_profiles!wallpapers_user_id_fkey(username, avatar_url),
          wallpaper_categories!wallpapers_category_id_fkey(name, slug)
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  const getTrendingWallpapers = async (limit = 6) => {
    try {
      const { data, error } = await supabase
        .from('wallpapers')
        .select(`
          *,
          user_profiles!wallpapers_user_id_fkey(username, avatar_url)
        `)
        .eq('is_public', true)
        .order('download_count', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  const getFeaturedWallpaper = async () => {
    try {
      const { data, error } = await supabase
        .from('wallpapers')
        .select(`
          *,
          user_profiles!wallpapers_user_id_fkey(username, avatar_url),
          wallpaper_categories!wallpapers_category_id_fkey(name, slug)
        `)
        .eq('is_featured', true)
        .eq('is_public', true)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  const getCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('wallpaper_categories')
        .select('*')
        .order('name');

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  const getUserStats = async (userId = null) => {
    try {
      const targetUserId = userId || user?.id;
      if (!targetUserId) throw new Error('No user ID provided');

      // Get upload count
      const { count: uploads } = await supabase
        .from('wallpapers')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', targetUserId);

      // Get favorites count
      const { count: favorites } = await supabase
        .from('wallpaper_likes')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', targetUserId);

      // Get total downloads for user's wallpapers
      const { data: wallpaperStats } = await supabase
        .from('wallpapers')
        .select('download_count')
        .eq('user_id', targetUserId);

      const totalDownloads = wallpaperStats?.reduce((total, wp) => total + (wp.download_count || 0), 0) || 0;

      return {
        data: {
          uploads: uploads || 0,
          favorites: favorites || 0,
          downloads: totalDownloads,
        },
        error: null
      };
    } catch (error) {
      return { data: null, error };
    }
  };

  const value = {
    user,
    userProfile,
    session,
    loading,
    // Auth functions
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    resetPassword,
    updateProfile,
    // Data functions
    getWallpapers,
    getWallpaperById,
    getTrendingWallpapers,
    getFeaturedWallpaper,
    getCategories,
    getUserStats,
  };

  return (
    <SupabaseContext.Provider value={value}>
      {children}
    </SupabaseContext.Provider>
  );
}

export function useSupabase() {
  const context = useContext(SupabaseContext);
  if (context === undefined) {
    throw new Error('useSupabase must be used within a SupabaseProvider');
  }
  return context;
}

export default SupabaseContext;