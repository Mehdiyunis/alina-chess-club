'use client';

import React, { useState } from 'react';
import { piecesData, PieceInfo } from '@/lib/siteData';
import { ChessPieceSvg } from './ChessPieceSvg';

export const PiecesSection: React.FC = () => {
  const [activePiece, setActivePiece] = useState<PieceInfo>(piecesData[1]); // Queen by default

  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];

  return (
    <section id="pieces" className="py-16 lg:py-24 bg-[#121024] border-b border-[#2d2750]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-[clamp(1.75rem,3vw,2.25rem)] font-bold text-[#ecebf5] tracking-tight">
            Şahmat Fiqurları və Hərəkət Qaydaları
          </h2>
          <p className="text-sm sm:text-base text-[#9893b8] mt-2">
            Hər bir fiqurun lövhədə özünəməxsus rolu və gediş istiqaməti var. Fiquru seçərək sağdakı lövhədə hərəkət xətlərini izləyin.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Piece Cards (Left / 7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {piecesData.map((piece) => {
              const isSelected = activePiece.id === piece.id;
              return (
                <div
                  key={piece.id}
                  onClick={() => setActivePiece(piece)}
                  className={`p-5 rounded-[12px] border transition-colors cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#211c3a] border-[#7c5cff]'
                      : 'bg-[#171428] border-[#2d2750] hover:border-[#7c5cff]/50'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-12 h-12 rounded-[8px] bg-[#0d0b17] p-1.5 flex items-center justify-center border border-[#2d2750]">
                        <ChessPieceSvg type={piece.type} color="w" />
                      </div>
                      <span className="text-xs font-semibold text-[#9893b8]">
                        Dəyəri: {piece.value}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-lg font-bold text-[#ecebf5]">
                        {piece.name}
                      </h3>
                      {isSelected && (
                        <span className="text-[11px] font-medium text-[#7c5cff]">
                          Aktiv
                        </span>
                      )}
                    </div>

                    <p className="text-xs font-medium text-[#7c5cff] mb-2">
                      {piece.summary}
                    </p>

                    <p className="text-xs text-[#9893b8] leading-relaxed">
                      {piece.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#2d2750]/70 text-[11px] text-[#9893b8] flex items-center justify-between">
                    <span>Gedişləri görmək üçün seçin</span>
                    <span className="text-[#ecebf5] font-semibold">Lövhəyə bax</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Demonstration Board (Right / 5 cols) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="bg-[#171428] p-5 sm:p-6 rounded-[12px] border border-[#2d2750]">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#2d2750]">
                <div>
                  <span className="text-xs text-[#9893b8]">Nümayiş Lövhəsi</span>
                  <h3 className="text-base font-bold text-[#ecebf5]">
                    {activePiece.name} fiqurunun gedişləri
                  </h3>
                </div>
                <span className="text-xs text-[#7c5cff] font-medium">
                  {activePiece.demoPosition.validMoves.length} mümkün xana
                </span>
              </div>

              {/* Mini Board */}
              <div className="flex justify-center">
                <div className="grid grid-cols-8 grid-rows-8 w-[260px] h-[260px] sm:w-[300px] sm:h-[300px] border border-[#2d2750] rounded-[8px] overflow-hidden">
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
                          {/* Valid move indicator */}
                          {isValidMove && (
                            <div className="w-3.5 h-3.5 rounded-full bg-[#7c5cff]" />
                          )}

                          {/* The piece itself */}
                          {isPieceHere && (
                            <div className="w-[85%] h-[85%] flex items-center justify-center z-10">
                              <ChessPieceSvg type={activePiece.type} color="w" />
                            </div>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Legend & Note */}
              <div className="mt-4 pt-3 border-t border-[#2d2750] flex items-center justify-between text-xs text-[#9893b8]">
                <span>Mərkəzi xana: <strong className="text-[#ecebf5]">{activePiece.demoPosition.pieceSquare.toUpperCase()}</strong></span>
                <span>Bənövşəyi nöqtələr: gediş xanaları</span>
              </div>

              <p className="mt-3 text-xs text-[#9893b8] leading-relaxed">
                Qeyd: Fiqurlar öz komandasının xanasına gedə bilməz. Rəqib fiquru isə həmin xanaya daxil olaraq vurulur.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
