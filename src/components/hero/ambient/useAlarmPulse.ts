import { useMemo } from 'react';
import { AMBIENT_PROFILES, type AmbientIntensity } from './criticalAmbientConfig';

export interface AlarmPulseState {
  primaryCycle: number;
  secondaryCycle: number;
  driftCycle: number;
  phaseOffset: number;
}

export function useAlarmPulse(
  active: boolean,
  intensity: AmbientIntensity = 'critical',
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

    const profile = AMBIENT_PROFILES[intensity];
    const baseCycle = ((profile.basePulseSeconds[0] + profile.basePulseSeconds[1]) / 2) * (reducedMotion ? 1.45 : 1);

    return {
      primaryCycle: baseCycle,
      secondaryCycle: baseCycle * 1.7,
      driftCycle: baseCycle * 2.4,
      phaseOffset: -baseCycle * 0.37,
    };
  }, [active, intensity, reducedMotion]);
}
