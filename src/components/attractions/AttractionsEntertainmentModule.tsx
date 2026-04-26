import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AttractionsModuleProps {
  onBack: () => void;
}

/* ==========================================================================
   1. HERO GRID (Exploratory UI)
   ========================================================================== */
const GridHeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const tilesRef = useRef<(HTMLDivElement | null)[]>([]);

  const experiences = [
    { title: 'DUBAI AQUARIUM', desc: 'One of the world’s largest suspended aquariums', image: 'https://images.unsplash.com/photo-1582967788606-a171c1080cb0?q=80&w=2000&auto=format&fit=crop', stats: { visitors: '1.5M+', rev: '$45M+', roi: '18% IRR' } },
    { title: 'CHINATOWN', desc: 'A fully immersive cultural retail and dining district', image: 'https://images.unsplash.com/photo-1552010099-5dc86fcfaa38?q=80&w=2000&auto=format&fit=crop', stats: { visitors: '3M+', rev: '$120M+', roi: '22% IRR' } },
    { title: 'VIRTUAL REALITY PARK', desc: 'Next-generation immersive entertainment', image: 'https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?q=80&w=2000&auto=format&fit=crop', stats: { visitors: '800K+', rev: '$25M+', roi: '25% IRR' } },
    { title: 'OLYMPIC ICE RINK', desc: 'A unique leisure and sports experience', image: 'https://images.unsplash.com/photo-1583324626673-10f5451e5e03?q=80&w=2000&auto=format&fit=crop', stats: { visitors: '500K+', rev: '$15M+', roi: '14% IRR' } },
    { title: 'KIDZANIA', desc: 'Interactive learning and entertainment for families', image: 'https://images.unsplash.com/photo-1519335198006-2580540d5e18?q=80&w=2000&auto=format&fit=crop', stats: { visitors: '1.2M+', rev: '$35M+', roi: '20% IRR' } },
    { title: 'PREMIUM CINEMAS', desc: 'Luxury viewing and entertainment experiences', image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2000&auto=format&fit=crop', stats: { visitors: '2M+', rev: '$60M+', roi: '16% IRR' } },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in grid container
      gsap.fromTo(gridRef.current, 
        { opacity: 0 }, 
        { opacity: 1, duration: 1, ease: 'power2.out', delay: 0.2 }
      );

      // Staggered tiles reveal
      tilesRef.current.forEach((tile, i) => {
        if (!tile) return;
        gsap.fromTo(tile,
          { opacity: 0, y: 40, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'back.out(1.2)', delay: 0.4 + (i * 0.1) }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full min-h-screen bg-[#070707] pt-32 pb-24 px-6 md:px-12 relative">
      <div className="max-w-[1600px] mx-auto w-full">
        {/* Title to anchor the grid */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-[#E5C27A] uppercase tracking-widest font-['Oswald']">
            Explore <span className="text-white">Attractions</span>
          </h1>
          <p className="text-[#C8A96A] tracking-widest uppercase text-sm mt-4 font-medium">A Journey Through Multiple Worlds</p>
        </div>

        {/* 3x2 Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 opacity-0">
          {experiences.map((exp, idx) => (
            <div 
              key={idx}
              ref={el => { tilesRef.current[idx] = el; }}
              className="group relative h-[350px] md:h-[400px] rounded-2xl overflow-hidden cursor-pointer"
            >
              {/* Background Image with slight scale on hover */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-in-out group-hover:scale-105"
                style={{ backgroundImage: `url('${exp.image}')` }}
              ></div>
              
              {/* Dark Overlay - darkens on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10 transition-colors duration-500 group-hover:bg-black/60 group-hover:from-black/95"></div>

              {/* Interactive Content Box */}
              <div className="absolute bottom-4 left-4 right-4 p-6 rounded-2xl transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] transform translate-y-2 group-hover:-translate-y-6 group-hover:bg-black/50 group-hover:backdrop-blur-lg border border-transparent group-hover:border-white/10 group-hover:shadow-[0_30px_50px_-12px_rgba(0,0,0,1)] z-10">
                <h3 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-wide font-['Oswald'] opacity-90 group-hover:opacity-100 group-hover:text-[#E5C27A] transition-all duration-300 drop-shadow-md">
                  {exp.title}
                </h3>
                {/* Content Swap Wrapper */}
                <div className="relative mt-2 h-[50px]">
                  {/* Description (visible by default, hides instantly on hover) */}
                  <div className="absolute inset-0 transition-all duration-300 opacity-100 group-hover:opacity-0 group-hover:-translate-y-2 pointer-events-none">
                    <p className="text-neutral-300 text-sm md:text-base font-light line-clamp-2">
                      {exp.desc}
                    </p>
                  </div>

                  {/* Hover Stats (Investor Data - reveals instantly on hover) */}
                  <div className="absolute inset-0 transition-all duration-300 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 flex gap-5 pt-2 border-t border-[#C8A96A]/20 pointer-events-none">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-neutral-300 uppercase tracking-wider font-semibold">Visitors</span>
                      <span className="text-white font-bold text-lg font-['Oswald'] tracking-wider leading-tight">{exp.stats.visitors}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-neutral-300 uppercase tracking-wider font-semibold">Revenue</span>
                      <span className="text-white font-bold text-lg font-['Oswald'] tracking-wider leading-tight">{exp.stats.rev}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-[#C8A96A] uppercase tracking-wider font-semibold">Proj. ROI</span>
                      <span className="text-[#E5C27A] font-bold text-lg font-['Oswald'] tracking-wider leading-tight">{exp.stats.roi}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hover glow border */}
              <div className="absolute inset-0 border border-[#C8A96A]/0 group-hover:border-[#C8A96A]/40 rounded-2xl transition-colors duration-500 pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


/* ==========================================================================
   2. EXPERIENCE MESSAGE (Break Grid)
   ========================================================================== */
const ExperienceMessageSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade + scale subtle
      gsap.fromTo(textRef.current,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1, scale: 1, duration: 1.5, ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
        }
      );

      // Slow background motion
      gsap.to(bgRef.current, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full py-40 overflow-hidden bg-black flex items-center justify-center text-center">
      {/* Background with motion */}
      <div 
        ref={bgRef}
        className="absolute inset-0 -top-[20%] -bottom-[20%] bg-cover bg-center opacity-30"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1518063319789-7217e6706b04?q=80&w=3000&auto=format&fit=crop')" }} // abstract deep light/water
      ></div>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

      <div ref={textRef} className="relative z-10 max-w-5xl px-8 flex flex-col gap-6">
        <h2 className="text-4xl md:text-6xl font-bold text-white leading-[1.2] tracking-wide font-['Oswald'] uppercase">
          More Than Retail — <br />
          <span className="text-[#C8A96A]">A Complete Entertainment Destination</span>
        </h2>
        <p className="text-xl md:text-2xl text-neutral-400 font-light max-w-3xl mx-auto tracking-wide">
          From world-class attractions to immersive experiences, every visit becomes a destination journey.
        </p>
      </div>
    </section>
  );
};


/* ==========================================================================
   3. ENGAGEMENT IMPACT (Horizontal Stat Strip)
   ========================================================================== */
const EngagementImpactSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const stats = [
    '80+ Experiences',
    'Family & Global Audience',
    'Extended Visitor Time',
    'High Engagement'
  ];

  // We duplicate the stats to create an infinite seamless loop
  const loopStats = [...stats, ...stats];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal
      gsap.fromTo(sectionRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-[#030303] py-16 border-y border-[#C8A96A]/20 overflow-hidden opacity-0">
      <div className="w-full relative flex items-center">
        {/* Infinite scrolling track */}
        <div 
          ref={trackRef}
          className="flex items-center gap-16 whitespace-nowrap"
          style={{ animation: 'marquee-left 30s linear infinite' }}
        >
          {loopStats.map((stat, i) => (
            <div key={i} className="flex items-center gap-16">
              <span className="text-xl md:text-3xl font-bold text-white uppercase tracking-widest font-['Oswald']">
                {stat}
              </span>
              <span className="text-[#C8A96A] text-2xl">•</span>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
};


/* ==========================================================================
   4. STORY STRIP (Cinematic immersion)
   ========================================================================== */
const StoryStripSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.story-img', 
        { scale: 1.2, opacity: 0 },
        { 
          scale: 1, opacity: 1, duration: 1.5, stagger: 0.2, ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-[#0A0A0A] py-32 px-6">
      <div className="max-w-[1600px] mx-auto flex flex-col items-center">
        <div className="w-full h-[40vh] md:h-[60vh] flex gap-4 md:gap-8 rounded-3xl overflow-hidden">
          <div className="flex-1 overflow-hidden relative group">
            <div className="story-img absolute inset-0 bg-cover bg-center filter blur-[4px] brightness-75 group-hover:blur-none group-hover:brightness-100 transition-all duration-700" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1533613220915-609f661a6fe1?q=80&w=2000&auto=format&fit=crop')" }}></div>
          </div>
          <div className="flex-1 overflow-hidden relative group hidden md:block">
            <div className="story-img absolute inset-0 bg-cover bg-center filter blur-[4px] brightness-75 group-hover:blur-none group-hover:brightness-100 transition-all duration-700 delay-100" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop')" }}></div>
          </div>
          <div className="flex-1 overflow-hidden relative group hidden lg:block">
            <div className="story-img absolute inset-0 bg-cover bg-center filter blur-[4px] brightness-75 group-hover:blur-none group-hover:brightness-100 transition-all duration-700 delay-200" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1549615598-a28cda49c66e?q=80&w=2000&auto=format&fit=crop')" }}></div>
          </div>
        </div>
      </div>
    </section>
  );
};


/* ==========================================================================
   MAIN MODULE COMPONENT
   ========================================================================== */
const AttractionsEntertainmentModule: React.FC<AttractionsModuleProps> = ({ onBack }) => {
  return (
    <div className="w-full min-h-screen bg-[#0A0A0A] text-white font-['Inter'] overflow-x-hidden">
      {/* GLOBAL NAV BAR */}
      <nav style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '18px 48px',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        backgroundColor: 'rgba(10,10,10,0.85)',
        backdropFilter: 'blur(15px)',
        zIndex: 100,
      }}>
        <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#E5C27A' }}>
          The Dubai Mall &nbsp;·&nbsp; Attractions &amp; Entertainment
        </span>
        <button
          onClick={onBack}
          style={{
            background: 'rgba(255,255,255,0.05)', border: `1px solid rgba(255,255,255,0.1)`, color: '#fff',
            padding: '8px 20px', borderRadius: '50px', cursor: 'pointer', textTransform: 'uppercase',
            letterSpacing: '0.18em', fontSize: '11px', fontFamily: "'Oswald', sans-serif", fontWeight: 500,
            transition: 'all 0.25s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.border = '1px solid #E5C27A'; e.currentTarget.style.color = '#E5C27A';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.border = '1px solid rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#fff';
          }}
        >
          ← Dashboard
        </button>
      </nav>

      <GridHeroSection />
      <ExperienceMessageSection />
      <EngagementImpactSection />
      <StoryStripSection />
    </div>
  );
};

export default AttractionsEntertainmentModule;
