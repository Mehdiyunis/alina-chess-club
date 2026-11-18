import type { Locale } from '@/lib/i18n-config';

export type NewsMediaType = 'image' | 'video';

export interface NewsItem {
  id: string;
  title_az: string;
  title_en: string | null;
  title_ru: string | null;
  body_az: string;
  body_en: string | null;
  body_ru: string | null;
  cover_url: string | null;
  is_published: boolean;
  created_at: string;
  updated_at?: string;
}

export interface NewsMedia {
  id: string;
  news_id: string;
  media_type: NewsMediaType;
  url: string;
  file_name: string | null;
  caption: string | null;
  sort_order: number;
  created_at?: string;
}

/**
 * Seçilmiş dil üçün mətni qaytarır. Həmin dil boşdursa, Azərbaycan mətninə düşür.
 */
export function localizedNewsText(
  values: { az: string | null; en: string | null; ru: string | null },
  locale: Locale
): string {
  const selected = values[locale]?.trim();
  if (selected) return selected;
  return values.az?.trim() || '';
}

/** Yeniliklərdə tarix sabit MM.DD.YYYY HH:mm formatında göstərilir. */
export function formatNewsDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';
    const pad = (value: number) => String(value).padStart(2, '0');
    return `${pad(date.getMonth() + 1)}.${pad(date.getDate())}.${date.getFullYear()} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
  } catch {
    return '';
  }
}

export function newsPreview(text: string, maxLength = 190): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= maxLength) return clean;
  return `${clean.slice(0, maxLength).trimEnd()}…`;
}
