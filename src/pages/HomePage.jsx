import { Helmet } from 'react-helmet-async';
import Hero from '../components/home/Hero';
import StatsSection from '../components/home/StatsSection';
import AboutPreview from '../components/home/AboutPreview';
import ServicesPreview from '../components/home/ServicesPreview';
import FeaturedProjects from '../components/home/FeaturedProjects';
import WhyChooseUs from '../components/home/WhyChooseUs';
import ProcessSection from '../components/home/ProcessSection';
import Testimonials from '../components/home/Testimonials';
import CTABanner from '../components/home/CTABanner';
import { COMPANY } from '@/data';

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>Best Construction Company in Kathmandu, Nepal | {COMPANY.name}</title>
        <meta
          name="description"
          content="Amulya Builders is the best construction company in Kathmandu & Lalitpur, Nepal. We provide turnkey house construction, civil engineering, commercial building construction, and modern architectural design services."
        />
        <meta
          name="keywords"
          content="construction company Nepal, construction company Kathmandu, best construction company Nepal, building construction Nepal, house construction Nepal, construction contractor Nepal, civil construction company Nepal, civil engineering Nepal, building contractor Kathmandu, residential construction Nepal, commercial construction Nepal, house construction Kathmandu, construction services Nepal, turnkey construction Nepal, building design Nepal, construction project management Nepal, home construction company Nepal, renovation company Kathmandu, general contractor Nepal, Construction Company in Nepal, Construction Company in Kathmandu, Best Construction Company in Nepal, Best Construction Company in Kathmandu, Building Construction Company Nepal, Building Contractor in Nepal, Construction Contractor in Kathmandu, Civil Construction Company Nepal, Civil Engineering Company Nepal, Construction Services Nepal, Home Construction Company Nepal, Building Design and Construction Nepal, Turnkey Construction Nepal, General Contractor Nepal, Construction Project Management Nepal, Structural Design Nepal, Civil Engineering Services Nepal, Renovation Services Nepal, Building Renovation Kathmandu, Construction Company Lalitpur, Construction Company Bhaktapur, Construction Company Pokhara, Construction Company Biratnagar, Construction Company Chitwan, Construction Company Butwal, Construction Company Dharan, Best house construction company in Kathmandu, Affordable construction company in Nepal, Reliable construction contractor in Kathmandu, Residential building contractor Nepal, Commercial building contractor Kathmandu, House construction cost in Nepal, House construction company near me, Building construction services in Kathmandu, Turnkey house construction in Nepal, Modern house construction company Nepal"
        />
        <link rel="canonical" href="https://amulyabuilders.com.np/" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://amulyabuilders.com.np/" />
        <meta property="og:title" content={`Best Construction Company in Kathmandu, Nepal | ${COMPANY.name}`} />
        <meta property="og:description" content="Amulya Builders is the best construction company in Kathmandu & Lalitpur, Nepal. We provide turnkey house construction, civil engineering, commercial building construction, and modern architectural design services." />
        <meta property="og:image" content="https://amulyabuilders.com.np/amulyalogo.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://amulyabuilders.com.np/" />
        <meta name="twitter:title" content={`Best Construction Company in Kathmandu, Nepal | ${COMPANY.name}`} />
        <meta name="twitter:description" content="Amulya Builders is the best construction company in Kathmandu & Lalitpur, Nepal. We provide turnkey house construction, civil engineering, commercial building construction, and modern architectural design services." />
        <meta name="twitter:image" content="https://amulyabuilders.com.np/amulyalogo.png" />
      </Helmet>

      <Hero />
      <StatsSection />
      <AboutPreview />
      <ServicesPreview />
      <FeaturedProjects />
      <WhyChooseUs />
      <ProcessSection />
      <Testimonials />
      <CTABanner />
    </>
  );
}
