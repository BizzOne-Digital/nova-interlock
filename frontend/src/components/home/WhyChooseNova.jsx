import { motion } from 'framer-motion';
import Container from '../common/Container';
import SectionLabel from '../common/SectionLabel';
import { ShieldIcon, BrickIcon, MedalIcon, UserCheckIcon, DesignIcon, StoneIcon } from '../common/icons';

const reasons = [
  { icon: BrickIcon, title: 'Proper Base Preparation', desc: 'Long-lasting projects start underneath the surface.' },
  { icon: MedalIcon, title: 'Quality Materials', desc: 'Premium interlock and landscaping materials.' },
  { icon: DesignIcon, title: 'Attention to Detail', desc: 'Clean cuts, proper edges and precise installations.' },
  { icon: ShieldIcon, title: 'Professional Workmanship', desc: 'Experienced and dependable execution.' },
  { icon: StoneIcon, title: 'Local Ottawa Service', desc: 'Serving homeowners throughout Ottawa.' },
  { icon: UserCheckIcon, title: 'Clear Communication', desc: 'Straightforward communication throughout the project.' },
];

const WhyChooseNova = () => (
  <section className="bg-nova-bg py-20 lg:py-28">
    <Container>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-2xl text-center"
      >
        <SectionLabel>Why Choose Us</SectionLabel>
        <h2 className="font-heading text-3xl font-bold text-nova-text sm:text-4xl">
          Why Homeowners Choose Nova
        </h2>
      </motion.div>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {reasons.map((reason, i) => (
          <motion.div
            key={reason.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.07 }}
            className="rounded-xl border border-nova-border bg-nova-card p-6"
          >
            <reason.icon size={30} />
            <h3 className="mt-4 font-heading text-base font-semibold text-nova-text">{reason.title}</h3>
            <p className="mt-2 text-sm text-nova-text-secondary leading-relaxed">{reason.desc}</p>
          </motion.div>
        ))}
      </div>
    </Container>
  </section>
);

export default WhyChooseNova;
