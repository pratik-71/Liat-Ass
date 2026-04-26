import React, { useEffect, useRef, useState } from 'react';
import ModuleNavigation from '../common/ModuleNavigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
gsap.config({ force3D: true });
gsap.defaults({ overwrite: 'auto' });

interface EventsPlatformModuleProps {
  onBack: () => void;
}

/* ==========================================================================
   1. HERO SECTION (REFINED TONE)
   ========================================================================== */
const EventsHeroSection: React.FC = React.memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const panelLeftRef = useRef<HTMLDivElement>(null);
  const panelCenterRef = useRef<HTMLDivElement>(null);
  const panelRightRef = useRef<HTMLDivElement>(null);
  const giantTextRef = useRef<HTMLDivElement>(null);

  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  
  const HERO_IMAGES = [
    'https://raw.githubusercontent.com/pratik-71/Liat-Ass/main/public/events/image%201.png',
    'https://raw.githubusercontent.com/pratik-71/Liat-Ass/main/public/events/image%202.png',
    'https://raw.githubusercontent.com/pratik-71/Liat-Ass/main/public/events/image%203.png',
    'https://raw.githubusercontent.com/pratik-71/Liat-Ass/main/public/events/image%204.png',
    'https://raw.githubusercontent.com/pratik-71/Liat-Ass/main/public/events/image%205.png'
  ];

  const words = ['TOP-TIER BRANDS', 'GLOBAL ACTIVATIONS', 'ICONIC EVENTS', 'PREMIUM LAUNCHES'];

  useEffect(() => {
    const imgTimer = setInterval(() => {
      setCurrentImgIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 4000);

    const wordTimer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2500);

    return () => {
      clearInterval(imgTimer);
      clearInterval(wordTimer);
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(bgRef.current, { scale: 1, opacity: 0 }, { scale: 1.05, opacity: 1, duration: 1.5, ease: 'power2.out' });
      gsap.to(bgRef.current, { scale: 1.12, duration: 20, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      gsap.fromTo(giantTextRef.current, { opacity: 0, scale: 0.9 }, { opacity: 0.08, scale: 1, duration: 2, ease: 'power2.out' });
      gsap.fromTo(headingRef.current, { scale: 0.9, opacity: 0, y: 30 }, { scale: 1, opacity: 1, y: 0, duration: 1.2, ease: 'expo.out' });

      const tl = gsap.timeline({ delay: 0.5 });
      tl.fromTo(panelLeftRef.current, { x: -100, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: 'power3.out' }, 0);
      tl.fromTo(panelCenterRef.current, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 1, ease: 'back.out(1.2)' }, 0.2);
      tl.fromTo(panelRightRef.current, { x: 100, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: 'power3.out' }, 0.4);

      tl.add(() => {
        [panelLeftRef.current, panelCenterRef.current, panelRightRef.current].forEach((panel, i) => {
          gsap.to(panel, { y: -10, duration: 3 + i * 0.5, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: i * 0.2 });
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full min-h-screen bg-black flex flex-col items-center justify-center pt-24 pb-32 overflow-hidden transform-gpu">
      <div ref={bgRef} className="absolute inset-0 z-0 bg-cover bg-center origin-center transition-all duration-[2000ms] ease-in-out will-change-transform" style={{ backgroundImage: `url('${HERO_IMAGES[currentImgIndex]}')`, filter: 'blur(10px) brightness(0.6)', transform: 'scale(1.05)' }}>
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-8 flex flex-col items-center justify-center text-center">
        <div ref={giantTextRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[14rem] md:text-[22rem] font-black text-white whitespace-nowrap pointer-events-none select-none tracking-tighter mix-blend-overlay" style={{ filter: 'blur(8px)' }}>
          100M+
        </div>

        <div ref={headingRef} className="mb-20 mt-2 relative z-20 w-full">
          <h2 className="text-4xl md:text-7xl lg:text-[5.5rem] font-bold text-white mb-6 tracking-tight uppercase leading-[1.1] flex flex-col items-center">
            <span className="block mb-2">Global Activation</span>
            <div className="relative h-[1.3em] overflow-hidden w-full max-w-[95vw] lg:max-w-[1400px]">
              <span key={wordIndex} className="absolute inset-0 flex items-center justify-center text-transparent bg-clip-text bg-gradient-to-r from-[#E5C27A] to-[#C8A96A] filter drop-shadow-[0_0_20px_rgba(200,169,106,0.3)] animate-slide-down-custom whitespace-nowrap text-3xl md:text-5xl lg:text-[4.5rem]">
                FOR {words[wordIndex]}
              </span>
            </div>
          </h2>
          <p className="text-lg md:text-2xl text-neutral-300 max-w-3xl mx-auto font-light tracking-wide drop-shadow-2xl px-4">
            Host world-class activations, high-impact takeovers, and global product launches at unmatched scale.
          </p>
        </div>

        {/* Integrated Platform Dock */}
        <div className="w-full max-w-6xl px-8 z-30 mt-8">
          <div className="bg-black/20 backdrop-blur-3xl border border-white/10 rounded-2xl md:rounded-full p-3 flex flex-col md:flex-row items-stretch gap-2 shadow-2xl">
            {[ 
              { title: 'GLOBAL SHOWCASES', meta: 'Scale: 50K+', desc: 'Concerts • Fashion Weeks • Festivals' },
              { title: 'BRAND ACTIVATIONS', meta: 'Dwell: +45%', desc: 'Interactive Takeovers • Campaigns' },
              { title: 'GLOBAL LAUNCHES', meta: 'Reach: 10M+', desc: 'Product Unveils • Digital Reach' }
            ].map((panel, idx) => (
              <div 
                key={idx}
                className="group relative flex-1 flex flex-col justify-center px-10 py-7 rounded-xl md:rounded-full transition-all duration-500 cursor-pointer hover:bg-white/[0.07] border border-transparent hover:border-white/20 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#C8A96A]/10 via-[#C8A96A]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="relative z-10 flex flex-col items-center text-center">
                  <h3 className="text-xs md:text-sm font-bold text-[#E5C27A] tracking-[0.2em] uppercase mb-1.5">{panel.title}</h3>
                  <div className="text-[10px] md:text-xs text-neutral-300 font-medium opacity-80 group-hover:opacity-100 transition-opacity">
                    {panel.desc}
                  </div>
                  <div className="mt-2 text-[10px] md:text-[11px] font-black text-[#C8A96A] tracking-widest group-hover:text-white transition-colors">
                    {panel.meta}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

/* ==========================================================================
   2. WHY BRANDS CHOOSE (NEW ROI STRIP)
   ========================================================================== */
const BrandValueStrip: React.FC = React.memo(() => {
  return (
    <section className="w-full bg-[#050505] py-16 px-12 border-y border-white/5">
      <div className="max-w-[1400px] mx-auto flex flex-wrap justify-between items-center gap-12">
        <div className="flex flex-col gap-2">
          <span className="text-4xl font-['Oswald'] text-white">100M+</span>
          <span className="text-[10px] text-[#C8A96A] font-bold uppercase tracking-widest">Annual Brand Exposure</span>
        </div>
        <div className="w-[1px] h-12 bg-white/10 hidden md:block"></div>
        <div className="flex flex-col gap-2">
          <span className="text-4xl font-['Oswald'] text-white">PREMIUM</span>
          <span className="text-[10px] text-[#C8A96A] font-bold uppercase tracking-widest">High-Net-Worth Audience</span>
        </div>
        <div className="w-[1px] h-12 bg-white/10 hidden md:block"></div>
        <div className="flex flex-col gap-2">
          <span className="text-4xl font-['Oswald'] text-white">3.5 HRS</span>
          <span className="text-[10px] text-[#C8A96A] font-bold uppercase tracking-widest">High Dwell Time Engagement</span>
        </div>
        <div className="w-[1px] h-12 bg-white/10 hidden md:block"></div>
        <div className="flex flex-col gap-2">
          <span className="text-4xl font-['Oswald'] text-white">GLOBAL</span>
          <span className="text-[10px] text-[#C8A96A] font-bold uppercase tracking-widest">Multi-Channel Visibility</span>
        </div>
      </div>
    </section>
  );
});

/* ==========================================================================
   3. EVENT INFRASTRUCTURE (REFINED)
   ========================================================================== */
const CapabilitiesSection: React.FC = React.memo(() => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 1024;
      
      if (!isMobile) {
        const tl = gsap.timeline({ scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' } });
        tl.fromTo(textRef.current, { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: 'power3.out' }, 0);
        tl.fromTo(visualRef.current, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out' }, 0.2);
      } else {
        gsap.set([textRef.current, visualRef.current], { opacity: 1, x: 0, scale: 1 });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="w-full bg-[#050505] py-20 md:py-40 px-6 md:px-8 overflow-hidden relative">
      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row-reverse gap-12 lg:gap-24 items-center">
        
        {/* Video First on Mobile (Moved in DOM) */}
        <div className="w-full lg:flex-1 relative h-[280px] md:h-[400px] lg:h-[550px] rounded-3xl overflow-hidden border border-[#C8A96A]/20 shadow-2xl group bg-neutral-900">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="absolute inset-0 w-full h-full object-cover brightness-90 saturate-[1.4] transition-transform duration-1000 group-hover:scale-105"
          >
            <source src="/events/event_video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
          <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 p-6 md:p-8 bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl">
             <div className="text-xl md:text-2xl font-['Oswald'] text-white uppercase mb-1 md:mb-2">Maximum Attention</div>
             <div className="text-xs md:text-sm text-neutral-300">Capture attention at scale in high-density zones.</div>
          </div>
        </div>

        {/* Text Second on Mobile */}
        <div className="w-full lg:flex-1 flex flex-col gap-6 md:gap-8">
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-[4rem] font-bold text-[#E5C27A] mb-6 md:mb-8 leading-[1.1] uppercase tracking-wide font-['Oswald']">
              Brand Activation Infrastructure
            </h2>
            <p className="text-lg md:text-xl text-neutral-300 font-light leading-relaxed">
              Host high-impact central atrium takeovers and global product unveils within a framework built for measurable engagement.
            </p>
          </div>
          <ul className="flex flex-col gap-4 md:gap-6 mt-2 md:mt-4">
            {[
              'End-to-end brand activation infrastructure',
              'High-impact central atrium takeovers',
              'Omnichannel visibility (Physical + Digital)',
              'Turn footfall into measurable brand engagement'
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-4 md:gap-5 text-base md:text-lg text-white font-medium tracking-wide">
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#C8A96A] rotate-45"></div> {item}
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
});

/* ==========================================================================
   4. PAST EVENT HIGHLIGHTS (NEW PROOF SECTION)
   ========================================================================== */
const EventHighlightsSection: React.FC = React.memo(() => {
  const highlights = [
    { title: 'Luxury Brand Showcase', zone: 'Fashion Avenue Atrium', impact: '85% Luxury Intent Audience', image: 'https://raw.githubusercontent.com/pratik-71/Liat-Ass/main/public/events/image%201.png' },
    { title: 'Global Tech Launch', zone: 'Central Atrium Zone', impact: '2.5M+ On-site Impressions', image: 'https://raw.githubusercontent.com/pratik-71/Liat-Ass/main/public/events/image%202.png' },
    { title: 'International Fashion Week', zone: 'Main Promenade', impact: '10M+ Global Social Reach', image: 'https://raw.githubusercontent.com/pratik-71/Liat-Ass/main/public/events/image%203.png' },
    { title: 'Cultural Mega-Event', zone: 'Waterfront Terrace', impact: '100K+ Peak Dwellers', image: 'https://raw.githubusercontent.com/pratik-71/Liat-Ass/main/public/events/image%204.png' }
  ];

  return (
    <section className="w-full bg-[#0A0A0A] py-40 px-8 border-t border-white/5">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-20 text-center">
          <h2 className="text-4xl lg:text-6xl font-bold text-white uppercase tracking-tighter font-['Oswald'] mb-4">Past Event <span className="text-[#C8A96A]">Highlights</span></h2>
          <p className="text-neutral-400 text-lg">Proven success across global brand activations and iconic showcases.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {highlights.map((item, i) => (
            <div key={i} className="group relative aspect-[3/4] overflow-hidden border border-white/5 hover:border-[#C8A96A]/60 transition-all duration-700">
              <img src={item.image} alt={item.title} className="absolute inset-0 w-full h-full object-cover grayscale-[40%] transition-transform duration-1000 group-hover:scale-110 group-hover:grayscale-0" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="text-[10px] text-[#C8A96A] font-bold uppercase tracking-widest mb-3">{item.zone}</div>
                <h4 className="text-xl font-bold text-white mb-4 uppercase font-['Oswald'] leading-tight">{item.title}</h4>
                <div className="h-[1px] w-0 bg-[#C8A96A] group-hover:w-full transition-all duration-700 mb-4"></div>
                <div className="text-[11px] text-neutral-400 uppercase tracking-widest">{item.impact}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

/* ==========================================================================
   5. CINEMATIC VIDEO (REFINED)
   ========================================================================== */
const CinematicVideoSection: React.FC = React.memo(() => {
  return (
    <section className="w-full h-[70vh] relative overflow-hidden flex items-center justify-center bg-black">
      <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover brightness-50 contrast-125 saturate-[1.4]">
        <source src="/events/event_video.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black"></div>
      <div className="relative z-10 text-center max-w-4xl px-8">
        <h2 className="text-3xl md:text-5xl font-['Oswald'] text-white uppercase tracking-widest leading-tight mb-8">
          Turn Footfall into <span className="text-[#C8A96A]">Measurable Brand Engagement</span>
        </h2>
        <div className="w-32 h-[1px] bg-[#C8A96A] mx-auto opacity-40"></div>
      </div>
    </section>
  );
});

/* ==========================================================================
   6. CTA SECTION (SHARPER)
   ========================================================================== */
const CTASection: React.FC = React.memo(() => {
  return (
    <section className="w-full bg-[#050505] py-40 px-8 flex flex-col items-center justify-center text-center">
      <h2 className="text-4xl md:text-7xl font-bold text-white mb-12 tracking-tight font-['Oswald'] uppercase leading-none">
        Start Your Event <span className="text-[#C8A96A]">Partnership.</span>
      </h2>
      <div className="flex flex-col md:flex-row gap-6">
        <button className="px-12 py-5 bg-[#C8A96A] text-black font-bold uppercase tracking-widest text-xs transition-all hover:bg-[#E5C27A] hover:scale-105">
          Book Event Space
        </button>
        <button className="px-12 py-5 bg-transparent border border-white/20 text-white font-bold uppercase tracking-widest text-xs transition-all hover:border-[#C8A96A] hover:text-[#C8A96A] hover:scale-105">
          Request Event Deck
        </button>
      </div>
    </section>
  );
});

/* ==========================================================================
   MAIN MODULE COMPONENT
   ========================================================================== */
const EventsPlatformModule: React.FC<EventsPlatformModuleProps> = ({ onBack }) => {
  return (
    <div className="w-full min-h-screen bg-black text-white font-['Inter'] overflow-x-hidden selection:bg-[#C8A96A] selection:text-black">
      <ModuleNavigation moduleName="Events & Platform" onBack={onBack} />
      <EventsHeroSection />
      <BrandValueStrip />
      <CapabilitiesSection />
      <EventHighlightsSection />
      <CinematicVideoSection />
      <CTASection />
      <style>{`
        @keyframes slide-down-custom {
          0% { transform: translateY(-100%); opacity: 0; filter: blur(15px); }
          12% { transform: translateY(0); opacity: 1; filter: blur(0); }
          88% { transform: translateY(0); opacity: 1; filter: blur(0); }
          100% { transform: translateY(100%); opacity: 0; filter: blur(15px); }
        }
        .animate-slide-down-custom { animation: slide-down-custom 2.5s cubic-bezier(0.2, 0.8, 0.2, 1) infinite; }
      `}</style>
    </div>
  );
};

export default EventsPlatformModule;
