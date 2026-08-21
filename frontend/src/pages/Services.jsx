import { motion } from 'framer-motion';
import SEO from '../components/common/SEO';
import Container from '../components/common/Container';
import SectionLabel from '../components/common/SectionLabel';
import ServicesGrid from '../components/services/ServicesGrid';
import DiscountCTA from '../components/home/DiscountCTA';
import FinalCTA from '../components/home/FinalCTA';

const Services = () => (
  <>
    <SEO
      title="Interlock & Landscaping Services | Nova Hardscapes Ottawa"
      description="Explore Nova Hardscapes' full range of interlock driveways, patios, walkways, steps, retaining walls, excavation and landscape design services in Ottawa."
    />
    <section className="bg-nova-bg pt-32 pb-20 lg:pt-40 lg:pb-28">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <SectionLabel>Our Services</SectionLabel>
          <h1 className="font-heading text-4xl font-bold text-nova-text sm:text-5xl">
            Complete Hardscaping Solutions
          </h1>
          <p className="mt-4 text-nova-text-secondary leading-relaxed">
            From driveways to full property landscape design, our Ottawa team delivers premium
            workmanship for every outdoor transformation. Contact us for a custom quote.
          </p>
        </motion.div>

        <div className="mt-14">
          <ServicesGrid />
        </div>
      </Container>
    </section>

    <DiscountCTA />
    <FinalCTA />
  </>
);

export default Services;
