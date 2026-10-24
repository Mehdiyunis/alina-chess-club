'use client';

import React, { useState } from 'react';
import { gameGoalsData } from '@/lib/siteData';
import { ChessPieceSvg } from './ChessPieceSvg';

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
    <section id="goals" className="py-16 lg:py-24 bg-[#0d0b17] border-b border-[#2d2750]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-[clamp(1.75rem,3vw,2.25rem)] font-bold text-[#ecebf5] tracking-tight">
            Oyunun Məqsədi: Şah, Mat və Pat
          </h2>
          <p className="text-sm sm:text-base text-[#9893b8] mt-2">
            Şahmatda əsas hədəf rəqibin bütün fiqurlarını vurmaq deyil, rəqib Şahı mat etməkdir.
          </p>
        </div>

        {/* Goal Selector Buttons (Functional Segmented Control) */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {gameGoalsData.map((goal) => {
            const isSelected = selectedGoal.id === goal.id;
            return (
              <button
                key={goal.id}
                onClick={() => setSelectedGoal(goal)}
                className={`px-4 py-2 rounded-[10px] text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-[#7c5cff] text-white'
                    : 'bg-[#171428] text-[#9893b8] hover:text-[#ecebf5] hover:bg-[#211c3a] border border-[#2d2750]'
                }`}
              >
                {goal.title}
              </button>
            );
          })}
        </div>

        {/* Goal Detail Card */}
        <div className="card-flat p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center max-w-4xl mx-auto">
          {/* Explanation Text */}
          <div className="md:col-span-7 space-y-3.5">
            <span className="text-xs font-semibold text-[#7c5cff] uppercase tracking-wider block">
              {selectedGoal.simpleExplain}
            </span>

            <h3 className="text-2xl font-bold text-[#ecebf5]">
              {selectedGoal.title}
            </h3>

            <p className="text-sm text-[#9893b8] leading-relaxed">
              {selectedGoal.detail}
            </p>

            <div className="p-3.5 bg-[#211c3a] rounded-[8px] border border-[#2d2750] text-xs text-[#ecebf5]">
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
          </div>

          {/* Demonstration Board */}
          <div className="md:col-span-5 flex flex-col items-center">
            <div className="p-3 bg-[#0d0b17] rounded-[10px] border border-[#2d2750]">
              <div className="grid grid-cols-8 grid-rows-8 w-[240px] h-[240px] sm:w-[260px] sm:h-[260px] border border-[#2d2750] rounded-[6px] overflow-hidden">
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
                          isLight ? 'bg-[#b9b0d9]' : 'bg-[#5b4b9a]'
                        } ${isTarget ? 'ring-2 ring-rose-500 ring-inset bg-rose-500/20' : ''} ${
                          isAttacker ? 'ring-2 ring-[#7c5cff] ring-inset' : ''
                        }`}
                      >
                        {piece && (
                          <div className="w-[85%] h-[85%] flex items-center justify-center">
                            <ChessPieceSvg type={piece.type} color={piece.color} />
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
            <span className="text-[11px] text-[#9893b8] mt-2">
              Nümunə vəziyyət: {selectedGoal.title}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
