import * as React from "react"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

export interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps extends React.ComponentPropsWithoutRef<"nav"> {
  items: BreadcrumbItem[]
}

export function Breadcrumb({ items, className, ...props }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("flex items-center text-[12px] md:text-[13px] text-slate-500 overflow-x-auto whitespace-nowrap scrollbar-hide", className)}
      {...props}
    >
      <ol className="flex items-center space-x-1.5 md:space-x-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          
          return (
            <li key={index} className="flex items-center">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="hover:text-[#1677FF] active:text-[#0F5ED7] active:opacity-70 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1677FF] rounded-sm outline-none"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={cn("text-slate-900 font-medium", isLast && "truncate max-w-[200px] md:max-w-[400px]")}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}

              {!isLast && (
                <ChevronRight className="w-3.5 h-3.5 ml-1.5 md:ml-2 text-slate-400 shrink-0" strokeWidth={2} />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  )
}
