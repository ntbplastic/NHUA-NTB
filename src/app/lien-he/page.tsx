import { Mail, Phone, MapPin, Send, ExternalLink } from 'lucide-react';

export default function LienHePage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Liên hệ với NTB</h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Đội ngũ chuyên gia của chúng tôi luôn sẵn sàng hỗ trợ và tư vấn giải pháp bao bì tối ưu cho doanh nghiệp của bạn.
          </p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-8">Thông tin liên hệ</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-lg">Địa chỉ văn phòng & Nhà máy</h4>
                  <p className="text-slate-600 mt-1">1459 Đường Trần Văn Giàu, Xã Bình Lợi, Thành phố Hồ Chí Minh, Việt Nam</p>
                  <p className="text-slate-500 text-sm mt-1">Mã số thuế: 0317249934</p>
                  <div className="mt-2">
                    <a
                      href="https://maps.app.goo.gl/Ar5VTqSNtNffXmZh9"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Xem vị trí Nhựa Nguyên Thái Bình trên Google Maps"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline"
                    >
                      <span>Xem bản đồ</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-lg">Hotline / CSKH</h4>
                  <p className="text-slate-600 mt-1">
                    <a href="tel:+84948888866" className="hover:text-blue-600 transition-colors">0948 888 866</a>
                  </p>
                  <p className="text-slate-500 text-sm mt-1">Zalo: 0948 888 866</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-lg">Phòng kinh doanh & Thu mua</h4>
                  <p className="text-slate-600 mt-1">
                    Điện thoại: <a href="tel:+84898989629" className="hover:text-blue-600 transition-colors">0898 989 629</a>
                  </p>
                  <p className="text-slate-600">
                    Thu mua: <a href="tel:+84933333398" className="hover:text-blue-600 transition-colors">0933 333 398</a>
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-lg">Email & Fax</h4>
                  <p className="text-slate-600 mt-1">
                    <a href="mailto:ntbplastic_vn@yahoo.com.vn" className="hover:text-blue-600 transition-colors">ntbplastic_vn@yahoo.com.vn</a>
                  </p>
                  <p className="text-slate-500 text-sm mt-1">Fax: 028 3766 0726</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Gửi tin nhắn trực tuyến</h3>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Họ và tên *</label>
                  <input type="text" className="w-full border-slate-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500 py-2.5 px-3 border" placeholder="VD: Nguyễn Văn A" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Công ty</label>
                  <input type="text" className="w-full border-slate-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500 py-2.5 px-3 border" placeholder="Tên công ty" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Điện thoại *</label>
                  <input type="tel" className="w-full border-slate-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500 py-2.5 px-3 border" placeholder="Số điện thoại liên hệ" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                  <input type="email" className="w-full border-slate-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500 py-2.5 px-3 border" placeholder="Email liên hệ" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Chủ đề cần tư vấn</label>
                <select className="w-full border-slate-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500 py-2.5 px-3 border">
                  <option>Yêu cầu sản xuất vỏ chai / hũ / can</option>
                  <option>Phát triển khuôn mẫu mới</option>
                  <option>Đăng ký làm đại lý / NPP</option>
                  <option>Tuyển dụng</option>
                  <option>Khác</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nội dung yêu cầu *</label>
                <textarea rows={4} className="w-full border-slate-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500 py-2.5 px-3 border" placeholder="Vui lòng cung cấp thêm chi tiết để chúng tôi hỗ trợ tốt nhất..."></textarea>
              </div>
              <button type="button" className="w-full flex justify-center items-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-3 rounded-md transition-colors">
                <Send className="w-5 h-5" />
                Gửi thông tin
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
