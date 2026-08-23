import sqlite3 from 'sqlite3';
import bcrypt from 'bcryptjs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.resolve(__dirname, 'database.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening SQLite database:', err.message);
  } else {
    console.log('Connected to SQLite database at:', dbPath);
    initDatabase();
  }
});

// Seed data from current frontend config to make initialization seamless
const seedProjects = [
  {
    title: 'Amulya Residency',
    category: 'Residential',
    status: 'Completed',
    location: 'Budhanilkantha, Kathmandu',
    duration: '14 Months',
    description: 'A luxurious 2.5-storey modern residential villa built with full earthquake-resistant RCC frame structure. Features premium stone cladding, double-glazed soundproof UPVC windows, and open rooftop terrace designed to maximize natural light and views of Kathmandu Valley.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    gallery: JSON.stringify([
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&q=80',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80'
    ]),
    highlights: JSON.stringify([
      'Complete NBC 105:2020 seismic code compliance',
      'Integrated rainwater harvesting and solar hot water systems',
      'High-grade teak wood finishes and false ceiling layout',
      'Double-glazed thermal-break windows'
    ]),
    specifications: JSON.stringify({
      'Built Area': '3,800 sq. ft.',
      'Plot Size': '0-8-2-0 Ropani',
      'Foundation': 'Strap beam with isolated footing',
      'Total Floors': '2.5 Storeys',
      'Completed Year': '2024'
    })
  },
  {
    title: 'Heritage Inn',
    category: 'Commercial',
    status: 'Completed',
    location: 'Baluwatar, Kathmandu',
    duration: '18 Months',
    description: 'A heritage-style boutique commercial building merging traditional Newari brick-and-wood facade styling (Dachi Appa and Tikajhya windows) with modern structural safety. Designed for office space and cafes.',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    gallery: JSON.stringify([
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80'
    ]),
    highlights: JSON.stringify([
      'Seismically reinforced composite brick-and-RCC columns',
      'Handmade terracotta clay roof tiling (Jhingati)',
      'Custom artisan hand-carved wood column details',
      'Fully wheelchair-accessible design (ramp and elevator)'
    ]),
    specifications: JSON.stringify({
      'Built Area': '7,200 sq. ft.',
      'Plot Size': '0-12-0-0 Ropani',
      'Structure': 'RCC Framed with composite brick masonry',
      'Floors': '3.5 Storeys',
      'Completed Year': '2025'
    })
  },
  {
    title: 'Kathmandu Heights',
    category: 'Residential',
    status: 'Ongoing',
    location: 'Baluwatar, Kathmandu',
    duration: 'Ongoing',
    description: 'An premium multi-family luxury duplex residence currently under construction in Baluwatar. Features architectural design aimed at high utility, eco-friendliness, and seismic safety.',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
    gallery: JSON.stringify([
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1200&q=80'
    ]),
    highlights: JSON.stringify([
      'Dual-family independent structures',
      'NBC 105:2020 seismic ductility design standards',
      'Private gardens and dual-car parking spaces per unit',
      'Solar energy backup setup'
    ]),
    specifications: JSON.stringify({
      'Target Built Area': '5,400 sq. ft.',
      'Plot Size': '0-10-0-0 Ropani',
      'Structure': 'High-ductility RCC Frame',
      'Floors': '2.5 Storeys per unit',
      'Est. Handover': 'December 2026'
    })
  }
];

const seedHouseStyles = [
  {
    id: 'modern-contemporary-villa',
    title: 'Modern Contemporary Villa',
    category: 'Modern',
    description: 'Sleek, minimalist residential structure with a strong focus on open spaces, natural light, and structural geometry. Designed for a urban lifestyle in Kathmandu.',
    longDescription: 'Our Modern Contemporary Villa features structural simplicity, clean lines, and an open floor plan that connects living spaces seamlessly. Large floor-to-ceiling double-glazed windows welcome natural light, while the flat-roof layout acts as a spacious rooftop terrace, perfect for gathering and enjoying views of the Kathmandu skyline. The design prioritizes structural efficiency and high-end modern materials, creating an atmosphere of sophisticated urban living.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    gallery: JSON.stringify([
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&q=80',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80'
    ]),
    features: JSON.stringify([
      'Flat roof terrace with panoramic views',
      'Floor-to-ceiling glass paneling',
      'Open-concept living and floating staircases',
      'Minimalist facades with dynamic accent lights'
    ]),
    materials: JSON.stringify(['High-Strength Concrete', 'Double-Glazed Thermal Glass', 'Steel Support Pillars', 'Composite Panels']),
    specifications: JSON.stringify({
      'Est. Build Time': '12 - 15 Months',
      'Min. Plot Area': '0-5-0-0 Ropani',
      'Floor Options': '2.5 Storeys (Customizable)',
      'Structural System': 'Reinforced RCC Frame',
      'Seismic Rating': 'Designed to exceed NBC Zone V'
    }),
    price: 'Rs 24,950.00'
  },
  {
    id: 'traditional-neo-vernacular',
    title: 'Traditional Neo-Vernacular',
    category: 'Traditional',
    description: 'Incorporates traditional Nepalese architectural heritage—such as carved wooden frames, terracotta tile slopes, and exposed brick facades—seamlessly blended with modern RCC foundations.',
    longDescription: 'The Traditional Neo-Vernacular style is a homage to the rich architectural legacy of Newari culture. We integrate exposed terracotta brickwork (Dachi Appa) and hand-carved wooden doors and window grids with a modern, earthquake-resistant RCC frame foundation. The interior remains bright, spacious, and open, while the exterior displays the iconic sloping tiled roofs and aesthetic wooden columns that preserve Nepal\'s historical charm.',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    gallery: JSON.stringify([
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&q=80',
      'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=1200&q=80',
      'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1200&q=80'
    ]),
    features: JSON.stringify([
      'Sloping roofs with traditional clay tiles (Jhingati)',
      'Hand-carved wooden windows and columns',
      'Exposed brick masonry work (Dachi Appa)',
      'Aesthetic traditional courtyards (Chowk)'
    ]),
    materials: JSON.stringify(['Terracotta Clay Tiles', 'Carved Sal Wood', 'Dachi Appa Bricks', 'RCC Framework (for earthquake safety)']),
    specifications: JSON.stringify({
      'Est. Build Time': '14 - 18 Months',
      'Min. Plot Area': '0-6-0-0 Ropani',
      'Floor Options': '2 to 3 Storeys',
      'Structural System': 'RCC Frame + Load-Bearing Brick Veneer',
      'Seismic Rating': 'Seismic Resistant Core Structure'
    }),
    price: 'Rs 28,500.00'
  },
  {
    id: 'classical-colonial-mansion',
    title: 'Classical Colonial Mansion',
    category: 'Classical',
    description: 'Brings classic European symmetry and elegance to life. Perfect for large residential properties, featuring grand columns, arched entryways, and sophisticated mouldings.',
    longDescription: 'Inspired by neoclassical European estates and traditional Rana palaces, the Classical Colonial Mansion offers grand architectural proportions. Symmetrical columns flank the arched entrance, leading into high-ceiling lobbies with detailed plaster cornices. Designed for spacious suburban properties, it incorporates double-height entrance spaces, classic stone balustrades, and white stucco finishes.',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
    gallery: JSON.stringify([
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1200&q=80',
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&q=80',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1200&q=80'
    ]),
    features: JSON.stringify([
      'Symmetric facades and neoclassical pillars',
      'Arched windows and grand entryways',
      'Decorative wall cornices and ceiling panels',
      'Large open balconies and classic balustrades'
    ]),
    materials: JSON.stringify(['Ornamental Plaster Moulds', 'White Marble Flooring', 'Structured Columns', 'High-Grade Paint']),
    specifications: JSON.stringify({
      'Est. Build Time': '16 - 20 Months',
      'Min. Plot Area': '0-8-0-0 Ropani',
      'Floor Options': '2 to 3 Storeys',
      'Structural System': 'Massive Concrete Framing',
      'Seismic Rating': 'Designed to exceed NBC Zone V'
    }),
    price: 'Rs 32,750.00'
  }
];

const seedTeam = [
  {
    name: 'Er. Rajesh Bhattarai',
    designation: 'Chief Executive Officer & Managing Director',
    qualification: 'B.E. Civil Engineering',
    experience: '20+ years',
    avatar: 'CE',
    color: '#1e40af'
  },
  {
    name: 'Ar. Prabha Sharma',
    designation: 'Chief Architect & Design Director',
    qualification: 'B.Arch, SONA Member',
    experience: '15+ years',
    avatar: 'AD',
    color: '#f97316'
  },
  {
    name: 'Er. Amit Gurung',
    designation: 'Head of Structural Engineering',
    qualification: 'M.E. Structural Engineering',
    experience: '12+ years',
    avatar: 'SE',
    color: '#1e40af'
  },
  {
    name: 'Pradeep Khadka',
    designation: 'Project Manager',
    qualification: 'B.E. Civil Engineering, PMP Certified',
    experience: '10+ years',
    avatar: 'PM',
    color: '#f97316'
  }
];

const seedServices = [
  {
    id: 'residential-construction',
    title: 'Home & Residential Building',
    shortDesc: 'Crafting bespoke homes, modern duplexes, and premium residential spaces engineered for safety and comfort.',
    fullDesc: 'We specialize in building elegant, earthquake-resistant homes across Kathmandu. Adhering to the Nepal National Building Code, our team handles structural safety, architectural details, and high-quality finishes.',
    icon: 'Home',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    features: JSON.stringify(['NBC Certified', 'Seismic Resistant', 'Architectural Detailing', 'Premium Finishes'])
  },
  {
    id: 'commercial-construction',
    title: 'Commercial Construction',
    shortDesc: 'Designing and building high-performance commercial facilities, office plazas, hotels, and retail complexes.',
    fullDesc: 'We offer full-service commercial design and construction for corporate offices, shopping plazas, and hospitality developments in Kathmandu. We ensure efficient execution, safety compliance, and modern architectural standards.',
    icon: 'Building2',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
    features: JSON.stringify(['Large-Scale Operations', 'Integrated MEP Systems', 'On-Time Completion', 'Modern Engineering'])
  },
  {
    id: 'building-design-planning',
    title: 'Architectural & Structural Design',
    shortDesc: 'Custom structural drawings, functional layouts, 3D visualization, and building permit planning.',
    fullDesc: 'Our engineering department delivers comprehensive structural designs, 3D renders, site layouts, and building permit documents required for Kathmandu Metropolitan City approvals.',
    icon: 'PenTool',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80',
    features: JSON.stringify(['3D Visual Rendering', 'Seismic Design Analysis', 'Permit Documentation', 'Detailed Floor Plans'])
  },
  {
    id: 'renovation-remodeling',
    title: 'Remodeling & Retrofitting',
    shortDesc: 'Transforming existing spaces through structural upgrades, modern designs, and high-quality renovations.',
    fullDesc: 'Give your old home, commercial storefront, or office layout a complete face-lift. From interior remodeling to structural retrofitting, we deliver quality upgrades that enhance value and safety.',
    icon: 'Wrench',
    image: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=800&q=80',
    features: JSON.stringify(['Turnkey Renovation', 'Façade Upgrades', 'Interior Redesign', 'Structural Reinforcement'])
  },
  {
    id: 'structural-construction',
    title: 'Structural Works & Concrete Framing',
    shortDesc: 'High-strength RCC structures, specialized foundations, retaining walls, and civil engineering.',
    fullDesc: 'We construct durable foundation frameworks, high-strength RCC structures, and retaining systems. Managed by licensed civil engineers, our works are tailored to the unique geological conditions of Kathmandu.',
    icon: 'Columns',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
    features: JSON.stringify(['High-Strength RCC', 'Soil-Specific Foundations', 'Seismic Retrofitting', 'Retaining Walls'])
  },
  {
    id: 'interior-exterior-works',
    title: 'Interior & Exterior Finishes',
    shortDesc: 'Completing spaces with expert tiling, marble installation, gypsum ceilings, custom paint, and cladding.',
    fullDesc: 'Bring your spaces to life with premium finishing solutions. We supply and install high-quality flooring, modular kitchens, custom gypsum ceilings, outdoor wall cladding, and professional landscaping.',
    icon: 'Layers',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80',
    features: JSON.stringify(['Imported Marble & Tiles', 'Modular Kitchen Designs', 'Gypsum Ceilings', 'Outdoor Cladding'])
  },
  {
    id: 'construction-consultancy',
    title: 'Engineering Consultancy',
    shortDesc: 'Project feasibility reviews, structural audits, cost estimation, and regulatory compliance guidance.',
    fullDesc: 'We provide expert project reports (DPR), cost advisory, independent building audits, and regulatory checks to ensure compliance with Nepal building codes and municipal guidelines.',
    icon: 'ClipboardList',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
    features: JSON.stringify(['DPR Preparation', 'Detailed Costing (BOQ)', 'Independent Site Audits', 'Compliance Advisory'])
  },
  {
    id: 'project-management',
    title: 'Construction Project Management',
    shortDesc: 'Professional end-to-end supervision, scheduling, quality control, and vendor management.',
    fullDesc: 'From site clearing to project handover, we handle procurement, subcontractor scheduling, strict quality checks, and budget compliance, ensuring a stress-free construction experience.',
    icon: 'BarChart2',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80',
    features: JSON.stringify(['Milestone Tracking', 'Budget Management', 'Material Quality Checks', 'Zero-Harm Safety Site'])
  }
];

const seedBlogs = [
  {
    id: 'safe-construction-guide-earthquake-resistant-building-nepal',
    title: 'Safe Construction: Guide to Earthquake-Resistant Building in Nepal',
    summary: 'Essential structural steps, guidelines, and compliance rules according to the Nepal National Building Code (NBC) for building safe homes in Kathmandu.',
    content: 'Building a home in Nepal, especially in the seismically active Kathmandu Valley, requires strict adherence to earthquake-resistant construction techniques. The Nepal National Building Code (NBC 105:2020) provides modern parameters to ensure safety.\n\n### 1. Site Selection & Soil Investigation\nBefore laying a brick, it is critical to understand the load-bearing capacity of your soil. Soft clay, loose sandy soils, or sloped hillsides require deep foundations, raft footings, or retaining structural systems to prevent liquefaction or structural failures during seismic events.\n\n### 2. Ductile Detailing of RCC Frames\nReinforced Cement Concrete (RCC) frame buildings must use high-ductility reinforcement detailing. This involves using high-grade steel (Fe500 or Fe500D) with close stirrup spacing near beam-column joints, ensuring the columns are stronger than the beams so that they can sway without collapsing.\n\n### 3. Symmetrical Design & Regular Layouts\nSymmetrical layouts distribute earthquake forces evenly. Complex shapes like L-shapes, T-shapes, or highly irregular floor plans suffer from torsional (twisting) forces. If irregular designs are desired, seismic expansion joints must be installed to separate different sections of the structure.',
    image: 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?w=800&q=80'
  },
  {
    id: 'cost-estimation-house-construction-kathmandu-2026',
    title: 'Cost Estimation: How Much Does it Cost to Build a House in Kathmandu (2026)?',
    summary: 'A detailed breakdown of materials, municipal permits, labor fees, and standard vs premium packages for home construction inside Kathmandu valley.',
    content: 'Building a house is a lifetime investment. In 2026, the construction market in Kathmandu has seen adjustments in material prices and municipal regulations. Here is an honest cost breakdown to help you budget.\n\n### 1. Approximate Base Rates (Per Square Foot)\n- **Basic Construction**: रू 5,500 - रू 6,500 per sq. ft.\n- **Premium Construction**: रू 8,000 - रू 9,000 per sq. ft.\n- **Luxury Finish Package**: रू 11,000+ per sq. ft.\n\n### 2. Breakdown of Costs\n- **Civil Structure (Gray Structure)**: Accounts for 50-60% of the total budget. This includes cement, rebars, sand, aggregates, bricks, and concrete casting.\n- **Finishing & Interiors**: Accounts for 25-30% of the budget. Covers tiling, marble, sanitaryware, doors, windows, paint, and false ceilings.\n- **MEP (Mechanical, Electrical, Plumbing)**: Represents 10-15%. Covers wiring, switches, water tanks, piping, and sewer lines.\n- **Permits & Design Fees**: Roughly 5% of the total cost covers municipal approvals, structural engineering designs, and architectural floor planning.\n\n### 3. Tips to Prevent Cost Overruns\n- Freeze your architectural floor plan before start: Changes mid-construction are extremely expensive.\n- Hire certified civil engineers to manage procurement, reducing material wastage.',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80'
  },
  {
    id: 'modern-vs-traditional-nepalese-architecture',
    title: 'Modern vs Traditional Architecture: Designing Your Dream Home',
    summary: 'Comparing modern contemporary design aesthetics with traditional neo-vernacular Nepalese styling for residential homes.',
    content: 'Kathmandu is a beautiful tapestry of historical heritage and rapid modernization. When building a home, a common dilemma is choosing between sleek modern contemporary aesthetics and traditional vernacular styling.\n\n### 1. Modern Contemporary Style\n- **Aesthetic**: Minimalist lines, flat rooftops, double-height ceiling entries, and large floor-to-ceiling double-glazed windows.\n- **Materials**: Industrial steel beams, reinforced concrete, composite wall panels, and glass frames.\n- **Pros**: Maximum natural light, efficient space planning, low facade maintenance, and open rooftop terrace utility.\n\n### 2. Neo-Vernacular Traditional Style\n- **Aesthetic**: Sloping tiled roofs (using Jhingati tiles), exposed red terracotta brick facades (Dachi Appa), and hand-carved wooden columns or window grids.\n- **Materials**: Terracotta, sal wood, brick masonry, and structural concrete cores for seismic safety.\n- **Pros**: Rich cultural aesthetic, thermally efficient bricks, high curb value, and a timeless heritage presence.\n\n### 3. The Hybrid Approach: Neo-Traditional\nMany modern homeowners in Nepal choose a hybrid design: using standard RCC framing, modern kitchen layouts, and large windows, but wrapping the exterior facade with traditional Newari brickwork and placing carved wooden accents around balconies and entryways. This offers the best of safety, comfort, and culture.',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80'
  }
];

const seedCalculatorConfig = {
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

function initDatabase() {
  db.serialize(() => {
    // 1. Create Users Table
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL
    )`);

    // 2. Create Projects Table
    db.run(`CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      status TEXT NOT NULL,
      location TEXT NOT NULL,
      duration TEXT NOT NULL,
      description TEXT NOT NULL,
      highlights TEXT NOT NULL,
      specifications TEXT NOT NULL,
      image TEXT NOT NULL,
      gallery TEXT NOT NULL
    )`);

    // 3. Create House Styles Table
    db.run(`CREATE TABLE IF NOT EXISTS house_styles (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      description TEXT NOT NULL,
      longDescription TEXT NOT NULL,
      image TEXT NOT NULL,
      gallery TEXT NOT NULL,
      features TEXT NOT NULL,
      materials TEXT NOT NULL,
      specifications TEXT NOT NULL,
      price TEXT,
      floor_plan_image TEXT
    )`);

    // Migrate existing table to include price column if it was created in previous sessions
    db.run("ALTER TABLE house_styles ADD COLUMN price TEXT", (err) => {
      // Ignore error if column already exists
    });

    // Migrate existing table to include floor_plan_image column if it was created in previous sessions
    db.run("ALTER TABLE house_styles ADD COLUMN floor_plan_image TEXT", (err) => {
      // Ignore error if column already exists
    });

    // Create Hero Slides Table
    db.run(`CREATE TABLE IF NOT EXISTS hero_slides (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      image TEXT NOT NULL
    )`);

    // Create Testimonials Table
    db.run(`CREATE TABLE IF NOT EXISTS testimonials (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      rating INTEGER DEFAULT 5,
      text TEXT NOT NULL,
      avatar TEXT NOT NULL,
      name TEXT NOT NULL,
      designation TEXT NOT NULL,
      location TEXT NOT NULL
    )`);

    // 4. Create Team Table
    db.run(`CREATE TABLE IF NOT EXISTS team (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      designation TEXT NOT NULL,
      qualification TEXT NOT NULL,
      experience TEXT NOT NULL,
      avatar TEXT NOT NULL,
      color TEXT NOT NULL
    )`);

    // 5. Create Calculator Config Table
    db.run(`CREATE TABLE IF NOT EXISTS calculator_config (
      id INTEGER PRIMARY KEY,
      config_json TEXT NOT NULL
    )`);

    // 6. Create Leads (Inquiries) Table
    db.run(`CREATE TABLE IF NOT EXISTS leads (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT,
      message TEXT NOT NULL,
      parameters TEXT
    )`);

    // 7. Create Services Table
    db.run(`CREATE TABLE IF NOT EXISTS services (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      shortDesc TEXT NOT NULL,
      fullDesc TEXT NOT NULL,
      icon TEXT NOT NULL,
      image TEXT NOT NULL,
      features TEXT NOT NULL
    )`);

    // 8. Create Blogs Table
    db.run(`CREATE TABLE IF NOT EXISTS blogs (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      summary TEXT NOT NULL,
      content TEXT NOT NULL,
      image TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Seeding Default Admin Account
    db.get("SELECT COUNT(*) as count FROM users", (err, row) => {
      if (err) return console.error('Users table count error:', err);
      if (row.count === 0) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync('adminpassword', salt);
        db.run("INSERT INTO users (username, password_hash) VALUES (?, ?)", ['admin', hash], (e) => {
          if (e) console.error('Admin seeding error:', e);
          else console.log('Successfully seeded default admin account (user: admin, pass: adminpassword)');
        });
      }
    });

    // Seeding Projects Table
    db.get("SELECT COUNT(*) as count FROM projects", (err, row) => {
      if (row && row.count === 0) {
        const stmt = db.prepare(`INSERT INTO projects (title, category, status, location, duration, description, highlights, specifications, image, gallery)
                                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
        seedProjects.forEach(p => {
          stmt.run(p.title, p.category, p.status, p.location, p.duration, p.description, p.highlights, p.specifications, p.image, p.gallery);
        });
        stmt.finalize();
        console.log('Successfully seeded projects database');
      }
    });

    // Seeding House Styles Table
    db.get("SELECT COUNT(*) as count FROM house_styles", (err, row) => {
      if (row && row.count === 0) {
        const stmt = db.prepare(`INSERT INTO house_styles (id, title, category, description, longDescription, image, gallery, features, materials, specifications, price)
                                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
        seedHouseStyles.forEach(s => {
          stmt.run(s.id, s.title, s.category, s.description, s.longDescription, s.image, s.gallery, s.features, s.materials, s.specifications, s.price || 'Rs 27,950.00');
        });
        stmt.finalize();
        console.log('Successfully seeded house styles database');
      }
    });

    // Seeding Hero Slides Table
    db.get("SELECT COUNT(*) as count FROM hero_slides", (err, row) => {
      if (row && row.count === 0) {
        const stmt = db.prepare(`INSERT INTO hero_slides (image) VALUES (?)`);
        const defaultSlides = [
          'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=85',
          'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920&q=85',
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=85'
        ];
        defaultSlides.forEach(slide => {
          stmt.run(slide);
        });
        stmt.finalize();
        console.log('Successfully seeded default hero slides');
      }
    });

    // Seeding Testimonials Table
    db.get("SELECT COUNT(*) as count FROM testimonials", (err, row) => {
      if (row && row.count === 0) {
        const stmt = db.prepare(`INSERT INTO testimonials (rating, text, avatar, name, designation, location)
                                VALUES (?, ?, ?, ?, ?, ?)`);
        const defaultTestimonials = [
          {
            rating: 5,
            text: "Amulya Builders built our custom home exactly how we envisioned it. The team was highly professional, honest with costs, and kept the project on track. The structural quality is outstanding. I highly recommend them to anyone building in Kathmandu.",
            avatar: "KA",
            name: "Kiran Adhikari",
            designation: "Homeowner",
            location: "Lakeside, Kathmandu"
          },
          {
            rating: 5,
            text: "We partnered with Amulya Builders for our office complex. They handled the design, permit approval, and full construction with absolute professionalism. The building was delivered on budget and looks incredible.",
            avatar: "MS",
            name: "Maya Sherpa",
            designation: "Managing Director",
            location: "ABC Holdings Pvt. Ltd., Kathmandu"
          },
          {
            rating: 5,
            text: "Designing a hillside resort comes with challenges, but the engineers at Amulya Builders made the process seamless. The finished resort is beautiful and structurally superior.",
            avatar: "DT",
            name: "Deepak Thapa",
            designation: "Hotel Owner",
            location: "Sarangkot Road, Kathmandu"
          },
          {
            rating: 5,
            text: "From consultation to handover, their communication was flawless. The construction quality is exceptional, and they only used certified materials. Highly recommended!",
            avatar: "SR",
            name: "Dr. Sandeep Regmi",
            designation: "Homeowner",
            location: "Baidam, Kathmandu"
          },
          {
            rating: 5,
            text: "They managed our school expansion with great care. The structure is built to modern safety codes, giving parents and staff absolute peace of mind. A job well done.",
            avatar: "HB",
            name: "Hari Bahadur KC",
            designation: "School Principal",
            location: "Lekhnath, Kathmandu"
          }
        ];
        defaultTestimonials.forEach(t => {
          stmt.run(t.rating, t.text, t.avatar, t.name, t.designation, t.location);
        });
        stmt.finalize();
        console.log('Successfully seeded testimonials');
      }
    });

    // Seeding Team Table
    db.get("SELECT COUNT(*) as count FROM team", (err, row) => {
      if (row && row.count === 0) {
        const stmt = db.prepare(`INSERT INTO team (name, designation, qualification, experience, avatar, color)
                                VALUES (?, ?, ?, ?, ?, ?)`);
        seedTeam.forEach(t => {
          stmt.run(t.name, t.designation, t.qualification, t.experience, t.avatar, t.color);
        });
        stmt.finalize();
        console.log('Successfully seeded team database');
      }
    });

    // Seeding Calculator Config Table
    db.get("SELECT COUNT(*) as count FROM calculator_config", (err, row) => {
      if (row && row.count === 0) {
        db.run("INSERT INTO calculator_config (id, config_json) VALUES (1, ?)", [JSON.stringify(seedCalculatorConfig)], (e) => {
          if (e) console.error('Calculator config seeding error:', e);
          else console.log('Successfully seeded calculator configurations');
        });
      }
    });

    // Seeding Services Table
    db.get("SELECT COUNT(*) as count FROM services", (err, row) => {
      if (row && row.count === 0) {
        const stmt = db.prepare(`INSERT INTO services (id, title, shortDesc, fullDesc, icon, image, features)
                                VALUES (?, ?, ?, ?, ?, ?, ?)`);
        seedServices.forEach(s => {
          stmt.run(s.id, s.title, s.shortDesc, s.fullDesc, s.icon, s.image, s.features);
        });
        stmt.finalize();
        console.log('Successfully seeded services database');
      }
    });

    // Seeding Blogs Table
    db.get("SELECT COUNT(*) as count FROM blogs", (err, row) => {
      if (row && row.count === 0) {
        const stmt = db.prepare(`INSERT INTO blogs (id, title, summary, content, image)
                                VALUES (?, ?, ?, ?, ?)`);
        seedBlogs.forEach(b => {
          stmt.run(b.id, b.title, b.summary, b.content, b.image);
        });
        stmt.finalize();
        console.log('Successfully seeded blogs database');
      }
    });
  });
}

export default db;
