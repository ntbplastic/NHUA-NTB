"use client";

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { DataProvider } from '@/lib/data/Provider';
import { useData } from '@/lib/data/useData';
import { mockIndustries } from '@/lib/mock/industries';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';

import { motion } from 'motion/react';

export default function IndustrySolutions() {
  const { data: industries }: { data: any[] } = useData(() => DataProvider.getIndustries(), mockIndustries);

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
    <section className="py-6 md:py-16 bg-ntb-page border-y border-ntb-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          className="flex flex-col md:flex-row md:items-end justify-between mb-4 md:mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="max-w-2xl">
            <h2 className="text-[20px] md:text-[32px] font-bold text-ntb-text tracking-tight mb-1.5 md:mb-3">Giải pháp theo ngành</h2>
            <p className="text-[13px] md:text-[15px] text-ntb-muted">
              Bao bì nhựa được phân loại theo các nhóm nhu cầu sử dụng phổ biến trong sản xuất và kinh doanh.
            </p>
          </div>
          <Link href="/giai-phap" className="hidden md:inline-flex items-center text-ntb-blue text-[14px] font-bold hover:text-ntb-blue-deep group active:scale-95 transition-transform">
            Xem tất cả ngành
            <ArrowRight className="ml-1.5 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 md:gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          {industries.filter(i => i.enabled).sort((a, b) => a.order - b.order).map((industry: any) => (
            <motion.div key={industry.id} variants={itemVariants} className="h-full">
              <Link 
                href={`/giai-phap/${industry.slug}`}
                className="group bg-white border border-ntb-border rounded-[12px] md:rounded-[20px] overflow-hidden ntb-depth-1 hover:border-ntb-blue/30 hover:shadow-lg transition-all duration-300 flex flex-row md:flex-col h-full active:scale-[0.98] motion-reduce:active:scale-100"
              >
                <div className="relative w-[100px] md:w-full aspect-[1/1] md:aspect-[3/2] bg-ntb-soft overflow-hidden shrink-0 flex items-center justify-center p-2.5 md:p-8">
                  <ImageWithFallback 
                    src={industry.image} 
                    alt={industry.name} 
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 mix-blend-multiply"
                    fallbackText={industry.name}
                  />
                  <div className="absolute top-2 right-2 w-6 h-6 md:w-8 md:h-8 rounded-full bg-white/80 backdrop-blur-sm border border-ntb-border hidden md:flex items-center justify-center text-ntb-muted group-hover:bg-ntb-blue group-hover:text-white transition-all duration-200">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
                
                <div className="p-3 md:p-6 flex flex-col flex-1 min-w-0">
                  <h3 className="text-[14px] md:text-[18px] font-bold text-ntb-text mb-0.5 md:mb-1 leading-tight group-hover:text-ntb-blue transition-colors truncate md:whitespace-normal">
                    {industry.name}
                  </h3>
                  <p className="text-ntb-muted text-[12px] md:text-[13px] leading-snug mb-2 md:mb-6 line-clamp-2">
                    {industry.summary}
                  </p>
                  
                  <div className="mt-auto flex flex-wrap gap-1">
                    {industry.applications.slice(0, 2).map((app: string) => (
                      <span key={app} className="px-1.5 py-0.5 bg-ntb-page text-ntb-muted text-[10px] font-bold rounded-[4px] border border-ntb-border whitespace-nowrap">
                        {app}
                      </span>
                    ))}
                    {industry.applications.length > 2 && (
                      <span className="text-ntb-muted/60 text-[10px] pt-0.5 font-bold">+{industry.applications.length - 2}</span>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-5 text-center md:hidden">
          <Link href="/giai-phap" className="inline-flex items-center text-ntb-blue text-[13px] font-bold active:scale-95 transition-transform">
            Xem tất cả ngành hàng
            <ArrowRight className="ml-1 w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
