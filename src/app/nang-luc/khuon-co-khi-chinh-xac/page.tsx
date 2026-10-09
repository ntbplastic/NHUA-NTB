'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ChevronRight, 
  Settings, 
  Cpu, 
  PenTool, 
  Activity, 
  CheckCircle2, 
  FileText,
  Beaker,
  ArrowRight,
  ClipboardList
} from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/Button';

export default function MoldEngineeringPage() {
  const sectionVariants: any = {
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
    <div className="bg-ntb-page min-h-screen pb-20 relative overflow-hidden">
      {/* Background Grid */}
      <div className="fixed inset-0 ntb-grid-bg opacity-[0.05] pointer-events-none z-0" />
      
      {/* Breadcrumb */}
      <div className="bg-white border-b border-ntb-border relative z-10">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2 md:py-3">
          <nav className="flex items-center gap-1.5 text-[11px] md:text-[13px] text-ntb-muted">
            <Link href="/" className="hover:text-ntb-text transition-colors">Trang chủ</Link>
            <ChevronRight className="w-3.5 h-3.5 text-ntb-border" />
            <Link href="/nang-luc-nha-may" className="hover:text-ntb-text transition-colors">Năng lực</Link>
            <ChevronRight className="w-3.5 h-3.5 text-ntb-border" />
            <span className="text-ntb-text font-bold">Khuôn & Cơ khí chính xác</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-ntb-text py-8 md:py-20 relative overflow-hidden z-10">
        {/* Technical Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.05] ntb-grid-bg" />
        
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="max-w-3xl"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-pill bg-ntb-blue/10 text-blue-400 text-[10px] md:text-[11px] font-mono tracking-widest mb-4 border border-ntb-blue/30">
              <Settings className="w-3 h-3" />
              PRECISION MOLD
            </div>
            <h1 className="text-[26px] md:text-[42px] font-bold text-white mb-3 leading-tight tracking-tight">
              Phát triển khuôn mẫu & <span className="text-blue-400">Giải pháp kỹ thuật</span>
            </h1>
            <p className="text-ntb-muted text-[13px] md:text-[18px] leading-relaxed mb-6 max-w-2xl">
              Trao đổi yêu cầu về kiểu dáng, dung tích, quy cách cổ hoặc phát triển khuôn mới cho dự án bao bì nhựa.
            </p>
            <div className="flex flex-row gap-2 md:gap-4">
              <Button asChild className="bg-ntb-blue hover:bg-ntb-blue-deep rounded-pill font-bold h-[40px] md:h-12 px-5 md:px-8 text-[12px] md:text-[14px] flex-1 md:flex-none shadow-lg shadow-ntb-blue/20 active:scale-95 transition-transform">
                <Link href="/rfq">Trao đổi yêu cầu</Link>
              </Button>
              <Button asChild variant="outline" className="text-white border-white/20 hover:bg-white/10 rounded-pill font-bold h-[40px] md:h-12 px-5 md:px-8 text-[12px] md:text-[14px] flex-1 md:flex-none active:scale-95 transition-transform">
                <Link href="/nang-luc-nha-may" className="flex items-center gap-1.5 justify-center">
                  Quy mô sản xuất
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Capability Overview */}
      <section className="py-8 md:py-20 border-b border-ntb-border bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={sectionVariants}
            >
              <h2 className="text-[20px] md:text-[32px] font-bold text-ntb-text mb-4 md:mb-6">Năng lực kỹ thuật khuôn</h2>
              <p className="text-ntb-muted text-[13px] md:text-[16px] leading-relaxed mb-6 md:mb-8">
                NTB chủ động trong khâu hiện thực hóa ý tưởng sản phẩm từ thiết kế 3D đến khi vận hành sản xuất thực tế tại nhà máy.
              </p>
              
              <div className="grid grid-cols-2 gap-2 md:gap-4">
                {[
                  { title: 'Thiết kế khuôn 3D', icon: PenTool },
                  { title: 'Gia công CNC', icon: Cpu },
                  { title: 'Ép & Thổi nhựa', icon: Activity },
                  { title: 'Kiểm tra thông số', icon: CheckCircle2 },
                ].map((item, i) => (
                  <motion.div 
                    key={i} 
                    className="flex items-center gap-2.5 p-2.5 md:p-4 bg-ntb-page rounded-[10px] md:rounded-[16px] border border-ntb-border h-[58px] md:h-auto hover:bg-white hover:border-ntb-blue/20 transition-all duration-300"
                    variants={itemVariants}
                  >
                    <div className="w-7 h-7 md:w-10 md:h-10 rounded-full bg-white flex items-center justify-center text-ntb-blue shadow-sm shrink-0 border border-ntb-border/30">
                      <item.icon className="w-3.5 h-3.5 md:w-5 md:h-5" />
                    </div>
                    <span className="text-[12px] md:text-[14px] font-bold text-ntb-text leading-tight">{item.title}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              className="relative rounded-card overflow-hidden"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="h-[160px] md:h-auto md:aspect-square bg-ntb-text rounded-card overflow-hidden flex items-center justify-center border border-white/10 shadow-2xl relative">
                <img 
                  src="/mock/machining.svg" 
                  alt="Gia công khuôn mẫu"
                  className="absolute inset-0 w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-black/40"></div>

                <div className="relative z-10 text-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <Settings className="w-12 h-12 md:w-24 md:h-24 text-ntb-blue mx-auto mb-3 md:mb-6 opacity-60" />
                  </motion.div>
                  <div className="text-blue-400 font-mono text-[9px] md:text-[12px] tracking-[0.2em] mb-1 md:mb-2 uppercase">Precision Mold</div>
                  <div className="text-white text-[16px] md:text-[24px] font-bold">Giải pháp khuôn mẫu</div>
                  <div className="mt-1 text-[8px] md:text-[10px] font-bold text-blue-400 uppercase tracking-widest opacity-40">NTB PLASTIC</div>
                </div>
              </div>
              <motion.div 
                className="absolute -bottom-3 -right-3 md:-bottom-6 md:-right-6 bg-white p-2.5 md:p-4 rounded-[12px] md:rounded-[16px] shadow-xl border border-ntb-border"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="w-7 h-7 md:w-10 md:h-10 rounded-full bg-ntb-green-soft flex items-center justify-center text-ntb-green">
                    <CheckCircle2 className="w-4 h-4 md:w-6 md:h-6" strokeWidth={2.5} />
                  </div>
                  <div>
                    <div className="text-[11px] md:text-[13px] font-bold text-ntb-text uppercase tracking-tight">Quy trình nội bộ</div>
                    <div className="text-[9px] md:text-[11px] text-ntb-muted">Kiểm soát thông số</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Development Flow */}
      <section className="py-8 md:py-20 border-b border-ntb-border relative z-10">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <motion.div 
            className="mb-6 md:mb-12 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
          >
            <h2 className="text-[20px] md:text-[28px] font-bold text-ntb-text mb-1.5">Quy trình phát triển khuôn</h2>
            <p className="text-ntb-muted text-[13px] md:text-[15px]">Các bước từ yêu cầu sơ bộ đến khi vận hành sản xuất.</p>
          </motion.div>

          <motion.div 
            className="space-y-2 md:space-y-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {[
              { step: '01', title: 'Tiếp nhận yêu cầu', desc: 'Trao đổi dung tích, kiểu dáng, vật liệu.' },
              { step: '02', title: 'Xác định thông số', desc: 'Quy cách cổ, trọng lượng phôi, nắp nút.' },
              { step: '03', title: 'Thiết kế khuôn', desc: 'Bản vẽ 3D khuôn thổi hoặc khuôn ép.' },
              { step: '04', title: 'Gia công CNC', desc: 'Thực hiện gia công và lắp ráp khuôn.' },
              { step: '05', title: 'Chạy mẫu thử', desc: 'Đánh giá ngoại quan và thông số lô mẫu.' },
              { step: '06', title: 'Điều chỉnh', desc: 'Tinh chỉnh khuôn đạt sự ổn định vận hành.' },
              { step: '07', title: 'Vận hành sản xuất', desc: 'Bàn giao khuôn vào dây chuyền sản xuất.' }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                className="flex items-center gap-3 md:gap-6 p-3 md:p-6 bg-white border border-ntb-border rounded-[10px] md:rounded-[16px] h-[58px] md:h-auto hover:bg-ntb-page transition-colors duration-200"
                variants={itemVariants}
              >
                <div className="text-[16px] md:text-[24px] font-bold text-ntb-border tabular-nums shrink-0">{item.step}</div>
                <div className="min-w-0">
                  <h3 className="text-[13px] md:text-[16px] font-bold text-ntb-text mb-0 md:mb-1 leading-tight truncate">{item.title}</h3>
                  <p className="text-[11px] md:text-[13px] text-ntb-muted leading-tight truncate md:whitespace-normal">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.p 
            className="mt-8 text-center text-[12px] md:text-[13px] text-ntb-muted italic"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            * Đối với các dòng sản phẩm phổ thông đã có sẵn khuôn tại NTB, khách hàng có thể bỏ qua các bước 03-06.
          </motion.p>
        </div>
      </section>

      {/* Project Input Checklist */}
      <section className="py-8 md:py-20 bg-white border-b border-ntb-border relative z-10">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <motion.div 
            className="bg-ntb-page rounded-[32px] p-6 md:p-12 border border-ntb-border ntb-depth-1"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
          >
            <div className="flex flex-col md:flex-row gap-8 md:gap-16">
              <div className="md:w-1/3">
                <div className="w-12 h-12 rounded-xl bg-ntb-blue text-white flex items-center justify-center mb-6 shadow-lg shadow-ntb-blue/20">
                  <ClipboardList className="w-6 h-6" />
                </div>
                <h2 className="text-[22px] md:text-[28px] font-bold text-ntb-text mb-4 leading-tight">Thông tin nên chuẩn bị</h2>
                <p className="text-ntb-muted text-[14px] md:text-[15px] leading-relaxed">
                  Để quá trình tư vấn kỹ thuật diễn ra nhanh chóng, khách hàng nên chuẩn bị trước các thông tin cơ bản về dự án.
                </p>
              </div>
              
              <div className="md:w-2/3 grid sm:grid-cols-2 gap-x-8 gap-y-6">
                {[
                  { label: 'Loại sản phẩm', desc: 'PET, HDPE, PP...' },
                  { label: 'Dung tích dự kiến', desc: '100ml, 500ml, 1L...' },
                  { label: 'Quy cách cổ', desc: 'Ø20, Ø24, Ø28...' },
                  { label: 'Vật liệu dự kiến', desc: 'Nhựa nguyên sinh, tái chế...' },
                  { label: 'Nắp tương thích', desc: 'Nắp vặn, nắp bật, vòi xịt...' },
                  { label: 'Số lượng dự kiến', desc: 'Nhu cầu hàng tháng/năm' },
                  { label: 'Ứng dụng', desc: 'Đựng dầu ăn, hóa mỹ phẩm...' },
                  { label: 'Yêu cầu mẫu', desc: 'Cần mẫu thử hay mẫu thực tế' }
                ].map((item, i) => (
                  <motion.div 
                    key={i} 
                    className="flex gap-3"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-ntb-blue mt-2 shrink-0"></div>
                    <div>
                      <div className="text-[14px] font-bold text-ntb-text leading-tight mb-0.5">{item.label}</div>
                      <div className="text-[12px] text-ntb-muted">{item.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Bridges */}
      <section className="py-8 md:py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-4">
            <motion.div 
              className="bg-white border border-ntb-border p-8 rounded-[32px] hover:border-ntb-blue transition-all duration-300 ntb-depth-1 group active:scale-[0.98]"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Beaker className="w-8 h-8 text-ntb-blue mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-[18px] md:text-[20px] font-bold text-ntb-text mb-3">Yêu cầu chạy mẫu</h3>
              <p className="text-ntb-muted text-[14px] mb-8 leading-relaxed">
                Đánh giá hình dáng và độ tương thích của bao bì với sản phẩm thực tế trước khi quyết định sản xuất hàng loạt.
              </p>
              <Button asChild variant="outline" className="rounded-pill font-bold h-11 px-8 bg-white active:scale-95 transition-transform">
                <Link href="/rfq" className="flex items-center gap-2">
                  Gửi yêu cầu mẫu
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </motion.div>
            
            <motion.div 
              className="bg-ntb-text p-8 rounded-[32px] text-white ntb-depth-2 group active:scale-[0.98]"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <FileText className="w-8 h-8 text-blue-400 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-[18px] md:text-[20px] font-bold mb-3">Báo giá dự án</h3>
              <p className="text-white/60 text-[14px] mb-8 leading-relaxed">
                Nhận báo giá chi tiết dựa trên quy cách và số lượng yêu cầu cho dự án bao bì của doanh nghiệp bạn.
              </p>
              <Button asChild className="bg-ntb-blue hover:bg-ntb-blue-deep rounded-pill font-bold h-11 px-8 active:scale-95 transition-transform shadow-lg shadow-ntb-blue/20">
                <Link href="/rfq" className="flex items-center gap-2">
                  Yêu cầu báo giá
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
