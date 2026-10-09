"use client";

import { Filter, Search, ChevronDown, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState, useRef, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { getSearchSuggestions, SearchSuggestion } from '@/lib/catalog/searchUtils';

interface CatalogToolbarProps {
  resultCount: number;
  activeFilterCount: number;
  onOpenFilter: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  sortOption: string;
  onSortChange: (sort: string) => void;
  allProducts?: any[];
}

export const SORT_OPTIONS = [
  { value: 'default', label: 'Mặc định' },
  { value: 'name-asc', label: 'Tên A-Z' },
  { value: 'name-desc', label: 'Tên Z-A' },
  { value: 'capacity-asc', label: 'Dung tích tăng dần' },
  { value: 'capacity-desc', label: 'Dung tích giảm dần' }
];

export function CatalogToolbar({
  resultCount,
  activeFilterCount,
  onOpenFilter,
  searchQuery,
  onSearchChange,
  sortOption,
  onSortChange,
  allProducts = []
}: CatalogToolbarProps) {
  const router = useRouter();
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const activeSortLabel = SORT_OPTIONS.find(o => o.value === sortOption)?.label || 'Mặc định';

  const suggestions = useMemo(() => {
    if (!isSearchFocused || !searchQuery.trim()) return [];
    return getSearchSuggestions(allProducts, searchQuery);
  }, [allProducts, searchQuery, isSearchFocused]);

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    if (suggestion.type === 'product' && suggestion.categorySlug && suggestion.productSlug) {
      router.push(`/san-pham/${suggestion.categorySlug}/${suggestion.productSlug}`);
    } else if (suggestion.type === 'facet') {
      onSearchChange(suggestion.value);
    }
    setIsSearchFocused(false);
  };

  return (
    <div className="flex flex-row items-center gap-2 mb-3 md:mb-4 bg-transparent md:bg-white p-0 md:p-3 rounded-none md:rounded-[16px] border-none md:border md:border-[#E2E8F0] md:shadow-sm">
      {/* Search - flex-1 */}
      <div className="relative flex-1 md:w-[240px]" ref={searchRef}>
        <div className="absolute inset-y-0 left-0 pl-2.5 md:pl-3 flex items-center pointer-events-none">
          <Search className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#94A3B8]" />
        </div>
        <input
          type="text"
          placeholder="Tìm sản phẩm..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          onFocus={() => setIsSearchFocused(true)}
          className="w-full pl-8 md:pl-9 pr-8 py-2 bg-white md:bg-[#F8FAFC] border border-[#E2E8F0] rounded-[8px] md:rounded-[10px] text-[13px] md:text-[14px] text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#1677FF]/20 focus:border-[#1677FF] transition-all placeholder:text-[#94A3B8] h-[38px] md:h-auto"
        />
        {searchQuery && (
          <button
            onClick={() => {
              onSearchChange('');
              setIsSearchFocused(false);
            }}
            className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-[#94A3B8] hover:text-[#0F172A] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {/* Suggestions Dropdown */}
        {isSearchFocused && suggestions.length > 0 && (
          <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-[#E2E8F0] rounded-[10px] shadow-lg overflow-hidden z-50">
            <div className="py-1">
              {suggestions.map((s, idx) => (
                <button
                  key={`${s.type}-${s.value}-${idx}`}
                  onClick={() => handleSuggestionClick(s)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-[#F8FAFC] transition-colors text-left"
                >
                  <Search className="w-3.5 h-3.5 text-[#94A3B8] shrink-0" />
                  <span className="text-[13px] text-[#0F172A] truncate">
                    {s.label}
                  </span>
                  {s.type === 'facet' && (
                    <span className="ml-auto text-[10px] font-bold text-[#64748B] bg-[#F1F5F9] px-2 py-0.5 rounded-[4px] shrink-0">
                      Lọc
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Filter Button */}
      <button
        onClick={onOpenFilter}
        className="flex items-center justify-center gap-1.5 px-3 md:px-4 py-2 bg-white md:bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#E2E8F0] rounded-[8px] md:rounded-[10px] text-[13px] md:text-[14px] font-bold text-[#0F172A] transition-colors active:scale-[0.98] h-[38px] md:h-auto shrink-0"
      >
        <Filter className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#1677FF]" />
        Lọc
        {activeFilterCount > 0 && (
          <span className="flex items-center justify-center w-4 h-4 md:w-5 md:h-5 ml-0.5 md:ml-1 bg-[#1677FF] text-white text-[10px] md:text-[11px] rounded-full font-bold">
            {activeFilterCount}
          </span>
        )}
      </button>

      {/* Sort - Desktop label, Mobile icon/compact */}
      <div className="relative" ref={sortRef}>
        <button
          onClick={() => setIsSortOpen(!isSortOpen)}
          className="flex items-center gap-1.5 px-2.5 md:px-3 py-2 bg-white border border-[#E2E8F0] rounded-[8px] md:rounded-[10px] text-[13px] font-bold text-[#475569] hover:bg-[#F8FAFC] transition-colors h-[38px] md:h-auto shrink-0"
        >
          <span className="hidden md:inline whitespace-nowrap">Sắp xếp: </span>
          <span className="text-[#0F172A] hidden md:inline truncate max-w-[100px]">{activeSortLabel}</span>
          <span className="md:hidden">Sắp xếp</span>
          <ChevronDown className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#64748B]" />
        </button>
        
        {isSortOpen && (
          <div className="absolute right-0 top-full mt-1 w-[180px] md:w-[200px] bg-white border border-[#E2E8F0] rounded-[10px] md:rounded-[12px] shadow-lg overflow-hidden z-50">
            {SORT_OPTIONS.map(option => (
              <button
                key={option.value}
                onClick={() => {
                  onSortChange(option.value);
                  setIsSortOpen(false);
                }}
                className={cn(
                  "w-full text-left px-4 py-2.5 text-[13px] hover:bg-[#F8FAFC] transition-colors",
                  sortOption === option.value ? "font-bold text-[#1677FF] bg-[#F0F5FF]" : "font-medium text-[#475569]"
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="hidden md:flex items-center gap-2 text-[14px] font-medium text-[#64748B] ml-2">
        <span className="text-[#0F172A] font-bold">{resultCount}</span> sản phẩm
      </div>
    </div>
  );
}
