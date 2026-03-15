import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import CursorManager from '../cursor/CursorManager';
import ThemeProvider from '../themes/ThemeManager';
import { useTheme } from '../themes/themeContext';
import { HeroCards } from './HeroCards';
import { ThemeTransitionLayer } from './ThemeTransitionLayer';
import { HeroRevealLayer } from './HeroRevealLayer';
import { HeroLandingLayer } from './HeroLandingLayer';

function HeroContent() {
  const { isStarterTheme } = useTheme();

  const [isDestructiveUnlocked, setIsDestructiveUnlocked] = useState(false);
  const [isWiggling, setIsWiggling] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration;

    // Keep landing deterministic on reload: start at top instead of restored scroll offset.
    window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);

    return () => {
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

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
  const bgColor = isStarterTheme ? defaultBgColor : 'transparent';

  return (
    <div ref={containerRef} className="h-[1000vh] w-full relative">
      <motion.div
        style={{ backgroundColor: bgColor }}
        className="sticky top-[-10vh] h-[130vh] w-full overflow-hidden cursor-none"
      >
        <ThemeTransitionLayer />

        <HeroRevealLayer scrollYProgress={scrollYProgress} isUnlocked={isDestructiveUnlocked}>
          <HeroLandingLayer isUnlocked={isDestructiveUnlocked} isWiggling={isWiggling}>
            <HeroCards
              isDestructiveUnlocked={isDestructiveUnlocked}
              onUnlockDestructiveMode={() => {
                setIsDestructiveUnlocked(true);
                setIsWiggling(true);
                setTimeout(() => setIsWiggling(false), 520);
              }}
            />
          </HeroLandingLayer>
        </HeroRevealLayer>
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
