import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  HardHat,
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  ArrowRight,
  ChevronRight,
} from 'lucide-react';
import { COMPANY, SERVICES } from '@/data';
import { api } from '@/services/api';

// Inline SVG social icons (Lucide v1 dropped social icons)
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);
const YoutubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" />
  </svg>
);
const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);
const TiktokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
    <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.02 1.59 4.23.99 1.15 2.37 1.93 3.86 2.18v3.66a8.2 8.2 0 01-4.73-1.66c-.16-.12-.31-.25-.46-.38v7.06a7.28 7.28 0 11-7.28-7.28c.45 0 .88.06 1.3.17v3.74c-.42-.16-.88-.23-1.3-.23a3.54 3.54 0 103.54 3.54V0z" />
  </svg>
);

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Projects', to: '/projects' },
  { label: 'Design', to: '/designs' },
  { label: 'Cost Calculator', to: '/cost-calculator' },
  { label: 'Contact Us', to: '/contact' },
  { label: 'Blog', to: '/blog' },
];

const socialLinks = [
  COMPANY.social.facebook && { Icon: FacebookIcon, href: COMPANY.social.facebook, label: 'Facebook' },
  COMPANY.social.instagram && { Icon: InstagramIcon, href: COMPANY.social.instagram, label: 'Instagram' },
  COMPANY.social.youtube && { Icon: YoutubeIcon, href: COMPANY.social.youtube, label: 'YouTube' },
  COMPANY.social.linkedin && { Icon: LinkedinIcon, href: COMPANY.social.linkedin, label: 'LinkedIn' },
  COMPANY.social.tiktok && { Icon: TiktokIcon, href: COMPANY.social.tiktok, label: 'TikTok' },
].filter(Boolean);

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [services, setServices] = useState(SERVICES);

  useEffect(() => {
    api.getServices()
      .then(data => {
        if (data && data.length > 0) {
          setServices(data);
        }
      })
      .catch(err => {
        console.error('Failed to load services from API for footer:', err);
      });
  }, []);

  return (
    <footer className="bg-[#051124] text-slate-300 border-t-2 border-[#cd0102]" role="contentinfo">

      {/* Main Footer */}
      <div className="container-custom py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10">

          {/* Brand Column */}
          <div className="lg:col-span-1 space-y-6">
            <Link to="/" className="inline-flex items-center group" aria-label={`${COMPANY.name} - Home`}>
              <img
                src="/amulyalogo1.png"
                alt={`${COMPANY.name} logo`}
                className="h-12 md:h-14 w-auto object-contain"
                loading="lazy"
              />
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              {COMPANY.name} is a premier construction firm in Nepal, delivering
              seismic-resistant, premium residential and commercial structures since {COMPANY.foundedYear}.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-2.5 pt-2">
              {socialLinks.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 bg-gray-900 border border-gray-800/80 rounded-full flex items-center justify-center text-gray-400 hover:bg-orange-500 hover:text-white hover:border-orange-500 hover:-translate-y-0.5 transition-all duration-300 shadow-sm"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-6 relative pb-2 inline-block">
              Quick Links
              <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-orange-500 rounded-full" />
            </h3>
            <ul className="space-y-3" role="list">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="flex items-center gap-1 text-sm text-gray-400 hover:text-orange-400 transition-all duration-300 hover:translate-x-1 group"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-gray-700 group-hover:text-orange-400 transition-colors" aria-hidden="true" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-6 relative pb-2 inline-block">
              Our Services
              <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-orange-500 rounded-full" />
            </h3>
            <ul className="space-y-3" role="list">
              {services.slice(0, 6).map((service) => (
                <li key={service.id}>
                  <Link
                    to="/services"
                    className="flex items-center gap-1 text-sm text-gray-400 hover:text-orange-400 transition-all duration-300 hover:translate-x-1 group"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-gray-700 group-hover:text-orange-400 transition-colors" aria-hidden="true" />
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-6 relative pb-2 inline-block">
              Contact Us
              <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-orange-500 rounded-full" />
            </h3>
            <ul className="space-y-4" role="list">
              <li className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-orange-500" aria-hidden="true" />
                </div>
                <div className="flex flex-col gap-1 text-xs md:text-sm text-gray-400 leading-relaxed">
                  <address className="not-italic">
                    <span className="text-gray-300 font-semibold">Head Office:</span> {COMPANY.address}
                  </address>
                  {COMPANY.branchAddress && (
                    <address className="not-italic">
                      <span className="text-gray-300 font-semibold">Branch:</span> {COMPANY.branchAddress}
                    </address>
                  )}
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-orange-500" aria-hidden="true" />
                </div>
                <div className="flex flex-col text-xs md:text-sm text-gray-400 leading-none">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-600 mb-0.5">Call Us</span>
                  <div className="flex flex-col gap-1 mt-0.5">
                    <a href={`tel:${COMPANY.phone}`} className="hover:text-orange-400 transition-colors font-medium">
                      {COMPANY.phone} <span className="text-[10px] text-gray-500">(Landline)</span>
                    </a>
                    {COMPANY.mobile && (
                      <a href={`tel:${COMPANY.mobile}`} className="hover:text-orange-400 transition-colors font-medium">
                        {COMPANY.mobile} <span className="text-[10px] text-gray-500">(Mobile)</span>
                      </a>
                    )}
                  </div>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-orange-500" aria-hidden="true" />
                </div>
                <div className="flex flex-col text-xs md:text-sm text-gray-400 leading-none">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-600 mb-1">Email Us</span>
                  <a href={`mailto:${COMPANY.email}`} className="hover:text-orange-400 transition-colors font-medium break-all">
                    {COMPANY.email}
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-4 h-4 text-green-400" aria-hidden="true" />
                </div>
                <div className="flex flex-col text-xs md:text-sm text-gray-400 leading-none">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-600 mb-1">WhatsApp</span>
                  <a
                    href={`https://wa.me/${COMPANY.whatsapp.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-green-400 transition-colors font-semibold text-green-500 flex items-center gap-1.5"
                  >
                    {COMPANY.whatsapp}
                    <span className="text-[9px] bg-green-500/10 text-green-400 border border-green-500/25 px-1.5 py-0.5 rounded font-bold animate-pulse">ONLINE</span>
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-900 bg-gray-950/70 py-6">
        <div className="container-custom flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>
            &copy; {currentYear} {COMPANY.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            {COMPANY.vat && (
              <span className="bg-gray-900/65 text-gray-400 border border-gray-800/80 px-2.5 py-1 rounded-full font-medium">
                VAT ID: <strong className="text-gray-300 font-semibold">{COMPANY.vat}</strong>
              </span>
            )}
            <Link to="/privacy-policy" className="hover:text-gray-300 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-gray-300 transition-colors">
              Terms of Service
            </Link>
            <Link to="/admin/login" className="hover:text-orange-400 text-gray-400 font-bold transition-colors">
              Admin Login
            </Link>
            {COMPANY.license && <span>{COMPANY.license}</span>}
          </div>
        </div>
      </div>
    </footer>
  );
}
