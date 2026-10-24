import React from 'react';
import { beginnerTipsData } from '@/lib/siteData';

export function BeginnerTipsSection() {
  return (
    <section id="tips" className="py-16 lg:py-24 bg-[#0d0b17] border-b border-[#2d2750]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-[clamp(1.75rem,3vw,2.25rem)] font-bold text-[#ecebf5] tracking-tight">
            Yeni Başlayanlara 6 Əsas Tövsiyə
          </h2>
          <p className="text-sm sm:text-base text-[#9893b8] mt-2">
            İlk oyunlarda düzgün vərdişlər qazanmaq üçün bu sadə prinsipləri yadda saxlayın.
          </p>
        </div>

        {/* Varied Layout: 2-column clean numbered list with hairline borders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 max-w-4xl mx-auto">
          {beginnerTipsData.map((tip) => (
            <div
              key={tip.number}
              className="pb-6 border-b border-[#2d2750]/70 flex items-start gap-4"
            >
              <span className="text-base font-bold text-[#7c5cff] shrink-0 font-mono mt-0.5">
                {tip.number}.
              </span>
              <div>
                <h3 className="text-base font-bold text-[#ecebf5] mb-1.5">
                  {tip.title}
                </h3>
                <p className="text-sm text-[#9893b8] leading-relaxed">
                  {tip.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
