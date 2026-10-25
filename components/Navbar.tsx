'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
    <header className="sticky top-0 z-40 bg-[#100c08]/92 backdrop-blur-md">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-18 flex items-center justify-between gap-6">
        {/* Brand */}
        <Link
          href="/"
          className="flex items-center gap-2.5 text-left focus-visible:outline-hidden group shrink-0"
        >
          <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-[10px] overflow-hidden bg-[#24170a] border border-[#e9cfa0]/30 shadow-md transition-transform group-hover:scale-105 shrink-0 flex items-center justify-center">
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

        {/* Desktop Navigation (visible on lg and above) */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#d9c7a6]">
          {navLinks.map((link) => {
            const isActive = link.isRoute && pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`transition-colors whitespace-nowrap py-1 ${
                  isActive
                    ? 'text-[#f3ece1] font-semibold border-b-2 border-[#e9cfa0]'
                    : 'hover:text-[#f3ece1]'
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
                className="flex items-center gap-2 p-1 rounded-full hover:bg-[#2b1d0e] transition-colors cursor-pointer focus-visible:outline-hidden"
                aria-label="İstifadəçi menyusu"
                aria-expanded={userMenuOpen}
              >
                <div className="w-9 h-9 rounded-full bg-[#e9cfa0] text-[#1a130c] flex items-center justify-center font-bold text-sm shadow-sm select-none">
                  {userInitial}
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-[#d9c7a6] hidden sm:block" />
              </button>

              {/* User Dropdown */}
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-52 rounded-[16px] bg-[#24170a] border border-[rgba(243,236,225,0.12)] shadow-2xl py-2 z-50 animate-in fade-in duration-100">
                  <div className="px-4 py-2 border-b border-[rgba(243,236,225,0.10)]">
                    <p className="text-sm font-semibold text-[#f3ece1] truncate max-w-[170px]" title={firstName}>
                      {firstName}
                    </p>
                    <p className="text-xs text-[#d9c7a6] mt-0.5">
                      Tələbə
                    </p>
                  </div>

                  <Link
                    href="/books"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-xs text-[#f3ece1] hover:bg-[#332212] transition-colors"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-[#e9cfa0]" />
                    <span>Şahmat Kitabları</span>
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left flex items-center gap-2.5 px-4 py-2.5 text-xs text-rose-300 hover:bg-[#332212] transition-colors cursor-pointer border-t border-[rgba(243,236,225,0.10)]"
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
              className="btn-primary px-5 py-2 text-xs sm:text-sm whitespace-nowrap shadow-sm"
            >
              Qoşul
            </Link>
          )}

          {/* Hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#d9c7a6] hover:text-[#f3ece1] cursor-pointer"
            aria-label="Menyunu aç"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#181009] border-b border-[rgba(243,236,225,0.10)] px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2.5 px-3 text-sm font-medium text-[#f3ece1] hover:bg-[#2b1d0e] rounded-[10px] transition-colors"
            >
              {link.label}
            </Link>
          ))}

          <div className="pt-3 border-t border-[rgba(243,236,225,0.10)]">
            {user ? (
              <div className="space-y-1">
                <div className="px-3 py-1.5 text-xs text-[#d9c7a6]">
                  Giriş edilib: <span className="text-[#f3ece1] font-semibold">{firstName}</span>
                </div>
                <Link
                  href="/books"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 px-3 text-sm text-[#f3ece1] hover:bg-[#2b1d0e] rounded-[10px]"
                >
                  Şahmat Kitabları
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left py-2 px-3 text-sm font-medium text-rose-300 hover:bg-[#2b1d0e] rounded-[10px] cursor-pointer"
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
