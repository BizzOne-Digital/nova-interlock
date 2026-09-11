import SEO from '../components/common/SEO';
import Hero from '../components/home/Hero';
import TrustStrip from '../components/home/TrustStrip';
import ServicesSection from '../components/home/ServicesSection';
import AboutSection from '../components/home/AboutSection';
import ProjectsShowcase from '../components/home/ProjectsShowcase';
import BeforeAfterSection from '../components/home/BeforeAfterSection';
import WhyChooseNova from '../components/home/WhyChooseNova';
import ProcessSection from '../components/home/ProcessSection';
import ProductsTeaser from '../components/home/ProductsTeaser';
import DiscountCTA from '../components/home/DiscountCTA';
import TestimonialsSection from '../components/home/TestimonialsSection';
import ServiceAreaSection from '../components/home/ServiceAreaSection';
import StatisticsStrip from '../components/home/StatisticsStrip';
import FinalCTA from '../components/home/FinalCTA';

const Home = () => (
  <>
    <SEO
      title="Driveway Clearance Sale | Nova Hardscapes Ottawa"
      description="Clearance pricing on interlock driveways and driveway extensions in Ottawa. Nova Hardscapes also offers patios, walkways, retaining walls and landscaping."
    />
    <Hero />
    <TrustStrip />
    <ServicesSection />
    <AboutSection />
    <ProjectsShowcase />
    <BeforeAfterSection />
    <WhyChooseNova />
    <ProcessSection />
    <ProductsTeaser />
    <DiscountCTA />
    <TestimonialsSection />
    <ServiceAreaSection />
    <StatisticsStrip />
    <FinalCTA />
  </>
);

export default Home;
