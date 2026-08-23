import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Heart, Sparkles, Building2, Paintbrush, 
  Hammer, ChevronRight, Bed, Clock, ShieldCheck 
} from 'lucide-react';
import { COMPANY } from '@/data';
import { api } from '@/services/api';
import SectionHeader from '../components/ui/SectionHeader';
import { staggerContainer } from '@/utils/animations';

const CATEGORIES = ['All', 'Modern', 'Traditional', 'Classical', 'Sloped Roof', 'Eco-Friendly'];

export default function HouseStylesPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [stylesList, setStylesList] = useState([]);
  const [favorites, setFavorites] = useState({});

  useEffect(() => {
    api.getHouseStyles()
      .then((data) => setStylesList(data))
      .catch((err) => console.error(err));
  }, []);

  const filteredStyles = activeCategory === 'All'
    ? stylesList
    : stylesList.filter((style) => style.category === activeCategory);

  const toggleFavorite = (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorites(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <>
      <Helmet>
        <title>Architectural Designs | {COMPANY.name} — Kathmandu, Nepal</title>
        <meta
          name="description"
          content="Explore various house architectural styles constructed by Amulya Builders in Kathmandu, Nepal. Custom modern contemporary villas, traditional Newari brickwork, classic colonial mansions, and eco-friendly designs."
        />
        <meta
          name="keywords"
          content="Building Design and Construction Nepal, Modern house construction company Nepal, architectural designs Nepal, modern house designs Kathmandu, turnkey house design Nepal, classical house design Kathmandu"
        />
        <link rel="canonical" href="https://amulyabuilders.com.np/designs" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://amulyabuilders.com.np/designs" />
        <meta property="og:title" content={`Architectural Designs | ${COMPANY.name} — Kathmandu, Nepal`} />
        <meta property="og:description" content="Explore various house architectural styles constructed by Amulya Builders in Kathmandu, Nepal. Custom modern contemporary villas, traditional Newari brickwork, classic colonial mansions, and eco-friendly designs." />
        <meta property="og:image" content="https://amulyabuilders.com.np/amulyalogo.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://amulyabuilders.com.np/designs" />
        <meta name="twitter:title" content={`Architectural Designs | ${COMPANY.name} — Kathmandu, Nepal`} />
        <meta name="twitter:description" content="Explore various house architectural styles constructed by Amulya Builders in Kathmandu, Nepal. Custom modern contemporary villas, traditional Newari brickwork, classic colonial mansions, and eco-friendly designs." />
        <meta name="twitter:image" content="https://amulyabuilders.com.np/amulyalogo.png" />
      </Helmet>

      {/* Page Hero */}
      <section
        className="relative pt-28 pb-16 md:pt-36 md:pb-20 bg-slate-900 text-white overflow-hidden"
        aria-label="Architectural designs hero banner"
      >
        <img
          src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1600&q=80"
          alt="Architectural house plans and drafting tools"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
          loading="eager"
        />
        <div className="relative z-10 container-custom text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="section-label justify-center text-orange-400"
          >
            <span className="w-5 h-0.5 bg-orange-400" /> Architectural Design
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-3xl md:text-5xl font-black mt-2 mb-4 leading-tight text-white"
          >
            Explore Our Architectural Designs
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-gray-300 max-w-xl mx-auto text-xs md:text-sm leading-relaxed"
          >
            Discover the ideal architectural style for your custom home in Kathmandu Valley. From timeless traditional craftsmanship to clean contemporary profiles.
          </motion.p>
        </div>
      </section>

      {/* Main Styles Showcase Section */}
      <section className="section-padding bg-slate-50/50 border-b border-gray-150/50" aria-label="House styles showcase">
        <div className="container-custom">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
            <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest block mb-2">OUR DESIGN COLLECTION</span>
            <h2 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              Find Your <span className="text-orange-500">Perfect Home Style</span>
            </h2>
            <div className="w-12 h-1 bg-orange-500 rounded-full mx-auto mt-4" />
            <p className="text-gray-500 text-xs md:text-sm mt-4 leading-relaxed max-w-2xl mx-auto">
              Explore architectural styles designed for modern living, Nepal's climate, and your personal lifestyle.
            </p>
          </div>

          {/* Category Filters */}
          <div className="flex flex-nowrap md:flex-wrap justify-start md:justify-center gap-2 mb-12 overflow-x-auto pb-3 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 text-xs font-bold rounded-full border transition-all duration-300 flex-shrink-0 cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-slate-900 border-slate-900 text-white shadow-md'
                    : 'bg-white border-gray-200 text-slate-700 hover:border-slate-900 hover:text-slate-900'
                }`}
                aria-pressed={activeCategory === cat}
              >
                {cat}
              </button>
            ))}
          </div>

          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <AnimatePresence mode="popLayout">
              {filteredStyles.map((style, idx) => {
                const isFeatured = idx === 0 && activeCategory === 'All';
                const bedrooms = style.specifications?.['Bedrooms'] || style.specifications?.['Bedroom'] || '4 BHK';
                const buildTime = style.specifications?.['Est. Build Time'] || '12-15 Months';

                return (
                  <motion.article
                    key={style.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    whileHover={{ y: -8 }}
                    className="bg-white rounded-[24px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col justify-between group h-full relative"
                  >
                    
                    <div className="h-52 w-full overflow-hidden relative">
                      <img
                        src={style.image}
                        alt={style.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="bg-white/95 text-slate-900 text-[10px] font-black uppercase tracking-wider px-4 py-2 rounded-xl shadow-md transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                          View Design
                        </span>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                      <div className="absolute top-3 left-3 flex gap-1.5 items-center">
                        <span className="bg-orange-500 text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg shadow-sm">
                          {style.category}
                        </span>
                        {isFeatured && (
                          <span className="bg-slate-900 text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg shadow-sm flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-orange-400" /> Featured Design
                          </span>
                        )}
                      </div>
                      <button
                        onClick={(e) => toggleFavorite(style.id, e)}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md text-white hover:text-rose-500 hover:bg-white flex items-center justify-center transition-all shadow-sm z-10 cursor-pointer"
                        aria-label="Add to favorites"
                      >
                        <Heart className={`w-4 h-4 ${favorites[style.id] ? 'fill-rose-500 text-rose-500' : ''}`} />
                      </button>
                    </div>

                    <div className="p-6 flex-grow flex flex-col justify-between">
                      <div className="space-y-3">
                        <h3 className="text-base font-extrabold text-slate-900 group-hover:text-orange-500 transition-colors leading-tight">
                          {style.title}
                        </h3>
                        <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">
                          {style.description}
                        </p>

                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 pt-3 border-t border-gray-100/80">
                          <div className="flex items-center gap-1.5">
                            <Bed className="w-3.5 h-3.5 text-orange-500 flex-shrink-0" />
                            <span className="text-[10px] font-bold text-slate-700">{bedrooms}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-orange-500 flex-shrink-0" />
                            <span className="text-[10px] font-bold text-slate-700">{buildTime}</span>
                          </div>
                          <div className="flex items-center gap-1.5 col-span-2">
                            <ShieldCheck className="w-3.5 h-3.5 text-orange-500 flex-shrink-0" />
                            <span className="text-[10px] font-bold text-slate-700">Seismic NBC-Compliant</span>
                          </div>
                        </div>
                      </div>

                      <div className="pt-5 mt-5 border-t border-gray-100/80">
                        <Link
                          to={`/designs/${style.id}`}
                          className="inline-flex items-center gap-1 text-[11px] font-black text-orange-500 hover:text-orange-600 uppercase tracking-wider group/link"
                          aria-label={`Explore details of ${style.title}`}
                        >
                          Explore Design
                          <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Architect Process Section */}
      <section className="section-padding bg-white" aria-label="Architectural design process">
        <div className="container-custom">
          <SectionHeader
            label="How We Work"
            title="Customizing Your Architectural Vision"
            subtitle="Every house we build is custom-designed. Our structural engineers and architects integrate local land layouts, municipal regulations, and your unique lifestyle needs."
            center
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-xl p-8 relative flex flex-col group hover:bg-slate-900 transition-colors duration-300">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-orange-500 transition-colors duration-300">
                <Paintbrush className="w-6 h-6 text-orange-500 group-hover:text-white transition-colors duration-300" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 group-hover:text-white mb-3 transition-colors">1. Architectural Concept</h3>
              <p className="text-gray-600 group-hover:text-slate-300 text-sm leading-relaxed mb-4 transition-colors">
                Share your ideas, floor count requirements, and style preferences. We prepare structural briefs and 3D architectural mockups.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-8 relative flex flex-col group hover:bg-slate-900 transition-colors duration-300">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-orange-500 transition-colors duration-300">
                <Building2 className="w-6 h-6 text-blue-700 group-hover:text-white transition-colors duration-300" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 group-hover:text-white mb-3 transition-colors">2. Structural Drafting</h3>
              <p className="text-gray-600 group-hover:text-slate-300 text-sm leading-relaxed mb-4 transition-colors">
                Our civil engineers draft detailed layouts to ensure seismic resistance compliant with Bagmati building code standards.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-8 relative flex flex-col group hover:bg-slate-900 transition-colors duration-300">
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-orange-500 transition-colors duration-300">
                <Hammer className="w-6 h-6 text-green-700 group-hover:text-white transition-colors duration-300" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 group-hover:text-white mb-3 transition-colors">3. Turnkey Execution</h3>
              <p className="text-gray-600 group-hover:text-slate-300 text-sm leading-relaxed mb-4 transition-colors">
                Our building contractors manage site excavation, RCC framing, and final styling, delivering your key on time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Redesigned bottom CTA */}
      <section className="bg-slate-900 text-white relative py-16 md:py-24 overflow-hidden" aria-label="Call to action">
        <div className="absolute inset-0 z-0 opacity-10 bg-[radial-gradient(#f97316_1px,transparent_1px)] [background-size:16px_1px]" />
        <div className="container-custom relative z-10 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <span className="text-[10px] font-black text-orange-400 uppercase tracking-widest block">Can't Find Your Ideal Design?</span>
            <h2 className="text-3xl md:text-5xl font-black leading-tight text-white">
              Let's create a custom home designed specifically for your land, lifestyle, and budget.
            </h2>
            <p className="text-gray-400 text-xs md:text-sm leading-relaxed max-w-lg mx-auto">
              Our professional design architects and licensed structural engineers can combine features or build a fully personalized architectural style.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link to="/contact" className="w-full sm:w-auto px-8 py-3.5 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-extrabold text-xs rounded-xl transition-all shadow hover:shadow-orange-500/20 text-center flex items-center justify-center gap-1.5 cursor-pointer">
                Request Custom Design
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
