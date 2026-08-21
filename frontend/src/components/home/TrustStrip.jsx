import { motion } from 'framer-motion';
import Container from '../common/Container';
import { ShieldIcon, BrickIcon, MedalIcon, UserCheckIcon } from '../common/icons';

const items = [
  {
    icon: ShieldIcon,
    title: 'Quality Workmanship',
    desc: 'Built to last with precision and care.',
  },
  {
    icon: BrickIcon,
    title: 'Proper Preparation',
    desc: 'Excavation, grading & compaction done right.',
  },
  {
    icon: MedalIcon,
    title: 'Premium Materials',
    desc: 'High-quality materials for durability and beauty.',
  },
  {
    icon: UserCheckIcon,
    title: 'Customer Focused',
    desc: 'Your vision, our expertise, exceptional results.',
  },
];

const TrustStrip = () => (
  <section className="border-y border-nova-border bg-nova-bg-secondary py-10">
    <Container className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item, i) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.08 }}
          className="flex items-start gap-4"
        >
          <item.icon size={30} />
          <div>
            <h3 className="font-heading text-base font-semibold text-nova-text">{item.title}</h3>
            <p className="mt-1 text-sm text-nova-text-secondary">{item.desc}</p>
          </div>
        </motion.div>
      ))}
    </Container>
  </section>
);

export default TrustStrip;
