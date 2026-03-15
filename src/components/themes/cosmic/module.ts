import type { ThemeHeroVariant, ThemeLandingVariant, ThemeModule } from '../core/types';
import { NoopUnlockEffectLayer } from '../core/noopLayers';
import { cosmicTheme } from './themeConfig';
import { CosmicTransitionLayer } from './transition/CosmicTransitionLayer';

const getCosmicLandingVariant = (isUnlocked: boolean): ThemeLandingVariant => {
  if (isUnlocked) {
    return {
      exploreButtonClassName:
        'relative overflow-hidden z-20 px-8 py-4 font-medium tracking-wide flex items-center gap-2 transition-all pointer-events-auto cursor-pointer opacity-50',
      exploreButtonStyle: {
        borderRadius: cosmicTheme.tokens.layout.radius,
        border: `${cosmicTheme.tokens.layout.borderWidth} solid ${cosmicTheme.tokens.colors.border}`,
        color: cosmicTheme.tokens.colors.textPrimary,
        background: 'transparent',
      },
      shimmerClassName: 'via-white/20',
      shadowPulse: [],
      scrollIndicatorStyle: {
        color: 'rgba(241, 229, 200, 0.76)',
        fontFamily: cosmicTheme.tokens.typography.fontFamily,
        letterSpacing: '0.18em',
      },
    };
  }

  return {
    exploreButtonClassName:
      'relative overflow-hidden z-20 px-8 py-4 font-light flex items-center gap-2 pointer-events-auto cursor-pointer',
    exploreButtonStyle: {
      borderRadius: '999px',
      border: '1px solid rgba(223,198,151,0.42)',
      color: '#f1e5c8',
      background: 'rgba(11,22,31,0.58)',
      backdropFilter: 'blur(10px)',
      fontFamily: '"Avenir Next", "Futura", "Trebuchet MS", sans-serif',
      letterSpacing: '0.18em',
      textTransform: 'uppercase',
    },
    shimmerClassName: 'via-amber-100/30',
    shadowPulse: [
      '0 0 14px 2px rgba(214,180,124,0.16)',
      '0 0 24px 6px rgba(214,180,124,0.3)',
      '0 0 14px 2px rgba(214,180,124,0.16)',
    ],
    scrollIndicatorStyle: {
      color: 'rgba(241, 229, 200, 0.76)',
      fontFamily: cosmicTheme.tokens.typography.fontFamily,
      letterSpacing: '0.18em',
    },
  };
};

const getCosmicHeroVariant = (): ThemeHeroVariant => {
  return {
    badgeText: cosmicTheme.label,
    badgeContainerClassName: '',
    badgeContainerStyle: {
      backgroundColor: cosmicTheme.tokens.colors.surface,
      borderColor: cosmicTheme.tokens.colors.border,
    },
    badgeTextClassName: '',
    badgeTextStyle: {
      color: cosmicTheme.tokens.colors.textSecondary,
      fontFamily: cosmicTheme.tokens.typography.fontFamily,
    },
    titleClassName: '',
    titleStyle: {
      color: cosmicTheme.tokens.colors.textPrimary,
      textShadow: cosmicTheme.tokens.colors.textDropShadow,
      fontFamily: cosmicTheme.tokens.typography.fontFamily,
      fontWeight: cosmicTheme.tokens.typography.titleWeight,
      letterSpacing: cosmicTheme.tokens.typography.baseTracking,
    },
    taglineText: cosmicTheme.content.heroTagline,
    taglineClassName: '',
    taglineStyle: {
      color: cosmicTheme.tokens.colors.accent,
    },
    descriptionText:
      'Absolute power. Flawless execution. The ultimate digital architect forged in pure precision.',
    descriptionClassName: '',
    descriptionStyle: {
      color: cosmicTheme.tokens.colors.textSecondary,
      fontFamily: cosmicTheme.tokens.typography.fontFamily,
    },
    primaryActionRowClassName: 'mt-1 mb-9',
    actionButtonBaseClassName:
      'h-14 min-w-[220px] px-8 inline-flex items-center justify-center rounded-full border text-[0.95rem] font-medium uppercase transition-all duration-300 pointer-events-auto cursor-pointer',
    actionButtonBaseStyle: {
      fontFamily: cosmicTheme.tokens.typography.fontFamily,
      letterSpacing: '0.16em',
    },
    themeActionText: 'Theme Engine',
    themeActionClassName:
      'bg-[#f1e5c8] text-[#0d1520] border-[#f5e8ca] shadow-[0_0_20px_rgba(223,198,151,0.32)] hover:bg-[#f8eed7] hover:-translate-y-0.5',
    themeActionStyle: undefined,
    contactActionText: 'Initiate contact',
    contactActionClassName:
      'bg-transparent text-[#f1e5c8] border-[rgba(223,198,151,0.55)] hover:border-[rgba(223,198,151,0.82)] hover:bg-[rgba(223,198,151,0.12)] hover:-translate-y-0.5',
    contactActionStyle: undefined,
  };
};

export const cosmicThemeModule: ThemeModule = {
  config: cosmicTheme,
  TransitionLayer: CosmicTransitionLayer,
  UnlockEffectLayer: NoopUnlockEffectLayer,
  getLandingVariant: getCosmicLandingVariant,
  getHeroVariant: getCosmicHeroVariant,
};
