"use client";

import { DataProvider } from '@/lib/data/Provider';
import { useData } from '@/lib/data/useData';
import { mockPartners } from '@/lib/mock/partners';

export default function PartnerSection() {
  const { data: partners }: { data: any[] } = useData(() => DataProvider.getPartners(), mockPartners);
  
  const displayPartners = partners.slice(0, 8);

  return (
    <section className="py-8 md:py-16 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-6 md:mb-10">
          <h2 className="text-[20px] md:text-[32px] font-bold text-[#0F172A] mb-1.5 tracking-tight">Khách hàng & Đối tác</h2>
          <p className="text-[#64748B] text-[13px] md:text-[15px] max-w-2xl mx-auto">
            Đồng hành cùng sự phát triển của các thương hiệu uy tín.
          </p>
        </div>

        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 md:gap-4 items-center">
          {displayPartners.map((partner: any) => (
            <div key={partner.id} className="flex justify-center p-2.5 bg-white border border-[#E2E8F0] rounded-[8px] md:rounded-[12px] hover:border-[#CBD5E1] hover:shadow-sm transition-all duration-300 opacity-80 hover:opacity-100 grayscale hover:grayscale-0 h-[48px] md:h-[80px]">
              <img 
                src={partner.image} 
                alt={partner.name} 
                className="max-h-6 md:max-h-10 w-auto object-contain mix-blend-multiply"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
