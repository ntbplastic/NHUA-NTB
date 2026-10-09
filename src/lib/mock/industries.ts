export interface Industry {
  id: string;
  slug: string;
  name: string;
  summary: string;
  description: string;
  applications: string[]; // List of specific needs (e.g. "tương ớt", "nước giặt")
  categoryIds: string[];  // True category routes relevant to this industry
  productIds: string[];   // Recommended product IDs
  articleIds: string[];   // Related technical articles
  image: string;
  mediaStatus?: "verified" | "illustrative";
  sourcePlatform?: string;
  sourcePageUrl?: string;
  enabled: boolean;
  order: number;
}

export const mockIndustries: Industry[] = [
  { 
    id: 'fnb', 
    slug: 'thuc-pham-do-uong',
    name: 'Thực phẩm & Đồ uống', 
    summary: 'Danh mục bao bì PET, hũ nhựa và nắp nhựa theo quy cách cho thực phẩm & đồ uống.',
    description: 'Trang này tập hợp các nhóm bao bì PET, hũ nhựa và nắp nhựa theo dung tích, quy cách cổ và nhu cầu đóng gói cho thực phẩm & đồ uống.', 
    applications: ['Tương ớt', 'Nước tương', 'Nước chấm', 'Nước uống', 'Dầu ăn'],
    categoryIds: ['pet', 'hu-nhua', 'nap-nhua'],
    productIds: ['1', '2', '3', '21'],
    articleIds: ['article-1', 'article-2', 'article-3'],
    image: '/mock/food-pkg.svg',
    mediaStatus: "verified",
    enabled: true,
    order: 1
  },
  { 
    id: 'home', 
    slug: 'gia-dung-hoa-chat',
    name: 'Gia dụng & Hóa chất', 
    summary: 'Danh mục bao bì nhựa dành cho các nhu cầu đóng gói nước giặt, nước rửa chén và hóa chất gia dụng.',
    description: 'Trang này tập hợp các lựa chọn bao bì HDPE, can nhựa và nắp nhựa theo dung tích, quy cách cổ và nhu cầu sử dụng cho ngành gia dụng và hóa chất.', 
    applications: ['Nước giặt', 'Nước rửa chén', 'Chất tẩy rửa', 'Hóa chất gia dụng'], 
    categoryIds: ['hdpe', 'can-nhua', 'nap-nhua'],
    productIds: ['11', '12', '26', '27'],
    articleIds: ['article-1'],
    image: '/mock/home-pkg.svg',
    mediaStatus: "verified",
    enabled: true,
    order: 2
  },
  { 
    id: 'agri', 
    slug: 'nong-nghiep-bvtv',
    name: 'Nông nghiệp / BVTV', 
    summary: 'Chai và can nhựa theo quy cách phổ biến cho thuốc bảo vệ thực vật và phân bón.',
    description: 'NTB cung cấp các dòng sản phẩm HDPE được thiết kế theo các quy cách thông dụng trong ngành bảo vệ thực vật và phân bón dạng lỏng.', 
    applications: ['Chai bao bì bảo vệ thực vật', 'Phân bón dạng lỏng', 'Thuốc bảo vệ thực vật'], 
    categoryIds: ['hdpe', 'can-nhua', 'nap-nhua'],
    productIds: ['13', '14', '28', '29'],
    articleIds: ['article-1'],
    image: '/mock/agri-pkg.svg',
    mediaStatus: "verified",
    enabled: true,
    order: 3
  },
  { 
    id: 'cosmetic', 
    slug: 'my-pham-cham-soc-ca-nhan',
    name: 'Mỹ phẩm & Chăm sóc cá nhân', 
    summary: 'Các mẫu hũ và chai nhựa tham khảo cho nhu cầu đóng gói mỹ phẩm và chăm sóc cá nhân.',
    description: 'NTB cung cấp các mẫu hũ và chai nhựa với thiết kế đa dạng, hỗ trợ các đơn vị sản xuất mỹ phẩm và hóa mỹ phẩm trong việc lựa chọn bao bì phù hợp.', 
    applications: ['Shampoo', 'Lotion', 'Chăm sóc cơ thể', 'Bao bì mỹ phẩm'], 
    categoryIds: ['pet', 'hdpe', 'hu-nhua'],
    productIds: ['1', '21', '22'],
    articleIds: ['article-1', 'article-2'],
    image: '/mock/cosmetic-pkg.svg',
    mediaStatus: "verified",
    enabled: true,
    order: 4
  },
];
