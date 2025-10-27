// src/hooks/useZoom.ts

import { useState, useMemo, useCallback } from 'react';
import { getPixelsPerDay } from '../constants/timeline.constants';
import { ViewMode } from '../types/timeline.types';

interface UseZoomReturn {
  viewMode: ViewMode;
  pixelsPerDay: number;
  totalWidth: number;
  switchViewMode: (mode: ViewMode) => void;
}

/**
 * Manages the current zoom level (ViewMode) of the timeline
 * and calculates the derived properties (pixelsPerDay, totalWidth).
 */
export const useZoom = (
  initialMode: ViewMode,
  startDate: Date,
  endDate: Date
): UseZoomReturn => {
  const [viewMode, setViewMode] = useState<ViewMode>(initialMode);
  
  // Calculate the fundamental unit: pixels per day
  const pixelsPerDay = useMemo(() => getPixelsPerDay(viewMode), [viewMode]);

  // Calculate total days in the timeline range
  const totalDays = useMemo(() => {
    const MS_PER_DAY = 1000 * 60 * 60 * 24;
    return (endDate.getTime() - startDate.getTime()) / MS_PER_DAY;
  }, [startDate, endDate]);

  // Calculate the total required width in pixels
  const totalWidth = useMemo(() => {
    return Math.max(0, totalDays * pixelsPerDay);
  }, [totalDays, pixelsPerDay]);

  // Handler to change the view mode
  const switchViewMode = useCallback((mode: ViewMode) => {
    setViewMode(mode);
  }, []);

  return {
    viewMode,
    pixelsPerDay,
    totalWidth,
    switchViewMode,
  };
};