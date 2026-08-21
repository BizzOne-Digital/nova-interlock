import { motion } from 'framer-motion';
import Container from '../common/Container';
import SectionLabel from '../common/SectionLabel';
import useApiData from '../../hooks/useApiData';
import { galleryApi } from '../../api/endpoints';

const GallerySection = () => {
  const { data: images } = useApiData(() => galleryApi.getAll(), [], []);

  if (!images.length) return null;

  return (
    <section className="bg-nova-bg-secondary py-20 lg:py-28">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <SectionLabel>Photo Gallery</SectionLabel>
          <h2 className="font-heading text-3xl font-bold text-nova-text sm:text-4xl">
            More From Our Projects
          </h2>
        </motion.div>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {images.map((img, i) => (
            <motion.div
              key={img._id}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (i % 8) * 0.05 }}
              className="group overflow-hidden rounded-lg gold-border"
            >
              <img
                src={img.image?.url}
                alt={img.title || 'Nova Hardscapes project photo'}
                loading="lazy"
                className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default GallerySection;
