import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface LuxuryDiningModuleProps {
  onBack: () => void;
}

const GOLD = '#C8A96A';
const GOLD_LIGHT = '#E5C27A';
const MIDNIGHT = '#070707';

/* ==========================================================================
   1. HERO (CALM & PREMIUM)
   ========================================================================== */
const LuxuryHero: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Slow fade and slight zoom for image
      gsap.fromTo(imageRef.current,
        { opacity: 0, scale: 1.05 },
        { opacity: 1, scale: 1, duration: 2, ease: 'power2.out', delay: 0.2 }
      );

      // Slow fade for text
      gsap.fromTo(textRef.current?.children ? Array.from(textRef.current.children) : [],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.5, stagger: 0.2, ease: 'power2.out', delay: 0.4 }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full min-h-[90vh] bg-[#0A0A0A] flex flex-col md:flex-row items-center justify-between px-8 md:px-16 lg:px-24 pt-32 pb-20">
      
      {/* Left Text */}
      <div ref={textRef} className="w-full md:w-[45%] flex flex-col gap-6 z-10 pr-0 md:pr-12">
        <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-wide font-['Oswald'] text-white leading-[1.1]">
          A High-Value <br />
          <span style={{ color: GOLD_LIGHT }}>Luxury & Dining</span> Ecosystem
        </h1>
        
        <p className="text-neutral-300 text-lg md:text-xl font-light font-['Inter'] leading-relaxed max-w-lg mt-2 opacity-90">
          Position your brand in front of high-spending consumers actively seeking premium experiences.
        </p>
        
        <div className="mt-8 pt-8 border-t border-white/10 flex items-center gap-4">
          <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-neutral-400">
            200+ Luxury Brands &nbsp;•&nbsp; Fine Dining &nbsp;•&nbsp; Global Cuisine
          </span>
        </div>
      </div>

      {/* Right Visual */}
      <div className="w-full md:w-[50%] h-[50vh] md:h-[70vh] relative mt-16 md:mt-0 overflow-hidden rounded-[2px]">
        <div 
          ref={imageRef}
          className="absolute inset-0 bg-cover bg-center brightness-90"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2000&auto=format&fit=crop')" }}
        ></div>
        {/* Soft elegant vignette */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-transparent to-transparent opacity-80 md:opacity-100"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-60"></div>
      </div>
    </section>
  );
};


/* ==========================================================================
   2. CURATED EXPERIENCES (HORIZONTAL SCROLL)
   ========================================================================== */
const CuratedExperiences: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  
  const cards = [
    { title: 'FINE DINING', desc: 'Capture high-value consumers through premium dining environments with strong spending intent.', image: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=1000&auto=format&fit=crop', stats: '15+ Michelin Stars • $150M+ Rev' },
    { title: 'LUXURY BOUTIQUES', desc: 'Position your brand alongside global luxury leaders in a high-conversion retail environment.', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1000&auto=format&fit=crop', stats: '80+ Flagships • 35% YoY Growth' },
    { title: 'CAFÉ CULTURE', desc: 'Engage high-footfall audiences through experience-driven formats with strong repeat visits.', image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1000&auto=format&fit=crop', stats: '45+ Outlets • Premium Dwell Time' },
    { title: 'GLOBAL CUISINE', desc: 'Access diverse, international consumers seeking premium food and lifestyle experiences.', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1000&auto=format&fit=crop', stats: 'World-Class Chefs • 2M+ Diners' },
    // Duplicate for seamless loop
    { title: 'FINE DINING', desc: 'Capture high-value consumers through premium dining environments with strong spending intent.', image: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=1000&auto=format&fit=crop', stats: '15+ Michelin Stars • $150M+ Rev' },
    { title: 'LUXURY BOUTIQUES', desc: 'Position your brand alongside global luxury leaders in a high-conversion retail environment.', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1000&auto=format&fit=crop', stats: '80+ Flagships • 35% YoY Growth' },
  ];

  return (
    <section className="w-full bg-[#050505] py-24 overflow-hidden relative border-y border-white/5">
      <div className="px-8 md:px-16 mb-16">
        <h2 className="text-sm tracking-[0.3em] text-[#C8A96A] uppercase font-semibold">Luxury & Dining Opportunities</h2>
        <div className="w-12 h-[1px] bg-[#C8A96A]/50 mt-4"></div>
      </div>
      
      {/* Horizontal Scroll Track */}
      <div className="flex gap-8 w-max px-8 md:px-16 animate-slow-scroll hover:animation-paused">
        {cards.map((card, i) => (
          <div 
            key={i} 
            className="group relative w-[300px] md:w-[420px] h-[480px] rounded-[4px] overflow-hidden flex-shrink-0 cursor-pointer transition-all duration-700 hover:-translate-y-4 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] border border-white/5 hover:border-[#C8A96A]/30 bg-[#0A0A0A]"
          >
            {/* Image with zoom and slight rotation */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-[2.5s] cubic-bezier(0.2, 0.8, 0.2, 1) group-hover:scale-110 group-hover:rotate-1"
              style={{ backgroundImage: `url('${card.image}')` }}
            />
            {/* Multi-layered Soft Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-black/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            {/* Decorative Gold Accent Corner */}
            <div className="absolute top-6 right-6 w-0 h-0 border-t border-r border-[#C8A96A]/0 transition-all duration-700 group-hover:w-6 group-hover:h-6 group-hover:border-[#C8A96A]/40"></div>

            {/* Content Container */}
            <div className="absolute bottom-4 left-0 right-0 p-8 transform transition-all duration-700 translate-y-0 group-hover:-translate-y-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-[1px] bg-[#C8A96A]/60 transition-all duration-700 group-hover:w-10 group-hover:bg-[#C8A96A]"></div>
                <h3 className="text-xl md:text-2xl font-['Oswald'] tracking-[0.15em] text-white uppercase transition-all duration-700 group-hover:text-[#E5C27A] drop-shadow-lg">
                  {card.title}
                </h3>
              </div>
              
              <div className="relative h-24 md:h-20">
                <p className="absolute inset-0 text-[13px] md:text-sm text-neutral-300 font-light opacity-100 group-hover:opacity-0 group-hover:-translate-y-4 transition-all duration-700 font-['Inter'] leading-relaxed drop-shadow-md">
                  {card.desc}
                </p>
                
                {/* Investor Stats on hover - Enhanced Glassmorphism */}
                <div className="absolute inset-0 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 delay-100 pointer-events-none">
                  <div className="flex flex-col gap-2">
                    <span className="text-[9px] text-[#C8A96A] uppercase tracking-[0.3em] font-bold opacity-90">Market Potential</span>
                    <div className="inline-block px-4 py-3 bg-black/40 border border-white/10 rounded-sm text-[10px] md:text-[11px] text-[#E5C27A] uppercase tracking-[0.2em] font-semibold backdrop-blur-xl shadow-2xl ring-1 ring-white/5">
                      {card.stats}
                    </div>
                  </div>
                </div>
              </div>

              {/* Refined long line indicator */}
              <div className="w-0 h-[1px] bg-gradient-to-r from-[#C8A96A]/0 via-[#C8A96A]/60 to-[#C8A96A]/0 mt-6 transition-all duration-1000 group-hover:w-full opacity-0 group-hover:opacity-100"></div>
            </div>
          </div>
        ))}

      </div>
      <style>{`
        @keyframes slow-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-slow-scroll {
          animation: slow-scroll 40s linear infinite;
        }
        .hover\\:animation-paused:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};


/* ==========================================================================
   3. PREMIUM POSITIONING
   ========================================================================== */
/* ==========================================================================
   2.5 STRATEGIC ADVANTAGE (WHY CHOOSE US)
   ========================================================================== */
const StrategicAdvantage: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reasons = [
    {
      title: 'Easy Accessibility',
      desc: 'Seamlessly connected to major transit hubs and 5-star hospitality, driving a consistent flow of 100M+ global visitors annually to your doorstep.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={GOLD_LIGHT} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="m12 8-4 4 4 4M16 12H8" />
        </svg>
      )
    },
    {
      title: 'Global Marketing Reach',
      desc: 'Leverage our massive digital media network and 10M+ collective social following to amplify your brand’s visibility to a worldwide audience.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={GOLD_LIGHT} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 5h10M11 9h10M11 13h10M11 17h10M11 21h10M3 7l4 4-4 4" />
        </svg>
      )
    },
    {
      title: 'Targeted Brand Synergy',
      desc: 'Position your brand alongside 200+ global luxury flagships, creating a collective pull for high-net-worth individuals and high-intent buyers.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={GOLD_LIGHT} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2 2 7l10 5 10-5-10-5Z" />
          <path d="m2 17 10 5 10-5" />
          <path d="m2 12 10 5 10-5" />
        </svg>
      )
    },
    {
      title: 'Data-Backed Conversions',
      desc: 'Access specialized analytics from our marketing partners to optimize your store’s performance within our 85% high-conversion environment.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={GOLD_LIGHT} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 3v18h18" />
          <path d="m19 9-5 5-4-4-3 3" />
        </svg>
      )
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.advantage-card',
        { opacity: 0, y: 30 },
        { 
          opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-[#050505] py-32 px-8 md:px-16 lg:px-24 border-b border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <h2 className="text-sm tracking-[0.3em] text-[#C8A96A] uppercase font-bold mb-4">Strategic Advantage</h2>
          <h3 className="text-4xl md:text-5xl font-['Oswald'] text-white uppercase tracking-wider leading-tight">
            Why Leading Brands <br /> Choose Our Property
          </h3>
          <div className="w-24 h-[1px] bg-[#C8A96A] mt-8 opacity-50"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
          {reasons.map((item, i) => (
            <div key={i} className="advantage-card flex flex-col gap-6 p-10 border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all duration-700 group">
              <div className="transition-transform duration-500 group-hover:scale-110 group-hover:filter group-hover:drop-shadow-[0_0_10px_rgba(229,194,122,0.4)]">
                {item.icon}
              </div>
              <div className="flex flex-col gap-3">
                <h4 className="text-xl font-['Oswald'] text-[#E5C27A] uppercase tracking-widest">{item.title}</h4>
                <p className="text-neutral-400 font-light font-['Inter'] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


/* ==========================================================================
   3. HIGH-VALUE AUDIENCE (DATA PROOF)
   ========================================================================== */
const HighValueAudience: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stats = [
    { value: 1.2, suffix: 'B+', label: 'Annual Luxury Spend', prefix: '$' },
    { value: 85, suffix: '%', label: 'High-Intent Buyers' },
    { value: 3000, suffix: '+', label: 'Average Transaction Value', prefix: '$' },
    { value: 100, suffix: 'M+', label: 'Annual Visitors' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal elements
      gsap.fromTo('.audience-reveal',
        { opacity: 0, y: 30 },
        { 
          opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
        }
      );

      // Counting animation
      stats.forEach((stat, i) => {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: stat.value,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
          onUpdate: () => {
            const el = document.getElementById(`luxury-stat-${i}`);
            if (el) {
              const formattedVal = stat.value >= 1000 ? Math.floor(obj.val).toLocaleString() : obj.val.toFixed(stat.value % 1 === 0 ? 0 : 1);
              el.innerText = `${stat.prefix || ''}${formattedVal}${stat.suffix}`;
            }
          }
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [stats]);

  return (
    <section ref={sectionRef} className="relative w-full py-32 px-6 overflow-hidden bg-black flex items-center justify-center text-center border-b border-white/5">
      {/* Subtle Background */}
      <div className="absolute inset-0 bg-cover bg-center opacity-10 filter blur-sm grayscale" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2000')" }}></div>
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 max-w-6xl w-full flex flex-col items-center gap-12">
        <div className="audience-reveal">
          <h2 className="text-4xl md:text-6xl font-['Oswald'] text-white uppercase tracking-wider mb-4">
            A High-Spending Luxury Audience
          </h2>
          <p className="text-lg md:text-xl text-neutral-400 font-light font-['Inter'] max-w-3xl mx-auto leading-relaxed">
            Engage consumers with strong purchasing intent, premium preferences, and global spending power.
          </p>
        </div>

        {/* BIG STAT BLOCK */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 w-full mt-8">
          {stats.map((stat, i) => (
            <div key={i} className="audience-reveal flex flex-col items-center group">
              <span 
                id={`luxury-stat-${i}`}
                className="text-5xl md:text-7xl font-bold font-['Oswald'] tracking-tighter transition-all duration-500 group-hover:scale-110 drop-shadow-[0_0_15px_rgba(229,194,122,0.3)]"
                style={{ color: GOLD_LIGHT }}
              >
                {stat.prefix || ''}0{stat.suffix}
              </span>
              <span className="text-[11px] md:text-xs uppercase tracking-[0.3em] text-neutral-500 font-bold mt-4">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        <div className="audience-reveal mt-12 flex flex-col items-center gap-6">
          <p className="text-neutral-300 text-sm md:text-base italic font-['Inter']">
            "This is where premium brands convert attention into revenue."
          </p>
          <div className="h-[1px] w-24 bg-[#C8A96A]/30"></div>
          <p className="text-[#C8A96A] text-[10px] md:text-xs uppercase tracking-[0.5em] font-bold">
            High Net-Worth Individuals • Global Tourists • Premium Local Audience
          </p>
        </div>
      </div>
    </section>
  );
};


/* ==========================================================================
   4. ATMOSPHERE STRIP
   ========================================================================== */
const AtmosphereStrip: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.atmosphere-img',
        { scale: 1.1, opacity: 0 },
        {
          scale: 1, opacity: 0.4, duration: 2, ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full h-[40vh] bg-black overflow-hidden relative">
      <div 
        className="atmosphere-img absolute inset-0 bg-cover bg-center filter blur-md"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=2000&auto=format&fit=crop')" }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-[#0A0A0A]"></div>
    </section>
  );
};


/* ==========================================================================
   MAIN MODULE
   ========================================================================== */
const LuxuryDiningModule: React.FC<LuxuryDiningModuleProps> = ({ onBack }) => {
  return (
    <div className="w-full min-h-screen bg-[#0A0A0A] text-white font-['Inter'] overflow-x-hidden">
      {/* GLOBAL NAV BAR (Refined) */}
      <nav style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '24px 48px',
        background: 'linear-gradient(to bottom, rgba(10,10,10,0.9) 0%, rgba(10,10,10,0) 100%)',
        zIndex: 100,
      }}>
        <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#C8A96A' }}>
          The Dubai Mall &nbsp;·&nbsp; Luxury &amp; Dining
        </span>
        <button
          onClick={onBack}
          className="group relative px-6 py-2 overflow-hidden"
          style={{ textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '10px', fontWeight: 500 }}
        >
          <span className="relative z-10 text-white group-hover:text-[#0A0A0A] transition-colors duration-500">← Return</span>
          <div className="absolute inset-0 border border-white/20 group-hover:bg-white transition-all duration-500"></div>
        </button>
      </nav>

      <LuxuryHero />
      <CuratedExperiences />
      <StrategicAdvantage />
      <HighValueAudience />
      <AtmosphereStrip />
    </div>
  );
};

export default LuxuryDiningModule;
