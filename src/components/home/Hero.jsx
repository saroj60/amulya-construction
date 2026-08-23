import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, ShieldCheck, Award, Users } from 'lucide-react';
import { COMPANY } from '@/data';
import { api } from '@/services/api';

export default function Hero() {
  const [slides, setSlides] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    api.getHeroSlides()
      .then(data => {
        if (data && data.length > 0) {
          setSlides(data);
        }
      })
      .catch(err => console.error('Failed to load hero slides:', err));
  }, []);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIdx(prev => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides]);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Background Image Slider */}
      <div className="absolute inset-0 z-0 bg-black">
        {slides.length > 0 ? (
          slides.map((slide, idx) => (
            <div
              key={slide.id || idx}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                idx === currentIdx ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={slide.image}
                alt={`Hero Slide ${idx + 1}`}
                className="w-full h-full object-cover object-center"
                fetchPriority={idx === currentIdx ? "high" : "low"}
              />
            </div>
          ))
        ) : (
          <img
            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=85"
            alt="Construction site with workers and crane in Kathmandu Nepal"
            className="w-full h-full object-cover object-center"
            fetchPriority="high"
          />
        )}
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/75 z-10" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom w-full text-white py-28 md:py-36 lg:py-44">
        <div className="max-w-3xl">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-2 mb-6"
          >
            <span className="w-8 h-0.5 bg-orange-400 rounded-full" />
            <span className="text-orange-400 text-xs font-bold uppercase tracking-[0.2em]">
              Construction Company in Kathmandu, Nepal
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight mb-6"
          >
            Building Dreams.
            <br />
            <span className="text-orange-400">Creating Landmarks.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-base md:text-xl text-gray-200 leading-relaxed mb-10 max-w-2xl"
          >
            {COMPANY.name} delivers premium residential and commercial construction
            services across Kathmandu and Bagmati Province, Nepal — with integrity,
            craftsmanship, and a commitment to quality that stands the test of time.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="flex flex-wrap gap-4 mb-14"
          >
            <Link
              to="/contact"
              className="btn-primary text-base px-7 py-4"
              aria-label="Request a free construction quote"
            >
              Request a Quote
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </Link>
            <Link
              to="/projects"
              className="btn-secondary text-base px-7 py-4"
              aria-label="View our construction projects"
            >
              View Our Projects
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-wrap items-center gap-6"
          >
            {[
              { icon: ShieldCheck, text: 'NBC Compliant Construction' },
              { icon: Award, text: '15+ Years of Excellence' },
              { icon: Users, text: '200+ Happy Clients' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2">
                <Icon className="w-5 h-5 text-orange-400" aria-hidden="true" />
                <span className="text-sm text-gray-200 font-medium">{text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.a
        href="#stats"
        aria-label="Scroll to statistics section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-white/60 hover:text-white transition-colors"
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-5 h-5" aria-hidden="true" />
        </motion.div>
      </motion.a>
    </section>
  );
}
