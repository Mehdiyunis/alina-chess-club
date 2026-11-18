'use client';

import { useState } from 'react';
import { Chess, type Square } from 'chess.js';
import { ChessPieceSvg, PieceType, PieceColor } from './ChessPieceSvg';
import { RotateCw, RefreshCw, Trash2, Copy, Check, Move, Play, Square as SquareIcon } from 'lucide-react';
import { useLanguage } from './LanguageProvider';

type BoardState = Record<string, { type: PieceType; color: PieceColor } | null>;

const PIECE_VALUES: Record<PieceType, number> = { p: 1, n: 3, b: 3, r: 5, q: 9, k: 0 };
const sortByValue = (pieces: PieceType[]) =>
  [...pieces].sort((a, b) => PIECE_VALUES[b] - PIECE_VALUES[a]);

const INITIAL_BOARD: BoardState = {
  a8: { type: 'r', color: 'b' }, b8: { type: 'n', color: 'b' }, c8: { type: 'b', color: 'b' }, d8: { type: 'q', color: 'b' },
  e8: { type: 'k', color: 'b' }, f8: { type: 'b', color: 'b' }, g8: { type: 'n', color: 'b' }, h8: { type: 'r', color: 'b' },
  a7: { type: 'p', color: 'b' }, b7: { type: 'p', color: 'b' }, c7: { type: 'p', color: 'b' }, d7: { type: 'p', color: 'b' },
  e7: { type: 'p', color: 'b' }, f7: { type: 'p', color: 'b' }, g7: { type: 'p', color: 'b' }, h7: { type: 'p', color: 'b' },
  a2: { type: 'p', color: 'w' }, b2: { type: 'p', color: 'w' }, c2: { type: 'p', color: 'w' }, d2: { type: 'p', color: 'w' },
  e2: { type: 'p', color: 'w' }, f2: { type: 'p', color: 'w' }, g2: { type: 'p', color: 'w' }, h2: { type: 'p', color: 'w' },
  a1: { type: 'r', color: 'w' }, b1: { type: 'n', color: 'w' }, c1: { type: 'b', color: 'w' }, d1: { type: 'q', color: 'w' },
  e1: { type: 'k', color: 'w' }, f1: { type: 'b', color: 'w' }, g1: { type: 'n', color: 'w' }, h1: { type: 'r', color: 'w' },
};

export function AnalysisBoard() {
  const { t } = useLanguage();
  const [board, setBoard] = useState<BoardState>(INITIAL_BOARD);
  const [selectedPalette, setSelectedPalette] = useState<
    { type: PieceType; color: PieceColor } | 'trash' | 'move' | null
  >({ type: 'p', color: 'w' });
  const [selectedBoardSquare, setSelectedBoardSquare] = useState<string | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [copied, setCopied] = useState(false);
  const [mode, setMode] = useState<'edit' | 'play'>('edit');
  const [startTurn, setStartTurn] = useState<'w' | 'b'>('w');
  const [gameFen, setGameFen] = useState<string | null>(null);
  const [moves, setMoves] = useState<string[]>([]);
  const [captured, setCaptured] = useState<{ w: PieceType[]; b: PieceType[] }>({ w: [], b: [] });
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const [errMsg, setErrMsg] = useState<string | null>(null);

  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];

  const displayFiles = isFlipped ? [...files].reverse() : files;
  const displayRanks = isFlipped ? [...ranks].reverse() : ranks;

  const whitePieces: PieceType[] = ['k', 'q', 'r', 'b', 'n', 'p'];
  const blackPieces: PieceType[] = ['k', 'q', 'r', 'b', 'n', 'p'];

  const isInitialPosition = files.every((file) =>
    ranks.every((rank) => {
      const key = `${file}${rank}`;
      return (board[key]?.type ?? null) === (INITIAL_BOARD[key]?.type ?? null) &&
        (board[key]?.color ?? null) === (INITIAL_BOARD[key]?.color ?? null);
    })
  );

  const effectiveStartTurn: 'w' | 'b' = isInitialPosition ? 'w' : startTurn;

  const boardToFen = (source: BoardState, turn: 'w' | 'b') => {
    const fenRanks: string[] = [];
    for (const rank of ranks) {
      let emptyCount = 0;
      let rankString = '';
      for (const file of files) {
        const piece = source[`${file}${rank}`];
        if (!piece) {
          emptyCount++;
        } else {
          if (emptyCount > 0) {
            rankString += emptyCount;
            emptyCount = 0;
          }
          rankString += piece.color === 'w' ? piece.type.toUpperCase() : piece.type.toLowerCase();
        }
      }
      if (emptyCount > 0) rankString += emptyCount;
      fenRanks.push(rankString);
    }

    let castling = '';
    if (source.e1?.type === 'k' && source.e1.color === 'w') {
      if (source.h1?.type === 'r' && source.h1.color === 'w') castling += 'K';
      if (source.a1?.type === 'r' && source.a1.color === 'w') castling += 'Q';
    }
    if (source.e8?.type === 'k' && source.e8.color === 'b') {
      if (source.h8?.type === 'r' && source.h8.color === 'b') castling += 'k';
      if (source.a8?.type === 'r' && source.a8.color === 'b') castling += 'q';
    }

    return `${fenRanks.join('/')} ${turn} ${castling || '-'} - 0 1`;
  };

  const countKings = (source: BoardState) =>
    Object.values(source).reduce(
      (acc, piece) => {
        if (piece?.type === 'k') {
          if (piece.color === 'w') acc.white++;
          else acc.black++;
        }
        return acc;
      },
      { white: 0, black: 0 }
    );

  const getStatus = (chess: Chess) => {
    if (chess.isCheckmate()) return t('sandbox.checkmate');
    if (chess.isStalemate()) return t('sandbox.stalemate');
    if (chess.isDraw()) return t('sandbox.draw');
    if (chess.isCheck()) return t('sandbox.check');
    return null;
  };

  const game = (() => {
    if (!gameFen) return null;
    try {
      return new Chess(gameFen);
    } catch {
      return null;
    }
  })();

  const activeBoard: BoardState = (() => {
    if (mode === 'play' && game) {
      const next: BoardState = {};
      game.board().forEach((row, rankIdx) =>
        row.forEach((piece, fileIdx) => {
          if (piece) {
            next[`${files[fileIdx]}${ranks[rankIdx]}`] = {
              type: piece.type as PieceType,
              color: piece.color as PieceColor,
            };
          }
        })
      );
      return next;
    }
    return board;
  })();

  const legalTargets: string[] = (() => {
    if (mode !== 'play' || !game || !selectedBoardSquare) return [];
    try {
      return game.moves({ square: selectedBoardSquare as Square, verbose: true }).map((m) => m.to);
    } catch {
      return [];
    }
  })();

  const handleStart = () => {
    const kings = countKings(board);
    if (kings.white !== 1 || kings.black !== 1) {
      setErrMsg(t('sandbox.errKings'));
      return;
    }
    const fen = boardToFen(board, effectiveStartTurn);
    let chess: Chess;
    try {
      chess = new Chess(fen);
    } catch {
      setErrMsg(t('sandbox.errKings'));
      return;
    }
    setGameFen(fen);
    setMoves([]);
    setCaptured({ w: [], b: [] });
    setStatusMsg(getStatus(chess));
    setErrMsg(null);
    setSelectedBoardSquare(null);
    setMode('play');
  };

  const handleEnd = () => {
    if (game) {
      const next: BoardState = {};
      game.board().forEach((row, rankIdx) =>
        row.forEach((piece, fileIdx) => {
          if (piece) {
            next[`${files[fileIdx]}${ranks[rankIdx]}`] = {
              type: piece.type as PieceType,
              color: piece.color as PieceColor,
            };
          }
        })
      );
      setBoard(next);
      setStartTurn(game.turn() as 'w' | 'b');
    }
    setMode('edit');
    setGameFen(null);
    setMoves([]);
    setCaptured({ w: [], b: [] });
    setStatusMsg(null);
    setErrMsg(null);
    setSelectedBoardSquare(null);
  };

  const handleSquareClick = (square: string) => {
    if (mode === 'play') {
      if (!game) return;
      if (selectedBoardSquare) {
        if (selectedBoardSquare === square) {
          setSelectedBoardSquare(null);
          return;
        }
        if (legalTargets.includes(square)) {
          try {
            const move = game.move({
              from: selectedBoardSquare as Square,
              to: square as Square,
              promotion: 'q',
            });
            if (move) {
              setGameFen(game.fen());
              setMoves((prev) => [...prev, move.san]);
              if (move.captured) {
                const taken = move.captured as PieceType;
                setCaptured((prev) => ({
                  w: move.color === 'w' ? [...prev.w, taken] : prev.w,
                  b: move.color === 'b' ? [...prev.b, taken] : prev.b,
                }));
              }
              setStatusMsg(getStatus(game));
              setSelectedBoardSquare(null);
              return;
            }
          } catch {
            // Invalid move — ignore.
          }
        }
        const clicked = activeBoard[square];
        setSelectedBoardSquare(clicked && clicked.color === game.turn() ? square : null);
        return;
      }
      const piece = activeBoard[square];
      if (piece && piece.color === game.turn()) setSelectedBoardSquare(square);
      return;
    }

    // Move mode: pick a piece on the board, then click the target square.
    if (selectedPalette === 'move') {
      if (selectedBoardSquare) {
        if (selectedBoardSquare === square) {
          setSelectedBoardSquare(null);
          return;
        }
        const sourcePiece = board[selectedBoardSquare];
        setBoard((prev) => ({
          ...prev,
          [selectedBoardSquare]: null,
          [square]: sourcePiece,
        }));
        setSelectedBoardSquare(null);
      } else if (board[square]) {
        setSelectedBoardSquare(square);
      }
      return;
    }

    if (!selectedPalette) {
      if (board[square]) {
        setSelectedBoardSquare(square);
        setSelectedPalette('move');
      }
      return;
    }

    if (selectedPalette === 'trash') {
      setBoard((prev) => ({ ...prev, [square]: null }));
    } else {
      setBoard((prev) => ({
        ...prev,
        [square]: { type: selectedPalette.type, color: selectedPalette.color },
      }));
    }
  };

  const handleClear = () => {
    setBoard({});
    setSelectedBoardSquare(null);
  };

  const handleReset = () => {
    setBoard(INITIAL_BOARD);
    setSelectedBoardSquare(null);
  };

  const fenString = mode === 'play' && gameFen ? gameFen : boardToFen(board, effectiveStartTurn);

  const materialDiff =
    captured.w.reduce((sum, piece) => sum + PIECE_VALUES[piece], 0) -
    captured.b.reduce((sum, piece) => sum + PIECE_VALUES[piece], 0);
  const advantageText =
    materialDiff > 0
      ? t('sandbox.whiteAhead', { n: materialDiff })
      : materialDiff < 0
      ? t('sandbox.blackAhead', { n: -materialDiff })
      : t('sandbox.even');

  const copyFen = async () => {
    try {
      await navigator.clipboard.writeText(fenString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.warn('Clipboard write failed:', e);
    }
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 py-1 sm:py-2">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-4 items-start">
        {/* Chessboard: square, sized to fit the visible viewport height */}
        <div className="lg:col-span-8 flex justify-start min-w-0">
          <div className="w-full max-w-[min(100%,calc(100dvh-6rem))]">
              <div className="aspect-square w-full rounded-[16px] overflow-hidden border-2 border-[var(--ink)]/20 grid grid-cols-8 grid-rows-8 select-none shadow-[0_8px_30px_rgba(30,42,34,0.12)]">
                {displayRanks.map((rank, rankIdx) =>
                  displayFiles.map((file, fileIdx) => {
                    const square = `${file}${rank}`;
                    const origRankIdx = ranks.indexOf(rank);
                    const origFileIdx = files.indexOf(file);
                    const isLight = (origRankIdx + origFileIdx) % 2 === 0;
                    const piece = activeBoard[square];
                    const isSelectedSquare = selectedBoardSquare === square;
                    const isLegalTarget = legalTargets.includes(square);

                    return (
                      <div
                        key={square}
                        onClick={() => handleSquareClick(square)}
                        className={`relative flex items-center justify-center cursor-pointer transition-colors ${
                          isSelectedSquare
                            ? '!bg-[var(--butter)] ring-4 ring-[var(--primary)] ring-inset z-10'
                            : isLegalTarget && piece
                            ? 'ring-4 ring-[var(--primary)]/60 ring-inset z-10'
                            : isLight
                            ? 'bg-[#EEEED2] hover:bg-[#e6e6c2]'
                            : 'bg-[#769656] hover:bg-[#6c8b4e]'
                        }`}
                      >
                        {isLegalTarget && !piece && (
                          <span className="absolute w-[30%] h-[30%] rounded-full bg-[var(--primary-bg)]/55 pointer-events-none z-10" />
                        )}
                        {piece && (
                          <div className="w-[88%] h-[88%] pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.25)] transition-transform hover:scale-105">
                            <ChessPieceSvg type={piece.type} color={piece.color} />
                          </div>
                        )}
                        {fileIdx === 0 && (
                          <span
                            className={`absolute top-1 left-1.5 text-[10px] sm:text-xs font-bold pointer-events-none select-none ${
                              isLight ? 'text-[#769656]' : 'text-[#EEEED2]'
                            }`}
                          >
                            {rank}
                          </span>
                        )}
                        {rankIdx === 7 && (
                          <span
                            className={`absolute bottom-0.5 right-1.5 text-[10px] sm:text-xs font-bold pointer-events-none select-none ${
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

        {/* Right: piece palette and tools */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-[var(--surface)] rounded-[24px] border border-[var(--border)] p-4 sm:p-5 space-y-5 shadow-[0_4px_24px_rgba(30,42,34,0.06)]">
            {/* Board actions */}
            <div className="grid grid-cols-3 gap-1.5">
              <button
                onClick={() => setIsFlipped(!isFlipped)}
                title={t('sandbox.flipTitle')}
                className="inline-flex items-center justify-center gap-1.5 px-2 py-2.5 rounded-[12px] bg-[var(--bg-alt)] border border-[var(--border)] text-[11px] font-semibold text-[var(--ink)] hover:bg-[var(--sage-100)] transition-colors cursor-pointer"
              >
                <RotateCw className="w-3.5 h-3.5 shrink-0" />
                <span>{t('sandbox.flipBtn')}</span>
              </button>
              <button
                onClick={handleReset}
                title={t('sandbox.resetTitle')}
                disabled={mode === 'play'}
                className="inline-flex items-center justify-center gap-1.5 px-2 py-2.5 rounded-[12px] bg-[var(--bg-alt)] border border-[var(--border)] text-[11px] font-semibold text-[var(--ink)] hover:bg-[var(--sage-100)] transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <RefreshCw className="w-3.5 h-3.5 shrink-0" />
                <span>{t('sandbox.resetBtn')}</span>
              </button>
              <button
                onClick={handleClear}
                title={t('sandbox.clearTitle')}
                disabled={mode === 'play'}
                className="inline-flex items-center justify-center gap-1.5 px-2 py-2.5 rounded-[12px] bg-[var(--bg)] border border-[var(--border)] text-[11px] font-semibold text-[var(--danger)] hover:bg-rose-50 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Trash2 className="w-3.5 h-3.5 shrink-0" />
                <span>{t('sandbox.clearBtn')}</span>
              </button>
            </div>

            {/* Game controls */}
            <div className="pt-4 border-t border-[var(--border)] space-y-3">
              {mode === 'edit' ? (
                <>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[var(--ink-muted)] block mb-2">
                      {t('sandbox.turnLabel')}
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setStartTurn('w')}
                        className={`py-2.5 rounded-[12px] text-xs font-semibold transition-all cursor-pointer ${
                          effectiveStartTurn === 'w'
                            ? 'bg-[var(--primary-bg)] text-[var(--on-primary)] shadow-xs'
                            : 'bg-[var(--bg)] text-[var(--ink)] border border-[var(--border)] hover:bg-[var(--bg-alt)]'
                        }`}
                      >
                        {t('sandbox.whiteTurn')}
                      </button>
                      <button
                        onClick={() => setStartTurn('b')}
                        disabled={isInitialPosition}
                        title={isInitialPosition ? t('sandbox.startingTurnHint') : undefined}
                        className={`py-2.5 rounded-[12px] text-xs font-semibold transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
                          effectiveStartTurn === 'b'
                            ? 'bg-[var(--primary-bg)] text-[var(--on-primary)] shadow-xs'
                            : 'bg-[var(--bg)] text-[var(--ink)] border border-[var(--border)] hover:bg-[var(--bg-alt)]'
                        }`}
                      >
                        {t('sandbox.blackTurn')}
                      </button>
                    </div>
                    {isInitialPosition && (
                      <p className="mt-2 text-[11px] text-[var(--ink-muted)] leading-relaxed">
                        {t('sandbox.startingTurnHint')}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={handleStart}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-[12px] bg-[var(--primary-bg)] hover:bg-[var(--primary-hover-bg)] text-[var(--on-primary)] text-sm font-bold transition-colors cursor-pointer shadow-xs active:scale-[0.99]"
                  >
                    <Play className="w-4 h-4" />
                    <span>{t('sandbox.startBtn')}</span>
                  </button>
                  {errMsg && (
                    <p className="text-[11px] leading-relaxed text-[var(--danger)] bg-rose-50 border border-rose-200 rounded-[10px] px-3 py-2">
                      {errMsg}
                    </p>
                  )}
                </>
              ) : (
                <>
                  <button
                    onClick={handleEnd}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-[12px] bg-[var(--bg)] hover:bg-[var(--bg-alt)] border border-[var(--border)] text-[var(--ink)] text-sm font-bold transition-colors cursor-pointer shadow-xs active:scale-[0.99]"
                  >
                    <SquareIcon className="w-4 h-4" />
                    <span>{t('sandbox.endBtn')}</span>
                  </button>
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-[var(--ink-muted)]">{t('sandbox.turnLabel')}</span>
                    <span className="text-[var(--primary)]">
                      {game?.turn() === 'w' ? t('sandbox.whiteTurn') : t('sandbox.blackTurn')}
                    </span>
                  </div>
                  <p className="text-[11px] text-[var(--ink-muted)] leading-relaxed">
                    {t('sandbox.playModeHint')}
                  </p>
                  {statusMsg && (
                    <p className="text-xs font-bold text-[var(--primary)] bg-[var(--sage-100)] border border-[#C9D9BC] rounded-[10px] px-3 py-2">
                      {statusMsg}
                    </p>
                  )}
                </>
              )}
            </div>

            {mode === 'play' && moves.length > 0 && (
              <div className="pt-4 border-t border-[var(--border)] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[var(--ink-muted)]">
                    {t('sandbox.capturedTitle')}
                  </span>
                  <div className="text-right">
                    <span className="block text-[9px] uppercase tracking-wide text-[var(--ink-muted)]">
                      {t('sandbox.advantage')}
                    </span>
                    <span className="block text-[11px] font-bold text-[var(--primary)]">
                      {advantageText}
                    </span>
                  </div>
                </div>
                <div className="space-y-1.5">
                  {(['w', 'b'] as const).map((side) => (
                    <div
                      key={side}
                      className="flex items-center gap-2 rounded-[10px] bg-[var(--bg)] border border-[var(--border)] px-2 py-1.5"
                    >
                      <span
                        className={`w-16 shrink-0 text-[10px] font-bold ${
                          side === 'w' ? 'text-[var(--primary)]' : 'text-[var(--ink)]'
                        }`}
                      >
                        {side === 'w' ? t('sandbox.whiteTurn') : t('sandbox.blackTurn')}
                      </span>
                      <div className="flex flex-1 flex-wrap items-center gap-1 min-h-6">
                        {sortByValue(captured[side]).map((piece, i) => (
                          <div key={`${side}-${piece}-${i}`} className="w-5 h-5 shrink-0">
                            <ChessPieceSvg type={piece} color={side === 'w' ? 'b' : 'w'} />
                          </div>
                        ))}
                        {captured[side].length === 0 && (
                          <span className="text-[10px] text-[var(--ink-muted)]">—</span>
                        )}
                      </div>
                      <span className="w-6 shrink-0 text-right text-[11px] font-mono font-bold text-[var(--ink)]">
                        +{captured[side].reduce((sum, piece) => sum + PIECE_VALUES[piece], 0)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {mode === 'play' && moves.length > 0 && (
              <div className="pt-4 border-t border-[var(--border)]">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--ink-muted)] block mb-2">
                  {t('sandbox.notationTitle')}
                </span>
                <div className="max-h-44 overflow-y-auto rounded-[12px] border border-[var(--border)] bg-[var(--bg)] divide-y divide-[var(--border)]">
                  {Array.from({ length: Math.ceil(moves.length / 2) }, (_, i) => (
                    <div
                      key={i}
                      className="grid grid-cols-[2.25rem_1fr_1fr] gap-2 px-3 py-1.5 text-xs font-mono text-[var(--ink)] items-center"
                    >
                      <span className="text-[var(--ink-muted)]">{i + 1}.</span>
                      <span className="font-semibold text-[var(--primary)]">{moves[i * 2]}</span>
                      <span>{moves[i * 2 + 1] ?? ''}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {mode === 'edit' && (
              <>
            {/* Modes */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--ink-muted)] block mb-2.5">
                {t('sandbox.modeLabel')}
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setSelectedPalette('move');
                    setSelectedBoardSquare(null);
                  }}
                  className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-[12px] text-xs font-semibold transition-all cursor-pointer ${
                    selectedPalette === 'move'
                      ? 'bg-[var(--primary-bg)] text-[var(--on-primary)] shadow-xs'
                      : 'bg-[var(--bg)] text-[var(--ink)] border border-[var(--border)] hover:bg-[var(--bg-alt)]'
                  }`}
                >
                  <Move className="w-4 h-4" />
                  <span>{t('sandbox.moveMode')}</span>
                </button>
                <button
                  onClick={() => {
                    setSelectedPalette('trash');
                    setSelectedBoardSquare(null);
                  }}
                  className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-[12px] text-xs font-semibold transition-all cursor-pointer ${
                    selectedPalette === 'trash'
                      ? 'bg-[var(--danger)] text-white shadow-xs'
                      : 'bg-[var(--bg)] text-[var(--danger)] border border-[var(--border)] hover:bg-rose-50'
                  }`}
                >
                  <Trash2 className="w-4 h-4" />
                  <span>{t('sandbox.deleteMode')}</span>
                </button>
              </div>
            </div>

            {/* White pieces */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--ink-muted)] block mb-2">
                {t('sandbox.whitePieces')}
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
                      onClick={() => {
                        setSelectedPalette({ type, color: 'w' });
                        setSelectedBoardSquare(null);
                      }}
                      className={`h-12 sm:h-13 rounded-[12px] flex items-center justify-center p-1.5 transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[var(--sage-100)] ring-2 ring-[var(--primary)] shadow-md scale-105'
                          : 'bg-[var(--bg)] border border-[var(--border)] hover:bg-[var(--bg-alt)] hover:scale-102'
                      }`}
                      title={t('sandbox.whiteTitle')}
                    >
                      <div className="w-8 h-8 sm:w-9 sm:h-9">
                        <ChessPieceSvg type={type} color="w" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Black pieces */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--ink-muted)] block mb-2">
                {t('sandbox.blackPieces')}
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
                      onClick={() => {
                        setSelectedPalette({ type, color: 'b' });
                        setSelectedBoardSquare(null);
                      }}
                      className={`h-12 sm:h-13 rounded-[12px] flex items-center justify-center p-1.5 transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[var(--sage-100)] ring-2 ring-[var(--primary)] shadow-md scale-105'
                          : 'bg-[var(--bg)] border border-[var(--border)] hover:bg-[var(--bg-alt)] hover:scale-102'
                      }`}
                      title={t('sandbox.blackTitle')}
                    >
                      <div className="w-8 h-8 sm:w-9 sm:h-9">
                        <ChessPieceSvg type={type} color="b" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

              </>
            )}

            {/* FEN output */}
            <div className="pt-4 border-t border-[var(--border)] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--ink-muted)]">
                  {t('sandbox.fenCode')}
                </span>
                <button
                  onClick={copyFen}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--primary-bg)] hover:bg-[var(--primary-hover-bg)] text-[var(--on-primary)] text-xs font-semibold transition-all cursor-pointer shadow-xs active:scale-95"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[var(--on-primary)]" />
                      <span>{t('sandbox.copied')}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{t('sandbox.copy')}</span>
                    </>
                  )}
                </button>
              </div>
              <div className="p-3 rounded-[14px] bg-[var(--bg)] border border-[var(--border)] font-mono text-xs text-[var(--ink)] break-all select-all leading-relaxed">
                {fenString}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
