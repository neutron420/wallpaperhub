// src/lib/supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

// Storage bucket name for wallpapers
export const WALLPAPER_BUCKET = 'wallpapers';

// Helper function to get public URL for uploaded files
export const getPublicUrl = (bucket, path) => {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
};

// Helper function to upload file to storage
export const uploadFile = async (bucket, path, file, options = {}) => {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      cacheControl: '3600',
      upsert: false,
      ...options,
    });

  if (error) {
    throw error;
  }

  return data;
};

// Helper function to delete file from storage
export const deleteFile = async (bucket, path) => {
  const { error } = await supabase.storage.from(bucket).remove([path]);
  
  if (error) {
    throw error;
  }
};

export default supabase;