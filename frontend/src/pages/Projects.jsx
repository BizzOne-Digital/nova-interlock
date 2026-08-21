import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/common/SEO';
import Container from '../components/common/Container';
import SectionLabel from '../components/common/SectionLabel';
import useApiData from '../hooks/useApiData';
import { projectsApi } from '../api/endpoints';
import { FALLBACK_PROJECTS } from '../utils/fallbackData';
import FinalCTA from '../components/home/FinalCTA';
import GallerySection from '../components/home/GallerySection';

const categories = ['All', 'Driveways', 'Patios', 'Walkways', 'Steps', 'Retaining Walls', 'Landscaping'];

const Projects = () => {
  const { data: projects, loading } = useApiData(() => projectsApi.getAll(), FALLBACK_PROJECTS, []);
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered =
    activeCategory === 'All' ? projects : projects.filter((p) => p.category === activeCategory);

  return (
    <>
      <SEO
        title="Our Projects | Nova Hardscapes Ottawa"
        description="Browse Nova Hardscapes' completed interlock driveway, patio, walkway, retaining wall and landscaping projects across Ottawa."
      />
      <section className="bg-nova-bg pt-32 pb-20 lg:pt-40 lg:pb-28">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-2xl text-center"
          >
            <SectionLabel>Our Work</SectionLabel>
            <h1 className="font-heading text-4xl font-bold text-nova-text sm:text-5xl">
              Outdoor Transformations Built to Last
            </h1>
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

          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {loading &&
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="aspect-[4/3] animate-pulse rounded-xl border border-nova-border bg-white/5" />
              ))}
            {!loading && filtered.map((project, i) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (i % 6) * 0.06 }}
                className="group relative aspect-[4/3] overflow-hidden rounded-xl gold-border"
              >
                <img
                  src={project.coverImage?.url}
                  alt={`${project.title} in ${project.location}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-nova-bg/90 via-nova-bg/20 to-transparent p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <h3 className="font-heading text-lg font-semibold text-nova-text">{project.title}</h3>
                  <p className="text-sm text-nova-text-secondary">{project.location}</p>
                  <Link to="/contact" className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-nova-gold">
                    View Project <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {!loading && filtered.length === 0 && (
            <p className="mt-12 text-center text-nova-text-secondary">No projects found in this category yet.</p>
          )}
        </Container>
      </section>

      <GallerySection />
      <FinalCTA />
    </>
  );
};

export default Projects;
