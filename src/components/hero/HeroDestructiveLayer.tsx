import { useRef } from 'react';
import { motion, useReducedMotion, useTransform, useMotionValueEvent, type MotionValue } from 'framer-motion';
import type { ThemeConfig } from '../themes/types';
import type { ReactNode } from 'react';
import { CriticalAmbientLayer } from './ambient/CriticalAmbientLayer';
import { useAlarmPulse } from './ambient/useAlarmPulse';
import { useGlowBreathing } from './ambient/useGlowBreathing';
import { useIrregularFlicker } from './ambient/useIrregularFlicker';
import { useSurfaceStress } from './ambient/useSurfaceStress';
import { AMBIENT_PROFILES } from './ambient/criticalAmbientConfig';

interface HeroDestructiveLayerProps {
  scrollYProgress: MotionValue<number>;
  isUnlocked: boolean;
  isWiggling: boolean;
  isDefaultTheme: boolean;
  hasActivatedLiquidAmbient: boolean;
  activeThemeConfig: ThemeConfig;
  children?: ReactNode;
}

export const HeroDestructiveLayer: React.FC<HeroDestructiveLayerProps> = ({
  scrollYProgress,
  isUnlocked,
  isWiggling,
  isDefaultTheme,
  hasActivatedLiquidAmbient,
  activeThemeConfig,
  children,
}) => {
  const displacementRef = useRef<SVGFEDisplacementMapElement>(null);
  const blurRef = useRef<SVGFEGaussianBlurElement>(null);
  const turbulenceRef = useRef<SVGFETurbulenceElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const reducedMotion = Boolean(shouldReduceMotion);
  const isCriticalActive = isDefaultTheme && isUnlocked;
  const pulse = useAlarmPulse(isCriticalActive, 'critical', reducedMotion);
  const { bloom, microShift } = useGlowBreathing(isCriticalActive, 'critical', reducedMotion);
  const flicker = useIrregularFlicker(isCriticalActive, 'critical', reducedMotion);
  const { scanTick, cardStress } = useSurfaceStress(isCriticalActive, 'critical', reducedMotion);

  const gatedProgress = useTransform(scrollYProgress, (value) =>
    isUnlocked ? value : Math.min(value, 0.049),
  );

  // Scroll-driven melt phase (0.15+). Wiggle is now time-based via isWiggling.
  const meltScale = useTransform(gatedProgress, [0.15, 0.45, 0.55, 0.7], [0, 250, 250, 800]);
  useMotionValueEvent(meltScale, 'change', (latest) => {
    if (displacementRef.current) {
      displacementRef.current.setAttribute('scale', latest.toString());
    }
  });

  const meltBlur = useTransform(gatedProgress, [0.15, 0.45], [0, 3]);
  useMotionValueEvent(meltBlur, 'change', (latest) => {
    if (blurRef.current) {
      blurRef.current.setAttribute('stdDeviation', latest.toString());
    }
  });

  const stretchYOffset = useTransform(gatedProgress, [0.15, 0.45, 0.55, 0.7], [0, 600, 600, -2500]);
  const stretchY = useTransform(gatedProgress, [0.15, 0.45, 0.55, 0.7], [1, 4, 4, 30]);

  const meltFreqX = useTransform(gatedProgress, [0.45, 0.55, 0.7], [0.005, 0.005, 0.03]);
  const meltFreqY = useTransform(gatedProgress, [0.45, 0.55, 0.7], [0.05, 0.05, 0.5]);

  useMotionValueEvent(gatedProgress, 'change', () => {
    if (turbulenceRef.current) {
      turbulenceRef.current.setAttribute('baseFrequency', `${meltFreqX.get()} ${meltFreqY.get()}`);
    }
  });

  const aiOpacity = useTransform(gatedProgress, [0.65, 0.7], [1, 0]);

  const opacity1 = useTransform(gatedProgress, [0.22, 0.27, 0.32, 0.37], [0, 1, 1, 0]);
  const y1 = useTransform(gatedProgress, [0.22, 0.27], [30, 0]);

  const opacity2 = useTransform(gatedProgress, [0.39, 0.44, 0.49, 0.54], [0, 1, 1, 0]);
  const y2 = useTransform(gatedProgress, [0.39, 0.44], [30, 0]);

  const opacity3 = useTransform(gatedProgress, [0.56, 0.6, 0.7, 0.77], [0, 1, 1, 0]);
  const y3 = useTransform(gatedProgress, [0.56, 0.6], [30, 0]);

  const opacity4 = useTransform(gatedProgress, [0.85, 0.9], [0, 1]);
  const y4 = useTransform(gatedProgress, [0.85, 0.9], [30, 0]);

  return (
    <>
      {/* Abrupt unlock jolt — intentional, short, and non-chaotic */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isWiggling ? [0, 0.32, 0.06, 0] : 0 }}
        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 bg-black z-[29] pointer-events-none"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isWiggling ? [0, 0.54, 0.14, 0.42, 0] : 0 }}
        transition={{ duration: 0.46, ease: 'linear' }}
        className="absolute inset-0 bg-red-700 mix-blend-color-dodge z-30 pointer-events-none"
      />

      <svg className="absolute w-0 h-0" style={{ display: 'none' }}>
        <defs>
          <filter id="hero-melt" x="-50%" y="-50%" width="200%" height="200%">
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
              result="displaced"
            />
            <feGaussianBlur ref={blurRef} in="displaced" stdDeviation="0" result="blurred" />
            <feComponentTransfer in="blurred">
              <feFuncA type="linear" slope="1.5" />
            </feComponentTransfer>
          </filter>
        </defs>
      </svg>

      <div className="absolute inset-0 z-40 flex items-center justify-center px-6 pointer-events-none text-center text-white">
        <motion.div style={{ opacity: opacity1, y: y1 }} className="absolute font-inter text-5xl sm:text-6xl md:text-8xl lg:text-9xl tracking-tight drop-shadow-2xl font-bold">
          Yeah... that part was AI.
        </motion.div>
        <motion.div style={{ opacity: opacity2, y: y2 }} className="absolute font-inter text-5xl sm:text-6xl md:text-8xl lg:text-9xl tracking-tight drop-shadow-2xl font-bold">
          Looks impressive.
        </motion.div>
        <motion.div style={{ opacity: opacity3, y: y3 }} className="absolute font-inter text-5xl sm:text-6xl md:text-8xl lg:text-9xl tracking-tight drop-shadow-2xl font-bold">
          But it's not really me.
        </motion.div>
        <motion.div style={{ opacity: opacity4, y: y4 }} className="absolute font-casual text-5xl sm:text-6xl md:text-8xl lg:text-9xl tracking-tight text-[#1a1a1a] font-bold">
          I'm just a guy who likes building stuff.
        </motion.div>
      </div>

      <motion.div
        style={{
          opacity: aiOpacity,
          scaleY: stretchY,
          y: stretchYOffset,
          filter: 'url(#hero-melt)',
          ['--critical-pulse-duration' as string]: `${pulse.primaryCycle.toFixed(2)}s`,
          ['--critical-secondary-duration' as string]: `${pulse.secondaryCycle.toFixed(2)}s`,
          ['--critical-drift-duration' as string]: `${pulse.driftCycle.toFixed(2)}s`,
          ['--critical-phase-offset' as string]: `${pulse.phaseOffset.toFixed(2)}s`,
          ['--critical-bloom' as string]: bloom.toFixed(3),
          ['--critical-micro-shift' as string]: microShift.toFixed(3),
          ['--critical-flicker' as string]: flicker.toFixed(3),
          ['--critical-card-stress' as string]: cardStress.toFixed(3),
        }}
        className={`absolute inset-0 z-20 pointer-events-none ${
          isCriticalActive ? 'critical-mode' : ''
        }`}
      >
        <CriticalAmbientLayer
          active={isCriticalActive}
          scanTick={scanTick}
          scanDurationMs={AMBIENT_PROFILES.critical.scanDurationMs}
        />

        {isDefaultTheme && (
          <>
            <div className="absolute top-[30vh] left-[10%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-white rounded-full blur-[150px] opacity-[0.04] critical-bg-node" />
            <div className="absolute top-[70vh] right-[10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-gray-400 rounded-full blur-[150px] opacity-[0.03] critical-bg-node critical-bg-node-alt" />
          </>
        )}

        <div className="absolute top-[42vh] left-0 w-full -translate-y-1/2 flex flex-col items-center text-center px-6 sm:px-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className={`inline-flex items-center gap-2 px-5 py-2 rounded-full border mb-12 shadow-lg transition-all duration-1000 ${
              !isDefaultTheme
                ? ''
                : isUnlocked
                  ? 'bg-[#0a0000] border-[#ff003c]/50 shadow-[0_0_30px_rgba(255,0,60,0.6)] critical-flicker-target critical-badge-pulse'
                  : hasActivatedLiquidAmbient
                    ? 'bg-white/10 border-white/30 backdrop-blur-xl shadow-[0_4px_16px_rgba(255,255,255,0.1)]'
                    : 'bg-[#1d1d1f]/80 border-white/10 backdrop-blur-xl shadow-black/50'
            }`}
            style={{
              backgroundColor: !isDefaultTheme ? activeThemeConfig.tokens.colors.surface : undefined,
              borderColor: !isDefaultTheme ? activeThemeConfig.tokens.colors.border : undefined,
            }}
          >
            <span
              className={`text-xs font-semibold tracking-widest uppercase transition-colors duration-1000 ${
                !isDefaultTheme
                  ? ''
                  : isUnlocked
                    ? 'text-[#ff003c] drop-shadow-[0_0_10px_rgba(255,0,60,0.9)] critical-flicker-target'
                    : hasActivatedLiquidAmbient
                      ? 'text-white/90 drop-shadow-md'
                      : 'text-[#a1a1a6]'
              }`}
              style={{
                color: !isDefaultTheme ? activeThemeConfig.tokens.colors.textSecondary : undefined,
                fontFamily: !isDefaultTheme ? activeThemeConfig.tokens.typography.fontFamily : undefined,
              }}
            >
              {!isDefaultTheme ? activeThemeConfig.label : 'Pro. Engineered.'}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: 'easeOut' }}
            className={`text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-semibold tracking-tighter leading-[1.05] mb-8 transition-all duration-1000 ${
              !isDefaultTheme
                ? ''
                : isUnlocked
                  ? 'text-transparent bg-clip-text bg-gradient-to-b from-[#ff003c] via-[#ff4a4a] to-[#5a0014] drop-shadow-[0_0_40px_rgba(255,0,60,0.6)] scale-[1.02] critical-flicker-target'
                  : hasActivatedLiquidAmbient
                    ? 'text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/30 drop-shadow-[0_0_30px_rgba(255,255,255,0.4)]'
                    : 'text-[#f5f5f7]'
            }`}
            style={!isDefaultTheme ? {
              color: activeThemeConfig.tokens.colors.textPrimary,
              textShadow: activeThemeConfig.tokens.colors.textDropShadow,
              fontFamily: activeThemeConfig.tokens.typography.fontFamily,
              fontWeight: activeThemeConfig.tokens.typography.titleWeight,
              letterSpacing: activeThemeConfig.tokens.typography.baseTracking,
            } : undefined}
          >
            [Simon]<br />
            {!isDefaultTheme ? (
              <span style={{ color: activeThemeConfig.tokens.colors.accent }}>{activeThemeConfig.content.heroTagline}</span>
            ) : (
              <span className={`transition-all duration-1000 ${
                isUnlocked
                  ? 'text-transparent bg-clip-text bg-gradient-to-b from-[#ff003c] via-[#ff6b6b] to-[#8a0020] drop-shadow-[0_0_25px_rgba(255,0,60,0.8)] critical-hero-tagline'
                  : hasActivatedLiquidAmbient
                    ? 'text-transparent bg-clip-text bg-gradient-to-b from-white via-white/80 to-white/10 drop-shadow-[0_0_15px_rgba(255,255,255,0.6)]'
                    : 'text-transparent bg-clip-text bg-gradient-to-b from-white via-[#d2d2d7] to-[#86868b]'
              }`}>
                Supercharged.
              </span>
            )}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className={`text-2xl sm:text-3xl max-w-4xl font-medium mb-16 leading-tight tracking-tight transition-all duration-1000 ${
              !isDefaultTheme
                ? ''
                : isUnlocked
                  ? 'text-[#ffb3b3] drop-shadow-[0_0_15px_rgba(255,0,60,0.5)]'
                  : hasActivatedLiquidAmbient
                    ? 'text-white/90 drop-shadow-md'
                    : 'text-[#a1a1a6]'
            }`}
            style={{
              color: !isDefaultTheme ? activeThemeConfig.tokens.colors.textSecondary : undefined,
              fontFamily: !isDefaultTheme ? activeThemeConfig.tokens.typography.fontFamily : undefined,
            }}
          >
            Absolute power. Flawless execution. The ultimate digital architect forged in pure precision.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className={`text-xl hover:underline decoration-1 underline-offset-4 tracking-tight font-medium flex items-center gap-1 group pointer-events-auto cursor-none transition-colors ${
              isCriticalActive ? 'critical-cta critical-flicker-target' : ''
            }`}
            style={{ color: !isDefaultTheme ? activeThemeConfig.tokens.colors.accent : '#2997ff' }}
          >
            Initiate contact <span className="group-hover:translate-x-1 transition-transform">{'>'}</span>
          </motion.button>
        </div>

        {children}
      </motion.div>
    </>
  );
};
