import { Link } from 'react-router-dom';
import { Phone, ClipboardList } from 'lucide-react';
import { PHONE_HREF } from '../../utils/constants';

const MobileStickyBar = () => (
  <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 grid grid-cols-2 border-t border-nova-border bg-nova-bg-secondary/95 backdrop-blur-md">
    <a
      href={PHONE_HREF}
      className="focus-ring flex items-center justify-center gap-2 py-3.5 text-sm font-semibold text-nova-text border-r border-nova-border"
    >
      <Phone size={16} className="text-nova-gold" />
      Call Now
    </a>
    <Link
      to="/contact"
      className="focus-ring flex items-center justify-center gap-2 py-3.5 text-sm font-semibold text-nova-bg bg-gold-gradient"
    >
      <ClipboardList size={16} />
      Request Quote
    </Link>
  </div>
);

export default MobileStickyBar;
