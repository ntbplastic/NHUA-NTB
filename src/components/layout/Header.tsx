"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Heart, Menu, X, ChevronDown, Settings, LogOut, User } from "lucide-react";
import { navigationData } from "@/lib/mock/navigation";
import { cn } from "@/lib/utils";
import MobileDrawer from "./MobileDrawer";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/lib/auth/AuthContext";
import { authService } from "@/lib/auth/auth-service";
import { brandConfig } from "@/lib/config/brand";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, profile } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
          isScrolled
            ? "bg-white/90 backdrop-blur-md border-[#E2E8F0] shadow-[0_2px_12px_rgba(0,0,0,0.03)] py-1.5 md:py-3"
            : "bg-white border-transparent py-2 md:py-4",
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[36px] md:h-auto">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center gap-2 md:gap-3 group active:scale-[0.98] transition-transform duration-150">
                <div className="relative w-[32px] h-[32px] md:w-[44px] md:h-[44px]">
                  <Image 
                    src={brandConfig.logoUrl} 
                    alt={brandConfig.name}
                    fill
                    className="object-contain"
                    referrerPolicy="no-referrer"
                    priority
                  />
                </div>
                <div className="flex flex-col">
                  <div className="text-[#0F172A] font-bold leading-none tracking-tight text-[13px] md:text-[15px] whitespace-nowrap">
                    NHỰA NGUYÊN THÁI BÌNH
                  </div>
                  <div className="text-[#64748B] text-[8px] md:text-[9px] font-medium tracking-[0.1em] mt-0.5 md:mt-1 uppercase">
                    {brandConfig.tagline}
                  </div>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navigationData.map((item: any) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/" && pathname.startsWith(item.href));

                return (
                  <div key={item.label} className="relative group">
                    <Link
                      href={item.href}
                      aria-current={isActive ? 'page' : undefined}
                      className={cn(
                        "px-4 py-2 rounded-[999px] text-sm font-medium transition-all duration-150 flex items-center gap-1",
                        "active:scale-[0.98] motion-reduce:active:scale-100",
                        isActive
                          ? "text-[#0F5ED7] bg-[#EAF3FF]"
                          : "text-[#64748B] hover:text-[#0F172A] hover:bg-[#F2F6F7] active:bg-[#E2E8F0]",
                      )}
                    >
                      {item.label}
                      {item.children && (
                        <ChevronDown
                          className="w-4 h-4 opacity-50"
                          strokeWidth={1.5}
                        />
                      )}
                    </Link>

                    {item.children && (
                      <div className="absolute top-full left-0 mt-1 w-48 bg-white/95 backdrop-blur-md border border-[#E2E8F0] rounded-[16px] shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-left group-hover:translate-y-0 translate-y-1">
                        {item.children.map((child: any) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            className="block px-4 py-2 text-sm text-[#64748B] hover:bg-[#F2F6F7] hover:text-[#0F172A] active:bg-[#E2E8F0] active:scale-[0.98] motion-reduce:active:scale-100 transition-all duration-150"
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

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-3">
              <button
                className="text-[#64748B] hover:text-[#0F172A] transition-all duration-150 p-2 rounded-full hover:bg-[#F2F6F7] active:scale-[0.95] active:bg-[#E2E8F0] motion-reduce:active:scale-100"
                aria-label="Search"
              >
                <Search className="w-5 h-5" strokeWidth={1.5} />
              </button>
              <Link
                href="/da-luu"
                className="text-[#64748B] hover:text-[#18A66A] transition-all duration-150 p-2 rounded-full hover:bg-[#E9F8F1] active:scale-[0.95] active:bg-[#D3F1E3] motion-reduce:active:scale-100"
                aria-label="Saved Items"
              >
                <Heart className="w-5 h-5" strokeWidth={1.5} />
              </Link>
              
              {user ? (
                <div className="relative">
                  <button 
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 hover:bg-[#F2F6F7] p-1 pr-3 rounded-[999px] transition-all duration-150 border border-transparent hover:border-slate-200 active:scale-[0.97] active:bg-[#E2E8F0] motion-reduce:active:scale-100"
                  >
                    {user.photoURL ? (
                      <img src={user.photoURL} alt="User" className="w-7 h-7 rounded-full" />
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center text-slate-500">
                        <User className="w-4 h-4" />
                      </div>
                    )}
                    <span className="text-sm font-medium text-slate-700 max-w-[100px] truncate">
                      {profile?.name || user.displayName || 'User'}
                    </span>
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  </button>

                  {userMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-100 py-2">
                      <div className="px-4 py-2 border-b border-slate-50 mb-2">
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Trạng thái</p>
                        <p className="text-sm font-medium text-slate-800 mt-1">
                          {profile?.status === 'approved' ? 'Khách hàng B2B' : (profile?.status === 'pending' ? 'Chờ duyệt' : 'Đang xử lý')}
                        </p>
                      </div>
                      <Link href="/admin-preview" className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 active:bg-slate-100 transition-colors" onClick={() => setUserMenuOpen(false)}>
                        <Settings className="w-4 h-4" />
                        <span>Tài khoản</span>
                      </Link>
                      <button 
                        onClick={() => {
                          authService.signOut();
                          setUserMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 active:bg-red-100 text-left transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Đăng xuất</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/dang-nhap"
                  className="text-sm font-medium text-[#64748B] hover:text-[#0F172A] transition-all duration-150 px-3 py-2 rounded-[999px] hover:bg-[#F2F6F7] active:scale-[0.97] active:bg-[#E2E8F0] motion-reduce:active:scale-100"
                >
                  Đăng nhập
                </Link>
              )}
            </div>

            {/* Mobile Actions */}
            <div className="flex lg:hidden items-center space-x-1">
              <a
                href="tel:"
                className="text-[10px] font-bold text-[#1677FF] px-2.5 py-1.5 bg-[#EAF3FF] rounded-full mr-1 active:scale-[0.95] transition-all duration-150"
              >
                HOTLINE
              </a>
              <button
                className="text-[#64748B] p-1.5 rounded-full hover:bg-[#F2F6F7] active:scale-[0.95] active:bg-[#E2E8F0] transition-all duration-150 motion-reduce:active:scale-100"
                aria-label="Search"
              >
                <Search className="w-[18px] h-[18px]" strokeWidth={1.5} />
              </button>
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="text-[#0F172A] p-1.5 rounded-full hover:bg-[#F2F6F7] active:scale-[0.95] active:bg-[#E2E8F0] transition-all duration-150 motion-reduce:active:scale-100"
                aria-label="Open menu"
              >
                <Menu className="w-[22px] h-[22px]" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Admin Preview Floating Button - Only show on admin-preview route */}
      {(pathname === '/admin-preview' || (process.env.NODE_ENV === 'development' && pathname === '/admin-preview')) && (
        <Link
          href="/admin-preview"
          className="fixed z-40 bg-[#0F172A] hover:bg-slate-800 text-white p-3 rounded-full shadow-lg flex items-center justify-center group active:scale-[0.9] transition-transform duration-150 motion-reduce:active:scale-100 hover:scale-110"
          style={{
            bottom:
              "calc(var(--bottom-dock-height) + var(--bottom-safe-area) + 80px)",
            right: "16px",
          }}
          title="Admin Preview"
        >
          <Settings
            className="w-5 h-5 group-hover:rotate-45 transition-transform"
            strokeWidth={1.5}
          />
        </Link>
      )}

      <MobileDrawer
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}
