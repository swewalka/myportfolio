import { useRef } from 'react';
import {
  motion,
  useMotionValueEvent,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import type { ReactNode } from 'react';

interface HeroRevealLayerProps {
  scrollYProgress: MotionValue<number>;
  isUnlocked: boolean;
  children?: ReactNode;
}

export const HeroRevealLayer: React.FC<HeroRevealLayerProps> = ({
  scrollYProgress,
  isUnlocked,
  children,
}) => {
  const displacementRef = useRef<SVGFEDisplacementMapElement>(null);
  const blurRef = useRef<SVGFEGaussianBlurElement>(null);
  const turbulenceRef = useRef<SVGFETurbulenceElement>(null);

  const gatedProgress = useTransform(scrollYProgress, (value) => (isUnlocked ? value : 0));

  const meltScale = useTransform(gatedProgress, [0, 0.3, 0.4, 0.55], [0, 250, 250, 800]);
  useMotionValueEvent(meltScale, 'change', (latest) => {
    if (displacementRef.current) {
      displacementRef.current.setAttribute('scale', latest.toString());
    }
  });

  const meltBlur = useTransform(gatedProgress, [0, 0.3], [0, 3]);
  useMotionValueEvent(meltBlur, 'change', (latest) => {
    if (blurRef.current) {
      blurRef.current.setAttribute('stdDeviation', latest.toString());
    }
  });

  const stretchYOffset = useTransform(gatedProgress, [0, 0.3, 0.4, 0.55], [0, 600, 600, -2500]);
  const stretchY = useTransform(gatedProgress, [0, 0.3, 0.4, 0.55], [1, 4, 4, 30]);

  const meltFreqX = useTransform(gatedProgress, [0.3, 0.4, 0.55], [0.005, 0.005, 0.03]);
  const meltFreqY = useTransform(gatedProgress, [0.3, 0.4, 0.55], [0.05, 0.05, 0.5]);

  useMotionValueEvent(gatedProgress, 'change', () => {
    if (turbulenceRef.current) {
      turbulenceRef.current.setAttribute('baseFrequency', `${meltFreqX.get()} ${meltFreqY.get()}`);
    }
  });

  const aiOpacity = useTransform(gatedProgress, [0.5, 0.55], [1, 0]);

  const opacity1 = useTransform(gatedProgress, [0.07, 0.12, 0.17, 0.22], [0, 1, 1, 0]);
  const y1 = useTransform(gatedProgress, [0.07, 0.12], [30, 0]);

  const opacity2 = useTransform(gatedProgress, [0.24, 0.29, 0.34, 0.39], [0, 1, 1, 0]);
  const y2 = useTransform(gatedProgress, [0.24, 0.29], [30, 0]);

  const opacity3 = useTransform(gatedProgress, [0.41, 0.45, 0.55, 0.62], [0, 1, 1, 0]);
  const y3 = useTransform(gatedProgress, [0.41, 0.45], [30, 0]);

  const opacity4 = useTransform(gatedProgress, [0.7, 0.75], [0, 1]);
  const y4 = useTransform(gatedProgress, [0.7, 0.75], [30, 0]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0.38 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1.8, ease: 'easeOut' }}
        className="absolute inset-0 bg-black z-[28] pointer-events-none"
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
        <motion.div
          style={{ opacity: opacity1, y: y1 }}
          className="absolute font-inter text-5xl sm:text-6xl md:text-8xl lg:text-9xl tracking-tight drop-shadow-2xl font-bold"
        >
          Yeah... that part was AI.
        </motion.div>
        <motion.div
          style={{ opacity: opacity2, y: y2 }}
          className="absolute font-inter text-5xl sm:text-6xl md:text-8xl lg:text-9xl tracking-tight drop-shadow-2xl font-bold"
        >
          Looks impressive.
        </motion.div>
        <motion.div
          style={{ opacity: opacity3, y: y3 }}
          className="absolute font-inter text-5xl sm:text-6xl md:text-8xl lg:text-9xl tracking-tight drop-shadow-2xl font-bold"
        >
          But it's not really me.
        </motion.div>
        <motion.div
          style={{ opacity: opacity4, y: y4 }}
          className="absolute font-casual text-5xl sm:text-6xl md:text-8xl lg:text-9xl tracking-tight text-[#1a1a1a] font-bold"
        >
          I'm just a guy who likes building stuff.
        </motion.div>
      </div>

      <motion.div
        style={{
          opacity: aiOpacity,
          scaleY: stretchY,
          y: stretchYOffset,
          filter: 'url(#hero-melt)',
        }}
        className="absolute inset-0 z-20 pointer-events-none"
      >
        {children}
      </motion.div>
    </>
  );
};
