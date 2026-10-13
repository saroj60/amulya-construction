import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

async function generateCompanyProfilePdf() {
  const doc = await PDFDocument.create();
  
  // Embed Fonts
  const fontRegular = await doc.embedFont(StandardFonts.Helvetica);
  const fontBold = await doc.embedFont(StandardFonts.HelveticaBold);
  const fontItalic = await doc.embedFont(StandardFonts.HelveticaOblique);

  // Brand Colors
  const navy = rgb(1/255, 35/255, 82/255);        // #012352
  const deepNavy = rgb(2/255, 23/255, 56/255);    // #021738
  const orange = rgb(249/255, 115/255, 22/255);   // #f97316
  const crimson = rgb(205/255, 1/255, 2/255);     // #cd0102
  const dark = rgb(15/255, 23/255, 42/255);       // #0f172a
  const slateDark = rgb(51/255, 65/255, 85/255);  // #334155
  const slateMuted = rgb(100/255, 116/255, 139/255); // #64748b
  const bgLight = rgb(248/255, 250/255, 252/255); // #f8fafc
  const cardBorder = rgb(226/255, 232/255, 240/255);
  const white = rgb(1, 1, 1);

  // Dimensions (A4)
  const W = 595.28;
  const H = 841.89;

  // Try loading company logo
  let logoImage = null;
  const logoPath = path.join(rootDir, 'public', 'amulyalogo1.png');
  if (fs.existsSync(logoPath)) {
    try {
      const logoBytes = fs.readFileSync(logoPath);
      logoImage = await doc.embedPng(logoBytes);
    } catch (e) {
      console.warn('Could not embed logo image, using text fallback:', e.message);
    }
  }

  // Helper for footer on internal pages
  const drawPageFooter = (page, pageNum, totalPages) => {
    page.drawLine({
      start: { x: 40, y: 40 },
      end: { x: W - 40, y: 40 },
      thickness: 1,
      color: cardBorder,
    });
    page.drawText('Amulya Builders Pvt. Ltd. | Official Corporate Profile', {
      x: 40,
      y: 28,
      size: 8,
      font: fontRegular,
      color: slateMuted,
    });
    page.drawText(`Page ${pageNum} of ${totalPages}`, {
      x: W - 90,
      y: 28,
      size: 8,
      font: fontRegular,
      color: slateMuted,
    });
  };

  // Helper for header on internal pages
  const drawPageHeader = (page, title, subtitle) => {
    // Header background bar
    page.drawRectangle({
      x: 0,
      y: H - 75,
      width: W,
      height: 75,
      color: navy,
    });
    // Orange accent stripe
    page.drawRectangle({
      x: 0,
      y: H - 78,
      width: W,
      height: 3,
      color: orange,
    });

    if (logoImage) {
      const dims = logoImage.scale(0.045);
      page.drawImage(logoImage, {
        x: 40,
        y: H - 62,
        width: dims.width,
        height: dims.height,
      });
    }

    const titleX = logoImage ? 140 : 40;
    page.drawText(title.toUpperCase(), {
      x: titleX,
      y: H - 42,
      size: 16,
      font: fontBold,
      color: white,
    });
    if (subtitle) {
      page.drawText(subtitle, {
        x: titleX,
        y: H - 58,
        size: 9,
        font: fontRegular,
        color: rgb(203/255, 213/255, 225/255),
      });
    }
  };

  // -------------------------------------------------------------
  // PAGE 1: COVER PAGE
  // -------------------------------------------------------------
  const page1 = doc.addPage([W, H]);

  // Deep Navy Background
  page1.drawRectangle({
    x: 0,
    y: 0,
    width: W,
    height: H,
    color: deepNavy,
  });

  // Top Geometric Accent Bands
  page1.drawRectangle({
    x: 0,
    y: H - 18,
    width: W,
    height: 18,
    color: crimson,
  });
  page1.drawRectangle({
    x: 0,
    y: H - 24,
    width: W,
    height: 6,
    color: orange,
  });

  // Central Card / Frame
  page1.drawRectangle({
    x: 35,
    y: 110,
    width: W - 70,
    height: H - 160,
    color: navy,
    borderColor: rgb(30/255, 58/255, 110/255),
    borderWidth: 1.5,
  });

  // Logo / Emblem
  if (logoImage) {
    const logoDims = logoImage.scale(0.12);
    page1.drawImage(logoImage, {
      x: (W - logoDims.width) / 2,
      y: H - 220,
      width: logoDims.width,
      height: logoDims.height,
    });
  }

  // Company Name
  const compName = 'AMULYA BUILDERS';
  const compNameW = fontBold.widthOfTextAtSize(compName, 32);
  page1.drawText(compName, {
    x: (W - compNameW) / 2,
    y: H - 275,
    size: 32,
    font: fontBold,
    color: white,
  });

  // Tagline
  const tagline = 'Constructing Integrity • Elevating Standards';
  const taglineW = fontBold.widthOfTextAtSize(tagline, 13);
  page1.drawText(tagline, {
    x: (W - taglineW) / 2,
    y: H - 302,
    size: 13,
    font: fontBold,
    color: orange,
  });

  // Divider Line
  page1.drawLine({
    start: { x: 120, y: H - 325 },
    end: { x: W - 120, y: H - 325 },
    thickness: 1,
    color: rgb(59/255, 130/255, 246/255),
  });

  // Document Title
  const docTitle = 'OFFICIAL COMPANY PROFILE';
  const docTitleW = fontBold.widthOfTextAtSize(docTitle, 20);
  page1.drawText(docTitle, {
    x: (W - docTitleW) / 2,
    y: H - 365,
    size: 20,
    font: fontBold,
    color: white,
  });

  const docSub = 'Architectural Design • 3D Modeling • Turnkey Engineering & Construction';
  const docSubW = fontRegular.widthOfTextAtSize(docSub, 10.5);
  page1.drawText(docSub, {
    x: (W - docSubW) / 2,
    y: H - 388,
    size: 10.5,
    font: fontRegular,
    color: rgb(226/255, 232/255, 240/255),
  });

  // Scope Badge
  const scopeBadge = "Serving Inside & Outside Kathmandu Valley Across Nepal";
  const scopeBadgeW = fontBold.widthOfTextAtSize(scopeBadge, 11);
  page1.drawRectangle({
    x: (W - scopeBadgeW - 30) / 2,
    y: H - 435,
    width: scopeBadgeW + 30,
    height: 26,
    color: rgb(15/255, 30/255, 65/255),
    borderColor: orange,
    borderWidth: 1,
  });
  page1.drawText(scopeBadge, {
    x: (W - scopeBadgeW) / 2,
    y: H - 425,
    size: 11,
    font: fontBold,
    color: orange,
  });

  // Highlights 4-box grid
  const keyHighlights = [
    { num: '15+ Years', lbl: 'Industry Excellence' },
    { num: '250+ Projects', lbl: 'Delivered Successfully' },
    { num: 'NBC Compliant', lbl: 'Seismic Safety Standards' },
    { num: 'Turnkey Services', lbl: 'From Soil to Finishing' },
  ];

  keyHighlights.forEach((item, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const boxX = 65 + col * 240;
    const boxY = H - 510 - row * 60;
    page1.drawRectangle({
      x: boxX,
      y: boxY,
      width: 225,
      height: 48,
      color: rgb(10/255, 25/255, 55/255),
      borderColor: rgb(30/255, 58/255, 110/255),
      borderWidth: 1,
    });
    page1.drawText(item.num, {
      x: boxX + 16,
      y: boxY + 28,
      size: 12,
      font: fontBold,
      color: orange,
    });
    page1.drawText(item.lbl, {
      x: boxX + 16,
      y: boxY + 12,
      size: 9,
      font: fontRegular,
      color: rgb(203/255, 213/255, 225/255),
    });
  });

  // Contact Footer inside Card
  page1.drawRectangle({
    x: 65,
    y: 130,
    width: W - 130,
    height: 85,
    color: rgb(8/255, 20/255, 45/255),
    borderColor: rgb(30/255, 58/255, 100/255),
    borderWidth: 1,
  });

  page1.drawText('HEAD OFFICE & CONTACT INFORMATION', {
    x: 80,
    y: 195,
    size: 9,
    font: fontBold,
    color: orange,
  });

  page1.drawText('Address: Sabaila-8, Dhanusha | Branch: Tikathali, Lalitpur (opp. Pawan Prakriti School)', {
    x: 80,
    y: 178,
    size: 8.5,
    font: fontRegular,
    color: white,
  });

  page1.drawText('Phone: +977 15925062 / +977 9810357535 | Email: abt4nepal@gmail.com', {
    x: 80,
    y: 162,
    size: 8.5,
    font: fontRegular,
    color: white,
  });

  page1.drawText('Website: https://amulyabuilders.com.np | VAT / PAN: 619774758', {
    x: 80,
    y: 146,
    size: 8.5,
    font: fontRegular,
    color: rgb(203/255, 213/255, 225/255),
  });

  // Bottom Footer Bar
  page1.drawRectangle({
    x: 0,
    y: 0,
    width: W,
    height: 35,
    color: rgb(5/255, 15/255, 35/255),
  });
  const copyTxt = '© Amulya Builders Pvt. Ltd. • All Rights Reserved';
  const copyW = fontRegular.widthOfTextAtSize(copyTxt, 8.5);
  page1.drawText(copyTxt, {
    x: (W - copyW) / 2,
    y: 12,
    size: 8.5,
    font: fontRegular,
    color: slateMuted,
  });

  // -------------------------------------------------------------
  // PAGE 2: CORPORATE OVERVIEW, VISION & WHY CHOOSE US
  // -------------------------------------------------------------
  const page2 = doc.addPage([W, H]);
  drawPageHeader(page2, 'Company Overview & Vision', 'Engineering Trust, Architectural Elegance & Structural Resilience');

  let yPos = H - 110;

  // Section 1: Executive Summary Box
  page2.drawRectangle({
    x: 40,
    y: yPos - 95,
    width: W - 80,
    height: 95,
    color: bgLight,
    borderColor: cardBorder,
    borderWidth: 1,
  });
  page2.drawRectangle({
    x: 40,
    y: yPos - 95,
    width: 4,
    height: 95,
    color: navy,
  });

  page2.drawText('EXECUTIVE SUMMARY', {
    x: 55,
    y: yPos - 20,
    size: 11,
    font: fontBold,
    color: navy,
  });

  const execLines = [
    'Amulya Builders Pvt. Ltd. is one of Nepal\'s premier design and construction firms, founded in 2009.',
    'Headquartered in Dhanusha with a full-fledged technical branch in Tikathali, Lalitpur, we provide',
    'end-to-end turnkey solutions spanning architectural design, structural engineering, 3D visualization,',
    'municipal approval documentation, and superior civil construction across Nepal with seismic resilience.'
  ];
  execLines.forEach((line, i) => {
    page2.drawText(line, {
      x: 55,
      y: yPos - 38 - (i * 14),
      size: 9.5,
      font: fontRegular,
      color: slateDark,
    });
  });

  yPos -= 125;

  // Section 2: Vision & Mission (2 Cards)
  page2.drawRectangle({
    x: 40,
    y: yPos - 95,
    width: 250,
    height: 95,
    color: white,
    borderColor: cardBorder,
    borderWidth: 1,
  });
  page2.drawRectangle({
    x: 40,
    y: yPos - 22,
    width: 250,
    height: 22,
    color: navy,
  });
  page2.drawText('OUR VISION', {
    x: 50,
    y: yPos - 15,
    size: 10,
    font: fontBold,
    color: white,
  });
  const visionLines = [
    'To be recognized across Nepal as the benchmark',
    'of engineering integrity, architectural innovation,',
    'and enduring construction that enriches communities',
    'and safeguards lives through earthquake engineering.'
  ];
  visionLines.forEach((line, i) => {
    page2.drawText(line, {
      x: 50,
      y: yPos - 38 - (i * 13),
      size: 8.5,
      font: fontRegular,
      color: slateDark,
    });
  });

  // Mission
  page2.drawRectangle({
    x: 305,
    y: yPos - 95,
    width: 250,
    height: 95,
    color: white,
    borderColor: cardBorder,
    borderWidth: 1,
  });
  page2.drawRectangle({
    x: 305,
    y: yPos - 22,
    width: 250,
    height: 22,
    color: orange,
  });
  page2.drawText('OUR MISSION', {
    x: 315,
    y: yPos - 15,
    size: 10,
    font: fontBold,
    color: white,
  });
  const missionLines = [
    'To deliver uncompromising construction quality,',
    'transparent cost management, and timely project',
    'delivery with certified materials, licensed engineers,',
    'and personalized customer collaboration from day one.'
  ];
  missionLines.forEach((line, i) => {
    page2.drawText(line, {
      x: 315,
      y: yPos - 38 - (i * 13),
      size: 8.5,
      font: fontRegular,
      color: slateDark,
    });
  });

  yPos -= 125;

  // Section 3: Core Corporate Values
  page2.drawText('CORE VALUES & ETHICAL STANDARDS', {
    x: 40,
    y: yPos,
    size: 12,
    font: fontBold,
    color: navy,
  });
  page2.drawLine({
    start: { x: 40, y: yPos - 6 },
    end: { x: 260, y: yPos - 6 },
    thickness: 2,
    color: orange,
  });

  yPos -= 25;

  const coreValues = [
    { title: '1. Engineering Integrity', desc: 'No shortcuts on rebar, cement grade, or foundation depth. Every member strictly follows structural drawings.' },
    { title: '2. Total Transparency', desc: 'Detailed, unhidden Bill of Quantities (BOQ). No surprise charges or inflated rate variations.' },
    { title: '3. NBC Code Compliance', desc: 'Strict compliance with Nepal National Building Code NBC 105:2020 for seismic resistance in Zone V.' },
    { title: '4. Punctual Delivery', desc: 'Organized Gantt schedules, experienced site supervisors, and guaranteed on-time project handovers.' },
  ];

  coreValues.forEach((val, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const vx = 40 + col * 265;
    const vy = yPos - row * 55;
    page2.drawRectangle({
      x: vx,
      y: vy - 45,
      width: 250,
      height: 45,
      color: bgLight,
      borderColor: cardBorder,
      borderWidth: 1,
    });
    page2.drawText(val.title, {
      x: vx + 10,
      y: vy - 16,
      size: 9.5,
      font: fontBold,
      color: navy,
    });
    page2.drawText(val.desc.slice(0, 52), {
      x: vx + 10,
      y: vy - 30,
      size: 8,
      font: fontRegular,
      color: slateDark,
    });
    page2.drawText(val.desc.slice(52), {
      x: vx + 10,
      y: vy - 40,
      size: 8,
      font: fontRegular,
      color: slateDark,
    });
  });

  yPos -= 135;

  // Section 4: Key Pillars & Statistics Box
  page2.drawText('PROVEN TRACK RECORD & REACH', {
    x: 40,
    y: yPos,
    size: 12,
    font: fontBold,
    color: navy,
  });
  page2.drawLine({
    start: { x: 40, y: yPos - 6 },
    end: { x: 235, y: yPos - 6 },
    thickness: 2,
    color: orange,
  });

  yPos -= 25;

  const trackStats = [
    { num: '250+', label: 'Successful Projects', sub: 'Residential & Commercial' },
    { num: '15+', label: 'Years in Business', sub: 'Established Since 2009' },
    { num: '200+', label: 'Delighted Clients', sub: 'Inside & Outside Valley' },
    { num: '80+', label: 'Team Members', sub: 'Engineers, Architects & Craftsmen' },
  ];

  trackStats.forEach((stat, i) => {
    const sx = 40 + i * 132;
    page2.drawRectangle({
      x: sx,
      y: yPos - 60,
      width: 122,
      height: 60,
      color: navy,
    });
    page2.drawText(stat.num, {
      x: sx + 12,
      y: yPos - 22,
      size: 16,
      font: fontBold,
      color: orange,
    });
    page2.drawText(stat.label, {
      x: sx + 12,
      y: yPos - 38,
      size: 8,
      font: fontBold,
      color: white,
    });
    page2.drawText(stat.sub, {
      x: sx + 12,
      y: yPos - 50,
      size: 7,
      font: fontRegular,
      color: rgb(203/255, 213/255, 225/255),
    });
  });

  yPos -= 85;

  // Service Scope Note
  page2.drawRectangle({
    x: 40,
    y: yPos - 50,
    width: W - 80,
    height: 50,
    color: rgb(254/255, 243/255, 199/255),
    borderColor: rgb(245/255, 158/255, 11/255),
    borderWidth: 1,
  });
  page2.drawText('REGIONAL COVERAGE (INSIDE & OUTSIDE KATHMANDU VALLEY):', {
    x: 55,
    y: yPos - 18,
    size: 9,
    font: fontBold,
    color: rgb(146/255, 64/255, 14/255),
  });
  page2.drawText('We execute full turnkey projects throughout Kathmandu, Lalitpur, Bhaktapur, Janakpur, Dhanusha, Chitwan,', {
    x: 55,
    y: yPos - 32,
    size: 8.5,
    font: fontRegular,
    color: rgb(120/255, 53/255, 15/255),
  });
  page2.drawText('and surrounding districts with unified quality management and centralized engineering oversight.', {
    x: 55,
    y: yPos - 44,
    size: 8.5,
    font: fontRegular,
    color: rgb(120/255, 53/255, 15/255),
  });

  drawPageFooter(page2, 2, 5);

  // -------------------------------------------------------------
  // PAGE 3: SERVICES & ENGINEERING PROCESS
  // -------------------------------------------------------------
  const page3 = doc.addPage([W, H]);
  drawPageHeader(page3, 'Comprehensive Services & Process', 'Turnkey Architectural, Structural & Construction Capabilities');

  yPos = H - 110;

  page3.drawText('OUR CORE SPECIALIZATIONS', {
    x: 40,
    y: yPos,
    size: 12,
    font: fontBold,
    color: navy,
  });
  page3.drawLine({
    start: { x: 40, y: yPos - 6 },
    end: { x: 210, y: yPos - 6 },
    thickness: 2,
    color: orange,
  });

  yPos -= 25;

  const servicesList = [
    {
      title: 'Architectural & 3D Modeling Design',
      points: [
        'Complete functional space planning tailored to family/business needs',
        'Photorealistic 3D elevations, exterior views & walk-through renders',
        'Full municipal approval documentation (Nagar Palika building pass drawings)',
        'Vastu-compliant layouts integrated seamlessly with modern aesthetics',
      ]
    },
    {
      title: 'Turnkey Residential Construction',
      points: [
        'Bespoke luxury bungalows, duplex villas & modern residential homes',
        'Earthquake-resistant RCC ductile frame engineering with high-grade steel',
        'Comprehensive plumbing, electrical conduits, sanitary fixtures & drainage',
        'End-to-end management from earthwork/excavation to housewarming ceremony',
      ]
    },
    {
      title: 'Commercial & Institutional Complexes',
      points: [
        'Multi-storey commercial plazas, corporate towers & retail centers',
        'Hotels, hospitals, resorts & educational school/college campuses',
        'Advanced fire safety systems, high-efficiency MEP engineering & parking layouts',
        'Fast-track delivery schedules to ensure accelerated commercial ROI',
      ]
    },
    {
      title: 'Structural Consultancy & Seismic Retrofitting',
      points: [
        'NBC 105:2020 seismic analysis & dynamic response spectrum calculation',
        'Detailed Project Reports (DPR), site feasibility & soil bearing test evaluation',
        'Structural retrofitting, jacket column addition & strengthening of old buildings',
        'Independent engineering audits and structural stability certificates',
      ]
    },
    {
      title: 'Interior Design & Premium Finishing Works',
      points: [
        'Italian marble, vitrified tiles, granite countertops & parquet wooden flooring',
        'Modular kitchen layouts, custom storage wardrobes & gypsum ceiling lighting',
        'Exterior stone cladding, textured waterproofing paints & CNC decorative screens',
        'Soundproof double-glazed UPVC/aluminum windows & toughened glass railings',
      ]
    },
    {
      title: 'Project Management & Quantity Surveying (BOQ)',
      points: [
        'Transparent item-by-item Bill of Quantities (BOQ) with verifiable market rates',
        'Daily on-site engineering supervision & weekly video/photo client updates',
        'Laboratory cube testing for concrete compressive strength & rebar tensile check',
        'Strict milestone-based payment schedules tied directly to physical progress',
      ]
    },
  ];

  servicesList.forEach((srv, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const sx = 40 + col * 265;
    const sy = yPos - row * 115;

    page3.drawRectangle({
      x: sx,
      y: sy - 105,
      width: 250,
      height: 105,
      color: white,
      borderColor: cardBorder,
      borderWidth: 1,
    });

    // Header bar inside card
    page3.drawRectangle({
      x: sx,
      y: sy - 22,
      width: 250,
      height: 22,
      color: navy,
    });
    page3.drawText(srv.title, {
      x: sx + 8,
      y: sy - 15,
      size: 8.5,
      font: fontBold,
      color: white,
    });

    srv.points.forEach((pt, pIdx) => {
      page3.drawCircle({
        x: sx + 12,
        y: sy - 36 - (pIdx * 17),
        size: 2,
        color: orange,
      });
      page3.drawText(pt.slice(0, 48), {
        x: sx + 20,
        y: sy - 38 - (pIdx * 17),
        size: 7.5,
        font: fontRegular,
        color: slateDark,
      });
      if (pt.length > 48) {
        page3.drawText(pt.slice(48), {
          x: sx + 20,
          y: sy - 46 - (pIdx * 17),
          size: 7,
          font: fontRegular,
          color: slateMuted,
        });
      }
    });
  });

  yPos -= 365;

  // Process Steps Bar
  page3.drawText('OUR 5-STAGE TURNKEY EXECUTION WORKFLOW', {
    x: 40,
    y: yPos,
    size: 11,
    font: fontBold,
    color: navy,
  });
  page3.drawLine({
    start: { x: 40, y: yPos - 6 },
    end: { x: 300, y: yPos - 6 },
    thickness: 2,
    color: orange,
  });

  yPos -= 25;

  const flowSteps = [
    { step: '01', title: 'Consultation', desc: 'Site inspection & requirement intake' },
    { step: '02', title: '3D Design', desc: 'Architectural planning & 3D render' },
    { step: '03', title: 'BOQ & Permit', desc: 'Transparent costing & municipal pass' },
    { step: '04', title: 'Construction', desc: 'RCC execution & lab-tested quality' },
    { step: '05', title: 'Handover', desc: 'Interior finish & key handover' },
  ];

  flowSteps.forEach((stp, sIdx) => {
    const stpX = 40 + sIdx * 105;
    page3.drawRectangle({
      x: stpX,
      y: yPos - 65,
      width: 98,
      height: 65,
      color: bgLight,
      borderColor: cardBorder,
      borderWidth: 1,
    });
    page3.drawText(stp.step, {
      x: stpX + 8,
      y: yPos - 22,
      size: 14,
      font: fontBold,
      color: orange,
    });
    page3.drawText(stp.title, {
      x: stpX + 8,
      y: yPos - 36,
      size: 8.5,
      font: fontBold,
      color: navy,
    });
    page3.drawText(stp.desc.slice(0, 18), {
      x: stpX + 8,
      y: yPos - 48,
      size: 7,
      font: fontRegular,
      color: slateDark,
    });
    page3.drawText(stp.desc.slice(18), {
      x: stpX + 8,
      y: yPos - 58,
      size: 7,
      font: fontRegular,
      color: slateMuted,
    });
  });

  drawPageFooter(page3, 3, 5);

  // -------------------------------------------------------------
  // PAGE 4: FEATURED PORTFOLIO PROJECTS
  // -------------------------------------------------------------
  const page4 = doc.addPage([W, H]);
  drawPageHeader(page4, 'Featured Projects Portfolio', 'A Selection of Landmark Developments Across Nepal');

  yPos = H - 110;

  page4.drawText('SIGNATURE RESIDENTIAL & COMMERCIAL PROJECTS', {
    x: 40,
    y: yPos,
    size: 12,
    font: fontBold,
    color: navy,
  });
  page4.drawLine({
    start: { x: 40, y: yPos - 6 },
    end: { x: 330, y: yPos - 6 },
    thickness: 2,
    color: orange,
  });

  yPos -= 25;

  const projectCards = [
    {
      code: 'Project 6',
      name: 'Jay Kishor Mahato Residential',
      loc: 'Chitwan, Nepal',
      cost: 'Rs 1 Cr 10 Lakhs',
      area: '1690 sq ft (Plinth: 1300 sq ft)',
      type: '2.5-Storey Residential Residence',
      duration: '11 Months',
      desc: 'Modern 2.5-storey home with a 42 ft grand facade, rooftop pergola, double balconies, and earthquake-resistant ductile frame engineering.',
      status: 'Completed',
    },
    {
      code: 'Project 7',
      name: 'Dr. Sakil Residential Villa',
      loc: 'Janakpur, Nepal',
      cost: 'Rs 1.50 Crore',
      area: '1966 sq ft Built-up Area',
      type: 'Luxury Contemporary Bungalow',
      duration: '1 Year 6 Months',
      desc: 'Prestige residential villa featuring open landscaped lawns, expansive panoramic windows, stone-clad facade, and premium acoustic insulation.',
      status: 'Completed',
    },
    {
      code: 'Project 11',
      name: 'Budhanilkantha Luxury Residence',
      loc: 'Budhanilkantha, Kathmandu',
      cost: 'Rs 1 Cr 20 Lakhs',
      area: '1100 sq ft Plinth Area (26 ft Face)',
      type: 'Contemporary RCC Villa',
      duration: '1 Year 8 Months',
      desc: 'Contemporary C-frame cantilevered balcony with exposed brick accents, open rooftop recreational deck, and seismic ductile frame design.',
      status: 'Completed',
    },
    {
      code: 'Project 12',
      name: 'Neo-Classical Palatial Residence',
      loc: 'Kathmandu Valley',
      cost: 'Turnkey Contract',
      area: '3.5 Storeys Grand Built-up Area',
      type: 'Neo-Classical Mansion',
      duration: 'Delivered On Schedule',
      desc: 'Monumental Corinthian colonnade with ornate pediment cartouche, central full-height atrium, and cascading terrace balustrades.',
      status: 'Completed',
    },
    {
      code: 'Project 13',
      name: 'Cottage Villa with Traditional Sloping Roofs',
      loc: 'Kathmandu Valley Outskirts',
      cost: 'Turnkey Contract',
      area: '2 Storeys Custom Floorplan',
      type: 'Heritage Contemporary Fusion',
      duration: 'Delivered On Schedule',
      desc: 'Multi-tiered sloping red clay tile roofs with dormer gables, colonnaded portico entrance, spacious paved parking court, and perimeter security wall.',
      status: 'Completed',
    },
    {
      code: 'Project 15',
      name: 'Twin-Bay Urban Residence',
      loc: 'Kathmandu Urban Area',
      cost: 'Turnkey Contract',
      area: '3 Storeys High-Density Residential',
      type: 'Urban Multi-Family Home',
      duration: 'Delivered On Schedule',
      desc: 'Vertical architectural louvers, cantilevered box windows, high-efficiency natural cross ventilation, and integrated ground vehicle parking.',
      status: 'Completed',
    },
  ];

  projectCards.forEach((proj, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const px = 40 + col * 265;
    const py = yPos - row * 165;

    // Card frame
    page4.drawRectangle({
      x: px,
      y: py - 150,
      width: 250,
      height: 150,
      color: white,
      borderColor: cardBorder,
      borderWidth: 1,
    });

    // Top status pill & header
    page4.drawRectangle({
      x: px,
      y: py - 24,
      width: 250,
      height: 24,
      color: navy,
    });

    page4.drawText(`${proj.code}: ${proj.name.slice(0, 24)}`, {
      x: px + 8,
      y: py - 17,
      size: 8.5,
      font: fontBold,
      color: white,
    });

    // Status Pill
    page4.drawRectangle({
      x: px + 185,
      y: py - 20,
      width: 55,
      height: 15,
      color: orange,
    });
    page4.drawText(proj.status.toUpperCase(), {
      x: px + 192,
      y: py - 16,
      size: 6.5,
      font: fontBold,
      color: white,
    });

    // Specs
    const specs = [
      { k: 'Location:', v: proj.loc },
      { k: 'Building Type:', v: proj.type },
      { k: 'Scale & Area:', v: proj.area },
      { k: 'Project Cost:', v: proj.cost },
      { k: 'Timeline:', v: proj.duration },
    ];

    specs.forEach((sp, sIdx) => {
      page4.drawText(sp.k, {
        x: px + 8,
        y: py - 40 - (sIdx * 15),
        size: 7.5,
        font: fontBold,
        color: slateDark,
      });
      page4.drawText(sp.v.slice(0, 32), {
        x: px + 75,
        y: py - 40 - (sIdx * 15),
        size: 7.5,
        font: fontRegular,
        color: dark,
      });
    });

    // Separator line
    page4.drawLine({
      start: { x: px + 8, y: py - 114 },
      end: { x: px + 242, y: py - 114 },
      thickness: 0.5,
      color: cardBorder,
    });

    // Short Description
    page4.drawText(proj.desc.slice(0, 52), {
      x: px + 8,
      y: py - 128,
      size: 6.8,
      font: fontItalic,
      color: slateMuted,
    });
    if (proj.desc.length > 52) {
      page4.drawText(proj.desc.slice(52, 105), {
        x: px + 8,
        y: py - 138,
        size: 6.8,
        font: fontItalic,
        color: slateMuted,
      });
    }
  });

  // Bottom Notice
  page4.drawRectangle({
    x: 40,
    y: 55,
    width: W - 80,
    height: 30,
    color: bgLight,
    borderColor: cardBorder,
    borderWidth: 1,
  });
  page4.drawText('* Full architectural drawings, 3D renders, and client walk-through references available upon request.', {
    x: 55,
    y: 67,
    size: 8,
    font: fontItalic,
    color: slateMuted,
  });

  drawPageFooter(page4, 4, 5);

  // -------------------------------------------------------------
  // PAGE 5: LEADERSHIP, ENGINEERING TEAM & OFFICIAL CONTACT
  // -------------------------------------------------------------
  const page5 = doc.addPage([W, H]);
  drawPageHeader(page5, 'Key Personnel & Corporate Contact', 'Licensed Professionals, Legal Registration & Office Locations');

  yPos = H - 110;

  page5.drawText('KEY MANAGEMENT & TECHNICAL PERSONNEL', {
    x: 40,
    y: yPos,
    size: 12,
    font: fontBold,
    color: navy,
  });
  page5.drawLine({
    start: { x: 40, y: yPos - 6 },
    end: { x: 310, y: yPos - 6 },
    thickness: 2,
    color: orange,
  });

  yPos -= 25;

  const teamList = [
    { name: 'Er. Sujit Shah', role: 'Managing Director & CEO', dept: 'Executive & Strategic Direction' },
    { name: 'Er. Mukesh Adhikari', role: 'General Manager', dept: 'Operations & Procurement' },
    { name: 'Er. Amar Singh', role: 'Chief Architect', dept: 'Architectural Design & Planning' },
    { name: 'Er. Rahul Kumar Purbey', role: 'Site Engineer', dept: 'Civil Supervision & Quality' },
    { name: 'Er. Aakash Mandal', role: 'Civil Engineer', dept: 'Structural Analysis & NBC Code' },
    { name: 'Priyanka Kumari Chaudhary', role: 'Assistant Architect', dept: 'CAD Drafting & 3D Modeling' },
    { name: 'Bijaya Rasaili', role: 'Assistant Architect', dept: 'Spatial Planning & Elevations' },
    { name: 'Tanu Kumari Shah', role: 'Assistant Architect', dept: 'Interior Schematics & Detailing' },
    { name: 'Ajay Kumar Sah', role: 'Co-ordinator', dept: 'Client Liaison & Municipal Permit' },
    { name: 'Ritesh Shah', role: 'Marketing Head', dept: 'Client Relations & Business Dev.' },
  ];

  teamList.forEach((tm, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const tx = 40 + col * 265;
    const ty = yPos - row * 46;

    page5.drawRectangle({
      x: tx,
      y: ty - 38,
      width: 250,
      height: 38,
      color: bgLight,
      borderColor: cardBorder,
      borderWidth: 1,
    });

    // Avatar square badge
    page5.drawRectangle({
      x: tx + 6,
      y: ty - 32,
      width: 26,
      height: 26,
      color: navy,
    });
    const initials = tm.name.split(' ').map(n => n[0]).join('').slice(0, 2);
    page5.drawText(initials, {
      x: tx + 11,
      y: ty - 23,
      size: 9,
      font: fontBold,
      color: white,
    });

    page5.drawText(tm.name, {
      x: tx + 38,
      y: ty - 16,
      size: 8.5,
      font: fontBold,
      color: navy,
    });
    page5.drawText(`${tm.role} • ${tm.dept}`, {
      x: tx + 38,
      y: ty - 28,
      size: 7,
      font: fontRegular,
      color: slateDark,
    });
  });

  yPos -= 255;

  // Legal Registration & Compliance Credentials
  page5.drawText('STATUTORY COMPLIANCE & LEGAL ACCREDITATION', {
    x: 40,
    y: yPos,
    size: 11,
    font: fontBold,
    color: navy,
  });
  page5.drawLine({
    start: { x: 40, y: yPos - 6 },
    end: { x: 315, y: yPos - 6 },
    thickness: 2,
    color: orange,
  });

  yPos -= 22;

  const legalCreds = [
    { title: 'Company Name', val: 'Amulya Builders Pvt. Ltd.' },
    { title: 'Established Year', val: '2009 (15+ Years Active Excellence)' },
    { title: 'PAN / VAT Registration No.', val: '619774758 (Inland Revenue Dept.)' },
    { title: 'Engineering Governance', val: 'Nepal Engineering Council (NEC) Registered' },
    { title: 'Building Standards', val: 'NBC 105:2020 / NBC 205 (Seismic Resistance)' },
    { title: 'Turnkey Scope', val: 'Inside & Outside Kathmandu Valley, Nepal' },
  ];

  legalCreds.forEach((cred, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const cx = 40 + col * 265;
    const cy = yPos - row * 24;

    page5.drawText(`• ${cred.title}:`, {
      x: cx,
      y: cy - 10,
      size: 8,
      font: fontBold,
      color: slateDark,
    });
    page5.drawText(cred.val, {
      x: cx + 130,
      y: cy - 10,
      size: 8,
      font: fontRegular,
      color: dark,
    });
  });

  yPos -= 90;

  // Final Contact & Branch Information Box
  page5.drawRectangle({
    x: 40,
    y: yPos - 110,
    width: W - 80,
    height: 110,
    color: navy,
  });
  // Orange side strip
  page5.drawRectangle({
    x: 40,
    y: yPos - 110,
    width: 5,
    height: 110,
    color: orange,
  });

  page5.drawText('CONNECT WITH US FOR YOUR NEXT PROJECT', {
    x: 58,
    y: yPos - 22,
    size: 11,
    font: fontBold,
    color: orange,
  });

  page5.drawText('Head Office: Sabaila-8, Dhanusha, Nepal', {
    x: 58,
    y: yPos - 40,
    size: 8.5,
    font: fontRegular,
    color: white,
  });
  page5.drawText('Branch Office: Tikathali, Lalitpur, Nepal (Opposite of Pawan Prakriti School)', {
    x: 58,
    y: yPos - 54,
    size: 8.5,
    font: fontRegular,
    color: white,
  });
  page5.drawText('Landline: +977 15925062 | Mobile & WhatsApp: +977 9810357535', {
    x: 58,
    y: yPos - 68,
    size: 8.5,
    font: fontRegular,
    color: white,
  });
  page5.drawText('Official Email: abt4nepal@gmail.com | Web: https://amulyabuilders.com.np', {
    x: 58,
    y: yPos - 82,
    size: 8.5,
    font: fontRegular,
    color: rgb(203/255, 213/255, 225/255),
  });
  page5.drawText('Business Hours: Sunday – Friday, 10:00 AM – 6:00 PM (Site Visits & Consultations by Appointment)', {
    x: 58,
    y: yPos - 96,
    size: 8,
    font: fontItalic,
    color: rgb(148/255, 163/255, 184/255),
  });

  drawPageFooter(page5, 5, 5);

  // Save PDF to public/Amulya-Builders-Company-Profile.pdf
  const pdfBytes = await doc.save();
  const outputPath = path.join(rootDir, 'public', 'Amulya-Builders-Company-Profile.pdf');
  fs.writeFileSync(outputPath, pdfBytes);
  console.log(`Successfully generated PDF at: ${outputPath} (${pdfBytes.length} bytes)`);

  // Also write to dist if dist exists
  const distPath = path.join(rootDir, 'dist', 'Amulya-Builders-Company-Profile.pdf');
  if (fs.existsSync(path.join(rootDir, 'dist'))) {
    fs.writeFileSync(distPath, pdfBytes);
    console.log(`Also copied PDF to: ${distPath}`);
  }
}

generateCompanyProfilePdf().catch(err => {
  console.error('Error generating PDF:', err);
  process.exit(1);
});
