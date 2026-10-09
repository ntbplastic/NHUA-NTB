"use client";

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { DataProvider } from '@/lib/data/Provider';
import { useData } from '@/lib/data/useData';
import { mockCategories } from '@/lib/mock/categories';
import { Card } from '@/components/ui/Card';

import { ImageWithFallback } from '@/components/ui/ImageWithFallback';

import { motion } from 'motion/react';

export default function ProductCategories() {
  const { data: categories }: { data: any[] } = useData(() => DataProvider.getCategories(), mockCategories);

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
    <section className="py-6 md:py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          className="flex flex-col md:flex-row md:items-end justify-between mb-4 md:mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="max-w-2xl">
            <h2 className="text-[20px] md:text-[32px] font-bold text-ntb-text mb-1.5 md:mb-3 tracking-tight">Danh mục sản phẩm</h2>
            <p className="text-ntb-muted text-[13px] md:text-[15px]">
              Các dòng sản phẩm bao bì nhựa đa dạng dung tích và kiểu dáng phục vụ đóng gói B2B.
            </p>
          </div>
          <Link href="/san-pham" className="hidden md:inline-flex items-center text-ntb-blue text-[14px] font-semibold hover:text-ntb-blue-deep group active:scale-[0.98] motion-reduce:active:scale-100 transition-transform duration-150">
            Xem tất cả
            <ArrowRight className="ml-1.5 w-4 h-4 transition-transform group-hover:translate-x-1" strokeWidth={2} />
          </Link>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 md:gap-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          {categories.map((cat: any) => (
            <motion.div key={cat.id} variants={itemVariants}>
              <Link 
                href={`/san-pham/${cat.slug}`}
                className="block group active:scale-[0.98] transition-transform duration-150"
              >
                <Card className="h-full flex flex-row md:flex-col overflow-hidden ntb-depth-1 hover:border-ntb-blue/30 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 rounded-[12px] md:rounded-card group-active:border-ntb-muted/20">
                  <div className="w-[100px] md:w-full md:aspect-[2] bg-ntb-soft shrink-0 relative overflow-hidden p-2.5 md:p-3 flex items-center justify-center border-r md:border-r-0 md:border-b border-ntb-border group-active:bg-ntb-border transition-colors duration-150">
                    <ImageWithFallback 
                      src={cat.image} 
                      alt={cat.name} 
                      className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-[1.05] mix-blend-multiply"
                      fallbackText={cat.name}
                    />
                  </div>
                  <div className="p-3.5 md:p-5 flex-grow flex flex-col justify-center bg-transparent">
                    <div className="flex items-center justify-between mb-0.5 md:mb-1">
                      <h3 className="text-[14px] md:text-[18px] font-bold text-ntb-text">{cat.name}</h3>
                      <div className="hidden md:flex w-8 h-8 rounded-full bg-ntb-soft items-center justify-center text-ntb-muted group-hover:text-ntb-blue group-hover:bg-ntb-blue-soft transition-colors duration-200">
                        <ArrowRight className="w-4 h-4" strokeWidth={2} />
                      </div>
                    </div>
                    <p className="text-ntb-muted text-[12px] md:text-[14px] leading-snug line-clamp-2">{cat.description}</p>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="mt-5 text-center md:hidden">
          <Link href="/san-pham" className="inline-flex items-center text-ntb-blue text-[13px] font-bold hover:text-ntb-blue-deep active:scale-[0.98] motion-reduce:active:scale-100 transition-transform duration-150">
            Xem tất cả danh mục
            <ArrowRight className="ml-1 w-3.5 h-3.5" strokeWidth={2.5} />
          </Link>
        </div>

      </div>
    </section>
  );
}
