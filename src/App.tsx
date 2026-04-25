import { useState, useEffect } from 'react'
import CinematicIntro from './components/splash/CinematicIntro'
import InvestorDashboard from './components/dashboard/InvestorDashboard'
import RetailLeasingModule from './components/retail/RetailLeasingModule'
import './App.css'

/**
 * GLOBAL CONFIG HOOK
 * Set ENABLE_SPLASH to true to show the cinematic intro video on load.
 */
const ENABLE_SPLASH = true;

const ASSETS = {
  splashLogo: "https://raw.githubusercontent.com/pratik-71/Liat-Ass/main/public/dubai_mall_start.png",
  homeBg: "https://raw.githubusercontent.com/pratik-71/Liat-Ass/main/public/home.png",
  homeIntro: "https://raw.githubusercontent.com/pratik-71/Liat-Ass/main/public/home%20ann.png"
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showSplash, setShowSplash] = useState(ENABLE_SPLASH);
  const [currentScreen, setCurrentScreen] = useState('choice');

  useEffect(() => {
    // 1. Preload Splash Logo FIRST (to start splash screen)
    const splashImg = new Image();
    splashImg.src = ASSETS.splashLogo;
    
    splashImg.onload = () => {
      // Small artificial delay for the beautiful loader
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    };

    // 2. Preload other high-res assets in background
    const bgImg = new Image();
    bgImg.src = ASSETS.homeBg;
    
    const introImg = new Image();
    introImg.src = ASSETS.homeIntro;

  }, []);

  if (isLoading) {
    return (
      <div style={{
        height: '100vh',
        width: '100vw',
        backgroundColor: '#000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '20px'
      }}>
        <div style={{
          fontSize: '20px',
          color: '#C8A96A',
          letterSpacing: '1.2em', // More elegant spacing
          textTransform: 'uppercase',
          fontFamily: "'Oswald', sans-serif",
          animation: 'pulse 2s infinite',
          fontWeight: 700
        }}>
          The Dubai Mall
        </div>
        <div style={{
          width: '240px',
          height: '2px', // Thicker line
          backgroundColor: 'rgba(200, 169, 106, 0.2)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: '#C8A96A',
            animation: 'loadLine 2s infinite ease-in-out'
          }} />
        </div>
        <style>{`
          @keyframes loadLine {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          @keyframes pulse {
            0%, 100% { opacity: 0.4; }
            50% { opacity: 1; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <>
      {showSplash ? (
        <CinematicIntro onComplete={() => setShowSplash(false)} />
      ) : (
        <>
          {currentScreen === 'choice' && (
            <InvestorDashboard onSelect={(id) => id === 1 && setCurrentScreen('retail')} />
          )}
          {currentScreen === 'retail' && (
            <RetailLeasingModule onBack={() => setCurrentScreen('choice')} />
          )}
        </>
      )}
    </>
  )
}

export default App
