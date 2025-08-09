-- Insert sample sermons
INSERT INTO sermons (title, speaker, date, duration, series, description, featured) VALUES
('Walking in Faith', 'Pastor John Smith', '2024-03-17', '35 min', 'walking-faith', 'Discover how to strengthen your faith journey and trust in God''s plan for your life.', true),
('The Power of Prayer', 'Pastor Sarah Johnson', '2024-03-10', '28 min', 'walking-faith', 'Understanding the importance of prayer in our daily walk with God.', false),
('Serving Others with Joy', 'Pastor John Smith', '2024-03-03', '32 min', 'love-action', 'How we can show God''s love through acts of service and kindness.', false),
('He is Risen', 'Pastor John Smith', '2024-03-31', '40 min', 'easter-series', 'Celebrating the resurrection of Jesus Christ and what it means for us today.', false),
('Finding Peace in Chaos', 'Guest Speaker Mike Davis', '2024-02-25', '30 min', 'psalms-study', 'Drawing from Psalm 23 to find God''s peace in difficult times.', false);

-- Insert sample events
INSERT INTO events (title, date, time, location, category, description, featured) VALUES
('Easter Celebration Service', '2024-03-31', '9:00 AM', 'Main Sanctuary', 'worship', 'Join us for a special Easter worship service celebrating the resurrection of Jesus Christ.', true),
('Community Food Drive', '2024-04-05', '10:00 AM - 2:00 PM', 'Church Parking Lot', 'outreach', 'Help us collect food donations for local families in need.', false),
('Youth Spring Retreat', '2024-04-12', 'Friday 6 PM - Sunday 4 PM', 'Camp Wildwood', 'youth', 'A weekend retreat for teens to grow in faith and build friendships.', false),
('Marriage Enrichment Workshop', '2024-04-20', '6:00 PM - 9:00 PM', 'Fellowship Hall', 'community', 'Strengthen your marriage with practical tools and biblical principles.', false),
('Mother''s Day Brunch', '2024-05-12', '10:30 AM - 12:30 PM', 'Fellowship Hall', 'special', 'Celebrating all the wonderful mothers in our church family.', false);

-- Insert sample JSC zones
INSERT INTO jsc_zones (name, description, day, time, location, leader, focus) VALUES
('Young Professionals Zone', 'A group for working adults in their 20s and 30s navigating career and faith', 'Tuesday', '7:00 PM', 'Church Conference Room', 'Mike & Sarah Davis', 'Career, Relationships, Purpose'),
('Families Zone', 'Parents supporting each other while raising children in faith', 'Thursday', '6:30 PM', 'Fellowship Hall', 'Tom & Jennifer Wilson', 'Parenting, Marriage, Family Life'),
('Senior Saints Zone', 'Mature believers sharing wisdom and growing together in faith', 'Wednesday', '10:00 AM', 'Senior Center', 'Pastor John & Mary Smith', 'Wisdom, Legacy, Spiritual Growth'),
('College & Career Zone', 'Students and young adults exploring faith during life transitions', 'Sunday', '6:00 PM', 'Youth Room', 'Pastor Sarah Johnson', 'Identity, Future, Relationships'),
('Men''s Brotherhood Zone', 'Men encouraging each other in faith, work, and relationships', 'Saturday', '7:00 AM', 'Coffee Shop Downtown', 'David Martinez', 'Leadership, Integrity, Purpose'),
('Women''s Circle Zone', 'Women supporting each other through life''s joys and challenges', 'Friday', '9:30 AM', 'Church Library', 'Lisa Thompson', 'Friendship, Growth, Encouragement');

-- Insert sample ministries
INSERT INTO ministries (title, description, features, icon) VALUES
('Adult Ministry', 'Connecting adults in meaningful relationships and spiritual growth through various programs and activities.', ARRAY['Bible Study Groups', 'Marriage Enrichment', 'Men''s & Women''s Ministry', 'Senior Adult Programs'], 'Users'),
('Youth Ministry', 'Empowering teenagers to grow in their faith while building lasting friendships and discovering their purpose.', ARRAY['Weekly Youth Meetings', 'Summer Camps', 'Mission Trips', 'Leadership Development'], 'Heart'),
('Children''s Ministry', 'Creating a safe and fun environment where children can learn about God''s love and develop a strong foundation of faith.', ARRAY['Sunday School', 'Vacation Bible School', 'Children''s Choir', 'Family Events'], 'Baby'),
('Worship Ministry', 'Leading our congregation in heartfelt worship through music, prayer, and creative arts that honor God.', ARRAY['Choir', 'Worship Band', 'Sound & Media', 'Creative Arts'], 'Music'),
('Discipleship Ministry', 'Helping believers grow deeper in their relationship with Christ through study, mentorship, and spiritual disciplines.', ARRAY['Bible Studies', 'Mentorship Programs', 'Prayer Groups', 'Spiritual Formation'], 'BookOpen'),
('Outreach Ministry', 'Reaching our community and the world with the love of Christ through service, missions, and evangelism.', ARRAY['Community Service', 'Food Pantry', 'Mission Trips', 'Evangelism Training'], 'Globe');
