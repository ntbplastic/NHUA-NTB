#!/bin/bash
mkdir -p src/app/san-pham/[slug]
mkdir -p src/app/giai-phap/[slug]
mkdir -p src/app/nang-luc-nha-may
mkdir -p src/app/nang-luc/khuon-co-khi-chinh-xac
mkdir -p src/app/quy-trinh
mkdir -p src/app/doi-tac
mkdir -p src/app/tin-tuc
mkdir -p src/app/lien-he
mkdir -p src/app/rfq
mkdir -p src/app/da-luu
mkdir -p src/app/compare
mkdir -p src/app/dang-nhap
mkdir -p src/app/admin-preview

mv src/pages/HomePage.tsx src/app/page.tsx
mv src/pages/san-pham/ProductListPage.tsx src/app/san-pham/page.tsx
mv src/pages/san-pham/ProductDetailPage.tsx src/app/san-pham/[slug]/page.tsx
mv src/pages/giai-phap/SolutionsPage.tsx src/app/giai-phap/page.tsx
mv src/pages/giai-phap/SolutionDetailPage.tsx src/app/giai-phap/[slug]/page.tsx
mv src/pages/nang-luc/NangLucPage.tsx src/app/nang-luc-nha-may/page.tsx
mv src/pages/nang-luc/KhuonPage.tsx src/app/nang-luc/khuon-co-khi-chinh-xac/page.tsx
mv src/pages/QuyTrinhPage.tsx src/app/quy-trinh/page.tsx
mv src/pages/DoiTacPage.tsx src/app/doi-tac/page.tsx
mv src/pages/TinTucPage.tsx src/app/tin-tuc/page.tsx
mv src/pages/LienHePage.tsx src/app/lien-he/page.tsx
mv src/pages/RfqPage.tsx src/app/rfq/page.tsx
mv src/pages/utility/DaLuuPage.tsx src/app/da-luu/page.tsx
mv src/pages/utility/ComparePage.tsx src/app/compare/page.tsx
mv src/pages/auth/DangNhapPage.tsx src/app/dang-nhap/page.tsx
mv src/pages/admin/AdminPreview.tsx src/app/admin-preview/page.tsx

rm -rf src/pages
