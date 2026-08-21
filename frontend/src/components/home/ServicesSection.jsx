import { motion } from 'framer-motion';
import Container from '../common/Container';
import SectionLabel from '../common/SectionLabel';
import ServicesGrid from '../services/ServicesGrid';

const ServicesSection = () => (
  <section className="bg-nova-bg py-20 lg:py-28">
    <Container>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-2xl text-center"
      >
        <SectionLabel>Our Services</SectionLabel>
        <h2 className="font-heading text-3xl font-bold text-nova-text sm:text-4xl">
          Complete Hardscaping Solutions
        </h2>
        <div className="mx-auto mt-4 h-px w-16 bg-nova-gold" />
      </motion.div>

      <div className="mt-12">
        <ServicesGrid limit={8} />
      </div>
    </Container>
  </section>
);

export default ServicesSection;
