'use client';

import React, { useState } from 'react';
import { specialMovesData } from '@/lib/siteData';
import { ChessPieceSvg } from './ChessPieceSvg';

interface MoveDemo {
  id: string;
  before: { [square: string]: { type: 'p' | 'n' | 'b' | 'r' | 'q' | 'k'; color: 'w' | 'b' } };
  after: { [square: string]: { type: 'p' | 'n' | 'b' | 'r' | 'q' | 'k'; color: 'w' | 'b' } };
  highlightFrom?: string;
  highlightTo?: string;
  description: string;
}

const moveDemos: Record<string, MoveDemo> = {
  castling: {
    id: 'castling',
    before: {
      e1: { type: 'k', color: 'w' },
      h1: { type: 'r', color: 'w' },
      a1: { type: 'r', color: 'w' },
      e8: { type: 'k', color: 'b' },
    },
    after: {
      g1: { type: 'k', color: 'w' },
      f1: { type: 'r', color: 'w' },
      a1: { type: 'r', color: 'w' },
      e8: { type: 'k', color: 'b' },
    },
    highlightFrom: 'e1',
    highlightTo: 'g1',
    description: 'Qısa rokirovka: Şah e1 xanasından g1 xanasına keçir, Top isə f1 xanasına yerləşir.',
  },
  promotion: {
    id: 'promotion',
    before: {
      e7: { type: 'p', color: 'w' },
      e8: { type: 'k', color: 'b' },
      a1: { type: 'k', color: 'w' },
    },
    after: {
      e8: { type: 'q', color: 'w' },
      d8: { type: 'k', color: 'b' },
      a1: { type: 'k', color: 'w' },
    },
    highlightFrom: 'e7',
    highlightTo: 'e8',
    description: 'Ağ piyada 8-ci xəttə çataraq Vəzirə çevrilir.',
  },
  enpassant: {
    id: 'enpassant',
    before: {
      e5: { type: 'p', color: 'w' },
      d7: { type: 'p', color: 'b' },
      e1: { type: 'k', color: 'w' },
      e8: { type: 'k', color: 'b' },
    },
    after: {
      d6: { type: 'p', color: 'w' },
      e1: { type: 'k', color: 'w' },
      e8: { type: 'k', color: 'b' },
    },
    highlightFrom: 'e5',
    highlightTo: 'd6',
    description: 'Qara piyada iki xana irəlilədikdə, ağ piyada onu keçiddə vuraraq d6 xanasına keçir.',
  },
};

export function SpecialMovesSection() {
  const [selectedId, setSelectedId] = useState<string>('castling');
  const [step, setStep] = useState<'before' | 'after'>('after');

  const currentMove = specialMovesData.find((m) => m.id === selectedId) || specialMovesData[0];
  const demo = moveDemos[selectedId] || moveDemos.castling;
  const boardPieces = step === 'before' ? demo.before : demo.after;

  const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];
  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

  return (
    <section id="rules" className="py-16 lg:py-24 bg-[#121024] border-b border-[#2d2750]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-[clamp(1.75rem,3vw,2.25rem)] font-bold text-[#ecebf5] tracking-tight">
            Xüsusi Şahmat Gedişləri
          </h2>
          <p className="text-sm sm:text-base text-[#9893b8] mt-2">
            Rokirovka, piyadanın çevrilməsi və keçiddə götürmə qaydaları ilə tanış olun.
          </p>
        </div>

        {/* Tab Selection (Functional Segmented Buttons) */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {specialMovesData.map((item) => {
            const isSelected = item.id === selectedId;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setSelectedId(item.id);
                  setStep('after');
                }}
                className={`px-4 py-2 rounded-[10px] text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-[#7c5cff] text-white'
                    : 'bg-[#171428] text-[#9893b8] hover:text-[#ecebf5] hover:bg-[#211c3a] border border-[#2d2750]'
                }`}
              >
                {item.title}
              </button>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-4xl mx-auto">
          {/* Left: Explanation & Rules */}
          <div className="lg:col-span-7 space-y-4">
            <div className="card-flat p-6 sm:p-7 space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#7c5cff]">
                {currentMove.subtitle}
              </span>
              <h3 className="text-2xl font-bold text-[#ecebf5]">{currentMove.title}</h3>
              <p className="text-sm text-[#9893b8] leading-relaxed">
                {currentMove.description}
              </p>

              <div className="pt-3 border-t border-[#2d2750] space-y-2">
                <span className="text-xs font-bold text-[#ecebf5] block">
                  Əsas şərtlər:
                </span>
                <ul className="space-y-1.5 text-xs text-[#9893b8]">
                  {currentMove.rules.map((rule, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#7c5cff] font-bold">·</span>
                      <span className="leading-relaxed">{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right: Interactive Mini Board */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="card-flat p-4 w-full max-w-sm">
              <div className="flex items-center justify-between mb-3 px-1">
                <span className="text-xs font-semibold text-[#ecebf5]">
                  Nümayiş
                </span>
                <div className="inline-flex rounded-[8px] bg-[#0d0b17] p-1 border border-[#2d2750]">
                  <button
                    onClick={() => setStep('before')}
                    className={`px-2.5 py-1 text-xs font-medium rounded-[6px] transition-colors cursor-pointer ${
                      step === 'before'
                        ? 'bg-[#7c5cff] text-white'
                        : 'text-[#9893b8] hover:text-[#ecebf5]'
                    }`}
                  >
                    Əvvəl
                  </button>
                  <button
                    onClick={() => setStep('after')}
                    className={`px-2.5 py-1 text-xs font-medium rounded-[6px] transition-colors cursor-pointer ${
                      step === 'after'
                        ? 'bg-[#7c5cff] text-white'
                        : 'text-[#9893b8] hover:text-[#ecebf5]'
                    }`}
                  >
                    Sonra
                  </button>
                </div>
              </div>

              {/* Board */}
              <div className="aspect-square w-full rounded-[8px] overflow-hidden border border-[#2d2750] grid grid-cols-8 grid-rows-8">
                {ranks.map((rank, rankIdx) =>
                  files.map((file, fileIdx) => {
                    const square = `${file}${rank}`;
                    const isLight = (rankIdx + fileIdx) % 2 === 0;
                    const piece = boardPieces[square];
                    const isHighlighted =
                      (step === 'after' && (square === demo.highlightFrom || square === demo.highlightTo)) ||
                      (step === 'before' && square === demo.highlightFrom);

                    return (
                      <div
                        key={square}
                        className={`relative flex items-center justify-center ${
                          isLight ? 'bg-[#b9b0d9]' : 'bg-[#5b4b9a]'
                        } ${isHighlighted ? 'ring-2 ring-inset ring-[#7c5cff]' : ''}`}
                      >
                        {piece && (
                          <div className="w-[84%] h-[84%]">
                            <ChessPieceSvg type={piece.type} color={piece.color} />
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>

              {/* Step indicator caption */}
              <p className="mt-3 text-xs text-[#9893b8] px-1">
                {demo.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
