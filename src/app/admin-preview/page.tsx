"use client";

import { DataProvider } from '@/lib/data/Provider';
import { useData } from '@/lib/data/useData';
import { DataSeeder, SEED_VERSION } from '@/lib/data/Seeder';
import { mockProducts } from '@/lib/mock/products';
import { mockCategories } from '@/lib/mock/categories';
import { mockIndustries } from '@/lib/mock/industries';
import { mockPartners } from '@/lib/mock/partners';
import { useState, useEffect } from 'react';
import { isFirebaseConfigured } from '@/lib/firebase/config';
import { Switch } from '@/components/ui/Switch';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Chip } from '@/components/ui/Chip';
import { AlertCircle, Cloud, Database, RotateCcw, Save } from 'lucide-react';

export default function AdminPreview() {
  const { data: products }: { data: any[] } = useData(() => DataProvider.getProducts(), mockProducts);
  const { data: categories }: { data: any[] } = useData(() => DataProvider.getCategories(), mockCategories);
  const { data: industries }: { data: any[] } = useData(() => DataProvider.getIndustries(), mockIndustries);
  const { data: partners }: { data: any[] } = useData(() => DataProvider.getPartners(), mockPartners);
  
  const [seedStatus, setSeedStatus] = useState<any>({ seeded: false, version: null, counts: null });
  const [isSeeding, setIsSeeding] = useState(false);
  const [bannerEnabled, setBannerEnabled] = useState(true);
  const [maintenanceEnabled, setMaintenanceEnabled] = useState(false);

  useEffect(() => {
    DataSeeder.checkSeedStatus().then(setSeedStatus);
  }, []);

  const handleSeed = async (forceReset = false) => {
    if (forceReset && !window.confirm('CẢNH BÁO: Thao tác này sẽ ghi đè toàn bộ dữ liệu demo hiện tại. Bạn có chắc chắn muốn khôi phục dữ liệu gốc?')) {
      return;
    }
    
    setIsSeeding(true);
    await DataSeeder.seedData(forceReset);
    const newStatus = await DataSeeder.checkSeedStatus();
    setSeedStatus(newStatus);
    setIsSeeding(false);
    
    if (forceReset) {
      window.location.reload(); // Reload to fetch fresh data
    }
  };

  return (
    <div className="bg-[#F2F6F7] min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-white rounded-[32px] shadow-[0_24px_64px_-12px_rgba(0,0,0,0.05)] border border-[#E2E8F0] overflow-hidden">
          <div className="bg-white border-b border-[#E2E8F0] px-8 py-6 flex items-center justify-between">
            <h1 className="text-xl font-bold text-[#0F172A]">Admin Preview Mode</h1>
            <Chip color="green">
              <span className="w-1.5 h-1.5 rounded-[999px] bg-[#18A66A] mr-1.5 animate-pulse"></span>
              Active
            </Chip>
          </div>
          
          <div className="p-8">
            <div className="flex items-start gap-4 p-5 mb-8 bg-[#EAF3FF] border border-[#1677FF]/20 rounded-[16px] text-[#0F5ED7]">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-[#1677FF]" />
              <div>
                <h3 className="font-bold mb-1">Quyền truy cập xem trước (DEVELOPMENT ONLY)</h3>
                <p className="text-sm">Bạn đang xem giao diện ở chế độ Admin. Chế độ này cho phép xem trước các nội dung CMS chưa xuất bản và quản lý nhanh dữ liệu hiển thị. Trước khi triển khai public, truy cập Admin bắt buộc phải được xác thực/phân quyền rõ ràng.</p>
              </div>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>DEMO DATA (DEVELOPMENT ONLY)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 mb-6">
                    <Chip color={isFirebaseConfigured ? 'green' : 'gray'}>
                      <Cloud className="w-3.5 h-3.5 mr-1" />
                      Firebase: {isFirebaseConfigured ? 'Connected' : 'Disconnected'}
                    </Chip>
                    <div className="text-sm text-[#64748B]">
                      Seed Version: <span className="font-bold text-[#0F172A]">{seedStatus.version || 'None'}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <Button 
                      onClick={() => handleSeed(false)}
                      disabled={isSeeding || !isFirebaseConfigured}
                      variant="primary" color="blue"
                    >
                      <Database className="w-4 h-4 mr-2" />
                      {isSeeding ? 'Đang nạp...' : 'Nạp dữ liệu demo'}
                    </Button>
                    <Button 
                      onClick={() => handleSeed(true)}
                      disabled={isSeeding || !isFirebaseConfigured}
                      variant="secondary" color="default"
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Khôi phục dữ liệu demo
                    </Button>
                  </div>
                  
                  {seedStatus.counts && (
                    <div className="mt-6 p-4 bg-[#F2F6F7] rounded-[16px] text-xs text-[#64748B] font-mono border border-[#E2E8F0]">
                      <p>Last seeded counts: {JSON.stringify(seedStatus.counts)}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Cài đặt hiển thị</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-[#0F172A]">Thông báo Banner</h4>
                      <p className="text-sm text-[#64748B]">Hiển thị banner thông báo sự kiện trên cùng trang web</p>
                    </div>
                    <Switch 
                      checked={bannerEnabled} 
                      onCheckedChange={setBannerEnabled} 
                      color="blue" 
                    />
                  </div>
                  <div className="w-full h-px bg-[#E2E8F0]"></div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-[#0F172A]">Chế độ bảo trì (Maintenance)</h4>
                      <p className="text-sm text-[#64748B]">Tạm ngưng truy cập để nâng cấp hệ thống</p>
                    </div>
                    <Switch 
                      checked={maintenanceEnabled} 
                      onCheckedChange={setMaintenanceEnabled} 
                      color="green" 
                    />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Data Layer Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { label: 'Products', count: products.length },
                      { label: 'Categories', count: categories.length },
                      { label: 'Industries', count: industries.length },
                      { label: 'Partners', count: partners.length },
                    ].map((stat: any) => (
                      <div key={stat.label} className="bg-[#F2F6F7] p-6 rounded-[16px] text-center border border-[#E2E8F0]">
                        <div className="text-3xl font-bold text-[#1677FF] mb-1">{stat.count}</div>
                        <div className="text-xs text-[#64748B] uppercase tracking-wider font-semibold">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8 pt-8 border-t border-[#E2E8F0] flex justify-end">
              <Button disabled variant="secondary" color="default">
                <Save className="w-5 h-5 mr-2" />
                Lưu cài đặt
              </Button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
