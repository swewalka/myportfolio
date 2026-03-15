import React from 'react';
import { motion } from 'framer-motion';

export const BlueprintTransitionLayer: React.FC = () => {
  const constructionLines = [
    { id: 'h-1', axis: 'h', style: { top: '17%' }, delay: 0.05 },
    { id: 'h-2', axis: 'h', style: { top: '33%' }, delay: 0.2 },
    { id: 'h-3', axis: 'h', style: { top: '62%' }, delay: 0.36 },
    { id: 'h-4', axis: 'h', style: { top: '79%' }, delay: 0.48 },
    { id: 'v-1', axis: 'v', style: { left: '12%' }, delay: 0.14 },
    { id: 'v-2', axis: 'v', style: { left: '28%' }, delay: 0.28 },
    { id: 'v-3', axis: 'v', style: { left: '74%' }, delay: 0.42 },
    { id: 'v-4', axis: 'v', style: { left: '88%' }, delay: 0.58 },
  ] as const;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: 'linear' }}
      className="blueprint-draft-layer absolute inset-0 pointer-events-none z-0"
    >
      <div className="blueprint-draft-paper" />
      <div className="blueprint-draft-grid-minor" />
      <div className="blueprint-draft-grid-major" />
      <div className="blueprint-draft-frame" />

      <div className="blueprint-draft-corner blueprint-draft-corner--tl" />
      <div className="blueprint-draft-corner blueprint-draft-corner--tr" />
      <div className="blueprint-draft-corner blueprint-draft-corner--bl" />
      <div className="blueprint-draft-corner blueprint-draft-corner--br" />

      {constructionLines.map((line) => {
        const horizontal = line.axis === 'h';
        return (
          <motion.div
            key={line.id}
            className={`blueprint-draft-construction-line ${
              horizontal
                ? 'blueprint-draft-construction-line--h'
                : 'blueprint-draft-construction-line--v'
            }`}
            style={line.style}
            initial={horizontal ? { scaleX: 0, opacity: 0 } : { scaleY: 0, opacity: 0 }}
            animate={horizontal ? { scaleX: 1, opacity: 0.9 } : { scaleY: 1, opacity: 0.9 }}
            transition={{ duration: 0.9, delay: line.delay, ease: 'linear' }}
          />
        );
      })}

      <div className="blueprint-draft-crosshair blueprint-draft-crosshair--pulse left-[17%] top-[41%]">
        <i />
      </div>
      <div className="blueprint-draft-crosshair left-[79%] top-[36%]">
        <i />
      </div>
      <div className="blueprint-draft-crosshair blueprint-draft-crosshair--pulse left-[64%] top-[66%]">
        <i />
      </div>

      <div className="blueprint-draft-dimension-label left-[11%] top-[25%]">X-REF 112</div>
      <div className="blueprint-draft-dimension-label right-[9%] top-[52%]">Y-AXIS 04</div>
      <div className="blueprint-draft-dimension-label left-[43%] bottom-[18%]">SCALE 1:20</div>

      <svg
        className="blueprint-draft-overlay"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        <defs>
          <marker
            id="draft-arrow"
            markerWidth="4"
            markerHeight="4"
            refX="2"
            refY="2"
            orient="auto"
          >
            <path d="M0,0 L4,2 L0,4 Z" fill="rgba(74, 65, 53, 0.45)" />
          </marker>
        </defs>

        <motion.line
          x1="20"
          y1="31"
          x2="80"
          y2="31"
          className="blueprint-draft-guide-line"
          markerStart="url(#draft-arrow)"
          markerEnd="url(#draft-arrow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.25, ease: 'linear', delay: 0.25 }}
        />

        <motion.line
          x1="18"
          y1="30"
          x2="18"
          y2="63"
          markerStart="url(#draft-arrow)"
          markerEnd="url(#draft-arrow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.05, ease: 'linear', delay: 0.4 }}
        />

        <line x1="19.8" y1="31" x2="19.8" y2="58.6" />
        <line x1="80.2" y1="31" x2="80.2" y2="58.6" />
        <line x1="18" y1="30.2" x2="39" y2="30.2" />
        <line x1="18" y1="63" x2="39" y2="63" />
        <line x1="50" y1="14" x2="50" y2="88" strokeDasharray="0.8 0.8" />
        <line x1="10" y1="46" x2="90" y2="46" strokeDasharray="0.8 0.8" />
        <path d="M61 55 L66 55 L66 64 L73 64" strokeDasharray="1 0.8" />

        <text x="49.8" y="29">TITLE WIDTH</text>
        <text x="19.7" y="47">STACK HEIGHT</text>
        <text x="73.2" y="64">BTN ALIGN</text>
        <text x="11.2" y="11">WORKSHEET A</text>
      </svg>
    </motion.div>
  );
};
