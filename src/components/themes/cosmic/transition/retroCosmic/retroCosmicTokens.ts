export interface RetroStarToken {
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleDuration: number;
  delay: number;
}

export interface RetroOrbitRing {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  rotate: number;
  dashed?: boolean;
}

export interface RetroOrbitArc {
  d: string;
  dashArray?: string;
  opacity: number;
}

export interface RetroOrbitMarkerTrack {
  ringIndex: number;
  startAngle: number;
  duration: number;
  size: number;
}

export interface RetroRocketTrajectory {
  id: string;
  start: [number, number];
  c1: [number, number];
  c2: [number, number];
  end: [number, number];
}

export const retroCosmicTokens = {
  colors: {
    backdrop: '#060b13',
    backdropSecondary: '#101b2a',
    horizonGlow: 'rgba(132, 190, 204, 0.2)',
    brassGlow: 'rgba(234, 184, 106, 0.18)',
    orbitPrimary: 'rgba(199, 221, 230, 0.38)',
    orbitSecondary: 'rgba(143, 185, 200, 0.28)',
    orbitDashed: 'rgba(230, 200, 143, 0.34)',
    marker: '#f0d9a8',
    rocketBody: '#f8e9cc',
    rocketAccent: '#84b9c7',
    rocketTrail: 'rgba(248, 215, 150, 0.7)',
  },
  stars: [
    { x: 7, y: 18, size: 2.4, opacity: 0.5, twinkleDuration: 14, delay: 0 },
    { x: 12, y: 62, size: 1.8, opacity: 0.46, twinkleDuration: 10, delay: 1.4 },
    { x: 15, y: 34, size: 1.6, opacity: 0.35, twinkleDuration: 12, delay: 2.2 },
    { x: 21, y: 14, size: 2.8, opacity: 0.55, twinkleDuration: 16, delay: 0.7 },
    { x: 26, y: 48, size: 2.2, opacity: 0.5, twinkleDuration: 13, delay: 3.1 },
    { x: 30, y: 75, size: 1.6, opacity: 0.3, twinkleDuration: 11, delay: 1.8 },
    { x: 35, y: 26, size: 1.9, opacity: 0.4, twinkleDuration: 17, delay: 4.2 },
    { x: 41, y: 58, size: 2.6, opacity: 0.44, twinkleDuration: 15, delay: 0.9 },
    { x: 49, y: 16, size: 1.5, opacity: 0.28, twinkleDuration: 12, delay: 2.8 },
    { x: 54, y: 64, size: 2.1, opacity: 0.43, twinkleDuration: 14, delay: 1.3 },
    { x: 61, y: 42, size: 1.8, opacity: 0.35, twinkleDuration: 12, delay: 3.8 },
    { x: 67, y: 21, size: 2.3, opacity: 0.46, twinkleDuration: 15, delay: 2.5 },
    { x: 73, y: 70, size: 1.7, opacity: 0.28, twinkleDuration: 18, delay: 0.4 },
    { x: 78, y: 12, size: 2.5, opacity: 0.42, twinkleDuration: 13, delay: 1.6 },
    { x: 84, y: 38, size: 2.1, opacity: 0.34, twinkleDuration: 16, delay: 2.9 },
    { x: 89, y: 57, size: 1.5, opacity: 0.3, twinkleDuration: 11, delay: 0.6 },
    { x: 92, y: 24, size: 2.7, opacity: 0.5, twinkleDuration: 14, delay: 4.7 },
    { x: 95, y: 68, size: 1.9, opacity: 0.36, twinkleDuration: 15, delay: 1.1 },
  ] as RetroStarToken[],
  orbits: {
    rings: [
      { cx: 76, cy: 31, rx: 33, ry: 21, rotate: -14 },
      { cx: 73, cy: 35, rx: 27, ry: 17, rotate: -16, dashed: true },
      { cx: 77, cy: 29, rx: 39, ry: 25, rotate: -12, dashed: true },
    ] as RetroOrbitRing[],
    arcs: [
      { d: 'M 34 72 Q 59 50 91 48', dashArray: '3 5', opacity: 0.42 },
      { d: 'M 29 82 Q 57 58 94 59', dashArray: '2 6', opacity: 0.3 },
      { d: 'M 47 16 Q 61 10 76 11', opacity: 0.28 },
      { d: 'M 56 87 Q 71 76 84 62', dashArray: '1.5 4', opacity: 0.26 },
    ] as RetroOrbitArc[],
    markerTracks: [
      { ringIndex: 0, startAngle: 28, duration: 34, size: 0.85 },
      { ringIndex: 1, startAngle: 182, duration: 28, size: 0.7 },
      { ringIndex: 2, startAngle: 304, duration: 40, size: 0.95 },
    ] as RetroOrbitMarkerTrack[],
  },
  rocket: {
    minIntervalMs: 20000,
    maxIntervalMs: 40000,
    minDurationMs: 9500,
    maxDurationMs: 13500,
    trajectories: [
      {
        id: 'flyby-north',
        start: [-6, 78],
        c1: [24, 63],
        c2: [57, 16],
        end: [102, 4],
      },
      {
        id: 'flyby-east',
        start: [106, 84],
        c1: [81, 73],
        c2: [61, 23],
        end: [24, 8],
      },
      {
        id: 'flyby-dip',
        start: [5, 96],
        c1: [34, 82],
        c2: [66, 66],
        end: [102, 50],
      },
    ] as RetroRocketTrajectory[],
  },
} as const;

