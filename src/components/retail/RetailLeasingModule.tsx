import React, { useEffect, useRef } from 'react'
import ModuleNavigation from '../common/ModuleNavigation'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger);
gsap.config({ force3D: true });
gsap.defaults({ overwrite: 'auto' });

interface RetailLeasingModuleProps {
  onBack: () => void;
}


const BRANDS = [
  { name: 'LOUIS VUITTON',  label: 'LOUIS VUITTON',  image: 'https://raw.githubusercontent.com/pratik-71/Liat-Ass/main/public/Retails/image%201.png' },
  { name: 'GUCCI',          label: 'GUCCI',           image: 'https://raw.githubusercontent.com/pratik-71/Liat-Ass/main/public/Retails/image%202.png' },
  { name: 'FASHION AVENUE', label: 'FASHION AVENUE',  image: 'https://raw.githubusercontent.com/pratik-71/Liat-Ass/main/public/Retails/image%203.png' },
  { name: 'CHANEL',         label: 'CHANEL',          image: 'https://raw.githubusercontent.com/pratik-71/Liat-Ass/main/public/Retails/image%204.png' },
  { name: 'HERMÈS',         label: 'HERMÈS',          image: 'https://raw.githubusercontent.com/pratik-71/Liat-Ass/main/public/Retails/image%205.png' },
  { name: 'THE DUBAI MALL', label: 'THE DUBAI MALL',  image: 'https://raw.githubusercontent.com/pratik-71/Liat-Ass/main/public/Retails/image%206.png' },
  { name: 'DIOR',           label: 'DIOR',            image: 'https://raw.githubusercontent.com/pratik-71/Liat-Ass/main/public/Retails/image%207.png' },
  { name: 'BURBERRY',       label: 'BURBERRY',        image: 'https://raw.githubusercontent.com/pratik-71/Liat-Ass/main/public/Retails/image%208.png' },
  { name: 'VERSACE',        label: 'VERSACE',         image: 'https://raw.githubusercontent.com/pratik-71/Liat-Ass/main/public/Retails/image%209.png' },
];

/* ==========================================================================
   1. HERO (IMMERSIVE & DE-CLUTTERED)
   ========================================================================== */
const RetailHero: React.FC = React.memo(() => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.retail-reveal',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.5, stagger: 0.2, ease: 'expo.out', delay: 0.3 }
      );
      
      gsap.fromTo('.hero-bg',
        { scale: 1.1, filter: 'brightness(0.5)' },
        { scale: 1, filter: 'brightness(0.7)', duration: 3, ease: 'power2.out' }
      );

      // Counting stats animation
      const stats = [
        { id: 'stat-visitors', value: 100 },
        { id: 'stat-outlets', value: 1200 },
        { id: 'stat-gla', value: 500 }
      ];

      stats.forEach(stat => {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: stat.value,
          duration: 2.5,
          delay: 1,
          ease: 'power3.out',
          onUpdate: () => {
            const el = document.getElementById(stat.id);
            if (el) el.innerText = Math.floor(obj.val).toLocaleString();
          }
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-screen bg-black overflow-hidden flex flex-col justify-center transform-gpu">
      {/* Immersive Background */}
      <div className="hero-bg absolute inset-0 z-0 bg-cover bg-center will-change-transform" style={{ backgroundImage: "url('https://raw.githubusercontent.com/pratik-71/Liat-Ass/main/public/Retails/big%20one.png')" }}></div>
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent z-10"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 z-10"></div>
      
      {/* Signature Vertical Line */}
      <div className="absolute left-12 top-1/2 -translate-y-1/2 w-[1px] h-48 bg-gradient-to-b from-transparent via-[#C8A96A] to-transparent z-20"></div>

      <div className="relative z-20 px-12 md:px-24 max-w-5xl">
 
        
        <h1 className="retail-reveal text-7xl md:text-[140px] font-black uppercase tracking-tighter leading-[0.85] text-white mb-10">
          Retail <br /><span className="text-[#C8A96A]">Leasing.</span>
        </h1>
        
        <p className="retail-reveal text-lg md:text-2xl text-neutral-400 font-light max-w-xl leading-relaxed mb-12">
          Position your brand at the heart of the world's most visited property. An unmatched ecosystem of high-intent consumers.
        </p>

        {/* Floating Stats Bar */}
        <div className="retail-reveal flex items-center gap-16 border-l border-[#C8A96A]/40 pl-12 py-4">
           <div className="flex flex-col">
              <span className="text-4xl font-['Oswald'] text-white">
                <span id="stat-visitors">0</span>M+
              </span>
              <span className="text-[9px] uppercase tracking-[0.3em] text-[#C8A96A] font-bold">Annual Visitors</span>
           </div>
           <div className="flex flex-col">
              <span className="text-4xl font-['Oswald'] text-white">
                <span id="stat-outlets">0</span>+
              </span>
              <span className="text-[9px] uppercase tracking-[0.3em] text-[#C8A96A] font-bold">World-Class Outlets</span>
           </div>
           <div className="flex flex-col">
              <span className="text-4xl font-['Oswald'] text-white">
                <span id="stat-gla">0</span>K
              </span>
              <span className="text-[9px] uppercase tracking-[0.3em] text-[#C8A96A] font-bold">SQM GLA</span>
           </div>
        </div>
      </div>
      
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30 z-20">
         <span className="text-[9px] uppercase tracking-[0.5em] font-bold text-white">Discover Potential</span>
         <div className="w-[1px] h-12 bg-white"></div>
      </div>
    </section>
  );
});

/* ==========================================================================
   2. BRAND MARQUEE (ELEVATED)
   ========================================================================== */
const BrandMarquee: React.FC = React.memo(() => {
  const LOOP_BRANDS = [...BRANDS, ...BRANDS, ...BRANDS];
  
  return (
    <section className="w-full bg-[#050505] py-24 border-y border-white/5 relative overflow-hidden">
       <style>{`
        @keyframes marquee-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .marquee-track {
          animation: marquee-scroll 40s linear infinite;
        }
      `}</style>

      <div className="mb-16 px-12 md:px-24 flex justify-between items-end">
         <h3 className="text-[10px] font-bold tracking-[0.6em] text-[#C8A96A] uppercase">Partnering with the World's Best</h3>
         <div className="w-24 h-[1px] bg-[#C8A96A]/20"></div>
      </div>

      <div className="marquee-track flex gap-12 w-max px-12 items-center">
         {LOOP_BRANDS.map((brand, i) => (
           <div key={i} className="group relative w-64 md:w-80 h-40 md:h-56 flex-shrink-0 transition-all duration-700 cursor-pointer hover:z-20 hover:scale-110">
              <div 
                className="absolute inset-0 bg-cover bg-center rounded-sm border border-white/5 group-hover:border-[#C8A96A]/80 transition-all duration-1000 group-hover:scale-110" 
                style={{ backgroundImage: `url('${brand.image}')` }} 
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
           </div>
         ))}
      </div>
    </section>
  );
});

/* ==========================================================================
   3. STRATEGIC INSIGHTS (REFINED WHY CHOOSE)
   ========================================================================== */
const StrategicInsights: React.FC = React.memo(() => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const insights = [
    { title: 'Prime Exposure', desc: 'Strategically located within high-traffic zones, ensuring maximum brand visibility to millions daily.' },
    { title: 'Global Audience', desc: 'Access an international, high-net-worth audience with proven spending power and luxury preferences.' },
    { title: 'Performance Driven', desc: 'Join a world-class retail ecosystem where flagship brands consistently outperform global benchmarks.' }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.insight-reveal',
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
    <section ref={sectionRef} className="w-full bg-black py-40 px-12 md:px-24">
       <div className="grid grid-cols-1 md:grid-cols-3 gap-24 lg:gap-32">
          {insights.map((insight, i) => (
            <div key={i} className="insight-reveal flex flex-col gap-8 group">
               <div className="flex items-center gap-6">
                  <span className="text-4xl md:text-5xl font-['Oswald'] text-[#C8A96A]/20 group-hover:text-[#C8A96A] transition-colors duration-700">0{i+1}</span>
                  <div className="w-12 h-[1px] bg-[#C8A96A]/20"></div>
               </div>
               <h4 className="text-2xl md:text-3xl font-['Oswald'] text-white uppercase tracking-widest leading-none">
                 {insight.title}
               </h4>
               <p className="text-neutral-500 font-light leading-relaxed group-hover:text-neutral-300 transition-colors duration-700">
                 {insight.desc}
               </p>
            </div>
          ))}
       </div>
    </section>
  );
});

/* ==========================================================================
   4. MARKET DOMINANCE (MORE DATA)
   ========================================================================== */
const MarketDominance: React.FC = React.memo(() => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const data = [
    { label: 'AVERAGE DWELL TIME', value: '3.5', suffix: ' HRS', desc: 'Industry-leading engagement duration across all retail zones.' },
    { label: 'LEASE OCCUPANCY', value: '98', suffix: '%', desc: 'Consistent demand with a waiting list of global premium brands.' },
    { label: 'TOURIST CONTRIBUTION', value: '45', suffix: '%', desc: 'Significant revenue driver from high-spending international visitors.' }
  ];

  return (
    <section ref={sectionRef} className="w-full bg-[#070707] py-40 px-12 md:px-24 border-t border-white/5">
       <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-24">
          <div className="flex-1">
             <h3 className="text-[10px] font-bold tracking-[0.6em] text-[#C8A96A] uppercase mb-8">Unmatched Performance</h3>
             <h4 className="text-4xl md:text-6xl font-['Oswald'] text-white uppercase tracking-tighter leading-none mb-12">
               Market <br /><span className="text-[#C8A96A]">Dominance.</span>
             </h4>
             <div className="w-24 h-[1px] bg-[#C8A96A] opacity-40"></div>
          </div>
          <div className="flex-[2] grid grid-cols-1 md:grid-cols-3 gap-12">
             {data.map((item, i) => (
               <div key={i} className="flex flex-col gap-4 p-8 border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-500 group">
                  <div className="text-4xl font-['Oswald'] text-white group-hover:text-[#E5C27A] transition-colors duration-500">
                    {item.value}{item.suffix}
                  </div>
                  <span className="text-[9px] font-bold tracking-[0.3em] text-[#C8A96A] uppercase">{item.label}</span>
                  <p className="text-neutral-500 text-xs leading-relaxed mt-2">{item.desc}</p>
               </div>
             ))}
          </div>
       </div>
    </section>
  );
});

/* ==========================================================================
   5. PERFORMANCE DATA (DAILY SPEND)
   ========================================================================== */
const PerformanceHighlight: React.FC = React.memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={containerRef} className="w-full bg-[#050505] py-60 px-12 flex flex-col items-center text-center relative overflow-hidden">
       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-32 bg-gradient-to-b from-transparent via-[#C8A96A] to-transparent"></div>
       
       <div className="relative z-10 max-w-4xl">
          <span className="text-[10px] font-bold tracking-[0.8em] text-[#C8A96A] uppercase mb-12 block">Economic Impact</span>
          <h2 className="text-5xl md:text-9xl font-black font-['Oswald'] text-white uppercase tracking-tighter leading-none mb-12">
            $50M+ <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C8A96A] to-white/10">Daily Spend.</span>
          </h2>
          <p className="text-neutral-500 text-lg md:text-2xl font-light italic leading-relaxed max-w-2xl mx-auto">
            "Tap into the world's most concentrated stream of luxury capital."
          </p>
       </div>

       {/* Ambient Glow */}
       <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[#C8A96A]/5 rounded-full blur-[120px] pointer-events-none"></div>
    </section>
  );
});

/* ==========================================================================
   MAIN MODULE
   ========================================================================== */
const RetailLeasingModule: React.FC<RetailLeasingModuleProps> = ({ onBack }) => {
  return (
    <div className="w-full min-h-screen bg-black text-white font-['Inter'] overflow-x-hidden selection:bg-[#C8A96A] selection:text-black">
      <ModuleNavigation moduleName="Retail & Leasing" onBack={onBack} />

      <RetailHero />
      <BrandMarquee />
      <StrategicInsights />
      <MarketDominance />
      <PerformanceHighlight />
    </div>
  );
};

export default RetailLeasingModule;
