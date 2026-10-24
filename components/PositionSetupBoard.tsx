'use client';

import React, { useState, useMemo } from 'react';
import { ChessPieceSvg } from './ChessPieceSvg';
import { RotateCw, Trash2, Copy, Check, RefreshCw } from 'lucide-react';

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
    setTimeout(() => setCopied(false), 1800);
  };

  const handleClear = () => {
    setBoard({});
  };

  const handleReset = () => {
    setBoard(INITIAL_BOARD);
  };

  return (
    <section id="setup-board" className="py-16 lg:py-24 bg-[#0d0b17]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-[clamp(1.75rem,3vw,2.25rem)] font-bold text-[#ecebf5] tracking-tight">
            Şahmat Mövqe Qurucusu
          </h2>
          <p className="text-sm sm:text-base text-[#9893b8] mt-2">
            Palitradan fiqur seçin və lövhədə istədiyiniz xanaya yerləşdirin. Mövqeyin FEN kodunu asanlıqla əldə edin.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
          {/* Main Board */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <div className="w-full max-w-[440px] card-flat p-4 sm:p-5">
              {/* Controls bar */}
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#2d2750]">
                <span className="text-xs font-semibold text-[#ecebf5]">
                  {isFlipped ? 'Qara tərəfdən baxış' : 'Ağ tərəfdən baxış'}
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setIsFlipped(!isFlipped)}
                    title="Lövhəni çevir"
                    className="p-1.5 rounded-[8px] bg-[#211c3a] border border-[#2d2750] text-[#9893b8] hover:text-[#ecebf5] transition-colors cursor-pointer"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={handleReset}
                    title="Başlanğıc vəziyyəti bərpa et"
                    className="p-1.5 rounded-[8px] bg-[#211c3a] border border-[#2d2750] text-[#9893b8] hover:text-[#ecebf5] transition-colors cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={handleClear}
                    title="Lövhəni təmizlə"
                    className="p-1.5 rounded-[8px] bg-[#211c3a] border border-[#2d2750] text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* 8x8 Grid */}
              <div className="aspect-square w-full rounded-[8px] overflow-hidden border border-[#2d2750] grid grid-cols-8 grid-rows-8 select-none">
                {ranks.map((rank, rankIdx) =>
                  files.map((file, fileIdx) => {
                    const square = `${file}${rank}`;
                    const isLight = (rankIdx + fileIdx) % 2 === 0;
                    const piece = board[square];

                    return (
                      <div
                        key={square}
                        onClick={() => handleSquareClick(square)}
                        className={`relative flex items-center justify-center cursor-pointer transition-colors ${
                          isLight ? 'bg-[#b9b0d9]' : 'bg-[#5b4b9a]'
                        }`}
                      >
                        {piece && (
                          <div className="w-[84%] h-[84%] pointer-events-none">
                            <ChessPieceSvg type={piece.type} color={piece.color} />
                          </div>
                        )}
                        {/* Coordinates */}
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
            </div>
          </div>

          {/* Right: Piece Palette & Tools */}
          <div className="lg:col-span-5 space-y-4">
            <div className="card-flat p-5 space-y-5">
              <div>
                <h3 className="text-sm font-bold text-[#ecebf5]">
                  Fiqur Palitrası
                </h3>
                <p className="text-xs text-[#9893b8] mt-0.5">
                  Fiquru seçin və lövhədəki xanaya klikləyin.
                </p>
              </div>

              {/* White Pieces */}
              <div>
                <span className="text-xs font-semibold text-[#9893b8] block mb-2">
                  Ağ fiqurlar:
                </span>
                <div className="grid grid-cols-6 gap-1.5">
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
                        className={`h-11 rounded-[8px] flex items-center justify-center p-1.5 transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-[#7c5cff]'
                            : 'bg-[#211c3a] border border-[#2d2750] hover:bg-[#2d2750]'
                        }`}
                      >
                        <div className="w-7 h-7">
                          <ChessPieceSvg type={type} color="w" />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Black Pieces */}
              <div>
                <span className="text-xs font-semibold text-[#9893b8] block mb-2">
                  Qara fiqurlar:
                </span>
                <div className="grid grid-cols-6 gap-1.5">
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
                        className={`h-11 rounded-[8px] flex items-center justify-center p-1.5 transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-[#7c5cff]'
                            : 'bg-[#211c3a] border border-[#2d2750] hover:bg-[#2d2750]'
                        }`}
                      >
                        <div className="w-7 h-7">
                          <ChessPieceSvg type={type} color="b" />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Tools: Trash & Clear */}
              <div className="pt-3 border-t border-[#2d2750] grid grid-cols-2 gap-2">
                <button
                  onClick={() => setSelectedPalette('trash')}
                  className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-[8px] text-xs font-semibold transition-colors cursor-pointer ${
                    selectedPalette === 'trash'
                      ? 'bg-rose-600 text-white'
                      : 'bg-[#211c3a] text-rose-400 border border-[#2d2750] hover:bg-rose-500/10'
                  }`}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Silmə rejimi</span>
                </button>

                <button
                  onClick={handleClear}
                  className="btn-secondary py-2 px-3 text-xs"
                >
                  <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
                  <span>Təmizlə</span>
                </button>
              </div>

              {/* FEN Output */}
              <div className="pt-3 border-t border-[#2d2750] space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#9893b8]">
                    FEN Kodu
                  </span>
                  <button
                    onClick={copyFen}
                    className="btn-secondary px-2.5 py-1 text-xs"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400 mr-1" />
                        <span className="text-emerald-400">Kopyalandı</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 mr-1" />
                        <span>Kopyala</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="p-2.5 rounded-[8px] bg-[#0d0b17] border border-[#2d2750] font-mono text-[11px] text-[#ecebf5] break-all select-all">
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
