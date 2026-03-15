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
  const { activeThemeModule } = useTheme();
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
          <span className={`transition-all duration-1000 ${heroVariant.taglineClassName}`} style={heroVariant.taglineStyle}>
            {heroVariant.taglineText}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className={`text-2xl sm:text-3xl max-w-4xl font-medium mb-16 leading-tight tracking-tight transition-all duration-1000 ${heroVariant.descriptionClassName}`}
          style={heroVariant.descriptionStyle}
        >
          {heroVariant.descriptionText}
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className={`text-xl hover:underline decoration-1 underline-offset-4 tracking-tight font-medium flex items-center gap-1 group pointer-events-auto cursor-none transition-colors ${heroVariant.ctaClassName}`}
          style={heroVariant.ctaStyle}
        >
          {heroVariant.ctaText}{' '}
          <span className="group-hover:translate-x-1 transition-transform">{'>'}</span>
        </motion.button>
      </div>

      {children}
    </div>
  );
};
