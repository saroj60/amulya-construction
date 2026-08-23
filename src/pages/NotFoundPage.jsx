import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, HardHat } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        <div className="w-20 h-20 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <HardHat className="w-10 h-10 text-orange-500" aria-hidden="true" />
        </div>
        <h1 className="text-7xl font-extrabold text-gray-900 mb-3">404</h1>
        <h2 className="text-2xl font-bold text-gray-700 mb-3">Page Not Found</h2>
        <p className="text-gray-500 mb-8">
          Looks like this page is still under construction. Let's head back to the homepage.
        </p>
        <Link to="/" className="btn-primary justify-center inline-flex">
          <Home className="w-4 h-4" aria-hidden="true" />
          Back to Homepage
        </Link>
      </motion.div>
    </div>
  );
}
