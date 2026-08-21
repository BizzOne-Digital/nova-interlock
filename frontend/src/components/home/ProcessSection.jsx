import { motion } from 'framer-motion';
import Container from '../common/Container';
import SectionLabel from '../common/SectionLabel';

const steps = [
  { number: '01', title: 'Consultation', desc: 'Tell us about your property and project.' },
  { number: '02', title: 'Site Review', desc: 'We evaluate the area and project requirements.' },
  { number: '03', title: 'Design & Planning', desc: 'Materials, layout and installation details are planned.' },
  { number: '04', title: 'Build & Transform', desc: 'Our team prepares and completes your outdoor transformation.' },
];

const ProcessSection = () => (
  <section className="bg-nova-bg-secondary py-20 lg:py-28">
    <Container>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-2xl text-center"
      >
        <SectionLabel>Our Process</SectionLabel>
        <h2 className="font-heading text-3xl font-bold text-nova-text sm:text-4xl">
          From Consultation to Completion
        </h2>
      </motion.div>

      <div className="relative mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div className="absolute left-0 right-0 top-6 hidden h-px bg-nova-border lg:block" />
        {steps.map((step, i) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            className="relative text-center"
          >
            <div className="relative z-10 mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-nova-gold bg-nova-bg font-heading text-sm font-bold text-nova-gold">
              {step.number}
            </div>
            <h3 className="mt-4 font-heading text-base font-semibold text-nova-text">{step.title}</h3>
            <p className="mt-2 text-sm text-nova-text-secondary leading-relaxed">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </Container>
  </section>
);

export default ProcessSection;
