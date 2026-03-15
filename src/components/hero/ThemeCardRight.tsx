import React from 'react';
import { motion } from 'framer-motion';
import { useCursor } from '../CursorManager';
import { useTheme } from '../themes/ThemeManager';

export const ThemeCardRight: React.FC<{ isOverclocked?: boolean }> = ({ isOverclocked = false }) => {
  const { nextMode } = useCursor();
  const { activeThemeConfig, isDefaultTheme, hasActivatedLiquidAmbient } = useTheme();

  // Determine styles based on active theme
  // If no manual theme is active, fall back to "Liquid" if activated, else default
  
  let bgClass = 'bg-[#1d1d1f] border-white/5 hover:bg-[#252528]';
  let titleClass = 'text-[#f5f5f7]';
  let descClass = 'text-[#a1a1a6]';
  let glowClass = 'bg-white/5 opacity-0 group-hover:opacity-100';
  const ringClass = '';
  
  if (!isDefaultTheme) {
    bgClass = ''; // handled by style
    titleClass = '';
    descClass = '';
    glowClass = 'opacity-0 group-hover:opacity-100';
  } else if (isOverclocked) {
    bgClass = 'bg-[#0a0000] border-[#ff003c]/40 shadow-[0_8px_32px_0_rgba(255,0,60,0.2)] hover:bg-[#150000]';
    titleClass = 'text-[#ff4a4a] drop-shadow-[0_0_12px_rgba(255,0,60,0.7)]';
    descClass = 'text-[#ffb3b3]/80';
    glowClass = 'bg-red-700/20 opacity-0 group-hover:opacity-100';
  } else if (hasActivatedLiquidAmbient) {
    bgClass = 'bg-white/10 backdrop-blur-3xl border-white/40 shadow-[0_8px_32px_0_rgba(255,255,255,0.15)] ring-1 ring-white/20 hover:bg-white/20';
    titleClass = 'text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]';
    descClass = 'text-white/80';
    glowClass = 'bg-white/20 opacity-0 group-hover:opacity-100';
  }

  // Common motion and layout based on theme
  const hoverScale = !isDefaultTheme ? activeThemeConfig.tokens.motion.hoverScale : 1.02;
  const tapScale = !isDefaultTheme ? activeThemeConfig.tokens.motion.tapScale : 0.95;
  const borderRadius = !isDefaultTheme ? activeThemeConfig.tokens.layout.radius : '2.5rem';
  const borderWidth = !isDefaultTheme ? activeThemeConfig.tokens.layout.borderWidth : '1px';
  const transitionDuration = !isDefaultTheme ? activeThemeConfig.tokens.motion.transitionDuration : 1;
  const cardShadow = !isDefaultTheme ? activeThemeConfig.tokens.colors.cardDropShadow : undefined;
  const padding = !isDefaultTheme ? activeThemeConfig.tokens.layout.cardPadding : '3rem';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0, transition: { delay: 1.0, duration: 1 } }}
      whileHover={{ scale: hoverScale, transition: { duration: 0.2 } }}
      whileTap={{ scale: tapScale, transition: { duration: 0.1 } }}
      onClick={() => nextMode()}
      className={`group transition-all overflow-hidden relative pointer-events-auto cursor-pointer flex-1 border ${bgClass} ${ringClass} ${
        isOverclocked && isDefaultTheme ? 'critical-card-shell critical-flicker-target' : ''
      }`}
      style={{
        borderRadius: borderRadius,
        borderWidth: borderWidth,
        padding: padding,
        transitionDuration: `${transitionDuration}s`,
        backgroundColor: !isDefaultTheme ? activeThemeConfig.tokens.colors.surface : undefined,
        borderColor: !isDefaultTheme ? activeThemeConfig.tokens.colors.border : undefined,
        boxShadow: cardShadow,
      }}
    >
      {/* Background Hover Glow */}
      <div 
        className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-[80px] -mr-32 -mt-32 transition-all duration-1000 ${glowClass}`} 
        style={{
          backgroundColor: !isDefaultTheme ? activeThemeConfig.tokens.colors.cardRingHover : undefined
        }}
      />

      {isOverclocked && isDefaultTheme && (
        <>
          <div className="critical-card-refraction" />
          <div className="critical-card-edge-sweep" />
        </>
      )}
      
      <h3 
        className={`text-4xl font-semibold tracking-tight mb-4 relative z-10 transition-colors duration-1000 ${titleClass}`}
        style={{
          color: !isDefaultTheme ? activeThemeConfig.tokens.colors.textPrimary : undefined,
          textShadow: !isDefaultTheme ? activeThemeConfig.tokens.colors.textDropShadow : undefined,
          fontFamily: !isDefaultTheme ? activeThemeConfig.tokens.typography.fontFamily : undefined,
          fontWeight: !isDefaultTheme ? activeThemeConfig.tokens.typography.titleWeight : undefined,
          letterSpacing: !isDefaultTheme ? activeThemeConfig.tokens.typography.baseTracking : undefined,
        }}
      >
        Kinetic Engine.
      </h3>
      
      <p 
        className={`text-xl font-medium leading-tight max-w-md relative z-10 transition-colors duration-1000 ${descClass}`}
        style={{
          color: !isDefaultTheme ? activeThemeConfig.tokens.colors.textSecondary : undefined,
          fontFamily: !isDefaultTheme ? activeThemeConfig.tokens.typography.fontFamily : undefined,
        }}
      >
        Scary fast precision. Interactive motion that bends to your will.
      </p>
    </motion.div>
  );
};
