// src/components/primitives/Button.tsx

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  disabled, 
  ...props 
}) => {
  
  // Base styling applied to all buttons
  const baseClasses = 'font-semibold rounded-md transition-all duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed shadow-sm';

  // Size styling
  const sizeClasses = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  }[size];

  // Variant styling using custom Tailwind colors
  const variantClasses = {
    primary: 'bg-primary-500 text-white hover:bg-primary-600 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
    secondary: 'bg-neutral-200 text-neutral-900 hover:bg-neutral-300 focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2',
    ghost: 'bg-transparent text-primary-500 hover:bg-neutral-100 focus:ring-2 focus:ring-primary-500',
  }[variant];

  return (
    <button
      className={`${baseClasses} ${sizeClasses} ${variantClasses} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;