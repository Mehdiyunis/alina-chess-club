'use client';

import React, { useState } from 'react';
import { specialMovesData } from '@/lib/siteData';
import { ChessPieceSvg } from './ChessPieceSvg';
import { ScrollReveal } from './ScrollReveal';
import { useLanguage } from './LanguageProvider';

export const SpecialMovesSection: React.FC = () => {
  const { t, dict } = useLanguage();
  const [selectedId, setSelectedId] = useState<'castling' | 'promotion' | 'enpassant'>('castling');
  const [step, setStep] = useState<'before' | 'after'>('after');

  const moveDemos: Record<
    string,
    {
      before: Record<string, { type: 'p' | 'n' | 'b' | 'r' | 'q' | 'k'; color: 'w' | 'b' }>;
      after: Record<string, { type: 'p' | 'n' | 'b' | 'r' | 'q' | 'k'; color: 'w' | 'b' }>;
      highlightFrom?: string;
      highlightTo?: string;
    }
  > = {
    castling: {
      before: {
        e1: { type: 'k', color: 'w' },
        h1: { type: 'r', color: 'w' },
        a1: { type: 'r', color: 'w' },
        e8: { type: 'k', color: 'b' },
      },
      after: {
        g1: { type: 'k', color: 'w' },
        f1: { type: 'r', color: 'w' },
        a1: { type: 'r', color: 'w' },
        e8: { type: 'k', color: 'b' },
      },
      highlightFrom: 'e1',
      highlightTo: 'g1',
    },
    promotion: {
      before: {
        e7: { type: 'p', color: 'w' },
        a8: { type: 'k', color: 'b' },
        h1: { type: 'k', color: 'w' },
      },
      after: {
        e8: { type: 'q', color: 'w' },
        a8: { type: 'k', color: 'b' },
        h1: { type: 'k', color: 'w' },
      },
      highlightFrom: 'e7',
      highlightTo: 'e8',
    },
    enpassant: {
      before: {
        e5: { type: 'p', color: 'w' },
        d7: { type: 'p', color: 'b' },
        e1: { type: 'k', color: 'w' },
        e8: { type: 'k', color: 'b' },
      },
      after: {
        d6: { type: 'p', color: 'w' },
        e1: { type: 'k', color: 'w' },
        e8: { type: 'k', color: 'b' },
      },
      highlightFrom: 'e5',
      highlightTo: 'd6',
    },
  };

  const demo = moveDemos[selectedId] || moveDemos.castling;
  const boardPieces = step === 'before' ? demo.before : demo.after;

  const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];
  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

  const rulesList: string[] =
    (dict.specialMoves?.items as any)?.[selectedId]?.rules || [];

  return (
    <section id="rules" className="py-16 lg:py-24 bg-[var(--bg-alt)] border-b border-[var(--border)]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <ScrollReveal direction="up" className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="font-serif text-[clamp(2rem,3.5vw,2.5rem)] font-normal text-[var(--ink)] tracking-tight leading-[1.1]">
            {t('specialMoves.title')}
          </h2>
          <p className="text-sm sm:text-base text-[var(--ink-muted)] mt-2">
            {t('specialMoves.subtitle')}
          </p>
        </ScrollReveal>

        {/* Tab Selection (Functional Segmented Buttons) */}
        <ScrollReveal direction="up" delay={0.1} className="flex flex-wrap justify-center gap-2 mb-10">
          {specialMovesData.map((item) => {
            const isSelected = item.id === selectedId;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setSelectedId(item.id as any);
                  setStep('after');
                }}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[var(--primary-bg)] text-[var(--on-primary)] shadow-xs'
                    : 'bg-[var(--surface)] text-[var(--ink-muted)] hover:text-[var(--ink)] border border-[var(--border)]'
                }`}
              >
                {t(`specialMoves.items.${item.id}.title`)}
              </button>
            );
          })}
        </ScrollReveal>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-4xl mx-auto">
          {/* Left: Explanation & Rules */}
          <ScrollReveal direction="left" className="lg:col-span-7 space-y-4">
            <div className="bg-[var(--surface)] rounded-[18px] border border-[var(--border)] p-6 sm:p-7 space-y-3 shadow-[0_1px_2px_rgba(30,42,34,0.06)]">
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--terracotta-text)]">
                {t(`specialMoves.items.${selectedId}.subtitle`)}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[var(--ink)]">
                {t(`specialMoves.items.${selectedId}.title`)}
              </h3>
              <p className="text-sm text-[var(--ink-muted)] leading-relaxed">
                {t(`specialMoves.items.${selectedId}.description`)}
              </p>

              <div className="pt-3 border-t border-[var(--border)] space-y-2">
                <span className="text-xs font-bold text-[var(--ink)] block">
                  {t('specialMoves.mainConditions')}
                </span>
                <ul className="space-y-1.5 text-xs text-[var(--ink-muted)]">
                  {rulesList.map((rule, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[var(--terracotta-text)] font-bold">·</span>
                      <span className="leading-relaxed">{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollReveal>

          {/* Right: Interactive Mini Board */}
          <ScrollReveal direction="right" className="lg:col-span-5 flex flex-col items-center">
            <div className="bg-[var(--surface)] rounded-[18px] border border-[var(--border)] p-4 sm:p-5 w-full max-w-sm shadow-[0_1px_2px_rgba(30,42,34,0.06)]">
              <div className="flex items-center justify-between mb-3 px-1">
                <span className="font-serif text-sm font-medium text-[var(--ink)]">
                  {t('specialMoves.demo')}
                </span>
                <div className="inline-flex rounded-full bg-[var(--bg-alt)] p-1 border border-[var(--border)]">
                  <button
                    onClick={() => setStep('before')}
                    className={`px-3 py-1 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                      step === 'before'
                        ? 'bg-[var(--primary-bg)] text-[var(--on-primary)] shadow-xs'
                        : 'text-[var(--ink-muted)] hover:text-[var(--ink)]'
                    }`}
                  >
                    {t('specialMoves.before')}
                  </button>
                  <button
                    onClick={() => setStep('after')}
                    className={`px-3 py-1 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                      step === 'after'
                        ? 'bg-[var(--primary-bg)] text-[var(--on-primary)] shadow-xs'
                        : 'text-[var(--ink-muted)] hover:text-[var(--ink)]'
                    }`}
                  >
                    {t('specialMoves.after')}
                  </button>
                </div>
              </div>

              {/* Board */}
              <div className="aspect-square w-full rounded-[12px] overflow-hidden border border-[var(--border)] grid grid-cols-8 grid-rows-8 shadow-xs">
                {ranks.map((rank, rankIdx) =>
                  files.map((file, fileIdx) => {
                    const square = `${file}${rank}`;
                    const isLight = (rankIdx + fileIdx) % 2 === 0;
                    const piece = boardPieces[square];
                    const isHighlighted =
                      (step === 'after' && (square === demo.highlightFrom || square === demo.highlightTo)) ||
                      (step === 'before' && square === demo.highlightFrom);

                    return (
                      <div
                        key={square}
                        className={`relative flex items-center justify-center ${
                          isLight ? 'bg-[#EEEED2]' : 'bg-[#769656]'
                        } ${isHighlighted ? 'ring-3 ring-inset ring-[rgba(217,119,74,0.45)] bg-[rgba(217,119,74,0.35)]' : ''}`}
                      >
                        {piece && (
                          <div className="w-[84%] h-[84%] drop-shadow-xs">
                            <ChessPieceSvg type={piece.type} color={piece.color} />
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>

              {/* Step indicator caption */}
              <p className="mt-3 text-xs text-[var(--ink-muted)] px-1">
                {t(`specialMoves.items.${selectedId}.stepDesc`)}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
