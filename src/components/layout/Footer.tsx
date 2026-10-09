"use client";

import Link from 'next/link';
import Image from 'next/image';
import { navigationData } from '@/lib/mock/navigation';
import { Button } from '@/components/ui/Button';
import { useState } from 'react';
import { ChevronDown, Phone, Mail, MapPin, ExternalLink, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { brandConfig } from '@/lib/config/brand';

export default function Footer() {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <footer className="w-full flex flex-col">
      {/* LEVEL 1: COMPACT CTA RAIL */}
      <div className="bg-[#1677FF] text-white py-4 md:py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <h3 className="text-[15px] md:text-lg font-bold">Cần tư vấn bao bì cho dự án?</h3>
              <p className="text-white/80 text-[12px] md:text-sm mt-0.5">Trao đổi yêu cầu sản phẩm, khuôn mẫu hoặc báo giá.</p>
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <Button asChild variant="secondary" className="flex-1 md:flex-initial bg-white text-[#1677FF] hover:bg-white/90 border-transparent h-10 md:h-11 px-6 text-[13px] md:text-sm font-bold shadow-sm">
                <Link href="/rfq">Yêu cầu báo giá</Link>
              </Button>
              <Button asChild variant="outline" className="flex-1 md:flex-initial border-white/40 text-white hover:bg-white/10 hover:border-white h-10 md:h-11 px-6 text-[13px] md:text-sm font-bold">
                <Link href="/lien-he">Liên hệ</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* LEVEL 2: MAIN FOOTER */}
      <div className="bg-[#F8FAFC] text-[#334155] border-t border-[#E2E8F0] pt-10 md:pt-16 pb-10 md:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
            
            {/* COLUMN 1: BRAND + CONTACT */}
            <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left">
              <Link href="/" className="flex items-center gap-3 mb-6 group">
                <div className="relative w-[40px] h-[40px] md:w-[48px] md:h-[48px]">
                  <Image 
                    src={brandConfig.logoUrl} 
                    alt={brandConfig.name}
                    fill
                    className="object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex flex-col">
                  <div className="text-[#0F172A] font-bold text-[16px] md:text-[18px] leading-tight tracking-tight">
                    {brandConfig.name}
                  </div>
                  <div className="text-[#1677FF] text-[9px] md:text-[10px] font-bold tracking-[0.15em] mt-0.5 uppercase">
                    {brandConfig.tagline}
                  </div>
                </div>
              </Link>
              
              <p className="text-[#64748B] text-[13px] md:text-[14px] leading-relaxed max-w-sm mb-8">
                Đơn vị sản xuất bao bì nhựa B2B hàng đầu, cung cấp giải pháp từ thiết kế, phát triển khuôn mẫu đến sản xuất hàng loạt.
              </p>

              <div className="space-y-4 w-full max-w-sm">
                <div className="flex items-start gap-3 justify-center lg:justify-start">
                  <div className="w-9 h-9 rounded-full bg-white border border-[#E2E8F0] flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 text-[#1677FF]" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider mb-0.5">Hotline hỗ trợ</div>
                    <a href="tel:+84948888866" className="text-[15px] md:text-[16px] font-bold text-[#0F172A] hover:text-[#1677FF] transition-colors">0948 888 866</a>
                  </div>
                </div>

                <div className="flex items-start gap-3 justify-center lg:justify-start">
                  <div className="w-9 h-9 rounded-full bg-white border border-[#E2E8F0] flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 text-[#1677FF]" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider mb-0.5">Email liên hệ</div>
                    <a href="mailto:ntbplastic_vn@yahoo.com.vn" className="text-[14px] font-medium text-[#334155] hover:text-[#1677FF] transition-colors break-all">ntbplastic_vn@yahoo.com.vn</a>
                  </div>
                </div>

                <div className="flex items-start gap-3 justify-center lg:justify-start">
                  <div className="w-9 h-9 rounded-full bg-white border border-[#E2E8F0] flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-[#1677FF]" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider mb-0.5">Văn phòng & Nhà máy</div>
                    <p className="text-[13px] md:text-[14px] text-[#64748B] leading-snug">1459 Đường Trần Văn Giàu, Xã Bình Lợi, TP. Hồ Chí Minh</p>
                  </div>
                </div>
              </div>
            </div>

            {/* COLUMN 2: QUICK LINKS */}
            <div className="lg:col-span-3">
              <div className="border-t border-[#E2E8F0] lg:border-t-0 pt-8 lg:pt-0">
                <h4 className="text-[#0F172A] font-bold uppercase tracking-wider text-[12px] md:text-[13px] mb-6 hidden lg:block">Liên kết nhanh</h4>
                
                {/* Mobile Accordion */}
                <div className="lg:hidden">
                  <button 
                    className="flex items-center justify-between w-full py-2"
                    onClick={() => toggleSection('Links')}
                  >
                    <h4 className="text-[#0F172A] font-bold uppercase tracking-wider text-[12px]">Liên kết nhanh</h4>
                    <ChevronDown className={cn("w-4 h-4 text-[#64748B] transition-transform", openSection === 'Links' && "rotate-180")} />
                  </button>
                </div>

                <ul className={cn(
                  "space-y-3 text-[13px] md:text-[14px] mt-4 lg:mt-0 overflow-hidden transition-all duration-300 lg:max-h-none",
                  openSection === 'Links' ? "max-h-96 opacity-100" : "max-h-0 lg:max-h-none opacity-0 lg:opacity-100"
                )}>
                  <li><Link href="/san-pham" className="hover:text-[#1677FF] transition-all hover:translate-x-1 inline-block">Sản phẩm bao bì</Link></li>
                  <li><Link href="/nang-luc-nha-may" className="hover:text-[#1677FF] transition-all hover:translate-x-1 inline-block">Năng lực nhà máy</Link></li>
                  <li><Link href="/nang-luc/khuon-co-khi-chinh-xac" className="hover:text-[#1677FF] transition-all hover:translate-x-1 inline-block">Khuôn & Cơ khí chính xác</Link></li>
                  <li><Link href="/giai-phap" className="hover:text-[#1677FF] transition-all hover:translate-x-1 inline-block">Giải pháp theo ngành</Link></li>
                  <li><Link href="/tin-tuc" className="hover:text-[#1677FF] transition-all hover:translate-x-1 inline-block">Tin tức & Sự kiện</Link></li>
                  <li><Link href="/lien-he" className="hover:text-[#1677FF] transition-all hover:translate-x-1 inline-block">Liên hệ</Link></li>
                </ul>
              </div>
            </div>

            {/* COLUMN 3: CONTACT ACTIONS */}
            <div className="lg:col-span-4">
              <div className="border-t border-[#E2E8F0] lg:border-t-0 pt-8 lg:pt-0">
                <h4 className="text-[#0F172A] font-bold uppercase tracking-wider text-[12px] md:text-[13px] mb-6 text-center lg:text-left">Kết nối trực tiếp</h4>
                
                <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
                  <a href="tel:+84948888866" className="flex items-center justify-center lg:justify-start gap-3 p-3 bg-white border border-[#E2E8F0] rounded-xl hover:border-[#1677FF] hover:bg-white hover:shadow-sm transition-all group">
                    <div className="w-8 h-8 rounded-lg bg-[#EAF3FF] flex items-center justify-center group-hover:bg-[#1677FF] transition-colors">
                      <Phone className="w-4 h-4 text-[#1677FF] group-hover:text-white" />
                    </div>
                    <span className="text-[13px] md:text-[14px] font-bold text-[#334155]">Gọi ngay</span>
                  </a>

                  <div className="flex items-center justify-center lg:justify-start gap-3 p-3 bg-white border border-[#E2E8F0] rounded-xl hover:border-[#1677FF] hover:bg-white hover:shadow-sm transition-all group cursor-default">
                    <div className="w-8 h-8 rounded-lg bg-[#E9F8F1] flex items-center justify-center group-hover:bg-[#18A66A] transition-colors">
                      <MessageCircle className="w-4 h-4 text-[#18A66A] group-hover:text-white" />
                    </div>
                    <div>
                      <span className="text-[13px] md:text-[14px] font-bold text-[#334155] block">Zalo</span>
                      <span className="text-[11px] text-[#64748B]">0948 888 866</span>
                    </div>
                  </div>

                  <a 
                    href="https://maps.app.goo.gl/Ar5VTqSNtNffXmZh9" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label="Xem vị trí Nhựa Nguyên Thái Bình trên Google Maps"
                    className="col-span-2 lg:col-span-1 flex items-center justify-center lg:justify-start gap-3 p-3 bg-white border border-[#E2E8F0] rounded-xl hover:border-[#1677FF] hover:bg-white hover:shadow-sm transition-all group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#FFF7ED] flex items-center justify-center group-hover:bg-[#F97316] transition-colors">
                      <MapPin className="w-4 h-4 text-[#F97316] group-hover:text-white" />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[13px] md:text-[14px] font-bold text-[#334155]">Xem bản đồ</span>
                      <ExternalLink className="w-3 h-3 text-[#94A3B8]" />
                    </div>
                  </a>
                </div>

                <div className="mt-8 p-4 bg-white border border-[#E2E8F0] rounded-[16px]">
                  <div className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider mb-1">Mã số thuế</div>
                  <div className="text-[14px] font-bold text-[#0F172A]">0317249934</div>
                  <p className="text-[11px] text-[#64748B] mt-1 leading-tight">Cấp bởi Sở Kế hoạch và Đầu tư TP.HCM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* LEVEL 3: LEGAL STRIP */}
      <div className="bg-[#0F172A] text-[#94A3B8] py-4 md:py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] md:text-[12px]">
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
              <p>© {new Date().getFullYear()} {brandConfig.name}</p>
              <span className="hidden md:block w-px h-3 bg-slate-700"></span>
              <p className="text-[#64748B]">Bao bì nhựa & Khuôn mẫu chuyên nghiệp</p>
            </div>
            <div className="flex items-center space-x-6">
              <Link href="/privacy" className="hover:text-white transition-colors">Chính sách bảo mật</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Điều khoản sử dụng</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
