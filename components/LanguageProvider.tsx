'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Locale, Dictionary, DEFAULT_LOCALE, dictionaries, getTranslation, isValidLocale } from '@/lib/i18n-config';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';

interface LanguageContextType {
  locale: Locale;
  dict: Dictionary;
  setLocale: (newLocale: Locale) => Promise<void>;
  t: (key: string, params?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  locale: DEFAULT_LOCALE,
  dict: dictionaries.az,
  setLocale: async () => {},
  t: (key: string) => key,
});

interface LanguageProviderProps {
  initialLocale: Locale;
  initialDictionary: Dictionary;
  children: React.ReactNode;
}

export function LanguageProvider({
  initialLocale,
  initialDictionary,
  children,
}: LanguageProviderProps) {
  const router = useRouter();
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const [dict, setDict] = useState<Dictionary>(initialDictionary);

  // Keep state in sync if server component re-renders with a different initialLocale
  useEffect(() => {
    setLocaleState(initialLocale);
    setDict(initialDictionary);
  }, [initialLocale, initialDictionary]);

  const setLocale = useCallback(
    async (newLocale: Locale) => {
      if (!isValidLocale(newLocale)) return;

      // 1. Set the cookie
      document.cookie = `lang=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;

      // 2. Optimistically update local state
      setLocaleState(newLocale);
      setDict(dictionaries[newLocale]);

      // 3. If signed-in, persist to profiles.language
      if (isSupabaseConfigured()) {
        try {
          const supabase = createClient();
          const {
            data: { session },
          } = await supabase.auth.getSession();
          if (session?.user) {
            await supabase
              .from('profiles')
              .update({ language: newLocale })
              .eq('id', session.user.id);
          }
        } catch {
          // Ignore errors silently as per user instructions
        }
      }

      // 4. Trigger server re-render with the new cookie
      router.refresh();
    },
    [router]
  );

  const t = useCallback(
    (key: string, params?: Record<string, string | number>) => {
      return getTranslation(dict, key, params);
    },
    [dict]
  );

  return (
    <LanguageContext.Provider value={{ locale, dict, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

