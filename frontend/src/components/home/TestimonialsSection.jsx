import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import Container from '../common/Container';
import SectionLabel from '../common/SectionLabel';
import useApiData from '../../hooks/useApiData';
import { testimonialsApi } from '../../api/endpoints';
import { FALLBACK_TESTIMONIALS } from '../../utils/fallbackData';

const TestimonialsSection = () => {
  const { data: testimonials, loading } = useApiData(() => testimonialsApi.getAll(), FALLBACK_TESTIMONIALS, []);

  return (
    <section className="bg-nova-bg py-20 lg:py-28">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <SectionLabel>Testimonials</SectionLabel>
          <h2 className="font-heading text-3xl font-bold text-nova-text sm:text-4xl">
            What Ottawa Homeowners Say
          </h2>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {loading &&
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="rounded-xl border border-nova-border bg-nova-card p-6">
                <div className="h-3 w-full animate-pulse rounded bg-white/5" />
                <div className="mt-2 h-3 w-5/6 animate-pulse rounded bg-white/5" />
                <div className="mt-5 h-4 w-1/3 animate-pulse rounded bg-white/10" />
              </div>
            ))}
          {!loading && testimonials.slice(0, 6).map((t, i) => (
            <motion.div
              key={t._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-xl border border-nova-border bg-nova-card p-6"
            >
              <Quote size={24} className="text-nova-gold" />
              <p className="mt-4 text-sm leading-relaxed text-nova-text-secondary">"{t.review}"</p>
              <div className="mt-5 flex items-center justify-between">
                <div>
                  <p className="font-heading text-sm font-semibold text-nova-text">{t.clientName}</p>
                  <p className="text-xs text-nova-text-secondary">{t.projectType}</p>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating || 5 }).map((_, idx) => (
                    <Star key={idx} size={14} className="fill-nova-gold text-nova-gold" />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default TestimonialsSection;
