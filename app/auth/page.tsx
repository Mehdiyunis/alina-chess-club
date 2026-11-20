'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import {
  Lock,
  Mail,
  User,
  AlertCircle,
  CheckCircle2,
  Eye,
  EyeOff,
  ArrowLeft,
} from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';

export const dynamic = 'force-dynamic';

type View = 'auth' | 'forgot' | 'reset';

const inputClass =
  'w-full pl-9 pr-11 py-2.5 rounded-[12px] bg-[var(--surface)] border border-[var(--border)] text-[var(--ink)] placeholder-[var(--ink-muted)]/50 focus:outline-hidden focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/35 text-xs sm:text-sm';

export default function AuthPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [view, setView] = useState<View>('auth');
  const [isSignUp, setIsSignUp] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Password reset links land on /auth?mode=reset after the code exchange.
  useEffect(() => {
    const mode = new URLSearchParams(window.location.search).get('mode');
    if (mode === 'reset') setView('reset');
  }, []);

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    const emailValue = email.trim();
    if (!emailValue || !emailValue.includes('@')) {
      setErrorMsg(t('auth.errIdentifier'));
      return;
    }

    if (!password || password.length < 6) {
      setErrorMsg(t('auth.errPasswordLength'));
      return;
    }

    if (isSignUp) {
      if (!fullName.trim()) {
        setErrorMsg(t('auth.errFullName'));
        return;
      }
      if (password !== confirmPassword) {
        setErrorMsg(t('auth.errPasswordMismatch'));
        return;
      }
    }

    setLoading(true);

    try {
      if (!isSupabaseConfigured()) {
        setErrorMsg('Supabase konfiqurasiyası tapılmadı. Zəhmət olmasa mühit dəyişənlərini təyin edin.');
        setLoading(false);
        return;
      }
      const supabase = createClient();

      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email: emailValue,
          password,
          options: {
            data: {
              full_name: fullName.trim(),
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
          email: emailValue,
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
    setSuccessMsg(null);
    try {
      if (!isSupabaseConfigured()) {
        setErrorMsg(t('auth.errGoogle'));
        return;
      }
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback?next=/play`,
        },
      });
      if (error) {
        setErrorMsg(error.message || t('auth.errGoogle'));
      }
    } catch {
      setErrorMsg(t('auth.errGoogle'));
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    const email = resetEmail.trim();
    if (!email || !email.includes('@')) {
      setErrorMsg(t('auth.errResetEmailRequired'));
      return;
    }

    setLoading(true);
    try {
      if (!isSupabaseConfigured()) {
        setErrorMsg('Supabase konfiqurasiyası tapılmadı. Zəhmət olmasa mühit dəyişənlərini təyin edin.');
        return;
      }
      const supabase = createClient();
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback?next=/auth?mode=reset`,
      });
      if (error) {
        setErrorMsg(error.message || t('auth.errResetGeneral'));
      } else {
        setSuccessMsg(t('auth.resetEmailSent'));
      }
    } catch {
      setErrorMsg(t('auth.errResetGeneral'));
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!newPassword || newPassword.length < 6) {
      setErrorMsg(t('auth.errPasswordLength'));
      return;
    }

    setLoading(true);
    try {
      if (!isSupabaseConfigured()) {
        setErrorMsg('Supabase konfiqurasiyası tapılmadı. Zəhmət olmasa mühit dəyişənlərini təyin edin.');
        return;
      }
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) {
        setErrorMsg(error.message || t('auth.errResetLink'));
      } else {
        setSuccessMsg(t('auth.passwordUpdated'));
        setTimeout(() => {
          router.push('/play');
        }, 1200);
      }
    } catch {
      setErrorMsg(t('auth.errResetSession'));
    } finally {
      setLoading(false);
    }
  };

  const goToAuth = (signUp: boolean) => {
    setView('auth');
    setIsSignUp(signUp);
    setErrorMsg(null);
    setSuccessMsg(null);
    setConfirmPassword('');
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const isForgot = view === 'forgot';
  const isReset = view === 'reset';

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
                {isForgot
                  ? t('auth.forgotPasswordTitle')
                  : isReset
                    ? t('auth.newPassword')
                    : isSignUp
                      ? t('auth.createAccount')
                      : t('auth.signIn')}
              </h1>
              <p className="text-xs text-[var(--ink-muted)] mt-1.5">
                {isForgot
                  ? t('auth.forgotPasswordSubtitle')
                  : isReset
                    ? t('auth.newPasswordPlaceholder')
                    : isSignUp
                      ? t('auth.signUpSubtitle')
                      : t('auth.signInSubtitle')}
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

            {/* Forgot password */}
            {isForgot ? (
              <form onSubmit={handleForgotPassword} className="space-y-3.5" noValidate>
                <div>
                  <label htmlFor="reset-email" className="block text-xs font-semibold uppercase tracking-wider text-[var(--ink-muted)] mb-1">
                    {t('auth.resetEmail')}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[var(--ink-muted)]">
                      <Mail className="w-3.5 h-3.5" />
                    </div>
                    <input
                      id="reset-email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      placeholder={t('auth.resetEmailPlaceholder')}
                      className={inputClass}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full py-3 text-xs sm:text-sm cursor-pointer disabled:opacity-50 mt-1 font-semibold rounded-full shadow-xs"
                >
                  {loading ? t('auth.pleaseWait') : t('auth.sendResetLink')}
                </button>
              </form>
            ) : isReset ? (
              /* Set new password after following the reset link */
              <form onSubmit={handleResetPassword} className="space-y-3.5" noValidate>
                <div>
                  <label htmlFor="new-password" className="block text-xs font-semibold uppercase tracking-wider text-[var(--ink-muted)] mb-1">
                    {t('auth.newPassword')}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[var(--ink-muted)]">
                      <Lock className="w-3.5 h-3.5" />
                    </div>
                    <input
                      id="new-password"
                      type={showNewPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder={t('auth.newPasswordPlaceholder')}
                      className={inputClass}
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword((v) => !v)}
                      aria-label={showNewPassword ? t('auth.hidePassword') : t('auth.showPassword')}
                      aria-pressed={showNewPassword}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-[var(--ink-muted)] hover:text-[var(--primary)] cursor-pointer"
                    >
                      {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full py-3 text-xs sm:text-sm cursor-pointer disabled:opacity-50 mt-1 font-semibold rounded-full shadow-xs"
                >
                  {loading ? t('auth.pleaseWait') : t('auth.submitSignIn')}
                </button>
              </form>
            ) : (
              <>
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
                    {t('auth.orEmail')}
                  </span>
                  <div className="flex-grow border-t border-[var(--border)]" />
                </div>

                {/* Email Form */}
                <form onSubmit={handleEmailAuth} className="space-y-3.5" noValidate>
                  {isSignUp && (
                    <div>
                      <label htmlFor="full-name" className="block text-xs font-semibold uppercase tracking-wider text-[var(--ink-muted)] mb-1">
                        {t('auth.fullName')}
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[var(--ink-muted)]">
                          <User className="w-3.5 h-3.5" />
                        </div>
                        <input
                          id="full-name"
                          type="text"
                          autoComplete="name"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder={t('auth.fullNamePlaceholder')}
                          className={inputClass}
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-[var(--ink-muted)] mb-1">
                      {t('auth.email')}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[var(--ink-muted)]">
                        <Mail className="w-3.5 h-3.5" />
                      </div>
                      <input
                        id="email"
                        type="email"
                        inputMode="email"
                        autoComplete="username"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t('auth.emailPlaceholder')}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wider text-[var(--ink-muted)] mb-1">
                      {t('auth.password')}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[var(--ink-muted)]">
                        <Lock className="w-3.5 h-3.5" />
                      </div>
                      <input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete={isSignUp ? 'new-password' : 'current-password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder={t('auth.passwordPlaceholder')}
                        className={inputClass}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        aria-label={showPassword ? t('auth.hidePassword') : t('auth.showPassword')}
                        aria-pressed={showPassword}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-[var(--ink-muted)] hover:text-[var(--primary)] cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {!isSignUp && (
                      <div className="text-right mt-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            setView('forgot');
                            setResetEmail(email);
                            setErrorMsg(null);
                            setSuccessMsg(null);
                          }}
                          className="text-[11px] text-[var(--primary)] hover:text-[var(--primary-hover)] font-semibold cursor-pointer underline"
                        >
                          {t('auth.forgotPassword')}
                        </button>
                      </div>
                    )}
                  </div>

                  {isSignUp && (
                    <div>
                      <label htmlFor="confirm-password" className="block text-xs font-semibold uppercase tracking-wider text-[var(--ink-muted)] mb-1">
                        {t('auth.confirmPassword')}
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[var(--ink-muted)]">
                          <Lock className="w-3.5 h-3.5" />
                        </div>
                        <input
                          id="confirm-password"
                          type={showConfirmPassword ? 'text' : 'password'}
                          autoComplete="new-password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder={t('auth.confirmPasswordPlaceholder')}
                          className={inputClass}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword((v) => !v)}
                          aria-label={showConfirmPassword ? t('auth.hidePassword') : t('auth.showPassword')}
                          aria-pressed={showConfirmPassword}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-[var(--ink-muted)] hover:text-[var(--primary)] cursor-pointer"
                        >
                          {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  )}

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
                        type="button"
                        onClick={() => goToAuth(false)}
                        className="text-[var(--primary)] hover:text-[var(--primary-hover)] font-semibold cursor-pointer underline"
                      >
                        {t('auth.signInLink')}
                      </button>
                    </>
                  ) : (
                    <>
                      {t('auth.noAccount')}{' '}
                      <button
                        type="button"
                        onClick={() => goToAuth(true)}
                        className="text-[var(--primary)] hover:text-[var(--primary-hover)] font-semibold cursor-pointer underline"
                      >
                        {t('auth.signUpLink')}
                      </button>
                    </>
                  )}
                </div>
              </>
            )}

            {/* Back link for forgot/reset views */}
            {(isForgot || isReset) && (
              <div className="mt-5 text-center">
                <button
                  type="button"
                  onClick={() => goToAuth(false)}
                  className="inline-flex items-center gap-1.5 text-xs text-[var(--ink-muted)] hover:text-[var(--primary)] font-semibold cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  {t('auth.backToSignIn')}
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
