import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useTheme } from '../themes/themeContext';

interface HeroCardsProps {
  isDestructiveUnlocked: boolean;
  onUnlockDestructiveMode: () => void;
}

export const HeroCards: React.FC<HeroCardsProps> = ({
  isDestructiveUnlocked,
  onUnlockDestructiveMode,
}) => {
  const { activeThemeModule } = useTheme();
  const landingVariant = activeThemeModule.getLandingVariant(isDestructiveUnlocked);
  const isCosmicTheme = activeThemeModule.config.id === 'cosmic';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.1, delay: 0.7, ease: 'easeOut' }}
      className="fixed left-1/2 -translate-x-1/2 z-[60] w-full max-w-6xl px-6 sm:px-12 md:px-24 flex justify-center"
      style={{ bottom: 'calc(env(safe-area-inset-bottom, 0px) + clamp(2rem, 6dvh, 3.75rem))' }}
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
              boxShadow: 'none',
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: [0, -4, 0],
              boxShadow: landingVariant.shadowPulse.length ? landingVariant.shadowPulse : undefined,
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
              y: 10,
              transition: { duration: 0.4, ease: 'easeIn' },
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
                ease: 'easeInOut',
              },
              boxShadow: {
                delay: 2.2,
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              },
            }}
            className={`${landingVariant.exploreButtonClassName} h-[60px] w-[260px] justify-center whitespace-nowrap ${isCosmicTheme ? 'text-[0.95rem]' : 'text-lg'} leading-none`}
            style={{
              ...landingVariant.exploreButtonStyle,
              lineHeight: '1',
            }}
          >
            <motion.div
              className={`absolute inset-0 bg-gradient-to-r from-transparent ${landingVariant.shimmerClassName} to-transparent`}
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
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                ↓
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
            className={`flex flex-col items-center justify-center pointer-events-none ${landingVariant.scrollIndicatorContainerClassName ?? ''}`}
          >
            {landingVariant.showScrollRescueLights && (
              <>
                <div className={landingVariant.scrollRescueLightClassName} />
                <div className={landingVariant.scrollRescueLightCoreClassName} />
              </>
            )}
            <motion.p
              className={`text-sm uppercase mb-2 font-medium relative z-10 ${landingVariant.scrollIndicatorCopyClassName ?? ''}`}
              style={landingVariant.scrollIndicatorStyle}
              animate={{ opacity: [0.4, 0.9, 0.4] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              Scroll down
            </motion.p>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className={landingVariant.scrollIndicatorArrowClassName ?? ''}
              style={{ color: landingVariant.scrollIndicatorStyle.color }}
            >
              <ChevronDown size={24} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
