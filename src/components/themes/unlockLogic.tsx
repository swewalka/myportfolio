import { useMemo, useState, type ReactNode } from 'react';
import { UnlockLogicContext, type UnlockLogicContextValue } from './unlockLogicContext';

export function UnlockLogicProvider({ children }: { children: ReactNode }) {
  const [isUnlocked, setIsUnlocked] = useState(false);

  const value = useMemo<UnlockLogicContextValue>(
    () => ({
      isUnlocked,
      unlock: () => setIsUnlocked(true),
      lock: () => setIsUnlocked(false),
      toggle: () => setIsUnlocked((previous) => !previous),
    }),
    [isUnlocked],
  );

  return <UnlockLogicContext.Provider value={value}>{children}</UnlockLogicContext.Provider>;
}
