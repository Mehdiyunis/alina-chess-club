'use client';

import React, { useState } from 'react';
import { faqData } from '@/lib/siteData';
import { ChevronDown } from 'lucide-react';

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 lg:py-24 bg-[#121024] border-b border-[#2d2750]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-[clamp(1.75rem,3vw,2.25rem)] font-bold text-[#ecebf5] tracking-tight">
            Tez-tez Verilən Suallar
          </h2>
          <p className="text-sm sm:text-base text-[#9893b8] mt-2">
            Valideynləri və yeni başlayanları ən çox maraqlandıran suallara qısa cavablar.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqData.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="card-flat overflow-hidden"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full py-4 px-5 text-left flex items-center justify-between gap-4 cursor-pointer focus-visible:outline-hidden"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-semibold text-[#ecebf5]">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#9893b8] shrink-0 transition-transform duration-150 ${
                      isOpen ? 'rotate-180 text-[#7c5cff]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-[#9893b8] text-sm leading-relaxed border-t border-[#2d2750]/60">
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
