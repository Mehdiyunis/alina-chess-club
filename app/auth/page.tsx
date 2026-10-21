'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getSupabaseClient } from '@/lib/supabase/client';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Lock, Mail, User, ShieldCheck, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function AuthPage() {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [fullName, setFullName] = useState('');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const supabase = getSupabaseClient();

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    const identifier = emailOrPhone.trim();
    if (!identifier) {
      setErrorMsg('Zəhmət olmasa e-poçt ünvanınızı və ya telefon nömrənizi daxil edin.');
      return;
    }

    if (!password || password.length < 6) {
      setErrorMsg('Şifrə ən azı 6 simvoldan ibarət olmalıdır.');
      return;
    }

    if (isSignUp && !fullName.trim()) {
      setErrorMsg('Zəhmət olmasa ad və soyadınızı daxil edin.');
      return;
    }

    setLoading(true);

    try {
      const isEmail = identifier.includes('@');
      const email = isEmail ? identifier : `${identifier.replace(/\D/g, '')}@telefonom.local`;

      if (isSignUp) {
        // Sign up
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName.trim(),
              phone: !isEmail ? identifier : undefined,
            },
          },
        });

        if (error) {
          setErrorMsg(error.message || 'Qeydiyyat zamanı xəta baş verdi.');
        } else {
          setSuccessMsg('Qeydiyyat uğurla tamamlandı! Xoş gəlmisiniz.');
          setTimeout(() => {
            router.push('/');
          }, 1500);
        }
      } else {
        // Sign in
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          setErrorMsg('E-poçt və ya şifrə yanlışdır.');
        } else {
          setSuccessMsg('Uğurla daxil oldunuz!');
          setTimeout(() => {
            router.push('/');
          }, 1000);
        }
      }
    } catch (err: any) {
      setErrorMsg(err?.message || 'Gözlənilməz xəta baş verdi.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setErrorMsg(null);
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: typeof window !== 'undefined' ? `${window.location.origin}/auth/callback` : undefined,
        },
      });
      if (error) {
        setErrorMsg(error.message || 'Google ilə daxil olma zamanı xəta baş verdi.');
      }
    } catch (err: any) {
      setErrorMsg('Google ilə giriş xidməti aktivləşdirilməyib və ya xəta baş verdi.');
    }
  };

  // Demo sign-in for evaluation as admin or standard user
  const handleDemoSignIn = async (role: 'admin' | 'user') => {
    setLoading(true);
    setErrorMsg(null);

    // If using mock/client mode, establish local mock session
    if (typeof window !== 'undefined') {
      const demoUser = {
        id: role === 'admin' ? 'demo-admin-id' : 'demo-user-id',
        email: role === 'admin' ? 'admin@sahmat.az' : 'telebe@sahmat.az',
        user_metadata: {
          full_name: role === 'admin' ? 'İnzibatçı Qrossmeyster' : 'Nümunə Tələbə',
        },
      };

      const demoProfile = {
        id: demoUser.id,
        full_name: demoUser.user_metadata.full_name,
        role: role,
        created_at: new Date().toISOString(),
      };

      localStorage.setItem('sb-demo-session', JSON.stringify({
        user: demoUser,
        profile: demoProfile,
      }));

      // Also set standard cookie for middleware
      document.cookie = `sb-demo-role=${role}; path=/; max-age=86400; SameSite=Lax`;

      setSuccessMsg(role === 'admin' ? 'İnzibatçı kimi daxil olundu! Panelə yönləndirilirsiniz...' : 'Tələbə kimi daxil olundu!');
      setTimeout(() => {
        if (role === 'admin') {
          router.push('/admin');
        } else {
          router.push('/');
        }
      }, 1000);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0d0b17] text-[#ecebf5]">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-16 px-4 relative overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#7c5cff]/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="w-full max-w-md relative z-10">
          <div className="bg-[#171428] border border-[#2d2750] rounded-3xl p-8 sm:p-10 shadow-2xl">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-14 h-14 rounded-2xl bg-[#7c5cff]/10 border border-[#7c5cff]/20 flex items-center justify-center text-[#7c5cff] mx-auto mb-4">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#ecebf5]">
                {isSignUp ? 'Hesab Yarat' : 'Xoş Gəlmisiniz'}
              </h1>
              <p className="text-sm text-[#9893b8] mt-2">
                {isSignUp
                  ? 'Şahmat dərslərinə başlamaq üçün qeydiyyatdan keçin'
                  : 'Şəxsi kabinetinizə daxil olun və dərslərinizə davam edin'}
              </p>
            </div>

            {/* Error & Success Messages */}
            {errorMsg && (
              <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-sm flex items-start gap-3">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-rose-400" />
                <span>{errorMsg}</span>
              </div>
            )}

            {successMsg && (
              <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 text-emerald-400" />
                <span>{successMsg}</span>
              </div>
            )}

            {/* Google OAuth Button */}
            <button
              onClick={handleGoogleSignIn}
              type="button"
              className="w-full py-3.5 px-4 rounded-xl bg-[#211c3a] border border-[#2d2750] hover:bg-[#2d2750] text-[#ecebf5] font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-3 cursor-pointer shadow-sm hover:border-[#7c5cff]/40 mb-6"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.17 0 9.99 0 12s.45 3.83 1.25 5.42l4.03-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
              <span>Google ilə Davam Et</span>
            </button>

            <div className="relative flex py-2 items-center mb-6">
              <div className="flex-grow border-t border-[#2d2750]" />
              <span className="shrink-0 px-3 text-xs text-[#9893b8] uppercase font-semibold">
                və ya e-poçt / telefon
              </span>
              <div className="flex-grow border-t border-[#2d2750]" />
            </div>

            {/* Email/Phone Form */}
            <form onSubmit={handleEmailAuth} className="space-y-4">
              {isSignUp && (
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#9893b8] mb-1.5">
                    Ad və Soyadınız
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#9893b8]">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Məs: Əli Məmmədov"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0d0b17] border border-[#2d2750] text-[#ecebf5] placeholder-[#9893b8]/50 focus:outline-none focus:border-[#7c5cff] focus:ring-2 focus:ring-[#7c5cff]/30 text-sm"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#9893b8] mb-1.5">
                  E-poçt və ya Telefon Nömrəsi
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#9893b8]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={emailOrPhone}
                    onChange={(e) => setEmailOrPhone(e.target.value)}
                    placeholder="ad@example.com və ya 0501234567"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0d0b17] border border-[#2d2750] text-[#ecebf5] placeholder-[#9893b8]/50 focus:outline-none focus:border-[#7c5cff] focus:ring-2 focus:ring-[#7c5cff]/30 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#9893b8] mb-1.5">
                  Şifrə
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#9893b8]">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0d0b17] border border-[#2d2750] text-[#ecebf5] placeholder-[#9893b8]/50 focus:outline-none focus:border-[#7c5cff] focus:ring-2 focus:ring-[#7c5cff]/30 text-sm"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#7c5cff] to-[#6340f0] hover:from-[#9a82ff] hover:to-[#7c5cff] text-white font-bold text-sm shadow-lg shadow-[#7c5cff]/25 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Gözləyin...
                  </span>
                ) : (
                  <>
                    <span>{isSignUp ? 'Qeydiyyatdan Keç' : 'Daxil Ol'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Toggle Sign Up / Sign In */}
            <div className="mt-6 text-center text-xs text-[#9893b8]">
              {isSignUp ? (
                <>
                  Artıq hesabınız var?{' '}
                  <button
                    onClick={() => {
                      setIsSignUp(false);
                      setErrorMsg(null);
                    }}
                    className="text-[#7c5cff] hover:text-[#9a82ff] font-semibold cursor-pointer underline"
                  >
                    Daxil olun
                  </button>
                </>
              ) : (
                <>
                  Hesabınız yoxdur?{' '}
                  <button
                    onClick={() => {
                      setIsSignUp(true);
                      setErrorMsg(null);
                    }}
                    className="text-[#7c5cff] hover:text-[#9a82ff] font-semibold cursor-pointer underline"
                  >
                    Qeydiyyatdan keçin
                  </button>
                </>
              )}
            </div>

            {/* Quick Demo Login Helpers */}
            <div className="mt-8 pt-6 border-t border-[#2d2750]/60">
              <span className="block text-[11px] font-semibold uppercase tracking-wider text-[#9893b8] text-center mb-3">
                Sınaq Rejimi (Təqdimat üçün)
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleDemoSignIn('admin')}
                  className="py-2 px-3 rounded-lg bg-[#211c3a] hover:bg-[#7c5cff]/20 text-[#ecebf5] hover:text-[#9a82ff] border border-[#2d2750] text-xs font-medium transition-colors cursor-pointer text-center"
                >
                  👑 İnzibatçı (Admin)
                </button>
                <button
                  type="button"
                  onClick={() => handleDemoSignIn('user')}
                  className="py-2 px-3 rounded-lg bg-[#211c3a] hover:bg-[#2d2750] text-[#9893b8] hover:text-[#ecebf5] border border-[#2d2750] text-xs font-medium transition-colors cursor-pointer text-center"
                >
                  ♟️ Tələbə (İstifadəçi)
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
