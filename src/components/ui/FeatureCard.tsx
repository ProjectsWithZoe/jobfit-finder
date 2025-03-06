import React from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { Button } from "./button";

interface FeatureCardProps {
  icon?: LucideIcon;
  title: string;
  description?: string[];
  className?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  buttonClassName?: string;
}

export function FeatureCard({
  icon: Icon,
  title,
  description = [], // Default to an empty array if no description is provided
  className,
  buttonText,
  buttonClassName,
  onButtonClick,
}: FeatureCardProps) {
  // Validate that description is an array before calling map
  const descriptionList = Array.isArray(description) ? description : [];

  return (
    <div
      className={cn(
        "p-6 rounded-2xl glass-card h-full hover-scale group cursor-default",
        className
      )}
    >
      {Icon && ( // Only render the icon if it's provided
        <div className="mb-5 inline-flex p-3 rounded-xl bg-primary/10 text-primary">
          <Icon size={24} strokeWidth={1.5} />
        </div>
      )}
      <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
        {title}
      </h3>

      {descriptionList.length > 0 ? (
        <ul className="mt-4 text-muted-foreground list-none pl-6 ">
          {descriptionList.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      ) : (
        <p className="text-muted-foreground">{description}</p>
      )}

      {buttonText && onButtonClick && (
        <Button
          onClick={onButtonClick}
          className={cn("mt-8 py-6 px-16 text-xl ", buttonClassName)} // Use cn to merge default and custom styles
        >
          {buttonText}
        </Button>
      )}
    </div>
  );
}
