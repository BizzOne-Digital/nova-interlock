import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Container from '../common/Container';
import SectionLabel from '../common/SectionLabel';
import useApiData from '../../hooks/useApiData';
import { projectsApi } from '../../api/endpoints';
import { FALLBACK_PROJECTS } from '../../utils/fallbackData';

const ProjectsShowcase = () => {
  const { data: projects, loading } = useApiData(() => projectsApi.getAll(), FALLBACK_PROJECTS, []);
  const list = projects.slice(0, 6);

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
          <SectionLabel>Featured Projects</SectionLabel>
          <h2 className="font-heading text-3xl font-bold text-nova-text sm:text-4xl">
            Outdoor Transformations Built to Last
          </h2>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {loading &&
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-[4/3] animate-pulse rounded-xl border border-nova-border bg-white/5" />
            ))}
          {!loading && list.map((project, i) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
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
                <Link to="/projects" className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-nova-gold">
                  View Project <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link to="/projects" className="btn-outline focus-ring">
            View All Projects
            <ArrowRight size={16} />
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default ProjectsShowcase;
