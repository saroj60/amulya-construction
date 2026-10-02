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
        <title>Construction Company in Kathmandu, Bhaktapur, Lalitpur, Janakpur & Dhanusha | {COMPANY.name}</title>
        <meta
          name="description"
          content="Amulya Builders is Nepal's most trusted construction company in Kathmandu, Bhaktapur, Lalitpur, Janakpur, and Dhanusha. Specializing in turnkey house construction, modern commercial buildings, 3D architectural design, and NBC seismic-resistant engineering."
        />
        <meta
          name="keywords"
          content="construction company in kathmandu, construction company in bhaktapur, construction company in lalitpur, construction company in janakpur, construction company in dhanusha, best construction company in kathmandu, top construction company in lalitpur, building contractor in bhaktapur, house construction in janakpur, construction contractor in dhanusha, turnkey house construction in nepal, residential construction kathmandu, commercial construction nepal, civil engineering contractor kathmandu valley, civil construction company dhanusha, building design and construction janakpur, affordable construction company kathmandu, modern house builder lalitpur, construction company near me"
        />
        <link rel="canonical" href="https://amulyabuilders.com.np/" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://amulyabuilders.com.np/" />
        <meta property="og:title" content={`Construction Company in Kathmandu, Bhaktapur, Lalitpur, Janakpur & Dhanusha | ${COMPANY.name}`} />
        <meta property="og:description" content="Amulya Builders is Nepal's most trusted construction company in Kathmandu, Bhaktapur, Lalitpur, Janakpur, and Dhanusha. Turnkey house building, commercial construction, and 3D architectural design." />
        <meta property="og:image" content="https://amulyabuilders.com.np/amulyalogo1.png" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://amulyabuilders.com.np/" />
        <meta name="twitter:title" content={`Construction Company in Kathmandu, Bhaktapur, Lalitpur, Janakpur & Dhanusha | ${COMPANY.name}`} />
        <meta name="twitter:description" content="Amulya Builders is Nepal's most trusted construction company in Kathmandu, Bhaktapur, Lalitpur, Janakpur, and Dhanusha. Turnkey house building, commercial construction, and 3D architectural design." />
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
