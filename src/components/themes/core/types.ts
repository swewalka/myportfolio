import type { ComponentType, CSSProperties } from 'react';

export type ThemeId = 'signature' | 'blueprint' | 'brutal' | 'cosmic';

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

export interface ThemeUnlockEffectProps {
  isUnlocked: boolean;
  isWiggling: boolean;
}

export interface ThemeLandingVariant {
  exploreButtonClassName: string;
  exploreButtonStyle: CSSProperties;
  shimmerClassName: string;
  shadowPulse: string[];
  scrollIndicatorStyle: CSSProperties;
  scrollIndicatorContainerClassName?: string;
  scrollIndicatorCopyClassName?: string;
  scrollIndicatorArrowClassName?: string;
  showScrollRescueLights?: boolean;
  scrollRescueLightClassName?: string;
  scrollRescueLightCoreClassName?: string;
  cardShellClassName?: string;
  cardRefractionClassName?: string;
  cardEdgeSweepClassName?: string;
}

export interface ThemeHeroVariant {
  badgeText: string;
  badgeContainerClassName: string;
  badgeContainerStyle: CSSProperties;
  badgeTextClassName: string;
  badgeTextStyle: CSSProperties;
  titleClassName: string;
  titleStyle?: CSSProperties;
  taglineText: string;
  taglineClassName: string;
  taglineStyle?: CSSProperties;
  descriptionText: string;
  descriptionClassName: string;
  descriptionStyle: CSSProperties;
  ctaText: string;
  ctaClassName: string;
  ctaStyle: CSSProperties;
}

export interface ThemeModule {
  config: ThemeConfig;
  TransitionLayer: ComponentType;
  UnlockEffectLayer: ComponentType<ThemeUnlockEffectProps>;
  getLandingVariant: (isUnlocked: boolean) => ThemeLandingVariant;
  getHeroVariant: (isUnlocked: boolean) => ThemeHeroVariant;
}
