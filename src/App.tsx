import { useState, useEffect, lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
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
  const [showIntro, setShowIntro] = useState(() => {
    // Check if intro was already seen in this session
    return !sessionStorage.getItem('introSeen');
  });
  const [isLoading, setIsLoading] = useState(true)

  const { isReady } = useAssetPreloader([
    DESIGN_SYSTEM.assets.logoSplash,
    DESIGN_SYSTEM.assets.videoIntro,
    DESIGN_SYSTEM.assets.bgHome,
    DESIGN_SYSTEM.assets.bgIntro
  ]);

  useEffect(() => {
    sessionStorage.setItem('dashboardAnimated', 'true');
    if (isReady) {
      const timer = setTimeout(() => setIsLoading(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isReady]);

  if (isLoading) {
    return (
      <div style={{
        height: '100vh', width: '100vw',
        backgroundColor: DESIGN_SYSTEM.colors.midnight,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: '24px'
      }}>
        <div style={{
          fontSize: '20px',
          color: DESIGN_SYSTEM.colors.gold,
          letterSpacing: '1.2em',
          textTransform: 'uppercase',
          fontFamily: "'Oswald', sans-serif",
          animation: 'pulse 2s infinite',
          fontWeight: 700
        }}>
          The Dubai Mall
        </div>
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
        <CinematicIntro onComplete={() => {
          sessionStorage.setItem('introSeen', 'true');
          setShowIntro(false);
          navigate('/dashboard');
        }} />
      </Suspense>
    );
  }

  return (
    <Suspense fallback={<div style={{ height: '100vh', width: '100vw', backgroundColor: DESIGN_SYSTEM.colors.midnight }} />}>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={
          <InvestorDashboard onSelect={(id) => {
            if (id === 1) navigate('/retail');
            if (id === 2) navigate('/events');
            if (id === 3) navigate('/attractions');
            if (id === 4) navigate('/luxury');
          }} />
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
