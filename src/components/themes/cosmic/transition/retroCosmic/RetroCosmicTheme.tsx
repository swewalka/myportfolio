import React from 'react';
import { motion } from 'framer-motion';
import { RetroCosmicBackground } from './RetroCosmicBackground';

interface RetroCosmicThemeProps {
  isFrozen?: boolean;
}

export const RetroCosmicTheme: React.FC<RetroCosmicThemeProps> = ({ isFrozen = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: 'easeInOut' }}
      className="absolute inset-0 pointer-events-none z-0"
    >
      <RetroCosmicBackground isFrozen={isFrozen} />
    </motion.div>
  );
};
