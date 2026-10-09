import * as React from "react"
import { cn } from "@/lib/utils"

export interface ChipProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: 'gray' | 'blue' | 'green';
}

const Chip = React.forwardRef<HTMLDivElement, ChipProps>(
  ({ className, color = 'gray', ...props }, ref) => {
    
    const colors = {
      gray: "bg-[#F2F6F7] text-[#64748B]",
      blue: "bg-[#EAF3FF] text-[#0F5ED7]",
      green: "bg-[#E9F8F1] text-[#0F7A4D]"
    };

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-[999px] px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2",
          colors[color],
          className
        )}
        {...props}
      />
    )
  }
)
Chip.displayName = "Chip"

export { Chip }
