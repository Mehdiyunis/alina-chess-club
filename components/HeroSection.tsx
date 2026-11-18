'use client';

import React from 'react';
import Link from 'next/link';
import { ChessPieceSvg, PieceType, PieceColor } from './ChessPieceSvg';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from './LanguageProvider';

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
  const { t } = useLanguage();
  const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];
  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

  return (
    <section className="relative overflow-hidden pt-8 pb-16 sm:pb-20 lg:pt-10 lg:pb-20 bg-[var(--bg)] border-b border-[var(--border)]">
      <style>{`
        @keyframes bentoCardFadeUp {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .bento-card {
          animation: bentoCardFadeUp 500ms cubic-bezier(0.16, 1, 0.3, 1) backwards;
        }

        .bento-card-a  { animation-delay: 0ms; }
        .bento-card-b  { animation-delay: 70ms; }
        .bento-card-c1 { animation-delay: 140ms; }
        .bento-card-c2 { animation-delay: 210ms; }
        .bento-card-c3 { animation-delay: 280ms; }

        /* Mobile single column */
        .bento-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr);
        }
        .bento-card-a  { order: 1; }
        .bento-card-b  { order: 2; }
        .bento-card-c1 { order: 3; }
        .bento-card-c2 { order: 4; }
        .bento-card-c3 { order: 5; }

        /* Tablet (768px to 1023px): Card A full width, Card B left (row 2-4), C1/C2/C3 stacked on right */
        @media (min-width: 768px) and (max-width: 1023px) {
          .bento-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
          .bento-card-a {
            grid-column: 1 / -1;
            grid-row: 1;
          }
          .bento-card-b {
            grid-column: 1 / 2;
            grid-row: 2 / 5;
          }
          .bento-card-c1 {
            grid-column: 2 / 3;
            grid-row: 2;
          }
          .bento-card-c2 {
            grid-column: 2 / 3;
            grid-row: 3;
          }
          .bento-card-c3 {
            grid-column: 2 / 3;
            grid-row: 4;
          }
        }

        /* Desktop (1024px+): 12-col equivalent proportions (columns 1-7 for A and C1-C3, columns 8-12 for B) */
        @media (min-width: 1024px) {
          .bento-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr)) minmax(0, 2.143fr);
          }
          .bento-card-a {
            grid-column: 1 / 4;
            grid-row: 1;
          }
          .bento-card-b {
            grid-column: 4 / 5;
            grid-row: 1 / 3;
          }
          .bento-card-c1 {
            grid-column: 1 / 2;
            grid-row: 2;
          }
          .bento-card-c2 {
            grid-column: 2 / 3;
            grid-row: 2;
          }
          .bento-card-c3 {
            grid-column: 3 / 4;
            grid-row: 2;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .bento-card {
            animation: none !important;
            transform: none !important;
          }
          .bento-card-link:hover {
            transform: none !important;
          }
          .bento-card-link:hover .bento-arrow {
            transform: none !important;
          }
        }
      `}</style>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="bento-grid gap-3 sm:gap-4">
          {/* Card A: Main Hero Headline, description, CTAs and pure CSS primary checkerboard at 5% */}
          <div className="bento-card bento-card-a relative overflow-hidden bg-[var(--surface)] border border-[var(--border)] rounded-[20px] sm:rounded-[24px] p-5 sm:p-8 flex flex-col justify-between shadow-[0_1px_2px_rgba(30,42,34,0.06)]">
            {/* Faint decorative checkerboard pattern in the bottom-right corner (pure CSS, primary #2F5D46, 5% opacity, radial mask) */}
            <div
              className="absolute bottom-0 right-0 w-44 h-44 sm:w-64 sm:h-64 pointer-events-none select-none rounded-br-[20px] sm:rounded-br-[24px] overflow-hidden"
              aria-hidden="true"
              style={{
                opacity: 0.05,
                backgroundImage: `
                  linear-gradient(45deg, #2F5D46 25%, transparent 25%),
                  linear-gradient(-45deg, #2F5D46 25%, transparent 25%),
                  linear-gradient(45deg, transparent 75%, #2F5D46 75%),
                  linear-gradient(-45deg, transparent 75%, #2F5D46 75%)
                `,
                backgroundSize: '24px 24px',
                backgroundPosition: '0 0, 0 12px, 12px -12px, -12px 0px',
                maskImage: 'radial-gradient(circle at bottom right, black 20%, transparent 75%)',
                WebkitMaskImage: 'radial-gradient(circle at bottom right, black 20%, transparent 75%)',
              }}
            />

            <div className="relative z-10 space-y-4 sm:space-y-5">
              <h1 className="font-serif text-[clamp(40px,5.8vw,80px)] font-normal text-[var(--ink)] tracking-tight leading-[1.05]">
                {t('hero.title')}
              </h1>

              <p className="text-base sm:text-lg text-[var(--ink-muted)] leading-relaxed max-w-2xl">
                {t('hero.description')}
              </p>
            </div>

            <div className="relative z-10 pt-6 sm:pt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <Link
                href="/auth"
                className="btn-primary w-full sm:w-auto px-8 py-3.5 text-base font-semibold text-center focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
              >
                {t('hero.joinBtn')}
              </Link>

              <Link
                href="/play"
                className="btn-secondary-dark w-full sm:w-auto px-8 py-3.5 text-base text-center focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
              >
                {t('hero.playBtn')}
              </Link>

              <a
                href="#pieces"
                className="btn-secondary-dark w-full sm:w-auto px-8 py-3.5 text-base text-center focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
              >
                {t('hero.piecesBtn')}
              </a>
            </div>
          </div>

          {/* Card B: Starting Position Chessboard (Sage-100 surface) */}
          <div className="bento-card bento-card-b bg-[var(--sage-100)] border border-[var(--border)] rounded-[20px] sm:rounded-[24px] p-5 sm:p-8 flex flex-col justify-center shadow-[0_1px_2px_rgba(30,42,34,0.06)]">
            <div className="flex items-center justify-between pb-3 mb-4 sm:mb-5 border-b border-[var(--border)]">
              <span className="font-serif text-sm sm:text-base font-medium text-[var(--ink)]">
                {t('hero.boardTitle')}
              </span>
              <span className="text-xs text-[var(--ink-muted)]">
                {t('hero.boardSubtitle')}
              </span>
            </div>

            {/* Real 8x8 Chessboard */}
            <div className="aspect-square w-full max-w-[380px] sm:max-w-[420px] mx-auto rounded-[12px] overflow-hidden border border-[var(--border)] grid grid-cols-8 grid-rows-8 select-none shadow-xs">
              {ranks.map((rank, rankIdx) =>
                files.map((file, fileIdx) => {
                  const square = `${file}${rank}`;
                  const isLight = (rankIdx + fileIdx) % 2 === 0;
                  const piece = INITIAL_BOARD_PIECES[square];

                  return (
                    <div
                      key={square}
                      className={`relative flex items-center justify-center ${
                        isLight ? 'bg-[#EEEED2]' : 'bg-[#769656]'
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
                            isLight ? 'text-[#769656]' : 'text-[#EEEED2]'
                          }`}
                        >
                          {rank}
                        </span>
                      )}
                      {rankIdx === 7 && (
                        <span
                          className={`absolute bottom-0.5 right-1 text-[9px] font-bold pointer-events-none ${
                            isLight ? 'text-[#769656]' : 'text-[#EEEED2]'
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

            <p className="text-[11px] sm:text-xs text-[var(--ink-muted)] mt-3.5 text-center leading-relaxed">
              {t('hero.boardCaption')}
            </p>
          </div>

          {/* Card C1: Feature 1 (Butter yellow #F6E7B4, links to #rules) */}
          <a
            href="#rules"
            className="bento-card bento-card-c1 bento-card-link group bg-[var(--butter)] border border-[var(--border)] rounded-[20px] sm:rounded-[24px] p-5 sm:p-8 flex flex-col justify-between transition-[transform,border-color] duration-200 ease-out hover:-translate-y-[3px] hover:border-[var(--primary)]/40 shadow-[0_1px_2px_rgba(30,42,34,0.06)] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
          >
            <div className="flex items-center justify-between">
              <span className="font-serif text-sm font-bold text-[var(--terracotta-text)] tracking-wider">
                01
              </span>
              <ArrowUpRight className="bento-arrow w-4 h-4 text-[var(--ink)] transition-transform duration-200 ease-out group-hover:translate-x-[3px] group-hover:-translate-y-[3px] group-hover:text-[var(--primary)]" />
            </div>
            <div className="mt-4">
              <p className="text-base font-medium text-[var(--ink)]">
                {t('hero.card1Title')}
              </p>
              <p className="text-xs sm:text-sm text-[var(--ink-muted)] mt-1 leading-relaxed">
                {t('hero.card1Desc')}
              </p>
            </div>
          </a>

          {/* Card C2: Feature 2 (Peach #F4D9C6, links to #teachers) */}
          <a
            href="#teachers"
            className="bento-card bento-card-c2 bento-card-link group bg-[var(--peach)] border border-[var(--border)] rounded-[20px] sm:rounded-[24px] p-5 sm:p-8 flex flex-col justify-between transition-[transform,border-color] duration-200 ease-out hover:-translate-y-[3px] hover:border-[var(--primary)]/40 shadow-[0_1px_2px_rgba(30,42,34,0.06)] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
          >
            <div className="flex items-center justify-between">
              <span className="font-serif text-sm font-bold text-[var(--terracotta-text)] tracking-wider">
                02
              </span>
              <ArrowUpRight className="bento-arrow w-4 h-4 text-[var(--ink)] transition-transform duration-200 ease-out group-hover:translate-x-[3px] group-hover:-translate-y-[3px] group-hover:text-[var(--primary)]" />
            </div>
            <div className="mt-4">
              <p className="text-base font-medium text-[var(--ink)]">
                {t('hero.card2Title')}
              </p>
              <p className="text-xs sm:text-sm text-[var(--ink-muted)] mt-1 leading-relaxed">
                {t('hero.card2Desc')}
              </p>
            </div>
          </a>

          {/* Card C3: Feature 3 (Sage-200 #DCE6D0, links to /analysis) */}
          <Link
            href="/analysis"
            className="bento-card bento-card-c3 bento-card-link group bg-[var(--sage-200)] border border-[var(--border)] rounded-[20px] sm:rounded-[24px] p-5 sm:p-8 flex flex-col justify-between transition-[transform,border-color] duration-200 ease-out hover:-translate-y-[3px] hover:border-[var(--primary)]/40 shadow-[0_1px_2px_rgba(30,42,34,0.06)] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
          >
            <div className="flex items-center justify-between">
              <span className="font-serif text-sm font-bold text-[var(--terracotta-text)] tracking-wider">
                03
              </span>
              <ArrowUpRight className="bento-arrow w-4 h-4 text-[var(--ink)] transition-transform duration-200 ease-out group-hover:translate-x-[3px] group-hover:-translate-y-[3px] group-hover:text-[var(--primary)]" />
            </div>
            <div className="mt-4">
              <p className="text-base font-medium text-[var(--ink)]">
                {t('hero.card3Title')}
              </p>
              <p className="text-xs sm:text-sm text-[var(--ink-muted)] mt-1 leading-relaxed">
                {t('hero.card3Desc')}
              </p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};
