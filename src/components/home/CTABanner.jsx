import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle, Phone, Star, Shield, Clock } from 'lucide-react';
import { COMPANY } from '@/data';
import { fadeLeft, fadeRight, viewportOnce } from '@/utils/animations';

const trustStats = [
  { icon: Star, value: '250+', label: 'Projects Delivered' },
  { icon: Shield, value: '15+', label: 'Years of Excellence' },
  { icon: Clock, value: '100%', label: 'On-Time Handover' },
];

export default function CTABanner() {
  return (
    <section
      className="relative overflow-hidden bg-slate-950"
      aria-label="Call to action"
    >
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=80"
          alt="Modern construction building background"
          className="w-full h-full object-cover opacity-20"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900/95 to-slate-950/90" />
      </div>

      {/* Decorative top accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent z-10 opacity-60" />
      <div className="absolute top-0 left-1/4 w-px h-full bg-orange-500/5 z-0" />
      <div className="absolute top-0 right-1/4 w-px h-full bg-orange-500/5 z-0" />

      {/* Main CTA content */}
      <div className="relative z-10 container-custom py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left: Text Content */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeLeft}
            className="text-white"
          >
            <span className="inline-flex items-center gap-2 text-orange-400 text-[10px] font-black uppercase tracking-[0.25em] mb-5">
              <span className="w-6 h-0.5 bg-orange-400 rounded-full" />
              Start Your Project Today
              <span className="w-6 h-0.5 bg-orange-400 rounded-full" />
            </span>

            <h2 className="text-3xl md:text-5xl font-black leading-tight mb-5 tracking-tight">
              Ready to Build<br />
              Something{' '}
              <span className="text-orange-500">Extraordinary?</span>
            </h2>

            <div className="w-16 h-1 bg-orange-500 rounded-full mb-6" />

            <p className="text-sm md:text-base text-gray-400 leading-relaxed mb-8 max-w-lg">
              Whether it's your dream home, a commercial complex, or a renovation project — our
              team is ready to bring your vision to life in Kathmandu, Nepal. Get a free consultation
              and detailed quote today.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-extrabold text-sm rounded-xl transition-all shadow-lg hover:shadow-orange-500/25 hover:-translate-y-0.5 cursor-pointer"
                aria-label="Request a free construction quote"
              >
                Request a Free Quote
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <a
                href={`https://wa.me/${COMPANY.whatsapp.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/10 hover:bg-white/15 border border-white/20 hover:border-green-500/50 text-white font-extrabold text-sm rounded-xl transition-all hover:-translate-y-0.5 cursor-pointer"
                aria-label="Chat with us on WhatsApp"
              >
                <MessageCircle className="w-4 h-4 text-green-400" aria-hidden="true" />
                Chat on WhatsApp
              </a>
            </div>
          </motion.div>

          {/* Right: Trust Stat Cards */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeRight}
            className="space-y-5"
          >
            {trustStats.map(({ icon: Icon, value, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.45, delay: i * 0.12 }}
                className="flex items-center gap-5 bg-white/5 hover:bg-white/8 border border-white/10 hover:border-orange-500/30 rounded-2xl px-6 py-5 transition-all duration-300 group cursor-default"
              >
                <div className="w-11 h-11 bg-orange-500/15 group-hover:bg-orange-500/25 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors">
                  <Icon className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <span className="text-2xl font-black text-white block leading-none">{value}</span>
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mt-0.5 block">{label}</span>
                </div>
                <div className="ml-auto w-5 h-5 rounded-full border border-white/10 group-hover:border-orange-500/40 flex items-center justify-center transition-colors">
                  <ArrowRight className="w-3 h-3 text-gray-600 group-hover:text-orange-400 transition-colors" />
                </div>
              </motion.div>
            ))}

            {/* Phone contact strip */}
            <div className="bg-orange-500 rounded-2xl px-6 py-4 flex items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-black text-orange-100 uppercase tracking-widest block">Call us directly</span>
                <a
                  href={`tel:${COMPANY.phone}`}
                  className="text-white font-black text-base tracking-tight hover:text-orange-100 transition-colors"
                >
                  {COMPANY.phone}
                </a>
              </div>
              <a
                href={`tel:${COMPANY.phone}`}
                className="w-11 h-11 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center transition-colors flex-shrink-0"
                aria-label="Call us now"
              >
                <Phone className="w-5 h-5 text-white" />
              </a>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Bottom WhatsApp quick contact bar */}
      <div className="relative z-10 border-t border-white/10 bg-green-600/90 backdrop-blur-sm">
        <div className="container-custom py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="flex items-center gap-2 text-white text-xs font-bold">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
            Quick Questions? Chat directly with our engineering team
          </span>
          <a
            href={`https://wa.me/${COMPANY.whatsapp.replace(/\D/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white font-black text-xs bg-white/15 hover:bg-white/25 px-4 py-2 rounded-lg transition-all cursor-pointer"
            aria-label="WhatsApp our team"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            {COMPANY.whatsapp}
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
