import { useState } from 'react'
import SplashScreen from './components/SplashScreen'
import './App.css'

function App() {
  const [splashDone, setSplashDone] = useState(false)

  return (
    <>
      {!splashDone && (
        <SplashScreen onComplete={() => setSplashDone(true)} />
      )}

      {/* Main app content — visible after splash */}
      <header style={{ opacity: splashDone ? 1 : 0, transition: 'opacity 0.5s ease' }}>
        <div className="left">
          <h3>logo</h3>
        </div>
        <div className="right">
        </div>
      </header>
    </>
  )
}

export default App
