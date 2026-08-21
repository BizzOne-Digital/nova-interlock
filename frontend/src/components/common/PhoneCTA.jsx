import { Phone } from 'lucide-react';
import { PHONE_DISPLAY, PHONE_HREF } from '../../utils/constants';

const PhoneCTA = ({ variant = 'button', className = '' }) => {
  if (variant === 'text') {
    return (
      <a
        href={PHONE_HREF}
        className={`focus-ring inline-flex items-center gap-2 font-semibold text-nova-text hover:text-nova-gold transition-colors ${className}`}
      >
        <Phone size={18} className="text-nova-gold" />
        {PHONE_DISPLAY}
      </a>
    );
  }

  return (
    <a href={PHONE_HREF} className={`btn-primary focus-ring ${className}`}>
      <Phone size={18} />
      {PHONE_DISPLAY}
    </a>
  );
};

export default PhoneCTA;
