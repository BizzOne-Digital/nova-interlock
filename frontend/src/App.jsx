import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/admin/ProtectedRoute';
import AdminLayout from './components/admin/AdminLayout';
import ScrollToTop from './components/common/ScrollToTop';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Products = lazy(() => import('./pages/Products'));
const Projects = lazy(() => import('./pages/Projects'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

const AdminLogin = lazy(() => import('./admin/AdminLogin'));
const Dashboard = lazy(() => import('./admin/Dashboard'));
const ManageLeads = lazy(() => import('./admin/ManageLeads'));
const ManageServices = lazy(() => import('./admin/ManageServices'));
const ManageProjects = lazy(() => import('./admin/ManageProjects'));
const ManageGallery = lazy(() => import('./admin/ManageGallery'));
const ManageProducts = lazy(() => import('./admin/ManageProducts'));
const ManageTestimonials = lazy(() => import('./admin/ManageTestimonials'));
const ManageContent = lazy(() => import('./admin/ManageContent'));
const Settings = lazy(() => import('./admin/Settings'));

const PageFallback = () => (
  <div className="flex min-h-screen items-center justify-center bg-nova-bg text-nova-text-secondary">
    Loading...
  </div>
);

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: { background: '#171A1C', color: '#F5F3EF', border: '1px solid rgba(203,165,106,0.25)' },
        }}
      />
      <ScrollToTop />
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/products" element={<Products />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          <Route path="/admin/login" element={<AdminLogin />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="leads" element={<ManageLeads />} />
              <Route path="services" element={<ManageServices />} />
              <Route path="projects" element={<ManageProjects />} />
              <Route path="gallery" element={<ManageGallery />} />
              <Route path="products" element={<ManageProducts />} />
              <Route path="testimonials" element={<ManageTestimonials />} />
              <Route path="content" element={<ManageContent />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
