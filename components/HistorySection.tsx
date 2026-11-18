'use client';

import { ScrollReveal } from './ScrollReveal';
import { useLanguage } from './LanguageProvider';

export function HistorySection() {
  const { t, dict } = useLanguage();

  const paragraphs: string[] = dict.history?.paragraphs || [];
  const grandmasters: Array<{ name: string; title: string }> =
    dict.history?.grandmasters || [];

  return (
    <section id="history" className="py-16 lg:py-24 bg-[var(--bg)] border-b border-[var(--border)]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Narrative */}
          <ScrollReveal direction="left" className="lg:col-span-7 space-y-5">
            <h2 className="font-serif text-[clamp(2rem,3.5vw,2.5rem)] font-normal text-[var(--ink)] tracking-tight leading-[1.1]">
              {t('history.title')}
            </h2>

            <p className="font-serif text-base sm:text-lg text-[var(--terracotta-text)] font-normal leading-relaxed">
              {t('history.lead')}
            </p>

            <div className="space-y-3.5 text-[var(--ink-muted)] text-sm leading-relaxed">
              {paragraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>

            {/* Factual Information Strip */}
            <div className="pt-4 border-t border-[var(--border)] grid grid-cols-2 gap-4">
              <div className="bg-[var(--surface)] rounded-[18px] border border-[var(--border)] p-4 sm:p-5 shadow-[0_1px_2px_rgba(30,42,34,0.06)]">
                <span className="font-serif text-2xl font-normal text-[var(--ink)] block">
                  {t('history.stat1Value')}
                </span>
                <span className="text-xs text-[var(--ink-muted)] mt-1 block leading-relaxed">
                  {t('history.stat1Desc')}
                </span>
              </div>

              <div className="bg-[var(--surface)] rounded-[18px] border border-[var(--border)] p-4 sm:p-5 shadow-[0_1px_2px_rgba(30,42,34,0.06)]">
                <span className="font-serif text-xl sm:text-2xl font-normal text-[var(--ink)] block">
                  {t('history.stat2Value')}
                </span>
                <span className="text-xs text-[var(--ink-muted)] mt-1 block leading-relaxed">
                  {t('history.stat2Desc')}
                </span>
              </div>
            </div>
          </ScrollReveal>

          {/* Right: Grandmasters List */}
          <ScrollReveal direction="right" className="lg:col-span-5 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--terracotta-text)] block mb-2">
              {t('history.gmTitle')}
            </span>

            {grandmasters.map((gm, idx) => (
              <div
                key={idx}
                className="bg-[var(--surface)] rounded-[18px] border border-[var(--border)] p-4.5 flex items-start gap-4 shadow-[0_1px_2px_rgba(30,42,34,0.06)]"
              >
                <span className="w-8 h-8 rounded-full bg-[var(--sage-100)] border border-[var(--border)] text-[var(--primary)] font-bold text-xs flex items-center justify-center shrink-0 font-mono">
                  0{idx + 1}
                </span>
                <div>
                  <h3 className="font-serif text-base font-normal text-[var(--ink)]">{gm.name}</h3>
                  <p className="text-xs text-[var(--ink-muted)] mt-0.5 leading-relaxed">{gm.title}</p>
                </div>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
