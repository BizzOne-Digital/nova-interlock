import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../components/common/SEO';
import Container from '../components/common/Container';
import SectionLabel from '../components/common/SectionLabel';
import useApiData from '../hooks/useApiData';
import { productsApi } from '../api/endpoints';
import { FALLBACK_PRODUCTS } from '../utils/fallbackData';
import FinalCTA from '../components/home/FinalCTA';

const categories = [
  'All',
  'Interlock Pavers',
  'Patio Stones',
  'Retaining Wall Blocks',
  'Steps & Coping',
  'River Rock',
  'Decorative Stone',
  'Landscape Materials',
];

const Products = () => {
  const { data: products, loading } = useApiData(() => productsApi.getAll(), FALLBACK_PRODUCTS, []);
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered =
    activeCategory === 'All' ? products : products.filter((p) => p.category === activeCategory);

  return (
    <>
      <SEO
        title="Materials & Products | Nova Hardscapes Ottawa"
        description="Explore the interlock pavers, patio stones, retaining wall blocks and decorative stone materials Nova Hardscapes uses across Ottawa projects."
      />
      <section className="bg-nova-bg pt-32 pb-20 lg:pt-40 lg:pb-28">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-2xl text-center"
          >
            <SectionLabel>Materials</SectionLabel>
            <h1 className="font-heading text-4xl font-bold text-nova-text sm:text-5xl">
              Premium Hardscaping Materials
            </h1>
            <p className="mt-4 text-nova-text-secondary leading-relaxed">
              We work with premium interlock, stone and landscape materials suited to every project.
              Contact us for a custom quote — no fixed pricing shown, every property is different.
            </p>
          </motion.div>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`focus-ring rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? 'border-nova-gold bg-nova-gold text-nova-bg'
                    : 'border-nova-border text-nova-text-secondary hover:border-nova-gold'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {loading &&
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-xl border border-nova-border bg-nova-card p-6">
                  <div className="h-3 w-1/3 animate-pulse rounded bg-white/10" />
                  <div className="mt-3 h-4 w-3/4 animate-pulse rounded bg-white/10" />
                  <div className="mt-3 h-3 w-full animate-pulse rounded bg-white/5" />
                  <div className="mt-2 h-3 w-5/6 animate-pulse rounded bg-white/5" />
                </div>
              ))}
            {!loading && filtered.map((product, i) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (i % 6) * 0.06 }}
                className="rounded-xl border border-nova-border bg-nova-card p-6"
              >
                <p className="label-uppercase text-left">{product.category}</p>
                <h3 className="mt-2 font-heading text-lg font-semibold text-nova-text">{product.name}</h3>
                <p className="mt-2 text-sm text-nova-text-secondary leading-relaxed">{product.description}</p>
                {product.colors?.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <span key={color} className="rounded-full border border-nova-border px-3 py-1 text-xs text-nova-text-secondary">
                        {color}
                      </span>
                    ))}
                  </div>
                )}
                <Link to="/contact" className="focus-ring mt-4 inline-block text-sm font-medium text-nova-gold">
                  Ask About This Material →
                </Link>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <FinalCTA />
    </>
  );
};

export default Products;
