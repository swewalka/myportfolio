import React from 'react';
import { motion, MotionValue } from 'framer-motion';
import { ThemeCardLeft } from './ThemeCardLeft';
import { ThemeCardRight } from './ThemeCardRight';

interface HeroCardsProps {
  opacity: MotionValue<number>;
  y: MotionValue<number>;
}

export const HeroCards: React.FC<HeroCardsProps> = ({ opacity, y }) => {
  return (
    <motion.div 
      style={{ opacity, y }}
      className="absolute top-[85vh] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl px-6 sm:px-12 md:px-24 hidden sm:grid grid-cols-1 md:grid-cols-2 gap-8"
    >
      <ThemeCardLeft />
      <ThemeCardRight />
    </motion.div>
  );
};
