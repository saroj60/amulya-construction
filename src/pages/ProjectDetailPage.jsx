import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
  ArrowLeft, MapPin, Tag, CheckCircle, Clock, X, ChevronLeft, ChevronRight,
  MessageCircle, Phone, ArrowRight, Loader
} from 'lucide-react';
import { COMPANY } from '@/data';
import { api } from '@/services/api';
import { fadeUp, staggerContainer, viewportOnce } from '@/utils/animations';

const statusColors = {
  Completed: 'bg-green-100 text-green-700 border border-green-200',
  Ongoing: 'bg-blue-100 text-blue-700 border border-blue-200',
};

export default function ProjectDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [project, setProject] = useState(null);
  const [relatedProjects, setRelatedProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    setLoading(true);
    api.getProject(id)
      .then((projData) => {
        setProject(projData);
        api.getProjects()
          .then((allProj) => {
            setRelatedProjects(
              allProj.filter((p) => p.id !== projData.id && p.category === projData.category).slice(0, 3)
            );
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err))
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
        <title>{project.title} | {COMPANY.name} — {project.location}</title>
        <meta
          name="description"
          content={`${project.title} — A ${project.category.toLowerCase()} construction project by ${COMPANY.name} in ${project.location}. ${project.description.slice(0, 120)}...`}
        />
        <link rel="canonical" href={`https://amulyabuilders.com.np/projects/${project.id}`} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://amulyabuilders.com.np/projects/${project.id}`} />
        <meta property="og:title" content={`${project.title} | ${COMPANY.name} — ${project.location}`} />
        <meta property="og:description" content={`${project.title} — A ${project.category.toLowerCase()} construction project by ${COMPANY.name} in ${project.location}. ${project.description.slice(0, 120)}...`} />
        <meta property="og:image" content={project.image} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={`https://amulyabuilders.com.np/projects/${project.id}`} />
        <meta name="twitter:title" content={`${project.title} | ${COMPANY.name} — ${project.location}`} />
        <meta name="twitter:description" content={`${project.title} — A ${project.category.toLowerCase()} construction project by ${COMPANY.name} in ${project.location}. ${project.description.slice(0, 120)}...`} />
        <meta name="twitter:image" content={project.image} />
      </Helmet>

      {/* Back button */}
      <div className="bg-gray-50 border-b border-gray-100 pt-20">
        <div className="container-custom py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-orange-500 transition-colors font-medium"
            aria-label="Go back to projects"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Back to Projects
          </button>
        </div>
      </div>

      {/* Hero Image */}
      <section aria-label="Project hero image">
        <div className="relative h-64 sm:h-80 md:h-[28rem] overflow-hidden">
          <img
            src={allImages[0]}
            alt={`${project.title} — ${project.category} project in ${project.location}`}
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          {/* Overlay info */}
          <div className="absolute bottom-6 left-0 right-0 container-custom text-white">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${statusColors[project.status] || statusColors.Completed}`}>
                {project.status === 'Completed'
                  ? <CheckCircle className="inline w-3 h-3 mr-1" />
                  : <Clock className="inline w-3 h-3 mr-1" />}
                {project.status}
              </span>
              <span className="text-xs bg-blue-700 text-white font-bold px-3 py-1 rounded-full">
                {project.category}
              </span>
            </div>
            <h1 className="text-2xl md:text-4xl font-extrabold">{project.title}</h1>
            <p className="flex items-center gap-1.5 mt-1.5 text-gray-200 text-sm">
              <MapPin className="w-4 h-4 text-orange-400" aria-hidden="true" />
              {project.location}
            </p>
          </div>
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
                        onClick={() => openLightbox(i)}
                        className="relative group overflow-hidden rounded-xl h-36 sm:h-44 focus:outline-none focus:ring-2 focus:ring-orange-500"
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
                className="bg-gray-50 rounded-2xl p-6 border border-gray-100"
              >
                <h2 className="text-base font-bold text-gray-900 mb-4 uppercase tracking-wider">Project Specifications</h2>
                <dl className="space-y-3">
                  {project.client && (
                    <div className="flex justify-between gap-4">
                      <dt className="text-xs text-gray-500 font-semibold uppercase">Client</dt>
                      <dd className="text-xs text-gray-800 font-medium text-right">{project.client}</dd>
                    </div>
                  )}
                  {project.year && (
                    <div className="flex justify-between gap-4">
                      <dt className="text-xs text-gray-500 font-semibold uppercase">Year</dt>
                      <dd className="text-xs text-gray-800 font-medium">{project.year}</dd>
                    </div>
                  )}
                  {project.duration && (
                    <div className="flex justify-between gap-4">
                      <dt className="text-xs text-gray-500 font-semibold uppercase">Duration</dt>
                      <dd className="text-xs text-gray-800 font-medium">{project.duration}</dd>
                    </div>
                  )}
                  {Object.entries(project.specifications || {}).map(([key, val]) => (
                    <div key={key} className="flex justify-between gap-4 pt-2 border-t border-gray-200 first:border-0 first:pt-0">
                      <dt className="text-xs text-gray-500 font-semibold uppercase">{key}</dt>
                      <dd className="text-xs text-gray-800 font-medium text-right">{val}</dd>
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
