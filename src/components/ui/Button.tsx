import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  color?: 'blue' | 'green' | 'default';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", color = "blue", size = "default", asChild = false, ...props }, ref) => {
    
    const variants = {
      primary: {
        blue: "bg-[#1677FF] text-white hover:bg-[#0F5ED7] shadow-sm active:scale-[0.98] active:bg-[#0C4EBA] motion-reduce:active:scale-100 transition-all duration-150",
        green: "bg-[#18A66A] text-white hover:bg-[#0F7A4D] shadow-sm active:scale-[0.98] active:bg-[#0A5636] motion-reduce:active:scale-100 transition-all duration-150",
        default: "bg-slate-900 text-white hover:bg-slate-800 shadow-sm active:scale-[0.98] active:bg-slate-950 motion-reduce:active:scale-100 transition-all duration-150"
      },
      secondary: {
        blue: "bg-white text-slate-700 border border-slate-200 hover:bg-[#EAF3FF] hover:border-[#1677FF] hover:text-[#1677FF] active:scale-[0.98] active:bg-[#D5E6FF] motion-reduce:active:scale-100 transition-all duration-150",
        green: "bg-white text-slate-700 border border-slate-200 hover:bg-[#E9F8F1] hover:border-[#18A66A] hover:text-[#18A66A] active:scale-[0.98] active:bg-[#D3F1E3] motion-reduce:active:scale-100 transition-all duration-150",
        default: "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 active:scale-[0.98] active:bg-slate-100 motion-reduce:active:scale-100 transition-all duration-150"
      },
      ghost: {
        blue: "bg-transparent text-slate-700 hover:bg-[#EAF3FF] hover:text-[#1677FF] active:scale-[0.98] active:bg-[#D5E6FF] motion-reduce:active:scale-100 transition-all duration-150",
        green: "bg-transparent text-slate-700 hover:bg-[#E9F8F1] hover:text-[#18A66A] active:scale-[0.98] active:bg-[#D3F1E3] motion-reduce:active:scale-100 transition-all duration-150",
        default: "bg-transparent text-slate-700 hover:bg-slate-100 active:scale-[0.98] active:bg-slate-200 motion-reduce:active:scale-100 transition-all duration-150"
      },
      outline: {
        blue: "bg-transparent text-[#1677FF] border border-[#1677FF] hover:bg-[#EAF3FF] active:scale-[0.98] active:bg-[#D5E6FF] motion-reduce:active:scale-100 transition-all duration-150",
        green: "bg-transparent text-[#18A66A] border border-[#18A66A] hover:bg-[#E9F8F1] active:scale-[0.98] active:bg-[#D3F1E3] motion-reduce:active:scale-100 transition-all duration-150",
        default: "bg-transparent text-slate-700 border border-slate-300 hover:bg-slate-50 active:scale-[0.98] active:bg-slate-100 motion-reduce:active:scale-100 transition-all duration-150"
      }
    };

    const sizes = {
      default: "h-[48px] px-6 py-2",
      sm: "h-9 px-4 text-sm",
      lg: "h-[52px] px-8 text-lg",
      icon: "h-10 w-10 flex items-center justify-center p-0"
    };

    const variantClass = variants[variant][color] || variants[variant].default;
    
    if (asChild) {
      // Need a proper Slot component for asChild to work correctly, but we can't easily add Radix UI Slot here without dependency.
      // So instead, we'll return a simple wrapper or just ignore asChild for standard HTML buttons.
      // Let's implement a hacky Slot-like wrapper if asChild is true.
      // Wait, standard React without Radix requires cloning.
      const child = React.Children.only(props.children) as React.ReactElement;
      return React.cloneElement(child as any, {
        className: cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-[999px] font-medium ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          variantClass,
          sizes[size],
          className,
          (child.props as any).className
        ),
        ref: ref as any
      });
    }

    return (
      <button
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-[999px] font-medium ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          variantClass,
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
