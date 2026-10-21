'use client';

import React, { useState, useMemo } from 'react';
import { ChessPieceSvg } from './ChessPieceSvg';
import { RotateCw, Trash2, Copy, Check, RefreshCw, LayoutGrid, Sparkles } from 'lucide-react';

type PieceType = 'p' | 'n' | 'b' | 'r' | 'q' | 'k';
type PieceColor = 'w' | 'b';
interface PieceSelection {
  type: PieceType;
  color: PieceColor;
}

const INITIAL_BOARD: Record<string, { type: PieceType; color: PieceColor }> = {
  a8: { type: 'r', color: 'b' }, b8: { type: 'n', color: 'b' }, c8: { type: 'b', color: 'b' }, d8: { type: 'q', color: 'b' },
  e8: { type: 'k', color: 'b' }, f8: { type: 'b', color: 'b' }, g8: { type: 'n', color: 'b' }, h8: { type: 'r', color: 'b' },
  a7: { type: 'p', color: 'b' }, b7: { type: 'p', color: 'b' }, c7: { type: 'p', color: 'b' }, d7: { type: 'p', color: 'b' },
  e7: { type: 'p', color: 'b' }, f7: { type: 'p', color: 'b' }, g7: { type: 'p', color: 'b' }, h7: { type: 'p', color: 'b' },
  a2: { type: 'p', color: 'w' }, b2: { type: 'p', color: 'w' }, c2: { type: 'p', color: 'w' }, d2: { type: 'p', color: 'w' },
  e2: { type: 'p', color: 'w' }, f2: { type: 'p', color: 'w' }, g2: { type: 'p', color: 'w' }, h2: { type: 'p', color: 'w' },
  a1: { type: 'r', color: 'w' }, b1: { type: 'n', color: 'w' }, c1: { type: 'b', color: 'w' }, d1: { type: 'q', color: 'w' },
  e1: { type: 'k', color: 'w' }, f1: { type: 'b', color: 'w' }, g1: { type: 'n', color: 'w' }, h1: { type: 'r', color: 'w' },
};

export function PositionSetupBoard() {
  const [board, setBoard] = useState<Record<string, { type: PieceType; color: PieceColor }>>(INITIAL_BOARD);
  const [selectedPalette, setSelectedPalette] = useState<PieceSelection | 'trash' | null>({ type: 'q', color: 'w' });
  const [isFlipped, setIsFlipped] = useState(false);
  const [copied, setCopied] = useState(false);

  const whitePieces: PieceType[] = ['k', 'q', 'r', 'b', 'n', 'p'];
  const blackPieces: PieceType[] = ['k', 'q', 'r', 'b', 'n', 'p'];

  const ranks = isFlipped ? ['1', '2', '3', '4', '5', '6', '7', '8'] : ['8', '7', '6', '5', '4', '3', '2', '1'];
  const files = isFlipped ? ['h', 'g', 'f', 'e', 'd', 'c', 'b', 'a'] : ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

  // Handle square click
  const handleSquareClick = (square: string) => {
    if (!selectedPalette) return;

    if (selectedPalette === 'trash') {
      if (board[square]) {
        const next = { ...board };
        delete next[square];
        setBoard(next);
      }
      return;
    }

    setBoard((prev) => ({
      ...prev,
      [square]: { type: selectedPalette.type, color: selectedPalette.color },
    }));
  };

  // Generate FEN
  const fenString = useMemo(() => {
    const ranksOrder = ['8', '7', '6', '5', '4', '3', '2', '1'];
    const filesOrder = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const rankStrings: string[] = [];

    for (const rank of ranksOrder) {
      let emptyCount = 0;
      let rankStr = '';
      for (const file of filesOrder) {
        const square = `${file}${rank}`;
        const piece = board[square];
        if (!piece) {
          emptyCount++;
        } else {
          if (emptyCount > 0) {
            rankStr += emptyCount;
            emptyCount = 0;
          }
          const char = piece.type.toUpperCase();
          rankStr += piece.color === 'w' ? char : char.toLowerCase();
        }
      }
      if (emptyCount > 0) {
        rankStr += emptyCount;
      }
      rankStrings.push(rankStr);
    }

    return `${rankStrings.join('/')} w - - 0 1`;
  }, [board]);

  const copyFen = () => {
    navigator.clipboard.writeText(fenString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setBoard({});
  };

  const handleReset = () => {
    setBoard(INITIAL_BOARD);
  };

  return (
    <section id="position-setup" className="py-20 relative bg-[#0d0b17] overflow-hidden">
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-[#7c5cff]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#7c5cff]/10 border border-[#7c5cff]/20 text-[#9a82ff] text-xs font-semibold uppercase tracking-wider mb-4">
            <LayoutGrid className="w-3.5 h-3.5" />
            İnteraktiv Şahmat Lövhəsi
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#ecebf5] tracking-tight">
            Öz Vəziyyətini Quraşdır
          </h2>
          <p className="mt-3 text-[#9893b8] text-base sm:text-lg">
            Aşağıdakı palitradan fiqur seçin və lövhədə istədiyiniz xanaya yerləşdirin. Yaratdığınız mövqeyin FEN kodunu asanlıqla kopyalayın.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
          {/* Main Board */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <div className="w-full max-w-[500px] bg-[#171428] border border-[#2d2750] p-4 sm:p-5 rounded-3xl shadow-2xl">
              {/* Board controls bar */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-[#9893b8] uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  {isFlipped ? 'Qara Tərəfdən Baxış' : 'Ağ Tərəfdən Baxış'}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsFlipped(!isFlipped)}
                    title="Lövhəni çevir"
                    className="p-2 rounded-xl bg-[#211c3a] border border-[#2d2750] text-[#9893b8] hover:text-[#ecebf5] hover:bg-[#2d2750] transition-colors cursor-pointer"
                  >
                    <RotateCw className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleReset}
                    title="Başlanğıc vəziyyət"
                    className="p-2 rounded-xl bg-[#211c3a] border border-[#2d2750] text-[#9893b8] hover:text-[#ecebf5] hover:bg-[#2d2750] transition-colors cursor-pointer"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleClear}
                    title="Lövhəni təmizlə"
                    className="p-2 rounded-xl bg-[#211c3a] border border-[#2d2750] text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* 8x8 Grid */}
              <div className="aspect-square w-full rounded-2xl overflow-hidden border border-[#2d2750] grid grid-cols-8 grid-rows-8 shadow-inner select-none">
                {ranks.map((rank, rankIdx) =>
                  files.map((file, fileIdx) => {
                    const square = `${file}${rank}`;
                    const isLight = (rankIdx + fileIdx) % 2 === 0;
                    const piece = board[square];

                    return (
                      <div
                        key={square}
                        onClick={() => handleSquareClick(square)}
                        className={`relative flex items-center justify-center cursor-pointer transition-transform hover:opacity-90 active:scale-95 ${
                          isLight ? 'bg-[#b9b0d9]' : 'bg-[#5b4b9a]'
                        }`}
                      >
                        {piece && (
                          <div className="w-[85%] h-[85%] pointer-events-none transform transition-transform duration-150">
                            <ChessPieceSvg type={piece.type} color={piece.color} />
                          </div>
                        )}
                        {/* Notation Coordinates */}
                        {fileIdx === 0 && (
                          <span
                            className={`absolute top-0.5 left-1 text-[10px] font-bold pointer-events-none ${
                              isLight ? 'text-[#5b4b9a]/70' : 'text-[#b9b0d9]/70'
                            }`}
                          >
                            {rank}
                          </span>
                        )}
                        {rankIdx === 7 && (
                          <span
                            className={`absolute bottom-0.5 right-1 text-[10px] font-bold pointer-events-none ${
                              isLight ? 'text-[#5b4b9a]/70' : 'text-[#b9b0d9]/70'
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
            </div>
          </div>

          {/* Right: Piece Palette & Tools */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#171428] border border-[#2d2750] p-6 rounded-3xl shadow-xl space-y-6">
              <div>
                <h3 className="text-sm uppercase font-bold tracking-wider text-[#ecebf5] mb-1">
                  Fiqur Palitrası
                </h3>
                <p className="text-xs text-[#9893b8]">
                  Fiquru seçin və lövhədəki istənilən xanaya vurun.
                </p>
              </div>

              {/* White Pieces */}
              <div>
                <span className="text-xs font-semibold text-[#ecebf5] block mb-2.5">
                  Ağ Fiqurlar:
                </span>
                <div className="grid grid-cols-6 gap-2">
                  {whitePieces.map((type) => {
                    const isSelected =
                      selectedPalette &&
                      typeof selectedPalette === 'object' &&
                      selectedPalette.type === type &&
                      selectedPalette.color === 'w';

                    return (
                      <button
                        key={`w-${type}`}
                        onClick={() => setSelectedPalette({ type, color: 'w' })}
                        className={`h-12 rounded-xl flex items-center justify-center p-2 transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#7c5cff] shadow-lg shadow-[#7c5cff]/30 ring-2 ring-white/80 scale-105'
                            : 'bg-[#211c3a] border border-[#2d2750] hover:bg-[#2d2750]'
                        }`}
                      >
                        <div className="w-8 h-8">
                          <ChessPieceSvg type={type} color="w" />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Black Pieces */}
              <div>
                <span className="text-xs font-semibold text-[#ecebf5] block mb-2.5">
                  Qara Fiqurlar:
                </span>
                <div className="grid grid-cols-6 gap-2">
                  {blackPieces.map((type) => {
                    const isSelected =
                      selectedPalette &&
                      typeof selectedPalette === 'object' &&
                      selectedPalette.type === type &&
                      selectedPalette.color === 'b';

                    return (
                      <button
                        key={`b-${type}`}
                        onClick={() => setSelectedPalette({ type, color: 'b' })}
                        className={`h-12 rounded-xl flex items-center justify-center p-2 transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#7c5cff] shadow-lg shadow-[#7c5cff]/30 ring-2 ring-white/80 scale-105'
                            : 'bg-[#211c3a] border border-[#2d2750] hover:bg-[#2d2750]'
                        }`}
                      >
                        <div className="w-8 h-8">
                          <ChessPieceSvg type={type} color="b" />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Action tools */}
              <div className="pt-4 border-t border-[#2d2750]">
                <span className="text-xs font-semibold text-[#ecebf5] block mb-2.5">
                  Alətlər:
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setSelectedPalette('trash')}
                    className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      selectedPalette === 'trash'
                        ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/25 ring-2 ring-white'
                        : 'bg-[#211c3a] text-rose-400 border border-[#2d2750] hover:bg-rose-500/10'
                    }`}
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Silmə Aləti</span>
                  </button>

                  <button
                    onClick={handleClear}
                    className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold bg-[#211c3a] text-[#9893b8] hover:text-[#ecebf5] border border-[#2d2750] hover:bg-[#2d2750] transition-colors cursor-pointer"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Lövhəni Sıfırla</span>
                  </button>
                </div>
              </div>

              {/* FEN Output Box */}
              <div className="pt-4 border-t border-[#2d2750] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-bold tracking-wider text-[#9a82ff]">
                    Mövqenin FEN Kodu
                  </span>
                  <button
                    onClick={copyFen}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#7c5cff]/20 hover:bg-[#7c5cff]/30 text-[#9a82ff] text-xs font-medium transition-colors cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Kopyalandı!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Kopyala</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="p-3 rounded-xl bg-[#0d0b17] border border-[#2d2750] font-mono text-xs text-[#ecebf5] break-all select-all">
                  {fenString}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
