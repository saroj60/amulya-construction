import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, User, BookOpen } from 'lucide-react';
import { api } from '@/services/api';
import { COMPANY } from '@/data';

export default function BlogDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBlog() {
      try {
        const data = await api.getBlog(id);
        if (data) {
          setBlog(data);
        } else {
          navigate('/blog');
        }
      } catch (err) {
        console.error('Failed to load blog article:', err);
        navigate('/blog');
      } finally {
        setLoading(false);
      }
    }
    loadBlog();
  }, [id, navigate]);

  function renderContent(contentText) {
    if (!contentText) return null;
    return contentText.split('\n\n').map((block, idx) => {
      const trimmedBlock = block.trim();
      if (trimmedBlock.startsWith('### ')) {
        return (
          <h3 key={idx} className="text-base md:text-lg font-bold text-gray-900 mt-6 mb-3">
            {trimmedBlock.replace('### ', '')}
          </h3>
        );
      }
      if (trimmedBlock.startsWith('## ')) {
        return (
          <h2 key={idx} className="text-lg md:text-xl font-extrabold text-gray-900 mt-8 mb-4 border-b border-gray-100 pb-2">
            {trimmedBlock.replace('## ', '')}
          </h2>
        );
      }
      if (trimmedBlock.startsWith('- ')) {
        const items = trimmedBlock.split('\n').map(item => item.replace('- ', '').trim());
        return (
          <ul key={idx} className="list-disc pl-5 my-4 space-y-2 text-xs md:text-sm text-gray-700 leading-relaxed font-semibold">
            {items.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        );
      }
      return (
        <p key={idx} className="text-xs md:text-sm text-gray-650 leading-relaxed font-medium mb-4 whitespace-pre-line">
          {trimmedBlock}
        </p>
      );
    });
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-blue-800 border-t-orange-500 rounded-full animate-spin" />
          <span className="text-sm text-gray-400 font-medium">Loading article...</span>
        </div>
      </div>
    );
  }

  if (!blog) return null;

  return (
    <>
      <Helmet>
        <title>{blog.title} | {COMPANY.name} — Blog</title>
        <meta name="description" content={blog.summary} />
        <link rel="canonical" href={`https://amulyabuilders.com.np/blog/${blog.id}`} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://amulyabuilders.com.np/blog/${blog.id}`} />
        <meta property="og:title" content={`${blog.title} | ${COMPANY.name}`} />
        <meta property="og:description" content={blog.summary} />
        <meta property="og:image" content={blog.image} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={`https://amulyabuilders.com.np/blog/${blog.id}`} />
        <meta name="twitter:title" content={`${blog.title} | ${COMPANY.name}`} />
        <meta name="twitter:description" content={blog.summary} />
        <meta name="twitter:image" content={blog.image} />
      </Helmet>

      <article className="min-h-screen bg-white pt-24 pb-20 font-sans" aria-label="Blog post detail">
        {/* Back Link Header */}
        <div className="container-custom py-4 border-b border-gray-100">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-orange-500 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Articles
          </Link>
        </div>

        <div className="container-custom max-w-4xl mt-8">
          {/* Post Meta */}
          <div className="space-y-4">
            <div className="flex items-center gap-4 text-[10px] md:text-xs font-bold text-gray-400 uppercase">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {new Date(blog.created_at || Date.now()).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                By Admin
              </span>
            </div>

            <h1 className="text-2xl md:text-4xl font-extrabold text-gray-950 leading-tight">
              {blog.title}
            </h1>

            <p className="text-xs md:text-sm text-gray-500 italic font-semibold border-l-4 border-orange-400 pl-4 leading-relaxed">
              {blog.summary}
            </p>
          </div>

          {/* Featured Image */}
          <div className="my-8 rounded-3xl overflow-hidden shadow-md max-h-[460px]">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>

          {/* Post Content */}
          <div className="prose max-w-none prose-gray">
            {renderContent(blog.content)}
          </div>

          {/* Footer CTA */}
          <div className="mt-16 p-8 bg-blue-50 border border-blue-100 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1.5">
              <h3 className="text-base font-extrabold text-blue-900">Planning a Construction Project?</h3>
              <p className="text-xs text-blue-805 font-medium">Let our expert engineers evaluate your design and safety needs.</p>
            </div>
            <Link to="/contact" className="btn-primary text-xs self-start md:self-auto py-3 px-6 shadow-sm">
              Contact Us Today
            </Link>
          </div>

        </div>
      </article>
    </>
  );
}
