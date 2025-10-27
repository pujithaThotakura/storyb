// src/utils/position.utils.ts

const MS_PER_DAY = 1000 * 60 * 60 * 24;

/**
 * Calculates the X-position (left offset in pixels) of a specific date
 * relative to the entire timeline view's start date.
 */
export const calculatePosition = (date: Date, viewStartDate: Date, pixelsPerDay: number): number => {
  // Calculate the total number of days elapsed since the view started
  const daysSinceStart = (date.getTime() - viewStartDate.getTime()) / MS_PER_DAY;
  
  // Convert days to pixels
  return daysSinceStart * pixelsPerDay;
};

/**
 * Calculates the width of a task bar in pixels based on its start and end dates.
 */
export const calculateDurationWidth = (startDate: Date, endDate: Date, pixelsPerDay: number): number => {
  // Calculate duration in days
  const durationDays = (endDate.getTime() - startDate.getTime()) / MS_PER_DAY;
  
  // Ensure a minimum width of 1px for milestones or very short tasks
  return Math.max(1, Math.round(durationDays * pixelsPerDay));
};

/**
 * Calculates a new date based on a pixel position (used when dragging/resizing a task).
 */
export const calculateDateFromPosition = (position: number, viewStartDate: Date, pixelsPerDay: number): Date => {
  if (pixelsPerDay === 0) return viewStartDate;
  
  // Convert pixels back to days
  const days = Math.round(position / pixelsPerDay);
  
  // Calculate the new date
  const newDate = new Date(viewStartDate);
  newDate.setDate(newDate.getDate() + days);
  
  // Clear time components to ensure the date aligns perfectly to midnight (day boundary)
  newDate.setHours(0, 0, 0, 0); 

  return newDate;
};