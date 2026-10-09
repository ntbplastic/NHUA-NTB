const fs = require('fs');
const path = require('path');

const mockDir = path.join(__dirname, 'public/mock');

if (!fs.existsSync(mockDir)) {
  fs.mkdirSync(mockDir, { recursive: true });
}

function createSVG(filename, text, bgColor = '#f1f5f9', textColor = '#64748b') {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
    <rect width="100%" height="100%" fill="${bgColor}"/>
    <text x="50%" y="50%" font-family="sans-serif" font-size="32" font-weight="bold" fill="${textColor}" text-anchor="middle" dominant-baseline="middle">${text}</text>
  </svg>`;
  fs.writeFileSync(path.join(mockDir, filename), svg);
}

const assets = [
  { name: 'pet-bottle.svg', text: 'Chai PET' },
  { name: 'hdpe-bottle.svg', text: 'Chai HDPE' },
  { name: 'jar.svg', text: 'Hũ Nhựa' },
  { name: 'jerry-can.svg', text: 'Can Nhựa' },
  { name: 'cap.svg', text: 'Nắp Nhựa' },
  { name: 'preform.svg', text: 'Phôi PET' },
  { name: 'food-pkg.svg', text: 'Thực Phẩm & Đồ Uống', bg: '#ecfdf5' },
  { name: 'home-pkg.svg', text: 'Gia Dụng & Hóa Chất', bg: '#f0fdf4' },
  { name: 'agri-pkg.svg', text: 'Nông Nghiệp / BVTV', bg: '#f8fafc' },
  { name: 'cosmetic-pkg.svg', text: 'Mỹ Phẩm & CSSK', bg: '#fdf2f8' },
  { name: 'factory.svg', text: 'Nhà Máy Sản Xuất' },
  { name: 'production.svg', text: 'Dây Chuyền Sản Xuất' },
  { name: 'mold.svg', text: 'Khuôn Mẫu' },
  { name: 'machining.svg', text: 'Gia Công Cơ Khí' },
  { name: 'qc.svg', text: 'Kiểm Soát Chất Lượng' },
  { name: 'hero-visual.svg', text: 'Bao Bì Nhựa B2B', bg: '#064e3b', textCol: '#ffffff' },
  { name: 'partner-1.svg', text: 'PARTNER 01' },
  { name: 'partner-2.svg', text: 'PARTNER 02' },
  { name: 'partner-3.svg', text: 'PARTNER 03' },
  { name: 'partner-4.svg', text: 'PARTNER 04' },
  { name: 'partner-5.svg', text: 'PARTNER 05' },
  { name: 'partner-6.svg', text: 'PARTNER 06' },
  { name: 'partner-7.svg', text: 'PARTNER 07' },
  { name: 'partner-8.svg', text: 'PARTNER 08' },
];

assets.forEach(a => createSVG(a.name, a.text, a.bg, a.textCol));
console.log('Mock SVGs created');
