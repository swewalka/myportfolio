import type { ThemeHeroVariant, ThemeLandingVariant, ThemeModule } from '../core/types';
import { NoopUnlockEffectLayer } from '../core/noopLayers';
import { brutalTheme } from './themeConfig';
import { BrutalTransitionLayer } from './transition/BrutalTransitionLayer';

const getBrutalLandingVariant = (isUnlocked: boolean): ThemeLandingVariant => {
  if (isUnlocked) {
    return {
      exploreButtonClassName:
        'relative overflow-hidden z-20 px-8 py-4 font-medium tracking-wide flex items-center gap-2 transition-all pointer-events-auto cursor-pointer opacity-50',
      exploreButtonStyle: {
        borderRadius: brutalTheme.tokens.layout.radius,
        border: `${brutalTheme.tokens.layout.borderWidth} solid ${brutalTheme.tokens.colors.border}`,
        color: brutalTheme.tokens.colors.textPrimary,
        background: 'transparent',
      },
      shimmerClassName: 'via-white/20',
      shadowPulse: [],
      scrollIndicatorStyle: {
        color: '#000000',
        fontFamily: '"Impact", "Arial Black", sans-serif',
        fontWeight: '900',
        letterSpacing: '0.05em',
      },
    };
  }

  return {
    exploreButtonClassName:
      'relative overflow-hidden z-20 px-8 py-4 font-black flex items-center gap-2 pointer-events-auto cursor-pointer uppercase',
    exploreButtonStyle: {
      borderRadius: '0px',
      border: '4px solid #000000',
      color: '#000000',
      background: brutalTheme.tokens.colors.accent,
      fontFamily: '"Impact", "Arial Black", sans-serif',
      letterSpacing: '-0.02em',
      boxShadow: '6px 6px 0px #000000',
    },
    shimmerClassName: 'via-white/40',
    shadowPulse: ['6px 6px 0px #000000', '8px 8px 0px #000000', '6px 6px 0px #000000'],
    scrollIndicatorStyle: {
      color: '#000000',
      fontFamily: '"Impact", "Arial Black", sans-serif',
      fontWeight: '900',
      letterSpacing: '0.05em',
    },
  };
};

const getBrutalHeroVariant = (): ThemeHeroVariant => {
  return {
    badgeText: brutalTheme.label,
    badgeContainerClassName: '',
    badgeContainerStyle: {
      backgroundColor: brutalTheme.tokens.colors.surface,
      borderColor: brutalTheme.tokens.colors.border,
    },
    badgeTextClassName: '',
    badgeTextStyle: {
      color: brutalTheme.tokens.colors.textSecondary,
      fontFamily: brutalTheme.tokens.typography.fontFamily,
    },
    titleClassName: '',
    titleStyle: {
      color: brutalTheme.tokens.colors.textPrimary,
      textShadow: brutalTheme.tokens.colors.textDropShadow,
      fontFamily: brutalTheme.tokens.typography.fontFamily,
      fontWeight: brutalTheme.tokens.typography.titleWeight,
      letterSpacing: brutalTheme.tokens.typography.baseTracking,
    },
    taglineText: brutalTheme.content.heroTagline,
    taglineClassName: '',
    taglineStyle: {
      color: brutalTheme.tokens.colors.accent,
    },
    descriptionText:
      'Absolute power. Flawless execution. The ultimate digital architect forged in pure precision.',
    descriptionClassName: '',
    descriptionStyle: {
      color: brutalTheme.tokens.colors.textSecondary,
      fontFamily: brutalTheme.tokens.typography.fontFamily,
    },
    ctaText: 'Initiate contact',
    ctaClassName: '',
    ctaStyle: {
      color: brutalTheme.tokens.colors.accent,
      fontFamily: brutalTheme.tokens.typography.fontFamily,
    },
  };
};

export const brutalThemeModule: ThemeModule = {
  config: brutalTheme,
  TransitionLayer: BrutalTransitionLayer,
  UnlockEffectLayer: NoopUnlockEffectLayer,
  getLandingVariant: getBrutalLandingVariant,
  getHeroVariant: getBrutalHeroVariant,
};
