import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { lazy, Suspense } from 'react';
import Layout from './components/layout/Layout';

// Lazy-load all pages for code splitting — reduces initial bundle size
const HomePage           = lazy(() => import('./pages/HomePage'));
const AboutPage          = lazy(() => import('./pages/AboutPage'));
const ServicesPage       = lazy(() => import('./pages/ServicesPage'));
const ProjectsPage       = lazy(() => import('./pages/ProjectsPage'));
const ProjectDetailPage  = lazy(() => import('./pages/ProjectDetailPage'));
const ContactPage        = lazy(() => import('./pages/ContactPage'));
const HouseStylesPage    = lazy(() => import('./pages/HouseStylesPage'));
const HouseStyleDetailPage = lazy(() => import('./pages/HouseStyleDetailPage'));
const CostCalculatorPage = lazy(() => import('./pages/CostCalculatorPage'));
const PrivacyPolicyPage  = lazy(() => import('./pages/PrivacyPolicyPage'));
const TermsPage          = lazy(() => import('./pages/TermsPage'));
const NotFoundPage       = lazy(() => import('./pages/NotFoundPage'));
const AdminLogin         = lazy(() => import('./pages/AdminLogin'));
const AdminDashboard     = lazy(() => import('./pages/AdminDashboard'));
const BlogPage           = lazy(() => import('./pages/BlogPage'));
const BlogDetailPage     = lazy(() => import('./pages/BlogDetailPage'));

// Minimal loading fallback — avoids layout shift
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white" aria-label="Loading page">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-blue-800 border-t-orange-500 rounded-full animate-spin" />
        <span className="text-sm text-gray-400 font-medium">Loading…</span>
      </div>
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageLoader />}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: 'about',
        element: (
          <Suspense fallback={<PageLoader />}>
            <AboutPage />
          </Suspense>
        ),
      },
      {
        path: 'services',
        element: (
          <Suspense fallback={<PageLoader />}>
            <ServicesPage />
          </Suspense>
        ),
      },
      {
        path: 'blog',
        element: (
          <Suspense fallback={<PageLoader />}>
            <BlogPage />
          </Suspense>
        ),
      },
      {
        path: 'blog/:id',
        element: (
          <Suspense fallback={<PageLoader />}>
            <BlogDetailPage />
          </Suspense>
        ),
      },
      {
        path: 'projects',
        element: (
          <Suspense fallback={<PageLoader />}>
            <ProjectsPage />
          </Suspense>
        ),
      },
      {
        path: 'projects/:id',
        element: (
          <Suspense fallback={<PageLoader />}>
            <ProjectDetailPage />
          </Suspense>
        ),
      },
      {
        path: 'contact',
        element: (
          <Suspense fallback={<PageLoader />}>
            <ContactPage />
          </Suspense>
        ),
      },
      {
        path: 'designs',
        element: (
          <Suspense fallback={<PageLoader />}>
            <HouseStylesPage />
          </Suspense>
        ),
      },
      {
        path: 'designs/:id',
        element: (
          <Suspense fallback={<PageLoader />}>
            <HouseStyleDetailPage />
          </Suspense>
        ),
      },
      {
        path: 'cost-calculator',
        element: (
          <Suspense fallback={<PageLoader />}>
            <CostCalculatorPage />
          </Suspense>
        ),
      },
      {
        path: 'privacy-policy',
        element: (
          <Suspense fallback={<PageLoader />}>
            <PrivacyPolicyPage />
          </Suspense>
        ),
      },
      {
        path: 'terms',
        element: (
          <Suspense fallback={<PageLoader />}>
            <TermsPage />
          </Suspense>
        ),
      },
      {
        path: 'admin',
        element: (
          <Suspense fallback={<PageLoader />}>
            <AdminDashboard />
          </Suspense>
        ),
      },
      {
        path: 'admin/login',
        element: (
          <Suspense fallback={<PageLoader />}>
            <AdminLogin />
          </Suspense>
        ),
      },
      {
        path: '*',
        element: (
          <Suspense fallback={<PageLoader />}>
            <NotFoundPage />
          </Suspense>
        ),
      },
    ],
  },
]);

export default function App() {
  return (
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  );
}
