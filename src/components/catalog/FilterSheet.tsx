"use client";

import { X, Filter, ChevronDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Category } from '@/lib/mock/categories';

export type FilterConfigType = 'category' | 'checkbox';

export interface FilterConfig {
  id: string;
  label: string;
  type: FilterConfigType;
  options?: { value: string; label: string }[];
}

interface FilterSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  configs: FilterConfig[];
  selectedFilters: Record<string, string[]>;
  onFilterChange: (groupId: string, value: string) => void;
  onClearAll: () => void;
  resultCount: number;
  categories?: Category[]; // For category specific navigation inside filter
}

export function FilterSheet({
  isOpen,
  onClose,
  title = "Bộ lọc",
  configs,
  selectedFilters,
  onFilterChange,
  onClearAll,
  resultCount,
  categories
}: FilterSheetProps) {
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});
  const drawerRef = useRef<HTMLDivElement>(null);

  // Auto-open first group on mount
  useEffect(() => {
    if (configs.length > 0) {
      setOpenGroups({ [configs[0].id]: true });
    }
  }, [configs]);

  // Click outside and ESC to close for desktop
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (
        window.innerWidth >= 768 && 
        drawerRef.current && 
        !drawerRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const toggleGroup = (id: string) => {
    setOpenGroups(prev => ({ ...prev, [id]: !prev[id] }));
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Mobile Backdrop */}
      <div 
        className={cn(
          "fixed inset-0 z-[90] bg-[#0F172A]/40 transition-opacity animate-in fade-in duration-200 md:hidden",
          !isOpen && "hidden"
        )}
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div 
        ref={drawerRef}
        className={cn(
          "fixed bottom-0 left-0 right-0 md:top-[64px] lg:top-[72px] md:bottom-0 md:left-auto md:right-0 z-[100] w-full md:w-[340px] h-[90vh] md:h-[calc(100vh-72px)] mt-auto md:mt-0 bg-white shadow-2xl md:border-l md:border-[#E2E8F0] flex flex-col transition-transform duration-300 rounded-t-[24px] md:rounded-none overflow-hidden",
          isOpen ? "translate-y-0 md:translate-x-0" : "translate-y-full md:translate-x-full"
        )}
      >
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#E2E8F0] shrink-0 bg-white">
          <div className="font-bold text-lg text-[#0F172A] flex items-center gap-2">
            <Filter className="w-5 h-5 text-[#1677FF]" />
            {title}
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9] rounded-full transition-colors active:scale-[0.95]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 scrollbar-thin pb-24 md:pb-5">
          {configs.map((config) => {
            const isOpen = openGroups[config.id];
            
            return (
              <div key={config.id} className="border border-[#E2E8F0] rounded-[16px] overflow-hidden mb-4 bg-white">
                <button 
                  onClick={() => toggleGroup(config.id)}
                  className="w-full flex items-center justify-between p-4 hover:bg-[#F8FAFC] transition-colors active:bg-[#F1F5F9]"
                >
                  <span className="font-semibold text-[15px] text-[#0F172A]">{config.label}</span>
                  <ChevronDown className={cn("w-4 h-4 text-[#64748B] transition-transform", isOpen && "rotate-180")} />
                </button>
                
                {isOpen && (
                  <div className="p-3 pt-0 border-t border-[#F1F5F9]">
                    {config.type === 'category' && categories && (
                      <div className="space-y-1 mt-2">
                        {categories.map((cat) => (
                          <Link
                            key={cat.id}
                            href={`/san-pham/${cat.slug}`}
                            onClick={onClose}
                            className="w-full flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-[#F8FAFC] transition-colors group text-left"
                          >
                            <span className="text-[14px] font-medium text-[#475569] group-hover:text-[#1677FF] transition-colors">
                              {cat.name}
                            </span>
                          </Link>
                        ))}
                      </div>
                    )}

                    {config.type === 'checkbox' && config.options && (
                      <div className={cn(
                        "mt-2",
                        (config.id === 'capacity' || config.id === 'neck' || config.id === 'weight' || config.id === 'shape' || config.id === 'color') 
                          ? "grid grid-cols-2 gap-2" 
                          : "space-y-1"
                      )}>
                        {config.options.map((option: any) => {
                          const isSelected = selectedFilters[config.id]?.includes(option.value);
                          
                          if (config.id === 'capacity' || config.id === 'neck' || config.id === 'weight' || config.id === 'shape' || config.id === 'color') {
                            return (
                              <label
                                key={option.value}
                                className={cn(
                                  "relative flex items-center justify-center p-2 rounded-lg border cursor-pointer transition-colors text-center text-[13px] font-medium select-none h-10",
                                  isSelected
                                    ? "bg-[#EFF6FF] border-[#1677FF] text-[#1677FF]"
                                    : "bg-white border-[#E2E8F0] text-[#475569] hover:border-[#CBD5E1] hover:bg-[#F8FAFC]"
                                )}
                              >
                                <input
                                  type="checkbox"
                                  className="peer sr-only"
                                  checked={isSelected || false}
                                  onChange={() => onFilterChange(config.id, option.value)}
                                />
                                {option.label}
                                {option.count !== undefined && (
                                  <span className={cn(
                                    "ml-1 font-normal text-[12px]",
                                    isSelected ? "text-[#93C5FD]" : "text-[#94A3B8]"
                                  )}>
                                    · {option.count}
                                  </span>
                                )}
                              </label>
                            );
                          }

                          return (
                            <label 
                              key={option.value} 
                              className="flex items-center gap-3 py-2.5 px-3 rounded-lg hover:bg-[#F8FAFC] cursor-pointer group transition-colors"
                            >
                              <div className="relative flex items-center justify-center">
                                <input 
                                  type="checkbox"
                                  className="peer sr-only"
                                  checked={isSelected || false}
                                  onChange={() => onFilterChange(config.id, option.value)}
                                />
                                <div className={cn(
                                  "w-5 h-5 rounded-[6px] border flex items-center justify-center transition-all",
                                  isSelected 
                                    ? "bg-[#1677FF] border-[#1677FF]" 
                                    : "bg-white border-[#CBD5E1] group-hover:border-[#94A3B8]"
                                )}>
                                  {isSelected && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
                                </div>
                              </div>
                              <span className={cn(
                                "text-[14px] font-medium transition-colors",
                                isSelected ? "text-[#0F172A]" : "text-[#475569] group-hover:text-[#0F172A]"
                              )}>
                                {option.label}
                                {option.count !== undefined && (
                                  <span className="text-[#94A3B8] font-normal ml-1">({option.count})</span>
                                )}
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-[#E2E8F0] bg-white shrink-0 pb-safe">
          <div className="flex gap-3">
            <button 
              onClick={onClearAll}
              className="flex-1 py-3.5 text-[14px] font-bold text-[#64748B] hover:text-[#0F172A] bg-[#F1F5F9] hover:bg-[#E2E8F0] rounded-[12px] transition-colors active:scale-[0.98]"
            >
              Xóa bộ lọc
            </button>
            <button 
              onClick={onClose}
              className="flex-[2] py-3.5 text-[14px] font-bold text-white bg-[#1677FF] hover:bg-[#0F5ED7] shadow-sm rounded-[12px] transition-colors active:scale-[0.98]"
            >
              Xem {resultCount} sản phẩm
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
