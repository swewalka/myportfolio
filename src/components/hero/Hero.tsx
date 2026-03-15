import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import CursorManager from '../cursor/CursorManager';
import { ThemeProvider, useTheme } from '../themes/ThemeManager';
import { HeroCards } from './HeroCards';
import { ThemeTransitionLayer } from './ThemeTransitionLayer';
import { HeroDestructiveLayer } from './HeroDestructiveLayer';

function HeroContent() {
  const {
    activeThemeConfig,
    isDefaultTheme,
  } = useTheme();

  const [isDestructiveUnlocked, setIsDestructiveUnlocked] = useState(false);
  const [isWiggling, setIsWiggling] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverflow = body.style.overflow;
    const previousBodyTouchAction = body.style.touchAction;
    const previousBodyOverscrollBehavior = body.style.overscrollBehavior;

    if (!isDestructiveUnlocked) {
      html.style.overflow = 'hidden';
      body.style.overflow = 'hidden';
      body.style.touchAction = 'none';
      body.style.overscrollBehavior = 'none';
    } else {
      html.style.overflow = '';
      body.style.overflow = '';
      body.style.touchAction = '';
      body.style.overscrollBehavior = '';
    }

    return () => {
      html.style.overflow = previousHtmlOverflow;
      body.style.overflow = previousBodyOverflow;
      body.style.touchAction = previousBodyTouchAction;
      body.style.overscrollBehavior = previousBodyOverscrollBehavior;
    };
  }, [isDestructiveUnlocked]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const defaultBgColor = useTransform(scrollYProgress, [0.8, 0.9], ['#000000', '#fcfcfc']);
  const bgColor = isDefaultTheme ? defaultBgColor : 'transparent';

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
          activeThemeConfig={activeThemeConfig}
        >
          <HeroCards
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
