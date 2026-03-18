import { useContext } from 'react';
import { UnlockLogicContext } from './unlockLogicContext';

export function useUnlockLogic() {
  const context = useContext(UnlockLogicContext);
  if (!context) {
    throw new Error('useUnlockLogic must be used within UnlockLogicProvider');
  }

  return context;
}
