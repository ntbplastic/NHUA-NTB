import PartnerSection from '@/components/home/PartnerSection';
import FinalCTA from '@/components/home/FinalCTA';

export default function DoiTacPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Khách hàng & Đối tác</h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Sự tin tưởng của các thương hiệu hàng đầu là minh chứng cho chất lượng và năng lực sản xuất của NTB Plastic.
          </p>
        </div>
      </div>
      
      <PartnerSection />
      
      <div className="py-24 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
           <h2 className="text-3xl font-bold text-slate-900 mb-6">Trở thành đối tác phân phối / Đại lý</h2>
           <p className="text-slate-600 max-w-2xl mx-auto mb-8">
             Chúng tôi luôn chào đón các đơn vị có nhu cầu phân phối bao bì nhựa số lượng lớn với chính sách chiết khấu tốt nhất.
           </p>
           <button className="bg-emerald-800 text-white font-bold px-8 py-4 rounded hover:bg-emerald-900 transition-colors">
             Đăng ký ngay
           </button>
        </div>
      </div>

      <FinalCTA />
    </div>
  );
}
