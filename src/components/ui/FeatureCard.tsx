
import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

export function FeatureCard({ icon: Icon, title, description, className }: FeatureCardProps) {
  return (
    <div 
      className={cn(
        'p-6 rounded-2xl glass-card hover-scale group cursor-default',
        className
      )}
    >
      <div className="mb-5 inline-flex p-3 rounded-xl bg-primary/10 text-primary">
        <Icon size={24} strokeWidth={1.5} />
      </div>
      <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
