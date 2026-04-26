import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger);
gsap.config({ force3D: true });
gsap.defaults({ overwrite: 'auto' });

interface RetailLeasingModuleProps {
  onBack: () => void;
}

const GOLD = '#C8A96A';
const GOLD_LIGHT = '#E5C27A';
const MIDNIGHT = '#0A0A0A';

/* ─── Brand carousel data ───────────────────────────────────────────────────
   Replace `image` with the real asset path once you provide the photos.
   e.g. image: '/images/louis-vuitton.jpg'
──────────────────────────────────────────────────────────────────────────── */
const BRANDS = [
  { name: 'LOUIS VUITTON',  label: 'LOUIS VUITTON',  image: '/Retails/image%201.png' },
  { name: 'GUCCI',          label: 'GUCCI',           image: '/Retails/image%202.png' },
  { name: 'FASHION AVENUE', label: 'FASHION AVENUE',  image: '/Retails/image%203.png' },
  { name: 'CHANEL',         label: 'CHANEL',          image: '/Retails/image%204.png' },
  { name: 'HERMÈS',         label: 'HERMÈS',          image: '/Retails/image%205.png' },
  { name: 'THE DUBAI MALL', label: 'THE DUBAI MALL',  image: '/Retails/image%206.png' },
  { name: 'DIOR',           label: 'DIOR',            image: '/Retails/image%207.png' },
  { name: 'BURBERRY',       label: 'BURBERRY',        image: '/Retails/image%208.png' },
  { name: 'VERSACE',        label: 'VERSACE',         image: '/Retails/image%209.png' },
];

const WhyChooseSection: React.FC = React.memo(() => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const blocksRef = useRef<(HTMLDivElement | null)[]>([]);
  const visualRef = useRef<HTMLDivElement>(null);
  const [hoveredBlock, setHoveredBlock] = useState<number | null>(null);
  const [currentImageIdx, setCurrentImageIdx] = useState(0);

  const images = [
    '/Retails/image%202.png',
    '/Retails/image%204.png',
    '/Retails/image%205.png',
    '/Retails/image%207.png'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIdx((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Section Entry
      gsap.fromTo(sectionRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%",
            end: "top 40%",
            scrub: 1,
          }
        }
      );

      // Heading Animation
      gsap.fromTo(headingRef.current,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1, scale: 1,
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 95%",
            end: "top 60%",
            scrub: 1,
          }
        }
      );

      // Value Blocks
      blocksRef.current.forEach((block) => {
        if (block) {
          gsap.fromTo(block,
            { opacity: 0, x: -30 },
            {
              opacity: 1, x: 0,
              scrollTrigger: {
                trigger: block,
                start: "top 95%",
                end: "top 70%",
                scrub: 1,
              }
            }
          );
        }
      });

      // Right Visual Parallax
      if (visualRef.current) {
        gsap.fromTo(visualRef.current,
          { y: -30, scale: 1.1 },
          {
            y: 30, scale: 1,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      style={{
        display: 'flex',
        padding: '80px 48px',
        gap: '40px',
        opacity: 0, // starts hidden
        backgroundColor: MIDNIGHT,
        color: '#fff',
        fontFamily: "'Oswald', 'Inter', sans-serif",
      }}
    >
      {/* LEFT SIDE: 60% */}
      <div style={{ flex: '0 0 60%', display: 'flex', flexDirection: 'column', gap: '40px' }}>
        <div ref={headingRef} style={{ opacity: 0 }}>
          <h2 style={{
            fontSize: 'clamp(40px, 5vw, 64px)',
            fontWeight: 800,
            textTransform: 'uppercase',
            color: GOLD_LIGHT,
            lineHeight: 1.1,
            margin: '0 0 16px 0',
            fontFamily: "'Oswald', sans-serif",
            letterSpacing: '0.02em'
          }}>
            Why Retailers Choose This Platform
          </h2>
          <p style={{
            fontSize: '18px',
            color: 'rgba(255,255,255,0.7)',
            margin: 0,
            fontFamily: "'Inter', sans-serif",
            maxWidth: '85%',
            lineHeight: 1.5
          }}>
            Unmatched footfall, global visibility, and a high-spending audience—built for brands that scale.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {[
            {
              title: '1. Prime Exposure',
              desc: 'Located within the highest-traffic zones, your brand gains visibility from millions of visitors daily.'
            },
            {
              title: '2. Global Audience',
              desc: 'Engage a diverse, international audience with strong purchasing power and premium intent.'
            },
            {
              title: '3. Proven Performance',
              desc: 'Join a retail ecosystem where top global brands consistently drive growth and revenue.'
            }
          ].map((item, idx) => (
            <div
              key={idx}
              ref={el => { blocksRef.current[idx] = el; }}
              onMouseEnter={() => setHoveredBlock(idx)}
              onMouseLeave={() => setHoveredBlock(null)}
              style={{
                opacity: 0,
                padding: '28px 32px',
                borderRadius: '12px',
                backgroundColor: 'rgba(255,255,255,0.02)',
                border: `1px solid ${hoveredBlock === idx ? 'rgba(200,169,106,0.5)' : 'rgba(255,255,255,0.05)'}`,
                boxShadow: hoveredBlock === idx ? '0 8px 30px rgba(200,169,106,0.12)' : 'none',
                transform: hoveredBlock === idx ? 'translateY(-4px)' : 'translateY(0)',
                transition: 'all 0.3s ease',
                cursor: 'default',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}
            >
              <h3 style={{
                fontSize: '22px',
                color: GOLD,
                margin: 0,
                fontFamily: "'Oswald', sans-serif",
                letterSpacing: '0.05em',
                fontWeight: 600
              }}>{item.title}</h3>
              <p style={{
                fontSize: '15px',
                color: 'rgba(255,255,255,0.65)',
                margin: 0,
                fontFamily: "'Inter', sans-serif",
                lineHeight: 1.6
              }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT SIDE: 40% */}
      <div style={{
        flex: '1',
        position: 'relative',
        borderRadius: '16px',
        overflow: 'hidden',
        border: '1px solid rgba(200,169,106,0.1)',
        backgroundColor: '#0a0a0a',
        minHeight: '400px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div ref={visualRef} style={{ position: 'absolute', inset: -20 }}>
          {images.map((img, idx) => (
            <div
              key={idx}
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `url('${img}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: currentImageIdx === idx ? 0.35 : 0,
                filter: 'blur(3px)',
                transition: 'opacity 1.5s ease-in-out'
              }}
            />
          ))}
        </div>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, rgba(10,10,10,0.4) 0%, rgba(10,10,10,0.9) 100%)',
          pointerEvents: 'none'
        }} />
        
        {/* Overlay Text */}
        <div style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          padding: '40px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
          maxWidth: '85%'
        }}>
          <h3 style={{
            fontSize: 'clamp(28px, 4vw, 40px)',
            fontWeight: 700,
            color: GOLD_LIGHT,
            fontFamily: "'Oswald', sans-serif",
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            margin: 0,
            textShadow: '0 4px 20px rgba(0,0,0,0.5)'
          }}>
            The Heart of Luxury
          </h3>
          <p style={{
            fontSize: '16px',
            color: 'rgba(255,255,255,0.85)',
            fontFamily: "'Inter', sans-serif",
            lineHeight: 1.6,
            margin: 0,
            textShadow: '0 2px 10px rgba(0,0,0,0.5)'
          }}>
            Experience a world-class environment where premium aesthetics meet exceptional retail performance. Position your brand alongside the finest in the world.
          </p>
        </div>
      </div>
    </div>
  );
});

const DailySpendHighlight: React.FC = React.memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Glow background parallax
      gsap.fromTo('.bg-glow', 
        { rotate: -15, scale: 1, xPercent: 10 },
        { 
          rotate: -5, scale: 1.2, xPercent: -10,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1
          }
        }
      );

      // Main container entry
      gsap.fromTo(containerRef.current,
        { opacity: 0, scale: 0.9, y: 50 },
        {
          opacity: 1, scale: 1, y: 0,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 95%",
            end: "top 60%",
            scrub: 1
          }
        }
      );

      // Text parallax
      gsap.fromTo('.daily-spend-text',
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "top 50%",
            scrub: 1
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        margin: '0 48px 60px 48px',
        padding: '48px 56px',
        borderRadius: '16px',
        background: 'linear-gradient(135deg, rgba(200,169,106,0.12) 0%, rgba(10,10,10,0.8) 100%)',
        border: '1px solid rgba(200,169,106,0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 20px 40px rgba(0,0,0,0.3), inset 0 0 40px rgba(200,169,106,0.05)',
        opacity: 0,
      }}
    >
      <div className="bg-glow" style={{
        position: 'absolute',
        right: '-10%',
        top: '-50%',
        width: '60%',
        height: '200%',
        background: 'radial-gradient(ellipse at center, rgba(200,169,106,0.15) 0%, transparent 70%)',
        pointerEvents: 'none',
        transform: 'rotate(-15deg)'
      }} />

      <div className="daily-spend-text" style={{ zIndex: 1, flex: '1 1 auto' }}>
        <h3 style={{
          fontSize: '13px',
          textTransform: 'uppercase',
          letterSpacing: '0.3em',
          color: GOLD,
          marginBottom: '16px',
          fontWeight: 600,
          fontFamily: "'Inter', sans-serif"
        }}>
          Unrivaled Purchasing Power
        </h3>
        <div style={{
          fontSize: 'clamp(32px, 4vw, 42px)',
          color: 'rgba(255,255,255,0.9)',
          fontWeight: 700,
          fontFamily: "'Oswald', sans-serif",
          lineHeight: 1.1,
          letterSpacing: '0.02em'
        }}>
          OVER <span style={{
            fontSize: 'clamp(48px, 6vw, 64px)',
            color: GOLD_LIGHT,
            fontWeight: 800,
            textShadow: '0 0 30px rgba(200,169,106,0.4)'
          }}>$50M+</span> SPENT EVERY DAY
        </div>
      </div>
      
      <div style={{
        zIndex: 1,
        flex: '0 0 35%',
        paddingLeft: '40px',
        borderLeft: '1px solid rgba(200,169,106,0.2)'
      }}>
        <p style={{
          fontSize: '16px',
          color: 'rgba(255,255,255,0.7)',
          lineHeight: 1.6,
          margin: 0,
          fontFamily: "'Inter', sans-serif"
        }}>
          Tap into a captive audience where high conversion rates and premium spending are the daily standard. Your brand is positioned where the world comes to shop.
        </p>
      </div>
    </div>
  );
});

const StatStrip: React.FC = React.memo(() => {
  const stripRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      wordsRef.current.forEach((word) => {
        if (word) {
          gsap.fromTo(word,
            { opacity: 0, y: 15 },
            {
              opacity: 1, y: 0,
              scrollTrigger: {
                trigger: stripRef.current,
                start: "top 95%",
                end: "top 75%",
                scrub: 1
              }
            }
          );
        }
      });
    }, stripRef);
    return () => ctx.revert();
  }, []);

  const stats = [
    '100M+ Visitors', '•',
    '1200+ Stores', '•',
    'Global Audience', '•',
    'High Spending Power'
  ];

  return (
    <div
      ref={stripRef}
      style={{
        padding: '32px 48px',
        borderTop: '1px solid rgba(200,169,106,0.15)',
        borderBottom: '1px solid rgba(200,169,106,0.15)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '32px',
        backgroundColor: 'rgba(255,255,255,0.01)',
        marginBottom: '60px'
      }}
    >
      {stats.map((text, idx) => (
        <span
          key={idx}
          ref={el => { wordsRef.current[idx] = el; }}
          style={{
            opacity: 0,
            fontSize: text === '•' ? '16px' : '13px',
            textTransform: 'uppercase',
            letterSpacing: '0.25em',
            color: text === '•' ? GOLD : 'rgba(255,255,255,0.7)',
            fontWeight: text === '•' ? 400 : 600,
            fontFamily: "'Inter', sans-serif"
          }}
        >
          {text}
        </span>
      ))}
    </div>
  );
});

const RetailLeasingModule: React.FC<RetailLeasingModuleProps> = ({ onBack }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef      = useRef<HTMLDivElement>(null);
  const [hoveredBtn, setHoveredBtn] = useState<string | null>(null);

  /* ── entrance animation ── */
  useEffect(() => {
    let ctx = gsap.context(() => {
      // Entrance
      gsap.fromTo(containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: 'power3.out' }
      );
      gsap.fromTo(heroRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: 'power3.out' }
      );

      // Hero Parallax Scrub
      gsap.to('.hero-bg-image', {
        y: 80,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  /* ── double brands array for seamless infinite loop ── */
  const LOOP_BRANDS = [...BRANDS, ...BRANDS];

  /* ─────────────────────────────────── RENDER ─────────────────────────────── */
  return (
    <div
      ref={containerRef}
      style={{
        minHeight: '100vh',
        width: '100vw',
        backgroundColor: MIDNIGHT,
        color: '#FFFFFF',
        fontFamily: "'Oswald', 'Inter', sans-serif",
        overflowX: 'hidden',
        position: 'relative',
        boxSizing: 'border-box',
      }}
    >
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}>

      {/* ══════════════════════════════ NAV ══════════════════════════════ */}
      <nav style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '18px 48px',
        borderBottom: '1px solid rgba(200,169,106,0.1)',
        flexShrink: 0,
        backgroundColor: MIDNIGHT,
        zIndex: 10,
      }}>
        <span style={{
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          color: GOLD_LIGHT,
        }}>
          The Dubai Mall &nbsp;·&nbsp; Retail &amp; Leasing
        </span>

        <button
          onClick={onBack}
          onMouseEnter={() => setHoveredBtn('back')}
          onMouseLeave={() => setHoveredBtn(null)}
          style={{
            background: hoveredBtn === 'back' ? 'rgba(200,169,106,0.08)' : 'transparent',
            border: `1px solid ${hoveredBtn === 'back' ? GOLD_LIGHT : 'rgba(200,169,106,0.35)'}`,
            color: GOLD,
            padding: '8px 20px',
            borderRadius: '50px',
            cursor: 'pointer',
            textTransform: 'uppercase',
            letterSpacing: '0.18em',
            fontSize: '11px',
            fontFamily: "'Oswald', sans-serif",
            fontWeight: 500,
            transition: 'all 0.25s ease',
          }}
        >
          ← Dashboard
        </button>
      </nav>

      {/* ══════════════════════════════ HERO ══════════════════════════════ */}
      <div
        ref={heroRef}
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          flex: '1 1 0',
          minHeight: 0,
          padding: '40px 48px 32px',
          gap: '40px',
          alignItems: 'center',
        }}
      >
        {/* ── Left: Text ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
          {/* badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '11px',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: GOLD,
            fontWeight: 600,
          }}>
            <span style={{ width: 28, height: 1, backgroundColor: GOLD, opacity: 0.7, display: 'inline-block' }} />
            Retail &amp; Leasing
          </div>

          {/* main title */}
          <h1 style={{
            fontSize: 'clamp(52px, 6.5vw, 88px)',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            lineHeight: 1,
            margin: 0,
            color: GOLD_LIGHT,
            textShadow: '0 2px 24px rgba(200,169,106,0.18)',
          }}>
            Retail &amp;<br />Leasing
          </h1>

          {/* gold divider */}
          <div style={{
            width: 40,
            height: 2,
            background: `linear-gradient(90deg, ${GOLD}, transparent)`,
          }} />

          {/* headline */}
          <p style={{
            fontSize: '16px',
            fontWeight: 400,
            lineHeight: 1.5,
            color: 'rgba(255,255,255,0.82)',
            margin: 0,
            maxWidth: 400,
            fontFamily: "'Inter', sans-serif",
          }}>
            Position Your Brand at the World's Most Powerful Retail Destination
          </p>

          {/* stats strip */}
          <p style={{
            fontSize: '11px',
            color: 'rgba(255,255,255,0.4)',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            margin: 0,
            fontWeight: 500,
          }}>
            1,200+ Outlets &nbsp;·&nbsp; 100M+ Annual Visitors &nbsp;·&nbsp; Global High-Spending Audience
          </p>
        </div>

        {/* ── Right: Stats panel ── */}
        <div style={{
          position: 'relative',
          height: '100%',
          maxHeight: 360,
          borderRadius: '14px',
          overflow: 'hidden',
          border: '1px solid rgba(200,169,106,0.15)',
          background: 'linear-gradient(135deg, #1c140a 0%, #100d07 50%, #0A0A0A 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 0,
        }}>
          {/* glow overlay */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse 70% 55% at 50% 38%, rgba(200,169,106,0.09) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          {/* ── HERO RIGHT BACKGROUND IMAGE ── */}
          <div className="hero-bg-image" style={{
            position: 'absolute',
            inset: -40, // Increased inset to allow parallax movement
            backgroundImage: `url('/Retails/big%20one.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.75,
            filter: 'blur(1px) brightness(0.6)',
            willChange: 'transform'
          }} />

          {/* ── dark scrim — makes stats legible over the image ── */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(160deg, rgba(0,0,0,0.42) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.48) 100%)',
            pointerEvents: 'none',
          }} />

          {/* content */}
          <div style={{ position: 'relative', zIndex: 1, width: '100%', padding: '36px 40px', boxSizing: 'border-box' }}>
            {/* big stat */}
            <div style={{ textAlign: 'center', marginBottom: 32 }}>
              <div style={{
                fontSize: 'clamp(56px, 7vw, 90px)',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                lineHeight: 1,
                color: GOLD_LIGHT,
              }}>
                100M+
              </div>
              <div style={{
                fontSize: '10px',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.7)',
                marginTop: 8,
                fontWeight: 600,
              }}>
                Annual Visitors
              </div>
            </div>

            {/* separator */}
            <div style={{
              width: '100%',
              height: 1,
              background: 'linear-gradient(90deg, transparent, rgba(200,169,106,0.2), transparent)',
              marginBottom: 28,
            }} />

            {/* two small stats */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1px 1fr' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 700, color: GOLD_LIGHT, lineHeight: 1 }}>1,200+</div>
                <div style={{ fontSize: '10px', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.75)', marginTop: 7, fontWeight: 600 }}>Retail Outlets</div>
              </div>
              <div style={{ backgroundColor: 'rgba(200,169,106,0.12)', width: 1 }} />
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 700, color: GOLD_LIGHT, lineHeight: 1 }}>500K</div>
                <div style={{ fontSize: '10px', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.75)', marginTop: 7, fontWeight: 600 }}>sqm GLA</div>
              </div>
            </div>
          </div>

          {/* corner ornaments */}
          {[
            { top: 16, left: 16,  borderTop: `1px solid rgba(200,169,106,0.3)`, borderLeft:  `1px solid rgba(200,169,106,0.3)` },
            { bottom: 16, right: 16, borderBottom: `1px solid rgba(200,169,106,0.3)`, borderRight: `1px solid rgba(200,169,106,0.3)` },
          ].map((s, i) => (
            <div key={i} style={{ position: 'absolute', width: 28, height: 28, borderRadius: 2, ...s }} />
          ))}
        </div>
      </div>


      {/* ══════════════════════════ BRAND CAROUSEL ══════════════════════════ */}
      <style>{`
        @keyframes marquee-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          animation: marquee-scroll 28s linear infinite;
          will-change: transform;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div style={{
        flexShrink: 0,
        overflow: 'hidden',
        backgroundColor: '#080808',
      }}>
        {/* Infinite scroll track — contains brands doubled for seamless loop */}
        <div
          className="marquee-track"
          style={{
            display: 'flex',
            width: 'max-content',
          }}
        >
          {LOOP_BRANDS.map((brand, i) => (
            <div
              key={i}
              style={{
                width: '160px',
                aspectRatio: '1 / 1',
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '8px',
                flexShrink: 0,
                backgroundColor: '#0c0a06',
                marginRight: '10px',
              }}
            >
              {/* image — using backgroundImage NOT background shorthand to avoid CSS reset */}
              <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: brand.image ? `url('${brand.image}')` : 'none',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundColor: '#0c0a06',
              }} />
              {/* fallback gradient shown only when no image */}
              {!brand.image && (
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(160deg, #18120a 0%, #0f0c07 60%, #080808 100%)',
                }} />
              )}

              {/* bottom gradient backdrop for label */}
              <div style={{
                position: 'absolute',
                bottom: 0, left: 0, right: 0,
                height: '70%',
                background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.5) 50%, transparent 100%)',
              }} />

              {/* brand label */}
              <div style={{
                position: 'absolute',
                bottom: 10, left: 0, right: 0,
                textAlign: 'center',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: '#ffffff',
                textShadow: '0 1px 8px rgba(0,0,0,0.9)',
              }}>
                {brand.label}
              </div>

              {/* placeholder center name (no image yet) */}
              {!brand.image && (
                <div style={{
                  position: 'absolute',
                  top: '50%', left: '50%',
                  transform: 'translate(-50%, -60%)',
                  textAlign: 'center',
                  fontSize: '13px',
                  fontWeight: 700,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'rgba(200,169,106,0.55)',
                }}>
                  {brand.name}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      </div>

      <WhyChooseSection />
      <DailySpendHighlight />
      <StatStrip />
    </div>
  );
};

export default RetailLeasingModule;
