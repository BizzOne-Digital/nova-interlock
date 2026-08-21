import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Container from '../common/Container';
import SectionLabel from '../common/SectionLabel';
import useApiData from '../../hooks/useApiData';
import { productsApi } from '../../api/endpoints';
import { FALLBACK_PRODUCTS } from '../../utils/fallbackData';

const ProductsTeaser = () => {
  const { data: products, loading } = useApiData(() => productsApi.getAll(), FALLBACK_PRODUCTS, []);
  const list = products.slice(0, 4);

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
          <SectionLabel>Materials</SectionLabel>
          <h2 className="font-heading text-3xl font-bold text-nova-text sm:text-4xl">
            Premium Materials We Work With
          </h2>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {loading &&
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded-xl border border-nova-border bg-nova-card p-6">
                <div className="h-3 w-1/2 animate-pulse rounded bg-white/10" />
                <div className="mt-3 h-4 w-3/4 animate-pulse rounded bg-white/10" />
                <div className="mt-3 h-3 w-full animate-pulse rounded bg-white/5" />
              </div>
            ))}
          {!loading && list.map((product, i) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-xl border border-nova-border bg-nova-card p-6"
            >
              <p className="label-uppercase text-left">{product.category}</p>
              <h3 className="mt-2 font-heading text-base font-semibold text-nova-text">{product.name}</h3>
              <p className="mt-2 text-sm text-nova-text-secondary leading-relaxed">{product.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link to="/products" className="btn-outline focus-ring">
            Explore All Materials
            <ArrowRight size={16} />
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default ProductsTeaser;
