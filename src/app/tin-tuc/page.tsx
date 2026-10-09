"use client";

import Link from 'next/link';
import { DataProvider } from '@/lib/data/Provider';
import { useData } from '@/lib/data/useData';
import { mockArticles } from '@/lib/mock/articles';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { ArrowRight, Calendar } from 'lucide-react';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';

export default function TinTucPage() {
  const { data: articles } = useData(() => DataProvider.getArticles(), mockArticles);

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20">
      
      <div className="bg-white border-b border-[#E2E8F0]">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
          <Breadcrumb 
            items={[
              { label: "Trang chủ", href: "/" },
              { label: "Tin tức & Kiến thức" }
            ]}
            className="mb-4"
          />
          <h1 className="text-[28px] md:text-[36px] font-bold text-[#0F172A] mb-2">Tin tức & Kiến thức</h1>
          <p className="text-[#64748B] text-[14px] md:text-[15px] max-w-3xl">
            Tài liệu hướng dẫn chuyên môn, chia sẻ kỹ thuật sản xuất và tin tức công nghiệp bao bì.
          </p>
        </div>
      </div>

      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {articles.map((article: any) => (
            <Link key={article.id} href={`/tin-tuc/${article.slug}`} className="group bg-white border border-[#E2E8F0] rounded-[24px] overflow-hidden hover:shadow-md transition-all flex flex-col">
              {article.image && (
                <div className="aspect-[2/1] bg-slate-100 overflow-hidden">
                  <ImageWithFallback src={article.image} alt={article.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
              )}
              <div className="p-6 md:p-8 flex-1 flex flex-col">
                <div className="flex items-center text-[#94A3B8] text-[12px] mb-3 font-medium">
                  <Calendar className="w-3.5 h-3.5 mr-1.5" />
                  {article.date}
                </div>
                <h3 className="font-bold text-[#0F172A] text-[18px] mb-3 group-hover:text-[#1677FF] transition-colors line-clamp-2 leading-snug">{article.title}</h3>
                <p className="text-[#64748B] text-[14px] line-clamp-3 mb-6 flex-1 leading-relaxed">{article.summary}</p>
                <div className="text-[#1677FF] text-[14px] font-semibold flex items-center mt-auto">
                  Đọc tiếp <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
