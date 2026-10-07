import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
  ArrowLeft, MapPin, Tag, CheckCircle, Clock, X, ChevronLeft, ChevronRight,
  MessageCircle, Phone, ArrowRight, Loader, Maximize2
} from 'lucide-react';
import { COMPANY, PROJECTS } from '@/data';
import { api } from '@/services/api';
import { fadeUp, staggerContainer, viewportOnce } from '@/utils/animations';

const statusColors = {
  Completed: 'bg-green-100 text-green-700 border border-green-200',
  Ongoing: 'bg-blue-100 text-blue-700 border border-blue-200',
};

// Helper to look up project from static data by ID, index, or title code
function findStaticProject(projId) {
  if (!projId) return null;
  return (
    PROJECTS.find((p) => String(p.id) === String(projId)) ||
    PROJECTS[Number(projId) - 1] ||
    PROJECTS.find((p) =>
      String(p.title).toLowerCase().includes(`project code: ${projId}`) ||
      String(p.title).toLowerCase().includes(`project ${projId}`)
    ) || null
  );
}

export default function ProjectDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const initialProject = findStaticProject(id);
  const [project, setProject] = useState(initialProject);
  const [relatedProjects, setRelatedProjects] = useState(() => {
    if (!initialProject) return [];
    return PROJECTS.filter(
      (p) => p.id !== initialProject.id && p.category === initialProject.category
    ).slice(0, 3);
  });
  const [loading, setLoading] = useState(!initialProject);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    setActiveImageIndex(0);
    const fallback = findStaticProject(id);
    if (fallback) {
      setProject(fallback);
      setRelatedProjects(
        PROJECTS.filter(
          (p) => p.id !== fallback.id && p.category === fallback.category
        ).slice(0, 3)
      );
      setLoading(false);
    } else {
      setLoading(true);
    }

    // Attempt to fetch fresh data from backend if available
    api.getProject(id)
      .then((projData) => {
        if (projData && projData.id) {
          setProject(projData);
          api.getProjects()
            .then((allProj) => {
              if (Array.isArray(allProj) && allProj.length > 0) {
                setRelatedProjects(
                  allProj.filter((p) => p.id !== projData.id && p.category === projData.category).slice(0, 3)
                );
              }
            })
            .catch(() => {});
        }
      })
      .catch((err) => {
        console.warn('API getProject unavailable, using static fallback:', err);
        if (!fallback) {
          const retryFallback = findStaticProject(id);
          if (retryFallback) {
            setProject(retryFallback);
          }
        }
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center flex flex-col items-center gap-3">
          <Loader className="w-8 h-8 text-blue-800 animate-spin" />
          <span className="text-sm text-gray-400 font-semibold">Loading Project...</span>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Project Not Found</h1>
          <p className="text-gray-500 mb-6">This project doesn't exist or has been removed.</p>
          <Link to="/projects" className="btn-primary">← Back to Projects</Link>
        </div>
      </div>
    );
  }

  const allImages = project.gallery || [project.image];

  function openLightbox(i) {
    setLightboxIndex(i);
    setLightboxOpen(true);
  }

  function closeLightbox() {
    setLightboxOpen(false);
  }

  function prevImage() {
    setLightboxIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  }

  function nextImage() {
    setLightboxIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  }

  return (
    <>
      <Helmet>
        <title>{project.title} | {COMPANY.name}{project.location ? ` — ${project.location}` : ''}</title>
        <meta
          name="description"
          content={`${project.title} — Construction project by ${COMPANY.name}.${project.location ? ` Located in ${project.location}.` : ''} ${project.description.slice(0, 120)}...`}
        />
        <link rel="canonical" href={`https://amulyabuilders.com.np/projects/${project.id}`} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://amulyabuilders.com.np/projects/${project.id}`} />
        <meta property="og:title" content={`${project.title} | ${COMPANY.name}${project.location ? ` — ${project.location}` : ''}`} />
        <meta property="og:description" content={`${project.title} — Construction project by ${COMPANY.name}.${project.location ? ` Located in ${project.location}.` : ''} ${project.description.slice(0, 120)}...`} />
        <meta property="og:image" content={project.image} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={`https://amulyabuilders.com.np/projects/${project.id}`} />
        <meta name="twitter:title" content={`${project.title} | ${COMPANY.name} — ${project.location}`} />
        <meta name="twitter:description" content={`${project.title} — A ${project.category.toLowerCase()} construction project by ${COMPANY.name} in ${project.location}. ${project.description.slice(0, 120)}...`} />
        <meta name="twitter:image" content={project.image} />
      </Helmet>

      {/* Breadcrumb & Navigation Bar */}
      <div className="bg-slate-900 border-b border-slate-800 text-white pt-24 pb-4">
        <div className="container-custom flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-orange-400 transition-colors font-medium cursor-pointer"
            aria-label="Go back to projects"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Back to Projects
          </button>

          <div className="flex flex-wrap items-center gap-2">
            <span className={`text-xs font-bold px-3 py-1 rounded-full ${statusColors[project.status] || statusColors.Completed}`}>
              {project.status === 'Completed'
                ? <CheckCircle className="inline w-3 h-3 mr-1" />
                : <Clock className="inline w-3 h-3 mr-1" />}
              {project.status}
            </span>
            <span className="text-xs bg-blue-600 text-white font-bold px-3 py-1 rounded-full">
              {project.category}
            </span>
          </div>
        </div>
      </div>

      {/* Project Visual Showcase */}
      <section className="bg-slate-950 text-white py-6 sm:py-8 border-b border-slate-800" aria-label="Project visual showcase">
        <div className="container-custom">
          {/* Header Info */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                {project.title}
              </h1>
              {project.location ? (
                <p className="flex items-center gap-2 mt-2 text-slate-300 text-sm md:text-base font-medium">
                  <MapPin className="w-4 h-4 text-orange-400 flex-shrink-0" aria-hidden="true" />
                  {project.location}
                </p>
              ) : null}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => openLightbox(activeImageIndex)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-orange-500 text-white text-xs sm:text-sm font-semibold transition-all border border-slate-700 shadow-md group cursor-pointer"
              >
                <Maximize2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                Full Screen View
              </button>
            </div>
          </div>

          {/* Architectural Image Stage - 100% Full Image Visible with ZERO Cropping */}
          <div className="relative rounded-2xl md:rounded-3xl overflow-hidden bg-slate-900 border border-slate-800/90 shadow-2xl flex items-center justify-center min-h-[360px] sm:min-h-[500px] md:min-h-[640px] max-h-[82vh] group">
            {/* Ambient Blurred Background for depth */}
            <div
              className="absolute inset-0 bg-cover bg-center filter blur-3xl opacity-25 scale-125 pointer-events-none transition-all duration-700"
              style={{ backgroundImage: `url(${allImages[activeImageIndex] || project.image})` }}
            />

            {/* Main Stage Image - Contained to show full height & width */}
            <img
              src={allImages[activeImageIndex] || project.image}
              alt={`${project.title} — ${project.category} architecture in ${project.location}`}
              className="relative z-10 w-full max-h-[78vh] object-contain mx-auto cursor-zoom-in transition-all duration-300 select-none py-3 px-3 drop-shadow-2xl"
              onClick={() => openLightbox(activeImageIndex)}
              loading="eager"
            />

            {/* Navigation arrows for multi-angle projects */}
            {allImages.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
                  }}
                  className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-black/60 hover:bg-orange-500 text-white flex items-center justify-center backdrop-blur-md transition-all shadow-xl cursor-pointer"
                  aria-label="Previous view angle"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImageIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
                  }}
                  className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-black/60 hover:bg-orange-500 text-white flex items-center justify-center backdrop-blur-md transition-all shadow-xl cursor-pointer"
                  aria-label="Next view angle"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Click to zoom badge */}
            <button
              onClick={() => openLightbox(activeImageIndex)}
              className="absolute bottom-4 right-4 z-20 hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/70 hover:bg-orange-500 text-white text-xs font-semibold backdrop-blur-md transition-all shadow cursor-pointer"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              Click to Zoom
            </button>
          </div>

          {/* Multi-angle Gallery Thumbnails Strip (if more than 1 image) */}
          {allImages.length > 1 && (
            <div className="mt-4 flex items-center justify-center gap-3 overflow-x-auto py-2">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative flex-shrink-0 w-20 sm:w-28 h-14 sm:h-20 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                    activeImageIndex === idx
                      ? 'border-orange-500 scale-105 shadow-lg shadow-orange-500/20'
                      : 'border-slate-800 opacity-60 hover:opacity-100 hover:border-slate-600'
                  }`}
                  aria-label={`View photo angle ${idx + 1}`}
                >
                  <img
                    src={img}
                    alt={`Angle ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/70 text-[10px] text-white font-bold">
                    #{idx + 1}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding bg-white" aria-label="Project details">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left: Description + Gallery */}
            <div className="lg:col-span-2 space-y-10">
              {/* Description */}
              <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeUp}>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Project Overview</h2>
                <p className="text-gray-600 leading-relaxed text-base">{project.description}</p>
              </motion.div>

              {/* Highlights */}
              {project.highlights?.length > 0 && (
                <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeUp}>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Construction Highlights</h2>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2" role="list">
                    {project.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2.5">
                        <CheckCircle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                        <span className="text-gray-700 text-sm font-medium">{h}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {/* Gallery */}
              {allImages.length > 1 && (
                <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeUp}>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Project Gallery</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {allImages.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setActiveImageIndex(i);
                          openLightbox(i);
                        }}
                        className="relative group overflow-hidden rounded-xl h-36 sm:h-44 focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"
                        aria-label={`View image ${i + 1} of ${allImages.length}`}
                      >
                        <img
                          src={img}
                          alt={`${project.title} gallery image ${i + 1}`}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="text-white text-xs font-semibold">View</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Right: Specs sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Specifications */}
              <motion.div
                initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeUp}
                className="bg-gray-50 rounded-2xl p-6 border border-gray-100 shadow-sm"
              >
                <h2 className="text-base font-bold text-gray-900 mb-4 uppercase tracking-wider flex items-center justify-between">
                  <span>Project Details</span>
                  <span className="text-[10px] text-orange-500 font-bold uppercase bg-orange-100/70 px-2 py-0.5 rounded">Specs</span>
                </h2>
                <dl className="space-y-3">
                  <div className="flex justify-between items-center gap-4">
                    <dt className="text-xs text-gray-500 font-semibold uppercase">Project Code</dt>
                    <dd className="text-xs text-gray-900 font-bold text-right">
                      {project.specifications?.['Project Code'] || (project.title?.startsWith('Project Code:') ? project.title.replace('Project Code:', '').trim() : project.title) || '—'}
                    </dd>
                  </div>
                  <div className="flex justify-between items-center gap-4 pt-2.5 border-t border-gray-200">
                    <dt className="text-xs text-gray-500 font-semibold uppercase">Location</dt>
                    <dd className="text-xs text-gray-800 font-medium text-right">{project.location || project.specifications?.['Location'] || '—'}</dd>
                  </div>
                  <div className="flex justify-between items-center gap-4 pt-2.5 border-t border-gray-200">
                    <dt className="text-xs text-gray-500 font-semibold uppercase">Project Cost</dt>
                    <dd className="text-xs text-gray-800 font-medium text-right">{project.specifications?.['Project Cost'] || project.cost || '—'}</dd>
                  </div>
                  <div className="flex justify-between items-center gap-4 pt-2.5 border-t border-gray-200">
                    <dt className="text-xs text-gray-500 font-semibold uppercase">Type of Building</dt>
                    <dd className="text-xs text-gray-800 font-medium text-right">{project.specifications?.['Type of Building'] || project.specifications?.['Type'] || project.category || '—'}</dd>
                  </div>
                  <div className="flex justify-between items-center gap-4 pt-2.5 border-t border-gray-200">
                    <dt className="text-xs text-gray-500 font-semibold uppercase">Plinth Area</dt>
                    <dd className="text-xs text-gray-800 font-medium text-right">{project.specifications?.['Plinth Area'] || project.area || '—'}</dd>
                  </div>
                  <div className="flex justify-between items-center gap-4 pt-2.5 border-t border-gray-200">
                    <dt className="text-xs text-gray-500 font-semibold uppercase">Face Length</dt>
                    <dd className="text-xs text-gray-800 font-medium text-right">{project.specifications?.['Face Length'] || '—'}</dd>
                  </div>

                  {/* Render any additional custom specifications if present */}
                  {Object.entries(project.specifications || {})
                    .filter(([key]) => !['Project Code', 'Location', 'Project Cost', 'Type of Building', 'Plinth Area', 'Face Length', 'Project', 'Type'].includes(key))
                    .map(([key, val]) => (
                      <div key={key} className="flex justify-between items-center gap-4 pt-2.5 border-t border-gray-200">
                        <dt className="text-xs text-gray-500 font-semibold uppercase">{key}</dt>
                        <dd className="text-xs text-gray-800 font-medium text-right">{val || '—'}</dd>
                      </div>
                    ))}
                </dl>
              </motion.div>

              {/* Contact CTA card */}
              <motion.div
                initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeUp}
                className="bg-blue-800 rounded-2xl p-6 text-white"
              >
                <h3 className="font-bold text-lg mb-2">Interested in a Similar Project?</h3>
                <p className="text-blue-200 text-sm leading-relaxed mb-5">
                  Talk to our team about your requirements. We'll provide a free site visit and detailed estimate.
                </p>
                <Link
                  to="/contact"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors text-sm mb-3"
                  aria-label="Request a quote for a similar project"
                >
                  <Phone className="w-4 h-4" aria-hidden="true" />
                  Request a Quote
                </Link>
                <a
                  href={`https://wa.me/${COMPANY.whatsapp.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors text-sm"
                  aria-label="Chat on WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  Chat on WhatsApp
                </a>
              </motion.div>
            </div>
          </div>

          {/* Related Projects */}
          {relatedProjects.length > 0 && (
            <motion.div
              initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeUp}
              className="mt-16"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6">Related {project.category} Projects</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedProjects.map((rp) => (
                  <Link
                    key={rp.id}
                    to={`/projects/${rp.id}`}
                    className="group bg-white rounded-xl overflow-hidden card-shadow hover:-translate-y-1 transition-transform duration-300"
                    aria-label={`View ${rp.title} project`}
                  >
                    <div className="h-40 overflow-hidden">
                      <img
                        src={rp.image}
                        alt={rp.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 text-sm group-hover:text-blue-700 transition-colors">{rp.title}</h3>
                      <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-orange-400" aria-hidden="true" />
                        {rp.location}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-orange-400 transition-colors"
            aria-label="Close lightbox"
          >
            <X className="w-8 h-8" />
          </button>
          {allImages.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 text-white hover:text-orange-400 transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-10 h-10" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 text-white hover:text-orange-400 transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="w-10 h-10" />
              </button>
            </>
          )}
          <img
            src={allImages[lightboxIndex]}
            alt={`${project.title} gallery image ${lightboxIndex + 1}`}
            className="max-h-[85vh] max-w-full rounded-lg object-contain"
          />
          <p className="absolute bottom-4 text-white/60 text-sm">
            {lightboxIndex + 1} / {allImages.length}
          </p>
        </div>
      )}
    </>
  );
}
