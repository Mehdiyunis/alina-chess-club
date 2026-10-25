'use client';

import React, { useState } from 'react';
import { specialMovesData } from '@/lib/siteData';
import { ChessPieceSvg } from './ChessPieceSvg';
import { ScrollReveal } from './ScrollReveal';

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
    <section id="rules" className="py-16 lg:py-24 bg-[#efe9e0] border-b border-[rgba(26,19,12,0.10)]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <ScrollReveal direction="up" className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="font-serif text-[clamp(2rem,3.5vw,2.5rem)] font-normal text-[#1a130c] tracking-tight leading-[1.1]">
            Xüsusi Şahmat Gedişləri
          </h2>
          <p className="text-sm sm:text-base text-[#7a736b] mt-2">
            Rokirovka, piyadanın çevrilməsi və keçiddə götürmə qaydaları ilə tanış olun.
          </p>
        </ScrollReveal>

        {/* Tab Selection (Functional Segmented Buttons) */}
        <ScrollReveal direction="up" delay={0.1} className="flex flex-wrap justify-center gap-2 mb-10">
          {specialMovesData.map((item) => {
            const isSelected = item.id === selectedId;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setSelectedId(item.id);
                  setStep('after');
                }}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#8c6747] text-white shadow-md shadow-black/10'
                    : 'bg-[#ffffff] text-[#7a736b] hover:text-[#1a130c] border border-[rgba(26,19,12,0.10)]'
                }`}
              >
                {item.title}
              </button>
            );
          })}
        </ScrollReveal>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-4xl mx-auto">
          {/* Left: Explanation & Rules */}
          <ScrollReveal direction="left" className="lg:col-span-7 space-y-4">
            <div className="bg-[#ffffff] rounded-[18px] border border-[rgba(26,19,12,0.10)] p-6 sm:p-7 space-y-3 shadow-md">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#8c6747]">
                {currentMove.subtitle}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#1a130c]">{currentMove.title}</h3>
              <p className="text-sm text-[#7a736b] leading-relaxed">
                {currentMove.description}
              </p>

              <div className="pt-3 border-t border-[rgba(26,19,12,0.08)] space-y-2">
                <span className="text-xs font-bold text-[#1a130c] block">
                  Əsas şərtlər:
                </span>
                <ul className="space-y-1.5 text-xs text-[#7a736b]">
                  {currentMove.rules.map((rule, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#8c6747] font-bold">·</span>
                      <span className="leading-relaxed">{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollReveal>

          {/* Right: Interactive Mini Board */}
          <ScrollReveal direction="right" className="lg:col-span-5 flex flex-col items-center">
            <div className="bg-[#ffffff] rounded-[18px] border border-[rgba(26,19,12,0.10)] p-4 sm:p-5 w-full max-w-sm shadow-md">
              <div className="flex items-center justify-between mb-3 px-1">
                <span className="font-serif text-sm font-medium text-[#1a130c]">
                  Nümayiş
                </span>
                <div className="inline-flex rounded-full bg-[#f4efe6] p-1 border border-[rgba(26,19,12,0.08)]">
                  <button
                    onClick={() => setStep('before')}
                    className={`px-3 py-1 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                      step === 'before'
                        ? 'bg-[#8c6747] text-white shadow-xs'
                        : 'text-[#7a736b] hover:text-[#1a130c]'
                    }`}
                  >
                    Əvvəl
                  </button>
                  <button
                    onClick={() => setStep('after')}
                    className={`px-3 py-1 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                      step === 'after'
                        ? 'bg-[#8c6747] text-white shadow-xs'
                        : 'text-[#7a736b] hover:text-[#1a130c]'
                    }`}
                  >
                    Sonra
                  </button>
                </div>
              </div>

              {/* Board */}
              <div className="aspect-square w-full rounded-[12px] overflow-hidden border border-[rgba(26,19,12,0.12)] grid grid-cols-8 grid-rows-8 shadow-inner">
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
                          isLight ? 'bg-[#efe7d8]' : 'bg-[#8c6747]'
                        } ${isHighlighted ? 'ring-3 ring-inset ring-[#e9cfa0]' : ''}`}
                      >
                        {piece && (
                          <div className="w-[84%] h-[84%] drop-shadow-xs">
                            <ChessPieceSvg type={piece.type} color={piece.color} />
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>

              {/* Step indicator caption */}
              <p className="mt-3 text-xs text-[#7a736b] px-1">
                {demo.description}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
