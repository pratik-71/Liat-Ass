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
      className="luxury-card group"
      onClick={(e) => {
        const target = e.currentTarget;
        target.style.transition = 'transform 0.1s ease';
        target.style.transform = 'scale(0.98) translateY(-5px)';
        onSelect(card.id);
      }}
      onMouseEnter={(e) => {
        if (onHover) onHover(card.id);
        const target = e.currentTarget;
        target.style.transform = 'translateY(-15px) scale(1.05)';
        target.style.border = '1px solid rgba(229, 194, 122, 0.6)';
        target.style.boxShadow = '0 50px 100px rgba(0,0,0,0.6), inset 0 0 30px rgba(229, 194, 122, 0.05)';
        
        const shine = target.querySelector('.shine-sweep') as HTMLElement;
        if (shine) {
          shine.style.animation = 'none';
          void shine.offsetWidth;
          shine.style.animation = 'shine-sweep 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards';
        }
      }}
      onMouseLeave={(e) => {
        const target = e.currentTarget;
        target.style.transform = 'translateY(0) scale(1)';
        target.style.border = '1px solid rgba(200, 169, 106, 0.2)';
        target.style.boxShadow = '0 20px 60px rgba(0,0,0,0.4)';
        
        const shine = target.querySelector('.shine-sweep') as HTMLElement;
        if (shine) shine.style.animation = 'none';
      }}
      style={{
        position: 'relative',
        flex: isMobile ? '1 1 100%' : (isTablet ? '1 1 calc(50% - 20px)' : (isHero ? '1 1 320px' : '1 1 280px')),
        maxWidth: isMobile ? '100%' : (isTablet ? 'calc(50% - 20px)' : (isHero ? '360px' : '300px')),
        height: isMobile ? 'auto' : (isTablet ? 'auto' : (isHero ? '420px' : '400px')),
        minHeight: isMobile ? '300px' : (isTablet ? '380px' : '340px'),
        background: 'linear-gradient(165deg, rgba(8, 8, 8, 0.92) 0%, rgba(2, 2, 2, 0.98) 100%)',
        backdropFilter: 'blur(50px)',
        WebkitBackdropFilter: 'blur(50px)',
        border: '1px solid rgba(200, 169, 106, 0.12)',
        borderRadius: '20px',
        boxShadow: '0 25px 80px rgba(0,0,0,0.6)',
        overflow: 'hidden',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: isMobile ? '32px 24px' : '44px 36px',
        transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        transform: 'translateY(0) scale(1)',
        zIndex: isHero ? 2 : 1,
        willChange: 'transform'
      }}
    >
      <style>{`
        @keyframes shine-sweep {
          0% { left: -100%; opacity: 0; }
          30% { opacity: 0.3; }
          100% { left: 100%; opacity: 0; }
        }
        @keyframes text-shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .mashrabiya-pattern {
          position: absolute;
          inset: 0;
          opacity: 0.04;
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 30-30 30L0 30z' fill='none' stroke='%23C8A96A' stroke-width='1'/%3E%3C/svg%3E");
          background-size: 40px 40px;
          pointer-events: none;
          z-index: 0;
          will-change: transform;
        }
        .luxury-card-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 0%, rgba(200, 169, 106, 0.05) 0%, transparent 70%);
          pointer-events: none;
          z-index: 1;
        }
        @keyframes chromatic-glitch {
          0% { text-shadow: 2px 0 0 rgba(255,0,0,0.2), -2px 0 0 rgba(0,255,255,0.2); }
          25% { text-shadow: -2px 0 0 rgba(255,0,0,0.2), 2px 0 0 rgba(0,255,255,0.2); }
          50% { text-shadow: 2px 0 0 rgba(255,0,0,0.2), -2px 0 0 rgba(0,255,255,0.2); }
          75% { text-shadow: -2px 0 0 rgba(255,0,0,0.2), 2px 0 0 rgba(0,255,255,0.2); }
          100% { text-shadow: 2px 0 0 rgba(255,0,0,0.2), -2px 0 0 rgba(0,255,255,0.2); }
        }
        .group:hover .card-title {
          animation: chromatic-glitch 0.2s infinite;
          color: #E5C27A !important;
        }
        .group:hover .card-counter {
          filter: none !important;
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
        {/* Mashrabiya Geometric Pattern */}
        <div className="mashrabiya-pattern" />
        {/* Ambient Glow */}
        <div className="luxury-card-glow" />
      </div>

      {/* CORNER BRACKETS */}
      <div style={{ position: 'absolute', top: '15px', left: '15px', width: '20px', height: '20px', borderLeft: '1px solid rgba(229, 194, 122, 0.4)', borderTop: '1px solid rgba(229, 194, 122, 0.4)', zIndex: 5 }} />
      <div style={{ position: 'absolute', top: '15px', right: '15px', width: '20px', height: '20px', borderRight: '1px solid rgba(229, 194, 122, 0.4)', borderTop: '1px solid rgba(229, 194, 122, 0.4)', zIndex: 5 }} />
      <div style={{ position: 'absolute', bottom: '15px', left: '15px', width: '20px', height: '20px', borderLeft: '1px solid rgba(229, 194, 122, 0.4)', borderBottom: '1px solid rgba(229, 194, 122, 0.4)', zIndex: 5 }} />
      <div style={{ position: 'absolute', bottom: '15px', right: '15px', width: '20px', height: '20px', borderRight: '1px solid rgba(229, 194, 122, 0.4)', borderBottom: '1px solid rgba(229, 194, 122, 0.4)', zIndex: 5 }} />

      {/* SHIMMER CONTAINER (Reactive Glint) */}
      <div style={{
        position: 'absolute',
        inset: 0,
        borderRadius: '20px',
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

      <div style={{ position: 'relative', zIndex: 10, flex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
          <h3 
            className="card-title"
            style={{
              fontSize: '15px',
              fontWeight: 700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#FFFFFF',
              fontFamily: "'Oswald', sans-serif",
              margin: 0,
              textShadow: '0 2px 15px rgba(0,0,0,0.8)',
              opacity: 1,
              transition: 'all 0.5s ease'
            }}
          >
            {card.title}
          </h3>
          <div style={{ 
            width: '40px', 
            height: '40px', 
            borderRadius: '12px', 
            background: 'rgba(229, 194, 122, 0.05)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            border: '1px solid rgba(229, 194, 122, 0.2)',
            boxShadow: '0 0 20px rgba(229, 194, 122, 0.05)',
            transition: 'all 0.5s ease'
          }} className="group-hover:scale-110 group-hover:bg-[#C8A96A]/10 group-hover:border-[#E5C27A]">
            {card.id === 1 && (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E5C27A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            )}
            {card.id === 2 && (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E5C27A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M12 8v8"/><path d="M8 12h8"/></svg>
            )}
            {card.id === 3 && (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E5C27A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2v20"/><path d="M2 12h20"/></svg>
            )}
            {card.id === 4 && (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E5C27A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 7h-9"/><path d="M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/></svg>
            )}
          </div>
        </div>

        <div style={{ marginBottom: 'auto' }}>
          <div
            id={`stat-count-${card.id}`}
            className="card-counter"
            style={{
              fontSize: isMobile ? '64px' : '82px',
              fontFamily: "'Oswald', sans-serif",
              fontWeight: 800,
              textTransform: 'uppercase',
              lineHeight: 0.9,
              marginBottom: '12px',
              letterSpacing: '-0.04em',
              background: 'linear-gradient(110deg, #FFFFFF 0%, #E5C27A 45%, #FFFFFF 50%, #C8A96A 55%, #FFFFFF 100%)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'none',
              animation: 'text-shimmer 4s infinite linear'
            }}
          >
            0
          </div>
          {card.label && (
            <div style={{
              fontSize: '11px',
              color: 'rgba(255, 255, 255, 0.6)',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              fontWeight: 700,
              marginBottom: '32px'
            }}>
              {card.label}
            </div>
          )}
        </div>

        <div style={{ 
          marginTop: 'auto', 
          paddingTop: '24px', 
          borderTop: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          <p style={{
            fontSize: '14px',
            color: 'rgba(255, 255, 255, 0.7)',
            fontWeight: 300,
            lineHeight: 1.6,
            margin: 0
          }}>
            {card.desc}
          </p>
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            marginTop: '8px',
            opacity: 0,
            transform: 'translateX(-10px)',
            transition: 'all 0.5s ease',
          }} className="group-hover:opacity-100 group-hover:transform-none">
            <span style={{ fontSize: '10px', color: '#E5C27A', fontWeight: 700, letterSpacing: '0.2em' }}>EXPLORE MODULE</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#E5C27A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </div>
        </div>
      </div>
      
      {/* Bottom Accent Line */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: '10%',
        width: '80%',
        height: '2px',
        background: 'linear-gradient(90deg, transparent, #E5C27A, transparent)',
        opacity: 0,
        transition: 'opacity 0.6s ease'
      }} className="group-hover:opacity-100" />
    </div>
  );
};

export default React.memo(OpportunityCard);
