import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

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
  { name: 'LOUIS VUITTON', label: 'LOUIS VUITTON', image: '' },
  { name: 'GUCCI',         label: 'GUCCI',         image: '' },
  { name: 'FASHION AVENUE',label: 'FASHION AVENUE', image: '' },
  { name: 'CHANEL',        label: 'CHANEL',         image: '' },
  { name: 'HERMÈS',        label: 'HERMÈS',         image: '' },
  { name: 'THE DUBAI MALL',label: 'THE DUBAI MALL', image: '' },
];

const RetailLeasingModule: React.FC<RetailLeasingModuleProps> = ({ onBack }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef      = useRef<HTMLDivElement>(null);
  const [hoveredBtn, setHoveredBtn] = useState<string | null>(null);

  /* ── entrance animation ── */
  useEffect(() => {
    gsap.fromTo(containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: 'power3.out' }
    );
    gsap.fromTo(heroRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: 'power3.out' }
    );
  }, []);

  /* ── double brands array for seamless infinite loop ── */
  const LOOP_BRANDS = [...BRANDS, ...BRANDS];

  /* ─────────────────────────────────── RENDER ─────────────────────────────── */
  return (
    <div
      ref={containerRef}
      style={{
        height: '100vh',
        width: '100vw',
        backgroundColor: MIDNIGHT,
        color: '#FFFFFF',
        fontFamily: "'Oswald', 'Inter', sans-serif",
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative',
        boxSizing: 'border-box',
      }}
    >

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

          {/* ── IMAGE SLOT (drop your background image here) ──
              When you have an image, add: backgroundImage: 'url("/your-image.jpg")'
              and set backgroundSize: 'cover', backgroundPosition: 'center'
          */}
          <div style={{
            position: 'absolute',
            inset: 0,
            /* backgroundImage: 'url("/path-to-your-image.jpg")', */
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.35,
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
                color: 'rgba(255,255,255,0.38)',
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
                <div style={{ fontSize: '10px', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginTop: 7, fontWeight: 600 }}>Retail Outlets</div>
              </div>
              <div style={{ backgroundColor: 'rgba(200,169,106,0.12)', width: 1 }} />
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 700, color: GOLD_LIGHT, lineHeight: 1 }}>500K</div>
                <div style={{ fontSize: '10px', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginTop: 7, fontWeight: 600 }}>sqm GLA</div>
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

      {/* ═══════════════════════════ GOLD SEPARATOR ═══════════════════════════ */}
      <div style={{
        height: 1,
        background: 'linear-gradient(90deg, transparent 0%, rgba(200,169,106,0.5) 20%, rgba(200,169,106,0.5) 80%, transparent 100%)',
        flexShrink: 0,
      }} />

      {/* ══════════════════════════ BRAND CAROUSEL ══════════════════════════ */}
      <style>{`
        @keyframes marquee-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          animation: marquee-scroll 28s linear infinite;
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
                width: `calc(100vw / 6)`,
                position: 'relative',
                height: 170,
                overflow: 'hidden',
                borderRight: '1px solid rgba(200,169,106,0.08)',
                flexShrink: 0,
              }}
            >
              {/* ── IMAGE SLOT ──────────────────────────────────────
                  When you provide images set the image field in BRANDS.
                  e.g. image: '/images/louis-vuitton.jpg'
              ─────────────────────────────────────────────────────── */}
              <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: brand.image ? `url("${brand.image}")` : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                background: brand.image
                  ? undefined
                  : `linear-gradient(160deg, #18120a 0%, #0f0c07 60%, #080808 100%)`,
              }} />

              {/* bottom gradient for label */}
              <div style={{
                position: 'absolute',
                bottom: 0, left: 0, right: 0,
                height: '55%',
                background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)',
              }} />

              {/* brand label */}
              <div style={{
                position: 'absolute',
                bottom: 12, left: 0, right: 0,
                textAlign: 'center',
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.65)',
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
  );
};

export default RetailLeasingModule;
