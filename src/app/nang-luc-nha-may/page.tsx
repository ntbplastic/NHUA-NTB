'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ChevronRight, 
  Factory, 
  Settings, 
  ClipboardCheck, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Layers,
  Container,
  Database
} from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/Button';

export default function FactoryCapabilityPage() {
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
      <div className="fixed inset-0 ntb-grid-bg opacity-[0.1] pointer-events-none z-0" />
      
      {/* Breadcrumb */}
      <div className="bg-white border-b border-ntb-border relative z-10">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2 md:py-3">
          <nav className="flex items-center gap-1.5 text-[11px] md:text-[13px] text-ntb-muted">
            <Link href="/" className="hover:text-ntb-text transition-colors">Trang chủ</Link>
            <ChevronRight className="w-3.5 h-3.5 text-ntb-border" />
            <span className="text-ntb-text font-bold">Năng lực nhà máy</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-white border-b border-ntb-border py-6 md:py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center">
            <motion.div 
              className="flex-1 max-w-2xl"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-pill bg-ntb-blue-soft text-ntb-blue text-[10px] md:text-[11px] font-bold uppercase tracking-wider mb-3 border border-ntb-blue/10">
                <Factory className="w-3 h-3" />
                Sản xuất công nghiệp
              </div>
              <h1 className="text-[26px] md:text-[40px] font-bold text-ntb-text mb-3 leading-[1.15] tracking-tight">
                Năng lực sản xuất bao bì nhựa chuyên dụng
              </h1>
              <p className="text-ntb-muted text-[13px] md:text-[16px] leading-relaxed mb-6 max-w-xl">
                NTB cung cấp hệ thống vận hành sản xuất bao bì nhựa PET, HDPE và phụ kiện nắp nút cho các dự án công nghiệp.
              </p>
              <div className="flex flex-row gap-2 md:gap-3">
                <Button asChild className="rounded-pill font-bold h-[40px] md:h-[48px] px-5 text-[12px] md:text-[14px] flex-1 md:flex-none shadow-lg shadow-ntb-blue/10 active:scale-95 transition-transform">
                  <Link href="/rfq">Trao đổi yêu cầu</Link>
                </Button>
                <Button asChild variant="outline" className="rounded-pill font-bold bg-white h-[40px] md:h-[48px] px-5 text-[12px] md:text-[14px] flex-1 md:flex-none active:scale-95 transition-transform">
                  <Link href="/nang-luc/khuon-co-khi-chinh-xac" className="flex items-center gap-1.5 justify-center">
                    Năng lực khuôn
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </Button>
              </div>
            </motion.div>
            
            <motion.div 
              className="w-full md:w-[420px] h-[140px] md:h-[315px] relative rounded-card overflow-hidden bg-ntb-soft border border-ntb-border shrink-0 ntb-depth-1"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="absolute inset-0">
                <img 
                  src="/mock/production.svg" 
                  alt="Vận hành sản xuất"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/10"></div>
              </div>

              <div className="absolute bottom-3 left-3 right-3 bg-white/80 backdrop-blur-sm p-2 md:p-3 rounded-lg border border-white/50 shadow-sm">
                <div className="flex items-center gap-2">
                  <motion.div 
                    className="w-1.5 h-1.5 rounded-full bg-ntb-green"
                    animate={{ opacity: [1, 0.4, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-[10px] md:text-[11px] font-bold text-ntb-text uppercase tracking-wide">Vận hành sản xuất trực tiếp</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Manufacturing Overview */}
      <section className="py-8 md:py-20 border-b border-ntb-border relative z-10">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <motion.div 
            className="mb-6 md:mb-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
          >
            <h2 className="text-[20px] md:text-[28px] font-bold text-ntb-text mb-1.5">Hệ thống sản xuất</h2>
            <p className="text-ntb-muted text-[13px] md:text-[14px]">Các dòng sản phẩm vận hành trực tiếp tại nhà máy.</p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {[
              { name: 'Chai PET', slug: 'chai-pet', icon: Container },
              { name: 'Chai HDPE', slug: 'chai-hdpe', icon: Container },
              { name: 'Hũ nhựa', slug: 'hu-nhua', icon: Layers },
              { name: 'Can nhựa', slug: 'can-nhua', icon: Database },
              { name: 'Nắp nhựa', slug: 'nap-nhua', icon: Zap },
              { name: 'Phôi PET', slug: 'phoi-pet', icon: Layers },
            ].map((item) => (
              <motion.div key={item.slug} variants={itemVariants}>
                <Link 
                  href={`/san-pham/${item.slug}`}
                  className="bg-white border border-ntb-border p-3 md:p-6 rounded-[12px] flex flex-col items-center text-center hover:border-ntb-blue hover:shadow-lg transition-all group h-[90px] md:h-auto justify-center active:scale-95"
                >
                  <div className="w-7 h-7 md:w-12 md:h-12 rounded-lg bg-ntb-soft flex items-center justify-center text-ntb-muted mb-2 md:mb-3 group-hover:text-ntb-blue transition-colors">
                    <item.icon className="w-4 h-4 md:w-6 md:h-6" />
                  </div>
                  <span className="text-[13px] md:text-[14px] font-bold text-ntb-text leading-tight">{item.name}</span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Production Flow */}
      <section className="py-8 md:py-20 bg-white border-b border-ntb-border relative z-10">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <motion.div 
            className="mb-6 md:mb-10 text-center md:text-left"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
          >
            <h2 className="text-[20px] md:text-[28px] font-bold text-ntb-text mb-1.5">Quy trình vận hành dự án</h2>
            <p className="text-ntb-muted text-[13px] md:text-[14px]">Các bước thực hiện từ khi tiếp nhận yêu cầu đến khi bàn giao.</p>
          </motion.div>

          <div className="relative">
            {/* Desktop Connector Line */}
            <div className="hidden lg:block absolute top-[40px] left-[40px] right-[40px] h-0.5 bg-ntb-border z-0"></div>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-1 md:gap-4 relative z-10"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
            >
              {[
                { step: 1, title: 'Yêu cầu', desc: 'Tiếp nhận thông số' },
                { step: 2, title: 'Xác định', desc: 'Quy cách bao bì' },
                { step: 3, title: 'Khuôn mẫu', desc: 'Thiết kế & chế tạo' },
                { step: 4, title: 'Chạy mẫu', desc: 'Thử nghiệm thực tế' },
                { step: 5, title: 'Sản xuất', desc: 'Vận hành hàng loạt' },
                { step: 6, title: 'Kiểm tra', desc: 'Thông số kỹ thuật' },
                { step: 7, title: 'Bàn giao', desc: 'Hoàn thiện dự án' },
              ].map((item) => (
                <motion.div key={item.step} variants={itemVariants} className="flex lg:flex-col items-center lg:items-center gap-3 lg:gap-0 lg:text-center p-2.5 md:p-4 bg-ntb-page md:bg-transparent rounded-lg md:rounded-none h-[58px] md:h-auto border border-ntb-border md:border-0 hover:bg-white transition-colors duration-300">
                  <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-white border-2 border-ntb-border flex items-center justify-center text-[13px] md:text-[14px] font-bold text-ntb-text mb-0 lg:mb-4 shrink-0 shadow-sm">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-[13px] md:text-[14px] font-bold text-ntb-text mb-0 md:mb-1 leading-tight">{item.title}</h3>
                    <p className="text-[11px] md:text-[12px] text-ntb-muted leading-tight">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
          
          <motion.div 
            className="mt-12 p-4 md:p-6 bg-ntb-page rounded-card border border-dashed border-ntb-border"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-[12px] md:text-[13px] text-ntb-muted leading-relaxed italic text-center">
              * Quy trình có thể thay đổi linh hoạt tùy theo yêu cầu cụ thể của từng dự án hoặc dòng sản phẩm có sẵn.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quality Control Section */}
      <section className="py-8 md:py-20 border-b border-ntb-border relative z-10">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="w-10 h-10 rounded-lg bg-ntb-green-soft text-ntb-green flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h2 className="text-[20px] md:text-[28px] font-bold text-ntb-text mb-4">Quy trình kiểm tra kỹ thuật</h2>
              <p className="text-ntb-muted text-[14px] md:text-[15px] leading-relaxed mb-6">
                Quy trình kiểm tra có thể bao gồm các bước đối chiếu ngoại quan, thông số và mẫu theo yêu cầu dự án.
              </p>
              
              <div className="space-y-3">
                {[
                  'Đối chiếu ngoại quan sản phẩm (màu sắc, bề mặt)',
                  'Kiểm tra kích thước và thông số theo bản vẽ',
                  'Thử nghiệm lắp ráp với nắp nút tương thích',
                  'Xác nhận quy cách đóng gói theo yêu cầu dự án'
                ].map((item, i) => (
                  <motion.div 
                    key={i} 
                    className="flex items-start gap-2.5"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="w-5 h-5 rounded-full bg-ntb-green/10 flex items-center justify-center shrink-0 mt-0.5">
                      <ChevronRight className="w-3 h-3 text-ntb-green" />
                    </div>
                    <span className="text-[13px] md:text-[14px] text-ntb-text/80">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-white border border-ntb-border p-6 md:p-8 rounded-[24px] shadow-lg shadow-ntb-text/5"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3 className="text-[16px] font-bold text-ntb-text mb-4 flex items-center gap-2">
                <ClipboardCheck className="w-5 h-5 text-ntb-blue" />
                Vận hành quy trình
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-ntb-page rounded-[12px] border border-transparent hover:border-ntb-blue/20 transition-all cursor-default">
                  <h4 className="text-[13px] font-bold text-ntb-text mb-1">Mẫu trước sản xuất</h4>
                  <p className="text-[12px] text-ntb-muted">NTB cung cấp mẫu thực tế để khách hàng xác nhận trước khi vận hành sản xuất hàng loạt.</p>
                </div>
                <div className="p-4 bg-ntb-page rounded-[12px] border border-transparent hover:border-ntb-blue/20 transition-all cursor-default">
                  <h4 className="text-[13px] font-bold text-ntb-text mb-1">Tư vấn kỹ thuật</h4>
                  <p className="text-[12px] text-ntb-muted">Hỗ trợ xác định quy cách cổ, nắp và vật liệu phù hợp với đặc tính sản phẩm bên trong.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mold Engineering Bridge */}
      <section className="py-12 md:py-20 bg-ntb-text text-white overflow-hidden relative z-10">
        <div className="absolute inset-0 opacity-[0.03] ntb-grid-bg" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div 
            className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mx-auto mb-6"
            animate={{ rotate: [0, 10, 0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            <Settings className="w-6 h-6 text-blue-400" />
          </motion.div>
          <motion.h2 
            className="text-[22px] md:text-[32px] font-bold mb-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Năng lực khuôn mẫu & Cơ khí chính xác
          </motion.h2>
          <motion.p 
            className="text-white/60 max-w-2xl mx-auto mb-8 text-[14px] md:text-[16px]"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Chúng tôi chủ động trong khâu thiết kế và chế tạo khuôn mẫu, giúp hiện thực hóa các yêu cầu về kiểu dáng và quy cách riêng cho từng thương hiệu.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Button asChild variant="primary" className="bg-ntb-blue hover:bg-ntb-blue-deep rounded-pill font-bold h-12 px-8 active:scale-95 transition-transform shadow-lg shadow-ntb-blue/20">
              <Link href="/nang-luc/khuon-co-khi-chinh-xac" className="flex items-center gap-2">
                Tìm hiểu năng lực khuôn mẫu
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Final RFQ CTA */}
      <section className="py-8 md:py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <motion.div 
            className="bg-white border border-ntb-border p-6 md:p-12 rounded-[32px] text-center shadow-xl shadow-ntb-text/5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-[20px] md:text-[28px] font-bold text-ntb-text mb-4">Sẵn sàng hỗ trợ dự án của bạn</h2>
            <p className="text-ntb-muted max-w-xl mx-auto mb-8 text-[14px] md:text-[15px]">
              Hãy gửi cho chúng tôi yêu cầu sơ bộ về sản phẩm cần đóng gói để nhận tư vấn kỹ thuật và báo giá phù hợp.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="rounded-pill font-bold h-12 px-10 active:scale-95 transition-transform shadow-lg shadow-ntb-blue/10">
                <Link href="/rfq">Gửi yêu cầu báo giá</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-pill font-bold h-12 px-10 bg-white active:scale-95 transition-transform">
                <Link href="/lien-he">Liên hệ trực tiếp</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
