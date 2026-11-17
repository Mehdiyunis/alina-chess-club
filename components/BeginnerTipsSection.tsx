'use client';

import { ScrollReveal } from './ScrollReveal';
import { useLanguage } from './LanguageProvider';

export function BeginnerTipsSection() {
  const { t, dict } = useLanguage();
  const tips = dict.tips?.items || [];

  return (
    <section id="tips" className="py-16 lg:py-24 bg-[#F7F3EA] border-b border-[#E3DCCB]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <ScrollReveal direction="up" className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-serif text-[clamp(2rem,3.5vw,2.5rem)] font-normal text-[#1E2A22] tracking-tight leading-[1.1]">
            {t('tips.title')}
          </h2>
          <p className="text-sm sm:text-base text-[#5E6B62] mt-2">
            {t('tips.subtitle')}
          </p>
        </ScrollReveal>

        {/* 2-column clean numbered list with hairline dividers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 max-w-4xl mx-auto">
          {tips.map((tip, idx) => (
            <ScrollReveal
              key={tip.number || idx}
              direction={idx % 2 === 0 ? 'left' : 'right'}
              delay={Math.floor(idx / 2) * 0.1}
              className="pb-6 border-b border-[#E3DCCB] flex items-start gap-4"
            >
              <span className="text-lg font-serif font-bold text-[#B4532A] shrink-0 mt-0.5">
                {tip.number}.
              </span>
              <div>
                <h3 className="font-serif text-lg font-normal text-[#1E2A22] mb-1.5">
                  {tip.title}
                </h3>
                <p className="text-sm text-[#5E6B62] leading-relaxed">
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
