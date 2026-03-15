import type React from 'react';
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { useTheme } from '../themes/themeContext';

interface HeroLandingLayerProps {
  isUnlocked: boolean;
  isWiggling: boolean;
  children?: ReactNode;
}

export const HeroLandingLayer: React.FC<HeroLandingLayerProps> = ({
  isUnlocked,
  isWiggling,
  children,
}) => {
  const { activeThemeModule, cycleTheme } = useTheme();
  const UnlockLayer = activeThemeModule.UnlockEffectLayer;
  const heroVariant = activeThemeModule.getHeroVariant(isUnlocked);

  return (
    <div className="absolute inset-0 z-20 pointer-events-none">
      <UnlockLayer isUnlocked={isUnlocked} isWiggling={isWiggling} />

      <div className="absolute top-[42vh] left-0 w-full -translate-y-1/2 flex flex-col items-center text-center px-6 sm:px-12 z-[25]">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className={`inline-flex items-center gap-2 px-5 py-2 rounded-full border mb-12 shadow-lg transition-all duration-1000 ${heroVariant.badgeContainerClassName}`}
          style={heroVariant.badgeContainerStyle}
        >
          <span
            className={`text-xs font-semibold tracking-widest uppercase transition-colors duration-1000 ${heroVariant.badgeTextClassName}`}
            style={heroVariant.badgeTextStyle}
          >
            {heroVariant.badgeText}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: 'easeOut' }}
          className={`text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-semibold tracking-tighter leading-[1.05] mb-8 transition-all duration-1000 ${heroVariant.titleClassName}`}
          style={heroVariant.titleStyle}
        >
          [Simon]
          <br />
          <span
            className={`transition-all duration-1000 ${heroVariant.taglineClassName}`}
            style={heroVariant.taglineStyle}
          >
            {heroVariant.taglineText}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className={`text-2xl sm:text-3xl max-w-4xl font-medium mb-10 leading-tight tracking-tight transition-all duration-1000 ${heroVariant.descriptionClassName}`}
          style={heroVariant.descriptionStyle}
        >
          {heroVariant.descriptionText}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55, ease: 'easeOut' }}
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 ${heroVariant.primaryActionRowClassName}`}
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 320, damping: 24 }}
            onClick={cycleTheme}
            className={`${heroVariant.actionButtonBaseClassName} ${heroVariant.themeActionClassName}`}
            style={{ ...heroVariant.actionButtonBaseStyle, ...heroVariant.themeActionStyle }}
          >
            {heroVariant.themeActionText}
          </motion.button>

          <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 320, damping: 24 }}
            href="mailto:hello@example.com"
            className={`${heroVariant.actionButtonBaseClassName} ${heroVariant.contactActionClassName}`}
            style={{ ...heroVariant.actionButtonBaseStyle, ...heroVariant.contactActionStyle }}
          >
            {heroVariant.contactActionText}
          </motion.a>
        </motion.div>
      </div>

      {children}
    </div>
  );
};
