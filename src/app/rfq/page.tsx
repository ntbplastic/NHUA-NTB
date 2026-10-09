"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRFQ } from '@/lib/store';
import { useData } from '@/lib/data/useData';
import { DataProvider } from '@/lib/data/Provider';
import { mockProducts } from '@/lib/mock/products';
import { ArrowLeft, Trash2, Send, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function RFQPage() {
  const { rfq, removeFromRFQ, updateRFQItem, clearRFQ } = useRFQ();
  const { data: products } = useData(() => DataProvider.getProducts(), mockProducts);
  
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      setSubmitted(true);
      clearRFQ();
    }, 1000);
  };

  const rfqProducts = rfq.map(item => {
    const product = products.find((p: any) => p.id === item.productId);
    return { ...item, product };
  }).filter(item => item.product);

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] py-20 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-[24px] shadow-sm text-center border border-[#E2E8F0]">
          <div className="w-16 h-16 bg-[#ECFDF5] rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8 text-[#10B981]" />
          </div>
          <h1 className="text-2xl font-bold text-[#0F172A] mb-3">Yêu cầu đã được gửi</h1>
          <p className="text-[#64748B] mb-8">
            Cảm ơn quý khách. Đội ngũ kinh doanh của Nhựa Nguyên Thái Bình sẽ liên hệ lại trong thời gian sớm nhất.
          </p>
          <Button asChild variant="primary" className="w-full h-12 rounded-full">
            <Link href="/san-pham">Tiếp tục xem sản phẩm</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-6 md:py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Link href="/san-pham" className="inline-flex items-center text-[12px] md:text-[13px] font-bold text-[#64748B] hover:text-[#1677FF] mb-4 md:mb-6 transition-colors">
          <ArrowLeft className="w-3.5 h-3.5 mr-1" />
          Tiếp tục xem sản phẩm
        </Link>
        
        <h1 className="text-[24px] md:text-[36px] font-bold text-[#0F172A] mb-1 md:mb-2 tracking-tight">Yêu cầu báo giá</h1>
        <p className="text-[#64748B] text-[13px] md:text-[15px] mb-6 md:mb-8 leading-snug md:leading-relaxed">
          Tạo yêu cầu báo giá cho các sản phẩm bạn đã chọn. Chúng tôi hỗ trợ gửi kèm yêu cầu mẫu thử và thiết kế khuôn mới.
        </p>

        {rfqProducts.length === 0 ? (
          <div className="bg-white rounded-[16px] md:rounded-[24px] border border-[#E2E8F0] p-10 md:p-12 text-center">
            <h3 className="text-base md:text-lg font-bold text-[#0F172A] mb-1.5 md:mb-2">Chưa có sản phẩm nào</h3>
            <p className="text-[#64748B] text-[13px] md:text-[15px] mb-6 max-w-sm mx-auto leading-snug">
              Bạn chưa thêm sản phẩm nào vào yêu cầu báo giá. Hãy khám phá danh mục để chọn sản phẩm phù hợp.
            </p>
            <Button asChild variant="primary" className="rounded-full h-11 md:h-12 px-8 text-[14px] md:text-[15px] font-bold">
              <Link href="/san-pham">Khám phá sản phẩm</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            
            <div className="lg:col-span-2 space-y-4">
              {/* Product Basket */}
              <div className="bg-white rounded-[12px] md:rounded-[24px] border border-[#E2E8F0] overflow-hidden">
                <div className="px-4 md:px-6 py-3 md:py-4 border-b border-[#E2E8F0] bg-[#F8FAFC]">
                  <h2 className="font-bold text-[#0F172A] text-[14px] md:text-[16px]">Danh sách sản phẩm ({rfqProducts.length})</h2>
                </div>
                <div className="divide-y divide-[#E2E8F0]">
                  {rfqProducts.map((item) => (
                    <div key={item.productId} className="p-3.5 md:p-6 flex flex-row gap-3.5 md:gap-6 items-start">
                      <div className="w-16 h-16 md:w-24 md:h-24 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[8px] md:rounded-[12px] flex items-center justify-center shrink-0">
                        {item.product.image ? (
                          <img src={item.product.image} className="w-full h-full object-contain mix-blend-multiply p-1.5 md:p-2" />
                        ) : (
                          <span className="text-[10px] text-[#94A3B8]">No Image</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-2 mb-0.5 md:mb-2">
                          <h3 className="font-bold text-[#0F172A] text-[14px] md:text-[16px] truncate md:whitespace-normal">{item.product.name}</h3>
                          <button 
                            onClick={() => removeFromRFQ(item.productId)}
                            className="text-[#94A3B8] hover:text-[#EF4444] p-1 transition-colors active:scale-90"
                          >
                            <Trash2 className="w-4 h-4 md:w-5 md:h-5" />
                          </button>
                        </div>
                        <div className="text-[11px] md:text-[13px] text-[#64748B] mb-2 md:mb-4 font-medium">
                          {item.product.material} · {item.product.capacity} · Cổ {item.product.neck}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 md:gap-4">
                          <div>
                            <label className="block text-[11px] font-bold text-[#475569] mb-1">Số lượng dự kiến</label>
                            <input 
                              type="number"
                              className="w-full h-9 md:h-10 px-3 border border-[#E2E8F0] rounded-lg text-[13px] md:text-[14px] focus:ring-2 focus:ring-[#1677FF] focus:border-transparent outline-none"
                              placeholder="0"
                              value={item.quantity || ''}
                              onChange={(e) => updateRFQItem(item.productId, { quantity: parseInt(e.target.value) || undefined })}
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-bold text-[#475569] mb-1">Cần mẫu thử?</label>
                            <div className="flex items-center h-9 md:h-10">
                              <label className="flex items-center gap-2 cursor-pointer group">
                                <input 
                                  type="checkbox" 
                                  className="w-4 h-4 rounded border-[#CBD5E1] text-[#1677FF] focus:ring-[#1677FF]"
                                  checked={item.needSample || false}
                                  onChange={(e) => updateRFQItem(item.productId, { needSample: e.target.checked })}
                                />
                                <span className="text-[13px] text-[#475569] font-medium group-hover:text-[#0F172A]">Gửi mẫu thực tế</span>
                              </label>
                            </div>
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-[11px] font-bold text-[#475569] mb-1">Ghi chú yêu cầu riêng</label>
                            <input 
                              type="text"
                              className="w-full h-9 md:h-10 px-3 border border-[#E2E8F0] rounded-lg text-[13px] md:text-[14px] focus:ring-2 focus:ring-[#1677FF] focus:border-transparent outline-none"
                              placeholder="Màu sắc, quy cách đóng gói..."
                              value={item.notes || ''}
                              onChange={(e) => updateRFQItem(item.productId, { notes: e.target.value })}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Lead Form */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-[12px] md:rounded-[24px] border border-[#E2E8F0] overflow-hidden sticky top-24 shadow-sm">
                <div className="px-4 md:px-6 py-3 md:py-4 border-b border-[#E2E8F0] bg-[#F8FAFC]">
                  <h2 className="font-bold text-[#0F172A] text-[14px] md:text-[16px]">Thông tin liên hệ</h2>
                </div>
                <form onSubmit={handleSubmit} className="p-4 md:p-6 flex flex-col gap-3.5 md:gap-4">
                  <div>
                    <label className="block text-[12px] font-bold text-[#475569] mb-1.5">Họ tên khách hàng *</label>
                    <input required type="text" className="w-full h-10 md:h-11 px-4 border border-[#E2E8F0] rounded-[8px] md:rounded-[10px] text-[13px] md:text-[14px] focus:ring-2 focus:ring-[#1677FF] focus:border-transparent outline-none" />
                  </div>
                  <div>
                    <label className="block text-[12px] font-bold text-[#475569] mb-1.5">Tên doanh nghiệp</label>
                    <input type="text" className="w-full h-10 md:h-11 px-4 border border-[#E2E8F0] rounded-[8px] md:rounded-[10px] text-[13px] md:text-[14px] focus:ring-2 focus:ring-[#1677FF] focus:border-transparent outline-none" />
                  </div>
                  <div>
                    <label className="block text-[12px] font-bold text-[#475569] mb-1.5">Số điện thoại *</label>
                    <input required type="tel" className="w-full h-10 md:h-11 px-4 border border-[#E2E8F0] rounded-[8px] md:rounded-[10px] text-[13px] md:text-[14px] focus:ring-2 focus:ring-[#1677FF] focus:border-transparent outline-none" />
                  </div>
                  <div>
                    <label className="block text-[12px] font-bold text-[#475569] mb-1.5">Email *</label>
                    <input required type="email" className="w-full h-10 md:h-11 px-4 border border-[#E2E8F0] rounded-[8px] md:rounded-[10px] text-[13px] md:text-[14px] focus:ring-2 focus:ring-[#1677FF] focus:border-transparent outline-none" />
                  </div>
                  
                  <div className="mt-1 border-t border-[#E2E8F0] pt-4">
                    <label className="flex items-start gap-2 cursor-pointer mb-2">
                      <input type="checkbox" className="w-4 h-4 rounded border-[#CBD5E1] text-[#1677FF] focus:ring-[#1677FF] mt-0.5" />
                      <span className="text-[12px] text-[#475569] leading-tight font-medium">Tôi cần tư vấn phát triển khuôn mẫu riêng</span>
                    </label>
                  </div>
                  
                  <div>
                    <label className="block text-[12px] font-bold text-[#475569] mb-1.5">Đính kèm bản vẽ / Logo (nếu có)</label>
                    <div className="w-full border-2 border-dashed border-[#E2E8F0] rounded-[8px] p-3 text-center hover:bg-[#F8FAFC] transition-colors cursor-pointer active:scale-[0.98]">
                      <span className="text-[12px] text-[#64748B]">Tải file PDF, JPG, PNG...</span>
                    </div>
                  </div>

                  <Button type="submit" variant="primary" className="w-full h-11 md:h-12 rounded-full mt-2 text-[14px] md:text-[15px] font-bold shadow-md">
                    <Send className="w-4 h-4 mr-2" />
                    Gửi yêu cầu báo giá
                  </Button>
                  
                  <p className="text-[10px] text-center text-[#94A3B8] mt-1">
                    Phản hồi kỹ thuật trong 24h làm việc.
                  </p>
                </form>
              </div>
            </div>

          </div>
        )}
        
      </div>
    </div>
  );
}
