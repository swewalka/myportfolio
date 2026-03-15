import { useEffect, useState } from 'react';
import {
  OVERCLOCK_AMBIENT_PROFILES,
  type OverclockAmbientIntensity,
  randomBetweenRange,
} from './overclockAmbientConfig';

export function useOverclockSurfaceStress(
  active: boolean,
  intensity: OverclockAmbientIntensity = 'critical',
  reducedMotion = false,
) {
  const [scanTick, setScanTick] = useState(0);
  const [cardStress, setCardStress] = useState(0);

  useEffect(() => {
    if (!active) return;

    const profile = OVERCLOCK_AMBIENT_PROFILES[intensity];
    const timers: number[] = [];
    let cancelled = false;

    const scheduleScan = () => {
      if (cancelled) return;
      const delay = randomBetweenRange(profile.scanGapMs) * (reducedMotion ? 2 : 1);
      const timeout = window.setTimeout(() => {
        if (cancelled) return;
        setScanTick((value) => value + 1);
        setCardStress(reducedMotion ? 0.2 : randomBetweenRange([0.22, 0.48]));
        const settle = window.setTimeout(() => setCardStress(0), profile.scanDurationMs * 0.7);
        const repeat = window.setTimeout(scheduleScan, profile.scanDurationMs * 0.4);
        timers.push(settle, repeat);
      }, delay);
      timers.push(timeout);
    };

    scheduleScan();

    return () => {
      cancelled = true;
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [active, intensity, reducedMotion]);

  return {
    scanTick: active ? scanTick : 0,
    cardStress: active ? cardStress : 0,
  };
}
