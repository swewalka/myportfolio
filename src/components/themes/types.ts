export type ThemeId = 'default' | 'blueprint' | 'brutal' | 'cosmic';

export interface ThemeTokens {
  colors: {
    background: string;
    textPrimary: string;
    textSecondary: string;
    accent: string;
    surface: string;
    surfaceHover: string;
    border: string;
    borderHover: string;
    cardRing: string;
    cardRingHover: string;
    cardDropShadow: string;
    textDropShadow: string;
  };
  typography: {
    fontFamily: string;
    fontStyle: string;
    titleWeight: string;
    baseTracking: string;
  };
  layout: {
    radius: string;
    borderWidth: string;
    cardPadding: string;
  };
  motion: {
    transitionDuration: number;
    hoverScale: number;
    tapScale: number;
  };
}

export interface ThemeConfig {
  id: ThemeId;
  label: string;
  content: {
    heroTagline: string;
  };
  tokens: ThemeTokens;
}
