'use client';

import React, { useState } from 'react';
import { specialMovesData } from '@/lib/siteData';
import { ChessPieceSvg } from './ChessPieceSvg';
import { Shield, Sparkles, Zap, CheckCircle2, ArrowRight } from 'lucide-react';

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
    description: 'Qısa rokirovka: Şah e1-dən g1-ə keçir, Top h1-dən f1-ə sıçrayır!',
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
    description: 'Ağ piyada 8-ci xəttə çataraq ən güclü fiqura — Vəzirə çevrilir!',
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
    description: 'Qara piyada d5-ə sıçrayır, ağ piyada isə onu d6-da keçiddə vurur!',
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

  const getIcon = (id: string) => {
    switch (id) {
      case 'castling':
        return <Shield className="w-5 h-5 text-[#7c5cff]" />;
      case 'promotion':
        return <Sparkles className="w-5 h-5 text-amber-400" />;
      case 'enpassant':
        return <Zap className="w-5 h-5 text-cyan-400" />;
      default:
        return <Shield className="w-5 h-5 text-[#7c5cff]" />;
    }
  };

  return (
    <section id="special-moves" className="py-20 relative bg-[#121024] border-t border-b border-[#2d2750]/50 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute -top-32 right-10 w-96 h-96 bg-[#7c5cff]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 left-10 w-96 h-96 bg-[#3b5bdb]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#7c5cff]/10 border border-[#7c5cff]/20 text-[#9a82ff] text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Xüsusi Şahmat Qaydaları
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#ecebf5] tracking-tight">
            Şahmatın Sehrli Gedişləri
          </h2>
          <p className="mt-3 text-[#9893b8] text-base sm:text-lg">
            Bu xüsusi qaydalar oyunu daha da maraqlı edir və rəqibləri təəccübləndirməyə kömək edir!
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {specialMovesData.map((item) => {
            const isSelected = item.id === selectedId;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setSelectedId(item.id);
                  setStep('after');
                }}
                className={`flex items-center gap-2.5 px-6 py-3 rounded-xl font-medium text-sm transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-[#7c5cff] text-white shadow-lg shadow-[#7c5cff]/25 border border-[#9a82ff]/50'
                    : 'bg-[#171428] text-[#9893b8] hover:text-[#ecebf5] hover:bg-[#211c3a] border border-[#2d2750]'
                }`}
              >
                {getIcon(item.id)}
                <span>{item.title}</span>
              </button>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
          {/* Left: Explanation & Rules */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-[#171428] border border-[#2d2750] rounded-2xl p-6 sm:p-8 relative">
              <div className="flex items-center gap-3 mb-3">
                {getIcon(currentMove.id)}
                <span className="text-xs uppercase font-bold tracking-wider text-[#9a82ff]">
                  {currentMove.subtitle}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-[#ecebf5] mb-4">{currentMove.title}</h3>
              <p className="text-[#9893b8] leading-relaxed text-base mb-6">
                {currentMove.description}
              </p>

              <div className="space-y-3 pt-4 border-t border-[#2d2750]">
                <h4 className="text-xs uppercase font-bold text-[#ecebf5] tracking-wider mb-2">
                  Əsas Qaydalar:
                </h4>
                {currentMove.rules.map((rule, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#7c5cff] shrink-0 mt-1" />
                    <span className="text-sm text-[#ecebf5] leading-relaxed">{rule}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Interactive Mini Board */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="bg-[#171428] border border-[#2d2750] p-4 rounded-2xl shadow-xl w-full max-w-md">
              <div className="flex items-center justify-between mb-3 px-1">
                <span className="text-xs font-semibold text-[#9893b8] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#7c5cff] animate-pulse" />
                  İnteraktiv Nümayiş
                </span>
                <div className="inline-flex rounded-lg bg-[#0d0b17] p-1 border border-[#2d2750]">
                  <button
                    onClick={() => setStep('before')}
                    className={`px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                      step === 'before'
                        ? 'bg-[#7c5cff] text-white shadow-sm'
                        : 'text-[#9893b8] hover:text-[#ecebf5]'
                    }`}
                  >
                    Əvvəl
                  </button>
                  <button
                    onClick={() => setStep('after')}
                    className={`px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                      step === 'after'
                        ? 'bg-[#7c5cff] text-white shadow-sm'
                        : 'text-[#9893b8] hover:text-[#ecebf5]'
                    }`}
                  >
                    Sonra
                  </button>
                </div>
              </div>

              {/* Board */}
              <div className="aspect-square w-full rounded-xl overflow-hidden border border-[#2d2750] grid grid-cols-8 grid-rows-8 shadow-inner">
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
                        className={`relative flex items-center justify-center transition-colors duration-200 ${
                          isLight ? 'bg-[#b9b0d9]' : 'bg-[#5b4b9a]'
                        } ${isHighlighted ? 'ring-2 ring-inset ring-[#7c5cff] bg-[#7c5cff]/30' : ''}`}
                      >
                        {piece && (
                          <div className="w-[85%] h-[85%] transition-transform duration-300 transform scale-100">
                            <ChessPieceSvg type={piece.type} color={piece.color} />
                          </div>
                        )}
                        {/* Coordinate labels on corners */}
                        {fileIdx === 0 && (
                          <span className={`absolute top-0.5 left-0.5 text-[9px] font-bold ${
                            isLight ? 'text-[#5b4b9a]/60' : 'text-[#b9b0d9]/60'
                          }`}>
                            {rank}
                          </span>
                        )}
                        {rankIdx === 7 && (
                          <span className={`absolute bottom-0.5 right-0.5 text-[9px] font-bold ${
                            isLight ? 'text-[#5b4b9a]/60' : 'text-[#b9b0d9]/60'
                          }`}>
                            {file}
                          </span>
                        )}
                      </div>
                    );
                  })
                )}
              </div>

              {/* Step indicator caption */}
              <div className="mt-3.5 p-3 rounded-xl bg-[#0d0b17] border border-[#2d2750] flex items-center gap-2">
                <ArrowRight className="w-4 h-4 text-[#7c5cff] shrink-0" />
                <p className="text-xs text-[#9893b8]">
                  {demo.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
