import type { ThemeHeroVariant, ThemeLandingVariant, ThemeModule } from '../core/types';
import { NoopUnlockEffectLayer } from '../core/noopLayers';
import { blueprintTheme } from './themeConfig';
import { BlueprintTransitionLayer } from './transition/BlueprintTransitionLayer';

const getBlueprintLandingVariant = (isUnlocked: boolean): ThemeLandingVariant => {
  if (isUnlocked) {
    return {
      exploreButtonClassName:
        'relative overflow-hidden z-20 px-8 py-4 font-medium tracking-wide flex items-center gap-2 transition-all pointer-events-auto cursor-pointer opacity-50',
      exploreButtonStyle: {
        borderRadius: blueprintTheme.tokens.layout.radius,
        border: `${blueprintTheme.tokens.layout.borderWidth} solid ${blueprintTheme.tokens.colors.border}`,
        color: blueprintTheme.tokens.colors.textPrimary,
        background: 'transparent',
      },
      shimmerClassName: 'via-white/20',
      shadowPulse: [],
      scrollIndicatorStyle: {
        color: 'rgba(0, 230, 255, 0.6)',
        fontFamily: 'monospace',
        textTransform: 'uppercase',
        letterSpacing: '0.15em',
      },
    };
  }

  return {
    exploreButtonClassName:
      'relative overflow-hidden z-20 px-8 py-4 font-medium flex items-center gap-2 pointer-events-auto cursor-pointer',
    exploreButtonStyle: {
      borderRadius: '0px',
      border: `1px solid ${blueprintTheme.tokens.colors.accent}`,
      color: blueprintTheme.tokens.colors.accent,
      background: 'rgba(0,230,255,0.05)',
      fontFamily: 'monospace',
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
    },
    shimmerClassName: 'via-cyan-300/30',
    shadowPulse: [
      '0 0 0 0 rgba(0,230,255,0)',
      '0 0 18px 4px rgba(0,230,255,0.4)',
      '0 0 0 0 rgba(0,230,255,0)',
    ],
    scrollIndicatorStyle: {
      color: 'rgba(0, 230, 255, 0.6)',
      fontFamily: 'monospace',
      textTransform: 'uppercase',
      letterSpacing: '0.15em',
    },
  };
};

const getBlueprintHeroVariant = (): ThemeHeroVariant => {
  return {
    badgeText: blueprintTheme.label,
    badgeContainerClassName: '',
    badgeContainerStyle: {
      backgroundColor: blueprintTheme.tokens.colors.surface,
      borderColor: blueprintTheme.tokens.colors.border,
    },
    badgeTextClassName: '',
    badgeTextStyle: {
      color: blueprintTheme.tokens.colors.textSecondary,
      fontFamily: blueprintTheme.tokens.typography.fontFamily,
    },
    titleClassName: '',
    titleStyle: {
      color: blueprintTheme.tokens.colors.textPrimary,
      textShadow: blueprintTheme.tokens.colors.textDropShadow,
      fontFamily: blueprintTheme.tokens.typography.fontFamily,
      fontWeight: blueprintTheme.tokens.typography.titleWeight,
      letterSpacing: blueprintTheme.tokens.typography.baseTracking,
    },
    taglineText: blueprintTheme.content.heroTagline,
    taglineClassName: '',
    taglineStyle: {
      color: blueprintTheme.tokens.colors.accent,
    },
    descriptionText:
      'Absolute power. Flawless execution. The ultimate digital architect forged in pure precision.',
    descriptionClassName: '',
    descriptionStyle: {
      color: blueprintTheme.tokens.colors.textSecondary,
      fontFamily: blueprintTheme.tokens.typography.fontFamily,
    },
    ctaText: 'Initiate contact',
    ctaClassName: '',
    ctaStyle: {
      color: blueprintTheme.tokens.colors.accent,
      fontFamily: blueprintTheme.tokens.typography.fontFamily,
    },
  };
};

export const blueprintThemeModule: ThemeModule = {
  config: blueprintTheme,
  TransitionLayer: BlueprintTransitionLayer,
  UnlockEffectLayer: NoopUnlockEffectLayer,
  getLandingVariant: getBlueprintLandingVariant,
  getHeroVariant: getBlueprintHeroVariant,
};
