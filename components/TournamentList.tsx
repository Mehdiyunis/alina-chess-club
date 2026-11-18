'use client';

import React from 'react';
import Link from 'next/link';
import { AlertCircle, ArrowRight, CalendarDays, Trophy } from 'lucide-react';
import { useLanguage } from './LanguageProvider';
import {
  formatTournamentDate,
  localizedTournamentText,
  Tournament,
  TournamentStatus,
} from '@/lib/tournaments';

interface TournamentListProps {
  items: Tournament[];
  error?: string | null;
}

const statusClass: Record<TournamentStatus, string> = {
  registration: 'bg-emerald-500/12 text-emerald-700 border-emerald-500/30',
  upcoming: 'bg-amber-500/12 text-amber-700 border-amber-500/30',
  started: 'bg-blue-500/12 text-blue-700 border-blue-500/30',
  finished: 'bg-[var(--sage-100)] text-[var(--ink-muted)] border-[var(--border)]',
};

export function TournamentList({ items, error }: TournamentListProps) {
  const { t, locale } = useLanguage();

  return (
    <div className="max-w-[1200px] mx-auto">
      {error && (
        <div className="mb-8 p-4 rounded-[16px] bg-rose-500/10 border border-rose-500/20 text-[var(--danger)] text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold">{t('tournaments.errorLoading')}</p>
            <p className="text-xs opacity-90">{error}</p>
          </div>
        </div>
      )}

      {items.length === 0 ? (
        <div className="py-16 text-center px-4">
          <div className="w-12 h-12 rounded-full bg-[var(--sage-100)] border border-[var(--border)] text-[var(--primary)] flex items-center justify-center mx-auto mb-3">
            <Trophy className="w-6 h-6" />
          </div>
          <h2 className="font-serif text-lg font-normal text-[var(--ink)]">
            {t('tournaments.empty')}
          </h2>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => {
            const title = localizedTournamentText(
              { az: item.title_az, en: item.title_en, ru: item.title_ru },
              locale
            );
            const date = formatTournamentDate(item.starts_at);

            return (
              <article
                key={item.id}
                className="bg-[var(--surface)] rounded-[18px] border border-[var(--border)] overflow-hidden flex flex-col shadow-[0_1px_2px_rgba(30,42,34,0.06)] hover:shadow-md transition-all"
              >
                <Link
                  href={`/tournaments/${item.id}`}
                  className="block relative"
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  {item.cover_url ? (
                    <img
                      src={item.cover_url}
                      alt=""
                      className="w-full h-44 object-contain bg-[var(--sage-100)] border-b border-[var(--border)]"
                    />
                  ) : (
                    <div className="w-full h-44 bg-[var(--sage-100)] border-b border-[var(--border)] flex items-center justify-center">
                      <Trophy className="w-10 h-10 text-[var(--primary)] opacity-60" />
                    </div>
                  )}
                </Link>

                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span
                      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-semibold ${statusClass[item.status]}`}
                    >
                      {t(`tournaments.${item.status}`)}
                    </span>
                    <span className="text-[10px] font-semibold text-[var(--ink-muted)]">
                      {item.round_count} {t('tournaments.rounds').toLowerCase()}
                    </span>
                  </div>

                  {date && (
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-[var(--terracotta-text)] mb-2 flex items-center gap-1.5">
                      <CalendarDays className="w-3.5 h-3.5 shrink-0" />
                      {date}
                    </p>
                  )}

                  <h2 className="font-serif text-xl font-normal text-[var(--ink)] leading-snug mb-5">
                    <Link
                      href={`/tournaments/${item.id}`}
                      className="hover:text-[var(--primary)] transition-colors"
                    >
                      {title}
                    </Link>
                  </h2>

                  <div className="pt-3 border-t border-[var(--border)] mt-auto">
                    <Link
                      href={`/tournaments/${item.id}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--primary)] hover:gap-2.5 transition-all"
                    >
                      {t('tournaments.readMore')}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
