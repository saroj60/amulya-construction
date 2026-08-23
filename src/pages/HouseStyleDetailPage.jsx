import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, CheckCircle, X, ChevronLeft, ChevronRight,
  MessageCircle, Phone, ArrowRight, Sparkles, HelpCircle, HardHat, Loader
} from 'lucide-react';
import { COMPANY } from '@/data';
import { api } from '@/services/api';
import { fadeUp, staggerContainer, viewportOnce } from '@/utils/animations';

const getRoomSpecsAndPrice = (styleId) => {
  switch (styleId) {
    case 'modern-contemporary-villa':
      return {
        specs: { bedroom: 5, kitchen: 2, livingRoom: 2, bathroom: 4 },
        price: 'Rs 24,950.00'
      };
    case 'traditional-neo-vernacular':
      return {
        specs: { bedroom: 4, kitchen: 1, livingRoom: 2, bathroom: 3 },
        price: 'Rs 28,500.00'
      };
    case 'classical-colonial-mansion':
      return {
        specs: { bedroom: 6, kitchen: 2, livingRoom: 3, bathroom: 5 },
        price: 'Rs 32,750.00'
      };
    default:
      return {
        specs: { bedroom: 4, kitchen: 2, livingRoom: 2, bathroom: 4 },
        price: 'Rs 27,950.00'
      };
  }
};

export default function HouseStyleDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [style, setStyle] = useState(null);
  const [relatedStyles, setRelatedStyles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // WhatsApp floor plan unlock states
  const [showModal, setShowModal] = useState(false);
  const [userWhatsapp, setUserWhatsapp] = useState('');
  const [whatsappSubmitted, setWhatsappSubmitted] = useState(false);
  const [modalError, setModalError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('user_whatsapp');
    if (saved) {
      setWhatsappSubmitted(true);
    }
  }, []);

  const handleWhatsappSubmit = (e) => {
    e.preventDefault();
    if (!/^[\d\s+\-()]{7,15}$/.test(userWhatsapp.trim())) {
      setModalError('Please enter a valid WhatsApp number.');
      return;
    }
    setSubmitting(true);

    api.submitLead({
      name: 'Floor Plan Request',
      phone: userWhatsapp.trim(),
      email: '',
      message: `Requested floor plans for design: ${style?.title || 'Unknown'}. Redirected to WhatsApp.`
    })
      .then(() => {
        setSubmitting(false);
        localStorage.setItem('user_whatsapp', userWhatsapp.trim());
        setWhatsappSubmitted(true);
        setShowModal(false);
        
        // Open WhatsApp in a new window with a friendly message requesting the floor plan
        const msgText = `Hello Amulya Builders, please send me the floor plan for the "${style?.title || ''}".`;
        const waUrl = `https://wa.me/${COMPANY.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(msgText)}`;
        window.open(waUrl, '_blank');
      })
      .catch((err) => {
        setSubmitting(false);
        setModalError(err.message || 'Failed to submit number. Please try again.');
      });
  };

  // Buy form states
  const [buyForm, setBuyForm] = useState({ firstName: '', lastName: '', email: '', phone: '' });
  const [buySubmitting, setBuySubmitting] = useState(false);
  const [buySubmitted, setBuySubmitted] = useState(false);

  const handleBuySubmit = (e) => {
    e.preventDefault();
    setBuySubmitting(true);
    
    const priceText = style?.price || getRoomSpecsAndPrice(style?.id).price;

    api.submitLead({
      name: `${buyForm.firstName} ${buyForm.lastName}`,
      phone: buyForm.phone.trim(),
      email: buyForm.email.trim(),
      message: `Purchase request for Design Style: ${style?.title || 'Unknown'}. ID: ${style?.id}. Price: ${priceText}`
    })
      .then(() => {
        setBuySubmitting(false);
        setBuySubmitted(true);
      })
      .catch((err) => {
        setBuySubmitting(false);
        alert(err.message || 'Failed to submit request.');
      });
  };

  useEffect(() => {
    setLoading(true);
    api.getHouseStyle(id)
      .then((styleData) => {
        setStyle(styleData);
        api.getHouseStyles()
          .then((allSty) => {
            setRelatedStyles(
              allSty.filter((s) => s.id !== styleData.id).slice(0, 3)
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
          <span className="text-sm text-gray-400 font-semibold">Loading Details...</span>
        </div>
      </div>
    );
  }

  if (!style) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Design Not Found</h1>
          <p className="text-gray-500 mb-6">This design layout does not exist or has been modified.</p>
          <Link to="/designs" className="btn-primary">← Back to Designs</Link>
        </div>
      </div>
    );
  }

  const allImages = style.gallery || [style.image];
  const fallbackValues = getRoomSpecsAndPrice(style.id);
  const roomSpecs = {
    bedroom: style.specifications?.['Bedroom'] || style.specifications?.['Bedrooms'] || fallbackValues.specs.bedroom,
    kitchen: style.specifications?.['Kitchen'] || style.specifications?.['Kitchens'] || fallbackValues.specs.kitchen,
    livingRoom: style.specifications?.['Living Room'] || style.specifications?.['LivingRoom'] || fallbackValues.specs.livingRoom,
    bathroom: style.specifications?.['Bathroom'] || style.specifications?.['Bathrooms'] || fallbackValues.specs.bathroom,
  };
  const priceInfo = style.price || fallbackValues.price;

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
        <title>{style.title} Design Details | {COMPANY.name}</title>
        <meta
          name="description"
          content={`${style.title} design details by ${COMPANY.name}. ${style.description.slice(0, 150)}`}
        />
        <link rel="canonical" href={`https://amulyabuilders.com.np/designs/${style.id}`} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://amulyabuilders.com.np/designs/${style.id}`} />
        <meta property="og:title" content={`${style.title} Design Details | ${COMPANY.name}`} />
        <meta property="og:description" content={`${style.title} design details by ${COMPANY.name}. ${style.description.slice(0, 150)}`} />
        <meta property="og:image" content={style.image} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={`https://amulyabuilders.com.np/designs/${style.id}`} />
        <meta name="twitter:title" content={`${style.title} Design Details | ${COMPANY.name}`} />
        <meta name="twitter:description" content={`${style.title} design details by ${COMPANY.name}. ${style.description.slice(0, 150)}`} />
        <meta name="twitter:image" content={style.image} />
      </Helmet>

      {/* Back button */}
      <div className="bg-gray-50 border-b border-gray-100 pt-20">
        <div className="container-custom py-4">
          <button
            onClick={() => navigate('/designs')}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-orange-500 transition-colors font-medium"
            aria-label="Go back to designs"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Back to Designs
          </button>
        </div>
      </div>

      {/* Hero Image */}
      <section aria-label="House style cover image">
        <div className="relative h-64 sm:h-80 md:h-[28rem] overflow-hidden">
          <img
            src={allImages[0]}
            alt={`${style.title} — cover architectural rendering`}
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          {/* Overlay info */}
          <div className="absolute bottom-6 left-0 right-0 container-custom text-white">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-xs bg-orange-500 text-white font-bold px-3 py-1 rounded-full shadow">
                {style.category} Style
              </span>
            </div>
            <h1 className="text-2xl md:text-4xl font-extrabold">{style.title}</h1>
            <p className="mt-1 text-gray-200 text-sm md:text-base">
              Premium home architectural options engineered for Bagmati Province.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding bg-white" aria-label="House style specifications">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            
            {/* Left Column: Description & Additional Details */}
            <div className="lg:col-span-2 space-y-10">
              
              {/* Description */}
              <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeUp}>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Design Philosophy</h2>
                <p className="text-gray-600 leading-relaxed text-base">{style.longDescription}</p>
              </motion.div>

              {/* Architectural Highlights */}
              <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeUp}>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Distinctive Features</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3" role="list">
                  {style.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 bg-gray-50 rounded-lg p-3 border border-gray-100">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" aria-hidden="true" />
                      <span className="text-gray-700 text-sm font-semibold">{feat}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
              <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeUp} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Room Specification</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4">
                  <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <span className="font-bold text-gray-900">Bedroom:</span>
                    <span className="font-semibold text-gray-600">{roomSpecs.bedroom}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <span className="font-bold text-gray-900">Kitchen:</span>
                    <span className="font-semibold text-gray-600">{roomSpecs.kitchen}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <span className="font-bold text-gray-900">Living Room:</span>
                    <span className="font-semibold text-gray-600">{roomSpecs.livingRoom}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <span className="font-bold text-gray-900">Bathroom:</span>
                    <span className="font-semibold text-gray-600">{roomSpecs.bathroom}</span>
                  </div>
                </div>
              </motion.div>

              {/* Gallery Section */}
              {allImages.length > 1 && (
                <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeUp}>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Room Gallery</h2>
                  <p className="text-gray-500 text-sm mb-4">Click on any image to view it full-screen.</p>
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
                          alt={`${style.title} layout view ${i + 1}`}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="text-white text-xs font-semibold">View Zoom</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Floor Plans Request Card */}
              <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeUp} className="bg-slate-900 text-white rounded-3xl p-6 md:p-8 border border-slate-800 shadow-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-900/10 z-0" />
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="space-y-2 text-center md:text-left">
                    <span className="text-[10px] uppercase tracking-widest font-black text-orange-400">Exclusive Details</span>
                    <h2 className="text-xl font-extrabold">Get Floor Plans on WhatsApp</h2>
                    <p className="text-xs text-slate-405 max-w-md leading-relaxed">
                      To protect our architectural drafts, detailed floor plans and engineering drawings are shared exclusively via WhatsApp. Enter your number below to receive them instantly.
                    </p>
                  </div>
                  
                  <div className="w-full md:w-auto flex-shrink-0">
                    {whatsappSubmitted ? (
                      <div className="bg-green-500/15 border border-green-500/30 text-green-400 p-4 rounded-2xl text-center space-y-2">
                        <CheckCircle className="w-6 h-6 mx-auto text-green-500" />
                        <p className="text-xs font-bold">Request Sent to WhatsApp!</p>
                        <a 
                          href={`https://wa.me/${COMPANY.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(`Hello Amulya Builders, please send me the floor plan for the "${style?.title || ''}".`)}`}
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-[11px] font-black text-white bg-green-650 hover:bg-green-700 px-3.5 py-2 rounded-xl mt-1 transition-colors"
                        >
                          <MessageCircle className="w-3.5 h-3.5" /> Open Chat
                        </a>
                      </div>
                    ) : (
                      <form onSubmit={handleWhatsappSubmit} className="space-y-3 w-full max-w-sm">
                        <div className="flex gap-2">
                          <input
                            type="tel"
                            required
                            value={userWhatsapp}
                            onChange={(e) => {
                              setUserWhatsapp(e.target.value);
                              if (modalError) setModalError('');
                            }}
                            placeholder="WhatsApp Number (e.g. 98XXXXXXXX)"
                            className="w-full px-4 py-3 rounded-xl border border-slate-700 bg-slate-800/80 text-xs font-semibold focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-white placeholder-slate-500"
                          />
                          <button
                            type="submit"
                            disabled={submitting}
                            className="bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs px-5 py-3 rounded-xl transition-colors flex items-center gap-1.5 flex-shrink-0 cursor-pointer disabled:opacity-60"
                          >
                            {submitting ? '...' : 'Get Plans'}
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        {modalError && (
                          <p className="text-[10px] text-red-400 font-bold text-center md:text-left">{modalError}</p>
                        )}
                      </form>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Specs Sidebar & Call to Actions */}
            <div className="lg:col-span-1 space-y-6">
              
              {/* Specifications Card */}
              <motion.div
                initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeUp}
                className="bg-gray-50 rounded-2xl p-6 border border-gray-100"
              >
                <h2 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">Style Index Criteria</h2>
                <dl className="space-y-4">
                  {Object.entries(style.specifications || {}).map(([key, val]) => (
                    <div key={key} className="flex justify-between gap-4 pt-2 border-t border-gray-200 first:border-0 first:pt-0">
                      <dt className="text-xs text-gray-500 font-bold uppercase">{key}</dt>
                      <dd className="text-xs text-gray-900 font-semibold text-right">{val}</dd>
                    </div>
                  ))}
                  <div className="flex justify-between gap-4 pt-2 border-t border-gray-200">
                    <dt className="text-xs text-gray-500 font-bold uppercase">Primary Materials</dt>
                    <dd className="text-xs text-gray-900 font-semibold text-right max-w-[60%]">
                      {style.materials.join(', ')}
                    </dd>
                  </div>
                </dl>
              </motion.div>

              {/* Request Design Card */}
              <motion.div
                initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeUp}
                className="bg-white rounded-2xl p-6 md:p-8 border border-gray-150 shadow-md space-y-5"
              >
                <h3 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-3">Request Design</h3>
                
                {buySubmitted ? (
                  <div className="bg-green-50 border border-green-250 text-green-800 p-4 rounded-xl text-center space-y-2">
                    <CheckCircle className="w-8 h-8 text-green-500 mx-auto" />
                    <h4 className="font-bold">Request Sent!</h4>
                    <p className="text-xs text-gray-600">
                      We have received your design purchase inquiry. Our team will call you shortly to assist.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleBuySubmit} className="space-y-4">
                    <div>
                      <label htmlFor="buy-firstname" className="block text-xs font-bold text-gray-750 uppercase tracking-wider mb-1 text-gray-700">
                        First name
                      </label>
                      <input
                        id="buy-firstname"
                        type="text"
                        required
                        value={buyForm.firstName}
                        onChange={(e) => setBuyForm(prev => ({ ...prev, firstName: e.target.value }))}
                        placeholder="Enter Your First Name"
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-blue-500 text-gray-800 font-medium"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="buy-lastname" className="block text-xs font-bold text-gray-750 uppercase tracking-wider mb-1 text-gray-700">
                        Last name
                      </label>
                      <input
                        id="buy-lastname"
                        type="text"
                        required
                        value={buyForm.lastName}
                        onChange={(e) => setBuyForm(prev => ({ ...prev, lastName: e.target.value }))}
                        placeholder="Enter Your Last Name"
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-blue-500 text-gray-800 font-medium"
                      />
                    </div>

                    <div>
                      <label htmlFor="buy-email" className="block text-xs font-bold text-gray-755 uppercase tracking-wider mb-1 text-gray-700">
                        Email Address
                      </label>
                      <input
                        id="buy-email"
                        type="email"
                        required
                        value={buyForm.email}
                        onChange={(e) => setBuyForm(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="Enter Email Address"
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-blue-500 text-gray-800 font-medium"
                      />
                    </div>

                    <div>
                      <label htmlFor="buy-phone" className="block text-xs font-bold text-gray-755 uppercase tracking-wider mb-1 text-gray-700">
                        Phone Number
                      </label>
                      <input
                        id="buy-phone"
                        type="tel"
                        required
                        value={buyForm.phone}
                        onChange={(e) => setBuyForm(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="Enter Phone Number"
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-blue-500 text-gray-800 font-medium"
                      />
                    </div>

                    <div className="pt-2">
                      <span className="text-xs text-gray-400 font-bold block uppercase tracking-wider">Price</span>
                      <span className="text-2xl font-black text-rose-500 block mt-0.5">
                        {priceInfo}
                      </span>
                    </div>

                    <button
                      type="submit"
                      disabled={buySubmitting}
                      className="w-full py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded-xl transition-colors text-sm flex items-center justify-center gap-2 shadow-lg hover:shadow-cyan-500/20"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
                        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                        <polyline points="9 22 9 12 15 12 15 22" />
                      </svg>
                      Buy Design
                    </button>
                  </form>
                )}
              </motion.div>
            </div>
          </div>

          {/* Related Styles Section */}
          {relatedStyles.length > 0 && (
            <motion.div
              initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeUp}
              className="mt-16"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6">Explore Other Designs</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedStyles.map((rs) => (
                  <Link
                    key={rs.id}
                    to={`/designs/${rs.id}`}
                    className="group bg-white rounded-xl overflow-hidden card-shadow hover:-translate-y-1 transition-transform duration-300"
                    aria-label={`View ${rs.title} detail`}
                  >
                    <div className="h-40 overflow-hidden">
                      <img
                        src={rs.image}
                        alt={rs.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-4 flex flex-col justify-between min-h-[90px]">
                      <h3 className="font-bold text-gray-900 text-sm group-hover:text-blue-700 transition-colors">{rs.title}</h3>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-[10px] bg-gray-100 text-gray-500 font-bold px-2 py-0.5 rounded">
                          {rs.category}
                        </span>
                        <span className="text-xs text-blue-800 font-bold group-hover:text-orange-500 transition-colors flex items-center gap-0.5">
                          View details <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
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
              alt={`${style.title} gallery detail view ${lightboxIndex + 1}`}
              className="max-h-[85vh] max-w-full rounded-lg object-contain"
            />
            <p className="absolute bottom-4 text-white/60 text-sm">
              {lightboxIndex + 1} / {allImages.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp Submission Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl max-w-md w-full p-6 md:p-8 shadow-2xl relative border border-gray-100"
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="text-center space-y-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600 shadow-sm">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Unlock Floor Plans</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Please enter your WhatsApp number to request the detailed floor plans for the <strong className="text-gray-850 font-bold">{style?.title}</strong>.
                </p>
              </div>

              <form onSubmit={handleWhatsappSubmit} className="mt-6 space-y-4">
                <div>
                  <label htmlFor="user-whatsapp" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    WhatsApp Number
                  </label>
                  <input
                    id="user-whatsapp"
                    type="tel"
                    required
                    value={userWhatsapp}
                    onChange={(e) => {
                      setUserWhatsapp(e.target.value);
                      setModalError('');
                    }}
                    placeholder="+977-98XXXXXXXX"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white focus:border-green-500 font-semibold text-gray-800"
                  />
                  {modalError && (
                    <p className="mt-1 text-xs text-red-500 font-semibold">{modalError}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl transition-colors text-sm flex items-center justify-center gap-2 shadow-lg hover:shadow-green-500/20"
                >
                  {submitting ? (
                    <>
                      <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit & Open WhatsApp
                    </>
                  )}
                </button>
                
                <p className="text-[10px] text-gray-400 text-center leading-normal">
                  By submitting, we will open WhatsApp so you can send <strong className="text-gray-600">"yes"</strong> to confirm your request.
                </p>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
