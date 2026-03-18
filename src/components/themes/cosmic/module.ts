import type { ThemeModule } from '../core/types';
import { CosmicTransitionLayer } from './transition/CosmicTransitionLayer';
import { cosmicTheme } from './themeConfig';

export const cosmicThemeModule: ThemeModule = {
  config: cosmicTheme,
  TransitionLayer: CosmicTransitionLayer,
};
