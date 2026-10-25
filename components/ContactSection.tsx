'use client';

import React, { useState } from 'react';
import { submitContactRequest } from '@/lib/supabase/actions';
import { Mail, Phone, CheckCircle2, AlertCircle } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

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
    <section id="contact" className="py-16 lg:py-24 bg-[#efe9e0] border-b border-[rgba(26,19,12,0.10)]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <ScrollReveal direction="left" className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="font-serif text-[clamp(2rem,3.5vw,2.5rem)] font-normal text-[#1a130c] tracking-tight leading-[1.1]">
            Şahmat Dərslərinə Qeydiyyat
          </h2>
          <p className="text-sm sm:text-base text-[#7a736b] mt-2">
            Telefon nömrənizi və ya e-poçtunuzu qeyd edin, məşqçilərimiz sizinlə əlaqə saxlasın.
          </p>
        </ScrollReveal>

        <ScrollReveal direction="right" className="bg-[#ffffff] rounded-[18px] border border-[rgba(26,19,12,0.10)] p-6 sm:p-8 max-w-xl mx-auto shadow-md">
          {isSuccess ? (
            <div className="text-center py-6 space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-normal text-[#1a130c]">Müraciətiniz qəbul edildi</h3>
              <p className="text-xs sm:text-sm text-[#7a736b] max-w-sm mx-auto leading-relaxed">
                Təlimçilərimiz ən qısa zamanda sizinlə əlaqə saxlayacaq.
              </p>
              <button
                onClick={() => setIsSuccess(false)}
                className="btn-secondary-cream px-5 py-2 text-xs mt-2"
              >
                Yeni müraciət göndər
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Type Switcher */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#7a736b] mb-2">
                  Əlaqə növü
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setContactType('phone');
                      setErrorMessage(null);
                    }}
                    className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                      contactType === 'phone'
                        ? 'bg-[#8c6747] text-white shadow-xs'
                        : 'bg-[#f4efe6] text-[#7a736b] hover:text-[#1a130c] border border-[rgba(26,19,12,0.08)]'
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
                    className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                      contactType === 'email'
                        ? 'bg-[#8c6747] text-white shadow-xs'
                        : 'bg-[#f4efe6] text-[#7a736b] hover:text-[#1a130c] border border-[rgba(26,19,12,0.08)]'
                    }`}
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>E-poçt</span>
                  </button>
                </div>
              </div>

              {/* Input: radius 12px */}
              <div>
                <label htmlFor="contact-input" className="block text-xs font-semibold uppercase tracking-wider text-[#7a736b] mb-1.5">
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
                  className="w-full px-3.5 py-2.5 rounded-[12px] bg-[#fbf9f5] border border-[rgba(26,19,12,0.15)] text-[#1a130c] placeholder-[#7a736b]/60 focus:outline-hidden focus:border-[#8c6747] text-sm"
                />

                {errorMessage && (
                  <div className="mt-2 flex items-center gap-1.5 text-rose-600 text-xs">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}
              </div>

              {/* Submit Button: Sand accent, fully rounded pill */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full py-3 text-sm cursor-pointer disabled:opacity-50 font-semibold shadow-md shadow-[#e9cfa0]/10"
              >
                {isSubmitting ? 'Göndərilir...' : 'Müraciəti göndər'}
              </button>

              <p className="text-center text-[11px] text-[#7a736b]">
                Məlumatlarınız məxfi saxlanılır və yalnız dərslərlə bağlı əlaqə üçün istifadə olunur.
              </p>
            </form>
          )}
        </ScrollReveal>
      </div>
    </section>
  );
}
