'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  createClient,
  isSupabaseConfigured,
} from '@/lib/supabase/client';

export type Theme = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'chess-theme';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  setTheme: () => {},
});

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  const meta = document.querySelector<HTMLMetaElement>('meta[name="color-scheme"]');
  if (meta) {
    meta.content = theme;
  }
}

function isTheme(value: string | null): value is Theme {
  return value === 'light' || value === 'dark';
}

interface ThemeProviderProps {
  initialTheme: Theme;
  isAuthenticated: boolean;
  children: React.ReactNode;
}

export function ThemeProvider({
  initialTheme,
  isAuthenticated,
  children,
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(initialTheme);

  useEffect(() => {
    setThemeState(initialTheme);
    applyTheme(initialTheme);
  }, [initialTheme]);

  // Guests keep their choice in this browser only.
  useEffect(() => {
    if (isAuthenticated) return;
    try {
      const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
      if (isTheme(saved) && saved !== initialTheme) {
        setThemeState(saved);
        applyTheme(saved);
      }
    } catch {
      // Storage may be unavailable (private mode); the default stays light.
    }

    function handleStorage(event: StorageEvent) {
      if (event.key !== THEME_STORAGE_KEY || !isTheme(event.newValue)) return;
      setThemeState(event.newValue);
      applyTheme(event.newValue);
    }

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [initialTheme, isAuthenticated]);

  const setTheme = useCallback(
    (next: Theme) => {
      setThemeState(next);
      applyTheme(next);

      try {
        window.localStorage.setItem(THEME_STORAGE_KEY, next);
      } catch {
        // Ignore storage failures.
      }

      if (isAuthenticated && isSupabaseConfigured()) {
        void (async () => {
          try {
            const supabase = createClient();
            const {
              data: { session },
            } = await supabase.auth.getSession();
            if (!session?.user) return;
            await supabase
              .from('profiles')
              .update({ theme: next })
              .eq('id', session.user.id);
          } catch {
            // Ignore sync failures; the local choice still applies.
          }
        })();
      }
    },
    [isAuthenticated]
  );

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
