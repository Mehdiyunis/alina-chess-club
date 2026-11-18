'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Image as ImageIcon, Video } from 'lucide-react';
import { useLanguage } from './LanguageProvider';
import { formatNewsDate, localizedNewsText, NewsItem, NewsMedia } from '@/lib/news';

interface NewsDetailProps {
  item: NewsItem;
  media: NewsMedia[];
}

export function NewsDetail({ item, media }: NewsDetailProps) {
  const { t, locale } = useLanguage();

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
    <article className="max-w-[820px] mx-auto">
      <Link
        href="/updates"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--primary)] hover:gap-2.5 transition-all mb-6"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        {t('news.back')}
      </Link>

      <div className="bg-[var(--surface)] rounded-[20px] border border-[var(--border)] overflow-hidden shadow-[0_1px_2px_rgba(30,42,34,0.06)]">
        {item.cover_url && (
          <img
            src={item.cover_url}
            alt={title}
            className="w-full max-h-[420px] object-contain bg-[var(--sage-100)] border-b border-[var(--border)]"
          />
        )}

        <div className="p-6 sm:p-9">
          {date && (
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--terracotta-text)] mb-3">
              {date}
            </p>
          )}

          <h1 className="font-serif text-[clamp(1.9rem,4vw,2.8rem)] font-normal text-[var(--ink)] leading-tight mb-6">
            {title}
          </h1>

          {body && (
            <div className="text-sm sm:text-base text-[var(--ink)] leading-[1.9] whitespace-pre-line">
              {body}
            </div>
          )}

          {media.length > 0 && (
            <div className="mt-10 pt-8 border-t border-[var(--border)] space-y-8">
              {media.map((file) => {
                const label = file.caption?.trim() || file.file_name || '';
                const fallbackLabel =
                  file.media_type === 'video' ? t('news.video') : t('news.image');

                return (
                  <figure key={file.id}>
                    {file.media_type === 'video' ? (
                      <video
                        src={file.url}
                        controls
                        preload="metadata"
                        playsInline
                        className="w-full rounded-[14px] border border-[var(--border)] bg-[var(--dark)]"
                      />
                    ) : (
                      <img
                        src={file.url}
                        alt={label || fallbackLabel}
                        className="w-full rounded-[14px] border border-[var(--border)]"
                      />
                    )}
                    {label && (
                      <figcaption className="mt-2 text-xs text-[var(--ink-muted)] flex items-center gap-1.5">
                        {file.media_type === 'video' ? (
                          <Video className="w-3.5 h-3.5 shrink-0" />
                        ) : (
                          <ImageIcon className="w-3.5 h-3.5 shrink-0" />
                        )}
                        {label}
                      </figcaption>
                    )}
                  </figure>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 text-center">
        <Link href="/updates" className="btn-secondary px-5 py-2 text-xs">
          {t('news.back')}
        </Link>
      </div>
    </article>
  );
}
