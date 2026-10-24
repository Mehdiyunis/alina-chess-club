'use client';

import React from 'react';
import Link from 'next/link';
import { ChessPieceSvg, PieceType, PieceColor } from './ChessPieceSvg';

interface SquareData {
  type: PieceType;
  color: PieceColor;
}

const INITIAL_BOARD_PIECES: Record<string, SquareData> = {
  a8: { type: 'r', color: 'b' }, b8: { type: 'n', color: 'b' }, c8: { type: 'b', color: 'b' }, d8: { type: 'q', color: 'b' },
  e8: { type: 'k', color: 'b' }, f8: { type: 'b', color: 'b' }, g8: { type: 'n', color: 'b' }, h8: { type: 'r', color: 'b' },
  a7: { type: 'p', color: 'b' }, b7: { type: 'p', color: 'b' }, c7: { type: 'p', color: 'b' }, d7: { type: 'p', color: 'b' },
  e7: { type: 'p', color: 'b' }, f7: { type: 'p', color: 'b' }, g7: { type: 'p', color: 'b' }, h7: { type: 'p', color: 'b' },
  a2: { type: 'p', color: 'w' }, b2: { type: 'p', color: 'w' }, c2: { type: 'p', color: 'w' }, d2: { type: 'p', color: 'w' },
  e2: { type: 'p', color: 'w' }, f2: { type: 'p', color: 'w' }, g2: { type: 'p', color: 'w' }, h2: { type: 'p', color: 'w' },
  a1: { type: 'r', color: 'w' }, b1: { type: 'n', color: 'w' }, c1: { type: 'b', color: 'w' }, d1: { type: 'q', color: 'w' },
  e1: { type: 'k', color: 'w' }, f1: { type: 'b', color: 'w' }, g1: { type: 'n', color: 'w' }, h1: { type: 'r', color: 'w' },
};

export const HeroSection: React.FC = () => {
  const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];
  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

  return (
    <section className="relative overflow-hidden py-16 lg:py-24 bg-[#0d0b17] border-b border-[#2d2750]">
      {/* Exactly ONE soft, large, low-opacity background gradient */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#7c5cff]/10 rounded-full blur-[140px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Heading and CTAs */}
          <div className="lg:col-span-6 text-center lg:text-left space-y-6">
            <h1 className="text-[clamp(2.1rem,4.5vw,3.25rem)] font-bold text-[#ecebf5] tracking-tight leading-[1.15]">
              Şahmatı sıfırdan öyrən
            </h1>

            <p className="text-base sm:text-lg text-[#9893b8] leading-relaxed max-w-xl mx-auto lg:mx-0">
              Şahmat qaydalarını, fiqurların gedişlərini və ilk taktiki addımları sadə dildə, mərhələli şəkildə mənimsəyin.
            </p>

            {/* Action buttons: solid violet primary, outlined secondary, 10px radius */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
              <Link
                href="/auth"
                className="btn-primary w-full sm:w-auto px-6 py-3.5 text-base"
              >
                Bizə qoşul
              </Link>

              <a
                href="#pieces"
                className="btn-secondary w-full sm:w-auto px-6 py-3.5 text-base"
              >
                Fiqurlarla tanış ol
              </a>
            </div>

            {/* Clean, quiet proof points (no pills, no icons clutter) */}
            <div className="pt-6 border-t border-[#2d2750]/60 grid grid-cols-3 gap-4 text-left">
              <div>
                <p className="text-sm font-semibold text-[#ecebf5]">Sadə izahlar</p>
                <p className="text-xs text-[#9893b8] mt-0.5">Uşaqlar üçün aydın qaydalar</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-[#ecebf5]">Təcrübəli müəllimlər</p>
                <p className="text-xs text-[#9893b8] mt-0.5">Mərhələli tədris proqramı</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-[#ecebf5]">Lövhə qurucusu</p>
                <p className="text-xs text-[#9893b8] mt-0.5">İnteraktiv təlim meydançası</p>
              </div>
            </div>
          </div>

          {/* Right Column: Real Chessboard with starting position */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-[420px] bg-[#171428] border border-[#2d2750] p-4 sm:p-5 rounded-[12px]">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#2d2750]">
                <span className="text-xs font-semibold text-[#ecebf5]">
                  Başlanğıc Vəziyyəti
                </span>
                <span className="text-xs text-[#9893b8]">
                  Ağlar və Qaralar
                </span>
              </div>

              {/* Real 8x8 Chessboard */}
              <div className="aspect-square w-full rounded-[8px] overflow-hidden border border-[#2d2750] grid grid-cols-8 grid-rows-8 select-none">
                {ranks.map((rank, rankIdx) =>
                  files.map((file, fileIdx) => {
                    const square = `${file}${rank}`;
                    const isLight = (rankIdx + fileIdx) % 2 === 0;
                    const piece = INITIAL_BOARD_PIECES[square];

                    return (
                      <div
                        key={square}
                        className={`relative flex items-center justify-center ${
                          isLight ? 'bg-[#b9b0d9]' : 'bg-[#5b4b9a]'
                        }`}
                      >
                        {piece && (
                          <div className="w-[84%] h-[84%]">
                            <ChessPieceSvg type={piece.type} color={piece.color} />
                          </div>
                        )}
                        {/* Corner Coordinates */}
                        {fileIdx === 0 && (
                          <span
                            className={`absolute top-0.5 left-1 text-[9px] font-bold pointer-events-none ${
                              isLight ? 'text-[#5b4b9a]/80' : 'text-[#b9b0d9]/80'
                            }`}
                          >
                            {rank}
                          </span>
                        )}
                        {rankIdx === 7 && (
                          <span
                            className={`absolute bottom-0.5 right-1 text-[9px] font-bold pointer-events-none ${
                              isLight ? 'text-[#5b4b9a]/80' : 'text-[#b9b0d9]/80'
                            }`}
                          >
                            {file}
                          </span>
                        )}
                      </div>
                    );
                  })
                )}
              </div>

              <p className="text-[11px] text-[#9893b8] mt-3 text-center">
                32 fiqur, 64 xana: hər iki tərəf eyni imkanlarla oyuna başlayır.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
