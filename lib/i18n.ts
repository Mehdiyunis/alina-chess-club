import { cookies } from 'next/headers';
import {
  Locale,
  Dictionary,
  DEFAULT_LOCALE,
  dictionaries,
  isValidLocale,
} from './i18n-config';

export * from './i18n-config';

/**
 * Server-only helper to read the "lang" cookie with a fallback to "az".
 */
export async function getLocale(): Promise<Locale> {
  try {
    const cookieStore = await cookies();
    const lang = cookieStore.get('lang')?.value;
    if (isValidLocale(lang)) {
      return lang;
    }
  } catch {
    // If called outside of a request scope, safely fallback
  }
  return DEFAULT_LOCALE;
}

/**
 * Server-only helper to retrieve the dictionary for the requested or active locale.
 */
export async function getDictionary(locale?: Locale): Promise<Dictionary> {
  const activeLocale = locale || (await getLocale());
  return dictionaries[activeLocale] || dictionaries.az;
}
