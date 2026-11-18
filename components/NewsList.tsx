'use client';

import React from 'react';
import Link from 'next/link';
import { AlertCircle, ArrowRight, Newspaper } from 'lucide-react';
import { useLanguage } from './LanguageProvider';
import { formatNewsDate, localizedNewsText, newsPreview, NewsItem } from '@/lib/news';

interface NewsListProps {
  items: NewsItem[];
  error?: string | null;
}

export function NewsList({ items, error }: NewsListProps) {
  const { t, locale } = useLanguage();

  return (
    <div className="max-w-[1200px] mx-auto">
      {error && (
        <div className="mb-8 p-4 rounded-[16px] bg-rose-500/10 border border-rose-500/20 text-[var(--danger)] text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold">{t('news.errorLoading')}</p>
            <p className="text-xs opacity-90">{error}</p>
          </div>
        </div>
      )}

      {items.length === 0 ? (
        <div className="py-16 text-center px-4">
          <div className="w-12 h-12 rounded-full bg-[var(--sage-100)] border border-[var(--border)] text-[var(--primary)] flex items-center justify-center mx-auto mb-3">
            <Newspaper className="w-6 h-6" />
          </div>
          <h2 className="font-serif text-lg font-normal text-[var(--ink)]">
            {t('news.empty')}
          </h2>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => {
            const title = localizedNewsText(
              { az: item.title_az, en: item.title_en, ru: item.title_ru },
              locale
            );
            const body = localizedNewsText(
              { az: item.body_az, en: item.body_en, ru: item.body_ru },
              locale
            );
            const date = formatNewsDate(item.created_at);

            return (
              <article
                key={item.id}
                className="bg-[var(--surface)] rounded-[18px] border border-[var(--border)] overflow-hidden flex flex-col shadow-[0_1px_2px_rgba(30,42,34,0.06)] hover:shadow-md transition-all"
              >
                <Link href={`/updates/${item.id}`} className="block relative" tabIndex={-1} aria-hidden="true">
                  {item.cover_url ? (
                    <img
                      src={item.cover_url}
                      alt=""
                      className="w-full h-44 object-contain bg-[var(--sage-100)] border-b border-[var(--border)]"
                    />
                  ) : (
                    <div className="w-full h-44 bg-[var(--sage-100)] border-b border-[var(--border)] flex items-center justify-center">
                      <Newspaper className="w-10 h-10 text-[var(--primary)] opacity-60" />
                    </div>
                  )}
                </Link>

                <div className="p-5 flex flex-col flex-1">
                  {date && (
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-[var(--terracotta-text)] mb-2">
                      {date}
                    </p>
                  )}

                  <h2 className="font-serif text-xl font-normal text-[var(--ink)] leading-snug mb-2">
                    <Link href={`/updates/${item.id}`} className="hover:text-[var(--primary)] transition-colors">
                      {title}
                    </Link>
                  </h2>

                  {body && (
                    <p className="text-xs text-[var(--ink-muted)] leading-relaxed line-clamp-3 mb-5">
                      {newsPreview(body)}
                    </p>
                  )}

                  <div className="pt-3 border-t border-[var(--border)] mt-auto">
                    <Link
                      href={`/updates/${item.id}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--primary)] hover:gap-2.5 transition-all"
                    >
                      {t('news.readMore')}
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
