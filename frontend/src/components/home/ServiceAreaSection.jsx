import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import Container from '../common/Container';
import SectionLabel from '../common/SectionLabel';
import { SERVICE_AREAS } from '../../utils/constants';

const ServiceAreaSection = () => (
  <section className="bg-nova-bg-secondary py-20 lg:py-28">
    <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <SectionLabel align="left">Service Area</SectionLabel>
        <h2 className="font-heading text-3xl font-bold text-nova-text sm:text-4xl">Proudly Serving Ottawa</h2>
        <p className="mt-4 max-w-md text-nova-text-secondary leading-relaxed">
          Nova Hardscapes serves homeowners across Ottawa and the surrounding communities.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          {SERVICE_AREAS.map((area) => (
            <span
              key={area}
              className="flex items-center gap-1.5 rounded-full border border-nova-border bg-nova-card px-4 py-2 text-sm text-nova-text-secondary"
            >
              <MapPin size={13} className="text-nova-gold" />
              {area}
            </span>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative flex aspect-square items-center justify-center rounded-2xl border border-nova-border bg-nova-card"
      >
        <svg viewBox="0 0 200 200" className="h-4/5 w-4/5 opacity-80" aria-hidden="true">
          <circle cx="100" cy="100" r="90" fill="none" stroke="#CBA56A" strokeOpacity="0.25" strokeWidth="1" />
          <circle cx="100" cy="100" r="60" fill="none" stroke="#CBA56A" strokeOpacity="0.35" strokeWidth="1" />
          <circle cx="100" cy="100" r="30" fill="none" stroke="#CBA56A" strokeOpacity="0.5" strokeWidth="1" />
          <circle cx="100" cy="100" r="4" fill="#CBA56A" />
          <text x="100" y="120" textAnchor="middle" fontSize="10" fill="#D7CCBC" fontFamily="Sora, sans-serif">
            Ottawa
          </text>
        </svg>
      </motion.div>
    </Container>
  </section>
);

export default ServiceAreaSection;
