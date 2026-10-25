'use client';

import React, { useState } from 'react';
import { gameGoalsData } from '@/lib/siteData';
import { ChessPieceSvg } from './ChessPieceSvg';
import { ScrollReveal } from './ScrollReveal';

export const GameGoalsSection: React.FC = () => {
  const [selectedGoal, setSelectedGoal] = useState(gameGoalsData[1]); // Mat by default

  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];

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
    <section id="goals" className="py-16 lg:py-24 bg-[#2b1d0e] border-b border-[rgba(243,236,225,0.10)]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <ScrollReveal direction="up" className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="font-serif text-[clamp(2rem,3.5vw,2.5rem)] font-normal text-[#f3ece1] tracking-tight leading-[1.1]">
            Oyunun Məqsədi: Şah, Mat və Pat
          </h2>
          <p className="text-sm sm:text-base text-[#d9c7a6] mt-2">
            Şahmatda əsas hədəf rəqibin bütün fiqurlarını vurmaq deyil, rəqib Şahı mat etməkdir.
          </p>
        </ScrollReveal>

        {/* Goal Selector Buttons (Functional Segmented Control) */}
        <ScrollReveal direction="up" delay={0.1} className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {gameGoalsData.map((goal) => {
            const isSelected = selectedGoal.id === goal.id;
            return (
              <button
                key={goal.id}
                onClick={() => setSelectedGoal(goal)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#e9cfa0] text-[#1a130c] shadow-md shadow-[#e9cfa0]/10'
                    : 'bg-[#362513] text-[#d9c7a6] hover:text-[#f3ece1] border border-[rgba(243,236,225,0.10)]'
                }`}
              >
                {goal.title}
              </button>
            );
          })}
        </ScrollReveal>

        {/* Goal Detail Card */}
        <div className="bg-[#362513] rounded-[18px] border border-[rgba(243,236,225,0.10)] p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center max-w-4xl mx-auto shadow-xl">
          {/* Explanation Text */}
          <ScrollReveal direction="left" className="md:col-span-7 space-y-3.5">
            <span className="text-xs font-semibold text-[#e9cfa0] uppercase tracking-wider block">
              {selectedGoal.simpleExplain}
            </span>

            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#f3ece1]">
              {selectedGoal.title}
            </h3>

            <p className="text-sm text-[#d9c7a6] leading-relaxed">
              {selectedGoal.detail}
            </p>

            <div className="p-4 bg-[#24170a] rounded-[14px] border border-[rgba(243,236,225,0.10)] text-xs text-[#f3ece1]">
              {selectedGoal.id === 'mat' && (
                <span>Mat qaydası: Şaha hücum edilib və heç bir müdafiə yolu qalmayıb. Mat edən tərəf qələbə qazanır.</span>
              )}
              {selectedGoal.id === 'shah' && (
                <span>Şah elanı: Şaha birbaşa hücum edildikdə o dərhal xilas edilməlidir. Şah lövhədən götürülmür.</span>
              )}
              {selectedGoal.id === 'pat' && (
                <span>Pat vəziyyəti: Növbəsi çatan oyunçunun qaydalı gedişi yoxdur və Şahı hücum altında deyil. Oyun heç-heçə başa çatır.</span>
              )}
              {selectedGoal.id === 'draw' && (
                <span>Bərabərlik: Mat etmək üçün fiqur sayı çatışmadıqda və ya qarşılıqlı razılıq olduqda oyun heç-heçə sayılır.</span>
              )}
            </div>
          </ScrollReveal>

          {/* Demonstration Board */}
          <ScrollReveal direction="right" className="md:col-span-5 flex flex-col items-center">
            <div className="p-3 bg-[#24170a] rounded-[16px] border border-[rgba(243,236,225,0.12)] shadow-md">
              <div className="grid grid-cols-8 grid-rows-8 w-[240px] h-[240px] sm:w-[260px] sm:h-[260px] border border-[rgba(243,236,225,0.10)] rounded-[10px] overflow-hidden shadow-inner">
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
                          isLight ? 'bg-[#efe7d8]' : 'bg-[#8c6747]'
                        } ${isTarget ? 'ring-2 ring-rose-500 ring-inset bg-rose-500/20' : ''} ${
                          isAttacker ? 'ring-2 ring-[#e9cfa0] ring-inset' : ''
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
            <span className="text-[11px] text-[#d9c7a6] mt-2">
              Nümunə vəziyyət: {selectedGoal.title}
            </span>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
