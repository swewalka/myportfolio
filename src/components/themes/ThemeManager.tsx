import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { ThemeId, ThemeConfig } from './types';
import { selectableThemes, getThemeConfig } from './themeRegistry';

interface ThemeContextType {
  activeThemeId: ThemeId;
  hasActivatedLiquidAmbient: boolean;
  isTransitioningTheme: boolean;
  activeThemeConfig: ThemeConfig | undefined;
  cycleTheme: () => void;
  activateLiquidAmbient: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [activeThemeId, setActiveThemeId] = useState<ThemeId>('default');
  const [hasActivatedLiquidAmbient, setHasActivatedLiquidAmbient] = useState(false);
  const [isTransitioningTheme, setIsTransitioningTheme] = useState(false);

  const activeThemeConfig = getThemeConfig(activeThemeId);

  const cycleTheme = () => {
    setIsTransitioningTheme(true);

    setActiveThemeId(prev => {
      // If we are currently default, go to the first selectable theme
      if (prev === 'default') {
        return selectableThemes[0].id;
      }

      const currentIndex = selectableThemes.findIndex(t => t.id === prev);
      const nextIndex = (currentIndex + 1) % selectableThemes.length;
      return selectableThemes[nextIndex].id;
    });

    // Reset transition flag after giving UI time to begin animating
    setTimeout(() => {
      setIsTransitioningTheme(false);
    }, 50); // Small gap so classes update and transition finishes
  };

  const activateLiquidAmbient = () => {
    if (!hasActivatedLiquidAmbient) {
      setHasActivatedLiquidAmbient(true);
    }
  };

  // Apply CSS variables dynamically to a root element or body based on active config
  useEffect(() => {
    if (activeThemeId === 'default' || !activeThemeConfig) {
      // Remove any previously set custom inline style tokens on the root wrapper if needed, 
      // but we'll primarily rely on Framer Motion passing them to our container directly.
      return;
    }

    // Optional: We can write a script to inject tokens as '--var' directly to document body or handle it via Component inline styles + Framer Motion. 
    // We will utilize Framer Motion inline style interpolation on a <ThemeTransitionLayer />
  }, [activeThemeId, activeThemeConfig]);

  return (
    <ThemeContext.Provider value={{
      activeThemeId,
      hasActivatedLiquidAmbient,
      isTransitioningTheme,
      activeThemeConfig,
      cycleTheme,
      activateLiquidAmbient
    }}>
      {children}
    </ThemeContext.Provider>
  );
};
