import { useRef, type ReactNode } from 'react';
import {
  motion,
  useMotionValueEvent,
  type MotionValue,
  useTransform,
} from 'framer-motion';
import {
  isCompatFeatureSupported,
  shouldApplyCompatWorkaround,
} from '../../lib/browserCompat';
import { useTheme } from '../themes/themeContext';

interface ScrollTransitionProps {
  progress: MotionValue<number>;
  children: ReactNode;
}

export function ScrollTransition({ progress, children }: ScrollTransitionProps) {
  const { activeThemeConfig } = useTheme();
  const { colors } = activeThemeConfig.tokens;

  const meltFilterCompatFeature = 'landingSvgFilterReference';
  const isMeltFilterSupported = isCompatFeatureSupported(meltFilterCompatFeature);
  const shouldApplyMeltFilterWorkaround = shouldApplyCompatWorkaround(meltFilterCompatFeature);
  const meltFilterId = 'landing-melt';
  const meltFilterReference =
    shouldApplyMeltFilterWorkaround && typeof window !== 'undefined'
      ? `url(${window.location.href.split('#')[0]}#${meltFilterId})`
      : `url(#${meltFilterId})`;

  const displacementRef = useRef<SVGFEDisplacementMapElement>(null);
  const blurRef = useRef<SVGFEGaussianBlurElement>(null);
  const turbulenceRef = useRef<SVGFETurbulenceElement>(null);

  // Start immediately on first scroll while preserving reversible scrub behavior.
  const meltScale = useTransform(progress, [0.01, 0.2, 0.34, 0.92], [0, 250, 250, 800]);
  const meltBlur = useTransform(progress, [0.01, 0.22], [0, 3]);
  const stretchY = useTransform(progress, [0.01, 0.2, 0.34, 0.92], [1, 4, 4, 28]);
  const turbulenceX = useTransform(progress, [0.22, 0.34, 0.92], [0.005, 0.005, 0.03]);
  const turbulenceY = useTransform(progress, [0.22, 0.34, 0.92], [0.05, 0.05, 0.5]);
  const contentOpacity = useTransform(progress, [0.82, 0.94], [1, 0]);
  const helperCopyOpacity = useTransform(progress, [0, 0.66, 0.92], [0.85, 0.75, 0]);
  const backdropOpacity = useTransform(progress, [0.76, 0.94], [0, 0.55]);
  const revealBlurPixels = useTransform(progress, [0.72, 0.96], [18, 0]);
  const revealBlurFilter = useTransform(revealBlurPixels, (value) => `blur(${value.toFixed(2)}px)`);
  const revealVeilOpacity = useTransform(progress, [0.66, 0.88, 0.98], [0, 0.28, 0]);

  useMotionValueEvent(meltScale, 'change', (latest) => {
    if (displacementRef.current) {
      displacementRef.current.setAttribute('scale', latest.toString());
    }
  });

  useMotionValueEvent(meltBlur, 'change', (latest) => {
    if (blurRef.current) {
      blurRef.current.setAttribute('stdDeviation', latest.toString());
    }
  });

  useMotionValueEvent(progress, 'change', () => {
    if (turbulenceRef.current) {
      turbulenceRef.current.setAttribute('baseFrequency', `${turbulenceX.get()} ${turbulenceY.get()}`);
    }
  });

  const filterValue = isMeltFilterSupported ? meltFilterReference : 'none';

  return (
    <>
      <svg
        aria-hidden="true"
        focusable="false"
        className="absolute h-0 w-0 overflow-hidden pointer-events-none"
        style={{ visibility: 'hidden' }}
      >
        <defs>
          <filter id={meltFilterId} x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence
              ref={turbulenceRef}
              type="fractalNoise"
              baseFrequency="0.005 0.05"
              numOctaves="2"
              result="noise"
            />
            <feDisplacementMap
              ref={displacementRef}
              in="SourceGraphic"
              in2="noise"
              scale="0"
              xChannelSelector="R"
              yChannelSelector="G"
              result="distorted"
            />
            <feGaussianBlur ref={blurRef} in="distorted" stdDeviation="0" result="blurred" />
            <feComponentTransfer in="blurred">
              <feFuncA type="linear" slope="1.5" />
            </feComponentTransfer>
          </filter>
        </defs>
      </svg>

      <motion.div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          opacity: backdropOpacity,
          background: `linear-gradient(180deg, transparent 0%, ${colors.background} 100%)`,
        }}
      />

      <motion.div
        className="absolute inset-0 z-[15] pointer-events-none"
        style={{
          opacity: revealVeilOpacity,
          backdropFilter: revealBlurFilter,
          WebkitBackdropFilter: revealBlurFilter,
          backgroundColor: 'rgba(0, 0, 0, 0.08)',
        }}
      />

      <motion.div
        className="relative z-20"
        style={{
          filter: filterValue,
          opacity: contentOpacity,
          transformOrigin: '50% 50%',
          scaleY: stretchY,
        }}
      >
        {children}
      </motion.div>

      <motion.p
        className="absolute bottom-14 left-1/2 z-30 -translate-x-1/2 px-4 text-center text-xs font-semibold uppercase tracking-[0.28em] pointer-events-none"
        style={{
          color: colors.textPrimary,
          opacity: helperCopyOpacity,
          textShadow: '0 2px 14px rgba(0, 0, 0, 0.45)',
        }}
      >
        Scroll to dissolve
      </motion.p>
    </>
  );
}
