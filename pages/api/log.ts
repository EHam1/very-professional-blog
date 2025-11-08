import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { event, name, timestamp, variant, page, metadata } = req.body;

    // Validate required fields
    if (!event || !timestamp) {
      return res.status(400).json({ error: 'Missing required fields: event, timestamp' });
    }

    // Check if Supabase is configured
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.log('📊 Event tracked (Supabase not configured):', { event, name, variant, page });
      return res.status(200).json({ success: true, message: 'Event logged locally (Supabase not configured)' });
    }

    // Insert event into Supabase
    const { data, error } = await supabase
      .from('events')
      .insert([
        {
          event,
          name: name || null,
          timestamp,
          variant: variant || null,
          page: page || null,
          metadata: metadata || null,
        },
      ])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ error: 'Failed to log event', details: error.message });
    }

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Error logging event:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

