import { useState } from 'react';
import type { ReactNode } from 'react';
import type { ThemeId } from './core/types';
import { DEFAULT_THEME_ID, themeRotation, getThemeModule } from './core/themeRegistry';
import { ThemeContext } from './themeContext';
import { UnlockLogicProvider } from './unlockLogic';

interface ThemeProviderProps {
  children: ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const [activeThemeId, setActiveThemeId] = useState<ThemeId>(DEFAULT_THEME_ID);
  const [isTransitioningTheme, setIsTransitioningTheme] = useState(false);

  const activeThemeModule = getThemeModule(activeThemeId);
  const activeThemeConfig = activeThemeModule.config;

  const cycleTheme = () => {
    setIsTransitioningTheme(true);

    setActiveThemeId((prev) => {
      const currentIndex = themeRotation.findIndex((theme) => theme.id === prev);
      const nextIndex = (currentIndex + 1) % themeRotation.length;
      return themeRotation[nextIndex].id;
    });

    setTimeout(() => {
      setIsTransitioningTheme(false);
    }, 50);
  };

  return (
    <UnlockLogicProvider>
      <ThemeContext.Provider
        value={{
          activeThemeId,
          isTransitioningTheme,
          activeThemeConfig,
          activeThemeModule,
          cycleTheme,
        }}
      >
        {children}
      </ThemeContext.Provider>
    </UnlockLogicProvider>
  );
}
