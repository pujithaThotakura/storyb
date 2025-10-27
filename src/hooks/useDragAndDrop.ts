// src/hooks/useDragAndDrop.ts

import { useState, useCallback, useRef, useEffect } from 'react';
import { calculateDateFromPosition, calculatePosition } from '../utils/position.utils';

type InteractionType = 'move' | 'resize-left' | 'resize-right' | null;

interface TaskDates {
  startDate: Date,
  endDate: Date,
}

export const useDragAndDrop = (
  viewStartDate: Date,
  pixelsPerDay: number,
  onUpdate: (newStartDate: Date, newEndDate: Date) => void,
) => {
  const [interactionType, setInteractionType] = useState<InteractionType>(null);
  const [initialMouseX, setInitialMouseX] = useState(0);
  const taskDatesRef = useRef<TaskDates>({ startDate: new Date(), endDate: new Date() });
  
  // Minimal throttle utility
  const throttle = (callback: (...args: any[]) => void, delay: number) => {
    let lastCall = 0;
    return function (...args: any[]) {
      const now = (new Date()).getTime();
      if (now - lastCall < delay) return;
      lastCall = now;
      callback(...args);
    };
  };

  const onTaskInteractionStart = useCallback((
    e: React.MouseEvent | React.TouchEvent,
    type: InteractionType,
    initialTaskDates: TaskDates,
  ) => {
    e.preventDefault();
    e.stopPropagation();
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    
    setInitialMouseX(clientX);
    setInteractionType(type);
    taskDatesRef.current = initialTaskDates;
    
  }, []);

  const handleInteractionMove = useCallback(throttle((clientX: number) => {
    if (!interactionType || pixelsPerDay === 0) return;

    const deltaX = clientX - initialMouseX;
    
    let newStartDate = taskDatesRef.current.startDate;
    let newEndDate = taskDatesRef.current.endDate;
    
    // Logic for updating dates based on interaction type (move, resize-left, resize-right)
    if (interactionType === 'move') {
      const startPosition = calculatePosition(newStartDate, viewStartDate, pixelsPerDay);
      const newStartPos = startPosition + deltaX;
      
      newStartDate = calculateDateFromPosition(newStartPos, viewStartDate, pixelsPerDay);
      const durationMs = taskDatesRef.current.endDate.getTime() - taskDatesRef.current.startDate.getTime();
      newEndDate = new Date(newStartDate.getTime() + durationMs);
      
    } else if (interactionType === 'resize-left') {
      const startPosition = calculatePosition(newStartDate, viewStartDate, pixelsPerDay);
      const newStartPos = startPosition + deltaX;
      newStartDate = calculateDateFromPosition(newStartPos, viewStartDate, pixelsPerDay);
      
    } else if (interactionType === 'resize-right') {
      const endPosition = calculatePosition(newEndDate, viewStartDate, pixelsPerDay);
      const newEndPos = endPosition + deltaX;
      newEndDate = calculateDateFromPosition(newEndPos, viewStartDate, pixelsPerDay);
    }

    // Validation: Ensure start <= end
    if (newStartDate.getTime() <= newEndDate.getTime()) {
      onUpdate(newStartDate, newEndDate);
    }

  }, 10), [interactionType, initialMouseX, viewStartDate, pixelsPerDay, onUpdate]);

  const handleInteractionEnd = useCallback(() => {
    setInteractionType(null);
  }, []);

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => handleInteractionMove(e.clientX);
    const touchMove = (e: TouchEvent) => handleInteractionMove(e.touches[0].clientX);
    
    if (interactionType) {
      document.addEventListener('mousemove', mouseMove);
      document.addEventListener('mouseup', handleInteractionEnd);
      document.addEventListener('touchmove', touchMove);
      document.addEventListener('touchend', handleInteractionEnd);
      document.body.style.cursor = 'grabbing';
    }

    return () => {
      document.removeEventListener('mousemove', mouseMove);
      document.removeEventListener('mouseup', handleInteractionEnd);
      document.removeEventListener('touchmove', touchMove);
      document.removeEventListener('touchend', handleInteractionEnd);
      document.body.style.cursor = 'default';
    };
  }, [interactionType, handleInteractionMove, handleInteractionEnd]);

  return { onTaskInteractionStart, isInteracting: interactionType !== null };
};