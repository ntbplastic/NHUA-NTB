export interface ProcessStep {
  id: string;
  step: string;
  title: string;
  description: string;
}

export const mockProcess: ProcessStep[] = [
  { id: '1', step: '01', title: 'Tư vấn', description: 'Trao đổi yêu cầu, phân tích tính khả thi và định hướng giải pháp bao bì.' },
  { id: '2', step: '02', title: 'Thiết kế', description: 'Lên ý tưởng, thiết kế bản vẽ kỹ thuật 2D/3D chi tiết.' },
  { id: '3', step: '03', title: 'Phát triển khuôn', description: 'Chế tạo khuôn mẫu chính xác dựa trên bản vẽ đã duyệt.' },
  { id: '4', step: '04', title: 'Mẫu thử', description: 'Chạy thử mẫu, kiểm tra và tối ưu hóa trước khi sản xuất hàng loạt.' },
  { id: '5', step: '05', title: 'Sản xuất', description: 'Vận hành dây chuyền thổi chai/ép nhựa tự động công suất lớn.' },
  { id: '6', step: '06', title: 'Kiểm soát', description: 'Kiểm tra chất lượng (QC) nghiêm ngặt từng lô sản phẩm.' },
  { id: '7', step: '07', title: 'Giao hàng', description: 'Đóng gói tiêu chuẩn B2B và vận chuyển đến kho khách hàng.' },
];
