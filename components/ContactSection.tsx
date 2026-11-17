'use client';

import React, { useState } from 'react';
import { Mail, Phone, CheckCircle2, AlertCircle } from 'lucide-react';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';
import { ScrollReveal } from './ScrollReveal';
import { useLanguage } from './LanguageProvider';

export function ContactSection() {
  const { t } = useLanguage();
  const [contactType, setContactType] = useState<'phone' | 'email'>('phone');
  const [value, setValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const trimmed = value.trim();
    if (!trimmed) {
      setErrorMessage(
        contactType === 'phone'
          ? t('contact.errorEmptyPhone')
          : t('contact.errorEmptyEmail')
      );
      return;
    }

    if (trimmed.length > 120) {
      setErrorMessage(
        contactType === 'phone'
          ? t('contact.errorInvalidPhone')
          : t('contact.errorInvalidEmail')
      );
      return;
    }

    if (contactType === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setErrorMessage(t('contact.errorInvalidEmail'));
      return;
    }

    if (contactType === 'phone' && !/^[+0-9()\s-]{7,20}$/.test(trimmed)) {
      setErrorMessage(t('contact.errorInvalidPhone'));
      return;
    }

    setIsSubmitting(true);

    if (isSupabaseConfigured()) {
      try {
        const supabase = createClient();
        const { error } = await supabase.from('contact_requests').insert({
          value: trimmed,
          type: contactType,
          status: 'new',
        });

        if (error) {
          console.warn('Contact request insert error:', error.message);
        }
      } catch (err) {
        console.warn('Contact submit exception:', err);
      }
    }

    setIsSubmitting(false);
    setIsSuccess(true);
    setValue('');
  };

  return (
    <section id="contact" className="py-16 lg:py-24 bg-[#EFE9DB] border-b border-[#E3DCCB]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <ScrollReveal direction="left" className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="font-serif text-[clamp(2rem,3.5vw,2.5rem)] font-normal text-[#1E2A22] tracking-tight leading-[1.1]">
            {t('contact.title')}
          </h2>
          <p className="text-sm sm:text-base text-[#5E6B62] mt-2">
            {t('contact.subtitle')}
          </p>
        </ScrollReveal>

        <ScrollReveal direction="right" className="bg-[#FFFFFF] rounded-[18px] border border-[#E3DCCB] p-6 sm:p-8 max-w-xl mx-auto shadow-[0_1px_2px_rgba(30,42,34,0.06)]">
          {isSuccess ? (
            <div className="text-center py-6 space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#E4EBD9] border border-[#2F5D46]/30 text-[#2F5D46] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-normal text-[#1E2A22]">
                {t('contact.successTitle')}
              </h3>
              <p className="text-xs sm:text-sm text-[#5E6B62] max-w-sm mx-auto leading-relaxed">
                {t('contact.successDesc')}
              </p>
              <button
                onClick={() => setIsSuccess(false)}
                className="btn-secondary-cream px-5 py-2 text-xs mt-2"
              >
                {t('contact.newRequest')}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Type Switcher */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#5E6B62] mb-2">
                  {t('contact.contactType')}
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
                        ? 'bg-[#2F5D46] text-[#F7F3EA] shadow-xs'
                        : 'bg-[#EFE9DB] text-[#5E6B62] hover:text-[#1E2A22] border border-[#E3DCCB]'
                    }`}
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>{t('contact.phone')}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setContactType('email');
                      setErrorMessage(null);
                    }}
                    className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                      contactType === 'email'
                        ? 'bg-[#2F5D46] text-[#F7F3EA] shadow-xs'
                        : 'bg-[#EFE9DB] text-[#5E6B62] hover:text-[#1E2A22] border border-[#E3DCCB]'
                    }`}
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>{t('contact.email')}</span>
                  </button>
                </div>
              </div>

              {/* Input */}
              <div>
                <label htmlFor="contact-input" className="block text-xs font-semibold uppercase tracking-wider text-[#5E6B62] mb-1.5">
                  {contactType === 'phone' ? t('contact.phoneLabel') : t('contact.emailLabel')}
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
                      ? t('contact.phonePlaceholder')
                      : t('contact.emailPlaceholder')
                  }
                  className="w-full px-3.5 py-2.5 rounded-[12px] bg-[#FFFFFF] border border-[#E3DCCB] text-[#1E2A22] placeholder-[#5E6B62]/60 focus:outline-hidden focus:border-[#2F5D46] focus:ring-2 focus:ring-[#2F5D46]/35 text-sm"
                />

                {errorMessage && (
                  <div className="mt-2 flex items-center gap-1.5 text-[#B3261E] text-xs">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full py-3 text-sm cursor-pointer disabled:opacity-50 font-semibold shadow-xs"
              >
                {isSubmitting ? t('contact.submitting') : t('contact.submit')}
              </button>

              <p className="text-center text-[11px] text-[#5E6B62]">
                {t('contact.disclaimer')}
              </p>
            </form>
          )}
        </ScrollReveal>
      </div>
    </section>
  );
}
