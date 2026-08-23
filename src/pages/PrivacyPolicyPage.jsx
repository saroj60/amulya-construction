import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { COMPANY } from '@/data';
import { fadeUp } from '@/utils/animations';

export default function PrivacyPolicyPage() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | {COMPANY.name}</title>
      </Helmet>
      <div className="min-h-screen bg-white pt-28 pb-20">
        <div className="container-custom max-w-3xl">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <Link to="/" className="text-sm text-orange-500 hover:underline mb-6 inline-block">← Back to Home</Link>
            <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Privacy Policy</h1>
            <p className="text-gray-500 text-sm mb-8">Last updated: {new Date().getFullYear()}</p>
            <div className="prose prose-gray max-w-none text-gray-600 space-y-5">
              <p>{COMPANY.name} (&quot;we&quot;, &quot;us&quot;) is committed to protecting your personal information. This Privacy Policy explains how we collect, use, and protect your data when you visit our website or contact us.</p>
              <h2 className="text-lg font-bold text-gray-900">Information We Collect</h2>
              <p>We may collect your name, phone number, email address, and project details when you submit our contact form or reach out to us directly. We do not collect payment information through this website.</p>
              <h2 className="text-lg font-bold text-gray-900">How We Use Your Information</h2>
              <p>We use your information solely to respond to your inquiries, provide quotes, and communicate about your construction project. We do not sell or share your information with third parties.</p>
              <h2 className="text-lg font-bold text-gray-900">Contact</h2>
              <p>For privacy concerns, contact us at <a href={`mailto:${COMPANY.email}`} className="text-orange-500 hover:underline">{COMPANY.email}</a>.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
