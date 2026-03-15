import React from 'react';
import { motion } from 'framer-motion';
import { retroCosmicTokens } from './retroCosmicTokens';

interface RetroStarsProps {
  isFrozen?: boolean;
}

export const RetroStars: React.FC<RetroStarsProps> = ({ isFrozen = false }) => {
  return (
    <div className="absolute inset-0 pointer-events-none z-[1]">
      {retroCosmicTokens.stars.map((star, index) => (
        <motion.span
          key={`retro-star-${index}`}
          className="absolute rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: 'rgba(244, 236, 222, 0.95)',
            boxShadow: `0 0 ${Math.max(star.size * 2.8, 4)}px rgba(241, 224, 188, 0.35)`,
            opacity: isFrozen ? star.opacity * 0.78 : undefined,
          }}
          animate={isFrozen ? undefined : {
            opacity: [star.opacity * 0.55, star.opacity, star.opacity * 0.55],
            scale: [1, 1.08, 1],
          }}
          transition={isFrozen ? undefined : {
            duration: star.twinkleDuration,
            repeat: Infinity,
            delay: star.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};
