import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const CARDS = [
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
    title: 'GLOBAL PLATFORM', 
    desc: 'Host activations, launches, and large-scale brand experiences.',
    target: 100,
    suffix: 'M+',
    label: 'ANNUAL FOOTFALL',
    color: '#C8A96A' 
  },
  { 
    id: 3, 
    title: 'ICONIC DESTINATIONS', 
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
  },
]
export default function ChoiceScreen({ onSelect }: { onSelect: (id: number) => void }) {
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
      // Phase 2: Show home.png (FASTER)
      .fromTo(bgRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: 'power2.inOut' }
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
        backgroundColor: '#0A0A0A', // Backdrop black (matte charcoal)
        color: '#FFFFFF', // High-end white
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2vh 2vw',
        boxSizing: 'border-box',
        fontFamily: "'Inter', sans-serif",
        perspective: '1200px',
        overflow: 'hidden',
        position: 'relative',
        filter: 'saturate(1.2)' // Increased saturation for more vibrant gold/visuals
      }}
    >
      <div 
        ref={bgRef}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url("/home.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          zIndex: 0,
          opacity: 0 // Initial state for timeline
        }}
      />

      {/* Luxury Backdrop Overlay (Vignette/Darkness) */}
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
        src="/home ann.png"
        alt="Intro"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 100, // Stay on top during intro
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
          0% { transform: translate(0, 0) rotate(0deg); }
          100% { transform: translate(10vw, 5vh) rotate(5deg); }
        }
      `}</style>

      <div style={{ textAlign: 'center', marginBottom: '4vh', marginTop: '4vh', zIndex: 10 }}>
        <h2
          className="luxury-subtitle"
          style={{
            fontSize: '12px',
            textTransform: 'uppercase',
            letterSpacing: '0.6em',
            color: '#D4AF37',
            marginBottom: '16px',
            fontWeight: 600,
            fontFamily: "'Oswald', sans-serif",
            opacity: 0
          }}
        >
          The Dubai Mall
        </h2>
        <h1
          className="luxury-title"
          style={{
            fontSize: 'clamp(32px, 5vw, 60px)',
            fontWeight: 600, // Reduced weight for elegance
            textTransform: 'uppercase',
            color: '#FFFFFF',
            margin: 0,
            fontFamily: "'Oswald', sans-serif",
            letterSpacing: '0.3em', // Increased spacing
            textShadow: '0 4px 15px rgba(0,0,0,0.5)',
            opacity: 0
          }}
        >
          Explore Opportunities
        </h1>
        <div 
          className="luxury-stat-line"
          style={{
            marginTop: '20px',
            fontSize: 'clamp(14px, 1.2vw, 18px)',
            color: 'rgba(255, 255, 255, 0.7)', // Muted white
            letterSpacing: '0.12em',
            fontWeight: 300,
            maxWidth: '800px',
            margin: '10px auto 0',
            opacity: 0,
            lineHeight: 1.6
          }}
        >
          A Global Platform for Brands to Connect with Millions
        </div>
      </div>

      <div className="luxury-cards-container" style={{
        display: 'flex',
        gap: '16px',
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
          <div
              key={card.id}
              className="luxury-card"
              onClick={() => onSelect(card.id)}
              style={{
                position: 'relative',
                flex: (card.id === 2 || card.id === 3) ? '1 1 340px' : '1 1 280px', // Both highlighted cards larger
                maxWidth: (card.id === 2 || card.id === 3) ? '360px' : '300px',
                height: (card.id === 2 || card.id === 3) ? '48vh' : '46vh',
                minHeight: (card.id === 2 || card.id === 3) ? '380px' : '360px',
                background: 'linear-gradient(160deg, #0f0f0f, #1a1a1a)',
                backdropFilter: 'blur(30px)',
                WebkitBackdropFilter: 'blur(30px)',
                border: '1px solid rgba(200, 169, 106, 0.3)',
                borderRadius: '16px',
                boxShadow: (card.id === 2 || card.id === 3)
                  ? '0 35px 100px rgba(0,0,0,0.6)' 
                  : '0 25px 80px rgba(0,0,0,0.5)',
                overflow: 'hidden',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '52px 38px',
                transition: 'all 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
                transform: 'translateY(0)',
                zIndex: (card.id === 2 || card.id === 3) ? 2 : 1
              }}
            onMouseEnter={(e) => {
              const target = e.currentTarget;
              target.style.transform = 'translateY(-12px)';
              target.style.border = '1px solid rgba(200, 169, 106, 0.8)';
              target.style.boxShadow = '0 50px 120px rgba(0,0,0,0.8)';
            }}
            onMouseLeave={(e) => {
              const target = e.currentTarget;
              target.style.transform = 'translateY(0)';
              target.style.border = '1px solid rgba(200, 169, 106, 0.3)';
              target.style.boxShadow = target.style.zIndex === '2' 
                ? '0 35px 100px rgba(0,0,0,0.6)' 
                : '0 25px 80px rgba(0,0,0,0.5)';
            }}
          >

            {/* Opportunity Content (Hierarchy: Title > Metric > Description) */}
            <div style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column' }}>
              <h3 style={{
                fontSize: (card.id === 2 || card.id === 3) ? '16px' : '12px',
                fontWeight: 700,
                marginBottom: '20px',
                color: (card.id === 2 || card.id === 3) ? '#C8A96A' : '#FFFFFF', // Gold or White
                fontFamily: "'Oswald', sans-serif",
                textTransform: 'uppercase',
                letterSpacing: '0.3em',
              }}>
                {card.title}
              </h3>

              {/* Metric in the middle (Visually Dominant) */}
              <div style={{ marginBottom: '28px', minHeight: '80px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div
                  id={`stat-count-${card.id}`}
                  style={{
                    fontSize: '68px',
                    fontFamily: "'Oswald', sans-serif",
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    lineHeight: 1,
                    marginBottom: '8px',
                    letterSpacing: '-0.02em',
                    background: 'linear-gradient(180deg, #E5C27A 0%, #C8A96A 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  0
                </div>
                {card.label && (
                  <div
                    style={{
                      fontSize: '12px',
                      color: 'rgba(255, 255, 255, 0.5)',
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      fontWeight: 700
                    }}
                  >
                    {card.label}
                  </div>
                )}
              </div>

              <p style={{
                fontSize: '13px',
                color: 'rgba(255, 255, 255, 0.65)',
                fontWeight: 300,
                lineHeight: 1.6,
                margin: 0,
              }}>
                {card.desc}
              </p>
              
            </div>
          </div>
        ))}
      </div>

      {/* Supporting Line Below Cards */}
      <div 
        className="luxury-footer"
        style={{
          marginTop: '4vh',
          zIndex: 10,
          color: '#C8A96A', 
          fontSize: '12px',
          letterSpacing: '0.5em',
          textTransform: 'uppercase',
          textAlign: 'center',
          fontFamily: "'Inter', sans-serif",
          opacity: 0, // Initial state for GSAP
          fontWeight: 600
        }}
      >
        A complete ecosystem of retail, luxury, entertainment, and global experiences.
      </div>
    </div>
  )
}
