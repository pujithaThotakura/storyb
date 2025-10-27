// src/components/Timeline/TaskDetailSidebar.tsx

import React, { useState, useEffect } from 'react';
import { TimelineTask } from '../../types/timeline.types';
// import Modal from '../primitives/Modal'; // Assuming this primitive exists
// import Button from '../primitives/Button'; 
// import Slider from '../primitives/Slider'; 

interface TaskDetailSidebarProps {
  task: TimelineTask | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (taskId: string, updates: Partial<TimelineTask>) => void;
}

const TaskDetailSidebar: React.FC<TaskDetailSidebarProps> = ({ task, isOpen, onClose, onUpdate }) => {
  
  // Internal state for form handling before final save
  const [formData, setFormData] = useState<Partial<TimelineTask>>({});

  useEffect(() => {
    if (task) {
      setFormData(task);
    } else {
      setFormData({});
    }
  }, [task]);

  if (!task || !isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'progress' ? parseInt(value) : value }));
  };

  const handleSave = () => {
    if (task.id) {
        onUpdate(task.id, formData);
    }
    onClose();
  };

  return (
    // Replace with your reusable Modal/Sidebar Primitive
    <div 
        className="fixed top-0 right-0 h-full w-80 bg-white shadow-2xl p-6 z-50 transform slide-in-right"
        role="dialog"
        aria-labelledby="sidebar-title"
    >
      <h2 id="sidebar-title" className="text-2xl font-bold mb-4 text-neutral-900">
        Task Details
      </h2>
      
      {/* --- FORM FIELDS --- */}
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-neutral-700">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title || ''}
          onChange={handleChange}
          className="mt-1 block w-full border border-neutral-300 rounded-md p-2"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-neutral-700">Progress: {formData.progress}%</label>
        {/* Replace with your Slider primitive */}
        <input 
            type="range"
            name="progress"
            min="0"
            max="100"
            value={formData.progress || 0}
            onChange={handleChange}
            className="mt-1 w-full"
            role="slider"
        />
      </div>

      {/* Date Fields (Requires date input formatting/parsing) */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-neutral-700">Start Date</label>
        {/* Placeholder: Real implementation requires proper date conversion/handling */}
        <input type="date" value={new Date(task.startDate).toISOString().split('T')[0]} readOnly className="mt-1 block w-full border border-neutral-300 rounded-md p-2 bg-neutral-100" />
      </div>

      {/* --- ACTIONS --- */}
      <div className="absolute bottom-0 left-0 w-full p-6 border-t border-neutral-200 flex justify-end space-x-2">
        {/* Replace with your Button primitive */}
        <button 
            onClick={onClose} 
            className="px-4 py-2 text-sm bg-neutral-100 rounded-md"
        >
            Cancel
        </button>
        <button 
            onClick={handleSave} 
            className="px-4 py-2 text-sm bg-primary-600 text-white rounded-md"
        >
            Save Changes
        </button>
      </div>

    </div>
  );
};

export default TaskDetailSidebar;