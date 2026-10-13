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
    yearsExperience: '9+',
    happyClients: '20+',
    professionals: '15+',
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
    title: 'Project Code: 1',
    location: '',
    category: 'Residential',
    status: 'Completed',
    duration: 'Turnkey Project',
    image: '/project-gallery/project-1.jpg',
    gallery: [
      '/project-gallery/project-1.jpg',
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
      'Project Code': '1',
      'Location': '',
      'Project Cost': '',
      'Type of Building': '',
      'Plinth Area': '',
      'Face Length': '',
    },
    featured: true,
  },
  {
    id: 2,
    title: 'Project Code: 2',
    location: '',
    category: 'Residential',
    status: 'Completed',
    duration: 'Turnkey Project',
    image: '/project-gallery/project-2.jpg',
    gallery: [
      '/project-gallery/project-2.jpg',
      '/project-gallery/project-2-garden.jpg',
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
      'Project Code': '2',
      'Location': '',
      'Project Cost': '',
      'Type of Building': '',
      'Plinth Area': '',
      'Face Length': '',
    },
    featured: true,
  },
  {
    id: 3,
    title: 'Project Code: 3',
    location: '',
    category: 'Residential',
    status: 'Completed',
    duration: 'Turnkey Project',
    image: '/project-gallery/project-3.jpg',
    gallery: [
      '/project-gallery/project-3.jpg',
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
      'Project Code': '3',
      'Location': '',
      'Project Cost': '',
      'Type of Building': '',
      'Plinth Area': '',
      'Face Length': '',
    },
    featured: true,
  },
  {
    id: 4,
    title: 'Project Code: 4',
    location: '',
    category: 'Residential',
    status: 'Completed',
    duration: 'Turnkey Project',
    image: '/project-gallery/project-4.jpg',
    gallery: [
      '/project-gallery/project-4.jpg',
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
      'Project Code': '4',
      'Location': '',
      'Project Cost': '',
      'Type of Building': '',
      'Plinth Area': '',
      'Face Length': '',
    },
    featured: true,
  },
  {
    id: 6,
    title: 'Jay Kishor Mahato Residential',
    location: 'Chitwan',
    category: 'Residential',
    status: 'Completed',
    duration: '11 Months',
    year: '2083 BS',
    cost: 'Rs 1 Cr 10 Lakhs',
    area: '1690 sq ft',
    image: '/project-gallery/project-6.jpg',
    gallery: [
      '/project-gallery/project-6.jpg',
    ],
    description:
      'Jay Kishor Mahato Residential is a beautifully designed 2.5-storey modern residential home located in Chitwan. Completed in 2083 BS within a fast-track duration of 11 Months at a total project cost of Rs 1 Cr 10 Lakhs, this residence sits on a generous 1300 sq ft plinth area with an impressive 42 ft front facade and 1690 sq ft of total built-up area. Engineered with an earthquake-resistant RCC frame, the property blends functional family living spaces with landscaped outdoor courtyards, spacious balconies, and a signature rooftop pergola.',
    floorLayout: [
      {
        floor: 'Ground Floor',
        level: 'Level 0',
        code: '2B • 1K • 1L • 1T',
        features: [
          '2 Spacious bedrooms (2B)',
          '1 Modern modular kitchen & dining space (1K)',
          '1 Welcoming family living hall (1L)',
          '1 Common bathroom / toilet (1T)'
        ]
      },
      {
        floor: 'First Floor',
        level: 'Level 1',
        code: '2B • 1L • 1W/T',
        features: [
          '2 Comfortable private bedrooms (2B)',
          '1 Upper family living / lounge area (1L)',
          '1 Washroom / toilet facility (1W/T)'
        ]
      },
      {
        floor: 'Second Floor',
        level: 'Level 2',
        code: '1B • 1FS • 1 Pergola',
        features: [
          '1 Guest / master bedroom (1B)',
          '1 Functional family / utility space (1FS)',
          '1 Architectural rooftop pergola & open terrace (1 Pergola)'
        ]
      }
    ],
    highlights: [
      '2.5-Storey residence with 1690 sq ft total built-up area & 1300 sq ft plinth area',
      'Grand 42 ft wide front elevation with integrated parking & landscaped yard',
      'Ground Floor: 2 Bedrooms, 1 Kitchen, 1 Living Hall & 1 Toilet (2B 1K 1L 1T)',
      'First Floor: 2 Bedrooms, 1 Living Lounge & 1 Washroom/Toilet (2B 1L 1W/T)',
      'Second Floor: 1 Bedroom, 1 Family Space & 1 Rooftop Pergola (1B 1FS 1 Pergola)',
      'Earthquake-resistant RCC construction with NBC compliance'
    ],
    specifications: {
      'Project Code': '6',
      'Project Name': 'Jay Kishor Mahato Residential',
      'Location': 'Chitwan',
      'Project Cost': 'Rs 1 Cr 10 Lakhs',
      'Type of Building': 'Residential',
      'Storeys': '2.5 Storeys',
      'Total Area': '1690 sq ft',
      'Plinth Area': '1300 sq ft',
      'Face Length': '42 ft',
      'Duration': '11 Months',
      'Completion Year': '2083 BS',
    },
    featured: true,
  },
  {
    id: 7,
    title: 'Dr. Sakil Residential',
    location: 'Janakpur',
    category: 'Residential',
    status: 'Completed',
    duration: '1 Year 6 Months',
    year: '2083 BS',
    cost: 'Rs 1.5 Cr',
    area: '1966 sq ft',
    image: '/project-gallery/project-7.jpg',
    gallery: [
      '/project-gallery/project-7.jpg',
      '/project-gallery/project-7-aerial.jpg',
    ],
    description:
      'Dr. Sakil Residential is a grand 3.5-storey neo-classical luxury residence situated in Janakpur. Completed in 2083 BS over a duration of 1 Year 6 Months at a project cost of Rs 1.5 Cr, this landmark home spans 1966 sq ft of total built-up area on a 1200 sq ft plinth area with a 30 ft front elevation. The design features a monumental central arched glass atrium, dual covered parking bays, classical balustrade balconies, and an open rooftop pergola terrace engineered with NBC-compliant earthquake-resistant RCC construction.',
    highlights: [
      '3.5-Storey luxury residence with 1966 sq ft total area & 1200 sq ft plinth area',
      'Monumental exposed brick central arched glass atrium & 30 ft front facade',
      'Dual independent covered parking bays with ornamental gates',
      'Upper rooftop fitness pergola with spiral observation stairs',
      'Neo-classical ornamental balustrades and mouldings',
      'Earthquake-resistant RCC frame construction'
    ],
    specifications: {
      'Project Code': '7',
      'Project Name': 'Dr. Sakil Residential',
      'Location': 'Janakpur',
      'Project Cost': 'Rs 1.5 Cr',
      'Type of Building': 'Residential',
      'Storeys': '3.5 Storeys',
      'Total Area': '1966 sq ft',
      'Plinth Area': '1200 sq ft',
      'Face Length': '30 ft',
      'Duration': '1 Year 6 Months',
      'Completion Year': '2083 BS',
    },
    featured: true,
  },
  {
    id: 10,
    title: 'Project Code: 10',
    location: '',
    category: 'Commercial',
    status: 'Completed',
    duration: 'Turnkey Project',
    image: '/project-gallery/project-10.jpg',
    gallery: [
      '/project-gallery/project-10.jpg',
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
      'Project Code': '10',
      'Location': '',
      'Project Cost': '',
      'Type of Building': '',
      'Plinth Area': '',
      'Face Length': '',
    },
    featured: true,
  },
  {
    id: 11,
    title: 'Project Code: 11',
    location: 'Budhanilkantha, Kathmandu',
    category: 'Residential',
    status: 'Completed',
    duration: '1 Year 8 Months',
    year: '2023',
    cost: 'Rs 1 Cr 20 Lakhs',
    image: '/project-gallery/project-11.jpg',
    gallery: [
      '/project-gallery/project-11.jpg',
    ],
    description:
      'Project Code: 11 is an exquisite 2.5-storey modern residential villa situated in the serene and scenic surroundings of Budhanilkantha, Kathmandu. Successfully completed in 2023 with a total project cost of Rs 1 Cr 20 Lakhs over an efficient timeline of 1 Year 8 Months, this home is built with high-ductility earthquake-resistant RCC structural engineering, contemporary C-curve cantilevered balconies, and an artisan exposed-brick vertical accent pillar.',
    floorLayout: [
      {
        floor: 'Ground Floor',
        features: [
          'Spacious living hall with attached bathroom',
          'Dedicated family dining area',
          'Contemporary modular kitchen'
        ]
      },
      {
        floor: 'First Floor',
        features: [
          '3 Master bedrooms',
          'Private attached bathrooms in every bedroom',
          'Ventilated balcony access'
        ]
      },
      {
        floor: 'Second Floor',
        features: [
          '1 Comfortable bedroom',
          'Dedicated laundry area',
          'Peaceful puja room',
          'Open rooftop terrace access'
        ]
      }
    ],
    highlights: [
      '3 Master bedrooms with attached bathrooms on 1st floor',
      'Ground floor hall with attached bath, dining & modular kitchen',
      '2nd floor bedroom, dedicated laundry area & puja room',
      'Contemporary C-frame cantilevered balcony & brick accent pillar',
      'Open rooftop recreational terrace with scenic views',
      'Earthquake-resistant RCC ductile frame structure'
    ],
    specifications: {
      'Project Code': '11',
      'Location': 'Budhanilkantha, Kathmandu',
      'Project Cost': 'Rs 1 Cr 20 Lakhs',
      'Type of Building': 'Residential',
      'Plinth Area': '1100 sq ft',
      'Face Length': '26 ft',
      'Duration': '1 Year 8 Months',
      'Completion Year': '2023',
    },
    featured: true,
  },
  {
    id: 12,
    title: 'Project Code: 12',
    location: '',
    category: 'Residential',
    status: 'Completed',
    duration: 'Turnkey Project',
    image: '/project-gallery/project-12.jpg',
    gallery: [
      '/project-gallery/project-12.jpg',
      '/project-gallery/project-12-front.jpg',
      '/project-gallery/project-12-rear.jpg',
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
      'Project Code': '12',
      'Location': '',
      'Project Cost': '',
      'Type of Building': '',
      'Plinth Area': '',
      'Face Length': '',
    },
    featured: true,
  },
  {
    id: 13,
    title: 'Project Code: 13',
    location: '',
    category: 'Residential',
    status: 'Completed',
    duration: 'Turnkey Project',
    image: '/project-gallery/project-13.jpg',
    gallery: [
      '/project-gallery/project-13.jpg',
      '/project-gallery/project-13-aerial.jpg',
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
      'Project Code': '13',
      'Location': '',
      'Project Cost': '',
      'Type of Building': '',
      'Plinth Area': '',
      'Face Length': '',
    },
    featured: true,
  },
  {
    id: 14,
    title: 'Project Code: 14',
    location: '',
    category: 'Commercial',
    status: 'Completed',
    duration: 'Turnkey Project',
    image: '/project-gallery/project-14.jpg',
    gallery: [
      '/project-gallery/project-14.jpg',
      '/project-gallery/project-14-corner.jpg',
      '/project-gallery/project-14-front.jpg',
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
      'Project Code': '14',
      'Location': '',
      'Project Cost': '',
      'Type of Building': '',
      'Plinth Area': '',
      'Face Length': '',
    },
    featured: true,
  },
  {
    id: 15,
    title: 'Project Code: 15',
    location: '',
    category: 'Residential',
    status: 'Completed',
    duration: 'Turnkey Project',
    image: '/project-gallery/project-15.jpg',
    gallery: [
      '/project-gallery/project-15.jpg',
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
      'Project Code': '15',
      'Location': '',
      'Project Cost': '',
      'Type of Building': '',
      'Plinth Area': '',
      'Face Length': '',
    },
    featured: true,
  },
  {
    id: 17,
    title: 'Project Code: 17',
    location: '',
    category: 'Residential',
    status: 'Completed',
    duration: 'Turnkey Project',
    image: '/project-gallery/project-17.jpg',
    gallery: [
      '/project-gallery/project-17.jpg',
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
      'Project Code': '17',
      'Location': '',
      'Project Cost': '',
      'Type of Building': '',
      'Plinth Area': '',
      'Face Length': '',
    },
    featured: true,
  },
  {
    id: 18,
    title: 'Project Code: 18',
    location: '',
    category: 'Residential',
    status: 'Completed',
    duration: 'Turnkey Project',
    image: '/project-gallery/project-18.jpg',
    gallery: [
      '/project-gallery/project-18.jpg',
    ],
    description:
      'Project 18 — Grand Neo-Classical luxury residence featuring ornate European baroque stone bas-relief crests, classical turned balustrade balconies, covered vehicle porch, wrought-iron filigree boundary gates, and rooftop observation deck by Amulya Builders.',
    highlights: [
      'Intricate baroque floral bas-relief motifs sculpted on balcony fascias',
      'Classical turned stone balustrades on first-floor and penthouse terraces',
      'Integrated ground-floor car porch with classical wall sconce lighting',
      'Wrought-iron carriage entrance gates & rooftop lookout platform',
    ],
    specifications: {
      'Project Code': '18',
      'Location': '',
      'Project Cost': '',
      'Type of Building': '',
      'Plinth Area': '',
      'Face Length': '',
    },
    featured: true,
  },
  {
    id: 19,
    title: 'Radio Station Janakpur',
    location: 'Janakpur',
    category: 'Commercial',
    status: 'Completed',
    duration: '10 Months',
    year: '2083 BS',
    cost: 'Rs 1.2 Cr',
    area: '1700 sq ft',
    image: '/project-gallery/project-19.png',
    gallery: [
      '/project-gallery/project-19.png',
      '/project-gallery/project-19-front.png',
      '/project-gallery/project-19-aerial.png',
    ],
    description:
      'Radio Station Janakpur is a modern 4-storey mixed-use commercial and residential building located in Janakpur. Completed in 2083 BS within an efficient timeline of 10 Months at a total project cost of Rs 1.2 Cr, the structure spans 1700 sq ft of total built-up area on a 1000 sq ft plinth area with a 35 ft front facade. Designed with arched exposed-brick vertical accent bays, warm architectural wall sconces, planter window boxes, and ornamental balcony railings, it seamlessly integrates a ground-floor commercial showroom, two full residential apartment levels, and a dedicated top-floor broadcasting & office suite.',
    floorLayout: [
      {
        floor: 'Ground Floor',
        level: 'Level 0',
        code: 'Showroom & Parking',
        features: [
          'Spacious commercial showroom frontage',
          'Dedicated gated vehicle parking bay',
          'Main entrance lobby & staircase access'
        ]
      },
      {
        floor: 'First Floor',
        level: 'Level 1',
        code: '2B • 1K/D • 1L • 1T',
        features: [
          '2 Comfortable bedrooms (2B)',
          '1 Modern kitchen & dining area (1K/D)',
          '1 Spacious living hall (1L)',
          '1 Common bathroom / toilet (1T)'
        ]
      },
      {
        floor: 'Second Floor',
        level: 'Level 2',
        code: '2B • 1K/D • 1L • 1T',
        features: [
          '2 Private bedrooms (2B)',
          '1 Kitchen & dining space (1K/D)',
          '1 Family living room with balcony (1L)',
          '1 Bathroom / toilet facility (1T)'
        ]
      },
      {
        floor: 'Third Floor',
        level: 'Level 3',
        code: 'Office & Studio Area',
        features: [
          'Dedicated Radio Station office & studio area',
          'Executive workspace & broadcasting zone',
          'Open terrace access'
        ]
      }
    ],
    highlights: [
      '4-Storey commercial & residential building with 1700 sq ft total area & 1000 sq ft plinth area',
      '35 ft wide front elevation with arched brick accent bays & exterior wall lighting',
      'Ground Floor: Commercial showroom & gated parking bay',
      'First & Second Floors: 2B, 1K/D, 1L, 1T full residential units on each level',
      'Third Floor: Dedicated Radio Station office & studio area',
      'Earthquake-resistant RCC frame construction built to NBC standards'
    ],
    specifications: {
      'Project Code': '19',
      'Project Name': 'Radio Station Janakpur',
      'Location': 'Janakpur',
      'Project Cost': 'Rs 1.2 Cr',
      'Type of Building': 'Commercial / Mixed-Use',
      'Storeys': '4 Storeys',
      'Total Area': '1700 sq ft',
      'Plinth Area': '1000 sq ft',
      'Face Length': '35 ft',
      'Duration': '10 Months',
      'Completion Year': '2083 BS',
    },
    featured: true,
  },
  {
    id: 20,
    title: 'Nirmala Devi Residential',
    location: 'Janakpur',
    category: 'Residential',
    status: 'Completed',
    duration: '1.2 Years',
    year: '2083 BS',
    cost: 'Rs 95 Lakhs',
    area: '710 sq ft',
    image: '/project-gallery/project-20.png',
    gallery: [
      '/project-gallery/project-20.png',
      '/project-gallery/project-20-elevation.png',
      '/project-gallery/project-20-rear.png',
      '/project-gallery/project-20-view.png',
    ],
    description:
      'Nirmala Devi Residential is a smartly engineered 4.5-storey contemporary urban residence located in Janakpur. Completed in 2083 BS over a duration of 1.2 Years at a total project cost of Rs 95 Lakhs, this vertical home maximizes a compact 15 ft front facade and 495 sq ft plinth area (710 sq ft plot area) with arched balcony recesses, exposed terracotta brick panels, full-height staircase glazing, and glass balustrades.',
    floorLayout: [
      {
        floor: 'Ground Floor',
        level: 'Level 0',
        code: '1R • 1 Bathroom',
        features: [
          '1 Multi-purpose room / studio space (1R)',
          '1 Attached / common bathroom (1 Bathroom)',
          'Gated front entry & staircase lobby'
        ]
      },
      {
        floor: 'First Floor',
        level: 'Level 1',
        code: '1B • 1K/L',
        features: [
          '1 Spacious bedroom (1B)',
          '1 Open-plan kitchen & living area (1K/L)',
          'Front glass-railing balcony'
        ]
      },
      {
        floor: 'Second Floor',
        level: 'Level 2',
        code: '1B • 1K/L',
        features: [
          '1 Private bedroom (1B)',
          '1 Combined kitchen & living space (1K/L)',
          'Arched feature balcony access'
        ]
      },
      {
        floor: 'Third Floor',
        level: 'Level 3',
        code: '1B • 1K/L',
        features: [
          '1 Comfortable bedroom (1B)',
          '1 Kitchen & living lounge (1K/L)',
          'Panoramic upper balcony'
        ]
      },
      {
        floor: 'Fourth Floor (Top)',
        level: 'Level 4',
        code: '1B • Terrace',
        features: [
          '1 Top-floor bedroom (1B)',
          'Open rooftop terrace & pergola deck'
        ]
      }
    ],
    highlights: [
      '4.5-Storey narrow-frontage urban residence on a 15 ft facade & 495 sq ft plinth area',
      'Arched recessed balconies, exposed brick cladding & vertical staircase glazing',
      'Ground Floor: 1 Room & 1 Bathroom (1R 1Bathroom)',
      'First, Second & Third Floors: 1 Bedroom & 1 Kitchen/Living (1B 1K/L) on each floor',
      'Fourth Floor: 1 Bedroom (1B) with open rooftop terrace',
      'Earthquake-resistant RCC frame construction built to NBC standards'
    ],
    specifications: {
      'Project Code': '20',
      'Project Name': 'Nirmala Devi Residential',
      'Location': 'Janakpur',
      'Project Cost': 'Rs 95 Lakhs',
      'Type of Building': 'Residential',
      'Storeys': '4.5 Storeys',
      'Total Area': '710 sq ft',
      'Plinth Area': '495 sq ft',
      'Face Length': '15 ft',
      'Duration': '1.2 Years',
      'Completion Year': '2083 BS',
    },
    featured: true,
  },
  {
    id: 21,
    title: 'Mahesh Sah Residential',
    location: 'Lalitpur',
    category: 'Residential',
    status: 'Completed',
    duration: '10 Months',
    year: '2083 BS',
    cost: 'Rs 90 Lakhs',
    area: '1180 sq ft',
    image: '/project-gallery/project-21.jpg',
    gallery: [
      '/project-gallery/project-21.jpg',
    ],
    description:
      'Mahesh Sah Residential is an elegant 2.5-storey contemporary residence situated in Lalitpur. Completed in 2083 BS within a 10-month timeline at a total project cost of Rs 90 Lakhs, this home features 1180 sq ft of total area on an 850 sq ft plinth area with a 30 ft front facade. Showcasing natural travertine stone cladding, double-height arched glass fenestration, warm timber accent paneling, and recessed LED facade lighting, it delivers refined modern comfort and earthquake-resistant RCC structural safety.',
    floorLayout: [
      {
        floor: 'Ground Floor',
        level: 'Level 0',
        code: '2BHKP (2B • 1H • 1K • Parking)',
        features: [
          '2 Spacious bedrooms (2B)',
          '1 Welcoming living hall & dining area (1H)',
          '1 Modern modular kitchen (1K)',
          'Dedicated front parking space (P)'
        ]
      },
      {
        floor: 'First Floor',
        level: 'Level 1',
        code: '2BHK (2B • 1H • 1K)',
        features: [
          '2 Comfortable private bedrooms (2B)',
          '1 Family living hall with arched window & balcony (1H)',
          '1 Kitchen & dining space (1K)'
        ]
      },
      {
        floor: 'Second Floor',
        level: 'Level 2',
        code: '3B • 1 Pooja Room',
        features: [
          '3 Well-ventilated bedrooms (3B)',
          '1 Peaceful dedicated Pooja room',
          'Open rooftop terrace access'
        ]
      }
    ],
    highlights: [
      '2.5-Storey luxury residence with 1180 sq ft total area & 850 sq ft plinth area',
      '30 ft front elevation with natural stone cladding, arched glazing & timber accents',
      'Ground Floor: 2BHK with dedicated parking (2BHKP)',
      'First Floor: Complete 2BHK family apartment unit',
      'Second Floor: 3 Bedrooms & 1 dedicated Pooja room',
      'Earthquake-resistant RCC frame construction built to NBC standards'
    ],
    specifications: {
      'Project Code': '21',
      'Project Name': 'Mahesh Sah Residential',
      'Location': 'Lalitpur',
      'Project Cost': 'Rs 90 Lakhs',
      'Type of Building': 'Residential',
      'Storeys': '2.5 Storeys',
      'Total Area': '1180 sq ft',
      'Plinth Area': '850 sq ft',
      'Face Length': '30 ft',
      'Duration': '10 Months',
      'Completion Year': '2083 BS',
    },
    featured: true,
  },
  {
    id: 22,
    title: 'Arjun Adhikari Residential',
    location: 'Janakpur',
    category: 'Residential',
    status: 'Completed',
    duration: '8 Months',
    year: '2083 BS',
    cost: 'Rs 70 Lakhs',
    area: '1120 sq ft',
    image: '/project-gallery/project-22.jpg',
    gallery: [
      '/project-gallery/project-22.jpg',
    ],
    description:
      'Arjun Adhikari Residential is a modern 2-storey residential home located in Janakpur. Completed in 2083 BS within an efficient 8-month duration at a total project cost of Rs 70 Lakhs, this residence encompasses 1120 sq ft of total area on an 800 sq ft plinth area with a 14 ft front elevation. The facade features a cantilevered upper balcony with decorative CNC jali privacy screening, glass balustrades, warm wood-textured ceiling soffits, and an arched ground-floor entrance porch.',
    floorLayout: [
      {
        floor: 'Ground Floor',
        level: 'Level 0',
        code: '2B • 1K • 1L',
        features: [
          '2 Comfortable bedrooms (2B)',
          '1 Modern kitchen & dining space (1K)',
          '1 Welcoming family living hall (1L)',
          'Front entrance porch & ramp access'
        ]
      },
      {
        floor: 'First Floor',
        level: 'Level 1',
        code: '2B • 1K • 1L',
        features: [
          '2 Private bedrooms (2B)',
          '1 Kitchen & dining area (1K)',
          '1 Upper living lounge (1L)',
          'Cantilevered balcony with decorative CNC jali screen'
        ]
      }
    ],
    highlights: [
      '2-Storey modern residence with 1120 sq ft total area & 800 sq ft plinth area',
      '14 ft front elevation featuring cantilevered balcony & CNC jali screen',
      'Ground Floor: 2 Bedrooms, 1 Kitchen & 1 Living Hall (2B 1K 1L)',
      'First Floor: 2 Bedrooms, 1 Kitchen & 1 Living Hall (2B 1K 1L)',
      'Earthquake-resistant RCC frame construction built to NBC standards'
    ],
    specifications: {
      'Project Code': '22',
      'Project Name': 'Arjun Adhikari Residential',
      'Location': 'Janakpur',
      'Project Cost': 'Rs 70 Lakhs',
      'Type of Building': 'Residential',
      'Storeys': '2 Storeys',
      'Total Area': '1120 sq ft',
      'Plinth Area': '800 sq ft',
      'Face Length': '14 ft',
      'Duration': '8 Months',
      'Completion Year': '2083 BS',
    },
    featured: true,
  },
  {
    id: 23,
    title: 'Kajal Karn Commercial & Residential',
    location: 'Janakpur',
    category: 'Commercial',
    status: 'Completed',
    duration: '1.3 Years',
    year: '2083 BS',
    cost: 'Rs 2.5 Cr',
    area: '2578 sq ft',
    image: '/project-gallery/project-23.png',
    gallery: [
      '/project-gallery/project-23.png',
    ],
    description:
      'Kajal Karn Commercial & Residential is a landmark 4.5-storey mixed-use building with a full basement situated in Janakpur. Completed in 2083 BS over a duration of 1.3 Years at a project cost of Rs 2.5 Cr, this high-capacity building spans 2578 sq ft of total area on a 1275 sq ft plinth area with a 29 ft front elevation. The structure combines a dedicated basement, 5 commercial retail shutters on the ground floor, 14 master bedrooms across the first, second, and third floors, and a top-floor multi-purpose hall with toilet facility.',
    floorLayout: [
      {
        floor: 'Basement',
        level: 'Basement',
        code: 'Basement: Yes',
        features: [
          'Full underground basement level',
          'Dedicated parking & storage utility area',
          'Reinforced RCC retaining wall structure'
        ]
      },
      {
        floor: 'Ground Floor',
        level: 'Level 0',
        code: '5 Commercial Shutters',
        features: [
          '5 Commercial retail / shop shutters',
          'Wide frontage access & gated driveway entry',
          'Main lobby & staircase core'
        ]
      },
      {
        floor: 'First Floor',
        level: 'Level 1',
        code: '4 Master Bedrooms • 1 Kitchen',
        features: [
          '4 Spacious master bedrooms with attached baths',
          '1 Modern central kitchen & dining space',
          'Natural daylight multi-pane window bays'
        ]
      },
      {
        floor: 'Second Floor',
        level: 'Level 2',
        code: '5 Master Bedrooms',
        features: [
          '5 Private master bedrooms with attached baths',
          'Well-ventilated central corridor layout'
        ]
      },
      {
        floor: 'Third Floor',
        level: 'Level 3',
        code: '5 Master Bedrooms',
        features: [
          '5 Spacious master bedrooms with attached baths',
          'Bright stone-textured feature window bay'
        ]
      },
      {
        floor: 'Fourth Floor',
        level: 'Level 4',
        code: '1 Hall • 1 Toilet',
        features: [
          '1 Spacious multi-purpose hall',
          '1 Common toilet / washroom facility',
          'Open rooftop terrace deck'
        ]
      }
    ],
    highlights: [
      '4.5-Storey mixed-use building with Basement (2578 sq ft total area & 1275 sq ft plinth area)',
      'Ground Floor: 5 Commercial retail shutters with 29 ft front facade',
      'First Floor: 4 Master bedrooms & 1 Kitchen',
      'Second & Third Floors: 5 Master bedrooms on each floor (10 total)',
      'Fourth Floor: Multi-purpose hall, 1 Toilet & open rooftop terrace',
      'Earthquake-resistant RCC frame & basement retaining structure'
    ],
    specifications: {
      'Project Code': '23',
      'Project Name': 'Kajal Karn Commercial & Residential',
      'Location': 'Janakpur',
      'Project Cost': 'Rs 2.5 Cr',
      'Type of Building': 'Commercial & Residential',
      'Storeys': '4.5 Storeys',
      'Basement': 'Yes',
      'Total Area': '2578 sq ft',
      'Plinth Area': '1275 sq ft',
      'Face Length': '29 ft',
      'Duration': '1.3 Years',
      'Completion Year': '2083 BS',
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
    name: 'Er. Sujit Shah',
    designation: 'MD & CEO',
    qualification: '',
    experience: '',
    avatar: 'SS',
    color: '#1e40af',
    image: '/md-sujit-shah.jpg',
  },
  {
    id: 2,
    name: 'Er. Mukesh Adhikari',
    designation: 'Manager',
    qualification: '',
    experience: '',
    avatar: 'MA',
    color: '#cd0102',
    image: '/team/mukesh-adhikari.png',
  },
  {
    id: 3,
    name: 'Er. Amar Singh',
    designation: 'Chief Architect',
    qualification: '',
    experience: '',
    avatar: 'AS',
    color: '#1e40af',
    image: '/team/amar-singh.png',
  },
  {
    id: 4,
    name: 'Er. Rahul Kumar Purbey',
    designation: 'Site Engineer',
    qualification: '',
    experience: '',
    avatar: 'RP',
    color: '#cd0102',
    image: '/team/rahul-kumar-purbey.png',
  },
  {
    id: 5,
    name: 'Priyanka Kumari Chaudhary',
    designation: 'Assistant Architect',
    qualification: '',
    experience: '',
    avatar: 'PC',
    color: '#1e40af',
    image: '/team/priyanka-kumari-chaudhary.png',
  },
  {
    id: 6,
    name: 'Bijaya Rasaili',
    designation: 'Assistant Architect',
    qualification: '',
    experience: '',
    avatar: 'BR',
    color: '#cd0102',
    image: '/team/bijaya-rasaili.png',
  },
  {
    id: 7,
    name: 'Tanu Kumari Shah',
    designation: 'Assistant Architect',
    qualification: '',
    experience: '',
    avatar: 'TS',
    color: '#1e40af',
    image: '/team/tanu-kumari-shah.png',
  },
  {
    id: 8,
    name: 'Ajay Kumar Sah',
    designation: 'Co-ordinator',
    qualification: '',
    experience: '',
    avatar: 'AS',
    color: '#cd0102',
    image: '/team/placeholder-avatar.svg',
  },
  {
    id: 9,
    name: 'Er. Aakash Mandal',
    designation: 'Civil Engineer',
    qualification: '',
    experience: '',
    avatar: 'AM',
    color: '#1e40af',
    image: '/team/aakash-mandal.png',
  },
  {
    id: 10,
    name: 'Ritesh Shah',
    designation: 'Marketing Head',
    qualification: '',
    experience: '',
    avatar: 'RS',
    color: '#cd0102',
    image: '/team/ritesh-shah.png',
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
    color: '#cd0102',
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
    color: '#cd0102',
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
    color: '#cd0102',
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
