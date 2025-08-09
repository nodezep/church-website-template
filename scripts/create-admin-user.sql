-- Create an admin user for the authentication system
-- This should be run after setting up Supabase Auth

-- First, you'll need to create a user through Supabase Auth UI or API
-- Then run this to set up the admin role

-- Create a profiles table to extend user information
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  role TEXT DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policy for profiles
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Function to handle new user creation
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Update existing policies to check for admin role
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update policies for admin access
DROP POLICY IF EXISTS "Authenticated users can manage sermons" ON sermons;
CREATE POLICY "Admin users can manage sermons" ON sermons 
  FOR ALL USING (is_admin());

DROP POLICY IF EXISTS "Authenticated users can manage events" ON events;
CREATE POLICY "Admin users can manage events" ON events 
  FOR ALL USING (is_admin());

DROP POLICY IF EXISTS "Authenticated users can manage jsc_zones" ON jsc_zones;
CREATE POLICY "Admin users can manage jsc_zones" ON jsc_zones 
  FOR ALL USING (is_admin());

DROP POLICY IF EXISTS "Authenticated users can manage contact_messages" ON contact_messages;
CREATE POLICY "Admin users can manage contact_messages" ON contact_messages 
  FOR ALL USING (is_admin());

DROP POLICY IF EXISTS "Authenticated users can manage ministries" ON ministries;
CREATE POLICY "Admin users can manage ministries" ON ministries 
  FOR ALL USING (is_admin());

DROP POLICY IF EXISTS "Authenticated users can manage blog_posts" ON blog_posts;
CREATE POLICY "Admin users can manage blog_posts" ON blog_posts 
  FOR ALL USING (is_admin());

DROP POLICY IF EXISTS "Authenticated users can manage prayer_requests" ON prayer_requests;
CREATE POLICY "Admin users can manage prayer_requests" ON prayer_requests 
  FOR ALL USING (is_admin());

-- After running this script, you'll need to manually update a user's role to 'admin'
-- UPDATE profiles SET role = 'admin' WHERE email = 'admin@jsc.com';
