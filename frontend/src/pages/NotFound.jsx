import { Link } from 'react-router-dom';
import SEO from '../components/common/SEO';
import Container from '../components/common/Container';
import PhoneCTA from '../components/common/PhoneCTA';

const NotFound = () => (
  <>
    <SEO title="Page Not Found | Nova Hardscapes" description="The page you're looking for could not be found." />
    <section className="flex min-h-screen items-center bg-nova-bg pt-24">
      <Container className="text-center">
        <p className="font-heading text-6xl font-bold text-nova-gold">404</p>
        <h1 className="mt-4 font-heading text-2xl font-bold text-nova-text">Page Not Found</h1>
        <p className="mt-3 text-nova-text-secondary">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link to="/" className="btn-outline focus-ring">
            Back to Home
          </Link>
          <PhoneCTA />
        </div>
      </Container>
    </section>
  </>
);

export default NotFound;
