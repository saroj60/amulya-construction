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
    const fileUrl = customPdfUrl || '/Amulya-Builders-Company-Profile.pdf';
    const a = document.createElement('a');
    a.href = fileUrl;
    a.download = 'Amulya-Builders-Company-Profile.pdf';
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
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
      <div className="no-print sticky top-20 z-40 bg-[#111114]/95 backdrop-blur-md text-white border-b border-white/15 shadow-lg">
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
              <FileText className="w-4 h-4 text-red-500" />
              <span className="text-sm font-bold tracking-wide">
                Official Company Profile Brochure (A4 PDF — 6 Pages)
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
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white text-xs sm:text-sm font-extrabold rounded-xl shadow-lg shadow-red-600/30 transition-all cursor-pointer"
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
          <section className="a4-page relative bg-[#0d0f12] text-white w-full min-h-[297mm] shadow-2xl border border-slate-300 flex flex-col justify-between overflow-hidden">
            {/* Top Crimson & Red Accent Bar */}
            <div className="h-3 w-full bg-gradient-to-r from-red-600 via-red-500 to-black" />

            {/* Subtle Geometric Background Accent */}
            <div className="absolute -right-28 top-24 w-96 h-96 rounded-full bg-red-600/10 blur-3xl pointer-events-none" />
            <div className="absolute -left-24 bottom-32 w-96 h-96 rounded-full bg-slate-800/10 blur-3xl pointer-events-none" />

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
                <span className="inline-block px-3.5 py-1 rounded-full bg-red-600/20 border border-red-500/40 text-red-400 text-[11px] font-extrabold uppercase tracking-widest">
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
                <div className="inline-flex items-center gap-2 text-red-500 text-xs font-extrabold uppercase tracking-[0.2em]">
                  <span className="w-8 h-0.5 bg-red-600" />
                  Architecture • Structural Engineering • Turnkey Construction
                </div>
                <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-[1.1] text-white">
                  COMPANY<br />
                  <span className="text-red-600">PROFILE</span>
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
                    src="/project-gallery/project-19.png"
                    alt="Amulya Builders Featured Commercial & Residential Project"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent p-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-red-400">
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
                      src="/project-gallery/project-21.jpg"
                      alt="Residential Villa Project"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="h-1/2 rounded-2xl overflow-hidden border-2 border-white/20 shadow-lg">
                    <img
                      src="/project-gallery/project-23.png"
                      alt="Commercial Complex Project"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Key Metrics Strip */}
              <div className="grid grid-cols-4 gap-3 pt-2">
                {[
                  { value: `${projects.length}+`, label: 'Projects Done' },
                  { value: COMPANY.stats.yearsExperience || '9+', label: 'Years Experience' },
                  { value: COMPANY.stats.happyClients || '20+', label: 'Happy Clients' },
                  { value: COMPANY.stats.professionals || '15+', label: 'Professionals' },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="bg-white/8 border border-white/15 rounded-xl p-3.5 text-center"
                  >
                    <div className="text-xl font-black text-red-500">{stat.value}</div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-300 mt-0.5">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Cover Footer Strip */}
            <div className="bg-[#0a0a0e] border-t border-white/15 px-10 py-5 flex items-center justify-between text-xs text-slate-300 relative z-10">
              <div className="flex items-center gap-6">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-red-500" />
                  {COMPANY.address} | Branch: {COMPANY.branchAddress}
                </span>
              </div>
              <div className="flex items-center gap-4 font-bold text-white">
                <span>{COMPANY.mobile || COMPANY.phone}</span>
                <span className="text-red-500">•</span>
                <span>www.amulyabuilders.com.np</span>
              </div>
            </div>
          </section>

          {/* ==============================================================
              PAGE 2: TABLE OF CONTENTS & MESSAGE FROM THE MD & CEO
             ============================================================== */}
          <section className="a4-page bg-white text-slate-900 w-full min-h-[297mm] shadow-2xl border border-slate-300 flex flex-col justify-between p-10">
            <div>
              {/* Page Header */}
              <div className="flex items-center justify-between pb-4 border-b-2 border-black">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-red-600">
                    Executive Directory // Strategic Vision
                  </span>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                    Message From MD & Table of Contents
                  </h2>
                </div>
                <img src="/amulyalogo1.png" alt="Logo" className="h-10 w-auto object-contain" />
              </div>

              {/* Message from Managing Director */}
              <div className="mt-6 bg-gradient-to-br from-[#0f1117] to-[#1c1f26] text-white rounded-2xl p-6 shadow-md border-l-4 border-red-600">
                <div className="grid grid-cols-12 gap-6 items-center">
                  <div className="col-span-4">
                    <div className="rounded-xl overflow-hidden border-2 border-red-600 shadow-lg aspect-[4/5] bg-slate-900">
                      <img
                        src="/md-sujit-shah.jpg"
                        alt="Er. Sujit Shah — MD & CEO"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    <div className="mt-2.5 text-center">
                      <h3 className="text-sm font-black text-white">Er. Sujit Shah</h3>
                      <p className="text-[11px] font-bold text-red-400 uppercase tracking-wider">
                        Managing Director & CEO
                      </p>
                      <p className="text-[10px] text-slate-300">Senior Civil Engineer • NEC Regd.</p>
                      <span className="inline-block mt-1.5 px-2.5 py-0.5 rounded bg-red-600 text-white text-[9px] font-bold">
                        9+ Years Leadership
                      </span>
                    </div>
                  </div>

                  <div className="col-span-8 space-y-2.5 text-xs leading-relaxed text-slate-100">
                    <span className="inline-block px-2.5 py-0.5 rounded bg-red-600 text-white text-[10px] font-extrabold uppercase tracking-wider">
                      Executive Leadership Address
                    </span>
                    <h4 className="text-base font-black text-white leading-snug">
                      “Engineering Generational Trust, Transparency & Seismic Resilience.”
                    </h4>
                    <p className="text-slate-200">
                      Dear Valued Clients, Partners & Well-Wishers — Welcome to <strong>{COMPANY.name}</strong>.
                      When we established this company, our objective was clear: to redefine Nepal’s construction
                      sector through uncompromising structural engineering integrity, complete cost transparency, and architectural elegance.
                    </p>
                    <p className="text-slate-200">
                      In a nation situated in Seismic Zone V, building is not merely pouring concrete—it is a sacred
                      responsibility to safeguard human lives. Every residential home and commercial development we execute
                      complies strictly with the <strong>Nepal National Building Code (NBC 105:2020)</strong>, utilizing certified
                      materials, licensed engineers, and complete BOQ transparency.
                    </p>
                    <p className="text-slate-200">
                      With 9+ years of field excellence, 20+ satisfied clients, and 15+ licensed engineering professionals,
                      we guide every milestone from soil testing to keys in hand. We invite you to explore our capabilities and partner with us on your landmark project.
                    </p>
                    <div className="pt-2 border-t border-white/15 flex items-center justify-between text-[11px] text-red-400 font-bold">
                      <span>Er. Sujit Shah — Founder & MD / CEO</span>
                      <span>Amulya Builders Pvt. Ltd.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Table of Contents Section */}
              <div className="mt-8">
                <div className="flex items-center gap-3 pb-2 border-b border-slate-200">
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                    Table of Contents
                  </h3>
                  <span className="text-xs text-slate-400">• Official Document Directory</span>
                </div>

                <div className="grid grid-cols-2 gap-3.5 mt-4">
                  {[
                    { num: '01', title: 'Company Overview & Vision', sub: 'Corporate identity, mission & national reach', page: 'Page 03' },
                    { num: '02', title: 'Core Values & Track Record', sub: 'NBC 105:2020 standard & verified metrics', page: 'Page 03' },
                    { num: '03', title: 'Comprehensive Turnkey Services', sub: '3D architectural, structural & RCC build', page: 'Page 04' },
                    { num: '04', title: '5-Stage Execution Workflow', sub: 'Consultation to turnkey key handover', page: 'Page 04' },
                    { num: '05', title: 'Signature Projects Portfolio', sub: 'Landmark residential & commercial builds', page: 'Page 05' },
                    { num: '06', title: 'Technical Team & Accreditation', sub: 'Licensed team, statutory PAN & contact', page: 'Page 06' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white transition-colors">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-black text-red-500 font-black text-xs flex items-center justify-center">
                          {item.num}
                        </span>
                        <div>
                          <div className="text-xs font-bold text-slate-900">{item.title}</div>
                          <div className="text-[10px] text-slate-500">{item.sub}</div>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-md bg-red-600 text-white text-[10px] font-bold">
                        {item.page}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Legal Credentials Summary */}
              <div className="mt-6 p-3.5 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-between text-xs text-slate-600">
                <span><strong>Regd:</strong> Amulya Builders Pvt. Ltd. (PAN: 619774758)</span>
                <span><strong>Code:</strong> NBC 105:2020 (Zone V Compliant)</span>
                <span><strong>Council:</strong> Nepal Engineering Council (NEC)</span>
              </div>
            </div>

            {/* Page Footer */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-500 font-medium">
              <span>{COMPANY.name} | Official Corporate Profile • 9+ Years of Excellence</span>
              <span>Page 02 of 06</span>
            </div>
          </section>

          {/* ==============================================================
              PAGE 3: ABOUT US, VISION, MISSION & CORE VALUES
             ============================================================== */}
          <section className="a4-page bg-white text-slate-900 w-full min-h-[297mm] shadow-2xl border border-slate-300 flex flex-col justify-between p-10">
            <div>
              {/* Page Header */}
              <div className="flex items-center justify-between pb-4 border-b-2 border-black">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-red-600">
                    01 // Corporate Overview
                  </span>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">
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
                <div className="bg-[#0f1117] text-white rounded-2xl p-5 border-l-4 border-red-600">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-red-500">
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

                <div className="bg-[#181a20] text-white rounded-2xl p-5 border-l-4 border-red-600">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-red-500">
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
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-900 mb-3">
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
                      <h5 className="text-xs font-extrabold text-slate-900">{val.title}</h5>
                      <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">{val.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Why Clients Trust Us Checklist */}
              <div className="mt-6 bg-red-50/70 border border-red-200 rounded-2xl p-4">
                <h4 className="text-xs font-black uppercase tracking-wider text-red-800 mb-2.5">
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
                      <CheckCircle className="w-3.5 h-3.5 text-red-600 shrink-0" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Page Footer */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-500 font-semibold">
              <span>{COMPANY.name} — Corporate Profile</span>
              <span>Page 03 of 06</span>
            </div>
          </section>

          {/* ==============================================================
              PAGE 4: CORE ENGINEERING & TURNKEY SERVICES + WORKFLOW
             ============================================================== */}
          <section className="a4-page bg-white text-slate-900 w-full min-h-[297mm] shadow-2xl border border-slate-300 flex flex-col justify-between p-10">
            <div>
              {/* Page Header */}
              <div className="flex items-center justify-between pb-4 border-b-2 border-black">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-red-600">
                    02 // Comprehensive Capabilities
                  </span>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                    Our Core Engineering & Turnkey Services
                  </h2>
                </div>
                <img src="/amulyalogo1.png" alt="Logo" className="h-10 w-auto object-contain" />
              </div>

              <p className="text-xs text-slate-600 mt-4 leading-relaxed">
                We provide complete single-window architectural, structural, and construction solutions
                tailored for residential homeowners, commercial developers, and institutions across Nepal.
              </p>

              {/* Services Grid (6 Core Capabilities) */}
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
                          <span className="px-2.5 py-0.5 rounded-md bg-black text-red-500 text-[10px] font-black">
                            0{idx + 1}
                          </span>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-red-600">
                            Turnkey Solution
                          </span>
                        </div>
                        <h3 className="text-sm font-black text-slate-900">{service.title}</h3>
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
                              <CheckCircle className="w-3 h-3 text-red-600 shrink-0" />
                              <span className="truncate">{feat}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* 5-Stage Turnkey Execution Workflow Banner */}
              <div className="mt-6 rounded-2xl bg-[#0f1117] text-white p-5 border-t-4 border-red-600">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-black uppercase tracking-widest text-red-500">
                    Our 5-Stage Turnkey Execution Workflow
                  </h4>
                  <span className="text-[10px] text-slate-400 font-bold">Standard Operating Procedure</span>
                </div>
                <div className="grid grid-cols-5 gap-2.5 text-[11px]">
                  {[
                    { step: '01', title: 'Consultation', desc: 'Site inspection & client requirements briefing.' },
                    { step: '02', title: '3D Design', desc: 'Architectural drawings, Vastu & 3D renders.' },
                    { step: '03', title: 'BOQ & Permit', desc: 'Itemized BOQ & municipal drawing approval.' },
                    { step: '04', title: 'Construction', desc: 'RCC execution, steel & lab cube testing.' },
                    { step: '05', title: 'Handover', desc: 'Final quality audit, keys & warranty support.' },
                  ].map((st, i) => (
                    <div key={i} className="bg-white/10 rounded-xl p-2.5">
                      <span className="text-xs font-black text-red-500">{st.step}</span>
                      <div className="font-bold text-white mt-0.5">{st.title}</div>
                      <p className="text-slate-300 text-[9px] mt-1 leading-snug">
                        {st.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Page Footer */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-500 font-semibold">
              <span>{COMPANY.name} — Corporate Profile</span>
              <span>Page 04 of 06</span>
            </div>
          </section>

          {/* ==============================================================
              PAGE 5: SIGNATURE PROJECTS PORTFOLIO
             ============================================================== */}
          <section className="a4-page bg-white text-slate-900 w-full min-h-[297mm] shadow-2xl border border-slate-300 flex flex-col justify-between p-10">
            <div>
              {/* Page Header */}
              <div className="flex items-center justify-between pb-4 border-b-2 border-black">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-red-600">
                    03 // Signature Projects Portfolio
                  </span>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                    Featured Residential & Commercial Projects
                  </h2>
                </div>
                <img src="/amulyalogo1.png" alt="Logo" className="h-10 w-auto object-contain" />
              </div>

              {/* 4 Landmark Projects Grid */}
              <div className="grid grid-cols-2 gap-4 mt-5">
                {[
                  {
                    name: 'Commercial & Business Complex',
                    category: 'Commercial',
                    status: 'Completed',
                    location: 'Kathmandu Valley',
                    type: 'Commercial & Residential Complex',
                    scale: '3.5-Storey Commercial & Retail',
                    cost: 'Turnkey Contract',
                    image: '/project-gallery/project-14.jpg',
                  },
                  {
                    name: 'Jay Kishor Mahato Residential',
                    category: 'Residential',
                    status: 'Completed',
                    location: 'Chitwan, Nepal',
                    type: '2.5-Storey Residential Residence',
                    scale: '1690 sq ft (1300 sq ft Plinth)',
                    cost: 'Rs 1 Cr 10 Lakhs',
                    image: '/project-gallery/project-6.jpg',
                  },
                  {
                    name: 'Dr. Sakil Residential Villa',
                    category: 'Residential',
                    status: 'Completed',
                    location: 'Janakpur, Nepal',
                    type: 'Luxury Contemporary Bungalow',
                    scale: '1966 sq ft Built-up Area',
                    cost: 'Rs 1.50 Crore',
                    image: '/project-gallery/project-7.jpg',
                  },
                  {
                    name: 'Budhanilkantha Luxury Residence',
                    category: 'Residential',
                    status: 'Completed',
                    location: 'Budhanilkantha, Kathmandu',
                    type: 'Contemporary RCC Villa',
                    scale: '1100 sq ft Plinth (26 ft Face)',
                    cost: 'Rs 1 Cr 20 Lakhs',
                    image: '/project-gallery/project-11.jpg',
                  },
                ].map((proj, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50 flex flex-col shadow-sm"
                  >
                    <div className="aspect-[16/9] bg-slate-900 relative overflow-hidden">
                      <img
                        src={proj.image}
                        alt={proj.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2.5 left-2.5 flex gap-1.5">
                        <span className="px-2.5 py-0.5 rounded bg-black/90 text-white text-[9px] font-bold uppercase tracking-wider">
                          {proj.category}
                        </span>
                        <span className="px-2.5 py-0.5 rounded bg-red-600 text-white text-[9px] font-bold uppercase tracking-wider">
                          {proj.status}
                        </span>
                      </div>
                      {proj.cost && (
                        <span className="absolute bottom-2 right-2 px-2.5 py-0.5 rounded bg-black/90 text-red-400 text-[10px] font-extrabold">
                          Cost: {proj.cost}
                        </span>
                      )}
                    </div>

                    <div className="p-3.5 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="text-xs font-black text-slate-900 truncate">
                            {proj.name}
                          </h3>
                          {proj.location && (
                            <span className="text-[10px] font-bold text-slate-500 shrink-0">
                              📍 {proj.location}
                            </span>
                          )}
                        </div>

                        {/* Specs Pills */}
                        <div className="grid grid-cols-2 gap-x-2 gap-y-1 mt-2.5 text-[10px] text-slate-700 bg-white p-2.5 rounded-lg border border-slate-200/80">
                          <div>
                            <span className="text-slate-400 font-semibold">Building Type:</span>{' '}
                            <strong>{proj.type}</strong>
                          </div>
                          <div>
                            <span className="text-slate-400 font-semibold">Scale & Area:</span>{' '}
                            <strong>{proj.scale}</strong>
                          </div>
                        </div>
                      </div>

                      <div className="mt-2.5 pt-2 border-t border-slate-200 text-[9px] text-slate-500 italic flex items-center justify-between">
                        <span>NBC 105:2020 Compliant</span>
                        <span>Full Turnkey Execution</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Track Record Note */}
              <div className="mt-6 p-3.5 rounded-xl bg-slate-100 border border-slate-200 text-center text-xs text-slate-700">
                <strong>Track Record:</strong> Over 20+ Residential & Commercial Projects Engineered to Nepal National Building Code (NBC 105:2020) across Kathmandu, Lalitpur, Bhaktapur & Janakpur.
              </div>
            </div>

            {/* Page Footer */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-500 font-semibold">
              <span>{COMPANY.name} — Corporate Profile</span>
              <span>Page 05 of 06</span>
            </div>
          </section>

          {/* ==============================================================
              PAGE 6: TECHNICAL LEADERSHIP, ACCREDITATION & CONTACT DIRECTORY
             ============================================================== */}
          <section className="a4-page bg-white text-slate-900 w-full min-h-[297mm] shadow-2xl border border-slate-300 flex flex-col justify-between p-10">
            <div>
              {/* Page Header */}
              <div className="flex items-center justify-between pb-4 border-b-2 border-black">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-red-600">
                    04 // Technical Leadership & Accreditation
                  </span>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                    Licensed Engineers, Legal Registration & Corporate Offices
                  </h2>
                </div>
                <img src="/amulyalogo1.png" alt="Logo" className="h-10 w-auto object-contain" />
              </div>

              {/* 10-Member Technical Leadership Team Grid */}
              <div className="mt-5">
                <div className="flex items-center justify-between mb-2.5 pb-1 border-b border-red-600">
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">
                    Key Engineering & Leadership Team (10 Professionals)
                  </h3>
                  <span className="text-[10px] text-slate-500 font-bold">
                    NEC Licensed Engineers & Project Specialists
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {[
                    { name: 'Er. Sujit Shah', role: 'Managing Director & CEO', dept: 'Executive & Civil Engineering', img: '/md-sujit-shah.jpg' },
                    { name: 'Er. Mukesh Adhikari', role: 'General Manager', dept: 'Operations & Procurement', img: '/team/mukesh-adhikari.png' },
                    { name: 'Er. Amar Singh', role: 'Chief Architect', dept: 'Architectural Design', img: '/team/amar-singh.png' },
                    { name: 'Er. Rahul Kumar Purbey', role: 'Site Engineer', dept: 'Site & Quality Supervision', img: '/team/rahul-kumar-purbey.png' },
                    { name: 'Er. Aakash Mandal', role: 'Civil Engineer', dept: 'Structural Analysis & NBC', img: '/team/aakash-mandal.png' },
                    { name: 'Priyanka Kumari Chaudhary', role: 'Assistant Architect', dept: 'CAD & 3D Modeling', img: '/team/priyanka-kumari-chaudhary.png' },
                    { name: 'Bijaya Rasaili', role: 'Assistant Architect', dept: 'Spatial Planning', img: '/team/bijaya-rasaili.png' },
                    { name: 'Tanu Kumari Shah', role: 'Assistant Architect', dept: 'Interior & Detailing', img: '/team/tanu-kumari-shah.png' },
                    { name: 'Ritesh Shah', role: 'Marketing Head', dept: 'Client Relations', img: '/team/ritesh-shah.png' },
                    { name: 'Ajay Kumar Sah', role: 'Co-ordinator', dept: 'Municipal & Permit Liaison', img: null },
                  ].map((member, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-2 rounded-xl bg-slate-50 border border-slate-200"
                    >
                      <div className="w-10 h-12 rounded-lg overflow-hidden bg-black shrink-0 border border-slate-300 flex items-center justify-center text-white font-black text-xs">
                        {member.img ? (
                          <img
                            src={member.img}
                            alt={member.name}
                            className="w-full h-full object-cover object-top"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                              e.currentTarget.parentElement.innerText = member.name.split(' ').map(n => n[0]).join('').slice(0, 2);
                            }}
                          />
                        ) : (
                          <span>{member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}</span>
                        )}
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs font-black text-slate-900 truncate">{member.name}</h4>
                        <p className="text-[10px] font-bold text-red-600 truncate">
                          {member.role}
                        </p>
                        <p className="text-[9px] text-slate-500 font-medium truncate">
                          {member.dept}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Statutory Accreditation & Legal Compliance */}
              <div className="mt-5">
                <div className="flex items-center justify-between mb-2 pb-1 border-b border-red-600">
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">
                    Statutory Registration & Accreditation
                  </h3>
                  <span className="text-[10px] text-slate-500 font-bold">Government of Nepal Authorized</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <div><strong>• Company Name:</strong> Amulya Builders Pvt. Ltd.</div>
                  <div><strong>• Governance:</strong> Nepal Engineering Council (NEC)</div>
                  <div><strong>• Experience:</strong> 9+ Years Active Field Excellence</div>
                  <div><strong>• Seismic Code:</strong> NBC 105:2020 (Zone V Compliant)</div>
                  <div><strong>• PAN / VAT ID:</strong> 619774758 (Inland Revenue)</div>
                  <div><strong>• Turnkey Scope:</strong> Inside & Outside Valley Across Nepal</div>
                </div>
              </div>

              {/* Corporate Contact Directory & Branch Office */}
              <div className="mt-5 bg-gradient-to-r from-[#0f1117] via-[#1a1d24] to-black rounded-2xl p-5 text-white shadow-lg border-l-4 border-red-600">
                <div className="grid grid-cols-12 gap-5 items-center">
                  <div className="col-span-6 space-y-1.5">
                    <span className="text-[9px] font-black uppercase tracking-widest text-red-500">
                      Partner With Us
                    </span>
                    <h3 className="text-base font-black text-white leading-tight">
                      {COMPANY.name}
                    </h3>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      Engineering Safe, Generational Landmarks. Contact our engineering team for site consultation, architectural design, or turnkey construction estimates.
                    </p>
                  </div>
                  <div className="col-span-6 bg-white/10 rounded-xl p-3 space-y-1.5 text-[11px] text-white">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                      <span><strong>Head Office:</strong> {COMPANY.address}</span>
                    </div>
                    {COMPANY.branchAddress && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                        <span><strong>Branch Office:</strong> {COMPANY.branchAddress}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-red-500 shrink-0" />
                      <span>{COMPANY.mobile || COMPANY.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-red-500 shrink-0" />
                      <span>{COMPANY.email}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Page Footer */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-500 font-semibold">
              <span>© {new Date().getFullYear()} {COMPANY.name}. All Rights Reserved.</span>
              <span>Page 06 of 06</span>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
