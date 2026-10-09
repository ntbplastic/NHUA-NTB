"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Category } from '@/lib/mock/categories';
import { LayoutGrid } from 'lucide-react';

interface CategoryQuickNavProps {
  categories: Category[];
}

export function CategoryQuickNav({ categories }: CategoryQuickNavProps) {
  const pathname = usePathname();

  return (
    <div className="w-full mb-4 md:mb-6">
      <div className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-1.5 pb-2">
        <Link
          href="/san-pham"
          className={cn(
            "flex-shrink-0 snap-start flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-semibold text-[13px] md:text-[14px] transition-all duration-150 active:scale-[0.97] whitespace-nowrap border",
            pathname === '/san-pham' 
              ? "bg-[#1677FF] text-white border-[#1677FF] shadow-sm shadow-[#1677FF]/20" 
              : "bg-white text-[#475569] border-[#E2E8F0] hover:border-[#1677FF] hover:text-[#1677FF]"
          )}
        >
          <LayoutGrid className="w-3.5 h-3.5 md:w-4 md:h-4" />
          Tất cả
        </Link>
        {categories.map((cat) => {
          const href = `/san-pham/${cat.slug}`;
          const isActive = pathname === href;
          return (
            <Link
              key={cat.id}
              href={href}
              className={cn(
                "flex-shrink-0 snap-start px-3.5 py-1.5 rounded-full font-semibold text-[13px] md:text-[14px] transition-all duration-150 active:scale-[0.97] whitespace-nowrap border",
                isActive 
                  ? "bg-[#1677FF] text-white border-[#1677FF] shadow-sm shadow-[#1677FF]/20" 
                  : "bg-white text-[#475569] border-[#E2E8F0] hover:border-[#1677FF] hover:text-[#1677FF]"
              )}
            >
              {cat.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
