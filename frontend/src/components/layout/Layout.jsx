import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import MobileStickyBar from './MobileStickyBar';

const Layout = () => (
  <div className="min-h-screen bg-nova-bg text-nova-text">
    <Navbar />
    <main>
      <Outlet />
    </main>
    <Footer />
    <MobileStickyBar />
  </div>
);

export default Layout;
