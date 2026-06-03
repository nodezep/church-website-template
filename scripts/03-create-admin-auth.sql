-- This script sets up authentication for the admin panel
-- Note: You'll need to create users through the Supabase Auth interface

-- Create a function to handle updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at columns
CREATE TRIGGER update_sermons_updated_at BEFORE UPDATE ON sermons FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_jsc_zones_updated_at BEFORE UPDATE ON jsc_zones FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_ministries_updated_at BEFORE UPDATE ON ministries FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_church_settings_updated_at BEFORE UPDATE ON church_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Instructions for creating admin user:
-- 1. Go to your Supabase dashboard
-- 2. Navigate to Authentication > Users
-- 3. Click "Add user"
-- 4. Enter email: admin@jsc.org
-- 5. Enter password: admin123
-- 6. Click "Add user"
-- 7. The user will be able to log in to the admin panel

-- Supabase handles user authentication in the `auth.users` table.
-- You will create an admin user directly in the Supabase Dashboard.
-- The RLS policies in 01-create-database-tables.sql already grant
-- 'authenticated' role users full access to content management tables.
