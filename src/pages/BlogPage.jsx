import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, BookOpen, Search } from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import { staggerContainer, scaleIn, fadeUp, viewportOnce } from '@/utils/animations';
import { api } from '@/services/api';
import { COMPANY } from '@/data';

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function loadBlogs() {
      try {
        const data = await api.getBlogs();
        setBlogs(data || []);
      } catch (err) {
        console.error('Failed to load blog posts:', err);
      } finally {
        setLoading(false);
      }
    }
    loadBlogs();
  }, []);

  const filteredBlogs = blogs.filter(b => 
    b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.summary.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Helmet>
        <title>Engineering & Building Blog | {COMPANY.name} — Kathmandu, Nepal</title>
        <meta
          name="description"
          content="Read construction tips, structural engineering guidelines, house cost estimates, and architecture trends in Nepal from the experts at Amulya Builders."
        />
        <link rel="canonical" href="https://amulyabuilders.com.np/blog" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://amulyabuilders.com.np/blog" />
        <meta property="og:title" content={`Engineering & Building Blog | ${COMPANY.name} — Kathmandu, Nepal`} />
        <meta property="og:description" content="Read construction tips, structural engineering guidelines, house cost estimates, and architecture trends in Nepal from the experts at Amulya Builders." />
        <meta property="og:image" content="https://amulyabuilders.com.np/amulyalogo1.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://amulyabuilders.com.np/blog" />
        <meta name="twitter:title" content={`Engineering & Building Blog | ${COMPANY.name} — Kathmandu, Nepal`} />
        <meta name="twitter:description" content="Read construction tips, structural engineering guidelines, house cost estimates, and architecture trends in Nepal from the experts at Amulya Builders." />
        <meta name="twitter:image" content="https://amulyabuilders.com.np/amulyalogo1.png" />
      </Helmet>

      {/* Page Hero */}
      <section
        className="relative pt-28 pb-16 md:pt-36 md:pb-20 bg-gradient-to-br from-[#012352] via-[#02336e] to-[#011738] text-white overflow-hidden border-b border-white/10"
        aria-label="Blog page header"
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#cd0102] to-transparent z-10 opacity-80" />
        <img
          src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&q=80"
          alt="Engineering blueprints and workspace"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
          loading="eager"
        />
        <div className="relative z-10 container-custom text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="section-label justify-center"
          >
            <span className="w-5 h-0.5 bg-orange-400" /> Articles & Advice
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
            className="text-3xl md:text-5xl font-extrabold mt-2 mb-4"
          >
            Our Construction & Engineering Blog
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="text-gray-300 max-w-xl mx-auto text-base md:text-lg"
          >
            Expert guides, cost tips, regulatory updates, and architectural inspiration for building in Nepal.
          </motion.p>
        </div>
      </section>

      {/* Blog Listing Grid */}
      <section className="section-padding bg-gray-50" aria-label="Blog posts list">
        <div className="container-custom">
          
          {/* Search bar */}
          <div className="max-w-md mx-auto mb-12 relative">
            <Search className="absolute left-4 top-3.5 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search articles..."
              className="w-full bg-white border border-gray-200 pl-11 pr-4 py-3 rounded-2xl text-xs font-semibold focus:outline-none focus:border-blue-800 shadow-sm"
            />
          </div>

          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center gap-3">
              <div className="w-10 h-10 border-4 border-blue-800 border-t-orange-500 rounded-full animate-spin" />
              <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Loading articles...</span>
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
              <BookOpen className="w-12 h-12 text-gray-350 mx-auto mb-3" />
              <p className="text-sm text-gray-500 font-bold">No articles found matching your search.</p>
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={staggerContainer}
            >
              {filteredBlogs.map((post) => (
                <motion.article
                  key={post.id}
                  variants={scaleIn}
                  className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1.5 flex flex-col h-full group"
                >
                  {/* Thumbnail */}
                  <Link to={`/blog/${post.id}`} className="relative h-56 block overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </Link>

                  {/* Body Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div className="space-y-3">
                      {/* Meta dates */}
                      <div className="flex items-center gap-4 text-[10px] font-bold text-gray-400 uppercase">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(post.created_at || Date.now()).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="w-3.5 h-3.5" />
                          By Admin
                        </span>
                      </div>

                      {/* Title */}
                      <h2 className="text-base font-extrabold text-gray-900 group-hover:text-blue-800 transition-colors leading-snug">
                        <Link to={`/blog/${post.id}`}>
                          {post.title}
                        </Link>
                      </h2>

                      {/* Summary */}
                      <p className="text-xs text-gray-500 font-medium leading-relaxed line-clamp-3">
                        {post.summary}
                      </p>
                    </div>

                    {/* Footer link */}
                    <div className="pt-5 mt-5 border-t border-gray-50">
                      <Link
                        to={`/blog/${post.id}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-500 hover:text-orange-600 group/link"
                      >
                        Read Full Article
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          )}

        </div>
      </section>
    </>
  );
}
