import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import type { RetroOrbitRing } from './retroCosmicTokens';
import { retroCosmicTokens } from './retroCosmicTokens';

const toRadians = (degrees: number): number => (degrees * Math.PI) / 180;

const getRotatedEllipsePoint = (ring: RetroOrbitRing, angleDegrees: number) => {
  const theta = toRadians(angleDegrees);
  const localX = ring.rx * Math.cos(theta);
  const localY = ring.ry * Math.sin(theta);
  const rotation = toRadians(ring.rotate);
  const cos = Math.cos(rotation);
  const sin = Math.sin(rotation);

  return {
    x: ring.cx + localX * cos - localY * sin,
    y: ring.cy + localX * sin + localY * cos,
  };
};

const buildOrbitFrames = (
  ring: RetroOrbitRing,
  startAngle: number,
  sampleCount: number,
): { xFrames: number[]; yFrames: number[]; times: number[] } => {
  const xFrames: number[] = [];
  const yFrames: number[] = [];
  const times: number[] = [];

  for (let index = 0; index < sampleCount; index += 1) {
    const progress = index / (sampleCount - 1);
    const point = getRotatedEllipsePoint(ring, startAngle + progress * 360);
    xFrames.push(point.x);
    yFrames.push(point.y);
    times.push(progress);
  }

  return { xFrames, yFrames, times };
};

export const RetroOrbits: React.FC = () => {
  const markerFrames = useMemo(
    () =>
      retroCosmicTokens.orbits.markerTracks.map((track) =>
        buildOrbitFrames(retroCosmicTokens.orbits.rings[track.ringIndex], track.startAngle, 42),
      ),
    [],
  );

  return (
    <motion.svg
      className="absolute inset-0 pointer-events-none z-[4]"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
      animate={{ opacity: [0.52, 0.66, 0.52] }}
      transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
    >
      <defs>
        <linearGradient id="retro-orbit-gradient" x1="10%" y1="20%" x2="85%" y2="80%">
          <stop offset="0%" stopColor={retroCosmicTokens.colors.orbitSecondary} />
          <stop offset="100%" stopColor={retroCosmicTokens.colors.orbitPrimary} />
        </linearGradient>
      </defs>

      <g>
        {retroCosmicTokens.orbits.rings.map((ring, index) => (
          <motion.ellipse
            key={`retro-ring-${index}`}
            cx={ring.cx}
            cy={ring.cy}
            rx={ring.rx}
            ry={ring.ry}
            transform={`rotate(${ring.rotate} ${ring.cx} ${ring.cy})`}
            fill="none"
            stroke="url(#retro-orbit-gradient)"
            strokeWidth={0.22}
            strokeDasharray={ring.dashed ? '2.1 3.3' : 'none'}
            strokeLinecap="round"
            animate={ring.dashed ? { strokeDashoffset: [0, -48] } : undefined}
            transition={ring.dashed ? { duration: 48, repeat: Infinity, ease: 'linear' } : undefined}
          />
        ))}

        {retroCosmicTokens.orbits.arcs.map((arc, index) => (
          <motion.path
            key={`retro-arc-${index}`}
            d={arc.d}
            fill="none"
            stroke={retroCosmicTokens.colors.orbitDashed}
            strokeWidth={0.2}
            strokeLinecap="round"
            strokeDasharray={arc.dashArray}
            opacity={arc.opacity}
            animate={{ strokeDashoffset: [0, -40] }}
            transition={{ duration: 60 + index * 8, repeat: Infinity, ease: 'linear' }}
          />
        ))}

        <path
          d="M 71 14 L 71 21 M 67.5 17.5 L 74.5 17.5"
          stroke={retroCosmicTokens.colors.orbitSecondary}
          strokeWidth={0.22}
          strokeLinecap="round"
          opacity={0.75}
        />
        <path
          d="M 90 46 L 95 46 M 92.5 43.5 L 92.5 48.5"
          stroke={retroCosmicTokens.colors.orbitSecondary}
          strokeWidth={0.2}
          strokeLinecap="round"
          opacity={0.62}
        />
      </g>

      {retroCosmicTokens.orbits.markerTracks.map((track, index) => {
        const frames = markerFrames[index];
        return (
          <motion.circle
            key={`retro-marker-${index}`}
            initial={{
              cx: frames.xFrames[0],
              cy: frames.yFrames[0],
            }}
            animate={{
              cx: frames.xFrames,
              cy: frames.yFrames,
              r: [track.size * 0.92, track.size * 1.08, track.size * 0.92],
            }}
            transition={{
              cx: {
                duration: track.duration,
                repeat: Infinity,
                ease: 'linear',
                times: frames.times,
              },
              cy: {
                duration: track.duration,
                repeat: Infinity,
                ease: 'linear',
                times: frames.times,
              },
              r: {
                duration: 3.4 + index * 0.9,
                repeat: Infinity,
                ease: 'easeInOut',
              },
            }}
            fill={retroCosmicTokens.colors.marker}
            opacity={0.85}
            style={{
              filter: 'drop-shadow(0 0 6px rgba(236, 206, 149, 0.45))',
            }}
          />
        );
      })}
    </motion.svg>
  );
};

