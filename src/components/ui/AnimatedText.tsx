
import React from 'react';
import { cn } from '@/lib/utils';

interface AnimatedTextProps {
  text: string;
  className?: string;
  type?: 'gradient' | 'regular';
  speed?: 'fast' | 'normal' | 'slow';
  children?: React.ReactNode;
}

export function AnimatedText({ 
  text, 
  className,
  type = 'regular',
  speed = 'normal',
  children 
}: AnimatedTextProps) {
  const speedClass = {
    fast: 'transition-all duration-300',
    normal: 'transition-all duration-500',
    slow: 'transition-all duration-700',
  };

  const typeClass = {
    gradient: 'gradient-text',
    regular: ''
  };

  return (
    <span 
      className={cn(
        speedClass[speed],
        typeClass[type],
        className
      )}
    >
      {text}
      {children}
    </span>
  );
}
