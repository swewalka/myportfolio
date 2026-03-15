import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { useTheme } from '../themes/ThemeManager';
import { BlueprintEffects } from '../themes/effects/BlueprintEffects';
import { BrutalEffects } from '../themes/effects/BrutalEffects';
import { CosmicEffects } from '../themes/effects/CosmicEffects';

export const ThemeTransitionLayer: React.FC = () => {
  const { activeThemeId, activeThemeConfig } = useTheme();

  return (
    <div 
      className="absolute inset-0 pointer-events-none z-10 overflow-hidden mix-blend-normal transition-colors duration-1000"
      style={{ backgroundColor: activeThemeConfig?.tokens.colors.background || 'transparent' }}
    >
      <AnimatePresence>
        {activeThemeId === 'blueprint' && <BlueprintEffects key="blueprint" />}
        {activeThemeId === 'brutal' && <BrutalEffects key="brutal" />}
        {activeThemeId === 'cosmic' && <CosmicEffects key="cosmic" />}
      </AnimatePresence>
    </div>
  );
};
