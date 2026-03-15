import React from 'react';
import { motion, AnimatePresence, type MotionValue } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { ThemeCardLeft } from './ThemeCardLeft';
import { ThemeCardRight } from './ThemeCardRight';
import { useTheme } from '../themes/ThemeManager';

interface HeroCardsProps {
  opacity: MotionValue<number>;
  y: MotionValue<number>;
  isDestructiveUnlocked: boolean;
  onUnlockDestructiveMode: () => void;
}

function getButtonStyle(
  themeId: string,
  isDefaultTheme: boolean,
  hasActivatedLiquidAmbient: boolean,
  isUnlocked: boolean,
  accent: string,
  textPrimary: string,
  border: string,
  radius: string,
  borderWidth: string,
) {
  if (isUnlocked) {
    return {
      className: 'relative overflow-hidden z-20 px-8 py-4 font-medium tracking-wide flex items-center gap-2 transition-all pointer-events-auto cursor-pointer opacity-50',
      style: {
        borderRadius: radius,
        border: `${borderWidth} solid ${border}`,
        color: textPrimary,
        background: 'transparent',
      },
      shimmerColor: 'via-white/20',
      shadowPulse: [],
    };
  }

  if (isDefaultTheme && !hasActivatedLiquidAmbient) {
    return {
      className: 'relative overflow-hidden z-20 px-8 py-4 rounded-full font-medium tracking-wide flex items-center gap-2 pointer-events-auto cursor-pointer bg-white text-black',
      style: {},
      shimmerColor: 'via-white/50',
      shadowPulse: [
        '0 0 0 0 rgba(255,255,255,0.1)',
        '0 4px 24px 0 rgba(255,255,255,0.2)',
        '0 0 0 0 rgba(255,255,255,0.1)',
      ],
    };
  }

  if (isDefaultTheme && hasActivatedLiquidAmbient) {
    // Liquid glass style
    return {
      className: 'relative overflow-hidden z-20 px-8 py-4 rounded-full font-medium tracking-wide flex items-center gap-2 pointer-events-auto cursor-pointer border border-white/30 bg-white/15 backdrop-blur-xl text-white',
      style: {},
      shimmerColor: 'via-white/40',
      shadowPulse: [
        '0 0 0 0 rgba(255,255,255,0.05)',
        '0 4px 24px 0 rgba(255,255,255,0.2)',
        '0 0 0 0 rgba(255,255,255,0.05)',
      ],
    };
  }

  // Per non-default theme
  switch (themeId) {
    case 'blueprint':
      return {
        className: 'relative overflow-hidden z-20 px-8 py-4 font-medium flex items-center gap-2 pointer-events-auto cursor-pointer',
        style: {
          borderRadius: '0px',
          border: `1px solid ${accent}`,
          color: accent,
          background: 'rgba(0,230,255,0.05)',
          fontFamily: 'monospace',
          letterSpacing: '0.1em',
          textTransform: 'uppercase' as const,
        },
        shimmerColor: 'via-cyan-300/30',
        shadowPulse: [
          `0 0 0 0 rgba(0,230,255,0)`,
          `0 0 18px 4px rgba(0,230,255,0.4)`,
          `0 0 0 0 rgba(0,230,255,0)`,
        ],
      };
    case 'brutal':
      return {
        className: 'relative overflow-hidden z-20 px-8 py-4 font-black flex items-center gap-2 pointer-events-auto cursor-pointer uppercase',
        style: {
          borderRadius: '0px',
          border: `4px solid #000000`,
          color: '#000000',
          background: accent,
          fontFamily: '"Impact", "Arial Black", sans-serif',
          letterSpacing: '-0.02em',
          boxShadow: '6px 6px 0px #000000',
        },
        shimmerColor: 'via-white/40',
        shadowPulse: [
          '6px 6px 0px #000000',
          '8px 8px 0px #000000',
          '6px 6px 0px #000000',
        ],
      };
    case 'cosmic':
      return {
        className: 'relative overflow-hidden z-20 px-8 py-4 font-light flex items-center gap-2 pointer-events-auto cursor-pointer',
        style: {
          borderRadius: '999px',
          border: `1px solid rgba(223,198,151,0.42)`,
          color: '#f1e5c8',
          background: 'rgba(11,22,31,0.58)',
          backdropFilter: 'blur(10px)',
          fontFamily: '"Avenir Next", "Futura", "Trebuchet MS", sans-serif',
          letterSpacing: '0.18em',
          textTransform: 'uppercase' as const,
        },
        shimmerColor: 'via-amber-100/30',
        shadowPulse: [
          `0 0 0 0 rgba(214,180,124,0)`,
          `0 0 22px 5px rgba(214,180,124,0.26)`,
          `0 0 0 0 rgba(214,180,124,0)`,
        ],
      };
    default:
      return {
        className: 'relative overflow-hidden z-20 px-8 py-4 rounded-full font-medium flex items-center gap-2 pointer-events-auto cursor-pointer bg-white text-black',
        style: {},
        shimmerColor: 'via-white/50',
        shadowPulse: [
          '0 0 0 0 rgba(255,255,255,0.1)',
          '0 4px 24px 0 rgba(255,255,255,0.2)',
          '0 0 0 0 rgba(255,255,255,0.1)',
        ],
      };
  }
}

export const HeroCards: React.FC<HeroCardsProps> = ({
  opacity,
  y,
  isDestructiveUnlocked,
  onUnlockDestructiveMode,
}) => {
  const { activeThemeId, isDefaultTheme, hasActivatedLiquidAmbient, activeThemeConfig } = useTheme();
  const { accent, textPrimary, border } = activeThemeConfig.tokens.colors;
  const { radius, borderWidth } = activeThemeConfig.tokens.layout;

  const btnStyle = getButtonStyle(
    activeThemeId,
    isDefaultTheme,
    hasActivatedLiquidAmbient,
    isDestructiveUnlocked,
    accent,
    textPrimary,
    border,
    radius,
    borderWidth,
  );

  // Scroll Indicator Styles by Theme
  const scrollIndicatorStyles = React.useMemo(() => {
    const baseStyle = { 
      color: 'rgba(255, 255, 255, 0.6)', 
      fontFamily: activeThemeConfig.tokens.typography.fontFamily,
      letterSpacing: activeThemeConfig.tokens.typography.baseTracking
    };

    switch (activeThemeId) {
      case 'blueprint':
        return { 
          ...baseStyle, 
          color: 'rgba(0, 230, 255, 0.6)', 
          fontFamily: 'monospace',
          textTransform: 'uppercase' as const,
          letterSpacing: '0.15em'
        };
      case 'brutal':
        return { 
          ...baseStyle, 
          color: '#000000', 
          fontFamily: '"Impact", "Arial Black", sans-serif',
          fontWeight: '900',
          letterSpacing: '0.05em'
        };
      case 'cosmic':
        return { 
          ...baseStyle, 
          color: 'rgba(241, 229, 200, 0.76)', 
          letterSpacing: '0.18em'
        };
      default:
        return baseStyle;
    }
  }, [activeThemeId, activeThemeConfig]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute top-[85vh] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl px-6 sm:px-12 md:px-24 grid grid-cols-1 md:grid-cols-2 gap-8"
    >
      <ThemeCardLeft isOverclocked={isDestructiveUnlocked} />
      <ThemeCardRight isOverclocked={isDestructiveUnlocked} />

      <div className="md:col-span-2 flex justify-center pt-2 relative h-[120px]">
        <motion.div 
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 1.2, duration: 1 } }}
        >
          <AnimatePresence mode="wait">
            {!isDestructiveUnlocked && (
              <motion.button
                key="mastery-button"
                onClick={onUnlockDestructiveMode}
                initial={{ 
                  opacity: 0, 
                  scale: 0.92, 
                  y: 0,
                  boxShadow: 'none'
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: [0, -4, 0],
                  boxShadow: btnStyle.shadowPulse.length ? btnStyle.shadowPulse : undefined,
                }}
                exit={{ 
                  opacity: 0, 
                  scale: 0.95,
                  y: 10,
                  transition: { duration: 0.4, ease: "easeIn" }
                }}
                whileHover={{ scale: 1.06 }}
                whileTap={{
                  scale: 0.94,
                  transition: { type: 'spring', stiffness: 400, damping: 20 },
                }}
                transition={{
                  opacity: { duration: 0.4 },
                  scale: { duration: 0.4 },
                  backgroundColor: { duration: 0.4 },
                  borderColor: { duration: 0.4 },
                  y: { 
                    delay: 2.2, 
                    duration: 3, 
                    repeat: Infinity, 
                    ease: 'easeInOut' 
                  },
                  boxShadow: { 
                    delay: 2.2,
                    duration: 3, 
                    repeat: Infinity, 
                    ease: 'easeInOut' 
                  },
                }}
                className={btnStyle.className}
                style={btnStyle.style}
              >
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r from-transparent ${btnStyle.shimmerColor} to-transparent`}
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    repeatDelay: 2.5,
                    ease: 'easeInOut',
                  }}
                />

                <span className="relative z-10 flex items-center gap-2">
                  Explore mastery
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    →
                  </motion.span>
                </span>
              </motion.button>
            )}

            {isDestructiveUnlocked && (
              <motion.div
                key="scroll-indicator"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className={`absolute top-[130px] flex flex-col items-center justify-center pointer-events-none ${
                  isDestructiveUnlocked ? 'critical-scroll-indicator' : ''
                }`}
              >
                {isDestructiveUnlocked && (
                  <>
                    <div className="critical-rescue-light" />
                    <div className="critical-rescue-light-core" />
                  </>
                )}
                <motion.p
                  className={`text-sm uppercase mb-2 font-medium relative z-10 ${
                    isDestructiveUnlocked ? 'critical-scroll-copy critical-flicker-target' : ''
                  }`}
                  style={scrollIndicatorStyles}
                  animate={{ opacity: [0.4, 0.9, 0.4] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  Scroll down
                </motion.p>
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className={isDestructiveUnlocked ? 'critical-scroll-arrow relative z-10' : ''}
                  style={{ color: scrollIndicatorStyles.color }}
                >
                  <ChevronDown size={24} />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
};
