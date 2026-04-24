import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export const TIMING = {
  // Video overlay text timings (in seconds)
  counterCountUp: 1.5,
  counterHold: 1.5,
  counterFadeOut: 0.5,
  
  secondTextFadeIn: 0.5,
  secondTextHold: 1.7, // Display time reduced by 0.30 seconds
  secondTextFadeOut: 0.5,

  thirdTextDelay: 1.0, // 1 second gap after second text fades out
  thirdTextFadeIn: 0.5,
}

interface SplashScreenProps {
  onComplete: () => void
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const overlayRef  = useRef<HTMLDivElement>(null)
  const logoRef     = useRef<HTMLImageElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const shadowRef   = useRef<HTMLDivElement>(null)
  const videoRef    = useRef<HTMLVideoElement>(null)
  const statsRef    = useRef<HTMLDivElement>(null)
  const topTextRef  = useRef<HTMLDivElement>(null)
  const bottomTextRef = useRef<HTMLDivElement>(null)
  const thirdTextRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({ 
      onComplete: () => {
        if (videoRef.current) {
          // Play the video once animation is done
          videoRef.current.play().catch(console.error)

          // Start counting animation
          gsap.set(statsRef.current, { opacity: 1 })
          const counter = { val: 0 }
          gsap.to(counter, {
            val: 300000,
            duration: TIMING.counterCountUp,
            ease: 'power2.out',
            onUpdate: () => {
              if (statsRef.current) {
                statsRef.current.innerText = `- ${Math.floor(counter.val).toLocaleString('en-IN')} visits a day -`
              }
            },
            onComplete: () => {
              gsap.to(statsRef.current, { 
                opacity: 0, 
                duration: TIMING.counterFadeOut, 
                delay: TIMING.counterHold,
                onComplete: () => {
                  gsap.to([topTextRef.current, bottomTextRef.current], {
                    opacity: 1,
                    duration: TIMING.secondTextFadeIn,
                    onComplete: () => {
                      gsap.to([topTextRef.current, bottomTextRef.current], {
                        opacity: 0,
                        duration: TIMING.secondTextFadeOut,
                        delay: TIMING.secondTextHold,
                        onComplete: () => {
                          // Show third text after gap
                          gsap.to(thirdTextRef.current, {
                            opacity: 1,
                            duration: TIMING.thirdTextFadeIn,
                            delay: TIMING.thirdTextDelay
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

    gsap.set(logoRef.current,     { scale: 0.6, opacity: 0, willChange: 'transform, opacity' })
    gsap.set(subtitleRef.current, { opacity: 0, y: 14,      willChange: 'transform, opacity' })
    gsap.set(shadowRef.current,   { opacity: 0,             willChange: 'opacity' })
    gsap.set(overlayRef.current,  { opacity: 1 })
    gsap.set(videoRef.current,    { opacity: 0 })

    tl
      // Logo fades + zooms in
      .to(logoRef.current,     { scale: 1, opacity: 1, duration: 0.9, ease: 'power2.out' })
      // Shadow fades in with logo
      .to(shadowRef.current,   { opacity: 1, duration: 0.7, ease: 'power2.out' }, '-=0.6')
      // Subtitle rises in
      .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4')
      // Hold
      .to({}, { duration: 0.65 })
      // Subtitle + shadow exit before zoom
      .to([subtitleRef.current, shadowRef.current], { opacity: 0, duration: 0.28, ease: 'power2.in' })
      // Netflix zoom punch
      .to(logoRef.current,    { scale: 4.5, opacity: 0, duration: 0.95, ease: 'power3.in' })
      // Fade out overlay gradient to reveal video
      .to(overlayRef.current, { opacity: 0, duration: 0.4, ease: 'power2.inOut' }, '-=0.35')
      // Fade in video
      .to(videoRef.current,   { opacity: 1, duration: 0.5 }, '-=0.4')

    return () => { tl.kill() }
  }, [onComplete])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        backgroundColor: '#000',
      }}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        src="/start_video.mp4"
        style={{
          width: '100%', height: '100%',
          objectFit: 'contain', position: 'absolute', inset: 0
        }}
        onEnded={onComplete}
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
          color: 'white',
          fontSize: 'clamp(36px, 5vw, 64px)',
          fontFamily: "'Oswald', 'Impact', 'Arial Narrow', sans-serif",
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          textShadow: '0 2px 10px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.4)',
          opacity: 0,
          zIndex: 10,
          pointerEvents: 'none',
          whiteSpace: 'nowrap'
        }}
      />

      {/* Top Text Overlay */}
      <div
        ref={topTextRef}
        style={{
          position: 'absolute',
          top: '6%',
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'white',
          fontSize: 'clamp(24px, 3.5vw, 42px)',
          fontFamily: "'Oswald', 'Impact', 'Arial Narrow', sans-serif",
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          textShadow: '0 2px 10px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.4)',
          opacity: 0,
          zIndex: 10,
          pointerEvents: 'none',
          whiteSpace: 'nowrap'
        }}
      >
        <span style={{ display: 'inline-block', transform: 'scale(1, 1.4)' }}>
          - WoWhere everything exists -
        </span>
      </div>

      {/* Bottom Small Text Overlay */}
      <div
        ref={bottomTextRef}
        style={{
          position: 'absolute',
          bottom: '5%',
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'rgba(255, 255, 255, 0.9)',
          fontSize: 'clamp(14px, 2vw, 20px)',
          fontFamily: "'Segoe UI', system-ui, sans-serif",
          fontWeight: 400,
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          textShadow: '0 2px 8px rgba(0,0,0,0.8)',
          opacity: 0,
          zIndex: 10,
          pointerEvents: 'none',
          whiteSpace: 'nowrap'
        }}
      >
        Enter another world
      </div>

      {/* Third Text Overlay */}
      <div
        ref={thirdTextRef}
        style={{
          position: 'absolute',
          bottom: '5%',
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'white',
          fontSize: 'clamp(24px, 3.5vw, 42px)',
          fontFamily: "'Oswald', 'Impact', 'Arial Narrow', sans-serif",
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          textShadow: '0 2px 10px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.4)',
          opacity: 0,
          zIndex: 10,
          pointerEvents: 'none',
          whiteSpace: 'nowrap'
        }}
      >
        <span style={{ display: 'inline-block', transform: 'scale(1, 1.4)' }}>
          - Experience the extraordinary -
        </span>
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
          src="/dubai_mall_start.png"
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
    </div>
  )
}
