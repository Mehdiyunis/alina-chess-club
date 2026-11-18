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
import { UserProfile } from '@/lib/types';

interface AuthContextType {
  user: UserProfile | null;
  refresh: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  refresh: async () => {},
});

interface AuthProviderProps {
  initialUser: UserProfile | null;
  children: React.ReactNode;
}

export function AuthProvider({ initialUser, children }: AuthProviderProps) {
  // The server already resolved the session, so the first render is correct.
  const [user, setUser] = useState<UserProfile | null>(initialUser);

  const refresh = useCallback(async () => {
    if (!isSupabaseConfigured()) {
      setUser(null);
      return;
    }

    try {
      const supabase = createClient();
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) {
        setUser(null);
        return;
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', session.user.id)
        .maybeSingle();

      setUser({
        id: session.user.id,
        full_name:
          profile?.full_name ||
          session.user.user_metadata?.full_name ||
          session.user.email?.split('@')[0] ||
          '',
        created_at: session.user.created_at,
        email: session.user.email,
        phone: session.user.phone,
      });
    } catch {
      // Keep the last known state; navigation must not flicker.
    }
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured()) return;
    const supabase = createClient();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session?.user) {
        setUser(null);
        return;
      }

      void (async () => {
        try {
          const { data: profile } = await supabase
            .from('profiles')
            .select('full_name')
            .eq('id', session.user.id)
            .maybeSingle();

          setUser({
            id: session.user.id,
            full_name:
              profile?.full_name ||
              session.user.user_metadata?.full_name ||
              session.user.email?.split('@')[0] ||
              '',
            created_at: session.user.created_at,
            email: session.user.email,
            phone: session.user.phone,
          });
        } catch {
          // Keep the last known state.
        }
      })();
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, refresh }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
