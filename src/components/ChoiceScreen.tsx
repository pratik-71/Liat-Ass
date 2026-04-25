import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const CARDS = [
  { 
    id: 1, 
    title: 'Retail & Leasing', 
    desc: 'Secure prime locations in the world’s most visited destination.',
    target: 1200,
    suffix: '+',
    label: 'Retail Outlets',
    color: '#D4AF37'
  },
  { 
    id: 2, 
    title: 'Events & Platform', 
    desc: 'Host groundbreaking activations and reach global audiences.',
    target: 100,
    suffix: 'M+',
    label: 'Annual Footfall',
    color: '#C0C0C0' 
  },
  { 
    id: 3, 
    title: 'Sponsorships', 
    desc: 'Align your brand with unparalleled luxury and scale.',
    target: 1,
    prefix: 'No. ',
    suffix: '',
    label: 'Global Rank',
    color: '#B87333' 
  },
  { 
    id: 4, 
    title: 'Attractions', 
    desc: 'Integrate into our world-class entertainment ecosystem.',
    target: 80,
    suffix: '+',
    label: 'Experiences',
    color: '#E5E4E2' 
  },
]
export default function ChoiceScreen({ onSelect }: { onSelect: (id: number) => void }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const introImageRef = useRef<HTMLImageElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mainTl = gsap.timeline({ delay: 0.2 })

    mainTl
      .fromTo(introImageRef.current, 
        { y: '100%', opacity: 1 },
        { y: '0%', duration: 1.5, ease: 'power4.out' }
      )
      .fromTo(bgRef.current, 
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: 'power2.inOut' }, 
        '-=0.5'
      )
      .to(introImageRef.current, { 
        opacity: 0, 
        duration: 0.8, 
        ease: 'power2.inOut' 
      }, '+=0.2')
      .fromTo('.luxury-title', 
        { opacity: 0, letterSpacing: '0.3em', y: 20 },
        { opacity: 1, letterSpacing: '0.10em', y: 0, duration: 1.2, ease: 'power3.out' }, 
        '-=0.4'
      )
      .fromTo('.luxury-subtitle', 
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: 'power2.out' }, 
        '-=1'
      )
      .fromTo('.luxury-stat-line',
        { opacity: 0, y: 10 },
        { opacity: 0.6, y: 0, duration: 1, ease: 'power2.out' },
        '-=0.8'
      )
      .fromTo('.luxury-cards-container',
        { opacity: 0 },
        { opacity: 1, duration: 0.1 },
        '-=1.2'
      )
      .fromTo('.luxury-card', 
        { opacity: 0, y: 60, rotateX: 10 },
        { opacity: 1, y: 0, rotateX: 0, duration: 1.4, stagger: 0.1, ease: 'expo.out' }, 
        '-=1.2'
      )

    CARDS.forEach((card, index) => {
      const obj = { val: 0 }
      const startDelay = 3.2 + (index * 0.1) 
      
      gsap.to(obj, {
        val: card.target,
        duration: 2.5,
        ease: 'power2.out',
        delay: startDelay,
        onUpdate: () => {
          const el = document.getElementById(`stat-count-${card.id}`)
          if (el) {
            const displayVal = Math.floor(obj.val)
            const formatted = displayVal.toLocaleString('en-US')
            el.innerText = `${card.prefix || ''}${formatted}${card.suffix || ''}`
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
        backgroundColor: '#000',
        color: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2vh 2vw',
        boxSizing: 'border-box',
        fontFamily: "'Inter', sans-serif",
        perspective: '1200px',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      <div 
        ref={bgRef}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.9) 100%), url("/home.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          zIndex: 0
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
          zIndex: 5,
          pointerEvents: 'none'
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

      <div style={{ textAlign: 'center', marginBottom: '8vh', zIndex: 10 }}>
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
            fontWeight: 400,
            textTransform: 'uppercase',
            color: '#ffffff',
            margin: 0,
            fontFamily: "'Oswald', sans-serif",
            letterSpacing: '0.10em',
            opacity: 0
          }}
        >
          Explore Opportunities
        </h1>
        <div 
          className="luxury-stat-line"
          style={{
            marginTop: '16px',
            fontSize: '16px',
            color: 'rgba(255, 255, 255, 0.92)',
            letterSpacing: '0.05em',
            fontWeight: 300,
            maxWidth: '600px',
            margin: '16px auto 0',
            opacity: 0
          }}
        >
          Position Your Brand in Front of Millions Every Day
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
              flex: '1 1 250px',
              maxWidth: '300px',
              height: '46vh',
              minHeight: '360px',
              background: 'linear-gradient(135deg, rgba(235, 230, 215, 0.18) 0%, rgba(200, 190, 170, 0.28) 100%)',
              backdropFilter: 'blur(30px)',
              WebkitBackdropFilter: 'blur(30px)',
              border: '1px solid rgba(212, 175, 55, 0.25)',
              borderRadius: '12px',
              boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.2), 0 15px 35px rgba(0,0,0,0.3)',
              overflow: 'hidden',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '44px 32px',
              transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
              transform: 'scale(1)',
              zIndex: 1
            }}
            onMouseEnter={(e) => {
              const target = e.currentTarget;
              target.style.transform = 'scale(1.04) translateY(-10px)';
              target.style.border = `1px solid ${card.color}B0`;
              target.style.background = 'linear-gradient(135deg, rgba(245, 240, 225, 0.3) 0%, rgba(215, 205, 185, 0.4) 100%)';
              target.style.boxShadow = `0 45px 90px rgba(0,0,0,0.7), 0 0 35px ${card.color}30`;
              target.style.backdropFilter = 'blur(45px)';

              const bg = target.querySelector('.card-bg') as HTMLDivElement;
              if (bg) { bg.style.transform = 'scale(1.4)'; bg.style.opacity = '1'; }
            }}
            onMouseLeave={(e) => {
              const target = e.currentTarget;
              target.style.transform = 'scale(1)';
              target.style.border = '1px solid rgba(212, 175, 55, 0.25)';
              target.style.background = 'linear-gradient(135deg, rgba(235, 230, 215, 0.18) 0%, rgba(200, 190, 170, 0.28) 100%)';
              target.style.boxShadow = 'inset 0 1px 1px rgba(255,255,255,0.2), 0 15px 35px rgba(0,0,0,0.3)';
              target.style.backdropFilter = 'blur(30px)';

              const bg = target.querySelector('.card-bg') as HTMLDivElement;
              if (bg) { bg.style.transform = 'scale(1)'; bg.style.opacity = '0.3'; }
            }}
          >
            {/* Glow / Material Texture */}
            <div
              className="card-bg"
              style={{
                position: 'absolute',
                inset: 0,
                background: `radial-gradient(circle at top right, ${card.color}30 0%, transparent 75%)`,
                opacity: 0.3,
                transition: 'all 0.8s ease',
                zIndex: 0
              }}
            />

            {/* Metric Header */}
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div
                id={`stat-count-${card.id}`}
                style={{
                  fontSize: '60px',
                  color: card.color,
                  fontFamily: "'Oswald', sans-serif",
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  lineHeight: 0.9,
                  marginBottom: '8px',
                  letterSpacing: '-0.02em',
                  textShadow: '0 2px 10px rgba(0,0,0,0.2)'
                }}
              >
                0
              </div>
              <div
                style={{
                  fontSize: '11px',
                  color: 'rgba(255,255,255,0.7)',
                  letterSpacing: '0.35em',
                  textTransform: 'uppercase',
                  fontWeight: 600
                }}
              >
                {card.label}
              </div>
            </div>

            {/* Opportunity Content */}
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h3 style={{
                fontSize: '21px',
                fontWeight: 600,
                marginBottom: '10px',
                color: '#ffffff',
                fontFamily: "'Oswald', sans-serif",
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                textShadow: '0 2px 10px rgba(0,0,0,0.2)'
              }}>
                {card.title}
              </h3>
              <p style={{
                fontSize: '13px',
                color: 'rgba(255,255,255,0.85)',
                fontWeight: 300,
                lineHeight: 1.5,
                margin: 0,
                textShadow: '0 1px 5px rgba(0,0,0,0.2)'
              }}>
                {card.desc}
              </p>
              
              <div 
                style={{
                  height: '2px',
                  width: '35px',
                  backgroundColor: card.color,
                  marginTop: '24px',
                  opacity: 0.8,
                  boxShadow: '0 0 10px rgba(212,175,55,0.3)'
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
