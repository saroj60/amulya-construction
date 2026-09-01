import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Award, Users } from 'lucide-react';
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
      className="relative min-h-[calc(100vh-1rem)] md:min-h-screen flex flex-col justify-center overflow-hidden bg-slate-950 pt-28 sm:pt-32 md:pt-36 pb-12 sm:pb-16 md:pb-20"
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
                className="w-full h-full object-cover object-[70%_center] lg:object-center"
                fetchPriority={idx === currentIdx ? "high" : "low"}
              />
            </div>
          ))
        ) : (
          <img
            src="https://images.unsplash.com/photo-1541888946425-d0fbb18615f3?w=2000&q=85"
            alt="Structural steel and modern high-rise building construction in Kathmandu Nepal"
            className="w-full h-full object-cover object-[70%_center] lg:object-center"
            fetchPriority="high"
          />
        )}

        {/* High-Contrast Gradient Overlays for Guaranteed Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/45 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/50 z-10 pointer-events-none" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-20 container-custom w-full">
        <div className="max-w-2xl lg:max-w-3xl">
          
          {/* Eyebrow Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut', delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/85 border border-slate-700/80 backdrop-blur-md mb-4 sm:mb-5 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <span className="text-orange-400 text-xs sm:text-xs font-bold uppercase tracking-wider">
              Construction Company in Kathmandu, Nepal
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
            className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.1] text-white mb-4 sm:mb-5"
          >
            <span>Building With Purpose.</span>
            <br />
            <span className="text-orange-500">
              Creating For Generations.
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.3 }}
            className="text-sm sm:text-base md:text-lg text-slate-200 font-normal leading-relaxed mb-6 sm:mb-8 max-w-xl md:max-w-2xl"
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
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-8 sm:mb-10"
          >
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-semibold text-sm sm:text-base rounded-lg shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 group cursor-pointer"
              aria-label="Request a quote for your construction project"
            >
              <span>Request a Quote</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
            </Link>

            <Link
              to="/projects"
              className="inline-flex items-center justify-center px-6 sm:px-7 py-3.5 bg-slate-900/60 hover:bg-slate-800/80 text-white hover:text-orange-400 font-semibold text-sm sm:text-base rounded-lg border border-slate-700 hover:border-orange-500/60 backdrop-blur-sm hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
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
            className="pt-6 border-t border-slate-800/80"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              {[
                { icon: ShieldCheck, text: 'NBC Compliant Construction' },
                { icon: Award, text: '15+ Years of Excellence' },
                { icon: Users, text: '200+ Happy Clients' },
              ].map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-md shadow-sm hover:border-slate-700/80 transition-colors"
                >
                  <Icon className="w-5 h-5 text-orange-500 shrink-0" aria-hidden="true" />
                  <span className="text-xs sm:text-sm font-semibold text-slate-100 tracking-wide">
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
