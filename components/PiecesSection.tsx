'use client';

import React, { useState } from 'react';
import { piecesData, PieceInfo } from '@/lib/siteData';
import { ChessPieceSvg } from './ChessPieceSvg';
import { Target } from 'lucide-react';

export const PiecesSection: React.FC = () => {
  const [activePiece, setActivePiece] = useState<PieceInfo>(piecesData[1]); // Queen by default

  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];

  return (
    <section id="pieces" className="py-16 sm:py-24 bg-[#121024] border-b border-[#2d2750]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-xs font-bold text-[#9a82ff] uppercase tracking-widest mb-1.5">
            Dərs 02
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#ecebf5] tracking-tight">
            Şahmat Fiqurları və Onların Hərəkəti
          </h2>
          <p className="text-sm sm:text-base text-[#9893b8] mt-2">
            Hər fiqurun özünəməxsus gücü, xalı və addım qaydası var. Fiqurlardan birini seçin və lövhədə necə hərəkət etdiyini canlı görün!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Piece Cards List (Left / 7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {piecesData.map((piece) => {
              const isSelected = activePiece.id === piece.id;
              return (
                <div
                  key={piece.id}
                  onClick={() => setActivePiece(piece)}
                  onMouseEnter={() => setActivePiece(piece)}
                  className={`p-5 rounded-3xl border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#211c3a] border-[#7c5cff] shadow-xl shadow-[#7c5cff]/15 ring-1 ring-[#7c5cff]'
                      : 'bg-[#171428] border-[#2d2750] hover:border-[#7c5cff]/40 hover:bg-[#1c1833] shadow-xs'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-12 h-12 rounded-2xl bg-[#211c3a] p-2 flex items-center justify-center border border-[#2d2750]">
                        <ChessPieceSvg type={piece.type} color="w" />
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-bold text-[#9a82ff] bg-[#7c5cff]/15 border border-[#7c5cff]/30 px-2.5 py-1 rounded-full">
                          {piece.value}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-[#ecebf5] flex items-center gap-2">
                      {piece.name}
                      {isSelected && (
                        <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                          Seçilib
                        </span>
                      )}
                    </h3>

                    <p className="text-xs font-semibold text-[#9a82ff] mt-1">
                      {piece.summary}
                    </p>

                    <p className="text-xs text-[#9893b8] mt-2 leading-relaxed">
                      {piece.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#2d2750] text-[11px] font-medium text-[#9893b8] flex items-center justify-between">
                    <span>Hərəkəti görmək üçün toxunun</span>
                    <span className="text-[#9a82ff] font-bold">Lövhəyə bax →</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Demonstration Board (Right / 5 cols) */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="bg-[#171428] p-6 sm:p-7 rounded-3xl border border-[#2d2750] shadow-2xl text-center">
              <div className="flex items-center justify-between mb-4">
                <div className="text-left">
                  <div className="text-xs font-bold text-[#9a82ff]">Canlı Nümayiş</div>
                  <h3 className="text-lg font-bold text-[#ecebf5]">
                    {activePiece.name} fiqurunun hərəkət xətləri
                  </h3>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#211c3a] border border-[#2d2750] flex items-center justify-center text-[#9a82ff]">
                  <Target className="w-4 h-4" />
                </div>
              </div>

              {/* Mini Board with #b9b0d9 and #5b4b9a */}
              <div className="inline-block p-2 sm:p-3 bg-[#0d0b17] rounded-2xl shadow-inner border border-[#2d2750]">
                <div className="grid grid-cols-8 grid-rows-8 w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] border border-[#2d2750] rounded-lg overflow-hidden">
                  {ranks.map((rank, rIdx) =>
                    files.map((file, fIdx) => {
                      const square = `${file}${rank}`;
                      const isLight = (rIdx + fIdx) % 2 === 0;
                      const isPieceHere = activePiece.demoPosition.pieceSquare === square;
                      const isValidMove = activePiece.demoPosition.validMoves.includes(square);

                      return (
                        <div
                          key={square}
                          className={`relative flex items-center justify-center ${
                            isLight ? 'bg-[#b9b0d9]' : 'bg-[#5b4b9a]'
                          }`}
                        >
                          {/* Valid move indicator: translucent violet overlay + glowing dot */}
                          {isValidMove && (
                            <div className="w-4 h-4 rounded-full bg-[#7c5cff] shadow-md shadow-[#7c5cff] animate-pulse" />
                          )}

                          {/* The piece itself */}
                          {isPieceHere && (
                            <div className="w-[85%] h-[85%] flex items-center justify-center z-10 drop-shadow-lg">
                              <ChessPieceSvg type={activePiece.type} color="w" />
                            </div>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Board Legend */}
              <div className="mt-4 flex items-center justify-center gap-6 text-xs text-[#9893b8]">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#ecebf5] border border-[#2d2750]" />
                  <span>Fiqur ({activePiece.demoPosition.pieceSquare})</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#7c5cff]" />
                  <span>Gediş xanaları ({activePiece.demoPosition.validMoves.length})</span>
                </div>
              </div>

              <div className="mt-4 p-3 bg-[#211c3a] rounded-xl text-xs text-[#9893b8] border border-[#2d2750] text-left">
                💡 <strong className="text-[#ecebf5]">Qeyd:</strong> Şahmatda heç bir fiqur öz komandasının xanasına gedə bilməz. Rəqib fiquru isə həmin xanaya daxil olmaqla vurulur.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
