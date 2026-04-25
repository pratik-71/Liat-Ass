import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export const TIMING = {
  // Video overlay text timings (in seconds)
  counterCountUp: 0.8, // Faster counting as requested
  counterHold: 1.0, // Increased hold time to keep total phase time same
  counterFadeOut: 0.5,
  
  phaseTwoDelay: 1.5, // Shifted 1.0s earlier (from 2.5s)
  phaseTwoFadeIn: 0.5,
  phaseTwoHold: 3.2, // "keep them for 3.2 seconds"
  phaseTwoFadeOut: 0.5,

  phaseThreeDelay: 0.3, 
  phaseThreeFadeIn: 0.2, // "quckly fade in in0.2 seocnd"
  phaseThreeHold: 1.8, // "hold text for 1.8 seocnd"
  phaseThreeFadeOut: 0.5,
}

interface SplashScreenProps {
  onComplete: () => void
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
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
          // Fade in top stats while counting
          // Fade in top stats while counting
          gsap.set([statsRef.current, topStatsGroupRef.current], { opacity: 0 })
          gsap.to([statsRef.current, topStatsGroupRef.current], { opacity: 1, duration: 0.5 })
          
          const counter = { val: 0 }
          gsap.to(counter, {
            val: 300000,
            duration: TIMING.counterCountUp,
            ease: 'power2.out',
            onUpdate: () => {
              if (statsRef.current) {
                // Removed toLocaleString to keep numbers clean and consistent with Home screen
                statsRef.current.innerText = `- ${Math.floor(counter.val)}+ visits a day -`
              }
            },
            onComplete: () => {
              gsap.to([statsRef.current, topStatsGroupRef.current], {
                opacity: 0,
                duration: TIMING.counterFadeOut,
                delay: TIMING.counterHold,
                onComplete: () => {
                  // Phase 2: Corner texts and "More than dream"
                  gsap.to([cornerTextsRef.current, dreamRef.current], {
                    opacity: 1,
                    scale: 1,
                    duration: TIMING.phaseTwoFadeIn,
                    delay: TIMING.phaseTwoDelay,
                    ease: 'back.out(1.2)',
                    onComplete: () => {
                      gsap.to([cornerTextsRef.current, dreamRef.current], {
                        opacity: 0,
                        scale: 1.05,
                        duration: TIMING.phaseTwoFadeOut,
                        delay: TIMING.phaseTwoHold,
                        ease: 'power2.in',
                        onComplete: () => {
                          // Phase 3: Global Platform for Brands
                          // FADE OUT VIDEO HERE to let text be on pure black
                          gsap.to(videoRef.current, { opacity: 0, duration: 1, ease: 'power2.inOut' });

                          // Quickly fade in everything together
                          gsap.to([brandsPhaseRef.current, brandsHeadlineRef.current, brandsSubtextRef.current, brandsTagRef.current], {
                            opacity: (_, t) => t === brandsTagRef.current ? 0.6 : 1,
                            duration: TIMING.phaseThreeFadeIn,
                            delay: TIMING.phaseThreeDelay,
                            ease: 'power2.out',
                            onComplete: () => {
                              // Wait for the hold duration, then start the final zoom
                              gsap.delayedCall(TIMING.phaseThreeHold, startZoom)
                            }
                          })
                          // Subtle scale reset
                          gsap.set(brandsHeadlineRef.current, { scale: 1 })
                          gsap.set(brandsSubtextRef.current, { y: 0 })
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

    gsap.set(logoRef.current, { scale: 0.6, opacity: 0, willChange: 'transform, opacity' })
    gsap.set(subtitleRef.current, { opacity: 0, y: 14, willChange: 'transform, opacity' })
    gsap.set(shadowRef.current, { opacity: 0, willChange: 'opacity' })
    gsap.set(overlayRef.current, { opacity: 1 })
    gsap.set(videoRef.current, { opacity: 0 })
    gsap.set([cornerTextsRef.current, dreamRef.current, brandsPhaseRef.current], { opacity: 0, scale: 0.95 })

    tl
      // Logo fades + zooms in
      .to(logoRef.current, { scale: 1, opacity: 1, duration: 0.9, ease: 'power2.out' })
      // Shadow fades in with logo
      .to(shadowRef.current, { opacity: 1, duration: 0.7, ease: 'power2.out' }, '-=0.6')
      // Subtitle rises in
      .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4')
      // Hold
      .to({}, { duration: 0.65 })
      // Subtitle + shadow exit before zoom
      .to([subtitleRef.current, shadowRef.current], { opacity: 0, duration: 0.28, ease: 'power2.in' })
      // Start playing video right before the zoom punch to completely eliminate any gap
      .call(() => { videoRef.current?.play().catch(console.error) })
      // Netflix zoom punch
      .to(logoRef.current, { scale: 4.5, opacity: 0, duration: 0.95, ease: 'power3.in' })
      // Fade out overlay gradient to reveal video
      .to(overlayRef.current, { opacity: 0, duration: 0.4, ease: 'power2.inOut' }, '-=0.35')
      // Fade in video
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

    // Zoom in Phase 3 text (Netflix style)
    tl.to(brandsPhaseRef.current, {
      scale: 4,
      opacity: 0,
      duration: 1.0,
      ease: 'power3.in'
    }, 0)

    // Video is already gone by this phase

    // Fade out the entire container
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
      {/* Video Element */}
      <video
        ref={videoRef}
        src="https://raw.githubusercontent.com/pratik-71/Liat-Ass/main/public/start_video.mp4"
        style={{
          width: '100%', height: '100%',
          objectFit: 'contain', position: 'absolute', inset: 0,
          filter: 'saturate(1.25) contrast(1.15) brightness(1.05)', // Cinematic enhancement
          willChange: 'transform, opacity',
          transformOrigin: 'center center'
        }}
        onEnded={() => { /* Wait for text to finish */ }}
        muted
        playsInline
      />

      {/* Stats Counter Overlay */}
      <div
        ref={statsRef}
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '50%',
          transform: 'translateX(-50%) scale(1, 1.4)', // stretches vertically
          fontSize: 'clamp(36px, 5vw, 64px)',
          fontFamily: "'Oswald', 'Impact', 'Arial Narrow', sans-serif",
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.8))',
          background: 'linear-gradient(110deg, #e8d399 30%, #fcf6ba 50%, #e8d399 70%)',
          backgroundSize: '200% auto',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          animation: 'text-shimmer 3s infinite linear',
          lineHeight: 1.4,
          padding: '0.2em 0',
          opacity: 0,
          zIndex: 10,
          pointerEvents: 'none',
          whiteSpace: 'nowrap'
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
        <div style={{
          fontSize: 'clamp(12px, 1.8vw, 18px)',
          fontFamily: "'Oswald', sans-serif",
          fontWeight: 800,
          color: '#FFFFFF',
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          backgroundColor: 'rgba(0, 0, 0, 0.45)',
          backdropFilter: 'blur(8px)',
          padding: '8px 20px',
          borderRadius: '50px',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.5))',
          boxShadow: 'inset 0 0 10px rgba(255,255,255,0.1)'
        }}>
          12 million sq ft Area
        </div>

        <div style={{
          fontSize: 'clamp(12px, 1.8vw, 18px)',
          fontFamily: "'Oswald', sans-serif",
          fontWeight: 800,
          color: '#FFFFFF',
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          backgroundColor: 'rgba(0, 0, 0, 0.45)',
          backdropFilter: 'blur(8px)',
          padding: '8px 20px',
          borderRadius: '50px',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.5))',
          boxShadow: 'inset 0 0 10px rgba(255,255,255,0.1)'
        }}>
          VISITORS FROM 190+ COUNTRIES
        </div>
      </div>

      {/* Phase 2: Corner Texts Overlay */}
      <div
        ref={cornerTextsRef}
        style={{
          position: 'absolute', inset: 0,
          pointerEvents: 'none', zIndex: 10, opacity: 0
        }}
      >
        {/* Top Left */}
        <div style={{
          position: 'absolute', top: '6%', left: '4%',
          fontSize: 'clamp(12px, 1.8vw, 18px)',
          fontFamily: "'Oswald', sans-serif", fontWeight: 800,
          color: '#FFFFFF', textTransform: 'uppercase', letterSpacing: '0.15em',
          backgroundColor: 'rgba(0, 0, 0, 0.55)', backdropFilter: 'blur(10px)',
          padding: '8px 24px', borderRadius: '50px',
          border: '1px solid rgba(179, 135, 40, 0.4)',
          boxShadow: '0 4px 15px rgba(0,0,0,0.4), inset 0 0 10px rgba(179, 135, 40, 0.1)',
          filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.3))'
        }}>
          Biggest Aquarium
        </div>
        {/* Top Right */}
        <div style={{
          position: 'absolute', top: '6%', right: '4%',
          fontSize: 'clamp(12px, 1.8vw, 18px)',
          fontFamily: "'Oswald', sans-serif", fontWeight: 800,
          color: '#FFFFFF', textTransform: 'uppercase', letterSpacing: '0.15em',
          backgroundColor: 'rgba(0, 0, 0, 0.55)', backdropFilter: 'blur(10px)',
          padding: '8px 24px', borderRadius: '50px',
          border: '1px solid rgba(179, 135, 40, 0.4)',
          boxShadow: '0 4px 15px rgba(0,0,0,0.4), inset 0 0 10px rgba(179, 135, 40, 0.1)',
          filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.3))'
        }}>
          Mesmerizing Chinatown
        </div>
        {/* Bottom Left */}
        <div style={{
          position: 'absolute', bottom: '15%', left: '4%',
          fontSize: 'clamp(12px, 1.8vw, 18px)',
          fontFamily: "'Oswald', sans-serif", fontWeight: 800,
          color: '#FFFFFF', textTransform: 'uppercase', letterSpacing: '0.15em',
          backgroundColor: 'rgba(0, 0, 0, 0.55)', backdropFilter: 'blur(10px)',
          padding: '8px 24px', borderRadius: '50px',
          border: '1px solid rgba(179, 135, 40, 0.4)',
          boxShadow: '0 4px 15px rgba(0,0,0,0.4), inset 0 0 10px rgba(179, 135, 40, 0.1)',
          filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.3))'
        }}>
          Ice Rink
        </div>
        {/* Bottom Right */}
        <div style={{
          position: 'absolute', bottom: '15%', right: '4%',
          fontSize: 'clamp(12px, 1.8vw, 18px)',
          fontFamily: "'Oswald', sans-serif", fontWeight: 800,
          color: '#FFFFFF', textTransform: 'uppercase', letterSpacing: '0.15em',
          backgroundColor: 'rgba(0, 0, 0, 0.55)', backdropFilter: 'blur(10px)',
          padding: '8px 24px', borderRadius: '50px',
          border: '1px solid rgba(179, 135, 40, 0.4)',
          boxShadow: '0 4px 15px rgba(0,0,0,0.4), inset 0 0 10px rgba(179, 135, 40, 0.1)',
          filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.3))'
        }}>
          VR Park
        </div>
      </div>

      {/* Phase 2: Top Center "More than dream" Overlay */}
      <div
        ref={dreamRef}
        style={{
          position: 'absolute', top: '6%', left: '50%', transform: 'translateX(-50%)',
          opacity: 0, zIndex: 10, pointerEvents: 'none', whiteSpace: 'nowrap'
        }}
      >
        <div style={{
          fontSize: 'clamp(14px, 2.2vw, 22px)',
          fontFamily: "'Oswald', sans-serif", fontWeight: 800,
          color: '#FFFFFF', textTransform: 'uppercase', letterSpacing: '0.2em',
          backgroundColor: 'rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(10px)',
          padding: '10px 28px', borderRadius: '50px',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 0 20px rgba(179, 135, 40, 0.3)',
          filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.6))'
        }}>
          More than dream
        </div>
      </div>

      {/* Phase 3: Brands Platform Overlay */}
      <div
        ref={brandsPhaseRef}
        style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // Increased dimming for readability
          background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.6) 100%)', // Stronger vignette
          opacity: 0, zIndex: 15, pointerEvents: 'none'
        }}
      >
        <h1
          ref={brandsHeadlineRef}
          style={{
            fontSize: 'clamp(28px, 4.5vw, 64px)',
            fontFamily: "'Oswald', sans-serif",
            fontWeight: 800,
            color: '#FFFFFF',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            textAlign: 'center',
            margin: '0 0 16px 0',
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
        
        <p
          ref={brandsSubtextRef}
          style={{
            fontSize: 'clamp(16px, 2.2vw, 24px)',
            fontFamily: "'Oswald', sans-serif",
            fontWeight: 400,
            color: '#FFFFFF',
            letterSpacing: '0.05em',
            textAlign: 'center',
            maxWidth: '900px',
            margin: '0 5% 0 5%',
            lineHeight: 1.4,
            filter: 'drop-shadow(0 4px 15px rgba(0,0,0,0.9))'
          }}
        >
          Host activations, launches, and large-scale events that connect with millions.
        </p>

        <div
          ref={brandsTagRef}
          style={{
            position: 'absolute',
            bottom: '10%',
            fontSize: 'clamp(10px, 1.2vw, 14px)',
            fontFamily: "'Oswald', sans-serif",
            fontWeight: 500,
            color: '#FFFFFF',
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            opacity: 0.9
          }}
        >
          GLOBAL EVENTS • BRAND ACTIVATIONS • LIVE EXPERIENCES
        </div>
      </div>

      <div
        ref={overlayRef}
        style={{
          position: 'absolute', inset: 0,
          /* Premium cool-pearl gradient — picks up the aquarium blues & glass tones */
          background: 'radial-gradient(ellipse 110% 90% at 50% 42%, #f2f6fa 0%, #dce8f0 55%, #c8d8e8 100%)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          gap: '22px', overflow: 'hidden',
          pointerEvents: 'none',
        }}
      >
        {/* Logo */}
        <img
          ref={logoRef}
          src="https://raw.githubusercontent.com/pratik-71/Liat-Ass/main/public/dubai_mall_start.png"
          alt="Logo"
          style={{
            position: 'relative', zIndex: 2,
            maxWidth: '780px', width: '85vw',
            objectFit: 'contain',
            userSelect: 'none', pointerEvents: 'none',
          }}
        />

        {/* Ground shadow — disappears before zoom punch */}
        <div
          ref={shadowRef}
          style={{
            position: 'absolute',
            bottom: '14%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '65%',
            height: '55px',
            background: 'radial-gradient(ellipse 100% 100% at 50% 100%, rgba(80,110,140,0.18) 0%, transparent 70%)',
            pointerEvents: 'none',
            zIndex: 1,
            filter: 'blur(8px)',
          }}
        />

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          style={{
            position: 'relative', zIndex: 2,
            color: '#3a5068',
            fontSize: 'clamp(18px, 2.5vw, 28px)',
            fontFamily: "'Oswald', 'Impact', 'Arial Narrow', sans-serif",
            fontWeight: 700,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            margin: 0, opacity: 0,
          }}
        >
          <span style={{ display: 'inline-block', transform: 'scale(1, 1.4)' }}>
            Experience the Unimagined In Worlds Larget Mall
          </span>
        </p>
      </div>
      <style>{`
        @keyframes text-shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes shine {
          0% { left: -150%; opacity: 0; }
          20% { opacity: 0.6; }
          50% { opacity: 0.6; }
          100% { left: 150%; opacity: 0; }
        }
      `}</style>
    </div>
  )
}
