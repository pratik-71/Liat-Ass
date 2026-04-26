import React, { useEffect, useRef, useState } from 'react';
import ModuleNavigation from '../common/ModuleNavigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
gsap.config({ force3D: true });
gsap.defaults({ overwrite: 'auto' });

interface AttractionsModuleProps {
  onBack: () => void;
}

const GOLD = '#C8A96A';
const GOLD_LIGHT = '#E5C27A';

/* ==========================================================================
   1. HERO GRID (Exploratory UI with Videos)
   ========================================================================== */
const GridHeroSection: React.FC = React.memo(() => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const tilesRef = useRef<(HTMLDivElement | null)[]>([]);

  const experiences = [
    { 
      title: 'DUBAI AQUARIUM', 
      desc: 'One of the world’s largest suspended aquariums', 
      video: '/attractions/aquarium.mp4', 
      stats: { visitors: '1.5M+', rev: '$45M+', roi: '18% IRR' } 
    },
    { 
      title: 'CHINATOWN', 
      desc: 'A fully immersive cultural retail and dining district', 
      video: '/attractions/china_town.mp4', 
      stats: { visitors: '3M+', rev: '$120M+', roi: '22% IRR' } 
    },
    { 
      title: 'VIRTUAL ARCADE', 
      desc: 'Next-generation immersive entertainment', 
      video: '/attractions/arcade.mp4', 
      stats: { visitors: '800K+', rev: '$25M+', roi: '25% IRR' } 
    },
    { 
      title: 'KIDS PARK', 
      desc: 'A unique leisure and sports experience', 
      video: '/attractions/kids park.mp4', 
      stats: { visitors: '1.2M+', rev: '$35M+', roi: '20% IRR' } 
    },
    { 
      title: 'SWEET WORLD', 
      desc: 'The ultimate candy and dessert experience', 
      video: '/attractions/candy.mp4', 
      stats: { visitors: '900K+', rev: '$20M+', roi: '21% IRR' } 
    },
    { 
      title: 'REEL CINEMAS', 
      desc: 'Luxury viewing and entertainment experiences', 
      video: '/attractions/cinemas.mp4', 
      stats: { visitors: '2M+', rev: '$60M+', roi: '16% IRR' } 
    },
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
    <section ref={sectionRef} className="w-full min-h-screen bg-[#070707] pt-32 pb-24 px-6 md:px-12 relative transform-gpu">
      <div className="max-w-[1600px] mx-auto w-full">
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-[#E5C27A] uppercase tracking-widest font-['Oswald'] drop-shadow-2xl">
            Explore <span className="text-white">Attractions</span>
          </h1>
          <p className="text-[#C8A96A] tracking-widest uppercase text-sm mt-4 font-medium opacity-80">A Journey Through Multiple Worlds</p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 opacity-0">
          {experiences.map((exp, idx) => (
            <div 
              key={idx}
              ref={el => { tilesRef.current[idx] = el; }}
              className="group relative aspect-video rounded-2xl overflow-hidden cursor-pointer border border-white/5 hover:border-[#C8A96A]/40 transition-all duration-500 shadow-2xl"
            >
              <video 
                autoPlay 
                loop 
                muted 
                playsInline
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-in-out group-hover:scale-110 will-change-transform brightness-75 group-hover:brightness-100"
              >
                <source src={exp.video} type="video/mp4" />
              </video>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent transition-all duration-500 group-hover:bg-black/40"></div>

              <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                <h3 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-wide font-['Oswald'] group-hover:text-[#E5C27A] transition-all duration-300 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                  {exp.title}
                </h3>
                
                <div className="relative mt-2 h-[60px] overflow-hidden">
                  <div className="absolute inset-0 transition-all duration-500 group-hover:-translate-y-full group-hover:opacity-0">
                    <p className="text-neutral-300 text-sm md:text-base font-light line-clamp-2 drop-shadow-md">
                      {exp.desc}
                    </p>
                  </div>

                  <div className="absolute inset-0 transition-all duration-500 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 flex gap-6 items-center pt-2 border-t border-[#C8A96A]/30">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-neutral-400 uppercase tracking-wider font-semibold">Visitors</span>
                      <span className="text-white font-bold text-lg font-['Oswald'] leading-tight">{exp.stats.visitors}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-neutral-400 uppercase tracking-wider font-semibold">Revenue</span>
                      <span className="text-white font-bold text-lg font-['Oswald'] leading-tight">{exp.stats.rev}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-[#C8A96A] uppercase tracking-wider font-semibold">Proj. ROI</span>
                      <span className="text-[#E5C27A] font-bold text-lg font-['Oswald'] leading-tight">{exp.stats.roi}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.5)] pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});


/* ==========================================================================
   2. MORE THAN RETAIL (Video Background)
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

      <div ref={textRef} className="relative z-10 max-w-5xl px-8 flex flex-col gap-8">
        <h2 className="text-5xl md:text-8xl font-bold text-white leading-[1.1] tracking-tighter font-['Oswald'] uppercase drop-shadow-[0_10px_40px_rgba(0,0,0,0.8)]">
          More Than Retail — <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E5C27A] to-[#C8A96A] filter drop-shadow-[0_0_20px_rgba(200,169,106,0.4)]">A Global Lifestyle Hub</span>
        </h2>
        <p className="text-xl md:text-3xl text-neutral-300 font-light max-w-3xl mx-auto tracking-wide drop-shadow-2xl">
          Where every corridor leads to a new discovery and every visit becomes a lifelong memory.
        </p>
      </div>
    </section>
  );
});


/* ==========================================================================
   3. INVESTOR IMPACT (Animated Stats)
   ========================================================================== */
const InvestorStatsSection: React.FC = React.memo(() => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<(HTMLDivElement | null)[]>([]);

  const stats = [
    { label: 'ANNUAL VISITORS', value: 100, suffix: 'M+', color: GOLD_LIGHT },
    { label: 'ENTERTAINMENT ROI', value: 24, suffix: '%', color: '#fff' },
    { label: 'DAILY ENGAGEMENT', value: 12, suffix: ' HRS', color: GOLD_LIGHT },
    { label: 'GLOBAL FOOTPRINT', value: 80, suffix: '+ EXPS', color: '#fff' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      statsRef.current.forEach((stat, i) => {
        if (!stat) return;
        const valueObj = { val: 0 };
        const targetValue = stats[i].value;
        const valueElement = stat.querySelector('.stat-value');

        gsap.fromTo(stat,
          { opacity: 0, y: 30 },
          { 
            opacity: 1, y: 0, duration: 1, delay: i * 0.2,
            scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
          }
        );

        if (valueElement) {
          gsap.to(valueObj, {
            val: targetValue,
            duration: 2.5,
            ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
            onUpdate: () => {
              valueElement.textContent = Math.floor(valueObj.val).toString();
            }
          });
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-[#030303] py-32 px-6 border-y border-white/5">
      <div className="max-w-[1400px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
        {stats.map((stat, i) => (
          <div 
            key={i} 
            ref={el => { statsRef.current[i] = el; }}
            className="flex flex-col items-center text-center gap-2 group"
          >
            <div className="flex items-baseline gap-1">
              <span 
                className="stat-value text-5xl md:text-7xl font-bold font-['Oswald'] tracking-tighter transition-all duration-500 group-hover:scale-110 inline-block"
                style={{ color: stat.color }}
              >
                0
              </span>
              <span className="text-3xl md:text-4xl font-bold font-['Oswald'] text-white/50">{stat.suffix}</span>
            </div>
            <div className="w-12 h-[1px] bg-[#C8A96A] mb-4 group-hover:w-24 transition-all duration-700"></div>
            <span className="text-xs md:text-sm text-neutral-400 uppercase tracking-[0.3em] font-medium font-['Inter']">
              {stat.label}
            </span>
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
    <div className="w-full min-h-screen bg-[#070707] text-white font-['Inter'] overflow-x-hidden selection:bg-[#C8A96A] selection:text-black transform-gpu">
      <ModuleNavigation moduleName="Attractions" onBack={onBack} />

      <MoreThanRetailSection />
      <GridHeroSection />
      <InvestorStatsSection />
      
      {/* Footer Tagline */}
      <div className="py-40 bg-[#030303] flex flex-col justify-center items-center gap-12 overflow-hidden relative">
         <div className="w-[1px] bg-gradient-to-b from-transparent via-[#C8A96A] to-transparent h-32 opacity-50"></div>
         <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-[0.2em] uppercase font-['Oswald'] opacity-80 text-center px-8 leading-tight">
           Where Every Moment <br className="md:hidden" /> 
           <span className="text-[#C8A96A]">Becomes A Destination</span>
         </h2>
         <div className="w-[1px] bg-gradient-to-b from-transparent via-[#C8A96A] to-transparent h-32 opacity-50"></div>
         
         {/* Subtle background glow */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C8A96A]/5 rounded-full blur-[120px] pointer-events-none"></div>
      </div>
    </div>
  );
};

export default AttractionsEntertainmentModule;
