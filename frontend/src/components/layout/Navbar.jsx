import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import Container from '../common/Container';
import PhoneCTA from '../common/PhoneCTA';
import { NAV_LINKS, PHONE_DISPLAY, PHONE_HREF } from '../../utils/constants';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
  }, [menuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-nova-bg/85 backdrop-blur-md border-b border-nova-border' : 'bg-transparent'
      }`}
    >
      <Container className="flex items-center justify-between py-4">
        <Link to="/" className="flex items-center focus-ring" onClick={() => setMenuOpen(false)}>
          <img src="/logo.png" alt="Nova Hardscapes" className="h-16 w-auto sm:h-20" />
        </Link>

        <nav className="hidden lg:flex items-center gap-8" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `focus-ring text-sm font-medium uppercase tracking-wide transition-colors ${
                  isActive ? 'text-nova-gold' : 'text-nova-text-secondary hover:text-nova-text'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:flex flex-col items-end">
          <a href={PHONE_HREF} className="focus-ring flex items-center gap-2 text-lg font-bold text-nova-text hover:text-nova-gold transition-colors">
            <Phone size={18} className="text-nova-gold" />
            {PHONE_DISPLAY}
          </a>
          <span className="text-xs text-nova-text-secondary">Call for a Free Consultation</span>
        </div>

        <button
          className="lg:hidden focus-ring text-nova-text"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </Container>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-nova-bg border-t border-nova-border overflow-hidden"
          >
            <Container className="flex flex-col gap-1 py-4">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `focus-ring py-3 text-base font-medium uppercase tracking-wide border-b border-white/5 ${
                      isActive ? 'text-nova-gold' : 'text-nova-text-secondary'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <PhoneCTA className="mt-4 justify-center" />
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
