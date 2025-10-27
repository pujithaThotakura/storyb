// src/components/Timeline/TimelineView.tsx

import React, { useRef } from 'react';
import { TimelineViewProps } from '../../types/timeline.types';
import { useTimeline } from '../../hooks/useTimeline';
import TimelineRow from './TimelineRow';
import TimelineGrid from './TimelineGrid';

const LEFT_PANEL_WIDTH = 256; // Consistent with w-64 in Tailwind

export const TimelineView: React.FC<TimelineViewProps> = ({ 
  rows, 
  tasks: allTasks, 
  startDate, 
  endDate, 
  viewMode: initialViewMode, 
  onTaskUpdate, 
}) => {
  
  const { viewMode, pixelsPerDay, totalWidth, switchViewMode, handleScroll } = useTimeline(initialViewMode, startDate, endDate);
  
  const gridContainerRef = useRef<HTMLDivElement>(null);

  // Sync scroll position between the header and the body
  const handleScrollSync = (e: React.UIEvent<HTMLDivElement>) => {
    const newScrollLeft = e.currentTarget.scrollLeft;
    handleScroll(newScrollLeft);

    // Sync header scroll
    if (gridContainerRef.current) {
      gridContainerRef.current.scrollLeft = newScrollLeft;
    }
  };


  return (
    <div className="flex flex-col h-[600px] bg-neutral-50 shadow-xl rounded-xl border border-neutral-200">
      
      {/* --- TOP HEADER / CONTROLS --- */}
      <div className="flex justify-between items-center p-4 border-b border-neutral-200">
        <h1 className="text-xl font-semibold text-neutral-900">Project Timeline</h1>
        
        {/* View Mode Switcher */}
        <div className="flex space-x-2">
          {['day', 'week', 'month'].map((mode) => (
            <button
              key={mode}
              onClick={() => switchViewMode(mode as TimelineViewProps['viewMode'])}
              className={`px-3 py-1 text-sm rounded-md transition ${
                viewMode === mode
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              {mode.charAt(0).toUpperCase() + mode.slice(1)} View
            </button>
          ))}
        </div>
      </div>

      {/* --- MAIN LAYOUT --- */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* LEFT PANEL: Resource/Row List */}
        <div 
          className="flex-shrink-0 border-r border-neutral-200 bg-white overflow-y-scroll"
          style={{ width: LEFT_PANEL_WIDTH }}
        >
          {/* Left panel header placeholder */}
          <div className="h-12 border-b border-neutral-200 p-3 font-medium text-neutral-700 sticky top-0 bg-white z-10">
            Resource/Team
          </div>
          
          {/* Render Row Labels */}
          {rows.map(row => (
            <div key={row.id} className="h-12 border-b border-neutral-100 p-3 flex items-center hover:bg-neutral-50">
              <span className="truncate">{row.label}</span>
            </div>
          ))}
        </div>

        {/* RIGHT PANEL: Timeline Content (Scrollable) */}
        <div className="flex-1 relative overflow-hidden">
          
          {/* Timeline Grid Header (Syncs scroll with body) */}
          <div className="h-12 sticky top-0 z-20" ref={gridContainerRef} style={{ overflowX: 'hidden' }}>
            <TimelineGrid 
                startDate={startDate} 
                endDate={endDate} 
                viewMode={viewMode}
                totalWidth={totalWidth}
            />
          </div>

          {/* Timeline Body (Main Scroll Area) */}
          <div 
            className="relative overflow-auto" 
            onScroll={handleScrollSync}
            style={{ height: 'calc(100% - 48px)' }}
          >
            {rows.map((row, index) => (
                <TimelineRow
                    key={row.id}
                    row={row}
                    // Filter tasks for this specific row
                    tasks={row.tasks.map(id => allTasks[id]).filter(t => t)}
                    viewStartDate={startDate}
                    pixelsPerDay={pixelsPerDay}
                    rowIndex={index}
                    onTaskUpdate={onTaskUpdate}
                />
            ))}
            
            {/* Dependency Lines are rendered here over all rows */}
          </div>
        </div>
      </div>
    </div>
  );
};