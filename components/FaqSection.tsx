'use client';

import React, { useState } from 'react';
import { faqData } from '@/lib/siteData';
import { ChevronDown } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 lg:py-24 bg-[#efe9e0] border-b border-[rgba(26,19,12,0.10)]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <ScrollReveal direction="up" className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="font-serif text-[clamp(2rem,3.5vw,2.5rem)] font-normal text-[#1a130c] tracking-tight leading-[1.1]">
            Tez-tez Verilən Suallar
          </h2>
          <p className="text-sm sm:text-base text-[#7a736b] mt-2">
            Valideynləri və yeni başlayanları ən çox maraqlandıran suallara qısa cavablar.
          </p>
        </ScrollReveal>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqData.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <ScrollReveal
                key={idx}
                direction={idx % 2 === 0 ? 'left' : 'right'}
                delay={idx * 0.06}
              >
                <div
                  className="bg-[#ffffff] rounded-[18px] border border-[rgba(26,19,12,0.10)] overflow-hidden shadow-xs transition-all"
                >
                  <button
                    onClick={() => toggle(idx)}
                    className="w-full py-4.5 px-6 text-left flex items-center justify-between gap-4 cursor-pointer focus-visible:outline-hidden"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm sm:text-base font-medium text-[#1a130c]">
                      {item.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#7a736b] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#8c6747]' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-[#7a736b] text-sm leading-relaxed border-t border-[rgba(26,19,12,0.08)] bg-[#fdfbf7]">
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
