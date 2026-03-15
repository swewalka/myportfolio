import { useState } from 'react';
import type { ReactNode } from 'react';
import type { ThemeId } from './core/types';
import { STARTER_THEME_ID, themeRotation, getThemeModule } from './core/themeRegistry';
import { ThemeContext } from './themeContext';

interface ThemeProviderProps {
  children: ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const [activeThemeId, setActiveThemeId] = useState<ThemeId>(STARTER_THEME_ID);
  const [isTransitioningTheme, setIsTransitioningTheme] = useState(false);

  const activeThemeModule = getThemeModule(activeThemeId);
  const activeThemeConfig = activeThemeModule.config;
  const isStarterTheme = activeThemeId === STARTER_THEME_ID;

  const cycleTheme = () => {
    setIsTransitioningTheme(true);

    setActiveThemeId(prev => {
      const currentIndex = themeRotation.findIndex(theme => theme.id === prev);
      const nextIndex = (currentIndex + 1) % themeRotation.length;
      return themeRotation[nextIndex].id;
    });

    // Reset transition flag after giving UI time to begin animating
    setTimeout(() => {
      setIsTransitioningTheme(false);
    }, 50); // Small gap so classes update and transition finishes
  };

  return (
    <ThemeContext.Provider value={{
      activeThemeId,
      isStarterTheme,
      isTransitioningTheme,
      activeThemeConfig,
      activeThemeModule,
      cycleTheme,
    }}>
      {children}
    </ThemeContext.Provider>
  );
}
