'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Chess, type Square } from 'chess.js';
import { RotateCw } from 'lucide-react';
import { ChessPieceSvg, PieceType } from './ChessPieceSvg';
import { useLanguage } from './LanguageProvider';
import { formatClock } from '@/lib/time-controls';

export const START_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

const PIECE_VALUES: Record<PieceType, number> = { p: 1, n: 3, b: 3, r: 5, q: 9, k: 0 };
const sortByValue = (pieces: PieceType[]) =>
  [...pieces].sort((a, b) => PIECE_VALUES[b] - PIECE_VALUES[a]);

export interface PlayMove {
  id?: string | number;
  san: string;
  fen: string;
  color: 'w' | 'b';
  captured?: PieceType | null;
}

export interface PlayMoveInput {
  from: string;
  to: string;
  san: string;
  fen: string;
  color: 'w' | 'b';
  captured?: PieceType;
}

interface PlayBoardProps {
  fen: string;
  moves: PlayMove[];
  orientation?: 'w' | 'b';
  canMove?: boolean;
  busy?: boolean;
  statusText?: string | null;
  infoText?: string | null;
  errorText?: string | null;
  actions?: React.ReactNode;
  onMove?: (move: PlayMoveInput) => void;
  clock?: {
    white: number;
    black: number;
    active?: 'w' | 'b' | null;
    flagged?: 'w' | 'b' | null;
  } | null;
  timeLabel?: string | null;
}

type BoardState = Record<string, { type: PieceType; color: 'w' | 'b' } | null>;

export function PlayBoard({
  fen,
  moves,
  orientation = 'w',
  canMove = true,
  busy = false,
  statusText,
  infoText,
  errorText,
  actions,
  onMove,
  clock,
  timeLabel,
}: PlayBoardProps) {
  const { t } = useLanguage();
  const [flipped, setFlipped] = useState(orientation === 'b');
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    setFlipped(orientation === 'b');
    setSelected(null);
  }, [orientation]);

  useEffect(() => {
    setSelected(null);
  }, [fen]);

  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];
  const displayFiles = flipped ? [...files].reverse() : files;
  const displayRanks = flipped ? [...ranks].reverse() : ranks;

  const game = useMemo(() => {
    try {
      return new Chess(fen);
    } catch {
      return null;
    }
  }, [fen]);

  const activeBoard: BoardState = useMemo(() => {
    const next: BoardState = {};
    if (!game) return next;
    game.board().forEach((row, rankIdx) =>
      row.forEach((piece, fileIdx) => {
        if (piece) {
          next[`${files[fileIdx]}${ranks[rankIdx]}`] = {
            type: piece.type as PieceType,
            color: piece.color as 'w' | 'b',
          };
        }
      })
    );
    return next;
  }, [game]);

  const legalTargets: string[] = useMemo(() => {
    if (!game || !selected || !canMove) return [];
    try {
      return game.moves({ square: selected as Square, verbose: true }).map((m) => m.to);
    } catch {
      return [];
    }
  }, [game, selected, canMove]);

  const handleSquareClick = (square: string) => {
    if (!game || !canMove || busy) return;

    if (selected) {
      if (selected === square) {
        setSelected(null);
        return;
      }
      if (legalTargets.includes(square)) {
        try {
          const move = game.move({
            from: selected as Square,
            to: square as Square,
            promotion: 'q',
          });
          if (move) {
            onMove?.({
              from: move.from,
              to: move.to,
              san: move.san,
              fen: game.fen(),
              color: move.color as 'w' | 'b',
              captured: move.captured as PieceType | undefined,
            });
            setSelected(null);
            return;
          }
        } catch {
          // Qanunsuz həmlə — seçim saxlanılır.
        }
      }
      const clicked = activeBoard[square];
      setSelected(clicked && clicked.color === game.turn() ? square : null);
      return;
    }

    const piece = activeBoard[square];
    if (piece && piece.color === game.turn()) setSelected(square);
  };

  const captured = moves.reduce(
    (acc, move) => {
      if (!move.captured) return acc;
      acc[move.color === 'w' ? 'w' : 'b'].push(move.captured);
      return acc;
    },
    { w: [] as PieceType[], b: [] as PieceType[] }
  );

  const materialDiff =
    captured.w.reduce((sum, piece) => sum + PIECE_VALUES[piece], 0) -
    captured.b.reduce((sum, piece) => sum + PIECE_VALUES[piece], 0);
  const aheadSide = materialDiff > 0 ? 'w' : materialDiff < 0 ? 'b' : null;

  const autoStatus = game
    ? game.isCheckmate()
      ? t('sandbox.checkmate')
      : game.isStalemate()
      ? t('sandbox.stalemate')
      : game.isDraw()
      ? t('sandbox.draw')
      : game.isCheck()
      ? t('sandbox.check')
      : null
    : null;
  const shownStatus = statusText ?? autoStatus;

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-4 items-start">
        <div className="lg:col-span-8 flex justify-start min-w-0">
          <div className="w-full max-w-[min(100%,calc(100dvh-5.5rem))]">
            <div className="aspect-square w-full rounded-[16px] overflow-hidden border-2 border-[var(--ink)]/20 grid grid-cols-8 grid-rows-8 select-none shadow-[0_8px_30px_rgba(30,42,34,0.12)]">
              {displayRanks.map((rank, rankIdx) =>
                displayFiles.map((file, fileIdx) => {
                  const square = `${file}${rank}`;
                  const origRankIdx = ranks.indexOf(rank);
                  const origFileIdx = files.indexOf(file);
                  const isLight = (origRankIdx + origFileIdx) % 2 === 0;
                  const piece = activeBoard[square];
                  const isSelected = selected === square;
                  const isTarget = legalTargets.includes(square);

                  return (
                    <div
                      key={square}
                      onClick={() => handleSquareClick(square)}
                      className={`relative flex items-center justify-center transition-colors ${
                        canMove && !busy ? 'cursor-pointer' : 'cursor-default'
                      } ${
                        isSelected
                          ? '!bg-[var(--butter)] ring-4 ring-[var(--primary)] ring-inset z-10'
                          : isTarget && piece
                          ? 'ring-4 ring-[var(--primary)]/60 ring-inset z-10'
                          : isLight
                          ? 'bg-[#EEEED2] hover:bg-[#e6e6c2]'
                          : 'bg-[#769656] hover:bg-[#6c8b4e]'
                      }`}
                    >
                      {isTarget && !piece && (
                        <span className="absolute w-[30%] h-[30%] rounded-full bg-[var(--primary-bg)]/55 pointer-events-none z-10" />
                      )}
                      {piece && (
                        <div className="w-[88%] h-[88%] pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.25)]">
                          <ChessPieceSvg type={piece.type} color={piece.color} />
                        </div>
                      )}
                      {fileIdx === 0 && (
                        <span
                          className={`absolute top-1 left-1.5 text-[13px] sm:text-[15px] font-bold pointer-events-none select-none ${
                            isLight ? 'text-[#769656]' : 'text-[#EEEED2]'
                          }`}
                        >
                          {rank}
                        </span>
                      )}
                      {rankIdx === 7 && (
                        <span
                          className={`absolute bottom-0.5 right-1.5 text-[13px] sm:text-[15px] font-bold pointer-events-none select-none ${
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
          </div>
        </div>

        <div className="lg:col-span-4 space-y-4">
          <div className="bg-[var(--surface)] rounded-[24px] border border-[var(--border)] p-4 sm:p-5 space-y-5 shadow-[0_4px_24px_rgba(30,42,34,0.06)]">
            {clock && (
              <div className="rounded-[16px] bg-[var(--bg)] border border-[var(--border)] p-4 space-y-2">
                <div className="flex items-center justify-between px-1">
                  <span className="text-[12px] font-bold uppercase tracking-wider text-[var(--ink-muted)]">
                    {t('play.clockTitle')}
                  </span>
                  {timeLabel && (
                    <span className="font-mono text-[14px] font-bold text-[var(--primary)]">
                      {timeLabel}
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  {(['w', 'b'] as const).map((side) => {
                    const value = side === 'w' ? clock.white : clock.black;
                    const isActive = clock.active === side;
                    const isFlagged = clock.flagged === side;
                    return (
                      <div
                        key={side}
                        className={`rounded-[12px] px-3 py-3 border transition-colors ${
                          isFlagged
                            ? 'bg-[var(--danger-bg)] border-[#E5A19B]'
                            : isActive
                            ? 'bg-[var(--primary-bg)] border-[var(--primary)]'
                            : 'bg-[var(--surface)] border-[var(--border)]'
                        }`}
                      >
                        <span
                          className={`block text-[12px] font-bold uppercase tracking-wider ${
                            isActive && !isFlagged ? 'text-[#DCE8D2]' : 'text-[var(--ink-muted)]'
                          }`}
                        >
                          {side === 'w' ? t('sandbox.whiteTurn') : t('sandbox.blackTurn')}
                        </span>
                        <span
                          className={`block font-mono text-2xl font-bold leading-tight ${
                            isFlagged || value <= 10000
                              ? isActive && !isFlagged
                                ? 'text-[var(--danger)]'
                                : 'text-[var(--danger)]'
                              : isActive
                              ? 'text-[var(--on-primary)]'
                              : 'text-[var(--ink)]'
                          }`}
                        >
                          {formatClock(value)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {moves.length > 0 && (captured.w.length > 0 || captured.b.length > 0) && (
              <div className="flex items-center justify-between gap-2">
                {(['b', 'w'] as const).map((side) => {
                  const extra =
                    aheadSide === side ? (
                      <span className="font-mono text-[10px] font-bold text-[var(--primary)]">
                        +{Math.abs(materialDiff)}
                      </span>
                    ) : null;
                  const icons = sortByValue(captured[side]).map((piece, i) => (
                    <div key={`${side}-${piece}-${i}`} className="w-3 h-3 shrink-0">
                      <ChessPieceSvg type={piece} color={side === 'w' ? 'b' : 'w'} />
                    </div>
                  ));

                  return (
                    <div
                      key={side}
                      className={`flex min-w-0 flex-wrap items-center gap-0.5 ${
                        side === 'w' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      {side === 'w' ? (
                        <>
                          {extra}
                          {icons}
                        </>
                      ) : (
                        <>
                          {icons}
                          {extra}
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {moves.length > 0 && (
              <div className="rounded-[16px] bg-[var(--bg)] border border-[var(--border)] p-4">
                <span className="text-[15px] font-bold uppercase tracking-wider text-[var(--ink-muted)] block mb-2">
                  {t('sandbox.notationTitle')}
                </span>
                <div className="max-h-44 overflow-y-auto rounded-[12px] border border-[var(--border)] bg-[var(--surface)] divide-y divide-[var(--border)]">
                  {Array.from({ length: Math.ceil(moves.length / 2) }, (_, i) => (
                    <div
                      key={i}
                      className="grid grid-cols-[2.25rem_1fr_1fr] gap-2.5 px-3 py-2 text-[15px] font-mono text-[var(--ink)] items-center"
                    >
                      <span className="text-[var(--ink-muted)]">{i + 1}.</span>
                      <span className="font-semibold text-[var(--primary)]">{moves[i * 2]?.san}</span>
                      <span>{moves[i * 2 + 1]?.san ?? ''}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {actions && <div className="space-y-2">{actions}</div>}

            <button
              onClick={() => setFlipped(!flipped)}
              className="w-full inline-flex items-center justify-center gap-2 px-3 py-3.5 rounded-[12px] bg-[var(--bg-alt)] border border-[var(--border)] text-[14px] font-semibold text-[var(--ink)] hover:bg-[var(--sage-100)] transition-colors cursor-pointer"
            >
              <RotateCw className="w-[18px] h-[18px] shrink-0" />
              <span>{t('sandbox.flipBtn')}</span>
            </button>

            <div className="pt-4 border-t border-[var(--border)] space-y-2">
              <p className="text-[14px] text-[var(--ink-muted)] leading-relaxed">
                {infoText ?? (canMove ? t('sandbox.playModeHint') : null)}
              </p>
              {shownStatus && (
                <p className="text-[15px] font-bold text-[var(--primary)] bg-[var(--sage-100)] border border-[#C9D9BC] rounded-[10px] px-3 py-3">
                  {shownStatus}
                </p>
              )}
              {errorText && (
                <p className="text-[14px] leading-relaxed text-[var(--danger)] bg-rose-50 border border-rose-200 rounded-[10px] px-3 py-3">
                  {errorText}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
