'use client';

import React, { useState } from 'react';
import { gameGoalsData } from '@/lib/siteData';
import { ChessPieceSvg } from './ChessPieceSvg';
import { Swords, Trophy, Handshake, AlertTriangle } from 'lucide-react';

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

  const getGoalIcon = (id: string) => {
    switch (id) {
      case 'shah':
        return <AlertTriangle className="w-5 h-5 text-amber-400" />;
      case 'mat':
        return <Trophy className="w-5 h-5 text-emerald-400" />;
      case 'pat':
        return <Swords className="w-5 h-5 text-[#9a82ff]" />;
      case 'draw':
      default:
        return <Handshake className="w-5 h-5 text-blue-400" />;
    }
  };

  const currentBoardPieces = parseFenSquares(selectedGoal.boardFen);

  return (
    <section id="goals" className="py-16 sm:py-24 bg-[#0d0b17] border-b border-[#2d2750]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-xs font-bold text-[#9a82ff] uppercase tracking-widest mb-1.5">
            Dərs 03
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#ecebf5] tracking-tight">
            Oyunun Əsas Məqsədi Nədir?
          </h2>
          <p className="text-sm sm:text-base text-[#9893b8] mt-2">
            Şahmatın ən böyük sirri: rəqibin bütün fiqurlarını vurmaq məcbur deyil. Əsas hədəf rəqib Şahı <strong>Mat</strong> etməkdir!
          </p>
        </div>

        {/* Goal Selector Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
          {gameGoalsData.map((goal) => {
            const isSelected = selectedGoal.id === goal.id;
            return (
              <button
                key={goal.id}
                onClick={() => setSelectedGoal(goal)}
                className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  isSelected
                    ? 'btn-violet-glow text-white shadow-lg scale-105'
                    : 'bg-[#171428] text-[#ecebf5] hover:bg-[#211c3a] border border-[#2d2750]'
                }`}
              >
                {getGoalIcon(goal.id)}
                <span>{goal.title}</span>
              </button>
            );
          })}
        </div>

        {/* Goal Detail Card */}
        <div className="max-w-4xl mx-auto bg-[#171428] rounded-3xl p-6 sm:p-10 border border-[#2d2750] shadow-xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Explanation Text */}
          <div className="md:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#9a82ff] bg-[#211c3a] px-3.5 py-1.5 rounded-full border border-[#7c5cff]/30">
              {getGoalIcon(selectedGoal.id)}
              <span>{selectedGoal.simpleExplain}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#ecebf5]">
              {selectedGoal.title}
            </h3>

            <p className="text-sm sm:text-base text-[#9893b8] leading-relaxed">
              {selectedGoal.detail}
            </p>

            <div className="p-4 bg-[#211c3a] rounded-2xl border border-[#2d2750] text-xs sm:text-sm text-[#ecebf5]">
              {selectedGoal.id === 'mat' && (
                <span>👑 <strong className="text-emerald-400">Mat düsturu:</strong> Rəqib Şah hücumdadır və qaça bilmir! Təbriklər, oyun qələbə ilə bitdi!</span>
              )}
              {selectedGoal.id === 'shah' && (
                <span>⚠️ <strong className="text-amber-400">Yadda saxla:</strong> Şaha hücum edildikdə Şahı vurub lövhədən götürmürlər, o dərhal xilas olunmalıdır.</span>
              )}
              {selectedGoal.id === 'pat' && (
                <span>🤝 <strong className="text-[#9a82ff]">Diqqət:</strong> Üstünlüyün varsa, ehtiyatlı ol ki, təsadüfən Pat edib qələbəni əldən verməyəsən!</span>
              )}
              {selectedGoal.id === 'draw' && (
                <span>🕊️ <strong className="text-blue-400">Bərabərlik:</strong> Heç bir tərəf mat edə bilmədikdə hər iki oyunçuya 0.5 xal yazılır.</span>
              )}
            </div>
          </div>

          {/* Demonstration Board */}
          <div className="md:col-span-5 flex flex-col items-center">
            <div className="p-3 bg-[#0d0b17] rounded-2xl border border-[#2d2750] shadow-md">
              <div className="grid grid-cols-8 grid-rows-8 w-[240px] h-[240px] sm:w-[280px] sm:h-[280px] border border-[#2d2750] rounded-lg overflow-hidden">
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
                        } ${isTarget ? 'ring-3 ring-rose-500 ring-inset bg-rose-500/30' : ''} ${
                          isAttacker ? 'ring-2 ring-emerald-400 ring-inset' : ''
                        }`}
                      >
                        {piece && (
                          <div className="w-[85%] h-[85%] flex items-center justify-center drop-shadow-md">
                            <ChessPieceSvg type={piece.type} color={piece.color} />
                          </div>
                        )}
                        {isTarget && (
                          <div className="absolute -top-1 -right-1 text-xs">👑</div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
            <span className="text-[11px] text-[#9893b8] mt-2">
              Nümunə vəziyyət ({selectedGoal.title})
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
