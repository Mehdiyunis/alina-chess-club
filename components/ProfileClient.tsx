'use client';

import Link from 'next/link';
import {
  AlertCircle,
  BookOpen,
  Check,
  Download,
  LogOut,
  Moon,
  Sun,
  UserRound,
} from 'lucide-react';
import { Book } from '@/lib/siteData';
import {
  createClient,
  isSupabaseConfigured,
} from '@/lib/supabase/client';
import { useLanguage } from './LanguageProvider';
import { useTheme } from './ThemeProvider';

interface ProfileClientProps {
  user: { id: string; name: string; email: string } | null;
  books: Book[];
  error: string | null;
}

const LEVEL_KEYS: Record<Book['level'], string> = {
  beginner: 'books.filterBeginner',
  intermediate: 'books.filterIntermediate',
  advanced: 'books.filterAdvanced',
};

function getDownloadUrl(book: Book) {
  if (!book.file_url) return '#';
  const rawName = (book.file_name || book.title || 'book').trim();
  const fileName = rawName.toLowerCase().endsWith('.pdf')
    ? rawName
    : `${rawName}.pdf`;
  const separator = book.file_url.includes('?') ? '&download=' : '?download=';
  return `${book.file_url}${separator}${encodeURIComponent(fileName)}`;
}

export function ProfileClient({ user, books, error }: ProfileClientProps) {
  const { t } = useLanguage();
  const { theme, setTheme } = useTheme();
  const initial = (user?.name || 'U').charAt(0).toUpperCase();

  const handleLogout = async () => {
    if (isSupabaseConfigured()) {
      try {
        const supabase = createClient();
        await supabase.auth.signOut();
      } catch {
        // Still redirect to the public home page.
      }
    }
    window.location.href = '/';
  };

  const themeOptions = [
    {
      id: 'light' as const,
      label: t('profile.themeLight'),
      icon: Sun,
    },
    {
      id: 'dark' as const,
      label: t('profile.themeDark'),
      icon: Moon,
    },
  ];

  return (
    <div className="max-w-[900px] mx-auto space-y-6">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="w-16 h-16 rounded-full mx-auto mb-4 bg-[var(--sage-100)] border border-[var(--border)] text-[var(--primary)] flex items-center justify-center shadow-xs">
          {user ? (
            <span className="font-serif text-2xl">{initial}</span>
          ) : (
            <UserRound className="w-7 h-7" />
          )}
        </div>
        <h1 className="font-serif text-[clamp(2rem,4vw,2.75rem)] font-normal text-[var(--ink)] tracking-tight leading-[1.1]">
          {t('profile.title')}
        </h1>
        <p className="mt-2 text-[var(--ink-muted)] text-sm sm:text-base leading-relaxed">
          {user ? t('profile.subtitle') : t('profile.guestSubtitle')}
        </p>
        {!user && (
          <span className="inline-block mt-3 px-3 py-1 rounded-full text-xs font-semibold bg-[var(--sage-100)] text-[var(--primary)] border border-[var(--border)]">
            {t('profile.guestBadge')}
          </span>
        )}
      </div>

      {error && (
        <div className="p-4 rounded-[16px] bg-[var(--danger-bg)]/60 border border-[var(--danger)]/30 text-[var(--danger)] text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold">{t('profile.error')}</p>
            <p className="text-xs opacity-80">{error}</p>
          </div>
        </div>
      )}

      {/* Theme selection - available to guests and members */}
      <section className="bg-[var(--surface)] rounded-[18px] border border-[var(--border)] p-5 sm:p-6 shadow-[0_1px_2px_rgba(30,42,34,0.06)]">
        <h2 className="font-serif text-xl font-normal text-[var(--ink)]">
          {t('profile.themeTitle')}
        </h2>
        <p className="text-xs text-[var(--ink-muted)] mt-1 mb-4">
          {t('profile.themeDesc')}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {themeOptions.map((option) => {
            const Icon = option.icon;
            const active = theme === option.id;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => setTheme(option.id)}
                aria-pressed={active}
                className={`flex items-center justify-between gap-3 px-4 py-3.5 rounded-[14px] border text-sm font-semibold transition-colors cursor-pointer ${
                  active
                    ? 'bg-[var(--sage-100)] border-[var(--primary)] text-[var(--ink)]'
                    : 'bg-[var(--bg)] border-[var(--border)] text-[var(--ink-muted)] hover:border-[var(--primary)] hover:text-[var(--ink)]'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <Icon className="w-4.5 h-4.5 text-[var(--primary)]" />
                  {option.label}
                </span>
                {active && <Check className="w-4 h-4 text-[var(--primary)]" />}
              </button>
            );
          })}
        </div>
      </section>

      {user ? (
        <>
          {/* Account details */}
          <section className="bg-[var(--surface)] rounded-[18px] border border-[var(--border)] p-5 sm:p-6 shadow-[0_1px_2px_rgba(30,42,34,0.06)]">
            <h2 className="font-serif text-xl font-normal text-[var(--ink)] mb-4">
              {t('profile.accountTitle')}
            </h2>
            <dl className="space-y-3 text-sm">
              <div className="flex flex-col sm:flex-row sm:gap-4">
                <dt className="text-[var(--ink-muted)] sm:w-28 shrink-0">
                  {t('profile.nameLabel')}
                </dt>
                <dd className="font-semibold text-[var(--ink)] break-words">
                  {user.name}
                </dd>
              </div>
              <div className="flex flex-col sm:flex-row sm:gap-4">
                <dt className="text-[var(--ink-muted)] sm:w-28 shrink-0">
                  {t('profile.emailLabel')}
                </dt>
                <dd className="font-medium text-[var(--ink)] break-all">
                  {user.email}
                </dd>
              </div>
            </dl>
            <div className="pt-5 mt-5 border-t border-[var(--border)]">
              <button
                type="button"
                onClick={handleLogout}
                className="btn-secondary px-5 py-2.5 text-sm"
              >
                <LogOut className="w-4 h-4 mr-2" />
                {t('profile.logoutBtn')}
              </button>
            </div>
          </section>

          {/* Assigned books */}
          <section className="bg-[var(--surface)] rounded-[18px] border border-[var(--border)] p-5 sm:p-6 shadow-[0_1px_2px_rgba(30,42,34,0.06)]">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div>
                <h2 className="font-serif text-xl font-normal text-[var(--ink)]">
                  {t('profile.booksTitle')}
                </h2>
                <p className="text-xs text-[var(--ink-muted)] mt-1">
                  {t('profile.booksDesc')}
                </p>
              </div>
              <Link
                href="/books"
                className="text-xs font-semibold text-[var(--primary)] hover:underline"
              >
                {t('profile.browseBooks')}
              </Link>
            </div>

            {books.length === 0 ? (
              <div className="py-10 text-center rounded-[14px] bg-[var(--bg)] border border-[var(--border)]">
                <BookOpen className="w-8 h-8 mx-auto mb-2 text-[var(--primary)]" />
                <p className="text-sm text-[var(--ink-muted)]">
                  {t('profile.booksEmpty')}
                </p>
              </div>
            ) : (
              <ul className="space-y-3">
                {books.map((book) => (
                  <li
                    key={book.id}
                    className="flex items-center gap-4 p-3 rounded-[14px] bg-[var(--bg)] border border-[var(--border)]"
                  >
                    <div className="w-12 h-16 shrink-0 rounded-[8px] overflow-hidden border border-[var(--border)] bg-[var(--sage-100)] flex items-center justify-center">
                      {book.cover_url ? (
                        <img
                          src={book.cover_url}
                          alt={book.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <BookOpen className="w-5 h-5 text-[var(--primary)]" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-serif text-base text-[var(--ink)] truncate">
                        {book.title}
                      </p>
                      <p className="text-xs text-[var(--ink-muted)] truncate">
                        {book.author || t('books.pdfBadge')}
                      </p>
                      <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[var(--sage-100)] text-[var(--primary)]">
                        {t(LEVEL_KEYS[book.level])}
                      </span>
                    </div>
                    <a
                      href={getDownloadUrl(book)}
                      title={t('books.downloadTitle')}
                      className="btn-primary px-3.5 py-2 text-xs shrink-0"
                    >
                      <Download className="w-3.5 h-3.5 mr-1.5" />
                      {t('books.downloadBtn')}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </>
      ) : (
        <section className="bg-[var(--surface)] rounded-[18px] border border-[var(--border)] p-6 text-center shadow-[0_1px_2px_rgba(30,42,34,0.06)]">
          <p className="text-sm text-[var(--ink-muted)] mb-4">
            {t('profile.guestHint')}
          </p>
          <Link href="/auth" className="btn-primary px-6 py-2.5 text-sm">
            {t('profile.loginBtn')}
          </Link>
        </section>
      )}
    </div>
  );
}
