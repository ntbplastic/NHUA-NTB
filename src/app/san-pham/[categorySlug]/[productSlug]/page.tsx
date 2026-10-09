"use client";

import { useEffect, useState } from 'react';
import { DataProvider } from '@/lib/data/Provider';
import { useData } from '@/lib/data/useData';
import { mockProducts } from '@/lib/mock/products';
import { mockCategories } from '@/lib/mock/categories';
import { mockArticles } from '@/lib/mock/articles';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, GitCompare, Heart, ChevronRight, Check, Share2, Ruler, ShieldCheck } from 'lucide-react';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';
import { Button } from '@/components/ui/Button';
import { cn, getCategoryUrl, getProductUrl } from '@/lib/utils';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { useSavedProducts, useRFQ, useCompare, useRecentlyViewed } from '@/lib/store';
import { ProductCard } from '@/components/ui/ProductCard';
import { ProductGallery } from '@/components/ui/ProductGallery';
import { SampleModal } from '@/components/ui/SampleModal';

export default function ProductDetailPage() {
  const { categorySlug, productSlug } = useParams();
  
  const { data: products }: { data: any[] } = useData(() => DataProvider.getProducts(), mockProducts);
  const { data: categories }: { data: any[] } = useData(() => DataProvider.getCategories(), mockCategories);
  const { data: articles }: { data: any[] } = useData(() => DataProvider.getArticles(), mockArticles);
  
  const category = categories.find((c: any) => c.slug === categorySlug);
  const product = products.find((p: any) => p.slug === productSlug && p.categoryId === category?.id);
  
  const { isSaved, toggleSaved } = useSavedProducts();
  const { addToRFQ, isInRFQ } = useRFQ();
  const { isCompared, toggleCompare } = useCompare();
  const { addRecent, recent } = useRecentlyViewed();

  const [showToast, setShowToast] = useState('');
  const [isSampleModalOpen, setIsSampleModalOpen] = useState(false);

  useEffect(() => {
    if (product) {
      addRecent(product.id);
    }
    
    const handleOpenSample = () => setIsSampleModalOpen(true);
    window.addEventListener('open-sample-modal', handleOpenSample);
    return () => window.removeEventListener('open-sample-modal', handleOpenSample);
  }, [product?.id]);

  if (!category || !product) {
    return notFound();
  }
  
  const saved = isSaved(product.id);
  const inRfq = isInRFQ(product.id);
  const compared = isCompared(product.id);

  const backLink = getCategoryUrl(category.slug);

  const handleAction = (action: string) => {
    if (action === 'save') {
      toggleSaved(product.id);
      setShowToast(saved ? 'Đã bỏ lưu sản phẩm' : 'Đã lưu sản phẩm');
      setTimeout(() => setShowToast(''), 3000);
    } else if (action === 'rfq') {
      addToRFQ(product.id);
      setShowToast('Đã thêm vào yêu cầu báo giá');
      setTimeout(() => setShowToast(''), 3000);
    } else if (action === 'compare') {
      toggleCompare(product.id);
      setShowToast(compared ? 'Đã gỡ khỏi so sánh' : 'Đã thêm vào so sánh');
      setTimeout(() => setShowToast(''), 3000);
    } else if (action === 'sample') {
      setIsSampleModalOpen(true);
    } else if (action === 'share') {
      if (navigator.share) {
        navigator.share({
          title: product.name,
          url: window.location.href,
        }).catch(console.error);
      } else {
        navigator.clipboard.writeText(window.location.href);
        setShowToast('Đã sao chép liên kết');
        setTimeout(() => setShowToast(''), 3000);
      }
    }
  };

  // Compute related data
  const sameFamily = products.filter(p => p.familyId === product.familyId && p.id !== product.id).slice(0, 5);
  
  const similarProducts = product.relatedProductIds 
    ? products.filter(p => product.relatedProductIds.includes(p.id) && p.id !== product.id).slice(0, 5)
    : products.filter(p => p.categoryId === product.categoryId && p.id !== product.id).slice(0, 5);
  
  const compatibleProducts = product.compatibleProductIds
    ? products.filter(p => product.compatibleProductIds.includes(p.id))
    : [];

  const getRelatedArticles = () => {
    if (product.relatedArticleIds && product.relatedArticleIds.length > 0) {
      return articles.filter(a => product.relatedArticleIds.includes(a.id));
    }
    const byCategory = articles.filter(a => a.relatedCategoryIds?.includes(product.categoryId));
    if (byCategory.length > 0) return byCategory;
    
    // We don't have industryIds or applicationIds in mock articles, so just return empty
    return [];
  };
  
  const relatedArticles = getRelatedArticles();

  const recentProducts = recent
    .filter(id => id !== product.id)
    .map(id => products.find(p => p.id === id))
    .filter(Boolean)
    .slice(0, 6);

  // Specifications
  const specs = [
    { label: 'Vật liệu', value: product.material },
    { label: 'Dung tích', value: product.capacity },
    { label: 'Cổ chai / Ren', value: product.neck },
    { label: 'Khối lượng', value: product.weight },
    { label: 'Chiều cao', value: product.height },
    { label: 'Đường kính', value: product.diameter },
    { label: 'Màu sắc', value: product.color },
    { label: 'Kiểu dáng', value: product.shape },
    { label: 'Tùy chỉnh', value: product.customizable ? 'Có hỗ trợ' : undefined },
  ].filter(s => s.value);

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-32 md:pb-40">
      <SampleModal isOpen={isSampleModalOpen} onClose={() => setIsSampleModalOpen(false)} productName={product.name} />

      {/* Toast */}
      {showToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#0F172A] text-white px-4 py-2 rounded-full shadow-lg text-[13px] font-medium flex items-center gap-2 animate-in slide-in-from-top-4">
          <Check className="w-4 h-4 text-[#10B981]" />
          {showToast}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">
        
        {/* BREADCRUMB */}
        <Breadcrumb 
          items={[
            { label: "Trang chủ", href: "/" },
            { label: "Sản phẩm", href: "/san-pham" },
            { label: category.name, href: backLink },
            { label: product.name }
          ]}
          className="mb-4 overflow-x-auto no-scrollbar whitespace-nowrap pb-1"
        />
        
        {/* Product Core: Left Gallery, Right Content */}
        <div className="bg-white rounded-[16px] md:rounded-[24px] border border-[#E2E8F0] shadow-sm overflow-hidden mb-8 md:mb-12">
          <div className="flex flex-col lg:flex-row">
            
            {/* Visual Gallery */}
            <div className="w-full lg:w-[52%] p-5 md:p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-[#E2E8F0] bg-[#F8FAFC]">
              <ProductGallery product={product} />
            </div>

            {/* Product Details */}
            <div className="w-full lg:w-[48%] p-5 md:p-8 lg:p-10 flex flex-col">
              <div className="mb-4">
                <div className="inline-flex items-center gap-2 mb-3">
                  {product.sku && (
                    <span className="px-2.5 py-1 bg-[#F1F5F9] text-[#475569] text-[11px] font-bold font-mono tracking-wider rounded border border-[#E2E8F0]">
                      SKU: {product.sku}
                    </span>
                  )}
                  {product.material && <span className="text-[12px] font-bold text-[#1677FF] bg-[#F0F5FF] px-2 py-1 rounded">{product.material}</span>}
                </div>
                <h1 className="text-[24px] md:text-[36px] font-bold text-[#0F172A] mb-2 leading-tight tracking-tight">{product.name}</h1>
                
                {/* Compact Meta summary */}
                <div className="flex items-center text-[#64748B] text-[14px] md:text-[15px] font-medium mt-3 gap-2 flex-wrap">
                  {product.material && <span>{product.material}</span>}
                  {product.capacity && <><span className="text-[#CBD5E1]">•</span><span>{product.capacity}</span></>}
                  {product.neck && <><span className="text-[#CBD5E1]">•</span><span>Cổ {product.neck}</span></>}
                  {product.weight && <><span className="text-[#CBD5E1]">•</span><span>{product.weight}</span></>}
                </div>
              </div>

              <div className="flex-1">
                <p className="text-[14px] md:text-[15px] text-[#475569] mb-8 leading-relaxed">
                  Bao bì nhựa chuyên dụng công nghiệp sản xuất bởi Nhựa Nguyên Thái Bình. Vật liệu {product.material} với các thông số kỹ thuật được chuẩn hóa.
                </p>
                
                {/* Specs */}
                <h3 className="text-[13px] font-bold text-[#64748B] uppercase tracking-wider mb-3">Thông số cơ bản</h3>
                <div className="border border-[#E2E8F0] rounded-[12px] overflow-hidden mb-8 text-[13px] md:text-[14px]">
                  {specs.map((spec, i) => (
                    <div key={i} className="flex border-b border-[#E2E8F0] last:border-0 bg-white">
                      <div className="w-[40%] p-3 md:p-3.5 text-[#64748B] bg-[#F8FAFC] border-r border-[#E2E8F0]">{spec.label}</div>
                      <div className="w-[60%] p-3 md:p-3.5 font-bold text-[#0F172A]">{spec.value}</div>
                    </div>
                  ))}
                </div>
                
                {/* Applications */}
                {product.applications && product.applications.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-[13px] font-bold text-[#64748B] uppercase tracking-wider mb-3">Phù hợp cho</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.applications.map((app: string, idx: number) => (
                        <div key={idx} className="px-3 py-1.5 bg-[#F1F5F9] text-[#334155] text-[13px] font-medium rounded-full flex items-center gap-1.5 border border-[#E2E8F0]">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></div>
                          {app}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Actions Stack */}
              <div className="mt-8 pt-6 border-t border-[#E2E8F0] flex flex-col gap-3">
                <div className="flex flex-col sm:flex-row gap-3">
                  {inRfq ? (
                    <Button asChild variant="outline" className="h-[48px] flex-1 rounded-[12px] text-[15px] border-[#A7F3D0] bg-[#ECFDF5] text-[#059669] hover:bg-[#D1FAE5]">
                      <Link href="/rfq">Đã thêm vào YCBG</Link>
                    </Button>
                  ) : (
                    <Button onClick={() => handleAction('rfq')} variant="primary" color="blue" className="h-[48px] flex-1 rounded-[12px] text-[15px]">
                      Yêu cầu báo giá
                    </Button>
                  )}
                  <button onClick={() => handleAction('sample')} className="h-[48px] flex-1 sm:w-auto px-6 bg-white hover:bg-[#F1F5F9] text-[#0F172A] border border-[#CBD5E1] rounded-[12px] transition-colors flex items-center justify-center gap-2 text-[15px] font-bold active:scale-[0.97]">
                    Xin mẫu
                  </button>
                </div>

                {/* Secondary Actions */}
                <div className="flex items-center justify-start gap-2 mt-2">
                  <button onClick={() => handleAction('save')} className={cn("h-10 px-4 bg-white hover:bg-[#F8FAFC] border border-[#E2E8F0] rounded-[8px] transition-colors flex items-center justify-center gap-2 active:scale-[0.97] text-[13px] font-medium", saved ? "text-[#1677FF] border-[#1677FF]/30 bg-[#F0F5FF]" : "text-[#475569]")}>
                    <Heart className={cn("w-4 h-4", saved && "fill-[#1677FF]")} />
                    {saved ? 'Đã lưu' : 'Lưu mẫu'}
                  </button>
                  <button onClick={() => handleAction('compare')} className={cn("h-10 px-4 bg-white hover:bg-[#F8FAFC] border border-[#E2E8F0] rounded-[8px] transition-colors flex items-center justify-center gap-2 active:scale-[0.97] text-[13px] font-medium", compared ? "text-[#1677FF] border-[#1677FF]/30 bg-[#F0F5FF]" : "text-[#475569]")}>
                    <GitCompare className="w-4 h-4" />
                    So sánh
                  </button>
                  <button onClick={() => handleAction('share')} className="h-10 px-4 bg-white hover:bg-[#F8FAFC] border border-[#E2E8F0] rounded-[8px] transition-colors flex items-center justify-center gap-2 active:scale-[0.97] text-[13px] font-medium text-[#475569]">
                    <Share2 className="w-4 h-4" />
                    Chia sẻ
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Variants / Cùng dòng */}
        {sameFamily.length > 0 && (
          <div className="mb-10 md:mb-14">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-[20px] md:text-[24px] font-bold text-[#0F172A]">Cùng dòng sản phẩm</h2>
            </div>
            <div className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-4 pb-4 -mx-4 px-4 md:mx-0 md:px-0">
              {sameFamily.map(p => {
                const pCategory = categories.find((c: any) => c.id === p.categoryId);
                const href = pCategory ? getProductUrl(p.slug, pCategory.slug) : `/san-pham/${p.slug}`;
                return (
                  <Link key={p.id} href={href} className="w-[140px] md:w-[160px] shrink-0 snap-start bg-white border border-[#E2E8F0] hover:border-[#1677FF] rounded-[12px] overflow-hidden transition-all duration-150 active:scale-[0.98] group">
                    <div className="aspect-square bg-[#F8FAFC] p-3 flex items-center justify-center">
                      <ImageWithFallback src={p.image || ""} alt={p.name} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform" />
                    </div>
                    <div className="p-3 border-t border-[#E2E8F0] text-center">
                      <div className="font-bold text-[#0F172A] text-[14px]">{p.capacity}</div>
                      <div className="text-[12px] text-[#64748B]">{p.neck}</div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Compatible Products */}
        {compatibleProducts.length > 0 && (
          <div className="mb-10 md:mb-14 border-t border-[#E2E8F0] pt-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-5 gap-2">
              <h2 className="text-[20px] md:text-[24px] font-bold text-[#0F172A]">Sản phẩm tương thích</h2>
              <span className="text-[13px] text-[#64748B] bg-[#F1F5F9] px-3 py-1 rounded-full border border-[#E2E8F0]">Được liên kết cùng cổ {product.neck} trong dữ liệu sản phẩm</span>
            </div>
            <div className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-4 pb-4 -mx-4 px-4 md:mx-0 md:px-0">
              {compatibleProducts.map(p => {
                const pCategory = categories.find((c: any) => c.id === p.categoryId);
                const href = pCategory ? getProductUrl(p.slug, pCategory.slug) : `/san-pham/${p.slug}`;
                return <div key={p.id} className="w-[75vw] sm:w-[280px] md:w-[240px] shrink-0 snap-start"><ProductCard product={{...p, href}} /></div>
              })}
            </div>
          </div>
        )}

        {/* Customization CTA */}
        {product.customizable && (
          <div className="mb-10 md:mb-14 bg-[#0F172A] rounded-[16px] md:rounded-[24px] overflow-hidden relative border border-[#334155]">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-[#1677FF] via-transparent to-transparent"></div>
            <div className="p-5 md:p-8 flex flex-col md:flex-row items-center justify-between relative z-10 gap-4 md:gap-6">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <Ruler className="w-6 h-6 md:w-7 md:h-7 text-[#60A5FA]" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-[18px] md:text-[22px] font-bold text-white mb-1 md:mb-2">Cần một thiết kế riêng?</h2>
                <p className="text-[#94A3B8] text-[13px] md:text-[14px] leading-relaxed max-w-2xl">
                  Trao đổi yêu cầu thiết kế, dung tích, cổ chai hoặc phát triển khuôn với đội ngũ kỹ thuật NTB.
                </p>
              </div>
              <div className="w-full md:w-auto shrink-0">
                <Link href="/nang-luc/khuon-co-khi-chinh-xac" className="w-full md:w-auto h-[44px] md:h-[48px] px-6 md:px-8 bg-[#1677FF] hover:bg-[#1677FF]/90 text-white font-bold rounded-[12px] flex items-center justify-center transition-all duration-150 active:scale-[0.98] text-[14px] md:text-[15px]">
                  Trao đổi thiết kế & khuôn
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <div className="mb-10 md:mb-14 border-t border-[#E2E8F0] pt-8">
            <h2 className="text-[20px] md:text-[24px] font-bold text-[#0F172A] mb-5">Sản phẩm tương tự</h2>
            <div className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-4 pb-4 -mx-4 px-4 md:mx-0 md:px-0">
              {similarProducts.map(p => {
                const pCategory = categories.find((c: any) => c.id === p.categoryId);
                const href = pCategory ? getProductUrl(p.slug, pCategory.slug) : `/san-pham/${p.slug}`;
                return <div key={p.id} className="w-[75vw] sm:w-[280px] md:w-[240px] shrink-0 snap-start"><ProductCard product={{...p, href}} /></div>
              })}
            </div>
          </div>
        )}

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="mb-10 md:mb-14 border-t border-[#E2E8F0] pt-8">
            <h2 className="text-[20px] md:text-[24px] font-bold text-[#0F172A] mb-5">Kiến thức kỹ thuật liên quan</h2>
            <div className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-4 pb-4 -mx-4 px-4 md:mx-0 md:px-0">
              {relatedArticles.map((article: any) => (
                <Link key={article.id} href={`/tin-tuc/${article.slug}`} className="w-[80vw] sm:w-[320px] shrink-0 snap-start group bg-white border border-[#E2E8F0] rounded-[16px] overflow-hidden hover:border-[#1677FF] active:scale-[0.98] transition-all duration-150 flex flex-col">
                  <div className="aspect-[2/1] bg-[#F8FAFC] overflow-hidden">
                    <ImageWithFallback src={article.image || ""} alt={article.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="font-bold text-[#0F172A] text-[15px] mb-2 group-hover:text-[#1677FF] transition-colors line-clamp-2">{article.title}</h3>
                    <p className="text-[#64748B] text-[13px] line-clamp-2 mb-3 flex-1">{article.summary}</p>
                    <div className="text-[#1677FF] text-[13px] font-semibold flex items-center mt-auto">
                      Đọc tiếp <ChevronRight className="w-4 h-4 ml-1" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Recently Viewed */}
        {recentProducts.length > 0 && (
          <div className="mb-10 md:mb-14 border-t border-[#E2E8F0] pt-8">
            <h2 className="text-[20px] md:text-[24px] font-bold text-[#0F172A] mb-5">Sản phẩm đã xem gần đây</h2>
            <div className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-4 pb-4 -mx-4 px-4 md:mx-0 md:px-0">
              {recentProducts.map(p => {
                const pCategory = categories.find((c: any) => c.id === p.categoryId);
                const href = pCategory ? getProductUrl(p.slug, pCategory.slug) : `/san-pham/${p.slug}`;
                return <div key={p.id} className="w-[75vw] sm:w-[280px] md:w-[240px] shrink-0 snap-start"><ProductCard product={{...p, href}} /></div>
              })}
            </div>
          </div>
        )}

        {/* Trust Bridge */}
        <div className="mb-6 pt-8 border-t border-[#E2E8F0]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/nang-luc-nha-may" className="bg-white p-4 md:p-5 rounded-[16px] border border-[#E2E8F0] flex flex-row md:flex-col items-center text-left md:text-center hover:border-[#1677FF] transition-all duration-150 active:scale-[0.98] gap-3 md:gap-0">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-[#F0F5FF] rounded-full flex items-center justify-center shrink-0 md:mb-3">
                <Check className="w-5 h-5 md:w-6 md:h-6 text-[#1677FF]" />
              </div>
              <div>
                <h3 className="font-bold text-[#0F172A] text-[14px] md:text-[15px] mb-0.5 md:mb-1">Năng lực nhà máy</h3>
                <p className="text-[#64748B] text-[12px] md:text-[13px]">Hệ thống máy ép phun và máy thổi đa dạng.</p>
              </div>
            </Link>
            <Link href="/nang-luc/khuon-co-khi-chinh-xac" className="bg-white p-4 md:p-5 rounded-[16px] border border-[#E2E8F0] flex flex-row md:flex-col items-center text-left md:text-center hover:border-[#1677FF] transition-all duration-150 active:scale-[0.98] gap-3 md:gap-0">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-[#F0F5FF] rounded-full flex items-center justify-center shrink-0 md:mb-3">
                <Ruler className="w-5 h-5 md:w-6 md:h-6 text-[#1677FF]" />
              </div>
              <div>
                <h3 className="font-bold text-[#0F172A] text-[14px] md:text-[15px] mb-0.5 md:mb-1">Khuôn & Cơ khí chính xác</h3>
                <p className="text-[#64748B] text-[12px] md:text-[13px]">Hỗ trợ chế tạo khuôn theo yêu cầu sản phẩm.</p>
              </div>
            </Link>
            <Link href="/quy-trinh" className="bg-white p-4 md:p-5 rounded-[16px] border border-[#E2E8F0] flex flex-row md:flex-col items-center text-left md:text-center hover:border-[#1677FF] transition-all duration-150 active:scale-[0.98] gap-3 md:gap-0">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-[#F0F5FF] rounded-full flex items-center justify-center shrink-0 md:mb-3">
                <ShieldCheck className="w-5 h-5 md:w-6 md:h-6 text-[#1677FF]" />
              </div>
              <div>
                <h3 className="font-bold text-[#0F172A] text-[14px] md:text-[15px] mb-0.5 md:mb-1">Quy trình phát triển</h3>
                <p className="text-[#64748B] text-[12px] md:text-[13px]">Từ ý tưởng đến sản xuất hàng loạt.</p>
              </div>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
