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
    }, 6000);
    return () => clearInterval(timer);
  }, [slides]);

  return (
    <section
      className="relative h-screen min-h-[600px] max-h-[1050px] flex items-center justify-center overflow-hidden"
      aria-label="Amulya Builders Hero Section"
    >
      {/* Background Image Slider / Authentic Construction Imagery */}
      <div className="absolute inset-0 z-0 select-none overflow-hidden">
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
                alt={`Construction project slide ${idx + 1}`}
                className="w-full h-full object-cover object-[75%_center]"
                fetchPriority={idx === currentIdx ? "high" : "low"}
              />
            </div>
          ))
        ) : (
          <img
            src="https://images.unsplash.com/photo-1541888946425-d0fbb18615f3?w=2000&q=85"
            alt="Structural steel and modern high-rise building construction in Kathmandu Nepal"
            className="w-full h-full object-cover object-[70%_center] lg:object-[75%_center]"
            fetchPriority="high"
          />
        )}

        {/* Subtle, Bright Contrast Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent z-10" />
      </div>

      {/* Hero Content Container - Vertically Balanced for 1-Frame Viewport */}
      <div className="relative z-20 container-custom w-full pt-20 pb-4 sm:pt-24 sm:pb-6 flex flex-col justify-center">
        <div className="max-w-[700px]">
          
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut', delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 border border-white/20 backdrop-blur-md mb-3 sm:mb-4"
          >
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <span className="text-orange-400 text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em]">
              Construction Company in Kathmandu, Nepal
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
            className="font-display font-black text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-[3.75rem] tracking-tight leading-[1.04] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)] mb-3 sm:mb-4"
          >
            <span>Building With Purpose.</span>
            <br />
            <span className="text-orange-500 drop-shadow-[0_2px_15px_rgba(249,115,22,0.4)]">
              Creating For Generations.
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.3 }}
            className="text-sm sm:text-base md:text-lg text-white/90 drop-shadow-[0_1px_6px_rgba(0,0,0,0.7)] font-normal leading-relaxed mb-5 sm:mb-6 max-w-[620px]"
          >
            Amulya Builders delivers premium residential and commercial construction
            services across Kathmandu and Bagmati Province, Nepal — with integrity,
            craftsmanship, and a commitment to quality that stands the test of time.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut', delay: 0.45 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-5 sm:mb-6 lg:mb-8"
          >
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-semibold text-sm sm:text-base rounded-lg shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 group cursor-pointer"
              aria-label="Request a quote for your construction project"
            >
              <span>Request a Quote</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
            </Link>

            <Link
              to="/projects"
              className="inline-flex items-center justify-center px-6 sm:px-7 py-3 sm:py-3.5 bg-black/25 hover:bg-orange-500/15 active:bg-orange-500/25 text-white hover:text-orange-400 font-semibold text-sm sm:text-base rounded-lg border-2 border-white/80 hover:border-orange-500 backdrop-blur-sm hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
              aria-label="View our completed and ongoing construction projects"
            >
              View Our Projects
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut', delay: 0.55 }}
            className="pt-4 sm:pt-5 border-t border-white/15"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3.5">
              {[
                { icon: ShieldCheck, text: '✓ NBC Compliant Construction' },
                { icon: Award, text: '15+ Years of Excellence' },
                { icon: Users, text: '200+ Happy Clients' },
              ].map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-2.5 px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-lg bg-black/30 border border-white/15 backdrop-blur-md shadow-sm"
                >
                  <Icon className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-orange-500 shrink-0" aria-hidden="true" />
                  <span className="text-xs sm:text-xs md:text-sm font-semibold text-white tracking-wide">
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.a
        href="#stats"
        aria-label="Scroll to statistics section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        className="hidden 2xl:flex absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex-col items-center gap-1 text-slate-400 hover:text-orange-400 transition-colors group cursor-pointer"
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400 group-hover:text-white transition-colors">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-3.5 h-3.5 text-orange-400" aria-hidden="true" />
        </motion.div>
      </motion.a>
    </section>
  );
}
