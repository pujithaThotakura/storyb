// src/utils/date.utils.ts

import { ViewMode, TimelineHeaderColumn } from '../types/timeline.types';
import { VIEW_MODE_COL_WIDTHS } from '../constants/timeline.constants';

/**
 * Generates the array of columns (headers) for the timeline axis.
 */
export const generateTimeAxis = (startDate: Date, endDate: Date, viewMode: ViewMode): TimelineHeaderColumn[] => {
  const columns: TimelineHeaderColumn[] = [];
  let currentDate = new Date(startDate);
  const columnWidth = VIEW_MODE_COL_WIDTHS[viewMode];
  
  // Ensure the iteration includes the entire range
  const loopEndDate = new Date(endDate);
  loopEndDate.setDate(loopEndDate.getDate() + 1); 

  while (currentDate < loopEndDate) {
    let label = '';
    
    // Create a new date object for the column to prevent reference issues
    const colDate = new Date(currentDate);

    if (viewMode === 'day') {
        // Example: 'Oct 27'
        label = colDate.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
        currentDate.setDate(currentDate.getDate() + 1);
    } else if (viewMode === 'week') {
        // Example: 'Oct 27' (Start of the week)
        label = colDate.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
        currentDate.setDate(currentDate.getDate() + 7); // Move to next week
    } else if (viewMode === 'month') {
        // Example: 'October 2025'
        label = colDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
        currentDate.setMonth(currentDate.getMonth() + 1); // Move to next month
    }
    
    columns.push({
      key: colDate.toISOString(),
      label,
      date: colDate,
      width: columnWidth,
    });
  }

  return columns;
};

/**
 * Utility to get the start of the week (e.g., Sunday or Monday, depending on locale/preference).
 * Using Monday (1) as the start day for consistent timeline display.
 */
export const getWeekStart = (date: Date): Date => {
  const d = new Date(date);
  const day = d.getDay(); // 0 for Sunday, 1 for Monday
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Go back to Monday
  d.setDate(diff);
  d.setHours(0, 0, 0, 0);
  return d;
};