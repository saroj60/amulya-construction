// ============================================================
// COMPANY CONFIGURATION — Replace these values easily
// ============================================================
export const COMPANY = {
  name: 'Amulya Builders',
  tagline: 'Constructing Integrity. Elevating Standards.',
  phone: '+977 15925062',
  mobile: '+977 9810357535',
  email: 'abt4nepal@gmail.com',
  whatsapp: '+977 9810357535',
  address: 'Sabaila-8, Dhanusha',
  branchAddress: 'Tikathali, Lalitpur (opposite of Pawan Prakriti School)',
  addressShort: 'Lalitpur, Nepal',
  mapEmbedUrl: 'https://maps.google.com/maps?q=27.659224,85.354761&z=17&output=embed',
  businessHours: {
    weekdays: 'Sunday – Friday: 10:00 AM – 6:00 PM',
    saturday: 'Saturday: Closed',
    closed: 'Closed on Saturdays & Public Holidays',
  },
  social: {
    facebook: 'https://www.facebook.com/share/r/19JzAwRSeo/?mibextid=wwXIfr',
    tiktok: 'https://www.tiktok.com/@amulya.builders?_r=1&_t=ZS-997NQAW9820',
    instagram: 'https://instagram.com/',
    youtube: 'https://youtube.com/',
    linkedin: 'https://linkedin.com/',
  },
  stats: {
    projectsCompleted: '250+',
    yearsExperience: '15+',
    happyClients: '200+',
    professionals: '80+',
  },
  foundedYear: 2009,
  license: '',
  vat: '619774758',
};

// ============================================================
// SERVICES DATA
// ============================================================
export const SERVICES = [
  {
    id: 'residential-construction',
    title: 'Home & Residential Building',
    shortDesc:
      'Crafting bespoke homes, modern duplexes, and premium residential spaces engineered for safety and comfort.',
    fullDesc:
      'We specialize in building elegant, earthquake-resistant homes across Kathmandu. Adhering to the Nepal National Building Code, our team handles structural safety, architectural details, and high-quality finishes.',
    icon: 'Home',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    features: ['NBC Certified', 'Seismic Resistant', 'Architectural Detailing', 'Premium Finishes'],
  },
  {
    id: 'commercial-construction',
    title: 'Commercial Construction',
    shortDesc:
      'Designing and building high-performance commercial facilities, office plazas, hotels, and retail complexes.',
    fullDesc:
      'We offer full-service commercial design and construction for corporate offices, shopping plazas, and hospitality developments in Kathmandu. We ensure efficient execution, safety compliance, and modern architectural standards.',
    icon: 'Building2',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
    features: ['Large-Scale Operations', 'Integrated MEP Systems', 'On-Time Completion', 'Modern Engineering'],
  },
  {
    id: 'building-design-planning',
    title: 'Architectural & Structural Design',
    shortDesc:
      'Custom structural drawings, functional layouts, 3D visualization, and building permit planning.',
    fullDesc:
      'Our engineering department delivers comprehensive structural designs, 3D renders, site layouts, and building permit documents required for Kathmandu Metropolitan City approvals.',
    icon: 'PenTool',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80',
    features: ['3D Visual Rendering', 'Seismic Design Analysis', 'Permit Documentation', 'Detailed Floor Plans'],
  },
  {
    id: 'renovation-remodeling',
    title: 'Remodeling & Retrofitting',
    shortDesc:
      'Transforming existing spaces through structural upgrades, modern designs, and high-quality renovations.',
    fullDesc:
      'Give your old home, commercial storefront, or office layout a complete face-lift. From interior remodeling to structural retrofitting, we deliver quality upgrades that enhance value and safety.',
    icon: 'Wrench',
    image: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=800&q=80',
    features: ['Turnkey Renovation', 'Façade Upgrades', 'Interior Redesign', 'Structural Reinforcement'],
  },
  {
    id: 'structural-construction',
    title: 'Structural Works & Concrete Framing',
    shortDesc:
      'High-strength RCC structures, specialized foundations, retaining walls, and civil engineering.',
    fullDesc:
      'We construct durable foundation frameworks, high-strength RCC structures, and retaining systems. Managed by licensed civil engineers, our works are tailored to the unique geological conditions of Kathmandu.',
    icon: 'Columns',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
    features: ['High-Strength RCC', 'Soil-Specific Foundations', 'Seismic Retrofitting', 'Retaining Walls'],
  },
  {
    id: 'interior-exterior-works',
    title: 'Interior & Exterior Finishes',
    shortDesc:
      'Completing spaces with expert tiling, marble installation, gypsum ceilings, custom paint, and cladding.',
    fullDesc:
      'Bring your spaces to life with premium finishing solutions. We supply and install high-quality flooring, modular kitchens, custom gypsum ceilings, outdoor wall cladding, and professional landscaping.',
    icon: 'Layers',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80',
    features: ['Imported Marble & Tiles', 'Modular Kitchen Designs', 'Gypsum Ceilings', 'Outdoor Cladding'],
  },
  {
    id: 'construction-consultancy',
    title: 'Engineering Consultancy',
    shortDesc:
      'Project feasibility reviews, structural audits, cost estimation, and regulatory compliance guidance.',
    fullDesc:
      'We provide expert project reports (DPR), cost advisory, independent building audits, and regulatory checks to ensure compliance with Nepal building codes and municipal guidelines.',
    icon: 'ClipboardList',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
    features: ['DPR Preparation', 'Detailed Costing (BOQ)', 'Independent Site Audits', 'Compliance Advisory'],
  },
  {
    id: 'project-management',
    title: 'Construction Project Management',
    shortDesc:
      'Professional end-to-end supervision, scheduling, quality control, and vendor management.',
    fullDesc:
      'From site clearing to project handover, we handle procurement, subcontractor scheduling, strict quality checks, and budget compliance, ensuring a stress-free construction experience.',
    icon: 'BarChart2',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80',
    features: ['Milestone Tracking', 'Budget Management', 'Material Quality Checks', 'Zero-Harm Safety Site'],
  },
];

// ============================================================
// PROJECTS DATA
// ============================================================
export const PROJECTS = [
  {
    id: 'lakeside-luxury-villa',
    title: 'Phewa Vista Villa',
    location: 'Lakeside, Kathmandu',
    category: 'Residential',
    status: 'Completed',
    year: 2023,
    client: 'Private Client',
    area: '4,200 sq. ft.',
    duration: '18 months',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&q=80',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80',
    ],
    description:
      'A stunning lakeside architectural masterpiece. This private estate blends modern design with the unique geographical layout of Kathmandu, featuring panoramic mountain views, high-end stone accents, and custom steel frames. Engineered to exceed seismic safety guidelines.',
    highlights: [
      'Scenic lake views from floor-to-ceiling windows',
      'Rooftop recreation lounge',
      'Finished with locally sourced Kathmandu stone',
      'Integrated solar backup and water heating',
      'RCC framework designed for seismic stability',
      'Custom interior woodwork',
    ],
    specifications: {
      'Built-up Area': '4,200 sq. ft.',
      'Plot Area': '0-8-0-0 Ropani',
      Structure: 'RCC Frame, G+3',
      Bedrooms: '4 BHK + Guest Suite',
      Bathrooms: '5',
      Parking: 'Dual-vehicle basement garage',
      Completion: 'June 2023',
    },
    featured: true,
  },
  {
    id: 'kathmandu-business-center',
    title: 'Prithvi Plaza',
    location: 'Prithvi Chowk, Kathmandu',
    category: 'Commercial',
    status: 'Completed',
    year: 2022,
    client: 'ABC Holdings Pvt. Ltd.',
    area: '18,500 sq. ft.',
    duration: '24 months',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80',
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80',
    ],
    description:
      'A commercial development in central Kathmandu. This 6-storey building serves as a hub for retail operations and modern offices, detailed with structural glazing and energy-efficient ventilation systems.',
    highlights: [
      'Spacious open-floor layouts for corporate offices',
      'Ground-level shopping facades',
      'Reliable backup generator systems',
      'Eco-friendly water conservation setup',
      'Modern glass-curtain exterior facade',
      'Centrally located business hub',
    ],
    specifications: {
      'Built-up Area': '18,500 sq. ft.',
      Floors: 'G+5 (6 Storeys)',
      'Office Spaces': '24 commercial units',
      'Retail Units': '8 storefronts',
      Parking: 'Underground parking for 35 vehicles',
      Completion: 'March 2022',
    },
    featured: true,
  },
  {
    id: 'himalaya-resort-hotel',
    title: 'Annapurna Skyline Resort',
    location: 'Sarangkot Road, Kathmandu',
    category: 'Commercial',
    status: 'Completed',
    year: 2023,
    client: 'Himalayan Hospitality Group',
    area: '22,000 sq. ft.',
    duration: '30 months',
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1200&q=80',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&q=80',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200&q=80',
    ],
    description:
      'A premier boutique hotel overlooking the Annapurna range. Built on the slopes of Sarangkot, this property includes guest suites, infinity pools, and dining facilities, utilizing stone-clad structures to blend with the hillside.',
    highlights: [
      'Panoramic mountain views from all suites',
      'Hillside infinity swimming pool',
      'Luxury spa and dining facilities',
      'Seismic structural reinforcements for slopes',
      'Eco-resort certification layout',
      'Landscaped gardens and open terraces',
    ],
    specifications: {
      'Built-up Area': '22,000 sq. ft.',
      Floors: 'G+4',
      Rooms: '28 luxury rooms & suites',
      Restaurant: '80-seat dining area',
      'Conference Hall': '120-person capacity event space',
      Completion: 'November 2023',
    },
    featured: true,
  },
  {
    id: 'new-road-apartment',
    title: 'New Road Residency',
    location: 'New Road, Kathmandu',
    category: 'Residential',
    status: 'Completed',
    year: 2022,
    client: 'Bagmati Housing Co-operative',
    area: '12,000 sq. ft.',
    duration: '20 months',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&q=80',
    ],
    description:
      'A contemporary multi-family housing development in Kathmandu. Featuring 16 spacious apartments, it offers security systems, landscaped grounds, and parking arrays.',
    highlights: [
      '16 modern apartments (2BHK and 3BHK configurations)',
      'Green rooftop recreational area',
      'Reserved basement parking',
      'Fitted modular kitchens',
      'Integrated fire safety systems',
    ],
    specifications: {
      'Built-up Area': '12,000 sq. ft.',
      Floors: 'G+4',
      Units: '16 apartments',
      'Unit Types': '8 x 2BHK, 8 x 3BHK',
      Parking: 'Accommodates 20 vehicles',
      Completion: 'August 2022',
    },
    featured: false,
  },
  {
    id: 'phewa-bank-branch',
    title: 'Bagmati Trust Bank Office',
    location: 'Chipledhunga, Kathmandu',
    category: 'Commercial',
    status: 'Completed',
    year: 2021,
    client: 'Phewa Development Bank',
    area: '5,500 sq. ft.',
    duration: '12 months',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80',
    ],
    description:
      'A secure, custom bank branch built to high safety regulations. Includes reinforced concrete vaults, bulletproof glass tellers, and administrative office suites.',
    highlights: [
      'Reinforced cash and document vault',
      'High-grade security and access arrays',
      'Barrier-free access features',
      'Centralized climate control systems',
      'Sturdy granite exterior finish',
    ],
    specifications: {
      'Built-up Area': '5,500 sq. ft.',
      Floors: 'G+3',
      Purpose: 'Financial & Administrative Services',
      Completion: 'April 2021',
    },
    featured: false,
  },
  {
    id: 'seti-bagmati-school',
    title: 'Lekhnath Academy Expansion',
    location: 'Lekhnath, Kathmandu',
    category: 'Commercial',
    status: 'Completed',
    year: 2021,
    client: 'Seti Bagmati Secondary School',
    area: '9,000 sq. ft.',
    duration: '14 months',
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200&q=80',
    ],
    description:
      'Educational infrastructure project adding 24 classrooms and laboratory spaces. Built with high seismic structural safety, wide stairwells, and natural lighting arrays.',
    highlights: [
      '24 spacious classrooms',
      'Equipped physics and computer labs',
      'Modern administrative offices',
      'Wide safety escape routes',
      'Excellent natural lighting layouts',
    ],
    specifications: {
      'Built-up Area': '9,000 sq. ft.',
      Blocks: '3 academic wings',
      Classrooms: '24 study rooms',
      Floors: 'G+2 structure',
      Completion: 'January 2021',
    },
    featured: false,
  },
  {
    id: 'kathmandu-luxury-bungalow',
    title: 'Baidam Heights Bungalow',
    location: 'Baidam, Kathmandu',
    category: 'Residential',
    status: 'Completed',
    year: 2024,
    client: 'Private Client',
    area: '3,800 sq. ft.',
    duration: '16 months',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80',
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&q=80',
    ],
    description:
      'An elegant custom residential villa in Baidam. Features an open-plan lounge, high-end landscaping, a swimming pool, and premium interior carpentry.',
    highlights: [
      'Finished swimming pool and landscaping',
      'Spacious open-concept living room',
      'Premium floor tiles and marble detailing',
      'Solar energy integration for hot water',
      'Automated garden irrigation setup',
    ],
    specifications: {
      'Built-up Area': '3,800 sq. ft.',
      'Plot Area': '0-12-0-0 Ropani',
      Bedrooms: '4 BHK configuration',
      'Swimming Pool': '10m x 5m concrete pool',
      Completion: 'February 2024',
    },
    featured: false,
  },
  {
    id: 'bagmati-tech-park',
    title: 'Kathmandu IT Trade Tower',
    location: 'Newroad, Kathmandu',
    category: 'Commercial',
    status: 'Ongoing',
    year: 2025,
    client: 'Bagmati Province Government',
    area: '35,000 sq. ft.',
    duration: '36 months',
    image: 'https://images.unsplash.com/photo-1448630360428-65456885c650?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1448630360428-65456885c650?w=1200&q=80',
    ],
    description:
      'A major public-private partnership structure in Kathmandu. Currently under construction, this 10-storey office tower is planned for technology firms and administrative offices, incorporating green roof systems.',
    highlights: [
      '10-storey landmark commercial layout',
      'Flexible IT workspaces',
      'Government service hub array',
      'Basement parking spaces for 120 cars',
      'Environmentally certified green features',
      'Built-in fiber network infrastructure',
    ],
    specifications: {
      'Built-up Area': '35,000 sq. ft.',
      Floors: 'G+9 (10 Storeys)',
      'Expected Completion': 'December 2026',
      Status: 'Frame construction in progress',
    },
    featured: true,
  },
  {
    id: 'machhapuchhre-hotel-renovation',
    title: 'Lakeside Boutique Hotel Remodel',
    location: 'Lakeside-6, Kathmandu',
    category: 'Renovation',
    status: 'Completed',
    year: 2024,
    client: 'Machhapuchhre Hotel Group',
    area: '8,200 sq. ft.',
    duration: '8 months',
    image: 'https://images.unsplash.com/photo-1621293954908-907159247fc8?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1621293954908-907159247fc8?w=1200&q=80',
    ],
    description:
      'Comprehensive renovation of a hotel in Kathmandu. This project overhauled old layouts into a boutique facility, replacing utility piping, wiring, heating systems, and building facade aesthetics.',
    highlights: [
      'Complete structural and aesthetic refresh',
      'Overhauled utility wiring and plumbing systems',
      '30 guest rooms updated to boutique standards',
      'Modern lobby and restaurant configuration',
      'New facade using stone and glass layers',
    ],
    specifications: {
      'Renovated Area': '8,200 sq. ft.',
      Rooms: '30 rooms',
      Duration: '8 months',
      Completion: 'September 2024',
    },
    featured: false,
  },
  {
    id: 'kathmandu-residential-colony',
    title: 'Rambazar Green Estates',
    location: 'Rambazar, Kathmandu',
    category: 'Residential',
    status: 'Ongoing',
    year: 2025,
    client: 'Kathmandu Green Homes Ltd.',
    area: '28,000 sq. ft.',
    duration: '28 months',
    image: 'https://images.unsplash.com/photo-1558036117-15d82a90b9b1?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1558036117-15d82a90b9b1?w=1200&q=80',
    ],
    description:
      'A modern residential neighborhood development in Rambazar. The project features 24 townhouses and 8 villas, designed with solar installations and communal green zones.',
    highlights: [
      '24 modern townhouses + 8 private villas',
      'Communal park and play spaces',
      'Solar-powered lighting arrays',
      'Rainwater reuse systems',
      'Secure walled neighborhood perimeter',
    ],
    specifications: {
      'Total Area': '28,000 sq. ft.',
      'Row Houses': '24 units (3BHK)',
      Villas: '8 units (4BHK)',
      'Expected Completion': 'June 2026',
      Status: 'Foundation work completed',
    },
    featured: false,
  },
];

// ============================================================
// TESTIMONIALS DATA
// ============================================================
export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Kiran Adhikari',
    designation: 'Homeowner',
    location: 'Lakeside, Kathmandu',
    rating: 5,
    text: 'Amulya Builders built our custom home exactly how we envisioned it. The team was highly professional, honest with costs, and kept the project on track. The structural quality is outstanding. I highly recommend them to anyone building in Kathmandu.',
    avatar: 'KA',
  },
  {
    id: 2,
    name: 'Maya Sherpa',
    designation: 'Managing Director',
    location: 'ABC Holdings Pvt. Ltd., Kathmandu',
    rating: 5,
    text: 'We partnered with Amulya Builders for our office complex. They handled the design, permit approval, and full construction with absolute professionalism. The building was delivered on budget and looks incredible.',
    avatar: 'MS',
  },
  {
    id: 3,
    name: 'Deepak Thapa',
    designation: 'Hotel Owner',
    location: 'Sarangkot Road, Kathmandu',
    rating: 5,
    text: 'Designing a hillside resort comes with challenges, but the engineers at Amulya Builders made the process seamless. The finished resort is beautiful and structurally superior.',
    avatar: 'DT',
  },
  {
    id: 4,
    name: 'Dr. Sandeep Regmi',
    designation: 'Homeowner',
    location: 'Baidam, Kathmandu',
    rating: 5,
    text: 'From consultation to handover, their communication was flawless. The construction quality is exceptional, and they only used certified materials. Highly recommended!',
    avatar: 'SR',
  },
  {
    id: 5,
    name: 'Hari Bahadur KC',
    designation: 'School Principal',
    location: 'Lekhnath, Kathmandu',
    rating: 5,
    text: 'They managed our school expansion with great care. The structure is built to modern safety codes, giving parents and staff absolute peace of mind. A job well done.',
    avatar: 'HB',
  },
];

// ============================================================
// TEAM DATA
// ============================================================
export const TEAM = [
  {
    id: 1,
    name: 'Er. Rajesh Bhattarai',
    designation: 'Chief Executive Officer & Managing Director',
    qualification: 'B.E. Civil Engineering',
    experience: '20+ years',
    avatar: 'CE',
    color: '#1e40af',
  },
  {
    id: 2,
    name: 'Ar. Prabha Sharma',
    designation: 'Chief Architect & Design Director',
    qualification: 'B.Arch, SONA Member',
    experience: '15+ years',
    avatar: 'AD',
    color: '#f97316',
  },
  {
    id: 3,
    name: 'Er. Amit Gurung',
    designation: 'Head of Structural Engineering',
    qualification: 'M.E. Structural Engineering',
    experience: '12+ years',
    avatar: 'SE',
    color: '#1e40af',
  },
  {
    id: 4,
    name: 'Pradeep Khadka',
    designation: 'Project Manager',
    qualification: 'B.E. Civil Engineering, PMP Certified',
    experience: '10+ years',
    avatar: 'PM',
    color: '#f97316',
  },
];

// ============================================================
// PROCESS STEPS
// ============================================================
export const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Project Consultation',
    description:
      'We discuss your project goals, style preferences, budget limits, and expectations to align our vision.',
    icon: 'MessageSquare',
    color: '#1e40af',
  },
  {
    step: '02',
    title: 'Site Assessment',
    description:
      'Our technical team conducts soil evaluation, site planning, and zoning analysis to ensure compliance.',
    icon: 'MapPin',
    color: '#f97316',
  },
  {
    step: '03',
    title: 'Architectural Design',
    description:
      'We design custom layouts, structural blueprints, 3D renders, and prepare permit documentation.',
    icon: 'PenTool',
    color: '#1e40af',
  },
  {
    step: '04',
    title: 'Detailed Estimation',
    description:
      'We present a transparent Bill of Quantities (BOQ) detailing all material and construction costs.',
    icon: 'Calculator',
    color: '#f97316',
  },
  {
    step: '05',
    title: 'Phased Construction',
    description:
      'Our builders execute the work with regular progress reports and quality reviews at each milestone.',
    icon: 'HardHat',
    color: '#1e40af',
  },
  {
    step: '06',
    title: 'Final Handover & Care',
    description:
      'We deliver the completed building with structural warranties and ongoing maintenance support.',
    icon: 'Key',
    color: '#f97316',
  },
];

// ============================================================
// WHY CHOOSE US
// ============================================================
export const WHY_CHOOSE_US = [
  {
    icon: 'Shield',
    title: 'Certified Materials',
    description:
      'We use high-grade, certified materials from top brands in Nepal to ensure long-term durability.',
  },
  {
    icon: 'Users',
    title: 'Skilled Engineering Team',
    description:
      'Our team comprises licensed structural engineers, creative architects, and experienced site managers.',
  },
  {
    icon: 'DollarSign',
    title: 'Zero Hidden Charges',
    description:
      'We provide clear, itemized cost estimates. The price we agree on is what you pay.',
  },
  {
    icon: 'Clock',
    title: 'On-Schedule Handover',
    description:
      'We follow structured timelines and milestones to ensure your project is completed on time.',
  },
  {
    icon: 'Eye',
    title: 'Rigorous Site Oversight',
    description:
      'Each project is monitored closely by a site engineer to maintain top-tier construction standards.',
  },
  {
    icon: 'HardHat',
    title: 'Strict Safety Protocols',
    description:
      'We prioritize worker safety and follow building safety guidelines on every construction site.',
  },
  {
    icon: 'Star',
    title: 'Meticulous Execution',
    description:
      'From concrete reinforcement to decorative paint, we focus on perfection in every detail.',
  },
  {
    icon: 'Heart',
    title: 'Customer-Centric Focus',
    description:
      'Our primary goal is client satisfaction, built through trust, honesty, and quality work.',
  },
];

// ============================================================
// HOUSE STYLES DATA
// ============================================================
export const HOUSE_STYLES = [
  {
    id: 'modern-contemporary-villa',
    title: 'Modern Contemporary Villa',
    category: 'Modern',
    description: 'Sleek, minimalist residential structure with a strong focus on open spaces, natural light, and structural geometry. Designed for a urban lifestyle in Kathmandu.',
    longDescription: 'Our Modern Contemporary Villa features structural simplicity, clean lines, and an open floor plan that connects living spaces seamlessly. Large floor-to-ceiling double-glazed windows welcome natural light, while the flat-roof layout acts as a spacious rooftop terrace, perfect for gathering and enjoying views of the Kathmandu skyline. The design prioritizes structural efficiency and high-end modern materials, creating an atmosphere of sophisticated urban living.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&q=80',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80'
    ],
    features: [
      'Flat roof terrace with panoramic views',
      'Floor-to-ceiling glass paneling',
      'Open-concept living and floating staircases',
      'Minimalist facades with dynamic accent lights'
    ],
    materials: ['High-Strength Concrete', 'Double-Glazed Thermal Glass', 'Steel Support Pillars', 'Composite Panels'],
    specifications: {
      'Est. Build Time': '12 - 15 Months',
      'Min. Plot Area': '0-5-0-0 Ropani',
      'Floor Options': '2.5 Storeys (Customizable)',
      'Structural System': 'Reinforced RCC Frame',
      'Seismic Rating': 'Designed to exceed NBC Zone V'
    }
  },
  {
    id: 'traditional-neo-vernacular',
    title: 'Traditional Neo-Vernacular',
    category: 'Traditional',
    description: 'Incorporates traditional Nepalese architectural heritage—such as carved wooden frames, terracotta tile slopes, and exposed brick facades—seamlessly blended with modern RCC foundations.',
    longDescription: 'The Traditional Neo-Vernacular style is a homage to the rich architectural legacy of Newari culture. We integrate exposed terracotta brickwork (Dachi Appa) and hand-carved wooden doors and window grids with a modern, earthquake-resistant RCC frame foundation. The interior remains bright, spacious, and open, while the exterior displays the iconic sloping tiled roofs and aesthetic wooden columns that preserve Nepal\'s historical charm.',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&q=80',
      'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=1200&q=80',
      'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1200&q=80'
    ],
    features: [
      'Sloping roofs with traditional clay tiles (Jhingati)',
      'Hand-carved wooden windows and columns',
      'Exposed brick masonry work (Dachi Appa)',
      'Aesthetic traditional courtyards (Chowk)'
    ],
    materials: ['Terracotta Clay Tiles', 'Carved Sal Wood', 'Dachi Appa Bricks', 'RCC Framework (for earthquake safety)'],
    specifications: {
      'Est. Build Time': '14 - 18 Months',
      'Min. Plot Area': '0-6-0-0 Ropani',
      'Floor Options': '2 to 3 Storeys',
      'Structural System': 'RCC Frame + Load-Bearing Brick Veneer',
      'Seismic Rating': 'Seismic Resistant Core Structure'
    }
  },
  {
    id: 'classical-colonial-mansion',
    title: 'Classical Colonial Mansion',
    category: 'Classical',
    description: 'Brings classic European symmetry and elegance to life. Perfect for large residential properties, featuring grand columns, arched entryways, and sophisticated mouldings.',
    longDescription: 'Inspired by neoclassical European estates and traditional Rana palaces, the Classical Colonial Mansion offers grand architectural proportions. Symmetrical columns flank the arched entrance, leading into high-ceiling lobbies with detailed plaster cornices. Designed for spacious suburban properties, it incorporates double-height entrance spaces, classic stone balustrades, and white stucco finishes.',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1200&q=80',
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&q=80',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1200&q=80'
    ],
    features: [
      'Symmetric facades and neoclassical pillars',
      'Arched windows and grand entryways',
      'Decorative wall cornices and ceiling panels',
      'Large open balconies and classic balustrades'
    ],
    materials: ['Ornamental Plaster Moulds', 'White Marble Flooring', 'Structured Columns', 'High-Grade Paint'],
    specifications: {
      'Est. Build Time': '16 - 20 Months',
      'Min. Plot Area': '0-8-0-0 Ropani',
      'Floor Options': '2 to 3 Storeys',
      'Structural System': 'Massive Concrete Framing',
      'Seismic Rating': 'Designed to exceed NBC Zone V'
    }
  },
  {
    id: 'modern-sloped-roof-house',
    title: 'Modern Sloped-Roof House',
    category: 'Sloped Roof',
    description: 'A popular and functional architectural style in Nepal that combines concrete slabs with sloping slate or tile roof highlights, ideal for weather protection and drainage.',
    longDescription: 'The Modern Sloped-Roof House is built to combine practicality with high-end aesthetic styling. Featuring multi-level sloping roof highlights finished with premium slate tiles, it provides weather protection during Nepal\'s intense monsoon seasons. The concrete structure supports spacious modern balconies, covered eaves, and exterior stone cladding that fits naturally into the hilly terrain.',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80',
      'https://images.unsplash.com/photo-1502005229762-fc1b2b812ca5?w=1200&q=80'
    ],
    features: [
      'Multi-level sloping roof lines',
      'Slate tile or composite shingle roofs',
      'Spacious balconies with protective eaves',
      'Aesthetic stone wall cladding accents'
    ],
    materials: ['Slate Tiles', 'Godawari Stone Cladding', 'RCC Reinforced Slabs', 'Weatherproof Coatings'],
    specifications: {
      'Est. Build Time': '10 - 13 Months',
      'Min. Plot Area': '0-4-2-0 Ropani',
      'Floor Options': '2.5 Storeys',
      'Structural System': 'RCC Structural Framework',
      'Seismic Rating': 'Designed to exceed NBC Zone V'
    }
  },
  {
    id: 'eco-friendly-minimalist',
    title: 'Eco-Friendly Minimalist',
    category: 'Eco-Friendly',
    description: 'Focuses on sustainable construction, minimizing environmental footprint by integrating solar power, passive solar heating, green areas, and local construction materials.',
    longDescription: 'Our Eco-Friendly Minimalist design is created for the eco-conscious homeowner. The layout is optimized based on the sun\'s path to ensure passive solar heating during Kathmandu\'s cold winters while maintaining natural cross-ventilation for cooling. Complete with rainwater harvesting systems, roof gardens, and an integrated hybrid solar array, this style reduces utility dependence while emphasizing local, renewable timber and stone details.',
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1200&q=80',
      'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80'
    ],
    features: [
      'Passive solar orientation for heating',
      'Natural cross-ventilation layout',
      'Integrated solar panels and battery banks',
      'Roof gardens and indoor green courtyards'
    ],
    materials: ['Locally Sourced Stone & Timber', 'Recycled Steel & Composite Wood', 'Non-Toxic Paints', 'Solar Energy Systems'],
    specifications: {
      'Est. Build Time': '12 - 14 Months',
      'Min. Plot Area': '0-5-0-0 Ropani',
      'Floor Options': '2 Storeys',
      'Structural System': 'Lightweight RCC Frame + Eco panels',
      'Seismic Rating': 'Designed to exceed NBC Zone V'
    }
  }
];

// ============================================================
// COST ESTIMATOR CONFIGURATION (Nepal Construction Market)
// ============================================================
export const CALCULATOR_CONFIG = {
  packages: [
    {
      id: 'basic',
      title: 'Basic Package',
      rate: 6000,
      desc: 'Quality base-level residential construction using local materials and standard RCC frames.',
      includes: [
        'M20 Grade Concrete & local Fe500 reinforcement steel',
        'Standard floor tiles & local granite for kitchen/staircases',
        'Standard CPVC plumbing & local electrical cables (e.g. Pioneer/Lipi)',
        'Standard distemper/emulsion paints & laminated flush doors'
      ]
    },
    {
      id: 'premium',
      title: 'Premium Package',
      rate: 8200,
      desc: 'High-quality branded finishes, false ceilings, modular fixtures, and styled facades.',
      includes: [
        'M25 Ready-Mix Concrete & premium branded steel (e.g. Jagadamba/Ambe)',
        'Imported vitrified flooring tiles & Indian marble details',
        'Branded sanitaryware & fittings (e.g. Cera/Jaquar)',
        'Acrylic weatherproof emulsion paints & UPVC profile windows'
      ]
    },
    {
      id: 'luxury',
      title: 'Luxury Package',
      rate: 11500,
      desc: 'Premium imported marble, custom solid woodwork, false ceilings, smart systems, and luxury fittings.',
      includes: [
        'Double-reinforced earthquake-safe structural concrete core',
        'Imported Italian marble flooring & premium hardwood detailing',
        'High-end sanitaryware with wall-hung basins & premium fixtures',
        'Premium solid teak doors & double-glazed soundproof UPVC windows'
      ]
    }
  ],
  floors: [
    { id: 'gf', title: 'Ground Floor', factor: 1.0 },
    { id: 'g1', title: 'G+1', factor: 1.0 },
    { id: 'g2', title: 'G+2', factor: 1.0 },
    { id: 'g2p', title: 'G+2 + Partial Penthouse', factor: 1.02 }
  ],
  locations: [
    { id: 'kathmandu', title: 'Kathmandu Valley', factor: 1.0 },
    { id: 'pokhara', title: 'Pokhara', factor: 1.05 },
    { id: 'terai', title: 'Terai Region', factor: 0.95 },
    { id: 'hill', title: 'Hill Region', factor: 1.15 },
    { id: 'other', title: 'Other Areas', factor: 1.0 }
  ],
  terrains: [
    { id: 'flat', title: 'Flat / Solid Soil', factor: 1.0, desc: 'Standard flat terrain with stable soil load-bearing capacity.' },
    { id: 'sloped', title: 'Sloped / Hilly Terrain', factor: 1.12, desc: 'Requires retaining structures, steps, and extra slope excavation.' },
    { id: 'difficult', title: 'Difficult Terrain', factor: 1.25, desc: 'Loose soil, riverside plots, or marshy land requiring piling/deep foundations.' }
  ],
  styles: [
    { id: 'modern', title: 'Modern Contemporary', factor: 1.0 },
    { id: 'sloped_roof', title: 'Modern Sloped-Roof', factor: 1.04 },
    { id: 'classical', title: 'Colonial Rana Mansion', factor: 1.08 },
    { id: 'traditional', title: 'Traditional Newari', factor: 1.12 },
    { id: 'eco', title: 'Eco-Friendly Minimalist', factor: 1.08 }
  ],
  upgrades: [
    { id: 'smart', title: 'Smart Home Automation', cost: 250000, desc: 'Integrated lighting, security, and smart access.' },
    { id: 'solar', title: '5 kW Hybrid Solar Array', cost: 350000, desc: 'Hybrid inverter, solar panels, and battery backup.' },
    { id: 'rainwater', title: 'Rainwater Harvesting & Filtration', cost: 180000, desc: 'Rooftop collection, sand filtration, and storage integration.' }
  ],
  distribution: {
    civil: 0.55,
    finishes: 0.25,
    mep: 0.15,
    permits: 0.05
  },
  variance: 0.05
};
