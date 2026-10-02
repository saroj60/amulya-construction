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
    id: 1,
    title: 'Project 1',
    location: 'Kathmandu Valley, Nepal',
    category: 'Residential',
    status: 'Completed',
    duration: 'Turnkey Project',
    image: '/projects/project-1.jpg',
    gallery: [
      '/projects/project-1.jpg',
    ],
    description:
      'Project 1 — Modern multi-storey residential architecture and construction by Amulya Builders.',
    highlights: [
      'Earthquake-resistant RCC structure',
      'Modern brick-and-render facade',
      'Integrated parking and open balconies',
      'NBC 105:2020 code compliance',
    ],
    specifications: {
      'Project': 'Project 1',
      'Type': 'Residential Building',
      'Floors': '3.5 Storeys',
      'Scope': 'Turnkey Design & Construction',
    },
    featured: true,
  },
  {
    id: 2,
    title: 'Project 2',
    location: 'Kathmandu Valley, Nepal',
    category: 'Residential',
    status: 'Completed',
    duration: 'Turnkey Project',
    image: '/projects/project-2.jpg',
    gallery: [
      '/projects/project-2.jpg',
      '/projects/project-2-garden.jpg',
    ],
    description:
      'Project 2 — Modern luxury residential villa with curved panoramic terraces, landscaping, and turnkey construction by Amulya Builders.',
    highlights: [
      'Curved panoramic terrace & glass balustrades',
      'Artisan exposed brick circular bay window',
      'Integrated spiral rooftop access and landscaped lawn',
      'NBC earthquake-resistant RCC construction',
    ],
    specifications: {
      'Project': 'Project 2',
      'Type': 'Luxury Residential Villa',
      'Floors': '2.5 Storeys + Rooftop Lounge',
      'Scope': 'Turnkey Design & Construction',
    },
    featured: true,
  },
  {
    id: 3,
    title: 'Project 3',
    location: 'Kathmandu Valley, Nepal',
    category: 'Residential',
    status: 'Completed',
    duration: 'Turnkey Project',
    image: '/projects/project-3.jpg',
    gallery: [
      '/projects/project-3.jpg',
    ],
    description:
      'Project 3 — Modern outdoor living, pergola patio, barbecue station, and landscaped garden design & construction by Amulya Builders.',
    highlights: [
      'Timber pergola & outdoor barbecue kitchen',
      'Landscaped lawn with garden swing and water feature',
      'Custom stone paved outdoor dining patio',
      'Modern security fencing and integrated exterior lighting',
    ],
    specifications: {
      'Project': 'Project 3',
      'Type': 'Outdoor Living & Landscaping',
      'Features': 'Pergola, BBQ Patio, Lawn, Mini Pond',
      'Scope': 'Turnkey Design & Execution',
    },
    featured: true,
  },
  {
    id: 4,
    title: 'Project 4',
    location: 'Kathmandu Valley, Nepal',
    category: 'Residential',
    status: 'Completed',
    duration: 'Turnkey Project',
    image: '/projects/project-4.jpg',
    gallery: [
      '/projects/project-4.jpg',
    ],
    description:
      'Project 4 — Contemporary 4-storey residential home blending modern RCC structure with traditional tiled balcony cornices, brick column accents, and rooftop pergolas by Amulya Builders.',
    highlights: [
      '4-Storey RCC earthquake-resistant frame',
      'Covered vehicle porch and dedicated 2-wheeler parking',
      'Exposed brick feature pillar with exterior warm illumination',
      'Upper floor rooftop pergola and spiral deck staircase',
    ],
    specifications: {
      'Project': 'Project 4',
      'Type': 'Residential Multi-Storey House',
      'Floors': '4 Storeys',
      'Parking': 'Car Porch & Motorcycle Space',
      'Scope': 'Turnkey Design & Construction',
    },
    featured: true,
  },
  {
    id: 5,
    title: 'Project 5',
    location: 'Kathmandu Valley, Nepal',
    category: 'Residential',
    status: 'Completed',
    duration: 'Turnkey Project',
    image: '/projects/project-5.jpg',
    gallery: [
      '/projects/project-5.jpg',
    ],
    description:
      'Project 5 — Multi-angle perspective of luxury residential villa showing panoramic terrace, side elevations, and rooftop viewing deck by Amulya Builders.',
    highlights: [
      'Full perimeter glass terrace balustrades',
      'Structural cantilevered slab and timber rafter cornice',
      'Rooftop spiral access staircase and terrace layout',
      'NBC earthquake-resistant RCC frame',
    ],
    specifications: {
      'Project': 'Project 5',
      'Type': 'Residential Villa Elevation',
      'Floors': '2.5 Storeys + Open Terrace',
      'Scope': 'Turnkey Design & Construction',
    },
    featured: true,
  },
  {
    id: 6,
    title: 'Project 6',
    location: 'Kathmandu Valley, Nepal',
    category: 'Residential',
    status: 'Completed',
    duration: 'Turnkey Project',
    image: '/projects/project-6.jpg',
    gallery: [
      '/projects/project-6.jpg',
    ],
    description:
      'Project 6 — Complete estate master layout and aerial architectural design showing 2.5-storey luxury villa, landscaped garden, parking court, and perimeter security wall by Amulya Builders.',
    highlights: [
      'Aerial master plan & complete boundary layout',
      'Integrated dual-vehicle driveway & paved courtyard',
      'Comprehensive outdoor landscape, patio & water feature integration',
      'Earthquake-resistant RCC construction with NBC compliance',
    ],
    specifications: {
      'Project': 'Project 6',
      'Type': 'Estate Master Plan & Architecture',
      'Floors': '2.5 Storeys + Rooftop Deck',
      'Outdoor Features': 'Pergola, Lawn, BBQ Station, Water Feature',
      'Scope': 'Turnkey Design & Construction',
    },
    featured: true,
  },
  {
    id: 7,
    title: 'Project 7',
    location: 'Kathmandu Valley, Nepal',
    category: 'Residential',
    status: 'Completed',
    duration: 'Turnkey Project',
    image: '/projects/project-7.jpg',
    gallery: [
      '/projects/project-7.jpg',
      '/projects/project-7-aerial.jpg',
    ],
    description:
      'Project 7 — Neo-classical 3.5-storey luxury residence featuring a grand central arched brick glass atrium, dual covered parking garages, classical balustrade balconies, and rooftop pergola gym terrace by Amulya Builders.',
    highlights: [
      'Monumental exposed brick central arched glass atrium',
      'Dual independent covered parking bays with iron gates',
      'Upper rooftop fitness pergola with spiral observation stairs',
      'Neo-classical ornamental balustrades and mouldings',
    ],
    specifications: {
      'Project': 'Project 7',
      'Type': 'Neo-Classical Luxury Residence',
      'Floors': '3.5 Storeys',
      'Parking': 'Dual Covered Bays (2 Cars + Bikes)',
      'Rooftop': 'Open-Air Pergola Fitness Terrace',
      'Scope': 'Turnkey Design & Construction',
    },
    featured: true,
  },
  {
    id: 8,
    title: 'Project 8',
    location: 'Kathmandu Valley, Nepal',
    category: 'Residential',
    status: 'Completed',
    duration: 'Turnkey Project',
    image: '/projects/project-8.jpg',
    gallery: [
      '/projects/project-8.jpg',
      '/projects/project-8-side.jpg',
      '/projects/project-8-rear.jpg',
    ],
    description:
      'Project 8 — Majestic neo-classical 3.5-storey luxury residence featuring dressed sandstone central atrium, multi-tiered balconies with intricate balustrades, dual car bays, and complete perimeter boundary design by Amulya Builders.',
    highlights: [
      'Dressed sandstone central arched glass atrium',
      'Multi-tiered balconies with classical ornamental railings',
      'Rear garden & side driveway parking circulation',
      'Rooftop fitness deck with spiral observation stairs',
    ],
    specifications: {
      'Project': 'Project 8',
      'Type': 'Neo-Classical Luxury Residence',
      'Floors': '3.5 Storeys',
      'Parking': 'Dual Covered Bays (2 Cars + Bikes)',
      'Angles Included': 'Front Elevation, Side View & Rear Perspective',
      'Scope': 'Turnkey Design & Construction',
    },
    featured: true,
  },
  {
    id: 9,
    title: 'Project 9',
    location: 'Kathmandu Valley, Nepal',
    category: 'Residential',
    status: 'Completed',
    duration: 'Turnkey Project',
    image: '/projects/project-9.jpg',
    gallery: [
      '/projects/project-9.jpg',
      '/projects/project-9-aerial.jpg',
    ],
    description:
      'Project 9 — Angular front-left perspective and isometric aerial visualization of neo-classical luxury mansion showing side verandahs, multi-tiered classical balconies, and rooftop gym pergola by Amulya Builders.',
    highlights: [
      'Front-left corner architectural profile & entry gates',
      'Multi-level colonnaded verandahs and classical balustrades',
      'Open rooftop fitness terrace with pergola and spiral stair',
      'Earthquake-resistant high-ductility RCC engineering',
    ],
    specifications: {
      'Project': 'Project 9',
      'Type': 'Neo-Classical Luxury Residence',
      'Floors': '3.5 Storeys',
      'Parking': 'Covered Parking Bay',
      'Scope': 'Turnkey Design & Construction',
    },
    featured: true,
  },
  {
    id: 10,
    title: 'Project 10',
    location: 'Nepal',
    category: 'Commercial',
    status: 'Completed',
    duration: 'Turnkey Project',
    image: '/projects/project-10.jpg',
    gallery: [
      '/projects/project-10.jpg',
    ],
    description:
      'Project 10 — Hilltop spiritual pilgrimage complex featuring monumental golden Lord Shiva statue, Shivalinga pedestals, stupa, dressed stone fortress retaining walls, and landscaped rhododendron gardens by Amulya Builders.',
    highlights: [
      'Monumental hilltop golden Shiva deity installation',
      'Surrounding traditional Shivalinga shrines and stupa integration',
      'Engineered stone fortress retaining walls and stepped grand access',
      'Laligurans flower gardens and scenic panoramic landscaping',
    ],
    specifications: {
      'Project': 'Project 10',
      'Type': 'Spiritual Monument & Pilgrimage Park',
      'Features': 'Colossal Shiva Statue, Shivalingas, Chaitya, Stone Ramparts',
      'Scope': 'Civil Engineering, Retaining Walls & Landmark Execution',
    },
    featured: true,
  },
  {
    id: 11,
    title: 'Project 11',
    location: 'Kathmandu Valley, Nepal',
    category: 'Residential',
    status: 'Completed',
    duration: 'Turnkey Project',
    image: '/projects/project-11.jpg',
    gallery: [
      '/projects/project-11.jpg',
    ],
    description:
      'Project 11 — Modern 2.5-storey residential villa featuring C-curve architectural balcony frames, exposed brick vertical accent pillar, rooftop timber pergola, and secured boundary courtyard by Amulya Builders.',
    highlights: [
      'Contemporary C-frame cantilevered balcony',
      'Warm exposed brick masonry vertical facade pillar',
      'Open rooftop recreational terrace with wooden pergola',
      'Earthquake-resistant RCC ductile frame structure',
    ],
    specifications: {
      'Project': 'Project 11',
      'Type': 'Contemporary Residential Villa',
      'Floors': '2.5 Storeys',
      'Features': 'Balcony C-Frame, Brick Accent, Rooftop Pergola',
      'Scope': 'Turnkey Design & Construction',
    },
    featured: true,
  },
  {
    id: 12,
    title: 'Project 12',
    location: 'Kathmandu Valley, Nepal',
    category: 'Residential',
    status: 'Completed',
    duration: 'Turnkey Project',
    image: '/projects/project-12.jpg',
    gallery: [
      '/projects/project-12.jpg',
      '/projects/project-12-front.jpg',
      '/projects/project-12-rear.jpg',
    ],
    description:
      'Project 12 — Grand 3.5-storey neo-classical palatial residence featuring monumental Corinthian fluted columns, ornate pediment over central arched atrium, cascading green planters, and multi-sided balustrade balconies by Amulya Builders.',
    highlights: [
      'Monumental Corinthian colonnade with ornate pediment cartouche',
      'Central full-height arched bay atrium and double car parking',
      'Cascading planter balconies and rooftop pergola lounge',
      'Complete rear and side multi-angle architectural elevations',
    ],
    specifications: {
      'Project': 'Project 12',
      'Type': 'Neo-Classical Corinthian Mansion',
      'Floors': '3.5 Storeys',
      'Parking': 'Dual Covered Bays',
      'Angles Included': 'Front-Left Perspective, Street Elevation & Rear View',
      'Scope': 'Turnkey Design & Construction',
    },
    featured: true,
  },
  {
    id: 13,
    title: 'Project 13',
    location: 'Kathmandu Valley, Nepal',
    category: 'Residential',
    status: 'Completed',
    duration: 'Turnkey Project',
    image: '/projects/project-13.jpg',
    gallery: [
      '/projects/project-13.jpg',
      '/projects/project-13-aerial.jpg',
    ],
    description:
      'Project 13 — Elegant 2-storey cottage villa blending modern RCC engineering with classic Nepalese red sloping tile roofs, gabled portico entrance, spacious parking yard, and secured compound perimeter by Amulya Builders.',
    highlights: [
      'Multi-tiered sloping red clay tile roofs with dormer gables',
      'Colonnaded portico entrance and open balcony',
      'Spacious paved parking court for multiple vehicles',
      'Earthquake-resistant RCC ductile frame engineering',
    ],
    specifications: {
      'Project': 'Project 13',
      'Type': 'Sloping-Roof Residential Villa',
      'Floors': '2 Storeys',
      'Roof Style': 'Pitched Red Clay Tiled Gables',
      'Angles Included': 'Front Elevation & Isometric Aerial View',
      'Scope': 'Turnkey Design & Construction',
    },
    featured: true,
  },
  {
    id: 14,
    title: 'Project 14',
    location: 'Kathmandu Valley, Nepal',
    category: 'Commercial',
    status: 'Completed',
    duration: 'Turnkey Project',
    image: '/projects/project-14.jpg',
    gallery: [
      '/projects/project-14.jpg',
      '/projects/project-14-corner.jpg',
      '/projects/project-14-front.jpg',
    ],
    description:
      'Project 14 — Contemporary 3.5-storey mixed-use commercial & residential building featuring ground-floor retail shopfronts with rolling shutters, premium residential apartments above, stone-clad accent facade, and cascading planter rooftop terrace by Amulya Builders.',
    highlights: [
      'Ground-floor commercial retail shutters with independent stairwell',
      'Upper-floor spacious residential apartments with glass balustrades',
      'Textured stone cladding and contemporary dark composite paneling',
      'Rooftop green planter cornice and steel canopy pergola',
    ],
    specifications: {
      'Project': 'Project 14',
      'Type': 'Mixed-Use Commercial & Residential Building',
      'Floors': '3.5 Storeys',
      'Ground Level': '3 Retail Commercial Units',
      'Upper Floors': 'Residential Apartments',
      'Angles Included': 'Front-Left View, Corner Isometric & Direct Front Elevation',
      'Scope': 'Turnkey Design & Construction',
    },
    featured: true,
  },
  {
    id: 15,
    title: 'Project 15',
    location: 'Kathmandu Valley, Nepal',
    category: 'Residential',
    status: 'Completed',
    duration: 'Turnkey Project',
    image: '/projects/project-15.jpg',
    gallery: [
      '/projects/project-15.jpg',
    ],
    description:
      'Project 15 — Distinctive 3-storey European Mediterranean luxury villa featuring arched arcade verandas, hip slate roof, rooftop terrace pergola lounge, palm landscaping, and gated compound parking by Amulya Builders.',
    highlights: [
      'Grand double-storey arched arcade portico & balcony',
      'Charcoal slate pitched hip roof with architectural eaves',
      'Spacious top rooftop observation terrace with garden pergola',
      'Earthquake-resistant RCC ductile frame engineering',
    ],
    specifications: {
      'Project': 'Project 15',
      'Type': 'European Mediterranean Villa',
      'Floors': '3 Storeys',
      'Roof Style': 'Pitched Slate Hip Roof',
      'Outdoor': 'Rooftop Terrace Pergola & Gated Courtyard',
      'Scope': 'Turnkey Design & Construction',
    },
    featured: true,
  },
  {
    id: 16,
    title: 'Project 16',
    location: 'Kathmandu Valley, Nepal',
    category: 'Residential',
    status: 'Completed',
    duration: 'Turnkey Project',
    image: '/projects/project-16.jpg',
    gallery: [
      '/projects/project-16.jpg',
    ],
    description:
      'Project 16 — Contemporary 3-storey luxury villa featuring curved red-brick corner bay with panoramic windows, open first-floor terrace lounge, executive second-floor balcony with spiral rooftop staircase, and landscaped courtyard parking by Amulya Builders.',
    highlights: [
      'Architectural curved red-brick cylinder wing with panoramic glass windows',
      'Spacious first-floor terrace lounge with transparent glass railings',
      'Executive second-floor balcony with exterior spiral staircase to roof deck',
      'Ground floor outdoor patio seating and covered pergola BBQ area',
    ],
    specifications: {
      'Project': 'Project 16',
      'Type': 'Contemporary Luxury Villa',
      'Floors': '3 Storeys + Rooftop Deck',
      'Exterior': 'Exposed Red Brick & Smooth White Stucco',
      'Features': 'Spiral Deck Staircase, Terrace Lounge & BBQ Pergola',
      'Scope': 'Turnkey Design & Construction',
    },
    featured: true,
  },
  {
    id: 17,
    title: 'Project 17',
    location: 'Kathmandu Valley, Nepal',
    category: 'Residential',
    status: 'Completed',
    duration: 'Turnkey Project',
    image: '/projects/project-17.jpg',
    gallery: [
      '/projects/project-17.jpg',
    ],
    description:
      'Project 17 — Contemporary 4-storey residential building featuring Nepali traditional roof eave cornices, brick-and-render dual-tone facade, gated compound wall with covered entrance, multiple vehicle parking, and landscaped garden perimeter by Amulya Builders.',
    highlights: [
      '4-Storey earthquake-resilient RCC frame engineered to NBC codes',
      'Neo-vernacular red-tiled overhang canopies and clay brick accent bands',
      'Private gated compound with dedicated multi-car paved parking',
      'Landscaped boundary perimeter with decorative pillar fencing',
    ],
    specifications: {
      'Project': 'Project 17',
      'Type': 'Multi-Storey Residential Residence',
      'Floors': '4 Storeys',
      'Roof Style': 'Flat RCC Rooftop with Traditional Eave Canopies',
      'Outdoor': 'Gated Boundary, Multi-Vehicle Parking & Perimeter Greenery',
      'Scope': 'Turnkey Design & Construction',
    },
    featured: true,
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
    },
    price: 'Rs 24,950.00'
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
    },
    price: 'Rs 28,500.00'
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
    },
    price: 'Rs 32,750.00'
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
    },
    price: 'Rs 26,500.00'
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
    },
    price: 'Rs 27,950.00'
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
