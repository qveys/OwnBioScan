import { useCallback, useRef, useState } from 'react';

// Optimized state hook that prevents unnecessary re-renders
export const useOptimizedState = <T>(initialValue: T) => {
  const [state, setState] = useState<T>(initialValue);
  const stateRef = useRef<T>(initialValue);

  const setOptimizedState = useCallback((newValue: T | ((prev: T) => T)) => {
    const nextValue = typeof newValue === 'function' 
      ? (newValue as (prev: T) => T)(stateRef.current)
      : newValue;

    // Only update if value actually changed
    if (Object.is(nextValue, stateRef.current)) {
      return;
    }

    stateRef.current = nextValue;
    setState(nextValue);
  }, []);

  return [state, setOptimizedState] as const;
};

// Batched state updates for multiple state changes
export const useBatchedState = <T extends Record<string, any>>(initialState: T) => {
  const [state, setState] = useState<T>(initialState);
  const pendingUpdatesRef = useRef<Partial<T>>({});
  const timeoutRef = useRef<NodeJS.Timeout>();

  const batchedSetState = useCallback((updates: Partial<T>) => {
    // Accumulate updates
    pendingUpdatesRef.current = { ...pendingUpdatesRef.current, ...updates };

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Batch updates in next tick
    timeoutRef.current = setTimeout(() => {
      setState(prev => ({ ...prev, ...pendingUpdatesRef.current }));
      pendingUpdatesRef.current = {};
    }, 0);
  }, []);

  return [state, batchedSetState] as const;
};