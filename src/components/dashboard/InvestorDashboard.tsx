import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import type { OpportunityCardData } from '../../types'
import OpportunityCard from './OpportunityCard'

const CARDS: OpportunityCardData[] = [
  { 
    id: 1, 
    title: 'RETAIL & LEASING', 
    desc: 'Secure prime locations in the world’s most visited destination.',
    target: 1200,
    suffix: '+',
    label: 'RETAIL OUTLETS',
    color: '#C8A96A'
  },
  { 
    id: 2, 
    title: 'EVENTS & PLATFORM', 
    desc: 'Host activations, launches, and large-scale brand experiences.',
    target: 100,
    suffix: 'M+',
    label: 'ANNUAL FOOTFALL',
    color: '#C8A96A'
  },
  { 
    id: 3, 
    title: 'ATTRACTIONS & ENTERTAINMENT', 
    desc: 'Drive engagement through world-class destinations and experiences.',
    target: 80,
    suffix: '+',
    label: 'GLOBAL EXPERIENCES',
    color: '#C8A96A'
  },
  { 
    id: 4, 
    title: 'LUXURY & DINING', 
    desc: 'Position your brand among premium audiences through luxury retail and global dining.',
    target: 200,
    suffix: '+',
    label: 'LUXURY BRANDS',
    color: '#C8A96A'
  }
]

interface InvestorDashboardProps {
  onSelect: (id: number) => void;
}

const InvestorDashboard: React.FC<InvestorDashboardProps> = ({ onSelect }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const introImageRef = useRef<HTMLImageElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mainTl = gsap.timeline({ delay: 0.2 })

    mainTl
      // Phase 1: Building comes up (FASTER)
      .fromTo(introImageRef.current, 
        { y: '100%', opacity: 1 },
        { y: '0%', duration: 0.8, ease: 'power3.out' }
      )
      // Phase 2: Show home.png (Direct Fade In)
      .fromTo(bgRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: 'power2.inOut' }
      )
      .to(introImageRef.current, { 
        opacity: 0, 
        duration: 0.5, 
        ease: 'power2.inOut' 
      }, '+=0.1')
      
      // Phase 3: Show backdrop (darkness/vignette) and cards (FASTER)
      .fromTo('.luxury-backdrop-overlay',
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: 'power2.inOut' },
        '-=0.3'
      )
      .fromTo('.luxury-title', 
        { opacity: 0, letterSpacing: '0.3em', y: 30 },
        { opacity: 1, letterSpacing: '0.2em', y: 0, duration: 0.8, ease: 'power3.out' }, 
        '-=0.5'
      )
      .fromTo('.luxury-subtitle', 
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, 
        '-=0.6'
      )
      .fromTo('.luxury-stat-line',
        { opacity: 0, y: 10 },
        { opacity: 0.9, y: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.6'
      )
      .fromTo('.luxury-cards-container',
        { opacity: 0 },
        { opacity: 1, duration: 0.1 },
        '-=0.4'
      )
      .fromTo('.luxury-card', 
        { opacity: 0, y: 80, rotateX: 15 },
        { opacity: 1, y: 0, rotateX: 0, duration: 1.2, stagger: 0.1, ease: 'expo.out' }, 
        '-=0.4'
      )
      .fromTo('.luxury-footer',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
        '-=0.8'
      )

    // Sync numeric counting with card reveals
    CARDS.forEach((card, index) => {
      const obj = { val: 0 }
      // Start counting after cards are visible (sync with faster timeline)
      const startOffset = 3.0 + (index * 0.1) 
      
      gsap.to(obj, {
        val: card.target || 0,
        duration: 1.5,
        ease: 'power2.out',
        delay: startOffset,
        onUpdate: () => {
          const el = document.getElementById(`stat-count-${card.id}`)
          if (el) {
            const displayVal = Math.floor(obj.val)
            el.innerText = `${displayVal}${card.suffix || ''}`
          }
        }
      })
    })
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        height: '100vh',
        width: '100vw',
        backgroundColor: '#0A0A0A',
        color: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: window.innerWidth < 768 ? '40px 20px' : '0 2vw',
        boxSizing: 'border-box',
        fontFamily: "'Inter', sans-serif",
        perspective: '1200px',
        overflow: window.innerWidth < 768 ? 'auto' : 'hidden', // Lock desktop, scroll mobile
        position: 'relative',
        filter: 'saturate(1.2)'
      }}
    >
      <div 
        ref={bgRef}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url("https://raw.githubusercontent.com/pratik-71/Liat-Ass/main/public/home.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          zIndex: 0,
          opacity: 0
        }}
      />

      <div 
        className="luxury-backdrop-overlay"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(10,10,10,0.6) 0%, rgba(10,10,10,0.95) 100%)',
          zIndex: 1,
          opacity: 0,
          pointerEvents: 'none'
        }}
      />

      <img 
        ref={introImageRef}
        src="https://raw.githubusercontent.com/pratik-71/Liat-Ass/main/public/home%20ann.png"
        alt="Intro"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 100,
          pointerEvents: 'none',
          display: 'block'
        }}
      />

      <div
        style={{
          position: 'absolute',
          top: '-10%',
          left: '20%',
          width: '60vw',
          height: '60vw',
          background: 'radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 70%)',
          filter: 'blur(100px)',
          zIndex: 1,
          pointerEvents: 'none',
          animation: 'float 20s infinite alternate ease-in-out'
        }}
      />

      <style>{`
        @keyframes float {
          0% { transform: translate(0, 0) rotate(0deg) scale(1); opacity: 0.2; }
          33% { transform: translate(5vw, 5vh) rotate(5deg) scale(1.1); opacity: 0.4; }
          66% { transform: translate(-2vw, 10vh) rotate(-3deg) scale(0.9); opacity: 0.3; }
          100% { transform: translate(0, 0) rotate(0deg) scale(1); opacity: 0.2; }
        }
        @keyframes shine {
          0% { left: -150%; opacity: 0; }
          20% { opacity: 0.6; }
          50% { opacity: 0.6; }
          100% { left: 150%; opacity: 0; }
        }
        @keyframes ambient-pulse {
          0% { opacity: 0.3; transform: scale(1); }
          100% { opacity: 0.5; transform: scale(1.1); }
        }
        @keyframes text-shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .noise-texture {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          background-image: url("https://grainy-gradients.vercel.app/noise.svg");
          opacity: 0.04;
          pointer-events: none;
          z-index: 99;
        }
        .light-drift {
          position: absolute;
          width: 4px;
          height: 4px;
          background: #C8A96A;
          border-radius: 50%;
          filter: blur(2px);
          pointer-events: none;
          z-index: 2;
        }
      `}</style>

      <div className="noise-texture" />

      {/* LUXURY FLOATING NAV */}
      <nav style={{
        position: 'absolute',
        top: '30px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 100,
        display: 'flex',
        gap: '40px',
        opacity: 0,
        animation: 'fadeIn 1s forwards 3.5s'
      }}>
        {['The Destination', 'Opportunities', 'Experience', 'Connect'].map((item) => (
          <a key={item} href="#" style={{
            color: 'rgba(255,255,255,0.5)',
            textDecoration: 'none',
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.3em',
            fontWeight: 600,
            transition: 'color 0.3s ease'
          }} onMouseEnter={(e) => e.currentTarget.style.color = '#C8A96A'}
             onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}>
            {item}
          </a>
        ))}
      </nav>

      {/* AMBIENT LENS FLARE */}
      <div style={{
        position: 'absolute',
        top: '10%',
        right: '15%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(200, 169, 106, 0.15) 0%, transparent 70%)',
        filter: 'blur(60px)',
        zIndex: 1,
        pointerEvents: 'none',
        animation: 'ambient-pulse 12s infinite alternate ease-in-out'
      }} />

      {[...Array(8)].map((_, i) => (
        <div 
          key={i}
          className="light-drift"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.5,
            animation: `float ${15 + Math.random() * 10}s infinite alternate ease-in-out`,
            animationDelay: `${Math.random() * 5}s`
          }}
        />
      ))}

      <div style={{
        position: 'absolute',
        top: '50%',
        left: '42%',
        width: '40vw',
        height: '40vh',
        background: 'radial-gradient(circle, rgba(200, 169, 106, 0.08) 0%, transparent 70%)',
        zIndex: 1,
        pointerEvents: 'none',
        animation: 'ambient-pulse 8s infinite alternate ease-in-out'
      }} />

      <div style={{ textAlign: 'center', marginBottom: '3vh', marginTop: '1vh', zIndex: 10 }}>
        <h2 
          className="luxury-subtitle" 
          style={{
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.8em',
            color: '#C8A96A',
            marginBottom: '16px',
            fontWeight: 700,
            fontFamily: "'Oswald', sans-serif",
            opacity: 0,
            textAlign: 'center'
          }}
        >
          The Dubai Mall
        </h2>
        <h1 
          className="luxury-title" 
          style={{
            fontSize: 'clamp(32px, 5vw, 56px)',
            fontWeight: 600, // Increased thickness
            textTransform: 'uppercase',
            margin: 0,
            fontFamily: "'Oswald', sans-serif",
            letterSpacing: '0.1em',
            textAlign: 'center',
            color: '#E5C27A', // Solid light golden
            opacity: 0,
            textShadow: '0 4px 15px rgba(0,0,0,0.5)'
          }}
        >
          Explore Opportunities
        </h1>
        <div 
          className="luxury-stat-line" 
          style={{
            marginTop: '20px',
            fontSize: '12px',
            color: 'rgba(255, 255, 255, 0.81)',
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            fontWeight: 400,
            maxWidth: '1000px',
            margin: '20px auto 0',
            opacity: 0,
            textAlign: 'center'
          }}
        >
          A Global Platform for Brands to Connect with Millions
        </div>
      </div>

      <div className="luxury-cards-container" style={{
        display: 'flex',
        gap: window.innerWidth < 768 ? '10px' : '16px',
        width: '100%',
        maxWidth: '1380px',
        justifyContent: 'center',
        flexWrap: 'wrap',
        position: 'relative',
        zIndex: 10,
        padding: '0 20px',
        opacity: 0
      }}>
        {CARDS.map((card) => (
          <OpportunityCard 
            key={card.id} 
            card={card} 
            onSelect={onSelect} 
          />
        ))}
      </div>

      <div 
        className="luxury-footer"
        style={{
          marginTop: '2vh',
          zIndex: 10,
          color: '#C8A96A', 
          fontSize: '11px',
          letterSpacing: '0.4em',
          textTransform: 'uppercase',
          textAlign: 'center',
          fontFamily: "'Inter', sans-serif",
          opacity: 0,
          fontWeight: 600
        }}
      >
        A complete ecosystem of retail, luxury, entertainment, and global experiences.
      </div>
    </div>
  )
}

export default InvestorDashboard;
