import React from 'react';
import { motion } from 'framer-motion';

export const BlueprintTransitionLayer: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
      className="absolute inset-0 pointer-events-none z-0"
    >
      {/* Blueprint Grid */}
      <div 
        className="absolute inset-0" 
        style={{
          backgroundImage: `
            linear-gradient(rgba(102, 179, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(102, 179, 255, 0.1) 1px, transparent 1px),
            linear-gradient(rgba(102, 179, 255, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(102, 179, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px, 100px 100px, 20px 20px, 20px 20px',
          backgroundPosition: '-1px -1px, -1px -1px, -1px -1px, -1px -1px'
        }}
      />
      
      {/* Drafting Lines Animation */}
      <motion.div 
        initial={{ scaleX: 0 }} 
        animate={{ scaleX: 1 }} 
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute top-1/4 left-0 w-full h-[1px] bg-[#66b3ff]/30 origin-left"
      />
      <motion.div 
        initial={{ scaleY: 0 }} 
        animate={{ scaleY: 1 }} 
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
        className="absolute top-0 left-1/4 w-[1px] h-full bg-[#66b3ff]/30 origin-top"
      />
      <motion.div 
        initial={{ scaleX: 0 }} 
        animate={{ scaleX: 1 }} 
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.4 }}
        className="absolute top-3/4 left-0 w-full h-[1px] bg-[#66b3ff]/30 origin-right"
      />
      
      {/* Measurement Ticks */}
      <div className="absolute top-0 left-12 w-[1px] h-full flex flex-col justify-between py-12">
        <div className="w-2 h-[1px] bg-[#66b3ff]/50" />
        <div className="w-4 h-[1px] bg-[#66b3ff]/50" />
        <div className="w-2 h-[1px] bg-[#66b3ff]/50" />
      </div>
    </motion.div>
  );
};
