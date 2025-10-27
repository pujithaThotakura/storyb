// src/components/primitives/Modal.tsx

import React, { useEffect, useRef, useCallback } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
  // Use 'dialog' for a centered modal, or 'sidebar' for a slide-out panel
  type?: 'dialog' | 'sidebar'; 
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title, type = 'sidebar' }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Trap focus and handle ESC key (Accessibility requirement)
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    }
    // Basic focus trapping logic can be added here
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      // Optional: Focus the modal container or a primary element when opened
      // modalRef.current?.focus(); 
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    } else {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  // Conditional classes for dialog vs. sidebar
  const containerClasses = type === 'sidebar'
    ? 'fixed top-0 right-0 h-full w-80 max-w-full bg-white shadow-2xl transition-transform duration-300 ease-out transform translate-x-0'
    : 'fixed inset-0 m-auto max-w-lg max-h-[80vh] rounded-lg bg-white shadow-2xl';
  
  const backdropClasses = 'fixed inset-0 bg-neutral-900 bg-opacity-50 transition-opacity';

  return (
    <div className="z-50" aria-modal="true" role="dialog" aria-labelledby="modal-title">
      
      {/* Backdrop (Click to close) */}
      <div className={backdropClasses} onClick={onClose} />

      {/* Modal/Sidebar Content */}
      <div 
        ref={modalRef} 
        className={containerClasses}
        tabIndex={-1} // Makes it focusable for accessibility checks
      >
        <div className="p-6 h-full flex flex-col">
          <header className="flex justify-between items-start border-b pb-3 mb-4">
            <h2 id="modal-title" className="text-xl font-bold text-neutral-900">{title}</h2>
            <button 
              onClick={onClose} 
              className="p-1 rounded-full hover:bg-neutral-100 transition"
              aria-label="Close"
            >
              &times; {/* Simple 'X' icon */}
            </button>
          </header>
          <div className="flex-1 overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;