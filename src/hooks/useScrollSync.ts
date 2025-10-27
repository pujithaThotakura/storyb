// src/hooks/useScrollSync.ts

import { useState, useCallback, useEffect, RefObject } from 'react';

/**
 * Custom hook to manage and synchronize horizontal scroll positions
 * between two or more elements (e.g., Timeline Header and Timeline Body).
 * * @returns {number} scrollLeft - The current synchronized scroll position.
 * @returns {(scrollX: number) => void} setScrollLeft - Function to update the synchronized scroll position.
 */
export const useScrollSync = () => {
  const [scrollLeft, setScrollLeft] = useState(0);

  /**
   * Updates the scroll position. This should be called by the element that
   * *receives* the user's scroll event (the Timeline Body).
   */
  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    // We only update the state if the scroll position actually changes
    if (e.currentTarget.scrollLeft !== scrollLeft) {
      setScrollLeft(e.currentTarget.scrollLeft);
    }
  }, [scrollLeft]);

  /**
   * Synchronizes the scroll position across multiple element references.
   * This is called in useEffect when 'scrollLeft' changes.
   */
  const syncScrollToElements = useCallback((refs: RefObject<HTMLElement>[]) => {
    refs.forEach(ref => {
      if (ref.current && ref.current.scrollLeft !== scrollLeft) {
        ref.current.scrollLeft = scrollLeft;
      }
    });
  }, [scrollLeft]);

  return { 
    scrollLeft, 
    handleScroll,
    syncScrollToElements,
  };
};