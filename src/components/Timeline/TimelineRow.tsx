// src/components/Timeline/TimelineRow.tsx

import React, { useMemo } from 'react';
import { TimelineRow as TRow, TimelineTask } from '../../types/timeline.types';
import TaskBar from './TaskBar';
import { ROW_HEIGHT_PX } from '../../constants/timeline.constants';

interface TimelineRowProps {
  row: TRow;
  tasks: TimelineTask[];
  viewStartDate: Date;
  pixelsPerDay: number;
  rowIndex: number;
  onTaskUpdate: (taskId: string, updates: Partial<TimelineTask>) => void;
}

const TimelineRow: React.FC<TimelineRowProps> = React.memo(({ 
  row, 
  tasks, 
  viewStartDate, 
  pixelsPerDay, 
  rowIndex, 
  onTaskUpdate 
}) => {
  
  const rowClass = rowIndex % 2 === 0 ? 'bg-white' : 'bg-neutral-50';

  // Memoize task bars to prevent unnecessary re-renders during scroll/drag
  const renderedTasks = useMemo(() => (
    tasks.map(task => (
      <TaskBar
        key={task.id}
        task={task}
        viewStartDate={viewStartDate}
        pixelsPerDay={pixelsPerDay}
        rowIndex={rowIndex}
        onTaskUpdate={onTaskUpdate}
      />
    ))
  ), [tasks, viewStartDate, pixelsPerDay, rowIndex, onTaskUpdate]);


  return (
    <div 
      className={`relative border-b border-neutral-100 ${rowClass}`}
      style={{ height: `${ROW_HEIGHT_PX}px` }}
      role="row"
      aria-label={`${row.label} timeline row`}
      // ADD DND-KIT DROP ZONE LOGIC HERE
    >
      {renderedTasks}
    </div>
  );
});

export default TimelineRow;