type TimeCategory = 'bullet' | 'blitz' | 'rapid' | 'classical';

export interface TimeControl {
  category: TimeCategory;
  initialSeconds: number;
  incrementSeconds: number;
}

interface TimePreset {
  initialSeconds: number;
  incrementSeconds: number;
}

export const TIME_CATEGORIES: TimeCategory[] = ['bullet', 'blitz', 'rapid', 'classical'];

export const TIME_PRESETS: Record<TimeCategory, TimePreset[]> = {
  bullet: [
    { initialSeconds: 60, incrementSeconds: 0 },
    { initialSeconds: 120, incrementSeconds: 1 },
  ],
  blitz: [
    { initialSeconds: 180, incrementSeconds: 0 },
    { initialSeconds: 180, incrementSeconds: 2 },
    { initialSeconds: 300, incrementSeconds: 0 },
  ],
  rapid: [
    { initialSeconds: 600, incrementSeconds: 0 },
    { initialSeconds: 600, incrementSeconds: 5 },
    { initialSeconds: 900, incrementSeconds: 10 },
  ],
  classical: [
    { initialSeconds: 1800, incrementSeconds: 0 },
    { initialSeconds: 1800, incrementSeconds: 10 },
    { initialSeconds: 3600, incrementSeconds: 30 },
  ],
};

export const DEFAULT_TIME_CONTROL: TimeControl = {
  category: 'rapid',
  initialSeconds: 600,
  incrementSeconds: 5,
};

export function detectCategory(initialSeconds: number): TimeCategory {
  if (initialSeconds < 180) return 'bullet';
  if (initialSeconds < 600) return 'blitz';
  if (initialSeconds < 1800) return 'rapid';
  return 'classical';
}

export function formatControlLabel(initialSeconds: number, incrementSeconds: number) {
  return `${Math.round(initialSeconds / 60)}+${incrementSeconds}`;
}

export function formatClock(milliseconds: number) {
  const total = Math.max(0, Math.ceil(milliseconds / 1000));
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;
  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}
