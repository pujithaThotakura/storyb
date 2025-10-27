// src/components/primitives/Slider.tsx

import React from 'react';

interface SliderProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  min?: number;
  max?: number;
  value: number;
  onChange: (value: number) => void;
}

const Slider: React.FC<SliderProps> = ({ 
  label, 
  min = 0, 
  max = 100, 
  value, 
  onChange, 
  ...props 
}) => {
  
  const id = `slider-${label.toLowerCase().replace(/\s/g, '-')}`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(parseInt(e.target.value, 10));
  };

  return (
    <div className="w-full">
      <label htmlFor={id} className="block text-sm font-medium text-neutral-700 mb-2">
        {label}: <span className="font-semibold text-primary-600">{value}%</span>
      </label>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={handleChange}
        className={`w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer 
                    focus:outline-none focus:ring-2 focus:ring-primary-500`}
        // ACCESSIBILITY (A11y) ATTRIBUTES
        role="slider"
        aria-valuenow={value}
        aria-valuemin={min}
        aria-valuemax={max}
        {...props}
      />
    </div>
  );
};

export default Slider;