import { motion } from 'framer-motion';
import SEO from '../components/common/SEO';
import Container from '../components/common/Container';
import SectionLabel from '../components/common/SectionLabel';
import WhyChooseNova from '../components/home/WhyChooseNova';
import ProcessSection from '../components/home/ProcessSection';
import StatisticsStrip from '../components/home/StatisticsStrip';
import FinalCTA from '../components/home/FinalCTA';

const aboutImage =
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1400&auto=format&fit=crop';

const About = () => (
  <>
    <SEO
      title="About Nova Hardscapes | Ottawa Interlock & Landscaping"
      description="Learn about Nova Hardscapes, Ottawa's interlock and landscaping specialists focused on proper preparation, quality materials and lasting workmanship."
    />
    <section className="bg-nova-bg pt-32 pb-20 lg:pt-40 lg:pb-28">
      <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <SectionLabel align="left">About Nova Hardscapes</SectionLabel>
          <h1 className="font-heading text-4xl font-bold text-nova-text sm:text-5xl">
            Built Right From the Ground Up
          </h1>
          <p className="mt-5 text-nova-text-secondary leading-relaxed">
            Nova Hardscapes specializes in high-quality interlock and landscaping throughout Ottawa. We
            build beautiful, durable outdoor spaces with attention to detail, proper preparation, and
            workmanship designed to last.
          </p>
          <p className="mt-4 text-nova-text-secondary leading-relaxed">
            From driveways and patios to walkways, steps and complete outdoor transformations, we bring
            your vision to life — with every project approached from excavation to the final stone with
            the same level of care.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="overflow-hidden rounded-2xl gold-border"
        >
          <img src={aboutImage} alt="Nova Hardscapes completed interlock project" className="h-full w-full object-cover" />
        </motion.div>
      </Container>
    </section>

    <WhyChooseNova />
    <ProcessSection />
    <StatisticsStrip />
    <FinalCTA />
  </>
);

export default About;
