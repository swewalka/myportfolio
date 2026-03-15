export type OverclockAmbientIntensity = 'calm' | 'warning' | 'critical';

type Range = [number, number];

export interface OverclockAmbientProfile {
  basePulseSeconds: Range;
  flickerGapMs: Range;
  flickerDurationMs: Range;
  bloomGapMs: Range;
  bloomDurationMs: number;
  scanGapMs: Range;
  scanDurationMs: number;
}

export const OVERCLOCK_AMBIENT_PROFILES: Record<
  OverclockAmbientIntensity,
  OverclockAmbientProfile
> = {
  calm: {
    basePulseSeconds: [5.4, 7.2],
    flickerGapMs: [13000, 22000],
    flickerDurationMs: [35, 60],
    bloomGapMs: [15000, 24000],
    bloomDurationMs: 320,
    scanGapMs: [16000, 24000],
    scanDurationMs: 2600,
  },
  warning: {
    basePulseSeconds: [4.2, 5.8],
    flickerGapMs: [9000, 17000],
    flickerDurationMs: [35, 75],
    bloomGapMs: [11000, 18000],
    bloomDurationMs: 300,
    scanGapMs: [12000, 18000],
    scanDurationMs: 2400,
  },
  critical: {
    basePulseSeconds: [3.2, 4.8],
    flickerGapMs: [7000, 14000],
    flickerDurationMs: [35, 85],
    bloomGapMs: [8000, 15000],
    bloomDurationMs: 260,
    scanGapMs: [9000, 15000],
    scanDurationMs: 2200,
  },
};

export function randomBetweenRange([min, max]: Range) {
  return min + Math.random() * (max - min);
}
