import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Type definition for analytics events
export interface AnalyticsEvent {
  id?: string;
  event: string;
  name?: string;
  timestamp: string;
  variant?: string;
  page?: string;
  metadata?: Record<string, any>;
}

