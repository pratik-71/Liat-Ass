import { useState, useEffect, lazy, Suspense, useTransition, useCallback } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom'
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

  // Global scroll-to-top on route change
  useEffect(() => {
    // Immediate native scroll reset
    window.scrollTo(0, 0);
    document.documentElement.scrollTo({ top: 0, behavior: 'instant' as any });
    
    // Reset Lenis scroll position (CRITICAL for smooth scroll consistency)
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }

    // Delayed scroll to handle late-rendering content or smooth-scroll conflicts
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      if (lenis) lenis.scrollTo(0, { immediate: true });
    }, 50);

    return () => clearTimeout(timer);
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

  const handleIntroComplete = useCallback(() => {
    setShowIntro(false);
    navigate('/dashboard');
  }, [navigate]);

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
          style={{
            height: '100px',
            width: 'auto',
            animation: 'pulse 2s infinite',
            filter: 'drop-shadow(0 0 10px rgba(200, 169, 106, 0.2))'
          }}
        />
        <div style={{
          width: '240px',
          height: '2px',
          backgroundColor: 'rgba(200, 169, 106, 0.1)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: DESIGN_SYSTEM.colors.gold,
            animation: 'loadLine 2s infinite ease-in-out'
          }} />
        </div>
        <style>{`
          @keyframes loadLine { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
          @keyframes pulse { 0%, 100% { opacity: 0.4; } 50% { opacity: 1; } }
        `}</style>
      </div>
    );
  }

  if (showIntro) {
    return (
      <Suspense fallback={<div style={{ height: '100vh', width: '100vw', backgroundColor: DESIGN_SYSTEM.colors.midnight }} />}>
        <CinematicIntro onComplete={handleIntroComplete} />
      </Suspense>
    );
  }

  return (
    <Suspense fallback={<div style={{ height: '100vh', width: '100vw', backgroundColor: DESIGN_SYSTEM.colors.midnight }} />}>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={
          <InvestorDashboard 
            onSelect={(id) => {
              startTransition(() => {
                if (id === 1) navigate('/retail');
                if (id === 2) navigate('/events');
                if (id === 3) navigate('/attractions');
                if (id === 4) navigate('/luxury');
              });
            }} 
          />
        } />
        <Route path="/retail" element={<RetailLeasingModule onBack={() => navigate('/dashboard')} />} />
        <Route path="/events" element={<EventsPlatformModule onBack={() => navigate('/dashboard')} />} />
        <Route path="/attractions" element={<AttractionsEntertainmentModule onBack={() => navigate('/dashboard')} />} />
        <Route path="/luxury" element={<LuxuryDiningModule onBack={() => navigate('/dashboard')} />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
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
