import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import * as Icons from 'lucide-react';
import { scaleIn } from '@/utils/animations';

export default function ServiceCard({ service, index }) {
  const IconComponent = Icons[service.icon] || Icons.Wrench;

  return (
    <motion.article
      variants={scaleIn}
      custom={index}
      className="bg-white rounded-2xl overflow-hidden shadow-md group hover:shadow-xl transition-all duration-300 flex flex-col h-full cursor-pointer border border-gray-100"
      whileHover={{ y: -8 }}
    >
      <Link to="/services" className="flex flex-col h-full justify-between">
        <div>
          {/* Image Container with Navy Overlay */}
          <div className="relative h-48 overflow-hidden">
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            {/* Dark Navy Overlay */}
            <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/30 transition-colors duration-300" />
            
            {/* Orange Modern Icon Badge (Circular) */}
            <div className="absolute bottom-4 left-4 w-11 h-11 bg-orange-500 rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 text-white">
              <IconComponent className="w-5.5 h-5.5" aria-hidden="true" />
            </div>

            {/* Staggered Index Number */}
            <span className="absolute top-4 right-4 text-white/30 text-3xl font-black leading-none select-none">
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>

          {/* Text Content */}
          <div className="p-6 space-y-3">
            <h3 className="text-base font-extrabold text-slate-900 group-hover:text-orange-500 transition-colors">
              {service.title}
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
              {service.shortDesc}
            </p>

            {/* Short tags (Max 3) */}
            <div className="flex flex-wrap gap-1.5 pt-2">
              {service.features.slice(0, 3).map((f) => (
                <span
                  key={f}
                  className="text-[10px] bg-orange-500/5 text-orange-950 font-bold px-2.5 py-0.5 rounded-full border border-orange-500/10"
                >
                  {f}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Card Footer Link */}
        <div className="p-6 pt-0">
          <div className="inline-flex items-center gap-1 text-[11px] font-black text-orange-500 uppercase tracking-wider group/link">
            Learn More
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1.5" aria-hidden="true" />
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
