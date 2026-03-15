import React from 'react';
import { motion } from 'framer-motion';
import { RetroOrbits } from './RetroOrbits';
import { RetroPlanet } from './RetroPlanet';
import { RetroRocket } from './RetroRocket';
import { RetroStars } from './RetroStars';
import { retroCosmicTokens } from './retroCosmicTokens';

interface RetroCosmicBackgroundProps {
  isFrozen?: boolean;
}

export const RetroCosmicBackground: React.FC<RetroCosmicBackgroundProps> = ({
  isFrozen = false,
}) => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(160% 115% at 78% 18%, ${retroCosmicTokens.colors.horizonGlow} 0%, transparent 55%),
            radial-gradient(95% 85% at 70% 12%, ${retroCosmicTokens.colors.brassGlow} 0%, transparent 52%),
            linear-gradient(165deg, ${retroCosmicTokens.colors.backdrop} 0%, ${retroCosmicTokens.colors.backdropSecondary} 56%, #05080f 100%)
          `,
        }}
      />

      <motion.div
        className="absolute inset-0 opacity-[0.28]"
        style={{
          background:
            'linear-gradient(115deg, rgba(255, 235, 193, 0.07) 0%, transparent 34%, rgba(132, 190, 204, 0.08) 64%, transparent 100%)',
        }}
        animate={isFrozen ? undefined : { opacity: [0.2, 0.34, 0.2] }}
        transition={isFrozen ? undefined : { duration: 30, repeat: Infinity, ease: 'easeInOut' }}
      />

      <RetroStars isFrozen={isFrozen} />
      <RetroPlanet isFrozen={isFrozen} />
      <RetroOrbits isFrozen={isFrozen} />
      <RetroRocket isFrozen={isFrozen} />

      <div
        className="absolute inset-0"
        style={{
          boxShadow: 'inset 0 0 180px rgba(2, 4, 8, 0.72)',
        }}
      />
    </div>
  );
};
