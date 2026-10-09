"use client";

import { useState } from 'react';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductGalleryProps {
  product: {
    name: string;
    image: string;
    mediaStatus?: "verified" | "illustrative";
    technicalDrawingImage?: string;
    detailImages?: string[];
    applicationImages?: string[];
  };
}

export function ProductGallery({ product }: ProductGalleryProps) {
  const images: { src: string; label: string }[] = [];
  
  if (product.image) {
    images.push({ src: product.image, label: 'Sản phẩm' });
  }
  if (product.detailImages) {
    product.detailImages.forEach((img, i) => {
      images.push({ src: img, label: `Chi tiết ${i + 1}` });
    });
  }
  if (product.technicalDrawingImage) {
    images.push({ src: product.technicalDrawingImage, label: 'Bản vẽ kỹ thuật' });
  }
  if (product.applicationImages) {
    product.applicationImages.forEach((img, i) => {
      images.push({ src: img, label: `Ứng dụng ${i + 1}` });
    });
  }

  const [activeIndex, setActiveIndex] = useState(0);

  if (images.length === 0) {
    return (
      <div className="flex flex-col">
        <div className="aspect-[4/3] bg-white rounded-[16px] border border-[#E2E8F0] flex items-center justify-center relative group mb-4 overflow-hidden">
          <ImageWithFallback src="" alt={product.name} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* Main Image */}
      <div className="aspect-[4/3] bg-white rounded-[16px] border border-[#E2E8F0] flex items-center justify-center relative group mb-4 p-6 overflow-hidden">
        <ImageWithFallback 
          src={images[activeIndex].src} 
          alt={`${product.name} - ${images[activeIndex].label}`} 
          className="w-full h-full object-contain mix-blend-multiply" 
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-[#475569] text-[11px] font-bold px-2.5 py-1 rounded shadow-sm border border-[#E2E8F0]">
          {images[activeIndex].label}
        </div>

        {/* ILLUSTRATIVE LABEL */}
        {product.mediaStatus === "illustrative" && images[activeIndex].src === product.image && (
          <div className="absolute top-4 right-4 bg-ntb-text/5 backdrop-blur-[2px] text-ntb-text/40 text-[9px] px-2 py-0.5 rounded-[2px] font-bold uppercase tracking-tight border border-ntb-text/5 pointer-events-none">
            Ảnh minh họa
          </div>
        )}
      </div>
      
      {/* Thumbnails Rail */}
      {images.length > 1 && (
        <div className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-3 pb-2 -mx-2 px-2 md:mx-0 md:px-0">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={cn(
                "w-20 h-20 md:w-24 md:h-24 shrink-0 snap-start bg-white border-2 rounded-lg p-2 cursor-pointer transition-all outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#1677FF]",
                activeIndex === idx 
                  ? "border-[#1677FF] shadow-sm" 
                  : "border-[#E2E8F0] hover:border-[#94A3B8] opacity-70 hover:opacity-100"
              )}
              aria-label={`Xem ảnh ${img.label}`}
              aria-pressed={activeIndex === idx}
            >
              <ImageWithFallback 
                src={img.src} 
                alt={`${product.name} ${img.label}`} 
                className="w-full h-full object-contain mix-blend-multiply" 
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// Just an icon fallback
function Box(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  );
}
