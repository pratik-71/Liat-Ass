import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { DESIGN_SYSTEM } from '../../constants'

export const INTRO_TIMING = {
  // Video overlay text timings (in seconds)
  counterCountUp: 0.8,
  counterHold: 0.8,
  counterFadeOut: 0.6,
  
  phaseTwoDelay: 1.5,
  phaseTwoFadeIn: 0.5,
  phaseTwoHold: 3.8,     // Increased by 2s to prevent early appearance
  phaseTwoFadeOut: 0.5,

  phaseThreeDelay: 0.5,  // Slightly more breathing room
  phaseThreeFadeIn: 0.2,
  phaseThreeHold: 1.2,   // Reduced by 1s for faster exit
  phaseThreeFadeOut: 0.5,
}

interface CinematicIntroProps {
  onComplete: () => void
}

const CinematicIntro: React.FC<CinematicIntroProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLImageElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const shadowRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const topStatsGroupRef = useRef<HTMLDivElement>(null)
  const cornerTextsRef = useRef<HTMLDivElement>(null)
  const dreamRef = useRef<HTMLDivElement>(null)
  const brandsPhaseRef = useRef<HTMLDivElement>(null)
  const brandsHeadlineRef = useRef<HTMLHeadingElement>(null)
  const brandsSubtextRef = useRef<HTMLParagraphElement>(null)
  const brandsTagRef = useRef<HTMLDivElement>(null)
  const letterboxTopRef = useRef<HTMLDivElement>(null)
  const letterboxBottomRef = useRef<HTMLDivElement>(null)
  const subliminalTextRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<HTMLDivElement>(null)
  const lightLeakRef = useRef<HTMLDivElement>(null)
  const flashRef = useRef<HTMLDivElement>(null)
  const introLogoRef = useRef<HTMLImageElement>(null)

  const [isBuffering, setIsBuffering] = useState(false)

  // Sync GSAP with Video Buffering
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleWaiting = () => {
      setIsBuffering(true)
      gsap.globalTimeline.pause()
    }

    const handlePlaying = () => {
      setIsBuffering(false)
      gsap.globalTimeline.resume()
    }

    video.addEventListener('waiting', handleWaiting)
    video.addEventListener('playing', handlePlaying)
    video.addEventListener('canplay', handlePlaying)
    video.addEventListener('seeked', handlePlaying)

    // Attempt to lock orientation to landscape on mobile
    const lockOrientation = async () => {
      try {
        if (typeof screen !== 'undefined' && screen.orientation && (screen.orientation as any).lock) {
          await (screen.orientation as any).lock('landscape').catch(() => {});
        }
      } catch (e) {}
    };
    lockOrientation();

    return () => {
      video.removeEventListener('waiting', handleWaiting)
      video.removeEventListener('playing', handlePlaying)
      video.removeEventListener('canplay', handlePlaying)
      video.removeEventListener('seeked', handlePlaying)
      gsap.globalTimeline.resume()
      
      // Unlock orientation when intro is done
      try {
        if (typeof screen !== 'undefined' && screen.orientation && (screen.orientation as any).unlock) {
          (screen.orientation as any).unlock();
        }
      } catch (e) {}
    }
  }, [])

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        if (videoRef.current) {
          // Phase 1: Visitor Metrics
          gsap.set([statsRef.current, topStatsGroupRef.current], { opacity: 0 })
          gsap.fromTo(statsRef.current, 
            { opacity: 0, y: 20, scale: 0.95, xPercent: -50 }, 
            { opacity: 1, y: 0, scale: 1, xPercent: -50, duration: 1.2, ease: 'expo.out' }
          )
          gsap.fromTo(topStatsGroupRef.current,
            { opacity: 0, y: -20, xPercent: -50 },
            { opacity: 1, y: 0, xPercent: -50, duration: 1.2, ease: 'expo.out' }
          )

          // Subliminal Text for Phase 1
          if (subliminalTextRef.current) {
            const h2 = subliminalTextRef.current.querySelector('h2');
            if (h2) {
              h2.innerText = 'BEYOND SCALE';
              gsap.fromTo(h2, { scale: 0.8, opacity: 0 }, { scale: 1.1, opacity: 0.12, duration: 6, ease: 'power1.out' });
            }
          }
          
          const counter = { val: 0 }
          gsap.to(counter, {
            val: 300000,
            duration: INTRO_TIMING.counterCountUp,
            ease: 'power2.out',
            onUpdate: () => {
              if (statsRef.current) {
                // Formatting with commas for better readability (300,000 instead of 300000)
                const val = Math.floor(counter.val);
                statsRef.current.innerText = val >= 300000 ? '3 LAKH+ VISITS A DAY' : `${val.toLocaleString()}+ VISITS A DAY`;
                
                // Dynamic Chromatic Aberration (Vibration effect during count-up)
                const shift = (counter.val / 300000) * 4;
                statsRef.current.style.textShadow = `
                  ${shift}px 0px 15px rgba(255, 255, 255, 0.3),
                  -${shift}px 0px 15px rgba(0, 0, 0, 0.5),
                  0 10px 40px rgba(0,0,0,0.8)
                `;
              }
            },
            onComplete: () => {
              gsap.to([statsRef.current, topStatsGroupRef.current], {
                opacity: 0,
                duration: INTRO_TIMING.counterFadeOut,
                delay: INTRO_TIMING.counterHold,
                onComplete: () => {
                  // Phase 2: Lifestyle & Destinations
                  // Cinematic Blur Transition
                  gsap.fromTo(videoRef.current, { filter: 'saturate(1.25) contrast(1.15) brightness(1.05) blur(0px)' }, { filter: 'saturate(1.25) contrast(1.15) brightness(1.05) blur(10px)', duration: 0.6, yoyo: true, repeat: 1 });
                  
                  if (subliminalTextRef.current) {
                    const h2 = subliminalTextRef.current.querySelector('h2');
                    if (h2) {
                      gsap.to(h2, { opacity: 0, duration: 0.5, onComplete: () => {
                        h2.innerText = 'EXTRAORDINARY';
                        gsap.to(h2, { opacity: 0.12, scale: 1.2, duration: 6, ease: 'power1.out' });
                      }});
                    }
                  }

                  gsap.to([cornerTextsRef.current, dreamRef.current], {
                    opacity: 1,
                    scale: 1,
                    duration: INTRO_TIMING.phaseTwoFadeIn,
                    delay: INTRO_TIMING.phaseTwoDelay,
                    ease: 'back.out(1.2)',
                    onComplete: () => {
                      gsap.to([cornerTextsRef.current, dreamRef.current], {
                        opacity: 0,
                        scale: 1.05,
                        duration: INTRO_TIMING.phaseTwoFadeOut,
                        delay: INTRO_TIMING.phaseTwoHold,
                        ease: 'power2.in',
                        onComplete: () => {
                          // Phase 3: Global Platform for Brands
                          // Final cinematic blur shift
                          gsap.fromTo(videoRef.current, { filter: 'saturate(1.25) contrast(1.15) brightness(1.05) blur(0px)' }, { filter: 'saturate(1.25) contrast(1.15) brightness(1.05) blur(20px)', duration: 0.8 });
                          
                          if (subliminalTextRef.current) {
                            const h2 = subliminalTextRef.current.querySelector('h2');
                            if (h2) {
                              gsap.to(h2, { opacity: 0, duration: 0.5, onComplete: () => {
                                h2.innerText = 'UNRIVALED';
                                gsap.to(h2, { opacity: 0.15, scale: 1.3, duration: 8, ease: 'power1.out' });
                              }});
                            }
                          }

                          gsap.to([brandsPhaseRef.current, brandsHeadlineRef.current, brandsSubtextRef.current, brandsTagRef.current], {
                            opacity: (_, t) => t === brandsTagRef.current ? 0.6 : 1,
                            duration: INTRO_TIMING.phaseThreeFadeIn,
                            delay: INTRO_TIMING.phaseThreeDelay,
                            ease: 'power2.out',
                            onComplete: () => {
                              gsap.delayedCall(INTRO_TIMING.phaseThreeHold, startZoom)
                            }
                          })
                        }
                      })
                    }
                  })
                }
              })
            }
          })
        } else {
          onComplete()
        }
      }
    })

    gsap.set(logoRef.current, { scale: 0.6, opacity: 0 })
    gsap.set(subtitleRef.current, { opacity: 0, y: 14 })
    gsap.set(shadowRef.current, { opacity: 0 })
    gsap.set(overlayRef.current, { opacity: 1 })
    gsap.set(videoRef.current, { opacity: 0 })
    gsap.set(introLogoRef.current, { opacity: 0, x: -20 })
    gsap.set([cornerTextsRef.current, dreamRef.current, brandsPhaseRef.current], { opacity: 0, scale: 0.95 })

    tl
      .to(logoRef.current, { scale: 1, opacity: 1, duration: 0.9, ease: 'power2.out' })
      .to(shadowRef.current, { opacity: 1, duration: 0.7, ease: 'power2.out' }, '-=0.6')
      .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4')
      .to({}, { duration: 0.65 })
      .to([subtitleRef.current, shadowRef.current], { opacity: 0, duration: 0.28, ease: 'power2.in' })
      .call(() => { 
        videoRef.current?.play().catch(console.error)
        // Cinematic Zoom Start
        gsap.to(videoRef.current, { scale: 1.15, duration: 25, ease: 'none' })
        
        // Fade in Intro Logo
        gsap.to(introLogoRef.current, { opacity: 1, x: 0, duration: 1.2, ease: 'power2.out', delay: 0.5 })
        
        
        // Ambient Light Leak Animation
        gsap.to(lightLeakRef.current, { 
          opacity: 0.4, 
          x: '20%', 
          y: '10%', 
          duration: 10, 
          repeat: -1, 
          yoyo: true, 
          ease: 'sine.inOut' 
        })

        // Animate Cinematic Bars
        gsap.to(letterboxTopRef.current, { height: '8vh', duration: 1.5, ease: 'power2.inOut' })
        gsap.to(letterboxBottomRef.current, { height: '8vh', duration: 1.5, ease: 'power2.inOut' })
        // Subliminal Text Entry
        gsap.fromTo(subliminalTextRef.current, { opacity: 0, scale: 0.8 }, { opacity: 0.15, scale: 1, duration: 4, ease: 'power1.out' })
      })
      .to(logoRef.current, { scale: 8, opacity: 0, duration: 1.2, ease: 'power4.in' })
      .to(overlayRef.current, { opacity: 0, duration: 0.6, ease: 'power2.inOut' }, '-=0.8')
      .to(videoRef.current, { opacity: 1, duration: 0.6 }, '-=0.6')

    return () => { tl.kill() }
  }, [onComplete])

  const isZooming = useRef(false)

  const startZoom = () => {
    if (isZooming.current) return
    isZooming.current = true

    const tl = gsap.timeline({
      onComplete: onComplete
    })

    tl.to(brandsPhaseRef.current, {
      scale: 3,
      opacity: 0,
      duration: 1.4,
      ease: 'power2.in',
      force3D: true
    }, 0)

    // Fade out Intro Logo instead of zooming it
    tl.to(introLogoRef.current, {
      opacity: 0,
      duration: 0.6,
      ease: 'power2.in'
    }, 0)

    // Video fades out with the final zoom
    tl.to(videoRef.current, {
      opacity: 0,
      duration: 0.8,
      ease: 'power2.inOut'
    }, 0.2)

    tl.to(containerRef.current, {
      opacity: 0,
      duration: 1.0,
      ease: 'power2.inOut'
    }, '-=0.6')
  }

  return (
    <div
      ref={containerRef}
      className={`cinematic-container ${isBuffering ? 'is-buffering' : ''}`}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        backgroundColor: '#000',
        overflow: 'hidden'
      }}
    >
      <video
        ref={videoRef}
        src={DESIGN_SYSTEM.assets.videoIntro}
        style={{
          width: '100%', height: '100%',
          objectFit: window.innerWidth < 768 ? 'cover' : 'contain', 
          position: 'absolute', inset: 0,
          filter: 'saturate(1.25) contrast(1.15) brightness(1.05)'
        }}
        muted
        playsInline
      />

      {/* Intro Logo (Top Left) */}
      <img 
        ref={introLogoRef}
        src="/intro_logo.png"
        style={{
          position: 'absolute',
          top: 'clamp(20px, 4vw, 40px)',
          left: 'clamp(20px, 4vw, 40px)',
          height: 'clamp(40px, 6vw, 80px)',
          zIndex: 110,
          pointerEvents: 'none',
          opacity: 0,
          filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.5))'
        }}
      />

      {/* Cinematic Overlays */}
      <div ref={letterboxTopRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '0vh', backgroundColor: '#000', zIndex: 100 }} />
      <div ref={letterboxBottomRef} style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '0vh', backgroundColor: '#000', zIndex: 100 }} />
      
      <div ref={subliminalTextRef} style={{ 
        position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 2, pointerEvents: 'none', opacity: 0, mixBlendMode: 'overlay'
      }}>
        <h2 
          className="subliminal-h2"
          style={{ 
          fontSize: 'clamp(80px, 25vw, 400px)', fontWeight: 900, color: '#fff', letterSpacing: '-0.05em', margin: 0,
          fontFamily: "'Oswald', sans-serif", textTransform: 'uppercase', whiteSpace: 'nowrap'
        }}>
          MAGNIFICENT
        </h2>
      </div>

      <div ref={particlesRef} className="grain-overlay" style={{ position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none' }} />

      {/* Atmospheric Light Leak */}
      <div ref={lightLeakRef} style={{ 
        position: 'absolute', inset: '-20%', zIndex: 4, pointerEvents: 'none', opacity: 0,
        background: 'radial-gradient(circle at 20% 30%, rgba(200, 169, 106, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)',
        filter: 'blur(60px)', mixBlendMode: 'screen'
      }} />

      {/* Transition Flash */}
      <div ref={flashRef} style={{ position: 'absolute', inset: 0, backgroundColor: '#fff', zIndex: 1000, opacity: 0, pointerEvents: 'none' }} />

      {/* Dynamic bottom vignette for text readability */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 40%)',
        pointerEvents: 'none', zIndex: 5,
        opacity: 0.8
      }} />

      

      {/* Intro Metrics */}
      <div
        ref={statsRef}
        className="stats-metric"
        style={{
          position: 'absolute', bottom: '15%', left: '50%',
          transform: 'translateX(-50%)',
          fontSize: 'clamp(28px, 5vw, 72px)',
          fontFamily: "'Oswald', sans-serif",
          fontWeight: 900,
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          filter: 'drop-shadow(0 15px 35px rgba(0,0,0,0.9))',
          color: '#FFFFFF',
          textShadow: '0 10px 50px rgba(0,0,0,0.9), 0 0 30px rgba(255,255,255,0.2)',
          WebkitTextFillColor: '#FFFFFF',
          zIndex: 10, pointerEvents: 'none',
          whiteSpace: 'normal',
          width: '90%',
          willChange: 'transform, opacity',
          opacity: 0,
          textAlign: 'center',
          lineHeight: 1.1
        }}
      />

      {/* Top Stats Group Overlay (Phase 1) */}
      <div
        ref={topStatsGroupRef}
        className="top-stats-group"
        style={{
          position: 'absolute',
          top: '14%',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 'clamp(12px, 2vw, 24px)',
          opacity: 0,
          zIndex: 10,
          pointerEvents: 'none'
        }}
      >
        <div className="top-stat-pill">12 million sq ft Area</div>
        <div className="top-stat-pill">VISITORS FROM 190+ COUNTRIES</div>
      </div>

      {/* Lifestyle Phase */}
      <div
        ref={cornerTextsRef}
        style={{
          position: 'absolute', inset: 0,
          pointerEvents: 'none', zIndex: 10, opacity: 0
        }}
      >
        <div className="corner-tag tl" style={{ position: 'absolute', top: '6%', left: '4%' }}>Biggest Aquarium</div>
        <div className="corner-tag tr" style={{ position: 'absolute', top: '6%', right: '4%' }}>Mesmerizing Chinatown</div>
        <div className="corner-tag bl" style={{ position: 'absolute', bottom: '15%', left: '4%' }}>Ice Rink</div>
        <div className="corner-tag br" style={{ position: 'absolute', bottom: '15%', right: '4%' }}>VR Park</div>
      </div>

      <div
        ref={dreamRef}
        style={{
          position: 'absolute', top: '6%', left: '50%', transform: 'translateX(-50%)',
          opacity: 0, zIndex: 10, pointerEvents: 'none'
        }}
      >
        <div className="center-tag">More than dream</div>
      </div>

      {/* Brand Platform Phase */}
      <div
        ref={brandsPhaseRef}
        style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.6) 100%)',
          opacity: 0, zIndex: 15, pointerEvents: 'none',
          willChange: 'transform, opacity',
          backfaceVisibility: 'hidden'
        }}
      >
        <h1
          ref={brandsHeadlineRef}
          style={{
            fontSize: 'clamp(24px, 6vw, 64px)', // Fluid scaling
            fontFamily: "'Oswald', sans-serif",
            fontWeight: 800,
            textAlign: 'center',
            margin: '0 0 16px 0',
            padding: '0 20px',
            lineHeight: 1.1,
            filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.8))',
            background: 'linear-gradient(110deg, #E5C27A 40%, #FFF5D6 50%, #C8A96A 60%)',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'text-shimmer 4s infinite linear'
          }}
        >
          A GLOBAL PLATFORM <br /> FOR BRANDS
        </h1>
        
        <p ref={brandsSubtextRef} className="brand-subtext" style={{ padding: '0 30px' }}>
          Host activations, launches, and large-scale events that connect with millions.
        </p>

        <div ref={brandsTagRef} className="brand-tag" style={{ bottom: '5%' }}>
          GLOBAL EVENTS • BRAND ACTIVATIONS • LIVE EXPERIENCES
        </div>
      </div>

      <div
        ref={overlayRef}
        style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 110% 90% at 50% 42%, #f2f6fa 0%, #dce8f0 55%, #c8d8e8 100%)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          gap: '22px', overflow: 'hidden', pointerEvents: 'none',
        }}
      >
        <img 
          ref={logoRef} 
          src="/dubai_mall_start.webp" 
          style={{ maxWidth: '780px', width: '85vw' }} 
          // @ts-ignore
          fetchPriority="high"
        />
        <div ref={shadowRef} className="logo-shadow" />
        <p ref={subtitleRef} className="intro-subtitle">
          <span>Experience the Unimagined In Worlds Largest Mall</span>
        </p>
      </div>

      <style>{`
        @keyframes text-shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .corner-tag {
          font-family: 'Oswald', sans-serif;
          font-weight: 700;
          color: #FFFFFF;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(12px);
          padding: 10px 24px;
          border-radius: 4px;
          border: 1px solid rgba(229, 194, 122, 0.3);
          font-size: clamp(11px, 1.6vw, 16px);
          text-shadow: 0 2px 10px rgba(0,0,0,0.5);
          box-shadow: 0 10px 30px rgba(0,0,0,0.4);
          position: relative;
          overflow: hidden;
        }
        .center-tag {
          font-family: 'Oswald', sans-serif;
          font-weight: 700;
          color: #FFFFFF;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(15px);
          padding: 12px 32px;
          border-radius: 4px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          font-size: clamp(14px, 2.2vw, 22px);
          text-shadow: 0 2px 15px rgba(0,0,0,0.6);
          box-shadow: 0 20px 40px rgba(0,0,0,0.5);
          position: relative;
          overflow: hidden;
        }
        .brand-subtext {
          font-family: 'Oswald', sans-serif;
          color: #FFFFFF;
          font-size: clamp(16px, 2.2vw, 26px);
          text-align: center;
          max-width: 900px;
          line-height: 1.4;
          font-weight: 400;
          filter: drop-shadow(0 10px 25px rgba(0,0,0,0.9));
          text-shadow: 0 4px 20px rgba(0,0,0,0.6);
        }
        .brand-tag {
          position: absolute;
          bottom: 10%;
          font-family: 'Oswald', sans-serif;
          font-weight: 600;
          color: #FFFFFF;
          letter-spacing: 0.45em;
          text-transform: uppercase;
          opacity: 0.95;
          font-size: clamp(10px, 1.2vw, 15px);
          text-shadow: 0 2px 10px rgba(0,0,0,0.8);
        }
        .intro-subtitle {
          color: #3a5068;
          font-family: 'Oswald', sans-serif;
          font-weight: 700;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          font-size: clamp(18px, 2.5vw, 28px);
        }
        .top-stat-pill {
          font-size: clamp(10px, 1.2vw, 14px);
          font-family: 'Oswald', sans-serif;
          font-weight: 700;
          color: #FFFFFF;
          text-transform: uppercase;
          letter-spacing: 0.25em;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(20px);
          padding: 12px 28px;
          border-radius: 4px;
          border: 1px solid rgba(229, 194, 122, 0.4);
          box-shadow: 0 15px 35px rgba(0,0,0,0.6), inset 0 0 15px rgba(229, 194, 122, 0.1);
          text-shadow: 0 2px 10px rgba(0,0,0,0.5);
          transition: all 0.5s ease;
          position: relative;
          overflow: hidden;
        }
        .top-stat-pill::after, .corner-tag::after, .center-tag::after {
          content: '';
          position: absolute;
          top: 0; left: -150%;
          width: 50%; height: 100%;
          background: linear-gradient(to right, transparent, rgba(255,255,255,0.4), transparent);
          transform: skewX(-25deg);
          animation: shimmer-sweep 6s infinite;
        }
        @keyframes shimmer-sweep {
          0% { left: -150%; }
          50% { left: 250%; }
          100% { left: 250%; }
        }
        .is-buffering * {
          animation-play-state: paused !important;
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
        .grain-overlay {
          /* Inline SVG noise — no external network request, identical look */
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E");
          opacity: 0.04;
          mix-blend-mode: overlay;
          animation: grain 8s steps(10) infinite;
        }
        @keyframes grain {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-5%, -10%); }
          30% { transform: translate(3%, -15%); }
          50% { transform: translate(12%, 9%); }
          70% { transform: translate(-10%, 10%); }
          90% { transform: translate(15%, 8%); }
        }

        /* Mobile Optimization & Auto-Landscape Fallback */
        @media (max-width: 768px) {
          .top-stats-group {
            flex-direction: column !important;
            top: 12% !important;
            gap: 6px !important;
            transform: translateX(-50%) scale(0.75) !important;
            width: 100% !important;
          }
          .subliminal-h2 {
            font-size: clamp(40px, 12vh, 120px) !important;
            opacity: 0.05 !important;
          }
          .stats-metric {
            font-size: clamp(16px, 4vh, 28px) !important;
            bottom: 25% !important;
            letter-spacing: 0.05em !important;
          }
          .corner-tag {
            padding: 4px 8px !important;
            font-size: 8px !important;
            letter-spacing: 0.1em !important;
          }
          .corner-tag.tl { top: 8% !important; left: 2% !important; }
          .corner-tag.tr { top: 8% !important; right: 2% !important; }
          .corner-tag.bl { bottom: 12% !important; left: 2% !important; }
          .corner-tag.br { bottom: 12% !important; right: 2% !important; }
          
          .center-tag {
            padding: 6px 14px !important;
            font-size: 10px !important;
            top: 6% !important;
          }
          
          .brand-tag {
            letter-spacing: 0.15em !important;
            font-size: 8px !important;
            width: 95% !important;
            bottom: 8% !important;
            text-align: center !important;
          }

          .brand-subtext {
            font-size: 16px !important;
            line-height: 1.3 !important;
            padding: 0 15px !important;
          }
        }

        /* Force Landscape Rotation for Portrait Users */
        @media (max-width: 900px) and (orientation: portrait) {
          .cinematic-container {
            transform: rotate(90deg);
            transform-origin: center;
            width: 100vh !important;
            height: 100vw !important;
            position: fixed;
            top: 50% !important;
            left: 50% !important;
            margin-top: -50vw !important;
            margin-left: -50vh !important;
          }
          .cinematic-container video {
            object-fit: cover !important;
          }
        }
      `}</style>

    </div>
  )
}

export default CinematicIntro;
