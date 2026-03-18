import type { ThemeModule } from '../core/types';
import { BlueprintTransitionLayer } from './transition/BlueprintTransitionLayer';
import { blueprintTheme } from './themeConfig';
import './engineeringDraft.css';

export const blueprintThemeModule: ThemeModule = {
  config: blueprintTheme,
  TransitionLayer: BlueprintTransitionLayer,
};
