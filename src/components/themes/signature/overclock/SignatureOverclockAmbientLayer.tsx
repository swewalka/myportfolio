import { AnimatePresence, motion } from 'framer-motion';

interface SignatureOverclockAmbientLayerProps {
  active: boolean;
  scanTick: number;
  scanDurationMs: number;
}

export const SignatureOverclockAmbientLayer: React.FC<SignatureOverclockAmbientLayerProps> = ({
  active,
  scanTick,
  scanDurationMs,
}) => {
  if (!active) return null;

  return (
    <div
      className="signature-overclock-ambient-layer absolute inset-0 pointer-events-none z-[21]"
      aria-hidden="true"
    >
      <div className="signature-overclock-bg-breath signature-overclock-bg-breath-primary" />
      <div className="signature-overclock-bg-breath signature-overclock-bg-breath-secondary" />
      <div className="signature-overclock-system-flicker" />

      <AnimatePresence mode="popLayout">
        {scanTick > 0 && (
          <motion.div
            key={scanTick}
            initial={{ opacity: 0, y: '-25%' }}
            animate={{ opacity: [0, 0.16, 0.08, 0], y: ['-25%', '120%'] }}
            exit={{ opacity: 0 }}
            transition={{
              duration: scanDurationMs / 1000,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="signature-overclock-diagnostic-scan"
          />
        )}
      </AnimatePresence>
    </div>
  );
};
