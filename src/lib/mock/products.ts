export interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string;
  material: string;
  capacity?: string;
  neck: string;
  weight?: string;
  height?: string;
  diameter?: string;
  color?: string;
  shape?: string;
  categoryId: string;
  image: string;
  mediaStatus?: "verified" | "illustrative";
  sourcePlatform?: string;
  sourcePageUrl?: string;
  technicalDrawingImage?: string;
  detailImages?: string[];
  applicationImages?: string[];
  familyId?: string;
  compatibleProductIds?: string[];
  relatedProductIds?: string[];
  applications?: string[];
  customizable?: boolean;
  relatedArticleIds?: string[];
}

export const mockProducts: Product[] = [
  {
    "id": "1",
    "name": "Chai PET 250ml Φ28",
    "slug": "chai-pet-250ml-phi-28",
    "sku": "",
    "material": "PET",
    "capacity": "250ml",
    "neck": "Φ28",
    "weight": undefined,
    "height": undefined,
    "diameter": undefined,
    "color": "Trong suốt",
    "shape": "Tròn",
    "categoryId": "pet",
    "applications": [
      "Nước giải khát",
      "Nước ép trái cây",
      "Siro"
    ],
    "familyId": "pet-round",
    "relatedProductIds": ["2", "18", "4"],
    "customizable": true,
    "image": "https://bizweb.dktcdn.net/thumb/large/100/397/052/products/3u1a2873.png",
    "mediaStatus": "verified",
    "sourcePageUrl": "https://nguyenthaibinh.com.vn/chai-250ml-28"
  },
  {
    "id": "2",
    "name": "Chai Nhựa PET 250ml (Màu nâu) Φ28",
    "slug": "chai-pet-250ml-mau-nau-phi-28",
    "sku": "",
    "material": "PET",
    "capacity": "250ml",
    "neck": "Φ28",
    "weight": undefined,
    "height": undefined,
    "diameter": undefined,
    "color": "Nâu",
    "shape": "Tròn",
    "categoryId": "pet",
    "applications": [
      "Dược phẩm",
      "Siro"
    ],
    "familyId": "pet-round",
    "relatedProductIds": ["1", "3", "5"],
    "customizable": true,
    "image": "https://bizweb.dktcdn.net/thumb/large/100/397/052/products/photoroom-20251123-075514-jpeg.jpg",
    "mediaStatus": "verified",
    "sourcePageUrl": "https://nguyenthaibinh.com.vn/chai-250-ml-28-1"
  },
  {
    "id": "3",
    "name": "Chai PET 500ml Φ34",
    "slug": "chai-pet-500ml-phi-34",
    "sku": "",
    "material": "PET",
    "capacity": "500ml",
    "neck": "Φ34",
    "weight": undefined,
    "height": undefined,
    "diameter": undefined,
    "color": "Trong suốt",
    "shape": "Tròn",
    "categoryId": "pet",
    "applications": [
      "Nước mắm",
      "Nước tương",
      "Dầu ăn"
    ],
    "familyId": "pet-round",
    "relatedProductIds": ["1", "4", "5"],
    "customizable": true,
    "image": "https://bizweb.dktcdn.net/thumb/large/100/397/052/products/untitled-d3fce02f-1d68-472f-844a-fcb744f6ff99.png",
    "mediaStatus": "verified",
    "sourcePageUrl": "https://nguyenthaibinh.com.vn/chai-pet-500ml-34"
  },
  {
    "id": "4",
    "name": "Chai PET 500ml Φ28",
    "slug": "chai-pet-500ml-phi-28",
    "sku": "",
    "material": "PET",
    "capacity": "500ml",
    "neck": "Φ28",
    "weight": undefined,
    "height": undefined,
    "diameter": undefined,
    "color": "Trong suốt",
    "shape": "Tròn",
    "categoryId": "pet",
    "applications": [
      "Nước suối",
      "Nước giải khát"
    ],
    "familyId": "pet-round",
    "relatedProductIds": ["1", "3", "6"],
    "customizable": true,
    "image": "https://bizweb.dktcdn.net/thumb/large/100/397/052/products/photoroom-20241106-095916-jpeg.jpg",
    "mediaStatus": "verified",
    "sourcePageUrl": "https://nguyenthaibinh.com.vn/chau-pet-500ml-28"
  },
  {
    "id": "5",
    "name": "Chai PET 750ml Φ28",
    "slug": "chai-pet-750ml-phi-28",
    "sku": "",
    "material": "PET",
    "capacity": "750ml",
    "neck": "Φ28",
    "weight": undefined,
    "height": undefined,
    "diameter": undefined,
    "color": "Trong suốt",
    "shape": "Tròn",
    "categoryId": "pet",
    "applications": [
      "Rượu vang",
      "Mật ong",
      "Dầu ăn"
    ],
    "familyId": "pet-round",
    "relatedProductIds": ["3", "4", "6"],
    "customizable": true,
    "image": "https://bizweb.dktcdn.net/thumb/large/100/397/052/products/20211128-141344000-ios.jpg",
    "mediaStatus": "verified",
    "sourcePageUrl": "https://nguyenthaibinh.com.vn/chai-750ml-28"
  },
  {
    "id": "6",
    "name": "Chai PET 1000ml Φ28",
    "slug": "chai-pet-1000ml-phi-28",
    "sku": "",
    "material": "PET",
    "capacity": "1000ml",
    "neck": "Φ28",
    "weight": undefined,
    "height": undefined,
    "diameter": undefined,
    "color": "Trong suốt",
    "shape": "Tròn",
    "categoryId": "pet",
    "applications": [
      "Nước mắm",
      "Dầu ăn"
    ],
    "familyId": "pet-round",
    "relatedProductIds": ["4", "5", "10"],
    "customizable": true,
    "image": "https://bizweb.dktcdn.net/thumb/large/100/397/052/products/img-0158-webp.png",
    "mediaStatus": "verified",
    "sourcePageUrl": "https://nguyenthaibinh.com.vn/chai-1000ml-28"
  },
  {
    "id": "7",
    "name": "Chai HDPE 250ml Φ34",
    "slug": "chai-hdpe-250ml-phi-34",
    "sku": "",
    "material": "HDPE",
    "capacity": "250ml",
    "neck": "Φ34",
    "weight": undefined,
    "height": undefined,
    "diameter": undefined,
    "color": "Trắng đục",
    "shape": "Tròn",
    "categoryId": "hdpe",
    "applications": [
      "Hóa chất",
      "Nông dược"
    ],
    "familyId": "hdpe-round",
    "relatedProductIds": ["8", "9", "10"],
    "customizable": true,
    "image": "https://bizweb.dktcdn.net/thumb/large/100/397/052/products/3u1a2876.png",
    "mediaStatus": "verified",
    "sourcePageUrl": "https://nguyenthaibinh.com.vn/chai-250ml-34-3"
  },
  {
    "id": "8",
    "name": "Chai HDPE 250ml Φ48",
    "slug": "chai-hdpe-250ml-phi-48",
    "sku": "",
    "material": "HDPE",
    "capacity": "250ml",
    "neck": "Φ48",
    "weight": undefined,
    "height": undefined,
    "diameter": undefined,
    "color": "Trắng đục",
    "shape": "Tròn",
    "categoryId": "hdpe",
    "applications": [
      "Thuốc thú y",
      "Phân bón lá"
    ],
    "familyId": "hdpe-round",
    "relatedProductIds": ["7", "9", "11"],
    "customizable": true,
    "image": "/images/products/chai-hdpe/chai-hdpe-250ml-phi48-01.png",
    "mediaStatus": "verified"
  },
  {
    "id": "9",
    "name": "Chai HDPE 500ml Φ39",
    "slug": "chai-hdpe-500ml-phi-39",
    "sku": "",
    "material": "HDPE",
    "capacity": "500ml",
    "neck": "Φ39",
    "weight": undefined,
    "height": undefined,
    "diameter": undefined,
    "color": "Trắng đục",
    "shape": "Tròn",
    "categoryId": "hdpe",
    "applications": [
      "Nước giặt",
      "Hóa chất công nghiệp"
    ],
    "familyId": "hdpe-round",
    "relatedProductIds": ["7", "10", "12"],
    "customizable": true,
    "image": "https://bizweb.dktcdn.net/thumb/large/100/397/052/products/img-0227-jpeg.jpg",
    "mediaStatus": "verified"
  },
  {
    "id": "10",
    "name": "Chai HDPE 1000ml Φ39",
    "slug": "chai-hdpe-1000ml-phi-39",
    "sku": "",
    "material": "HDPE",
    "capacity": "1000ml",
    "neck": "Φ39",
    "weight": undefined,
    "height": undefined,
    "diameter": undefined,
    "color": "Trắng đục",
    "shape": "Tròn",
    "categoryId": "hdpe",
    "applications": [
      "Hóa chất",
      "Thuốc trừ sâu"
    ],
    "familyId": "hdpe-round",
    "relatedProductIds": ["9", "11", "12"],
    "customizable": true,
    "image": "https://bizweb.dktcdn.net/thumb/large/100/397/052/products/img-1030.png",
    "mediaStatus": "verified",
    "sourcePageUrl": "https://nguyenthaibinh.com.vn/chai-1000ml-vuong-34"
  },
  {
    "id": "11",
    "name": "Chai HDPE 1000ml (Vuông) Φ39",
    "slug": "chai-hdpe-1000ml-vuong-phi-39",
    "sku": "",
    "material": "HDPE",
    "capacity": "1000ml",
    "neck": "Φ39",
    "weight": undefined,
    "height": undefined,
    "diameter": undefined,
    "color": "Trắng đục/Xám",
    "shape": "Vuông",
    "categoryId": "hdpe",
    "applications": [
      "Dầu nhớt",
      "Chất lỏng công nghiệp"
    ],
    "familyId": "hdpe-square",
    "relatedProductIds": ["10", "12", "26"],
    "customizable": true,
    "image": "https://bizweb.dktcdn.net/thumb/large/100/397/052/products/chai-nhua-hdpe-1-lit-vuong-dung-dau-nhot-jpg.png",
    "mediaStatus": "verified",
    "sourcePageUrl": "https://nguyenthaibinh.com.vn/chai-nhua-hdpe-1-lit-vuong-dung-dau-nhot-jpg"
  },
  {
    "id": "12",
    "name": "Hũ nhựa PE 1000g",
    "slug": "hu-nhua-pe-1000g",
    "sku": "",
    "material": "HDPE",
    "capacity": "1000g",
    "neck": "Φ89",
    "weight": undefined,
    "height": undefined,
    "diameter": undefined,
    "color": "Trắng đục",
    "shape": "Tròn",
    "categoryId": "hu-nhua",
    "applications": [
      "Hóa chất bột",
      "Thực phẩm khô"
    ],
    "familyId": "pe-jar",
    "relatedProductIds": ["10", "25", "34"],
    "customizable": true,
    "image": "https://bizweb.dktcdn.net/thumb/large/100/397/052/products/img-7039-jpg-54ef2591-247b-40af-8797-30deb45e46a2.png",
    "mediaStatus": "verified",
    "sourcePageUrl": "https://nguyenthaibinh.com.vn/hu-pe-1000g"
  },
  {
    "id": "13",
    "name": "Nắp Bật Φ28 (PP)",
    "slug": "nap-bat-phi-28-pp",
    "sku": "",
    "material": "PP",
    "neck": "Φ28",
    "color": "Nhiều màu",
    "categoryId": "nap-nhua",
    "applications": [
      "Chai tương ớt",
      "Chai nước sốt"
    ],
    "familyId": "caps",
    "relatedProductIds": ["1", "2", "31"],
    "customizable": true,
    "image": "/images/products/nap-nhua/nap-bat-phi28-01.jpg",
    "mediaStatus": "verified"
  },
  {
    "id": "14",
    "name": "Nắp vặn Φ28",
    "slug": "nap-van-phi-28",
    "sku": "",
    "material": "PP",
    "neck": "Φ28",
    "color": "Trắng/Xanh/Đỏ",
    "categoryId": "nap-nhua",
    "applications": [
      "Chai nước suối",
      "Chai nước giải khát"
    ],
    "familyId": "caps",
    "relatedProductIds": ["1", "4", "31"],
    "customizable": true,
    "image": "https://bizweb.dktcdn.net/thumb/large/100/397/052/products/img-7041-jpg.png",
    "mediaStatus": "verified",
    "sourcePageUrl": "https://nguyenthaibinh.com.vn/nap-28"
  },
  {
    "id": "15",
    "name": "Phôi PET Φ34",
    "slug": "phoi-pet-phi-34",
    "sku": "",
    "material": "PET",
    "neck": "Φ34",
    "weight": undefined,
    "categoryId": "phoi-pet",
    "applications": [
      "Sản xuất chai PET"
    ],
    "familyId": "preforms",
    "relatedProductIds": ["3", "16", "36"],
    "customizable": true,
    "image": "/images/products/phoi-pet/phoi-pet-34mm-01.jpg",
    "mediaStatus": "verified"
  },
  {
    "id": "16",
    "name": "Phôi PET Φ38 (Chịu nhiệt)",
    "slug": "phoi-pet-phi-38-chiu-nhiet",
    "sku": "",
    "material": "PET",
    "neck": "Φ38",
    "weight": undefined,
    "categoryId": "phoi-pet",
    "applications": [
      "Chai nước ép rót nóng"
    ],
    "familyId": "preforms",
    "relatedProductIds": ["15", "17", "37"],
    "customizable": true,
    "image": "https://bizweb.dktcdn.net/thumb/large/100/397/052/products/1763509809522-1.jpg",
    "mediaStatus": "verified",
    "sourcePageUrl": "https://nguyenthaibinh.com.vn/phoi-pet-chiu-nhiet-38mm"
  },
  {
    "id": "17",
    "name": "Phôi PET Φ44",
    "slug": "phoi-pet-phi-44",
    "sku": "",
    "material": "PET",
    "neck": "Φ44",
    "weight": undefined,
    "categoryId": "phoi-pet",
    "applications": [
      "Sản xuất hũ PET"
    ],
    "familyId": "preforms",
    "relatedProductIds": ["15", "16", "38"],
    "customizable": true,
    "image": "/images/products/phoi-pet/phoi-pet-44mm-01.jpg",
    "mediaStatus": "verified"
  },
  {
    "id": "18",
    "name": "Chai PET 250ml Φ34",
    "slug": "chai-pet-250ml-phi-34",
    "sku": "",
    "material": "PET",
    "capacity": "250ml",
    "neck": "Φ34",
    "weight": undefined,
    "height": undefined,
    "diameter": undefined,
    "color": "Trong suốt",
    "shape": "Tròn",
    "categoryId": "pet",
    "applications": [
      "Nước giải khát",
      "Mật ong"
    ],
    "familyId": "pet-round",
    "relatedProductIds": ["1", "3"],
    "customizable": true,
    "image": "/images/products/chai-pet/chai-pet-250ml-phi34-01.jpg",
    "mediaStatus": "verified"
  },
  {
    "id": "19",
    "name": "Chai HDPE 500ml (Vuông) Φ39",
    "slug": "chai-hdpe-500ml-vuong-phi-39",
    "sku": "",
    "material": "HDPE",
    "capacity": "500ml",
    "neck": "Φ39",
    "weight": undefined,
    "height": undefined,
    "diameter": undefined,
    "color": "Trắng đục",
    "shape": "Vuông",
    "categoryId": "hdpe",
    "applications": [
      "Hóa chất",
      "Nông dược"
    ],
    "familyId": "hdpe-square",
    "relatedProductIds": ["9", "11"],
    "customizable": true,
    "image": "",
    "mediaStatus": "illustrative"
  },
  {
    "id": "20",
    "name": "Can Nhựa HDPE 5 Lít",
    "slug": "can-nhua-hdpe-5l",
    "sku": "",
    "material": "HDPE",
    "capacity": "5L",
    "neck": "Φ58",
    "weight": undefined,
    "height": undefined,
    "diameter": undefined,
    "color": "Trắng đục",
    "shape": "Hình chữ nhật",
    "categoryId": "can-nhua",
    "applications": [
      "Hóa chất",
      "Nông dược",
      "Mỹ phẩm"
    ],
    "familyId": "jerry-can",
    "relatedProductIds": ["11", "30"],
    "customizable": true,
    "image": "/images/products/can-nhua/can-hdpe-5l-phi58-01.png",
    "mediaStatus": "verified"
  },
  {
    "id": "21",
    "name": "Hũ PET 500ml Φ89",
    "slug": "hu-pet-500ml-phi-89",
    "sku": "",
    "material": "PET",
    "capacity": "500ml",
    "neck": "Φ89",
    "weight": undefined,
    "height": undefined,
    "diameter": undefined,
    "color": "Trong suốt",
    "shape": "Tròn",
    "categoryId": "hu-nhua",
    "applications": [
      "Thực phẩm sấy khô"
    ],
    "familyId": "pet-jar",
    "relatedProductIds": ["12", "22", "34"],
    "customizable": true,
    "image": "",
    "mediaStatus": "illustrative"
  },
  {
    "id": "22",
    "name": "Hũ PET 1000ml Φ89",
    "slug": "hu-pet-1000ml-phi-89",
    "sku": "",
    "material": "PET",
    "capacity": "1000ml",
    "neck": "Φ89",
    "weight": undefined,
    "height": undefined,
    "diameter": undefined,
    "color": "Trong suốt",
    "shape": "Tròn",
    "categoryId": "hu-nhua",
    "applications": [
      "Thực phẩm sấy khô"
    ],
    "familyId": "pet-jar",
    "relatedProductIds": ["21", "25", "34"],
    "customizable": true,
    "image": "",
    "mediaStatus": "illustrative"
  },
  {
    "id": "23",
    "name": "Nắp nhôm Φ89",
    "slug": "nap-nhom-phi-89",
    "sku": "",
    "material": "Aluminium",
    "neck": "Φ89",
    "color": "Bạc/Vàng/Đen",
    "categoryId": "nap-nhua",
    "applications": [
      "Hũ thực phẩm"
    ],
    "familyId": "caps",
    "relatedProductIds": ["21", "22"],
    "customizable": true,
    "image": "",
    "mediaStatus": "illustrative"
  },
  {
    "id": "24",
    "name": "Nắp nhựa PP Φ89",
    "slug": "nap-nhua-pp-phi-89",
    "sku": "",
    "material": "PP",
    "neck": "Φ89",
    "color": "Nhiều màu",
    "categoryId": "nap-nhua",
    "applications": [
      "Hũ thực phẩm"
    ],
    "familyId": "caps",
    "relatedProductIds": ["21", "22", "23"],
    "customizable": true,
    "image": "https://bizweb.dktcdn.net/100/397/052/products/img-7033-jpg.png",
    "mediaStatus": "verified",
    "sourcePageUrl": "https://nguyenthaibinh.com.vn/nap-hu"
  },
  {
    "id": "25",
    "name": "Hũ PET 1500ml Φ89",
    "slug": "hu-pet-1500ml-phi-89",
    "sku": "",
    "material": "PET",
    "capacity": "1500ml",
    "neck": "Φ89",
    "weight": undefined,
    "height": undefined,
    "diameter": undefined,
    "color": "Trong suốt",
    "shape": "Tròn",
    "categoryId": "hu-nhua",
    "applications": [
      "Thực phẩm sấy khô"
    ],
    "familyId": "pet-jar",
    "relatedProductIds": ["22", "34"],
    "customizable": true,
    "image": "",
    "mediaStatus": "illustrative"
  },
  {
    "id": "26",
    "name": "Can nhựa HDPE 1L",
    "slug": "can-nhua-hdpe-1l",
    "sku": "",
    "material": "HDPE",
    "capacity": "1L",
    "neck": "Φ32",
    "weight": undefined,
    "height": undefined,
    "diameter": undefined,
    "color": "Trắng đục",
    "shape": "Hình chữ nhật",
    "categoryId": "can-nhua",
    "applications": [
      "Hóa chất"
    ],
    "familyId": "jerry-can",
    "relatedProductIds": ["11", "27"],
    "customizable": true,
    "image": "",
    "mediaStatus": "illustrative"
  },
  {
    "id": "27",
    "name": "Can nhựa HDPE 2L",
    "slug": "can-nhua-hdpe-2l",
    "sku": "",
    "material": "HDPE",
    "capacity": "2L",
    "neck": "Φ38",
    "weight": undefined,
    "height": undefined,
    "diameter": undefined,
    "color": "Trắng đục",
    "shape": "Hình chữ nhật",
    "categoryId": "can-nhua",
    "applications": [
      "Hóa chất"
    ],
    "familyId": "jerry-can",
    "relatedProductIds": ["26", "28"],
    "customizable": true,
    "image": "",
    "mediaStatus": "illustrative"
  },
  {
    "id": "28",
    "name": "Can nhựa HDPE 3L",
    "slug": "can-nhua-hdpe-3l",
    "sku": "",
    "material": "HDPE",
    "capacity": "3L",
    "neck": "Φ42",
    "weight": undefined,
    "height": undefined,
    "diameter": undefined,
    "color": "Trắng đục",
    "shape": "Hình chữ nhật",
    "categoryId": "can-nhua",
    "applications": [
      "Hóa chất"
    ],
    "familyId": "jerry-can",
    "relatedProductIds": ["27", "29"],
    "customizable": true,
    "image": "",
    "mediaStatus": "illustrative"
  },
  {
    "id": "29",
    "name": "Can nhựa HDPE 4L",
    "slug": "can-nhua-hdpe-4l",
    "sku": "",
    "material": "HDPE",
    "capacity": "4L",
    "neck": "Φ42",
    "weight": undefined,
    "height": undefined,
    "diameter": undefined,
    "color": "Trắng đục",
    "shape": "Hình chữ nhật",
    "categoryId": "can-nhua",
    "applications": [
      "Hóa chất"
    ],
    "familyId": "jerry-can",
    "relatedProductIds": ["28", "20"],
    "customizable": true,
    "image": "",
    "mediaStatus": "illustrative"
  },
  {
    "id": "30",
    "name": "Can nhựa HDPE 10L",
    "slug": "can-nhua-hdpe-10l",
    "sku": "",
    "material": "HDPE",
    "capacity": "10L",
    "neck": "Φ45",
    "weight": undefined,
    "height": undefined,
    "diameter": undefined,
    "color": "Trắng đục",
    "shape": "Hình chữ nhật",
    "categoryId": "can-nhua",
    "applications": [
      "Hóa chất công nghiệp"
    ],
    "familyId": "jerry-can",
    "relatedProductIds": ["20"],
    "customizable": true,
    "image": "",
    "mediaStatus": "illustrative"
  },
  {
    "id": "31",
    "name": "Nắp bảo vệ Φ28 (Child Resistant)",
    "slug": "nap-bao-ve-phi-28-child-resistant",
    "sku": "",
    "material": "PP",
    "neck": "Φ28",
    "color": "Trắng/Đỏ",
    "categoryId": "nap-nhua",
    "applications": [
      "Dược phẩm"
    ],
    "familyId": "caps",
    "relatedProductIds": ["13", "14"],
    "customizable": true,
    "image": "",
    "mediaStatus": "illustrative"
  },
  {
    "id": "32",
    "name": "Nắp sương mù Φ24",
    "slug": "nap-suong-mu-phi-24",
    "sku": "",
    "material": "PP",
    "neck": "Φ24",
    "color": "Nhiều màu",
    "categoryId": "nap-nhua",
    "applications": [
      "Mỹ phẩm"
    ],
    "familyId": "caps",
    "relatedProductIds": ["33"],
    "customizable": true,
    "image": "",
    "mediaStatus": "illustrative"
  },
  {
    "id": "33",
    "name": "Vòi nhấn serum Φ24",
    "slug": "voi-nhan-serum-phi-24",
    "sku": "",
    "material": "PP",
    "neck": "Φ24",
    "color": "Vàng/Bạc/Trắng",
    "categoryId": "nap-nhua",
    "applications": [
      "Serum"
    ],
    "familyId": "caps",
    "relatedProductIds": ["32"],
    "customizable": true,
    "image": "",
    "mediaStatus": "illustrative"
  },
  {
    "id": "34",
    "name": "Seal nhôm tự dính Φ89",
    "slug": "seal-nhom-tu-dinh-phi-89",
    "sku": "",
    "material": "Aluminium",
    "neck": "Φ89",
    "categoryId": "nap-nhua",
    "applications": [
      "Niêm phong hũ"
    ],
    "familyId": "seals",
    "relatedProductIds": ["21", "22", "25"],
    "customizable": true,
    "image": "",
    "mediaStatus": "illustrative"
  },
  {
    "id": "35",
    "name": "Chai PET 100ml Φ24",
    "slug": "chai-pet-100ml-phi-24",
    "sku": "",
    "material": "PET",
    "capacity": "100ml",
    "neck": "Φ24",
    "weight": undefined,
    "height": undefined,
    "diameter": undefined,
    "color": "Trong suốt",
    "shape": "Tròn",
    "categoryId": "pet",
    "applications": [
      "Mỹ phẩm"
    ],
    "familyId": "pet-round",
    "relatedProductIds": ["32", "33"],
    "customizable": true,
    "image": "",
    "mediaStatus": "illustrative"
  },
  {
    "id": "36",
    "name": "Phôi PET Φ28 (21g)",
    "slug": "phoi-pet-phi-28-21g",
    "sku": "",
    "material": "PET",
    "neck": "Φ28",
    "weight": "21g",
    "categoryId": "phoi-pet",
    "applications": [
      "Sản xuất chai PET"
    ],
    "familyId": "preforms",
    "relatedProductIds": ["1", "18"],
    "customizable": true,
    "image": "https://bizweb.dktcdn.net/thumb/large/100/397/052/products/u1a3368-2.jpg",
    "mediaStatus": "verified",
    "sourcePageUrl": "https://nguyenthaibinh.com.vn/phoi-pet"
  },
  {
    "id": "37",
    "name": "Phôi PET Φ30 (28g)",
    "slug": "phoi-pet-phi-30-28g",
    "sku": "",
    "material": "PET",
    "neck": "Φ30",
    "weight": "28g",
    "categoryId": "phoi-pet",
    "applications": [
      "Sản xuất chai nước khoáng"
    ],
    "familyId": "preforms",
    "relatedProductIds": ["4"],
    "customizable": true,
    "image": "",
    "mediaStatus": "illustrative"
  },
  {
    "id": "38",
    "name": "Phôi PET Φ89 (55g)",
    "slug": "phoi-pet-phi-89-55g",
    "sku": "",
    "material": "PET",
    "neck": "Φ89",
    "weight": "55g",
    "categoryId": "phoi-pet",
    "applications": [
      "Sản xuất hũ PET"
    ],
    "familyId": "preforms",
    "relatedProductIds": ["22"],
    "customizable": true,
    "image": "https://bizweb.dktcdn.net/thumb/large/100/397/052/products/u1a3370-2.jpg",
    "mediaStatus": "verified",
    "sourcePageUrl": "https://nguyenthaibinh.com.vn/phoi-pet-60-gram"
  },
  {
    "id": "39",
    "name": "Chai HDPE 5L (Dẹp) Φ42",
    "slug": "chai-hdpe-5l-dep-phi-42",
    "sku": "",
    "material": "HDPE",
    "capacity": "5L",
    "neck": "Φ42",
    "weight": undefined,
    "categoryId": "hdpe",
    "applications": [
      "Nước rửa chén"
    ],
    "familyId": "hdpe-square",
    "relatedProductIds": ["20"],
    "customizable": true,
    "image": "https://bizweb.dktcdn.net/thumb/large/100/397/052/products/img-0259-webp-jpeg.jpg",
    "mediaStatus": "verified",
    "sourcePageUrl": "https://nguyenthaibinh.com.vn/can-5000ml-đường-kính-miệng-44mm"
  },
  {
    "id": "40",
    "name": "Can nhựa HDPE 20L",
    "slug": "can-nhua-hdpe-20l",
    "sku": "",
    "material": "HDPE",
    "capacity": "20L",
    "neck": "Φ50",
    "weight": undefined,
    "categoryId": "can-nhua",
    "applications": [
      "Hóa chất công nghiệp"
    ],
    "familyId": "jerry-can",
    "relatedProductIds": ["30"],
    "customizable": true,
    "image": "",
    "mediaStatus": "illustrative"
  }
];
