"use client";

import { usePathname } from 'next/navigation';
import { Phone } from 'lucide-react';

export default function FloatingQuickCall() {
  const pathname = usePathname();

  // Hide on authentication and internal/admin routes
  if (pathname === '/dang-nhap' || pathname.startsWith('/admin-preview')) {
    return null;
  }

  return (
    <aside aria-label="Hỗ trợ nhanh qua điện thoại">
      <a
        href="tel:+84948888866"
        aria-label="Gọi Nguyên Thái Bình"
        title="Gọi Nguyên Thái Bình - 0948 888 866"
        className="fixed z-40 right-3.5 sm:right-4 md:right-6 bottom-[calc(var(--bottom-dock-height,64px)+var(--bottom-safe-area,0px)+16px)] md:bottom-6 flex items-center justify-center bg-[#1677FF] hover:bg-[#0F5ED7] text-white shadow-md hover:shadow-lg rounded-full active:scale-[0.97] transition-all duration-200 ease-out motion-reduce:transition-none motion-reduce:active:scale-100 hover:-translate-y-[1px] motion-reduce:hover:translate-y-0 w-[50px] h-[50px] md:w-auto md:h-[42px] md:px-4 md:gap-2.5 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#1677FF]"
      >
        <Phone className="w-5 h-5 text-white shrink-0 fill-current" strokeWidth={2} />
        <span className="hidden md:inline font-bold text-[14px] text-white tracking-wide whitespace-nowrap">
          0948 888 866
        </span>
      </a>
    </aside>
  );
}
