'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/lib/siteData';
import { Instagram, Facebook, Youtube, Send } from 'lucide-react';
import { useLanguage } from './LanguageProvider';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'instagram':
        return <Instagram className="w-4 h-4" />;
      case 'facebook':
        return <Facebook className="w-4 h-4" />;
      case 'youtube':
        return <Youtube className="w-4 h-4" />;
      case 'tiktok':
        return (
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.68 6.34 6.34 0 0 0 9.34 22a6.33 6.33 0 0 0 6.33-6.32V8.92a8.28 8.28 0 0 0 4.84 1.56V7.03a4.78 4.78 0 0 1-.92-.34z" />
          </svg>
        );
      case 'telegram':
      case 'send':
        return <Send className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <footer className="bg-[var(--dark)] text-[var(--on-dark-muted)] pt-16 pb-12 border-t border-[var(--border)]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-[var(--on-dark-muted)]/20">
          {/* Brand info (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-[10px] overflow-hidden bg-[var(--surface)] border border-[var(--border)] shadow-xs shrink-0 flex items-center justify-center">
                <Image
                  src="/assets/aistudio/Golden_Knight_Chess_Club_Emblem_a4cf73aa.png"
                  alt="ALİNA Chess Club"
                  width={36}
                  height={36}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <p className="text-xs text-[var(--on-dark-muted)] max-w-sm leading-relaxed">
              {t('footer.desc')}
            </p>

            <div className="pt-2">
              <span className="text-xs font-semibold text-[var(--on-primary)] block mb-2">
                {t('footer.socials')}
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {siteConfig.socialLinks.map((social) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-[var(--dark)] hover:bg-[var(--butter)] text-[var(--on-primary)] hover:text-[var(--ink)] transition-all flex items-center justify-center border border-[var(--on-dark-muted)]/30 shadow-xs"
                    title={social.platform}
                  >
                    {getSocialIcon(social.platform)}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Links 1: Dərslər */}
          <div className="space-y-2.5">
            <h4 className="font-serif text-xs font-normal text-[var(--on-primary)] uppercase tracking-wider">
              {t('footer.learningSections')}
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link href="/#board" className="text-[var(--on-dark-muted)] hover:text-[var(--butter-text)] transition-colors">
                  {t('footer.board')}
                </Link>
              </li>
              <li>
                <Link href="/#pieces" className="text-[var(--on-dark-muted)] hover:text-[var(--butter-text)] transition-colors">
                  {t('footer.pieces')}
                </Link>
              </li>
              <li>
                <Link href="/#goals" className="text-[var(--on-dark-muted)] hover:text-[var(--butter-text)] transition-colors">
                  {t('footer.goals')}
                </Link>
              </li>
              <li>
                <Link href="/#rules" className="text-[var(--on-dark-muted)] hover:text-[var(--butter-text)] transition-colors">
                  {t('footer.specialMoves')}
                </Link>
              </li>
              <li>
                <Link href="/#tips" className="text-[var(--on-dark-muted)] hover:text-[var(--butter-text)] transition-colors">
                  {t('footer.tips')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Links 2: Akademiya */}
          <div className="space-y-2.5">
            <h4 className="font-serif text-xs font-normal text-[var(--on-primary)] uppercase tracking-wider">
              {t('footer.academy')}
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link href="/#teachers" className="text-[var(--on-dark-muted)] hover:text-[var(--butter-text)] transition-colors">
                  {t('footer.teachers')}
                </Link>
              </li>
              <li>
                <Link href="/books" className="text-[var(--on-dark-muted)] hover:text-[var(--butter-text)] transition-colors">
                  {t('footer.books')}
                </Link>
              </li>
              <li>
                <Link href="/updates" className="text-[var(--on-dark-muted)] hover:text-[var(--butter-text)] transition-colors">
                  {t('news.nav')}
                </Link>
              </li>
              <li>
                <Link href="/tournaments" className="text-[var(--on-dark-muted)] hover:text-[var(--butter-text)] transition-colors">
                  {t('tournaments.nav')}
                </Link>
              </li>
              <li>
                <Link href="/#history" className="text-[var(--on-dark-muted)] hover:text-[var(--butter-text)] transition-colors">
                  {t('footer.history')}
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="text-[var(--on-dark-muted)] hover:text-[var(--butter-text)] transition-colors">
                  {t('footer.faq')}
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="text-[var(--on-dark-muted)] hover:text-[var(--butter-text)] transition-colors">
                  {t('footer.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Links 3: Alətlər */}
          <div className="space-y-2.5">
            <h4 className="font-serif text-xs font-normal text-[var(--on-primary)] uppercase tracking-wider">
              {t('footer.tools')}
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link href="/play" className="text-[var(--on-dark-muted)] hover:text-[var(--butter-text)] transition-colors">
                  {t('navbar.play')}
                </Link>
              </li>
              <li>
                <Link href="/analysis" className="text-[var(--on-dark-muted)] hover:text-[var(--butter-text)] transition-colors">
                  {t('footer.setupBoard')}
                </Link>
              </li>
              <li>
                <Link href="/books" className="text-[var(--on-dark-muted)] hover:text-[var(--butter-text)] transition-colors">
                  {t('footer.books')}
                </Link>
              </li>
              <li>
                <Link href="/auth" className="text-[var(--on-dark-muted)] hover:text-[var(--butter-text)] transition-colors">
                  {t('footer.auth')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright and SVG License Attribution */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[var(--on-dark-muted)]/80">
          <p>{t('footer.copyright', { year: new Date().getFullYear() })}</p>
          <p className="text-[11px] text-[var(--on-dark-muted)]/60 text-center sm:text-right">
            {t('footer.credit')}
          </p>
        </div>
      </div>
    </footer>
  );
};
