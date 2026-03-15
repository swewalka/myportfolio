import { useEffect, useState } from 'react';
import { AMBIENT_PROFILES, type AmbientIntensity, randomBetween } from './criticalAmbientConfig';

export function useGlowBreathing(
  active: boolean,
  intensity: AmbientIntensity = 'critical',
  reducedMotion = false,
) {
  const [bloom, setBloom] = useState(0);
  const [microShift, setMicroShift] = useState(0);

  useEffect(() => {
    if (!active) return;

    const profile = AMBIENT_PROFILES[intensity];
    const timers: number[] = [];
    let cancelled = false;

    const schedule = () => {
      if (cancelled) return;
      const delay = randomBetween(profile.bloomGapMs) * (reducedMotion ? 1.7 : 1);
      const timeout = window.setTimeout(() => {
        if (cancelled) return;
        setBloom(reducedMotion ? 0.25 : 1);
        setMicroShift(reducedMotion ? 0 : 1);

        const settle = window.setTimeout(() => {
          setBloom(0);
          setMicroShift(0);
          schedule();
        }, profile.bloomDurationMs);

        timers.push(settle);
      }, delay);

      timers.push(timeout);
    };

    schedule();

    return () => {
      cancelled = true;
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [active, intensity, reducedMotion]);

  return {
    bloom: active ? bloom : 0,
    microShift: active ? microShift : 0,
  };
}
