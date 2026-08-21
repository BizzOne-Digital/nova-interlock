import { motion } from 'framer-motion';
import { Phone, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Container from '../common/Container';
import { PHONE_DISPLAY, PHONE_HREF } from '../../utils/constants';

const Hero = () => (
  <section className="relative overflow-hidden bg-nova-bg pt-32 pb-20 lg:pt-48 lg:pb-32">
    <div className="absolute inset-0">
      <img
        src="/hero.png"
        alt="Luxury interlock driveway and modern home exterior in Ottawa"
        className="h-full w-full object-cover"
        loading="eager"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-nova-bg via-nova-bg/80 to-nova-bg/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-nova-bg via-transparent to-nova-bg/40" />
    </div>

    <Container className="relative">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl"
      >
        <p className="label-uppercase mb-4">Ottawa's Interlock &amp; Landscaping Experts</p>
        <h1 className="font-heading text-4xl font-bold leading-tight text-nova-text sm:text-5xl lg:text-6xl">
          Transform Your Outdoors
          <br />
          with Expert Interlock &amp;{' '}
          <span className="bg-gold-gradient bg-clip-text text-transparent">Hardscaping</span>
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-nova-text-secondary sm:text-lg">
          We build beautiful, durable outdoor spaces with attention to detail, proper preparation, and
          workmanship designed to last. From driveways and patios to complete outdoor transformations, we
          bring your vision to life.
        </p>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
          <a href={PHONE_HREF} className="btn-primary focus-ring">
            <Phone size={18} />
            {PHONE_DISPLAY}
          </a>
          <Link to="/services" className="btn-outline focus-ring">
            Explore Our Services
            <ArrowRight size={16} />
          </Link>
        </div>
        <p className="mt-3 text-sm text-nova-text-secondary">Call for a Free Consultation</p>
      </motion.div>
    </Container>
  </section>
);

export default Hero;
