import type { ThemeModule } from '../core/types';
import { BrutalTransitionLayer } from './transition/BrutalTransitionLayer';
import { brutalTheme } from './themeConfig';

export const brutalThemeModule: ThemeModule = {
  config: brutalTheme,
  TransitionLayer: BrutalTransitionLayer,
};
