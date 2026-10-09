"use client";

import { useCompare, useRFQ } from '@/lib/store';
import { DataProvider } from '@/lib/data/Provider';
import { useData } from '@/lib/data/useData';
import { mockProducts } from '@/lib/mock/products';
import Link from 'next/link';
import { ArrowLeft, Trash2, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export default function ComparePage() {
  const { compare, toggleCompare } = useCompare();
  const { addToRFQ, isInRFQ } = useRFQ();
  const { data: products } = useData(() => DataProvider.getProducts(), mockProducts);

  const compareProducts = compare.map(id => products.find((p: any) => p.id === id)).filter(Boolean);

  if (compareProducts.length === 0) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] py-20 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-[24px] shadow-sm text-center border border-[#E2E8F0]">
          <h1 className="text-2xl font-bold text-[#0F172A] mb-3">Chưa có sản phẩm</h1>
          <p className="text-[#64748B] mb-8">
            Bạn chưa chọn sản phẩm nào để so sánh. Hãy quay lại danh mục và chọn biểu tượng so sánh trên sản phẩm.
          </p>
          <Button asChild variant="primary" className="w-full h-12 rounded-full">
            <Link href="/san-pham">Quay lại danh mục</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-10 pb-24 md:pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Link href="/da-luu" className="inline-flex items-center text-[13px] font-medium text-[#64748B] hover:text-[#1677FF] mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-1.5" />
          Quay lại Bộ mẫu
        </Link>
        
        <h1 className="text-[28px] md:text-[36px] font-bold text-[#0F172A] mb-8">So sánh thông số kỹ thuật</h1>

        <div className="bg-white rounded-[16px] md:rounded-[24px] border border-[#E2E8F0] shadow-sm overflow-x-auto">
          <table className="w-full min-w-[600px] text-left border-collapse">
            <thead>
              <tr>
                <th className="p-6 border-b border-r border-[#E2E8F0] bg-[#F8FAFC] w-[20%] align-top">
                  <div className="font-bold text-[#0F172A] text-[16px] mb-2">Sản phẩm so sánh</div>
                  <div className="text-[13px] text-[#64748B] font-normal">{compareProducts.length}/3 sản phẩm</div>
                </th>
                {compareProducts.map(p => (
                  <th key={p.id} className="p-6 border-b border-r border-[#E2E8F0] last:border-r-0 bg-white w-[26%] align-top relative">
                    <button 
                      onClick={() => toggleCompare(p.id)}
                      className="absolute top-4 right-4 text-[#94A3B8] hover:text-[#EF4444] transition-colors bg-white rounded-full p-1 border border-[#E2E8F0]"
                      title="Gỡ khỏi so sánh"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="w-full aspect-square bg-[#F8FAFC] rounded-[12px] mb-4 flex items-center justify-center p-4">
                      {p.image ? <img src={p.image} className="w-full h-full object-contain mix-blend-multiply" /> : <div className="text-xs text-slate-400">No img</div>}
                    </div>
                    <Link href={`/san-pham/${p.slug}`} className="block font-bold text-[#0F172A] text-[16px] mb-2 hover:text-[#1677FF] line-clamp-2">
                      {p.name}
                    </Link>
                    <div className="text-[13px] text-[#64748B] font-mono mb-4">SKU: {p.sku}</div>
                    
                    {isInRFQ(p.id) ? (
                      <Button asChild variant="outline" className="w-full rounded-full border-[#A7F3D0] bg-[#ECFDF5] text-[#059669] hover:bg-[#D1FAE5]">
                        <Link href="/rfq">Đã thêm YCBG</Link>
                      </Button>
                    ) : (
                      <Button onClick={() => addToRFQ(p.id)} variant="primary" className="w-full rounded-full bg-[#1677FF] hover:bg-[#0F5ED7]">
                        Báo giá mẫu này
                      </Button>
                    )}
                  </th>
                ))}
                {/* Empty slots */}
                {Array.from({ length: 3 - compareProducts.length }).map((_, i) => (
                  <th key={`empty-${i}`} className="p-6 border-b border-r border-[#E2E8F0] last:border-r-0 bg-[#F8FAFC] w-[26%] align-middle text-center">
                    <div className="w-12 h-12 bg-white rounded-full border border-dashed border-[#CBD5E1] mx-auto flex items-center justify-center mb-3">
                      <span className="text-[#94A3B8] text-xl">+</span>
                    </div>
                    <div className="text-[13px] text-[#64748B] font-medium">Thêm sản phẩm</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-[14px]">
              <tr>
                <td className="p-4 border-b border-r border-[#E2E8F0] bg-[#F8FAFC] font-medium text-[#475569]">Vật liệu</td>
                {compareProducts.map(p => (
                  <td key={p.id} className="p-4 border-b border-r border-[#E2E8F0] last:border-r-0 font-medium text-[#0F172A]">{p.material}</td>
                ))}
                {Array.from({ length: 3 - compareProducts.length }).map((_, i) => (
                  <td key={`e-${i}`} className="p-4 border-b border-r border-[#E2E8F0] last:border-r-0 bg-[#F8FAFC]"></td>
                ))}
              </tr>
              <tr>
                <td className="p-4 border-b border-r border-[#E2E8F0] bg-[#F8FAFC] font-medium text-[#475569]">Dung tích</td>
                {compareProducts.map(p => (
                  <td key={p.id} className="p-4 border-b border-r border-[#E2E8F0] last:border-r-0 font-medium text-[#0F172A]">{p.capacity}</td>
                ))}
                {Array.from({ length: 3 - compareProducts.length }).map((_, i) => (
                  <td key={`e-${i}`} className="p-4 border-b border-r border-[#E2E8F0] last:border-r-0 bg-[#F8FAFC]"></td>
                ))}
              </tr>
              <tr>
                <td className="p-4 border-b border-r border-[#E2E8F0] bg-[#F8FAFC] font-medium text-[#475569]">Cổ chai / Ren</td>
                {compareProducts.map(p => (
                  <td key={p.id} className="p-4 border-b border-r border-[#E2E8F0] last:border-r-0 font-medium text-[#0F172A]">{p.neck}</td>
                ))}
                {Array.from({ length: 3 - compareProducts.length }).map((_, i) => (
                  <td key={`e-${i}`} className="p-4 border-b border-r border-[#E2E8F0] last:border-r-0 bg-[#F8FAFC]"></td>
                ))}
              </tr>
              <tr>
                <td className="p-4 border-b border-r border-[#E2E8F0] bg-[#F8FAFC] font-medium text-[#475569]">Trọng lượng</td>
                {compareProducts.map(p => (
                  <td key={p.id} className="p-4 border-b border-r border-[#E2E8F0] last:border-r-0 font-medium text-[#0F172A]">{p.weight || '-'}</td>
                ))}
                {Array.from({ length: 3 - compareProducts.length }).map((_, i) => (
                  <td key={`e-${i}`} className="p-4 border-b border-r border-[#E2E8F0] last:border-r-0 bg-[#F8FAFC]"></td>
                ))}
              </tr>
              <tr>
                <td className="p-4 border-b border-r border-[#E2E8F0] bg-[#F8FAFC] font-medium text-[#475569]">Hỗ trợ tùy chỉnh</td>
                {compareProducts.map(p => (
                  <td key={p.id} className="p-4 border-b border-r border-[#E2E8F0] last:border-r-0 font-medium text-[#0F172A]">
                    {p.customizable ? <Check className="w-5 h-5 text-[#10B981]" /> : <span className="text-[#94A3B8]">-</span>}
                  </td>
                ))}
                {Array.from({ length: 3 - compareProducts.length }).map((_, i) => (
                  <td key={`e-${i}`} className="p-4 border-b border-r border-[#E2E8F0] last:border-r-0 bg-[#F8FAFC]"></td>
                ))}
              </tr>
              <tr>
                <td className="p-4 border-r border-[#E2E8F0] bg-[#F8FAFC] font-medium text-[#475569]">Ứng dụng</td>
                {compareProducts.map(p => (
                  <td key={p.id} className="p-4 border-r border-[#E2E8F0] last:border-r-0 text-[#475569]">
                    {p.applications ? p.applications.join(', ') : '-'}
                  </td>
                ))}
                {Array.from({ length: 3 - compareProducts.length }).map((_, i) => (
                  <td key={`e-${i}`} className="p-4 border-r border-[#E2E8F0] last:border-r-0 bg-[#F8FAFC]"></td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
