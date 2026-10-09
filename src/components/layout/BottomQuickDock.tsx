
"use client";

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Home, Package, Search, Heart, FileText, Beaker } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSavedProducts, useRFQ } from '@/lib/store';
import { useState, useEffect } from 'react';
import { DataProvider } from '@/lib/data/Provider';
import { useData } from '@/lib/data/useData';
import { mockProducts } from '@/lib/mock/products';

export default function BottomQuickDock() {
  const pathname = usePathname();
  const { saved, toggleSaved, isSaved } = useSavedProducts();
  const { rfq, addToRFQ, isInRFQ } = useRFQ();
  
  const { data: products } = useData(() => DataProvider.getProducts(), mockProducts);

  const handleSearchClick = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log("Mở giao diện tìm kiếm");
  };

  // Check if we are on a Product Detail page
  const pathParts = pathname.split('/');
  const isProductDetail = pathname.startsWith('/san-pham/') && pathParts.length === 4;
  const productSlug = isProductDetail ? pathParts[3] : null;
  const product = productSlug ? products.find((p: any) => p.slug === productSlug) : null;
  
  const savedStatus = product ? isSaved(product.id) : false;

  const handleToggleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    if (product) {
      toggleSaved(product.id);
    }
  };

  const handleRequestSample = (e: React.MouseEvent) => {
    e.preventDefault();
    if (product) {
      window.dispatchEvent(new CustomEvent("open-sample-modal"));
    }
  };

  const baseNavItems = [
    { label: 'Trang chủ', href: '/', icon: Home },
    { label: 'Sản phẩm', href: '/san-pham', icon: Package },
    { label: 'Tìm kiếm', href: '#', icon: Search, onClick: handleSearchClick },
    { label: 'Đã lưu', href: '/da-luu', icon: Heart, badge: saved.length },
    { label: 'Báo giá', href: '/rfq', icon: FileText, badge: rfq.length },
  ];

  const productNavItems = [
    { label: 'Trang chủ', href: '/', icon: Home },
    { label: 'Sản phẩm', href: '/san-pham', icon: Package },
    { label: 'Lưu', href: '#', icon: Heart, onClick: handleToggleSave, isActiveOverride: savedStatus, isAction: true },
    { label: 'Xin mẫu', href: '#', icon: Beaker, onClick: handleRequestSample, isAction: true },
    { label: 'Báo giá', href: '/rfq', icon: FileText, badge: rfq.length },
  ];

  
  type NavItem = {
    label: string;
    href: string;
    icon: any;
    onClick?: (e: React.MouseEvent) => void;
    badge?: number;
    isActiveOverride?: boolean;
    isAction?: boolean;
  };
  const navItems: NavItem[] = isProductDetail ? productNavItems : baseNavItems;
  

  return (
    <div className="fixed z-50 bottom-0 left-0 right-0 md:bottom-6 md:left-1/2 md:-translate-x-1/2 md:right-auto md:w-auto transition-all duration-300 pointer-events-none flex justify-center">
      <nav 
        className="pointer-events-auto w-full md:w-auto bg-white/95 backdrop-blur-xl border-t md:border border-[#E2E8F0] md:rounded-[999px] shadow-[0_-4px_24px_rgba(0,0,0,0.03)] md:shadow-[0_8px_30px_rgba(0,0,0,0.12)] px-1 md:px-2 py-1 md:py-1 flex items-center justify-between md:justify-center md:gap-1"
        style={{ paddingBottom: 'calc(0.25rem + env(safe-area-inset-bottom))' }}
      >
        {navItems.map((item) => {
          const isActive = item.isActiveOverride !== undefined 
            ? item.isActiveOverride 
            : item.href !== '#' && (item.href === '/' ? pathname === '/' : pathname.startsWith(item.href));
          
          const content = (
            <div className={cn(
              "flex flex-col items-center justify-center w-[19vw] md:w-auto md:min-w-[64px] md:px-3 py-1.5 transition-all duration-150 group cursor-pointer active:scale-[0.95] motion-reduce:active:scale-100",
              isActive ? "text-[#1677FF]" : "text-[#64748B]",
            )}>
              <div className="relative">
                <item.icon 
                  className={cn(
                    "w-[20px] h-[20px] md:w-[18px] md:h-[18px] mb-1 md:mb-0.5 transition-all duration-200", 
                    isActive ? "text-[#1677FF]" : "group-hover:scale-110",
                  )} 
                  strokeWidth={isActive ? 2.5 : 1.8} 
                />
                {!!item.badge && item.badge > 0 && (
                  <span className="absolute -top-1 -right-1.5 bg-[#EF4444] text-white text-[8px] font-bold px-1 min-w-[14px] h-[14px] flex items-center justify-center rounded-full border border-white">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className={cn(
                "text-[9px] md:hidden font-bold tracking-tight transition-colors",
                isActive ? "text-[#1677FF]" : "text-[#64748B]"
              )}>
                {item.label}
              </span>
            </div>
          );

          if (item.onClick) {
            return (
              <button 
                key={item.label} 
                onClick={item.onClick} 
                aria-label={item.label} 
                className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1677FF] rounded-[12px] md:rounded-[999px]"
              >
                {content}
              </button>
            );
          }

          return (
            <Link 
              key={item.label} 
              href={item.href} 
              aria-label={item.label} 
              aria-current={isActive ? 'page' : undefined}
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1677FF] rounded-[12px] md:rounded-[999px]"
            >
              {content}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
