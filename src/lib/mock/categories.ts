export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  mediaStatus?: "verified" | "illustrative";
  sourcePlatform?: string;
  sourcePageUrl?: string;
}

export const mockCategories: Category[] = [
  { 
    id: 'pet', 
    name: 'Chai PET', 
    slug: 'chai-pet', 
    description: 'Chai PET với nhiều lựa chọn dung tích, quy cách cổ và kiểu dáng.', 
    image: '/mock/pet-bottle.svg',
    mediaStatus: "verified"
  },
  { 
    id: 'hdpe', 
    name: 'Chai HDPE', 
    slug: 'chai-hdpe', 
    description: 'Chai HDPE theo nhiều dung tích, quy cách cổ và nhu cầu sử dụng.', 
    image: '/mock/hdpe-bottle.svg',
    mediaStatus: "verified"
  },
  { 
    id: 'hu-nhua', 
    name: 'Hũ nhựa', 
    slug: 'hu-nhua', 
    description: 'Hũ nhựa theo nhiều dung tích, quy cách cổ và nhu cầu đóng gói.', 
    image: '/mock/jar.svg',
    mediaStatus: "verified"
  },
  { 
    id: 'can-nhua', 
    name: 'Can nhựa', 
    slug: 'can-nhua', 
    description: 'Can nhựa theo nhiều dung tích, quy cách cổ và nhu cầu đóng gói công nghiệp.', 
    image: '/mock/jerry-can.svg',
    mediaStatus: "verified"
  },
  { 
    id: 'nap-nhua', 
    name: 'Nắp nhựa', 
    slug: 'nap-nhua', 
    description: 'Nắp nhựa theo quy cách cổ, kiểu nắp và cấu hình sản phẩm.', 
    image: '/mock/cap.svg',
    mediaStatus: "verified"
  },
  { 
    id: 'phoi-pet', 
    name: 'Phôi PET', 
    slug: 'phoi-pet', 
    description: 'Phôi PET theo quy cách cổ và các thông số kỹ thuật được quản lý trong dữ liệu sản phẩm.', 
    image: '/mock/preform.svg',
    mediaStatus: "verified"
  },
];
