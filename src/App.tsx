import { useState, useEffect, lazy, Suspense } from 'react'
import { DESIGN_SYSTEM, MODULE_REGISTRY } from './constants'
import { useAssetPreloader } from './hooks/useAssetPreloader'
import type { AppScreen } from './types'

// Lazy loaded modules for performance
const CinematicIntro = lazy(() => import('./components/splash/CinematicIntro'))
const InvestorDashboard = lazy(() => import('./components/dashboard/InvestorDashboard'))
const RetailLeasingModule = lazy(() => import('./components/retail/RetailLeasingModule'))
import './App.css'

/**
 * THE DUBAI MALL | INVESTOR EXPERIENCE
 * Scalable architecture built for modular expansion.
 */
function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('intro')
  const [isLoading, setIsLoading] = useState(true)

  // Asynchronous Asset Orchestration
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

  // Unified Navigation Logic
  const navigateTo = (screen: AppScreen) => setCurrentScreen(screen);
  const backToHome = () => setCurrentScreen('dashboard');

  return (
    <Suspense fallback={
      <div style={{ height: '100vh', width: '100vw', backgroundColor: DESIGN_SYSTEM.colors.midnight }} />
    }>
      {currentScreen === 'intro' && (
        <CinematicIntro onComplete={() => navigateTo('dashboard')} />
      )}

      {currentScreen === 'dashboard' && (
        <InvestorDashboard onSelect={(id) => {
          if (id === 1) navigateTo('retail');
          // Easily extensible for other card IDs
        }} />
      )}

      {currentScreen === 'retail' && (
        <RetailLeasingModule onBack={backToHome} />
      )}
      
      {/* FUTURE MODULES: Simply add the component here */}
      {/* {currentScreen === 'attractions' && <AttractionsModule onBack={backToHome} />} */}
    </Suspense>
  )
}

export default App
