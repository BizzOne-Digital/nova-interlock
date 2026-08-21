import { motion } from 'framer-motion';
import { Phone, MapPin, Clock } from 'lucide-react';
import SEO from '../components/common/SEO';
import Container from '../components/common/Container';
import SectionLabel from '../components/common/SectionLabel';
import ConsultationForm from '../components/common/ConsultationForm';
import { PHONE_DISPLAY, PHONE_HREF } from '../utils/constants';

const Contact = () => (
  <>
    <SEO
      title="Contact Nova Hardscapes | Free Consultation Ottawa"
      description="Call Nova Hardscapes at 613-213-8000 or request a free consultation for your Ottawa interlock, patio, walkway or landscaping project."
    />
    <section className="bg-nova-bg pt-32 pb-20 lg:pt-40 lg:pb-28">
      <Container className="grid grid-cols-1 gap-14 lg:grid-cols-5">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-2"
        >
          <SectionLabel align="left">Get In Touch</SectionLabel>
          <h1 className="font-heading text-4xl font-bold text-nova-text sm:text-5xl">
            Let's Talk About Your Project
          </h1>
          <p className="mt-5 text-nova-text-secondary leading-relaxed">
            The fastest way to reach us is by phone. For everything else, fill out the consultation form
            and our team will follow up shortly.
          </p>

          <a
            href={PHONE_HREF}
            className="focus-ring mt-8 flex items-center gap-4 rounded-xl border border-nova-gold/40 bg-nova-card p-5 transition-colors hover:border-nova-gold"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-nova-bg">
              <Phone size={22} className="text-nova-gold" />
            </div>
            <div>
              <p className="font-heading text-xl font-bold text-nova-text">{PHONE_DISPLAY}</p>
              <p className="text-sm text-nova-text-secondary">Call for a Free Consultation</p>
            </div>
          </a>

          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-3 text-sm text-nova-text-secondary">
              <MapPin size={18} className="text-nova-gold" />
              Proudly serving Ottawa, Ontario and surrounding communities
            </div>
            <div className="flex items-center gap-3 text-sm text-nova-text-secondary">
              <Clock size={18} className="text-nova-gold" />
              We aim to respond to all requests within one business day
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-3 rounded-2xl border border-nova-border bg-nova-card p-6 sm:p-10"
        >
          <ConsultationForm />
        </motion.div>
      </Container>
    </section>
  </>
);

export default Contact;
