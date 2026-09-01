import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import * as Icons from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import { SERVICES, COMPANY } from '@/data';
import { staggerContainer, scaleIn, fadeUp, viewportOnce } from '@/utils/animations';
import { api } from '@/services/api';

export default function ServicesPage() {
  const [services, setServices] = useState(SERVICES);

  useEffect(() => {
    api.getServices()
      .then(data => {
        if (data && data.length > 0) {
          setServices(data);
        }
      })
      .catch(err => {
        console.error('Failed to load services from API, using fallback data:', err);
      });
  }, []);

  return (
    <>
      <Helmet>
        <title>Construction Services | {COMPANY.name} — Kathmandu, Nepal</title>
        <meta
          name="description"
          content="Explore the engineering and building services offered by Amulya Builders in Kathmandu — home building, commercial developments, retrofitting, structural concrete works, interior detailing, and project management."
        />
        <meta
          name="keywords"
          content="Construction Services Nepal, Residential Construction Nepal, Commercial Construction Nepal, House Construction Nepal, Building Design and Construction Nepal, Turnkey Construction Nepal, General Contractor Nepal, Construction Project Management Nepal, Renovation Services Nepal, Building Renovation Kathmandu, Civil Engineering Services Nepal"
        />
        <link rel="canonical" href="https://amulyabuilders.com.np/services" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://amulyabuilders.com.np/services" />
        <meta property="og:title" content={`Construction Services | ${COMPANY.name} — Kathmandu, Nepal`} />
        <meta property="og:description" content="Explore the engineering and building services offered by Amulya Builders in Kathmandu — home building, commercial developments, retrofitting, structural concrete works, interior detailing, and project management." />
        <meta property="og:image" content="https://amulyabuilders.com.np/amulyalogo1.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://amulyabuilders.com.np/services" />
        <meta name="twitter:title" content={`Construction Services | ${COMPANY.name} — Kathmandu, Nepal`} />
        <meta name="twitter:description" content="Explore the engineering and building services offered by Amulya Builders in Kathmandu — home building, commercial developments, retrofitting, structural concrete works, interior detailing, and project management." />
        <meta name="twitter:image" content="https://amulyabuilders.com.np/amulyalogo1.png" />
      </Helmet>

      {/* Page Hero */}
      <section
        className="relative pt-28 pb-16 md:pt-36 md:pb-20 bg-gradient-to-br from-[#012352] via-[#02336e] to-[#011738] text-white overflow-hidden border-b border-white/10"
        aria-label="Services page header"
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#cd0102] to-transparent z-10 opacity-80" />
        <img
          src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1600&q=80"
          alt="Architectural blueprints and design plans"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
          loading="eager"
        />
        <div className="relative z-10 container-custom text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="section-label justify-center"
          >
            <span className="w-5 h-0.5 bg-orange-400" /> Our Services
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
            className="text-3xl md:text-5xl font-extrabold mt-2 mb-4"
          >
            What We Build & Deliver
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="text-gray-300 max-w-xl mx-auto text-base md:text-lg"
          >
            Comprehensive construction solutions for residential, commercial, and institutional needs across Kathmandu and Bagmati Province.
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-white" aria-label="Full services list">
        <div className="container-custom">
          <SectionHeader
            label="All Services"
            title={<>Expert Construction <span className="text-orange-500">Services</span> in Kathmandu</>}
            subtitle="From concept to completion, we offer the full spectrum of construction and engineering services you need to build with confidence."
            center
          />

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer}
          >
            {services.map((service, i) => {
              const IconComponent = Icons[service.icon] || Icons.Wrench;
              return (
                <motion.article
                  key={service.id}
                  variants={scaleIn}
                  className="bg-white border border-gray-100 rounded-2xl overflow-hidden card-shadow group hover:-translate-y-2 transition-all duration-300 hover:shadow-xl cursor-pointer"
                >
                  <Link to={`/contact?service=${encodeURIComponent(service.title)}`} className="block h-full">
                    {/* Image */}
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      {/* Icon Badge */}
                      <div className="absolute bottom-4 left-4 w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                        <IconComponent className="w-6 h-6 text-white" aria-hidden="true" />
                      </div>
                      {/* Number */}
                      <span className="absolute top-4 right-4 text-white/50 text-4xl font-extrabold leading-none">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h2 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">
                        {service.title}
                      </h2>
                      <p className="text-sm text-gray-600 leading-relaxed mb-4">
                        {service.fullDesc}
                      </p>

                      {/* Features */}
                      <ul className="space-y-1.5 mb-5" role="list">
                        {service.features.map((f) => (
                          <li key={f} className="flex items-center gap-2 text-xs text-gray-600 font-medium">
                            <span className="w-1.5 h-1.5 bg-orange-400 rounded-full flex-shrink-0" aria-hidden="true" />
                            {f}
                          </li>
                        ))}
                      </ul>

                      <div
                        className="inline-flex items-center gap-1.5 text-sm font-bold text-orange-500 hover:text-orange-600 group/link"
                        aria-label={`Inquire about ${service.title}`}
                      >
                        Get a Quote for This Service
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" aria-hidden="true" />
                      </div>
                    </div>
                  </Link>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="bg-blue-800 py-14" aria-label="Service inquiry CTA">
        <div className="container-custom text-center text-white">
          <motion.div
            initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeUp}
          >
            <h2 className="text-2xl md:text-3xl font-extrabold mb-3">
              Not Sure Which Service You Need?
            </h2>
            <p className="text-blue-200 mb-7 max-w-lg mx-auto">
              Our team will assess your project requirements and recommend the right services. Book a free consultation today.
            </p>
            <Link to="/contact" className="btn-primary" aria-label="Book a free consultation">
              Book a Free Consultation
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
