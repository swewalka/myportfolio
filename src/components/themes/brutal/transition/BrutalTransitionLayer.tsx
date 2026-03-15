import React from 'react';
import { motion } from 'framer-motion';
import type { ThemeTransitionLayerProps } from '../../core/types';

export const BrutalTransitionLayer: React.FC<ThemeTransitionLayerProps> = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.05 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "circOut" }}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
    >
      {/* Stark Geometric Blocks */}
      <motion.div 
        initial={{ x: "-100%" }}
        animate={{ x: "-50%" }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        className="absolute top-0 left-0 w-[200vw] h-[20vh] bg-black/5 -skew-y-3 origin-top-left"
      />
      <motion.div 
        initial={{ y: "100%" }}
        animate={{ y: "50%" }}
        transition={{ duration: 0.6, type: "spring", stiffness: 80 }}
        className="absolute bottom-[30vh] right-0 w-[50vw] h-[50vh] bg-black/5 border-l-4 border-t-4 border-black"
      />
      
      {/* Vignette/Grime equivalent for brutalism (just hard noise/grain) */}
      <div 
        className="absolute inset-0 opacity-[0.03] mix-blend-multiply"
        style={{
          backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noiseFilter\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.85\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noiseFilter)\"/%3E%3C/svg%3E')"
        }}
      />
    </motion.div>
  );
};
