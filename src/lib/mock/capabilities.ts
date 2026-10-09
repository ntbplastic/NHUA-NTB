export interface Capability {
  id: string;
  title: string;
  description: string;
  slug: string;
}
export const mockCapabilities: Capability[] = [
  { id: '1', slug: 'thiet-ke-phat-trien', title: 'Thiết kế & phát triển', description: 'Đội ngũ R&D giàu kinh nghiệm hỗ trợ từ khâu lên ý tưởng đến bản vẽ kỹ thuật hoàn chỉnh.' },
  { id: '2', slug: 'khuon-co-khi', title: 'Khuôn & Cơ khí chính xác', description: 'Hệ thống xưởng cơ khí hiện đại gia công khuôn mẫu chất lượng cao.' },
  { id: '3', slug: 'phat-trien-khuon', title: 'Phát triển khuôn', description: 'Thiết kế và chế tạo khuôn thổi, khuôn ép nhựa theo yêu cầu đặc thù.' },
  { id: '4', slug: 'gia-cong-co-khi', title: 'Gia công cơ khí chính xác', description: 'Gia công chi tiết, thiết bị phụ trợ ngành nhựa.' },
  { id: '5', slug: 'mau-thu', title: 'Mẫu thử / chạy thử', description: 'Test mẫu thực tế để đánh giá công năng và tương thích trước sản xuất đại trà.' },
  { id: '6', slug: 'thoi-chai', title: 'Thổi chai', description: 'Dây chuyền máy thổi tự động công suất lớn, độ đồng đều cao.' },
  { id: '7', slug: 'san-xuat', title: 'Sản xuất', description: 'Quy mô nhà máy lớn, đáp ứng đơn hàng số lượng cực lớn trong thời gian ngắn.' },
  { id: '8', slug: 'kiem-soat-chat-luong', title: 'Kiểm soát chất lượng', description: 'Hệ thống QC nghiêm ngặt, phòng lab kiểm tra độ bền, chống thấm.' },
  { id: '9', slug: 'giao-hang', title: 'Giao hàng', description: 'Đội xe vận tải chuyên nghiệp, giao hàng tận nơi an toàn.' },
];
