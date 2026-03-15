import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import CursorManager from '../CursorManager';
import { ThemeProvider, useTheme } from '../themes/ThemeManager';
import { HeroCards } from './HeroCards';
import { ThemeTransitionLayer } from './ThemeTransitionLayer';

function HeroContent() {
  const { 
    hasActivatedLiquidAmbient, 
    activateLiquidAmbient,
    activeThemeConfig 
  } = useTheme();
  
  const [isOverclocked, setIsOverclocked] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const displacementRef = useRef<SVGFEDisplacementMapElement>(null);
  const blurRef = useRef<SVGFEGaussianBlurElement>(null);
  const turbulenceRef = useRef<SVGFETurbulenceElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // 1. Initial Card Entrance (0 -> 0.02)
  const cardsOpacity = useTransform(scrollYProgress, [0, 0.02], [0, 1]);
  const cardsY = useTransform(scrollYProgress, [0, 0.02], [50, 0]);

  // First scroll detection for liquid ambient effect
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest >= 0.01 && !hasActivatedLiquidAmbient) {
      activateLiquidAmbient();
    }
  });

  // 2. The Overload Glitch (0.05 -> 0.15)
  const overloadSkew = useTransform(scrollYProgress, 
    [0.05, 0.07, 0.09, 0.11, 0.13, 0.15], 
    [0,    3,   -3,    5,   -5,    0]
  );
  const overloadFlash = useTransform(scrollYProgress, 
    [0.10, 0.12, 0.13, 0.15], 
    [0,    0.4,   0.2,   0]
  );

  // 3. The Melt & Singularity Pause (0.15 -> 0.55)
  const meltScale = useTransform(scrollYProgress, 
    [0.15, 0.45, 0.55, 0.70], 
    [0,    250,  250,  800]
  );
  useMotionValueEvent(meltScale, "change", (latest) => {
    if (displacementRef.current) {
      displacementRef.current.setAttribute("scale", latest.toString());
    }
  });

  const meltBlur = useTransform(scrollYProgress, [0.15, 0.45], [0, 3]);
  useMotionValueEvent(meltBlur, "change", (latest) => {
    if (blurRef.current) {
      blurRef.current.setAttribute("stdDeviation", latest.toString());
    }
  });

  const stretchYOffset = useTransform(scrollYProgress, 
    [0.15, 0.45, 0.55, 0.70], 
    [0,    600,  600, -2500] 
  );
  
  const stretchY = useTransform(scrollYProgress, 
    [0.15, 0.45, 0.55, 0.70], 
    [1,    4,    4,    30] 
  );

  // 4. Vaporization Frequency Shift (0.55 -> 0.70)
  const meltFreqX = useTransform(scrollYProgress, [0.45, 0.55, 0.70], [0.005, 0.005, 0.03]);
  const meltFreqY = useTransform(scrollYProgress, [0.45, 0.55, 0.70], [0.05, 0.05, 0.5]);
  const previousScrollRef = useRef(0);
  
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (turbulenceRef.current) {
      turbulenceRef.current.setAttribute("baseFrequency", `${meltFreqX.get()} ${meltFreqY.get()}`);
    }

    // Auto-trigger overclocked theme when the destructive animation (wobble) starts
    if (latest >= 0.05 && previousScrollRef.current < 0.05) {
      setIsOverclocked(true);
    } else if (latest < 0.05 && previousScrollRef.current >= 0.05) {
      setIsOverclocked(false);
    }
    previousScrollRef.current = latest;
  });

  const aiOpacity = useTransform(scrollYProgress, [0.65, 0.70], [1, 0]);

  // Epic Narrative Text Sequence
  const opacity1 = useTransform(scrollYProgress, [0.22, 0.27, 0.32, 0.37], [0, 1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0.22, 0.27], [30, 0]);

  const opacity2 = useTransform(scrollYProgress, [0.39, 0.44, 0.49, 0.54], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.39, 0.44], [30, 0]);

  const opacity3 = useTransform(scrollYProgress, [0.56, 0.60, 0.70, 0.77], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.56, 0.60], [30, 0]);

  const opacity4 = useTransform(scrollYProgress, [0.85, 0.90], [0, 1]);
  const y4 = useTransform(scrollYProgress, [0.85, 0.90], [30, 0]);

  // Overall Background (fades to white at end of melt)
  const defaultBgColor = useTransform(scrollYProgress, [0.80, 0.90], ["#000000", "#fcfcfc"]);

  // We should only respect defaultBgColor if there's no active theme
  // if activeTheme, handle it manually since ThemeTransitionLayer provides background color
  const bgColor = activeThemeConfig ? "transparent" : defaultBgColor;

  return (
    <div ref={containerRef} className="h-[1000vh] w-full relative">
      <motion.div 
        style={{ backgroundColor: bgColor }} 
        className="sticky top-[-10vh] h-[130vh] w-full overflow-hidden cursor-none"
      >
        <ThemeTransitionLayer />

        {/* Overload Alert Flash overlay */}
        <motion.div 
          style={{ opacity: overloadFlash }}
          className="absolute inset-0 bg-red-700 mix-blend-color-dodge z-30 pointer-events-none"
        />

        <svg className="absolute w-0 h-0" style={{ display: "none" }}>
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
              <feGaussianBlur 
                ref={blurRef} 
                in="displaced" 
                stdDeviation="0" 
                result="blurred" 
              />
              <feComponentTransfer in="blurred">
                <feFuncA type="linear" slope="1.5" />
              </feComponentTransfer>
            </filter>
          </defs>
        </svg>

        {/* Narrative Messages Layer */}
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

        {/* The Fake Hero Layer that shakes, melts and vaporizes */}
        <motion.div 
          style={{ 
            opacity: aiOpacity,
            scaleY: stretchY,
            y: stretchYOffset,
            skewX: overloadSkew, // The Overload Shake
            filter: "url(#hero-melt)",
          }}
          className="absolute inset-0 z-20 pointer-events-none"
        >
          {/* Aesthetic Background Orbs - Hide if a theme is active, otherwise show */}
          {!activeThemeConfig && (
            <>
              <div className="absolute top-[30vh] left-[10%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-white rounded-full blur-[150px] opacity-[0.04]" />
              <div className="absolute top-[70vh] right-[10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-gray-400 rounded-full blur-[150px] opacity-[0.03]" />
            </>
          )}
          
          <div className="absolute top-[50vh] left-0 w-full -translate-y-1/2 flex flex-col items-center text-center px-6 sm:px-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className={`inline-flex items-center gap-2 px-5 py-2 rounded-full border mb-12 shadow-lg transition-all duration-1000 ${
                activeThemeConfig 
                  ? "" // Styles handled inline
                  : isOverclocked
                  ? 'bg-[#0a0000] border-[#ff003c]/50 shadow-[0_0_30px_rgba(255,0,60,0.6)]'
                  : hasActivatedLiquidAmbient
                  ? 'bg-white/10 border-white/30 backdrop-blur-xl shadow-[0_4px_16px_rgba(255,255,255,0.1)]' 
                  : 'bg-[#1d1d1f]/80 border-white/10 backdrop-blur-xl shadow-black/50'
              }`}
              style={{
                backgroundColor: activeThemeConfig ? activeThemeConfig.tokens.colors.surface : undefined,
                borderColor: activeThemeConfig ? activeThemeConfig.tokens.colors.border : undefined,
              }}
            >
              <span 
                className={`text-xs font-semibold tracking-widest uppercase transition-colors duration-1000 ${
                  activeThemeConfig 
                  ? ""
                  : isOverclocked ? 'text-[#ff003c] drop-shadow-[0_0_10px_rgba(255,0,60,0.9)]' 
                  : hasActivatedLiquidAmbient ? 'text-white/90 drop-shadow-md' : 'text-[#a1a1a6]'
                }`}
                style={{
                  color: activeThemeConfig ? activeThemeConfig.tokens.colors.textSecondary : undefined,
                  fontFamily: activeThemeConfig ? activeThemeConfig.tokens.typography.fontFamily : undefined,
                }}
              >
                {activeThemeConfig ? `${activeThemeConfig.label}` : "Pro. Engineered."}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
              className={`text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-semibold tracking-tighter leading-[1.05] mb-8 transition-all duration-1000 ${
                activeThemeConfig ? '' 
                : isOverclocked ? 'text-transparent bg-clip-text bg-gradient-to-b from-[#ff003c] via-[#ff4a4a] to-[#5a0014] drop-shadow-[0_0_40px_rgba(255,0,60,0.6)] scale-[1.02]' 
                : hasActivatedLiquidAmbient ? 'text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/30 drop-shadow-[0_0_30px_rgba(255,255,255,0.4)]' 
                : 'text-[#f5f5f7]'
              }`}
              style={activeThemeConfig ? {
                color: activeThemeConfig.tokens.colors.textPrimary,
                textShadow: activeThemeConfig.tokens.colors.textDropShadow,
                fontFamily: activeThemeConfig.tokens.typography.fontFamily,
                fontWeight: activeThemeConfig.tokens.typography.titleWeight,
                letterSpacing: activeThemeConfig.tokens.typography.baseTracking,
              } : undefined}
            >
              [Name].<br />
              {activeThemeConfig ? (
                 <span style={{ color: activeThemeConfig.tokens.colors.accent }}>
                   {activeThemeConfig.id === 'blueprint' ? "Architected." : activeThemeConfig.id === 'brutal' ? "Raw." : "Cosmic."}
                 </span>
              ) : (
                <span className={`transition-all duration-1000 ${
                  isOverclocked ? 'text-transparent bg-clip-text bg-gradient-to-b from-[#ff003c] via-[#ff6b6b] to-[#8a0020] drop-shadow-[0_0_25px_rgba(255,0,60,0.8)]'
                  : hasActivatedLiquidAmbient ? 'text-transparent bg-clip-text bg-gradient-to-b from-white via-white/80 to-white/10 drop-shadow-[0_0_15px_rgba(255,255,255,0.6)]' 
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
                activeThemeConfig ? ''
                : isOverclocked ? 'text-[#ffb3b3] drop-shadow-[0_0_15px_rgba(255,0,60,0.5)]'
                : hasActivatedLiquidAmbient ? 'text-white/90 drop-shadow-md' 
                : 'text-[#a1a1a6]'
              }`}
              style={{
                color: activeThemeConfig ? activeThemeConfig.tokens.colors.textSecondary : undefined,
                fontFamily: activeThemeConfig ? activeThemeConfig.tokens.typography.fontFamily : undefined,
              }}
            >
              Absolute power. Flawless execution. The ultimate digital architect forged in pure precision.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-8 w-full sm:w-auto"
            >
              <button 
                className="text-xl hover:underline decoration-1 underline-offset-4 tracking-tight font-medium flex items-center gap-1 group pointer-events-auto cursor-none transition-colors"
                style={{ color: activeThemeConfig ? activeThemeConfig.tokens.colors.textPrimary : '#ffffff' }}
              >
                Explore mastery <span className="group-hover:translate-x-1 transition-transform">{'>'}</span>
              </button>
              <button 
                className="text-xl hover:underline decoration-1 underline-offset-4 tracking-tight font-medium flex items-center gap-1 group pointer-events-auto cursor-none transition-colors"
                style={{ color: activeThemeConfig ? activeThemeConfig.tokens.colors.accent : '#2997ff' }}
              >
                Initiate contact <span className="group-hover:translate-x-1 transition-transform">{'>'}</span>
              </button>
            </motion.div>
          </div>
          
          <HeroCards opacity={cardsOpacity} y={cardsY} />
        </motion.div>
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
