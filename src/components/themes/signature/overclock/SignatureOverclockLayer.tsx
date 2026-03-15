import type React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { SignatureOverclockAmbientLayer } from './SignatureOverclockAmbientLayer';
import { OVERCLOCK_AMBIENT_PROFILES } from './overclockAmbientConfig';
import { useOverclockAlarmPulse } from './useOverclockAlarmPulse';
import { useOverclockGlowBreathing } from './useOverclockGlowBreathing';
import { useOverclockIrregularFlicker } from './useOverclockIrregularFlicker';
import { useOverclockSurfaceStress } from './useOverclockSurfaceStress';
import type { ThemeUnlockEffectProps } from '../../core/types';
import './signatureOverclock.css';

export const SignatureOverclockLayer: React.FC<ThemeUnlockEffectProps> = ({
  isUnlocked,
  isWiggling,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const reducedMotion = Boolean(shouldReduceMotion);
  const isOverclockActive = isUnlocked;

  const pulse = useOverclockAlarmPulse(isOverclockActive, 'critical', reducedMotion);
  const { bloom, microShift } = useOverclockGlowBreathing(
    isOverclockActive,
    'critical',
    reducedMotion,
  );
  const flicker = useOverclockIrregularFlicker(isOverclockActive, 'critical', reducedMotion);
  const { scanTick, cardStress } = useOverclockSurfaceStress(
    isOverclockActive,
    'critical',
    reducedMotion,
  );

  return (
    <>
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

      <motion.div
        style={{
          ['--signature-overclock-pulse-duration' as string]: `${pulse.primaryCycle.toFixed(2)}s`,
          ['--signature-overclock-secondary-duration' as string]: `${pulse.secondaryCycle.toFixed(2)}s`,
          ['--signature-overclock-drift-duration' as string]: `${pulse.driftCycle.toFixed(2)}s`,
          ['--signature-overclock-phase-offset' as string]: `${pulse.phaseOffset.toFixed(2)}s`,
          ['--signature-overclock-bloom' as string]: bloom.toFixed(3),
          ['--signature-overclock-micro-shift' as string]: microShift.toFixed(3),
          ['--signature-overclock-flicker' as string]: flicker.toFixed(3),
          ['--signature-overclock-card-stress' as string]: cardStress.toFixed(3),
        }}
        className={`absolute inset-0 z-[18] pointer-events-none ${
          isOverclockActive ? 'signature-overclock-mode' : ''
        }`}
      >
        <SignatureOverclockAmbientLayer
          active={isOverclockActive}
          scanTick={scanTick}
          scanDurationMs={OVERCLOCK_AMBIENT_PROFILES.critical.scanDurationMs}
        />

        {isOverclockActive && (
          <>
            <div className="absolute top-[30vh] left-[10%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-white rounded-full blur-[150px] opacity-[0.04] signature-overclock-bg-node" />
            <div className="absolute top-[70vh] right-[10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-gray-400 rounded-full blur-[150px] opacity-[0.03] signature-overclock-bg-node signature-overclock-bg-node-alt" />
          </>
        )}
      </motion.div>
    </>
  );
};
