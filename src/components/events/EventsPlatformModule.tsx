import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
gsap.config({ force3D: true });
gsap.defaults({ overwrite: 'auto' });

interface EventsPlatformModuleProps {
  onBack: () => void;
}

/* ==========================================================================
   1. HERO SECTION
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
    '/events/image 1.png',
    '/events/image 2.png',
    '/events/image 3.png',
    '/events/image 4.png',
    '/events/image 5.png'
  ];

  const words = ['Brands', 'Businesses', 'Events', 'Launches'];

  useEffect(() => {
    const imgTimer = setInterval(() => {
      setCurrentImgIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 4000);

    const wordTimer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2500);

    // Preload next image to prevent flicker
    const nextIndex = (currentImgIndex + 1) % HERO_IMAGES.length;
    const img = new Image();
    img.src = HERO_IMAGES[nextIndex];

    return () => {
      clearInterval(imgTimer);
      clearInterval(wordTimer);
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Background Zoom Animation
      gsap.fromTo(bgRef.current, 
        { scale: 1, opacity: 0 },
        { 
          scale: 1.05, 
          opacity: 1, 
          duration: 1.5, 
          ease: 'power2.out',
        }
      );

      // Continuous slow zoom
      gsap.to(bgRef.current, {
        scale: 1.12,
        duration: 20,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      // 2. Giant Text
      gsap.fromTo(giantTextRef.current,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 0.08,
          scale: 1,
          duration: 2,
          ease: 'power2.out',
        }
      );

      // 3. Heading Reveal
      gsap.fromTo(headingRef.current,
        { scale: 0.9, opacity: 0, y: 30 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'expo.out',
        }
      );

      // 4. Panel Entry Animations
      const tl = gsap.timeline({ delay: 0.5 });
      tl.fromTo(panelLeftRef.current, { x: -100, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: 'power3.out' }, 0);
      tl.fromTo(panelCenterRef.current, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 1, ease: 'back.out(1.2)' }, 0.2);
      tl.fromTo(panelRightRef.current, { x: 100, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: 'power3.out' }, 0.4);

      // 5. Continuous Floating
      tl.add(() => {
        [panelLeftRef.current, panelCenterRef.current, panelRightRef.current].forEach((panel, i) => {
          gsap.to(panel, {
            y: -10, duration: 3 + i * 0.5, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: i * 0.2
          });
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full min-h-screen bg-black flex flex-col items-center justify-center pt-24 pb-32 overflow-hidden transform-gpu">
      {/* Background with Carousel Transition */}
      <div 
        ref={bgRef}
        className="absolute inset-0 z-0 bg-cover bg-center origin-center transition-all duration-[2000ms] ease-in-out will-change-transform"
        style={{ 
          backgroundImage: `url('${HERO_IMAGES[currentImgIndex]}')`,
          filter: 'blur(10px) brightness(0.6)', 
          transform: 'scale(1.05)' 
        }} 
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-8 flex flex-col items-center justify-center text-center">
        {/* Subliminal Giant Text */}
        <div ref={giantTextRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[14rem] md:text-[22rem] font-black text-white whitespace-nowrap pointer-events-none select-none tracking-tighter mix-blend-overlay" style={{ filter: 'blur(8px)' }}>
          100M+
        </div>

        {/* Headline */}
        <div ref={headingRef} className="mb-20 mt-2 relative z-20">
          <h2 className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold text-white mb-6 tracking-tight uppercase leading-[1.1] drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)] flex flex-col items-center">
            <span className="block mb-2">A Global Platform</span>
            <div className="relative h-[1.2em] overflow-hidden w-full max-w-[1000px]">
              <span 
                key={wordIndex}
                className="absolute inset-0 flex items-center justify-center text-transparent bg-clip-text bg-gradient-to-r from-[#E5C27A] to-[#C8A96A] filter drop-shadow-[0_0_20px_rgba(200,169,106,0.3)] animate-slide-down-custom"
              >
                FOR {words[wordIndex]}
              </span>
            </div>
          </h2>
          <p className="text-xl md:text-2xl text-neutral-300 max-w-3xl mx-auto font-light tracking-wide drop-shadow-2xl">
            Host world-class events, launches, and activations at unmatched scale.
          </p>
        </div>

        {/* Floating Panels */}
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12 w-full justify-center items-stretch relative z-20">
          {[ 
            { ref: panelLeftRef, title: 'GLOBAL EVENTS', desc: 'Concerts • Fashion Shows • Cultural Events' },
            { ref: panelCenterRef, title: 'BRAND ACTIVATIONS', desc: 'Interactive Installations • Immersive Campaigns' },
            { ref: panelRightRef, title: 'GLOBAL LAUNCHES', desc: 'Product Unveilings • Massive Global Visibility' }
          ].map((panel, idx) => (
            <div key={idx} ref={panel.ref} className="group relative p-12 rounded-3xl bg-black/60 backdrop-blur-[20px] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:border-[#C8A96A]/60 hover:shadow-[0_0_60px_rgba(200,169,106,0.2)] transition-all duration-500 ease-out hover:bg-black/80 flex flex-col justify-center min-h-[260px] flex-1 max-w-[420px] hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-[#C8A96A]/0 via-[#C8A96A]/0 to-[#C8A96A]/0 group-hover:from-[#C8A96A]/10 group-hover:to-transparent transition-all duration-500 rounded-3xl"></div>
              <h3 className="relative z-10 text-2xl font-bold text-[#E5C27A] mb-5 tracking-widest drop-shadow-md transition-colors">{panel.title}</h3>
              <p className="relative z-10 text-neutral-300 group-hover:text-[#C8A96A] text-base font-medium tracking-wider uppercase leading-relaxed opacity-90 group-hover:opacity-100 transition-all">
                {panel.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});


/* ==========================================================================
   2. EVENT CAPABILITIES (Split Layout)
   ========================================================================== */
const CapabilitiesSection: React.FC = React.memo(() => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        }
      });

      tl.fromTo(textRef.current, 
        { x: -50, opacity: 0 }, 
        { x: 0, opacity: 1, duration: 1, ease: 'power3.out' }, 0
      );
      
      tl.fromTo(visualRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out' }, 0.2
      );

      gsap.to(bgImageRef.current, {
        scale: 1.1,
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
    <section ref={sectionRef} className="w-full bg-[#050505] py-32 px-8 overflow-hidden relative">
      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-20 items-center">
        {/* Left: Text 40% */}
        <div ref={textRef} className="flex-1 lg:max-w-[40%] flex flex-col gap-8">
          <div>
            <h2 className="text-4xl lg:text-[3.5rem] font-bold text-[#E5C27A] mb-6 leading-[1.1] uppercase tracking-wide font-['Oswald'] drop-shadow-[0_5px_15px_rgba(0,0,0,0.4)]">
              World-Class Event Infrastructure
            </h2>
            <p className="text-xl text-neutral-300 font-light leading-relaxed drop-shadow-md">
              From large-scale productions to high-impact brand moments, the platform is built to host events at global standards.
            </p>
          </div>
          
          <ul className="flex flex-col gap-5 mt-4">
            {[
              'Large atrium event spaces',
              'Built-in high-capacity footfall zones',
              'Integrated digital display networks',
              'Seamless brand visibility across the property'
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-4 text-lg text-white font-medium tracking-wide">
                <span className="text-[#C8A96A] text-2xl">•</span> {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Right: Visual 60% */}
        <div ref={visualRef} className="flex-[1.5] w-full relative aspect-[16/9] lg:aspect-auto lg:h-[600px] rounded-2xl overflow-hidden border border-[#C8A96A]/20 shadow-2xl">
          <div className="absolute inset-0 bg-black/30 z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent z-20 opacity-60"></div>
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="absolute inset-0 w-full h-full object-cover origin-center brightness-90 contrast-110"
          >
            <source src="/events/event_video.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  );
});


/* ==========================================================================
   3. REAL ACTIVATION EXPERIENCE
   ========================================================================== */
const ActivationSection: React.FC = React.memo(() => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const blocksRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.activation-title', 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, y: 0, duration: 1, ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
        }
      );

      blocksRef.current.forEach((block, i) => {
        if (!block) return;
        gsap.fromTo(block,
          { opacity: 0, y: 50 },
          {
            opacity: 1, y: 0, duration: 1, ease: 'power3.out',
            scrollTrigger: {
              trigger: block,
              start: 'top 85%',
            },
            delay: i * 0.2
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-[#0A0A0A] py-32 px-8 border-y border-[#C8A96A]/10">
      <div className="max-w-[1400px] mx-auto flex flex-col items-center">
        <h2 className="activation-title text-3xl lg:text-5xl font-bold text-white mb-20 text-center uppercase tracking-widest font-['Oswald']">
          Designed for High-Impact <span className="text-[#C8A96A]">Brand Activations</span>
        </h2>

        <div className="w-full flex flex-col gap-6">
          {[
            { title: 'IMMERSIVE INSTALLATIONS', desc: 'Interactive experiences that drive engagement and attention' },
            { title: 'PRODUCT LAUNCHES', desc: 'Launch in front of millions with unmatched visibility' },
            { title: 'EXPERIENCE-DRIVEN MARKETING', desc: 'Turn physical presence into memorable brand moments' }
          ].map((item, i) => (
            <div 
              key={i}
              ref={el => { blocksRef.current[i] = el; }}
              className="group relative w-full p-8 md:p-12 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/5 hover:border-[#C8A96A]/60 transition-all duration-500 hover:bg-black/80 flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12 hover:-translate-y-2 shadow-2xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#C8A96A]/0 via-[#C8A96A]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              <div className="md:w-1/3 flex-shrink-0">
                <h3 className="text-xl md:text-2xl font-bold text-[#E5C27A] tracking-widest uppercase font-['Oswald']">
                  {item.title}
                </h3>
              </div>
              <div className="md:w-2/3">
                <p className="text-lg md:text-xl text-neutral-300 font-light tracking-wide">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});


/* ==========================================================================
   4. SCALE & REACH (Numbers Count Up)
   ========================================================================== */
const ScaleSection: React.FC = React.memo(() => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal Text
      gsap.fromTo('.scale-text', 
        { opacity: 0, y: 20 },
        { 
          opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
        }
      );

      // Number Count Up
      const numTargets = [
        { el: '#stat-num-1', target: 100, suffix: 'M+' },
        { el: '#stat-num-2', target: 200, suffix: '+' },
        { el: '#stat-num-3', target: 50, suffix: 'M+' }
      ];

      numTargets.forEach((item) => {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: item.target,
          duration: 2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%'
          },
          onUpdate: () => {
            const el = document.querySelector(item.el);
            if (el) el.innerHTML = `${Math.floor(obj.val)}${item.suffix}`;
          }
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-[#050505] py-32 px-8 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[400px] bg-[#C8A96A]/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-[1200px] mx-auto flex flex-col items-center text-center relative z-10">
        <h2 className="scale-text text-4xl lg:text-6xl font-bold text-white mb-8 tracking-widest uppercase font-['Oswald']">
          Built for <span className="text-[#C8A96A]">Global Reach</span>
        </h2>
        <p className="scale-text text-xl text-neutral-400 font-light max-w-2xl mb-24">
          Connect with one of the most diverse and high-value audiences in the world.
        </p>

        <div className="w-full flex flex-col md:flex-row justify-between gap-16 md:gap-8">
          <div className="scale-text flex flex-col items-center flex-1">
            <div id="stat-num-1" className="text-6xl md:text-8xl font-black text-[#E5C27A] mb-4 tracking-tighter">0</div>
            <div className="text-lg md:text-xl text-white font-medium tracking-widest uppercase">Annual Visitors</div>
          </div>
          <div className="scale-text flex flex-col items-center flex-1">
            <div id="stat-num-2" className="text-6xl md:text-8xl font-black text-[#E5C27A] mb-4 tracking-tighter">0</div>
            <div className="text-lg md:text-xl text-white font-medium tracking-widest uppercase">Global Nationalities</div>
          </div>
          <div className="scale-text flex flex-col items-center flex-1">
            <div id="stat-num-3" className="text-6xl md:text-8xl font-black text-[#E5C27A] mb-4 tracking-tighter">0</div>
            <div className="text-lg md:text-xl text-white font-medium tracking-widest uppercase">Daily Spending</div>
          </div>
        </div>
      </div>
    </section>
  );
});


/* ==========================================================================
   5. CINEMATIC SHOWCASE (VIDEO)
   ========================================================================== */
const CinematicVideoSection: React.FC = React.memo(() => {
  return (
    <section className="w-full h-[60vh] md:h-[80vh] relative overflow-hidden flex items-center justify-center bg-black border-y border-[#C8A96A]/20">
      <video 
        autoPlay 
        loop 
        muted 
        playsInline
        className="absolute inset-0 w-full h-full object-cover brightness-50 contrast-125 will-change-transform"
      >
        <source src="/events/event_video.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#0A0A0A]"></div>
      
      <div className="relative z-10 text-center px-8">
        <h2 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter opacity-20 pointer-events-none select-none mb-4">
          Experience Excellence
        </h2>
        <div className="w-20 h-[1px] bg-[#C8A96A] mx-auto opacity-40"></div>
      </div>
    </section>
  );
});

/* ==========================================================================
   6. CTA SECTION
   ========================================================================== */
const CTASection: React.FC = React.memo(() => {
  return (
    <section className="w-full bg-[#0A0A0A] py-32 px-8 flex flex-col items-center justify-center text-center relative">
      <h2 className="text-3xl md:text-5xl font-bold text-white mb-10 tracking-wide font-['Oswald'] uppercase">
        Host Your Next Global Event Here
      </h2>
      <button className="group relative px-8 py-4 rounded-full bg-transparent border border-[#C8A96A] text-[#C8A96A] font-semibold tracking-widest uppercase text-sm overflow-hidden transition-all duration-300 hover:text-black">
        <div className="absolute inset-0 bg-[#C8A96A] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
        <span className="relative z-10 flex items-center gap-3">
          Explore Event Opportunities <span className="group-hover:translate-x-1 transition-transform">→</span>
        </span>
      </button>
    </section>
  );
});


/* ==========================================================================
   MAIN MODULE COMPONENT
   ========================================================================== */
const EventsPlatformModule: React.FC<EventsPlatformModuleProps> = ({ onBack }) => {
  return (
    <div className="w-full min-h-screen bg-[#0A0A0A] text-white font-['Inter'] overflow-x-hidden selection:bg-[#C8A96A] selection:text-black">
      {/* GLOBAL NAV BAR */}
      <nav style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '24px 48px',
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 100%)',
        zIndex: 100,
      }}>
        <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#E5C27A' }}>
          The Dubai Mall &nbsp;·&nbsp; Events &amp; Platform
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

      {/* SECTIONS */}
      <EventsHeroSection />
      <CapabilitiesSection />
      <ActivationSection />
      <ScaleSection />
      <CinematicVideoSection />
      <CTASection />
      <style>{`
        @keyframes slow-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes slide-down-custom {
          0% { transform: translateY(-100%); opacity: 0; filter: blur(15px); }
          12% { transform: translateY(0); opacity: 1; filter: blur(0); }
          88% { transform: translateY(0); opacity: 1; filter: blur(0); }
          100% { transform: translateY(100%); opacity: 0; filter: blur(15px); }
        }
        .animate-slide-down-custom {
          animation: slide-down-custom 2.5s cubic-bezier(0.2, 0.8, 0.2, 1) infinite;
        }
      `}</style>
    </div>
  );
};

export default EventsPlatformModule;
