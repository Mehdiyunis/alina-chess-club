'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';
import { UserProfile } from '@/lib/types';
import { Menu, X, Shield, LogOut, BookOpen } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    async function loadUser() {
      if (!isSupabaseConfigured) {
        if (typeof window !== 'undefined') {
          try {
            const raw = localStorage.getItem('sahmat_auth_session_demo');
            if (raw) setUser(JSON.parse(raw));
          } catch {}
        }
        return;
      }

      try {
        const supabase = createClient();
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          setUser({
            id: session.user.id,
            full_name: profile?.full_name || session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'Şahmatçı',
            role: profile?.role || 'user',
            created_at: session.user.created_at,
            email: session.user.email,
            phone: session.user.phone,
          });
        }
      } catch (err) {
        console.warn('Navbar user load error:', err);
      }
    }

    loadUser();
  }, [pathname]);

  const handleLogout = async () => {
    if (isSupabaseConfigured) {
      const supabase = createClient();
      await supabase.auth.signOut();
    } else {
      localStorage.removeItem('sahmat_auth_session_demo');
    }
    setUser(null);
    window.location.href = '/';
  };

  const navLinks = [
    { label: 'Müəllimlər', href: '/#teachers' },
    { label: 'Şahmat Lövhəsi', href: '/#board' },
    { label: 'Fiqurlar', href: '/#pieces' },
    { label: 'Oyunun Məqsədi', href: '/#goals' },
    { label: 'Xüsusi Gedişlər', href: '/#rules' },
    { label: 'Məsləhətlər', href: '/#tips' },
    { label: 'Kitablar', href: '/books', isRoute: true },
    { label: 'Tarix', href: '/#history' },
    { label: 'Mövqe Qurucusu', href: '/#setup-board' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#0d0b17]/85 backdrop-blur-md border-b border-[#2d2750] shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-6">
        {/* Brand / Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 text-left group focus-visible:outline-hidden"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7c5cff] to-[#5136d8] text-white flex items-center justify-center shadow-md shadow-[#7c5cff]/20 group-hover:scale-105 transition-transform border border-[#9a82ff]/30">
            <svg viewBox="0 0 45 45" className="w-6 h-6 fill-white drop-shadow-sm">
              <path d="M22.5 11.63V6M20 8h5" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
              <path d="M22.5 25c0 0 4.5-7.5 3-10.5-1.5-3-6-3-6 0-1.5 3 3 10.5 3 10.5z" />
              <path d="M11.5 37c5.5 3.5 15.5 3.5 21 0v-7s9-4.5 6-10.5c-4-1-6 2-6 2s1-4-3-5.5c-4-1.5-7 1.5-7 1.5s-3-3-7-1.5c-4 1.5-3 5.5-3 5.5s-2-3-6-2c-3 6 6 10.5 6 10.5v7z" />
            </svg>
          </div>
          <div>
            <span className="font-bold text-lg sm:text-xl tracking-tight text-[#ecebf5] block leading-tight group-hover:text-white transition-colors">
              Şahmat Məktəbi
            </span>
            <span className="text-[11px] font-medium text-[#9a82ff] block leading-none">
              Uşaqlar və Başlayanlar Üçün
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-5 text-sm font-medium text-[#9893b8]">
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
                } ${link.label === 'Kitablar' ? 'text-[#9a82ff] font-semibold' : ''}`}
              >
                {link.label === 'Kitablar' ? (
                  <span className="flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-[#7c5cff]" />
                    <span>{link.label}</span>
                  </span>
                ) : (
                  link.label
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Zone */}
        <div className="flex items-center gap-3">
          <Link
            href="/books"
            className={`hidden sm:inline-flex xl:hidden items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
              pathname === '/books'
                ? 'bg-[#7c5cff] text-white shadow-sm'
                : 'bg-[#171428] text-[#9a82ff] hover:bg-[#211c3a] border border-[#2d2750]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Kitablar</span>
          </Link>

          {user ? (
            <div className="flex items-center gap-2">
              {user.role === 'admin' && (
                <Link
                  href="/admin"
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                    pathname === '/admin'
                      ? 'bg-[#7c5cff] text-white shadow-sm'
                      : 'bg-[#171428] text-[#9a82ff] hover:bg-[#211c3a] border border-[#2d2750]'
                  }`}
                  title="Admin Paneli"
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Admin</span>
                </Link>
              )}
              <div className="hidden sm:flex flex-col text-right">
                <span className="text-xs font-semibold text-[#ecebf5] truncate max-w-[120px]">
                  {user.full_name || 'İstifadəçi'}
                </span>
                <span className="text-[10px] text-[#9893b8] uppercase tracking-wider">
                  {user.role === 'admin' ? 'Administrator' : 'Şagird'}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-[#9893b8] hover:text-[#ecebf5] bg-[#171428] hover:bg-[#211c3a] border border-[#2d2750] rounded-xl transition-colors cursor-pointer"
                title="Çıxış"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Çıxış</span>
              </button>
            </div>
          ) : (
            <Link
              href="/auth"
              className="inline-flex items-center justify-center px-5 py-2 text-sm font-semibold text-white btn-violet-glow rounded-xl transition-all cursor-pointer"
            >
              Qoşul
            </Link>
          )}

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 text-[#9893b8] hover:text-[#ecebf5] focus-visible:outline-hidden cursor-pointer"
            aria-label="Menyu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#171428] border-b border-[#2d2750] px-4 pt-3 pb-6 space-y-1 shadow-2xl animate-in fade-in duration-150">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-left py-2.5 px-3 text-sm font-medium text-[#ecebf5] hover:bg-[#211c3a] hover:text-[#9a82ff] rounded-xl transition-colors flex items-center justify-between"
            >
              <span>{link.label}</span>
              {link.label === 'Kitablar' && (
                <BookOpen className="w-4 h-4 text-[#7c5cff]" />
              )}
            </Link>
          ))}
          <div className="pt-3 border-t border-[#2d2750] flex flex-col gap-2">
            {user ? (
              <>
                <div className="px-3 py-1.5 text-xs text-[#9893b8]">
                  Daxil olub: <strong className="text-[#ecebf5]">{user.full_name}</strong> ({user.role})
                </div>
                {user.role === 'admin' && (
                  <Link
                    href="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-left py-2 px-3 text-sm font-semibold text-[#9a82ff] bg-[#211c3a] rounded-xl"
                  >
                    Admin Paneli
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="w-full text-left py-2 px-3 text-sm font-medium text-rose-400 hover:bg-rose-950/30 rounded-xl"
                >
                  Çıxış
                </button>
              </>
            ) : (
              <Link
                href="/auth"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 text-center text-sm font-semibold text-white btn-violet-glow rounded-xl"
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
