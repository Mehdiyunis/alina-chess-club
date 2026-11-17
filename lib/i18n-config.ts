import az from '@/messages/az.json';
import en from '@/messages/en.json';
import ru from '@/messages/ru.json';

export type Locale = 'az' | 'en' | 'ru';

export const LOCALES: Locale[] = ['az', 'en', 'ru'];
export const DEFAULT_LOCALE: Locale = 'az';

export const LOCALE_LABELS: Record<Locale, string> = {
  az: 'Azərbaycan',
  en: 'English',
  ru: 'Русский',
};

export const dictionaries = {
  az,
  en,
  ru,
};

export type Dictionary = typeof az;

export function isValidLocale(val: unknown): val is Locale {
  return typeof val === 'string' && (val === 'az' || val === 'en' || val === 'ru');
}

/**
 * Utility to look up a dot-separated translation key with optional string interpolation.
 */
export function getTranslation(
  dict: Dictionary,
  key: string,
  params?: Record<string, string | number>
): string {
  if (!key) return '';

  const parts = key.split('.');
  let current: any = dict;

  for (const part of parts) {
    if (current && typeof current === 'object' && part in current) {
      current = current[part];
    } else {
      // Fallback to az dictionary if missing in current
      let fallbackCurrent: any = dictionaries.az;
      for (const fbPart of parts) {
        if (fallbackCurrent && typeof fallbackCurrent === 'object' && fbPart in fallbackCurrent) {
          fallbackCurrent = fallbackCurrent[fbPart];
        } else {
          fallbackCurrent = undefined;
          break;
        }
      }
      current = fallbackCurrent !== undefined ? fallbackCurrent : key;
      break;
    }
  }

  if (typeof current !== 'string') {
    return key;
  }

  if (!params) {
    return current;
  }

  return Object.entries(params).reduce(
    (acc, [pKey, pVal]) => acc.replace(new RegExp(`\\{${pKey}\\}`, 'g'), String(pVal)),
    current
  );
}
