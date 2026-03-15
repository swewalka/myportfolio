import { createContext, useContext } from 'react';

export type CursorMode = 'magnetic' | 'liquid' | 'orbital' | 'precision' | 'trail';

export const CURSOR_MODES: CursorMode[] = [
  'magnetic',
  'liquid',
  'orbital',
  'precision',
  'trail',
];

export const MODE_LABELS: Record<CursorMode, string> = {
  magnetic: 'Magnetic',
  liquid: 'Liquid',
  orbital: 'Orbital',
  precision: 'Precision',
  trail: 'Light Trail',
};

interface CursorContextType {
  mode: CursorMode;
  nextMode: () => void;
}

export const CursorContext = createContext<CursorContextType>({
  mode: 'magnetic',
  nextMode: () => {},
});

export const useCursor = () => useContext(CursorContext);
