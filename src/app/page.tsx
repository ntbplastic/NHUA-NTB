import Hero from '../components/home/Hero';
import ProductCategories from '../components/home/ProductCategories';
import FeaturedProducts from '../components/home/FeaturedProducts';
import IndustrySolutions from '../components/home/IndustrySolutions';
import PrecisionEngineering from '../components/home/PrecisionEngineering';
import RepresentativeSamples from '../components/home/RepresentativeSamples';
import FactoryCapability from '../components/home/FactoryCapability';
import ProcessSection from '../components/home/ProcessSection';
import ArticleSection from '../components/home/ArticleSection';
import PartnerSection from '../components/home/PartnerSection';
import FinalCTA from '../components/home/FinalCTA';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <ProductCategories />
      <IndustrySolutions />
      <FeaturedProducts />
      <PrecisionEngineering />
      <RepresentativeSamples />
      <FactoryCapability />
      <ProcessSection />
      <ArticleSection />
      <PartnerSection />
      <FinalCTA />
    </div>
  );
}
