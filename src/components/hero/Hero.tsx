import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import CursorManager from '../CursorManager';
import { ThemeProvider, useTheme } from '../themes/ThemeManager';
import { HeroCards } from './HeroCards';
import { ThemeTransitionLayer } from './ThemeTransitionLayer';
import { HeroDestructiveLayer } from './HeroDestructiveLayer';

function HeroContent() {
  const {
    hasActivatedLiquidAmbient,
    activateLiquidAmbient,
    activeThemeConfig,
    isDefaultTheme,
  } = useTheme();

  const [isDestructiveUnlocked, setIsDestructiveUnlocked] = useState(false);
  const [shouldLockScroll, setShouldLockScroll] = useState(false);
  const [isWiggling, setIsWiggling] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const cardsOpacity = useTransform(scrollYProgress, [0, 0.02], [0, 1]);
  const cardsY = useTransform(scrollYProgress, [0, 0.02], [50, 0]);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (latest >= 0.01 && !hasActivatedLiquidAmbient) {
      activateLiquidAmbient();
    }
    if (latest >= 0.025 && !shouldLockScroll && !isDestructiveUnlocked) {
      setShouldLockScroll(true);
    } else if (latest < 0.02 && shouldLockScroll) {
      setShouldLockScroll(false);
    }
  });

  const defaultBgColor = useTransform(scrollYProgress, [0.8, 0.9], ['#000000', '#fcfcfc']);
  const bgColor = isDefaultTheme ? defaultBgColor : 'transparent';

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    if (shouldLockScroll && !isDestructiveUnlocked) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [shouldLockScroll, isDestructiveUnlocked]);

  return (
    <div ref={containerRef} className="h-[1000vh] w-full relative">
      <motion.div
        style={{ backgroundColor: bgColor }}
        className="sticky top-[-10vh] h-[130vh] w-full overflow-hidden cursor-none"
      >
        <ThemeTransitionLayer />

        <HeroDestructiveLayer
          scrollYProgress={scrollYProgress}
          isUnlocked={isDestructiveUnlocked}
          isWiggling={isWiggling}
          isDefaultTheme={isDefaultTheme}
          hasActivatedLiquidAmbient={hasActivatedLiquidAmbient}
          activeThemeConfig={activeThemeConfig}
        >
          <HeroCards
            opacity={cardsOpacity}
            y={cardsY}
            isDestructiveUnlocked={isDestructiveUnlocked}
            onUnlockDestructiveMode={() => {
              setIsDestructiveUnlocked(true);
              setIsWiggling(true);
              // Abrupt unlock jolt lasts briefly, then reset for future triggers.
              setTimeout(() => setIsWiggling(false), 520);
            }}
          />
        </HeroDestructiveLayer>
      </motion.div>
    </div>
  );
}

export default function Hero() {
  return (
    <ThemeProvider>
      <CursorManager>
        <HeroContent />
      </CursorManager>
    </ThemeProvider>
  );
}
