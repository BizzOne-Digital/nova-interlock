import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { servicesApi } from '../../api/endpoints';
import useApiData from '../../hooks/useApiData';
import { FALLBACK_SERVICES } from '../../utils/fallbackData';
import { iconMap, DesignIcon } from '../common/icons';
import SkeletonCard from '../common/SkeletonCard';

const ServicesGrid = ({ limit }) => {
  const { data: services, loading } = useApiData(() => servicesApi.getAll(), FALLBACK_SERVICES, []);
  const list = limit ? services.slice(0, limit) : services;

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: limit || 8 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {list.map((service, i) => {
        const Icon = iconMap[service.icon] || DesignIcon;
        return (
          <motion.article
            key={service._id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="group overflow-hidden rounded-xl border border-nova-border bg-nova-card transition-colors hover:border-nova-gold"
          >
            <div className="relative h-40 overflow-hidden">
              <img
                src={service.image?.url}
                alt={service.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-nova-bg/80 to-transparent" />
              <div className="absolute bottom-3 left-3 flex h-9 w-9 items-center justify-center rounded-full bg-nova-bg/80 gold-border">
                <Icon size={18} />
              </div>
            </div>
            <div className="p-5">
              <h3 className="font-heading text-base font-semibold text-nova-text">{service.title}</h3>
              <p className="mt-2 text-sm text-nova-text-secondary leading-relaxed">{service.description}</p>
              <Link
                to="/contact"
                className="focus-ring mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-nova-gold"
              >
                Learn More
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.article>
        );
      })}
    </div>
  );
};

export default ServicesGrid;
