import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import CursorLayer from './CursorLayer';

export type CursorMode = 'magnetic' | 'liquid' | 'orbital' | 'precision' | 'trail';
const CURSOR_MODES: CursorMode[] = ['magnetic', 'liquid', 'orbital', 'precision', 'trail'];
const MODE_LABELS: Record<CursorMode, string> = {
  magnetic: 'Magnetic',
  liquid: 'Liquid',
  orbital: 'Orbital',
  precision: 'Precision',
  trail: 'Light Trail'
};

interface CursorContextType {
  mode: CursorMode;
  nextMode: () => void;
}

const CursorContext = createContext<CursorContextType>({ mode: 'magnetic', nextMode: () => {} });

export const useCursor = () => useContext(CursorContext);

export default function CursorManager({ children }: { children: ReactNode }) {
  const [modeIndex, setModeIndex] = useState(0);
  const [label, setLabel] = useState<string | null>(null);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const mql = window.matchMedia("(pointer: fine)");
    setIsDesktop(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  const nextMode = () => {
    const nextIdx = (modeIndex + 1) % CURSOR_MODES.length;
    setModeIndex(nextIdx);
    setLabel(MODE_LABELS[CURSOR_MODES[nextIdx]]);
  };

  useEffect(() => {
    if (label) {
      const timer = setTimeout(() => setLabel(null), 1000);
      return () => clearTimeout(timer);
    }
  }, [label]);

  return (
    <CursorContext.Provider value={{ mode: CURSOR_MODES[modeIndex], nextMode }}>
      {children}
      {isDesktop && <CursorLayer mode={CURSOR_MODES[modeIndex]} label={label} />}
    </CursorContext.Provider>
  );
}
