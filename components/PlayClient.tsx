'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { Chess } from 'chess.js';
import { Check, Copy, LogIn, Search, Users, X } from 'lucide-react';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';
import {
  DEFAULT_TIME_CONTROL,
  TIME_CATEGORIES,
  TIME_PRESETS,
  detectCategory,
  formatControlLabel,
  type TimeControl,
} from '@/lib/time-controls';
import { PlayBoard, START_FEN, type PlayMove, type PlayMoveInput } from './PlayBoard';
import { useLanguage } from './LanguageProvider';
import { useGameClock } from './useGameClock';

type GameRoom = {
  id: string;
  code: string;
  status: 'waiting' | 'active' | 'finished';
  white_player: string | null;
  black_player: string | null;
  created_by: string;
  current_fen: string;
  turn: 'w' | 'b';
  time_initial: number;
  time_increment: number;
  white_time: number;
  black_time: number;
  last_move_at: string;
};

type GameMoveRow = {
  id: number;
  room_id: string;
  move_number: number;
  san: string;
  fen: string;
  player: string;
  color: 'w' | 'b';
  captured: string | null;
};

const moveRows = (rows: GameMoveRow[]) =>
  [...rows].sort((a, b) => a.move_number - b.move_number);

interface PlayClientProps {
  initialRoomCode?: string;
}

export function PlayClient({ initialRoomCode = '' }: PlayClientProps) {
  const { t } = useLanguage();

  const formatDbError = (message: string) => {
    if (/Could not find the function|schema cache|PGRST202|does not exist/i.test(message)) {
      return t('play.rpcMissing');
    }
    if (/Vaxt bitdi|time.?out|timeout/i.test(message)) {
      return t('play.timeExpired');
    }
    return message;
  };

  const supabase = useMemo(
    () => (isSupabaseConfigured() ? createClient() : null),
    []
  );

  const [tab, setTab] = useState<'local' | 'online'>('local');
  const [authReady, setAuthReady] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [initialCode, setInitialCode] = useState(initialRoomCode.trim().toUpperCase());
  const [origin, setOrigin] = useState('');
  const autoJoinRef = useRef(false);

  const [localFen, setLocalFen] = useState(START_FEN);
  const [localMoves, setLocalMoves] = useState<PlayMove[]>([]);

  const [room, setRoom] = useState<GameRoom | null>(null);
  const [roomMoves, setRoomMoves] = useState<GameMoveRow[]>([]);
  const [joinCode, setJoinCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [busyAction, setBusyAction] = useState<string | null>(null);
  const [errorText, setErrorText] = useState<string | null>(null);
  const [matching, setMatching] = useState(false);
  const [colorChoice, setColorChoice] = useState<'w' | 'b' | 'random'>('random');

  const [timeControl, setTimeControl] = useState<TimeControl>(DEFAULT_TIME_CONTROL);
  const [customMinutes, setCustomMinutes] = useState(
    Math.round(DEFAULT_TIME_CONTROL.initialSeconds / 60)
  );
  const [customIncrement, setCustomIncrement] = useState(DEFAULT_TIME_CONTROL.incrementSeconds);
  const [localFlag, setLocalFlag] = useState<'w' | 'b' | null>(null);
  const [localGameOver, setLocalGameOver] = useState(false);
  const [now, setNow] = useState(Date.now());

  const {
    clock: localClock,
    configure: configureClock,
    applyMove,
    stop: stopClock,
  } = useGameClock((color) => setLocalFlag(color));

  useEffect(() => {
    configureClock(DEFAULT_TIME_CONTROL.initialSeconds, DEFAULT_TIME_CONTROL.incrementSeconds);
  }, [configureClock]);

  useEffect(() => {
    if (!supabase || !room || room.status !== 'active') return;
    const interval = setInterval(() => setNow(Date.now()), 250);
    return () => clearInterval(interval);
  }, [supabase, room?.id, room?.status]);

  useEffect(() => {
    setOrigin(window.location.origin);
    if (initialRoomCode) return;
    const params = new URLSearchParams(window.location.search);
    setInitialCode((params.get('room') ?? '').trim().toUpperCase());
  }, [initialRoomCode]);

  useEffect(() => {
    if (!supabase) {
      setAuthReady(true);
      return;
    }

    let mounted = true;
    supabase.auth.getUser().then(({ data }) => {
      if (mounted) setUserId(data.user?.id ?? null);
      if (mounted) setAuthReady(true);
    });

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserId(session?.user?.id ?? null);
      setAuthReady(true);
    });

    return () => {
      mounted = false;
      data.subscription.unsubscribe();
    };
  }, [supabase]);

  const enterRoom = (nextRoom: GameRoom) => {
    setRoom(nextRoom);
    setRoomMoves([]);
    setErrorText(null);
    setMatching(false);
    if (supabase && userId) void supabase.rpc('cancel_matchmaking');
    const initialSeconds = nextRoom.time_initial ?? DEFAULT_TIME_CONTROL.initialSeconds;
    const incrementSeconds = nextRoom.time_increment ?? DEFAULT_TIME_CONTROL.incrementSeconds;
    setTimeControl({
      category: detectCategory(initialSeconds),
      initialSeconds,
      incrementSeconds,
    });
    setCustomMinutes(Math.round(initialSeconds / 60));
    setCustomIncrement(incrementSeconds);
  };

  useEffect(() => {
    if (!supabase || !authReady || !userId || !initialCode || autoJoinRef.current) return;
    autoJoinRef.current = true;
    setJoinCode(initialCode);
    setTab('online');
    void joinRoom(initialCode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supabase, authReady, userId, initialCode]);

  useEffect(() => {
    if (!supabase || !room) return;
    let cancelled = false;

    supabase
      .from('game_moves')
      .select('*')
      .eq('room_id', room.id)
      .order('move_number', { ascending: true })
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error) {
          setErrorText(formatDbError(error.message));
          return;
        }
        const rows = moveRows((data ?? []) as GameMoveRow[]);
        setRoomMoves(rows);
        const last = rows[rows.length - 1];
        if (last) {
          setRoom((prev) =>
            prev
              ? { ...prev, current_fen: last.fen, turn: last.color === 'w' ? 'b' : 'w' }
              : prev
          );
        }
      });

    return () => {
      cancelled = true;
    };
  }, [supabase, room?.id]);

  useEffect(() => {
    if (!supabase || !room) return;

    const channel = supabase
      .channel(`play-room-${room.id}`)
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'game_rooms', filter: `id=eq.${room.id}` },
        (payload) => {
          const next = payload.new as GameRoom;
          setRoom((prev) => (prev ? { ...prev, ...next } : next));
        }
      )
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'game_moves', filter: `room_id=eq.${room.id}` },
        (payload) => {
          const row = payload.new as GameMoveRow;
          setRoomMoves((prev) =>
            prev.some((m) => m.id === row.id) ? prev : moveRows([...prev, row])
          );
          setRoom((prev) =>
            prev ? { ...prev, current_fen: row.fen, turn: row.color === 'w' ? 'b' : 'w' } : prev
          );
        }
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [supabase, room?.id]);

  const requireAuth = () => {
    if (!supabase || !userId) {
      setErrorText(t('play.loginRequired'));
      return false;
    }
    return true;
  };

  const selectTimeControl = (next: TimeControl) => {
    if (matching) void cancelMatch();
    setTimeControl(next);
    setCustomMinutes(Math.round(next.initialSeconds / 60));
    setCustomIncrement(next.incrementSeconds);
    if (tab === 'local') {
      setLocalFen(START_FEN);
      setLocalMoves([]);
      setLocalFlag(null);
      setLocalGameOver(false);
      setErrorText(null);
      configureClock(next.initialSeconds, next.incrementSeconds);
    }
  };

  const applyCustomTime = (minutes: number, increment: number) => {
    const initialSeconds = Math.min(10800, Math.max(30, Math.round(minutes * 60)));
    const incrementSeconds = Math.min(60, Math.max(0, increment));
    selectTimeControl({
      category: detectCategory(initialSeconds),
      initialSeconds,
      incrementSeconds,
    });
  };

  const newLocalGame = () => {
    setLocalFen(START_FEN);
    setLocalMoves([]);
    setLocalFlag(null);
    setLocalGameOver(false);
    setErrorText(null);
    configureClock(timeControl.initialSeconds, timeControl.incrementSeconds);
  };

  async function callRoomRpc(name: 'create_game_room') {
    if (!supabase) return null;
    let result = await supabase.rpc(name, {
      p_initial: timeControl.initialSeconds,
      p_increment: timeControl.incrementSeconds,
      p_creator_color: colorChoice,
    });
    if (
      result.error &&
      /Could not find the function|schema cache|PGRST202/i.test(result.error.message)
    ) {
      result = await supabase.rpc(name);
    }
    return result;
  }

  async function joinRoom(code?: string) {
    const value = (code ?? joinCode).trim().toUpperCase();
    if (!value || !requireAuth() || !supabase) return;

    setBusyAction('join');
    setErrorText(null);
    const { data, error } = await supabase.rpc('join_game_room', { p_code: value });
    setBusyAction(null);

    if (error) {
      setErrorText(formatDbError(error.message));
      return;
    }
    enterRoom(data as unknown as GameRoom);
  }

  async function createRoom() {
    if (!requireAuth() || !supabase) return;

    setBusyAction('create');
    setErrorText(null);
    const result = await callRoomRpc('create_game_room');
    setBusyAction(null);

    if (!result) return;
    const { data, error } = result;

    if (error) {
      setErrorText(formatDbError(error.message));
      return;
    }
    enterRoom(data as unknown as GameRoom);
  }

  async function findMatch(announce: boolean) {
    if (!supabase || !userId) return;
    if (announce) {
      setBusyAction('match');
      setErrorText(null);
    }

    const { data, error } = await supabase.rpc('find_match', {
      p_initial: timeControl.initialSeconds,
      p_increment: timeControl.incrementSeconds,
      p_color: colorChoice,
    });
    if (announce) setBusyAction(null);

    if (error) {
      if (announce) setErrorText(formatDbError(error.message));
      return;
    }
    if (data) {
      enterRoom(data as unknown as GameRoom);
    } else if (announce) {
      setMatching(true);
    }
  }

  async function cancelMatch() {
    if (!supabase) return;
    setMatching(false);
    setBusyAction(null);
    const { error } = await supabase.rpc('cancel_matchmaking');
    if (error) setErrorText(formatDbError(error.message));
  }

  useEffect(() => {
    if (!supabase || !matching || !userId || room) return;
    const interval = setInterval(() => {
      void findMatch(false);
    }, 2500);
    return () => clearInterval(interval);
  }, [
    supabase,
    matching,
    userId,
    room?.id,
    timeControl.initialSeconds,
    timeControl.incrementSeconds,
  ]);

  async function resetRoom() {
    if (!room || !requireAuth() || !supabase) return;

    setBusyAction('reset');
    setErrorText(null);
    const { data, error } = await supabase.rpc('reset_game_room', { p_room_id: room.id });
    setBusyAction(null);

    if (error) {
      setErrorText(formatDbError(error.message));
      return;
    }
    setRoom(data as unknown as GameRoom);
    setRoomMoves([]);
  }

  async function handleOnlineMove(move: PlayMoveInput) {
    if (!room || !requireAuth() || !supabase) return;

    setBusyAction('move');
    setErrorText(null);
    const { data, error } = await supabase.rpc('make_game_move', {
      p_room_id: room.id,
      p_san: move.san,
      p_fen: move.fen,
      p_captured: move.captured ?? null,
    });
    setBusyAction(null);

    if (error) {
      setErrorText(formatDbError(error.message));
      return;
    }

    const row = data as unknown as GameMoveRow;
    setRoomMoves((prev) =>
      prev.some((m) => m.id === row.id) ? prev : moveRows([...prev, row])
    );
    setRoom((prev) =>
      prev ? { ...prev, current_fen: row.fen, turn: row.color === 'w' ? 'b' : 'w' } : prev
    );
  }

  const copyRoomLink = async () => {
    if (!room) return;
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/play/${room.code}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setErrorText(t('play.copyFailed'));
    }
  };

  const myColor: 'w' | 'b' | null = room
    ? room.white_player === userId
      ? 'w'
      : room.black_player === userId
      ? 'b'
      : null
    : null;
  const onlineClock = useMemo(() => {
    if (!room) return null;
    const startedAt = room.last_move_at ? new Date(room.last_move_at).getTime() : now;
    const elapsed = Math.max(0, now - startedAt);
    const running = room.status === 'active' ? room.turn : null;
    const white =
      running === 'w' ? Math.max(0, (room.white_time ?? 0) * 1000 - elapsed) : (room.white_time ?? 0) * 1000;
    const black =
      running === 'b' ? Math.max(0, (room.black_time ?? 0) * 1000 - elapsed) : (room.black_time ?? 0) * 1000;
    return {
      white,
      black,
      active: running,
      flagged: white <= 0 ? ('w' as const) : black <= 0 ? ('b' as const) : null,
    };
  }, [room, now]);

  const activeFlag = tab === 'local' ? localFlag : onlineClock?.flagged ?? null;
  const flagText = activeFlag
    ? t('play.timeOut', {
        color: activeFlag === 'w' ? t('sandbox.whiteTurn') : t('sandbox.blackTurn'),
      })
    : null;

  const onlineCanMove =
    !!room && room.status === 'active' && room.turn === myColor && !onlineClock?.flagged;
  const onlineInfo = !room
    ? null
    : flagText
    ? flagText
    : room.status === 'waiting'
    ? t('play.waitingOpponent')
    : room.turn === myColor
    ? t('play.yourTurn')
    : t('play.opponentTurn');

  const onlineMoves: PlayMove[] = roomMoves.map((row) => ({
    id: row.id,
    san: row.san,
    fen: row.fen,
    color: row.color,
    captured: row.captured as PlayMove['captured'],
  }));

  const inviteLink = room ? `${origin}/play/${room.code}` : '';

  const tabControl = (
    <div className="grid grid-cols-2 gap-2">
      <button
        onClick={() => {
          if (matching) void cancelMatch();
          setTab('local');
          setErrorText(null);
        }}
        className={`py-3.5 rounded-[12px] text-[14px] font-semibold transition-colors cursor-pointer ${
          tab === 'local'
            ? 'bg-[#2F5D46] text-[#F7F3EA] shadow-xs'
            : 'bg-[#F7F3EA] text-[#1E2A22] border border-[#E3DCCB] hover:bg-[#EFE9DB]'
        }`}
      >
        {t('play.localTab')}
      </button>
      <button
        onClick={() => {
          setTab('online');
          setErrorText(null);
        }}
        className={`py-3.5 rounded-[12px] text-[14px] font-semibold transition-colors cursor-pointer ${
          tab === 'online'
            ? 'bg-[#2F5D46] text-[#F7F3EA] shadow-xs'
            : 'bg-[#F7F3EA] text-[#1E2A22] border border-[#E3DCCB] hover:bg-[#EFE9DB]'
        }`}
      >
        {t('play.onlineTab')}
      </button>
    </div>
  );

  const roomLocked = tab === 'online' && !!room;

  const timeControlPanel = (
    <div className="rounded-[14px] bg-[#F7F3EA] border border-[#E3DCCB] p-4 space-y-2.5">
      <div className="flex items-center justify-between gap-2.5">
        <span className="text-[13px] font-bold uppercase tracking-wider text-[#5E6B62]">
          {t('play.timeControlTitle')}
        </span>
        <span className="font-mono text-[14px] font-bold text-[#2F5D46]">
          {formatControlLabel(timeControl.initialSeconds, timeControl.incrementSeconds)}
        </span>
      </div>

      <div className={`grid grid-cols-4 gap-1 ${roomLocked ? 'opacity-60' : ''}`}>
        {TIME_CATEGORIES.map((category) => (
          <button
            key={category}
            type="button"
            disabled={roomLocked}
            onClick={() => {
              const preset = TIME_PRESETS[category][0];
              selectTimeControl({
                category,
                initialSeconds: preset.initialSeconds,
                incrementSeconds: preset.incrementSeconds,
              });
            }}
            className={`py-3 rounded-[9px] text-[12px] font-bold transition-colors cursor-pointer disabled:cursor-default ${
              timeControl.category === category
                ? 'bg-[#2F5D46] text-[#F7F3EA]'
                : 'bg-[#FFFFFF] border border-[#E3DCCB] text-[#5E6B62] hover:bg-[#EFE9DB]'
            }`}
          >
            {t(`play.category.${category}`)}
          </button>
        ))}
      </div>

      <div className={`grid grid-cols-3 gap-1 ${roomLocked ? 'opacity-60' : ''}`}>
        {TIME_PRESETS[timeControl.category].map((preset) => {
          const label = formatControlLabel(preset.initialSeconds, preset.incrementSeconds);
          const selected =
            preset.initialSeconds === timeControl.initialSeconds &&
            preset.incrementSeconds === timeControl.incrementSeconds;
          return (
            <button
              key={label}
              type="button"
              disabled={roomLocked}
              onClick={() =>
                selectTimeControl({
                  category: timeControl.category,
                  initialSeconds: preset.initialSeconds,
                  incrementSeconds: preset.incrementSeconds,
                })
              }
              className={`py-3 rounded-[9px] font-mono text-[13px] font-bold transition-colors cursor-pointer disabled:cursor-default ${
                selected
                  ? 'bg-[#2F5D46] text-[#F7F3EA]'
                  : 'bg-[#FFFFFF] border border-[#E3DCCB] text-[#1E2A22] hover:bg-[#EFE9DB]'
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      <div className={`flex items-center gap-2 ${roomLocked ? 'opacity-60' : ''}`}>
        <span className="text-[12px] font-semibold uppercase text-[#5E6B62]">
          {t('play.customLabel')}
        </span>
        <input
          type="number"
          min={1}
          max={180}
          value={customMinutes}
          disabled={roomLocked}
          aria-label={t('play.minutesLabel')}
          onChange={(e) => {
            const value = Number(e.target.value);
            if (!Number.isNaN(value)) {
              setCustomMinutes(value);
              applyCustomTime(value, customIncrement);
            }
          }}
          className="w-14 rounded-[8px] border border-[#E3DCCB] bg-[#FFFFFF] px-1.5 py-1 text-center text-[13px] font-mono text-[#1E2A22] focus:outline-hidden focus:ring-2 focus:ring-[#2F5D46]/40"
        />
        <span className="text-[12px] text-[#5E6B62]">{t('play.minutesShort')}</span>
        <input
          type="number"
          min={0}
          max={60}
          value={customIncrement}
          disabled={roomLocked}
          aria-label={t('play.incrementLabel')}
          onChange={(e) => {
            const value = Number(e.target.value);
            if (!Number.isNaN(value)) {
              setCustomIncrement(value);
              applyCustomTime(customMinutes, value);
            }
          }}
          className="w-14 rounded-[8px] border border-[#E3DCCB] bg-[#FFFFFF] px-1.5 py-1 text-center text-[13px] font-mono text-[#1E2A22] focus:outline-hidden focus:ring-2 focus:ring-[#2F5D46]/40"
        />
        <span className="text-[12px] text-[#5E6B62]">{t('play.incrementShort')}</span>
      </div>
    </div>
  );

  const roomActions = room ? (
    <>
      <div className="rounded-[14px] bg-[#F7F3EA] border border-[#E3DCCB] p-4 space-y-2.5">
        <div className="flex items-center justify-between gap-2.5">
          <span className="text-[13px] font-bold uppercase tracking-wider text-[#5E6B62]">
            {t('play.roomCode')}
          </span>
          <span className="font-mono text-base font-bold tracking-[0.2em] text-[#1E2A22]">
            {room.code}
          </span>
        </div>
        <div>
          <span className="block text-[13px] font-bold uppercase tracking-wider text-[#5E6B62] mb-1.5">
            {t('play.inviteLink')}
          </span>
          <div className="flex gap-2">
            <input
              readOnly
              value={inviteLink}
              title={inviteLink}
              aria-label={t('play.inviteLink')}
              onFocus={(e) => e.target.select()}
              className="flex-1 min-w-0 rounded-[10px] border border-[#E3DCCB] bg-[#FFFFFF] px-3.5 py-3 text-[13px] font-mono text-[#1E2A22] focus:outline-hidden focus:ring-2 focus:ring-[#2F5D46]/40"
            />
            <button
              onClick={copyRoomLink}
              className="shrink-0 inline-flex items-center gap-1 px-3.5 py-3 rounded-[10px] bg-[#2F5D46] hover:bg-[#254B38] text-[#F7F3EA] text-[13px] font-semibold transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? t('play.copied') : t('play.copyLink')}
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between gap-2.5">
          <span className="text-[13px] font-semibold text-[#5E6B62]">
            {myColor === 'w'
              ? t('play.youAreWhite')
              : myColor === 'b'
              ? t('play.youAreBlack')
              : ''}
          </span>
        </div>
        <p className="text-[13px] text-[#5E6B62] leading-relaxed">{t('play.shareHint')}</p>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={resetRoom}
          disabled={busyAction === 'reset'}
          className="px-3 py-3.5 rounded-[12px] bg-[#EFE9DB] border border-[#E3DCCB] text-[14px] font-semibold text-[#1E2A22] hover:bg-[#E4EBD9] transition-colors cursor-pointer disabled:opacity-50"
        >
          {t('play.newGame')}
        </button>
        <button
          onClick={() => {
            setRoom(null);
            setRoomMoves([]);
            setErrorText(null);
          }}
          className="px-3 py-3.5 rounded-[12px] bg-[#F7F3EA] border border-[#E3DCCB] text-[14px] font-semibold text-[#1E2A22] hover:bg-[#EFE9DB] transition-colors cursor-pointer"
        >
          {t('play.leaveRoom')}
        </button>
      </div>
    </>
  ) : null;

  const loginCard = (
    <div className="rounded-[14px] bg-[#F7F3EA] border border-[#E3DCCB] p-4 space-y-2.5">
      <p className="text-[15px] font-semibold text-[#1E2A22]">{t('play.onlineRequiresAuth')}</p>
      <p className="text-[13px] text-[#5E6B62] leading-relaxed">
        {t('play.onlineRequiresAuthHint')}
      </p>
      <Link
        href="/auth"
        className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 rounded-[12px] bg-[#2F5D46] hover:bg-[#254B38] text-[#F7F3EA] text-[14px] font-bold transition-colors cursor-pointer"
      >
        <LogIn className="w-[18px] h-[18px]" />
        {t('play.loginBtn')}
      </Link>
    </div>
  );

  const roomMenu = (
    <div className="rounded-[14px] bg-[#F7F3EA] border border-[#E3DCCB] p-4 space-y-3">
      <div>
        <span className="block text-[13px] font-bold uppercase tracking-wider text-[#5E6B62] mb-2">
          {t('play.colorTitle')}
        </span>
        <div className="grid grid-cols-3 gap-1.5">
          {(['w', 'b', 'random'] as const).map((choice) => (
            <button
              key={choice}
              type="button"
              onClick={() => {
                if (matching) void cancelMatch();
                setColorChoice(choice);
              }}
              className={`py-2.5 rounded-[10px] text-[13px] font-bold transition-colors cursor-pointer ${
                colorChoice === choice
                  ? 'bg-[#2F5D46] text-[#F7F3EA]'
                  : 'bg-[#FFFFFF] border border-[#E3DCCB] text-[#1E2A22] hover:bg-[#EFE9DB]'
              }`}
            >
              {t(`play.color.${choice}`)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <button
          onClick={() => void createRoom()}
          disabled={busyAction === 'create'}
          className="inline-flex items-center justify-center gap-2 py-3.5 rounded-[12px] bg-[#2F5D46] hover:bg-[#254B38] text-[#F7F3EA] text-[14px] font-bold transition-colors cursor-pointer disabled:opacity-50"
        >
          <Users className="w-[18px] h-[18px]" />
          {t('play.createRoom')}
        </button>
        <button
          onClick={() => (matching ? void cancelMatch() : void findMatch(true))}
          disabled={busyAction === 'match'}
          className={`inline-flex items-center justify-center gap-2 py-3.5 rounded-[12px] border text-[14px] font-bold transition-colors cursor-pointer disabled:opacity-50 ${
            matching
              ? 'bg-[#EFE9DB] border-[#C9A24A] text-[#1E2A22] hover:bg-[#E4EBD9]'
              : 'bg-[#FFFFFF] border-[#E3DCCB] text-[#1E2A22] hover:bg-[#EFE9DB]'
          }`}
        >
          {matching ? (
            <X className="w-[18px] h-[18px]" />
          ) : (
            <Search className="w-[18px] h-[18px]" />
          )}
          {matching
            ? t('play.cancelSearch')
            : busyAction === 'match'
            ? t('play.searching')
            : t('play.randomMatch')}
        </button>
      </div>
      {matching && (
        <p className="rounded-[10px] bg-[#E4EBD9] border border-[#C9D9BC] px-3.5 py-3 text-[13px] font-semibold text-[#2F5D46]">
          {t('play.searchingHint')}
        </p>
      )}
      <div className="pt-3 border-t border-[#E3DCCB]">
        <label
          htmlFor="room-code"
          className="block text-[13px] font-bold uppercase tracking-wider text-[#5E6B62] mb-2"
        >
          {t('play.joinTitle')}
        </label>
        <div className="flex gap-2">
          <input
            id="room-code"
            value={joinCode}
            onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
            onKeyDown={(e) => {
              if (e.key === 'Enter') void joinRoom();
            }}
            maxLength={8}
            placeholder={t('play.codePlaceholder')}
            className="flex-1 min-w-0 rounded-[10px] border border-[#E3DCCB] bg-[#FFFFFF] px-3.5 py-3 text-[15px] font-mono tracking-widest text-[#1E2A22] uppercase focus:outline-hidden focus:ring-2 focus:ring-[#2F5D46]/40"
          />
          <button
            onClick={() => joinRoom()}
            disabled={busyAction === 'join' || !joinCode.trim()}
            className="px-3 py-3 rounded-[10px] bg-[#2F5D46] hover:bg-[#254B38] text-[#F7F3EA] text-[14px] font-bold transition-colors cursor-pointer disabled:opacity-50"
          >
            {t('play.joinBtn')}
          </button>
        </div>
      </div>
    </div>
  );

  const isLocal = tab === 'local';
  const gameInProgress = isLocal ? localMoves.length > 0 : !!room;

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 pt-2 sm:pt-3 pb-3">
      <PlayBoard
        fen={isLocal ? localFen : room?.current_fen ?? START_FEN}
        moves={isLocal ? localMoves : onlineMoves}
        orientation={!isLocal && myColor === 'b' ? 'b' : 'w'}
        canMove={isLocal ? !localFlag && !localGameOver : onlineCanMove}
        busy={!isLocal && busyAction === 'move'}
        clock={isLocal ? localClock : onlineClock}
        timeLabel={
          isLocal || !room
            ? null
            : formatControlLabel(
                room.time_initial ?? DEFAULT_TIME_CONTROL.initialSeconds,
                room.time_increment ?? DEFAULT_TIME_CONTROL.incrementSeconds
              )
        }
        infoText={
          isLocal
            ? flagText ?? (localGameOver ? null : t('play.localHint'))
            : room
            ? onlineInfo
            : !authReady
            ? t('play.checkingAuth')
            : !supabase
            ? t('play.onlineUnavailable')
            : !userId
            ? t('play.onlineRequiresAuthHint')
            : null
        }
        errorText={errorText}
        actions={
          <>
            {!gameInProgress && tabControl}
            {!gameInProgress && timeControlPanel}
            {isLocal ? (
              <button
                onClick={newLocalGame}
                className="w-full py-3.5 rounded-[12px] bg-[#2F5D46] hover:bg-[#254B38] text-[#F7F3EA] text-[14px] font-bold transition-colors cursor-pointer shadow-xs active:scale-[0.99]"
              >
                {t('play.newGame')}
              </button>
            ) : room ? (
              roomActions
            ) : !authReady ? (
              <p className="text-[14px] text-[#5E6B62]">{t('play.checkingAuth')}</p>
            ) : !supabase ? (
              <div className="rounded-[14px] bg-[#F7F3EA] border border-[#E3DCCB] p-4 text-[14px] text-[#1E2A22]">
                {t('play.onlineUnavailable')}
              </div>
            ) : !userId ? (
              loginCard
            ) : (
              roomMenu
            )}
          </>
        }
        onMove={
          isLocal
            ? (move) => {
                applyMove(move.color);
                setLocalFen(move.fen);
                setLocalMoves((prev) => [
                  ...prev,
                  { ...move, id: `${Date.now()}-${prev.length}` },
                ]);
                try {
                  if (new Chess(move.fen).isGameOver()) {
                    stopClock();
                    setLocalGameOver(true);
                  }
                } catch {
                  // Mövqe oxunamadısa saat işləməyə davam edir.
                }
              }
            : handleOnlineMove
        }
      />
    </div>
  );
}
