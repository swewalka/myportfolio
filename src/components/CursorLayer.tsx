import { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import type { CursorMode } from './CursorManager';

export default function CursorLayer({ mode, label }: { mode: CursorMode; label: string | null }) {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const [isHovering, setIsHovering] = useState(false);
  const [velocity, setVelocity] = useState(0);
  const lastTime = useRef(performance.now());
  const lastPos = useRef({ x: -100, y: -100 });

  const smoothX = useSpring(mouseX, { damping: 25, stiffness: 200, mass: 0.5 });
  const smoothY = useSpring(mouseY, { damping: 25, stiffness: 200, mass: 0.5 });

  const slowX = useSpring(mouseX, { damping: 40, stiffness: 100, mass: 1 });
  const slowY = useSpring(mouseY, { damping: 40, stiffness: 100, mass: 1 });

  useEffect(() => {
    let animationFrameId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const target = e.target as HTMLElement;
      const isClickable = target?.closest('button, a, [role="button"], [class*="cursor-pointer"]');
      setIsHovering(!!isClickable);

      // We handle velocity in RAF for smoothness
      if (!animationFrameId) {
        animationFrameId = requestAnimationFrame(updateVelocity);
      }
    };

    const updateVelocity = () => {
      const now = performance.now();
      const dt = Math.max(now - lastTime.current, 1);
      const x = mouseX.get();
      const y = mouseY.get();
      const dx = x - lastPos.current.x;
      const dy = y - lastPos.current.y;
      const speed = Math.sqrt(dx * dx + dy * dy) / dt;
      
      // smooth velocity
      setVelocity(prev => prev * 0.8 + speed * 0.2);

      lastTime.current = now;
      lastPos.current = { x, y };

      animationFrameId = requestAnimationFrame(updateVelocity);
    };

    window.addEventListener('mousemove', onMouseMove);
    animationFrameId = requestAnimationFrame(updateVelocity);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]" style={{ mixBlendMode: 'difference' }}>
      <AnimatePresence>
        {mode === 'magnetic' && (
          <motion.div 
            key="magnetic-bg"
            className="absolute top-0 left-0"
            style={{ x: smoothX, y: smoothY }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
          >
            <div className={`w-12 h-12 -ml-6 -mt-6 rounded-full border border-white/30 transition-all duration-300 ${isHovering ? 'bg-white/20 scale-150' : 'bg-transparent scale-100'}`} />
          </motion.div>
        )}

        {mode === 'trail' && (
          <motion.div 
            key="trail-bg"
            className="absolute top-0 left-0"
            style={{ x: slowX, y: slowY }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="w-8 h-8 -ml-4 -mt-4 bg-white/40 blur-md rounded-full" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        className="absolute top-0 left-0"
        style={{ x: mouseX, y: mouseY }}
        animate={{ scale: isHovering ? 1.5 : 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2 }}
          >
            {mode === 'magnetic' && <MagneticCursor />}
            {mode === 'liquid' && <LiquidCursor velocity={velocity} />}
            {mode === 'orbital' && <OrbitalCursor velocity={velocity} hovering={isHovering} />}
            {mode === 'precision' && <PrecisionCursor hovering={isHovering} />}
            {mode === 'trail' && <TrailCursor />}
          </motion.div>
        </AnimatePresence>

        <AnimatePresence>
          {label && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 30 }}
              exit={{ opacity: 0, x: 20 }}
              className="absolute top-[-8px] whitespace-nowrap text-xs text-white uppercase tracking-[0.2em] font-medium"
            >
              {label}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

function MagneticCursor() {
  return <div className="w-2 h-2 -ml-1 -mt-1 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]" />;
}

function LiquidCursor({ velocity }: { velocity: number }) {
  const stretch = Math.min(1 + velocity * 0.5, 2.5);
  return (
    <motion.div 
      className="w-5 h-5 -ml-2.5 -mt-2.5 bg-white rounded-full"
      animate={{ 
        scaleX: stretch, 
        scaleY: 1 / Math.max(stretch * 0.5, 1),
        rotate: velocity > 1 ? velocity * 10 : 0
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    />
  );
}

function OrbitalCursor({ velocity, hovering }: { velocity: number; hovering: boolean }) {
  const speed = 2 + velocity * 5;
  return (
    <div className="relative flex items-center justify-center -ml-1 -mt-1">
      <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white]" />
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 4 / Math.max(speed, 1), repeat: Infinity, ease: 'linear' }}
        className={`absolute border border-white/30 rounded-full transition-all duration-300 ${hovering ? 'w-12 h-12 -left-5 -top-5' : 'w-8 h-8 -left-3 -top-3'}`}
      >
        <div className="absolute top-[-2px] left-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_white]" />
        <div className="absolute bottom-[-2px] left-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_white]" />
      </motion.div>
    </div>
  );
}

function PrecisionCursor({ hovering }: { hovering: boolean }) {
  return (
    <div className="relative flex items-center justify-center -ml-px -mt-px">
      <div className="w-1 h-1 -ml-0.5 -mt-0.5 bg-white rounded-full" />
      <motion.div 
        animate={{ scale: hovering ? 0.8 : 1 }}
        className="absolute w-8 h-8 -ml-4 -mt-4 border border-white/50 rounded-full"
      />
      <div className="absolute w-12 h-[1px] -left-6 bg-white/50" />
      <div className="absolute h-12 w-[1px] -top-6 bg-white/50" />
    </div>
  );
}

function TrailCursor() {
  return <div className="w-3 h-3 -ml-1.5 -mt-1.5 bg-white rounded-full shadow-[0_0_15px_white]" />;
}
