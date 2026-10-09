"use client";

import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ActiveFiltersProps {
  filters: { type: string; value: string; label: string }[];
  onRemoveFilter: (type: string, value: string) => void;
  onClearAll: () => void;
}

export function ActiveFilters({ filters, onRemoveFilter, onClearAll }: ActiveFiltersProps) {
  if (filters.length === 0) return null;

  return (
    <div className="flex items-center gap-2 mb-6 overflow-x-auto no-scrollbar pb-1">
      <div className="flex-shrink-0 text-[13px] font-medium text-[#64748B] mr-1">
        Đang lọc:
      </div>
      {filters.map((filter, index) => (
        <button
          key={`${filter.type}-${filter.value}-${index}`}
          onClick={() => onRemoveFilter(filter.type, filter.value)}
          className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-[#F0F5FF] text-[#1677FF] border border-[#1677FF]/20 rounded-full text-[13px] font-medium hover:bg-[#EAF3FF] transition-colors active:scale-[0.98]"
        >
          {filter.label}
          <X className="w-3.5 h-3.5" />
        </button>
      ))}
      <button
        onClick={onClearAll}
        className="flex-shrink-0 px-3 py-1.5 text-[13px] font-medium text-[#64748B] hover:text-[#0F172A] transition-colors ml-1"
      >
        Xóa tất cả
      </button>
    </div>
  );
}
