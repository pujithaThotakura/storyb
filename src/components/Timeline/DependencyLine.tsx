// src/components/Timeline/DependencyLine.tsx

import React from 'react';
import { TimelineTask } from '../../types/timeline.types';

// Utility to get task coordinates (you would calculate this in TimelineView or a utility)
interface TaskCoords { left: number; top: number; width: number; height: number; }

interface DependencyLineProps {
  fromTaskCoords: TaskCoords;
  toTaskCoords: TaskCoords;
  // Note: These coordinates MUST be relative to the SVG container (the main Timeline Body)
}

const DependencyLine: React.FC<DependencyLineProps> = React.memo(({ fromTaskCoords, toTaskCoords }) => {
  
  // Define connection points
  const startX = fromTaskCoords.left + fromTaskCoords.width; // Right edge of the source task
  const startY = fromTaskCoords.top + (fromTaskCoords.height / 2); // Vertical middle of the source task
  
  const endX = toTaskCoords.left; // Left edge of the target task
  const endY = toTaskCoords.top + (toTaskCoords.height / 2); // Vertical middle of the target task
  
  // Calculate a simple 'Z' path for better visual routing (Right -> Down -> Left)
  const elbowX = startX + 15; // 15px extension to the right before dropping

  const pathD = `
    M ${startX} ${startY}
    L ${elbowX} ${startY}
    L ${elbowX} ${endY}
    L ${endX} ${endY}
  `;

  return (
    <svg 
      className="absolute top-0 left-0 w-full h-full pointer-events-none" 
      style={{ overflow: 'visible' }}
    >
      <defs>
        {/* Define the arrowhead marker for the end of the dependency line */}
        <marker id="arrowhead" markerWidth="6" markerHeight="4" refX="4" refY="2" orient="auto">
          <polygon points="0 0, 6 2, 0 4" fill="#3f3f46" /> {/* neutral-700 */}
        </marker>
      </defs>
      
      <path
        d={pathD}
        fill="none"
        stroke="#64748b" // Neutral-500 equivalent
        strokeWidth="1.5"
        markerEnd="url(#arrowhead)" // Attach the arrowhead
      />
    </svg>
  );
});

export default DependencyLine;