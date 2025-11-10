-- Add user_id column to events table for anonymous user tracking
-- Run this SQL in your Supabase SQL Editor

-- Add the user_id column (TEXT to store UUID as string)
ALTER TABLE events ADD COLUMN IF NOT EXISTS user_id TEXT;

-- Create an index on user_id for faster queries by user
CREATE INDEX IF NOT EXISTS events_user_id_idx ON events(user_id);

-- Now you can query events by user:
-- SELECT * FROM events WHERE user_id = 'some-uuid' ORDER BY timestamp DESC;

-- Or count unique users:
-- SELECT COUNT(DISTINCT user_id) as unique_users FROM events;

