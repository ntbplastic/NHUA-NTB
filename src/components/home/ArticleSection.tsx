"use client";

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';
import { DataProvider } from '@/lib/data/Provider';
import { useData } from '@/lib/data/useData';
import { mockArticles } from '@/lib/mock/articles';
import { Button } from '@/components/ui/Button';
import { motion } from 'motion/react';

export default function ArticleSection() {
  const { data: articles } = useData(() => DataProvider.getArticles(), mockArticles);
  
  const displayArticles = articles.slice(0, 3);

  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="py-6 md:py-16 bg-[#F8FAFC] border-t border-[#E2E8F0] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-2"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="max-w-2xl">
            <h2 className="text-[20px] md:text-[32px] font-bold text-[#0F172A] mb-1.5 tracking-tight">Kiến thức Kỹ thuật</h2>
            <p className="text-[#64748B] text-[13px] md:text-[15px]">
              Tài liệu hướng dẫn chuyên môn về vật liệu, thiết kế khuôn và quy trình sản xuất bao bì nhựa công nghiệp.
            </p>
          </div>
          <Button asChild variant="outline" className="hidden md:inline-flex rounded-full">
            <Link href="/tin-tuc">
              Tất cả bài viết
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          {displayArticles.map((article: any) => (
            <motion.div key={article.id} variants={itemVariants}>
              <Link href={`/tin-tuc/${article.slug}`} className="group bg-white border border-[#E2E8F0] rounded-[16px] md:rounded-[24px] overflow-hidden hover:shadow-md transition-all flex flex-row md:flex-col h-full active:scale-[0.98] motion-reduce:active:scale-100">
                <div className="w-[100px] md:w-full aspect-[1/1] md:aspect-[2/1] bg-slate-100 overflow-hidden shrink-0">
                  <ImageWithFallback src={article.image || ""} alt={article.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-3.5 md:p-8 flex-1 flex flex-col min-w-0">
                  <h3 className="font-bold text-[#0F172A] text-[14px] md:text-[18px] mb-1.5 md:mb-3 group-hover:text-[#1677FF] transition-colors line-clamp-2 leading-tight md:leading-snug">{article.title}</h3>
                  <p className="text-[#64748B] text-[12px] md:text-[14px] line-clamp-2 md:line-clamp-3 mb-2 md:mb-6 flex-1 leading-snug md:leading-relaxed">{article.summary}</p>
                  <div className="text-[#1677FF] text-[12px] md:text-[14px] font-bold flex items-center mt-auto">
                    Đọc tiếp <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="mt-5 md:hidden">
          <Button asChild variant="outline" className="w-full rounded-full h-10 text-[13px] font-bold">
            <Link href="/tin-tuc">
              Tất cả bài viết
            </Link>
          </Button>
        </div>

      </div>
    </section>
  );
}
