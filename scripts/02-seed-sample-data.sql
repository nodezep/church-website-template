-- Insert sample sermons
INSERT INTO sermons (title, speaker, date, duration, series, description, featured) VALUES
('The Power of Faith', 'Pastor John Smith', '2024-01-07', '45 minutes', 'Faith Series', 'Exploring how faith can transform our daily lives and strengthen our relationship with God.', true),
('Walking in Love', 'Pastor Sarah Johnson', '2024-01-14', '38 minutes', 'Love Series', 'Understanding the depth of God''s love and how we can share it with others.', false),
('Hope in Difficult Times', 'Pastor John Smith', '2024-01-21', '42 minutes', 'Hope Series', 'Finding hope and strength when facing life''s challenges through God''s promises.', false),
('The Joy of Salvation', 'Pastor Mary Williams', '2024-01-28', '40 minutes', 'Joy Series', 'Celebrating the joy that comes from knowing Christ and sharing it with the world.', false);

-- Seed Sermons
INSERT INTO public.sermons (title, preacher, date, description, audio_url, video_url, thumbnail_url)
VALUES
('The Power of Faith', 'Pastor John Doe', '2025-07-28 10:00:00+00', 'A powerful message on how faith can move mountains and transform lives. Learn to trust in God''s unwavering promises.', 'https://example.com/audio/sermon1.mp3', 'https://www.youtube.com/watch?v=sermon1', '/placeholder.svg?height=400&width=600'),
('Living a Purpose-Driven Life', 'Rev. Jane Smith', '2025-07-21 10:00:00+00', 'Discover God''s unique plan for your life and how to walk in His divine purpose every day.', 'https://example.com/audio/sermon2.mp3', 'https://www.youtube.com/watch?v=sermon2', '/placeholder.svg?height=400&width=600'),
('Overcoming Adversity', 'Bishop David Lee', '2025-07-14 10:00:00+00', 'Find strength and hope in times of trial. This sermon provides biblical principles for navigating life''s challenges.', 'https://example.com/audio/sermon3.mp3', 'https://www.youtube.com/watch?v=sermon3', '/placeholder.svg?height=400&width=600');

-- Insert sample events
INSERT INTO events (title, date, time, location, category, description, featured) VALUES
('Sunday Worship Service', '2024-02-04', '10:00:00', 'Main Sanctuary', 'Worship', 'Join us for our weekly worship service with inspiring music and powerful preaching.', true),
('Youth Bible Study', '2024-02-06', '19:00:00', 'Youth Hall', 'Youth', 'Interactive Bible study designed for teenagers and young adults.', false),
('Community Outreach', '2024-02-10', '09:00:00', 'Community Center', 'Outreach', 'Serving our local community with food distribution and prayer.', true),
('Women''s Prayer Meeting', '2024-02-12', '18:30:00', 'Prayer Room', 'Prayer', 'Weekly prayer meeting for women of all ages.', false),
('Men''s Breakfast', '2024-02-17', '08:00:00', 'Fellowship Hall', 'Fellowship', 'Monthly breakfast and fellowship for men.', false);

-- Seed Events
INSERT INTO public.events (title, date, time, location, description, image_url, category)
VALUES
('Annual Youth Conference', '2025-08-15', '09:00 AM', 'Church Main Hall', 'Empowering the next generation with faith and purpose. Join us for inspiring speakers, workshops, and fellowship.', '/placeholder.svg?height=300&width=500', 'Youth'),
('Community Outreach Day', '2025-09-01', '10:00 AM', 'Local Park', 'Serving our community with love and compassion. We''ll be distributing food, clothes, and offering free health checks.', '/placeholder.svg?height=300&width=500', 'Community'),
('Women''s Fellowship Brunch', '2025-09-20', '11:00 AM', 'Church Annex Building', 'A time of sisterhood, encouragement, and spiritual growth. Enjoy delicious food and uplifting conversations.', '/placeholder.svg?height=300&width=500', 'Fellowship');

-- Insert sample JSC zones
INSERT INTO jsc_zones (name, description, day, time, location, leader, focus) VALUES
('Victory Zone', 'A life group focused on overcoming challenges through faith and community support.', 'Wednesday', '19:00:00', 'Room A', 'Michael Johnson', 'Overcoming Life Challenges'),
('Grace Zone', 'Exploring God''s grace and mercy in our daily lives through Bible study and prayer.', 'Thursday', '18:30:00', 'Room B', 'Sarah Davis', 'Understanding Grace'),
('Hope Zone', 'A supportive community for those seeking hope and encouragement in difficult times.', 'Friday', '19:30:00', 'Room C', 'David Wilson', 'Finding Hope'),
('Love Zone', 'Learning to love God and others more deeply through fellowship and service.', 'Tuesday', '19:00:00', 'Room D', 'Lisa Brown', 'Growing in Love');

-- Seed JSC Zones (Life Groups)
INSERT INTO public.jsc_zones (name, leader, description, meeting_day, meeting_time, contact_email, image_url)
VALUES
('Zone of Grace', 'Sarah Johnson', 'A small group focused on spiritual growth and mutual support through prayer and Bible study.', 'Tuesday', '7:00 PM', 'gracezone@jsc.org', '/placeholder.svg?height=300&width=500'),
('Zone of Hope', 'Michael Brown', 'Dedicated to outreach and community service, bringing hope to those in need.', 'Thursday', '6:30 PM', 'hopezone@jsc.org', '/placeholder.svg?height=300&width=500'),
('Zone of Wisdom', 'Dr. Emily White', 'Exploring deeper theological concepts and engaging in intellectual discussions about faith.', 'Wednesday', '8:00 PM', 'wisdomzone@jsc.org', '/placeholder.svg?height=300&width=500');

-- Insert sample ministries
INSERT INTO ministries (title, description, features, icon) VALUES
('Children''s Ministry', 'Nurturing young hearts and minds with age-appropriate Bible lessons, games, and activities.', ARRAY['Sunday School Classes', 'Vacation Bible School', 'Children''s Choir', 'Special Events'], 'Baby'),
('Youth Ministry', 'Empowering teenagers to grow in faith through dynamic programs and mentorship.', ARRAY['Youth Group Meetings', 'Summer Camps', 'Mission Trips', 'Leadership Training'], 'Users'),
('Worship Ministry', 'Leading the congregation in heartfelt worship through music and creative arts.', ARRAY['Choir', 'Praise Band', 'Technical Team', 'Creative Arts'], 'Music'),
('Outreach Ministry', 'Serving our community and sharing God''s love through various outreach programs.', ARRAY['Food Bank', 'Community Events', 'Prison Ministry', 'Hospital Visits'], 'Heart');

-- Seed Ministries
INSERT INTO public.ministries (name, description, leader, image_url)
VALUES
('Worship Ministry', 'Leading the congregation in heartfelt praise and worship, creating an atmosphere for divine encounter.', 'David Green', '/placeholder.svg?height=300&width=500'),
('Children''s Ministry', 'Nurturing young hearts and minds with biblical truths in a fun and engaging environment.', 'Jessica Adams', '/placeholder.svg?height=300&width=500'),
('Usher & Greeter Ministry', 'Ensuring a welcoming and orderly environment for all attendees, assisting with seating and information.', 'Robert Davis', '/placeholder.svg?height=300&width=500');

-- Insert sample church settings
INSERT INTO church_settings (setting_key, setting_value) VALUES
('church_name', 'Jerusalem Spiritual Centre'),
('church_address', '123 Faith Street, Hope City, HC 12345'),
('church_phone', '(555) 123-4567'),
('church_email', 'info@jsc.org'),
('service_times', 'Sunday: 8:00 AM, 10:30 AM, 6:00 PM'),
('pastor_name', 'Pastor John Smith'),
('mission_statement', 'To know Christ and make Him known in our community and beyond.');

-- Seed Settings
INSERT INTO public.settings (setting_key, setting_value, description)
VALUES
('church_info', '{
  "name": "Jerusalem Spiritual Centre",
  "address": "123 Divine Grace Avenue, Faith City, FC 12345, United Kingdom",
  "phone": "+44 20 1234 5678",
  "email": "info@jsc.org"
}', 'General church contact and address information'),
('service_schedule', '{
  "sunday_worship": "10:00 AM - 12:00 PM",
  "wednesday_bible_study": "7:00 PM - 8:30 PM",
  "friday_prayer_meeting": "7:00 PM - 8:00 PM"
}', 'Weekly service times'),
('social_media_links', '{
  "facebook": "https://facebook.com/jscchurch",
  "twitter": "https://twitter.com/jscchurch",
  "instagram": "https://instagram.com/jscchurch",
  "youtube": "https://youtube.com/jscchurch"
}', 'Links to church social media profiles'),
('seo_settings', '{
  "meta_title_suffix": " - Jerusalem Spiritual Centre",
  "meta_description_default": "Official website of Jerusalem Spiritual Centre. Join us for worship, spiritual growth, and community outreach.",
  "keywords": ["church", "spiritual", "centre", "worship", "faith", "community", "london"]
}', 'Search Engine Optimization settings');

-- Insert sample blog posts
INSERT INTO blog_posts (title, slug, content, excerpt, author, published) VALUES
('Welcome to Our New Website', 'welcome-to-our-new-website', 'We are excited to launch our new church website! This platform will help us stay connected and share God''s love with our community.', 'Introducing our new church website and digital ministry platform.', 'Pastor John Smith', true),
('The Importance of Community', 'importance-of-community', 'Community is at the heart of our faith. Learn how being part of a church family can strengthen your spiritual journey.', 'Discover the power of Christian community and fellowship.', 'Pastor Sarah Johnson', true);
