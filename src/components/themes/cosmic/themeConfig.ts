import type { ThemeConfig } from '../core/types';

export const cosmicTheme: ThemeConfig = {
  id: 'cosmic',
  label: 'Retro Cosmic Mode',
  content: {
    heroTagline: 'Expedition.',
  },
  tokens: {
    colors: {
      background: '#060b13',
      textPrimary: '#f1e5c8',
      textSecondary: '#b7a98c',
      accent: '#86c4d0',
      surface: 'rgba(13, 21, 31, 0.56)',
      surfaceHover: 'rgba(20, 31, 45, 0.7)',
      border: 'rgba(223, 198, 151, 0.24)',
      borderHover: 'rgba(223, 198, 151, 0.46)',
      cardRing: 'rgba(134, 196, 208, 0.08)',
      cardRingHover: 'rgba(134, 196, 208, 0.24)',
      cardDropShadow: '0 24px 56px rgba(4, 8, 16, 0.58)',
      textDropShadow: '0 0 18px rgba(222, 186, 129, 0.2)',
    },
    typography: {
      fontFamily: '"Avenir Next", "Futura", "Trebuchet MS", sans-serif',
      fontStyle: 'normal',
      titleWeight: '500',
      baseTracking: '0.08em',
    },
    layout: {
      radius: '32px',
      borderWidth: '1px',
      cardPadding: '4rem',
    },
    motion: {
      transitionDuration: 1.6,
      hoverScale: 1.025,
      tapScale: 0.97,
    },
  },
};
