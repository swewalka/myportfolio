import React from 'react';
import { motion } from 'framer-motion';

export const RetroPlanet: React.FC = () => {
  return (
    <motion.div
      className="absolute pointer-events-none z-[2] aspect-square w-[92vw] sm:w-[82vw] lg:w-[72vw] max-w-[1080px] left-[31%] sm:left-[41%] lg:left-[50%] top-[-16%] sm:top-[-30%] lg:top-[-42%]"
      animate={{
        x: [0, 10, 0],
        y: [0, 6, 0],
        rotate: [0, 1.6, 0],
      }}
      transition={{
        duration: 170,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <div
        className="absolute -inset-[7%] rounded-full blur-3xl"
        style={{
          background:
            'radial-gradient(circle at 28% 22%, rgba(248, 206, 138, 0.46), rgba(129, 111, 95, 0.16) 40%, transparent 74%)',
        }}
      />

      <div
        className="absolute inset-0 rounded-full overflow-hidden border border-[#f5d7a1]/20"
        style={{
          background:
            'radial-gradient(circle at 30% 25%, #f3d09a 0%, #d89b69 28%, #8a5e4f 54%, #3a3141 83%, #131722 100%)',
          boxShadow:
            'inset -38px -40px 110px rgba(8, 13, 24, 0.52), inset 28px 24px 72px rgba(255, 228, 180, 0.16)',
        }}
      >
        <motion.div
          className="absolute inset-[-12%] rounded-full mix-blend-soft-light"
          style={{
            background:
              'repeating-linear-gradient(12deg, rgba(253, 221, 164, 0.12) 0px, rgba(253, 221, 164, 0.12) 14px, rgba(126, 88, 79, 0.06) 14px, rgba(126, 88, 79, 0.06) 33px)',
          }}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 220, ease: 'linear', repeat: Infinity }}
        />

        <div
          className="absolute inset-0 rounded-full mix-blend-overlay opacity-70"
          style={{
            background:
              'radial-gradient(120% 80% at 35% 28%, rgba(255, 240, 200, 0.45) 0%, rgba(255, 220, 170, 0.12) 32%, rgba(24, 31, 46, 0.06) 60%, rgba(8, 10, 15, 0.5) 100%)',
          }}
        />
      </div>

      <div
        className="absolute inset-0 rounded-full"
        style={{
          boxShadow:
            '0 0 0 2px rgba(232, 195, 132, 0.16), 0 0 34px rgba(232, 195, 132, 0.22), 0 0 110px rgba(113, 173, 192, 0.18)',
        }}
      />
    </motion.div>
  );
};

