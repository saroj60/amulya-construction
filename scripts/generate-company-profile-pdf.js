import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

async function safeEmbedImage(doc, relPath) {
  try {
    const fullPath = path.join(rootDir, 'public', relPath);
    if (!fs.existsSync(fullPath)) return null;
    const ext = path.extname(fullPath).toLowerCase();
    const bytes = fs.readFileSync(fullPath);
    if (ext === '.jpg' || ext === '.jpeg') {
      return await doc.embedJpg(bytes);
    } else if (ext === '.png') {
      return await doc.embedPng(bytes);
    }
  } catch (err) {
    console.warn(`Could not embed image "${relPath}":`, err.message);
  }
  return null;
}

function wrapText(text, font, fontSize, maxWidth) {
  const words = text.split(' ');
  const lines = [];
  let currentLine = '';

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const testWidth = font.widthOfTextAtSize(testLine, fontSize);
    if (testWidth <= maxWidth) {
      currentLine = testLine;
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  }
  if (currentLine) lines.push(currentLine);
  return lines;
}

async function generateCompanyProfilePdf() {
  const doc = await PDFDocument.create();
  
  // Embed Fonts
  const fontRegular = await doc.embedFont(StandardFonts.Helvetica);
  const fontBold = await doc.embedFont(StandardFonts.HelveticaBold);
  const fontItalic = await doc.embedFont(StandardFonts.HelveticaOblique);

  // Corporate Brand Colors — RED & BLACK THEME
  const black = rgb(15/255, 17/255, 23/255);        // #0f1117 Jet Black
  const deepBlack = rgb(10/255, 10/255, 14/255);    // #0a0a0e Pitch Black
  const brandRed = rgb(220/255, 38/255, 38/255);    // #dc2626 Vivid Architectural Red
  const deepRed = rgb(153/255, 27/255, 27/255);     // #991b1b Crimson Ruby
  const dark = rgb(17/255, 24/255, 39/255);         // #111827 Charcoal Text
  const slateDark = rgb(51/255, 65/255, 85/255);    // #334155 Body Text
  const slateMuted = rgb(100/255, 116/255, 139/255); // #64748b Secondary Text
  const bgLight = rgb(248/255, 250/255, 252/255);   // #f8fafc Light Grey Card Surface
  const cardBorder = rgb(226/255, 232/255, 240/255);
  const white = rgb(1, 1, 1);

  // Theme Aliases (Red & Black)
  const navy = black;
  const deepNavy = deepBlack;
  const orange = brandRed;
  const crimson = deepRed;

  // Dimensions (A4: 595.28 x 841.89 pt)
  const W = 595.28;
  const H = 841.89;

  // Pre-load all available assets
  const logoImg = await safeEmbedImage(doc, 'amulyalogo1.png');
  const coverProjImg = await safeEmbedImage(doc, 'project-gallery/project-19.png');
  const aboutProjImg = await safeEmbedImage(doc, 'project-gallery/project-2.jpg');
  const mdImg = await safeEmbedImage(doc, 'md-sujit-shah.jpg');

  // Pre-load project gallery photos
  const projImgs = {
    p14: await safeEmbedImage(doc, 'project-gallery/project-14.jpg'),
    p19: await safeEmbedImage(doc, 'project-gallery/project-19.png'),
    p6: await safeEmbedImage(doc, 'project-gallery/project-6.jpg'),
    p7: await safeEmbedImage(doc, 'project-gallery/project-7.jpg'),
    p11: await safeEmbedImage(doc, 'project-gallery/project-11.jpg'),
    p12: await safeEmbedImage(doc, 'project-gallery/project-12.jpg'),
    p13: await safeEmbedImage(doc, 'project-gallery/project-13.jpg'),
  };

  // Pre-load team photos
  const teamImgs = {
    mukesh: await safeEmbedImage(doc, 'team/mukesh-adhikari.png'),
    amar: await safeEmbedImage(doc, 'team/amar-singh.png'),
    rahul: await safeEmbedImage(doc, 'team/rahul-kumar-purbey.png'),
    priyanka: await safeEmbedImage(doc, 'team/priyanka-kumari-chaudhary.png'),
    bijaya: await safeEmbedImage(doc, 'team/bijaya-rasaili.png'),
    tanu: await safeEmbedImage(doc, 'team/tanu-kumari-shah.png'),
    aakash: await safeEmbedImage(doc, 'team/aakash-mandal.png'),
    ritesh: await safeEmbedImage(doc, 'team/ritesh-shah.png'),
  };

  // Helper: Internal Page Header
  const drawPageHeader = (page, title, subtitle) => {
    page.drawRectangle({
      x: 0,
      y: H - 75,
      width: W,
      height: 75,
      color: navy,
    });
    page.drawRectangle({
      x: 0,
      y: H - 78,
      width: W,
      height: 3,
      color: orange,
    });

    if (logoImg) {
      const dims = logoImg.scale(0.045);
      page.drawImage(logoImg, {
        x: 40,
        y: H - 62,
        width: dims.width,
        height: dims.height,
      });
    }

    const titleX = logoImg ? 140 : 40;
    page.drawText(title.toUpperCase(), {
      x: titleX,
      y: H - 42,
      size: 15,
      font: fontBold,
      color: white,
    });
    if (subtitle) {
      page.drawText(subtitle, {
        x: titleX,
        y: H - 58,
        size: 8.5,
        font: fontRegular,
        color: rgb(203/255, 213/255, 225/255),
      });
    }
  };

  // Helper: Internal Page Footer
  const drawPageFooter = (page, pageNum, totalPages) => {
    page.drawLine({
      start: { x: 40, y: 38 },
      end: { x: W - 40, y: 38 },
      thickness: 0.75,
      color: cardBorder,
    });
    // Line 1: Phone, Address & Page Number
    page.drawText('Phone: +977 9810357535, 01-5925062  |  Address: Tikathali, Lalitpur & Sabaila-8, Dhanusha, Nepal', {
      x: 40,
      y: 26,
      size: 7.2,
      font: fontRegular,
      color: dark,
    });
    page.drawText(`Page ${pageNum} of ${totalPages}`, {
      x: W - 85,
      y: 26,
      size: 7.5,
      font: fontBold,
      color: brandRed,
    });
    // Line 2: Website & Corporate Info
    page.drawText('Website: www.amulyabuilders.com.np  |  Email: abt4nepal@gmail.com  |  Amulya Builders Pvt. Ltd.', {
      x: 40,
      y: 15,
      size: 7,
      font: fontBold,
      color: brandRed,
    });
  };

  // Helper: Draw image proportionally within a bounding box (zero distortion / true aspect ratio)
  const drawProportionalImage = (page, img, boxX, boxY, boxW, boxH, bgColor = null) => {
    if (bgColor) {
      page.drawRectangle({
        x: boxX,
        y: boxY,
        width: boxW,
        height: boxH,
        color: bgColor,
      });
    }
    if (!img) return;
    const scale = Math.min(boxW / img.width, boxH / img.height);
    const drawW = img.width * scale;
    const drawH = img.height * scale;
    const drawX = boxX + (boxW - drawW) / 2;
    const drawY = boxY + (boxH - drawH) / 2;
    page.drawImage(img, {
      x: drawX,
      y: drawY,
      width: drawW,
      height: drawH,
    });
  };

  // =============================================================
  // PAGE 1: EXECUTIVE COVER WITH REAL FEATURED PROJECT IMAGE
  // =============================================================
  const page1 = doc.addPage([W, H]);

  // Deep Navy Background
  page1.drawRectangle({
    x: 0,
    y: 0,
    width: W,
    height: H,
    color: deepNavy,
  });

  // Top Accent Stripes
  page1.drawRectangle({ x: 0, y: H - 14, width: W, height: 14, color: crimson });
  page1.drawRectangle({ x: 0, y: H - 20, width: W, height: 6, color: orange });

  // White Card for Logo
  page1.drawRectangle({
    x: 40,
    y: H - 105,
    width: 140,
    height: 65,
    color: white,
  });
  if (logoImg) {
    const lDims = logoImg.scale(0.065);
    page1.drawImage(logoImg, {
      x: 48,
      y: H - 98,
      width: lDims.width,
      height: lDims.height,
    });
  }

  // Right Header Metadata
  page1.drawRectangle({
    x: W - 210,
    y: H - 75,
    width: 170,
    height: 22,
    color: rgb(24/255, 24/255, 28/255),
    borderColor: brandRed,
    borderWidth: 1,
  });
  page1.drawText('CORPORATE PROFILE', {
    x: W - 185,
    y: H - 68,
    size: 9.5,
    font: fontBold,
    color: brandRed,
  });
  page1.drawText('9+ Years Experience • Regd. in Nepal', {
    x: W - 205,
    y: H - 95,
    size: 8.5,
    font: fontRegular,
    color: rgb(203/255, 213/255, 225/255),
  });

  // Main Cover Titles
  page1.drawText('AMULYA BUILDERS', {
    x: 40,
    y: H - 150,
    size: 30,
    font: fontBold,
    color: white,
  });

  page1.drawText('Constructing Integrity • Elevating Standards', {
    x: 40,
    y: H - 172,
    size: 13,
    font: fontBold,
    color: brandRed,
  });

  page1.drawText('Architectural Design • 3D Modeling • Structural Engineering • Turnkey Construction', {
    x: 40,
    y: H - 192,
    size: 9.5,
    font: fontRegular,
    color: rgb(226/255, 232/255, 240/255),
  });

  // EMBEDDED FEATURED PROJECT IMAGE ON COVER
  const coverImgBox = { x: 40, y: H - 465, width: W - 80, height: 255 };
  page1.drawRectangle({
    x: coverImgBox.x - 2,
    y: coverImgBox.y - 2,
    width: coverImgBox.width + 4,
    height: coverImgBox.height + 4,
    color: rgb(24/255, 24/255, 28/255),
    borderColor: rgb(45/255, 45/255, 52/255),
    borderWidth: 1.5,
  });

  if (coverProjImg) {
    drawProportionalImage(page1, coverProjImg, coverImgBox.x, coverImgBox.y, coverImgBox.width, coverImgBox.height, rgb(15/255, 15/255, 18/255));
  }

  // Overlay Tag on Photo
  page1.drawRectangle({
    x: coverImgBox.x,
    y: coverImgBox.y,
    width: coverImgBox.width,
    height: 38,
    color: rgb(15/255, 15/255, 18/255),
  });
  page1.drawText('FEATURED LANDMARK DEVELOPMENT • TURNKEY EXCELLENCE', {
    x: coverImgBox.x + 15,
    y: coverImgBox.y + 22,
    size: 9,
    font: fontBold,
    color: brandRed,
  });
  page1.drawText('Seismic-Resistant Engineering • Inside & Outside Kathmandu Valley Across Nepal', {
    x: coverImgBox.x + 15,
    y: coverImgBox.y + 10,
    size: 8,
    font: fontRegular,
    color: white,
  });

  // 4 KEY METRICS BOXES (Showing user's exact updated datas)
  const coverMetrics = [
    { num: '9+', lbl: 'Years Experience', sub: 'Active Excellence' },
    { num: '20+', lbl: 'Happy Clients', sub: 'Residential & Commercial' },
    { num: '15+', lbl: 'Professionals', sub: 'Licensed Engineers & Staff' },
    { num: '250+', lbl: 'Projects Done', sub: 'Delivered On Schedule' },
  ];

  coverMetrics.forEach((m, idx) => {
    const bx = 40 + idx * 132;
    const by = H - 540;
    page1.drawRectangle({
      x: bx,
      y: by,
      width: 122,
      height: 60,
      color: rgb(20/255, 20/255, 24/255),
      borderColor: rgb(45/255, 45/255, 52/255),
      borderWidth: 1,
    });
    page1.drawText(m.num, {
      x: bx + 12,
      y: by + 36,
      size: 18,
      font: fontBold,
      color: brandRed,
    });
    page1.drawText(m.lbl, {
      x: bx + 12,
      y: by + 22,
      size: 8.5,
      font: fontBold,
      color: white,
    });
    page1.drawText(m.sub, {
      x: bx + 12,
      y: by + 10,
      size: 7,
      font: fontRegular,
      color: rgb(203/255, 213/255, 225/255),
    });
  });

  // Contact Footer Box
  page1.drawRectangle({
    x: 40,
    y: 60,
    width: W - 80,
    height: 105,
    color: rgb(18/255, 18/255, 22/255),
    borderColor: rgb(40/255, 40/255, 48/255),
    borderWidth: 1,
  });

  page1.drawText('HEAD OFFICE & CONTACT INFORMATION', {
    x: 55,
    y: 145,
    size: 9.5,
    font: fontBold,
    color: brandRed,
  });
  page1.drawText('Head Office: Sabaila-8, Dhanusha, Nepal | Branch: Tikathali, Lalitpur (opp. Pawan Prakriti School)', {
    x: 55,
    y: 128,
    size: 8.5,
    font: fontRegular,
    color: white,
  });
  page1.drawText('Landline: +977 15925062 | Mobile & WhatsApp: +977 9810357535 | Email: abt4nepal@gmail.com', {
    x: 55,
    y: 112,
    size: 8.5,
    font: fontRegular,
    color: white,
  });
  page1.drawText('Website: https://amulyabuilders.com.np | PAN / VAT: 619774758 (Inland Revenue Dept.)', {
    x: 55,
    y: 96,
    size: 8.5,
    font: fontRegular,
    color: rgb(203/255, 213/255, 225/255),
  });
  page1.drawText('Standards: Nepal National Building Code NBC 105:2020 / NBC 205 (Seismic Zone V Certified)', {
    x: 55,
    y: 80,
    size: 8,
    font: fontItalic,
    color: rgb(148/255, 163/255, 184/255),
  });

  // Bottom Copy Line
  page1.drawText('Phone: +977 9810357535, 01-5925062  •  Address: Tikathali, Lalitpur & Dhanusha  •  Website: www.amulyabuilders.com.np', {
    x: 45,
    y: 25,
    size: 7.2,
    font: fontRegular,
    color: rgb(203/255, 213/255, 225/255),
  });

  // =============================================================
  // PAGE 2: SEPARATE PAGE FOR TABLE OF CONTENTS & MESSAGE FROM MD/CEO
  // =============================================================
  const page2TOC = doc.addPage([W, H]);
  drawPageHeader(page2TOC, 'Message From MD & Table of Contents', 'Leadership Vision • Document Navigation & Corporate Directory');

  let yPosTOC = H - 98;

  // Upper Section: Message from MD & CEO Card
  const mdCardH = 310;
  page2TOC.drawRectangle({
    x: 40,
    y: yPosTOC - mdCardH,
    width: W - 80,
    height: mdCardH,
    color: white,
    borderColor: cardBorder,
    borderWidth: 1,
  });
  page2TOC.drawRectangle({
    x: 40,
    y: yPosTOC - mdCardH,
    width: 4,
    height: mdCardH,
    color: orange,
  });

  // Left Column inside MD Card: Framed Portrait of Er. Sujit Shah
  const mdBox = { x: 55, y: yPosTOC - 170, width: 110, height: 145 };
  drawProportionalImage(page2TOC, mdImg, mdBox.x, mdBox.y, mdBox.width, mdBox.height, rgb(241/255, 245/255, 249/255));
  page2TOC.drawRectangle({
    x: mdBox.x,
    y: mdBox.y,
    width: mdBox.width,
    height: mdBox.height,
    borderColor: orange,
    borderWidth: 1.5,
  });

  // MD Title & Credentials under photo
  page2TOC.drawText('Er. Sujit Shah', {
    x: 55,
    y: mdBox.y - 18,
    size: 11,
    font: fontBold,
    color: navy,
  });
  page2TOC.drawText('Managing Director & CEO', {
    x: 55,
    y: mdBox.y - 31,
    size: 8.5,
    font: fontBold,
    color: orange,
  });
  page2TOC.drawText('Senior Civil Engineer', {
    x: 55,
    y: mdBox.y - 44,
    size: 7.5,
    font: fontBold,
    color: slateDark,
  });
  page2TOC.drawText('Nepal Engineering Council (NEC)', {
    x: 55,
    y: mdBox.y - 56,
    size: 7,
    font: fontItalic,
    color: slateMuted,
  });

  // Leadership Badge under credentials
  page2TOC.drawRectangle({
    x: 55,
    y: mdBox.y - 82,
    width: 110,
    height: 18,
    color: black,
  });
  page2TOC.drawText('9+ YEARS LEADERSHIP', {
    x: 62,
    y: mdBox.y - 77,
    size: 7,
    font: fontBold,
    color: white,
  });

  // Right Column inside MD Card: Executive Address Letter
  const letterX = 185;
  page2TOC.drawRectangle({
    x: letterX,
    y: yPosTOC - 25,
    width: 175,
    height: 16,
    color: orange,
  });
  page2TOC.drawText('MESSAGE FROM THE MD & CEO', {
    x: letterX + 8,
    y: yPosTOC - 21,
    size: 7.5,
    font: fontBold,
    color: white,
  });

  page2TOC.drawText('Engineering Generational Trust & Resilience', {
    x: letterX,
    y: yPosTOC - 45,
    size: 12,
    font: fontBold,
    color: navy,
  });
  page2TOC.drawLine({
    start: { x: letterX, y: yPosTOC - 50 },
    end: { x: letterX + 220, y: yPosTOC - 50 },
    thickness: 1.5,
    color: orange,
  });

  const mdLetterParas = [
    [
      'Dear Valued Clients, Partners & Well-Wishers,',
      'Welcome to Amulya Builders Pvt. Ltd. When we established this company, our',
      'founding mission was clear: to redefine Nepal’s construction sector through',
      'uncompromising structural engineering, architectural elegance, and transparent trust.'
    ],
    [
      'In a nation situated in Seismic Zone V, building is not merely pouring concrete—',
      'it is a sacred responsibility to safeguard human lives. Every residential home and',
      'commercial development we execute complies strictly with the Nepal National',
      'Building Code (NBC 105:2020), utilizing certified materials and precise BOQ standards.'
    ],
    [
      'With 9+ years of field excellence, 20+ satisfied clients, and 15+ licensed engineering',
      'professionals, we guide every milestone from soil testing to keys in hand. We invite',
      'you to partner with us on your landmark project.'
    ]
  ];

  let curY = yPosTOC - 66;
  mdLetterParas.forEach((para) => {
    para.forEach((line) => {
      page2TOC.drawText(line, {
        x: letterX,
        y: curY,
        size: 7.5,
        font: fontRegular,
        color: slateDark,
      });
      curY -= 11;
    });
    curY -= 4;
  });

  // Sign-off
  page2TOC.drawText('Warm regards,', {
    x: letterX,
    y: curY,
    size: 7.5,
    font: fontItalic,
    color: slateDark,
  });
  page2TOC.drawText('Er. Sujit Shah', {
    x: letterX,
    y: curY - 12,
    size: 9,
    font: fontBold,
    color: navy,
  });
  page2TOC.drawText('Founder, Managing Director & CEO • Amulya Builders Pvt. Ltd.', {
    x: letterX,
    y: curY - 23,
    size: 7,
    font: fontRegular,
    color: slateMuted,
  });

  // Lower Section: Table of Contents
  yPosTOC -= (mdCardH + 18);

  page2TOC.drawText('TABLE OF CONTENTS', {
    x: 40,
    y: yPosTOC,
    size: 11,
    font: fontBold,
    color: navy,
  });
  page2TOC.drawLine({
    start: { x: 40, y: yPosTOC - 4 },
    end: { x: 175, y: yPosTOC - 4 },
    thickness: 2,
    color: orange,
  });
  page2TOC.drawText('Official Document Navigation & Section Index', {
    x: 190,
    y: yPosTOC,
    size: 7.5,
    font: fontRegular,
    color: slateMuted,
  });

  yPosTOC -= 18;

  const tocModules = [
    {
      num: '01',
      title: 'Company Overview & Vision',
      sub: 'Corporate identity, mission & national reach',
      page: 'Page 03',
    },
    {
      num: '02',
      title: 'Core Values & Track Record',
      sub: 'NBC 105:2020 standard & verified metrics',
      page: 'Page 03',
    },
    {
      num: '03',
      title: 'Comprehensive Turnkey Services',
      sub: '3D architectural, structural & RCC build',
      page: 'Page 04',
    },
    {
      num: '04',
      title: '5-Stage Execution Workflow',
      sub: 'Consultation to turnkey key handover',
      page: 'Page 04',
    },
    {
      num: '05',
      title: 'Signature Projects Portfolio',
      sub: 'Landmark residential & commercial builds',
      page: 'Page 05',
    },
    {
      num: '06',
      title: 'Technical Team & Accreditation',
      sub: 'Licensed team, statutory PAN & contact',
      page: 'Page 06',
    },
  ];

  const tocCardH = 46;
  const tocGap = 8;
  tocModules.forEach((mod, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const tx = 40 + col * 265;
    const ty = yPosTOC - row * (tocCardH + tocGap);

    page2TOC.drawRectangle({
      x: tx,
      y: ty - tocCardH,
      width: 250,
      height: tocCardH,
      color: bgLight,
      borderColor: cardBorder,
      borderWidth: 1,
    });

    // Number Box
    page2TOC.drawRectangle({
      x: tx,
      y: ty - tocCardH,
      width: 26,
      height: tocCardH,
      color: navy,
    });
    page2TOC.drawText(mod.num, {
      x: tx + 6,
      y: ty - 26,
      size: 10,
      font: fontBold,
      color: orange,
    });

    // Title & Sub
    page2TOC.drawText(mod.title, {
      x: tx + 34,
      y: ty - 16,
      size: 8.5,
      font: fontBold,
      color: navy,
    });
    page2TOC.drawText(mod.sub, {
      x: tx + 34,
      y: ty - 28,
      size: 6.8,
      font: fontRegular,
      color: slateDark,
    });

    // Page Pill on Right
    page2TOC.drawRectangle({
      x: tx + 195,
      y: ty - 38,
      width: 48,
      height: 14,
      color: orange,
    });
    page2TOC.drawText(mod.page, {
      x: tx + 199,
      y: ty - 35,
      size: 6.5,
      font: fontBold,
      color: white,
    });
  });

  // Bottom Corporate Quick Facts Banner on Page 2
  const bannerY = yPosTOC - 3 * (tocCardH + tocGap) - 10;
  const bannerH = 45;
  page2TOC.drawRectangle({
    x: 40,
    y: bannerY - bannerH,
    width: W - 80,
    height: bannerH,
    color: rgb(241/255, 245/255, 249/255),
    borderColor: cardBorder,
    borderWidth: 1,
  });
  page2TOC.drawRectangle({
    x: 40,
    y: bannerY - bannerH,
    width: 3,
    height: bannerH,
    color: navy,
  });

  page2TOC.drawText('CORPORATE REGISTRATION & CREDENTIALS SUMMARY', {
    x: 52,
    y: bannerY - 14,
    size: 7.5,
    font: fontBold,
    color: navy,
  });
  page2TOC.drawText('Govt. Regd: Amulya Builders Pvt. Ltd. | PAN: 619774758 | Governance: Nepal Engineering Council (NEC)', {
    x: 52,
    y: bannerY - 26,
    size: 7.2,
    font: fontRegular,
    color: slateDark,
  });
  page2TOC.drawText('Offices: Sabaila-8, Dhanusha & Tikathali, Lalitpur | Hotline: +977 9810357535 | www.amulyabuilders.com.np', {
    x: 52,
    y: bannerY - 38,
    size: 7.2,
    font: fontRegular,
    color: slateMuted,
  });

  drawPageFooter(page2TOC, 2, 6);

  // =============================================================
  // PAGE 3: OVERVIEW, VISION & EMBEDDED ARCHITECTURE IMAGE
  // =============================================================
  const page2 = doc.addPage([W, H]);
  drawPageHeader(page2, 'Company Overview & Vision', 'Engineering Trust, Architectural Elegance & Structural Resilience');

  let yPos = H - 105;

  // Split: Text on Left (300pt), Real Photo on Right (195pt)
  page2.drawRectangle({
    x: 40,
    y: yPos - 135,
    width: 300,
    height: 135,
    color: bgLight,
    borderColor: cardBorder,
    borderWidth: 1,
  });
  page2.drawRectangle({
    x: 40,
    y: yPos - 135,
    width: 4,
    height: 135,
    color: navy,
  });

  page2.drawText('EXECUTIVE SUMMARY', {
    x: 55,
    y: yPos - 20,
    size: 11,
    font: fontBold,
    color: navy,
  });

  const summaryLines = [
    'Amulya Builders Pvt. Ltd. is a premier architectural design,',
    'structural engineering, and turnkey construction company.',
    'Headquartered in Dhanusha with our central technical office in',
    'Tikathali, Lalitpur, we provide comprehensive services from soil',
    'testing and 3D modeling to precision NBC-compliant construction.',
    'With 9+ years of experience, 20+ satisfied clients, and a dedicated',
    'team of 15+ licensed professionals, we build enduring structures',
    'inside and outside Kathmandu Valley across Nepal.'
  ];
  summaryLines.forEach((line, i) => {
    page2.drawText(line, {
      x: 55,
      y: yPos - 38 - (i * 12),
      size: 8.5,
      font: fontRegular,
      color: slateDark,
    });
  });

  // Embed Real Architectural Project Photo on Right
  const archImgBox = { x: 355, y: yPos - 135, width: W - 395, height: 135 };
  page2.drawRectangle({
    x: archImgBox.x - 1,
    y: archImgBox.y - 1,
    width: archImgBox.width + 2,
    height: archImgBox.height + 2,
    color: white,
    borderColor: cardBorder,
    borderWidth: 1,
  });
  if (aboutProjImg) {
    drawProportionalImage(page2, aboutProjImg, archImgBox.x, archImgBox.y, archImgBox.width, archImgBox.height, bgLight);
  }

  yPos -= 155;

  // Vision & Mission Cards
  page2.drawRectangle({
    x: 40,
    y: yPos - 85,
    width: 250,
    height: 85,
    color: white,
    borderColor: cardBorder,
    borderWidth: 1,
  });
  page2.drawRectangle({
    x: 40,
    y: yPos - 20,
    width: 250,
    height: 20,
    color: navy,
  });
  page2.drawText('OUR VISION', {
    x: 50,
    y: yPos - 14,
    size: 9.5,
    font: fontBold,
    color: white,
  });
  const vLines = [
    'To be recognized across Nepal as the benchmark',
    'of engineering integrity, architectural innovation,',
    'and enduring construction that safeguards lives',
    'through seismic-compliant building design.'
  ];
  vLines.forEach((l, i) => {
    page2.drawText(l, {
      x: 50,
      y: yPos - 34 - (i * 12),
      size: 8,
      font: fontRegular,
      color: slateDark,
    });
  });

  // Mission
  page2.drawRectangle({
    x: 305,
    y: yPos - 85,
    width: 250,
    height: 85,
    color: white,
    borderColor: cardBorder,
    borderWidth: 1,
  });
  page2.drawRectangle({
    x: 305,
    y: yPos - 20,
    width: 250,
    height: 20,
    color: orange,
  });
  page2.drawText('OUR MISSION', {
    x: 315,
    y: yPos - 14,
    size: 9.5,
    font: fontBold,
    color: white,
  });
  const mLines = [
    'To deliver uncompromising construction quality,',
    'transparent cost management, and timely handover',
    'with certified materials, licensed engineers, and',
    'personalized client collaboration from day one.'
  ];
  mLines.forEach((l, i) => {
    page2.drawText(l, {
      x: 315,
      y: yPos - 34 - (i * 12),
      size: 8,
      font: fontRegular,
      color: slateDark,
    });
  });

  yPos -= 110;

  // Core Values
  page2.drawText('CORE ENGINEERING VALUES', {
    x: 40,
    y: yPos,
    size: 11,
    font: fontBold,
    color: navy,
  });
  page2.drawLine({
    start: { x: 40, y: yPos - 4 },
    end: { x: 215, y: yPos - 4 },
    thickness: 2,
    color: orange,
  });

  yPos -= 20;

  const coreVals = [
    {
      title: '1. Engineering Integrity',
      line1: 'No shortcuts on steel rebar or cement grade.',
      line2: 'Strict adherence to verified structural designs.'
    },
    {
      title: '2. Total Transparency',
      line1: 'Detailed, unhidden Bill of Quantities (BOQ).',
      line2: 'Clear market rates and zero hidden charges.'
    },
    {
      title: '3. NBC Code Compliance',
      line1: 'NBC 105:2020 seismic engineering standard',
      line2: 'for complete safety in seismic Zone V.'
    },
    {
      title: '4. Guaranteed Punctuality',
      line1: 'Precise Gantt schedules, experienced site',
      line2: 'engineers, and guaranteed on-time handover.'
    },
  ];

  coreVals.forEach((val, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const vx = 40 + col * 265;
    const vy = yPos - row * 58;
    page2.drawRectangle({
      x: vx,
      y: vy - 50,
      width: 250,
      height: 50,
      color: bgLight,
      borderColor: cardBorder,
      borderWidth: 1,
    });
    page2.drawText(val.title, {
      x: vx + 12,
      y: vy - 16,
      size: 9,
      font: fontBold,
      color: navy,
    });
    page2.drawText(val.line1, {
      x: vx + 12,
      y: vy - 30,
      size: 7.5,
      font: fontRegular,
      color: slateDark,
    });
    page2.drawText(val.line2, {
      x: vx + 12,
      y: vy - 41,
      size: 7.5,
      font: fontRegular,
      color: slateDark,
    });
  });

  yPos -= 135;

  // Track Record Strip
  page2.drawText('PROVEN TRACK RECORD & REACH', {
    x: 40,
    y: yPos,
    size: 11,
    font: fontBold,
    color: navy,
  });
  page2.drawLine({
    start: { x: 40, y: yPos - 4 },
    end: { x: 220, y: yPos - 4 },
    thickness: 2,
    color: orange,
  });

  yPos -= 22;

  const trackStats = [
    { num: '9+', label: 'Years Experience', sub: 'Active Excellence' },
    { num: '20+', label: 'Happy Clients', sub: 'Inside & Outside Valley' },
    { num: '15+', label: 'Professionals', sub: 'Engineers & Architects' },
    { num: '250+', label: 'Delivered Projects', sub: 'Residential & Commercial' },
  ];

  trackStats.forEach((stat, i) => {
    const sx = 40 + i * 132;
    page2.drawRectangle({
      x: sx,
      y: yPos - 55,
      width: 122,
      height: 55,
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
      y: yPos - 36,
      size: 8,
      font: fontBold,
      color: white,
    });
    page2.drawText(stat.sub, {
      x: sx + 12,
      y: yPos - 47,
      size: 7,
      font: fontRegular,
      color: rgb(203/255, 213/255, 225/255),
    });
  });

  yPos -= 80;

  // Regional Coverage
  page2.drawRectangle({
    x: 40,
    y: yPos - 45,
    width: W - 80,
    height: 45,
    color: rgb(254/255, 242/255, 242/255),
    borderColor: brandRed,
    borderWidth: 1,
  });
  page2.drawText('NATIONWIDE SERVICE REACH (INSIDE & OUTSIDE KATHMANDU VALLEY):', {
    x: 55,
    y: yPos - 17,
    size: 8.5,
    font: fontBold,
    color: brandRed,
  });
  page2.drawText('Active turnkey execution in Kathmandu, Lalitpur, Bhaktapur, Janakpur, Dhanusha, Chitwan, and beyond.', {
    x: 55,
    y: yPos - 31,
    size: 8,
    font: fontRegular,
    color: dark,
  });

  drawPageFooter(page2, 3, 6);

  // =============================================================
  // PAGE 3: COMPREHENSIVE SERVICES & 5-STAGE WORKFLOW
  // =============================================================
  const page3 = doc.addPage([W, H]);
  drawPageHeader(page3, 'Comprehensive Services & Process', 'Turnkey Architectural, Structural & Construction Capabilities');

  yPos = H - 105;

  page3.drawText('OUR CORE SPECIALIZATIONS', {
    x: 40,
    y: yPos,
    size: 11,
    font: fontBold,
    color: navy,
  });
  page3.drawLine({
    start: { x: 40, y: yPos - 4 },
    end: { x: 200, y: yPos - 4 },
    thickness: 2,
    color: orange,
  });

  yPos -= 20;

  const servicesList = [
    {
      title: 'Architectural & 3D Modeling Design',
      points: [
        'Complete functional space planning tailored to client needs',
        'Photorealistic 3D elevations, exterior views & walkthroughs',
        'Municipal approval documentation (Nagar Palika building pass)',
        'Vastu-compliant layouts seamlessly merged with modern style',
      ]
    },
    {
      title: 'Turnkey Residential Construction',
      points: [
        'Bespoke luxury bungalows, duplexes & residential homes',
        'Earthquake-resistant RCC ductile frame engineering',
        'Complete plumbing, electrical conduits & sanitary fixtures',
        'End-to-end management from earthwork to handover',
      ]
    },
    {
      title: 'Commercial & Institutional Complexes',
      points: [
        'Multi-storey commercial plazas, corporate towers & retail hubs',
        'Hotels, hospitals, resorts & educational school campuses',
        'Advanced fire safety, MEP engineering & parking systems',
        'Fast-track delivery schedules to accelerate investment ROI',
      ]
    },
    {
      title: 'Structural Consultancy & Retrofitting',
      points: [
        'NBC 105:2020 seismic analysis & dynamic calculations',
        'Detailed Project Reports (DPR), site feasibility & soil tests',
        'Structural retrofitting & jacket column additions',
        'Independent engineering audits & structural stability certificates',
      ]
    },
    {
      title: 'Interior Design & Premium Finishing Works',
      points: [
        'Italian marble, vitrified tiles, granite & parquet flooring',
        'Modular kitchen layouts, custom wardrobes & false ceilings',
        'Exterior stone cladding, textured waterproof paints & CNC panels',
        'Soundproof UPVC/aluminum windows & toughened glass railings',
      ]
    },
    {
      title: 'Project Management & Quantity Surveying (BOQ)',
      points: [
        'Item-by-item BOQ with completely transparent market rates',
        'Daily on-site engineering supervision & weekly progress photos',
        'Laboratory cube testing for concrete compressive strength',
        'Milestone-based payment schedules tied to verified work',
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
    page3.drawRectangle({
      x: sx,
      y: sy - 20,
      width: 250,
      height: 20,
      color: navy,
    });
    page3.drawText(srv.title, {
      x: sx + 8,
      y: sy - 14,
      size: 8.5,
      font: fontBold,
      color: white,
    });

    srv.points.forEach((pt, pIdx) => {
      page3.drawCircle({
        x: sx + 12,
        y: sy - 34 - (pIdx * 18),
        size: 2,
        color: orange,
      });
      const wrapped = wrapText(pt, fontRegular, 7.5, 215);
      page3.drawText(wrapped[0] || '', {
        x: sx + 20,
        y: sy - 36 - (pIdx * 18),
        size: 7.5,
        font: fontRegular,
        color: slateDark,
      });
      if (wrapped[1]) {
        page3.drawText(wrapped[1], {
          x: sx + 20,
          y: sy - 44 - (pIdx * 18),
          size: 6.8,
          font: fontRegular,
          color: slateMuted,
        });
      }
    });
  });

  yPos -= 365;

  // Workflow
  page3.drawText('OUR 5-STAGE TURNKEY EXECUTION WORKFLOW', {
    x: 40,
    y: yPos,
    size: 11,
    font: fontBold,
    color: navy,
  });
  page3.drawLine({
    start: { x: 40, y: yPos - 4 },
    end: { x: 290, y: yPos - 4 },
    thickness: 2,
    color: orange,
  });

  yPos -= 22;

  const workflowSteps = [
    { step: '01', title: 'Consultation', desc: 'Site inspection & requirements' },
    { step: '02', title: '3D Design', desc: 'Architectural & 3D renders' },
    { step: '03', title: 'BOQ & Permit', desc: 'Transparent BOQ & municipal pass' },
    { step: '04', title: 'Construction', desc: 'RCC execution & lab testing' },
    { step: '05', title: 'Handover', desc: 'Finishing & key handover' },
  ];

  workflowSteps.forEach((stp, sIdx) => {
    const stpX = 40 + sIdx * 105;
    page3.drawRectangle({
      x: stpX,
      y: yPos - 60,
      width: 98,
      height: 60,
      color: bgLight,
      borderColor: cardBorder,
      borderWidth: 1,
    });
    page3.drawText(stp.step, {
      x: stpX + 8,
      y: yPos - 20,
      size: 14,
      font: fontBold,
      color: orange,
    });
    page3.drawText(stp.title, {
      x: stpX + 8,
      y: yPos - 34,
      size: 8,
      font: fontBold,
      color: navy,
    });
    page3.drawText(stp.desc.slice(0, 18), {
      x: stpX + 8,
      y: yPos - 45,
      size: 7,
      font: fontRegular,
      color: slateDark,
    });
    page3.drawText(stp.desc.slice(18), {
      x: stpX + 8,
      y: yPos - 54,
      size: 7,
      font: fontRegular,
      color: slateMuted,
    });
  });

  drawPageFooter(page3, 4, 6);

  // =============================================================
  // PAGE 4: FEATURED PROJECTS WITH EMBEDDED REAL PHOTOS
  // =============================================================
  const page4 = doc.addPage([W, H]);
  drawPageHeader(page4, 'Featured Projects Portfolio', 'A Selection of Landmark Developments Across Nepal (With Photos)');

  yPos = H - 105;

  page4.drawText('SIGNATURE RESIDENTIAL & COMMERCIAL PROJECTS', {
    x: 40,
    y: yPos,
    size: 11,
    font: fontBold,
    color: navy,
  });
  page4.drawLine({
    start: { x: 40, y: yPos - 4 },
    end: { x: 310, y: yPos - 4 },
    thickness: 2,
    color: orange,
  });

  yPos -= 20;

  const projectCards = [
    {
      category: 'Commercial',
      name: 'Commercial & Business Complex',
      loc: 'Kathmandu Valley',
      cost: 'Turnkey Contract',
      area: '3.5-Storey Commercial & Retail',
      type: 'Commercial & Residential',
      status: 'Completed',
      imgKey: 'p14',
    },
    {
      category: 'Residential',
      name: 'Jay Kishor Mahato Residential',
      loc: 'Chitwan, Nepal',
      cost: 'Rs 1 Cr 10 Lakhs',
      area: '1690 sq ft (1300 sq ft Plinth)',
      type: '2.5-Storey Residential Residence',
      status: 'Completed',
      imgKey: 'p6',
    },
    {
      category: 'Residential',
      name: 'Dr. Sakil Residential Villa',
      loc: 'Janakpur, Nepal',
      cost: 'Rs 1.50 Crore',
      area: '1966 sq ft Built-up Area',
      type: 'Luxury Contemporary Bungalow',
      status: 'Completed',
      imgKey: 'p7',
    },
    {
      category: 'Residential',
      name: 'Budhanilkantha Luxury Residence',
      loc: 'Budhanilkantha, Kathmandu',
      cost: 'Rs 1 Cr 20 Lakhs',
      area: '1100 sq ft Plinth (26 ft Face)',
      type: 'Contemporary RCC Villa',
      status: 'Completed',
      imgKey: 'p11',
    },
    {
      category: 'Residential',
      name: 'Neo-Classical Palatial Residence',
      loc: 'Kathmandu Valley',
      cost: 'Turnkey Contract',
      area: '3.5 Storeys Grand Built-up',
      type: 'Neo-Classical Mansion',
      status: 'Completed',
      imgKey: 'p12',
    },
    {
      category: 'Residential',
      name: 'Cottage Villa with Traditional Roofs',
      loc: 'Kathmandu Valley Outskirts',
      cost: 'Turnkey Contract',
      area: '2 Storeys Custom Floorplan',
      type: 'Heritage Contemporary Fusion',
      status: 'Completed',
      imgKey: 'p13',
    },
  ];

  const cardW = 250;
  const cardH = 208;
  const imgBoxH = 135; // 240 x 135 = exact 16:9 ratio, zero distortion
  const rowGap = 10;

  projectCards.forEach((proj, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const px = 40 + col * 265;
    const py = yPos - row * (cardH + rowGap);

    // Card Frame
    page4.drawRectangle({
      x: px,
      y: py - cardH,
      width: cardW,
      height: cardH,
      color: white,
      borderColor: cardBorder,
      borderWidth: 1,
    });

    // Embed REAL Project Photo (Height 135pt, Proportional 16:9, ZERO distortion)
    const pImg = projImgs[proj.imgKey];
    drawProportionalImage(page4, pImg, px + 5, py - imgBoxH - 5, 240, imgBoxH, rgb(241/255, 245/255, 249/255));

    // Category Pill on Photo (top-left, replaces old project number badges)
    const catText = proj.category.toUpperCase();
    const catWidth = catText === 'COMMERCIAL' ? 68 : 64;
    page4.drawRectangle({
      x: px + 10,
      y: py - 24,
      width: catWidth,
      height: 15,
      color: black,
    });
    page4.drawText(catText, {
      x: px + 15,
      y: py - 20,
      size: 7,
      font: fontBold,
      color: white,
    });

    // Status Pill on Photo (top-right)
    page4.drawRectangle({
      x: px + 182,
      y: py - 24,
      width: 58,
      height: 15,
      color: orange,
    });
    page4.drawText(proj.status.toUpperCase(), {
      x: px + 188,
      y: py - 20,
      size: 7,
      font: fontBold,
      color: white,
    });

    // Project Name Under Image
    const pTitleSize = proj.name.length > 28 ? 8 : 8.5;
    page4.drawText(proj.name, {
      x: px + 8,
      y: py - 149,
      size: pTitleSize,
      font: fontBold,
      color: navy,
    });

    // Specs
    const pSpecs = [
      { k: 'Location:', v: proj.loc },
      { k: 'Building Type:', v: proj.type },
      { k: 'Scale & Area:', v: proj.area },
      { k: 'Project Cost:', v: proj.cost },
    ];

    pSpecs.forEach((sp, sIdx) => {
      page4.drawText(sp.k, {
        x: px + 8,
        y: py - 161 - (sIdx * 11),
        size: 7.2,
        font: fontBold,
        color: slateDark,
      });
      page4.drawText(sp.v.slice(0, 32), {
        x: px + 75,
        y: py - 161 - (sIdx * 11),
        size: 7.2,
        font: fontRegular,
        color: dark,
      });
    });

    // Bottom Verification
    page4.drawLine({
      start: { x: px + 8, y: py - 198 },
      end: { x: px + 242, y: py - 198 },
      thickness: 0.5,
      color: cardBorder,
    });
    page4.drawText('NBC 105:2020 Compliant • Full Turnkey Execution', {
      x: px + 8,
      y: py - 206,
      size: 6.8,
      font: fontItalic,
      color: slateMuted,
    });
  });

  drawPageFooter(page4, 5, 6);

  // =============================================================
  // PAGE 6: LEADERSHIP WITH REAL EMBEDDED PHOTOS & STATUTORY ACCREDITATION
  // =============================================================
  const page5 = doc.addPage([W, H]);
  drawPageHeader(page5, 'Technical Leadership & Accreditation', 'Licensed Engineers, Legal Registration & Corporate Offices');

  yPos = H - 105;

  // Key Team Members Grid (10 members with embedded photos + coordinator)
  page5.drawText('KEY ENGINEERING & LEADERSHIP TEAM', {
    x: 40,
    y: yPos,
    size: 11,
    font: fontBold,
    color: navy,
  });
  page5.drawLine({
    start: { x: 40, y: yPos - 4 },
    end: { x: 260, y: yPos - 4 },
    thickness: 2,
    color: orange,
  });

  yPos -= 20;

  const teamList = [
    { name: 'Er. Sujit Shah', role: 'Managing Director & CEO', img: mdImg, dept: 'Executive & Civil Engineering' },
    { name: 'Er. Mukesh Adhikari', role: 'General Manager', img: teamImgs.mukesh, dept: 'Operations & Procurement' },
    { name: 'Er. Amar Singh', role: 'Chief Architect', img: teamImgs.amar, dept: 'Architectural Design' },
    { name: 'Er. Rahul Kumar Purbey', role: 'Site Engineer', img: teamImgs.rahul, dept: 'Site & Quality Supervision' },
    { name: 'Er. Aakash Mandal', role: 'Civil Engineer', img: teamImgs.aakash, dept: 'Structural Analysis & NBC' },
    { name: 'Priyanka Kumari Chaudhary', role: 'Assistant Architect', img: teamImgs.priyanka, dept: 'CAD & 3D Modeling' },
    { name: 'Bijaya Rasaili', role: 'Assistant Architect', img: teamImgs.bijaya, dept: 'Spatial Planning' },
    { name: 'Tanu Kumari Shah', role: 'Assistant Architect', img: teamImgs.tanu, dept: 'Interior & Detailing' },
    { name: 'Ritesh Shah', role: 'Marketing Head', img: teamImgs.ritesh, dept: 'Client Relations' },
    { name: 'Ajay Kumar Sah', role: 'Co-ordinator', img: null, dept: 'Municipal & Permit Liaison' },
  ];

  const tCardH = 44;
  const tGap = 6;
  teamList.forEach((tm, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const tx = 40 + col * 265;
    const ty = yPos - row * (tCardH + tGap);

    page5.drawRectangle({
      x: tx,
      y: ty - tCardH,
      width: 250,
      height: tCardH,
      color: bgLight,
      borderColor: cardBorder,
      borderWidth: 1,
    });

    // Embed Team Member Photo
    const photoBox = { x: tx + 6, y: ty - tCardH + 4, width: 32, height: 36 };
    page5.drawRectangle({
      x: photoBox.x,
      y: photoBox.y,
      width: photoBox.width,
      height: photoBox.height,
      color: navy,
    });

    if (tm.img) {
      drawProportionalImage(page5, tm.img, photoBox.x, photoBox.y, photoBox.width, photoBox.height, navy);
    } else {
      const inits = tm.name.split(' ').map(n => n[0]).join('').slice(0, 2);
      page5.drawText(inits, {
        x: photoBox.x + 8,
        y: photoBox.y + 12,
        size: 10,
        font: fontBold,
        color: white,
      });
    }

    page5.drawText(tm.name.slice(0, 28), {
      x: tx + 44,
      y: ty - 18,
      size: 8.5,
      font: fontBold,
      color: navy,
    });
    page5.drawText(`${tm.role} • ${tm.dept}`, {
      x: tx + 44,
      y: ty - 32,
      size: 7,
      font: fontRegular,
      color: slateDark,
    });
  });

  yPos -= (5 * (tCardH + tGap) + 15);

  // Statutory Accreditation & Legal Compliance
  page5.drawText('STATUTORY REGISTRATION & ACCREDITATION', {
    x: 40,
    y: yPos,
    size: 10.5,
    font: fontBold,
    color: navy,
  });
  page5.drawLine({
    start: { x: 40, y: yPos - 4 },
    end: { x: 285, y: yPos - 4 },
    thickness: 2,
    color: orange,
  });

  yPos -= 18;

  const legalCreds = [
    { title: 'Company Name', val: 'Amulya Builders Pvt. Ltd.' },
    { title: 'Governance', val: 'Nepal Engineering Council (NEC)' },
    { title: 'Experience', val: '9+ Years Active Excellence' },
    { title: 'Seismic Standard', val: 'NBC 105:2020 (Zone V Compliant)' },
    { title: 'PAN / VAT ID', val: '619774758 (Inland Revenue)' },
    { title: 'Turnkey Scope', val: 'Inside & Outside Valley Across Nepal' },
  ];

  legalCreds.forEach((cred, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const cx = 40 + col * 265;
    const cy = yPos - row * 20;

    page5.drawText(`• ${cred.title}:`, {
      x: cx,
      y: cy - 10,
      size: 7.5,
      font: fontBold,
      color: slateDark,
    });
    page5.drawText(cred.val, {
      x: cx + 85,
      y: cy - 10,
      size: 7.5,
      font: fontRegular,
      color: dark,
    });
  });

  yPos -= 70;

  // Final Contact & Branch Information Box
  page5.drawRectangle({
    x: 40,
    y: yPos - 95,
    width: W - 80,
    height: 95,
    color: navy,
  });
  page5.drawRectangle({
    x: 40,
    y: yPos - 95,
    width: 5,
    height: 95,
    color: orange,
  });

  page5.drawText('CONNECT WITH US FOR YOUR NEXT DESIGN & BUILD PROJECT', {
    x: 55,
    y: yPos - 18,
    size: 10,
    font: fontBold,
    color: orange,
  });

  page5.drawText('Head Office: Sabaila-8, Dhanusha, Nepal', {
    x: 55,
    y: yPos - 34,
    size: 8,
    font: fontRegular,
    color: white,
  });
  page5.drawText('Branch Office: Tikathali, Lalitpur, Nepal (Opposite of Pawan Prakriti School)', {
    x: 55,
    y: yPos - 46,
    size: 8,
    font: fontRegular,
    color: white,
  });
  page5.drawText('Landline: +977 15925062 | Mobile & WhatsApp: +977 9810357535', {
    x: 55,
    y: yPos - 58,
    size: 8,
    font: fontRegular,
    color: white,
  });
  page5.drawText('Official Email: abt4nepal@gmail.com | Website: https://amulyabuilders.com.np', {
    x: 55,
    y: yPos - 70,
    size: 8,
    font: fontRegular,
    color: rgb(203/255, 213/255, 225/255),
  });
  page5.drawText('Business Hours: Sunday – Friday, 10:00 AM – 6:00 PM (Consultations by Appointment)', {
    x: 55,
    y: yPos - 82,
    size: 7.5,
    font: fontItalic,
    color: rgb(148/255, 163/255, 184/255),
  });

  drawPageFooter(page5, 6, 6);

  // Save PDF to public & dist
  const pdfBytes = await doc.save();
  const outputPath = path.join(rootDir, 'public', 'Amulya-Builders-Company-Profile.pdf');
  fs.writeFileSync(outputPath, pdfBytes);
  console.log(`Successfully generated PDF with real images at: ${outputPath} (${pdfBytes.length} bytes)`);

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
