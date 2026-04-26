import React, { useEffect, useRef, useState } from 'react';
import ModuleNavigation from '../common/ModuleNavigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
gsap.config({ force3D: true });
gsap.defaults({ overwrite: 'auto' });

interface LuxuryDiningModuleProps {
  onBack: () => void;
}

const GOLD = '#C8A96A';
const GOLD_LIGHT = '#E5C27A';

/* ==========================================================================
   1. HERO (PREMIUM & STYLISH)
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
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.8, stagger: 0.2, ease: 'expo.out', delay: 0.5 }
      );
      
      // Floating motion for the main text
      gsap.to('.hero-float', {
        y: -15,
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
      {/* Background Image Layers */}
      <div className="absolute inset-0 z-0">
        {[1, 2, 3, 4, 5, 6].map((num, idx) => (
          <div 
            key={idx}
            className="absolute inset-0 bg-cover bg-center will-change-transform transition-all duration-[3s] ease-in-out"
            style={{ 
              backgroundImage: `url('/luxuary/image ${num}.jpg')`,
              opacity: currentImageIdx === idx ? 0.4 : 0,
              filter: `grayscale(20%) brightness(0.7) blur(${currentImageIdx === idx ? '0px' : '20px'})`,
              transform: `scale(${currentImageIdx === idx ? 1.05 : 1.2}) rotate(${currentImageIdx === idx ? '0deg' : '1deg'})`
            }}
          ></div>
        ))}
      </div>

      {/* Overlays for Depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505] z-10"></div>
      <div className="absolute inset-0 bg-black/40 z-10"></div>
      
      {/* Structural Elements */}
      <div className="absolute top-0 left-0 w-full h-full border-[1px] border-white/5 m-8 z-20 pointer-events-none"></div>
      <div className="absolute top-1/2 left-8 w-[1px] h-32 bg-gradient-to-b from-transparent via-[#C8A96A] to-transparent z-20"></div>

      {/* Main Content */}
      <div className="relative z-30 flex flex-col items-center text-center max-w-5xl px-8">
        <div className="premium-reveal mb-8">
          <span className="text-[10px] font-bold tracking-[0.8em] uppercase text-[#C8A96A] bg-black/50 backdrop-blur-md px-6 py-2 border border-[#C8A96A]/20">
            The Signature Experience
          </span>
        </div>

        <h1 className="premium-reveal hero-float text-7xl md:text-[120px] font-black uppercase tracking-tighter font-['Oswald'] text-white leading-none mb-8">
          Luxury <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#E5C27A] to-[#8A6E3F]">Defined.</span>
        </h1>

        <div className="premium-reveal w-32 h-[1px] bg-[#C8A96A] mb-10 opacity-60"></div>

        <p className="premium-reveal text-neutral-300 text-lg md:text-2xl font-light font-['Inter'] leading-relaxed max-w-2xl opacity-90 mb-12">
          Enter an elite ecosystem where world-class flagships and Michelin-starred dining converge to create the pinnacle of retail history.
        </p>

        <div className="premium-reveal grid grid-cols-2 gap-16 border-t border-white/10 pt-12">
          <div className="flex flex-col items-center">
            <span className="text-4xl font-['Oswald'] text-white mb-1">200+</span>
            <span className="text-[9px] uppercase tracking-[0.4em] text-[#C8A96A] font-bold">Global Flagships</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl font-['Oswald'] text-white mb-1">15+</span>
            <span className="text-[9px] uppercase tracking-[0.4em] text-[#C8A96A] font-bold">Michelin Stars</span>
          </div>
        </div>
      </div>

      {/* Corner Details */}
      <div className="absolute bottom-16 right-16 z-30 flex items-center gap-6">
        <div className="w-12 h-[1px] bg-white/20"></div>
        <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-white/40 italic">Scroll to Explore</span>
      </div>
    </section>
  );
});


/* ==========================================================================
   2. BOUTIQUE GALLERY (UPGRADED LAYOUT)
   ========================================================================== */
const CuratedExperiences: React.FC = React.memo(() => {
  const cards = [
    { 
      title: 'FINE DINING', 
      desc: 'The world’s most prestigious culinary stage, hosting global Michelin talent and elite gastronomic concepts.', 
      image: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=1200',
      stats: '$150M+ ANNUAL REVENUE' 
    },
    { 
      title: 'LUXURY BOUTIQUES', 
      desc: 'Position your brand alongside Chanel, Dior, and Hermès in high-conversion, architectural masterpieces.', 
      image: '/luxuary/image 4.jpg',
      stats: '85% CONVERSION RATE' 
    },
    { 
      title: 'CAFÉ CULTURE', 
      desc: 'Sophisticated social spaces designed for extended dwell time and premium high-footfall engagement.', 
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1200',
      stats: 'HIGH-INTENT TRAFFIC' 
    },
    { 
      title: 'GLOBAL CUISINE', 
      desc: 'A curated journey through the flavors of the world, attracting a diverse international high-spending audience.', 
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200',
      stats: '2M+ ELITE DINERS' 
    }
  ];

  return (
    <section className="w-full bg-[#050505] py-40 px-8 md:px-16 lg:px-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center mb-32">
        <h2 className="text-[10px] tracking-[0.8em] text-[#C8A96A] uppercase font-bold mb-8">Specialized Districts</h2>
        <h3 className="text-5xl md:text-8xl font-['Oswald'] text-white uppercase tracking-tighter leading-none mb-12">
          The Curated <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-white/40 to-white/10">Portfolio</span>
        </h3>
        <div className="w-24 h-[1px] bg-[#C8A96A] opacity-40"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-32">
        {cards.map((card, i) => (
          <div 
            key={i}
            className="group relative aspect-[4/5] overflow-hidden rounded-[2px] transition-all duration-1000 transform-gpu"
          >
            {/* Image Layer */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-[3s] cubic-bezier(0.1, 0.9, 0.1, 1) group-hover:scale-110 will-change-transform"
              style={{ backgroundImage: `url('${card.image}')` }}
            ></div>
            
            {/* Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/20 to-transparent opacity-80 transition-opacity duration-700 group-hover:opacity-100"></div>
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-700"></div>

            {/* Glass Card Content */}
            <div className="absolute bottom-10 left-10 right-10 p-10 border border-white/5 backdrop-blur-md bg-white/[0.02] transform transition-all duration-700 group-hover:border-[#C8A96A]/40 group-hover:bg-black/80">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-[10px] text-[#C8A96A] font-bold tracking-[0.5em] uppercase">0{i + 1}</span>
                <div className="w-12 h-[1px] bg-[#C8A96A]/40"></div>
              </div>
              
              <h4 className="text-3xl md:text-4xl font-['Oswald'] text-white uppercase tracking-widest mb-6 group-hover:text-[#E5C27A] transition-colors duration-500">
                {card.title}
              </h4>
              
              <p className="text-sm text-neutral-400 font-light leading-relaxed mb-10 opacity-60 group-hover:opacity-100 transition-all duration-700 transform group-hover:translate-y-[-4px]">
                {card.desc}
              </p>
              
              <div className="flex justify-between items-center pt-6 border-t border-white/10">
                <span className="text-[10px] text-white/40 tracking-[0.3em] uppercase font-bold group-hover:text-[#C8A96A] transition-colors duration-500">{card.stats}</span>
                <div className="w-2 h-2 bg-[#C8A96A] rounded-full group-hover:scale-[3] transition-transform duration-500 shadow-[0_0_15px_rgba(200,169,106,0.6)]"></div>
              </div>
            </div>

            {/* Hover Corner Ornaments */}
            <div className="absolute top-0 right-0 w-0 h-0 border-t border-r border-[#C8A96A] opacity-0 group-hover:opacity-100 group-hover:w-20 group-hover:h-20 transition-all duration-700 ease-out"></div>
          </div>
        ))}
      </div>
    </section>
  );
});

/* ==========================================================================
   3. STRATEGIC ADVANTAGE (WHY CHOOSE US)
   ========================================================================== */
const StrategicAdvantage: React.FC = React.memo(() => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reasons = [
    {
      title: 'Easy Accessibility',
      desc: 'Seamlessly connected to major transit hubs and 5-star hospitality, driving a consistent flow of 100M+ global visitors.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={GOLD_LIGHT} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="m12 8-4 4 4 4M16 12H8" />
        </svg>
      )
    },
    {
      title: 'Marketing Reach',
      desc: 'Leverage our massive digital media network and 10M+ collective social following to amplify your brand globally.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={GOLD_LIGHT} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 5h10M11 9h10M11 13h10M11 17h10M11 21h10M3 7l4 4-4 4" />
        </svg>
      )
    },
    {
      title: 'Brand Synergy',
      desc: 'Position alongside 200+ global luxury flagships, creating a collective pull for high-net-worth individuals.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={GOLD_LIGHT} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2 2 7l10 5 10-5-10-5Z" />
          <path d="m2 17 10 5 10-5" />
          <path d="m2 12 10 5 10-5" />
        </svg>
      )
    },
    {
      title: 'Data Proof',
      desc: 'Access specialized analytics to optimize your store’s performance within our 85% high-conversion environment.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={GOLD_LIGHT} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
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
          opacity: 1, y: 0, duration: 1.2, stagger: 0.2, ease: 'expo.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-[#050505] py-40 px-8 md:px-16 lg:px-24 border-b border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {reasons.map((item, i) => (
          <div key={i} className="advantage-card group relative p-12 bg-black border border-white/5 transition-all duration-1000 hover:border-[#C8A96A]/40 overflow-hidden transform-gpu">
             <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#C8A96A]/5 rounded-full blur-3xl transition-all duration-1000 group-hover:scale-[4] opacity-0 group-hover:opacity-100"></div>
             
             <div className="relative z-10 mb-10 transition-transform duration-700 group-hover:-translate-y-3 group-hover:scale-110">
               {item.icon}
             </div>
             
             <h4 className="relative z-10 text-2xl font-['Oswald'] text-white uppercase tracking-widest mb-6 group-hover:text-[#E5C27A] transition-colors duration-500">
               {item.title}
             </h4>
             <p className="relative z-10 text-neutral-500 text-sm font-light leading-relaxed group-hover:text-neutral-300 transition-colors duration-500">
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
    { value: 1.2, suffix: 'B+', label: 'Annual Luxury Spend', prefix: '$' },
    { value: 85, suffix: '%', label: 'High-Intent Buyers' },
    { value: 3000, suffix: '+', label: 'Average Transaction Value', prefix: '$' },
    { value: 100, suffix: 'M+', label: 'Annual Visitors' },
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
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-32">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center text-center gap-6 group">
              <span 
                id={`luxury-stat-${i}`}
                className="text-6xl md:text-8xl font-bold font-['Oswald'] text-[#E5C27A] tracking-tighter transition-all duration-1000 group-hover:scale-110 drop-shadow-[0_0_20px_rgba(200,169,106,0.2)]"
              >
                {stat.prefix || ''}0{stat.suffix}
              </span>
              <div className="w-12 h-[1px] bg-[#C8A96A]/40 group-hover:w-20 transition-all duration-700"></div>
              <span className="text-[11px] uppercase tracking-[0.5em] text-neutral-500 font-bold">{stat.label}</span>
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
      
      {/* Final Cinematic Footer */}
      <div className="py-60 bg-[#050505] flex flex-col items-center gap-16 relative overflow-hidden">
         <div className="w-[1px] h-48 bg-gradient-to-b from-transparent via-[#C8A96A] to-transparent opacity-60"></div>
         <h2 className="text-5xl md:text-8xl font-['Oswald'] text-white/10 uppercase tracking-[0.6em] text-center px-8 leading-none">
           Luxury Without <br /><span className="text-white/20">Compromise</span>
         </h2>
         <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#C8A96A]/5 rounded-full blur-[150px] pointer-events-none"></div>
      </div>
    </div>
  );
};

export default LuxuryDiningModule;
