'use client';

import React, { useState } from 'react';
import { ChessPieceSvg } from './ChessPieceSvg';
import { ScrollReveal } from './ScrollReveal';
import { useLanguage } from './LanguageProvider';

type PieceType = 'p' | 'n' | 'b' | 'r' | 'q' | 'k';
type PieceColor = 'w' | 'b';

interface SquareSetup {
  type: PieceType;
  color: PieceColor;
  key: string;
}

export const StartingBoard: React.FC = () => {
  const { t } = useLanguage();
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null);

  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];

  const initialSetup: Record<string, SquareSetup> = {
    a8: { type: 'r', color: 'b', key: 'blackRook' },
    b8: { type: 'n', color: 'b', key: 'blackKnight' },
    c8: { type: 'b', color: 'b', key: 'blackBishop' },
    d8: { type: 'q', color: 'b', key: 'blackQueen' },
    e8: { type: 'k', color: 'b', key: 'blackKing' },
    f8: { type: 'b', color: 'b', key: 'blackBishop' },
    g8: { type: 'n', color: 'b', key: 'blackKnight' },
    h8: { type: 'r', color: 'b', key: 'blackRook' },
    a7: { type: 'p', color: 'b', key: 'blackPawn' },
    b7: { type: 'p', color: 'b', key: 'blackPawn' },
    c7: { type: 'p', color: 'b', key: 'blackPawn' },
    d7: { type: 'p', color: 'b', key: 'blackPawn' },
    e7: { type: 'p', color: 'b', key: 'blackPawn' },
    f7: { type: 'p', color: 'b', key: 'blackPawn' },
    g7: { type: 'p', color: 'b', key: 'blackPawn' },
    h7: { type: 'p', color: 'b', key: 'blackPawn' },
    a2: { type: 'p', color: 'w', key: 'whitePawn' },
    b2: { type: 'p', color: 'w', key: 'whitePawn' },
    c2: { type: 'p', color: 'w', key: 'whitePawn' },
    d2: { type: 'p', color: 'w', key: 'whitePawn' },
    e2: { type: 'p', color: 'w', key: 'whitePawn' },
    f2: { type: 'p', color: 'w', key: 'whitePawn' },
    g2: { type: 'p', color: 'w', key: 'whitePawn' },
    h2: { type: 'p', color: 'w', key: 'whitePawn' },
    a1: { type: 'r', color: 'w', key: 'whiteRook' },
    b1: { type: 'n', color: 'w', key: 'whiteKnight' },
    c1: { type: 'b', color: 'w', key: 'whiteBishop' },
    d1: { type: 'q', color: 'w', key: 'whiteQueen' },
    e1: { type: 'k', color: 'w', key: 'whiteKing' },
    f1: { type: 'b', color: 'w', key: 'whiteBishop' },
    g1: { type: 'n', color: 'w', key: 'whiteKnight' },
    h1: { type: 'r', color: 'w', key: 'whiteRook' },
  };

  const getPieceName = (key?: string) => {
    if (!key) return '';
    return t(`startingBoard.pieces.${key}`);
  };

  return (
    <section id="board" className="py-16 lg:py-24 bg-[var(--bg)] border-b border-[var(--border)]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <ScrollReveal direction="up" className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-serif text-[clamp(2rem,3.5vw,2.5rem)] font-normal text-[var(--ink)] tracking-tight leading-[1.1]">
            {t('startingBoard.title')}
          </h2>
          <p className="text-sm sm:text-base text-[var(--ink-muted)] mt-2">
            {t('startingBoard.subtitle')}
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Visual Chessboard */}
          <ScrollReveal direction="left" className="lg:col-span-7 flex flex-col items-center justify-center">
            <div className="p-3 sm:p-5 bg-[var(--surface)] rounded-[18px] border border-[var(--border)] shadow-[0_1px_2px_rgba(30,42,34,0.06)]">
              <div className="relative">
                {/* Top Files Letters */}
                <div className="grid grid-cols-8 text-center text-xs font-semibold text-[var(--ink-muted)] pb-1.5 pl-6 pr-6">
                  {files.map((f) => (
                    <span key={f}>{f}</span>
                  ))}
                </div>

                <div className="flex">
                  {/* Left Ranks Numbers */}
                  <div className="flex flex-col justify-around text-xs font-semibold text-[var(--ink-muted)] pr-2 w-6 text-right">
                    {ranks.map((r) => (
                      <span key={r}>{r}</span>
                    ))}
                  </div>

                  {/* 8x8 Board Grid */}
                  <div className="grid grid-cols-8 grid-rows-8 w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] md:w-[420px] md:h-[420px] border border-[var(--border)] rounded-[12px] overflow-hidden shadow-xs">
                    {ranks.map((rank, rIdx) =>
                      files.map((file, fIdx) => {
                        const square = `${file}${rank}`;
                        const isLight = (rIdx + fIdx) % 2 === 0;
                        const piece = initialSetup[square];
                        const isSelected = selectedSquare === square;

                        return (
                          <div
                            key={square}
                            onClick={() => setSelectedSquare(square)}
                            className={`relative flex items-center justify-center cursor-pointer select-none transition-colors ${
                              isLight ? 'bg-[#EEEED2]' : 'bg-[#769656]'
                            } ${
                              isSelected ? 'ring-3 ring-inset ring-[rgba(217,119,74,0.45)]' : ''
                            }`}
                            title={`${square}${piece ? ` (${getPieceName(piece.key)})` : ''}`}
                          >
                            {/* Piece SVG */}
                            {piece && (
                              <div className="w-[82%] h-[82%] flex items-center justify-center drop-shadow-xs">
                                <ChessPieceSvg type={piece.type} color={piece.color} />
                              </div>
                            )}
                          </div>
                        );
                      })
                    )}
                  </div>

                  {/* Right Ranks Numbers */}
                  <div className="flex flex-col justify-around text-xs font-semibold text-[var(--ink-muted)] pl-2 w-6 text-left">
                    {ranks.map((r) => (
                      <span key={r}>{r}</span>
                    ))}
                  </div>
                </div>

                {/* Bottom Files Letters */}
                <div className="grid grid-cols-8 text-center text-xs font-semibold text-[var(--ink-muted)] pt-1.5 pl-6 pr-6">
                  {files.map((f) => (
                    <span key={f}>{f}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Selected square feedback */}
            <div className="mt-3.5 text-xs text-[var(--ink)] bg-[var(--surface)] px-4 py-2 rounded-full border border-[var(--border)] shadow-xs">
              {selectedSquare ? (
                <span>
                  {t('startingBoard.selectedSquare')}: <strong className="text-[var(--terracotta-text)] font-bold">{selectedSquare.toUpperCase()}</strong>
                  {initialSetup[selectedSquare] && (
                    <span>: {getPieceName(initialSetup[selectedSquare].key)}</span>
                  )}
                </span>
              ) : (
                <span className="text-[var(--ink-muted)]">{t('startingBoard.clickHint')}</span>
              )}
            </div>
          </ScrollReveal>

          {/* Educational Guidelines (Clean Editorial Numbered List) */}
          <ScrollReveal direction="right" className="lg:col-span-5 space-y-4">
            <div className="bg-[var(--surface)] p-5 rounded-[18px] border border-[var(--border)] space-y-1.5 shadow-[0_1px_2px_rgba(30,42,34,0.06)]">
              <span className="text-xs font-serif font-bold text-[var(--terracotta-text)] uppercase tracking-wider block">
                {t('startingBoard.rule1Number')}
              </span>
              <h3 className="font-serif text-lg font-normal text-[var(--ink)]">
                {t('startingBoard.rule1Title')}
              </h3>
              <p className="text-sm text-[var(--ink-muted)] leading-relaxed">
                {t('startingBoard.rule1Text')}
              </p>
            </div>

            <div className="bg-[var(--surface)] p-5 rounded-[18px] border border-[var(--border)] space-y-1.5 shadow-[0_1px_2px_rgba(30,42,34,0.06)]">
              <span className="text-xs font-serif font-bold text-[var(--terracotta-text)] uppercase tracking-wider block">
                {t('startingBoard.rule2Number')}
              </span>
              <h3 className="font-serif text-lg font-normal text-[var(--ink)]">
                {t('startingBoard.rule2Title')}
              </h3>
              <p className="text-sm text-[var(--ink-muted)] leading-relaxed">
                {t('startingBoard.rule2Text')}
              </p>
            </div>

            <div className="bg-[var(--surface)] p-5 rounded-[18px] border border-[var(--border)] space-y-1.5 shadow-[0_1px_2px_rgba(30,42,34,0.06)]">
              <span className="text-xs font-serif font-bold text-[var(--terracotta-text)] uppercase tracking-wider block">
                {t('startingBoard.rule3Number')}
              </span>
              <h3 className="font-serif text-lg font-normal text-[var(--ink)]">
                {t('startingBoard.rule3Title')}
              </h3>
              <p className="text-sm text-[var(--ink-muted)] leading-relaxed">
                {t('startingBoard.rule3Text')}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
