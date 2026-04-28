import { useState, useEffect, lazy, Suspense, useTransition, useCallback, useRef } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom'
import { gsap } from 'gsap'
import { lenis } from './main'
import { DESIGN_SYSTEM } from './constants'
import { useAssetPreloader } from './hooks/useAssetPreloader'
import './App.css'

// Lazy loaded modules for performance
const CinematicIntro = lazy(() => import('./components/splash/CinematicIntro'))
const InvestorDashboard = lazy(() => import('./components/dashboard/InvestorDashboard'))
const RetailLeasingModule = lazy(() => import('./components/retail/RetailLeasingModule'))
const EventsPlatformModule = lazy(() => import('./components/events/EventsPlatformModule'))
const AttractionsEntertainmentModule = lazy(() => import('./components/attractions/AttractionsEntertainmentModule'))
const LuxuryDiningModule = lazy(() => import('./components/luxury/LuxuryDiningModule'))

/**
 * THE DUBAI MALL | INVESTOR EXPERIENCE
 * Scalable architecture built for modular expansion.
 */


function AppContent() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [_, startTransition] = useTransition();
  const [showIntro, setShowIntro] = useState(true);
  const [isLoading, setIsLoading] = useState(true)
  const wipeRef = useRef<HTMLDivElement>(null);

  // Global scroll-to-top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
    if (lenis) lenis.scrollTo(0, { immediate: true });
  }, [pathname]);

  const { isReady } = useAssetPreloader([
    DESIGN_SYSTEM.assets.logoSplash,
    DESIGN_SYSTEM.assets.videoIntro,
    DESIGN_SYSTEM.assets.bgHome,
    DESIGN_SYSTEM.assets.bgIntro
  ]);

  useEffect(() => {
    if (isReady) {
      const timer = setTimeout(() => setIsLoading(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isReady]);

  const triggerSlideTransition = useCallback((targetPath: string) => {
    if (!wipeRef.current) {
      navigate(targetPath);
      return;
    }

    const tl = gsap.timeline();
    
    // Slide In from Right
    tl.fromTo(wipeRef.current, 
      { x: '100%' }, 
      { 
        x: '0%', 
        duration: 0.6, 
        ease: 'power3.inOut',
        onComplete: () => {
          startTransition(() => {
            navigate(targetPath);
          });
        }
      }
    );
    
    // Slide Out to Left
    tl.to(wipeRef.current, {
      x: '-100%',
      duration: 0.6,
      ease: 'power3.inOut',
      delay: 0.1
    });
  }, [navigate]);

  const handleIntroComplete = () => {
    setShowIntro(false);
    navigate('/dashboard');
  };

  if (isLoading) {
    return (
      <div style={{
        height: '100vh', width: '100vw',
        backgroundColor: DESIGN_SYSTEM.colors.midnight,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: '24px'
      }}>
        <img 
          src="/logo.png" 
          alt="The Dubai Mall"
          style={{ height: '100px', width: 'auto', animation: 'pulse 2s infinite' }}
        />
        <style>{`@keyframes pulse { 0%, 100% { opacity: 0.4; } 50% { opacity: 1; } }`}</style>
      </div>
    );
  }

  return (
    <Suspense fallback={<div style={{ height: '100vh', width: '100vw', backgroundColor: DESIGN_SYSTEM.colors.midnight }} />}>
      {/* Global Slide Wipe Overlay */}
      <div 
        ref={wipeRef}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'linear-gradient(90deg, #050505 0%, #111 50%, #050505 100%)',
          borderLeft: '1px solid rgba(200, 169, 106, 0.3)',
          borderRight: '1px solid rgba(200, 169, 106, 0.3)',
          zIndex: 20000,
          pointerEvents: 'none',
          transform: 'translateX(100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '20px'
        }}
      >
        <div style={{
          fontFamily: "'Oswald', sans-serif",
          fontSize: 'clamp(14px, 4.5vw, 42px)',
          fontWeight: 300,
          color: '#FFFFFF',
          textTransform: 'uppercase',
          letterSpacing: '0.3em',
          textAlign: 'center',
          opacity: 0.8,
          width: '100%',
          padding: '0 30px',
          boxSizing: 'border-box'
        }}>
          Experience the <br className="md:hidden" /> <span style={{ color: '#C8A96A', fontWeight: 600 }}>Unimagined</span>
        </div>
        <div style={{
          width: '100px',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, #C8A96A, transparent)',
          opacity: 0.5
        }} />
      </div>

      {showIntro ? (
        <CinematicIntro onComplete={handleIntroComplete} />
      ) : (
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={
            <InvestorDashboard 
              onSelect={(id) => {
                if (id === 1) triggerSlideTransition('/retail');
                if (id === 2) triggerSlideTransition('/events');
                if (id === 3) triggerSlideTransition('/attractions');
                if (id === 4) triggerSlideTransition('/luxury');
              }} 
            />
          } />
          <Route path="/retail" element={<RetailLeasingModule onBack={() => triggerSlideTransition('/dashboard')} />} />
          <Route path="/events" element={<EventsPlatformModule onBack={() => triggerSlideTransition('/dashboard')} />} />
          <Route path="/attractions" element={<AttractionsEntertainmentModule onBack={() => triggerSlideTransition('/dashboard')} />} />
          <Route path="/luxury" element={<LuxuryDiningModule onBack={() => triggerSlideTransition('/dashboard')} />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      )}
    </Suspense>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App
