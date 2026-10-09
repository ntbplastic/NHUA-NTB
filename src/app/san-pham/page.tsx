"use client";

import { Suspense, useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronRight, Filter } from 'lucide-react';
import { ProductCard } from '@/components/ui/ProductCard';
import { CategoryQuickNav } from '@/components/catalog/CategoryQuickNav';
import { CatalogToolbar } from '@/components/catalog/CatalogToolbar';
import { ActiveFilters } from '@/components/catalog/ActiveFilters';
import { FilterSheet, FilterConfig } from '@/components/catalog/FilterSheet';
import { DataProvider } from '@/lib/data/Provider';
import { mockCategories } from '@/lib/mock/categories';
import { searchProducts } from '@/lib/catalog/searchUtils';
import { mockProducts } from '@/lib/mock/products';

function normalizeCapacity(value: string): string {
  const numMatch = value.match(/[0-9.]+/);
  if (numMatch) {
    let num = parseFloat(numMatch[0]);
    if (value.toLowerCase().includes('l') && !value.toLowerCase().includes('ml')) {
      return `${num} L`;
    } else {
      if (num >= 1000 && num % 100 === 0) {
        return `${num / 1000} L`;
      }
      return `${num} ml`;
    }
  }
  return value;
}

function CatalogContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 1. Data Fetching (mocked via DataProvider)
  // For production, you might want to fetch inside useEffect or Server Component
  const categories = mockCategories; 
  const allProducts = mockProducts;

  // 2. State
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [sortOption, setSortOption] = useState(searchParams.get('sort') || 'default');
  
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});

  // Sync state from URL on mount and when URL changes
  useEffect(() => {
    const filters: Record<string, string[]> = {};
    const q = searchParams.get('q');
    const sort = searchParams.get('sort');
    
    if (q !== null) setSearchQuery(q);
    if (sort !== null) setSortOption(sort);

    ['material', 'capacity', 'neck', 'application'].forEach(key => {
      const val = searchParams.get(key);
      if (val) {
        filters[key] = val.split(',');
      }
    });
    setSelectedFilters(filters);
  }, [searchParams]);

  // Update URL when state changes (debounced/controlled via handlers)
  const updateUrl = (filters: Record<string, string[]>, q: string, sort: string) => {
    const params = new URLSearchParams();
    if (q) params.set('q', q);
    if (sort && sort !== 'default') params.set('sort', sort);
    
    Object.entries(filters).forEach(([key, values]) => {
      if (values && values.length > 0) {
        params.set(key, values.join(','));
      }
    });
    
    router.replace(`/san-pham?${params.toString()}`, { scroll: false });
  };

  // 3. Derived Options for Filter Sheet
  const filterConfigs = useMemo<FilterConfig[]>(() => {
    const materials = Array.from(new Set(allProducts.map(p => p.material).filter(Boolean)));
    const capacities = Array.from(new Set(allProducts.map(p => p.capacity || '').filter(Boolean)));
    const necks = Array.from(new Set(allProducts.map(p => p.neck).filter(Boolean)));
    const applicationsSet = new Set<string>();
    allProducts.forEach(p => {
      if (p.applications) p.applications.forEach((a: string) => applicationsSet.add(a));
    });
    const applications = Array.from(applicationsSet);

    return [
      { id: 'category', label: 'Loại bao bì', type: 'category' },
      { id: 'material', label: 'Vật liệu', type: 'checkbox', options: materials.map(m => ({ value: m, label: m })) },
      { id: 'capacity', label: 'Dung tích / Kích thước', type: 'checkbox', options: capacities.map(c => ({ value: c, label: normalizeCapacity(c) })) },
      { id: 'neck', label: 'Cổ chai / Ren', type: 'checkbox', options: necks.map(n => ({ value: n, label: n })) },
      { id: 'application', label: 'Ứng dụng ngành', type: 'checkbox', options: applications.map(a => ({ value: a, label: a })) },
    ];
  }, [allProducts]);

  // 4. Filtering Logic
  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    // Search using searchUtils
    if (searchQuery) {
      result = searchProducts(result, searchQuery);
    }

    // Checkbox Filters
    Object.entries(selectedFilters).forEach(([key, values]) => {
      if (values && values.length > 0) {
        if (key === 'application') {
          result = result.filter(p => p.applications && p.applications.some((a: string) => values.includes(a)));
        } else {
          result = result.filter(p => values.includes((p as any)[key]));
        }
      }
    });

    // Sort
    if (sortOption === 'name-asc') result.sort((a, b) => a.name.localeCompare(b.name));
    if (sortOption === 'name-desc') result.sort((a, b) => b.name.localeCompare(a.name));
    if (sortOption === 'capacity-asc' || sortOption === 'capacity-desc') {
      result.sort((a, b) => {
        // Simple numeric extraction for sort
        const numA = parseFloat((a.capacity || '0').replace(/[^0-9.]/g, ''));
        const numB = parseFloat((b.capacity || '0').replace(/[^0-9.]/g, ''));
        return sortOption === 'capacity-asc' ? numA - numB : numB - numA;
      });
    }

    return result;
  }, [allProducts, searchQuery, selectedFilters, sortOption]);

  // 5. Handlers
  const handleFilterChange = (groupId: string, value: string) => {
    const current = selectedFilters[groupId] || [];
    const updated = current.includes(value) 
      ? current.filter(v => v !== value)
      : [...current, value];
    
    const newFilters = { ...selectedFilters, [groupId]: updated };
    setSelectedFilters(newFilters);
    updateUrl(newFilters, searchQuery, sortOption);
  };

  const handleRemoveFilter = (groupId: string, value: string) => {
    handleFilterChange(groupId, value);
  };

  const handleClearAll = () => {
    setSelectedFilters({});
    updateUrl({}, searchQuery, sortOption);
  };

  const handleSearchChange = (q: string) => {
    setSearchQuery(q);
    updateUrl(selectedFilters, q, sortOption);
  };

  const handleSortChange = (sort: string) => {
    setSortOption(sort);
    updateUrl(selectedFilters, searchQuery, sort);
  };

  // Prepare active filters list for display
  const activeFiltersList = Object.entries(selectedFilters).flatMap(([groupId, values]) => {
    const config = filterConfigs.find(c => c.id === groupId);
    if (!config || !config.options) return [];
    return values.map(val => {
      const option = config.options!.find(o => o.value === val);
      return {
        type: groupId,
        value: val,
        label: option ? option.label : val
      };
    });
  });

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-32 md:pb-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-[11px] md:text-[13px] font-medium text-[#64748B] mb-2 md:mb-6 overflow-x-auto whitespace-nowrap no-scrollbar pb-0.5">
          <Link href="/" className="hover:text-[#1677FF] transition-colors">Trang chủ</Link>
          <ChevronRight className="w-3 h-3 md:w-3.5 md:h-3.5 opacity-60" />
          <span className="text-[#0F172A]">Sản phẩm</span>
        </div>

        {/* Header */}
        <div className="mb-2 md:mb-8 flex flex-col md:flex-row md:items-end justify-between gap-1">
          <div>
            <div className="flex items-baseline gap-2 mb-0.5 md:mb-2">
              <h1 className="text-[24px] md:text-[32px] font-bold text-[#0F172A] leading-tight tracking-tight">Sản phẩm bao bì</h1>
              <span className="md:hidden text-[11px] font-bold text-[#94A3B8]">({filteredProducts.length})</span>
            </div>
            <p className="text-[13px] md:text-[15px] text-[#64748B] max-w-2xl leading-snug">
              Danh mục bao bì nhựa phục vụ đóng gói công nghiệp và B2B.
            </p>
          </div>
          <div className="hidden md:block text-[14px] font-medium text-[#64748B]">
            <span className="text-[#0F172A] font-bold">{filteredProducts.length}</span> sản phẩm phù hợp
          </div>
        </div>

        {/* Category Quick Nav */}
        <CategoryQuickNav categories={categories} />

        {/* Toolbar */}
        <CatalogToolbar 
          resultCount={filteredProducts.length}
          activeFilterCount={activeFiltersList.length}
          onOpenFilter={() => setIsFilterOpen(true)}
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          sortOption={sortOption}
          onSortChange={handleSortChange}
          allProducts={allProducts}
        />

        {/* Active Filters */}
        <ActiveFilters 
          filters={activeFiltersList}
          onRemoveFilter={handleRemoveFilter}
          onClearAll={handleClearAll}
        />

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-4 lg:gap-5">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product: any) => {
              const category = categories.find((c: any) => c.id === product.categoryId);
              const href = category ? `/san-pham/${category.slug}/${product.slug}` : `/san-pham/${product.slug}`;
              return <ProductCard key={product.id} product={{...product, href}} />
            })
          ) : (
            <div className="col-span-full py-16 md:py-24 flex flex-col items-center justify-center bg-white rounded-[16px] md:rounded-[24px] border border-[#E2E8F0] text-center px-4">
              <div className="w-14 h-14 bg-[#F8FAFC] rounded-full flex items-center justify-center mb-4">
                <Filter className="w-6 h-6 text-[#94A3B8]" />
              </div>
              <h3 className="text-[16px] md:text-[18px] font-bold text-[#0F172A] mb-2">Chưa tìm thấy sản phẩm phù hợp.</h3>
              <p className="text-[13px] md:text-[14px] text-[#64748B] mb-6 max-w-sm">
                Vui lòng xóa bộ lọc hoặc tìm kiếm bằng từ khóa khác.
              </p>
              <div className="flex gap-3 flex-wrap justify-center">
                {searchQuery && (
                  <button 
                    onClick={() => handleSearchChange('')}
                    className="px-5 py-2.5 bg-[#F1F5F9] text-[#0F172A] text-[14px] font-medium rounded-full hover:bg-[#E2E8F0] transition-colors"
                  >
                    Xóa tìm kiếm
                  </button>
                )}
                {activeFiltersList.length > 0 && (
                  <button 
                    onClick={handleClearAll}
                    className="px-5 py-2.5 bg-[#F1F5F9] text-[#0F172A] text-[14px] font-medium rounded-full hover:bg-[#E2E8F0] transition-colors"
                  >
                    Xóa bộ lọc
                  </button>
                )}
                {(searchQuery || activeFiltersList.length > 0) && (
                  <button 
                    onClick={() => { handleClearAll(); handleSearchChange(''); }}
                    className="px-5 py-2.5 bg-[#F1F5F9] text-[#0F172A] text-[14px] font-medium rounded-full hover:bg-[#E2E8F0] transition-colors"
                  >
                    Xem tất cả sản phẩm
                  </button>
                )}
                <Link 
                  href="/rfq"
                  className="px-5 py-2.5 bg-white border border-[#E2E8F0] text-[#0F172A] text-[14px] font-medium rounded-full hover:bg-[#F8FAFC] transition-colors"
                >
                  Gửi yêu cầu riêng
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Custom Discovery CTA (Optional at bottom) */}
        {filteredProducts.length > 0 && (
          <div className="mt-12 bg-white rounded-[16px] border border-[#E2E8F0] p-6 text-center max-w-2xl mx-auto">
            <h3 className="text-[16px] font-bold text-[#0F172A] mb-2">Chưa tìm thấy đúng mẫu?</h3>
            <p className="text-[14px] text-[#64748B] mb-4">Trao đổi dung tích, cổ chai, kiểu dáng hoặc yêu cầu phát triển khuôn.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/rfq" className="px-6 py-2.5 bg-[#1677FF] text-white text-[14px] font-medium rounded-full hover:bg-[#0F5ED7] transition-colors">
                Gửi yêu cầu
              </Link>
              <Link href="/nang-luc/khuon-co-khi-chinh-xac" className="px-6 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] text-[#0F172A] text-[14px] font-medium rounded-full hover:bg-[#F1F5F9] transition-colors">
                Xem năng lực khuôn
              </Link>
            </div>
          </div>
        )}

      </div>

      {/* Filter Sheet */}
      <FilterSheet 
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        title="Bộ lọc sản phẩm"
        configs={filterConfigs}
        selectedFilters={selectedFilters}
        onFilterChange={handleFilterChange}
        onClearAll={handleClearAll}
        resultCount={filteredProducts.length}
        categories={categories}
      />
    </div>
  );
}

export default function ProductListPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-8"><div className="text-[#64748B] font-medium text-[14px] animate-pulse">Đang tải danh mục...</div></div>}>
      <CatalogContent />
    </Suspense>
  );
}
