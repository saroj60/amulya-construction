import 'dotenv/config';
import sqlite3 from 'sqlite3';
import mysql from 'mysql2';
import bcrypt from 'bcryptjs';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.resolve(__dirname, 'database.sqlite');

const useMySQL = Boolean(process.env.DB_HOST && process.env.DB_NAME && process.env.DB_USER);

let db;

if (useMySQL) {
  const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD || process.env.DB_PASS || '',
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    multipleStatements: true,
    charset: 'utf8mb4',
  });

  console.log(`Connected to Hostinger MySQL database (${process.env.DB_NAME}@${process.env.DB_HOST})`);

  // Auto-initialize MySQL schema & seed data from database.sql if tables don't exist yet
  pool.query("SHOW TABLES LIKE 'projects'", (err, results) => {
    if (!err && Array.isArray(results) && results.length === 0) {
      const sqlFile = path.resolve(__dirname, '../public/api/database.sql');
      if (fs.existsSync(sqlFile)) {
        const sql = fs.readFileSync(sqlFile, 'utf8');
        pool.query(sql, (initErr) => {
          if (initErr) console.error('MySQL auto-init error:', initErr.message);
          else console.log('Initialized Hostinger MySQL tables & seed data from database.sql');
        });
      }
    }
  });

  // Provide sqlite3-compatible API (.get, .all, .run, .prepare, .serialize) backed by MySQL pool
  db = {
    serialize(fn) {
      if (fn) fn();
    },
    get(sql, params, cb) {
      if (typeof params === 'function') {
        cb = params;
        params = [];
      }
      pool.query(sql, params || [], (err, rows) => {
        if (cb) cb(err, rows && rows[0] ? rows[0] : undefined);
      });
    },
    all(sql, params, cb) {
      if (typeof params === 'function') {
        cb = params;
        params = [];
      }
      pool.query(sql, params || [], (err, rows) => {
        if (cb) cb(err, rows || []);
      });
    },
    run(sql, params, cb) {
      if (typeof params === 'function') {
        cb = params;
        params = [];
      }
      pool.query(sql, params || [], (err, result) => {
        if (cb) {
          cb.call(
            {
              lastID: result ? result.insertId : undefined,
              changes: result ? result.affectedRows : 0,
            },
            err
          );
        }
      });
    },
    prepare(sql) {
      return {
        run(...args) {
          let cb = null;
          if (typeof args[args.length - 1] === 'function') {
            cb = args.pop();
          }
          const params = Array.isArray(args[0]) ? args[0] : args;
          db.run(sql, params, cb);
        },
        finalize() {},
      };
    },
  };
} else {
  db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error('Error opening SQLite database:', err.message);
    } else {
      console.log('Connected to SQLite database at:', dbPath);
      initDatabase();
    }
  });
}

// Seed data from current frontend config to make initialization seamless
const seedProjects = [
  {
    id: 1,
    title: 'Project Code: 1',
    location: '',
    category: 'Residential',
    status: 'Completed',
    duration: 'Turnkey Project',
    image: '/project-gallery/project-1.jpg',
    gallery: JSON.stringify(['/project-gallery/project-1.jpg']),
    description: 'Project 1 — Modern multi-storey residential architecture and construction by Amulya Builders.',
    floorLayout: JSON.stringify([]),
    highlights: JSON.stringify([
      'Earthquake-resistant RCC structure',
      'Modern brick-and-render facade',
      'Integrated parking and open balconies',
      'NBC 105:2020 code compliance',
    ]),
    specifications: JSON.stringify({
      'Project Code': '1',
      'Location': '',
      'Project Cost': '',
      'Type of Building': '',
      'Plinth Area': '',
      'Face Length': '',
    }),
  },
  {
    id: 2,
    title: 'Project Code: 2',
    location: '',
    category: 'Residential',
    status: 'Completed',
    duration: 'Turnkey Project',
    image: '/project-gallery/project-2.jpg',
    gallery: JSON.stringify([
      '/project-gallery/project-2.jpg',
      '/project-gallery/project-2-garden.jpg',
    ]),
    description: 'Project 2 — Modern luxury residential villa with curved panoramic terraces, landscaping, and turnkey construction by Amulya Builders.',
    floorLayout: JSON.stringify([]),
    highlights: JSON.stringify([
      'Curved panoramic terrace & glass balustrades',
      'Artisan exposed brick circular bay window',
      'Integrated spiral rooftop access and landscaped lawn',
      'NBC earthquake-resistant RCC construction',
    ]),
    specifications: JSON.stringify({
      'Project Code': '2',
      'Location': '',
      'Project Cost': '',
      'Type of Building': '',
      'Plinth Area': '',
      'Face Length': '',
    }),
  },
  {
    id: 3,
    title: 'Project Code: 3',
    location: '',
    category: 'Residential',
    status: 'Completed',
    duration: 'Turnkey Project',
    image: '/project-gallery/project-3.jpg',
    gallery: JSON.stringify(['/project-gallery/project-3.jpg']),
    description: 'Project 3 — Modern outdoor living, pergola patio, barbecue station, and landscaped garden design & construction by Amulya Builders.',
    floorLayout: JSON.stringify([]),
    highlights: JSON.stringify([
      'Timber pergola & outdoor barbecue kitchen',
      'Landscaped lawn with garden swing and water feature',
      'Custom stone paved outdoor dining patio',
      'Modern security fencing and integrated exterior lighting',
    ]),
    specifications: JSON.stringify({
      'Project Code': '3',
      'Location': '',
      'Project Cost': '',
      'Type of Building': '',
      'Plinth Area': '',
      'Face Length': '',
    }),
  },
  {
    id: 4,
    title: 'Project Code: 4',
    location: '',
    category: 'Residential',
    status: 'Completed',
    duration: 'Turnkey Project',
    image: '/project-gallery/project-4.jpg',
    gallery: JSON.stringify(['/project-gallery/project-4.jpg']),
    description: 'Project 4 — Contemporary 4-storey residential home blending modern RCC structure with traditional tiled balcony cornices, brick column accents, and rooftop pergolas by Amulya Builders.',
    floorLayout: JSON.stringify([]),
    highlights: JSON.stringify([
      '4-Storey RCC earthquake-resistant frame',
      'Covered vehicle porch and dedicated 2-wheeler parking',
      'Exposed brick feature pillar with exterior warm illumination',
      'Upper floor rooftop pergola and spiral deck staircase',
    ]),
    specifications: JSON.stringify({
      'Project Code': '4',
      'Location': '',
      'Project Cost': '',
      'Type of Building': '',
      'Plinth Area': '',
      'Face Length': '',
    }),
  },
  {
    id: 6,
    title: 'Jay Kishor Mahato Residential',
    location: 'Chitwan',
    category: 'Residential',
    status: 'Completed',
    duration: '11 Months',
    image: '/project-gallery/project-6.jpg',
    gallery: JSON.stringify(['/project-gallery/project-6.jpg']),
    description: 'Jay Kishor Mahato Residential is a beautifully designed 2.5-storey modern residential home located in Chitwan. Completed in 2083 BS within a fast-track duration of 11 Months at a total project cost of Rs 1 Cr 10 Lakhs, this residence sits on a generous 1300 sq ft plinth area with an impressive 42 ft front facade and 1690 sq ft of total built-up area. Engineered with an earthquake-resistant RCC frame, the property blends functional family living spaces with landscaped outdoor courtyards, spacious balconies, and a signature rooftop pergola.',
    floorLayout: JSON.stringify([
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
    ]),
    highlights: JSON.stringify([
      '2.5-Storey residence with 1690 sq ft total built-up area & 1300 sq ft plinth area',
      'Grand 42 ft wide front elevation with integrated parking & landscaped yard',
      'Ground Floor: 2 Bedrooms, 1 Kitchen, 1 Living Hall & 1 Toilet (2B 1K 1L 1T)',
      'First Floor: 2 Bedrooms, 1 Living Lounge & 1 Washroom/Toilet (2B 1L 1W/T)',
      'Second Floor: 1 Bedroom, 1 Family Space & 1 Rooftop Pergola (1B 1FS 1 Pergola)',
      'Earthquake-resistant RCC construction with NBC compliance'
    ]),
    specifications: JSON.stringify({
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
    }),
  },
  {
    id: 7,
    title: 'Dr. Sakil Residential',
    location: 'Janakpur',
    category: 'Residential',
    status: 'Completed',
    duration: '1 Year 6 Months',
    image: '/project-gallery/project-7.jpg',
    gallery: JSON.stringify([
      '/project-gallery/project-7.jpg',
      '/project-gallery/project-7-aerial.jpg',
    ]),
    description: 'Dr. Sakil Residential is a grand 3.5-storey neo-classical luxury residence situated in Janakpur. Completed in 2083 BS over a duration of 1 Year 6 Months at a project cost of Rs 1.5 Cr, this landmark home spans 1966 sq ft of total built-up area on a 1200 sq ft plinth area with a 30 ft front elevation. The design features a monumental central arched glass atrium, dual covered parking bays, classical balustrade balconies, and an open rooftop pergola terrace engineered with NBC-compliant earthquake-resistant RCC construction.',
    floorLayout: JSON.stringify([]),
    highlights: JSON.stringify([
      '3.5-Storey luxury residence with 1966 sq ft total area & 1200 sq ft plinth area',
      'Monumental exposed brick central arched glass atrium & 30 ft front facade',
      'Dual independent covered parking bays with ornamental gates',
      'Upper rooftop fitness pergola with spiral observation stairs',
      'Neo-classical ornamental balustrades and mouldings',
      'Earthquake-resistant RCC frame construction'
    ]),
    specifications: JSON.stringify({
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
    }),
  },
  {
    id: 10,
    title: 'Project Code: 10',
    location: '',
    category: 'Commercial',
    status: 'Completed',
    duration: 'Turnkey Project',
    image: '/project-gallery/project-10.jpg',
    gallery: JSON.stringify(['/project-gallery/project-10.jpg']),
    description: 'Project 10 — Hilltop spiritual pilgrimage complex featuring monumental golden Lord Shiva statue, Shivalinga pedestals, stupa, dressed stone fortress retaining walls, and landscaped rhododendron gardens by Amulya Builders.',
    floorLayout: JSON.stringify([]),
    highlights: JSON.stringify([
      'Monumental hilltop golden Shiva deity installation',
      'Surrounding traditional Shivalinga shrines and stupa integration',
      'Engineered stone fortress retaining walls and stepped grand access',
      'Laligurans flower gardens and scenic panoramic landscaping',
    ]),
    specifications: JSON.stringify({
      'Project Code': '10',
      'Location': '',
      'Project Cost': '',
      'Type of Building': '',
      'Plinth Area': '',
      'Face Length': '',
    }),
  },
  {
    id: 11,
    title: 'Project Code: 11',
    location: 'Budhanilkantha, Kathmandu',
    category: 'Residential',
    status: 'Completed',
    duration: '1 Year 8 Months',
    image: '/project-gallery/project-11.jpg',
    gallery: JSON.stringify(['/project-gallery/project-11.jpg']),
    description: 'Project Code: 11 is an exquisite 2.5-storey modern residential villa situated in the serene and scenic surroundings of Budhanilkantha, Kathmandu. Successfully completed in 2023 with a total project cost of Rs 1 Cr 20 Lakhs over an efficient timeline of 1 Year 8 Months, this home is built with high-ductility earthquake-resistant RCC structural engineering, contemporary C-curve cantilevered balconies, and an artisan exposed-brick vertical accent pillar.',
    floorLayout: JSON.stringify([
      {
        floor: 'Ground Floor',
        level: 'Level 0',
        features: [
          'Spacious living hall with attached bathroom',
          'Dedicated family dining area',
          'Contemporary modular kitchen'
        ]
      },
      {
        floor: 'First Floor',
        level: 'Level 1',
        features: [
          '3 Master bedrooms',
          'Private attached bathrooms in every bedroom',
          'Ventilated balcony access'
        ]
      },
      {
        floor: 'Second Floor',
        level: 'Level 2',
        features: [
          '1 Comfortable bedroom',
          'Dedicated laundry area',
          'Peaceful puja room',
          'Open rooftop terrace access'
        ]
      }
    ]),
    highlights: JSON.stringify([
      '3 Master bedrooms with attached bathrooms on 1st floor',
      'Ground floor hall with attached bath, dining & modular kitchen',
      '2nd floor bedroom, dedicated laundry area & puja room',
      'Contemporary C-frame cantilevered balcony & brick accent pillar',
      'Open rooftop recreational terrace with scenic views',
      'Earthquake-resistant RCC ductile frame structure'
    ]),
    specifications: JSON.stringify({
      'Project Code': '11',
      'Location': 'Budhanilkantha, Kathmandu',
      'Project Cost': 'Rs 1 Cr 20 Lakhs',
      'Type of Building': 'Residential',
      'Plinth Area': '1100 sq ft',
      'Face Length': '26 ft',
      'Duration': '1 Year 8 Months',
      'Completion Year': '2023',
    }),
  },
  {
    id: 12,
    title: 'Project Code: 12',
    location: '',
    category: 'Residential',
    status: 'Completed',
    duration: 'Turnkey Project',
    image: '/project-gallery/project-12.jpg',
    gallery: JSON.stringify([
      '/project-gallery/project-12.jpg',
      '/project-gallery/project-12-front.jpg',
      '/project-gallery/project-12-rear.jpg',
    ]),
    description: 'Project 12 — Grand 3.5-storey neo-classical palatial residence featuring monumental Corinthian fluted columns, ornate pediment over central arched atrium, cascading green planters, and multi-sided balustrade balconies by Amulya Builders.',
    floorLayout: JSON.stringify([]),
    highlights: JSON.stringify([
      'Monumental Corinthian colonnade with ornate pediment cartouche',
      'Central full-height arched bay atrium and double car parking',
      'Cascading planter balconies and rooftop pergola lounge',
      'Complete rear and side multi-angle architectural elevations',
    ]),
    specifications: JSON.stringify({
      'Project Code': '12',
      'Location': '',
      'Project Cost': '',
      'Type of Building': '',
      'Plinth Area': '',
      'Face Length': '',
    }),
  },
  {
    id: 13,
    title: 'Project Code: 13',
    location: '',
    category: 'Residential',
    status: 'Completed',
    duration: 'Turnkey Project',
    image: '/project-gallery/project-13.jpg',
    gallery: JSON.stringify([
      '/project-gallery/project-13.jpg',
      '/project-gallery/project-13-aerial.jpg',
    ]),
    description: 'Project 13 — Elegant 2-storey cottage villa blending modern RCC engineering with classic Nepalese red sloping tile roofs, gabled portico entrance, spacious parking yard, and secured compound perimeter by Amulya Builders.',
    floorLayout: JSON.stringify([]),
    highlights: JSON.stringify([
      'Multi-tiered sloping red clay tile roofs with dormer gables',
      'Colonnaded portico entrance and open balcony',
      'Spacious paved parking court for multiple vehicles',
      'Earthquake-resistant RCC ductile frame engineering',
    ]),
    specifications: JSON.stringify({
      'Project Code': '13',
      'Location': '',
      'Project Cost': '',
      'Type of Building': '',
      'Plinth Area': '',
      'Face Length': '',
    }),
  },
  {
    id: 14,
    title: 'Project Code: 14',
    location: '',
    category: 'Commercial',
    status: 'Completed',
    duration: 'Turnkey Project',
    image: '/project-gallery/project-14.jpg',
    gallery: JSON.stringify([
      '/project-gallery/project-14.jpg',
      '/project-gallery/project-14-corner.jpg',
      '/project-gallery/project-14-front.jpg',
    ]),
    description: 'Project 14 — Contemporary 3.5-storey mixed-use commercial & residential building featuring ground-floor retail shopfronts with rolling shutters, premium residential apartments above, stone-clad accent facade, and cascading planter rooftop terrace by Amulya Builders.',
    floorLayout: JSON.stringify([]),
    highlights: JSON.stringify([
      'Ground-floor commercial retail shutters with independent stairwell',
      'Upper-floor spacious residential apartments with glass balustrades',
      'Textured stone cladding and contemporary dark composite paneling',
      'Rooftop green planter cornice and steel canopy pergola',
    ]),
    specifications: JSON.stringify({
      'Project Code': '14',
      'Location': '',
      'Project Cost': '',
      'Type of Building': '',
      'Plinth Area': '',
      'Face Length': '',
    }),
  },
  {
    id: 15,
    title: 'Project Code: 15',
    location: '',
    category: 'Residential',
    status: 'Completed',
    duration: 'Turnkey Project',
    image: '/project-gallery/project-15.jpg',
    gallery: JSON.stringify(['/project-gallery/project-15.jpg']),
    description: 'Project 15 — Distinctive 3-storey European Mediterranean luxury villa featuring arched arcade verandas, hip slate roof, rooftop terrace pergola lounge, palm landscaping, and gated compound parking by Amulya Builders.',
    floorLayout: JSON.stringify([]),
    highlights: JSON.stringify([
      'Grand double-storey arched arcade portico & balcony',
      'Charcoal slate pitched hip roof with architectural eaves',
      'Spacious top rooftop observation terrace with garden pergola',
      'Earthquake-resistant RCC ductile frame engineering',
    ]),
    specifications: JSON.stringify({
      'Project Code': '15',
      'Location': '',
      'Project Cost': '',
      'Type of Building': '',
      'Plinth Area': '',
      'Face Length': '',
    }),
  },
  {
    id: 17,
    title: 'Project Code: 17',
    location: '',
    category: 'Residential',
    status: 'Completed',
    duration: 'Turnkey Project',
    image: '/project-gallery/project-17.jpg',
    gallery: JSON.stringify(['/project-gallery/project-17.jpg']),
    description: 'Project 17 — Contemporary 4-storey residential building featuring Nepali traditional roof eave cornices, brick-and-render dual-tone facade, gated compound wall with covered entrance, multiple vehicle parking, and landscaped garden perimeter by Amulya Builders.',
    floorLayout: JSON.stringify([]),
    highlights: JSON.stringify([
      '4-Storey earthquake-resilient RCC frame engineered to NBC codes',
      'Neo-vernacular red-tiled overhang canopies and clay brick accent bands',
      'Private gated compound with dedicated multi-car paved parking',
      'Landscaped boundary perimeter with decorative pillar fencing',
    ]),
    specifications: JSON.stringify({
      'Project Code': '17',
      'Location': '',
      'Project Cost': '',
      'Type of Building': '',
      'Plinth Area': '',
      'Face Length': '',
    }),
  },
  {
    id: 18,
    title: 'Project Code: 18',
    location: '',
    category: 'Residential',
    status: 'Completed',
    duration: 'Turnkey Project',
    image: '/project-gallery/project-18.jpg',
    gallery: JSON.stringify(['/project-gallery/project-18.jpg']),
    description: 'Project 18 — Grand Neo-Classical luxury residence featuring ornate European baroque stone bas-relief crests, classical turned balustrade balconies, covered vehicle porch, wrought-iron filigree boundary gates, and rooftop observation deck by Amulya Builders.',
    floorLayout: JSON.stringify([]),
    highlights: JSON.stringify([
      'Intricate baroque floral bas-relief motifs sculpted on balcony fascias',
      'Classical turned stone balustrades on first-floor and penthouse terraces',
      'Integrated ground-floor car porch with classical wall sconce lighting',
      'Wrought-iron carriage entrance gates & rooftop lookout platform',
    ]),
    specifications: JSON.stringify({
      'Project Code': '18',
      'Location': '',
      'Project Cost': '',
      'Type of Building': '',
      'Plinth Area': '',
      'Face Length': '',
    }),
  },
  {
    id: 19,
    title: 'Radio Station Janakpur',
    location: 'Janakpur',
    category: 'Commercial',
    status: 'Completed',
    duration: '10 Months',
    image: '/project-gallery/project-19.png',
    gallery: JSON.stringify([
      '/project-gallery/project-19.png',
      '/project-gallery/project-19-front.png',
      '/project-gallery/project-19-aerial.png',
    ]),
    description: 'Radio Station Janakpur is a modern 4-storey mixed-use commercial and residential building located in Janakpur. Completed in 2083 BS within an efficient timeline of 10 Months at a total project cost of Rs 1.2 Cr, the structure spans 1700 sq ft of total built-up area on a 1000 sq ft plinth area with a 35 ft front facade. Designed with arched exposed-brick vertical accent bays, warm architectural wall sconces, planter window boxes, and ornamental balcony railings, it seamlessly integrates a ground-floor commercial showroom, two full residential apartment levels, and a dedicated top-floor broadcasting & office suite.',
    floorLayout: JSON.stringify([
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
    ]),
    highlights: JSON.stringify([
      '4-Storey commercial & residential building with 1700 sq ft total area & 1000 sq ft plinth area',
      '35 ft wide front elevation with arched brick accent bays & exterior wall lighting',
      'Ground Floor: Commercial showroom & gated parking bay',
      'First & Second Floors: 2B, 1K/D, 1L, 1T full residential units on each level',
      'Third Floor: Dedicated Radio Station office & studio area',
      'Earthquake-resistant RCC frame construction built to NBC standards'
    ]),
    specifications: JSON.stringify({
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
    }),
  },
  {
    id: 20,
    title: 'Nirmala Devi Residential',
    location: 'Janakpur',
    category: 'Residential',
    status: 'Completed',
    duration: '1.2 Years',
    image: '/project-gallery/project-20.png',
    gallery: JSON.stringify([
      '/project-gallery/project-20.png',
      '/project-gallery/project-20-elevation.png',
      '/project-gallery/project-20-rear.png',
      '/project-gallery/project-20-view.png',
    ]),
    description: 'Nirmala Devi Residential is a smartly engineered 4.5-storey contemporary urban residence located in Janakpur. Completed in 2083 BS over a duration of 1.2 Years at a total project cost of Rs 95 Lakhs, this vertical home maximizes a compact 15 ft front facade and 495 sq ft plinth area (710 sq ft plot area) with arched balcony recesses, exposed terracotta brick panels, full-height staircase glazing, and glass balustrades.',
    floorLayout: JSON.stringify([
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
    ]),
    highlights: JSON.stringify([
      '4.5-Storey narrow-frontage urban residence on a 15 ft facade & 495 sq ft plinth area',
      'Arched recessed balconies, exposed brick cladding & vertical staircase glazing',
      'Ground Floor: 1 Room & 1 Bathroom (1R 1Bathroom)',
      'First, Second & Third Floors: 1 Bedroom & 1 Kitchen/Living (1B 1K/L) on each floor',
      'Fourth Floor: 1 Bedroom (1B) with open rooftop terrace',
      'Earthquake-resistant RCC frame construction built to NBC standards'
    ]),
    specifications: JSON.stringify({
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
    }),
  },
  {
    id: 21,
    title: 'Mahesh Sah Residential',
    location: 'Lalitpur',
    category: 'Residential',
    status: 'Completed',
    duration: '10 Months',
    image: '/project-gallery/project-21.jpg',
    gallery: JSON.stringify(['/project-gallery/project-21.jpg']),
    description: 'Mahesh Sah Residential is an elegant 2.5-storey contemporary residence situated in Lalitpur. Completed in 2083 BS within a 10-month timeline at a total project cost of Rs 90 Lakhs, this home features 1180 sq ft of total area on an 850 sq ft plinth area with a 30 ft front facade. Showcasing natural travertine stone cladding, double-height arched glass fenestration, warm timber accent paneling, and recessed LED facade lighting, it delivers refined modern comfort and earthquake-resistant RCC structural safety.',
    floorLayout: JSON.stringify([
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
    ]),
    highlights: JSON.stringify([
      '2.5-Storey luxury residence with 1180 sq ft total area & 850 sq ft plinth area',
      '30 ft front elevation with natural stone cladding, arched glazing & timber accents',
      'Ground Floor: 2BHK with dedicated parking (2BHKP)',
      'First Floor: Complete 2BHK family apartment unit',
      'Second Floor: 3 Bedrooms & 1 dedicated Pooja room',
      'Earthquake-resistant RCC frame construction built to NBC standards'
    ]),
    specifications: JSON.stringify({
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
    }),
  },
  {
    id: 22,
    title: 'Arjun Adhikari Residential',
    location: 'Janakpur',
    category: 'Residential',
    status: 'Completed',
    duration: '8 Months',
    image: '/project-gallery/project-22.jpg',
    gallery: JSON.stringify(['/project-gallery/project-22.jpg']),
    description: 'Arjun Adhikari Residential is a modern 2-storey residential home located in Janakpur. Completed in 2083 BS within an efficient 8-month duration at a total project cost of Rs 70 Lakhs, this residence encompasses 1120 sq ft of total area on an 800 sq ft plinth area with a 14 ft front elevation. The facade features a cantilevered upper balcony with decorative CNC jali privacy screening, glass balustrades, warm wood-textured ceiling soffits, and an arched ground-floor entrance porch.',
    floorLayout: JSON.stringify([
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
    ]),
    highlights: JSON.stringify([
      '2-Storey modern residence with 1120 sq ft total area & 800 sq ft plinth area',
      '14 ft front elevation featuring cantilevered balcony & CNC jali screen',
      'Ground Floor: 2 Bedrooms, 1 Kitchen & 1 Living Hall (2B 1K 1L)',
      'First Floor: 2 Bedrooms, 1 Kitchen & 1 Living Hall (2B 1K 1L)',
      'Earthquake-resistant RCC frame construction built to NBC standards'
    ]),
    specifications: JSON.stringify({
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
    }),
  },
  {
    id: 23,
    title: 'Kajal Karn Commercial & Residential',
    location: 'Janakpur',
    category: 'Commercial',
    status: 'Completed',
    duration: '1.3 Years',
    image: '/project-gallery/project-23.png',
    gallery: JSON.stringify(['/project-gallery/project-23.png']),
    description: 'Kajal Karn Commercial & Residential is a landmark 4.5-storey mixed-use building with a full basement situated in Janakpur. Completed in 2083 BS over a duration of 1.3 Years at a project cost of Rs 2.5 Cr, this high-capacity building spans 2578 sq ft of total area on a 1275 sq ft plinth area with a 29 ft front elevation. The structure combines a dedicated basement, 5 commercial retail shutters on the ground floor, 14 master bedrooms across the first, second, and third floors, and a top-floor multi-purpose hall with toilet facility.',
    floorLayout: JSON.stringify([
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
    ]),
    highlights: JSON.stringify([
      '4.5-Storey mixed-use building with Basement (2578 sq ft total area & 1275 sq ft plinth area)',
      'Ground Floor: 5 Commercial retail shutters with 29 ft front facade',
      'First Floor: 4 Master bedrooms & 1 Kitchen',
      'Second & Third Floors: 5 Master bedrooms on each floor (10 total)',
      'Fourth Floor: Multi-purpose hall, 1 Toilet & open rooftop terrace',
      'Earthquake-resistant RCC frame & basement retaining structure'
    ]),
    specifications: JSON.stringify({
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
    }),
  },
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
  },
  {
    id: 'scandinavian-minimalist-home',
    title: 'Scandinavian Minimalist Home',
    category: 'Minimalist',
    description: 'Clean lines, functional beauty, and light-filled spaces inspired by Nordic architecture, optimized for compact urban plots in Kathmandu.',
    longDescription: 'The Scandinavian Minimalist Home blends simplicity, functional ergonomics, and an intimate connection to natural light. Designed to maximize spaciousness on compact Kathmandu urban lots, this residence features vertical timber battens, clean off-white surfaces, and floor-to-ceiling double-glazed windows. The interior includes an open-plan kitchen and living space, custom built-in architectural joinery, and a lush rooftop terrace for organic gardening.',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80',
    gallery: JSON.stringify([
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1200&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=80'
    ]),
    features: JSON.stringify([
      'Maximizes natural daylight on tight urban plots',
      'Concealed storage and built-in architectural joinery',
      'Nordic acoustic wood-slat feature walls',
      'Rooftop organic kitchen garden and entertaining deck'
    ]),
    materials: JSON.stringify([
      'Sustainably Treated Timber',
      'Double-Glazed Low-E Glass',
      'Polished Microcement Screed',
      'Earthquake Ductile RCC Frame'
    ]),
    specifications: JSON.stringify({
      'Est. Build Time': '10 - 12 Months',
      'Min. Plot Area': '0-3-2-0 Ropani (3.5 Aana)',
      'Floor Options': '2.5 to 3 Storeys',
      'Structural System': 'Engineered Ductile RCC Frame',
      'Thermal Rating': 'High Efficiency Thermal Envelope'
    }),
    price: 'Rs 22,500.00',
    floor_plan_image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80'
  },
  {
    id: 'industrial-loft-residence',
    title: 'Industrial Loft Residence',
    category: 'Modern',
    description: 'Bold urban aesthetic featuring exposed structural steel, polished concrete, soaring ceilings, and factory-style black metal grid glass facades.',
    longDescription: 'Inspired by metropolitan warehouse loft living, this design features voluminous open spaces with soaring 12-foot ceilings, exposed structural I-beams, distressed brick feature walls, and black matte metal framed glazing. Ideal for creative professionals and modern families desiring a unique, edgy, and spacious sanctuary in Kathmandu with flexible work-live zones.',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80',
    gallery: JSON.stringify([
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
      'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=1200&q=80'
    ]),
    features: JSON.stringify([
      'Soaring 12-foot ceilings with exposed steel beams',
      'Black powder-coated industrial metal window mullions',
      'Custom floating open-tread steel staircase',
      'Integrated mezzanine creative studio and library'
    ]),
    materials: JSON.stringify([
      'Structural Steel (ISMB/ISMC Sections)',
      'Polished Concrete Screed Flooring',
      'Exposed Wirecut Red Brick',
      'Thermal-Break Aluminum Glazing'
    ]),
    specifications: JSON.stringify({
      'Est. Build Time': '12 - 14 Months',
      'Min. Plot Area': '0-4-0-0 Ropani (4 Aana)',
      'Floor Options': '2.5 Storeys with Mezzanine',
      'Structural System': 'Composite Steel-RCC Hybrid Structure',
      'Seismic Compliance': 'NBC 105:2020 Ductility Certified'
    }),
    price: 'Rs 26,000.00',
    floor_plan_image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1200&q=80'
  },
  {
    id: 'himalayan-rustic-stone-villa',
    title: 'Himalayan Rustic Stone Villa',
    category: 'Traditional',
    description: 'Crafted from hand-chiseled local stone, heavy timber beams, and slate roofs, echoing the timeless mountain sanctuaries of the Himalayas.',
    longDescription: 'The Himalayan Rustic Stone Villa celebrates the elemental permanence and thermal mass of hand-dressed local mountain stone. Designed especially for ridge lines, suburban retreats, or sloping lots in Nagarkot, Dhulikhel, or Budhanilkantha, this home combines thick stone masonry exterior walls with a seismically certified internal reinforced concrete core. Deep covered verandas and wood-burning stone fireplaces bring warmth and timeless mountain hospitality.',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80',
    gallery: JSON.stringify([
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&q=80',
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80'
    ]),
    features: JSON.stringify([
      'Natural mountain stone fireplace centerpiece',
      'Hand-dressed ashlar stone masonry veneer',
      'Deep wraparound covered viewing verandas',
      'Exposed rough-sawn timber ceiling trusses'
    ]),
    materials: JSON.stringify([
      'Locally Hand-Chiseled Mountain Stone',
      'Naturally Treated Sal Wood Timber',
      'Handmade Slate Roof Tiles',
      'Earthquake Reinforced RCC Core'
    ]),
    specifications: JSON.stringify({
      'Est. Build Time': '15 - 18 Months',
      'Min. Plot Area': '0-8-0-0 Ropani',
      'Floor Options': '2 Storeys',
      'Structural System': 'Reinforced RCC Core + Stone Masonry',
      'Thermal Efficiency': 'High Thermal Mass Stone Walls'
    }),
    price: 'Rs 31,000.00',
    floor_plan_image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80'
  },
  {
    id: 'eco-smart-sustainable-residence',
    title: 'Eco-Smart Sustainable Residence',
    category: 'Modern',
    description: 'Net-zero oriented architectural design with integrated solar pergolas, rainwater harvesting, passive solar orientation, and smart energy monitoring.',
    longDescription: 'Designed for the environmentally conscious homeowner, the Eco-Smart Residence combines contemporary architecture with cutting-edge green building principles. The home is oriented to maximize winter solar heat gain while providing summer shading. It includes a 5kW rooftop solar PV pergola, 10,000-liter underground rainwater storage, greywater recycling for gardens, and aerated autoclave concrete (AAC) blocks for superior thermal insulation.',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
    gallery: JSON.stringify([
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80'
    ]),
    features: JSON.stringify([
      'Integrated 5kW solar pergola canopy',
      '10,000L underground rainwater harvesting reservoir',
      'Smart IoT energy and water consumption dashboard',
      'High-performance AAC lightweight insulating blocks'
    ]),
    materials: JSON.stringify([
      'Autoclaved Aerated Concrete (AAC)',
      'Recycled Composite Decking',
      'Low-VOC Organic Paints',
      'Seismic RCC Framework'
    ]),
    specifications: JSON.stringify({
      'Est. Build Time': '11 - 13 Months',
      'Min. Plot Area': '0-5-0-0 Ropani',
      'Floor Options': '2.5 Storeys',
      'Structural System': 'Ductile RCC + AAC Block Infill',
      'Sustainability Rating': 'Green Building NBC Compliant'
    }),
    price: 'Rs 29,500.00',
    floor_plan_image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80'
  }
];

const seedTeam = [
  {
    name: 'Er. Sujit Shah',
    designation: 'MD & CEO',
    qualification: '',
    experience: '',
    avatar: 'SS',
    color: '#1e40af',
    image: '/md-sujit-shah.jpg'
  },
  {
    name: 'Er. Mukesh Adhikari',
    designation: 'Manager',
    qualification: '',
    experience: '',
    avatar: 'MA',
    color: '#cd0102',
    image: '/team/mukesh-adhikari.png'
  },
  {
    name: 'Er. Amar Singh',
    designation: 'Chief Architect',
    qualification: '',
    experience: '',
    avatar: 'AS',
    color: '#1e40af',
    image: '/team/amar-singh.png'
  },
  {
    name: 'Er. Rahul Kumar Purbey',
    designation: 'Site Engineer',
    qualification: '',
    experience: '',
    avatar: 'RP',
    color: '#cd0102',
    image: '/team/rahul-kumar-purbey.png'
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
      floorLayout TEXT DEFAULT '[]',
      image TEXT NOT NULL,
      gallery TEXT NOT NULL
    )`);

    // Migrate existing projects table to include floorLayout column if missing
    db.run("ALTER TABLE projects ADD COLUMN floorLayout TEXT DEFAULT '[]'", () => {});

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
    db.run("ALTER TABLE house_styles ADD COLUMN price TEXT", () => {});

    // Migrate existing table to include floor_plan_image column if it was created in previous sessions
    db.run("ALTER TABLE house_styles ADD COLUMN floor_plan_image TEXT", () => {});

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
      color TEXT NOT NULL,
      image TEXT DEFAULT ''
    )`);

    // Migrate existing team table to include image column if missing
    db.run("ALTER TABLE team ADD COLUMN image TEXT DEFAULT ''", () => {});

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
      if (row && row.count === 0 && seedProjects.length > 0) {
        const stmt = db.prepare(`INSERT INTO projects (id, title, category, status, location, duration, description, highlights, specifications, floorLayout, image, gallery)
                                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
        seedProjects.forEach(p => {
          stmt.run(p.id, p.title, p.category, p.status, p.location, p.duration, p.description, p.highlights, p.specifications, p.floorLayout || '[]', p.image, p.gallery);
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
          '/project-gallery/project-1.jpg',
          '/project-gallery/project-2.jpg',
          '/project-gallery/project-4.jpg',
          '/project-gallery/project-7.jpg',
          '/project-gallery/project-10.jpg',
          '/project-gallery/project-12.jpg',
          '/project-gallery/project-14.jpg',
          '/project-gallery/project-16.jpg',
          '/project-gallery/project-17.jpg',
          '/project-gallery/project-18.jpg'
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
        const stmt = db.prepare(`INSERT INTO team (name, designation, qualification, experience, avatar, color, image)
                                VALUES (?, ?, ?, ?, ?, ?, ?)`);
        seedTeam.forEach(t => {
          stmt.run(t.name, t.designation, t.qualification, t.experience, t.avatar, t.color, t.image || '');
        });
        stmt.finalize();
        console.log('Successfully seeded team database');
      } else {
        db.run("UPDATE team SET image = '/md-sujit-shah.jpg' WHERE id = 1 AND (image IS NULL OR image = '')");
        db.run("UPDATE team SET image = '/team/mukesh-adhikari.png' WHERE id = 2 AND (image IS NULL OR image = '')");
        db.run("UPDATE team SET image = '/team/amar-singh.png' WHERE id = 3 AND (image IS NULL OR image = '')");
        db.run("UPDATE team SET image = '/team/rahul-kumar-purbey.png' WHERE id = 4 AND (image IS NULL OR image = '')");
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
