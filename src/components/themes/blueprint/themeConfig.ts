import type { ThemeConfig } from '../core/types';

export const blueprintTheme: ThemeConfig = {
  id: 'blueprint',
  label: 'Engineering Draft',
  content: {
    landingTagline: 'Drafting.',
  },
  tokens: {
    colors: {
      background: '#ece8dc',
      textPrimary: '#27231c',
      textSecondary: '#5f574c',
      accent: '#b95a2f',
      surface: 'rgba(248, 244, 235, 0.88)',
      surfaceHover: 'rgba(244, 239, 229, 0.94)',
      border: 'rgba(73, 66, 54, 0.38)',
      borderHover: 'rgba(46, 41, 34, 0.65)',
      cardRing: 'rgba(110, 103, 90, 0.18)',
      cardRingHover: 'rgba(80, 73, 60, 0.3)',
      cardDropShadow: '0 12px 28px rgba(36, 30, 22, 0.12)',
      textDropShadow: 'none',
    },
    typography: {
      fontFamily: '"IBM Plex Mono", "SFMono-Regular", "Menlo", "Consolas", monospace',
      fontStyle: 'normal',
      titleWeight: '600',
      baseTracking: '0.028em',
    },
    layout: {
      radius: '2px',
      borderWidth: '1px',
      cardPadding: '3rem',
    },
    motion: {
      transitionDuration: 0.7,
      hoverScale: 1.0,
      tapScale: 0.98,
    },
  },
};
