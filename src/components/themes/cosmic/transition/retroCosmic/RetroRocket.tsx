import React, { useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { retroCosmicTokens, type RetroRocketTrajectory } from './retroCosmicTokens';
import { useRocketFlight } from './useRocketFlight';

interface SampledRocketFrames {
  xFrames: number[];
  yFrames: number[];
  rotateFrames: number[];
  times: number[];
}

const getBezierPoint = (trajectory: RetroRocketTrajectory, t: number) => {
  const [x0, y0] = trajectory.start;
  const [x1, y1] = trajectory.c1;
  const [x2, y2] = trajectory.c2;
  const [x3, y3] = trajectory.end;
  const oneMinusT = 1 - t;

  return {
    x:
      oneMinusT * oneMinusT * oneMinusT * x0 +
      3 * oneMinusT * oneMinusT * t * x1 +
      3 * oneMinusT * t * t * x2 +
      t * t * t * x3,
    y:
      oneMinusT * oneMinusT * oneMinusT * y0 +
      3 * oneMinusT * oneMinusT * t * y1 +
      3 * oneMinusT * t * t * y2 +
      t * t * t * y3,
  };
};

const getBezierTangent = (trajectory: RetroRocketTrajectory, t: number) => {
  const [x0, y0] = trajectory.start;
  const [x1, y1] = trajectory.c1;
  const [x2, y2] = trajectory.c2;
  const [x3, y3] = trajectory.end;
  const oneMinusT = 1 - t;

  return {
    x:
      3 * oneMinusT * oneMinusT * (x1 - x0) +
      6 * oneMinusT * t * (x2 - x1) +
      3 * t * t * (x3 - x2),
    y:
      3 * oneMinusT * oneMinusT * (y1 - y0) +
      6 * oneMinusT * t * (y2 - y1) +
      3 * t * t * (y3 - y2),
  };
};

const sampleTrajectory = (trajectory: RetroRocketTrajectory, sampleCount: number): SampledRocketFrames => {
  const xFrames: number[] = [];
  const yFrames: number[] = [];
  const rotateFrames: number[] = [];
  const times: number[] = [];

  for (let index = 0; index < sampleCount; index += 1) {
    const t = index / (sampleCount - 1);
    const point = getBezierPoint(trajectory, t);
    const tangent = getBezierTangent(trajectory, t);
    const heading = (Math.atan2(tangent.y, tangent.x) * 180) / Math.PI;

    xFrames.push(point.x);
    yFrames.push(point.y);
    rotateFrames.push(heading + 90);
    times.push(t);
  }

  return { xFrames, yFrames, rotateFrames, times };
};

const trajectoryToPath = (trajectory: RetroRocketTrajectory): string => {
  const [sx, sy] = trajectory.start;
  const [c1x, c1y] = trajectory.c1;
  const [c2x, c2y] = trajectory.c2;
  const [ex, ey] = trajectory.end;
  return `M ${sx} ${sy} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${ex} ${ey}`;
};

export const RetroRocket: React.FC = () => {
  const { isInFlight, trajectoryIndex, durationMs, flightId } = useRocketFlight({
    trajectoryCount: retroCosmicTokens.rocket.trajectories.length,
    minIntervalMs: retroCosmicTokens.rocket.minIntervalMs,
    maxIntervalMs: retroCosmicTokens.rocket.maxIntervalMs,
    minDurationMs: retroCosmicTokens.rocket.minDurationMs,
    maxDurationMs: retroCosmicTokens.rocket.maxDurationMs,
  });

  const selectedTrajectory = retroCosmicTokens.rocket.trajectories[trajectoryIndex];

  const sampledFrames = useMemo(
    () => sampleTrajectory(selectedTrajectory, 28),
    [selectedTrajectory],
  );

  return (
    <AnimatePresence mode="wait">
      {isInFlight && (
        <motion.svg
          key={`retro-rocket-flight-${flightId}`}
          className="absolute inset-0 pointer-events-none z-[5]"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <motion.path
            d={trajectoryToPath(selectedTrajectory)}
            fill="none"
            stroke="rgba(184, 222, 234, 0.26)"
            strokeWidth={0.15}
            strokeDasharray="1.6 2.8"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0, 0.4, 0] }}
            exit={{ opacity: 0 }}
            transition={{
              duration: durationMs / 1000,
              ease: 'linear',
              opacity: { duration: durationMs / 1000, times: [0, 0.2, 1], ease: 'linear' },
            }}
          />

          <motion.g
            initial={{ opacity: 0, scale: 0.24 }}
            animate={{
              x: sampledFrames.xFrames,
              y: sampledFrames.yFrames,
              rotate: sampledFrames.rotateFrames,
              opacity: [0, 1, 1, 0],
              scale: [0.24, 0.28, 0.28, 0.24],
            }}
            exit={{ opacity: 0 }}
            transition={{
              x: {
                duration: durationMs / 1000,
                ease: 'linear',
                times: sampledFrames.times,
              },
              y: {
                duration: durationMs / 1000,
                ease: 'linear',
                times: sampledFrames.times,
              },
              rotate: {
                duration: durationMs / 1000,
                ease: 'linear',
                times: sampledFrames.times,
              },
              opacity: {
                duration: durationMs / 1000,
                ease: 'linear',
                times: [0, 0.08, 0.9, 1],
              },
              scale: {
                duration: durationMs / 1000,
                ease: 'easeInOut',
                times: [0, 0.12, 0.9, 1],
              },
            }}
            style={{
              filter: 'drop-shadow(0 0 10px rgba(255, 222, 161, 0.4))',
            }}
          >
            <path
              d="M 0 -2.8 L 1.55 0.7 L 0 3.4 L -1.55 0.7 Z"
              fill={retroCosmicTokens.colors.rocketBody}
              stroke="rgba(255, 236, 201, 0.8)"
              strokeWidth={0.1}
            />
            <circle cx={0} cy={0.2} r={0.4} fill={retroCosmicTokens.colors.rocketAccent} opacity={0.92} />
            <path d="M -1.55 1.3 L -2.45 2.4 L -1.1 2.2 Z" fill="rgba(132, 185, 199, 0.86)" />
            <path d="M 1.55 1.3 L 2.45 2.4 L 1.1 2.2 Z" fill="rgba(132, 185, 199, 0.86)" />

            <motion.path
              d="M 0 3.4 C 0 4.9 0 6.6 0 8.4"
              fill="none"
              stroke={retroCosmicTokens.colors.rocketTrail}
              strokeWidth={0.42}
              strokeLinecap="round"
              animate={{
                opacity: [0.28, 0.8, 0.28],
                pathLength: [0.28, 1, 0.28],
              }}
              transition={{
                duration: 0.72,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </motion.g>
        </motion.svg>
      )}
    </AnimatePresence>
  );
};
