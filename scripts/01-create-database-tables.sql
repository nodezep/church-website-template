-- Create sermons table
CREATE TABLE IF NOT EXISTS public.sermons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  preacher TEXT NOT NULL,
  date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  description TEXT,
  audio_url TEXT,
  video_url TEXT,
  thumbnail_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create events table
CREATE TABLE IF NOT EXISTS public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  date DATE NOT NULL,
  time TEXT NOT NULL,
  location TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  category TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create jsc_zones table (Life Groups)
CREATE TABLE IF NOT EXISTS public.jsc_zones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  leader TEXT,
  description TEXT,
  meeting_day TEXT,
  meeting_time TEXT,
  contact_email TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create ministries table
CREATE TABLE IF NOT EXISTS public.ministries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  leader TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create contact_messages table
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create prayer_requests table
CREATE TABLE IF NOT EXISTS public.prayer_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT, -- Optional
  email TEXT, -- Optional
  request TEXT NOT NULL,
  is_anonymous BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  content TEXT NOT NULL,
  published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  image_url TEXT,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create settings table (for general church info, service times, social media, SEO)
CREATE TABLE IF NOT EXISTS public.settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  setting_key TEXT UNIQUE NOT NULL,
  setting_value JSONB,
  description TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS) for all tables
ALTER TABLE public.sermons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jsc_zones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ministries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prayer_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for public access (read-only for non-authenticated users)
-- Sermons
CREATE POLICY "Allow public read access to sermons" ON public.sermons FOR SELECT USING (TRUE);
-- Events
CREATE POLICY "Allow public read access to events" ON public.events FOR SELECT USING (TRUE);
-- JSC Zones
CREATE POLICY "Allow public read access to jsc_zones" ON public.jsc_zones FOR SELECT USING (TRUE);
-- Ministries
CREATE POLICY "Allow public read access to ministries" ON public.ministries FOR SELECT USING (TRUE);
-- Blog Posts
CREATE POLICY "Allow public read access to blog_posts" ON public.blog_posts FOR SELECT USING (TRUE);
-- Settings
CREATE POLICY "Allow public read access to settings" ON public.settings FOR SELECT USING (TRUE);

-- RLS Policies for authenticated users (admin panel)
-- Sermons
CREATE POLICY "Allow authenticated users to manage sermons" ON public.sermons
  FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
-- Events
CREATE POLICY "Allow authenticated users to manage events" ON public.events
  FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
-- JSC Zones
CREATE POLICY "Allow authenticated users to manage jsc_zones" ON public.jsc_zones
  FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
-- Ministries
CREATE POLICY "Allow authenticated users to manage ministries" ON public.ministries
  FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
-- Contact Messages (authenticated can read/delete, public can insert)
CREATE POLICY "Allow authenticated users to read and delete contact_messages" ON public.contact_messages
  FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to delete contact_messages" ON public.contact_messages
  FOR DELETE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow public insert access to contact_messages" ON public.contact_messages
  FOR INSERT WITH CHECK (TRUE);
-- Prayer Requests (authenticated can read/delete, public can insert)
CREATE POLICY "Allow authenticated users to read and delete prayer_requests" ON public.prayer_requests
  FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to delete prayer_requests" ON public.prayer_requests
  FOR DELETE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow public insert access to prayer_requests" ON public.prayer_requests
  FOR INSERT WITH CHECK (TRUE);
-- Blog Posts
CREATE POLICY "Allow authenticated users to manage blog_posts" ON public.blog_posts
  FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
-- Settings
CREATE POLICY "Allow authenticated users to manage settings" ON public.settings
  FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
