import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Container from '../common/Container';
import useApiData from '../../hooks/useApiData';
import { contentApi } from '../../api/endpoints';
import { FALLBACK_STATISTICS } from '../../utils/fallbackData';

const CountUp = ({ value, inView }) => {
  const numericMatch = value.match(/\d+/);
  const number = numericMatch ? parseInt(numericMatch[0], 10) : null;
  const suffix = value.replace(/^\d+/, '');
  const [display, setDisplay] = useState(number ? 0 : value);

  useEffect(() => {
    if (!inView || number === null) return;
    let frame = 0;
    const totalFrames = 40;
    const step = () => {
      frame += 1;
      const progress = Math.min(frame / totalFrames, 1);
      setDisplay(Math.round(progress * number));
      if (progress < 1) requestAnimationFrame(step);
    };
    step();
  }, [inView, number]);

  return <>{number !== null ? `${display}${suffix}` : value}</>;
};

const StatisticsStrip = () => {
  const { data: stats } = useApiData(() => contentApi.getStatistics(), FALLBACK_STATISTICS, []);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  const items = [
    { label: 'Projects Completed', value: stats.projectsCompleted },
    { label: 'Years Experience', value: stats.yearsExperience },
    { label: 'Customer Satisfaction', value: stats.customerFocused },
    { label: 'Proudly Serving', value: stats.servingArea },
  ];

  return (
    <section ref={ref} className="border-t border-nova-border bg-nova-bg-secondary py-10">
      <Container className="grid grid-cols-2 gap-8 divide-x divide-nova-border lg:grid-cols-4">
        {items.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="text-center"
          >
            <p className="font-heading text-3xl font-bold text-nova-gold">
              <CountUp value={String(item.value)} inView={inView} />
            </p>
            <p className="mt-1 text-xs uppercase tracking-wide text-nova-text-secondary">{item.label}</p>
          </motion.div>
        ))}
      </Container>
    </section>
  );
};

export default StatisticsStrip;
