// src/types/timeline.types.ts

// --- 1. Data Models (Core Business Objects) ---

/**
 * Defines the structure for a single task within the timeline.
 */
export interface TimelineTask {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  progress: number; // 0-100
  assignee?: string;
  rowId: string; // The ID of the row/resource this task belongs to
  dependencies?: string[]; // IDs of tasks this task is dependent upon
  color?: string; // Custom color override
  isMilestone?: boolean; // If true, rendering may change (e.g., diamond shape)
}

/**
 * Defines a resource or row/swimlane in the timeline, which contains tasks.
 */
export interface TimelineRow {
  id: string;
  label: string; // Display name for the resource/team/phase
  avatar?: string;
  tasks: string[]; // List of task IDs assigned to this row
}

// --- 2. Component Props & Handlers ---

/**
 * Defines the available zoom levels for the timeline.
 */
export type ViewMode = 'day' | 'week' | 'month';

/**
 * Defines the required props for the main TimelineView component.
 */
export interface TimelineViewProps {
  rows: TimelineRow[];
  tasks: Record<string, TimelineTask>; // A dictionary of all tasks for quick lookup
  startDate: Date;
  endDate: Date;
  viewMode: ViewMode;
  /** Handler invoked when a task is moved or resized (date changes). */
  onTaskUpdate: (taskId: string, updates: Partial<TimelineTask>) => void;
  /** Handler invoked when a task is dragged to a new row (rowId and startDate change). */
  onTaskMove: (taskId: string, newRowId: string, newStartDate: Date) => void;
}

// --- 3. Utility/Derived Types (Presentation Logic) ---

/**
 * Defines the required data structure for rendering the timeline header columns.
 */
export interface TimelineHeaderColumn {
  key: string;
  label: string;
  date: Date;
  width: number; // The calculated pixel width of this column
}

/**
 * Defines the calculated pixel coordinates of a task on the timeline canvas.
 * Used primarily for drawing dependency lines and positioning the TaskBar.
 */
export interface TaskCoordinates {
  id: string;
  left: number;
  top: number;
  width: number;
  height: number;
}