-- Update home_content table to support all kids sections
-- Run this in Supabase SQL editor

-- First, let's update the component_type enum to include all kids sections
-- Note: This might require dropping and recreating the table if the enum constraint is strict

-- Add new component types for kids sections
-- We'll use a more flexible approach by allowing any text in component_type

-- Update the home_content table to be more flexible
ALTER TABLE public.home_content 
ALTER COLUMN component_type TYPE text;

-- Add unique constraint on component_type for ON CONFLICT to work
ALTER TABLE public.home_content 
ADD CONSTRAINT home_content_component_type_key UNIQUE (component_type);

-- Create an index for better performance
CREATE INDEX IF NOT EXISTS idx_home_content_component_type ON public.home_content(component_type);

-- Insert default content for all kids sections if they don't exist
INSERT INTO public.home_content (component_type, content, is_active) VALUES
('kids_transport', '{
  "description": "We provide safe and reliable transportation to ensure every child can join us for church activities",
  "sunday_pickup": "8:30 AM",
  "sunday_dropoff": "12:00 PM", 
  "wednesday_time": "6:00 PM",
  "features": ["Safe & Secure", "On Time", "Wide Coverage"]
}', true)
ON CONFLICT (component_type) DO NOTHING;

INSERT INTO public.home_content (component_type, content, is_active) VALUES
('kids_transport_cta', '{
  "title": "Need Transport?",
  "description": "Contact us to arrange transportation for your child. We''re here to help make church accessible for your family.",
  "primaryText": "Request Transport",
  "primaryLink": "/contact",
  "secondaryText": "View Routes",
  "secondaryLink": "/kids#routes"
}', true)
ON CONFLICT (component_type) DO NOTHING;

-- ... (all the other INSERT statements remain the same)

-- Update kids_gallery table to support all sections
ALTER TABLE public.kids_gallery 
DROP CONSTRAINT IF EXISTS kids_gallery_section_check;

ALTER TABLE public.kids_gallery 
ADD CONSTRAINT kids_gallery_section_check 
CHECK (section IN ('transport','sunday_devotion','saturday_devotion','discipleship_prayer','praise_worship','kids_preaching','fun_games_sports','fun_tours_adventures'));

-- Insert some default gallery items
INSERT INTO public.kids_gallery (section, image_url, caption, order_index) VALUES
('transport', '/placeholder.jpg', 'Transport Service', 0),
('transport', '/placeholder.jpg', 'Safe Vehicles', 1),
('transport', '/placeholder.jpg', 'Reliable Drivers', 2),
('transport', '/placeholder.jpg', 'Wide Coverage', 3),
('sunday_devotion', '/placeholder.jpg', 'Sunday Devotion', 0),
('sunday_devotion', '/placeholder.jpg', 'Bible Stories', 1),
('sunday_devotion', '/placeholder.jpg', 'Prayer Time', 2),
('saturday_devotion', '/placeholder.jpg', 'Saturday Devotion', 0),
('discipleship_prayer', '/placeholder.jpg', 'Prayer Circle', 0),
('discipleship_prayer', '/placeholder.jpg', 'Bible Study', 1),
('discipleship_prayer', '/placeholder.jpg', 'Mentorship', 2),
('praise_worship', '/placeholder.jpg', 'Kids Choir', 0),
('praise_worship', '/placeholder.jpg', 'Praise Team', 1),
('praise_worship', '/placeholder.jpg', 'Dance Ministry', 2),
('kids_preaching', '/placeholder.jpg', 'Kids Preaching', 0),
('kids_preaching', '/placeholder.jpg', 'Practice Session', 1),
('fun_games_sports', '/placeholder.jpg', 'Fun Games', 0),
('fun_games_sports', '/placeholder.jpg', 'Sports Activities', 1),
('fun_games_sports', '/placeholder.jpg', 'Team Building', 2),
('fun_tours_adventures', '/placeholder.jpg', 'Field Trip', 0),
('fun_tours_adventures', '/placeholder.jpg', 'Nature Walk', 1)
ON CONFLICT DO NOTHING;