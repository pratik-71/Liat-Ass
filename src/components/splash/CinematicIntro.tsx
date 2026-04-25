import { useEffect, useRef } from 'react'
import gsap from 'gsap'

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

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        if (videoRef.current) {
          // Phase 1: Visitor Metrics
          gsap.set([statsRef.current, topStatsGroupRef.current], { opacity: 0 })
          gsap.to([statsRef.current, topStatsGroupRef.current], { opacity: 1, duration: 0.5 })
          
          const counter = { val: 0 }
          gsap.to(counter, {
            val: 300000,
            duration: INTRO_TIMING.counterCountUp,
            ease: 'power2.out',
            onUpdate: () => {
              if (statsRef.current) {
                // Removed hyphens and made it cleaner/bolder
                statsRef.current.innerText = `${Math.floor(counter.val)}+ VISITS A DAY`
              }
            },
            onComplete: () => {
              gsap.to([statsRef.current, topStatsGroupRef.current], {
                opacity: 0,
                duration: INTRO_TIMING.counterFadeOut,
                delay: INTRO_TIMING.counterHold,
                onComplete: () => {
                  // Phase 2: Lifestyle & Destinations
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
    gsap.set([cornerTextsRef.current, dreamRef.current, brandsPhaseRef.current], { opacity: 0, scale: 0.95 })

    tl
      .to(logoRef.current, { scale: 1, opacity: 1, duration: 0.9, ease: 'power2.out' })
      .to(shadowRef.current, { opacity: 1, duration: 0.7, ease: 'power2.out' }, '-=0.6')
      .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4')
      .to({}, { duration: 0.65 })
      .to([subtitleRef.current, shadowRef.current], { opacity: 0, duration: 0.28, ease: 'power2.in' })
      .call(() => { videoRef.current?.play().catch(console.error) })
      .to(logoRef.current, { scale: 4.5, opacity: 0, duration: 0.95, ease: 'power3.in' })
      .to(overlayRef.current, { opacity: 0, duration: 0.4, ease: 'power2.inOut' }, '-=0.35')
      .to(videoRef.current, { opacity: 1, duration: 0.5 }, '-=0.4')

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
      scale: 4,
      opacity: 0,
      duration: 1.0,
      ease: 'power3.in'
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
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        backgroundColor: '#000',
        overflow: 'hidden'
      }}
    >
      <video
        ref={videoRef}
        src="https://raw.githubusercontent.com/pratik-71/Liat-Ass/main/public/start_video.mp4"
        style={{
          width: '100%', height: '100%',
          objectFit: window.innerWidth < 768 ? 'cover' : 'contain', 
          position: 'absolute', inset: 0,
          filter: 'saturate(1.25) contrast(1.15) brightness(1.05)'
        }}
        muted
        playsInline
      />

      {/* Intro Metrics */}
      <div
        ref={statsRef}
        style={{
          position: 'absolute', bottom: '10%', left: '50%',
          transform: 'translateX(-50%) scale(1, 1.4)',
          fontSize: 'clamp(30px, 4.5vw, 64px)',
          fontFamily: "'Oswald', sans-serif",
          fontWeight: 900,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          filter: 'drop-shadow(0 0 30px rgba(255, 215, 0, 0.6)) drop-shadow(0 8px 16px rgba(0,0,0,1))',
          background: 'linear-gradient(110deg, #e8d399 20%, #ffffff 50%, #e8d399 80%)',
          backgroundSize: '200% auto',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          animation: 'text-shimmer 2s infinite linear',
          opacity: 0, zIndex: 10, pointerEvents: 'none',
          whiteSpace: 'nowrap',
          width: 'max-content',
          willChange: 'transform, opacity'
        }}
      />

      {/* Top Stats Group Overlay (Phase 1) */}
      <div
        ref={topStatsGroupRef}
        style={{
          position: 'absolute',
          top: '6%',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: '24px',
          opacity: 0,
          zIndex: 10,
          pointerEvents: 'none',
          whiteSpace: 'nowrap'
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
          opacity: 0, zIndex: 15, pointerEvents: 'none'
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
          src="https://raw.githubusercontent.com/pratik-71/Liat-Ass/main/public/dubai_mall_start.png" 
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
          font-weight: 800;
          color: #FFFFFF;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          background: rgba(0, 0, 0, 0.55);
          backdrop-filter: blur(10px);
          padding: 8px 24px;
          border-radius: 50px;
          border: 1px solid rgba(179, 135, 40, 0.4);
          font-size: clamp(12px, 1.8vw, 18px);
        }
        .center-tag {
          font-family: 'Oswald', sans-serif;
          font-weight: 800;
          color: #FFFFFF;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(10px);
          padding: 10px 28px;
          border-radius: 50px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          font-size: clamp(14px, 2.2vw, 22px);
        }
        .brand-subtext {
          font-family: 'Oswald', sans-serif;
          color: #FFFFFF;
          font-size: clamp(16px, 2.2vw, 24px);
          text-align: center;
          max-width: 900px;
          line-height: 1.4;
          filter: drop-shadow(0 4px 15px rgba(0,0,0,0.9));
        }
        .brand-tag {
          position: absolute;
          bottom: 10%;
          font-family: 'Oswald', sans-serif;
          font-weight: 500;
          color: #FFFFFF;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          opacity: 0.9;
          font-size: clamp(10px, 1.2vw, 14px);
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
          font-size: clamp(12px, 1.8vw, 18px);
          font-family: 'Oswald', sans-serif;
          fontWeight: 800;
          color: #FFFFFF;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          background-color: rgba(0, 0, 0, 0.45);
          backdrop-filter: blur(8px);
          padding: 8px 20px;
          border-radius: 50px;
          border: 1px solid rgba(255, 255, 255, 0.15);
          filter: drop-shadow(0 4px 12px rgba(0,0,0,0.5));
          box-shadow: inset 0 0 10px rgba(255,255,255,0.1);
        }
      `}</style>
    </div>
  )
}

export default CinematicIntro;
