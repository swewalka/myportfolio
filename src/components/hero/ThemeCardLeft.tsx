import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../themes/ThemeManager';

export const ThemeCardLeft: React.FC = () => {
  const { 
    activeThemeConfig, 
    hasActivatedLiquidAmbient, 
    cycleTheme, 
    isTransitioningTheme 
  } = useTheme();

  let bgClass = 'bg-[#1d1d1f] border-white/5 hover:bg-[#252528]';
  let titleClass = 'text-[#f5f5f7]';
  let descClass = 'text-[#a1a1a6]';
  let glowClass = 'bg-white/5 opacity-0 group-hover:opacity-100';
  let ringClass = '';

  if (activeThemeConfig) {
    bgClass = ''; // Inline styles take over
    titleClass = '';
    descClass = '';
    glowClass = 'opacity-0 group-hover:opacity-100';
  } else if (hasActivatedLiquidAmbient) {
    bgClass = 'bg-white/10 backdrop-blur-3xl border-white/40 shadow-[0_8px_32px_0_rgba(255,255,255,0.15)] ring-1 ring-white/20 hover:bg-white/20';
    titleClass = 'text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]';
    descClass = 'text-white/80';
    glowClass = 'bg-white/20 opacity-0 group-hover:opacity-100';
  }

  const hoverScale = activeThemeConfig ? activeThemeConfig.tokens.motion.hoverScale : 1.02;
  const tapScale = activeThemeConfig ? activeThemeConfig.tokens.motion.tapScale : 0.95;
  const borderRadius = activeThemeConfig ? activeThemeConfig.tokens.layout.radius : '2.5rem';
  const borderWidth = activeThemeConfig ? activeThemeConfig.tokens.layout.borderWidth : '1px';
  const transitionDuration = activeThemeConfig ? activeThemeConfig.tokens.motion.transitionDuration : 1;
  const cardShadow = activeThemeConfig ? activeThemeConfig.tokens.colors.cardDropShadow : undefined;
  const padding = activeThemeConfig ? activeThemeConfig.tokens.layout.cardPadding : '3rem';

  const title = activeThemeConfig ? activeThemeConfig.label : "Theme Engine.";
  const desc = activeThemeConfig 
    ? "Cycle immersive visual layers."
    : (hasActivatedLiquidAmbient ? "Ambient glass initialized. Click to cycle." : "Manual aesthetic override. Awaiting input.");

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0, transition: { delay: 0.8, duration: 1 } }}
      whileHover={{ scale: hoverScale, transition: { duration: 0.2 } }}
      whileTap={{ scale: tapScale, transition: { duration: 0.1 } }}
      onClick={() => cycleTheme()}
      className={`group transition-all overflow-hidden relative pointer-events-auto cursor-pointer flex-1 border ${bgClass} ${ringClass}`}
      style={{
        borderRadius: borderRadius,
        borderWidth: borderWidth,
        padding: padding,
        transitionDuration: `${transitionDuration}s`,
        backgroundColor: activeThemeConfig?.tokens.colors.surface,
        borderColor: isTransitioningTheme 
          ? activeThemeConfig?.tokens.colors.accent 
          : activeThemeConfig?.tokens.colors.border,
        boxShadow: cardShadow,
      }}
    >
      {/* Background Hover Glow */}
      <div 
        className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-[80px] -mr-32 -mt-32 transition-all duration-1000 ${glowClass}`} 
        style={{
          backgroundColor: activeThemeConfig?.tokens.colors.cardRingHover || undefined
        }}
      />
      
      <AnimatePresence mode="wait">
        <motion.div
           key={title}
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           exit={{ opacity: 0, y: -10 }}
           transition={{ duration: 0.3 }}
           className="relative z-10"
        >
          <h3 
            className={`text-4xl font-semibold tracking-tight mb-4 transition-colors duration-1000 ${titleClass}`}
            style={{
              color: activeThemeConfig?.tokens.colors.textPrimary,
              textShadow: activeThemeConfig?.tokens.colors.textDropShadow,
              fontFamily: activeThemeConfig?.tokens.typography.fontFamily,
              fontWeight: activeThemeConfig?.tokens.typography.titleWeight,
              letterSpacing: activeThemeConfig?.tokens.typography.baseTracking,
            }}
          >
            {title}
          </h3>
          <p 
            className={`text-xl font-medium leading-tight max-w-sm transition-colors duration-1000 ${descClass}`}
            style={{
              color: activeThemeConfig?.tokens.colors.textSecondary,
              fontFamily: activeThemeConfig?.tokens.typography.fontFamily,
            }}
          >
            {desc}
          </p>
        </motion.div>
      </AnimatePresence>
      
      {/* Mini Active Indicator Outline on Transition */}
      {isTransitioningTheme && activeThemeConfig && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 border-2 rounded-[inherit] pointer-events-none"
          style={{ borderColor: activeThemeConfig.tokens.colors.accent }}
        />
      )}
    </motion.div>
  );
};
