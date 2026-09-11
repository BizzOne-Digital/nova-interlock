import { useEffect, useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import MobileStickyBar from './MobileStickyBar';
import ClearanceBanner from './ClearanceBanner';

const Layout = () => {
  const bannerRef = useRef(null);
  const [bannerHeight, setBannerHeight] = useState(0);

  useEffect(() => {
    const el = bannerRef.current;
    if (!el) return;
    const updateHeight = () => setBannerHeight(el.offsetHeight);
    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-nova-bg text-nova-text">
      <ClearanceBanner ref={bannerRef} />
      <Navbar topOffset={bannerHeight} />
      <div style={{ height: bannerHeight }} aria-hidden="true" />
      <main>
        <Outlet />
      </main>
      <Footer />
      <MobileStickyBar />
    </div>
  );
};

export default Layout;
