'use client';

import React from 'react';
import Link from 'next/link';
import { ChessPieceSvg, PieceType, PieceColor } from './ChessPieceSvg';
import { ScrollReveal } from './ScrollReveal';
import { motion } from 'motion/react';

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
    <section className="relative overflow-hidden py-16 lg:py-24 bg-gradient-to-b from-[#100c08] to-[#2b1e10] border-b border-[rgba(243,236,225,0.10)]">
      {/* Soft warm radial glow near bottom center */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/3 w-[640px] h-[360px] bg-[#e9cfa0]/12 rounded-full blur-[120px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Atmospheric Blurred Background Chess Pieces */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none -z-10" aria-hidden="true">
        {/* Top-Left: King with subtle blur & float */}
        <motion.div
          animate={{ y: [-8, 8, -8], rotate: [-12, -8, -12] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-8 left-0 sm:left-4 md:left-10 w-36 h-36 sm:w-52 sm:h-52 md:w-64 md:h-64 opacity-[0.11] blur-[2.5px] transform-gpu drop-shadow-[0_0_25px_rgba(233,207,160,0.15)]"
        >
          <ChessPieceSvg type="k" color="w" />
        </motion.div>

        {/* Top-Right: Queen with blur & float */}
        <motion.div
          animate={{ y: [6, -10, 6], rotate: [12, 16, 12] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-6 right-2 sm:right-12 md:right-20 w-32 h-32 sm:w-48 sm:h-48 md:w-60 md:h-60 opacity-[0.10] blur-[3.5px] transform-gpu drop-shadow-[0_0_25px_rgba(233,207,160,0.12)]"
        >
          <ChessPieceSvg type="q" color="w" />
        </motion.div>

        {/* Middle-Left: Knight with soft blur */}
        <motion.div
          animate={{ y: [-6, 6, -6], rotate: [14, 10, 14] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 -translate-y-1/2 -left-6 sm:left-2 md:left-8 w-28 h-28 sm:w-40 sm:h-40 opacity-[0.09] blur-[2px] transform-gpu"
        >
          <ChessPieceSvg type="n" color="w" />
        </motion.div>

        {/* Middle-Right / Bottom-Right: Rook with blur */}
        <motion.div
          animate={{ y: [8, -8, 8], rotate: [-14, -10, -14] }}
          transition={{ duration: 8.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-8 right-4 sm:right-20 md:right-32 w-32 h-32 sm:w-44 sm:h-44 md:w-56 md:h-56 opacity-[0.09] blur-[3px] transform-gpu"
        >
          <ChessPieceSvg type="r" color="w" />
        </motion.div>

        {/* Bottom-Center-Left: Bishop with soft depth blur */}
        <motion.div
          animate={{ y: [-5, 7, -5], rotate: [6, 2, 6] }}
          transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-2 left-1/4 sm:left-1/3 w-24 h-24 sm:w-36 sm:h-36 opacity-[0.08] blur-[4px] transform-gpu"
        >
          <ChessPieceSvg type="b" color="w" />
        </motion.div>

        {/* Top-Center subtle Pawn */}
        <motion.div
          animate={{ y: [4, -6, 4], rotate: [-6, -2, -6] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-8 left-1/2 -translate-x-1/2 w-20 h-20 sm:w-28 sm:h-28 opacity-[0.06] blur-[3px] transform-gpu"
        >
          <ChessPieceSvg type="p" color="w" />
        </motion.div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Heading and CTAs */}
          <ScrollReveal direction="left" className="lg:col-span-6 text-center lg:text-left space-y-6">
            <h1 className="font-serif text-[clamp(2.4rem,5vw,3.75rem)] font-normal text-[#f3ece1] tracking-tight leading-[1.08]">
              ALİNA Chess Club
            </h1>

            <p className="text-base sm:text-lg text-[#d9c7a6] leading-relaxed max-w-xl mx-auto lg:mx-0">
              Şahmat qaydalarını, fiqurların gedişlərini və ilk taktiki addımları sadə dildə, mərhələli şəkildə mənimsəyin.
            </p>

            {/* Action buttons: Sand accent primary, outlined secondary, fully rounded pills */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
              <Link
                href="/auth"
                className="btn-primary w-full sm:w-auto px-8 py-3.5 text-base font-semibold shadow-md shadow-[#e9cfa0]/10"
              >
                Bizə qoşul
              </Link>

              <a
                href="#pieces"
                className="btn-secondary-dark w-full sm:w-auto px-8 py-3.5 text-base"
              >
                Fiqurlarla tanış ol
              </a>
            </div>

            {/* Clean, quiet proof points */}
            <div className="pt-6 border-t border-[rgba(243,236,225,0.10)] grid grid-cols-3 gap-4 text-left">
              <div>
                <p className="text-sm font-semibold text-[#f3ece1]">Sadə izahlar</p>
                <p className="text-xs text-[#d9c7a6] mt-0.5">Uşaqlar üçün aydın qaydalar</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-[#f3ece1]">Təcrübəli müəllimlər</p>
                <p className="text-xs text-[#d9c7a6] mt-0.5">Mərhələli tədris proqramı</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-[#f3ece1]">Lövhə qurucusu</p>
                <p className="text-xs text-[#d9c7a6] mt-0.5">İnteraktiv təlim meydançası</p>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column: Real Chessboard with starting position */}
          <ScrollReveal direction="right" className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-[420px] bg-[#24170a] border border-[rgba(243,236,225,0.12)] p-4 sm:p-5 rounded-[18px] shadow-2xl shadow-black/40">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[rgba(243,236,225,0.10)]">
                <span className="font-serif text-sm font-medium text-[#f3ece1]">
                  Başlanğıc Vəziyyəti
                </span>
                <span className="text-xs text-[#d9c7a6]">
                  Ağlar və Qaralar
                </span>
              </div>

              {/* Real 8x8 Chessboard */}
              <div className="aspect-square w-full rounded-[12px] overflow-hidden border border-[rgba(243,236,225,0.10)] grid grid-cols-8 grid-rows-8 select-none shadow-inner">
                {ranks.map((rank, rankIdx) =>
                  files.map((file, fileIdx) => {
                    const square = `${file}${rank}`;
                    const isLight = (rankIdx + fileIdx) % 2 === 0;
                    const piece = INITIAL_BOARD_PIECES[square];

                    return (
                      <div
                        key={square}
                        className={`relative flex items-center justify-center ${
                          isLight ? 'bg-[#efe7d8]' : 'bg-[#8c6747]'
                        }`}
                      >
                        {piece && (
                          <div className="w-[84%] h-[84%] drop-shadow-xs">
                            <ChessPieceSvg type={piece.type} color={piece.color} />
                          </div>
                        )}
                        {/* Corner Coordinates */}
                        {fileIdx === 0 && (
                          <span
                            className={`absolute top-0.5 left-1 text-[9px] font-bold pointer-events-none ${
                              isLight ? 'text-[#8c6747]/80' : 'text-[#efe7d8]/80'
                            }`}
                          >
                            {rank}
                          </span>
                        )}
                        {rankIdx === 7 && (
                          <span
                            className={`absolute bottom-0.5 right-1 text-[9px] font-bold pointer-events-none ${
                              isLight ? 'text-[#8c6747]/80' : 'text-[#efe7d8]/80'
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

              <p className="text-[11px] text-[#d9c7a6] mt-3 text-center">
                32 fiqur, 64 xana: hər iki tərəf eyni imkanlarla oyuna başlayır.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
