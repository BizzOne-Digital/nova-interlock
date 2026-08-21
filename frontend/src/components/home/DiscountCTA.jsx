import { motion } from 'framer-motion';
import { Users, Phone } from 'lucide-react';
import Container from '../common/Container';
import { PHONE_DISPLAY, PHONE_HREF } from '../../utils/constants';

const DiscountCTA = () => (
  <section className="bg-nova-bg-secondary py-16">
    <Container>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center gap-6 rounded-2xl border border-nova-gold/40 bg-nova-card p-8 text-center sm:flex-row sm:justify-between sm:text-left lg:p-10"
      >
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-nova-bg">
            <Users size={26} className="text-nova-gold" />
          </div>
          <div>
            <h3 className="font-heading text-xl font-bold text-nova-text">Neighbourhood Discounts Available</h3>
            <p className="mt-1 text-sm text-nova-text-secondary">Ask us for details when you call.</p>
          </div>
        </div>
        <a href={PHONE_HREF} className="btn-primary focus-ring shrink-0">
          <Phone size={18} />
          {PHONE_DISPLAY}
        </a>
      </motion.div>
    </Container>
  </section>
);

export default DiscountCTA;
