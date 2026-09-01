import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  CheckCircle, Target, Eye, Heart, ArrowRight, Award, Users, Building2, Clock,
} from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import StatCounter from '../components/ui/StatCounter';
import { COMPANY } from '@/data';
import { api } from '@/services/api';
import { fadeUp, fadeLeft, fadeRight, staggerContainer, viewportOnce } from '@/utils/animations';

const values = [
  { icon: Award, title: 'Integrity', desc: 'We do what we say. Honest communication and transparent pricing are non-negotiable at every stage.' },
  { icon: CheckCircle, title: 'Quality', desc: 'We use only certified, high-grade materials and industry-best construction practices on every project.' },
  { icon: Clock, title: 'Punctuality', desc: 'Your time matters. We maintain strict project schedules and have a 95% on-time delivery record.' },
  { icon: Heart, title: 'Client-First', desc: 'Every decision we make is guided by our clients\' satisfaction, comfort, and long-term benefit.' },
];

const statsConfig = [
  { value: 'projectsCompleted', label: 'Projects Completed', icon: Building2 },
  { value: 'yearsExperience', label: 'Years of Experience', icon: Clock },
  { value: 'happyClients', label: 'Happy Clients', icon: Users },
  { value: 'professionals', label: 'Professionals', icon: Award },
];

const trustPoints = [
  'Licensed engineering and design team',
  'Full compliance with Nepal National Building Code (NBC)',
  'Earthquake-resistant construction for seismic Zone V',
  'Transparent pricing with detailed Bill of Quantities',
  'Dedicated project manager for every client',
  'Post-completion warranty and support',
  '100% locally owned and operated in Kathmandu',
  'Clean safety record across all project sites',
];

export default function AboutPage() {
  const [teamList, setTeamList] = useState([]);
  const [projectCount, setProjectCount] = useState(COMPANY.stats.projectsCompleted);

  useEffect(() => {
    api.getTeam()
      .then((data) => setTeamList(data))
      .catch((err) => console.error(err));

    api.getProjects()
      .then((projects) => {
        if (projects && Array.isArray(projects)) {
          setProjectCount(`${projects.length}+`);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const stats = [
    { value: projectCount, label: 'Projects Completed', icon: Building2 },
    { value: COMPANY.stats.yearsExperience, label: 'Years of Experience', icon: Clock },
    { value: COMPANY.stats.happyClients, label: 'Happy Clients', icon: Users },
    { value: COMPANY.stats.professionals, label: 'Professionals', icon: Award },
  ];

  return (
    <>
      <Helmet>
        <title>About Us | {COMPANY.name} — Construction Company in Kathmandu, Nepal</title>
        <meta
          name="description"
          content="Learn more about Amulya Builders — a premier engineering and construction firm in Kathmandu, Nepal since 2009. Our professional team designs and builds sustainable, high-quality structures throughout Bagmati Province."
        />
        <link rel="canonical" href="https://amulyabuilders.com.np/about" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://amulyabuilders.com.np/about" />
        <meta property="og:title" content={`About Us | ${COMPANY.name} — Construction Company in Kathmandu, Nepal`} />
        <meta property="og:description" content="Learn more about Amulya Builders — a premier engineering and construction firm in Kathmandu, Nepal since 2009. Our professional team designs and builds sustainable, high-quality structures throughout Bagmati Province." />
        <meta property="og:image" content="https://amulyabuilders.com.np/amulyalogo1.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://amulyabuilders.com.np/about" />
        <meta name="twitter:title" content={`About Us | ${COMPANY.name} — Construction Company in Kathmandu, Nepal`} />
        <meta name="twitter:description" content="Learn more about Amulya Builders — a premier engineering and construction firm in Kathmandu, Nepal since 2009. Our professional team designs and builds sustainable, high-quality structures throughout Bagmati Province." />
        <meta name="twitter:image" content="https://amulyabuilders.com.np/amulyalogo1.png" />
      </Helmet>

      {/* Page Hero */}
      <section
        className="relative pt-28 pb-16 md:pt-36 md:pb-20 bg-gradient-to-br from-[#012352] via-[#02336e] to-[#011738] text-white overflow-hidden border-b border-white/10"
        aria-label="About page header"
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#cd0102] to-transparent z-10 opacity-80" />
        <img
          src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1600&q=80"
          alt="Construction team at work on a building project in Nepal"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
          loading="eager"
        />
        <div className="relative z-10 container-custom text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="section-label justify-center"
          >
            <span className="w-5 h-0.5 bg-orange-400" /> About Us
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
            className="text-3xl md:text-5xl font-extrabold mt-2 mb-4"
          >
            Who We Are
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="text-gray-300 max-w-xl mx-auto text-base md:text-lg"
          >
            Building trust, landmark structures, and lasting relationships across Kathmandu since {COMPANY.foundedYear}.
          </motion.p>
        </div>
      </section>

      {/* Company Introduction / Our Story Redesigned */}
      <section className="section-padding bg-white overflow-hidden" aria-label="Company introduction">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Visual Story Image Composition with Achievement Badges */}
            <motion.div 
              className="lg:col-span-5 relative pr-8 pb-8 pt-4"
              initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeLeft}
            >
              {/* Main image */}
              <div className="rounded-[28px] overflow-hidden shadow-lg border border-gray-100 relative h-96 group">
                <img
                  src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80"
                  alt="Construction site building frame"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
              </div>

              {/* Overlapping secondary image (Bottom Right) */}
              <div className="absolute -bottom-4 -right-2 w-48 h-48 rounded-[24px] overflow-hidden shadow-2xl border-4 border-white group/small hidden sm:block">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80"
                  alt="Completed Amulya Builders modern villa design"
                  className="w-full h-full object-cover group-hover/small:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
              </div>

              {/* Achievement Badge 1 (Founded 2009) */}
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="absolute -top-4 -left-4 bg-orange-500 text-white rounded-3xl p-4 shadow-xl border-4 border-white text-center w-24 h-24 flex flex-col justify-center items-center z-10"
              >
                <span className="text-xl font-black leading-none">{COMPANY.foundedYear}</span>
                <span className="text-[8px] font-black uppercase tracking-widest mt-1">Founded In</span>
                <span className="text-[8px] font-black uppercase tracking-widest leading-none">Kathmandu</span>
              </motion.div>

              {/* Achievement Badge 2 (250+ Projects) */}
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="absolute bottom-6 -left-6 bg-slate-950 text-white rounded-3xl p-4 shadow-xl border-4 border-white text-center w-24 h-24 flex flex-col justify-center items-center z-10"
              >
                <span className="text-xl font-black leading-none">250+</span>
                <span className="text-[8px] font-black uppercase tracking-widest mt-1">Projects</span>
                <span className="text-[8px] font-black uppercase tracking-widest leading-none">Completed</span>
              </motion.div>
            </motion.div>

            {/* Right Column: Story Telling and Timeline */}
            <motion.div 
              className="lg:col-span-7 space-y-6"
              initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeRight}
            >
              <div>
                <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest block mb-1">OUR STORY</span>
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                  From Humble Beginnings<br />to <span className="text-orange-500">Kathmandu's Best</span>
                </h2>
                <div className="w-12 h-1 bg-orange-500 rounded-full mt-3.5" />
              </div>

              <div className="space-y-4 text-xs md:text-sm text-gray-600 leading-relaxed font-medium">
                <p>
                  {COMPANY.name} was founded in <strong className="text-orange-500 font-extrabold">{COMPANY.foundedYear}</strong> by a group of licensed civil engineers who shared a
                  common belief: that quality construction should be accessible, transparent, and honest.
                  Starting with small residential projects in the Kathmandu District, we grew steadily through
                  referrals, repeat clients, and a reputation for never cutting corners.
                </p>
                <p>
                  Today, we are one of Kathmandu's most trusted construction companies — with a portfolio of
                  over <strong className="text-orange-500 font-extrabold">250+ completed projects</strong> spanning luxury villas, commercial complexes, hotels, schools,
                  and government buildings across Bagmati Province.
                </p>
                <p>
                  Our team of <strong className="text-orange-500 font-extrabold">80+ professionals</strong> — engineers, architects, site supervisors, and skilled
                  tradespeople — is united by a culture of excellence, accountability, and pride in our work.
                  Every structure we build is a testament to Kathmandu's growth and our commitment to raising
                  construction standards in Nepal.
                </p>
              </div>

              {/* Timeline */}
              <div className="mt-8 pt-6 border-t border-gray-150/60">
                {/* Desktop Horizontal Timeline */}
                <div className="hidden sm:flex items-center justify-between relative pl-4 pr-4">
                  {/* Gray connecting line */}
                  <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2 z-0" />
                  
                  {/* Milestones */}
                  {[
                    { year: '2009', label: 'Founded' },
                    { year: 'Growth', label: 'Through Trust' },
                    { year: '250+', label: 'Projects Done' },
                    { year: '80+', label: 'Professionals' },
                    { year: 'Today', label: 'Kathmandu Best' }
                  ].map((m, idx) => (
                    <div key={idx} className="relative z-10 flex flex-col items-center text-center bg-white px-2">
                      <div className="w-3.5 h-3.5 rounded-full bg-orange-500 border-2 border-white ring-2 ring-orange-500/20" />
                      <span className="text-[10px] font-black text-slate-900 mt-2">{m.year}</span>
                      <span className="text-[8px] text-gray-400 font-extrabold uppercase mt-0.5 tracking-wider">{m.label}</span>
                    </div>
                  ))}
                </div>

                {/* Mobile Vertical Timeline */}
                <div className="sm:hidden flex flex-col gap-4 pl-4 relative">
                  {/* vertical line */}
                  <div className="absolute top-0 bottom-0 left-1.5 w-0.5 bg-gray-200 z-0" />
                  
                  {[
                    { year: '2009', label: 'Founded in Kathmandu' },
                    { year: 'Growth', label: 'Built on Quality & Trust' },
                    { year: '250+', label: 'Projects successfully completed' },
                    { year: '80+', label: 'Licensed Engineers & Professionals' },
                    { year: 'Today', label: 'Kathmandu\'s Most Trusted Construction Partner' }
                  ].map((m, idx) => (
                    <div key={idx} className="relative z-10 flex items-start gap-4 pl-2">
                      <div className="w-3 h-3 rounded-full bg-orange-500 border-2 border-white ring-2 ring-orange-500/20 mt-1" />
                      <div>
                        <span className="text-xs font-black text-slate-950 block">{m.year}</span>
                        <span className="text-[10px] text-gray-400 font-bold">{m.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom CTA */}
              <div className="pt-6 border-t border-gray-150/60 flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
                <span className="text-xs font-bold text-slate-700 italic">Building Nepal's Future, One Project at a Time</span>
                <Link
                  to="/projects"
                  className="inline-flex items-center gap-1.5 px-5 py-3 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-extrabold text-xs rounded-xl transition-all shadow hover:shadow-orange-500/20 cursor-pointer"
                >
                  Discover Our Projects
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Redesigned */}
      <section className="section-padding bg-slate-50/50 border-t border-gray-150/50" aria-label="Mission and vision">
        <div className="container-custom">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest block mb-2">OUR PURPOSE</span>
            <h2 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              Mission, <span className="text-orange-500">Vision</span> & Values
            </h2>
            <div className="w-12 h-1 bg-orange-500 rounded-full mx-auto mt-4" />
            <p className="text-gray-500 text-xs md:text-sm mt-4 leading-relaxed max-w-2xl mx-auto">
              The principles that guide every project we design, build, and deliver.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {/* Mission */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeLeft}
              whileHover={{ y: -8 }}
              className="bg-slate-900 text-white rounded-3xl p-8 shadow-lg border border-slate-800 relative overflow-hidden group transition-all duration-300"
            >
              {/* Subtle blueprint decorative grid line overlay */}
              <div className="absolute top-0 right-0 w-24 h-24 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-300 pointer-events-none border-t border-l border-dashed border-white" />
              <div className="absolute bottom-0 left-0 w-16 h-16 opacity-[0.02] group-hover:opacity-[0.04] transition-opacity duration-300 pointer-events-none rounded-tr-3xl border-t border-r border-white" />

              <div className="relative z-10 space-y-4">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white shadow">
                  <Target className="w-6 h-6" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-extrabold tracking-tight">Our Mission</h3>
                <div className="w-8 h-0.5 bg-orange-500 rounded-full" />
                <p className="text-slate-300 text-xs md:text-sm leading-relaxed font-medium pt-2">
                  To deliver premium, earthquake-resistant, and aesthetically excellent construction
                  services to the people of Kathmandu and Nepal — with full transparency, timely
                  completion, and unwavering commitment to client satisfaction.
                </p>
              </div>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeRight}
              whileHover={{ y: -8 }}
              className="bg-orange-500 text-white rounded-3xl p-8 shadow-lg border border-orange-400 relative overflow-hidden group transition-all duration-300"
            >
              {/* Subtle geometric overlay */}
              <div className="absolute top-0 right-0 w-24 h-24 opacity-[0.08] group-hover:opacity-[0.12] transition-opacity duration-300 pointer-events-none border-t border-l border-dashed border-white" />
              <div className="absolute bottom-0 left-0 w-16 h-16 opacity-[0.05] group-hover:opacity-[0.08] transition-opacity duration-300 pointer-events-none rounded-tr-3xl border-t border-r border-white" />

              <div className="relative z-10 space-y-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-orange-500 shadow">
                  <Eye className="w-6 h-6" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-extrabold tracking-tight">Our Vision</h3>
                <div className="w-8 h-0.5 bg-white rounded-full" />
                <p className="text-orange-50 text-xs md:text-sm leading-relaxed font-medium pt-2">
                  To be the most trusted and respected construction company in Nepal — known for
                  transforming dreams into landmarks, raising industry standards, and contributing
                  to the sustainable development of Kathmandu and Bagmati Province.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Core Values with Visual Connection Line */}
          <div className="relative">
            {/* Horizontal connecting dashed line on desktop */}
            <div className="absolute top-1/3 left-12 right-12 h-0.5 border-t border-dashed border-gray-200/80 -translate-y-1/2 z-0 hidden lg:block" />
            
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10"
              initial="hidden" whileInView="visible" viewport={viewportOnce} variants={staggerContainer}
            >
              {values.map((v, i) => {
                const IconComp = v.icon;
                const isClientFirst = v.title === 'Client-First';
                return (
                  <motion.div
                    key={v.title}
                    variants={fadeUp}
                    whileHover={{ y: -6 }}
                    className={`relative overflow-hidden p-6 md:p-8 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 border flex flex-col justify-between min-h-[220px] group ${
                      isClientFirst 
                        ? 'bg-orange-500/[0.04] border-orange-500/20 text-slate-900 hover:ring-4 hover:ring-orange-500/5' 
                        : 'bg-white border-gray-100 text-slate-800 hover:ring-4 hover:ring-orange-500/5 hover:border-orange-500/20'
                    }`}
                  >
                    <div>
                      {/* Header: Number and Icon */}
                      <div className="flex justify-between items-center mb-5">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm transition-colors duration-300 ${
                          isClientFirst 
                            ? 'bg-orange-500 text-white' 
                            : 'bg-slate-50 text-orange-500 group-hover:bg-orange-500 group-hover:text-white'
                        }`}>
                          <IconComp className="w-5 h-5" />
                        </div>
                        <span className={`text-[10px] font-black uppercase tracking-widest ${isClientFirst ? 'text-orange-500' : 'text-slate-350 group-hover:text-orange-500 transition-colors'}`}>
                          {String(i + 1).padStart(2, '0')}
                        </span>
                      </div>

                      {/* Title & Desc */}
                      <h3 className="text-sm font-extrabold mb-2 tracking-tight text-slate-900">
                        {v.title}
                      </h3>
                      <p className="text-[11px] leading-relaxed text-gray-500 font-medium">
                        {v.desc}
                      </p>
                    </div>

                    {/* Bottom Orange Accent Line */}
                    <div className="w-8 h-0.5 bg-orange-500 rounded-full mt-5" />
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

        </div>
      </section>

      {/* Stats */}
      <section className="bg-blue-900 py-16" aria-label="Company statistics">
        <div className="container-custom">
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden" whileInView="visible" viewport={viewportOnce} variants={staggerContainer}
          >
            {stats.map((s) => (
              <motion.div key={s.label} variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}>
                <StatCounter value={s.value} label={s.label} icon={s.icon} light />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-white" aria-label="Our professional team">
        <div className="container-custom">
          <SectionHeader label="Our Team" title={<>The <span className="text-orange-500">People</span> Behind Every Project</>} subtitle="Our leadership team brings decades of combined experience in civil engineering, architecture, and construction management." center />
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden" whileInView="visible" viewport={viewportOnce} variants={staggerContainer}
          >
            {teamList.map((member, i) => (
              <motion.div
                key={member.id}
                variants={fadeUp}
                className="bg-gray-50 rounded-xl p-6 text-center card-shadow hover:-translate-y-1 transition-transform duration-300"
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-white text-lg font-extrabold mx-auto mb-4 shadow"
                  style={{ backgroundColor: member.color }}
                  aria-hidden="true"
                >
                  {member.avatar}
                </div>
                <h3 className="font-bold text-gray-900 text-sm mb-1">{member.name}</h3>
                <p className="text-orange-500 text-xs font-semibold mb-1">{member.designation}</p>
                <p className="text-gray-500 text-xs mb-1">{member.qualification}</p>
                <p className="text-blue-700 text-xs font-bold">{member.experience} Experience</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Clients Trust Us */}
      <section className="section-padding bg-gray-50" aria-label="Why clients trust us">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeLeft}>
              <SectionHeader label="Client Trust" title={<>Why Clients <span className="text-orange-500">Trust Us</span></>} />
              <ul className="space-y-3" role="list">
                {trustPoints.map((pt) => (
                  <li key={pt} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <span className="text-gray-700 text-sm font-medium">{pt}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link to="/contact" className="btn-primary" aria-label="Get a free construction consultation">
                  Get a Free Consultation
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeRight}>
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80"
                alt="Amulya Builders team reviewing building plans on a construction site"
                className="w-full rounded-2xl object-cover h-80 md:h-96"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
