'use client';

import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/Button';
import { Chip } from '@/components/ui/Chip';

export default function Hero() {
  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 15, clipPath: 'inset(0 0 100% 0)' },
    visible: {
      opacity: 1,
      y: 0,
      clipPath: 'inset(0 0 0% 0)',
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const lineVariants: any = {
    hidden: { scaleX: 0, originX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.5,
      },
    },
  };

  const visualVariants: any = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.4,
      },
    },
  };

  return (
    <section className="relative bg-white pt-6 pb-8 md:pt-12 md:pb-16 lg:pt-16 lg:pb-20 border-b border-ntb-border overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-tr from-ntb-soft/50 to-white pointer-events-none" />
      <div className="absolute inset-0 ntb-grid-bg opacity-[0.2] pointer-events-none" />
      
      {/* Decorative lines */}
      <motion.div 
        className="absolute top-0 right-1/4 w-px h-full bg-ntb-border pointer-events-none hidden lg:block opacity-50"
        initial={{ scaleY: 0, originY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div 
        className="absolute top-1/2 left-0 w-full h-px bg-ntb-border pointer-events-none hidden lg:block opacity-50"
        initial={{ scaleX: 0, originX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Signature Technical Line */}
        <div className="absolute top-0 left-0 w-full h-px overflow-hidden">
          <motion.div 
            className="w-full h-full bg-ntb-blue"
            variants={lineVariants}
            initial="hidden"
            animate="visible"
          />
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-center">
          
          {/* LEFT: Content */}
          <motion.div 
            className="lg:col-span-6 mb-6 md:mb-12 lg:mb-0"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-pill bg-ntb-green-soft text-ntb-green-deep text-[10px] md:text-xs font-bold tracking-wide mb-3 md:mb-5 border border-ntb-green/20">
              <span className="w-1.5 h-1.5 rounded-pill bg-ntb-green"></span>
              Sản xuất B2B Chuyên Nghiệp
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-[28px] md:text-4xl lg:text-[48px] font-extrabold text-ntb-text tracking-tight leading-[1.12] md:leading-[1.1] mb-2 md:mb-5">
              Bao bì nhựa được phát triển cho <span className="text-ntb-blue">doanh nghiệp</span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-[13px] md:text-[15px] lg:text-[16px] text-ntb-muted mb-4 md:mb-8 max-w-xl leading-relaxed">
              Giải pháp đóng gói cho ngành thực phẩm, gia dụng và công nghiệp. 
              Năng lực từ hỗ trợ thiết kế khuôn mẫu đến sản xuất hàng loạt.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-row gap-2 mb-4 md:mb-10">
              <Button asChild variant="primary" color="blue" className="flex-1 h-[40px] md:h-[48px] px-2 md:px-10 text-[12px] md:text-[15px] rounded-pill shadow-lg shadow-ntb-blue/20 font-bold active:scale-95 transition-transform">
                <Link href="/san-pham">
                  Xem sản phẩm
                </Link>
              </Button>
              <Button asChild variant="secondary" color="default" className="flex-1 h-[40px] md:h-[48px] px-2 md:px-10 text-[12px] md:text-[15px] rounded-pill bg-white border border-ntb-border hover:bg-ntb-page font-bold active:scale-95 transition-transform">
                <Link href="/rfq">
                  Báo giá
                </Link>
              </Button>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Link href="/giai-phap" className="inline-flex items-center text-[12px] font-bold text-ntb-muted hover:text-ntb-blue transition-all group mb-6">
                Khám phá giải pháp theo ngành
                <ArrowRight className="ml-1.5 w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-2 md:gap-3">
              {[
                'Nhựa PET / HDPE / PP',
                'Tùy chỉnh kỹ thuật',
                'Phát triển khuôn mẫu',
                'Sản xuất hàng loạt'
              ].map((indicator: string) => (
                <div key={indicator} className="flex items-center gap-1.5 md:gap-2">
                  <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-[#F0FDF4] flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3 h-3 md:w-3.5 md:h-3.5 text-[#16A34A]" strokeWidth={2.5} />
                  </div>
                  <span className="text-[11px] md:text-[13px] font-bold text-[#475569]">{indicator}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT: Visual */}
          <motion.div 
            className="lg:col-span-6 relative"
            initial="hidden"
            animate="visible"
            variants={visualVariants}
          >
            <div className="relative rounded-card overflow-hidden ntb-depth-1 aspect-[2/1] md:aspect-[4/3] group flex items-center justify-center p-3 md:p-6 lg:p-8">
              
              {/* Simulated Technical Drawing / Product */}
              <div className="relative w-full h-full border border-dashed border-ntb-blue/30 rounded-[12px] flex items-center justify-center bg-white overflow-hidden">
                 <div className="absolute top-3 left-3 text-ntb-blue text-[9px] font-mono font-bold tracking-widest opacity-60">FIG. 01 — MOLD ENGINEERING</div>
                 
                 {/* Center piece - Abstract Plastic Bottle Mold */}
                 <motion.div 
                   className="w-24 h-40 md:w-28 md:h-48 border border-ntb-border rounded-t-xl rounded-b-md relative z-10 bg-white shadow-lg flex flex-col justify-end overflow-hidden"
                   whileHover={{ y: -8 }}
                   transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                 >
                    <div className="w-full h-10 border-b border-ntb-border relative bg-ntb-soft flex justify-center items-center">
                       <div className="w-12 h-6 border border-ntb-border bg-white rounded-sm mt-3"></div>
                       <div className="absolute -left-6 top-3 w-4 border-t border-ntb-blue-deep"></div>
                       <div className="absolute -left-12 top-1 text-[8px] md:text-[9px] font-mono text-ntb-blue-deep">NECK</div>
                    </div>
                    <div className="w-full flex-grow relative bg-white flex justify-center items-center">
                       <div className="w-16 h-20 border border-ntb-border rounded-lg bg-ntb-soft"></div>
                       <div className="absolute right-0 top-1/2 w-4 border-t border-ntb-green"></div>
                       <div className="absolute -right-8 top-1/2 -mt-2 text-[8px] md:text-[9px] font-mono text-ntb-green">BODY</div>
                    </div>
                 </motion.div>

                 {/* Signature Trace Line Effect - Plays Once */}
                 <motion.div 
                   className="absolute left-0 w-full h-[1px] bg-ntb-blue/40 z-0"
                   initial={{ top: '0%' }}
                   animate={{ top: '100%' }}
                   transition={{ duration: 1.5, ease: "easeInOut", delay: 1 }}
                 />
              </div>

              {/* Floating Labels using Chips */}
              <div className="absolute top-6 left-6 md:top-8 md:left-8">
                <Chip color="blue" className="shadow-sm bg-white/95 backdrop-blur-sm border border-ntb-border text-[9px] md:text-[10px] py-1 px-2.5">
                  Φ28 Neck Finish
                </Chip>
              </div>
              <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8">
                <Chip color="green" className="shadow-sm bg-white/95 backdrop-blur-sm border border-ntb-border text-[9px] md:text-[10px] py-1 px-2.5">
                  <span className="w-1.5 h-1.5 rounded-pill bg-ntb-green mr-1.5"></span>
                  Sản phẩm nhựa PET & HDPE
                </Chip>
              </div>
              <div className="absolute top-1/2 -left-2">
                <Chip color="gray" className="shadow-sm bg-white/95 backdrop-blur-sm border border-ntb-border py-1 px-2 text-[9px] font-mono">
                  PET / 24g
                </Chip>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
