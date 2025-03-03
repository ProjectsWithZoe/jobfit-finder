import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface PercentageDisplayProps {
  initialPercentage?: number;
  finalPercentage: number;
  className?: string;
  duration?: number;
}

export function PercentageDisplay({
  initialPercentage = 0,
  finalPercentage,
  className,
  duration = 2000,
}: PercentageDisplayProps) {
  const [percentage, setPercentage] = useState(initialPercentage);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercentage((prev) => {
        if (prev < finalPercentage) {
          return Math.min(prev + 1, finalPercentage);
        }
        clearInterval(interval);
        return prev;
      });
    }, duration / (finalPercentage - initialPercentage));

    return () => clearInterval(interval);
  }, [finalPercentage, initialPercentage, duration]);

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div className="relative w-40 h-40">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#f1f5f9"
            strokeWidth="10"
          />

          {/* Foreground circle that shows progress */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="10"
            strokeDasharray={`${(2 * Math.PI * 45 * percentage) / 100} ${
              (2 * Math.PI * 45 * (100 - percentage)) / 100
            }`}
            strokeDashoffset={(2 * Math.PI * 45 * 25) / 100}
            strokeLinecap="round"
            className="text-primary transition-all duration-300"
            transform="rotate(-90 50 50)"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl font-semibold">{percentage}%</span>
        </div>
      </div>
      <div className="text-lg font-medium mt-4">Match Score</div>
    </div>
  );
}
