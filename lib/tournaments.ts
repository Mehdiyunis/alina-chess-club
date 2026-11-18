import type { Locale } from '@/lib/i18n-config';

export type TournamentStatus = 'registration' | 'upcoming' | 'started' | 'finished';
export type AgeCategory = 'U8' | 'U10' | 'U12' | 'U14' | 'U16' | 'U18' | 'ADULT';
export type Grade = 'I' | 'II' | 'III' | 'IV' | 'V' | 'UNRATED';
export type MatchResult = 'white' | 'black' | 'draw';

export const AGE_CATEGORIES: AgeCategory[] = [
  'U8',
  'U10',
  'U12',
  'U14',
  'U16',
  'U18',
  'ADULT',
];

export const GRADES: Grade[] = ['I', 'II', 'III', 'IV', 'V', 'UNRATED'];

export interface Tournament {
  id: string;
  title_az: string;
  title_en: string | null;
  title_ru: string | null;
  description_az: string | null;
  description_en: string | null;
  description_ru: string | null;
  cover_url: string | null;
  starts_at: string;
  ends_at: string;
  round_count: number;
  status: TournamentStatus;
  is_published: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface TournamentDay {
  id: string;
  tournament_id: string;
  starts_at: string;
  ends_at: string;
  note_az: string | null;
  note_en: string | null;
  note_ru: string | null;
  sort_order: number;
}

export interface TournamentPlayer {
  id: string;
  tournament_id: string;
  profile_id: string | null;
  full_name: string;
  age_category: AgeCategory;
  grade: Grade;
  created_at?: string;
}

export interface TournamentRound {
  id: string;
  tournament_id: string;
  round_number: number;
  is_manual: boolean;
  generated_at?: string;
}

export interface TournamentMatch {
  id: string;
  tournament_id: string;
  round_id: string;
  round_number: number;
  board_number: number;
  age_category: AgeCategory;
  grade: Grade;
  white_player_id: string | null;
  black_player_id: string | null;
  result: MatchResult | null;
  is_bye: boolean;
  updated_at?: string;
}

/** Seçilmiş dil üçün mətni qaytarır. Boşdursa Azərbaycan mətninə düşür. */
export function localizedTournamentText(
  values: { az: string | null; en: string | null; ru: string | null },
  locale: Locale
): string {
  const selected = values[locale]?.trim();
  if (selected) return selected;
  return values.az?.trim() || '';
}

/** Yeniliklərlə eyni sabit format: MM.DD.YYYY HH:mm */
export function formatTournamentDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';
    const pad = (value: number) => String(value).padStart(2, '0');
    return `${pad(date.getMonth() + 1)}.${pad(date.getDate())}.${date.getFullYear()} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
  } catch {
    return '';
  }
}

/** Eyni gün olduqda saat aralığı, əks halda tam iki tarix qaytarır. */
export function formatTournamentRange(startsAt: string, endsAt: string): string {
  const start = new Date(startsAt);
  const end = new Date(endsAt);
  if (isNaN(start.getTime()) || isNaN(end.getTime())) return '';
  const pad = (value: number) => String(value).padStart(2, '0');
  const date = (d: Date) => `${pad(d.getMonth() + 1)}.${pad(d.getDate())}.${d.getFullYear()}`;
  const time = (d: Date) => `${pad(d.getHours())}:${pad(d.getMinutes())}`;
  const sameDay =
    start.getFullYear() === end.getFullYear() &&
    start.getMonth() === end.getMonth() &&
    start.getDate() === end.getDate();
  return sameDay
    ? `${date(start)} ${time(start)} – ${time(end)}`
    : `${date(start)} ${time(start)} – ${date(end)} ${time(end)}`;
}

export function resultLabel(result: MatchResult | null): string {
  if (result === 'white') return '1–0';
  if (result === 'black') return '0–1';
  if (result === 'draw') return '½–½';
  return '—';
}
