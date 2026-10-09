'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Factory, Box, Lightbulb } from 'lucide-react';
import { mockIndustries } from '@/lib/mock/industries';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';

export default function IndustriesPage() {
  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      {/* 1. Breadcrumb */}
      <div className="bg-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 md:py-3">
          <nav className="flex items-center gap-1.5 text-[11px] md:text-[13px] text-[#64748B]">
            <Link href="/" className="hover:text-[#0F172A] transition-colors">Trang chủ</Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#CBD5E1]" />
            <span className="text-[#0F172A] font-bold">Giải pháp theo ngành</span>
          </nav>
        </div>
      </div>

      {/* 2. Compact Introduction */}
      <div className="bg-white border-b border-[#E2E8F0] py-6 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-[20px] md:text-3xl font-bold text-[#0F172A] mb-2 md:mb-4">
              Giải pháp bao bì cho doanh nghiệp
            </h1>
            <p className="text-[#475569] text-[13px] md:text-[16px] leading-snug md:leading-relaxed">
              NTB cung cấp các giải pháp đóng gói được phân loại theo nhu cầu đặc thù của từng nhóm ngành. 
              Chúng tôi hỗ trợ doanh nghiệp từ khâu lựa chọn quy cách cổ chai, dung tích phù hợp đến việc 
              phát triển khuôn mẫu theo yêu cầu riêng cho sản phẩm.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Industry Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
          {mockIndustries.filter(ind => ind.enabled).sort((a, b) => a.order - b.order).map((industry) => (
            <Link 
              key={industry.id}
              href={`/giai-phap/${industry.slug}`}
              className="group bg-white border border-[#E2E8F0] rounded-[12px] overflow-hidden hover:shadow-lg hover:border-[#1677FF]/30 transition-all duration-300 flex flex-row h-full active:scale-[0.98] motion-reduce:active:scale-100"
            >
              <div className="relative w-[100px] md:w-[200px] aspect-[1/1] md:aspect-auto bg-[#F1F5F9] overflow-hidden shrink-0 flex items-center justify-center p-3 md:p-6">
                <ImageWithFallback 
                  src={industry.image} 
                  alt={industry.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  fallbackText={industry.name}
                />
              </div>
              <div className="p-3.5 md:p-6 flex flex-col flex-1 min-w-0">
                <h2 className="text-[15px] md:text-[18px] font-bold text-[#0F172A] mb-1 md:mb-2 group-hover:text-[#1677FF] transition-colors truncate md:whitespace-normal">
                  {industry.name}
                </h2>
                <p className="text-[#64748B] text-[12px] md:text-[14px] leading-snug md:leading-relaxed mb-2 md:mb-4 line-clamp-2">
                  {industry.summary}
                </p>
                
                <div className="flex flex-wrap gap-1.5 mb-3 md:mb-6">
                  {industry.applications.slice(0, 3).map((app, idx) => (
                    <span 
                      key={idx} 
                      className="inline-flex items-center px-1.5 py-0.5 rounded-[4px] bg-[#F1F5F9] text-[#475569] text-[10px] md:text-[12px] font-bold"
                    >
                      {app}
                    </span>
                  ))}
                  {industry.applications.length > 3 && (
                    <span className="text-[#94A3B8] text-[10px] pt-0.5">+{industry.applications.length - 3}</span>
                  )}
                </div>

                <div className="mt-auto flex items-center text-[#1677FF] text-[12px] md:text-[14px] font-bold">
                  Chi tiết giải pháp
                  <ChevronRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* 4. Cross-link to Catalog */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-[#0F172A] rounded-[16px] p-8 md:p-12 text-white relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <h3 className="text-xl md:text-2xl font-bold mb-4">Chưa tìm thấy giải pháp phù hợp?</h3>
            <p className="text-white/70 text-[15px] mb-8">
              Khám phá toàn bộ danh mục sản phẩm của NTB với hơn 40+ quy cách khác nhau hoặc 
              trao đổi với chúng tôi về nhu cầu phát triển khuôn mẫu riêng.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                href="/san-pham"
                className="bg-[#1677FF] hover:bg-[#4096ff] text-white px-6 py-3 rounded-full font-bold text-[15px] transition-all flex items-center gap-2"
              >
                <Box className="w-4 h-4" />
                Xem tất cả sản phẩm
              </Link>
              <Link 
                href="/nang-luc/khuon-co-khi-chinh-xac"
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3 rounded-full font-bold text-[15px] transition-all flex items-center gap-2"
              >
                <Lightbulb className="w-4 h-4" />
                Tư vấn thiết kế riêng
              </Link>
            </div>
          </div>
          
          {/* Decorative element */}
          <div className="absolute top-0 right-0 w-[300px] h-full bg-gradient-to-l from-white/5 to-transparent opacity-20 pointer-events-none translate-x-20 skew-x-12" />
        </div>
      </div>
    </div>
  );
}
