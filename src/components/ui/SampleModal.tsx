"use client";

import { useState } from 'react';
import { X, Check } from 'lucide-react';
import { Button } from './Button';

interface SampleModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
}

export function SampleModal({ isOpen, onClose, productName }: SampleModalProps) {
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-[#0F172A]/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-t-[24px] md:rounded-[24px] overflow-hidden shadow-2xl animate-in slide-in-from-bottom-8 md:slide-in-from-bottom-0 md:zoom-in-95">
        <div className="flex items-center justify-between p-5 border-b border-[#E2E8F0]">
          <h3 className="font-bold text-[18px] text-[#0F172A]">Yêu cầu xin mẫu</h3>
          <button onClick={onClose} className="p-2 -mr-2 text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9] rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-[#ECFDF5] rounded-full flex items-center justify-center mb-4">
              <Check className="w-8 h-8 text-[#10B981]" />
            </div>
            <h4 className="font-bold text-[#0F172A] text-[18px] mb-2">Gửi yêu cầu thành công!</h4>
            <p className="text-[#64748B] text-[14px]">
              Chúng tôi sẽ liên hệ lại với bạn để xác nhận thông tin gửi mẫu {productName}.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-4">
            <div className="bg-[#F8FAFC] p-3 rounded-[12px] border border-[#E2E8F0] mb-2 text-[13px] text-[#475569]">
              Sản phẩm: <span className="font-bold text-[#0F172A]">{productName}</span>
            </div>
            
            <div>
              <label className="block text-[13px] font-bold text-[#0F172A] mb-1.5">Họ tên *</label>
              <input required type="text" className="w-full h-11 px-3 border border-[#E2E8F0] rounded-[8px] outline-none focus:border-[#1677FF] focus:ring-1 focus:ring-[#1677FF] text-[14px]" placeholder="Nguyễn Văn A" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[13px] font-bold text-[#0F172A] mb-1.5">Số điện thoại *</label>
                <input required type="tel" className="w-full h-11 px-3 border border-[#E2E8F0] rounded-[8px] outline-none focus:border-[#1677FF] focus:ring-1 focus:ring-[#1677FF] text-[14px]" placeholder="0901234567" />
              </div>
              <div>
                <label className="block text-[13px] font-bold text-[#0F172A] mb-1.5">Số lượng mẫu</label>
                <input type="number" min="1" defaultValue="1" className="w-full h-11 px-3 border border-[#E2E8F0] rounded-[8px] outline-none focus:border-[#1677FF] focus:ring-1 focus:ring-[#1677FF] text-[14px]" />
              </div>
            </div>

            <div>
              <label className="block text-[13px] font-bold text-[#0F172A] mb-1.5">Ghi chú thêm</label>
              <textarea className="w-full p-3 border border-[#E2E8F0] rounded-[8px] outline-none focus:border-[#1677FF] focus:ring-1 focus:ring-[#1677FF] text-[14px] resize-none h-20" placeholder="Yêu cầu về màu sắc, nắp đi kèm..."></textarea>
            </div>

            <Button type="submit" variant="primary" color="blue" className="w-full h-12 rounded-[999px] text-[15px] mt-2">
              Xác nhận xin mẫu
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
