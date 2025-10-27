// src/components/Timeline/TaskBar.tsx

import React, { useCallback } from 'react';
import { TimelineTask } from '../../types/timeline.types';
import { calculatePosition, calculateDurationWidth } from '../../utils/position.utils';
import { useDragAndDrop } from '../../hooks/useDragAndDrop';
import { ROW_HEIGHT_PX } from '../../constants/timeline.constants';

interface TaskBarProps {
  task: TimelineTask;
  viewStartDate: Date;
  pixelsPerDay: number;
  rowIndex: number;
  onTaskUpdate: (taskId: string, updates: Partial<TimelineTask>) => void;
}

const TaskBar: React.FC<TaskBarProps> = React.memo(({ task, viewStartDate, pixelsPerDay, rowIndex, onTaskUpdate }) => {
  
  const handleUpdate = useCallback((newStartDate: Date, newEndDate: Date) => {
    onTaskUpdate(task.id, { startDate: newStartDate, endDate: newEndDate });
  }, [task.id, onTaskUpdate]);

  const { onTaskInteractionStart } = useDragAndDrop(viewStartDate, pixelsPerDay, handleUpdate);

  const left = calculatePosition(task.startDate, viewStartDate, pixelsPerDay);
  const width = calculateDurationWidth(task.startDate, task.endDate, pixelsPerDay);
  const top = rowIndex * ROW_HEIGHT_PX + 8; // Vertically centered

  const startInteraction = (e: React.MouseEvent | React.TouchEvent, type: 'move' | 'resize-left' | 'resize-right') => {
      onTaskInteractionStart(e, type, { startDate: task.startDate, endDate: task.endDate });
  };
  
  const ariaLabel = `${task.title}. Progress: ${task.progress}%. Drag to move.`;

  return (
    <div
      className={`absolute h-8 rounded-sm text-white text-xs p-2 shadow-md transition-all duration-100 ease-out 
                  bg-primary-500 hover:bg-primary-600`}
      style={{
        left: `${left}px`,
        width: `${width}px`,
        top: `${top}px`,
        zIndex: 10 + rowIndex,
        cursor: 'grab',
      }}
      role="button"
      tabIndex={0}
      aria-label={ariaLabel}
      onMouseDown={(e) => startInteraction(e, 'move')}
      onTouchStart={(e) => startInteraction(e, 'move')}
    >
      
      {/* Task Content */}
      <span className="truncate block pr-2" style={{ maxWidth: '90%' }}>
        {task.title}
      </span>

      {/* Progress Bar */}
      <div 
        className="absolute bottom-0 left-0 h-1 bg-primary-700 opacity-70" 
        style={{ width: `${task.progress}%` }} 
      />

      {/* Resize Handle (Left) */}
      <div
        className="absolute top-0 -left-1 w-2 h-full cursor-col-resize z-20"
        onMouseDown={(e) => startInteraction(e, 'resize-left')}
        aria-label="Resize start date"
      />
      
      {/* Resize Handle (Right) */}
      <div
        className="absolute top-0 -right-1 w-2 h-full cursor-col-resize z-20"
        onMouseDown={(e) => startInteraction(e, 'resize-right')}
        aria-label="Resize end date"
      />
    </div>
  );
});

export default TaskBar;