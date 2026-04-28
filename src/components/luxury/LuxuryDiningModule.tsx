import React, { useEffect, useRef, useState } from 'react';
import ModuleNavigation from '../common/ModuleNavigation';
import LazyImage from '../common/LazyImage';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
gsap.config({ force3D: true });
gsap.defaults({ overwrite: 'auto' });

interface LuxuryDiningModuleProps {
  onBack: () => void;
}

const GOLD_LIGHT = '#E5C27A';

/* ==========================================================================
   1. HERO (LUXURY, PERFECTED)
   ========================================================================== */
const LuxuryHero: React.FC = React.memo(() => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [currentImageIdx, setCurrentImageIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIdx((prev) => (prev + 1) % 6);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.premium-reveal',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.5, stagger: 0.15, ease: 'power3.out', delay: 0.5 }
      );
      
      gsap.to('.hero-float', {
        y: -10,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-screen bg-[#050505] overflow-hidden flex items-center justify-center transform-gpu">
      <div className="absolute inset-0 z-0">
        {[1, 2, 3, 4, 5, 6].map((num, idx) => (
          <LazyImage 
            key={idx}
            src={`https://raw.githubusercontent.com/pratik-71/Liat-Ass/main/public/luxuary/image%20${num}.jpg`}
            className="absolute inset-0 bg-cover bg-center transition-all duration-[3s] ease-in-out"
            style={{ 
              opacity: currentImageIdx === idx ? 0.45 : 0,
              filter: `brightness(0.8) blur(${currentImageIdx === idx ? '0px' : '15px'})`,
              transform: `scale(${currentImageIdx === idx ? 1.05 : 1.15})`
            }}
            isBackground={true}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505] z-10"></div>
      <div className="absolute inset-0 bg-black/30 z-10"></div>
      
      <div className="relative z-30 flex flex-col items-center text-center max-w-4xl px-8">
        <div className="premium-reveal mb-8">
          <span className="text-[8px] md:text-[10px] font-bold tracking-[0.4em] md:tracking-[0.8em] uppercase text-[#C8A96A] bg-black/60 backdrop-blur-xl px-6 md:px-8 py-2 md:py-3 border border-[#C8A96A]/30 whitespace-nowrap">
            The Signature Experience
          </span>
        </div>

        <h1 className="premium-reveal hero-float text-5xl md:text-8xl lg:text-[110px] font-black uppercase tracking-tighter font-['Oswald'] text-white leading-[0.9] mb-10">
          Luxury <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#E5C27A] to-[#8A6E3F]">Perfected.</span>
        </h1>

        <p className="premium-reveal text-neutral-200 text-base md:text-2xl font-light font-['Inter'] tracking-wide max-w-xl opacity-90 mb-14">
          Where global flagships meet exceptional dining.
        </p>

        <div className="premium-reveal grid grid-cols-2 gap-20 border-t border-white/10 pt-12 w-full max-w-2xl">
          <div className="flex flex-col items-center">
            <span className="text-5xl font-['Oswald'] text-white mb-2">200+</span>
            <span className="text-[9px] uppercase tracking-[0.4em] text-[#C8A96A] font-bold opacity-80">Global Flagships</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-5xl font-['Oswald'] text-white mb-2">15+</span>
            <span className="text-[9px] uppercase tracking-[0.4em] text-[#C8A96A] font-bold opacity-80">Michelin Stars</span>
          </div>
        </div>
      </div>
    </section>
  );
});

/* ==========================================================================
   2. BOUTIQUE GALLERY (THE COLLECTION)
   ========================================================================== */
const CuratedExperiences: React.FC = React.memo(() => {
  const cards = [
    { 
      title: 'FINE DINING', 
      desc: 'The world’s most prestigious culinary stage, hosting global Michelin talent.', 
      image: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=1200',
      stats: '$150M+ ANNUAL REVENUE' 
    },
    { 
      title: 'LUXURY BOUTIQUES', 
      desc: 'High-conversion architectural masterpieces for leading global houses.', 
      image: 'https://raw.githubusercontent.com/pratik-71/Liat-Ass/main/public/luxuary/image%204.jpg',
      stats: '85% CONVERSION RATE' 
    },
    { 
      title: 'CAFÉ CULTURE', 
      desc: 'Sophisticated social spaces designed for extended dwell time.', 
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1200',
      stats: 'HIGH-INTENT TRAFFIC' 
    },
    { 
      title: 'GLOBAL CUISINE', 
      desc: 'A curated journey attracting a diverse international high-spending audience.', 
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200',
      stats: '2M+ ELITE DINERS' 
    }
  ];

  return (
    <section className="w-full bg-[#050505] py-20 px-8 md:px-24">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center mb-32">
        <h2 className="text-[10px] tracking-[0.8em] text-[#C8A96A] uppercase font-bold mb-8 opacity-60">Specialized Districts</h2>
        <h3 className="text-5xl md:text-8xl font-['Oswald'] text-white uppercase tracking-tighter leading-none mb-12">
          THE <br /><span className="text-white/70">COLLECTION</span>
        </h3>
        <div className="w-24 h-[1px] bg-[#C8A96A] opacity-40"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
        {cards.map((card, i) => (
          <div key={i} className="group relative aspect-[4/5] overflow-hidden transition-all duration-1000 transform-gpu shadow-2xl">
            <LazyImage 
              src={card.image}
              className="absolute inset-0 bg-cover bg-center transition-transform duration-[2s] ease-out group-hover:scale-110"
              isBackground={true}
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 transition-opacity"></div>

            <div className="absolute bottom-0 left-0 right-0 p-12 z-20 transition-all duration-500 group-hover:bg-black/40 backdrop-blur-[4px] border-t border-white/5">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-[10px] text-[#C8A96A] font-bold tracking-[0.5em]">0{i + 1}</span>
                <div className="w-12 h-[1px] bg-[#C8A96A]/40"></div>
              </div>
              
              <h4 className="text-3xl md:text-4xl font-['Oswald'] text-white uppercase tracking-widest mb-6 group-hover:text-[#E5C27A] transition-colors">{card.title}</h4>
              
              <p className="text-sm text-neutral-200 font-light leading-relaxed mb-10 opacity-80 group-hover:opacity-100">
                {card.desc}
              </p>
              
              <div className="flex justify-between items-center pt-6 border-t border-white/10">
                <span className="text-[10px] text-white tracking-[0.3em] uppercase font-bold group-hover:text-[#C8A96A] transition-colors">{card.stats}</span>
                <div className="w-2 h-2 bg-[#C8A96A] rounded-full group-hover:scale-[2.5] transition-transform duration-500 shadow-[0_0_15px_rgba(200,169,106,0.6)]"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
});

/* ==========================================================================
   3. STRATEGIC ADVANTAGE (FEATURES)
   ========================================================================== */
const StrategicAdvantage: React.FC = React.memo(() => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reasons = [
    {
      title: 'EASY ACCESS',
      desc: 'Connected to major transit hubs and luxury hospitality.',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={GOLD_LIGHT} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" /><path d="m12 8-4 4 4 4M16 12H8" />
        </svg>
      )
    },
    {
      title: 'MARKETING REACH',
      desc: 'Amplify your brand through our global audience network.',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={GOLD_LIGHT} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 5h10M11 9h10M11 13h10M11 17h10M11 21h10M3 7l4 4-4 4" />
        </svg>
      )
    },
    {
      title: 'BRAND SYNERGY',
      desc: 'Align with leading global luxury brands.',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={GOLD_LIGHT} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2 2 7l10 5 10-5-10-5Z" /><path d="m2 17 10 5 10-5" /><path d="m2 12 10 5 10-5" />
        </svg>
      )
    },
    {
      title: 'DATA PROOF',
      desc: 'Insights that drive measurable performance.',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={GOLD_LIGHT} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-3 3" />
        </svg>
      )
    }
  ];

  return (
    <section ref={sectionRef} className="w-full bg-[#050505] py-16 px-8 md:px-24 border-b border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {reasons.map((item, i) => (
          <div key={i} className="advantage-card group p-12 bg-black border border-white/5 transition-all duration-500 hover:border-[#C8A96A]/40 overflow-hidden">
             <div className="mb-10 transition-transform duration-700 group-hover:-translate-y-2 group-hover:scale-110">
               {item.icon}
             </div>
             <h4 className="text-xl font-['Oswald'] text-white uppercase tracking-widest mb-6 group-hover:text-[#E5C27A] transition-colors">
               {item.title}
             </h4>
             <p className="text-neutral-500 text-sm font-light leading-relaxed group-hover:text-neutral-300 transition-colors">
               {item.desc}
             </p>
          </div>
        ))}
      </div>
    </section>
  );
});

/* ==========================================================================
   4. DATA PROOF (AUDIENCE)
   ========================================================================== */
const HighValueAudience: React.FC = React.memo(() => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stats = [
    { value: 1.2, suffix: 'B+', label: 'Annual Luxury Spend', prefix: '$', highlight: false },
    { value: 85, suffix: '%', label: 'High-Intent Buyers', highlight: true },
    { value: 3000, suffix: '+', label: 'Avg Transaction Value', prefix: '$', highlight: false },
    { value: 100, suffix: 'M+', label: 'Annual Visitors', highlight: false },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      stats.forEach((stat, i) => {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: stat.value,
          duration: 3,
          ease: 'expo.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
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
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-black py-48 px-8 border-b border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-20">
          {stats.map((stat, i) => (
            <div key={i} className={`flex flex-col items-center text-center gap-6 group ${stat.highlight ? 'scale-110' : ''}`}>
              <span id={`luxury-stat-${i}`} className={`font-bold font-['Oswald'] tracking-tighter transition-all duration-1000 group-hover:scale-105 ${stat.highlight ? 'text-7xl md:text-[6.5rem] text-[#E5C27A] drop-shadow-[0_0_30px_rgba(200,169,106,0.3)]' : 'text-5xl md:text-7xl text-white/90'}`}>
                {stat.prefix || ''}0{stat.suffix}
              </span>
              <div className={`w-12 h-[1px] group-hover:w-20 transition-all duration-700 ${stat.highlight ? 'bg-[#E5C27A]' : 'bg-white/20'}`}></div>
              <span className={`text-[11px] uppercase tracking-[0.5em] font-bold ${stat.highlight ? 'text-[#E5C27A]' : 'text-neutral-500'}`}>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

/* ==========================================================================
   MAIN MODULE
   ========================================================================== */
const LuxuryDiningModule: React.FC<LuxuryDiningModuleProps> = ({ onBack }) => {
  return (
    <div className="w-full min-h-screen bg-[#050505] text-white font-['Inter'] overflow-x-hidden selection:bg-[#C8A96A] selection:text-black">
      <ModuleNavigation moduleName="Luxury & Dining" onBack={onBack} />
      <LuxuryHero />
      <CuratedExperiences />
      <StrategicAdvantage />
      <HighValueAudience />
      
      <div className="py-40 md:py-72 bg-[#050505] flex flex-col items-center gap-10 md:gap-12 relative overflow-hidden text-center">
         <div className="w-[1px] h-32 md:h-48 bg-gradient-to-b from-transparent via-[#C8A96A] to-transparent opacity-60"></div>
         <h2 className="text-3xl md:text-7xl font-['Oswald'] text-white uppercase tracking-[0.2em] md:tracking-[0.4em] leading-tight px-8 mb-4">
           LUXURY WITHOUT <br /><span className="text-[#C8A96A]">COMPROMISE.</span>
         </h2>
         <p className="text-neutral-500 uppercase tracking-[0.1em] md:tracking-[0.2em] text-[10px] md:text-xs font-bold px-8">
           Experience the pinnacle of commercial excellence.
         </p>
         <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#C8A96A]/5 rounded-full blur-[150px] pointer-events-none"></div>
      </div>
    </div>
  );
};

export default LuxuryDiningModule;
