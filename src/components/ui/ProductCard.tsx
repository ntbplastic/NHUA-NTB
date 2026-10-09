"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Heart, Share2 } from 'lucide-react';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';
import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/utils';
import { useSavedProducts, useRFQ } from '@/lib/store';

interface ProductCardProps {
  product: any;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { isSaved, toggleSaved } = useSavedProducts();
  const { addToRFQ, isInRFQ } = useRFQ();
  const saved = isSaved(product.id);
  const inRfq = isInRFQ(product.id);
  
  const [showToast, setShowToast] = useState(false);

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleSaved(product.id);
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    const url = `${window.location.origin}/san-pham/${product.slug}`; // Note: assumes flat slug or handled by parent component if it passes full href
    
    // We should ideally pass the full href or let the parent pass it, but for now we construct a likely one.
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          url: url
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      navigator.clipboard.writeText(url);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    }
  };
  
  const handleRfq = (e: React.MouseEvent) => {
    e.preventDefault();
    addToRFQ(product.id);
    // Could show a toast here too
  }

  // The href could be pre-calculated by the parent and passed down. 
  // We'll use product.href if available, else fallback to just the slug.
  const href = product.href || `/san-pham/${product.slug}`;

  return (
    <Card className={cn(
      "group relative flex flex-col h-full bg-white border border-ntb-border",
      "rounded-card overflow-hidden ntb-depth-1",
      "hover:border-ntb-blue/30 hover:-translate-y-0.5 hover:shadow-lg",
      "transition-all duration-300",
      className
    )}>
      {/* Toast Notification */}
      <div 
        className={cn(
          "absolute top-2 left-1/2 -translate-x-1/2 bg-ntb-text text-white text-[10px] font-medium px-3 py-1.5 rounded-pill z-20 pointer-events-none shadow-lg",
          "transition-all duration-300",
          showToast ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        )}
      >
        Đã sao chép link
      </div>

      {/* A. Image Area - Compact 1:1 or slightly taller */}
      <div className="aspect-[1/1] sm:h-[180px] bg-ntb-soft/30 relative flex items-center justify-center overflow-hidden border-b border-ntb-border/50 shrink-0 group-active:bg-ntb-soft transition-colors duration-150">
        <Link 
          href={href}
          className="absolute inset-0 z-0 flex items-center justify-center p-2.5 md:p-5 outline-none active:scale-[0.98] active:opacity-80 transition-all duration-150"
        >
          {product.image ? (
            <ImageWithFallback 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 ease-out group-hover:scale-[1.02] group-active:scale-[1.01]" />
          ) : (
            <ImageWithFallback src="" alt={product.name} className="w-full h-full" />
          )}
        </Link>

        {/* ILLUSTRATIVE LABEL */}
        {product.mediaStatus === "illustrative" && (
          <div className="absolute top-1.5 left-1.5 z-10 bg-ntb-text/10 backdrop-blur-[2px] text-ntb-text/60 text-[8px] px-1.5 py-0.5 rounded-[2px] font-bold uppercase tracking-tight border border-ntb-text/5 pointer-events-none">
            Ảnh minh họa
          </div>
        )}
        
        {/* FAVORITE BOTTOM-LEFT */}
        <button 
          type="button"
          onClick={handleSave}
          className={cn(
            "absolute bottom-1.5 left-1.5 z-10 w-[28px] h-[28px] md:w-[36px] md:h-[36px] rounded-full flex items-center justify-center transition-all duration-150 shadow-sm border",
            "bg-white/95 backdrop-blur-sm border-ntb-border hover:bg-white hover:border-ntb-blue/20 active:scale-[0.9] motion-reduce:active:scale-100",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ntb-blue focus-visible:ring-offset-2",
            saved ? "text-ntb-blue border-ntb-blue/20" : "text-ntb-muted hover:text-ntb-blue"
          )}
          title={saved ? "Bỏ lưu sản phẩm" : "Lưu sản phẩm"}
          aria-label={saved ? "Bỏ lưu sản phẩm" : "Lưu sản phẩm"}
        >
          <Heart className={cn("w-[13px] h-[13px] md:w-[17px] md:h-[17px]", saved && "fill-ntb-blue text-ntb-blue")} strokeWidth={saved ? 2.5 : 1.5} />
        </button>
        
        {/* SHARE BOTTOM-RIGHT */}
        <button 
          type="button"
          onClick={handleShare}
          className={cn(
            "absolute bottom-1.5 right-1.5 z-10 w-[28px] h-[28px] md:w-[36px] md:h-[36px] rounded-full flex items-center justify-center transition-all duration-150 shadow-sm border",
            "bg-white/95 backdrop-blur-sm border-ntb-border text-ntb-muted hover:text-ntb-blue hover:bg-white hover:border-ntb-blue/20 active:scale-[0.9] motion-reduce:active:scale-100",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ntb-blue focus-visible:ring-offset-2"
          )}
          title="Chia sẻ"
          aria-label="Chia sẻ sản phẩm"
        >
          <Share2 className="w-[13px] h-[13px] md:w-[17px] md:h-[17px]" strokeWidth={1.5} />
        </button>
      </div>
      
      {/* CONTENT AREA - Compact Padding */}
      <div className="p-2 md:p-4 flex-grow flex flex-col group-active:bg-ntb-soft/50 transition-colors duration-150">
        {/* D. Product Name */}
        <Link 
          href={href}
          className="font-bold text-[13px] md:text-[15px] text-ntb-text leading-[1.25] mb-1.5 md:mb-2 hover:text-ntb-blue active:text-ntb-blue active:opacity-70 transition-all duration-150 line-clamp-2 outline-none"
        >
          {product.name}
        </Link>
        
        {/* E. Technical Specs Chip Row */}
        <div className="mt-auto mb-2 md:mb-3">
          <div className="inline-flex items-center text-[10px] md:text-[12px] font-bold text-[#475569] bg-ntb-soft px-1.5 py-0.5 md:py-1.5 rounded-[4px] md:rounded-[6px] max-w-full overflow-hidden whitespace-nowrap text-ellipsis">
            {product.material}
            {product.capacity && (
              <>
                <span className="mx-0.5 text-ntb-border">·</span>
                {product.capacity}
              </>
            )}
            {product.neck && (
              <>
                <span className="mx-0.5 text-ntb-border">·</span>
                {product.neck}
              </>
            )}
          </div>
        </div>

        {/* F. CTA Area - Single Row */}
        <div className="flex flex-row gap-1 w-full mt-auto">
          <Link 
            href={href}
            className="flex-1 flex items-center justify-center h-[30px] md:h-[38px] px-1 text-[11px] md:text-[13px] font-bold bg-white border border-ntb-border hover:bg-ntb-page hover:border-ntb-blue/20 text-ntb-text/80 rounded-pill active:scale-[0.97] active:bg-ntb-soft transition-all duration-150 whitespace-nowrap outline-none"
            aria-label="Xem chi tiết sản phẩm"
          >
            Chi tiết
          </Link>
          {inRfq ? (
            <Link 
              href="/rfq" 
              className="flex-1 flex items-center justify-center h-[30px] md:h-[38px] px-1 text-[11px] md:text-[13px] font-bold bg-ntb-green-soft border border-ntb-green/20 text-ntb-green-deep hover:bg-ntb-green/10 rounded-pill active:scale-[0.97] transition-all duration-150 whitespace-nowrap outline-none"
            >
              Đã thêm
            </Link>
          ) : (
            <button 
              onClick={handleRfq}
              className="flex-1 flex items-center justify-center h-[30px] md:h-[38px] px-1 text-[11px] md:text-[13px] font-bold bg-ntb-blue hover:bg-ntb-blue-deep text-white rounded-pill active:scale-[0.97] transition-all duration-150 shadow-sm whitespace-nowrap outline-none"
              aria-label="Yêu cầu báo giá sản phẩm"
            >
              Báo giá
            </button>
          )}
        </div>
      </div>
    </Card>
  );
}
