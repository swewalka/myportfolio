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
  const revealAutoScrollCapProgress = 0.13;
  const autoScrollDurationMs = 1800;

  const easeInOutCubic = (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  const animateWindowScrollTo = (targetY: number, durationMs: number) => {
    const startY = window.scrollY;
    const distance = targetY - startY;
    if (Math.abs(distance) < 1) return;

    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      const eased = easeInOutCubic(progress);
      window.scrollTo(0, startY + distance * eased);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

  const scrollToScrollCue = () => {
    const container = containerRef.current;
    if (!container) return;

    const containerTop = container.offsetTop;
    const scrollRange = Math.max(container.offsetHeight - window.innerHeight, 0);
    const maxSafeY = containerTop + scrollRange * revealAutoScrollCapProgress;
    const desiredDelta = Math.min(window.innerHeight * 0.35, 420);
    const targetY = Math.min(window.scrollY + desiredDelta, maxSafeY);

    if (targetY <= window.scrollY + 1) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      window.scrollTo({ top: targetY, behavior: 'auto' });
      return;
    }

    animateWindowScrollTo(targetY, autoScrollDurationMs);
  };

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

                // Wait for unlock styles to apply, then nudge down to expose the scroll cue.
                requestAnimationFrame(() => {
                  requestAnimationFrame(() => {
                    scrollToScrollCue();
                  });
                });
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
