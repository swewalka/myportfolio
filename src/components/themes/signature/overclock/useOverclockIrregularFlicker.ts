import { useEffect, useState } from 'react';
import {
  OVERCLOCK_AMBIENT_PROFILES,
  type OverclockAmbientIntensity,
  randomBetweenRange,
} from './overclockAmbientConfig';

export function useOverclockIrregularFlicker(
  active: boolean,
  intensity: OverclockAmbientIntensity = 'critical',
  reducedMotion = false,
) {
  const [flicker, setFlicker] = useState(0);

  useEffect(() => {
    if (!active) return;

    const profile = OVERCLOCK_AMBIENT_PROFILES[intensity];
    const timers: number[] = [];
    let cancelled = false;

    const schedule = () => {
      if (cancelled) return;
      const delay = randomBetweenRange(profile.flickerGapMs) * (reducedMotion ? 1.8 : 1);
      const timeout = window.setTimeout(() => {
        if (cancelled) return;
        const spikeStrength = reducedMotion ? 0.12 : randomBetweenRange([0.12, 0.32]);
        const burstCount = Math.random() > 0.7 && !reducedMotion ? 2 : 1;

        for (let index = 0; index < burstCount; index += 1) {
          const startDelay = index * 42;
          const on = window.setTimeout(() => {
            setFlicker(spikeStrength);
          }, startDelay);

          const off = window.setTimeout(() => {
            setFlicker(0);
          }, startDelay + randomBetweenRange(profile.flickerDurationMs));

          timers.push(on, off);
        }

        const resume = window.setTimeout(schedule, 180);
        timers.push(resume);
      }, delay);

      timers.push(timeout);
    };

    schedule();

    return () => {
      cancelled = true;
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [active, intensity, reducedMotion]);

  return active ? flicker : 0;
}
