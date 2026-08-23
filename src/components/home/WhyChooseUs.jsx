import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { WHY_CHOOSE_US, COMPANY } from '@/data';
import { staggerContainer, fadeUp, viewportOnce } from '@/utils/animations';

export default function WhyChooseUs() {
  return (
    <section
      className="section-padding bg-slate-50/50 border-y border-gray-100/50 overflow-hidden"
      aria-label="Why choose Amulya Builders"
    >
      <div className="container-custom">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest block mb-2">WHY CHOOSE US</span>
          <h2 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            The <span className="text-orange-500">Amulya Advantage</span>
          </h2>
          <div className="w-12 h-1 bg-orange-500 rounded-full mx-auto mt-4" />
          <p className="text-gray-500 text-xs md:text-sm mt-4 leading-relaxed max-w-2xl mx-auto">
            We don't just build structures — we build lasting relationships based on trust, transparency, and excellence in every project.
          </p>
        </div>

        {/* 8 Advantage Cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
        >
          {WHY_CHOOSE_US.map((item, i) => {
            const IconComponent = Icons[item.icon] || Icons.Star;
            const isFeatured = item.title === 'Customer-Centric Focus';

            return (
              <motion.div
                key={item.title}
                variants={fadeUp}
                custom={i}
                whileHover={{ y: -8 }}
                className={`relative overflow-hidden p-6 md:p-8 rounded-[22px] shadow-sm hover:shadow-xl transition-all duration-300 border group flex flex-col justify-between min-h-[220px] ${
                  isFeatured 
                    ? 'bg-slate-900 border-slate-800 text-white group-hover:ring-4 group-hover:ring-orange-500/10 group-hover:border-orange-500/30' 
                    : 'bg-white border-gray-100 text-slate-800 hover:ring-4 hover:ring-orange-500/5 hover:border-orange-500/20'
                }`}
              >
                {/* Subtle blueprint decorative grid line overlay */}
                <div className={`absolute top-0 right-0 w-16 h-16 opacity-[0.03] pointer-events-none border-t border-l border-dashed ${isFeatured ? 'border-white' : 'border-slate-900'}`} />
                <div className={`absolute bottom-0 left-0 w-12 h-12 opacity-[0.02] pointer-events-none rounded-tr-2xl border-t border-r ${isFeatured ? 'border-white' : 'border-slate-900'}`} />

                <div>
                  {/* Icon Container */}
                  <div className={`w-11 h-11 rounded-full flex items-center justify-center mb-5 transition-all duration-300 shadow-sm ${
                    isFeatured 
                      ? 'bg-orange-500 text-white' 
                      : 'bg-slate-50 text-slate-700 group-hover:bg-orange-500 group-hover:text-white'
                  }`}>
                    <IconComponent className="w-5 h-5" aria-hidden="true" />
                  </div>

                  {/* Title & Description */}
                  <h3 className={`text-sm font-extrabold mb-2.5 tracking-tight ${
                    isFeatured ? 'text-white' : 'text-slate-900 group-hover:text-orange-500 transition-colors'
                  }`}>
                    {item.title}
                  </h3>
                  
                  <p className={`text-[11px] leading-relaxed font-medium ${
                    isFeatured ? 'text-slate-300' : 'text-gray-500'
                  }`}>
                    {item.description}
                  </p>
                </div>

                {/* Corner decorative accent */}
                <div className={`w-1.5 h-1.5 rounded-full absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                  isFeatured ? 'bg-orange-500' : 'bg-orange-500'
                }`} />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom Trust Element Strip */}
        <div className="border-t border-gray-200/60 mt-16 pt-8">
          <div className="flex flex-wrap items-center justify-center gap-y-4 gap-x-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <Icons.Award className="w-4 h-4 text-orange-500" />
              <span>{COMPANY.stats.yearsExperience} Experience</span>
            </div>
            <div className="h-3 w-px bg-gray-200 hidden sm:block" />
            
            <div className="flex items-center gap-2">
              <Icons.ShieldCheck className="w-4 h-4 text-orange-500" />
              <span>Licensed Professionals</span>
            </div>
            <div className="h-3 w-px bg-gray-200 hidden sm:block" />
            
            <div className="flex items-center gap-2">
              <Icons.Sparkles className="w-4 h-4 text-orange-500" />
              <span>Quality-Assured Materials</span>
            </div>
            <div className="h-3 w-px bg-gray-200 hidden sm:block" />
            
            <div className="flex items-center gap-2">
              <Icons.FileText className="w-4 h-4 text-orange-500" />
              <span>Transparent Pricing</span>
            </div>
            <div className="h-3 w-px bg-gray-200 hidden sm:block" />
            
            <div className="flex items-center gap-2">
              <Icons.Clock className="w-4 h-4 text-orange-500" />
              <span>On-Time Delivery</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
