import Link from 'next/link';
import { ArrowRight, Mail } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function FinalCTA() {
  return (
    <section className="relative py-10 md:py-24 bg-[#0F172A] overflow-hidden border-t border-[#0F172A]">
      {/* Abstract Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#1677FF] rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"></div>
      </div>
      
      {/* Technical Grid Line */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMGg2MHY2MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0wIDU5LjVoNjBWNjBoLTYweiIgZmlsbD0icmdiYSgyNTUsIDI1NSLCAyNTUsIDAuMDUpIi8+PHBhdGggZD0iTTU5LjUgMHY2MGguNVYweiIgZmlsbD0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjA1KSIvPjwvc3ZnPg==')] opacity-20 pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        <div className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#1677FF]/20 text-[#60A5FA] mb-4 md:mb-6 border border-[#1677FF]/30 shadow-[0_0_20px_rgba(22,119,255,0.2)]">
          <Mail className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />
        </div>
        
        <h2 className="text-[24px] md:text-[40px] font-bold text-white mb-2 md:mb-4 tracking-tight leading-tight">
          Khởi đầu dự án bao bì của bạn
        </h2>
        
        <p className="text-[13px] md:text-[16px] text-[#CBD5E1] mb-6 md:mb-8 max-w-2xl mx-auto leading-snug md:leading-relaxed">
          Đội ngũ kỹ thuật NTB sẵn sàng hỗ trợ tư vấn quy cách, vật liệu và phương án khuôn mẫu 
          phù hợp cho nhu cầu sản xuất kinh doanh của doanh nghiệp.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button asChild variant="primary" color="blue" className="h-[44px] md:h-[48px] px-10 text-[14px] md:text-[15px] font-bold rounded-full w-full sm:w-auto shadow-lg shadow-[#1677FF]/20">
            <Link href="/rfq">
              Yêu cầu báo giá
            </Link>
          </Button>
          <Button asChild variant="secondary" color="default" className="h-[44px] md:h-[48px] px-10 text-[14px] md:text-[15px] font-bold rounded-full w-full sm:w-auto bg-white/5 text-white border border-white/20 hover:bg-white/10 hover:border-white/30 transition-all">
            <Link href="/lien-he">
              Tư vấn kỹ thuật
            </Link>
          </Button>
        </div>

      </div>
    </section>
  );
}
