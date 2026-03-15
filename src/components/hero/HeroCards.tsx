import React from 'react';
import { motion, type MotionValue } from 'framer-motion';
import { ThemeCardLeft } from './ThemeCardLeft';
import { ThemeCardRight } from './ThemeCardRight';

interface HeroCardsProps {
  opacity: MotionValue<number>;
  y: MotionValue<number>;
  isDestructiveUnlocked: boolean;
  onUnlockDestructiveMode: () => void;
}

export const HeroCards: React.FC<HeroCardsProps> = ({
  opacity,
  y,
  isDestructiveUnlocked,
  onUnlockDestructiveMode,
}) => {
  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute top-[85vh] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl px-6 sm:px-12 md:px-24 grid grid-cols-1 md:grid-cols-2 gap-8"
    >
      <ThemeCardLeft />
      <ThemeCardRight />

      <div className="md:col-span-2 flex justify-center pt-2">
        <button
          onClick={onUnlockDestructiveMode}
          disabled={isDestructiveUnlocked}
          className="text-xl hover:underline decoration-1 underline-offset-4 tracking-tight font-medium flex items-center gap-1 transition-colors pointer-events-auto cursor-pointer disabled:opacity-60 disabled:cursor-default"
          style={{ color: '#ffffff' }}
        >
          {isDestructiveUnlocked ? 'Mastery sequence unlocked' : 'Explore mastery'}
          {!isDestructiveUnlocked && <span>{'>'}</span>}
        </button>
      </div>
    </motion.div>
  );
};
