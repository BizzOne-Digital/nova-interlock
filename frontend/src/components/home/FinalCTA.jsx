import { motion } from 'framer-motion';
import { Phone, ClipboardList } from 'lucide-react';
import { Link } from 'react-router-dom';
import Container from '../common/Container';
import { PHONE_DISPLAY, PHONE_HREF } from '../../utils/constants';

const ctaImage =
  'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1800&auto=format&fit=crop';

const FinalCTA = () => (
  <section className="relative overflow-hidden py-24 lg:py-32">
    <img src={ctaImage} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
    <div className="absolute inset-0 bg-nova-bg/85" />

    <Container className="relative text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-2xl"
      >
        <h2 className="font-heading text-3xl font-bold text-nova-text sm:text-4xl">
          Ready to Transform Your Outdoor Space?
        </h2>
        <p className="mt-4 text-nova-text-secondary leading-relaxed">
          Tell us about your driveway, patio, walkway or landscaping project and our team will get in
          touch.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a href={PHONE_HREF} className="btn-primary focus-ring">
            <Phone size={18} />
            Call {PHONE_DISPLAY}
          </a>
          <Link to="/contact" className="btn-outline focus-ring">
            <ClipboardList size={16} />
            Request a Consultation
          </Link>
        </div>
        <p className="mt-4 text-sm text-nova-text-secondary">Neighbourhood discounts may be available.</p>
      </motion.div>
    </Container>
  </section>
);

export default FinalCTA;
