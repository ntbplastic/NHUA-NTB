"use client";

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { DataProvider } from '@/lib/data/Provider';
import { useData } from '@/lib/data/useData';
import { mockProducts } from '@/lib/mock/products';
import { mockCategories } from '@/lib/mock/categories';
import { ProductCard } from '@/components/ui/ProductCard';
import { Button } from '@/components/ui/Button';

import { motion } from 'motion/react';

export default function FeaturedProducts() {
  const { data: products }: { data: any[] } = useData(() => DataProvider.getProducts(), mockProducts);
  const { data: categories }: { data: any[] } = useData(() => DataProvider.getCategories(), mockCategories);
  
  // Limit to 4 products for the homepage
  const displayProducts = products.slice(0, 4);

  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="py-6 md:py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8">
        
        <motion.div 
          className="flex flex-col md:flex-row md:items-end justify-between mb-4 md:mb-10 px-1.5 sm:px-0"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="max-w-2xl">
            <h2 className="text-[20px] md:text-[32px] font-bold text-ntb-text mb-1.5 md:mb-3 tracking-tight">Sản phẩm nổi bật</h2>
            <p className="text-ntb-muted text-[13px] md:text-[15px]">
              Khám phá các mẫu bao bì nhựa tiêu biểu, cùng các thông số kỹ thuật đa dạng.
            </p>
          </div>
        </motion.div>

        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4 lg:gap-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          {displayProducts.map((product: any) => {
            const category = categories.find((c: any) => c.id === product.categoryId);
            const href = category ? `/san-pham/${category.slug}/${product.slug}` : `/san-pham/${product.slug}`;
            return (
              <motion.div key={product.id} variants={itemVariants}>
                <ProductCard product={{...product, href}} />
              </motion.div>
            );
          })}
        </motion.div>
        
        <motion.div 
          className="mt-6 md:mt-12 flex justify-center"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.2 }}
        >
          <Button asChild variant="secondary" color="blue" className="h-[40px] md:h-[42px] px-8 text-[13px] md:text-[14px] rounded-pill font-bold group active:scale-95 transition-transform">
            <Link href="/san-pham">
              Xem tất cả sản phẩm
              <ArrowRight className="ml-2 w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
