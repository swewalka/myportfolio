import type { ThemeConfig } from '../types';

export const blueprintTheme: ThemeConfig = {
  id: 'blueprint',
  label: 'Blueprint Mode',
  content: {
    heroTagline: 'Architected.',
  },
  tokens: {
    colors: {
      background: '#040d1a', // Dark blue-black
      textPrimary: '#66b3ff', // Blueprint cyan/blue
      textSecondary: '#3377cc',
      accent: '#00e6ff',
      surface: 'rgba(4, 13, 26, 0.8)',
      surfaceHover: 'rgba(10, 30, 60, 0.9)',
      border: 'rgba(102, 179, 255, 0.4)',
      borderHover: 'rgba(102, 179, 255, 0.8)',
      cardRing: 'rgba(102, 179, 255, 0.2)',
      cardRingHover: 'rgba(102, 179, 255, 0.5)',
      cardDropShadow: '0 4px 20px rgba(0, 50, 100, 0.4)',
      textDropShadow: '0 0 8px rgba(102, 179, 255, 0.4)',
    },
    typography: {
      fontFamily: 'monospace, "Courier New", Courier',
      fontStyle: 'normal',
      titleWeight: '400',
      baseTracking: '0.05em',
    },
    layout: {
      radius: '0px', // Precise, square edges
      borderWidth: '1px', // Thin drafting lines
      cardPadding: '3rem',
    },
    motion: {
      transitionDuration: 1.2,
      hoverScale: 1.0, // No scale, just color/border shifts for precision
      tapScale: 0.98,
    },
  },
};
