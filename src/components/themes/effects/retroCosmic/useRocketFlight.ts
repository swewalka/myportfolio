import { useEffect, useRef, useState } from 'react';

interface UseRocketFlightOptions {
  trajectoryCount: number;
  minIntervalMs: number;
  maxIntervalMs: number;
  minDurationMs: number;
  maxDurationMs: number;
}

interface RocketFlightState {
  isInFlight: boolean;
  trajectoryIndex: number;
  durationMs: number;
  flightId: number;
}

const randomInRange = (min: number, max: number): number => {
  const low = Math.min(min, max);
  const high = Math.max(min, max);
  return Math.floor(Math.random() * (high - low + 1)) + low;
};

export const useRocketFlight = ({
  trajectoryCount,
  minIntervalMs,
  maxIntervalMs,
  minDurationMs,
  maxDurationMs,
}: UseRocketFlightOptions): RocketFlightState => {
  const [flightState, setFlightState] = useState<RocketFlightState>({
    isInFlight: false,
    trajectoryIndex: 0,
    durationMs: minDurationMs,
    flightId: 0,
  });

  const waitTimeoutRef = useRef<number | null>(null);
  const flightTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (trajectoryCount <= 0) {
      return;
    }

    let cancelled = false;

    const clearTimers = () => {
      if (waitTimeoutRef.current !== null) {
        window.clearTimeout(waitTimeoutRef.current);
        waitTimeoutRef.current = null;
      }
      if (flightTimeoutRef.current !== null) {
        window.clearTimeout(flightTimeoutRef.current);
        flightTimeoutRef.current = null;
      }
    };

    const scheduleNextLaunch = () => {
      const waitTime = randomInRange(minIntervalMs, maxIntervalMs);
      waitTimeoutRef.current = window.setTimeout(() => {
        if (cancelled) {
          return;
        }

        const durationMs = randomInRange(minDurationMs, maxDurationMs);
        const trajectoryIndex = randomInRange(0, trajectoryCount - 1);

        setFlightState((previous) => ({
          isInFlight: true,
          durationMs,
          trajectoryIndex,
          flightId: previous.flightId + 1,
        }));

        flightTimeoutRef.current = window.setTimeout(() => {
          if (cancelled) {
            return;
          }

          setFlightState((previous) => ({
            ...previous,
            isInFlight: false,
          }));

          scheduleNextLaunch();
        }, durationMs);
      }, waitTime);
    };

    scheduleNextLaunch();

    return () => {
      cancelled = true;
      clearTimers();
    };
  }, [maxDurationMs, maxIntervalMs, minDurationMs, minIntervalMs, trajectoryCount]);

  return flightState;
};

