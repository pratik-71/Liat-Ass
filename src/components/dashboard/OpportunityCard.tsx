import React from 'react';
import type { OpportunityCardData } from '../../types';

interface OpportunityCardProps {
  card: OpportunityCardData;
  onSelect: (id: number) => void;
}

const OpportunityCard: React.FC<OpportunityCardProps> = ({ card, onSelect }) => {
  const isHero = card.id === 2 || card.id === 3;

  return (
    <div
      key={card.id}
      className="luxury-card"
      onClick={() => onSelect(card.id)}
      style={{
        position: 'relative',
        flex: window.innerWidth < 768 ? '1 1 100%' : (isHero ? '1 1 340px' : '1 1 280px'),
        maxWidth: window.innerWidth < 768 ? '100%' : (isHero ? '360px' : '300px'),
        height: window.innerWidth < 768 ? 'auto' : (isHero ? '55vh' : '53vh'),
        minHeight: window.innerWidth < 768 ? '300px' : (isHero ? '420px' : '400px'),
        background: 'linear-gradient(160deg, #0f0f0f, #1a1a1a)',
        backdropFilter: 'blur(30px)',
        WebkitBackdropFilter: 'blur(30px)',
        border: '1px solid rgba(200, 169, 106, 0.3)',
        borderRadius: '16px',
        boxShadow: isHero 
          ? '0 35px 100px rgba(0,0,0,0.6)' 
          : '0 25px 80px rgba(0,0,0,0.5)',
        overflow: 'visible', // Keep visible for 3D depth
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '52px 38px',
        transition: 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
        transform: 'translateY(0) rotateX(0) rotateY(0)',
        transformStyle: 'preserve-3d',
        zIndex: isHero ? 2 : 1,
        willChange: 'transform, opacity, box-shadow'
      }}
      onMouseEnter={(e) => {
        const target = e.currentTarget;
        target.style.transform = 'translateY(-20px) scale(1.05)';
        target.style.border = '1px solid rgba(255, 255, 255, 0.5)';
        target.style.boxShadow = '0 80px 180px rgba(0,0,0,0.9)';
        
        const shine = target.querySelector('.shine-sweep') as HTMLElement;
        const title = target.querySelector('.card-title') as HTMLElement;
        const counter = target.querySelector('.card-counter') as HTMLElement;

        if (shine) {
          shine.style.animation = 'none';
          void shine.offsetWidth;
          shine.style.animation = 'shine 0.9s cubic-bezier(0.4, 0, 0.2, 1) forwards';
        }

        if (title) title.style.transform = 'translateZ(40px) translateY(-8px) scale(1.05)';
        if (counter) counter.style.transform = 'translateZ(80px) translateY(-15px) scale(1.1)';
      }}
      onMouseLeave={(e) => {
        const target = e.currentTarget;
        target.style.transform = 'translateY(0) scale(1)';
        target.style.border = '1px solid rgba(200, 169, 106, 0.3)';
        target.style.boxShadow = isHero
          ? '0 35px 100px rgba(0,0,0,0.6)' 
          : '0 25px 80px rgba(0,0,0,0.5)';
        
        const shine = target.querySelector('.shine-sweep') as HTMLElement;
        const title = target.querySelector('.card-title') as HTMLElement;
        const counter = target.querySelector('.card-counter') as HTMLElement;

        if (shine) shine.style.animation = 'none';
        if (title) title.style.transform = 'translateZ(0) translateY(0) scale(1)';
        if (counter) counter.style.transform = 'translateZ(0) translateY(0) scale(1)';
      }}
    >
      {/* SHIMMER CONTAINER (Handles Clipping) */}
      <div style={{
        position: 'absolute',
        inset: 0,
        borderRadius: '16px',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0
      }}>
        <div 
          className="shine-sweep"
          style={{
            position: 'absolute',
            top: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), rgba(255,255,255,0.2), rgba(255,255,255,0.1), transparent)',
            transform: 'skewX(-25deg)',
            pointerEvents: 'none',
            opacity: 0
          }}
        />
      </div>

      <div style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column', transformStyle: 'preserve-3d' }}>
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

        <div style={{ marginBottom: 'auto', display: 'flex', flexDirection: 'column', transformStyle: 'preserve-3d' }}>
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

export default OpportunityCard;
