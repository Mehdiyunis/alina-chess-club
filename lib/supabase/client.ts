import { createBrowserClient } from '@supabase/ssr';
import { getSupabaseConfig } from './config';

export function isSupabaseConfigured(): boolean {
  return getSupabaseConfig().isConfigured;
}

export function createClient() {
  const { url, anonKey, isConfigured } = getSupabaseConfig();

  if (!isConfigured) {
    throw new Error(
      'Supabase konfiqurasiyası tapılmadı. Zəhmət olmasa NEXT_PUBLIC_SUPABASE_URL və NEXT_PUBLIC_SUPABASE_ANON_KEY mühit dəyişənlərini təyin edin.'
    );
  }

  return createBrowserClient(url, anonKey);
}

export const getSupabaseClient = createClient;
