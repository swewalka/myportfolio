import React, { useMemo, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export const CosmicEffects: React.FC = () => {
  // Parallax tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth out the mouse movement
  const smoothX = useSpring(mouseX, { damping: 50, stiffness: 400 });
  const smoothY = useSpring(mouseY, { damping: 50, stiffness: 400 });

  // Deep Background Layer (-X movement)
  const bgX = useTransform(smoothX, [-0.5, 0.5], ['2%', '-2%']);
  const bgY = useTransform(smoothY, [-0.5, 0.5], ['2%', '-2%']);

  // Mid Glow Layer (slight movement)
  const midX = useTransform(smoothX, [-0.5, 0.5], ['-3%', '3%']);
  const midY = useTransform(smoothY, [-0.5, 0.5], ['-3%', '3%']);

  // Foreground Dust Layer (highest movement)
  const fgX = useTransform(smoothX, [-0.5, 0.5], ['-8%', '8%']);
  const fgY = useTransform(smoothY, [-0.5, 0.5], ['-8%', '8%']);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse position between -0.5 and 0.5
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth) - 0.5;
      const y = (clientY / window.innerHeight) - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Generate random foreground dust particles
  const dustParticles = useMemo(() => {
    return Array.from({ length: 45 }).map((_, i) => ({
      id: `dust-${i}`,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 10,
    }));
  }, []);

  // Generate static CSS box-shadow stars for performance
  const starField = useMemo(() => {
    const generateShadows = (count: number) => {
      let shadows = '';
      for (let i = 0; i < count; i++) {
        const x = Math.floor(Math.random() * 2000);
        const y = Math.floor(Math.random() * 2000);
        const opacity = Math.random() * 0.8 + 0.2; // 0.2 to 1.0 opacity
        shadows += `${x}px ${y}px rgba(255, 255, 255, ${opacity})${i < count - 1 ? ',' : ''}`;
      }
      return shadows;
    };
    
    return {
      small: generateShadows(300),
      medium: generateShadows(100),
      large: generateShadows(30)
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.8, ease: "easeInOut" }}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden bg-[#010205]"
    >
      {/* 1. DEEP LAYER: Parallax Stars */}
      <motion.div 
        className="absolute w-[200vw] h-[200vh] -top-[50vh] -left-[50vw]"
        style={{ x: bgX, y: bgY }}
      >
        <div className="absolute w-[1px] h-[1px] rounded-full" style={{ boxShadow: starField.small }} />
        <div className="absolute w-[2px] h-[2px] rounded-full" style={{ boxShadow: starField.medium }} />
        <div className="absolute w-[3px] h-[3px] rounded-full blur-[1px]" style={{ boxShadow: starField.large }} />
      </motion.div>

      {/* 2. MID LAYER: Deep Radial Glows */}
      <motion.div 
        className="absolute inset-0"
        style={{ x: midX, y: midY }}
      >
        {/* Slow pulsing glows using multiple nested divs for complex blending */}
        <motion.div 
          animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.4, 0.3] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,_rgba(90,40,180,0.25),_transparent_60%)] mix-blend-screen"
        />
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,_rgba(40,100,220,0.2),_transparent_55%)] mix-blend-screen"
        />
        <motion.div 
          animate={{ scale: [1, 1.08, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 5 }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,_rgba(150,50,150,0.15),_transparent_65%)] mix-blend-screen"
        />
      </motion.div>
      
      {/* 3. FOREGROUND LAYER: Floating Dust */}
      <motion.div 
        className="absolute inset-0"
        style={{ x: fgX, y: fgY }}
      >
        {dustParticles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ 
              opacity: 0, 
              y: `${p.y}vh`, 
              x: `${p.x}vw`,
              scale: 0 
            }}
            animate={{ 
              opacity: [0, 0.5, 0],
              y: [`${p.y}vh`, `${p.y - 15}vh`],
              x: [`${p.x}vw`, `${p.x + (Math.random() > 0.5 ? 8 : -8)}vw`],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "linear"
            }}
            className="absolute rounded-full bg-[#fdfcff] blur-[2px]"
            style={{
              width: p.size,
              height: p.size,
            }}
          />
        ))}
      </motion.div>
      
      {/* Subtle Depth Vignette */}
      <div className="absolute inset-0 shadow-[inset_0_0_200px_rgba(0,0,0,0.95)]" />
    </motion.div>
  );
};
