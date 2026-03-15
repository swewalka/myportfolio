import type { ThemeConfig } from '../core/types';

export const signatureTheme: ThemeConfig = {
  id: 'signature',
  label: 'Signature Mode',
  content: {
    heroTagline: 'Supercharged.',
  },
  tokens: {
    colors: {
      background: '#000000',
      textPrimary: '#f5f5f7',
      textSecondary: '#a1a1a6',
      accent: '#d2d2d7',
      surface: '#1d1d1f',
      surfaceHover: '#252528',
      border: 'rgba(255, 255, 255, 0.1)',
      borderHover: 'rgba(255, 255, 255, 0.2)',
      cardRing: 'rgba(255, 255, 255, 0.05)',
      cardRingHover: 'rgba(255, 255, 255, 0.1)',
      cardDropShadow: '0 20px 50px rgba(0, 0, 0, 0.35)',
      textDropShadow: 'none',
    },
    typography: {
      fontFamily: 'Inter, system-ui, sans-serif',
      fontStyle: 'normal',
      titleWeight: '600',
      baseTracking: '-0.03em',
    },
    layout: {
      radius: '2.5rem',
      borderWidth: '1px',
      cardPadding: '3rem',
    },
    motion: {
      transitionDuration: 1,
      hoverScale: 1.02,
      tapScale: 0.95,
    },
  },
};
