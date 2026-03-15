import { useMemo } from 'react';
import {
  OVERCLOCK_AMBIENT_PROFILES,
  type OverclockAmbientIntensity,
} from './overclockAmbientConfig';

export interface AlarmPulseState {
  primaryCycle: number;
  secondaryCycle: number;
  driftCycle: number;
  phaseOffset: number;
}

export function useOverclockAlarmPulse(
  active: boolean,
  intensity: OverclockAmbientIntensity = 'critical',
  reducedMotion = false,
): AlarmPulseState {
  return useMemo(() => {
    if (!active) {
      return {
        primaryCycle: 4.2,
        secondaryCycle: 7.1,
        driftCycle: 10.2,
        phaseOffset: 0,
      };
    }

    const profile = OVERCLOCK_AMBIENT_PROFILES[intensity];
    const baseCycle = ((profile.basePulseSeconds[0] + profile.basePulseSeconds[1]) / 2) * (reducedMotion ? 1.45 : 1);

    return {
      primaryCycle: baseCycle,
      secondaryCycle: baseCycle * 1.7,
      driftCycle: baseCycle * 2.4,
      phaseOffset: -baseCycle * 0.37,
    };
  }, [active, intensity, reducedMotion]);
}
