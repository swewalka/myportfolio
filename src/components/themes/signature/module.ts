import { SignatureTransitionLayer } from './transition/SignatureTransitionLayer';
import { signatureTheme } from './themeConfig';
import { SignatureOverclockLayer } from './overclock/SignatureOverclockLayer';
import type { ThemeHeroVariant, ThemeModule } from '../core/types';

const signatureLandingLocked = {
  exploreButtonClassName:
    'relative overflow-hidden z-20 px-8 py-4 rounded-full font-medium tracking-wide flex items-center gap-2 pointer-events-auto cursor-pointer border border-white/30 bg-white/15 backdrop-blur-xl text-white',
  exploreButtonStyle: {},
  shimmerClassName: 'via-white/40',
  shadowPulse: [
    '0 0 0 0 rgba(255,255,255,0.05)',
    '0 4px 24px 0 rgba(255,255,255,0.2)',
    '0 0 0 0 rgba(255,255,255,0.05)',
  ],
  scrollIndicatorStyle: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontFamily: signatureTheme.tokens.typography.fontFamily,
    letterSpacing: signatureTheme.tokens.typography.baseTracking,
  },
  scrollIndicatorContainerClassName: '',
  scrollIndicatorCopyClassName: '',
  scrollIndicatorArrowClassName: '',
  showScrollRescueLights: false,
  scrollRescueLightClassName: '',
  scrollRescueLightCoreClassName: '',
  cardShellClassName: '',
  cardRefractionClassName: '',
  cardEdgeSweepClassName: '',
};

const signatureLandingUnlocked = {
  ...signatureLandingLocked,
  exploreButtonClassName:
    'relative overflow-hidden z-20 px-8 py-4 font-medium tracking-wide flex items-center gap-2 transition-all pointer-events-auto cursor-pointer opacity-50',
  exploreButtonStyle: {
    borderRadius: signatureTheme.tokens.layout.radius,
    border: `${signatureTheme.tokens.layout.borderWidth} solid ${signatureTheme.tokens.colors.border}`,
    color: signatureTheme.tokens.colors.textPrimary,
    background: 'transparent',
  },
  shimmerClassName: 'via-white/20',
  shadowPulse: [],
  scrollIndicatorContainerClassName: 'signature-overclock-scroll-indicator',
  scrollIndicatorCopyClassName:
    'signature-overclock-scroll-copy signature-overclock-flicker-target',
  scrollIndicatorArrowClassName: 'signature-overclock-scroll-arrow relative z-10',
  showScrollRescueLights: true,
  scrollRescueLightClassName: 'signature-overclock-rescue-light',
  scrollRescueLightCoreClassName: 'signature-overclock-rescue-light-core',
  cardShellClassName: 'signature-overclock-card-shell signature-overclock-flicker-target',
  cardRefractionClassName: 'signature-overclock-card-refraction',
  cardEdgeSweepClassName: 'signature-overclock-card-edge-sweep',
};

const signatureHeroLocked: ThemeHeroVariant = {
  badgeText: 'Pro. Engineered.',
  badgeContainerClassName: '',
  badgeContainerStyle: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderColor: 'rgba(255,255,255,0.3)',
  },
  badgeTextClassName: '',
  badgeTextStyle: {
    color: 'rgba(255,255,255,0.9)',
    fontFamily: signatureTheme.tokens.typography.fontFamily,
  },
  titleClassName: '',
  titleStyle: undefined,
  taglineText: 'Supercharged.',
  taglineClassName:
    'text-transparent bg-clip-text bg-gradient-to-b from-white via-white/80 to-white/10 drop-shadow-[0_0_15px_rgba(255,255,255,0.6)]',
  taglineStyle: undefined,
  descriptionText:
    'Absolute power. Flawless execution. The ultimate digital architect forged in pure precision.',
  descriptionClassName: '',
  descriptionStyle: {
    color: 'rgba(255,255,255,0.9)',
    fontFamily: signatureTheme.tokens.typography.fontFamily,
  },
  ctaText: 'Initiate contact',
  ctaClassName: '',
  ctaStyle: {
    color: '#2997ff',
    fontFamily: signatureTheme.tokens.typography.fontFamily,
  },
};

const signatureHeroUnlocked: ThemeHeroVariant = {
  badgeText: 'Pro. Engineered.',
  badgeContainerClassName:
    'bg-[#0a0000] border-[#ff003c]/50 shadow-[0_0_30px_rgba(255,0,60,0.6)] signature-overclock-flicker-target signature-overclock-badge-pulse',
  badgeContainerStyle: {},
  badgeTextClassName:
    'text-[#ff003c] drop-shadow-[0_0_10px_rgba(255,0,60,0.9)] signature-overclock-flicker-target',
  badgeTextStyle: {
    fontFamily: signatureTheme.tokens.typography.fontFamily,
  },
  titleClassName:
    'text-transparent bg-clip-text bg-gradient-to-b from-[#ff003c] via-[#ff4a4a] to-[#5a0014] drop-shadow-[0_0_40px_rgba(255,0,60,0.6)] scale-[1.02] signature-overclock-flicker-target signature-overclock-hero-headline',
  titleStyle: undefined,
  taglineText: 'Supercharged.',
  taglineClassName:
    'text-transparent bg-clip-text bg-gradient-to-b from-[#ff003c] via-[#ff6b6b] to-[#8a0020] drop-shadow-[0_0_25px_rgba(255,0,60,0.8)] signature-overclock-hero-tagline',
  taglineStyle: undefined,
  descriptionText:
    'Absolute power. Flawless execution. The ultimate digital architect forged in pure precision.',
  descriptionClassName: 'text-[#ffb3b3] drop-shadow-[0_0_15px_rgba(255,0,60,0.5)]',
  descriptionStyle: {
    fontFamily: signatureTheme.tokens.typography.fontFamily,
  },
  ctaText: 'Initiate contact',
  ctaClassName: 'signature-overclock-cta signature-overclock-flicker-target',
  ctaStyle: {
    color: '#2997ff',
    fontFamily: signatureTheme.tokens.typography.fontFamily,
  },
};

export const signatureThemeModule: ThemeModule = {
  config: signatureTheme,
  TransitionLayer: SignatureTransitionLayer,
  UnlockEffectLayer: SignatureOverclockLayer,
  getLandingVariant: (isUnlocked) =>
    isUnlocked ? signatureLandingUnlocked : signatureLandingLocked,
  getHeroVariant: (isUnlocked) => (isUnlocked ? signatureHeroUnlocked : signatureHeroLocked),
};
