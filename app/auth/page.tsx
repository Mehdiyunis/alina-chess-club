'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Lock, Mail, User, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';

export const dynamic = 'force-dynamic';

export default function AuthPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [isSignUp, setIsSignUp] = useState(false);
  const [fullName, setFullName] = useState('');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    const identifier = emailOrPhone.trim();
    if (!identifier) {
      setErrorMsg(t('auth.errIdentifier'));
      return;
    }

    if (!password || password.length < 6) {
      setErrorMsg(t('auth.errPasswordLength'));
      return;
    }

    if (isSignUp && !fullName.trim()) {
      setErrorMsg(t('auth.errFullName'));
      return;
    }

    setLoading(true);

    try {
      if (!isSupabaseConfigured()) {
        setErrorMsg('Supabase konfiqurasiyası tapılmadı. Zəhmət olmasa mühit dəyişənlərini təyin edin.');
        setLoading(false);
        return;
      }
      const supabase = createClient();
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
            emailRedirectTo: `${window.location.origin}/auth/callback?next=/play`,
          },
        });

        if (error) {
          setErrorMsg(error.message || t('auth.errGeneral'));
        } else if (data.session) {
          // Email confirmation is disabled: the user is signed in immediately.
          setSuccessMsg(t('auth.successSignIn'));
          setTimeout(() => {
            router.push('/play');
          }, 1000);
        } else if (data.user?.identities?.length === 0) {
          setErrorMsg(t('auth.errAlreadyRegistered'));
        } else {
          // Confirmation email sent: stay on this page until the link is clicked.
          setSuccessMsg(t('auth.checkEmail'));
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          setErrorMsg(t('auth.errAuthFailed'));
        } else {
          setSuccessMsg(t('auth.successSignIn'));
          setTimeout(() => {
            router.push('/play');
          }, 1000);
        }
      }
    } catch (err: any) {
      setErrorMsg(err?.message || t('auth.errGeneral'));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setErrorMsg(null);
    try {
      if (!isSupabaseConfigured()) {
        setErrorMsg(t('auth.errGoogle'));
        return;
      }
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo:
            typeof window !== 'undefined'
              ? `${window.location.origin}/auth/callback?next=/play`
              : undefined,
        },
      });
      if (error) {
        setErrorMsg(error.message || t('auth.errGoogle'));
      }
    } catch {
      setErrorMsg(t('auth.errGoogle'));
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg)] text-[var(--ink)]">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-16 px-4">
        <div className="w-full max-w-md">
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[18px] p-6 sm:p-8 shadow-[0_1px_2px_rgba(30,42,34,0.06)]">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="relative w-14 h-14 mx-auto mb-3.5 rounded-[14px] overflow-hidden bg-[var(--surface)] border border-[var(--border)] shadow-xs flex items-center justify-center">
                <Image
                  src="/assets/aistudio/Golden_Knight_Chess_Club_Emblem_a4cf73aa.png"
                  alt="ALİNA Chess Club"
                  width={56}
                  height={56}
                  className="w-full h-full object-cover"
                />
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-normal text-[var(--ink)]">
                {isSignUp ? t('auth.createAccount') : t('auth.signIn')}
              </h1>
              <p className="text-xs text-[var(--ink-muted)] mt-1.5">
                {isSignUp ? t('auth.signUpSubtitle') : t('auth.signInSubtitle')}
              </p>
            </div>

            {/* Error & Success Messages */}
            {errorMsg && (
              <div className="mb-4 p-3 rounded-[12px] bg-rose-500/10 border border-rose-500/20 text-[var(--danger)] text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-[var(--danger)]" />
                <span>{errorMsg}</span>
              </div>
            )}

            {successMsg && (
              <div className="mb-4 p-3 rounded-[12px] bg-[var(--sage-100)] border border-[var(--primary)]/20 text-[var(--primary)] text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-[var(--primary)]" />
                <span>{successMsg}</span>
              </div>
            )}

            {/* Google OAuth Button */}
            <button
              onClick={handleGoogleSignIn}
              type="button"
              className="w-full py-2.5 px-3 text-xs mb-5 flex items-center justify-center gap-2.5 rounded-full border border-[var(--border)] text-[var(--ink)] bg-[var(--surface)] hover:bg-[var(--sage-100)] transition-colors cursor-pointer shadow-xs font-medium"
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
              <span>{t('auth.googleContinue')}</span>
            </button>

            <div className="relative flex py-2 items-center mb-5">
              <div className="flex-grow border-t border-[var(--border)]" />
              <span className="shrink-0 px-2.5 text-[11px] text-[var(--ink-muted)] uppercase font-semibold">
                {t('auth.orEmailPhone')}
              </span>
              <div className="flex-grow border-t border-[var(--border)]" />
            </div>

            {/* Email/Phone Form */}
            <form onSubmit={handleEmailAuth} className="space-y-3.5">
              {isSignUp && (
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--ink-muted)] mb-1">
                    {t('auth.fullName')}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[var(--ink-muted)]">
                      <User className="w-3.5 h-3.5" />
                    </div>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder={t('auth.fullNamePlaceholder')}
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-[12px] bg-[var(--surface)] border border-[var(--border)] text-[var(--ink)] placeholder-[var(--ink-muted)]/50 focus:outline-hidden focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/35 text-xs sm:text-sm"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--ink-muted)] mb-1">
                  {t('auth.emailOrPhone')}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[var(--ink-muted)]">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  <input
                    type="text"
                    value={emailOrPhone}
                    onChange={(e) => setEmailOrPhone(e.target.value)}
                    placeholder={t('auth.emailOrPhonePlaceholder')}
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-[12px] bg-[var(--surface)] border border-[var(--border)] text-[var(--ink)] placeholder-[var(--ink-muted)]/50 focus:outline-hidden focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/35 text-xs sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--ink-muted)] mb-1">
                  {t('auth.password')}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[var(--ink-muted)]">
                    <Lock className="w-3.5 h-3.5" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t('auth.passwordPlaceholder')}
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-[12px] bg-[var(--surface)] border border-[var(--border)] text-[var(--ink)] placeholder-[var(--ink-muted)]/50 focus:outline-hidden focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/35 text-xs sm:text-sm"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full py-3 text-xs sm:text-sm cursor-pointer disabled:opacity-50 mt-1 font-semibold rounded-full shadow-xs"
              >
                {loading ? t('auth.pleaseWait') : isSignUp ? t('auth.submitSignUp') : t('auth.submitSignIn')}
              </button>
            </form>

            {/* Toggle */}
            <div className="mt-5 text-center text-xs text-[var(--ink-muted)]">
              {isSignUp ? (
                <>
                  {t('auth.haveAccount')}{' '}
                  <button
                    onClick={() => {
                      setIsSignUp(false);
                      setErrorMsg(null);
                    }}
                    className="text-[var(--primary)] hover:text-[var(--primary-hover)] font-semibold cursor-pointer underline"
                  >
                    {t('auth.signInLink')}
                  </button>
                </>
              ) : (
                <>
                  {t('auth.noAccount')}{' '}
                  <button
                    onClick={() => {
                      setIsSignUp(true);
                      setErrorMsg(null);
                    }}
                    className="text-[var(--primary)] hover:text-[var(--primary-hover)] font-semibold cursor-pointer underline"
                  >
                    {t('auth.signUpLink')}
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
