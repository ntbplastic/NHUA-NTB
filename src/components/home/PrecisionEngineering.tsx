'use client';

import Link from 'next/link';
import { ArrowRight, Cpu, Ruler, CheckCircle2, Settings } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/Button';

export default function PrecisionEngineering() {
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
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section className="py-8 md:py-16 bg-ntb-text overflow-hidden relative border-y border-ntb-text">
      {/* Technical Background Elements */}
      <div className="absolute inset-0 opacity-[0.03] ntb-grid-bg" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-6 md:gap-12 items-center">
          
          {/* Visual Side */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="aspect-[16/9] md:aspect-[3/2] lg:aspect-[4/3] relative rounded-card overflow-hidden border border-white/10 bg-ntb-text shadow-2xl group">
              <img 
                src="/mock/mold.svg" 
                alt="Kỹ thuật khuôn mẫu chính xác"
                className="absolute inset-0 w-full h-full object-cover opacity-50 transition-all duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-ntb-text via-ntb-text/40 to-transparent"></div>
              <div className="absolute inset-0 ntb-grid-bg opacity-10"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Settings className="w-16 h-16 md:w-24 md:h-24 text-ntb-blue opacity-20" strokeWidth={1} />
                </motion.div>
                <div className="mt-4 text-[10px] md:text-[12px] font-bold text-blue-400 uppercase tracking-[0.3em] opacity-30">NTB PRECISION MOLD</div>
              </div>
              
              <div className="absolute bottom-6 left-6 bg-ntb-text/80 backdrop-blur-md border border-white/10 p-4 rounded-[16px]">
                <div className="flex items-center gap-2 text-blue-400 font-mono text-[13px] mb-1 font-bold">
                  <Ruler className="w-4 h-4" />
                  <span>Kỹ thuật khuôn mẫu</span>
                </div>
                <div className="text-ntb-border/60 text-[11px] uppercase tracking-wider">Thiết kế & gia công khuôn mẫu</div>
              </div>

              {/* Technical Path Reveal Effect */}
              <motion.div 
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300" fill="none">
                  {/* Outer Frame Trace */}
                  <motion.path 
                    d="M 40 40 L 360 40 L 360 260 L 40 260 Z" 
                    stroke="#1677FF" 
                    strokeWidth="0.5"
                    strokeDasharray="4 2"
                    className="opacity-20"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 2.5, ease: "easeInOut" }}
                  />
                  {/* Technical Crosshair Line-tracing */}
                  <motion.path 
                    d="M 200 10 L 200 290" 
                    stroke="#1677FF" 
                    strokeWidth="0.3"
                    className="opacity-30"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
                  />
                  <motion.path 
                    d="M 10 150 L 390 150" 
                    stroke="#1677FF" 
                    strokeWidth="0.3"
                    className="opacity-30"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
                  />
                  {/* Precision Corners */}
                  <motion.path d="M 40 60 L 40 40 L 60 40" stroke="#1677FF" strokeWidth="1" className="opacity-40" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 1 }} />
                  <motion.path d="M 340 40 L 360 40 L 360 60" stroke="#1677FF" strokeWidth="1" className="opacity-40" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 1 }} />
                  <motion.path d="M 360 240 L 360 260 L 340 260" stroke="#1677FF" strokeWidth="1" className="opacity-40" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 1.2 }} />
                  <motion.path d="M 60 260 L 40 260 L 40 240" stroke="#1677FF" strokeWidth="1" className="opacity-40" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 1.2 }} />
                  
                  {/* Dimension Markers Trace */}
                  <motion.path 
                    d="M 100 40 L 100 30 M 300 40 L 300 30" 
                    stroke="#1677FF" 
                    strokeWidth="0.5" 
                    className="opacity-20"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ delay: 1.5 }}
                  />
                  <motion.path 
                    d="M 40 100 L 30 100 M 40 200 L 30 200" 
                    stroke="#1677FF" 
                    strokeWidth="0.5" 
                    className="opacity-20"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ delay: 1.5 }}
                  />
                </svg>
                
                {/* Subtle Grid Accent */}
                <div className="absolute inset-0 ntb-grid-bg opacity-[0.05]" />
              </motion.div>
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-pill border border-ntb-blue/30 text-blue-400 text-[10px] md:text-[11px] font-mono tracking-widest mb-3 md:mb-6 bg-ntb-blue/10">
              <Cpu className="w-3 h-3 md:w-3.5 md:h-3.5" strokeWidth={1.5} />
              NĂNG LỰC KỸ THUẬT
            </motion.div>
            
            <motion.h2 variants={itemVariants} className="text-[24px] sm:text-[36px] font-bold text-white mb-2 md:mb-4 leading-tight">
              Từ ý tưởng khuôn mẫu đến <span className="text-blue-400">vận hành sản xuất</span>
            </motion.h2>
            
            <motion.p variants={itemVariants} className="text-ntb-muted text-[13px] md:text-[15px] mb-5 md:mb-8 leading-snug md:leading-relaxed">
              NTB chủ động trong khâu thiết kế và gia công khuôn mẫu nhựa, 
              hỗ trợ doanh nghiệp triển khai bao bì từ khâu bản vẽ kỹ thuật.
            </motion.p>

            <motion.div variants={itemVariants} className="relative space-y-4 md:space-y-0 md:grid md:grid-cols-2 md:gap-4 mb-6 md:mb-10">
              {/* Process Connector (Mobile) */}
              <div className="absolute left-[11px] top-2 bottom-2 w-[1.5px] bg-white/10 md:hidden" />

              {[
                { title: 'Phát triển khuôn 3D', desc: 'Định hình theo thông số' },
                { title: 'Gia công CNC', desc: 'Thực hiện tại xưởng cơ khí' },
                { title: 'Chạy mẫu thử nghiệm', desc: 'Đánh giá mẫu thực tế' },
                { title: 'Vận hành sản xuất', desc: 'Chuyển sang sản xuất hàng loạt' },
                { title: 'Kiểm tra thông số', desc: 'Đối chiếu hồ sơ kỹ thuật' }
              ].map((cap, i) => (
                <motion.div 
                  key={i} 
                  className="relative flex items-start gap-4 p-3 md:p-3.5 rounded-[12px] bg-white/5 border border-white/5 group overflow-hidden"
                  initial="inactive"
                  whileInView="active"
                  viewport={{ once: true, amount: 0.5 }}
                >
                  {/* Technical Line Trace Effect */}
                  <motion.div 
                    className="absolute inset-0 border-t border-ntb-blue/20 pointer-events-none"
                    variants={{
                      inactive: { width: 0 },
                      active: { width: '100%' }
                    }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                  />

                  {/* Node */}
                  <motion.div 
                    className="w-[22px] h-[22px] rounded-full border flex items-center justify-center flex-shrink-0 mt-0.5 z-10 transition-colors duration-300"
                    variants={{
                      inactive: { 
                        backgroundColor: 'transparent', 
                        borderColor: 'rgba(255,255,255,0.1)', 
                        color: 'rgba(255,255,255,0.3)',
                        scale: 0.9
                      },
                      active: { 
                        backgroundColor: 'var(--ntb-blue)', 
                        borderColor: 'var(--ntb-blue)', 
                        color: 'white',
                        scale: 1,
                        boxShadow: '0 0 0 6px rgba(22, 119, 255, 0.15)'
                      }
                    }}
                  >
                    <span className="text-[10px] font-bold">{i + 1}</span>
                  </motion.div>

                  <div className="z-10">
                    <motion.h4 
                      className="text-white text-[14px] font-semibold mb-0.5 leading-tight transition-colors duration-300"
                      variants={{
                        inactive: { color: 'rgba(255,255,255,0.7)' },
                        active: { color: 'white' }
                      }}
                    >
                      {cap.title}
                    </motion.h4>
                    <p className="text-[11px] md:text-[12px] text-ntb-muted">{cap.desc}</p>
                  </div>

                  {/* Mobile Connector Progress */}
                  {i > 0 && (
                    <div className="absolute -top-4 left-[10.75px] w-[2px] h-4 overflow-hidden md:hidden">
                      <motion.div 
                        className="w-full h-full bg-ntb-blue"
                        variants={{
                          inactive: { height: 0 },
                          active: { height: '100%' }
                        }}
                        transition={{ duration: 0.4 }}
                      />
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={itemVariants}>
              <Button asChild variant="primary" color="blue" className="h-[40px] md:h-[42px] px-6 text-[13px] md:text-[14px] rounded-pill font-bold group active:scale-95 transition-transform shadow-lg shadow-ntb-blue/20">
                <Link href="/nang-luc/khuon-co-khi-chinh-xac">
                  Chi tiết năng lực kỹ thuật
                  <ArrowRight className="ml-2 w-3.5 h-3.5 md:w-4 md:h-4 transition-transform group-hover:translate-x-1" strokeWidth={2} />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
