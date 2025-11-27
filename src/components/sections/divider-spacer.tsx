import React from 'react';
import { cn } from "@/lib/utils";

interface DividerSpacerProps {
  color?: 'cream' | 'teal';
  showLine?: boolean;
  className?: string;
}

const DividerSpacer = ({ color = 'cream', showLine = false, className }: DividerSpacerProps) => {
  const colorVariants = {
    cream: 'bg-[#f5e6d3]',
    teal: 'bg-[#5fb3b3]',
  };

  return (
    <div
      className={cn(
        'w-full flex items-center justify-center',
        'h-[60px] md:h-[80px] lg:h-[120px]',
        colorVariants[color],
        className
      )}
      aria-hidden="true"
    >
      {showLine && <div className="h-px w-[200px] bg-[#d4a574]" />}
    </div>
  );
};

export default DividerSpacer;