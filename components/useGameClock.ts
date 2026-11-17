'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

type ClockColor = 'w' | 'b';

interface ClockView {
  white: number;
  black: number;
  active: ClockColor | null;
  flagged: ClockColor | null;
}

type ClockState = {
  ms: Record<ClockColor, number>;
  running: ClockColor | null;
  flagged: ClockColor | null;
  lastAt: number;
  incrementMs: number;
};

export function useGameClock(onFlag: (color: ClockColor) => void): {
  clock: ClockView;
  configure: (initialSeconds: number, incrementSeconds: number) => void;
  applyMove: (color: ClockColor) => void;
  stop: () => void;
} {
  const onFlagRef = useRef(onFlag);
  onFlagRef.current = onFlag;

  const stateRef = useRef<ClockState>({
    ms: { w: 0, b: 0 },
    running: null,
    flagged: null,
    lastAt: 0,
    incrementMs: 0,
  });
  const [, forceRender] = useState(0);

  const configure = useCallback((initialSeconds: number, incrementSeconds: number) => {
    const ms = Math.max(0, initialSeconds) * 1000;
    stateRef.current = {
      ms: { w: ms, b: ms },
      running: null,
      flagged: null,
      lastAt: Date.now(),
      incrementMs: Math.max(0, incrementSeconds) * 1000,
    };
    forceRender((value) => value + 1);
  }, []);

  const applyMove = useCallback((color: ClockColor) => {
    const state = stateRef.current;
    if (state.flagged) return;

    const now = Date.now();
    if (state.running === color) {
      state.ms[color] = Math.max(0, state.ms[color] - (now - state.lastAt));
    }
    state.ms[color] = Math.max(0, state.ms[color] + state.incrementMs);
    state.running = color === 'w' ? 'b' : 'w';
    state.lastAt = now;
    forceRender((value) => value + 1);
  }, []);

  const stop = useCallback(() => {
    stateRef.current.running = null;
    forceRender((value) => value + 1);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const state = stateRef.current;
      if (!state.running) return;

      const now = Date.now();
      const color = state.running;
      state.ms[color] = Math.max(0, state.ms[color] - (now - state.lastAt));
      state.lastAt = now;

      if (state.ms[color] === 0) {
        state.running = null;
        state.flagged = color;
        onFlagRef.current(color);
      }
      forceRender((value) => value + 1);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const state = stateRef.current;
  return {
    clock: {
      white: state.ms.w,
      black: state.ms.b,
      active: state.running,
      flagged: state.flagged,
    },
    configure,
    applyMove,
    stop,
  };
}
