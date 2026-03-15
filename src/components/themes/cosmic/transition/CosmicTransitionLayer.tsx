import React from 'react';
import { RetroCosmicTheme } from './retroCosmic/RetroCosmicTheme';
import type { ThemeTransitionLayerProps } from '../../core/types';

export const CosmicTransitionLayer: React.FC<ThemeTransitionLayerProps> = ({
  isPerformanceReduced = false,
}) => {
  return <RetroCosmicTheme isFrozen={isPerformanceReduced} />;
};
