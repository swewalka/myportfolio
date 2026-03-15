import { createContext, useContext } from 'react';
import type { ThemeConfig, ThemeId, ThemeModule } from './core/types';

export interface ThemeContextType {
  activeThemeId: ThemeId;
  isStarterTheme: boolean;
  isTransitioningTheme: boolean;
  activeThemeConfig: ThemeConfig;
  activeThemeModule: ThemeModule;
  cycleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
