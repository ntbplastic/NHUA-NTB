"use client";

import { useSavedProducts, useCompare } from '@/lib/store';
import { DataProvider } from '@/lib/data/Provider';
import { useData } from '@/lib/data/useData';
import { mockProducts } from '@/lib/mock/products';
import { ProductCard } from '@/components/ui/ProductCard';
import Link from 'next/link';
import { ArrowLeft, Box } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function SavedProductsPage() {
  const { saved } = useSavedProducts();
  const { compare } = useCompare();
  const { data: products }: { data: any[] } = useData(() => DataProvider.getProducts(), mockProducts);

  const savedProducts = saved.map(id => products.find((p: any) => p.id === id)).filter(Boolean);
  const compareProducts = compare.map(id => products.find((p: any) => p.id === id)).filter(Boolean);

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-6 md:py-10 pb-24 md:pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Link href="/san-pham" className="inline-flex items-center text-[12px] md:text-[13px] font-bold text-[#64748B] hover:text-[#1677FF] mb-4 md:mb-6 transition-colors">
          <ArrowLeft className="w-3.5 h-3.5 mr-1" />
          Tiếp tục xem sản phẩm
        </Link>
        
        <div className="mb-6 md:mb-12">
          <h1 className="text-[24px] md:text-[36px] font-bold text-[#0F172A] mb-1 md:mb-2 tracking-tight">Bộ mẫu của tôi</h1>
          <p className="text-[#64748B] text-[13px] md:text-[15px] leading-snug md:leading-relaxed">
            Các sản phẩm bạn đã lưu để xem xét lại. Bạn có thể thêm chúng vào danh sách báo giá.
          </p>
        </div>

        {savedProducts.length === 0 ? (
          <div className="bg-white rounded-[16px] md:rounded-[24px] border border-[#E2E8F0] p-8 md:p-12 text-center max-w-2xl mx-auto mb-10 md:mb-16">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-[#F1F5F9] rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
              <Box className="w-6 h-6 md:w-8 md:h-8 text-[#94A3B8]" />
            </div>
            <h3 className="text-base md:text-lg font-bold text-[#0F172A] mb-1.5 md:mb-2">Chưa lưu mẫu nào</h3>
            <p className="text-[#64748B] text-[13px] md:text-[15px] mb-6 leading-snug md:leading-relaxed">
              Bộ sưu tập mẫu của bạn đang trống. Hãy khám phá và lưu lại những sản phẩm phù hợp.
            </p>
            <Button asChild variant="primary" className="rounded-full h-10 md:h-12 px-8 text-[13px] md:text-[15px] font-bold">
              <Link href="/san-pham">Khám phá sản phẩm</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2.5 md:gap-5 mb-10 md:mb-16">
            {savedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}

        <div className="mb-10 md:mb-12 border-t border-[#E2E8F0] pt-8 md:pt-12">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-[18px] md:text-[24px] font-bold text-[#0F172A] tracking-tight">So sánh sản phẩm ({compareProducts.length}/3)</h2>
            {compareProducts.length > 0 && (
              <Link href="/compare" className="text-[12px] md:text-[14px] font-bold text-[#1677FF] hover:underline">
                Xem chi tiết
              </Link>
            )}
          </div>
          <p className="text-[#64748B] text-[12px] md:text-[15px] mb-6 md:mb-8 leading-snug">
            So sánh tối đa 3 sản phẩm để đưa ra quyết định tối ưu.
          </p>

          {compareProducts.length === 0 ? (
            <div className="bg-white rounded-[12px] md:rounded-[16px] border border-[#E2E8F0] p-6 md:p-8 text-center max-w-2xl mx-auto">
              <p className="text-[#64748B] text-[13px] md:text-[15px]">
                Chưa có sản phẩm nào trong danh sách so sánh.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 md:gap-5 max-w-4xl">
              {compareProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
