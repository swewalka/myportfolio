import type { ThemeConfig } from '../core/types';

export const brutalTheme: ThemeConfig = {
  id: 'brutal',
  label: 'Brutal Mode',
  content: {
    heroTagline: 'Raw.',
  },
  tokens: {
    colors: {
      background: '#e0e0e0', // Harsh light gray/white or #000 depending on preference. Going with stark light-grey to contrast everything else.
      textPrimary: '#000000',
      textSecondary: '#404040',
      accent: '#ff3300', // Warning red
      surface: '#ffffff',
      surfaceHover: '#f0f0f0',
      border: '#000000',
      borderHover: '#000000',
      cardRing: 'transparent',
      cardRingHover: 'transparent',
      cardDropShadow: '8px 8px 0px #000000', // Hard, offset shadow
      textDropShadow: 'none',
    },
    typography: {
      fontFamily: '"Impact", "Arial Black", sans-serif',
      fontStyle: 'normal',
      titleWeight: '900',
      baseTracking: '-0.02em',
    },
    layout: {
      radius: '0px', // Sharp
      borderWidth: '4px', // Heavy thick borders
      cardPadding: '3rem',
    },
    motion: {
      transitionDuration: 0.4, // Fast, abrupt
      hoverScale: 1.05, // aggressive pop
      tapScale: 0.9,
    },
  },
};
