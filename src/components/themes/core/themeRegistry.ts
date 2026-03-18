import { blueprintThemeModule } from '../blueprint/module';
import { brutalThemeModule } from '../brutal/module';
import { cosmicThemeModule } from '../cosmic/module';
import { signatureThemeModule } from '../signature/module';
import type { ThemeConfig, ThemeId, ThemeModule } from './types';

export const DEFAULT_THEME_ID: ThemeId = 'signature';

export const themeModules: ThemeModule[] = [
  signatureThemeModule,
  blueprintThemeModule,
  brutalThemeModule,
  cosmicThemeModule,
];

export const themeRotation: ThemeConfig[] = themeModules.map((module) => module.config);

export const getThemeModule = (id: ThemeId): ThemeModule => {
  const module = themeModules.find((candidate) => candidate.config.id === id);

  if (!module) {
    return signatureThemeModule;
  }

  return module;
};

export const getThemeConfig = (id: ThemeId): ThemeConfig => {
  return getThemeModule(id).config;
};
