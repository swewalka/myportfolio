import type { ThemeConfig } from '../types';

export const cosmicTheme: ThemeConfig = {
  id: 'cosmic',
  label: 'Cosmic Mode',
  content: {
    heroTagline: 'Cosmic.',
  },
  tokens: {
    colors: {
      background: '#010205', // Deep space black
      textPrimary: '#e6e6fa', // Soft starlight lavender/white
      textSecondary: '#8a8a9a',
      accent: '#b366ff', // Nebula purple
      surface: 'rgba(15, 15, 25, 0.4)',
      surfaceHover: 'rgba(25, 25, 45, 0.6)',
      border: 'rgba(180, 150, 255, 0.1)',
      borderHover: 'rgba(180, 150, 255, 0.3)',
      cardRing: 'rgba(180, 150, 255, 0.05)',
      cardRingHover: 'rgba(180, 150, 255, 0.2)',
      cardDropShadow: '0 20px 50px rgba(80, 30, 150, 0.2)',
      textDropShadow: '0 0 20px rgba(180, 150, 255, 0.5)',
    },
    typography: {
      fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', // Clean, expansive default
      fontStyle: 'normal',
      titleWeight: '300', // Light and airy
      baseTracking: '0.1em', // Expansive
    },
    layout: {
      radius: '40px', // Very round, pebble-like floating objects
      borderWidth: '1px',
      cardPadding: '4rem',
    },
    motion: {
      transitionDuration: 1.8, // Slow drift
      hoverScale: 1.03, // subtle float up
      tapScale: 0.97,
    },
  },
};
