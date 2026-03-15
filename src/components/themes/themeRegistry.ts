import { blueprintTheme } from './themes/blueprintTheme';
import { brutalTheme } from './themes/brutalTheme';
import { cosmicTheme } from './themes/cosmicTheme';
import type { ThemeId, ThemeConfig } from './types';

export const selectableThemes: ThemeConfig[] = [
  blueprintTheme,
  brutalTheme,
  cosmicTheme,
];

export const getThemeConfig = (id: ThemeId): ThemeConfig | undefined => {
  return selectableThemes.find(theme => theme.id === id);
};
