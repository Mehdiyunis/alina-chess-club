'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';
import { UserProfile } from '@/lib/types';
import { Menu, X, LogOut, ChevronDown, BookOpen } from 'lucide-react';

export const Navbar: React.FC = () => {
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
            .select('full_name, role')
            .eq('id', session.user.id)
            .single();

          setUser({
            id: session.user.id,
            full_name:
              profile?.full_name ||
              session.user.user_metadata?.full_name ||
              session.user.email?.split('@')[0] ||
              'İstifadəçi',
            role: profile?.role || 'user',
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
  }, [pathname]);

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
    { label: 'Kitablar', href: '/books', isRoute: true },
    { label: 'Təlimçilər', href: '/#teachers' },
    { label: 'Fiqurlar', href: '/#pieces' },
    { label: 'Qaydalar', href: '/#rules' },
    { label: 'Tövsiyələr', href: '/#tips' },
    { label: 'Əlaqə', href: '/#contact' },
    { label: 'Lövhə Qurucusu', href: '/#setup-board' },
  ];

  // Clean first name: remove any "(Google)" or provider tags, and extract first word
  const getFirstName = (fullName?: string) => {
    if (!fullName) return 'İstifadəçi';
    const cleaned = fullName.replace(/\(.*?\)/g, '').trim();
    const firstPart = cleaned.split(/\s+/)[0] || 'İstifadəçi';
    return firstPart.charAt(0).toUpperCase() + firstPart.slice(1);
  };

  const firstName = getFirstName(user?.full_name);
  const userInitial = (firstName || 'İ').charAt(0).toUpperCase();

  return (
    <header className="sticky top-0 z-40 bg-[#0d0b17]/90 backdrop-blur-md border-b border-[#2d2750]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-6">
        {/* Brand */}
        <Link
          href="/"
          className="flex items-center gap-2.5 text-left focus-visible:outline-hidden group shrink-0"
        >
          <div className="w-8 h-8 rounded-[8px] bg-[#211c3a] border border-[#2d2750] text-[#7c5cff] flex items-center justify-center font-bold text-sm">
            <span className="text-base select-none leading-none">♚</span>
          </div>
          <span className="font-bold text-base sm:text-lg text-[#ecebf5] tracking-tight group-hover:text-white transition-colors">
            Şahmat Məktəbi
          </span>
        </Link>

        {/* Desktop Navigation (visible on lg and above) */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#9893b8]">
          {navLinks.map((link) => {
            const isActive = link.isRoute && pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`transition-colors whitespace-nowrap py-1 ${
                  isActive
                    ? 'text-[#ecebf5] font-semibold border-b-2 border-[#7c5cff]'
                    : 'hover:text-[#ecebf5]'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Zone: User Avatar or Auth CTA */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 p-1 rounded-full hover:bg-[#211c3a] transition-colors cursor-pointer focus-visible:outline-hidden"
                aria-label="İstifadəçi menyusu"
                aria-expanded={userMenuOpen}
              >
                <div className="w-9 h-9 rounded-full bg-[#7c5cff] text-white flex items-center justify-center font-bold text-sm shadow-sm select-none">
                  {userInitial}
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-[#9893b8] hidden sm:block" />
              </button>

              {/* User Dropdown: Shows first name only, student/role status, books link, and Çıxış */}
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-52 card-flat bg-[#171428] border border-[#2d2750] shadow-xl py-2 z-50 animate-in fade-in duration-100">
                  <div className="px-4 py-2 border-b border-[#2d2750]/70">
                    <p className="text-sm font-semibold text-[#ecebf5] truncate max-w-[170px]" title={firstName}>
                      {firstName}
                    </p>
                    <p className="text-xs text-[#9893b8] mt-0.5">
                      Tələbə
                    </p>
                  </div>

                  <Link
                    href="/books"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-xs text-[#ecebf5] hover:bg-[#211c3a] transition-colors"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-[#9893b8]" />
                    <span>Şahmat Kitabları</span>
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left flex items-center gap-2.5 px-4 py-2.5 text-xs text-rose-400 hover:bg-[#211c3a] transition-colors cursor-pointer border-t border-[#2d2750]/50"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Çıxış</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/auth"
              className="btn-primary px-4 py-2 text-xs sm:text-sm whitespace-nowrap"
            >
              Qoşul
            </Link>
          )}

          {/* Hamburger button (shown only below lg breakpoint) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#9893b8] hover:text-[#ecebf5] cursor-pointer"
            aria-label="Menyunu aç"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (visible only when mobileMenuOpen is true on small screens) */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#171428] border-b border-[#2d2750] px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2.5 px-3 text-sm font-medium text-[#ecebf5] hover:bg-[#211c3a] rounded-[8px] transition-colors"
            >
              {link.label}
            </Link>
          ))}

          <div className="pt-3 border-t border-[#2d2750]">
            {user ? (
              <div className="space-y-1">
                <div className="px-3 py-1.5 text-xs text-[#9893b8]">
                  Giriş edilib: <span className="text-[#ecebf5] font-semibold">{firstName}</span>
                </div>
                <Link
                  href="/books"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 px-3 text-sm text-[#ecebf5] hover:bg-[#211c3a] rounded-[8px]"
                >
                  Şahmat Kitabları
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left py-2 px-3 text-sm font-medium text-rose-400 hover:bg-[#211c3a] rounded-[8px] cursor-pointer"
                >
                  Çıxış
                </button>
              </div>
            ) : (
              <Link
                href="/auth"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-primary w-full py-2.5 text-sm block text-center"
              >
                Bizə qoşul
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
