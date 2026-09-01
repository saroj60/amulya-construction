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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const navHeaderClasses = scrolled
    ? 'bg-white/98 backdrop-blur-md border-b border-gray-200 shadow-md py-2.5 md:py-3'
    : 'bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm py-3 md:py-3.5';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navHeaderClasses}`}
      role="banner"
    >
      <div className="container-custom">
        <nav
          className="flex items-center justify-between"
          aria-label="Main navigation"
        >
          {/* Logo - Increased ~30% on Clean White Background */}
          <Link
            to="/"
            className="flex items-center group shrink-0"
            aria-label={`${COMPANY.name} - Home`}
          >
            <img 
              src="/amulyalogo1.png" 
              alt={`${COMPANY.name} Logo`} 
              className="h-12 sm:h-14 md:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-102"
            />
          </Link>

          {/* Desktop Nav Links */}
          <ul className="hidden lg:flex items-center gap-1.5 xl:gap-2" role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `relative px-3.5 py-2 text-sm font-semibold tracking-wide rounded-md transition-colors duration-200 
                    ${isActive
                      ? 'text-orange-500'
                      : 'text-gray-700 hover:text-orange-500'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.label}
                      {isActive && (
                        <motion.span
                          layoutId="nav-underline"
                          className="absolute bottom-0 left-3 right-3 h-0.5 bg-orange-500 rounded-full"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Desktop CTA & Phone */}
          <div className="hidden lg:flex items-center gap-5 xl:gap-6">
            <a
              href={`tel:${COMPANY.mobile || COMPANY.phone}`}
              className="flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-orange-500 transition-colors duration-200 group"
              aria-label={`Call us at ${COMPANY.mobile || COMPANY.phone}`}
            >
              <div className="w-8 h-8 rounded-full bg-orange-50 group-hover:bg-orange-100 flex items-center justify-center transition-colors">
                <Phone className="w-4 h-4 text-orange-500" aria-hidden="true" />
              </div>
              <span className="hidden xl:inline text-xs tracking-wider font-bold text-gray-700 group-hover:text-orange-500">
                {COMPANY.mobile || COMPANY.phone}
              </span>
            </a>
            
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-5 xl:px-6 py-2.5 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white text-sm font-semibold rounded-lg shadow-md hover:shadow-orange-500/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
              aria-label="Get a free quote"
            >
              Get a Quote
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500/50"
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

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden bg-white border-t border-gray-100 shadow-xl overflow-hidden"
          >
            <div className="container-custom py-5">
              <ul className="flex flex-col gap-1" role="list">
                {NAV_LINKS.map((link, i) => (
                  <motion.li
                    key={link.to}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.2 }}
                  >
                    <NavLink
                      to={link.to}
                      className={({ isActive }) =>
                        `flex items-center justify-between px-4 py-3 rounded-lg text-sm font-semibold transition-colors
                        ${isActive
                          ? 'bg-orange-50 text-orange-500 border-l-2 border-orange-500'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-orange-500'
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  </motion.li>
                ))}
              </ul>
              
              <div className="mt-5 pt-4 border-t border-gray-100 flex flex-col gap-3">
                <a
                  href={`tel:${COMPANY.mobile || COMPANY.phone}`}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center">
                    <Phone className="w-4 h-4 text-orange-500" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">Direct Inquiries</div>
                    <div className="font-semibold text-gray-900">{COMPANY.mobile || COMPANY.phone}</div>
                  </div>
                </a>
                <Link
                  to="/contact"
                  className="w-full py-3 px-4 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-semibold rounded-lg text-center text-sm shadow-md shadow-orange-500/20 transition-all"
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
