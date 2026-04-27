import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { OpportunityCardData } from '../../types'
import OpportunityCard from './OpportunityCard'
import { useDashboardAnimation } from './useDashboardAnimation'
import { DashboardBackground } from './DashboardBackground'

gsap.registerPlugin(ScrollTrigger);

const CARDS: OpportunityCardData[] = [
  { 
    id: 1, 
    title: 'RETAIL & LEASING', 
    desc: 'Prime retail destinations in a global destination.',
    target: 1200,
    suffix: '+',
    label: 'RETAIL DESTINATIONS',
    color: '#C8A96A'
  },
  { 
    id: 2, 
    title: 'EVENTS & PLATFORM', 
    desc: 'Host large-scale, high-impact brand experiences.',
    target: 100,
    suffix: 'M+',
    label: 'ANNUAL VISITORS',
    color: '#C8A96A'
  },
  { 
    id: 3, 
    title: 'ATTRACTIONS', 
    desc: 'Immersive, high-engagement signature experiences.',
    target: 80,
    suffix: '+',
    label: 'SIGNATURE EXPERIENCES',
    color: '#C8A96A'
  },
  { 
    id: 4, 
    title: 'LUXURY & DINING', 
    desc: 'Reach premium global audiences in a world-class environment.',
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

  const footerAccentRef = useRef<HTMLDivElement>(null)

  const handleHover = (id: number) => {
    // Preload modules on hover to eliminate redirect delay
    if (id === 1) import('../retail/RetailLeasingModule');
    if (id === 2) import('../events/EventsPlatformModule');
    if (id === 3) import('../attractions/AttractionsEntertainmentModule');
    if (id === 4) import('../luxury/LuxuryDiningModule');
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Scroll-triggered floating image in footer
      gsap.fromTo(footerAccentRef.current,
        { 
          y: 300, 
          opacity: 0 
        },
        {
          y: 0,
          opacity: 1,
          duration: 2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: '.luxury-footer',
            start: 'bottom bottom',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [containerRef]);

  useDashboardAnimation(containerRef, introImageRef, bgRef, CARDS);

  return (
    <div
      ref={containerRef}
      className="dashboard-container"
      style={{
        minHeight: '100vh',
        width: '100%',
        backgroundColor: '#050505',
        color: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: window.innerWidth < 768 ? '30px 20px 60px' : '50px 2vw 80px',
        boxSizing: 'border-box',
        fontFamily: "'Inter', sans-serif",
        perspective: '2000px',
        overflowX: 'hidden',
        position: 'relative',
        filter: 'saturate(1.1)'
      }}
    >
      <DashboardBackground bgRef={bgRef} introImageRef={introImageRef} />


      {/* LAYER 20: Content Hierarchy */}
      <div className="content-header" style={{ textAlign: 'center', zIndex: 20, position: 'relative', maxWidth: '1000px', padding: '0 20px' }}>
        <h2 
          className="luxury-subtitle" 
          style={{
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.6em',
            color: '#C8A96A',
            marginBottom: '10px',
            fontWeight: 700,
            fontFamily: "'Oswald', sans-serif",
            opacity: 0
          }}
        >
          The Dubai Mall
        </h2>
        <h1 
          className="luxury-title" 
          style={{
            fontSize: 'clamp(36px, 6vw, 58px)',
            fontWeight: 600,
            textTransform: 'uppercase',
            margin: '0 0 16px 0',
            fontFamily: "'Oswald', sans-serif",
            letterSpacing: '0.02em',
            color: '#ffffffff',
            opacity: 0,
            lineHeight: 1.1,
            textShadow: '0 10px 40px rgba(0,0,0,0.6)'
          }}
        >
          WHERE BRANDS SCALE <span style={{color: '#E5C27A'}}>GLOBALLY</span>
        </h1>
        <div 
          className="luxury-stat-line" 
          style={{
            fontSize: 'clamp(16px, 1.8vw, 20px)',
            color: 'rgba(255, 255, 255, 0.8)',
            letterSpacing: '0.02em',
            textTransform: 'none',
            fontWeight: 300,
            maxWidth: '800px',
            margin: '0 auto 18px',
            opacity: 0,
            lineHeight: 1.5
          }}
        >
          Engage millions in one of the world’s most valuable destinations.
        </div>

        
      </div>

      <div className="luxury-cards-container transform-gpu" style={{
        display: 'flex',
        gap: '20px',
        width: '100%',
        maxWidth: '1400px',
        justifyContent: 'center',
        flexWrap: 'wrap',
        position: 'relative',
        zIndex: 30,
        padding: '0 20px',
        opacity: 0,
        willChange: 'transform, opacity'
      }}>
        {CARDS.map((card) => (
          <OpportunityCard 
            key={card.id} 
            card={card} 
            onSelect={onSelect} 
            onHover={handleHover}
          />
        ))}
      </div>

      <div 
        className="luxury-footer"
        style={{
          marginTop: '100px',
          paddingBottom: '80px',
          zIndex: 20,
          color: 'rgba(255, 255, 255, 1)', 
          fontSize: '16px',
          letterSpacing: '0.4em',
          lineHeight: '1.5',
          textTransform: 'uppercase',
          textAlign: 'center',
          fontFamily: "'Inter', sans-serif",
          opacity: 0,
          fontWeight: 600,
          position: 'relative',
          textShadow: '0 4px 15px rgba(0,0,0,0.9), 0 0 30px rgba(0,0,0,0.7)'
        }}
      >
        A complete ecosystem of retail, luxury, entertainment, and global experiences.
      </div>

      {/* Floating Footer Accent */}
      <div 
        ref={footerAccentRef}
        className="footer-floating-accent"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          width: '100%',
          zIndex: 15,
          opacity: 0,
          pointerEvents: 'none',
          overflow: 'hidden'
        }}
      >
        <img 
          src="https://raw.githubusercontent.com/pratik-71/Liat-Ass/main/public/footer.png" 
          alt="Accent" 
          style={{ 
            width: '100%', 
            height: window.innerWidth < 768 ? '300px' : '500px',
            objectFit: 'cover',
            display: 'block',
            maskImage: 'linear-gradient(to top, black 80%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to top, black 80%, transparent 100%)'
          }}
        />
      </div>

      <style>{`
        @keyframes shine {
          0% { left: -150%; opacity: 0; }
          20% { opacity: 0.6; }
          50% { opacity: 0.6; }
          100% { left: 150%; opacity: 0; }
        }
        @keyframes text-shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .noise-texture {
          position: fixed;
          inset: 0;
          width: 100%;
          height: 100%;
          background-image: url("https://grainy-gradients.vercel.app/noise.svg");
          opacity: 0.03;
          pointer-events: none;
          z-index: 150;
        }

        /* Tablet Overrides */
        @media (min-width: 769px) and (max-width: 1200px) {
          .luxury-cards-container {
            display: flex !important;
            grid-template-columns: none !important;
            justify-content: center !important;
            gap: 25px !important;
            padding: 0 40px !important;
          }
          .luxury-title {
            font-size: 48px !important;
          }
          .luxury-stat-line {
            font-size: 16px !important;
            max-width: 600px !important;
          }
          .dashboard-container {
            padding: 60px 30px !important;
          }
        }

        /* Mobile Overrides */
        @media (max-width: 768px) {
          .desktop-only {
            display: none !important;
          }
          .dashboard-container {
            padding: 40px 15px 40px !important;
            overflow-x: hidden !important;
          }
          .luxury-title {
            font-size: 32px !important;
          }
          .luxury-subtitle {
            font-size: 10px !important;
            letter-spacing: 0.4em !important;
          }
          .luxury-stat-line {
            font-size: 11px !important;
            letter-spacing: 0.2em !important;
            padding: 0 20px;
          }
          .luxury-cards-container {
            gap: 15px !important;
          }
          .luxury-footer {
            margin-top: 60px !important;
            padding-bottom: 60px !important;
            font-size: 12px !important;
            line-height: 1.4 !important;
            letter-spacing: 0.2em !important;
            padding: 0 30px !important;
            max-width: 100% !important;
          }
          .footer-floating-accent img {
            height: 350px !important;
          }
        }
      `}</style>
    </div>
  )
}

export default InvestorDashboard;
