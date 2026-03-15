import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { useTheme } from '../themes/themeContext';

interface ThemeTransitionLayerProps {
  isPerformanceReduced?: boolean;
}

export const ThemeTransitionLayer: React.FC<ThemeTransitionLayerProps> = ({
  isPerformanceReduced = false,
}) => {
  const { activeThemeConfig, activeThemeModule, isStarterTheme } = useTheme();
  const ActiveTransitionLayer = activeThemeModule.TransitionLayer;
  const shouldRenderThemeVisuals = !(isPerformanceReduced && activeThemeConfig.id === 'cosmic');

  return (
    <div
      className="absolute inset-0 pointer-events-none z-10 overflow-hidden mix-blend-normal transition-colors duration-1000"
      style={{
        backgroundColor: isStarterTheme ? 'transparent' : activeThemeConfig.tokens.colors.background,
      }}
    >
      <AnimatePresence mode="wait">
        {shouldRenderThemeVisuals && (
          <ActiveTransitionLayer
            key={activeThemeConfig.id}
            isPerformanceReduced={isPerformanceReduced}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
