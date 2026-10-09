"use client";

import NextImage from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Image as ImageIcon } from 'lucide-react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackText?: string;
  containerClassName?: string;
}

export function ImageWithFallback({ 
  src, 
  alt, 
  className, 
  fallbackText = "Đang cập nhật hình ảnh",
  containerClassName,
  ...props 
}: ImageWithFallbackProps) {
  const [error, setError] = useState(false);

  // Reset error state when src changes
  useEffect(() => {
    setError(false);
  }, [src]);

  if (!src || error) {
    return (
      <div className={cn("w-full h-full bg-[#F8FAFC] flex flex-col items-center justify-center text-[#94A3B8] p-4", containerClassName)}>
        <ImageIcon className="w-6 h-6 md:w-8 md:h-8 mb-2 text-[#CBD5E1] opacity-70" strokeWidth={1.5} />
        <span className="font-medium text-[11px] md:text-[12px] text-center line-clamp-2">{fallbackText}</span>
        <span className="text-[9px] md:text-[10px] text-[#CBD5E1] mt-1 font-semibold tracking-wider uppercase">NTB PLASTIC</span>
      </div>
    );
  }

  // Handle src as string for NextImage
  const imageSrc = src as string;

  return (
    <div className={cn("relative w-full h-full overflow-hidden", className)}>
      <NextImage
        src={imageSrc}
        alt={alt || ""}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-contain"
        onError={() => setError(true)}
        referrerPolicy="no-referrer"
      />
    </div>
  );
}
