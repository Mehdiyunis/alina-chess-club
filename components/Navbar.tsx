'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, UserRound } from 'lucide-react';
import { useAuth } from './AuthProvider';
import { useLanguage } from './LanguageProvider';
import { LanguageSwitcher } from './LanguageSwitcher';

export const Navbar: React.FC = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { label: t('navbar.home'), href: '/' },
    { label: t('navbar.play'), href: '/play' },
    { label: t('navbar.analysis'), href: '/analysis' },
    { label: t('navbar.books'), href: '/books' },
    { label: t('news.nav'), href: '/updates' },
    { label: t('tournaments.nav'), href: '/tournaments' },
  ];

  // Clean first name: remove any "(Google)" or provider tags, and extract first word
  const getFirstName = (fullName?: string) => {
    if (!fullName) return t('navbar.student');
    const cleaned = fullName.replace(/\(.*?\)/g, '').trim();
    const firstPart = cleaned.split(/\s+/)[0] || t('navbar.student');
    return firstPart.charAt(0).toUpperCase() + firstPart.slice(1);
  };

  const firstName = getFirstName(user?.full_name);
  const userInitial = (firstName || 'U').charAt(0).toUpperCase();

  return (
    <header className="sticky top-0 z-40 bg-[var(--bg)]/85 backdrop-blur-md border-b border-[var(--border)]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-18 flex items-center justify-between gap-4 sm:gap-6">
        {/* Brand */}
        <Link
          href="/"
          className="flex items-center gap-2.5 text-left focus-visible:outline-hidden group shrink-0"
        >
          <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-[10px] overflow-hidden bg-[var(--surface)] border border-[var(--border)] shadow-xs transition-transform group-hover:scale-105 shrink-0 flex items-center justify-center">
            <Image
              src="/assets/aistudio/Golden_Knight_Chess_Club_Emblem_a4cf73aa.png"
              alt="Şahmat Məktəbi Loqosu"
              width={40}
              height={40}
              className="w-full h-full object-cover"
              priority
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden sm:flex items-center gap-7 text-sm font-medium text-[var(--ink-muted)]">
          {navLinks.map((link) => {
            const isActive =
              link.href === '/'
                ? pathname === '/'
                : pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors whitespace-nowrap py-1 ${
                  isActive
                    ? 'text-[var(--ink)] font-semibold border-b-2 border-[var(--primary)]'
                    : 'hover:text-[var(--ink)]'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Zone: Language Switcher, User Avatar or Auth CTA */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Desktop Language Switcher */}
          <div className="hidden sm:block">
            <LanguageSwitcher />
          </div>

          <Link
            href="/profile"
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center gap-2 p-1 rounded-full hover:bg-[var(--sage-100)] transition-colors focus-visible:outline-hidden ${
              pathname === '/profile' ? 'bg-[var(--sage-100)]' : ''
            }`}
            aria-label={t('navbar.profile')}
            aria-current={pathname === '/profile' ? 'page' : undefined}
          >
            <div className="w-9 h-9 rounded-full bg-[var(--sage-100)] text-[var(--ink)] border border-[var(--border)] flex items-center justify-center shadow-xs select-none">
              {user ? (
                <span className="font-bold text-sm">{userInitial}</span>
              ) : (
                <UserRound className="w-4.5 h-4.5 text-[var(--primary)]" />
              )}
            </div>
          </Link>

          {!user && (
            <Link
              href="/auth"
              className="btn-primary px-4 sm:px-5 py-2 text-xs sm:text-sm whitespace-nowrap shadow-xs"
            >
              {t('navbar.join')}
            </Link>
          )}

          {/* Hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="sm:hidden p-2 text-[var(--ink)] hover:text-[var(--primary)] cursor-pointer"
            aria-label={t('navbar.openMenu')}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[var(--surface)] border-b border-[var(--border)] px-4 py-4 space-y-2 shadow-[0_4px_20px_rgba(30,42,34,0.08)]">
          {/* Mobile Language Switcher */}
          <div className="pb-2 border-b border-[var(--border)] flex items-center justify-between">
            <span className="text-xs font-semibold text-[var(--ink-muted)]">
              {t('navbar.selectLanguage')}
            </span>
            <LanguageSwitcher align="right" />
          </div>

          {navLinks.map((link) => {
            const isActive =
              link.href === '/'
                ? pathname === '/'
                : pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-2.5 px-3 text-sm font-medium rounded-[10px] transition-colors ${
                  isActive
                    ? 'text-[var(--ink)] font-semibold bg-[var(--sage-100)] border-l-2 border-[var(--primary)]'
                    : 'text-[var(--ink-muted)] hover:text-[var(--ink)] hover:bg-[var(--bg)]'
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          <div className="pt-3 border-t border-[var(--border)] space-y-1">
            {user && (
              <div className="px-3 py-1.5 text-xs text-[var(--ink-muted)]">
                {t('navbar.loggedInAs')}: <span className="text-[var(--ink)] font-semibold">{firstName}</span>
              </div>
            )}
            <Link
              href="/profile"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2.5 px-3 text-sm font-medium text-[var(--ink)] hover:bg-[var(--sage-100)] rounded-[10px]"
            >
              {t('navbar.profile')}
            </Link>
            {!user && (
              <Link
                href="/auth"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-primary w-full py-2.5 text-sm block text-center"
              >
                {t('navbar.join')}
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
