import React from 'react';

interface DashboardBackgroundProps {
  bgRef: React.RefObject<HTMLDivElement>;
  introImageRef: React.RefObject<HTMLImageElement>;
}

export const DashboardBackground: React.FC<DashboardBackgroundProps> = ({ bgRef, introImageRef }) => {
  return (
    <>
      {/* LAYER 0: Main Background */}
      <div 
        ref={bgRef}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundImage: 'url("https://raw.githubusercontent.com/pratik-71/Liat-Ass/main/public/home.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0,
          opacity: 0
        }}
      />

      {/* LAYER 10: Depth Overlays */}
      <div 
        className="luxury-backdrop-overlay"
        style={{
          position: 'fixed',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(5,5,5,0.75) 0%, rgba(5,5,5,0.4) 40%, rgba(5,5,5,0.95) 100%)',
          zIndex: 10,
          opacity: 0,
          pointerEvents: 'none'
        }}
      />

      {/* VIGNETTE OVERLAY */}
      <div 
        style={{
          position: 'fixed',
          inset: 0,
          background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.5) 100%)',
          zIndex: 11,
          pointerEvents: 'none'
        }}
      />

      {/* LAYER 200: Intro Splash (Topmost during animation) */}
      <img 
        ref={introImageRef}
        src="https://raw.githubusercontent.com/pratik-71/Liat-Ass/main/public/home%20ann.jpg"
        alt="Intro"
        fetchPriority="high"
        style={{
          position: 'fixed',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 200,
          pointerEvents: 'none'
        }}
      />

      <div className="noise-texture" style={{ position: 'fixed', inset: 0, opacity: 0.03, pointerEvents: 'none', zIndex: 150, backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")', transform: 'translateZ(0)' }} />
    </>
  );
};
