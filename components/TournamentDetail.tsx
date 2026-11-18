'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  CalendarDays,
  Facebook,
  Instagram,
  MessageCircle,
  Phone,
  Trophy,
} from 'lucide-react';
import { useLanguage } from './LanguageProvider';
import { siteConfig } from '@/lib/siteData';
import {
  formatTournamentDate,
  formatTournamentRange,
  localizedTournamentText,
  resultLabel,
  Tournament,
  TournamentDay,
  TournamentMatch,
  TournamentPlayer,
  TournamentRound,
  TournamentStatus,
} from '@/lib/tournaments';

interface TournamentDetailProps {
  item: Tournament;
  days: TournamentDay[];
  players: TournamentPlayer[];
  rounds: TournamentRound[];
  matches: TournamentMatch[];
}

const statusClass: Record<TournamentStatus, string> = {
  registration: 'bg-emerald-500/12 text-emerald-700 border-emerald-500/30',
  upcoming: 'bg-amber-500/12 text-amber-700 border-amber-500/30',
  started: 'bg-blue-500/12 text-blue-700 border-blue-500/30',
  finished: 'bg-[var(--sage-100)] text-[var(--ink-muted)] border-[var(--border)]',
};

export function TournamentDetail({
  item,
  days,
  players,
  rounds,
  matches,
}: TournamentDetailProps) {
  const { t, locale } = useLanguage();

  const title = localizedTournamentText(
    { az: item.title_az, en: item.title_en, ru: item.title_ru },
    locale
  );
  const description = localizedTournamentText(
    { az: item.description_az, en: item.description_en, ru: item.description_ru },
    locale
  );

  const playerNames = new Map(players.map((player) => [player.id, player.full_name]));
  const contactSocials = siteConfig.socialLinks.filter((social) =>
    ['instagram', 'facebook', 'tiktok'].includes(social.platform.toLowerCase())
  );

  const socialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'instagram':
        return <Instagram className="w-4 h-4" />;
      case 'facebook':
        return <Facebook className="w-4 h-4" />;
      case 'tiktok':
        return (
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.68 6.34 6.34 0 0 0 9.34 22a6.33 6.33 0 0 0 6.33-6.32V8.92a8.28 8.28 0 0 0 4.84 1.56V7.03a4.78 4.78 0 0 1-.92-.34z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <article className="max-w-[820px] mx-auto">
      <Link
        href="/tournaments"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--primary)] hover:gap-2.5 transition-all mb-6"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        {t('tournaments.back')}
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
          <span
            className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold mb-4 ${statusClass[item.status]}`}
          >
            {t(`tournaments.${item.status}`)}
          </span>

          <h1 className="font-serif text-[clamp(1.9rem,4vw,2.8rem)] font-normal text-[var(--ink)] leading-tight mb-6">
            {title}
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="rounded-[14px] border border-[var(--border)] bg-[var(--bg)] p-4">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--ink-muted)] mb-1">
                {t('tournaments.startDate')}
              </p>
              <p className="text-sm text-[var(--ink)]">{formatTournamentDate(item.starts_at)}</p>
            </div>
            <div className="rounded-[14px] border border-[var(--border)] bg-[var(--bg)] p-4">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--ink-muted)] mb-1">
                {t('tournaments.endDate')}
              </p>
              <p className="text-sm text-[var(--ink)]">{formatTournamentDate(item.ends_at)}</p>
            </div>
            <div className="rounded-[14px] border border-[var(--border)] bg-[var(--bg)] p-4">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--ink-muted)] mb-1">
                {t('tournaments.rounds')}
              </p>
              <p className="text-sm text-[var(--ink)]">{item.round_count}</p>
            </div>
          </div>

          {days.length > 0 && (
            <section className="mb-8">
              <h2 className="font-serif text-lg text-[var(--ink)] mb-3 flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-[var(--primary)]" />
                {t('tournaments.schedule')}
              </h2>
              <div className="space-y-2">
                {days.map((day) => {
                  const note = localizedTournamentText(
                    { az: day.note_az, en: day.note_en, ru: day.note_ru },
                    locale
                  );
                  return (
                    <div
                      key={day.id}
                      className="flex flex-wrap items-center justify-between gap-2 rounded-[12px] border border-[var(--border)] px-4 py-3 text-sm"
                    >
                      <span className="text-[var(--ink)]">
                        {formatTournamentRange(day.starts_at, day.ends_at)}
                      </span>
                      {note && (
                        <span className="text-xs text-[var(--ink-muted)]">{note}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {description && (
            <section className="mb-8">
              <h2 className="font-serif text-lg text-[var(--ink)] mb-3">
                {t('tournaments.description')}
              </h2>
              <p className="text-sm sm:text-base text-[var(--ink)] leading-[1.9] whitespace-pre-line">
                {description}
              </p>
            </section>
          )}

          <section className="mb-8">
            <h2 className="font-serif text-lg text-[var(--ink)] mb-3 flex items-center gap-2">
              <Trophy className="w-4 h-4 text-[var(--primary)]" />
              {t('tournaments.players')}
            </h2>
            {players.length === 0 ? (
              <p className="text-xs text-[var(--ink-muted)]">
                {t('tournaments.playersEmpty')}
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {players.map((player) => (
                  <div
                    key={player.id}
                    className="rounded-[12px] border border-[var(--border)] px-4 py-3"
                  >
                    <p className="text-sm text-[var(--ink)] font-medium">{player.full_name}</p>
                    <p className="text-[11px] text-[var(--ink-muted)] mt-1">
                      {t(`tournaments.age.${player.age_category}`)} ·{' '}
                      {t(`tournaments.grade.${player.grade}`)}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>

          {rounds.length > 0 && (
            <section className="mb-8">
              <h2 className="font-serif text-lg text-[var(--ink)] mb-3">
                {t('tournaments.roundsTitle')}
              </h2>
              <div className="space-y-5">
                {rounds.map((round) => {
                  const roundMatches = matches
                    .filter((match) => match.round_id === round.id)
                    .sort((a, b) => a.board_number - b.board_number);

                  return (
                    <div key={round.id}>
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--terracotta-text)] mb-2">
                        {t('tournaments.round')} {round.round_number}
                      </h3>
                      <div className="overflow-hidden rounded-[12px] border border-[var(--border)]">
                        {roundMatches.map((match, index) => (
                          <div
                            key={match.id}
                            className={`flex flex-wrap items-center gap-x-3 gap-y-1 px-4 py-2.5 text-xs sm:text-sm ${
                              index > 0 ? 'border-t border-[var(--border)]' : ''
                            }`}
                          >
                            <span className="w-7 shrink-0 text-[10px] text-[var(--ink-muted)]">
                              {match.board_number}
                            </span>
                            <span className="flex-1 min-w-[120px] text-[var(--ink)]">
                              {playerNames.get(match.white_player_id || '') || '—'}
                            </span>
                            <span className="shrink-0 font-semibold text-[var(--primary)] min-w-[44px] text-center">
                              {match.is_bye
                                ? t('tournaments.bye')
                                : resultLabel(match.result)}
                            </span>
                            <span className="flex-1 min-w-[120px] text-[var(--ink)] text-right">
                              {match.is_bye
                                ? '—'
                                : playerNames.get(match.black_player_id || '') || '—'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {item.status === 'registration' && (
            <section className="pt-8 border-t border-[var(--border)]">
              <h2 className="font-serif text-lg text-[var(--ink)] mb-2">
                {t('tournaments.contactTitle')}
              </h2>
              <p className="text-xs text-[var(--ink-muted)] mb-4">
                {t('tournaments.contactDesc')}
              </p>
              <div className="flex flex-wrap gap-2">
                {siteConfig.phone && (
                  <a
                    href={siteConfig.phoneHref || `tel:${siteConfig.phone}`}
                    className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg)] px-4 py-2 text-xs font-medium text-[var(--ink)] hover:border-[var(--primary)] transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    {siteConfig.phone}
                  </a>
                )}
                {siteConfig.whatsapp && (
                  <a
                    href={`https://wa.me/${siteConfig.whatsapp.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg)] px-4 py-2 text-xs font-medium text-[var(--ink)] hover:border-[var(--primary)] transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    {t('tournaments.whatsapp')}
                  </a>
                )}
                {contactSocials.map((social) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={social.platform}
                    className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg)] px-4 py-2 text-xs font-medium text-[var(--ink)] hover:border-[var(--primary)] transition-colors"
                  >
                    {socialIcon(social.platform)}
                    {social.name}
                  </a>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      <div className="mt-6 text-center">
        <Link href="/tournaments" className="btn-secondary px-5 py-2 text-xs">
          {t('tournaments.back')}
        </Link>
      </div>
    </article>
  );
}
