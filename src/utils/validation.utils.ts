// src/utils/validation.utils.ts

import { TimelineTask } from '../types/timeline.types';

/**
 * Validates a single task update against core business rules.
 * @param task The original task object.
 * @param updates Partial updates being applied to the task.
 * @returns An array of error messages (strings) or an empty array if valid.
 */
export const validateTaskUpdate = (
  task: TimelineTask,
  updates: Partial<TimelineTask>
): string[] => {
  const errors: string[] = [];
  
  // Use the new dates if provided, otherwise use the original task dates
  const newStartDate = updates.startDate instanceof Date ? updates.startDate : task.startDate;
  const newEndDate = updates.endDate instanceof Date ? updates.endDate : task.endDate;
  const newProgress = updates.progress !== undefined ? updates.progress : task.progress;
  const newTitle = updates.title !== undefined ? updates.title : task.title;

  // --- Rule 1: Start Date must be before or equal to End Date ---
  if (newStartDate.getTime() > newEndDate.getTime()) {
    errors.push("The start date cannot be after the end date.");
  }

  // --- Rule 2: Title cannot be empty ---
  if (newTitle.trim().length === 0) {
    errors.push("Task title cannot be empty.");
  }

  // --- Rule 3: Progress must be a valid percentage ---
  if (newProgress < 0 || newProgress > 100) {
    errors.push("Progress must be between 0 and 100.");
  }

  // --- Rule 4: Dependency Constraint (Example of complex validation) ---
  // If the task depends on others, ensure its start date is NOT before the
  // dependency's end date. (This would require passing all tasks, simplified here)
  /*
  if (task.dependencies && task.dependencies.length > 0) {
    // Simplified check: validation logic would go here
    // errors.push("Dependency violation: Task starts before a prerequisite task finishes.");
  }
  */

  return errors;
};

/**
 * Validates a dependency link between two tasks.
 * @param prerequisiteEndDate The end date of the task being depended on.
 * @param dependentStartDate The start date of the task that depends on the prerequisite.
 * @returns true if the dependent task starts after or on the day the prerequisite ends.
 */
export const validateDependencyOrder = (
  prerequisiteEndDate: Date,
  dependentStartDate: Date
): boolean => {
  // Clear time for comparison to check against day boundaries
  const prerequisiteDayEnd = new Date(prerequisiteEndDate);
  prerequisiteDayEnd.setHours(0, 0, 0, 0);

  const dependentDayStart = new Date(dependentStartDate);
  dependentDayStart.setHours(0, 0, 0, 0);

  // The dependent task must start on the same day the prerequisite ends, or later.
  return dependentDayStart.getTime() >= prerequisiteDayEnd.getTime();
};