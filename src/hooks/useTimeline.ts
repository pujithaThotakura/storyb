// src/hooks/useTimeline.ts

import { useState, useMemo, useCallback } from 'react';
import { getPixelsPerDay } from '../constants/timeline.constants';
import { ViewMode } from '../types/timeline.types';

export const useTimeline = (initialMode: ViewMode, initialStartDate: Date, initialEndDate: Date) => {
  const [viewMode, setViewMode] = useState<ViewMode>(initialMode);
  const [startDate] = useState(initialStartDate);
  const [endDate] = useState(initialEndDate);
  // Scroll state managed here to allow external components (like a dependency SVG layer) to access it
  const [scrollLeft, setScrollLeft] = useState(0); 
  
  const pixelsPerDay = useMemo(() => getPixelsPerDay(viewMode), [viewMode]);

  const totalDays = useMemo(() => {
    const MS_PER_DAY = 1000 * 60 * 60 * 24;
    return (endDate.getTime() - startDate.getTime()) / MS_PER_DAY;
  }, [startDate, endDate]);

  const totalWidth = useMemo(() => {
    return Math.max(0, totalDays * pixelsPerDay);
  }, [totalDays, pixelsPerDay]);


  const switchViewMode = useCallback((mode: ViewMode) => {
    setViewMode(mode);
  }, []);
  
  /**
   * Updates the synchronized horizontal scroll position. Used by the TimelineView.
   */
  const handleScroll = useCallback((newScrollLeft: number) => {
    setScrollLeft(newScrollLeft);
  }, []);

  return {
    viewMode,
    pixelsPerDay,
    totalWidth,
    startDate,
    endDate,
    scrollLeft,
    switchViewMode,
    handleScroll,
  };
};