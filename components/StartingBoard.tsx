'use client';

import React, { useState } from 'react';
import { ChessPieceSvg } from './ChessPieceSvg';
import { ScrollReveal } from './ScrollReveal';

export const StartingBoard: React.FC = () => {
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null);

  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];

  const initialSetup: Record<string, { type: 'p' | 'n' | 'b' | 'r' | 'q' | 'k'; color: 'w' | 'b'; nameAz: string }> = {
    a8: { type: 'r', color: 'b', nameAz: 'Qara Top' },
    b8: { type: 'n', color: 'b', nameAz: 'Qara At' },
    c8: { type: 'b', color: 'b', nameAz: 'Qara Fil' },
    d8: { type: 'q', color: 'b', nameAz: 'Qara Vəzir' },
    e8: { type: 'k', color: 'b', nameAz: 'Qara Şah' },
    f8: { type: 'b', color: 'b', nameAz: 'Qara Fil' },
    g8: { type: 'n', color: 'b', nameAz: 'Qara At' },
    h8: { type: 'r', color: 'b', nameAz: 'Qara Top' },
    a7: { type: 'p', color: 'b', nameAz: 'Qara Piyada' },
    b7: { type: 'p', color: 'b', nameAz: 'Qara Piyada' },
    c7: { type: 'p', color: 'b', nameAz: 'Qara Piyada' },
    d7: { type: 'p', color: 'b', nameAz: 'Qara Piyada' },
    e7: { type: 'p', color: 'b', nameAz: 'Qara Piyada' },
    f7: { type: 'p', color: 'b', nameAz: 'Qara Piyada' },
    g7: { type: 'p', color: 'b', nameAz: 'Qara Piyada' },
    h7: { type: 'p', color: 'b', nameAz: 'Qara Piyada' },
    a2: { type: 'p', color: 'w', nameAz: 'Ağ Piyada' },
    b2: { type: 'p', color: 'w', nameAz: 'Ağ Piyada' },
    c2: { type: 'p', color: 'w', nameAz: 'Ağ Piyada' },
    d2: { type: 'p', color: 'w', nameAz: 'Ağ Piyada' },
    e2: { type: 'p', color: 'w', nameAz: 'Ağ Piyada' },
    f2: { type: 'p', color: 'w', nameAz: 'Ağ Piyada' },
    g2: { type: 'p', color: 'w', nameAz: 'Ağ Piyada' },
    h2: { type: 'p', color: 'w', nameAz: 'Ağ Piyada' },
    a1: { type: 'r', color: 'w', nameAz: 'Ağ Top' },
    b1: { type: 'n', color: 'w', nameAz: 'Ağ At' },
    c1: { type: 'b', color: 'w', nameAz: 'Ağ Fil' },
    d1: { type: 'q', color: 'w', nameAz: 'Ağ Vəzir' },
    e1: { type: 'k', color: 'w', nameAz: 'Ağ Şah' },
    f1: { type: 'b', color: 'w', nameAz: 'Ağ Fil' },
    g1: { type: 'n', color: 'w', nameAz: 'Ağ At' },
    h1: { type: 'r', color: 'w', nameAz: 'Ağ Top' },
  };

  return (
    <section id="board" className="py-16 lg:py-24 bg-[#2b1d0e] border-b border-[rgba(243,236,225,0.10)]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <ScrollReveal direction="up" className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-serif text-[clamp(2rem,3.5vw,2.5rem)] font-normal text-[#f3ece1] tracking-tight leading-[1.1]">
            Şahmat Lövhəsi və Fiqurların Düzülüşü
          </h2>
          <p className="text-sm sm:text-base text-[#d9c7a6] mt-2">
            Şahmat lövhəsi 64 kvadratdan ibarətdir: 32 açıq və 32 tünd xana. Xanalar şaquli hərflər (a-h) və üfüqi rəqəmlər (1-8) ilə adlandırılır.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Visual Chessboard */}
          <ScrollReveal direction="left" className="lg:col-span-7 flex flex-col items-center justify-center">
            <div className="p-3 sm:p-5 bg-[#24170a] rounded-[18px] border border-[rgba(243,236,225,0.12)] shadow-xl">
              <div className="relative">
                {/* Top Files Letters */}
                <div className="grid grid-cols-8 text-center text-xs font-semibold text-[#d9c7a6] pb-1.5 pl-6 pr-6">
                  {files.map((f) => (
                    <span key={f}>{f}</span>
                  ))}
                </div>

                <div className="flex">
                  {/* Left Ranks Numbers */}
                  <div className="flex flex-col justify-around text-xs font-semibold text-[#d9c7a6] pr-2 w-6 text-right">
                    {ranks.map((r) => (
                      <span key={r}>{r}</span>
                    ))}
                  </div>

                  {/* 8x8 Board Grid */}
                  <div className="grid grid-cols-8 grid-rows-8 w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] md:w-[420px] md:h-[420px] border border-[rgba(243,236,225,0.10)] rounded-[12px] overflow-hidden shadow-inner">
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
                              isLight ? 'bg-[#efe7d8]' : 'bg-[#8c6747]'
                            } ${
                              isSelected ? 'ring-3 ring-inset ring-[#e9cfa0]' : ''
                            }`}
                            title={`Xana: ${square}${piece ? ` (${piece.nameAz})` : ''}`}
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
                  <div className="flex flex-col justify-around text-xs font-semibold text-[#d9c7a6] pl-2 w-6 text-left">
                    {ranks.map((r) => (
                      <span key={r}>{r}</span>
                    ))}
                  </div>
                </div>

                {/* Bottom Files Letters */}
                <div className="grid grid-cols-8 text-center text-xs font-semibold text-[#d9c7a6] pt-1.5 pl-6 pr-6">
                  {files.map((f) => (
                    <span key={f}>{f}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Selected square feedback */}
            <div className="mt-3.5 text-xs text-[#f3ece1] bg-[#362513] px-4 py-2 rounded-full border border-[rgba(243,236,225,0.10)] shadow-xs">
              {selectedSquare ? (
                <span>
                  Seçilmiş xana: <strong className="text-[#e9cfa0] font-bold">{selectedSquare.toUpperCase()}</strong>
                  {initialSetup[selectedSquare] && (
                    <span>: {initialSetup[selectedSquare].nameAz}</span>
                  )}
                </span>
              ) : (
                <span className="text-[#d9c7a6]">Xanaya klikləyərək adını və üzərindəki fiquru öyrənin.</span>
              )}
            </div>
          </ScrollReveal>

          {/* Educational Guidelines (Clean Editorial Numbered List) */}
          <ScrollReveal direction="right" className="lg:col-span-5 space-y-4">
            <div className="bg-[#362513] p-5 rounded-[18px] border border-[rgba(243,236,225,0.10)] space-y-1.5 shadow-sm">
              <span className="text-xs font-semibold text-[#e9cfa0] uppercase tracking-wider block">
                01. Qayda
              </span>
              <h3 className="font-serif text-lg font-normal text-[#f3ece1]">
                Sağda açıq xana qaydası
              </h3>
              <p className="text-sm text-[#d9c7a6] leading-relaxed">
                Lövhəni qoyarkən hər iki oyunçunun ən sağ küncündə mütləq açıq (ağ) xana (h1 və a8) olmalıdır.
              </p>
            </div>

            <div className="bg-[#362513] p-5 rounded-[18px] border border-[rgba(243,236,225,0.10)] space-y-1.5 shadow-sm">
              <span className="text-xs font-semibold text-[#e9cfa0] uppercase tracking-wider block">
                02. Qayda
              </span>
              <h3 className="font-serif text-lg font-normal text-[#f3ece1]">
                Vəzirin öz rəngi qaydası
              </h3>
              <p className="text-sm text-[#d9c7a6] leading-relaxed">
                Ağ Vəzir həmişə açıq xanada (d1), Qara Vəzir isə tünd xanada (d8) dayanır. Şah isə qonşu e xanasına yerləşir.
              </p>
            </div>

            <div className="bg-[#362513] p-5 rounded-[18px] border border-[rgba(243,236,225,0.10)] space-y-1.5 shadow-sm">
              <span className="text-xs font-semibold text-[#e9cfa0] uppercase tracking-wider block">
                03. Qayda
              </span>
              <h3 className="font-serif text-lg font-normal text-[#f3ece1]">
                Piyadaların ön xətti
              </h3>
              <p className="text-sm text-[#d9c7a6] leading-relaxed">
                Bütün 8 ağ piyada 2-ci xətdə, bütün 8 qara piyada isə 7-ci xətdə yerləşərək arxadakı fiqurları qoruyur.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
