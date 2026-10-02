import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from '../components/ui/SectionHeader';
import ProjectCard from '../components/ui/ProjectCard';
import { COMPANY, PROJECTS } from '@/data';
import { api } from '@/services/api';
import { staggerContainer, fadeUp, viewportOnce } from '@/utils/animations';

const CATEGORIES = ['All', 'Residential', 'Commercial', 'Renovation', 'Ongoing', 'Completed'];

export default function ProjectsPage() {
  const [active, setActive] = useState('All');
  const [projectsList, setProjectsList] = useState(PROJECTS);

  useEffect(() => {
    api.getProjects()
      .then((data) => {
        if (data && Array.isArray(data)) {
          setProjectsList(data);
        }
      })
      .catch((err) => {
        console.error('Failed to load projects from API, using fallback data:', err);
      });
  }, []);

  const filtered = projectsList.filter((p) => {
    if (active === 'All') return true;
    if (active === 'Ongoing') return p.status === 'Ongoing';
    if (active === 'Completed') return p.status === 'Completed';
    return p.category === active;
  });

  return (
    <>
      <Helmet>
        <title>Construction Projects | {COMPANY.name} — Kathmandu, Nepal</title>
        <meta
          name="description"
          content="Browse through the portfolio of Amulya Builders in Kathmandu, Nepal — showcasing our completed and active projects including custom villas, commercial complexes, boutique resorts, and apartments across Bagmati Province."
        />
        <meta
          name="keywords"
          content="turnkey house construction in Nepal, residential building contractor Nepal, commercial building contractor Kathmandu, reliable construction contractor in Kathmandu, civil construction company Nepal, construction project portfolio Nepal"
        />
        <link rel="canonical" href="https://amulyabuilders.com.np/projects" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://amulyabuilders.com.np/projects" />
        <meta property="og:title" content={`Construction Projects | ${COMPANY.name} — Kathmandu, Nepal`} />
        <meta property="og:description" content="Browse through the portfolio of Amulya Builders in Kathmandu, Nepal — showcasing our completed and active projects including custom villas, commercial complexes, boutique resorts, and apartments across Bagmati Province." />
        <meta property="og:image" content="https://amulyabuilders.com.np/amulyalogo1.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://amulyabuilders.com.np/projects" />
        <meta name="twitter:title" content={`Construction Projects | ${COMPANY.name} — Kathmandu, Nepal`} />
        <meta name="twitter:description" content="Browse through the portfolio of Amulya Builders in Kathmandu, Nepal — showcasing our completed and active projects including custom villas, commercial complexes, boutique resorts, and apartments across Bagmati Province." />
        <meta name="twitter:image" content="https://amulyabuilders.com.np/amulyalogo1.png" />
      </Helmet>

      {/* Page Hero */}
      <section
        className="relative pt-28 pb-16 md:pt-36 md:pb-20 bg-gradient-to-br from-[#012352] via-[#02336e] to-[#011738] text-white overflow-hidden border-b border-white/10"
        aria-label="Projects page header"
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#cd0102] to-transparent z-10 opacity-80" />
        <img
          src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=80"
          alt="Portfolio of construction projects in Kathmandu Nepal"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
          loading="eager"
        />
        <div className="relative z-10 container-custom text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="section-label justify-center"
          >
            <span className="w-5 h-0.5 bg-orange-400" /> Project Portfolio
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
            className="text-3xl md:text-5xl font-extrabold mt-2 mb-4"
          >
            Our Work Speaks for Itself
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="text-gray-300 max-w-xl mx-auto text-base md:text-lg"
          >
            {projectsList.length > 0 ? `${projectsList.length}+` : COMPANY.stats.projectsCompleted} projects completed across Kathmandu and Bagmati Province — homes, commercial buildings, hotels, schools, and more.
          </motion.p>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="section-padding bg-white" aria-label="Project portfolio">
        <div className="container-custom">
          {/* Filter Tabs */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeUp}
            className="flex flex-wrap justify-center gap-2 mb-10 md:mb-14"
            role="group"
            aria-label="Filter projects by category"
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 border ${
                  active === cat
                    ? 'bg-blue-800 text-white border-blue-800 shadow-md'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-orange-400 hover:text-orange-500'
                }`}
                aria-pressed={active === cat}
              >
                {cat}
                {cat === 'All' && (
                  <span className="ml-2 text-xs opacity-70">({projectsList.length})</span>
                )}
              </button>
            ))}
          </motion.div>

          {/* Count indicator */}
          <motion.p
            key={active}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}
            className="text-sm text-gray-500 mb-6 text-center"
            aria-live="polite"
          >
            Showing <strong className="text-gray-900">{filtered.length}</strong> project{filtered.length !== 1 ? 's' : ''}
            {active !== 'All' && <> in <strong className="text-orange-500">{active}</strong></>}
          </motion.p>

          {/* Projects Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              variants={staggerContainer}
            >
              {filtered.length > 0 ? (
                filtered.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))
              ) : (
                <motion.div
                  variants={fadeUp}
                  className="col-span-full text-center py-16 px-6 bg-slate-50/80 rounded-3xl border border-dashed border-slate-200 my-4"
                >
                  <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 font-black">
                    AB
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {projectsList.length === 0 ? 'Project Portfolio Updating' : 'No projects found in this category.'}
                  </h3>
                  <p className="text-sm text-slate-500 max-w-md mx-auto mb-6">
                    {projectsList.length === 0
                      ? 'We are currently uploading our verified landmark construction photos and case studies. In the meantime, browse our architectural house designs or connect with our team.'
                      : 'Try selecting another category or tab above to see more works.'}
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <Link
                      to="/designs"
                      className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-orange-500/20"
                    >
                      Explore House Designs
                    </Link>
                    <Link
                      to="/contact"
                      className="px-5 py-2.5 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 text-xs font-bold rounded-xl transition-all"
                    >
                      Contact Us
                    </Link>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}
