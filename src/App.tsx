/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { VideoBackground } from './components/VideoBackground';
import { FrameBackground } from './components/FrameBackground';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';

function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

function DynamicBackground() {
  const { pathname } = useLocation();

  if (pathname === '/about') {
    return (
      <VideoBackground
        src="/about.mp4"
      />
    );
  }

  return <FrameBackground key="home" />;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="relative min-h-screen text-gray-900 font-sans overflow-x-hidden">
        <DynamicBackground />
        
        <div className="relative z-50 pointer-events-none">
          <Navbar />
        </div>

        <MaskedContent>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
          </Routes>
          
          <Footer />
        </MaskedContent>
      </div>
    </BrowserRouter>
  );
}

function MaskedContent({ children }: { children: React.ReactNode }) {
  const maskRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();
  const isAbout = pathname === '/about';

  useEffect(() => {
    let ticking = false;
    const updateMask = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (maskRef.current && !isAbout) {
            const y = window.scrollY;
            maskRef.current.style.webkitMaskPosition = `0px ${y}px`;
            maskRef.current.style.maskPosition = `0px ${y}px`;
          }
        });
        ticking = true;
      }
      requestAnimationFrame(() => { ticking = false; });
    };
    
    window.addEventListener('scroll', updateMask, { passive: true });
    window.addEventListener('resize', updateMask, { passive: true });
    updateMask();
    
    return () => {
      window.removeEventListener('scroll', updateMask);
      window.removeEventListener('resize', updateMask);
    };
  }, [isAbout]);

  return (
    <div 
      ref={maskRef}
      className={`relative z-10 ${isAbout ? '' : 'pointer-events-none'}`}
      style={isAbout ? {} : {
        WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 50%, transparent 90%, transparent 100%)',
        WebkitMaskSize: '100% 100vh',
        WebkitMaskRepeat: 'no-repeat',
        maskImage: 'linear-gradient(to bottom, black 0%, black 50%, transparent 90%, transparent 100%)',
        maskSize: '100% 100vh',
        maskRepeat: 'no-repeat',
      }}
    >
      <div className="pointer-events-auto">
        {children}
      </div>
    </div>
  );
}
