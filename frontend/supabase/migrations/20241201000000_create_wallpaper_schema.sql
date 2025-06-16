-- supabase/migrations/20241201000000_create_wallpaper_schema.sql

-- Create user_profiles table to extend auth.users
CREATE TABLE public.user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  website TEXT,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Create categories table
CREATE TABLE public.wallpaper_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  icon_name TEXT,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Create wallpapers table
CREATE TABLE public.wallpapers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  thumbnail_url TEXT,
  original_filename TEXT,
  file_size BIGINT,
  width INTEGER,
  height INTEGER,
  format TEXT,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  category_id UUID REFERENCES public.wallpaper_categories(id),
  tags TEXT[],
  is_featured BOOLEAN DEFAULT false,
  is_public BOOLEAN DEFAULT true,
  download_count INTEGER DEFAULT 0,
  like_count INTEGER DEFAULT 0,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Create collections table
CREATE TABLE public.user_collections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  is_public BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Create collection_wallpapers junction table
CREATE TABLE public.collection_wallpapers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  collection_id UUID REFERENCES public.user_collections(id) ON DELETE CASCADE,
  wallpaper_id UUID REFERENCES public.wallpapers(id) ON DELETE CASCADE,
  added_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(collection_id, wallpaper_id)
);

-- Create wallpaper_likes table
CREATE TABLE public.wallpaper_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  wallpaper_id UUID REFERENCES public.wallpapers(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, wallpaper_id)
);

-- Create wallpaper_downloads table for tracking
CREATE TABLE public.wallpaper_downloads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  wallpaper_id UUID REFERENCES public.wallpapers(id) ON DELETE CASCADE,
  ip_address INET,
  user_agent TEXT,
  downloaded_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Create comments table
CREATE TABLE public.wallpaper_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wallpaper_id UUID REFERENCES public.wallpapers(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  parent_comment_id UUID REFERENCES public.wallpaper_comments(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Create user_activities table for activity tracking
CREATE TABLE public.user_activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  activity_type TEXT NOT NULL CHECK (activity_type IN ('upload', 'like', 'download', 'comment', 'collection_create')),
  wallpaper_id UUID REFERENCES public.wallpapers(id) ON DELETE CASCADE,
  collection_id UUID REFERENCES public.user_collections(id) ON DELETE CASCADE,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_wallpapers_user_id ON public.wallpapers(user_id);
CREATE INDEX idx_wallpapers_category_id ON public.wallpapers(category_id);
CREATE INDEX idx_wallpapers_created_at ON public.wallpapers(created_at DESC);
CREATE INDEX idx_wallpapers_download_count ON public.wallpapers(download_count DESC);
CREATE INDEX idx_wallpapers_like_count ON public.wallpapers(like_count DESC);
CREATE INDEX idx_wallpapers_is_featured ON public.wallpapers(is_featured) WHERE is_featured = true;
CREATE INDEX idx_wallpapers_is_public ON public.wallpapers(is_public) WHERE is_public = true;
CREATE INDEX idx_wallpapers_tags ON public.wallpapers USING GIN(tags);
CREATE INDEX idx_user_collections_user_id ON public.user_collections(user_id);
CREATE INDEX idx_collection_wallpapers_collection_id ON public.collection_wallpapers(collection_id);
CREATE INDEX idx_collection_wallpapers_wallpaper_id ON public.collection_wallpapers(wallpaper_id);
CREATE INDEX idx_wallpaper_likes_user_id ON public.wallpaper_likes(user_id);
CREATE INDEX idx_wallpaper_likes_wallpaper_id ON public.wallpaper_likes(wallpaper_id);
CREATE INDEX idx_wallpaper_downloads_wallpaper_id ON public.wallpaper_downloads(wallpaper_id);
CREATE INDEX idx_wallpaper_downloads_downloaded_at ON public.wallpaper_downloads(downloaded_at DESC);
CREATE INDEX idx_wallpaper_comments_wallpaper_id ON public.wallpaper_comments(wallpaper_id);
CREATE INDEX idx_wallpaper_comments_user_id ON public.wallpaper_comments(user_id);
CREATE INDEX idx_user_activities_user_id ON public.user_activities(user_id);
CREATE INDEX idx_user_activities_created_at ON public.user_activities(created_at DESC);

-- Enable RLS on all tables
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wallpaper_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wallpapers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.collection_wallpapers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wallpaper_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wallpaper_downloads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wallpaper_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_activities ENABLE ROW LEVEL SECURITY;

-- Helper functions for RLS policies
CREATE OR REPLACE FUNCTION public.is_wallpaper_owner(wallpaper_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT auth.uid() = wallpaper_user_id;
$$;

CREATE OR REPLACE FUNCTION public.is_collection_owner(collection_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT auth.uid() = collection_user_id;
$$;

-- RLS Policies for user_profiles
CREATE POLICY "Users can view all public profiles"
ON public.user_profiles
FOR SELECT
TO public
USING (true);

CREATE POLICY "Users can update own profile"
ON public.user_profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
ON public.user_profiles
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);

-- RLS Policies for wallpaper_categories
CREATE POLICY "Categories are viewable by everyone"
ON public.wallpaper_categories
FOR SELECT
TO public
USING (true);

-- RLS Policies for wallpapers
CREATE POLICY "Public wallpapers are viewable by everyone"
ON public.wallpapers
FOR SELECT
TO public
USING (is_public = true);

CREATE POLICY "Users can view own wallpapers"
ON public.wallpapers
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own wallpapers"
ON public.wallpapers
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own wallpapers"
ON public.wallpapers
FOR UPDATE
TO authenticated
USING (public.is_wallpaper_owner(user_id))
WITH CHECK (public.is_wallpaper_owner(user_id));

CREATE POLICY "Users can delete own wallpapers"
ON public.wallpapers
FOR DELETE
TO authenticated
USING (public.is_wallpaper_owner(user_id));

-- RLS Policies for user_collections
CREATE POLICY "Public collections are viewable by everyone"
ON public.user_collections
FOR SELECT
TO public
USING (is_public = true);

CREATE POLICY "Users can view own collections"
ON public.user_collections
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can create own collections"
ON public.user_collections
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own collections"
ON public.user_collections
FOR UPDATE
TO authenticated
USING (public.is_collection_owner(user_id))
WITH CHECK (public.is_collection_owner(user_id));

CREATE POLICY "Users can delete own collections"
ON public.user_collections
FOR DELETE
TO authenticated
USING (public.is_collection_owner(user_id));

-- RLS Policies for collection_wallpapers
CREATE POLICY "Collection wallpapers viewable by collection viewers"
ON public.collection_wallpapers
FOR SELECT
TO public
USING (
  EXISTS (
    SELECT 1 FROM public.user_collections uc
    WHERE uc.id = collection_id
    AND (uc.is_public = true OR uc.user_id = auth.uid())
  )
);

CREATE POLICY "Users can manage own collection wallpapers"
ON public.collection_wallpapers
FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.user_collections uc
    WHERE uc.id = collection_id AND uc.user_id = auth.uid()
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.user_collections uc
    WHERE uc.id = collection_id AND uc.user_id = auth.uid()
  )
);

-- RLS Policies for wallpaper_likes
CREATE POLICY "Users can view all likes"
ON public.wallpaper_likes
FOR SELECT
TO public
USING (true);

CREATE POLICY "Users can manage own likes"
ON public.wallpaper_likes
FOR ALL
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- RLS Policies for wallpaper_downloads
CREATE POLICY "Users can view own downloads"
ON public.wallpaper_downloads
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Anyone can record downloads"
ON public.wallpaper_downloads
FOR INSERT
TO public
WITH CHECK (true);

-- RLS Policies for wallpaper_comments
CREATE POLICY "Comments are viewable by everyone"
ON public.wallpaper_comments
FOR SELECT
TO public
USING (true);

CREATE POLICY "Authenticated users can create comments"
ON public.wallpaper_comments
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own comments"
ON public.wallpaper_comments
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own comments"
ON public.wallpaper_comments
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- RLS Policies for user_activities
CREATE POLICY "Users can view own activities"
ON public.user_activities
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can create own activities"
ON public.user_activities
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Insert default categories
INSERT INTO public.wallpaper_categories (name, slug, description, icon_name) VALUES
('Nature', 'nature', 'Beautiful landscapes and natural scenery', 'Flower'),
('Abstract', 'abstract', 'Creative and artistic abstract designs', 'Palette'),
('Architecture', 'architecture', 'Buildings and architectural photography', 'Building'),
('Space', 'space', 'Cosmic and space-themed wallpapers', 'Rocket'),
('Animals', 'animals', 'Wildlife and pet photography', 'Cat'),
('Technology', 'technology', 'Tech-inspired and futuristic designs', 'Cpu'),
('Minimal', 'minimal', 'Clean and minimalistic designs', 'Minus'),
('Dark', 'dark', 'Dark themed wallpapers', 'Moon'),
('Light', 'light', 'Bright and light themed wallpapers', 'Sun'),
('Vintage', 'vintage', 'Retro and vintage style wallpapers', 'Clock');