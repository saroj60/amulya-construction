import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, FileText, Users, Calendar, Ruler, Headphones, 
  ArrowRight, PhoneCall, Home, Sparkles 
} from 'lucide-react';
import { COMPANY } from '@/data';
import { fadeLeft, fadeRight, viewportOnce } from '@/utils/animations';

const HIGHLIGHTS = [
  { title: 'Licensed & NBC-compliant construction', icon: ShieldCheck },
  { title: 'Transparent pricing with detailed BOQ', icon: FileText },
  { title: '15+ years serving Kathmandu & Bagmati Province', icon: Users },
  { title: 'Timely project delivery with quality assurance', icon: Calendar },
  { title: 'In-house architects and structural engineers', icon: Ruler },
  { title: 'Post-construction support & warranty', icon: Headphones },
];

export default function AboutPreview() {
  return (
    <section
      className="section-padding bg-white overflow-hidden"
      aria-label="About company preview"
    >
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: Asymmetric Images Grid with dark navy border accent */}
          <motion.div
            className="lg:col-span-6 relative flex pl-4 border-l-4 border-slate-900"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeLeft}
          >
            <div className="grid grid-cols-2 gap-4 w-full relative z-10">
              
              {/* Left Column */}
              <div className="space-y-4">
                {/* 1. Planning with Precision */}
                <div className="relative rounded-2xl overflow-hidden h-60 shadow-md group">
                  <img
                    src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80"
                    alt="Architect planning blueprint"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-4 flex gap-2.5 items-end">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-orange-500 flex-shrink-0 shadow-sm">
                      <Ruler className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-[11px] font-bold text-white leading-tight">Planning with Precision</h4>
                      <p className="text-[9px] text-gray-300 mt-0.5 leading-tight">Every project starts with a strong plan.</p>
                    </div>
                  </div>
                </div>

                {/* 3. Designed for Living */}
                <div className="relative rounded-2xl overflow-hidden h-52 shadow-md group">
                  <img
                    src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80"
                    alt="Luxury modern living room interior finished construction"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-4 flex gap-2.5 items-end">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-orange-500 flex-shrink-0 shadow-sm">
                      <Home className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-[11px] font-bold text-white leading-tight">Designed for Living</h4>
                      <p className="text-[9px] text-gray-300 mt-0.5 leading-tight">Thoughtful designs that blend comfort and functionality.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column (Offset Downward) */}
              <div className="space-y-4 pt-8">
                {/* 2. Built with Quality */}
                <div className="relative rounded-2xl overflow-hidden h-60 shadow-md group">
                  <img
                    src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&q=80"
                    alt="Construction site rebar framework quality materials"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-4 flex gap-2.5 items-end">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-orange-500 flex-shrink-0 shadow-sm">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-[11px] font-bold text-white leading-tight">Built with Quality</h4>
                      <p className="text-[9px] text-gray-300 mt-0.5 leading-tight">We use certified materials and proven construction methods.</p>
                    </div>
                  </div>
                </div>

                {/* 4. Delivering Peace of Mind */}
                <div className="relative rounded-2xl overflow-hidden h-52 shadow-md group">
                  <img
                    src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80"
                    alt="Handover custom residential building completed"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-4 flex gap-2.5 items-end">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-orange-500 flex-shrink-0 shadow-sm">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-[11px] font-bold text-white leading-tight">Delivering Peace of Mind</h4>
                      <p className="text-[9px] text-gray-300 mt-0.5 leading-tight">On-time delivery, transparency and complete support.</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Experience Floating Badge in center of grid */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-3xl p-4 shadow-xl border-4 border-white text-center w-28 h-28 flex flex-col justify-center items-center">
              <span className="text-3xl font-black leading-none">{COMPANY.stats.yearsExperience}+</span>
              <span className="text-[9px] font-black uppercase tracking-widest mt-1.5 text-orange-100">Years of</span>
              <span className="text-[9px] font-black uppercase tracking-widest leading-none text-orange-100">Excellence</span>
            </div>
          </motion.div>

          {/* Right: Rich Company Bio Text and Points */}
          <motion.div
            className="lg:col-span-6 space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeRight}
          >
            <div>
              <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest block mb-1">About Amulya Builders</span>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                Kathmandu’s Most Trusted<br />Construction <span className="text-orange-500">Partner</span>
              </h2>
              <div className="w-12 h-1 bg-orange-500 rounded-full mt-3.5" />
            </div>

            <div className="space-y-4 text-xs text-gray-600 leading-relaxed font-medium">
              <p>
                Founded in 2009, Amulya Builders has grown from a small local contractor
                into one of Kathmandu's most respected construction companies. We specialize in delivering
                residential homes, commercial buildings, and renovation projects across Kathmandu District
                and Bagmati Province.
              </p>
              <p>
                Our multidisciplinary team of licensed civil engineers, architects, and project managers
                ensures every project meets Nepal's National Building Code standards, is built with
                certified materials, and is delivered with transparency from first consultation to final handover.
              </p>
            </div>

            {/* highlights grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              {HIGHLIGHTS.map((h) => (
                <div key={h.title} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-600 flex-shrink-0">
                    <h.icon className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-700 leading-normal">{h.title}</span>
                </div>
              ))}
            </div>

            {/* Have a Project in Mind CTA Strip */}
            <div className="bg-gray-50/70 border border-gray-100 rounded-3xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-slate-950 flex items-center justify-center text-white flex-shrink-0 shadow-md">
                  <PhoneCall className="w-4.5 h-4.5" />
                </div>
                <div className="text-center sm:text-left">
                  <h4 className="text-xs font-bold text-slate-950">Have a Project in Mind?</h4>
                  <p className="text-[10px] text-gray-500 leading-tight mt-0.5">Let's build something great together. Contact us today.</p>
                </div>
              </div>
              <Link
                to="/contact"
                className="bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-extrabold text-xs px-5 py-3 rounded-xl transition-all shadow flex items-center gap-1.5 flex-shrink-0"
              >
                Get Free Consultation
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
