import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../themes/themeContext';

export const ThemeCardLeft: React.FC<{ isOverclocked?: boolean }> = ({ isOverclocked = false }) => {
  const {
    activeThemeConfig,
    activeThemeModule,
    isStarterTheme,
    cycleTheme,
    isTransitioningTheme,
  } = useTheme();
  const isSignatureTheme = isStarterTheme;
  const landingVariant = activeThemeModule.getLandingVariant(isOverclocked);

  let bgClass = 'bg-white/10 backdrop-blur-3xl border-white/40 shadow-[0_8px_32px_0_rgba(255,255,255,0.15)] ring-1 ring-white/20 hover:bg-white/20';
  let titleClass = 'text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]';
  let descClass = 'text-white/80';
  let glowClass = 'bg-white/20 opacity-0 group-hover:opacity-100';
  const ringClass = '';

  if (!isSignatureTheme) {
    bgClass = ''; // Inline styles take over
    titleClass = '';
    descClass = '';
    glowClass = 'opacity-0 group-hover:opacity-100';
  } else if (isOverclocked) {
    bgClass = 'bg-[#0a0000] border-[#ff003c]/40 shadow-[0_8px_32px_0_rgba(255,0,60,0.2)] hover:bg-[#150000]';
    titleClass = 'text-[#ff4a4a] drop-shadow-[0_0_12px_rgba(255,0,60,0.7)]';
    descClass = 'text-[#ffb3b3]/80';
    glowClass = 'bg-red-700/20 opacity-0 group-hover:opacity-100';
  }

  const hoverScale = !isSignatureTheme ? activeThemeConfig.tokens.motion.hoverScale : 1.02;
  const tapScale = !isSignatureTheme ? activeThemeConfig.tokens.motion.tapScale : 0.95;
  const borderRadius = !isSignatureTheme ? activeThemeConfig.tokens.layout.radius : '2.5rem';
  const borderWidth = !isSignatureTheme ? activeThemeConfig.tokens.layout.borderWidth : '1px';
  const transitionDuration = !isSignatureTheme ? activeThemeConfig.tokens.motion.transitionDuration : 1;
  const cardShadow = !isSignatureTheme ? activeThemeConfig.tokens.colors.cardDropShadow : undefined;
  const padding = !isSignatureTheme ? activeThemeConfig.tokens.layout.cardPadding : '3rem';

  const title = !isSignatureTheme ? activeThemeConfig.label : "Theme Engine.";
  const desc = !isSignatureTheme
    ? "Cycle immersive visual layers."
    : isOverclocked
      ? "Overload sequence initiated. System destabilized."
      : "Ambient glass initialized. Click to cycle.";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0, transition: { delay: 0.8, duration: 1 } }}
      whileHover={{ scale: hoverScale, transition: { duration: 0.2 } }}
      whileTap={{ scale: tapScale, transition: { duration: 0.1 } }}
      onClick={() => cycleTheme()}
      className={`group transition-all overflow-hidden relative pointer-events-auto cursor-pointer flex-1 border ${bgClass} ${ringClass} ${
        isOverclocked ? landingVariant.cardShellClassName ?? '' : ''
      }`}
      style={{
        borderRadius: borderRadius,
        borderWidth: borderWidth,
        padding: padding,
        transitionDuration: `${transitionDuration}s`,
        backgroundColor: !isSignatureTheme ? activeThemeConfig.tokens.colors.surface : undefined,
        borderColor: isTransitioningTheme 
          ? (!isSignatureTheme ? activeThemeConfig.tokens.colors.accent : undefined)
          : (!isSignatureTheme ? activeThemeConfig.tokens.colors.border : undefined),
        boxShadow: cardShadow,
      }}
    >
      {/* Background Hover Glow */}
      <div 
        className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-[80px] -mr-32 -mt-32 transition-all duration-1000 ${glowClass}`} 
        style={{
          backgroundColor: !isSignatureTheme ? activeThemeConfig.tokens.colors.cardRingHover : undefined
        }}
      />

      {isOverclocked && landingVariant.cardRefractionClassName && landingVariant.cardEdgeSweepClassName && (
        <>
          <div className={landingVariant.cardRefractionClassName} />
          <div className={landingVariant.cardEdgeSweepClassName} />
        </>
      )}
      
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
              color: !isSignatureTheme ? activeThemeConfig.tokens.colors.textPrimary : undefined,
              textShadow: !isSignatureTheme ? activeThemeConfig.tokens.colors.textDropShadow : undefined,
              fontFamily: !isSignatureTheme ? activeThemeConfig.tokens.typography.fontFamily : undefined,
              fontWeight: !isSignatureTheme ? activeThemeConfig.tokens.typography.titleWeight : undefined,
              letterSpacing: !isSignatureTheme ? activeThemeConfig.tokens.typography.baseTracking : undefined,
            }}
          >
            {title}
          </h3>
          <p 
            className={`text-xl font-medium leading-tight max-w-sm transition-colors duration-1000 ${descClass}`}
            style={{
              color: !isSignatureTheme ? activeThemeConfig.tokens.colors.textSecondary : undefined,
              fontFamily: !isSignatureTheme ? activeThemeConfig.tokens.typography.fontFamily : undefined,
            }}
          >
            {desc}
          </p>
        </motion.div>
      </AnimatePresence>
      
      {/* Mini Active Indicator Outline on Transition */}
      {isTransitioningTheme && !isSignatureTheme && (
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
