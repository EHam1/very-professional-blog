// Client-side tracking utility

export interface TrackEventData {
  experiment?: string;
  variant?: string;
  [key: string]: any;
}

// Generate or retrieve anonymous user ID
function getAnonymousUserId(): string {
  if (typeof window === 'undefined') return '';
  
  const storageKey = 'anonymous_user_id';
  let userId = localStorage.getItem(storageKey);
  
  if (!userId) {
    // Generate a new anonymous user ID
    userId = crypto.randomUUID();
    localStorage.setItem(storageKey, userId);
  }
  
  return userId;
}

export async function trackEvent(
  eventName: string,
  data?: TrackEventData
): Promise<void> {
  try {
    const eventData = {
      event: eventName,
      name: data?.experiment || data?.name || undefined,
      timestamp: new Date().toISOString(),
      variant: data?.variant || undefined,
      page: typeof window !== 'undefined' ? window.location.pathname : undefined,
      user_id: getAnonymousUserId(),
      metadata: data || {},
    };

    // Send to API endpoint
    await fetch('/api/log', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData),
    });

    // Also log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('📊 Tracked event:', eventData);
    }
  } catch (error) {
    console.error('Failed to track event:', error);
  }
}

// Track page views automatically
export function usePageTracking() {
  if (typeof window !== 'undefined') {
    trackEvent('page-view');
  }
}

