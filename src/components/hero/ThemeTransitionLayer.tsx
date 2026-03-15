import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { useTheme } from '../themes/themeContext';

export const ThemeTransitionLayer: React.FC = () => {
  const { activeThemeConfig, activeThemeModule, isStarterTheme } = useTheme();
  const ActiveTransitionLayer = activeThemeModule.TransitionLayer;

  return (
    <div
      className="absolute inset-0 pointer-events-none z-10 overflow-hidden mix-blend-normal transition-colors duration-1000"
      style={{
        backgroundColor: isStarterTheme ? 'transparent' : activeThemeConfig.tokens.colors.background,
      }}
    >
      <AnimatePresence mode="wait">
        <ActiveTransitionLayer key={activeThemeConfig.id} />
      </AnimatePresence>
    </div>
  );
};
