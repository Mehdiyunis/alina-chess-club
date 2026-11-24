/**
 * Supabase configuration helpers.
 * Reads NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY from environment.
 * Ensures the project URL is normalized (stripping /rest/v1 or trailing slashes)
 * so OAuth and Auth endpoints point directly to /auth/v1/authorize.
 */

export function normalizeSupabaseUrl(rawUrl?: string): string {
  if (!rawUrl) return '';
  let url = rawUrl.trim();
  url = url.replace(/\/+$/, '');
  url = url.replace(/\/rest\/v1\/?$/, '');
  url = url.replace(/\/auth\/v1\/?$/, '');
  return url;
}

/**
 * Canonical public URL for Supabase email/OAuth redirects.
 * Set NEXT_PUBLIC_SITE_URL in production so reset links never point at localhost.
 */
export function getSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configured) return configured.replace(/\/+$/, '');
  return typeof window !== 'undefined' ? window.location.origin : '';
}

export function getSupabaseConfig(): {
  url: string;
  anonKey: string;
  isConfigured: boolean;
} {
  const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const rawKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

  const url = normalizeSupabaseUrl(rawUrl);
  const anonKey = rawKey.trim();

  const isConfigured = Boolean(
    url &&
    anonKey &&
    !url.includes('your-project') &&
    !anonKey.includes('your-anon-key')
  );

  return { url, anonKey, isConfigured };
}
