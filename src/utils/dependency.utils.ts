// src/utils/dependency.utils.ts

import { TimelineTask, TaskCoordinates } from '../types/timeline.types';
import { ROW_HEIGHT_PX } from '../constants/timeline.constants';

// Re-export utility functions from position.utils to satisfy dependencies
type PositionFn = (date: Date, startDate: Date, pixelsPerDay: number) => number;
type WidthFn = (startDate: Date, endDate: Date, pixelsPerDay: number) => number;


/**
 * Calculates the pixel coordinates of a task bar relative to the timeline body container.
 */
export const calculateTaskCoordinates = (
  task: TimelineTask,
  viewStartDate: Date,
  pixelsPerDay: number,
  rowIndex: number,
  calculatePosition: PositionFn,
  calculateDurationWidth: WidthFn
): TaskCoordinates => {
  const left = calculatePosition(task.startDate, viewStartDate, pixelsPerDay);
  const width = calculateDurationWidth(task.startDate, task.endDate, pixelsPerDay);
  
  // TaskBar height is 32px (h-8), positioned with an 8px top margin in a 48px row
  const taskHeight = 32; 
  const topOffsetInRow = 8;
  const top = (rowIndex * ROW_HEIGHT_PX) + topOffsetInRow;

  return {
    id: task.id,
    left: left,
    top: top,
    width: width,
    height: taskHeight,
  };
};

export interface DependencySegment {
    from: TaskCoordinates;
    to: TaskCoordinates;
}

/**
 * Generates an array of all dependency line segments to be rendered by DependencyLine.tsx.
 */
export const generateDependencySegments = (
  tasks: Record<string, TimelineTask>,
  taskCoordinates: Record<string, TaskCoordinates>
): DependencySegment[] => {
  const segments: DependencySegment[] = [];

  Object.values(tasks).forEach(task => {
    const fromCoords = taskCoordinates[task.id];
    
    if (task.dependencies && fromCoords) {
      task.dependencies.forEach(depId => {
        const toCoords = taskCoordinates[depId];

        // Ensure the dependency exists and has coordinates
        if (toCoords) {
          segments.push({
            from: fromCoords,
            to: toCoords,
          });
        }
      });
    }
  });

  return segments;
};