import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, HardHat, Phone } from 'lucide-react';
import { COMPANY } from '@/data';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Projects', to: '/projects' },
  { label: 'Design', to: '/designs' },
  { label: 'Cost Calculator', to: '/cost-calculator' },
  { label: 'Contact', to: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const navBg = scrolled || !isHome
    ? 'bg-white shadow-md border-b border-gray-100'
    : 'bg-transparent';

  const textColor = scrolled || !isHome
    ? 'text-gray-800'
    : 'text-white';

  const logoColor = scrolled || !isHome ? 'text-blue-800' : 'text-white';
  const accentColor = 'text-orange-500';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}
      role="banner"
    >
      <div className="container-custom">
        <nav
          className="flex items-center justify-between h-16 md:h-20"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center group"
            aria-label={`${COMPANY.name} - Home`}
          >
            <img 
              src="/amulyalogo.png" 
              alt={`${COMPANY.name} Logo`} 
              className="h-10 md:h-12 w-auto object-contain transition-all"
            />
          </Link>

          {/* Desktop Nav Links */}
          <ul className="hidden lg:flex items-center gap-1" role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `relative px-4 py-2 text-sm font-semibold rounded-md transition-colors duration-200 
                    ${isActive
                      ? 'text-orange-500'
                      : `${textColor} hover:text-orange-400`
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.label}
                      {isActive && (
                        <motion.span
                          layoutId="nav-underline"
                          className="absolute bottom-0 left-4 right-4 h-0.5 bg-orange-500 rounded-full"
                        />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`tel:${COMPANY.mobile || COMPANY.phone}`}
              className={`flex items-center gap-1.5 text-sm font-medium transition-colors duration-200 ${textColor} hover:text-orange-400`}
              aria-label={`Call us at ${COMPANY.mobile || COMPANY.phone}`}
            >
              <Phone className="w-4 h-4" aria-hidden="true" />
              <span className="hidden xl:inline">{COMPANY.mobile || COMPANY.phone}</span>
            </a>
            <Link
              to="/contact"
              className="btn-primary text-sm px-5 py-2.5"
              aria-label="Get a free quote"
            >
              Get a Quote
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className={`lg:hidden p-2 rounded-md transition-colors ${scrolled || !isHome ? 'text-gray-800 hover:bg-gray-100' : 'text-white hover:bg-white/10'}`}
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <AnimatePresence mode="wait" initial={false}>
              {menuOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X className="w-6 h-6" aria-hidden="true" />
                </motion.span>
              ) : (
                <motion.span
                  key="open"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Menu className="w-6 h-6" aria-hidden="true" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden bg-white border-t border-gray-100 shadow-lg overflow-hidden"
          >
            <div className="container-custom py-4">
              <ul className="flex flex-col gap-1" role="list">
                {NAV_LINKS.map((link, i) => (
                  <motion.li
                    key={link.to}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <NavLink
                      to={link.to}
                      className={({ isActive }) =>
                        `flex items-center px-4 py-3 rounded-md text-sm font-semibold transition-colors
                        ${isActive
                          ? 'bg-orange-50 text-orange-500'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-orange-500'
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col gap-3">
                <a
                  href={`tel:${COMPANY.mobile || COMPANY.phone}`}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700"
                >
                  <Phone className="w-4 h-4 text-orange-500" aria-hidden="true" />
                  {COMPANY.mobile || COMPANY.phone}
                </a>
                <Link
                  to="/contact"
                  className="btn-primary text-sm text-center justify-center"
                >
                  Get a Free Quote
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
