export interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

export const navigationData: NavItem[] = [
  { label: 'Trang chủ', href: '/' },
  { 
    label: 'Sản phẩm', 
    href: '/san-pham',
    children: [
      { label: 'Chai PET', href: '/san-pham/chai-pet' },
      { label: 'Chai HDPE', href: '/san-pham/chai-hdpe' },
      { label: 'Hũ nhựa', href: '/san-pham/hu-nhua' },
      { label: 'Can nhựa', href: '/san-pham/can-nhua' },
      { label: 'Nắp nhựa', href: '/san-pham/nap-nhua' },
      { label: 'Phôi PET', href: '/san-pham/phoi-pet' },
    ]
  },
  { label: 'Năng lực công ty', href: '/nang-luc-nha-may' },
  { label: 'Giải pháp', href: '/giai-phap' },
  { label: 'Đối tác', href: '/doi-tac' },
  { label: 'Bài viết', href: '/tin-tuc' },
  { label: 'Liên hệ', href: '/lien-he' },
];
