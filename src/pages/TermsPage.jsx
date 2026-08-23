import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { COMPANY } from '@/data';
import { fadeUp } from '@/utils/animations';

export default function TermsPage() {
  return (
    <>
      <Helmet>
        <title>Terms of Service | {COMPANY.name}</title>
      </Helmet>
      <div className="min-h-screen bg-white pt-28 pb-20">
        <div className="container-custom max-w-3xl">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <Link to="/" className="text-sm text-orange-500 hover:underline mb-6 inline-block">← Back to Home</Link>
            <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Terms of Service</h1>
            <p className="text-gray-500 text-sm mb-8">Last updated: {new Date().getFullYear()}</p>
            <div className="prose prose-gray max-w-none text-gray-600 space-y-5">
              <p>By accessing the {COMPANY.name} website, you agree to comply with and be bound by these Terms of Service. If you disagree with any part, you may not access this website.</p>
              <h2 className="text-lg font-bold text-gray-900">Website Use</h2>
              <p>This website is for informational purposes only. Content provided does not constitute a binding contract or quote. All project agreements are formalized through separate written contracts.</p>
              <h2 className="text-lg font-bold text-gray-900">Intellectual Property</h2>
              <p>All content on this site — text, images, logos, and design — is the property of {COMPANY.name}. Unauthorized reproduction is prohibited.</p>
              <h2 className="text-lg font-bold text-gray-900">Contact</h2>
              <p>Questions about these terms? Contact us at <a href={`mailto:${COMPANY.email}`} className="text-orange-500 hover:underline">{COMPANY.email}</a>.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
