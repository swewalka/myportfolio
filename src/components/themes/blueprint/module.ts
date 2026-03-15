import type { ThemeHeroVariant, ThemeLandingVariant, ThemeModule } from '../core/types';
import { NoopUnlockEffectLayer } from '../core/noopLayers';
import { blueprintTheme } from './themeConfig';
import { BlueprintTransitionLayer } from './transition/BlueprintTransitionLayer';
import './engineeringDraft.css';

const getBlueprintLandingVariant = (isUnlocked: boolean): ThemeLandingVariant => {
  if (isUnlocked) {
    return {
      exploreButtonClassName:
        'draft-mode-explore-button draft-mode-explore-button--idle relative overflow-hidden z-20 px-8 py-4 font-medium tracking-wide flex items-center gap-2 transition-all pointer-events-auto cursor-pointer opacity-55',
      exploreButtonStyle: {
        borderRadius: blueprintTheme.tokens.layout.radius,
        border: `${blueprintTheme.tokens.layout.borderWidth} solid ${blueprintTheme.tokens.colors.border}`,
        color: blueprintTheme.tokens.colors.textPrimary,
        background: 'rgba(248, 244, 235, 0.22)',
      },
      shimmerClassName: 'via-zinc-700/10',
      shadowPulse: [],
      scrollIndicatorStyle: {
        color: 'rgba(58, 52, 43, 0.78)',
        fontFamily: blueprintTheme.tokens.typography.fontFamily,
        textTransform: 'uppercase',
        letterSpacing: '0.15em',
      },
      scrollIndicatorContainerClassName: 'draft-mode-scroll-indicator',
      scrollIndicatorCopyClassName: 'draft-mode-scroll-copy',
      scrollIndicatorArrowClassName: 'draft-mode-scroll-arrow',
    };
  }

  return {
    exploreButtonClassName:
      'draft-mode-explore-button draft-mode-explore-button--active relative overflow-hidden z-20 px-8 py-4 font-medium flex items-center gap-2 pointer-events-auto cursor-pointer',
    exploreButtonStyle: {
      borderRadius: blueprintTheme.tokens.layout.radius,
      border: `1px solid ${blueprintTheme.tokens.colors.borderHover}`,
      color: blueprintTheme.tokens.colors.textPrimary,
      background: 'rgba(246, 240, 230, 0.86)',
      fontFamily: blueprintTheme.tokens.typography.fontFamily,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
    },
    shimmerClassName: 'via-orange-900/15',
    shadowPulse: [
      '0 0 0 1px rgba(71, 64, 52, 0.18), 0 8px 20px rgba(51, 42, 31, 0.12)',
      '0 0 0 1px rgba(71, 64, 52, 0.24), 0 12px 28px rgba(51, 42, 31, 0.18)',
      '0 0 0 1px rgba(71, 64, 52, 0.18), 0 8px 20px rgba(51, 42, 31, 0.12)',
    ],
    scrollIndicatorStyle: {
      color: 'rgba(58, 52, 43, 0.78)',
      fontFamily: blueprintTheme.tokens.typography.fontFamily,
      textTransform: 'uppercase',
      letterSpacing: '0.15em',
    },
    scrollIndicatorContainerClassName: 'draft-mode-scroll-indicator',
    scrollIndicatorCopyClassName: 'draft-mode-scroll-copy',
    scrollIndicatorArrowClassName: 'draft-mode-scroll-arrow',
  };
};

const getBlueprintHeroVariant = (): ThemeHeroVariant => {
  return {
    badgeText: blueprintTheme.label,
    badgeContainerClassName: 'draft-mode-badge',
    badgeContainerStyle: {
      backgroundColor: blueprintTheme.tokens.colors.surface,
      borderColor: blueprintTheme.tokens.colors.border,
    },
    badgeTextClassName: 'draft-mode-badge-text',
    badgeTextStyle: {
      color: blueprintTheme.tokens.colors.textSecondary,
      fontFamily: blueprintTheme.tokens.typography.fontFamily,
    },
    titleClassName: 'draft-mode-title',
    titleStyle: {
      color: blueprintTheme.tokens.colors.textPrimary,
      textShadow: blueprintTheme.tokens.colors.textDropShadow,
      fontFamily: blueprintTheme.tokens.typography.fontFamily,
      fontWeight: blueprintTheme.tokens.typography.titleWeight,
      letterSpacing: blueprintTheme.tokens.typography.baseTracking,
    },
    taglineText: blueprintTheme.content.heroTagline,
    taglineClassName: 'draft-mode-tagline',
    taglineStyle: {
      color: blueprintTheme.tokens.colors.accent,
    },
    descriptionText:
      'Absolute power. Flawless execution. The ultimate digital architect forged in pure precision.',
    descriptionClassName: 'draft-mode-description',
    descriptionStyle: {
      color: blueprintTheme.tokens.colors.textSecondary,
      fontFamily: blueprintTheme.tokens.typography.fontFamily,
    },
    primaryActionRowClassName: 'mt-1 mb-9 draft-mode-action-row',
    actionButtonBaseClassName:
      'draft-mode-action-button h-14 min-w-[220px] px-8 inline-flex items-center justify-center border text-[0.92rem] font-semibold uppercase transition-all duration-300 pointer-events-auto cursor-pointer',
    actionButtonBaseStyle: {
      fontFamily: blueprintTheme.tokens.typography.fontFamily,
      letterSpacing: '0.12em',
      borderRadius: blueprintTheme.tokens.layout.radius,
    },
    themeActionText: 'Theme Engine',
    themeActionClassName: 'draft-mode-action-primary',
    themeActionStyle: undefined,
    contactActionText: 'Initiate contact',
    contactActionClassName: 'draft-mode-action-secondary',
    contactActionStyle: undefined,
  };
};

export const blueprintThemeModule: ThemeModule = {
  config: blueprintTheme,
  TransitionLayer: BlueprintTransitionLayer,
  UnlockEffectLayer: NoopUnlockEffectLayer,
  getLandingVariant: getBlueprintLandingVariant,
  getHeroVariant: getBlueprintHeroVariant,
};
