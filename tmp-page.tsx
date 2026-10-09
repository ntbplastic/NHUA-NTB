"use client";

import { useEffect, useState } from 'react';
import { DataProvider } from '@/lib/data/Provider';
import { useData } from '@/lib/data/useData';
import { mockProducts } from '@/lib/mock/products';
import { mockCategories } from '@/lib/mock/categories';
import { mockArticles } from '@/lib/mock/articles';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, GitCompare, Heart, Box, ShieldCheck, Truck, ChevronRight, Check } from 'lucide-react';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';
import { Button } from '@/components/ui/Button';
import { cn, getCategoryUrl, getProductUrl } from '@/lib/utils';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { useSavedProducts, useRFQ, useCompare, useRecentlyViewed } from '@/lib/store';
import { ProductCard } from '@/components/ui/ProductCard';

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

  useEffect(() => {
    if (product) {
      addRecent(product.id);
    }
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
    } else if (action === 'rfq') {
      addToRFQ(product.id);
      setShowToast('Đã thêm vào yêu cầu báo giá');
    } else if (action === 'sample') {
      addToRFQ(product.id, true); // true for needSample
      setShowToast('Đã thêm vào danh sách xin mẫu');
    } else if (action === 'compare') {
      toggleCompare(product.id);
      setShowToast(compared ? 'Đã gỡ khỏi so sánh' : 'Đã thêm vào so sánh');
    }
    setTimeout(() => setShowToast(''), 3000);
  };

  // Compute related data
  const sameFamily = products.filter(p => p.familyId === product.familyId && p.id !== product.id).slice(0, 4);
  const similarProducts = product.relatedProductIds 
    ? products.filter(p => product.relatedProductIds.includes(p.id) && p.id !== product.id)
    : products.filter(p => p.categoryId === product.categoryId && p.id !== product.id).slice(0, 4);
  
  const compatibleProducts = product.compatibleProductIds
    ? products.filter(p => product.compatibleProductIds.includes(p.id))
    : [];

  const relatedArticles = product.relatedArticleIds
    ? articles.filter(a => product.relatedArticleIds.includes(a.id))
    : articles.slice(0, 2);

  const recentProducts = recent
    .filter(id => id !== product.id)
    .map(id => products.find(p => p.id === id))
    .filter(Boolean)
    .slice(0, 4);

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-20">
      
      {/* Toast */}
      {showToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#0F172A] text-white px-4 py-2 rounded-full shadow-lg text-[13px] font-medium flex items-center gap-2 animate-in slide-in-from-top-4">
          <Check className="w-4 h-4 text-[#10B981]" />
          {showToast}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
        
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

        <Link href={backLink} className="inline-flex items-center text-[13px] font-medium text-[#64748B] hover:text-[#1677FF] mb-6 md:mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-1.5" />
          Quay lại danh mục {category.name}
        </Link>
        
        <div className="bg-white rounded-[16px] md:rounded-[24px] border border-[#E2E8F0] shadow-sm overflow-hidden mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            
            {/* Visual Gallery */}
            <div className="p-6 md:p-10 border-b lg:border-b-0 lg:border-r border-[#E2E8F0] bg-[#F2F6F7]">
              <div className="aspect-[4/3] bg-white rounded-[16px] border border-[#E2E8F0] flex items-center justify-center relative group mb-4 p-4">
                {product.image ? (
                  <ImageWithFallback src={product.image} alt={product.name} className="w-full h-full object-contain mix-blend-multiply" />
                ) : (
                  <div className="w-full h-full bg-[#E2E8F0] rounded-[8px] flex items-center justify-center text-[#94A3B8]">Không có ảnh</div>
                )}
              </div>
              <div className="grid grid-cols-4 gap-3">
                <div className="aspect-square bg-white border-2 border-[#1677FF] rounded-lg p-2 cursor-pointer shadow-sm">
                  {product.image ? <ImageWithFallback src={product.image} alt={product.name} className="w-full h-full object-contain mix-blend-multiply" /> : <div className="w-full h-full bg-[#E2E8F0] rounded"></div>}
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="p-6 md:p-10 flex flex-col">
              <div>
                <div className="inline-flex px-2 py-1 bg-[#F1F5F9] text-[#64748B] text-[11px] font-bold font-mono tracking-wider rounded mb-3 border border-[#E2E8F0]">
                  SKU: {product.sku}
                </div>
                <h1 className="text-[24px] md:text-[32px] font-bold text-[#0F172A] mb-3 md:mb-4 leading-tight">{product.name}</h1>
                
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  {product.material && <span className="px-2.5 py-1 bg-[#F1F5F9] text-[#475569] text-[12px] font-medium rounded">{product.material}</span>}
                  {product.capacity && <span className="px-2.5 py-1 bg-[#F1F5F9] text-[#475569] text-[12px] font-medium rounded">{product.capacity}</span>}
                  {product.neck && <span className="px-2.5 py-1 bg-[#F1F5F9] text-[#475569] text-[12px] font-medium rounded">Cổ {product.neck}</span>}
                  {product.customizable && <span className="px-2.5 py-1 bg-[#ECFDF5] text-[#059669] text-[12px] font-medium rounded border border-[#A7F3D0]">Hỗ trợ tùy chỉnh</span>}
                </div>

                <p className="text-[14px] md:text-[15px] text-[#64748B] mb-6 md:mb-8 leading-relaxed">
                  Bao bì nhựa chuyên dụng công nghiệp. Vật liệu {product.material} đạt tiêu chuẩn sản xuất kỹ thuật. Tối ưu cho dây chuyền đóng gói chiết rót tốc độ cao.
                </p>
                
                <h3 className="text-[14px] font-bold text-[#0F172A] uppercase tracking-wider mb-4 border-b border-[#E2E8F0] pb-2">Thông số kỹ thuật</h3>
                
                {/* Compact Technical Table */}
                <div className="border border-[#E2E8F0] rounded-[12px] overflow-hidden mb-8 md:mb-10 text-[13px] md:text-[14px]">
                  <div className="grid grid-cols-2 border-b border-[#E2E8F0] last:border-0 bg-white">
                    <div className="p-3 md:p-4 text-[#64748B] bg-[#F8FAFC] border-r border-[#E2E8F0]">Vật liệu</div>
                    <div className="p-3 md:p-4 font-medium text-[#0F172A]">{product.material}</div>
                  </div>
                  <div className="grid grid-cols-2 border-b border-[#E2E8F0] last:border-0 bg-white">
                    <div className="p-3 md:p-4 text-[#64748B] bg-[#F8FAFC] border-r border-[#E2E8F0]">Dung tích</div>
                    <div className="p-3 md:p-4 font-medium text-[#0F172A]">{product.capacity}</div>
                  </div>
                  <div className="grid grid-cols-2 border-b border-[#E2E8F0] last:border-0 bg-white">
                    <div className="p-3 md:p-4 text-[#64748B] bg-[#F8FAFC] border-r border-[#E2E8F0]">Cổ chai / Ren</div>
                    <div className="p-3 md:p-4 font-medium text-[#0F172A]">{product.neck}</div>
                  </div>
                  <div className="grid grid-cols-2 border-b border-[#E2E8F0] last:border-0 bg-white">
                    <div className="p-3 md:p-4 text-[#64748B] bg-[#F8FAFC] border-r border-[#E2E8F0]">Trọng lượng</div>
                    <div className="p-3 md:p-4 font-medium text-[#0F172A]">{product.weight || 'Theo yêu cầu khuôn'}</div>
                  </div>
                </div>
              </div>

              {/* Compact CTA Row */}
              <div className="flex flex-wrap gap-2.5 mt-auto pt-4 pb-2 md:relative md:p-0 z-20 border-t border-[#E2E8F0] md:border-0">
                {inRfq ? (
                  <Button asChild variant="outline" className="h-[44px] flex-1 min-w-[140px] rounded-[999px] text-[14px] border-[#A7F3D0] bg-[#ECFDF5] text-[#059669] hover:bg-[#D1FAE5]">
                    <Link href="/rfq">Đã thêm vào YCBG</Link>
                  </Button>
                ) : (
                  <Button onClick={() => handleAction('rfq')} variant="primary" color="blue" className="h-[44px] flex-1 min-w-[140px] rounded-[999px] text-[14px]">
                    Báo giá sản phẩm
                  </Button>
                )}
                
                <button onClick={() => handleAction('sample')} className="h-[44px] px-5 bg-white hover:bg-[#F1F5F9] text-[#0F172A] border border-[#E2E8F0] rounded-[999px] transition-colors flex items-center justify-center gap-2 text-[14px] font-semibold active:scale-[0.97]">
                  Xin mẫu
                </button>
                <button onClick={() => handleAction('save')} className={cn("h-[44px] px-4 bg-white hover:bg-[#F1F5F9] border border-[#E2E8F0] rounded-[999px] transition-colors flex items-center justify-center active:scale-[0.97]", saved ? "text-[#1677FF] border-[#1677FF]/30 bg-[#F0F5FF]" : "text-[#475569]")} title="Lưu mẫu">
                  <Heart className={cn("w-4 h-4", saved && "fill-[#1677FF]")} />
                </button>
                <button onClick={() => handleAction('compare')} className={cn("h-[44px] px-4 bg-white hover:bg-[#F1F5F9] border border-[#E2E8F0] rounded-[999px] transition-colors flex items-center justify-center active:scale-[0.97]", compared ? "text-[#1677FF] border-[#1677FF]/30 bg-[#F0F5FF]" : "text-[#475569]")} title="So sánh">
                  <GitCompare className="w-4 h-4" />
                </button>
              </div>
              
              <div className="border-t border-[#E2E8F0] mt-6 pt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#1677FF] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-[#0F172A] text-[13px]">Đạt chuẩn công nghiệp</h4>
                    <p className="text-[#64748B] text-[12px] mt-0.5">Sản xuất theo quy trình ISO.</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Truck className="w-4 h-4 text-[#1677FF] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-[#0F172A] text-[13px]">Hỗ trợ giao hàng</h4>
                    <p className="text-[#64748B] text-[12px] mt-0.5">Giao hàng tận nhà máy/kho bãi.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ứng dụng (Applications) */}
        {product.applications && product.applications.length > 0 && (
          <div className="mb-12 md:mb-16">
            <h2 className="text-[20px] md:text-[24px] font-bold text-[#0F172A] mb-4 md:mb-6">Phù hợp cho sản phẩm nào?</h2>
            <div className="flex flex-wrap gap-2 md:gap-3">
              {product.applications.map((app: string, idx: number) => (
                <div key={idx} className="px-4 py-2.5 bg-white border border-[#E2E8F0] rounded-full text-[#334155] text-[14px] font-medium shadow-sm flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></div>
                  {app}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Phụ kiện phù hợp (Compatible Products) */}
        {compatibleProducts.length > 0 && (
          <div className="mb-12 md:mb-16">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <h2 className="text-[20px] md:text-[24px] font-bold text-[#0F172A]">Phụ kiện / Thành phần phù hợp</h2>
            </div>
            <div className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-3 md:gap-5 pb-4 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-4 lg:grid-cols-5">
              {compatibleProducts.map(p => {
                const pCategory = categories.find((c: any) => c.id === p.categoryId);
                const href = pCategory ? getProductUrl(p.slug, pCategory.slug) : `/san-pham/${p.slug}`;
                return <div key={p.id} className="w-[70vw] md:w-auto shrink-0 md:shrink snap-start"><ProductCard product={{...p, href}} /></div>
              })}
            </div>
          </div>
        )}

        {/* Cùng dòng sản phẩm (Same Family) */}
        {sameFamily.length > 0 && (
          <div className="mb-12 md:mb-16 border-t border-[#E2E8F0] pt-12">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <h2 className="text-[20px] md:text-[24px] font-bold text-[#0F172A]">Các mẫu cùng dòng sản phẩm</h2>
            </div>
            <div className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-3 md:gap-5 pb-4 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-4 lg:grid-cols-5">
              {sameFamily.map(p => {
                const pCategory = categories.find((c: any) => c.id === p.categoryId);
                const href = pCategory ? getProductUrl(p.slug, pCategory.slug) : `/san-pham/${p.slug}`;
                return <div key={p.id} className="w-[70vw] md:w-auto shrink-0 md:shrink snap-start"><ProductCard product={{...p, href}} /></div>
              })}
            </div>
          </div>
        )}

        {/* Sản phẩm tương tự (Similar Products) */}
        {similarProducts.length > 0 && (
          <div className="mb-12 md:mb-16 border-t border-[#E2E8F0] pt-12">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <h2 className="text-[20px] md:text-[24px] font-bold text-[#0F172A]">Sản phẩm tương tự</h2>
            </div>
            <div className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-3 md:gap-5 pb-4 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-4 lg:grid-cols-5">
              {similarProducts.map(p => {
                const pCategory = categories.find((c: any) => c.id === p.categoryId);
                const href = pCategory ? getProductUrl(p.slug, pCategory.slug) : `/san-pham/${p.slug}`;
                return <div key={p.id} className="w-[70vw] md:w-auto shrink-0 md:shrink snap-start"><ProductCard product={{...p, href}} /></div>
              })}
            </div>
          </div>
        )}

        {/* Cần mẫu chai riêng? (Customization CTA) */}
        {product.customizable && (
          <div className="mb-12 md:mb-16 bg-[#0F172A] rounded-[16px] md:rounded-[24px] overflow-hidden relative">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-400 via-transparent to-transparent"></div>
            <div className="p-8 md:p-12 flex flex-col md:flex-row items-center justify-between relative z-10">
              <div className="mb-6 md:mb-0 max-w-xl">
                <h2 className="text-[24px] md:text-[32px] font-bold text-white mb-3">Cần một thiết kế riêng?</h2>
                <p className="text-slate-300 text-[15px] leading-relaxed mb-6">
                  Chúng tôi hỗ trợ toàn trình từ Thiết kế 3D → Chế tạo khuôn cơ khí chính xác → Thử mẫu → Sản xuất hàng loạt, với chi phí khuôn tối ưu cho đơn hàng B2B.
                </p>
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className="px-3 py-1 bg-white/10 text-white text-[12px] font-medium rounded-full">Thiết kế 3D</span>
                  <span className="px-3 py-1 bg-white/10 text-white text-[12px] font-medium rounded-full">Gia công CNC khuôn</span>
                  <span className="px-3 py-1 bg-white/10 text-white text-[12px] font-medium rounded-full">Sản xuất thử</span>
                </div>
              </div>
              <div className="w-full md:w-auto shrink-0 flex flex-col gap-3">
                <Link href="/lien-he" className="w-full md:w-auto h-[48px] px-8 bg-[#1677FF] hover:bg-[#1677FF]/90 text-white font-bold rounded-full flex items-center justify-center transition-colors">
                  Trao đổi thiết kế & khuôn
                </Link>
                <Link href="/nang-luc/khuon-co-khi-chinh-xac" className="w-full md:w-auto h-[48px] px-8 bg-transparent hover:bg-white/5 text-white border border-white/20 font-bold rounded-full flex items-center justify-center transition-colors">
                  Xem năng lực khuôn mẫu
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Bài viết liên quan (Related Articles) */}
        {relatedArticles.length > 0 && (
          <div className="mb-12 md:mb-16 border-t border-[#E2E8F0] pt-12">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <h2 className="text-[20px] md:text-[24px] font-bold text-[#0F172A]">Kiến thức kỹ thuật liên quan</h2>
            </div>
            <div className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-4 md:gap-6 pb-4 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-2 lg:grid-cols-3">
              {relatedArticles.map((article: any) => (
                <Link key={article.id} href={`/tin-tuc/${article.slug}`} className="w-[85vw] md:w-auto shrink-0 md:shrink snap-start group bg-white border border-[#E2E8F0] rounded-[16px] overflow-hidden hover:shadow-md transition-all flex flex-col">
                  {article.image && (
                    <div className="aspect-[2/1] bg-slate-100 overflow-hidden">
                      <ImageWithFallback src={article.image} alt={article.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    </div>
                  )}
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="font-bold text-[#0F172A] text-[16px] mb-2 group-hover:text-[#1677FF] transition-colors line-clamp-2">{article.title}</h3>
                    <p className="text-[#64748B] text-[13px] line-clamp-2 mb-4 flex-1">{article.summary}</p>
                    <div className="text-[#1677FF] text-[13px] font-semibold flex items-center mt-auto">
                      Đọc tiếp <ChevronRight className="w-4 h-4 ml-1" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Sản phẩm đã xem gần đây (Recently Viewed) */}
        {recentProducts.length > 0 && (
          <div className="mb-12 md:mb-16 border-t border-[#E2E8F0] pt-12">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <h2 className="text-[20px] md:text-[24px] font-bold text-[#0F172A]">Sản phẩm đã xem gần đây</h2>
            </div>
            <div className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-3 md:gap-5 pb-4 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-4 lg:grid-cols-5">
              {recentProducts.map(p => {
                const pCategory = categories.find((c: any) => c.id === p.categoryId);
                const href = pCategory ? getProductUrl(p.slug, pCategory.slug) : `/san-pham/${p.slug}`;
                return <div key={p.id} className="w-[70vw] md:w-auto shrink-0 md:shrink snap-start"><ProductCard product={{...p, href}} /></div>
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
