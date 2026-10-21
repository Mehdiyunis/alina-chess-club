'use client';

import React, { useState } from 'react';
import { submitContactRequest } from '@/lib/supabase/actions';
import { Mail, Phone, Send, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';

export function ContactSection() {
  const [value, setValue] = useState('');
  const [contactType, setContactType] = useState<'phone' | 'email'>('phone');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const trimmed = value.trim();
    if (!trimmed) {
      setErrorMessage('Zəhmət olmasa, əlaqə vasitənizi qeyd edin.');
      return;
    }

    if (contactType === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmed)) {
        setErrorMessage('Düzgün bir e-poçt ünvanı daxil edin (məs: ad@example.com).');
        return;
      }
    } else {
      // Basic phone check
      const digitsOnly = trimmed.replace(/\D/g, '');
      if (digitsOnly.length < 7) {
        setErrorMessage('Zəhmət olmasa, düzgün telefon nömrəsi daxil edin (məs: 050 123 45 67).');
        return;
      }
    }

    setIsSubmitting(true);
    const result = await submitContactRequest(trimmed, contactType);
    setIsSubmitting(false);

    if (result.success) {
      setIsSuccess(true);
      setValue('');
    } else {
      setErrorMessage(result.error || 'Xəta baş verdi. Zəhmət olmasa bir az sonra yenidən cəhd edin.');
    }
  };

  return (
    <section id="contact" className="py-20 relative bg-[#121024] border-t border-[#2d2750]/50 overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute -bottom-20 right-1/4 w-96 h-96 bg-[#7c5cff]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#7c5cff]/10 border border-[#7c5cff]/20 text-[#9a82ff] text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Bizə Qoşulun
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#ecebf5] tracking-tight">
            Şahmat Dərslərinə İndi Yazılın
          </h2>
          <p className="mt-3 text-[#9893b8] text-base sm:text-lg">
            Telefon nömrənizi və ya e-poçtunuzu qeyd edin, müəllimlərimiz ən qısa zamanda sizinlə əlaqə saxlasın.
          </p>
        </div>

        <div className="bg-[#171428] border border-[#2d2750] rounded-3xl p-6 sm:p-10 shadow-2xl relative">
          {isSuccess ? (
            <div className="text-center py-10 space-y-4 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-[#ecebf5]">Təşəkkür edirik!</h3>
              <p className="text-[#9893b8] max-w-md mx-auto text-sm sm:text-base">
                Müraciətiniz uğurla qəbul edildi. Tezliklə təlimçilərimiz sizinlə əlaqə saxlayacaq.
              </p>
              <button
                onClick={() => setIsSuccess(false)}
                className="mt-4 px-6 py-2.5 rounded-xl bg-[#211c3a] text-[#ecebf5] hover:bg-[#2d2750] text-sm font-medium transition-colors cursor-pointer"
              >
                Yeni müraciət göndər
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Type Switcher */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#9893b8] mb-3">
                  Əlaqə Növünü Seçin
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setContactType('phone');
                      setErrorMessage(null);
                    }}
                    className={`flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
                      contactType === 'phone'
                        ? 'bg-[#7c5cff] text-white shadow-lg shadow-[#7c5cff]/20 border border-[#9a82ff]/50'
                        : 'bg-[#211c3a] text-[#9893b8] hover:text-[#ecebf5] border border-[#2d2750]'
                    }`}
                  >
                    <Phone className="w-4 h-4" />
                    <span>Telefon ilə</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setContactType('email');
                      setErrorMessage(null);
                    }}
                    className={`flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
                      contactType === 'email'
                        ? 'bg-[#7c5cff] text-white shadow-lg shadow-[#7c5cff]/20 border border-[#9a82ff]/50'
                        : 'bg-[#211c3a] text-[#9893b8] hover:text-[#ecebf5] border border-[#2d2750]'
                    }`}
                  >
                    <Mail className="w-4 h-4" />
                    <span>E-poçt ilə</span>
                  </button>
                </div>
              </div>

              {/* Input Field */}
              <div>
                <label htmlFor="contact-input" className="block text-xs font-semibold uppercase tracking-wider text-[#9893b8] mb-2">
                  {contactType === 'phone' ? 'Telefon Nömrəniz' : 'E-poçt Ünvanınız'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#9893b8]">
                    {contactType === 'phone' ? (
                      <Phone className="w-4 h-4" />
                    ) : (
                      <Mail className="w-4 h-4" />
                    )}
                  </div>
                  <input
                    id="contact-input"
                    type={contactType === 'phone' ? 'tel' : 'email'}
                    value={value}
                    onChange={(e) => {
                      setValue(e.target.value);
                      if (errorMessage) setErrorMessage(null);
                    }}
                    placeholder={
                      contactType === 'phone'
                        ? '+994 50 123 45 67'
                        : 'numune@domain.com'
                    }
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-[#0d0b17] border border-[#2d2750] text-[#ecebf5] placeholder-[#9893b8]/50 focus:outline-none focus:border-[#7c5cff] focus:ring-2 focus:ring-[#7c5cff]/30 text-sm transition-all"
                  />
                </div>

                {errorMessage && (
                  <div className="mt-2.5 flex items-center gap-2 text-rose-400 text-xs animate-shake">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#7c5cff] to-[#6340f0] hover:from-[#9a82ff] hover:to-[#7c5cff] text-white font-bold text-base shadow-lg shadow-[#7c5cff]/25 hover:shadow-xl hover:shadow-[#7c5cff]/35 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Göndərilir...
                  </span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Müraciət Göndər</span>
                  </>
                )}
              </button>

              <p className="text-center text-xs text-[#9893b8]/80">
                Məlumatlarınız tamamilə məxfi saxlanılır və üçüncü şəxslərə ötürülmür.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
