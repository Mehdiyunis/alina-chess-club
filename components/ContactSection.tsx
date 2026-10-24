'use client';

import React, { useState } from 'react';
import { submitContactRequest } from '@/lib/supabase/actions';
import { Mail, Phone, CheckCircle2, AlertCircle } from 'lucide-react';

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
      setErrorMessage('Zəhmət olmasa əlaqə vasitənizi daxil edin.');
      return;
    }

    if (contactType === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmed)) {
        setErrorMessage('Düzgün e-poçt ünvanı daxil edin (nümunə: ad@example.com).');
        return;
      }
    } else {
      const digitsOnly = trimmed.replace(/\D/g, '');
      if (digitsOnly.length < 7) {
        setErrorMessage('Düzgün telefon nömrəsi daxil edin (nümunə: 050 123 45 67).');
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
      setErrorMessage(result.error || 'Müraciət göndərilərkən xəta baş verdi. Zəhmət olmasa bir qədər sonra yenidən yoxlayın.');
    }
  };

  return (
    <section id="contact" className="py-16 lg:py-24 bg-[#121024] border-b border-[#2d2750]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-[clamp(1.75rem,3vw,2.25rem)] font-bold text-[#ecebf5] tracking-tight">
            Şahmat Dərslərinə Qeydiyyat
          </h2>
          <p className="text-sm sm:text-base text-[#9893b8] mt-2">
            Telefon nömrənizi və ya e-poçtunuzu qeyd edin, məşqçilərimiz sizinlə əlaqə saxlasın.
          </p>
        </div>

        <div className="card-flat p-6 sm:p-8 max-w-xl mx-auto">
          {isSuccess ? (
            <div className="text-center py-6 space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#ecebf5]">Müraciətiniz qəbul edildi</h3>
              <p className="text-xs sm:text-sm text-[#9893b8] max-w-sm mx-auto leading-relaxed">
                Təlimçilərimiz ən qısa zamanda sizinlə əlaqə saxlayacaq.
              </p>
              <button
                onClick={() => setIsSuccess(false)}
                className="btn-secondary px-4 py-2 text-xs mt-2"
              >
                Yeni müraciət göndər
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Type Switcher */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#9893b8] mb-2">
                  Əlaqə növü
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setContactType('phone');
                      setErrorMessage(null);
                    }}
                    className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-[10px] text-xs font-semibold transition-colors cursor-pointer ${
                      contactType === 'phone'
                        ? 'bg-[#7c5cff] text-white'
                        : 'bg-[#211c3a] text-[#9893b8] hover:text-[#ecebf5] border border-[#2d2750]'
                    }`}
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Telefon</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setContactType('email');
                      setErrorMessage(null);
                    }}
                    className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-[10px] text-xs font-semibold transition-colors cursor-pointer ${
                      contactType === 'email'
                        ? 'bg-[#7c5cff] text-white'
                        : 'bg-[#211c3a] text-[#9893b8] hover:text-[#ecebf5] border border-[#2d2750]'
                    }`}
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>E-poçt</span>
                  </button>
                </div>
              </div>

              {/* Input */}
              <div>
                <label htmlFor="contact-input" className="block text-xs font-semibold uppercase tracking-wider text-[#9893b8] mb-1.5">
                  {contactType === 'phone' ? 'Telefon nömrəsi' : 'E-poçt ünvanı'}
                </label>
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
                      ? '050 123 45 67'
                      : 'ad@example.com'
                  }
                  className="w-full px-3.5 py-2.5 rounded-[10px] bg-[#0d0b17] border border-[#2d2750] text-[#ecebf5] placeholder-[#9893b8]/50 focus:outline-hidden focus:border-[#7c5cff] text-sm"
                />

                {errorMessage && (
                  <div className="mt-2 flex items-center gap-1.5 text-rose-400 text-xs">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full py-3 text-sm cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? 'Göndərilir...' : 'Müraciəti göndər'}
              </button>

              <p className="text-center text-[11px] text-[#9893b8]">
                Məlumatlarınız məxfi saxlanılır və yalnız dərslərlə bağlı əlaqə üçün istifadə olunur.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
