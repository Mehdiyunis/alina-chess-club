'use client';

import React, { useState } from 'react';
import { piecesData, PieceInfo } from '@/lib/siteData';
import { ChessPieceSvg } from './ChessPieceSvg';
import { ScrollReveal } from './ScrollReveal';

export const PiecesSection: React.FC = () => {
  const [activePiece, setActivePiece] = useState<PieceInfo>(piecesData[1]); // Queen by default

  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];

  return (
    <section id="pieces" className="py-16 lg:py-24 bg-[#efe9e0] border-b border-[rgba(26,19,12,0.10)]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <ScrollReveal direction="up" className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-serif text-[clamp(2rem,3.5vw,2.5rem)] font-normal text-[#1a130c] tracking-tight leading-[1.1]">
            Şahmat Fiqurları və Hərəkət Qaydaları
          </h2>
          <p className="text-sm sm:text-base text-[#7a736b] mt-2">
            Hər bir fiqurun lövhədə özünəməxsus rolu və gediş istiqaməti var. Fiquru seçərək sağdakı lövhədə hərəkət xətlərini izləyin.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Piece Cards (Left / 7 cols) */}
          <ScrollReveal direction="left" className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {piecesData.map((piece) => {
              const isSelected = activePiece.id === piece.id;
              return (
                <div
                  key={piece.id}
                  onClick={() => setActivePiece(piece)}
                  className={`p-5 rounded-[18px] border transition-all cursor-pointer flex flex-col justify-between shadow-xs ${
                    isSelected
                      ? 'bg-[#ffffff] border-2 border-[#8c6747] shadow-md ring-2 ring-[#e9cfa0]/40'
                      : 'bg-[#ffffff] border-[rgba(26,19,12,0.10)] hover:border-[#8c6747]/50'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-12 h-12 rounded-[12px] bg-[#f7f2ea] p-1.5 flex items-center justify-center border border-[rgba(26,19,12,0.08)] shadow-xs">
                        <ChessPieceSvg type={piece.type} color="w" />
                      </div>
                      <span className="text-xs font-semibold text-[#7a736b]">
                        Dəyəri: {piece.value}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-serif text-xl font-normal text-[#1a130c]">
                        {piece.name}
                      </h3>
                      {isSelected && (
                        <span className="text-[11px] font-semibold text-[#8c6747] uppercase tracking-wider">
                          Aktiv
                        </span>
                      )}
                    </div>

                    <p className="text-xs font-semibold text-[#8c6747] mb-2">
                      {piece.summary}
                    </p>

                    <p className="text-xs text-[#7a736b] leading-relaxed">
                      {piece.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[rgba(26,19,12,0.08)] text-[11px] text-[#7a736b] flex items-center justify-between">
                    <span>Gedişləri görmək üçün seçin</span>
                    <span className="text-[#1a130c] font-semibold">Lövhəyə bax</span>
                  </div>
                </div>
              );
            })}
          </ScrollReveal>

          {/* Demonstration Board (Right / 5 cols) */}
          <ScrollReveal direction="right" className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="bg-[#ffffff] p-5 sm:p-6 rounded-[18px] border border-[rgba(26,19,12,0.10)] shadow-md">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-[rgba(26,19,12,0.08)]">
                <div>
                  <span className="text-xs text-[#7a736b]">Nümayiş Lövhəsi</span>
                  <h3 className="font-serif text-lg font-normal text-[#1a130c]">
                    {activePiece.name} fiqurunun gedişləri
                  </h3>
                </div>
                <span className="text-xs text-[#8c6747] font-semibold">
                  {activePiece.demoPosition.validMoves.length} mümkün xana
                </span>
              </div>

              {/* Mini Board */}
              <div className="flex justify-center">
                <div className="grid grid-cols-8 grid-rows-8 w-[260px] h-[260px] sm:w-[300px] sm:h-[300px] border border-[rgba(26,19,12,0.12)] rounded-[12px] overflow-hidden shadow-inner">
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
                            isLight ? 'bg-[#efe7d8]' : 'bg-[#8c6747]'
                          }`}
                        >
                          {/* Valid move indicator */}
                          {isValidMove && (
                            <div className="w-3.5 h-3.5 rounded-full bg-[#8c6747] ring-2 ring-[#e9cfa0]" />
                          )}

                          {/* The piece itself */}
                          {isPieceHere && (
                            <div className="w-[85%] h-[85%] flex items-center justify-center z-10 drop-shadow-xs">
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
              <div className="mt-4 pt-3 border-t border-[rgba(26,19,12,0.08)] flex items-center justify-between text-xs text-[#7a736b]">
                <span>Mərkəzi xana: <strong className="text-[#1a130c]">{activePiece.demoPosition.pieceSquare.toUpperCase()}</strong></span>
                <span>Bənövşəyi nöqtələr: gediş xanaları</span>
              </div>

              <p className="mt-3 text-xs text-[#7a736b] leading-relaxed">
                Qeyd: Fiqurlar öz komandasının xanasına gedə bilməz. Rəqib fiquru isə həmin xanaya daxil olaraq vurulur.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
