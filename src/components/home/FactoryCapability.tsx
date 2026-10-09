'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function FactoryCapability() {
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

  return (
    <section className="py-10 md:py-16 bg-white border-b border-ntb-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-10 gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="max-w-2xl">
            <h2 className="text-[24px] md:text-[32px] font-bold text-ntb-text mb-2 tracking-tight">Quy mô sản xuất</h2>
            <p className="text-ntb-muted text-[14px] md:text-[15px]">
              Hệ thống nhà xưởng vận hành trực tiếp, phục vụ sản xuất bao bì nhựa PET, HDPE và phụ kiện nắp nút.
            </p>
          </div>
          <Link 
            href="/nang-luc-nha-may" 
            className="text-[13px] md:text-[14px] font-bold text-ntb-blue flex items-center hover:text-ntb-blue-deep group shrink-0 active:scale-95 transition-transform"
          >
            Chi tiết năng lực sản xuất
            <ArrowRight className="ml-1.5 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 md:h-[400px]">
          {/* Main Visual */}
          <motion.div 
            className="md:col-span-2 relative rounded-card overflow-hidden group ntb-depth-1 h-[240px] md:h-auto bg-ntb-soft"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={itemVariants}
          >
            <img 
              src="/mock/factory.svg" 
              alt="Cơ sở hạ tầng sản xuất NTB" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ntb-text/90 via-ntb-text/20 to-transparent"></div>
            <div className="absolute bottom-5 left-5 right-5 md:bottom-6 md:left-6 md:right-6">
              <h3 className="text-white font-bold text-[18px] md:text-[20px] mb-1">Cơ sở hạ tầng sản xuất</h3>
              <p className="text-ntb-border/80 text-[13px]">Vận hành sản xuất bao bì nhựa theo yêu cầu kỹ thuật</p>
              <div className="mt-2 text-[9px] font-bold text-white/20 uppercase tracking-[0.2em]">NTB PLASTIC MANUFACTURING</div>
            </div>
          </motion.div>
          
          {/* Secondary Visuals */}
          <div className="grid grid-rows-2 gap-3 md:gap-4">
            <motion.div 
              className="relative rounded-card overflow-hidden group ntb-depth-1 h-[160px] md:h-auto bg-ntb-soft"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={itemVariants}
            >
              <img 
                src="/mock/production.svg" 
                alt="Dây chuyền vận hành"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ntb-text/90 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-white font-semibold text-[16px] mb-0.5">Dây chuyền vận hành</h3>
                <p className="text-ntb-border/80 text-[12px]">Đáp ứng đơn hàng số lượng lớn</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="relative rounded-card overflow-hidden group ntb-depth-1 h-[160px] md:h-auto bg-ntb-soft"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={itemVariants}
              transition={{ delay: 0.1 }}
            >
              <img 
                src="/mock/qc.svg" 
                alt="Kiểm soát thông số"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ntb-text/90 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-white font-semibold text-[16px] mb-0.5">Kiểm soát thông số</h3>
                <p className="text-ntb-border/80 text-[12px]">Theo hồ sơ kỹ thuật thống nhất</p>
              </div>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}
