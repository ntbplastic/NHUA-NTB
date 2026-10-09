"use client";

import { Suspense, useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { notFound, useRouter, useSearchParams, useParams } from 'next/navigation';
import { ChevronRight, Filter, Check, ArrowRight } from 'lucide-react';
import { ProductCard } from '@/components/ui/ProductCard';
import { CategoryQuickNav } from '@/components/catalog/CategoryQuickNav';
import { CatalogToolbar } from '@/components/catalog/CatalogToolbar';
import { ActiveFilters } from '@/components/catalog/ActiveFilters';
import { FilterSheet, FilterConfig } from '@/components/catalog/FilterSheet';
import { mockCategories } from '@/lib/mock/categories';
import { searchProducts } from '@/lib/catalog/searchUtils';
import { mockProducts } from '@/lib/mock/products';


function CategoryContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();
  const categorySlug = params.categorySlug as string;

  // 1. Data Fetching
  const categories = mockCategories; 
  const category = categories.find(c => c.slug === categorySlug);
  
  if (!category) {
    notFound();
  }

  const allCategoryProducts = mockProducts.filter(p => p.categoryId === category.id);

  // 2. State
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [sortOption, setSortOption] = useState(searchParams.get('sort') || 'default');
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});

  // Sync state from URL
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

  // Update URL
  const updateUrl = (filters: Record<string, string[]>, q: string, sort: string) => {
    const urlParams = new URLSearchParams();
    if (q) urlParams.set('q', q);
    if (sort && sort !== 'default') urlParams.set('sort', sort);
    
    Object.entries(filters).forEach(([key, values]) => {
      if (values && values.length > 0) {
        urlParams.set(key, values.join(','));
      }
    });
    
    router.replace(`/san-pham/${categorySlug}?${urlParams.toString()}`, { scroll: false });
  };

  // 3. Derived Options for Filter Sheet (Only from products IN THIS CATEGORY)
  const filterConfigs = useMemo<FilterConfig[]>(() => {
    const getUnique = (key: string) => {
      if (key === 'application') {
         const set = new Set<string>();
         allCategoryProducts.forEach(p => p.applications?.forEach((a: string) => set.add(a)));
         return Array.from(set).filter(v => v && v !== '-' && v !== 'N/A');
      }
      return Array.from(new Set(allCategoryProducts.map(p => (p as any)[key]))).filter(v => v && v !== '-' && v !== 'N/A');
    };

    const formatValue = (key: string, val: string) => {
       const numMatch = val.match(/[0-9.]+/);
       const num = numMatch ? parseFloat(numMatch[0]) : 0;
       
       if (key === 'capacity') {
         if (category.slug === 'nap-nhua' || category.slug === 'phoi-pet') return `${num} mm`;
         if (val.toLowerCase().includes('l') && !val.toLowerCase().includes('ml')) return `${num} L`;
         return (num >= 1000 && num % 100 === 0) ? `${num / 1000} L` : `${num} ml`;
       }
       if (key === 'weight') return `${num} g`;
       if (key === 'neck' || key === 'compatibleNeck') return val.startsWith('Φ') ? val : `Φ${val}`;
       return val;
    };

    const configs: FilterConfig[] = [];
    let preferredFacets: { id: string; label: string }[] = [];
    
    if (category.slug === 'chai-pet') {
      preferredFacets = [
        { id: 'capacity', label: 'Dung tích' },
        { id: 'neck', label: 'Cổ chai / Ren' },
        { id: 'shape', label: 'Kiểu dáng' },
        { id: 'application', label: 'Ứng dụng' },
        { id: 'weight', label: 'Khối lượng' },
        { id: 'color', label: 'Màu sắc' },
        { id: 'material', label: 'Vật liệu' }
      ];
    } else if (category.slug === 'chai-hdpe') {
      preferredFacets = [
        { id: 'capacity', label: 'Dung tích' },
        { id: 'neck', label: 'Cổ chai / Ren' },
        { id: 'shape', label: 'Kiểu dáng' },
        { id: 'application', label: 'Ứng dụng' },
        { id: 'color', label: 'Màu sắc' },
        { id: 'material', label: 'Vật liệu' }
      ];
    } else if (category.slug === 'nap-nhua') {
      preferredFacets = [
        { id: 'neck', label: 'Cỡ cổ tương thích' },
        { id: 'capType', label: 'Loại nắp' },
        { id: 'material', label: 'Vật liệu' },
        { id: 'closureType', label: 'Kiểu đóng' },
        { id: 'application', label: 'Ứng dụng' }
      ];
    } else if (category.slug === 'phoi-pet') {
      preferredFacets = [
        { id: 'weight', label: 'Khối lượng' },
        { id: 'neck', label: 'Cổ phôi' },
        { id: 'color', label: 'Màu sắc' },
        { id: 'material', label: 'Vật liệu' }
      ];
    } else if (category.slug === 'hu-nhua') {
      preferredFacets = [
        { id: 'capacity', label: 'Dung tích' },
        { id: 'neck', label: 'Đường kính miệng / Cổ' },
        { id: 'material', label: 'Vật liệu' },
        { id: 'shape', label: 'Kiểu dáng' },
        { id: 'application', label: 'Ứng dụng' }
      ];
    } else if (category.slug === 'can-nhua') {
      preferredFacets = [
        { id: 'capacity', label: 'Dung tích' },
        { id: 'neck', label: 'Cổ / Miệng can' },
        { id: 'material', label: 'Vật liệu' },
        { id: 'shape', label: 'Kiểu dáng' },
        { id: 'application', label: 'Ứng dụng' }
      ];
    } else {
      preferredFacets = [
        { id: 'capacity', label: 'Dung tích' },
        { id: 'neck', label: 'Cổ / Miệng' },
        { id: 'material', label: 'Vật liệu' },
        { id: 'application', label: 'Ứng dụng' }
      ];
    }

    preferredFacets.forEach(facet => {
      let values = getUnique(facet.id);
      if (values.length < 2) return;
      
      const options = values.map(v => ({ value: v, label: formatValue(facet.id, v) }));
      
      if (facet.id === 'capacity' || facet.id === 'weight') {
        options.sort((a, b) => {
           const numA = parseFloat(a.value.replace(/[^0-9.]/g, '')) || 0;
           const numB = parseFloat(b.value.replace(/[^0-9.]/g, '')) || 0;
           return numA - numB;
        });
      }

      configs.push({
        id: facet.id,
        label: facet.label,
        type: 'checkbox',
        options
      });
    });

    return configs;
  }, [allCategoryProducts, category.slug]);

  // 4. Filtering Logic
  const filteredProducts = useMemo(() => {
    let result = [...allCategoryProducts];

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
        const numA = parseFloat((a.capacity || '0').replace(/[^0-9.]/g, ''));
        const numB = parseFloat((b.capacity || '0').replace(/[^0-9.]/g, ''));
        return sortOption === 'capacity-asc' ? numA - numB : numB - numA;
      });
    }

    return result;
  }, [allCategoryProducts, searchQuery, selectedFilters, sortOption]);

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

  const handleClearAll = () => {
    setSelectedFilters({});
    updateUrl({}, searchQuery, sortOption);
  };

  // Prepare active filters list
  const activeFiltersList = Object.entries(selectedFilters).flatMap(([groupId, values]) => {
    const config = filterConfigs.find(c => c.id === groupId);
    if (!config || !config.options) return [];
    return values.map(val => {
      const option = config.options!.find(o => o.value === val);
      return { type: groupId, value: val, label: option ? option.label : val };
    });
  });

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-32 md:pb-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-[11px] md:text-[13px] font-medium text-[#64748B] mb-2 md:mb-6 overflow-x-auto whitespace-nowrap no-scrollbar pb-0.5">
          <Link href="/" className="hover:text-[#1677FF] transition-colors">Trang chủ</Link>
          <ChevronRight className="w-3 h-3 md:w-3.5 md:h-3.5 opacity-60" />
          <Link href="/san-pham" className="hover:text-[#1677FF] transition-colors">Sản phẩm</Link>
          <ChevronRight className="w-3 h-3 md:w-3.5 md:h-3.5 opacity-60" />
          <span className="text-[#0F172A]">{category.name}</span>
        </div>

        {/* Category Header */}
        <div className="mb-2 md:mb-8">
          <div className="flex items-baseline gap-2 mb-0.5 md:mb-2">
            <h1 className="text-[24px] md:text-[32px] font-bold text-[#0F172A] leading-tight tracking-tight">{category.name}</h1>
            <span className="md:hidden text-[11px] font-bold text-[#94A3B8]">({filteredProducts.length})</span>
          </div>
          <p className="text-[13px] md:text-[15px] text-[#64748B] max-w-2xl leading-snug">
            {category.description}
          </p>
        </div>

        {/* Category Quick Nav */}
        <CategoryQuickNav categories={categories} />

        {/* Toolbar */}
        <CatalogToolbar 
          resultCount={filteredProducts.length}
          activeFilterCount={activeFiltersList.length}
          onOpenFilter={() => setIsFilterOpen(true)}
          searchQuery={searchQuery}
          onSearchChange={(q) => { setSearchQuery(q); updateUrl(selectedFilters, q, sortOption); }}
          sortOption={sortOption}
          onSortChange={(s) => { setSortOption(s); updateUrl(selectedFilters, searchQuery, s); }}
          allProducts={allCategoryProducts}
        />

        {/* Active Filters */}
        <ActiveFilters 
          filters={activeFiltersList}
          onRemoveFilter={handleFilterChange}
          onClearAll={handleClearAll}
        />

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-4 lg:gap-5 mb-12 md:mb-16">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product: any) => (
              <ProductCard key={product.id} product={{...product, href: `/san-pham/${category.slug}/${product.slug}`}} />
            ))
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
                    onClick={() => { setSearchQuery(''); updateUrl(selectedFilters, '', sortOption); }}
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
                    onClick={() => { handleClearAll(); setSearchQuery(''); updateUrl({}, '', sortOption); }}
                    className="px-5 py-2.5 bg-[#F1F5F9] text-[#0F172A] text-[14px] font-medium rounded-full hover:bg-[#E2E8F0] transition-colors"
                  >
                    Xem tất cả trong danh mục
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

        {/* Optional Category Related Stuff */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 border-t border-[#E2E8F0] pt-12 md:pt-16">
          {/* Related Articles */}
          <div className="bg-white rounded-[16px] md:rounded-[24px] border border-[#E2E8F0] p-6 md:p-8">
            <h2 className="text-[18px] md:text-[20px] font-bold text-[#0F172A] mb-6">Kiến thức {category.name}</h2>
            <div className="space-y-4">
              <Link href="/tin-tuc/pet-vs-hdpe-lua-chon-vat-lieu" className="block group">
                <h3 className="font-semibold text-[#334155] group-hover:text-[#1677FF] mb-1">PET hay HDPE? Lựa chọn vật liệu phù hợp</h3>
                <p className="text-[13px] text-[#64748B]">So sánh đặc tính kỹ thuật và ứng dụng.</p>
              </Link>
              <div className="border-t border-[#E2E8F0]"></div>
              <Link href="/tin-tuc/cach-chon-co-chai-phi28-phi30" className="block group">
                <h3 className="font-semibold text-[#334155] group-hover:text-[#1677FF] mb-1">Cách chọn cổ chai Φ28 và Φ30</h3>
                <p className="text-[13px] text-[#64748B]">Hướng dẫn kỹ thuật chọn kích thước cổ chai, bước ren.</p>
              </Link>
            </div>
            <Link href="/tin-tuc" className="inline-flex items-center text-[14px] font-semibold text-[#1677FF] mt-6">
              Xem tất cả bài viết <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          
          {/* Related Categories/Industries */}
          <div className="bg-white rounded-[16px] md:rounded-[24px] border border-[#E2E8F0] p-4 md:p-8">
            <h2 className="text-[16px] md:text-[20px] font-bold text-[#0F172A] mb-4 md:mb-6">Giải pháp ứng dụng</h2>
            <div className="flex flex-wrap gap-1.5 md:gap-3">
              <Link href="/giai-phap/thuc-pham-do-uong" className="px-3 py-1.5 bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#334155] text-[12px] md:text-[14px] font-bold rounded-md transition-colors">
                Thực phẩm & Đồ uống
              </Link>
              <Link href="/giai-phap/hoa-my-pham" className="px-3 py-1.5 bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#334155] text-[12px] md:text-[14px] font-bold rounded-md transition-colors">
                Hóa mỹ phẩm
              </Link>
              <Link href="/giai-phap/duoc-pham-y-te" className="px-3 py-1.5 bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#334155] text-[12px] md:text-[14px] font-bold rounded-md transition-colors">
                Dược phẩm y tế
              </Link>
              <Link href="/giai-phap/nong-duoc-bvtv" className="px-3 py-1.5 bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#334155] text-[12px] md:text-[14px] font-bold rounded-md transition-colors">
                Nông dược & BVTV
              </Link>
            </div>
          </div>
        </div>

      </div>

      {/* Filter Sheet */}
      <FilterSheet 
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        title={`Bộ lọc ${category.name}`}
        configs={filterConfigs}
        selectedFilters={selectedFilters}
        onFilterChange={handleFilterChange}
        onClearAll={handleClearAll}
        resultCount={filteredProducts.length}
      />
    </div>
  );
}

export default function CategoryPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-8"><div className="text-[#64748B] font-medium text-[14px] animate-pulse">Đang tải...</div></div>}>
      <CategoryContent />
    </Suspense>
  );
}
