'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';
import { isValidLocale, DEFAULT_LOCALE, Locale } from '@/lib/i18n-config';

function getCookieLang(): Locale {
  if (typeof document === 'undefined') return DEFAULT_LOCALE;
  const match = document.cookie.match(/(?:^|;\s*)lang=([^;]+)/);
  if (match && isValidLocale(match[1])) {
    return match[1];
  }
  return DEFAULT_LOCALE;
}

export function LanguageSync() {
  const router = useRouter();
  const hasCheckedRef = useRef(false);

  useEffect(() => {
    if (!isSupabaseConfigured()) return;
    if (hasCheckedRef.current) return;

    async function syncLanguage() {
      try {
        const supabase = createClient();
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session?.user) {
          return;
        }

        const userId = session.user.id;
        const sessionKey = `lang_synced_user_${userId}`;
        if (typeof sessionStorage !== 'undefined' && sessionStorage.getItem(sessionKey)) {
          // Already synced in this browser session
          return;
        }

        hasCheckedRef.current = true;

        const { data: profile, error } = await supabase
          .from('profiles')
          .select('language')
          .eq('id', userId)
          .single();

        if (error) {
          return;
        }

        const currentCookieLang = getCookieLang();

        if (!profile?.language) {
          // profiles.language is null: save current cookie language to the profile
          await supabase
            .from('profiles')
            .update({ language: currentCookieLang })
            .eq('id', userId);
          if (typeof sessionStorage !== 'undefined') {
            sessionStorage.setItem(sessionKey, '1');
          }
        } else if (isValidLocale(profile.language)) {
          if (typeof sessionStorage !== 'undefined') {
            sessionStorage.setItem(sessionKey, '1');
          }
          if (profile.language !== currentCookieLang) {
            // Profile has an active choice different from cookie: set cookie and refresh
            document.cookie = `lang=${profile.language}; path=/; max-age=31536000; SameSite=Lax`;
            router.refresh();
          }
        }
      } catch (err) {
        // Fail silently
        console.warn('LanguageSync error:', err);
      }
    }

    syncLanguage();
  }, [router]);

  return null;
}
