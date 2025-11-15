import React from 'react';
import { cn } from '@/lib/utils';

interface StickyNoteButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'yellow' | 'pink' | 'green' | 'blue';
  size?: 'sm' | 'md' | 'lg';
  rotation?: number;
}

const variantStyles = {
  yellow: 'bg-yellow-200 hover:bg-yellow-300 text-gray-800',
  pink: 'bg-pink-200 hover:bg-pink-300 text-gray-800',
  green: 'bg-green-200 hover:bg-green-300 text-gray-800',
  blue: 'bg-blue-200 hover:bg-blue-300 text-gray-800',
};

const sizeStyles = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

export function StickyNoteButton({
  children,
  className,
  variant = 'yellow',
  size = 'md',
  rotation = -2,
  ...props
}: StickyNoteButtonProps) {
  return (
    <button
      className={cn(
        'sticky-note-btn',
        'relative font-medium transition-all duration-200',
        'shadow-md hover:shadow-lg',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      style={{
        transform: `rotate(${rotation}deg)`,
      }}
      {...props}
    >
      {children}
      {/* Folded corner effect */}
      <div
        className="absolute bottom-0 right-0 w-0 h-0"
        style={{
          borderStyle: 'solid',
          borderWidth: '0 0 16px 16px',
          borderColor: `transparent transparent rgba(0,0,0,0.1) transparent`,
        }}
      />
    </button>
  );
}