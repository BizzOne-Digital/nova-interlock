import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { Phone } from 'lucide-react';
import { PHONE_DISPLAY, PHONE_HREF } from '../../utils/constants';

const ClearanceBanner = forwardRef((props, ref) => (
  <div
    ref={ref}
    className="fixed top-0 left-0 right-0 z-[60] bg-gold-gradient text-nova-bg"
  >
    <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-3 gap-y-1 px-4 py-2 text-center text-xs font-semibold uppercase tracking-wide sm:text-sm">
      <span>Driveway Clearance Sale — Interlock Driveways &amp; Driveway Extensions</span>
      <Link to="/contact" className="focus-ring underline underline-offset-2 hover:no-underline">
        Get Your Quote
      </Link>
      <span aria-hidden="true" className="hidden sm:inline">
        or
      </span>
      <a href={PHONE_HREF} className="focus-ring inline-flex items-center gap-1 underline underline-offset-2 hover:no-underline">
        <Phone size={13} />
        {PHONE_DISPLAY}
      </a>
    </div>
  </div>
));

ClearanceBanner.displayName = 'ClearanceBanner';

export default ClearanceBanner;
