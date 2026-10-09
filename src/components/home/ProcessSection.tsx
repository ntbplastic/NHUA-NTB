"use client";

import { DataProvider } from '@/lib/data/Provider';
import { useData } from '@/lib/data/useData';
import { mockProcess } from '@/lib/mock/process';
import { Card, CardContent } from '@/components/ui/Card';
import { motion } from 'motion/react';

export default function ProcessSection() {
  const { data: processSteps } = useData(() => DataProvider.getProcessSteps(), mockProcess);

  return (
    <section className="py-10 md:py-16 bg-white border-y border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
          <h2 className="text-[24px] md:text-[32px] font-bold text-[#0F172A] mb-2 tracking-tight">Quy trình hợp tác sản xuất</h2>
          <p className="text-[#64748B] text-[14px] md:text-[15px]">
            Từ bước lên ý tưởng ban đầu đến sản phẩm hoàn thiện.
          </p>
        </div>

        {/* Desktop Horizontal Process */}
        <div className="hidden lg:grid grid-cols-7 gap-3 relative pb-4">
          <div className="absolute top-[3.5rem] left-[5%] w-[90%] h-[1px] bg-ntb-border/30 -z-10" />
          
          {processSteps.map((item: any, i: number) => (
            <motion.div 
              key={item.id} 
              className="relative flex flex-col items-center group"
              initial="inactive"
              whileInView="active"
              viewport={{ once: false, amount: 0.8 }}
            >
              {/* Progress Line Segment */}
              {i > 0 && (
                <div className="absolute top-[3.5rem] right-[50%] w-[100%] h-[1px] overflow-hidden -z-10">
                  <motion.div 
                    className="w-full h-full bg-ntb-blue"
                    variants={{
                      inactive: { x: '-100%' },
                      active: { x: 0 }
                    }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                  />
                </div>
              )}

              <motion.div 
                className="text-ntb-blue font-mono font-bold text-[13px] mb-4 transition-transform duration-300"
                variants={{
                  inactive: { y: 0, opacity: 0.5 },
                  active: { y: -2, opacity: 1 }
                }}
              >
                {item.step}
              </motion.div>
              
              <motion.div 
                className="w-3.5 h-3.5 rounded-full z-10 relative bg-white border-2 transition-all duration-300 shadow-[0_0_0_6px_white]"
                variants={{
                  inactive: { borderColor: 'var(--ntb-border)', scale: 0.8 },
                  active: { 
                    borderColor: 'var(--ntb-blue)', 
                    scale: 1,
                    boxShadow: '0 0 0 6px white, 0 0 12px rgba(22, 119, 255, 0.2)'
                  }
                }}
              ></motion.div>

              <div className="text-center px-1 mt-5">
                <motion.h3 
                  className="font-bold text-ntb-text text-[14px] mb-1.5 transition-colors duration-300"
                  variants={{
                    inactive: { color: 'var(--ntb-text)' },
                    active: { color: 'var(--ntb-blue)' }
                  }}
                >
                  {item.title}
                </motion.h3>
                <p className="text-[11px] text-ntb-muted leading-relaxed max-w-[120px] mx-auto">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Vertical Process */}
        <div className="lg:hidden space-y-6 relative pb-2">
          {/* Base Track */}
          <div className="absolute top-2 bottom-2 left-[11px] w-[1.5px] bg-[#E2E8F0]" />
          
          {processSteps.map((item: any, i: number) => (
            <motion.div 
              key={item.id} 
              className="relative flex gap-4 items-start group"
              initial="inactive"
              whileInView="active"
              viewport={{ once: true, amount: 0.5 }}
            >
              {/* Individual Connector Segment (NTB Blue Progress) */}
              {i > 0 && (
                <div className="absolute -top-6 left-[10.75px] w-[2px] h-6 overflow-hidden">
                  <motion.div 
                    className="w-full h-full bg-ntb-blue"
                    variants={{
                      inactive: { height: 0 },
                      active: { height: '100%' }
                    }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  />
                </div>
              )}

              {/* Node */}
              <motion.div 
                className="flex-shrink-0 w-[24px] h-[24px] rounded-full flex items-center justify-center font-mono font-bold text-[10px] z-10 relative mt-0.5 border transition-all duration-300"
                variants={{
                  inactive: { 
                    backgroundColor: 'white', 
                    borderColor: '#CBD5E1', 
                    color: '#64748B',
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
                {item.step}
              </motion.div>

              <div className="flex-grow pt-0">
                <motion.h3 
                  className="font-bold text-[14px] leading-tight mb-0.5 transition-colors duration-300"
                  variants={{
                    inactive: { color: 'var(--ntb-text)' },
                    active: { color: 'var(--ntb-blue)' }
                  }}
                >
                  {item.title}
                </motion.h3>
                <p className="text-[12px] text-ntb-muted leading-snug">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
