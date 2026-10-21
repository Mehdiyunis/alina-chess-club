'use client';

import React, { useState } from 'react';
import { faqData } from '@/lib/siteData';
import { ChevronDown, HelpCircle } from 'lucide-react';

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 relative bg-[#121024] border-t border-b border-[#2d2750]/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#7c5cff]/10 border border-[#7c5cff]/20 text-[#9a82ff] text-xs font-semibold uppercase tracking-wider mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            Suallar və Cavablar
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#ecebf5] tracking-tight">
            Tez-tez Verilən Suallar
          </h2>
          <p className="mt-3 text-[#9893b8] text-base sm:text-lg">
            Valideynləri və gənc şahmatçıları ən çox maraqlandıran suallara ətraflı cavablar.
          </p>
        </div>

        <div className="space-y-4">
          {faqData.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-[#171428] border border-[#2d2750] rounded-2xl overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full py-5 px-6 sm:px-7 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-semibold text-[#ecebf5]">
                    {item.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full bg-[#211c3a] border border-[#2d2750] flex items-center justify-center shrink-0 text-[#9a82ff] transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-[#7c5cff] text-white' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 sm:px-7 pb-6 pt-1 text-[#9893b8] text-sm sm:text-base leading-relaxed border-t border-[#2d2750]/50 animate-fadeIn">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
