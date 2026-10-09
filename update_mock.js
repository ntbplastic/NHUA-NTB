const fs = require('fs');
const path = require('path');

const productsFile = path.join(__dirname, 'src/lib/mock/products.ts');
let productsContent = fs.readFileSync(productsFile, 'utf8');

// We need to redefine the interface
const newInterface = `export interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string;
  material: string;
  capacity: string;
  neck: string;
  weight?: string;
  categoryId: string;
  image: string;
  familyId?: string;
  compatibleProductIds?: string[];
  relatedProductIds?: string[];
  applications?: string[];
  customizable?: boolean;
  relatedArticleIds?: string[];
}`;

productsContent = productsContent.replace(/export interface Product \{[\s\S]*?\}/, newInterface);

// Add applications and families to all products
productsContent = productsContent.replace(/"categoryId": "([^"]+)",/g, (match, categoryId) => {
  let applications = "['Tương ớt', 'Nước tương', 'Dầu ăn']";
  let familyId = '"family-1"';
  let compatibleProductIds = "['cap-1', 'preform-1']";
  
  if (categoryId === 'hdpe') {
    applications = "['Nước giặt', 'Hóa chất', 'BVTV']";
    familyId = '"family-2"';
  } else if (categoryId === 'hu-nhua') {
    applications = "['Mỹ phẩm', 'Thực phẩm sấy']";
    familyId = '"family-3"';
  }
  
  return `"categoryId": "${categoryId}",
    "applications": ${applications},
    "familyId": ${familyId},
    "compatibleProductIds": ${compatibleProductIds},
    "relatedProductIds": ["1", "2"],
    "customizable": true,
    "relatedArticleIds": ["article-1", "article-2"],`;
});

// Fix some "Mẫu x" names to be more professional
productsContent = productsContent.replace(/"name": "Chai PET 250ml - Mẫu 1"/, '"name": "Chai PET tròn 250ml Φ28"');
productsContent = productsContent.replace(/"name": "Chai PET 500ml - Mẫu 2"/, '"name": "Chai PET vuông 500ml Φ28"');
productsContent = productsContent.replace(/"name": "Chai PET 1000ml - Mẫu 3"/, '"name": "Chai PET 1000ml tay cầm Φ32"');
productsContent = productsContent.replace(/"name": "Chai HDPE 500ml - Mẫu 4"/, '"name": "Chai HDPE 500ml chống hóa chất"');

fs.writeFileSync(productsFile, productsContent);

// Articles
const articlesFile = path.join(__dirname, 'src/lib/mock/articles.ts');
const articlesContent = `export interface Article {
  id: string;
  title: string;
  slug: string;
  summary: string;
  date: string;
  image: string;
  relatedProductIds?: string[];
}

export const mockArticles: Article[] = [
  {
    id: "article-1",
    title: "PET hay HDPE? Lựa chọn vật liệu phù hợp cho bao bì",
    slug: "pet-vs-hdpe-lua-chon-vat-lieu",
    summary: "So sánh đặc tính kỹ thuật, độ bền hóa học và ứng dụng thực tế giữa nhựa PET và HDPE trong sản xuất bao bì công nghiệp.",
    date: "2024-03-15",
    image: "/mock/machine-1.svg",
    relatedProductIds: ["1", "2"]
  },
  {
    id: "article-2",
    title: "Cách chọn cổ chai Φ28 và Φ30 cho ngành thực phẩm",
    slug: "cach-chon-co-chai-phi28-phi30",
    summary: "Hướng dẫn kỹ thuật chọn kích thước cổ chai, bước ren phù hợp với từng loại nắp đậy, nắp bơm trong ngành F&B.",
    date: "2024-03-10",
    image: "/mock/machine-2.svg",
    relatedProductIds: ["1", "3"]
  },
  {
    id: "article-3",
    title: "Bao bì tương ớt: Yêu cầu về độ trong và chống rò rỉ",
    slug: "bao-bi-tuong-ot-yeu-cau-ky-thuat",
    summary: "Các tiêu chuẩn sản xuất chai lọ đựng tương ớt, nước chấm để đảm bảo an toàn vệ sinh thực phẩm và kéo dài thời hạn bảo quản.",
    date: "2024-03-05",
    image: "/mock/factory-3.svg",
    relatedProductIds: ["1"]
  },
  {
    id: "article-4",
    title: "Thiết kế khuôn chai nhựa cần lưu ý những gì?",
    slug: "thiet-ke-khuon-chai-nhua-b2b",
    summary: "Quy trình thiết kế, chế tạo khuôn cơ khí chính xác cho sản xuất phôi, thổi chai nhựa tối ưu chi phí vận hành.",
    date: "2024-03-01",
    image: "/mock/factory-1.svg"
  }
];
`;
fs.writeFileSync(articlesFile, articlesContent);

// Add missing mock products for accessories (caps, preforms)
productsContent = fs.readFileSync(productsFile, 'utf8');
const newProducts = `
  ,
  {
    "id": "cap-1",
    "name": "Nắp nhựa Φ28 vặn trong",
    "slug": "nap-nhua-phi28-van-trong",
    "sku": "C-28-1",
    "material": "PP",
    "capacity": "-",
    "neck": "Φ28",
    "weight": "2g",
    "categoryId": "nap-nhua",
    "image": "/mock/cap.svg",
    "applications": ["Tương ớt", "Nước chấm", "Nước uống"],
    "customizable": true
  },
  {
    "id": "preform-1",
    "name": "Phôi PET 15g Φ28",
    "slug": "phoi-pet-15g-phi28",
    "sku": "PF-15-28",
    "material": "PET",
    "capacity": "-",
    "neck": "Φ28",
    "weight": "15g",
    "categoryId": "phoi-pet",
    "image": "/mock/preform.svg",
    "applications": ["Thực phẩm", "Nước uống"],
    "customizable": true
  }
];`;
productsContent = productsContent.replace(/];$/, newProducts);
fs.writeFileSync(productsFile, productsContent);

console.log("Mock data updated successfully.");
