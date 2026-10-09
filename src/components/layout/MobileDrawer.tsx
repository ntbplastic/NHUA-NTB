"use client";

import { X, Heart, Settings, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { navigationData } from '@/lib/mock/navigation';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  const [openSection, setOpenSection] = useState<string | null>(null);

  // Lock body scroll when open and reset accordion
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setOpenSection(null);
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] lg:hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#0F172A]/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="absolute top-0 right-0 bottom-0 w-[300px] max-w-[85vw] bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300 rounded-l-[24px] overflow-hidden border-l border-[#E2E8F0]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b border-[#E2E8F0] bg-white">
          <div className="font-bold text-[13px] text-[#0F172A] tracking-wider">MENU</div>
          <button 
            onClick={onClose}
            className="p-1.5 text-[#64748B] hover:text-[#0F172A] hover:bg-[#F2F6F7] active:bg-[#E2E8F0] active:scale-[0.9] motion-reduce:active:scale-100 rounded-full transition-all duration-150"
          >
            <X className="w-5 h-5" strokeWidth={1.5} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto py-1 scrollbar-thin">
          <nav className="px-3 flex flex-col space-y-0.5">
            {navigationData.map((item: any) => {
              const hasChildren = item.children && item.children.length > 0;
              const isSectionOpen = openSection === item.label;

              return (
                <div key={item.label} className="border-b border-[#F1F5F9] last:border-0">
                  {hasChildren ? (
                    <button
                      onClick={() => setOpenSection(isSectionOpen ? null : item.label)}
                      className="w-full flex items-center justify-between py-3 text-[14px] font-bold text-[#0F172A] active:bg-[#F1F5F9] transition-colors"
                    >
                      {item.label}
                      <ChevronDown 
                        className={cn(
                          "w-4 h-4 text-[#64748B] transition-transform duration-200",
                          isSectionOpen && "rotate-180 text-[#1677FF]"
                        )} 
                        strokeWidth={2} 
                      />
                    </button>
                  ) : (
                    <Link 
                      href={item.href}
                      className="flex items-center justify-between py-3 text-[14px] font-bold text-[#0F172A] active:scale-[0.98] motion-reduce:active:scale-100 active:text-[#1677FF] transition-all duration-150"
                      onClick={onClose}
                    >
                      {item.label}
                    </Link>
                  )}
                  
                  {hasChildren && isSectionOpen && (
                    <div className="pb-2 px-1 space-y-0.5 animate-in slide-in-from-top-2 duration-200">
                      {item.children.map((child: any) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="block text-[13px] font-medium text-[#475569] hover:text-[#1677FF] active:text-[#1677FF] active:scale-[0.98] motion-reduce:active:scale-100 py-2 rounded-lg px-2 hover:bg-[#F8FAFC] active:bg-[#F1F5F9] transition-all duration-150"
                          onClick={onClose}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="px-3 mt-4 pt-4 border-t border-[#F1F5F9]">
            <h3 className="text-[10px] font-bold text-[#94A3B8] tracking-wider mb-2 uppercase">Tiện ích</h3>
            <div className="space-y-0.5">
              <Link href="/da-luu" className="flex items-center gap-3 text-[13px] font-bold text-[#334155] hover:text-[#18A66A] active:text-[#18A66A] active:scale-[0.98] motion-reduce:active:scale-100 py-2 px-2 rounded-lg hover:bg-[#F8FAFC] active:bg-[#F1F5F9] transition-all duration-150" onClick={onClose}>
                <Heart className="w-[18px] h-[18px] text-[#64748B]" strokeWidth={1.5} />
                <span>Sản phẩm đã lưu</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-3 border-t border-[#E2E8F0] bg-[#F8FAFC] flex flex-col gap-2" style={{ paddingBottom: 'calc(1rem + env(safe-area-inset-bottom))' }}>
          <Button asChild variant="secondary" color="blue" size="sm" className="w-full text-[13px] font-bold h-[40px]">
            <a href="tel:+84948888866">
              Liên hệ Hotline
            </a>
          </Button>
          <Button asChild variant="primary" color="blue" size="sm" className="w-full text-[13px] font-bold h-[40px]">
            <Link href="/rfq" onClick={onClose}>
              Yêu cầu báo giá
            </Link>
          </Button>
        </div>

      </div>
    </div>
  );
}
