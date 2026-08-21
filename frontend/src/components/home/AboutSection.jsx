import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Container from '../common/Container';
import SectionLabel from '../common/SectionLabel';

const aboutImage =
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1400&auto=format&fit=crop';

const AboutSection = () => (
  <section className="bg-nova-bg-secondary py-20 lg:py-28">
    <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
      <motion.div
        initial={{ opacity: 0, x: -24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="overflow-hidden rounded-2xl gold-border"
      >
        <img src={aboutImage} alt="Completed interlock hardscaping project in Ottawa" className="h-full w-full object-cover" loading="lazy" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <SectionLabel align="left">About Nova Hardscapes</SectionLabel>
        <h2 className="font-heading text-3xl font-bold text-nova-text sm:text-4xl">
          Built Right From the Ground Up
        </h2>
        <p className="mt-5 text-nova-text-secondary leading-relaxed">
          Nova Hardscapes specializes in high-quality interlock and landscaping throughout Ottawa. We
          focus on proper preparation, precision installation, reliable workmanship and long-lasting
          outdoor spaces.
        </p>
        <p className="mt-4 text-nova-text-secondary leading-relaxed">
          Whether you're upgrading a driveway, creating a backyard patio or transforming your entire
          property, our team approaches every project with attention to detail from excavation to the
          final stone.
        </p>
        <Link to="/about" className="btn-outline focus-ring mt-7 inline-flex">
          Learn About Nova
          <ArrowRight size={16} />
        </Link>
      </motion.div>
    </Container>
  </section>
);

export default AboutSection;
