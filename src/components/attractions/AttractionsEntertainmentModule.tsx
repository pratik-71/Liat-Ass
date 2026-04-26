import React, { useEffect, useRef } from 'react';
import ModuleNavigation from '../common/ModuleNavigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
gsap.config({ force3D: true });
gsap.defaults({ overwrite: 'auto' });

interface AttractionsModuleProps {
  onBack: () => void;
}


/* ==========================================================================
   1. HERO SECTION (REPOSITIONED)
   ========================================================================== */
const MoreThanRetailSection: React.FC = React.memo(() => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(textRef.current,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1, duration: 1.5, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-[80vh] md:h-screen overflow-hidden flex items-center justify-center text-center transform-gpu">
      <video 
        autoPlay 
        loop 
        muted 
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-50 will-change-transform scale-105"
      >
        <source src="/attractions/enjoyment.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-[#070707] via-transparent to-[#070707]"></div>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>

      <div ref={textRef} className="relative z-10 max-w-7xl px-8 flex flex-col gap-8">
        <h2 className="text-4xl md:text-7xl lg:text-[6.5rem] font-bold text-white leading-[1] tracking-tighter font-['Oswald'] uppercase drop-shadow-[0_10px_40px_rgba(0,0,0,0.8)]">
          Beyond Retail<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E5C27A] to-[#C8A96A] filter drop-shadow-[0_0_20px_rgba(200,169,106,0.4)]">A World of Experiences</span>
        </h2>
        <p className="text-lg md:text-2xl text-neutral-300 font-light max-w-4xl mx-auto tracking-wide drop-shadow-2xl">
          Converting global traffic into measurable commercial value.
        </p>
      </div>
    </section>
  );
});

/* ==========================================================================
   2. ATTRACTIONS GRID (GROUPED & IMPACT-BASED)
   ========================================================================== */
const GridHeroSection: React.FC = React.memo(() => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const tilesRef = useRef<(HTMLDivElement | null)[]>([]);

  const categories = [
    {
      label: 'ENTERTAINMENT ANCHORS',
      items: [
        { 
          title: 'DUBAI AQUARIUM', 
          desc: 'A primary footfall anchor attracting high daily visitor volumes across all demographics', 
          video: 'https://raw.githubusercontent.com/pratik-71/Liat-Ass/main/public/attractions/aquarium.mp4', 
          impact: 'Global Traffic Magnet' 
        },
        { 
          title: 'REEL CINEMAS', 
          desc: 'Premium entertainment anchor generating consistent evening and weekend traffic spikes', 
          video: 'https://raw.githubusercontent.com/pratik-71/Liat-Ass/main/public/attractions/cinemas.mp4', 
          impact: 'High-Peak Generator' 
        },
      ]
    },
    {
      label: 'CULTURAL ZONES',
      items: [
        { 
          title: 'CHINATOWN', 
          desc: 'A high-density cultural zone driving extended dwell time and cross-category spending', 
          video: 'https://raw.githubusercontent.com/pratik-71/Liat-Ass/main/public/attractions/china_town.mp4', 
          impact: 'Deep Dwell Destination' 
        },
      ]
    },
    {
      label: 'FAMILY DESTINATIONS',
      items: [
        { 
          title: 'KIDS PARK', 
          desc: 'Family-focused attraction driving longer visit durations and group spending behavior', 
          video: 'https://raw.githubusercontent.com/pratik-71/Liat-Ass/main/public/attractions/kids%20park.mp4', 
          impact: 'Group Spend Driver' 
        },
      ]
    },
    {
      label: 'EXPERIENTIAL RETAIL',
      items: [
        { 
          title: 'SWEET WORLD', 
          desc: 'Impulse-driven retail experience boosting spontaneous purchases and social engagement', 
          video: 'https://raw.githubusercontent.com/pratik-71/Liat-Ass/main/public/attractions/candy.mp4', 
          impact: 'Impulse Value Accelerator' 
        },
        { 
          title: 'VIRTUAL ARCADE', 
          desc: 'High-engagement entertainment hub increasing repeat visits and younger audience retention', 
          video: 'https://raw.githubusercontent.com/pratik-71/Liat-Ass/main/public/attractions/arcade.mp4', 
          impact: 'Retention Multiplier' 
        },
      ]
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      tilesRef.current.forEach((tile) => {
        if (!tile) return;
        gsap.fromTo(tile,
          { opacity: 0, y: 40 },
          { 
            opacity: 1, y: 0, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: tile, start: 'top 85%' }
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-[#070707] py-40 px-6 md:px-12">
      <div className="max-w-[1600px] mx-auto w-full">
        <div className="mb-24">
          <h2 className="text-[10px] font-bold tracking-[0.8em] text-[#C8A96A] uppercase mb-4">Strategic Assets</h2>
          <h3 className="text-4xl md:text-6xl font-bold text-white uppercase tracking-tight font-['Oswald'] leading-tight">
            Attractions That Drive <span className="text-[#E5C27A]">Footfall & Revenue</span>
          </h3>
        </div>

        <div className="space-y-32">
          {categories.map((cat, catIdx) => (
            <div key={catIdx} className="space-y-10">
              <div className="flex items-center gap-6">
                <span className="text-xs font-bold text-[#C8A96A] tracking-[0.4em] uppercase">{cat.label}</span>
                <div className="flex-1 h-[1px] bg-white/10"></div>
              </div>
              <div className={`grid grid-cols-1 ${cat.items.length > 1 ? 'md:grid-cols-2' : 'max-w-4xl mx-auto'} gap-8`}>
                {cat.items.map((exp, expIdx) => (
                  <div 
                    key={expIdx}
                    ref={el => { tilesRef.current[catIdx * 10 + expIdx] = el; }}
                    className="group relative aspect-video rounded-3xl overflow-hidden cursor-pointer border border-white/5 hover:border-[#C8A96A]/40 transition-all duration-1000 hover:-translate-y-4 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)]"
                  >
                    <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110">
                      <source src={exp.video} type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-10 z-10">
                      <div className="text-[9px] text-[#C8A96A] font-bold uppercase tracking-widest mb-3">{exp.impact}</div>
                      <h4 className="text-3xl font-bold text-white uppercase tracking-wide font-['Oswald'] mb-4 group-hover:text-[#E5C27A] transition-colors">{exp.title}</h4>
                      <p className="text-neutral-400 text-sm font-light max-w-md opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                        {exp.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

/* ==========================================================================
   3. FROM ATTRACTION TO REVENUE (NEW BUSINESS FLOW)
   ========================================================================== */
const RevenueFlowSection: React.FC = React.memo(() => {
  const steps = [
    { title: 'Attractions', desc: 'Increased Footfall' },
    { title: 'Footfall', desc: 'Longer Dwell Time' },
    { title: 'Dwell Time', desc: 'Higher Spending' },
    { title: 'Spending', desc: 'Strong Brand Performance' }
  ];

  return (
    <section className="w-full bg-[#050505] py-40 px-8 border-y border-white/5 overflow-hidden">
      <div className="max-w-[1400px] mx-auto text-center">
        <h2 className="text-[10px] text-[#C8A96A] font-bold tracking-[0.8em] uppercase mb-20">From Attraction to Revenue</h2>
        <div className="flex flex-col md:flex-row justify-between items-center gap-12 relative">
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#C8A96A]/20 hidden md:block -translate-y-[60px]"></div>
          {steps.map((step, i) => (
            <div key={i} className="relative z-10 flex flex-col items-center flex-1 group">
              <div className="w-16 h-16 rounded-full bg-black border border-[#C8A96A] flex items-center justify-center text-[#C8A96A] font-['Oswald'] text-xl mb-10 shadow-[0_0_30px_rgba(200,169,106,0.1)] group-hover:bg-[#C8A96A] group-hover:text-black transition-all duration-500">
                0{i+1}
              </div>
              <h4 className="text-xl font-bold text-white uppercase tracking-widest mb-3">{step.title}</h4>
              <p className="text-[#C8A96A] text-[10px] font-bold uppercase tracking-widest">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

/* ==========================================================================
   4. INVESTOR IMPACT (REALISTIC STATS)
   ========================================================================== */
const InvestorStatsSection: React.FC = React.memo(() => {
  const stats = [
    { label: 'ANNUAL VISITORS', value: 100, suffix: 'M+', desc: 'Consistent global traffic' },
    { label: 'AVERAGE DWELL TIME', value: 3.5, suffix: ' HRS', desc: 'High-engagement duration' },
    { label: 'CROSS-ZONE MOVEMENT', value: 85, suffix: '%', desc: 'Strategic traffic flow' },
    { label: 'SPENDING BEHAVIOR', value: 92, suffix: '%', desc: 'Conversion intent' },
  ];

  return (
    <section className="w-full bg-[#030303] py-40 px-6">
      <div className="max-w-[1400px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 text-center">
        {stats.map((stat, i) => (
          <div key={i} className="flex flex-col items-center group">
            <div className="flex items-baseline gap-1 mb-4">
              <span className="text-5xl md:text-7xl font-bold font-['Oswald'] text-[#E5C27A]">{stat.value}{stat.suffix}</span>
            </div>
            <div className="w-12 h-[1px] bg-[#C8A96A]/30 mb-6 group-hover:w-20 transition-all duration-700"></div>
            <span className="text-xs text-white font-bold tracking-[0.2em] uppercase mb-2">{stat.label}</span>
            <p className="text-[10px] text-neutral-500 uppercase tracking-widest">{stat.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
});

/* ==========================================================================
   MAIN MODULE COMPONENT
   ========================================================================== */
const AttractionsEntertainmentModule: React.FC<AttractionsModuleProps> = ({ onBack }) => {
  return (
    <div className="w-full min-h-screen bg-[#070707] text-white font-['Inter'] overflow-x-hidden selection:bg-[#C8A96A] selection:text-black">
      <ModuleNavigation moduleName="Attractions" onBack={onBack} />
      <MoreThanRetailSection />
      <InvestorStatsSection />
      <GridHeroSection />
      <RevenueFlowSection />
      
      <div className="py-60 bg-[#030303] flex flex-col justify-center items-center text-center px-8 relative overflow-hidden">
         <div className="w-[1px] bg-gradient-to-b from-transparent via-[#C8A96A] to-transparent h-48 opacity-30 mb-20"></div>
         <h2 className="text-4xl md:text-7xl font-bold text-white tracking-tight uppercase font-['Oswald'] mb-16 leading-none max-w-5xl">
           Where Footfall Converts Into <br />
           <span className="text-[#C8A96A]">Measurable Value.</span>
         </h2>
         <div className="flex flex-col md:flex-row gap-6 mb-20 relative z-10">
            <button className="px-10 py-5 bg-[#C8A96A] text-black font-bold uppercase tracking-widest text-xs transition-all hover:bg-[#E5C27A] hover:scale-105">
              Explore Partnership Opportunities
            </button>
            <button className="px-10 py-5 bg-transparent border border-white/20 text-white font-bold uppercase tracking-widest text-xs transition-all hover:border-[#C8A96A] hover:text-[#C8A96A] hover:scale-105">
              Activate Your Brand
            </button>
         </div>
         <div className="w-[1px] bg-gradient-to-b from-transparent via-[#C8A96A] to-transparent h-48 opacity-30 mt-20"></div>
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#C8A96A]/5 rounded-full blur-[150px] pointer-events-none"></div>
      </div>
    </div>
  );
};

export default AttractionsEntertainmentModule;
