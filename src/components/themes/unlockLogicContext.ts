import { createContext } from 'react';

export interface UnlockLogicContextValue {
  isUnlocked: boolean;
  unlock: () => void;
  lock: () => void;
  toggle: () => void;
}

export const UnlockLogicContext = createContext<UnlockLogicContextValue | undefined>(undefined);
