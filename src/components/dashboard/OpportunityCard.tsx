import React from 'react';
import type { OpportunityCardData } from '../../types';

interface OpportunityCardProps {
  card: OpportunityCardData;
  onSelect: (id: number) => void;
  onHover?: (id: number) => void;
}

const OpportunityCard: React.FC<OpportunityCardProps> = ({ card, onSelect, onHover }) => {
  const isHero = card.id === 2 || card.id === 3;

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const isTablet = typeof window !== 'undefined' && window.innerWidth < 1024;

  return (
    <div
      key={card.id}
      className="luxury-card"
      onClick={(e) => {
        const target = e.currentTarget;
        target.style.transition = 'transform 0.1s ease';
        target.style.transform = 'scale(0.95) translateY(-10px)';
        onSelect(card.id);
      }}
      style={{
        position: 'relative',
        flex: isMobile ? '1 1 100%' : (isTablet ? '1 1 45%' : (isHero ? '1 1 320px' : '1 1 280px')),
        maxWidth: isMobile ? '100%' : (isTablet ? '45%' : (isHero ? '360px' : '300px')),
        height: isMobile ? 'auto' : (isTablet ? '320px' : (isHero ? '380px' : '360px')),
        minHeight: isMobile ? '260px' : '300px',
        background: 'linear-gradient(160deg, #0f0f0f, #1a1a1a)',
        backdropFilter: 'blur(30px)',
        WebkitBackdropFilter: 'blur(30px)',
        border: '1px solid rgba(200, 169, 106, 0.3)',
        borderRadius: '16px',
        boxShadow: isHero 
          ? '0 35px 100px rgba(0,0,0,0.6)' 
          : '0 25px 80px rgba(0,0,0,0.5)',
        overflow: 'visible',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: isMobile ? '30px 24px' : (isTablet ? '40px 30px' : '52px 38px'),
        transition: 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.6s cubic-bezier(0.23, 1, 0.32, 1), border 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
        transform: 'translateY(0) rotateX(0) rotateY(0)',
        transformStyle: 'preserve-3d',
        zIndex: isHero ? 2 : 1,
        willChange: 'transform, opacity, box-shadow',
        animationDelay: `${card.id * 0.5}s`
      }}
      onMouseMove={(e) => {
        const target = e.currentTarget;
        const rect = target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;
        
        requestAnimationFrame(() => {
          target.style.transition = 'transform 0.1s ease-out, box-shadow 0.6s cubic-bezier(0.23, 1, 0.32, 1), border 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
          target.style.transform = `translateY(-20px) scale(1.05) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
      }}
      onMouseEnter={(e) => {
        if (onHover) onHover(card.id);
        const target = e.currentTarget;
        target.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.6s cubic-bezier(0.23, 1, 0.32, 1), border 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
        target.style.transform = 'translateY(-20px) scale(1.05) rotateX(0) rotateY(0)';
        target.style.border = '1px solid rgba(200, 169, 106, 0.8)';
        target.style.boxShadow = '0 80px 180px rgba(0,0,0,0.9), inset 0 0 20px rgba(200, 169, 106, 0.1)';
        
        const shine = target.querySelector('.shine-sweep') as HTMLElement;
        const title = target.querySelector('.card-title') as HTMLElement;
        const counter = target.querySelector('.card-counter') as HTMLElement;

        if (shine) {
          shine.style.animation = 'none';
          void shine.offsetWidth;
          // Spectral Shimmer (Rainbow Refraction)
          shine.style.background = 'linear-gradient(90deg, transparent, rgba(255,255,255,0.05), rgba(200,169,106,0.2), rgba(100,150,255,0.1), transparent)';
          shine.style.animation = 'shine 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards';
        }

        if (title) {
          title.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
          title.style.transform = 'translateZ(40px) translateY(-8px) scale(1.05)';
        }
        if (counter) {
          counter.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
          counter.style.transform = 'translateZ(80px) translateY(-15px) scale(1.1)';
        }
      }}
      onMouseLeave={(e) => {
        const target = e.currentTarget;
        target.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.6s cubic-bezier(0.23, 1, 0.32, 1), border 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
        target.style.transform = 'translateY(0) scale(1) rotateX(0) rotateY(0)';
        target.style.border = '1px solid rgba(200, 169, 106, 0.3)';
        target.style.boxShadow = isHero
          ? '0 35px 100px rgba(0,0,0,0.6)' 
          : '0 25px 80px rgba(0,0,0,0.5)';
        
        const shine = target.querySelector('.shine-sweep') as HTMLElement;
        const title = target.querySelector('.card-title') as HTMLElement;
        const counter = target.querySelector('.card-counter') as HTMLElement;

        if (shine) shine.style.animation = 'none';
        if (title) {
          title.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
          title.style.transform = 'translateZ(0) translateY(0) scale(1)';
        }
        if (counter) {
          counter.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
          counter.style.transform = 'translateZ(0) translateY(0) scale(1)';
        }
      }}
    >
      <style>{`
        @keyframes liquid-flow {
          0% { transform: translate(-10%, -10%) rotate(0deg); }
          50% { transform: translate(10%, 10%) rotate(180deg); }
          100% { transform: translate(-10%, -10%) rotate(360deg); }
        }
        @keyframes gold-dust {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          20% { opacity: 0.4; }
          80% { opacity: 0.4; }
          100% { transform: translateY(-100px) translateX(20px); opacity: 0; }
        }
        .liquid-gold-bg {
          position: absolute;
          inset: -50%;
          background: radial-gradient(circle at 50% 50%, rgba(229, 194, 122, 0.08) 0%, transparent 50%),
                      radial-gradient(circle at 20% 80%, rgba(200, 169, 106, 0.05) 0%, transparent 40%),
                      radial-gradient(circle at 80% 20%, rgba(138, 110, 63, 0.05) 0%, transparent 40%);
          filter: blur(40px);
          animation: liquid-flow 15s infinite alternate ease-in-out;
          pointer-events: none;
          z-index: 0;
          will-change: transform;
          transform: translateZ(0);
          backface-visibility: hidden;
        }
        .particle {
          position: absolute;
          width: 2px;
          height: 2px;
          background: #E5C27A;
          border-radius: 50%;
          pointer-events: none;
          z-index: 1;
          will-change: transform, opacity;
        }
      `}</style>

      {/* CLIPPING CONTAINER FOR BACKGROUND EFFECTS */}
      <div style={{
        position: 'absolute',
        inset: 0,
        borderRadius: '16px',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0
      }}>
        {/* AMBIENT LIQUID GOLD LAYER */}
        <div className="liquid-gold-bg" />

      {/* FLOATING GOLD DUST PARTICLES */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 1 }}>
        {React.useMemo(() => [...Array(6)].map((_, i) => (
          <div 
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100 + 20}%`,
              opacity: 0,
              animation: `gold-dust ${5 + Math.random() * 5}s infinite linear`,
              animationDelay: `${Math.random() * 5}s`,
              transform: `scale(${0.5 + Math.random()})`
            }}
          />
        )), [])}
      </div>
      </div>

      {/* SHIMMER CONTAINER (Refined for Glass Edge) */}
      <div style={{
        position: 'absolute',
        inset: 0,
        borderRadius: '16px',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 2
      }}>
        <div 
          className="shine-sweep"
          style={{
            position: 'absolute',
            top: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(229, 194, 122, 0.05), rgba(229, 194, 122, 0.15), rgba(229, 194, 122, 0.05), transparent)',
            transform: 'skewX(-25deg)',
            pointerEvents: 'none',
            opacity: 0
          }}
        />
      </div>

      <div style={{ position: 'relative', zIndex: 10, flex: 1, display: 'flex', flexDirection: 'column', transformStyle: 'preserve-3d' }}>
        <h3 
          className="card-title"
          style={{
            fontSize: isHero ? '16px' : '12px',
            fontWeight: 700,
            marginBottom: '20px',
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            color: '#FFFFFF',
            opacity: 0.9,
            fontFamily: "'Oswald', sans-serif",
            transition: 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
            transform: 'translateZ(0)'
          }}
        >
          {card.title}
        </h3>

        <div style={{ marginBottom: '60px', display: 'flex', flexDirection: 'column', transformStyle: 'preserve-3d' }}>
          <div
            id={`stat-count-${card.id}`}
            className="card-counter"
            style={{
              fontSize: '68px',
              fontFamily: "'Oswald', sans-serif",
              fontWeight: 800,
              textTransform: 'uppercase',
              lineHeight: 1,
              marginBottom: '8px',
              letterSpacing: '-0.02em',
              background: 'linear-gradient(110deg, #E5C27A 40%, #FFF5D6 50%, #C8A96A 60%)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'text-shimmer 3s infinite linear',
              transition: 'transform 0.7s cubic-bezier(0.23, 1, 0.32, 1)',
              transform: 'translateZ(0)'
            }}
          >
            0
          </div>
          {card.label && (
            <div style={{
              fontSize: '12px',
              color: 'rgba(255, 255, 255, 0.5)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              fontWeight: 700,
              transition: 'transform 0.5s ease',
              transform: 'translateZ(20px)'
            }}>
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
          paddingTop: '20px',
          transform: 'translateZ(10px)'
        }}>
          {card.desc}
        </p>
      </div>
    </div>
  );
};

export default React.memo(OpportunityCard);
