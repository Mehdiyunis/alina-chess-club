import React from 'react';
import { beginnerTipsData } from '@/lib/siteData';
import { ScrollReveal } from './ScrollReveal';

export function BeginnerTipsSection() {
  return (
    <section id="tips" className="py-16 lg:py-24 bg-[#2b1d0e] border-b border-[rgba(243,236,225,0.10)]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <ScrollReveal direction="up" className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-serif text-[clamp(2rem,3.5vw,2.5rem)] font-normal text-[#f3ece1] tracking-tight leading-[1.1]">
            Yeni Başlayanlara 6 Əsas Tövsiyə
          </h2>
          <p className="text-sm sm:text-base text-[#d9c7a6] mt-2">
            İlk oyunlarda düzgün vərdişlər qazanmaq üçün bu sadə prinsipləri yadda saxlayın.
          </p>
        </ScrollReveal>

        {/* 2-column clean numbered list with hairline dividers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 max-w-4xl mx-auto">
          {beginnerTipsData.map((tip, idx) => (
            <ScrollReveal
              key={tip.number}
              direction={idx % 2 === 0 ? 'left' : 'right'}
              delay={Math.floor(idx / 2) * 0.1}
              className="pb-6 border-b border-[rgba(243,236,225,0.10)] flex items-start gap-4"
            >
              <span className="text-lg font-bold text-[#e9cfa0] shrink-0 font-mono mt-0.5">
                {tip.number}.
              </span>
              <div>
                <h3 className="font-serif text-lg font-normal text-[#f3ece1] mb-1.5">
                  {tip.title}
                </h3>
                <p className="text-sm text-[#d9c7a6] leading-relaxed">
                  {tip.text}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
