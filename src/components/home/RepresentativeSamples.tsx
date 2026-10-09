'use client';

import Link from 'next/link';
import { Beaker, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/Button';

export default function RepresentativeSamples() {
  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const samplePoints = [
    { title: 'Mẫu ngoại quan', desc: 'Đánh giá hình dáng, màu sắc và độ trong.' },
    { title: 'Mẫu thông số', desc: 'Kiểm tra kích thước cổ, ren và độ dày.' },
    { title: 'Mẫu tương thích', desc: 'Thử nghiệm lắp ráp với nắp nút và sản phẩm.' },
  ];

  return (
    <section className="py-12 md:py-20 bg-ntb-page border-b border-ntb-border relative overflow-hidden">
      <div className="absolute inset-0 ntb-grid-bg opacity-[0.03] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-pill bg-ntb-blue/10 text-ntb-blue text-[11px] font-bold uppercase tracking-wider mb-4 border border-ntb-blue/10">
              <Beaker className="w-3.5 h-3.5" />
              THỬ NGHIỆM DỰ ÁN
            </motion.div>
            
            <motion.h2 variants={itemVariants} className="text-[24px] md:text-[36px] font-bold text-ntb-text mb-4 leading-tight">
              Chạy mẫu & Đánh giá <br className="hidden md:block" /> 
              <span className="text-ntb-blue">kỹ thuật & ngoại quan</span>
            </motion.h2>
            
            <motion.p variants={itemVariants} className="text-ntb-muted text-[14px] md:text-[16px] mb-8 leading-relaxed max-w-xl">
              Đối chiếu hình dáng, thông số và yêu cầu dự án trước khi chuyển sang sản xuất. 
              Hỗ trợ rà soát mẫu và yêu cầu kỹ thuật trước bước sản xuất.
            </motion.p>

            <motion.div variants={itemVariants} className="space-y-4 mb-8">
              {samplePoints.map((point, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-card bg-white border border-ntb-border ntb-depth-1 hover:border-ntb-blue/30 transition-all group">
                  <div className="w-10 h-10 rounded-full bg-ntb-soft flex items-center justify-center shrink-0 group-hover:bg-ntb-blue-soft transition-colors">
                    <CheckCircle2 className="w-5 h-5 text-ntb-blue" strokeWidth={2.5} />
                  </div>
                  <div>
                    <h4 className="text-ntb-text font-bold text-[15px] mb-0.5">{point.title}</h4>
                    <p className="text-ntb-muted text-[13px]">{point.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div variants={itemVariants}>
              <Button asChild variant="primary" color="blue" className="h-12 px-8 rounded-pill font-bold group active:scale-95 transition-transform shadow-lg shadow-ntb-blue/10">
                <Link href="/rfq">
                  Yêu cầu mẫu đối chiếu
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div 
            className="relative"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="aspect-square relative rounded-[32px] overflow-hidden border border-ntb-border bg-white p-8 md:p-12 shadow-2xl ntb-depth-1 flex items-center justify-center">
              <div className="absolute inset-0 ntb-grid-bg opacity-[0.2]"></div>
              
              {/* Technical Drawing Representation */}
              <div className="relative w-full h-full border border-ntb-blue/10 rounded-xl flex items-center justify-center">
                <div className="absolute top-4 left-4 font-mono text-[10px] text-ntb-blue/40 uppercase tracking-widest">Sample Review</div>
                <div className="absolute bottom-4 right-4 font-mono text-[10px] text-ntb-blue/40 uppercase tracking-widest">NTB Plastic</div>
                
                <motion.div
                  className="w-32 h-48 md:w-48 md:h-64 border-2 border-ntb-blue/20 rounded-t-[40px] rounded-b-[20px] relative"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-12 h-12 border-2 border-ntb-blue/20 rounded-md" />
                  <div className="absolute top-1/4 left-0 w-full h-px bg-ntb-blue/5" />
                  <div className="absolute top-2/4 left-0 w-full h-px bg-ntb-blue/5" />
                  <div className="absolute top-3/4 left-0 w-full h-px bg-ntb-blue/5" />
                  <div className="absolute left-1/2 top-0 w-px h-full bg-ntb-blue/5" />
                  
                  {/* Measurement lines */}
                  <div className="absolute -left-8 top-0 h-full w-px bg-ntb-blue/20">
                    <div className="absolute top-0 -left-1 w-2 h-px bg-ntb-blue/20" />
                    <div className="absolute bottom-0 -left-1 w-2 h-px bg-ntb-blue/20" />
                    <div className="absolute top-1/2 -left-12 -translate-y-1/2 font-mono text-[9px] text-ntb-blue/40 rotate-[-90deg]">GEOMETRY</div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Floating technical tag instead of pseudo-metrics */}
            <motion.div 
              className="absolute -top-4 -right-4 md:-top-6 md:-right-6 bg-white py-2 px-4 rounded-[12px] shadow-lg border border-ntb-border z-20"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="text-ntb-blue font-bold text-[14px] md:text-[16px] leading-tight">TECHNICAL REVIEW</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
