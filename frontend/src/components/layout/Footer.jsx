import { Link } from 'react-router-dom';
import { Phone, MapPin } from 'lucide-react';
import Container from '../common/Container';
import { PHONE_DISPLAY, PHONE_HREF } from '../../utils/constants';

const footerServices = [
  'Interlock Driveways',
  'Patios',
  'Walkways',
  'Steps & Porch Capping',
  'Retaining Walls',
  'Landscape Design',
];

const footerNav = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Products', path: '/products' },
  { label: 'Contact', path: '/contact' },
];

const Footer = () => (
  <footer className="bg-nova-bg-secondary border-t border-nova-border pb-24 lg:pb-0">
    <Container className="grid grid-cols-1 gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
      <div>
        <img src="/logo.png" alt="Nova Hardscapes" className="h-24 w-auto" />
        <p className="mt-4 text-sm text-nova-text-secondary leading-relaxed">
          Premium interlock and landscaping services built with precision, proper preparation and
          lasting workmanship throughout Ottawa.
        </p>
      </div>

      <div>
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-nova-text">Navigation</h3>
        <ul className="space-y-2">
          {footerNav.map((item) => (
            <li key={item.path}>
              <Link to={item.path} className="focus-ring text-sm text-nova-text-secondary hover:text-nova-gold transition-colors">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-nova-text">Services</h3>
        <ul className="space-y-2">
          {footerServices.map((service) => (
            <li key={service} className="text-sm text-nova-text-secondary">
              {service}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-nova-text">Contact</h3>
        <a href={PHONE_HREF} className="focus-ring flex items-center gap-2 text-nova-text hover:text-nova-gold transition-colors mb-3">
          <Phone size={16} className="text-nova-gold" />
          {PHONE_DISPLAY}
        </a>
        <div className="flex items-center gap-2 text-sm text-nova-text-secondary mb-4">
          <MapPin size={16} className="text-nova-gold" />
          Ottawa, Ontario
        </div>
        <a href={PHONE_HREF} className="btn-outline focus-ring text-sm">
          Call for a Free Consultation
        </a>
      </div>
    </Container>

    <div className="border-t border-nova-border">
      <Container className="py-6 text-center text-xs text-nova-text-secondary">
        © {new Date().getFullYear()} Nova Hardscapes. All Rights Reserved.
      </Container>
    </div>
  </footer>
);

export default Footer;
