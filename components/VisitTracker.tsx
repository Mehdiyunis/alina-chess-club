'use client';

import { useEffect } from 'react';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';

export function VisitTracker() {
  useEffect(() => {
    try {
      if (typeof window === 'undefined') return;

      const hostname = window.location.hostname;
      const isLocal = hostname === 'localhost' || hostname === '127.0.0.1';
      const trackLocal = process.env.NEXT_PUBLIC_TRACK_LOCALHOST === 'true';

      if (isLocal && !trackLocal) {
        return;
      }

      if (sessionStorage.getItem('visit_logged')) {
        return;
      }

      if (!isSupabaseConfigured()) {
        return;
      }

      const recordVisit = async () => {
        try {
          const supabase = createClient();
          const { error } = await supabase
            .from('page_visits')
            .insert({ path: window.location.pathname });

          if (!error) {
            sessionStorage.setItem('visit_logged', '1');
          }
        } catch {
          // Fail silently
        }
      };

      recordVisit();
    } catch {
      // Fail silently
    }
  }, []);

  return null;
}
