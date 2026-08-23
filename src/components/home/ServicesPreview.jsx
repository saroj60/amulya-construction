import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';
import ServiceCard from '../ui/ServiceCard';
import { SERVICES } from '@/data';
import { staggerContainer, viewportOnce } from '@/utils/animations';
import { api } from '@/services/api';

export default function ServicesPreview() {
  const [services, setServices] = useState(SERVICES);

  useEffect(() => {
    api.getServices()
      .then(data => {
        if (data && data.length > 0) {
          setServices(data);
        }
      })
      .catch(err => {
        console.error('Failed to load services from API for home preview:', err);
      });
  }, []);
  return (
    <section
      className="section-padding bg-gray-50/50"
      aria-label="Our construction services"
    >
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
          <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest block mb-2">WHAT WE DO</span>
          <h2 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            Complete Construction Solutions
          </h2>
          <div className="w-12 h-1 bg-orange-500 rounded-full mx-auto mt-4" />
          <p className="text-gray-505 text-xs md:text-sm mt-4 leading-relaxed">
            From architectural design to project completion, we deliver reliable solutions with quality, precision, and transparency.
          </p>
        </div>

        {/* Cards Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
        >
          {services.slice(0, 4).map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </motion.div>

        {/* Centered Bottom CTA */}
        <div className="text-center mt-10 md:mt-12">
          <Link
            to="/services"
            className="inline-flex items-center gap-1.5 px-6 py-3.5 bg-orange-500 hover:bg-orange-655 active:bg-orange-700 text-white font-extrabold text-xs rounded-xl transition-all shadow hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
            aria-label="View all construction services"
          >
            View All Services
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
