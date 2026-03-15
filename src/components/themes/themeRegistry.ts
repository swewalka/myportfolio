import { blueprintTheme } from './themes/blueprintTheme';
import { brutalTheme } from './themes/brutalTheme';
import { cosmicTheme } from './themes/cosmicTheme';
import { defaultTheme } from './themes/defaultTheme';
import type { ThemeId, ThemeConfig } from './types';

export const themeRotation: ThemeConfig[] = [
  defaultTheme,
  blueprintTheme,
  brutalTheme,
  cosmicTheme,
];

export const getThemeConfig = (id: ThemeId): ThemeConfig => {
  const theme = themeRotation.find((candidate) => candidate.id === id);

  if (!theme) {
    return defaultTheme;
  }

  return theme;
};
