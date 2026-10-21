'use client';

import React, { useState } from 'react';
import { ChessPieceSvg } from './ChessPieceSvg';
import { Info, Sparkles, Shield } from 'lucide-react';

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
    <section id="board" className="py-16 sm:py-24 bg-[#0d0b17] border-b border-[#2d2750]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-xs font-bold text-[#9a82ff] uppercase tracking-widest mb-1.5">
            Dərs 01
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#ecebf5] tracking-tight">
            Şahmat Lövhəsi və Başlanğıc Vəziyyəti
          </h2>
          <p className="text-sm sm:text-base text-[#9893b8] mt-2">
            Şahmat lövhəsi 64 kvadratdan ibarətdir: 32 açıq və 32 tünd xana.
            Hər xananın öz xüsusi adı var (məsələn, <strong>e4</strong> və ya <strong>d1</strong>).
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Visual Chessboard */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center">
            <div className="p-3 sm:p-5 bg-[#171428] rounded-3xl shadow-2xl border border-[#2d2750]">
              <div className="relative">
                {/* Top Files Letters */}
                <div className="grid grid-cols-8 text-center text-xs font-bold text-[#9893b8] pb-1.5 pl-6 pr-6">
                  {files.map((f) => (
                    <span key={f}>{f}</span>
                  ))}
                </div>

                <div className="flex">
                  {/* Left Ranks Numbers */}
                  <div className="flex flex-col justify-around text-xs font-bold text-[#9893b8] pr-2 w-6 text-right">
                    {ranks.map((r) => (
                      <span key={r}>{r}</span>
                    ))}
                  </div>

                  {/* 8x8 Board Grid with #b9b0d9 and #5b4b9a */}
                  <div className="grid grid-cols-8 grid-rows-8 w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] md:w-[440px] md:h-[440px] border-2 border-[#2d2750] rounded-xl overflow-hidden shadow-inner">
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
                            className={`relative flex items-center justify-center transition-colors cursor-pointer select-none ${
                              isLight ? 'bg-[#b9b0d9]' : 'bg-[#5b4b9a]'
                            } ${
                              isSelected ? 'ring-3 ring-[#7c5cff] ring-inset bg-[#7c5cff]/40' : ''
                            } hover:opacity-95`}
                            title={`Xana: ${square}${piece ? ` (${piece.nameAz})` : ''}`}
                          >
                            {/* Inner coordinate markers */}
                            {fIdx === 0 && (
                              <span
                                className={`absolute top-0.5 left-1 text-[9px] font-bold ${
                                  isLight ? 'text-[#5b4b9a]' : 'text-[#b9b0d9]'
                                }`}
                              >
                                {rank}
                              </span>
                            )}
                            {rIdx === 7 && (
                              <span
                                className={`absolute bottom-0.5 right-1 text-[9px] font-bold ${
                                  isLight ? 'text-[#5b4b9a]' : 'text-[#b9b0d9]'
                                }`}
                              >
                                {file}
                              </span>
                            )}

                            {/* Piece SVG */}
                            {piece && (
                              <div className="w-[82%] h-[82%] flex items-center justify-center transform transition-transform hover:scale-110 drop-shadow-md">
                                <ChessPieceSvg type={piece.type} color={piece.color} />
                              </div>
                            )}
                          </div>
                        );
                      })
                    )}
                  </div>

                  {/* Right Ranks Numbers */}
                  <div className="flex flex-col justify-around text-xs font-bold text-[#9893b8] pl-2 w-6 text-left">
                    {ranks.map((r) => (
                      <span key={r}>{r}</span>
                    ))}
                  </div>
                </div>

                {/* Bottom Files Letters */}
                <div className="grid grid-cols-8 text-center text-xs font-bold text-[#9893b8] pt-1.5 pl-6 pr-6">
                  {files.map((f) => (
                    <span key={f}>{f}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Selected square tip badge */}
            <div className="mt-4 text-xs text-[#ecebf5] bg-[#171428] px-4 py-2 rounded-xl border border-[#2d2750] shadow-sm">
              {selectedSquare ? (
                <span>
                  Seçilmiş xana: <strong className="text-[#9a82ff]">{selectedSquare.toUpperCase()}</strong>
                  {initialSetup[selectedSquare] && (
                    <> — {initialSetup[selectedSquare].nameAz}</>
                  )}
                </span>
              ) : (
                <span className="text-[#9893b8]">İstənilən xanaya və ya fiqura klikləyərək adını öyrənin.</span>
              )}
            </div>
          </div>

          {/* Educational Guidelines Cards */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-[#171428] p-6 rounded-3xl border border-[#2d2750] shadow-sm card-hover-glow space-y-3">
              <div className="flex items-center gap-2.5 text-[#9a82ff]">
                <Sparkles className="w-5 h-5 text-[#7c5cff]" />
                <h3 className="font-bold text-base sm:text-lg text-[#ecebf5]">
                  1. Sağ künc qaydası (Sağda Açıq xana)
                </h3>
              </div>
              <p className="text-sm text-[#9893b8] leading-relaxed">
                Şahmat lövhəsini qarşınıza qoyarkən diqqət yetirin: <strong>hər iki oyunçunun ən sağ küncündə mütləq AÇIQ xana</strong> (h1 və a8) olmalıdır. 
                Əgər sağ künc tünddürsə, lövhə 90 dərəcə səhv qoyulub!
              </p>
            </div>

            <div className="bg-[#171428] p-6 rounded-3xl border border-[#2d2750] shadow-sm card-hover-glow space-y-3">
              <div className="flex items-center gap-2.5 text-[#9a82ff]">
                <Info className="w-5 h-5 text-[#7c5cff]" />
                <h3 className="font-bold text-base sm:text-lg text-[#ecebf5]">
                  2. «Vəzir öz rəngini sevir» qaydası
                </h3>
              </div>
              <p className="text-sm text-[#9893b8] leading-relaxed">
                Uşaqlar ən çox Şahla Vəzirin yerini qarışdırırlar. Yadda saxlamaq üçün qızıl qayda:
                <br />
                • <strong>Ağ Vəzir</strong> həmişə <strong>Açıq xanada</strong> (d1) dayanır.
                <br />
                • <strong>Qara Vəzir</strong> həmişə <strong>Tünd xanada</strong> (d8) dayanır.
              </p>
            </div>

            <div className="bg-[#171428] p-6 rounded-3xl border border-[#2d2750] shadow-sm card-hover-glow space-y-3">
              <div className="flex items-center gap-2.5 text-[#9a82ff]">
                <Shield className="w-5 h-5 text-[#7c5cff]" />
                <h3 className="font-bold text-base sm:text-lg text-[#ecebf5]">
                  3. Piyada sipəri
                </h3>
              </div>
              <p className="text-sm text-[#9893b8] leading-relaxed">
                Bütün 8 ağ piyada 2-ci xətdə, bütün 8 qara piyada isə 7-ci xətdə səf-səf düzülərək arxadakı böyük fiqurları qoruyurlar.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
