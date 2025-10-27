// src/constants/timeline.constants.ts

import { ViewMode } from '../types/timeline.types';

/**
 * Standard height for every row/swimlane in the timeline.
 * Corresponds to Tailwind's h-12 (48px).
 */
export const ROW_HEIGHT_PX = 48; 

/**
 * Defines the pixel width for a standard column cell in each view mode.
 * This directly controls the horizontal scaling (zoom level).
 */
export const VIEW_MODE_COL_WIDTHS: Record<ViewMode, number> = {
  // Day mode: Each column represents 1 day
  day: 40,
  // Week mode: Each column represents 1 week (7 days)
  week: 80,
  // Month mode: Each column represents 1 month (~30.4 days)
  month: 120,
};

/**
 * Calculates how many actual pixels a single day represents for the current view mode.
 * This value is the core multiplier for converting task duration (in days) to pixel width.
 */
export const getPixelsPerDay = (mode: ViewMode): number => {
  switch (mode) {
    case 'day':
      // 40 px / 1 day
      return VIEW_MODE_COL_WIDTHS.day / 1; 
    case 'week':
      // 80 px / 7 days = ~11.43 px/day
      return VIEW_MODE_COL_WIDTHS.week / 7; 
    case 'month':
      // 120 px / 30.4375 days = ~3.94 px/day
      // Uses average month days (30.4375) for a mathematically consistent ratio.
      const AVERAGE_DAYS_IN_MONTH = 30.4375;
      return VIEW_MODE_COL_WIDTHS.month / AVERAGE_DAYS_IN_MONTH; 
    default:
      return VIEW_MODE_COL_WIDTHS.day / 1;
  }
};

/**
 * Defines standard durations in milliseconds.
 */
export const MS_PER_SECOND = 1000;
export const MS_PER_MINUTE = 60 * MS_PER_SECOND;
export const MS_PER_HOUR = 60 * MS_PER_MINUTE;
export const MS_PER_DAY = 24 * MS_PER_HOUR;