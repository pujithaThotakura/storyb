// src/components/Timeline/TimelineView.types.ts (or src/types/timeline.types.ts)

// --- Data Models (Task & Row) ---
export interface TimelineTask {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  progress: number; // 0-100
  assignee?: string;
  rowId: string;
  dependencies?: string[]; // IDs of tasks this depends on
  color?: string;
  isMilestone?: boolean;
}

export interface TimelineRow {
  id: string;
  label: string;
  avatar?: string;
  tasks: string[]; // task IDs assigned to this row
}

// --- Component Props & Handlers ---
export type ViewMode = 'day' | 'week' | 'month';

export interface TimelineViewProps {
  rows: TimelineRow[];
  tasks: Record<string, TimelineTask>;
  startDate: Date;
  endDate: Date;
  viewMode: ViewMode;
  onTaskUpdate: (taskId: string, updates: Partial<TimelineTask>) => void;
  onTaskMove: (taskId: string, newRowId: string, newStartDate: Date) => void;
}

// --- Utility Types ---
export interface TimelineHeaderColumn {
  key: string;
  label: string;
  date: Date;
  width: number;
}