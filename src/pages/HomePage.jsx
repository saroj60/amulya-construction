import { Helmet } from 'react-helmet-async';
import Hero from '../components/home/Hero';
import StatsSection from '../components/home/StatsSection';
import AboutPreview from '../components/home/AboutPreview';
import ServicesPreview from '../components/home/ServicesPreview';
import FeaturedProjects from '../components/home/FeaturedProjects';
import ProcessSection from '../components/home/ProcessSection';
import Testimonials from '../components/home/Testimonials';
import CTABanner from '../components/home/CTABanner';
import { COMPANY } from '@/data';

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>Nepal's Most Trusted Construction & Design Company | {COMPANY.name}</title>
        <meta
          name="description"
          content="Amulya Builders is Nepal's most trusted design and construction company providing turnkey house construction, 3D architectural design, and commercial building services inside and outside Kathmandu Valley across Nepal."
        />
        <meta
          name="keywords"
          content="construction company Nepal, construction company Kathmandu, best construction company Nepal, building construction Nepal, house construction Nepal, construction contractor Nepal, civil construction company Nepal, civil engineering Nepal, building contractor Kathmandu, residential construction Nepal, commercial construction Nepal, house construction Kathmandu, construction services Nepal, turnkey construction Nepal, building design Nepal, construction project management Nepal, home construction company Nepal, renovation company Kathmandu, general contractor Nepal, Construction Company in Nepal, Construction Company in Kathmandu, Best Construction Company in Nepal, Best Construction Company in Kathmandu, Building Construction Company Nepal, Building Contractor in Nepal, Construction Contractor in Kathmandu, Civil Construction Company Nepal, Civil Engineering Company Nepal, Construction Services Nepal, Home Construction Company Nepal, Building Design and Construction Nepal, Turnkey Construction Nepal, General Contractor Nepal, Construction Project Management Nepal, Structural Design Nepal, Civil Engineering Services Nepal, Renovation Services Nepal, Building Renovation Kathmandu, Construction Company Lalitpur, Construction Company Bhaktapur, Construction Company Pokhara, Construction Company Biratnagar, Construction Company Chitwan, Construction Company Butwal, Construction Company Dharan, Best house construction company in Kathmandu, Affordable construction company in Nepal, Reliable construction contractor in Kathmandu, Residential building contractor Nepal, Commercial building contractor Kathmandu, House construction cost in Nepal, House construction company near me, Building construction services in Kathmandu, Turnkey house construction in Nepal, Modern house construction company Nepal"
        />
        <link rel="canonical" href="https://amulyabuilders.com.np/" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://amulyabuilders.com.np/" />
        <meta property="og:title" content={`Nepal's Most Trusted Construction & Design Company | ${COMPANY.name}`} />
        <meta property="og:description" content="Amulya Builders is Nepal's most trusted design and construction company providing turnkey house construction, 3D architectural design, and commercial building services inside and outside Kathmandu Valley across Nepal." />
        <meta property="og:image" content="https://amulyabuilders.com.np/amulyalogo1.png" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://amulyabuilders.com.np/" />
        <meta name="twitter:title" content={`Nepal's Most Trusted Construction & Design Company | ${COMPANY.name}`} />
        <meta name="twitter:description" content="Amulya Builders is Nepal's most trusted design and construction company providing turnkey house construction, 3D architectural design, and commercial building services inside and outside Kathmandu Valley across Nepal." />
        <meta name="twitter:image" content="https://amulyabuilders.com.np/amulyalogo1.png" />
      </Helmet>

      <Hero />
      <StatsSection />
      <AboutPreview />
      <ServicesPreview />
      <FeaturedProjects />
      <ProcessSection />
      <Testimonials />
      <CTABanner />
    </>
  );
}
