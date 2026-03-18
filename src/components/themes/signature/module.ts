import type { ThemeModule } from '../core/types';
import { SignatureTransitionLayer } from './transition/SignatureTransitionLayer';
import { signatureTheme } from './themeConfig';

export const signatureThemeModule: ThemeModule = {
  config: signatureTheme,
  TransitionLayer: SignatureTransitionLayer,
};
