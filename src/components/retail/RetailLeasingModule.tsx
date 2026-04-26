import React, { useEffect, useRef, useState } from 'react'
import ModuleNavigation from '../common/ModuleNavigation'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger);
gsap.config({ force3D: true });
gsap.defaults({ overwrite: 'auto' });

interface RetailLeasingModuleProps {
  onBack: () => void;
}

const GOLD_LIGHT = '#E5C27A';
const GOLD = '#C8A96A';

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
   1. HERO (EXISTING)
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
      <div className="hero-bg absolute inset-0 z-0 bg-cover bg-center will-change-transform" style={{ backgroundImage: "url('https://raw.githubusercontent.com/pratik-71/Liat-Ass/main/public/Retails/big%20one.png')" }}></div>
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent z-10"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 z-10"></div>
      <div className="absolute left-12 top-1/2 -translate-y-1/2 w-[1px] h-48 bg-gradient-to-b from-transparent via-[#C8A96A] to-transparent z-20"></div>

      <div className="relative z-20 px-12 md:px-24 max-w-5xl">
        <h1 className="retail-reveal text-7xl md:text-[140px] font-black uppercase tracking-tighter leading-[0.85] text-white mb-10">
          Retail <br /><span className="text-[#C8A96A]">Leasing.</span>
        </h1>
        <p className="retail-reveal text-lg md:text-2xl text-neutral-400 font-light max-w-xl leading-relaxed mb-12">
          Position your brand at the heart of the world's most visited property. An unmatched ecosystem of high-intent consumers.
        </p>
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
   2. RETAIL PATH (NEW)
   ========================================================================== */
const RetailPathSection: React.FC = React.memo(() => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activePath, setActivePath] = useState<number | null>(null);

  const paths = [
    {
      title: 'Luxury Flagship',
      text: 'High-impact flagship stores in premium zones',
      tag: 'High Investment • High Visibility',
      details: {
        title: 'Luxury Flagship Opportunities',
        bullets: ['Located in Fashion Avenue', 'High-net-worth audience', 'Premium adjacency brands'],
        image: 'https://raw.githubusercontent.com/pratik-71/Liat-Ass/main/public/Retails/fashion%20avenue.webp',
        stats: { val: '$3K+', label: 'Avg Transaction', sub: '85% Luxury Conversion' }
      }
    },
    {
      title: 'Premium Retail',
      text: 'Established brands targeting global shoppers',
      tag: 'Balanced Growth',
      details: {
        title: 'Premium Retail Districts',
        bullets: ['Strategic high-footfall corridors', 'Diverse international demographics', 'Proven performance benchmarks'],
        image: 'https://raw.githubusercontent.com/pratik-71/Liat-Ass/main/public/Retails/luxuary.jpg',
        stats: { val: '100M+', label: 'Annual Reach', sub: 'Consistent Growth' }
      }
    },
    {
      title: 'Dining & F&B',
      text: 'High-dwell, high-conversion dining spaces',
      tag: 'Experience Driven',
      details: {
        title: 'Gastronomic Destinations',
        bullets: ['Michelin-starred adjacency', 'Waterfront and terrace options', 'High dwell time environment'],
        image: 'https://raw.githubusercontent.com/pratik-71/Liat-Ass/main/public/Retails/fountain%20dining.jpg',
        stats: { val: '3.5 Hrs', label: 'Average Dwell', sub: 'Elevated Engagement' }
      }
    },
    {
      title: 'Pop-up / Activation',
      text: 'Short-term, high-exposure retail formats',
      tag: 'Fast Market Entry',
      details: {
        title: 'Activation & Pop-up Hubs',
        bullets: ['Flexible short-term formats', 'High-impact visibility zones', 'Rapid market testing platform'],
        image: 'https://raw.githubusercontent.com/pratik-71/Liat-Ass/main/public/Retails/atrium.jpg',
        stats: { val: '10M+', label: 'Digital Reach', sub: 'Instant Brand Impact' }
      }
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.path-card', 
        { opacity: 0, y: 50 },
        { 
          opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-[#050505] py-32 px-12 md:px-24 border-y border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 text-center">
          <h2 className="text-[10px] font-bold tracking-[0.8em] text-[#C8A96A] uppercase mb-4">Phase 2: Expansion</h2>
          <h3 className="text-4xl md:text-6xl font-['Oswald'] text-white uppercase tracking-tighter">Choose Your <span className="text-[#C8A96A]">Retail Path</span></h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {paths.map((path, i) => (
            <div 
              key={i}
              onClick={() => setActivePath(activePath === i ? null : i)}
              className={`path-card group relative p-10 border transition-all duration-500 cursor-pointer overflow-hidden transform-gpu
                ${activePath === i ? 'bg-[#C8A96A] border-[#C8A96A] translate-y-[-8px] scale-[1.02] shadow-[0_20px_50px_rgba(200,169,106,0.3)]' : 'bg-black/40 border-white/10 hover:border-[#C8A96A]/60 hover:translate-y-[-8px] hover:scale-[1.02] hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]'}
              `}
            >
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#C8A96A]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              <h4 className={`text-2xl font-['Oswald'] uppercase tracking-widest mb-6 transition-colors duration-500 ${activePath === i ? 'text-black' : 'text-white group-hover:text-[#E5C27A]'}`}>
                {path.title}
              </h4>
              <p className={`text-sm font-light leading-relaxed mb-10 transition-colors duration-500 ${activePath === i ? 'text-black/80' : 'text-neutral-400 group-hover:text-neutral-200'}`}>
                {path.text}
              </p>
              <div className={`text-[9px] font-bold tracking-widest uppercase py-2 px-4 border rounded-full inline-block transition-colors duration-500 ${activePath === i ? 'border-black/20 text-black/60 bg-black/5' : 'border-white/10 text-[#C8A96A]'}`}>
                {path.tag}
              </div>
            </div>
          ))}
        </div>

        {/* Expandable Module */}
        <div className={`overflow-hidden transition-all duration-700 ease-in-out ${activePath !== null ? 'max-h-[800px] opacity-100 mt-12' : 'max-h-0 opacity-0'}`}>
          {activePath !== null && (
            <div className="bg-white/[0.03] border border-white/5 rounded-sm p-12 flex flex-col md:flex-row gap-16 items-center">
              <div className="flex-1">
                <h5 className="text-4xl font-['Oswald'] text-[#C8A96A] uppercase mb-8">{paths[activePath].details.title}</h5>
                <ul className="space-y-4">
                  {paths[activePath].details.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-center gap-4 text-lg text-neutral-300 font-light">
                      <div className="w-1.5 h-1.5 bg-[#C8A96A] rotate-45"></div>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex-1 relative aspect-video w-full rounded-sm overflow-hidden border border-white/10">
                <img src={paths[activePath].details.image} alt={paths[activePath].title} className="w-full h-full object-cover grayscale-[40%] hover:grayscale-0 transition-all duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                   <div>
                      <div className="text-4xl font-['Oswald'] text-white leading-none mb-2">{paths[activePath].details.stats.val}</div>
                      <div className="text-[10px] text-[#C8A96A] uppercase font-bold tracking-widest">{paths[activePath].details.stats.label}</div>
                   </div>
                   <div className="text-[10px] text-white/40 uppercase font-bold tracking-widest">{paths[activePath].details.stats.sub}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
});

/* ==========================================================================
   2.5 BRAND MARQUEE (ELEVATED)
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
   3. STRATEGIC INSIGHTS (EXISTING)
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
    <section ref={sectionRef} className="w-full bg-black py-40 px-12 md:px-24 border-b border-white/5">
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
   4. REVENUE FLOW (NEW)
   ========================================================================== */
const RevenueFlowSection: React.FC = React.memo(() => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  const nodes = [
    { label: 'Visitor', value: '100M+ Annual', sub: 'Global Footfall' },
    { label: 'Engagement', value: '3.5 Hrs Dwell', sub: 'Interactive Sessions' },
    { label: 'Conversion', value: '85% Luxury Intent', sub: 'High Capital Concentration' },
    { label: 'Repeat Spend', value: 'High Retention', sub: 'Loyal Luxury Audience' }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%'
        }
      });

      tl.fromTo(lineRef.current, 
        { scaleX: 0 }, 
        { scaleX: 1, duration: 2, ease: 'power2.inOut', transformOrigin: 'left center' }
      );

      tl.fromTo('.flow-node', 
        { opacity: 0, scale: 0.8 }, 
        { opacity: 1, scale: 1, duration: 0.8, stagger: 0.3, ease: 'back.out(1.4)' }, 
        '-=1.5'
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-[#050505] py-48 px-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        <h2 className="text-[10px] font-bold tracking-[0.8em] text-[#C8A96A] uppercase mb-20 block">From Footfall to Revenue</h2>
        
        <div className="relative w-full flex justify-between items-start">
          {/* Connecting Line */}
          <div ref={lineRef} className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#C8A96A] to-transparent opacity-30 -translate-y-[80px]"></div>
          
          {nodes.map((node, i) => (
            <div key={i} className="flow-node flex flex-col items-center flex-1 relative z-10">
              <div className="w-16 h-16 rounded-full bg-black border border-[#C8A96A] flex items-center justify-center text-[#C8A96A] font-['Oswald'] text-xl mb-12 shadow-[0_0_30px_rgba(200,169,106,0.1)]">
                0{i+1}
              </div>
              <h4 className="text-xl font-bold text-white uppercase tracking-widest mb-4">{node.label}</h4>
              <div className="text-2xl font-['Oswald'] text-[#C8A96A] mb-2">{node.value}</div>
              <p className="text-[10px] text-neutral-500 uppercase tracking-widest">{node.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

/* ==========================================================================
   5. MARKET DOMINANCE (ENHANCED)
   ========================================================================== */
const MarketDominance: React.FC = React.memo(() => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const data = [
    { label: 'AVERAGE DWELL TIME', value: 3.5, suffix: ' HRS', desc: 'Industry-leading engagement duration across all retail zones.' },
    { label: 'LEASE OCCUPANCY', value: 98, suffix: '%', desc: 'Consistent demand with a waiting list of global premium brands.' },
    { label: 'TOURIST CONTRIBUTION', value: 45, suffix: '%', desc: 'Significant revenue driver from high-spending international visitors.' }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      data.forEach((item, i) => {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: item.value,
          duration: 2.5,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
          onUpdate: () => {
            const el = document.getElementById(`market-stat-${i}`);
            if (el) el.innerText = item.value % 1 === 0 ? Math.floor(obj.val).toString() : obj.val.toFixed(1);
          }
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-[#070707] py-40 px-12 md:px-24 border-y border-white/5">
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
               <div key={i} className="flex flex-col gap-4 p-8 border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-[#C8A96A]/40 transition-all duration-500 group cursor-default hover:scale-[1.02] transform-gpu">
                  <div className="text-4xl font-['Oswald'] text-white group-hover:text-[#E5C27A] transition-colors duration-500">
                    <span id={`market-stat-${i}`}>0</span>{item.suffix}
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
   6. LOCATION EXPLORER (NEW)
   ========================================================================== */
const LocationExplorerSection: React.FC = React.memo(() => {
  const [activeLoc, setActiveLoc] = useState<number | null>(null);

  const locations = [
    { 
      title: 'Fashion Avenue', 
      desc: 'Ultra-luxury flagship destination for global fashion houses and high-net-worth clientele.',
      image: 'https://raw.githubusercontent.com/pratik-71/Liat-Ass/main/public/Retails/fashion%20avenue.webp',
      details: {
        brands: 'LV, Dior, Hermès, Chanel',
        spend: '$3,500+',
        sizes: '500 - 2,500 SQM',
        audience: 'VHNWI / International Elite'
      }
    },
    { 
      title: 'Luxury Retail Wing', 
      desc: 'Premium retail environment designed for international brands targeting affluent shoppers.',
      image: 'https://raw.githubusercontent.com/pratik-71/Liat-Ass/main/public/Retails/luxuary.jpg' 
    },
    { 
      title: 'Fountain Promenade Dining', 
      desc: 'High-dwell waterfront dining with unmatched visibility and premium customer experience.',
      image: 'https://raw.githubusercontent.com/pratik-71/Liat-Ass/main/public/Retails/fountain%20dining.jpg' 
    },
    { 
      title: 'Central Atrium Zones', 
      desc: 'Maximum exposure zones with continuous global footfall and high engagement traffic.',
      image: 'https://raw.githubusercontent.com/pratik-71/Liat-Ass/main/public/Retails/atrium.jpg' 
    }
  ];

  return (
    <section className="w-full bg-black py-40 px-12 md:px-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <h2 className="text-[10px] font-bold tracking-[0.8em] text-[#C8A96A] uppercase mb-4">Strategic Footprint</h2>
          <h3 className="text-4xl md:text-6xl font-['Oswald'] text-white uppercase tracking-tighter">Explore by <span className="text-[#C8A96A]">Location</span></h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {locations.map((loc, i) => (
            <div key={i} className="flex flex-col gap-6">
              <div 
                onClick={() => i === 0 ? setActiveLoc(activeLoc === 0 ? null : 0) : null}
                className="group relative aspect-[16/8] overflow-hidden cursor-pointer border border-white/5 transform-gpu"
              >
                {/* Background Image */}
                <img src={loc.image} alt={loc.title} className="absolute inset-0 w-full h-full object-cover grayscale-[60%] transition-all duration-1000 group-hover:scale-110 group-hover:grayscale-0" />
                
                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-700"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-700"></div>
                
                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-10 pb-12">
                  <h4 className="text-2xl md:text-4xl font-['Oswald'] text-white uppercase tracking-[0.15em] mb-3 transition-colors duration-500 group-hover:text-[#E5C27A] drop-shadow-2xl">
                    {loc.title}
                  </h4>
                  <p className="text-neutral-400 text-xs md:text-sm font-light leading-relaxed max-w-sm opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-700">
                    {loc.desc}
                  </p>
                </div>

                {/* Gold Indicator Accent */}
                <div className="absolute bottom-10 right-10 w-8 h-[1px] bg-[#C8A96A] transition-all duration-700 group-hover:w-16"></div>
              </div>

              {/* Expandable Content (Example for Fashion Avenue) */}
              {i === 0 && activeLoc === 0 && (
                <div className="bg-white/[0.03] border border-[#C8A96A]/20 p-10 rounded-sm animate-fade-in-up">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div>
                      <div className="text-[9px] text-[#C8A96A] uppercase font-bold tracking-widest mb-2">Flagships</div>
                      <div className="text-sm text-white font-medium">{loc.details?.brands}</div>
                    </div>
                    <div>
                      <div className="text-[9px] text-[#C8A96A] uppercase font-bold tracking-widest mb-2">Avg. Spend</div>
                      <div className="text-sm text-white font-medium">{loc.details?.spend}</div>
                    </div>
                    <div>
                      <div className="text-[9px] text-[#C8A96A] uppercase font-bold tracking-widest mb-2">Store Sizes</div>
                      <div className="text-sm text-white font-medium">{loc.details?.sizes}</div>
                    </div>
                    <div>
                      <div className="text-[9px] text-[#C8A96A] uppercase font-bold tracking-widest mb-2">Audience</div>
                      <div className="text-sm text-white font-medium">{loc.details?.audience}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

/* ==========================================================================
   7. FINAL CTA (NEW)
   ========================================================================== */
const RetailCTASection: React.FC = React.memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.cta-content', 
        { opacity: 0, scale: 0.95 },
        { 
          opacity: 1, scale: 1, duration: 1.5, ease: 'power2.out',
          scrollTrigger: { trigger: containerRef.current, start: 'top 80%' }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="w-full bg-[#070707] py-60 px-8 flex flex-col items-center justify-center text-center relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 bg-radial-gradient from-[#C8A96A]/5 to-transparent opacity-50"></div>
      
      <div className="cta-content relative z-10 flex flex-col items-center">
        <h2 className="text-4xl md:text-7xl font-bold font-['Oswald'] text-white uppercase tracking-tight leading-none mb-12 max-w-4xl">
          Position Your Brand Where the <span className="text-[#C8A96A]">World Shops.</span>
        </h2>
        
        <div className="flex flex-col md:flex-row gap-6">
          <button className="group relative px-10 py-5 bg-[#C8A96A] text-black font-bold uppercase tracking-widest text-xs transition-all duration-300 hover:bg-[#E5C27A] hover:scale-105">
            Book Consultation
          </button>
          <button className="group relative px-10 py-5 bg-transparent border border-white/20 text-white font-bold uppercase tracking-widest text-xs transition-all duration-300 hover:border-[#C8A96A] hover:text-[#C8A96A] hover:scale-105">
            Request Leasing Deck
          </button>
          <button className="group relative px-10 py-5 bg-transparent border border-white/20 text-white font-bold uppercase tracking-widest text-xs transition-all duration-300 hover:border-[#C8A96A] hover:text-[#C8A96A] hover:scale-105">
            Explore Opportunities
          </button>
        </div>
      </div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-[#C8A96A]/30 to-transparent"></div>
    </section>
  );
});

/* ==========================================================================
   MAIN MODULE (CLEAN STRUCTURE)
   ========================================================================== */
const RetailLeasingModule: React.FC<RetailLeasingModuleProps> = ({ onBack }) => {
  return (
    <div className="w-full min-h-screen bg-black text-white font-['Inter'] overflow-x-hidden selection:bg-[#C8A96A] selection:text-black">
      <ModuleNavigation moduleName="Retail & Leasing" onBack={onBack} />

      <RetailHero />
      <RetailPathSection />
      {/* Brand Marquee is part of the premium feel */}
      <BrandMarquee />
      <StrategicInsights />
      <RevenueFlowSection />
      <MarketDominance />
      <LocationExplorerSection />
      <RetailCTASection />
      
      <style>{`
        .bg-radial-gradient {
          background: radial-gradient(circle at center, var(--tw-gradient-from) 0%, var(--tw-gradient-to) 100%);
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default RetailLeasingModule;
