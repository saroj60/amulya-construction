import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Download,
  Printer,
  ArrowLeft,
  Building2,
  Award,
  CheckCircle,
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  Clock,
  HardHat,
  Layers,
  Sparkles,
  FileText,
} from 'lucide-react';
import { COMPANY, PROJECTS, TEAM, SERVICES } from '@/data';
import { api } from '@/services/api';

export default function CompanyProfilePage() {
  const [searchParams] = useSearchParams();
  const [projects, setProjects] = useState(PROJECTS);
  const [team, setTeam] = useState(TEAM);
  const [services, setServices] = useState(SERVICES);
  const [customPdfUrl, setCustomPdfUrl] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.allSettled([
      api.getProjects(),
      api.getTeam(),
      api.getServices(),
      api.getCalculatorConfig(),
    ]).then(([projRes, teamRes, servRes, cfgRes]) => {
      if (projRes.status === 'fulfilled' && Array.isArray(projRes.value) && projRes.value.length > 0) {
        setProjects(projRes.value);
      }
      if (teamRes.status === 'fulfilled' && Array.isArray(teamRes.value) && teamRes.value.length > 0) {
        setTeam(teamRes.value);
      }
      if (servRes.status === 'fulfilled' && Array.isArray(servRes.value) && servRes.value.length > 0) {
        setServices(servRes.value);
      }
      if (cfgRes.status === 'fulfilled' && cfgRes.value?.companyProfilePdfUrl) {
        setCustomPdfUrl(cfgRes.value.companyProfilePdfUrl);
      }
      setLoading(false);
    });
  }, []);

  // Auto-trigger download if ?download=true is passed in URL
  useEffect(() => {
    if (!loading && searchParams.get('download') === 'true') {
      const timer = setTimeout(() => {
        handleDownloadPdf();
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [loading, searchParams, customPdfUrl]);

  const handleDownloadPdf = () => {
    if (customPdfUrl) {
      const a = document.createElement('a');
      a.href = customPdfUrl;
      a.download = 'Amulya-Builders-Company-Profile.pdf';
      a.target = '_blank';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      return;
    }
    const prevTitle = document.title;
    document.title = 'Amulya-Builders-Company-Profile';
    window.print();
    setTimeout(() => {
      document.title = prevTitle;
    }, 1000);
  };

  // Prioritize projects that have rich details (named projects first, then gallery projects)
  const sortedProjects = [...projects].sort((a, b) => {
    const aNamed = a.title && !a.title.startsWith('Project Code:');
    const bNamed = b.title && !b.title.startsWith('Project Code:');
    if (aNamed && !bNamed) return -1;
    if (!aNamed && bNamed) return 1;
    return (b.id || 0) - (a.id || 0);
  });

  const featuredProjectsPage1 = sortedProjects.slice(0, 6);
  const featuredProjectsPage2 = sortedProjects.slice(6, 12);
  const featuredProjectsPage3 = sortedProjects.slice(12, 18);

  return (
    <>
      <Helmet>
        <title>Company Profile (PDF Brochure) | {COMPANY.name}</title>
        <meta
          name="description"
          content={`Download the official Corporate Company Profile PDF of ${COMPANY.name} — Nepal's trusted architectural design, structural engineering, and turnkey construction firm.`}
        />
      </Helmet>

      {/* Print-specific A4 rules */}
      <style>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 0mm;
          }
          html, body {
            background: #ffffff !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          header, footer, nav, .no-print {
            display: none !important;
          }
          .a4-page {
            width: 210mm !important;
            height: 297mm !important;
            max-height: 297mm !important;
            margin: 0 !important;
            box-shadow: none !important;
            border: none !important;
            page-break-after: always !important;
            break-after: page !important;
            overflow: hidden !important;
          }
          .a4-page:last-child {
            page-break-after: auto !important;
            break-after: auto !important;
          }
        }
      `}</style>

      {/* Sticky Top Action Bar (Hidden in Print / PDF output) */}
      <div className="no-print sticky top-20 z-40 bg-[#012352]/95 backdrop-blur-md text-white border-b border-white/15 shadow-lg">
        <div className="container-custom py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              to="/about"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back
            </Link>
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-orange-400" />
              <span className="text-sm font-bold tracking-wide">
                Official Company Profile Brochure (A4 PDF — 8 Pages)
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 rounded-full">
                Live Database Synced
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {customPdfUrl && (
              <a
                href={customPdfUrl}
                download="Amulya-Builders-Company-Profile.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg shadow transition-all"
              >
                <Download className="w-4 h-4" />
                Download Uploaded PDF
              </a>
            )}
            <button
              onClick={handleDownloadPdf}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white text-xs sm:text-sm font-extrabold rounded-xl shadow-lg shadow-orange-500/30 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              Save / Download as PDF
            </button>
            <button
              onClick={() => window.print()}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl border border-white/15 transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              Print Brochure
            </button>
          </div>
        </div>
      </div>

      {/* Main Brochure Viewer Container */}
      <div className="bg-slate-200/80 py-8 md:py-12 px-2 sm:px-4 print:bg-white print:p-0">
        <div className="max-w-[210mm] mx-auto space-y-8 print:space-y-0">

          {/* ==============================================================
              PAGE 1: EXECUTIVE COVER PAGE
             ============================================================== */}
          <section className="a4-page relative bg-[#011839] text-white w-full min-h-[297mm] shadow-2xl border border-slate-300 flex flex-col justify-between overflow-hidden">
            {/* Top Crimson & Orange Accent Bar */}
            <div className="h-3 w-full bg-gradient-to-r from-[#cd0102] via-orange-500 to-[#012352]" />

            {/* Subtle Geometric Background Accent */}
            <div className="absolute -right-28 top-24 w-96 h-96 rounded-full bg-orange-500/10 blur-3xl pointer-events-none" />
            <div className="absolute -left-24 bottom-32 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

            {/* Top Brand Header */}
            <div className="px-10 pt-10 flex items-center justify-between relative z-10">
              <div className="bg-white px-5 py-3 rounded-2xl shadow-lg inline-flex items-center">
                <img
                  src="/amulyalogo1.png"
                  alt={COMPANY.name}
                  className="h-14 w-auto object-contain"
                />
              </div>
              <div className="text-right">
                <span className="inline-block px-3.5 py-1 rounded-full bg-orange-500/20 border border-orange-400/40 text-orange-300 text-[11px] font-extrabold uppercase tracking-widest">
                  Corporate Profile • {new Date().getFullYear()}
                </span>
                <p className="text-xs text-slate-300 mt-1.5 font-medium">
                  Established {COMPANY.foundedYear} AD • Regd. in Nepal
                </p>
              </div>
            </div>

            {/* Center Title & Hero Showcase */}
            <div className="px-10 my-auto py-6 relative z-10 space-y-6">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 text-orange-400 text-xs font-extrabold uppercase tracking-[0.2em]">
                  <span className="w-8 h-0.5 bg-orange-500" />
                  Architecture • Structural Engineering • Turnkey Construction
                </div>
                <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-[1.1] text-white">
                  COMPANY<br />
                  <span className="text-orange-500">PROFILE</span>
                </h1>
                <p className="text-lg font-bold text-slate-200 max-w-xl leading-snug">
                  {COMPANY.name}
                </p>
                <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
                  Delivering NBC 105:2020 seismic-compliant residential villas, commercial complexes,
                  and institutional landmarks across Kathmandu, Lalitpur, Bhaktapur, and Janakpur.
                </p>
              </div>

              {/* Hero Collage Grid */}
              <div className="grid grid-cols-12 gap-3.5 pt-2">
                <div className="col-span-8 h-64 rounded-2xl overflow-hidden border-2 border-white/20 shadow-xl relative">
                  <img
                    src="/project-gallery/project-19-1.jpg"
                    alt="Amulya Builders Featured Commercial & Residential Project"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent p-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-orange-400">
                      Turnkey Excellence
                    </span>
                    <p className="text-xs font-bold text-white">
                      Seismic-Resistant Residential & Commercial Landmarks
                    </p>
                  </div>
                </div>
                <div className="col-span-4 flex flex-col gap-3.5 h-64">
                  <div className="h-1/2 rounded-2xl overflow-hidden border-2 border-white/20 shadow-lg">
                    <img
                      src="/project-gallery/project-21-1.jpg"
                      alt="Residential Villa Project"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="h-1/2 rounded-2xl overflow-hidden border-2 border-white/20 shadow-lg">
                    <img
                      src="/project-gallery/project-23-1.jpg"
                      alt="Commercial Complex Project"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Key Metrics Strip */}
              <div className="grid grid-cols-4 gap-3 pt-2">
                {[
                  { value: `${projects.length}+`, label: 'Featured Projects' },
                  { value: COMPANY.stats.yearsExperience || '15+', label: 'Years Experience' },
                  { value: '100%', label: 'NBC Code Compliant' },
                  { value: 'Turnkey', label: 'Design to Handover' },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="bg-white/8 border border-white/15 rounded-xl p-3.5 text-center"
                  >
                    <div className="text-xl font-black text-orange-400">{stat.value}</div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-300 mt-0.5">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Cover Footer Strip */}
            <div className="bg-[#001029] border-t border-white/15 px-10 py-5 flex items-center justify-between text-xs text-slate-300 relative z-10">
              <div className="flex items-center gap-6">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-orange-400" />
                  {COMPANY.address} | Branch: {COMPANY.branchAddress}
                </span>
              </div>
              <div className="flex items-center gap-4 font-bold text-white">
                <span>{COMPANY.mobile || COMPANY.phone}</span>
                <span className="text-orange-400">•</span>
                <span>www.amulyabuilders.com.np</span>
              </div>
            </div>
          </section>

          {/* ==============================================================
              PAGE 2: ABOUT US, VISION, MISSION & CORE VALUES
             ============================================================== */}
          <section className="a4-page bg-white text-slate-900 w-full min-h-[297mm] shadow-2xl border border-slate-300 flex flex-col justify-between p-10">
            <div>
              {/* Page Header */}
              <div className="flex items-center justify-between pb-4 border-b-2 border-[#012352]">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-500">
                    01 // Corporate Overview
                  </span>
                  <h2 className="text-2xl font-black text-[#012352] tracking-tight">
                    Who We Are & What Drives Us
                  </h2>
                </div>
                <img src="/amulyalogo1.png" alt="Logo" className="h-10 w-auto object-contain" />
              </div>

              {/* Company Story */}
              <div className="grid grid-cols-12 gap-6 mt-6 items-center">
                <div className="col-span-7 space-y-3 text-xs leading-relaxed text-slate-700">
                  <h3 className="text-base font-extrabold text-slate-900">
                    Building Nepal’s Future Since {COMPANY.foundedYear}
                  </h3>
                  <p>
                    <strong>{COMPANY.name}</strong> was founded in {COMPANY.foundedYear} by a team of
                    licensed civil and structural engineers with a clear mission: to make high-precision,
                    earthquake-resistant construction accessible, transparent, and dependable for families
                    and businesses across Nepal.
                  </p>
                  <p>
                    Operating across <strong>Kathmandu, Lalitpur, Bhaktapur, and Janakpur (Dhanusha)</strong>,
                    we specialize in end-to-end turnkey execution—from soil testing, 2D/3D architectural
                    master-planning, and municipal permit approvals to structural RCC framing, interior
                    finishing, and post-handover warranty support.
                  </p>
                  <p>
                    Every building we design and construct strictly adheres to the{' '}
                    <strong>Nepal National Building Code (NBC 105:2020)</strong> for Seismic Zone V,
                    backed by detailed Bills of Quantities (BOQ) and certified Grade-A construction materials.
                  </p>
                </div>
                <div className="col-span-5">
                  <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md h-52">
                    <img
                      src="/project-gallery/project-2.jpg"
                      alt="Amulya Builders Residential Architecture"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Vision & Mission Cards */}
              <div className="grid grid-cols-2 gap-5 mt-6">
                <div className="bg-[#012352] text-white rounded-2xl p-5 border-l-4 border-orange-500">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-orange-400">
                    Our Vision
                  </span>
                  <h4 className="text-sm font-black mt-1 mb-2">
                    Setting the Benchmark for Safe, Modern Nepali Architecture
                  </h4>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    To be Nepal’s most trusted engineering and turnkey construction partner—recognized for
                    seismic resilience, architectural innovation, transparent pricing, and uncompromising build quality.
                  </p>
                </div>

                <div className="bg-slate-900 text-white rounded-2xl p-5 border-l-4 border-[#cd0102]">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-orange-400">
                    Our Mission
                  </span>
                  <h4 className="text-sm font-black mt-1 mb-2">
                    Transparent Engineering & On-Time Turnkey Delivery
                  </h4>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    To deliver every residential and commercial project on schedule and within budget through
                    rigorous site supervision, itemized BOQ transparency, and NBC-compliant structural engineering.
                  </p>
                </div>
              </div>

              {/* 4 Core Values */}
              <div className="mt-6">
                <h3 className="text-xs font-black uppercase tracking-widest text-[#012352] mb-3">
                  Our Core Engineering Values
                </h3>
                <div className="grid grid-cols-2 gap-3.5">
                  {[
                    {
                      title: '1. Uncompromising Structural Integrity',
                      desc: 'Strict compliance with NBC 105:2020 & IS codes, ductile detailing, and lab-tested concrete/steel quality.',
                    },
                    {
                      title: '2. 100% BOQ & Cost Transparency',
                      desc: 'Detailed stage-wise Bill of Quantities with zero hidden charges and specified material brands.',
                    },
                    {
                      title: '3. Punctual Milestone Delivery',
                      desc: 'Critical-path project scheduling with weekly progress updates and dedicated on-site engineers.',
                    },
                    {
                      title: '4. Client-First Lifecycle Support',
                      desc: 'Single-window turnkey management from municipal blueprint approval to post-handover warranty.',
                    },
                  ].map((val, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-slate-50 border border-slate-200"
                    >
                      <h5 className="text-xs font-extrabold text-[#012352]">{val.title}</h5>
                      <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">{val.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Why Clients Trust Us Checklist */}
              <div className="mt-6 bg-orange-50/70 border border-orange-200 rounded-2xl p-4">
                <h4 className="text-xs font-black uppercase tracking-wider text-orange-800 mb-2.5">
                  Why Homeowners & Institutions Choose Amulya Builders
                </h4>
                <div className="grid grid-cols-2 gap-2 text-[11px] font-semibold text-slate-700">
                  {[
                    'NEC Registered Civil & Structural Engineers',
                    'Seismic Zone V Earthquake-Resistant Design',
                    'Complete Municipal Drawing & Permit Handling',
                    '3D Photorealistic Exterior & Interior Walkthroughs',
                    'Certified Grade-A Materials (FE-500D TMT & OPC Cement)',
                    'Dedicated Site Engineer Supervision & Quality Audits',
                  ].map((pt, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Page Footer */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-500 font-semibold">
              <span>{COMPANY.name} — Corporate Profile</span>
              <span>Page 02 of 08</span>
            </div>
          </section>

          {/* ==============================================================
              PAGE 3: MESSAGE FROM MD & LEADERSHIP TEAM
             ============================================================== */}
          <section className="a4-page bg-white text-slate-900 w-full min-h-[297mm] shadow-2xl border border-slate-300 flex flex-col justify-between p-10">
            <div>
              {/* Page Header */}
              <div className="flex items-center justify-between pb-4 border-b-2 border-[#012352]">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-500">
                    02 // Executive Leadership & Engineering Team
                  </span>
                  <h2 className="text-2xl font-black text-[#012352] tracking-tight">
                    Leadership Message & Core Team
                  </h2>
                </div>
                <img src="/amulyalogo1.png" alt="Logo" className="h-10 w-auto object-contain" />
              </div>

              {/* Message from Managing Director */}
              <div className="mt-6 bg-gradient-to-br from-[#012352] to-[#02336e] text-white rounded-2xl p-6 shadow-md">
                <div className="grid grid-cols-12 gap-6 items-center">
                  <div className="col-span-4">
                    <div className="rounded-xl overflow-hidden border-2 border-orange-400 shadow-lg aspect-[4/5] bg-slate-900">
                      <img
                        src="/md-sujit-shah.jpg"
                        alt="Er. Sujit Shah — MD & CEO"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    <div className="mt-2.5 text-center">
                      <h3 className="text-sm font-black text-white">Er. Sujit Shah</h3>
                      <p className="text-[11px] font-bold text-orange-400 uppercase tracking-wider">
                        Managing Director & CEO
                      </p>
                    </div>
                  </div>

                  <div className="col-span-8 space-y-3 text-xs leading-relaxed text-slate-100">
                    <span className="inline-block px-2.5 py-0.5 rounded bg-orange-500 text-white text-[10px] font-extrabold uppercase tracking-wider">
                      Message from the Managing Director
                    </span>
                    <h4 className="text-base font-black text-white leading-snug">
                      “We don’t just pour concrete—we engineer safe, generational homes and landmarks.”
                    </h4>
                    <p>
                      At <strong>{COMPANY.name}</strong>, we understand that building a home or commercial
                      facility is one of the most important investments of your life. In a seismically
                      active nation like Nepal, structural safety, accurate engineering, and material
                      honesty cannot be compromised.
                    </p>
                    <p>
                      Over the years, our team of dedicated architects, structural engineers, and site
                      supervisors has delivered projects across Kathmandu Valley and Janakpur with a single
                      promise: complete transparency in cost, strict adherence to the National Building Code,
                      and craftsmanship that stands the test of generations.
                    </p>
                    <div className="pt-2 border-t border-white/15 flex items-center justify-between text-[11px] text-orange-300 font-bold">
                      <span>Er. Sujit Shah — Senior Civil Engineer</span>
                      <span>Kathmandu & Janakpur, Nepal</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Engineering & Leadership Team Grid (Synced from Database) */}
              <div className="mt-7">
                <div className="flex items-center justify-between mb-3.5">
                  <h3 className="text-sm font-black uppercase tracking-wider text-[#012352]">
                    Our Key Engineering & Leadership Team
                  </h3>
                  <span className="text-[11px] text-slate-500 font-semibold">
                    NEC Licensed Engineers & Project Specialists
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  {team.filter(m => !m.name?.includes('Sujit Shah')).slice(0, 8).map((member, index) => (
                    <div
                      key={member.id || index}
                      className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200"
                    >
                      <div className="w-14 h-16 rounded-lg overflow-hidden bg-[#012352] shrink-0 border border-slate-300 flex items-center justify-center text-white font-black text-sm">
                        {member.image ? (
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover object-top"
                          />
                        ) : (
                          <span>{member.avatar || member.name?.slice(0, 2)}</span>
                        )}
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs font-black text-slate-900 truncate">{member.name}</h4>
                        <p className="text-[11px] font-extrabold text-orange-600 truncate mt-0.5">
                          {member.designation}
                        </p>
                        {member.qualification && (
                          <p className="text-[10px] text-slate-600 font-medium truncate">
                            {member.qualification}
                          </p>
                        )}
                        {member.experience && (
                          <span className="inline-block mt-0.5 px-2 py-0.2 rounded-full bg-blue-50 text-[#012352] text-[9px] font-bold border border-blue-200">
                            {member.experience} Experience
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Page Footer */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-500 font-semibold">
              <span>{COMPANY.name} — Corporate Profile</span>
              <span>Page 03 of 08</span>
            </div>
          </section>

          {/* ==============================================================
              PAGE 4: CORE ENGINEERING & CONSTRUCTION SERVICES
             ============================================================== */}
          <section className="a4-page bg-white text-slate-900 w-full min-h-[297mm] shadow-2xl border border-slate-300 flex flex-col justify-between p-10">
            <div>
              {/* Page Header */}
              <div className="flex items-center justify-between pb-4 border-b-2 border-[#012352]">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-500">
                    03 // Comprehensive Capabilities
                  </span>
                  <h2 className="text-2xl font-black text-[#012352] tracking-tight">
                    Our Core Engineering & Turnkey Services
                  </h2>
                </div>
                <img src="/amulyalogo1.png" alt="Logo" className="h-10 w-auto object-contain" />
              </div>

              <p className="text-xs text-slate-600 mt-4 leading-relaxed">
                We provide complete single-window architectural, structural, and construction solutions
                tailored for residential homeowners, commercial developers, and institutions across Nepal.
              </p>

              {/* Services Grid (Synced from Database) */}
              <div className="grid grid-cols-2 gap-4 mt-5">
                {services.slice(0, 6).map((service, idx) => {
                  const featuresList = Array.isArray(service.features)
                    ? service.features
                    : typeof service.features === 'string'
                    ? (() => {
                        try {
                          return JSON.parse(service.features);
                        } catch {
                          return [];
                        }
                      })()
                    : [];

                  return (
                    <div
                      key={service.id || idx}
                      className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="px-2.5 py-0.5 rounded-md bg-[#012352] text-white text-[10px] font-black">
                            0{idx + 1}
                          </span>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600">
                            Turnkey Solution
                          </span>
                        </div>
                        <h3 className="text-sm font-black text-[#012352]">{service.title}</h3>
                        <p className="text-[11px] text-slate-600 mt-1.5 leading-relaxed line-clamp-3">
                          {service.shortDesc || service.description}
                        </p>
                      </div>

                      {featuresList.length > 0 && (
                        <ul className="mt-3 pt-2.5 border-t border-slate-200/80 grid grid-cols-1 gap-1">
                          {featuresList.slice(0, 3).map((feat, fIdx) => (
                            <li
                              key={fIdx}
                              className="flex items-center gap-1.5 text-[10px] font-semibold text-slate-700"
                            >
                              <CheckCircle className="w-3 h-3 text-orange-500 shrink-0" />
                              <span className="truncate">{feat}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Turnkey Package Comparison Banner */}
              <div className="mt-6 rounded-2xl bg-[#012352] text-white p-5">
                <h4 className="text-xs font-black uppercase tracking-widest text-orange-400">
                  End-to-End Scope of Work
                </h4>
                <div className="grid grid-cols-4 gap-3 mt-3 text-[11px]">
                  <div className="bg-white/10 rounded-xl p-3">
                    <div className="font-black text-white">1. Pre-Construction</div>
                    <p className="text-slate-300 text-[10px] mt-1">
                      Topographical survey, soil test, Vastu-compliant 2D plans & municipal blueprint approval.
                    </p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-3">
                    <div className="font-black text-white">2. Structural Analysis</div>
                    <p className="text-slate-300 text-[10px] mt-1">
                      ETABS / SAP2000 seismic modeling, ductile RCC detailing & foundation engineering.
                    </p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-3">
                    <div className="font-black text-white">3. Civil & MEP Works</div>
                    <p className="text-slate-300 text-[10px] mt-1">
                      RCC frame, brickwork, waterproofing, concealed plumbing & electrical conduits.
                    </p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-3">
                    <div className="font-black text-white">4. Finishing & Interior</div>
                    <p className="text-slate-300 text-[10px] mt-1">
                      Flooring, modular kitchen, UPVC/aluminum glazing, false ceiling, painting & handover.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Page Footer */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-500 font-semibold">
              <span>{COMPANY.name} — Corporate Profile</span>
              <span>Page 04 of 08</span>
            </div>
          </section>

          {/* ==============================================================
              PAGE 5: FLAGSHIP PROJECT PORTFOLIO (PART 1)
             ============================================================== */}
          <section className="a4-page bg-white text-slate-900 w-full min-h-[297mm] shadow-2xl border border-slate-300 flex flex-col justify-between p-10">
            <div>
              {/* Page Header */}
              <div className="flex items-center justify-between pb-4 border-b-2 border-[#012352]">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-500">
                    04 // Project Portfolio (Part I)
                  </span>
                  <h2 className="text-2xl font-black text-[#012352] tracking-tight">
                    Featured Residential & Commercial Projects
                  </h2>
                </div>
                <img src="/amulyalogo1.png" alt="Logo" className="h-10 w-auto object-contain" />
              </div>

              <div className="grid grid-cols-2 gap-4 mt-5">
                {featuredProjectsPage1.map((proj) => {
                  const specs = proj.specifications || {};
                  const cost = proj.cost || specs['Project Cost'] || '';
                  const storeys = specs['Number of Storeys'] || proj.storeys || '';
                  const totalArea = specs['Total Area'] || proj.totalArea || proj.area || '';
                  const plinthArea = specs['Plinth Area'] || proj.plinthArea || '';
                  const faceWidth = specs['Face Length'] || proj.faceLength || '';
                  const floors = Array.isArray(proj.floorLayout) ? proj.floorLayout : [];

                  return (
                    <div
                      key={proj.id}
                      className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50 flex flex-col"
                    >
                      <div className="h-36 bg-slate-900 relative overflow-hidden">
                        <img
                          src={proj.image}
                          alt={proj.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 left-2 flex gap-1.5">
                          <span className="px-2 py-0.5 rounded bg-[#012352]/90 text-white text-[9px] font-bold uppercase">
                            {proj.category}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-orange-500 text-white text-[9px] font-bold uppercase">
                            {proj.status}
                          </span>
                        </div>
                        {cost && (
                          <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-slate-950/85 text-orange-300 text-[10px] font-extrabold">
                            Cost: {cost}
                          </span>
                        )}
                      </div>

                      <div className="p-3.5 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between gap-2">
                            <h3 className="text-xs font-black text-[#012352] truncate">
                              {proj.title}
                            </h3>
                            {proj.location && (
                              <span className="text-[10px] font-bold text-slate-500 shrink-0">
                                📍 {proj.location}
                              </span>
                            )}
                          </div>

                          {/* Specs Pills */}
                          <div className="grid grid-cols-2 gap-x-2 gap-y-1 mt-2 text-[10px] text-slate-700 bg-white p-2 rounded-lg border border-slate-200/80">
                            {storeys && (
                              <div>
                                <span className="text-slate-400 font-semibold">Storeys:</span>{' '}
                                <strong>{storeys}</strong>
                              </div>
                            )}
                            {totalArea && (
                              <div>
                                <span className="text-slate-400 font-semibold">Total Area:</span>{' '}
                                <strong>{totalArea}</strong>
                              </div>
                            )}
                            {plinthArea && (
                              <div>
                                <span className="text-slate-400 font-semibold">Plinth:</span>{' '}
                                <strong>{plinthArea}</strong>
                              </div>
                            )}
                            {faceWidth && (
                              <div>
                                <span className="text-slate-400 font-semibold">Face:</span>{' '}
                                <strong>{faceWidth}</strong>
                              </div>
                            )}
                            {proj.duration && (
                              <div>
                                <span className="text-slate-400 font-semibold">Duration:</span>{' '}
                                <strong>{proj.duration}</strong>
                              </div>
                            )}
                          </div>
                        </div>

                        {floors.length > 0 && (
                          <div className="mt-2 pt-1.5 border-t border-slate-200 text-[9px] text-slate-600 space-y-0.5">
                            {floors.slice(0, 3).map((fl, i) => (
                              <div key={i} className="truncate">
                                <strong className="text-slate-800">{fl.floor}:</strong> {fl.details}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Page Footer */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-500 font-semibold">
              <span>{COMPANY.name} — Corporate Profile</span>
              <span>Page 05 of 08</span>
            </div>
          </section>

          {/* ==============================================================
              PAGE 6: FLAGSHIP PROJECT PORTFOLIO (PART 2)
             ============================================================== */}
          <section className="a4-page bg-white text-slate-900 w-full min-h-[297mm] shadow-2xl border border-slate-300 flex flex-col justify-between p-10">
            <div>
              {/* Page Header */}
              <div className="flex items-center justify-between pb-4 border-b-2 border-[#012352]">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-500">
                    05 // Project Portfolio (Part II)
                  </span>
                  <h2 className="text-2xl font-black text-[#012352] tracking-tight">
                    Completed & Ongoing Engineering Works
                  </h2>
                </div>
                <img src="/amulyalogo1.png" alt="Logo" className="h-10 w-auto object-contain" />
              </div>

              <div className="grid grid-cols-2 gap-4 mt-5">
                {featuredProjectsPage2.map((proj) => {
                  const specs = proj.specifications || {};
                  const cost = proj.cost || specs['Project Cost'] || '';
                  const storeys = specs['Number of Storeys'] || proj.storeys || '';
                  const totalArea = specs['Total Area'] || proj.totalArea || proj.area || '';
                  const plinthArea = specs['Plinth Area'] || proj.plinthArea || '';

                  return (
                    <div
                      key={proj.id}
                      className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50 flex flex-col"
                    >
                      <div className="h-40 bg-slate-900 relative overflow-hidden">
                        <img
                          src={proj.image}
                          alt={proj.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 left-2 flex gap-1.5">
                          <span className="px-2 py-0.5 rounded bg-[#012352]/90 text-white text-[9px] font-bold uppercase">
                            {proj.category}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-orange-500 text-white text-[9px] font-bold uppercase">
                            {proj.status}
                          </span>
                        </div>
                        {cost && (
                          <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-slate-950/85 text-orange-300 text-[10px] font-extrabold">
                            {cost}
                          </span>
                        )}
                      </div>

                      <div className="p-3.5">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="text-xs font-black text-[#012352] truncate">
                            {proj.title}
                          </h3>
                          {proj.location && (
                            <span className="text-[10px] font-bold text-slate-500 shrink-0">
                              📍 {proj.location}
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                          {proj.description}
                        </p>
                        {(storeys || totalArea || plinthArea) && (
                          <div className="flex flex-wrap gap-2 mt-2 text-[10px] font-bold text-slate-700">
                            {storeys && <span className="px-2 py-0.5 bg-white rounded border">{storeys} Storeys</span>}
                            {totalArea && <span className="px-2 py-0.5 bg-white rounded border">{totalArea}</span>}
                            {plinthArea && <span className="px-2 py-0.5 bg-white rounded border">Plinth: {plinthArea}</span>}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Page Footer */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-500 font-semibold">
              <span>{COMPANY.name} — Corporate Profile</span>
              <span>Page 06 of 08</span>
            </div>
          </section>

          {/* ==============================================================
              PAGE 7: ARCHITECTURAL GALLERY & PROJECT SHOWCASE (PART 3)
             ============================================================== */}
          <section className="a4-page bg-white text-slate-900 w-full min-h-[297mm] shadow-2xl border border-slate-300 flex flex-col justify-between p-10">
            <div>
              {/* Page Header */}
              <div className="flex items-center justify-between pb-4 border-b-2 border-[#012352]">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-500">
                    06 // Architectural Showcase (Part III)
                  </span>
                  <h2 className="text-2xl font-black text-[#012352] tracking-tight">
                    Residential & Commercial Elevations
                  </h2>
                </div>
                <img src="/amulyalogo1.png" alt="Logo" className="h-10 w-auto object-contain" />
              </div>

              <div className="grid grid-cols-2 gap-4 mt-5">
                {featuredProjectsPage3.map((proj) => (
                  <div
                    key={proj.id}
                    className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50"
                  >
                    <div className="h-44 bg-slate-900 relative overflow-hidden">
                      <img
                        src={proj.image}
                        alt={proj.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 left-2 flex gap-1.5">
                        <span className="px-2 py-0.5 rounded bg-[#012352]/90 text-white text-[9px] font-bold uppercase">
                          {proj.category}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-emerald-600 text-white text-[9px] font-bold uppercase">
                          {proj.status}
                        </span>
                      </div>
                    </div>
                    <div className="p-3">
                      <h3 className="text-xs font-black text-[#012352] truncate">{proj.title}</h3>
                      <p className="text-[10px] text-slate-600 mt-0.5 line-clamp-2">
                        {proj.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Page Footer */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-500 font-semibold">
              <span>{COMPANY.name} — Corporate Profile</span>
              <span>Page 07 of 08</span>
            </div>
          </section>

          {/* ==============================================================
              PAGE 8: QUALITY STANDARDS, PROCESS & BACK COVER CONTACT
             ============================================================== */}
          <section className="a4-page bg-[#011839] text-white w-full min-h-[297mm] shadow-2xl border border-slate-300 flex flex-col justify-between p-10 relative overflow-hidden">
            <div>
              {/* Page Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/20">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-400">
                    07 // Quality Assurance & Contact Information
                  </span>
                  <h2 className="text-2xl font-black text-white tracking-tight">
                    Our Turnkey Process & Quality Standards
                  </h2>
                </div>
                <div className="bg-white px-3.5 py-2 rounded-xl">
                  <img src="/amulyalogo1.png" alt="Logo" className="h-9 w-auto object-contain" />
                </div>
              </div>

              {/* 6-Step Execution Workflow */}
              <div className="mt-6">
                <h3 className="text-xs font-black uppercase tracking-widest text-orange-400 mb-3">
                  6-Stage Turnkey Execution Methodology
                </h3>
                <div className="grid grid-cols-3 gap-3.5">
                  {[
                    {
                      step: 'Stage 01',
                      title: 'Site Visit & Consultation',
                      desc: 'Land inspection, client requirement briefing, budget planning & soil/topographical evaluation.',
                    },
                    {
                      step: 'Stage 02',
                      title: '2D Layout & 3D Elevation',
                      desc: 'Vastu-aligned floor plans, photorealistic 3D exterior renders & interior space optimization.',
                    },
                    {
                      step: 'Stage 03',
                      title: 'Structural & Municipal Permit',
                      desc: 'Seismic Zone V structural analysis (NBC 105:2020) and full municipal blueprint approval.',
                    },
                    {
                      step: 'Stage 04',
                      title: 'Itemized BOQ & Agreement',
                      desc: 'Transparent stage-wise Bill of Quantities specifying material brands, timeline & payment milestones.',
                    },
                    {
                      step: 'Stage 05',
                      title: 'Supervised Construction',
                      desc: 'RCC framing, masonry, plumbing, electrical & finishing under daily licensed engineer supervision.',
                    },
                    {
                      step: 'Stage 06',
                      title: 'Quality Audit & Handover',
                      desc: 'Multi-point structural/MEP inspection, key handover, completion certificate & warranty support.',
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="bg-white/8 border border-white/15 rounded-xl p-3.5"
                    >
                      <span className="text-[10px] font-extrabold text-orange-400 uppercase">
                        {item.step}
                      </span>
                      <h4 className="text-xs font-black text-white mt-0.5">{item.title}</h4>
                      <p className="text-[10px] text-slate-300 mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Material & Engineering Standards */}
              <div className="mt-6 bg-white/8 border border-white/15 rounded-2xl p-5">
                <h3 className="text-xs font-black uppercase tracking-widest text-orange-400 mb-2.5">
                  Certified Material & Structural Quality Standards
                </h3>
                <div className="grid grid-cols-2 gap-3 text-xs text-slate-200">
                  <div className="flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                    <span>
                      <strong>Reinforcement Steel:</strong> Primary Fe-500D ductile TMT bars (Panchakanya / Himal / Jagdamba or equivalent NS-certified).
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                    <span>
                      <strong>Cement & Concrete:</strong> Grade-53/43 OPC Cement for all structural RCC elements with machine-mixed M20/M25 grade ratios.
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                    <span>
                      <strong>Seismic Detailing:</strong> NBC 105:2020 ductile stirrup spacing, lap-splicing zones, sill/lintel bands & foundation tie-beams.
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                    <span>
                      <strong>Plumbing & Electrical:</strong> Multi-layer CPVC/UPVC pressure-tested piping & flame-retardant copper wiring.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Back Cover Contact Card */}
            <div className="bg-gradient-to-r from-[#cd0102] via-orange-600 to-orange-500 rounded-2xl p-6 shadow-xl mt-6">
              <div className="grid grid-cols-12 gap-6 items-center">
                <div className="col-span-7 space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/90">
                    Start Your Project With Us
                  </span>
                  <h3 className="text-xl font-black text-white leading-tight">
                    {COMPANY.name}
                  </h3>
                  <p className="text-xs text-white/90">
                    Contact our engineering team today for site consultation, architectural design, or turnkey construction estimates.
                  </p>
                </div>
                <div className="col-span-5 bg-slate-950/90 rounded-xl p-4 space-y-2 text-xs text-white">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                    <span><strong>Head Office:</strong> {COMPANY.address}</span>
                  </div>
                  {COMPANY.branchAddress && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                      <span><strong>Branch Office:</strong> {COMPANY.branchAddress}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                    <span>{COMPANY.mobile || COMPANY.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                    <span>{COMPANY.email}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Page Footer */}
            <div className="pt-4 border-t border-white/15 flex items-center justify-between text-[10px] text-slate-400 font-semibold">
              <span>© {new Date().getFullYear()} {COMPANY.name}. All Rights Reserved.</span>
              <span>Page 08 of 08</span>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
