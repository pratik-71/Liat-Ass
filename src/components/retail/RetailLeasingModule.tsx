import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface RetailLeasingModuleProps {
  onBack: () => void;
}

const RetailLeasingModule: React.FC<RetailLeasingModuleProps> = ({ onBack }) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.fromTo(containerRef.current, 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    )
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        height: '100vh',
        width: '100vw',
        backgroundColor: '#0A0A0A',
        color: '#FFFFFF',
        padding: '60px',
        boxSizing: 'border-box',
        fontFamily: "'Oswald', sans-serif",
        position: 'relative'
      }}
    >
      <button 
        onClick={onBack}
        style={{
          background: 'none',
          border: '1px solid rgba(200, 169, 106, 0.4)',
          color: '#C8A96A',
          padding: '10px 24px',
          borderRadius: '50px',
          cursor: 'pointer',
          textTransform: 'uppercase',
          letterSpacing: '0.2em',
          fontSize: '12px',
          marginBottom: '40px',
          transition: 'all 0.3s'
        }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(200, 169, 106, 0.1)'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
      >
        ← Back to Dashboard
      </button>

      <div style={{ maxWidth: '1200px' }}>
        <h1 style={{
          fontSize: '64px',
          fontWeight: 800,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          marginBottom: '20px',
          background: 'linear-gradient(180deg, #E5C27A 0%, #C8A96A 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          Retail & Leasing
        </h1>
        <p style={{
          fontSize: '20px',
          color: 'rgba(255, 255, 255, 0.7)',
          lineHeight: 1.6,
          maxWidth: '800px'
        }}>
          Position your brand at the epicenter of global retail. With over 1,200 outlets and 100M+ annual visitors, The Dubai Mall offers unparalleled visibility and growth opportunities.
        </p>
      </div>

      <div style={{
        marginTop: '60px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '30px'
      }}>
        {[
          { title: 'Prime Locations', desc: 'High-footfall zones in Fashion Avenue, The Souk, and more.' },
          { title: 'Brand Visibility', desc: 'Reach a diverse, global audience of high-net-worth individuals.' },
          { title: 'Growth Potential', desc: 'Join the world’s most successful retail ecosystem.' }
        ].map((item, i) => (
          <div key={i} style={{
            padding: '40px',
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(200, 169, 106, 0.1)',
            borderRadius: '12px'
          }}>
            <h3 style={{ color: '#E5C27A', fontSize: '20px', marginBottom: '16px' }}>{item.title}</h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.6)', lineHeight: 1.5 }}>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RetailLeasingModule;
