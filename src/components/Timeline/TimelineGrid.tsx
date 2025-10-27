// src/components/Timeline/TimelineGrid.tsx

import React from 'react';
import { generateTimeAxis } from '../../utils/date.utils';
import { TimelineHeaderColumn } from '../../types/timeline.types';

interface TimelineGridProps {
  startDate: Date;
  endDate: Date;
  viewMode: 'day' | 'week' | 'month';
  totalWidth: number;
}

const TimelineGrid: React.FC<TimelineGridProps> = React.memo(({ startDate, endDate, viewMode, totalWidth }) => {
  
  const columns: TimelineHeaderColumn[] = generateTimeAxis(startDate, endDate, viewMode);

  return (
    <div 
      className="relative" 
      style={{ width: totalWidth, height: '48px' }}
    >
      
      {/* --- TIME AXIS HEADER --- */}
      <div className="flex h-12 border-b border-neutral-200 sticky top-0 bg-neutral-50 z-20">
        {columns.map(col => (
          <div
            key={col.key}
            className="flex-shrink-0 flex items-center justify-center text-xs font-medium text-neutral-600 border-r border-neutral-200"
            style={{ width: `${col.width}px` }}
            role="columnheader"
          >
            {col.label}
          </div>
        ))}
      </div>
    </div>
  );
});

export default TimelineGrid;