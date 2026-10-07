import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, ShieldCheck, Award, Compass, MapPin,
  ChevronLeft, ChevronRight, Eye
} from 'lucide-react';
import { api } from '@/services/api';
import { PROJECTS } from '@/data';

export default function Hero() {
  const [projectSlides, setProjectSlides] = useState(PROJECTS);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    api.getProjects()
      .then(data => {
        if (data && Array.isArray(data) && data.length > 0) {
          setProjectSlides(data);
        }
      })
      .catch(err => {
        console.error('Failed to load projects for hero slider, using local fallback:', err);
      });
  }, []);

  useEffect(() => {
    if (projectSlides.length <= 1 || isPaused) return;
    const timer = setInterval(() => {
      setCurrentIdx(prev => (prev + 1) % projectSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [projectSlides.length, isPaused]);

  const prevSlide = () => {
    setCurrentIdx(prev => (prev === 0 ? projectSlides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIdx(prev => (prev + 1) % projectSlides.length);
  };

  const activeProject = projectSlides[currentIdx] || projectSlides[0];

  return (
    <section
      className="relative min-h-[calc(100vh-1rem)] md:min-h-screen flex flex-col justify-center overflow-hidden bg-slate-950 pt-28 sm:pt-32 md:pt-36 pb-12 sm:pb-16 md:pb-20"
      aria-label="Amulya Builders Design and Construction Hero Section"
    >
      {/* Background Project Images Slider */}
      <div className="absolute inset-0 z-0 select-none overflow-hidden">
        {projectSlides.map((slide, idx) => (
          <div
            key={slide.id || idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentIdx ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <img
              src={slide.image}
              alt={`${slide.title} — ${slide.category} project by Amulya Builders`}
              className="w-full h-full object-cover object-center scale-105 transition-transform duration-10000 ease-out"
              fetchPriority={idx === 0 ? "high" : "low"}
            />
          </div>
        ))}

        {/* Gradient Overlays: deep on text side, transparent toward right to let project architecture shine */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/65 to-slate-950/25 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-slate-950/30 z-10 pointer-events-none" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-20 container-custom w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headlines & Main CTAs */}
          <div className="lg:col-span-8 max-w-2xl lg:max-w-none">
            
            {/* Eyebrow Badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut', delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/70 backdrop-blur-md mb-4 sm:mb-5 shadow-md"
            >
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              <span className="text-orange-400 text-xs sm:text-xs font-bold uppercase tracking-wider">
                Nepal's Most Trusted Design & Construction Company • Inside & Outside Valley
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
              className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.1] text-white drop-shadow-md mb-4 sm:mb-5"
            >
              <span>Innovative Design.</span>
              <br />
              <span className="text-orange-500 drop-shadow-sm">
                Enduring Construction.
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.3 }}
              className="text-sm sm:text-base md:text-lg text-slate-100 font-medium leading-relaxed drop-shadow-sm mb-6 sm:mb-8 max-w-xl md:max-w-2xl"
            >
              As Nepal's most trusted construction and design company, Amulya Builders delivers complete architectural design, 3D modeling, and turnkey residential & commercial construction services — proudly serving clients <strong className="text-orange-400 font-bold">inside and outside Kathmandu Valley across Nepal</strong> with earthquake-resistant engineering and superior craftsmanship.
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
                aria-label="Request a quote for your design and construction project"
              >
                <span>Request a Quote</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
              </Link>

              <Link
                to="/projects"
                className="inline-flex items-center justify-center px-6 sm:px-7 py-3.5 bg-slate-900/70 hover:bg-slate-800 text-white hover:text-orange-400 font-semibold text-sm sm:text-base rounded-lg border border-slate-700 hover:border-orange-500/60 backdrop-blur-sm hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
                aria-label="Explore completed construction projects"
              >
                Browse All Projects
              </Link>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut', delay: 0.55 }}
              className="pt-6 border-t border-slate-800/80"
            >
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
                {[
                  { icon: Compass, text: 'Architectural & 3D Design' },
                  { icon: ShieldCheck, text: 'NBC Code Compliant' },
                  { icon: MapPin, text: 'Inside & Outside Valley' },
                  { icon: Award, text: '15+ Years Excellence' },
                ].map(({ icon: Icon, text }) => (
                  <div
                    key={text}
                    className="flex items-center gap-2.5 sm:gap-3 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-md shadow-sm hover:border-slate-700/80 transition-colors"
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 shrink-0" aria-hidden="true" />
                    <span className="text-[11px] sm:text-xs md:text-sm font-semibold text-slate-100 tracking-wide">
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>

          {/* Right Column: Sliding Project Spotlight Card & Interactive Controls */}
          {activeProject && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="lg:col-span-4 flex flex-col items-start lg:items-end gap-3.5"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {/* Spotlight Glass Card */}
              <Link
                to={`/projects/${activeProject.id}`}
                className="group w-full max-w-md p-3 sm:p-4 rounded-2xl bg-slate-900/80 hover:bg-slate-900/95 border border-slate-700/80 hover:border-orange-500/80 backdrop-blur-md shadow-2xl transition-all duration-300 block cursor-pointer"
                aria-label={`View ${activeProject.title} project details`}
              >
                <div className="flex items-center gap-3.5 sm:gap-4">
                  {/* Thumbnail */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 border border-slate-700 relative bg-slate-800">
                    <img
                      src={activeProject.image}
                      alt={activeProject.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/80 text-[10px] font-black text-white">
                      #{currentIdx + 1}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] uppercase font-black tracking-wider text-orange-400">
                        Featured Project
                      </span>
                      <span className="w-1 h-1 rounded-full bg-slate-500" />
                      <span className="text-[10px] text-slate-300 font-bold">
                        {activeProject.category}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-black text-white truncate group-hover:text-orange-400 transition-colors">
                      {activeProject.title}
                    </h3>

                    {activeProject.location ? (
                      <p className="text-xs text-slate-300 truncate flex items-center gap-1.5 mt-1 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                        {activeProject.location}
                      </p>
                    ) : (
                      <p className="text-xs text-slate-400 truncate flex items-center gap-1.5 mt-1 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        <span className="italic text-slate-400">Location: —</span>
                      </p>
                    )}
                  </div>

                  {/* Action Arrow */}
                  <div className="shrink-0 w-9 h-9 rounded-full bg-orange-500 group-hover:bg-orange-600 text-white flex items-center justify-center transition-colors shadow">
                    <Eye className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  </div>
                </div>
              </Link>

              {/* Slider Navigation Controls */}
              <div className="flex items-center justify-between w-full max-w-md px-3 py-2 rounded-xl bg-slate-900/80 border border-slate-800/90 backdrop-blur-md shadow-lg">
                {/* Previous Button */}
                <button
                  onClick={prevSlide}
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-orange-500 text-white flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Previous project image"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {/* Progress Indicators / Counter */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-extrabold text-white">
                    <strong className="text-orange-400 text-sm">
                      {String(currentIdx + 1).padStart(2, '0')}
                    </strong>
                    <span className="text-slate-500 mx-1.5">/</span>
                    <span className="text-slate-400">
                      {String(projectSlides.length).padStart(2, '0')}
                    </span>
                  </span>

                  {/* Mini thumbnail jump dots for quick preview */}
                  <div className="hidden sm:flex items-center gap-1 ml-2">
                    {projectSlides.slice(0, 8).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentIdx(i)}
                        className={`h-1.5 rounded-full transition-all cursor-pointer ${
                          i === currentIdx
                            ? 'w-5 bg-orange-500'
                            : 'w-1.5 bg-slate-700 hover:bg-slate-500'
                        }`}
                        aria-label={`Go to slide ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Next Button */}
                <button
                  onClick={nextSlide}
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-orange-500 text-white flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Next project image"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </motion.div>
          )}

        </div>
      </div>
    </section>
  );
}
