-- Create the events table for analytics tracking
-- Run this SQL in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event TEXT NOT NULL,
  name TEXT,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  variant TEXT,
  page TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create an index on timestamp for faster queries
CREATE INDEX IF NOT EXISTS events_timestamp_idx ON events(timestamp DESC);

-- Create an index on event type for filtering
CREATE INDEX IF NOT EXISTS events_event_idx ON events(event);

-- Create an index on page for filtering by page
CREATE INDEX IF NOT EXISTS events_page_idx ON events(page);

-- Enable Row Level Security (RLS)
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows anyone to insert events (for tracking)
CREATE POLICY "Allow public insert" ON events
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Create a policy that allows authenticated users to read all events
CREATE POLICY "Allow authenticated read" ON events
  FOR SELECT
  TO authenticated
  USING (true);

