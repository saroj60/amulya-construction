import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
  MapPin, Phone, Mail, MessageCircle, Clock, Send, CheckCircle, AlertCircle, FileText,
  User, Wrench, HardHat, Users, HelpCircle
} from 'lucide-react';
import { COMPANY } from '@/data';
import { api } from '@/services/api';
import { fadeUp, fadeLeft, fadeRight, staggerContainer, viewportOnce } from '@/utils/animations';

const initialForm = {
  name: '',
  phone: '',
  email: '',
  service: '',
  message: '',
};

const services = [
  'Residential Construction',
  'Commercial Construction',
  'Building Design & Planning',
  'Renovation & Remodeling',
  'Structural Construction',
  'Interior & Exterior Works',
  'Construction Consultancy',
  'Project Management',
  'Other / Not Sure',
];

function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = 'Your name is required.';
  if (!form.phone.trim()) errors.phone = 'Phone number is required.';
  else if (!/^[\d\s+\-()]{7,15}$/.test(form.phone)) errors.phone = 'Enter a valid phone number.';
  if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Enter a valid email address.';
  if (!form.message.trim()) errors.message = 'Please describe your project.';
  else if (form.message.trim().length < 20) errors.message = 'Please provide more detail (at least 20 characters).';
  return errors;
}

export default function ContactPage() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const msg = params.get('message');
    const svc = params.get('service');
    setForm((prev) => ({
      ...prev,
      ...(msg ? { message: msg } : {}),
      ...(svc ? { service: svc } : {})
    }));
  }, [location.search]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitting(true);
    
    api.submitLead({
      name: form.name,
      phone: form.phone,
      email: form.email,
      message: `[Service Requested: ${form.service}]\n\n${form.message}`
    })
      .then(() => {
        setSubmitting(false);
        setSubmitted(true);
        setForm(initialForm);
      })
      .catch((err) => {
        setSubmitting(false);
        setErrors({ submit: err.message || 'Failed to submit inquiry.' });
      });
  }

  const inputClass = (field) =>
    `w-full pl-11 pr-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-orange-500/10 ${
      errors[field]
        ? 'border-red-300 bg-red-50/50 focus:border-red-500'
        : 'border-gray-200 bg-gray-50/50 focus:bg-white focus:border-orange-500'
    }`;

  return (
    <>
      <Helmet>
        <title>Contact Us | Construction Company in Kathmandu, Bhaktapur, Lalitpur, Janakpur & Dhanusha | {COMPANY.name}</title>
        <meta
          name="description"
          content="Contact Amulya Builders — Nepal's trusted construction company serving Kathmandu, Bhaktapur, Lalitpur, Janakpur, and Dhanusha. Reach our offices in Sabaila (Dhanusha) and Tikathali (Lalitpur) for free consultations, site visits, and BOQ estimates."
        />
        <meta
          name="keywords"
          content="construction company in kathmandu, construction company in bhaktapur, construction company in lalitpur, construction company in janakpur, construction company in dhanusha, contact amulya builders, building contractor office lalitpur, house construction office dhanusha, construction consultation nepal"
        />
        <link rel="canonical" href="https://amulyabuilders.com.np/contact" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://amulyabuilders.com.np/contact" />
        <meta property="og:title" content={`Contact Us | Construction Company in Kathmandu, Bhaktapur, Lalitpur, Janakpur & Dhanusha | ${COMPANY.name}`} />
        <meta property="og:description" content="Contact Amulya Builders — Nepal's trusted construction company serving Kathmandu, Bhaktapur, Lalitpur, Janakpur, and Dhanusha. Head office in Dhanusha & Branch in Lalitpur." />
        <meta property="og:image" content="https://amulyabuilders.com.np/contact-hero.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://amulyabuilders.com.np/contact" />
        <meta name="twitter:title" content={`Contact Us | Construction Company in Kathmandu, Bhaktapur, Lalitpur, Janakpur & Dhanusha | ${COMPANY.name}`} />
        <meta name="twitter:description" content="Contact Amulya Builders — Nepal's trusted construction company serving Kathmandu, Bhaktapur, Lalitpur, Janakpur, and Dhanusha. Head office in Dhanusha & Branch in Lalitpur." />
        <meta name="twitter:image" content="https://amulyabuilders.com.np/contact-hero.png" />
      </Helmet>

      {/* Page Hero Banner */}
      <section
        className="relative pt-24 pb-8 md:pt-32 md:pb-12 bg-gradient-to-b from-[#011c40] via-[#02285a] to-[#011738] text-white overflow-hidden border-b border-white/10"
        aria-label="Contact page header"
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#cd0102] to-transparent z-10 opacity-80" />
        
        {/* Subtle ambient lighting */}
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 container-custom">
          {/* Accessible Heading for SEO & Screen Readers */}
          <h1 className="sr-only">Start Your Project Today — Amulya Builders &amp; Trading Nepal</h1>

          {/* Hero Banner Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="-mx-4 sm:mx-0 rounded-none sm:rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border-y sm:border border-white/15 bg-slate-950 group"
          >
            <img
              src="/contact-hero.png"
              alt="Start Your Project Today - Amulya Builders & Trading: Building a Stronger Nepal"
              className="w-full h-auto object-cover block transition-transform duration-700 group-hover:scale-[1.01]"
              loading="eager"
            />
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="section-padding bg-gray-50/50" aria-label="Contact information and form">
        <div className="container-custom">
          
          {/* Main Redesigned 2-Column Contact Block */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              
              {/* Left Panel: Attractive Dark Navy Info Panel */}
              <div className="lg:col-span-5 bg-slate-900 text-white p-8 md:p-12 flex flex-col justify-between space-y-8 relative overflow-hidden">
                <div className="space-y-6">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest font-black text-orange-400 block mb-1">Amulya Builders &amp; Trading</span>
                    <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight leading-tight">
                      Let's Build Something <span className="text-orange-500">Great</span>
                    </h2>
                    <p className="text-slate-450 text-xs mt-3 leading-relaxed">
                      Share your project requirements, location, or design questions. Our team of engineering and design experts is ready to translate your dreams into reality.
                    </p>
                  </div>

                  {/* Feature cards */}
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-800/40 border border-slate-800/60 hover:bg-slate-800/60 transition-colors">
                      <div className="w-9 h-9 rounded-full bg-orange-500/10 border border-orange-500/30 flex items-center justify-center flex-shrink-0 text-orange-400">
                        <HardHat className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-100">Quality Construction</h4>
                        <p className="text-[11px] text-slate-400 mt-0.5">We deliver top-quality workmanship with certified materials.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-800/40 border border-slate-800/60 hover:bg-slate-800/60 transition-colors">
                      <div className="w-9 h-9 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center flex-shrink-0 text-blue-400">
                        <Users className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-100">Experienced Team</h4>
                        <p className="text-[11px] text-slate-400 mt-0.5">Skilled engineering professionals with years of site experience.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-800/40 border border-slate-800/60 hover:bg-slate-800/60 transition-colors">
                      <div className="w-9 h-9 rounded-full bg-orange-500/10 border border-orange-500/30 flex items-center justify-center flex-shrink-0 text-orange-400">
                        <Clock className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-100">On-Time Delivery</h4>
                        <p className="text-[11px] text-slate-400 mt-0.5">We value your commitment and always deliver on schedule.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Construction site image at bottom */}
                <div className="relative h-48 rounded-2xl overflow-hidden border border-slate-800 shadow-inner group">
                  <img
                    src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80"
                    alt="Premium construction site render"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  <span className="absolute bottom-3 left-4 text-[10px] font-bold text-white bg-orange-500 px-2 py-0.5 rounded uppercase tracking-wider">
                    Our Project Site
                  </span>
                </div>
              </div>

              {/* Right Panel: Clean White Contact Form */}
              <div className="lg:col-span-7 p-8 md:p-12 bg-white flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl font-extrabold text-gray-900">
                    Send Us a <span className="text-orange-500">Message</span>
                  </h2>
                  <p className="text-xs text-gray-500 mt-1 mb-6">
                    Fill out the consultation request below, and our project managers will reply within 24 hours.
                  </p>

                  {submitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                      className="bg-green-50/50 border border-green-200 rounded-2xl p-8 text-center"
                    >
                      <CheckCircle className="w-14 h-14 text-green-500 mx-auto mb-4" />
                      <h3 className="text-lg font-bold text-gray-900 mb-2">Message Sent Successfully!</h3>
                      <p className="text-xs text-gray-600 mb-2">
                        Thank you for reaching out. Our team will contact you within 24 hours.
                      </p>
                      <p className="text-[11px] text-gray-500 mb-6">
                        For faster response, reach us directly on WhatsApp.
                      </p>
                      <div className="flex flex-wrap gap-3 justify-center">
                        <button
                          onClick={() => setSubmitted(false)}
                          className="btn-outline text-xs px-5 py-2.5 rounded-xl font-bold"
                        >
                          Send Another Message
                        </button>
                        <a
                          href={`https://wa.me/${COMPANY.whatsapp.replace(/\D/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-650 hover:bg-green-700 text-white font-bold rounded-xl transition-all shadow text-xs"
                        >
                          <MessageCircle className="w-4 h-4" />
                          WhatsApp Us
                        </a>
                      </div>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} noValidate className="space-y-5">
                      {errors.submit && (
                        <div className="bg-red-50 border border-red-200 text-red-750 p-3.5 rounded-xl flex items-start gap-2 text-xs font-bold" role="alert">
                          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                          <span>{errors.submit}</span>
                        </div>
                      )}
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {/* Name */}
                        <div className="space-y-1.5">
                          <label htmlFor="name" className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                            Full Name <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <div className="absolute left-3.5 top-3 text-gray-400">
                              <User className="w-4.5 h-4.5" />
                            </div>
                            <input
                              id="name"
                              name="name"
                              type="text"
                              autoComplete="name"
                              value={form.name}
                              onChange={handleChange}
                              placeholder="Ram Sharma"
                              className={inputClass('name')}
                              aria-required="true"
                            />
                          </div>
                          {errors.name && (
                            <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" /> {errors.name}
                            </p>
                          )}
                        </div>

                        {/* Phone */}
                        <div className="space-y-1.5">
                          <label htmlFor="phone" className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                            Phone Number <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <div className="absolute left-3.5 top-3 text-gray-400">
                              <Phone className="w-4.5 h-4.5" />
                            </div>
                            <input
                              id="phone"
                              name="phone"
                              type="tel"
                              autoComplete="tel"
                              value={form.phone}
                              onChange={handleChange}
                              placeholder="+977-98XXXXXXXX"
                              className={inputClass('phone')}
                              aria-required="true"
                            />
                          </div>
                          {errors.phone && (
                            <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" /> {errors.phone}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Email */}
                      <div className="space-y-1.5">
                        <label htmlFor="email" className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                          Email Address <span className="text-gray-400 font-normal">(Optional)</span>
                        </label>
                        <div className="relative">
                          <div className="absolute left-3.5 top-3 text-gray-400">
                            <Mail className="w-4.5 h-4.5" />
                          </div>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="you@example.com"
                            className={inputClass('email')}
                          />
                        </div>
                        {errors.email && (
                          <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> {errors.email}
                          </p>
                        )}
                      </div>

                      {/* Service */}
                      <div className="space-y-1.5">
                        <label htmlFor="service" className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                          Service Required
                        </label>
                        <div className="relative">
                          <div className="absolute left-3.5 top-3.5 text-gray-400">
                            <Wrench className="w-4 h-4" />
                          </div>
                          <select
                            id="service"
                            name="service"
                            value={form.service}
                            onChange={handleChange}
                            className={`${inputClass('service')} cursor-pointer`}
                          >
                            <option value="">— Select a service —</option>
                            {services.map((s) => (
                              <option key={s} value={s}>{s}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Message */}
                      <div className="space-y-1.5">
                        <label htmlFor="message" className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                          Project Details <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute left-3.5 top-3 text-gray-400">
                            <MessageCircle className="w-4.5 h-4.5" />
                          </div>
                          <textarea
                            id="message"
                            name="message"
                            rows={4}
                            value={form.message}
                            onChange={handleChange}
                            placeholder="Describe your project — location, size, budget range, timeline..."
                            className={`${inputClass('message')} resize-none`}
                            aria-required="true"
                          />
                        </div>
                        {errors.message && (
                          <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> {errors.message}
                          </p>
                        )}
                      </div>

                      {/* UX Help Box */}
                      <div className="flex gap-2.5 p-3.5 bg-orange-50/50 border border-orange-100 rounded-xl text-xs text-orange-950">
                        <HelpCircle className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold">Not sure what service you need?</p>
                          <p className="text-gray-600 mt-0.5">Contact us and our experts will guide you.</p>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-extrabold text-xs py-3.5 rounded-xl transition-all shadow hover:shadow-md hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
                      >
                        {submitting ? (
                          <>
                            <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            Send Message
                          </>
                        )}
                      </button>

                      <p className="text-[11px] text-gray-400 text-center">
                        We respond within 24 hours. For faster response, use{' '}
                        <a href={`https://wa.me/${COMPANY.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-green-600 font-extrabold hover:underline">
                          WhatsApp
                        </a>.
                      </p>
                    </form>
                  )}
                </div>
              </div>

            </div>
          </div>

          {/* Quick Contact & Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            
            {/* Offices Card */}
            <div className="bg-white p-6 rounded-2xl border border-gray-150/80 shadow-sm space-y-4">
              <div className="flex items-center gap-2.5 pb-3 border-b border-gray-100">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-800">
                  <MapPin className="w-4.5 h-4.5" />
                </div>
                <h3 className="text-sm font-extrabold text-gray-900 uppercase tracking-wider">Our Offices</h3>
              </div>
              <div className="space-y-3 text-xs">
                <div>
                  <p className="font-bold text-gray-500 uppercase text-[9px] tracking-wider">Head Office</p>
                  <p className="text-gray-700 font-semibold mt-0.5">{COMPANY.address}</p>
                </div>
                <div>
                  <p className="font-bold text-gray-500 uppercase text-[9px] tracking-wider">Branch Office</p>
                  <p className="text-gray-700 font-semibold mt-0.5">{COMPANY.branchAddress}</p>
                </div>
                {COMPANY.vat && (
                  <div className="pt-2 border-t border-gray-50 flex justify-between items-center text-[10px] font-bold text-gray-500">
                    <span>VAT Registration</span>
                    <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-800 font-black">{COMPANY.vat}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Direct Contacts Card */}
            <div className="bg-white p-6 rounded-2xl border border-gray-150/80 shadow-sm space-y-4">
              <div className="flex items-center gap-2.5 pb-3 border-b border-gray-100">
                <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center text-orange-600">
                  <Phone className="w-4.5 h-4.5" />
                </div>
                <h3 className="text-sm font-extrabold text-gray-900 uppercase tracking-wider">Direct Contacts</h3>
              </div>
              <div className="space-y-3.5 text-xs font-semibold">
                <div className="flex flex-col">
                  <span className="text-gray-500 uppercase text-[9px] tracking-wider font-bold">Landline</span>
                  <a href={`tel:${COMPANY.phone}`} className="text-gray-800 hover:text-orange-500 transition-colors mt-0.5 font-bold">
                    {COMPANY.phone}
                  </a>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-500 uppercase text-[9px] tracking-wider font-bold">Mobile &amp; WhatsApp</span>
                  <a href={`tel:${COMPANY.mobile}`} className="text-gray-800 hover:text-orange-500 transition-colors mt-0.5 font-bold">
                    {COMPANY.mobile}
                  </a>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-500 uppercase text-[9px] tracking-wider font-bold">Email Address</span>
                  <a href={`mailto:${COMPANY.email}`} className="text-gray-800 hover:text-orange-500 transition-colors mt-0.5 font-bold break-all">
                    {COMPANY.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Business Hours Card */}
            <div className="bg-white p-6 rounded-2xl border border-gray-150/80 shadow-sm space-y-4">
              <div className="flex items-center gap-2.5 pb-3 border-b border-gray-100">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-800">
                  <Clock className="w-4.5 h-4.5" />
                </div>
                <h3 className="text-sm font-extrabold text-gray-900 uppercase tracking-wider">Business Hours</h3>
              </div>
              <div className="space-y-2.5 text-xs text-gray-700 font-semibold">
                <div className="p-2 bg-gray-50 rounded-lg border border-gray-100 text-[11px] leading-relaxed text-gray-600">
                  <p>{COMPANY.businessHours.weekdays}</p>
                  <p>{COMPANY.businessHours.saturday}</p>
                </div>
                <p className="text-[10px] text-gray-400 italic font-medium">{COMPANY.businessHours.closed}</p>
              </div>
            </div>

          </div>

          {/* Map Location */}
          <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeUp}>
            <h2 className="text-base font-extrabold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-orange-500 rounded-full" /> Find Our Office
            </h2>
            <div className="rounded-3xl overflow-hidden h-72 md:h-[400px] border border-gray-100 shadow-md">
              <iframe
                src={COMPANY.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Amulya Builders Office Location"
                aria-label="Google Maps showing Amulya Builders Location"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
