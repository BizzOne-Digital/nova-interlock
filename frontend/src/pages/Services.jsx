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
      title="Driveway Clearance Sale | Nova Hardscapes Ottawa"
      description="Clearance pricing on interlock driveways and driveway extensions in Ottawa, plus patios, walkways, retaining walls and landscape design."
    />
    <section className="bg-nova-bg pt-32 pb-20 lg:pt-40 lg:pb-28">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <SectionLabel>Driveway Clearance Sale</SectionLabel>
          <h1 className="font-heading text-4xl font-bold text-nova-text sm:text-5xl">
            Interlock Driveways &amp; Driveway Extensions
          </h1>
          <p className="mt-4 text-nova-text-secondary leading-relaxed">
            Clearance pricing on driveways and driveway extensions this season. Our Ottawa team also
            delivers premium workmanship across patios, walkways, retaining walls and landscape design.
            Contact us for a custom quote.
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
