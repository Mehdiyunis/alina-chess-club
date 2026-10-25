'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { getSupabaseClient } from '@/lib/supabase/client';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Lock, Mail, User, AlertCircle, CheckCircle2 } from 'lucide-react';

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
          setSuccessMsg('Qeydiyyat tamamlandı.');
          setTimeout(() => {
            router.push('/');
          }, 1200);
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          setErrorMsg('E-poçt və ya şifrə yanlışdır.');
        } else {
          setSuccessMsg('Uğurla daxil oldunuz.');
          setTimeout(() => {
            router.push('/');
          }, 1000);
        }
      }
    } catch (err: any) {
      setErrorMsg(err?.message || 'Xəta baş verdi.');
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

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#100c08] to-[#2b1e10] text-[#f3ece1]">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-16 px-4">
        <div className="w-full max-w-md">
          <div className="bg-[#24170a] border border-[rgba(243,236,225,0.12)] rounded-[18px] p-6 sm:p-8 shadow-2xl shadow-black/50">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="relative w-14 h-14 mx-auto mb-3.5 rounded-[14px] overflow-hidden bg-[#100c08] border border-[#e9cfa0]/30 shadow-md flex items-center justify-center">
                <Image
                  src="/assets/aistudio/Golden_Knight_Chess_Club_Emblem_a4cf73aa.png"
                  alt="Şahmat Məktəbi Loqosu"
                  width={56}
                  height={56}
                  className="w-full h-full object-cover"
                />
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-normal text-[#f3ece1]">
                {isSignUp ? 'Hesab Yarat' : 'Daxil Ol'}
              </h1>
              <p className="text-xs text-[#d9c7a6] mt-1.5">
                {isSignUp
                  ? 'Şahmat dərslərinə başlamaq üçün qeydiyyatdan keçin'
                  : 'Şəxsi kabinetinizə daxil olun'}
              </p>
            </div>

            {/* Error & Success Messages */}
            {errorMsg && (
              <div className="mb-4 p-3 rounded-[12px] bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{errorMsg}</span>
              </div>
            )}

            {successMsg && (
              <div className="mb-4 p-3 rounded-[12px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>{successMsg}</span>
              </div>
            )}

            {/* Google OAuth Button */}
            <button
              onClick={handleGoogleSignIn}
              type="button"
              className="btn-secondary-dark w-full py-2.5 px-3 text-xs mb-5 flex items-center justify-center gap-2.5 rounded-full"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
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
              <span>Google ilə davam et</span>
            </button>

            <div className="relative flex py-2 items-center mb-5">
              <div className="flex-grow border-t border-[rgba(243,236,225,0.10)]" />
              <span className="shrink-0 px-2.5 text-[11px] text-[#d9c7a6] uppercase font-semibold">
                və ya e-poçt / telefon
              </span>
              <div className="flex-grow border-t border-[rgba(243,236,225,0.10)]" />
            </div>

            {/* Email/Phone Form */}
            <form onSubmit={handleEmailAuth} className="space-y-3.5">
              {isSignUp && (
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#d9c7a6] mb-1">
                    Ad və Soyad
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#d9c7a6]">
                      <User className="w-3.5 h-3.5" />
                    </div>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Əli Məmmədov"
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-[12px] bg-[#1a1107] border border-[rgba(243,236,225,0.12)] text-[#f3ece1] placeholder-[#d9c7a6]/50 focus:outline-hidden focus:border-[#e9cfa0] text-xs sm:text-sm"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#d9c7a6] mb-1">
                  E-poçt və ya Telefon
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#d9c7a6]">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  <input
                    type="text"
                    value={emailOrPhone}
                    onChange={(e) => setEmailOrPhone(e.target.value)}
                    placeholder="ad@example.com və ya 0501234567"
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-[12px] bg-[#1a1107] border border-[rgba(243,236,225,0.12)] text-[#f3ece1] placeholder-[#d9c7a6]/50 focus:outline-hidden focus:border-[#e9cfa0] text-xs sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#d9c7a6] mb-1">
                  Şifrə
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#d9c7a6]">
                    <Lock className="w-3.5 h-3.5" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-[12px] bg-[#1a1107] border border-[rgba(243,236,225,0.12)] text-[#f3ece1] placeholder-[#d9c7a6]/50 focus:outline-hidden focus:border-[#e9cfa0] text-xs sm:text-sm"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full py-3 text-xs sm:text-sm cursor-pointer disabled:opacity-50 mt-1 font-semibold rounded-full shadow-md shadow-[#e9cfa0]/10"
              >
                {loading ? 'Gözləyin...' : isSignUp ? 'Qeydiyyatdan Keç' : 'Daxil Ol'}
              </button>
            </form>

            {/* Toggle */}
            <div className="mt-5 text-center text-xs text-[#d9c7a6]">
              {isSignUp ? (
                <>
                  Artıq hesabınız var?{' '}
                  <button
                    onClick={() => {
                      setIsSignUp(false);
                      setErrorMsg(null);
                    }}
                    className="text-[#e9cfa0] hover:text-[#f1dcb4] font-semibold cursor-pointer underline"
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
                    className="text-[#e9cfa0] hover:text-[#f1dcb4] font-semibold cursor-pointer underline"
                  >
                    Qeydiyyatdan keçin
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
