'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ChevronRight, ArrowRight, Package, ShieldCheck, Factory, Lightbulb, FileText, Check, Box } from 'lucide-react';
import { mockIndustries } from '@/lib/mock/industries';
import { mockCategories } from '@/lib/mock/categories';
import { mockProducts } from '@/lib/mock/products';
import { mockArticles } from '@/lib/mock/articles';
import { ProductCard } from '@/components/ui/ProductCard';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';

export default function IndustryDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const industry = useMemo(() => {
    return mockIndustries.find(i => i.slug === slug);
  }, [slug]);

  const relevantCategories = useMemo(() => {
    if (!industry) return [];
    return mockCategories.filter(c => industry.categoryIds.includes(c.id));
  }, [industry]);

  const recommendedProducts = useMemo(() => {
    if (!industry) return [];
    return mockProducts.filter(p => industry.productIds.includes(p.id));
  }, [industry]);

  const relatedArticles = useMemo(() => {
    if (!industry) return [];
    return mockArticles.filter(a => industry.articleIds.includes(a.id));
  }, [industry]);

  if (!industry) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#0F172A] mb-2">Không tìm thấy giải pháp</h1>
          <Link href="/giai-phap" className="text-[#1677FF] hover:underline">Quay lại danh sách giải pháp</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      {/* 1. Breadcrumb */}
      <div className="bg-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 md:py-3">
          <nav className="flex items-center gap-1 text-[11px] md:text-[13px] text-[#64748B]">
            <Link href="/" className="hover:text-[#0F172A] transition-colors">Trang chủ</Link>
            <ChevronRight className="w-3 h-3 text-[#CBD5E1]" />
            <Link href="/giai-phap" className="hover:text-[#0F172A] transition-colors">Giải pháp</Link>
            <ChevronRight className="w-3 h-3 text-[#CBD5E1]" />
            <span className="text-[#0F172A] font-bold">{industry.name}</span>
          </nav>
        </div>
      </div>

      {/* 2. Industry Introduction */}
      <div className="bg-white border-b border-[#E2E8F0] py-5 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-4 md:gap-12 items-center">
          <div className="flex-1 max-w-2xl text-center md:text-left">
            <h1 className="text-[24px] md:text-4xl font-bold text-[#0F172A] mb-1 md:mb-6 leading-tight tracking-tight">
              Bao bì {industry.name}
            </h1>
            <p className="text-[#475569] text-[13px] md:text-[18px] leading-snug md:leading-relaxed mb-4 md:mb-8">
              {industry.description}
            </p>
            <div className="flex flex-row items-center justify-center md:justify-start gap-2">
              <Link 
                href="/rfq"
                className="flex-1 sm:flex-initial bg-[#1677FF] hover:bg-[#4096ff] text-white px-4 md:px-8 py-2.5 md:py-3 rounded-full font-bold text-[13px] md:text-[15px] transition-all text-center"
              >
                Nhận báo giá
              </Link>
              <Link 
                href="/san-pham"
                className="flex-1 sm:flex-initial bg-white border border-[#E2E8F0] hover:bg-[#F8FAFC] text-[#0F172A] px-4 md:px-8 py-2.5 md:py-3 rounded-full font-bold text-[13px] md:text-[15px] transition-all text-center"
              >
                Sản phẩm
              </Link>
            </div>
          </div>
          {industry.image && (
            <div className="w-full md:w-[320px] lg:w-[400px] aspect-square relative bg-[#F1F5F9] rounded-[16px] md:rounded-[24px] overflow-hidden p-6 md:p-12 shrink-0 hidden sm:block">
              <ImageWithFallback 
                src={industry.image} 
                alt={industry.name}
                className="w-full h-full object-contain"
                fallbackText={industry.name}
              />
              {/* ILLUSTRATIVE LABEL */}
              {(industry as any).mediaStatus === "illustrative" && (
                <div className="absolute top-4 right-4 bg-ntb-text/5 backdrop-blur-[2px] text-ntb-text/40 text-[9px] px-2 py-0.5 rounded-[2px] font-bold uppercase tracking-tight border border-ntb-text/5 pointer-events-none">
                  Ảnh minh họa
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-16">
          {/* Main Content Area */}
          <div className="lg:col-span-8">
            
            {/* 3. Common Packaging Needs */}
            <section className="mb-5 md:mb-16">
              <div className="flex items-center gap-2 mb-2.5">
                <div className="w-6 h-6 rounded-lg bg-[#E0F2FE] flex items-center justify-center text-[#0369A1] shrink-0">
                  <Lightbulb className="w-3.5 h-3.5" />
                </div>
                <h2 className="text-[15px] md:text-[20px] font-bold text-[#0F172A]">Nhu cầu đóng gói phổ biến</h2>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {industry.applications.map((app, idx) => (
                  <div key={idx} className="flex items-center gap-2 px-2.5 py-2 bg-[#F1F5F9]/50 border border-[#E2E8F0] rounded-[12px] min-h-[42px]">
                    <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center text-[#16A34A] shrink-0 border border-[#E2E8F0]">
                      <Check className="w-2.5 h-2.5" strokeWidth={4} />
                    </div>
                    <span className="text-[#475569] text-[13px] font-bold leading-tight line-clamp-1">{app}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* 4. Relevant Packaging Groups */}
            <section className="mb-6 md:mb-16">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-lg bg-[#F0FDF4] flex items-center justify-center text-[#16A34A] shrink-0">
                  <Package className="w-3.5 h-3.5" />
                </div>
                <h2 className="text-[16px] md:text-[20px] font-bold text-[#0F172A]">Nhóm sản phẩm liên quan</h2>
              </div>
              <div className="grid grid-cols-2 gap-2 md:gap-6">
                {relevantCategories.map((category) => (
                  <Link 
                    key={category.id}
                    href={`/san-pham/${category.slug}`}
                    className="group bg-white border border-[#E2E8F0] p-2.5 md:p-6 rounded-[12px] md:rounded-[16px] hover:border-[#1677FF] transition-all flex flex-col items-center text-center active:scale-[0.98] motion-reduce:active:scale-100"
                  >
                    <div className="w-12 h-12 md:w-20 md:h-20 relative mb-1.5 md:mb-4">
                      <ImageWithFallback 
                        src={category.image} 
                        alt={category.name}
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform"
                        fallbackText={category.name}
                      />
                    </div>
                    <h3 className="text-[13px] md:text-[15px] font-bold text-[#0F172A] group-hover:text-[#1677FF] transition-colors leading-tight mb-0.5">{category.name}</h3>
                    <p className="hidden md:block text-[12px] text-[#64748B] mt-1 line-clamp-2">{category.description}</p>
                    <div className="mt-1.5 md:mt-4 text-[#1677FF] text-[10px] md:text-[13px] font-bold flex items-center uppercase tracking-wider">
                      Xem danh mục
                      <ArrowRight className="w-3 h-3 ml-0.5" />
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* 5. Recommended Products */}
            <section className="mb-8 md:mb-16">
              <div className="flex items-center justify-between mb-3 md:mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-[#FEF2F2] flex items-center justify-center text-[#DC2626] shrink-0">
                    <Box className="w-3.5 h-3.5" />
                  </div>
                  <h2 className="text-[16px] md:text-[20px] font-bold text-[#0F172A]">Mẫu sản phẩm đề xuất</h2>
                </div>
                <Link href="/san-pham" className="text-[12px] md:text-[14px] font-bold text-[#1677FF] hover:underline">
                  Tất cả
                </Link>
              </div>
              
              {/* Horizontal scroll rail on mobile */}
              <div className="flex overflow-x-auto pb-4 gap-2.5 -mx-4 px-4 sm:-mx-0 sm:px-0 sm:grid sm:grid-cols-2 sm:gap-6 no-scrollbar snap-x">
                {recommendedProducts.map((product) => (
                  <div key={product.id} className="min-w-[260px] sm:min-w-0 snap-start">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </section>
          </div>

            {/* Sidebar Area */}
            <div className="lg:col-span-4 space-y-4 md:space-y-8">
              {/* Customization / Mold Bridge */}
              <div className="bg-[#0F172A] text-white p-6 md:p-8 rounded-[16px] md:rounded-[20px] relative overflow-hidden">
                <div className="relative z-10">
                  <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white mb-4 md:mb-6">
                    <Factory className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <h3 className="text-[16px] md:text-[18px] font-bold mb-2 md:mb-3 tracking-tight">Tùy chỉnh & Khuôn mẫu</h3>
                  <p className="text-white/70 text-[12px] md:text-[14px] leading-snug md:leading-relaxed mb-4 md:mb-6">
                    Cần một giải pháp bao bì riêng cho thương hiệu của bạn? Chúng tôi hỗ trợ tư vấn 
                    và thực hiện khuôn mẫu theo yêu cầu và quy cách riêng.
                  </p>
                  <Link 
                    href="/nang-luc/khuon-co-khi-chinh-xac"
                    className="inline-flex items-center text-[13px] md:text-[14px] font-bold text-[#1677FF] group"
                  >
                    Tìm hiểu năng lực khuôn
                    <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#1677FF]/10 rounded-full -translate-y-16 translate-x-16 blur-3xl" />
              </div>

              {/* Related Technical Articles */}
              <div className="bg-white border border-[#E2E8F0] p-6 md:p-8 rounded-[16px] md:rounded-[20px]">
                <div className="flex items-center gap-2 mb-4 md:mb-6">
                  <FileText className="w-4 h-4 md:w-5 md:h-5 text-[#475569]" />
                  <h3 className="text-[16px] md:text-[18px] font-bold text-[#0F172A] tracking-tight">Kiến thức kỹ thuật</h3>
                </div>
                <div className="space-y-4 md:space-y-6">
                  {relatedArticles.map((article) => (
                    <Link 
                      key={article.id}
                      href={`/tin-tuc/${article.slug}`}
                      className="group block"
                    >
                      <div className="flex gap-3 md:gap-4">
                        <div className="w-14 h-14 md:w-16 md:h-16 rounded-lg bg-[#F1F5F9] overflow-hidden shrink-0">
                          <ImageWithFallback 
                            src={article.image || ""} 
                            alt={article.title}
                            className="w-full h-full object-cover transition-transform group-hover:scale-110"
                          />
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-[13px] md:text-[14px] font-bold text-[#334155] group-hover:text-[#1677FF] transition-colors leading-tight mb-1 line-clamp-2">
                            {article.title}
                          </h4>
                          <p className="text-[11px] md:text-[12px] text-[#94A3B8] line-clamp-1 md:line-clamp-2 leading-tight">{article.summary}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-[#F1F5F9]">
                  <Link 
                    href="/tin-tuc"
                    className="text-[13px] md:text-[14px] font-bold text-[#1677FF] hover:underline flex items-center"
                  >
                    Xem thêm bài viết
                    <ChevronRight className="w-3.5 h-3.5 ml-1" />
                  </Link>
                </div>
              </div>

            {/* Factory / Capability Trust Links */}
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-8 rounded-[20px] border-dashed">
              <h3 className="text-[15px] font-bold text-[#0F172A] mb-4">Năng lực thực thi</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-[#16A34A] shrink-0" />
                  <div className="text-[13px] text-[#475569]">
                    <span className="font-bold text-[#334155]">Vận hành quy trình:</span> Kiểm soát các bước sản xuất dựa trên hồ sơ kỹ thuật.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Factory className="w-5 h-5 text-[#16A34A] shrink-0" />
                  <div className="text-[13px] text-[#475569]">
                    <span className="font-bold text-[#334155]">Cơ sở hạ tầng:</span> Trang bị máy thổi chai và máy ép nắp tự động tại nhà máy.
                  </div>
                </li>
              </ul>
              <Link 
                href="/nang-luc-nha-may"
                className="mt-6 block text-center text-[13px] font-bold text-[#64748B] hover:text-[#0F172A] py-2 border border-[#CBD5E1] rounded-lg transition-colors"
              >
                Xem năng lực sản xuất
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Final Sample / RFQ CTA */}
      <div className="bg-[#0F172A] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
            Bắt đầu phát triển bao bì cho sản phẩm của bạn
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto mb-10 text-[15px] md:text-[16px]">
            NTB hỗ trợ cung cấp mẫu thực tế để khách hàng kiểm tra độ tương thích 
            với sản phẩm trước khi đặt hàng số lượng lớn.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/rfq"
              className="bg-[#1677FF] hover:bg-[#4096ff] text-white px-10 py-4 rounded-full font-bold text-[16px] transition-all shadow-lg shadow-[#1677FF]/20"
            >
              Gửi yêu cầu báo giá & Mẫu
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
