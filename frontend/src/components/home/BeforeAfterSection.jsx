import { motion } from 'framer-motion';
import Container from '../common/Container';
import SectionLabel from '../common/SectionLabel';
import BeforeAfterSlider from './BeforeAfterSlider';

const comparisons = [
  {
    title: 'Driveway Transformation',
    before: '/bef1.png',
    after: '/bef2.png',
  },
  {
    title: 'Backyard Transformation',
    before: '/bef3.png',
    after: '/bef4.png',
  },
  {
    title: 'Front Entrance',
    before: '/bef5.png',
    after: '/bef6.png',
  },
];

const BeforeAfterSection = () => (
  <section className="bg-nova-bg-secondary py-20 lg:py-28">
    <Container>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-2xl text-center"
      >
        <SectionLabel>Before &amp; After</SectionLabel>
        <h2 className="font-heading text-3xl font-bold text-nova-text sm:text-4xl">
          See the Difference Nova Makes
        </h2>
        <p className="mt-3 text-sm text-nova-text-secondary">Drag the slider to compare</p>
      </motion.div>

      <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
        {comparisons.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <BeforeAfterSlider beforeSrc={item.before} afterSrc={item.after} />
            <h3 className="mt-4 text-center font-heading text-base font-semibold text-nova-text">
              {item.title}
            </h3>
          </motion.div>
        ))}
      </div>
    </Container>
  </section>
);

export default BeforeAfterSection;
