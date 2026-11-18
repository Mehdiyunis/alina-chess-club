'use client';

import React, { useState } from 'react';
import { gameGoalsData } from '@/lib/siteData';
import { ChessPieceSvg } from './ChessPieceSvg';
import { ScrollReveal } from './ScrollReveal';
import { useLanguage } from './LanguageProvider';

export const GameGoalsSection: React.FC = () => {
  const { t } = useLanguage();
  const [selectedGoalId, setSelectedGoalId] = useState<string>('mat'); // Mat by default

  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];

  const selectedGoal = gameGoalsData.find((g) => g.id === selectedGoalId) || gameGoalsData[1];

  const parseFenSquares = (fen: string) => {
    const boardState: Record<string, { type: 'p' | 'n' | 'b' | 'r' | 'q' | 'k'; color: 'w' | 'b' }> = {};
    const placement = fen.split(' ')[0];
    const fenRanks = placement.split('/');

    fenRanks.forEach((rowStr, rIdx) => {
      const rank = (8 - rIdx).toString();
      let fileIdx = 0;
      for (const char of rowStr) {
        if (/\d/.test(char)) {
          fileIdx += parseInt(char, 10);
        } else {
          const file = files[fileIdx];
          const square = `${file}${rank}`;
          const isWhite = char === char.toUpperCase();
          boardState[square] = {
            type: char.toLowerCase() as any,
            color: isWhite ? 'w' : 'b',
          };
          fileIdx++;
        }
      }
    });

    return boardState;
  };

  const currentBoardPieces = parseFenSquares(selectedGoal.boardFen);

  return (
    <section id="goals" className="py-16 lg:py-24 bg-[var(--bg)] border-b border-[var(--border)]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <ScrollReveal direction="up" className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="font-serif text-[clamp(2rem,3.5vw,2.5rem)] font-normal text-[var(--ink)] tracking-tight leading-[1.1]">
            {t('goals.title')}
          </h2>
          <p className="text-sm sm:text-base text-[var(--ink-muted)] mt-2">
            {t('goals.subtitle')}
          </p>
        </ScrollReveal>

        {/* Goal Selector Buttons (Functional Segmented Control) */}
        <ScrollReveal direction="up" delay={0.1} className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {gameGoalsData.map((goal) => {
            const isSelected = selectedGoal.id === goal.id;
            return (
              <button
                key={goal.id}
                onClick={() => setSelectedGoalId(goal.id)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[var(--primary-bg)] text-[var(--on-primary)] shadow-xs'
                    : 'bg-[var(--surface)] text-[var(--ink-muted)] hover:text-[var(--ink)] border border-[var(--border)]'
                }`}
              >
                {t(`goals.items.${goal.id}.title`)}
              </button>
            );
          })}
        </ScrollReveal>

        {/* Goal Detail Card */}
        <div className="bg-[var(--surface)] rounded-[18px] border border-[var(--border)] p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center max-w-4xl mx-auto shadow-[0_1px_2px_rgba(30,42,34,0.06)]">
          {/* Explanation Text */}
          <ScrollReveal direction="left" className="md:col-span-7 space-y-3.5">
            <span className="text-xs font-semibold text-[var(--terracotta-text)] uppercase tracking-wider block">
              {t(`goals.items.${selectedGoal.id}.simpleExplain`)}
            </span>

            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[var(--ink)]">
              {t(`goals.items.${selectedGoal.id}.title`)}
            </h3>

            <p className="text-sm text-[var(--ink-muted)] leading-relaxed">
              {t(`goals.items.${selectedGoal.id}.detail`)}
            </p>

            <div className="p-4 bg-[var(--sage-100)] rounded-[14px] border border-[var(--border)] text-xs text-[var(--ink)]">
              <span>{t(`goals.items.${selectedGoal.id}.note`)}</span>
            </div>
          </ScrollReveal>

          {/* Demonstration Board */}
          <ScrollReveal direction="right" className="md:col-span-5 flex flex-col items-center">
            <div className="p-3 bg-[var(--bg-alt)] rounded-[16px] border border-[var(--border)] shadow-xs">
              <div className="grid grid-cols-8 grid-rows-8 w-[240px] h-[240px] sm:w-[260px] sm:h-[260px] border border-[var(--border)] rounded-[10px] overflow-hidden shadow-xs">
                {ranks.map((rank, rIdx) =>
                  files.map((file, fIdx) => {
                    const square = `${file}${rank}`;
                    const isLight = (rIdx + fIdx) % 2 === 0;
                    const piece = currentBoardPieces[square];
                    const isTarget = selectedGoal.highlightSquare === square;
                    const isAttacker = selectedGoal.attackerSquare === square;

                    return (
                      <div
                        key={square}
                        className={`relative flex items-center justify-center ${
                          isLight ? 'bg-[#EEEED2]' : 'bg-[#769656]'
                        } ${isTarget ? 'ring-2 ring-rose-500 ring-inset bg-rose-500/20' : ''} ${
                          isAttacker ? 'ring-2 ring-[rgba(217,119,74,0.7)] ring-inset bg-[rgba(217,119,74,0.45)]' : ''
                        }`}
                      >
                        {piece && (
                          <div className="w-[85%] h-[85%] flex items-center justify-center drop-shadow-xs">
                            <ChessPieceSvg type={piece.type} color={piece.color} />
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
            <span className="text-[11px] text-[var(--ink-muted)] mt-2">
              {t('goals.exampleState', { title: t(`goals.items.${selectedGoal.id}.title`) })}
            </span>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
