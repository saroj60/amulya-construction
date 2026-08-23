import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TestimonialCard({ testimonial, index, isFeatured }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className={`relative overflow-hidden rounded-[22px] p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-300 border flex flex-col justify-between h-full group ${
        isFeatured 
          ? 'bg-slate-900 border-slate-800 text-white hover:ring-4 hover:ring-orange-500/10 hover:border-orange-500/30' 
          : 'bg-white border-gray-100 text-slate-850 hover:ring-4 hover:ring-orange-500/5 hover:border-orange-500/20'
      }`}
    >
      {/* Subtle blueprint decorative grid line overlay */}
      <div className={`absolute top-0 right-0 w-16 h-16 opacity-[0.03] pointer-events-none border-t border-l border-dashed ${isFeatured ? 'border-white' : 'border-slate-900'}`} />
      <div className={`absolute bottom-0 left-0 w-12 h-12 opacity-[0.02] pointer-events-none rounded-tr-2xl border-t border-r ${isFeatured ? 'border-white' : 'border-slate-900'}`} />

      <div className="space-y-4">
        {/* Quote Icon & Stars */}
        <div className="flex justify-between items-start">
          <Quote className={`w-8 h-8 ${isFeatured ? 'text-orange-500 fill-orange-500/25' : 'text-orange-500/25 fill-orange-500/10'}`} aria-hidden="true" />
          
          <div className="flex gap-0.5" aria-label={`${testimonial.rating || 5} out of 5 stars`}>
            {[...Array(testimonial.rating || 5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 text-orange-500 fill-orange-500" aria-hidden="true" />
            ))}
          </div>
        </div>

        {/* Testimonial Text */}
        <p className={`text-xs md:text-sm leading-relaxed italic font-medium ${isFeatured ? 'text-slate-200' : 'text-gray-600'}`}>
          &ldquo;{testimonial.text}&rdquo;
        </p>
      </div>

      {/* Thin Divider & Author Info */}
      <div className="mt-6 pt-5 border-t border-gray-200/20 flex items-center gap-3">
        {/* Avatar */}
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-xs flex-shrink-0 shadow-sm transition-colors duration-300 ${
            isFeatured 
              ? 'bg-orange-500 text-white' 
              : 'bg-slate-100 text-slate-800 group-hover:bg-orange-500 group-hover:text-white'
          }`}
          aria-hidden="true"
        >
          {testimonial.avatar || (testimonial.name ? testimonial.name.split(' ').map(n => n[0]).join('') : 'KA')}
        </div>

        <div>
          <p className={`text-xs font-black tracking-tight ${isFeatured ? 'text-white' : 'text-slate-900'}`}>
            {testimonial.name}
          </p>
          <p className={`text-[10px] ${isFeatured ? 'text-slate-400' : 'text-gray-400'} font-bold`}>
            {testimonial.designation}
          </p>
          <p className="text-[10px] text-orange-500 font-extrabold tracking-wider mt-0.5">
            {testimonial.location}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
