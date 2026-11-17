'use client';

import React, { useState } from 'react';
import { piecesData, PieceInfo } from '@/lib/siteData';
import { ChessPieceSvg } from './ChessPieceSvg';
import { ScrollReveal } from './ScrollReveal';
import { useLanguage } from './LanguageProvider';

export const PiecesSection: React.FC = () => {
  const { t } = useLanguage();
  const [activePiece, setActivePiece] = useState<PieceInfo>(piecesData[1]); // Queen by default

  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];

  const getPieceDetails = (id: string) => {
    return {
      name: t(`pieces.items.${id}.name`),
      value: t(`pieces.items.${id}.value`),
      summary: t(`pieces.items.${id}.summary`),
      description: t(`pieces.items.${id}.description`),
    };
  };

  const activeDetails = getPieceDetails(activePiece.id);

  return (
    <section id="pieces" className="py-16 lg:py-24 bg-[#EFE9DB] border-b border-[#E3DCCB]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <ScrollReveal direction="up" className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-serif text-[clamp(2rem,3.5vw,2.5rem)] font-normal text-[#1E2A22] tracking-tight leading-[1.1]">
            {t('pieces.title')}
          </h2>
          <p className="text-sm sm:text-base text-[#5E6B62] mt-2">
            {t('pieces.subtitle')}
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Piece Cards (Left / 7 cols) */}
          <ScrollReveal direction="left" className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {piecesData.map((piece) => {
              const isSelected = activePiece.id === piece.id;
              const details = getPieceDetails(piece.id);

              return (
                <div
                  key={piece.id}
                  onClick={() => setActivePiece(piece)}
                  className={`p-5 rounded-[18px] border transition-all cursor-pointer flex flex-col justify-between shadow-[0_1px_2px_rgba(30,42,34,0.06)] ${
                    isSelected
                      ? 'bg-[#FFFFFF] border-2 border-[#2F5D46] shadow-sm ring-2 ring-[#2F5D46]/20'
                      : 'bg-[#FFFFFF] border-[#E3DCCB] hover:border-[#2F5D46]/50'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-12 h-12 rounded-[12px] bg-[#E4EBD9] p-1.5 flex items-center justify-center border border-[#E3DCCB] shadow-xs">
                        <ChessPieceSvg type={piece.type} color="w" />
                      </div>
                      <span className="text-xs font-semibold text-[#5E6B62]">
                        {t('pieces.value')}: {details.value}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-serif text-xl font-normal text-[#1E2A22]">
                        {details.name}
                      </h3>
                      {isSelected && (
                        <span className="text-[11px] font-semibold text-[#2F5D46] uppercase tracking-wider">
                          {t('pieces.active')}
                        </span>
                      )}
                    </div>

                    <p className="text-xs font-semibold text-[#B4532A] mb-2">
                      {details.summary}
                    </p>

                    <p className="text-xs text-[#5E6B62] leading-relaxed">
                      {details.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#E3DCCB] text-[11px] text-[#5E6B62] flex items-center justify-between">
                    <span>{t('pieces.selectToSee')}</span>
                    <span className="text-[#1E2A22] font-semibold">{t('pieces.viewBoard')}</span>
                  </div>
                </div>
              );
            })}
          </ScrollReveal>

          {/* Demonstration Board (Right / 5 cols) */}
          <ScrollReveal direction="right" className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="bg-[#FFFFFF] p-5 sm:p-6 rounded-[18px] border border-[#E3DCCB] shadow-[0_1px_2px_rgba(30,42,34,0.06)]">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#E3DCCB]">
                <div>
                  <span className="text-xs text-[#5E6B62]">{t('pieces.demoBoard')}</span>
                  <h3 className="font-serif text-lg font-normal text-[#1E2A22]">
                    {t('pieces.movesOf', { name: activeDetails.name })}
                  </h3>
                </div>
                <span className="text-xs text-[#2F5D46] font-semibold">
                  {t('pieces.possibleSquares', { count: activePiece.demoPosition.validMoves.length })}
                </span>
              </div>

              {/* Mini Board */}
              <div className="flex justify-center">
                <div className="grid grid-cols-8 grid-rows-8 w-[260px] h-[260px] sm:w-[300px] sm:h-[300px] border border-[#E3DCCB] rounded-[12px] overflow-hidden shadow-xs">
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
                            isLight ? 'bg-[#EEEED2]' : 'bg-[#769656]'
                          }`}
                        >
                          {/* Valid move indicator (terracotta highlight) */}
                          {isValidMove && (
                            <div className="w-4 h-4 rounded-full bg-[rgba(217,119,74,0.7)] ring-2 ring-[rgba(217,119,74,0.45)]" />
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
              <div className="mt-4 pt-3 border-t border-[#E3DCCB] flex items-center justify-between text-xs text-[#5E6B62]">
                <span>{t('pieces.centerSquare')}: <strong className="text-[#1E2A22]">{activePiece.demoPosition.pieceSquare.toUpperCase()}</strong></span>
                <span>{t('pieces.dotsLegend')}</span>
              </div>

              <p className="mt-3 text-xs text-[#5E6B62] leading-relaxed">
                {t('pieces.note')}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
