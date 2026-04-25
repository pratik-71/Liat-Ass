import { useState } from 'react'
import SplashScreen from './components/SplashScreen'
import ChoiceScreen from './components/ChoiceScreen'
import RetailLeasing from './components/RetailLeasing.tsx'
import './App.css'

/**
 * GLOBAL CONFIG HOOK
 * Set ENABLE_SPLASH to true to show the cinematic intro video on load.
 * Set to false to jump directly to the Choice Screen.
 */
const ENABLE_SPLASH = true;

function App() {
  const [showSplash, setShowSplash] = useState(ENABLE_SPLASH)
  const [currentScreen, setCurrentScreen] = useState('choice')

  return (
    <>
      {showSplash ? (
        <SplashScreen onComplete={() => setShowSplash(false)} />
      ) : (
        <>
          {currentScreen === 'choice' && (
            <ChoiceScreen onSelect={(id) => id === 1 && setCurrentScreen('retail')} />
          )}
          {currentScreen === 'retail' && (
            <RetailLeasing onBack={() => setCurrentScreen('choice')} />
          )}
        </>
      )}
    </>
  )
}

export default App
