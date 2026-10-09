import ProcessSection from '@/components/home/ProcessSection';
import FinalCTA from '@/components/home/FinalCTA';

export default function QuyTrinhPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="bg-emerald-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Quy trình làm việc</h1>
          <p className="text-emerald-100 max-w-2xl mx-auto text-lg">
            Hệ thống quản lý chất lượng xuyên suốt, minh bạch và tối ưu hóa tiến độ cho khách hàng B2B.
          </p>
        </div>
      </div>
      
      <ProcessSection />
      <FinalCTA />
    </div>
  );
}
