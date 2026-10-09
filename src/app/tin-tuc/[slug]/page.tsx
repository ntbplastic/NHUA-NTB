"use client";

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, User, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';
import { DataProvider } from '@/lib/data/Provider';
import { useData } from '@/lib/data/useData';
import { mockArticles } from '@/lib/mock/articles';
import { mockProducts } from '@/lib/mock/products';
import { mockCategories } from '@/lib/mock/categories';
import { ProductCard } from '@/components/ui/ProductCard';
import { getProductUrl } from '@/lib/utils';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

export default function ArticleDetailPage() {
  const { slug } = useParams();
  
  const { data: articles } = useData(() => DataProvider.getArticles(), mockArticles);
  const { data: products } = useData(() => DataProvider.getProducts(), mockProducts);
  const { data: categories } = useData(() => DataProvider.getCategories(), mockCategories);

  const article = articles.find((a: any) => a.slug === slug);
  
  if (!article) return <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">Đang tải...</div>;

  const relatedProducts = article.relatedProductIds 
    ? products.filter((p: any) => article.relatedProductIds.includes(p.id))
    : products.slice(0, 4); // Fallback

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20">
      
      {/* Article Header */}
      <div className="bg-white border-b border-[#E2E8F0]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-12">
          <Breadcrumb 
            items={[
              { label: "Trang chủ", href: "/" },
              { label: "Tin tức & Kiến thức", href: "/tin-tuc" },
              { label: article.title }
            ]}
            className="mb-6"
          />
          
          <h1 className="text-[28px] md:text-[40px] font-bold text-[#0F172A] leading-[1.2] mb-6">
            {article.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 text-[#64748B] text-[14px]">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>{article.date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <User className="w-4 h-4" />
              <span>Kỹ thuật viên NTB</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        
        {/* Article Body */}
        <article className="bg-white rounded-[24px] border border-[#E2E8F0] overflow-hidden mb-12 shadow-sm">
          {article.image && (
            <div className="w-full aspect-[21/9] bg-slate-100 relative">
              <ImageWithFallback src={article.image} alt={article.title} className="w-full h-full object-cover" />
              {/* ILLUSTRATIVE LABEL */}
              {(article as any).mediaStatus === "illustrative" && (
                <div className="absolute top-4 right-4 bg-ntb-text/5 backdrop-blur-[2px] text-ntb-text/40 text-[9px] px-2 py-0.5 rounded-[2px] font-bold uppercase tracking-tight border border-ntb-text/5 pointer-events-none">
                  Ảnh minh họa
                </div>
              )}
            </div>
          )}
          <div className="p-6 md:p-10 prose prose-slate max-w-none prose-headings:text-[#0F172A] prose-a:text-[#1677FF]">
            <p className="lead text-[18px] text-[#334155] font-medium leading-relaxed mb-8">
              {article.summary}
            </p>
            
            <h2>Đặc tính kỹ thuật quan trọng</h2>
            <p>
              Việc lựa chọn bao bì không chỉ phụ thuộc vào tính thẩm mỹ mà còn phải phù hợp với các thông số kỹ thuật của từng ngành công nghiệp. Nhiệt độ chiết rót, độ pH của sản phẩm bên trong, và điều kiện lưu kho đóng vai trò quyết định trong việc chọn vật liệu (PET, HDPE, PP).
            </p>
            
            <h3>Lưu ý khi chọn cổ chai (Neck Finish)</h3>
            <p>
              Đường kính cổ chai (VD: Φ28, Φ30, Φ42) quyết định tính tương thích với nắp đậy (nắp vặn, nắp bơm, màng seal). Chân ren phải được gia công chính xác để đảm bảo độ kín khí 100%, đặc biệt đối với ngành hóa chất và thực phẩm lỏng.
            </p>
            
            <h3>Thiết kế chịu lực</h3>
            <p>
              Đối với các can nhựa dung tích lớn (2L, 5L, 20L), thiết kế gân chịu lực và độ đồng đều của vách can là yếu tố then chốt để chống biến dạng khi xếp chồng trong kho và trong quá trình vận chuyển.
            </p>
          </div>
        </article>

        {/* CTA */}
        <div className="bg-[#0F172A] rounded-[24px] p-8 md:p-12 text-center mb-16 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-400 via-transparent to-transparent"></div>
          <div className="relative z-10">
            <h3 className="text-2xl font-bold text-white mb-4">Cần tư vấn kỹ thuật chuyên sâu?</h3>
            <p className="text-slate-300 mb-8 max-w-lg mx-auto">
              Đội ngũ kỹ sư của NTB sẵn sàng hỗ trợ bạn lựa chọn vật liệu, dung tích và thiết kế khuôn phù hợp nhất với dây chuyền sản xuất của bạn.
            </p>
            <Link href="/lien-he" className="inline-flex h-[48px] px-8 bg-[#1677FF] hover:bg-[#0F5ED7] text-white font-bold rounded-full items-center justify-center transition-colors">
              Yêu cầu tư vấn bao bì
            </Link>
          </div>
        </div>

        {/* Related Products Loop */}
        {relatedProducts.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[24px] font-bold text-[#0F172A]">Sản phẩm phù hợp được nhắc đến</h2>
              <Link href="/san-pham" className="text-[14px] font-semibold text-[#1677FF] hover:underline">
                Tất cả sản phẩm
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
              {relatedProducts.map((p: any) => {
                const pCategory = categories.find((c: any) => c.id === p.categoryId);
                const href = pCategory ? getProductUrl(p.slug, pCategory.slug) : `/san-pham/${p.slug}`;
                return <ProductCard key={p.id} product={{...p, href}} />
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
