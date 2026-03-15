import React from 'react';
import { motion } from 'framer-motion';
import { useCursor } from '../CursorManager';
import { useTheme } from '../themes/ThemeManager';

export const ThemeCardRight: React.FC = () => {
  const { nextMode } = useCursor();
  const { activeThemeConfig, hasActivatedLiquidAmbient } = useTheme();

  // Determine styles based on active theme
  // If no manual theme is active, fall back to "Liquid" if activated, else default
  
  let bgClass = 'bg-[#1d1d1f] border-white/5 hover:bg-[#252528]';
  let titleClass = 'text-[#f5f5f7]';
  let descClass = 'text-[#a1a1a6]';
  let glowClass = 'bg-white/5 opacity-0 group-hover:opacity-100';
  let ringClass = '';
  
  if (activeThemeConfig) {
    // Map theme tokens directly using style injected variables or standard mapping
    // We'll use style props for exact colors
    bgClass = ''; // handeled by style
    titleClass = '';
    descClass = '';
    glowClass = 'opacity-0 group-hover:opacity-100';
  } else if (hasActivatedLiquidAmbient) {
    bgClass = 'bg-white/10 backdrop-blur-3xl border-white/40 shadow-[0_8px_32px_0_rgba(255,255,255,0.15)] ring-1 ring-white/20 hover:bg-white/20';
    titleClass = 'text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]';
    descClass = 'text-white/80';
    glowClass = 'bg-white/20 opacity-0 group-hover:opacity-100';
  }

  // Common motion and layout based on theme
  const hoverScale = activeThemeConfig ? activeThemeConfig.tokens.motion.hoverScale : 1.02;
  const tapScale = activeThemeConfig ? activeThemeConfig.tokens.motion.tapScale : 0.95;
  const borderRadius = activeThemeConfig ? activeThemeConfig.tokens.layout.radius : '2.5rem';
  const borderWidth = activeThemeConfig ? activeThemeConfig.tokens.layout.borderWidth : '1px';
  const transitionDuration = activeThemeConfig ? activeThemeConfig.tokens.motion.transitionDuration : 1;
  const cardShadow = activeThemeConfig ? activeThemeConfig.tokens.colors.cardDropShadow : undefined;
  const padding = activeThemeConfig ? activeThemeConfig.tokens.layout.cardPadding : '3rem';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0, transition: { delay: 1.0, duration: 1 } }}
      whileHover={{ scale: hoverScale, transition: { duration: 0.2 } }}
      whileTap={{ scale: tapScale, transition: { duration: 0.1 } }}
      onClick={() => nextMode()}
      className={`group transition-all overflow-hidden relative pointer-events-auto cursor-pointer flex-1 border ${bgClass} ${ringClass}`}
      style={{
        borderRadius: borderRadius,
        borderWidth: borderWidth,
        padding: padding,
        transitionDuration: `${transitionDuration}s`,
        backgroundColor: activeThemeConfig?.tokens.colors.surface,
        borderColor: activeThemeConfig?.tokens.colors.border,
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
      
      <h3 
        className={`text-4xl font-semibold tracking-tight mb-4 relative z-10 transition-colors duration-1000 ${titleClass}`}
        style={{
          color: activeThemeConfig?.tokens.colors.textPrimary,
          textShadow: activeThemeConfig?.tokens.colors.textDropShadow,
          fontFamily: activeThemeConfig?.tokens.typography.fontFamily,
          fontWeight: activeThemeConfig?.tokens.typography.titleWeight,
          letterSpacing: activeThemeConfig?.tokens.typography.baseTracking,
        }}
      >
        Kinetic Engine.
      </h3>
      
      <p 
        className={`text-xl font-medium leading-tight max-w-md relative z-10 transition-colors duration-1000 ${descClass}`}
        style={{
          color: activeThemeConfig?.tokens.colors.textSecondary,
          fontFamily: activeThemeConfig?.tokens.typography.fontFamily,
        }}
      >
        Scary fast precision. Interactive motion that bends to your will.
      </p>
    </motion.div>
  );
};
