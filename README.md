# Zeta Construction — Website

A modern, fully responsive React frontend website for a construction company based in **Pokhara, Nepal**.

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🔧 Customizing Company Details

All company-specific values are centralized in **one file**:

```
src/data.jsx
```

Open it and replace the placeholder values:

| Placeholder | Replace With |
|---|---|
| `[PHONE NUMBER]` | e.g. `9800000000` |
| `[EMAIL]` | e.g. `info` (before `@zetaconstruction.com.np`) |
| `[WHATSAPP NUMBER]` | e.g. `9800000000` |
| `[ADDRESS]` | e.g. `Lakeside-6, Ward No. 6` |
| `[COMPANY NAME]` placeholders in team | Replace with real names |

Also update the `mapEmbedUrl` with your actual Google Maps embed URL.

---

## 📁 Project Structure

```
src/
├── App.jsx                     # Router with lazy loading
├── main.jsx                    # Entry point
├── index.css                   # Tailwind + global styles
├── data.jsx                    # ⭐ All content data (edit this!)
│
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx          # Sticky responsive navbar
│   │   ├── Footer.jsx          # Footer with WhatsApp bar
│   │   └── Layout.jsx          # Page wrapper + transitions
│   ├── home/
│   │   ├── Hero.jsx            # Full-screen hero
│   │   ├── StatsSection.jsx    # Animated statistics
│   │   ├── AboutPreview.jsx    # About snapshot
│   │   ├── ServicesPreview.jsx # 4 services preview
│   │   ├── FeaturedProjects.jsx# 3 featured projects
│   │   ├── WhyChooseUs.jsx     # 8 feature cards
│   │   ├── ProcessSection.jsx  # Step timeline
│   │   ├── Testimonials.jsx    # Client reviews
│   │   └── CTABanner.jsx       # Quote + WhatsApp CTA
│   └── ui/
│       ├── SectionHeader.jsx   # Reusable section heading
│       ├── StatCounter.jsx     # Animated number counter
│       ├── ProjectCard.jsx     # Project card with hover
│       ├── ServiceCard.jsx     # Service card with icon
│       └── TestimonialCard.jsx # Review card
│
├── pages/
│   ├── HomePage.jsx
│   ├── AboutPage.jsx
│   ├── ServicesPage.jsx
│   ├── ProjectsPage.jsx        # With category filtering
│   ├── ProjectDetailPage.jsx   # With lightbox gallery
│   ├── ContactPage.jsx         # With form validation
│   ├── PrivacyPolicyPage.jsx
│   ├── TermsPage.jsx
│   └── NotFoundPage.jsx
│
└── utils/
    └── animations.jsx          # Framer Motion variants
```

---

## 🌐 Pages & Routes

| Route | Page |
|---|---|
| `/` | Home |
| `/about` | About Us |
| `/services` | Services |
| `/projects` | Projects (with filter) |
| `/projects/:id` | Project Detail |
| `/contact` | Contact |
| `/privacy-policy` | Privacy Policy |
| `/terms` | Terms of Service |

---

## 🎨 Tech Stack

| Tool | Version | Purpose |
|---|---|---|
| React | 19 | UI framework |
| Vite | 8 | Build tool |
| Tailwind CSS | 4 | Styling |
| React Router | 7 | Routing |
| Framer Motion | 13 | Animations |
| Lucide React | 1 | Icons |
| react-helmet-async | 3 | SEO meta tags |

---

## 🔑 Key Features

- ✅ Fully responsive (mobile / tablet / desktop)
- ✅ Sticky navbar — transparent on home hero, solid on scroll
- ✅ Animated mobile hamburger menu
- ✅ Scroll-triggered Framer Motion animations
- ✅ Animated number counters
- ✅ Project filtering by category/status
- ✅ Project detail pages with image lightbox
- ✅ Contact form with full validation + success state
- ✅ WhatsApp integration throughout
- ✅ Google Maps embed on contact page
- ✅ Local Business JSON-LD schema markup
- ✅ Page-level SEO with react-helmet-async
- ✅ Lazy-loaded pages (code splitting)
- ✅ Accessible — ARIA labels, semantic HTML, skip link
- ✅ 404 page

---

## 🚢 Deployment

### Vercel (Recommended)
1. Push project to GitHub
2. Import repo at [vercel.com](https://vercel.com)
3. Framework: **Vite** — Vercel auto-detects it
4. `vercel.json` is already configured for SPA routing

### Netlify
1. Run `npm run build`
2. Drag `dist/` folder to [netlify.com/drop](https://app.netlify.com/drop)
3. `public/_redirects` handles SPA routing automatically

---

## 📸 Adding Real Images

All images are currently loaded from **Unsplash URLs**. To use your own:

1. Replace the `image` and `gallery` URLs in `src/data.jsx`
2. Place local images in `public/images/`
3. Reference as `/images/your-image.jpg`

---

## 📞 Contact & Support

Built for **[COMPANY NAME]** — Pokhara, Nepal  
Replace all `[PLACEHOLDER]` values in `src/data.jsx` before going live.
