import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const BRAND_CATEGORIES = [
  {
    name: 'LUXURY',
    brands: ['Gucci', 'Louis Vuitton', 'Cartier', 'Rolex']
  },
  {
    name: 'HIGH STREET',
    brands: ['Zara', 'H&M', 'Nike', 'Adidas']
  },
  {
    name: 'INNOVATION',
    brands: ['Apple', 'Tesla', 'Samsung', 'Dyson']
  },
  {
    name: 'LIFESTYLE',
    brands: ['Bloomingdale’s', 'Galeries Lafayette']
  }
]

export default function RetailLeasing({ onBack }: { onBack: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Scroll reveal for all sections
    const sections = gsap.utils.toArray('.reveal-section') as HTMLElement[]
    sections.forEach((section) => {
      gsap.fromTo(section, 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1.2, 
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    })

    // Hero entrance
    const heroTl = gsap.timeline()
    heroTl.fromTo('.hero-content', 
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.5, ease: 'power3.out', delay: 0.3 }
    )
    .fromTo('.hero-accent',
      { scaleX: 0 },
      { scaleX: 1, duration: 1, ease: 'power2.inOut' },
      '-=0.8'
    )

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <div ref={containerRef} style={{ backgroundColor: '#000', color: '#fff', overflowX: 'hidden', fontFamily: "'Inter', sans-serif" }}>
      {/* Back Button */}
      <button 
        onClick={onBack}
        style={{
          position: 'fixed',
          top: '40px',
          left: '40px',
          zIndex: 100,
          background: 'rgba(0,0,0,0.4)',
          border: '1px solid rgba(212, 175, 55, 0.3)',
          color: '#fff',
          padding: '10px 20px',
          borderRadius: '2px',
          cursor: 'pointer',
          backdropFilter: 'blur(10px)',
          fontFamily: "'Oswald', sans-serif",
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          fontSize: '11px',
          transition: 'all 0.4s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = '#D4AF37'
          e.currentTarget.style.background = 'rgba(212, 175, 55, 0.1)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.3)'
          e.currentTarget.style.background = 'rgba(0,0,0,0.4)'
        }}
      >
        ← Overview
      </button>

      {/* HERO SECTION */}
      <section style={{ height: '100vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <div style={{ 
          position: 'absolute', 
          inset: 0, 
          backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.9) 100%), url("/dubai_mall_architectural_blurred_1777050308330.png")', 
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
          zIndex: 0 
        }} />
        
        <div className="hero-content" style={{ position: 'relative', zIndex: 1, maxWidth: '1000px', padding: '0 40px' }}>
          <div className="hero-accent" style={{ height: '2px', width: '80px', backgroundColor: '#D4AF37', margin: '0 auto 40px', transformOrigin: 'center' }} />
          <h1 style={{ 
            fontSize: 'clamp(48px, 10vw, 110px)', 
            fontWeight: 700, 
            letterSpacing: '0.02em', 
            lineHeight: 0.9, 
            margin: 0, 
            fontFamily: "'Oswald', sans-serif",
            textTransform: 'uppercase'
          }}>
            Retail at<br /><span style={{ color: '#D4AF37' }}>Global Scale</span>
          </h1>
          <p style={{ 
            fontSize: 'clamp(18px, 2.5vw, 26px)', 
            color: 'rgba(255,255,255,0.7)', 
            marginTop: '30px', 
            fontWeight: 300, 
            maxWidth: '700px', 
            margin: '30px auto 0',
            lineHeight: 1.4
          }}>
            Join over 1,200 brands in the world’s most visited retail destination.
          </p>
        </div>
      </section>

      {/* SECTION 1 – IMPACT / SCALE */}
      <section className="reveal-section" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', padding: '150px 10vw', backgroundColor: '#050505' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '100px', width: '100%' }}>
          <div>
            <h3 style={{ fontSize: '160px', color: '#D4AF37', fontFamily: "'Oswald', sans-serif", margin: 0, lineHeight: 0.8, letterSpacing: '-0.05em' }}>100M+</h3>
            <p style={{ fontSize: '20px', textTransform: 'uppercase', letterSpacing: '0.4em', color: 'rgba(255,255,255,0.5)', marginTop: '20px', fontWeight: 600 }}>ANNUAL VISITORS</p>
            <p style={{ fontSize: '22px', lineHeight: 1.6, marginTop: '40px', color: 'rgba(255,255,255,0.7)', fontWeight: 300 }}>
              Unprecedented global exposure in a destination that never sleeps.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '40px' }}>
            {[
              { title: 'Global Tourist Hub', desc: 'Visitors from 190+ countries' },
              { title: 'High Spending Audience', desc: 'Luxury-focused shoppers' },
              { title: 'International Brand Exposure', desc: 'A global stage for your brand' }
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
                <div style={{ width: '12px', height: '12px', background: '#D4AF37', marginTop: '8px', borderRadius: '2px' }} />
                <div>
                  <h4 style={{ fontSize: '24px', fontFamily: "'Oswald', sans-serif", textTransform: 'uppercase', margin: 0 }}>{item.title}</h4>
                  <p style={{ color: 'rgba(255,255,255,0.5)', marginTop: '5px', fontSize: '18px' }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2 – BRAND ECOSYSTEM */}
      <section className="reveal-section" style={{ padding: '150px 10vw', backgroundColor: '#000' }}>
        <div style={{ textAlign: 'center', marginBottom: '100px' }}>
          <h2 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.8em', color: '#D4AF37', marginBottom: '20px', fontWeight: 600 }}>Curation</h2>
          <h2 style={{ fontSize: '56px', fontFamily: "'Oswald', sans-serif", textTransform: 'uppercase', margin: 0 }}>Elite Brand Ecosystem</h2>
        </div>
        
        <div style={{ display: 'grid', gap: '80px' }}>
          {BRAND_CATEGORIES.map((cat, idx) => (
            <div key={idx}>
              <h4 style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.4em', marginBottom: '30px', borderLeft: '2px solid #D4AF37', paddingLeft: '15px' }}>{cat.name}</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
                {cat.brands.map((brand, i) => (
                  <div 
                    key={i} 
                    style={{ 
                      height: '140px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      background: '#0a0a0a', 
                      border: '1px solid rgba(255,255,255,0.03)',
                      transition: 'all 0.5s ease',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.4)'
                      e.currentTarget.style.background = 'rgba(212, 175, 55, 0.03)'
                      const text = e.currentTarget.querySelector('span')
                      if (text) text.style.color = '#D4AF37'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.03)'
                      e.currentTarget.style.background = '#0a0a0a'
                      const text = e.currentTarget.querySelector('span')
                      if (text) text.style.color = 'rgba(255,255,255,0.3)'
                    }}
                  >
                    <span style={{ 
                      fontSize: '18px', 
                      fontFamily: "'Oswald', sans-serif", 
                      textTransform: 'uppercase', 
                      letterSpacing: '0.1em',
                      color: 'rgba(255,255,255,0.3)',
                      transition: 'color 0.4s ease'
                    }}>
                      {brand}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3 – EXPERIENCE / PRESENCE */}
      <section className="reveal-section" style={{ padding: '150px 10vw', backgroundColor: '#050505' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '120px', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '56px', fontFamily: "'Oswald', sans-serif", textTransform: 'uppercase', marginBottom: '60px', lineHeight: 1 }}>The Power<br />of Presence</h2>
            <div style={{ display: 'grid', gap: '50px' }}>
              {[
                { title: 'UNMATCHED VISIBILITY', desc: 'Prime placement in high-traffic corridors' },
                { title: 'PREMIUM POSITIONING', desc: 'Alongside global luxury leaders' },
                { title: 'HIGH CONVERSION', desc: 'Audience primed for premium shopping' }
              ].map((point, i) => (
                <div key={i}>
                  <h4 style={{ fontSize: '18px', fontFamily: "'Oswald', sans-serif", color: '#D4AF37', letterSpacing: '0.1em', marginBottom: '10px' }}>{point.title}</h4>
                  <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '18px', fontWeight: 300, lineHeight: 1.5 }}>{point.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div style={{ position: 'relative' }}>
            <div style={{ 
              height: '700px', 
              backgroundImage: 'url("/luxury_storefront_dubai_1777050334873.png")', 
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: '2px',
              boxShadow: '0 40px 80px rgba(0,0,0,0.6)'
            }} />
            <div style={{ 
              position: 'absolute', 
              bottom: '-30px', 
              right: '-30px', 
              width: '200px', 
              height: '200px', 
              border: '2px solid #D4AF37', 
              zIndex: -1 
            }} />
          </div>
        </div>
      </section>

      {/* SECTION 4 – FINAL CTA */}
      <section className="reveal-section" style={{ padding: '200px 10vw', textAlign: 'center', backgroundColor: '#000' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ 
            fontSize: 'clamp(36px, 6vw, 72px)', 
            fontFamily: "'Oswald', sans-serif", 
            textTransform: 'uppercase', 
            lineHeight: 1,
            marginBottom: '40px' 
          }}>
            Secure Your Space at The World’s Most Visited Destination
          </h2>
          <p style={{ fontSize: '22px', color: 'rgba(255,255,255,0.5)', fontWeight: 300, marginBottom: '60px' }}>
            Position your brand in front of millions every day.
          </p>
          
          <button style={{
            background: '#D4AF37',
            color: '#000',
            border: 'none',
            padding: '24px 80px',
            fontSize: '16px',
            fontFamily: "'Oswald', sans-serif",
            textTransform: 'uppercase',
            letterSpacing: '0.3em',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#fff'
            e.currentTarget.style.transform = 'translateY(-5px)'
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(255,255,255,0.1)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#D4AF37'
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = 'none'
          }}
          >
            Start Leasing Inquiry
          </button>
        </div>
      </section>

      <footer style={{ padding: '80px 10vw', backgroundColor: '#050505', borderTop: '1px solid rgba(255,255,255,0.03)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: 0.4, fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.3em' }}>
          <span>© 2026 THE DUBAI MALL</span>
          <div style={{ display: 'flex', gap: '40px' }}>
            <span>PRIVACY POLICY</span>
            <span>LEGAL TERMS</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
