'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';
import { UserProfile } from '@/lib/types';
import { Menu, X, LogOut, ChevronDown, BookOpen } from 'lucide-react';
import { useLanguage } from './LanguageProvider';
import { LanguageSwitcher } from './LanguageSwitcher';

export const Navbar: React.FC = () => {
  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadUser() {
      if (!isSupabaseConfigured()) {
        return;
      }

      try {
        const supabase = createClient();
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('full_name')
            .eq('id', session.user.id)
            .single();

          setUser({
            id: session.user.id,
            full_name:
              profile?.full_name ||
              session.user.user_metadata?.full_name ||
              session.user.email?.split('@')[0] ||
              t('navbar.student'),
            created_at: session.user.created_at,
            email: session.user.email,
            phone: session.user.phone,
          });
        } else {
          setUser(null);
        }
      } catch (err) {
        console.warn('Navbar loadUser error:', err);
      }
    }

    loadUser();
  }, [pathname, t]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    if (isSupabaseConfigured()) {
      try {
        const supabase = createClient();
        await supabase.auth.signOut();
      } catch {}
    }
    setUser(null);
    setUserMenuOpen(false);
    window.location.href = '/';
  };

  const navLinks = [
    { label: t('navbar.home'), href: '/' },
    { label: t('navbar.play'), href: '/play' },
    { label: t('navbar.analysis'), href: '/analysis' },
    { label: t('navbar.books'), href: '/books' },
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
    <header className="sticky top-0 z-40 bg-[rgba(247,243,234,0.85)] backdrop-blur-md border-b border-[#E3DCCB]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-18 flex items-center justify-between gap-4 sm:gap-6">
        {/* Brand */}
        <Link
          href="/"
          className="flex items-center gap-2.5 text-left focus-visible:outline-hidden group shrink-0"
        >
          <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-[10px] overflow-hidden bg-[#FFFFFF] border border-[#E3DCCB] shadow-xs transition-transform group-hover:scale-105 shrink-0 flex items-center justify-center">
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
        <nav className="hidden sm:flex items-center gap-7 text-sm font-medium text-[#5E6B62]">
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
                    ? 'text-[#1E2A22] font-semibold border-b-2 border-[#2F5D46]'
                    : 'hover:text-[#1E2A22]'
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

          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 p-1 rounded-full hover:bg-[#E4EBD9] transition-colors cursor-pointer focus-visible:outline-hidden"
                aria-label={t('navbar.userMenu')}
                aria-expanded={userMenuOpen}
              >
                <div className="w-9 h-9 rounded-full bg-[#E4EBD9] text-[#1E2A22] border border-[#E3DCCB] flex items-center justify-center font-bold text-sm shadow-xs select-none">
                  {userInitial}
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-[#5E6B62] hidden sm:block" />
              </button>

              {/* User Dropdown */}
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-52 rounded-[16px] bg-[#FFFFFF] border border-[#E3DCCB] shadow-[0_4px_20px_rgba(30,42,34,0.08)] py-2 z-50 animate-in fade-in duration-100">
                  <div className="px-4 py-2 border-b border-[#E3DCCB]">
                    <p className="text-sm font-semibold text-[#1E2A22] truncate max-w-[170px]" title={firstName}>
                      {firstName}
                    </p>
                    <p className="text-xs text-[#5E6B62] mt-0.5">
                      {t('navbar.student')}
                    </p>
                  </div>

                  <Link
                    href="/books"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-xs text-[#1E2A22] hover:bg-[#E4EBD9] transition-colors"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-[#2F5D46]" />
                    <span>{t('navbar.chessBooks')}</span>
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left flex items-center gap-2.5 px-4 py-2.5 text-xs text-[#B4532A] hover:bg-[#E4EBD9] transition-colors cursor-pointer border-t border-[#E3DCCB]"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>{t('navbar.logout')}</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
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
            className="sm:hidden p-2 text-[#1E2A22] hover:text-[#2F5D46] cursor-pointer"
            aria-label={t('navbar.openMenu')}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#FFFFFF] border-b border-[#E3DCCB] px-4 py-4 space-y-2 shadow-[0_4px_20px_rgba(30,42,34,0.08)]">
          {/* Mobile Language Switcher */}
          <div className="pb-2 border-b border-[#E3DCCB] flex items-center justify-between">
            <span className="text-xs font-semibold text-[#5E6B62]">
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
                    ? 'text-[#1E2A22] font-semibold bg-[#E4EBD9] border-l-2 border-[#2F5D46]'
                    : 'text-[#5E6B62] hover:text-[#1E2A22] hover:bg-[#F7F3EA]'
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          <div className="pt-3 border-t border-[#E3DCCB]">
            {user ? (
              <div className="space-y-1">
                <div className="px-3 py-1.5 text-xs text-[#5E6B62]">
                  {t('navbar.loggedInAs')}: <span className="text-[#1E2A22] font-semibold">{firstName}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left py-2 px-3 text-sm font-medium text-[#B4532A] hover:bg-[#F7F3EA] rounded-[10px] cursor-pointer"
                >
                  {t('navbar.logout')}
                </button>
              </div>
            ) : (
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
