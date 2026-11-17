'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { useLanguage } from './LanguageProvider';

export function FaqSection() {
  const { t, dict } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const faqItems = dict.faq?.items || [];

  return (
    <section id="faq" className="py-16 lg:py-24 bg-[#EFE9DB] border-b border-[#E3DCCB]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <ScrollReveal direction="up" className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="font-serif text-[clamp(2rem,3.5vw,2.5rem)] font-normal text-[#1E2A22] tracking-tight leading-[1.1]">
            {t('faq.title')}
          </h2>
          <p className="text-sm sm:text-base text-[#5E6B62] mt-2">
            {t('faq.subtitle')}
          </p>
        </ScrollReveal>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqItems.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <ScrollReveal
                key={idx}
                direction={idx % 2 === 0 ? 'left' : 'right'}
                delay={idx * 0.06}
              >
                <div className="bg-[#FFFFFF] rounded-[18px] border border-[#E3DCCB] overflow-hidden shadow-[0_1px_2px_rgba(30,42,34,0.06)] transition-all">
                  <button
                    onClick={() => toggle(idx)}
                    className="w-full py-4.5 px-6 text-left flex items-center justify-between gap-4 cursor-pointer focus-visible:outline-hidden"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm sm:text-base font-medium text-[#1E2A22]">
                      {item.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#5E6B62] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#2F5D46]' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-5 pt-2 text-[#5E6B62] text-sm leading-relaxed border-t border-[#E3DCCB] bg-[#F7F3EA]">
                      {item.answer}
                    </div>
                  )}
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
