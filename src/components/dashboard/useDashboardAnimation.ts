import { useEffect } from 'react';
import gsap from 'gsap';
import type { OpportunityCardData } from '../../types';

export const useDashboardAnimation = (
  containerRef: React.RefObject<HTMLDivElement>,
  introImageRef: React.RefObject<HTMLImageElement>,
  bgRef: React.RefObject<HTMLDivElement>,
  cards: OpportunityCardData[]
) => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;
      
      // ── CINEMATIC ENTRANCE SEQUENCE (3s Total) ──
      const tl = gsap.timeline();

      // 1. Force Initial State (Ensuring visibility)
      gsap.set(introImageRef.current, { y: '100%', opacity: 1, display: 'block', visibility: 'visible' });
      gsap.set(bgRef.current, { opacity: 0, visibility: 'visible' });
      gsap.set(['.luxury-backdrop-overlay', '.dashboard-nav', '.content-header', '.hero-cta', '.luxury-cards-container', '.luxury-footer'], { opacity: 0, visibility: 'visible' });

      // 2. home ann.png rise (0.0s - 1.2s)
      tl.to(introImageRef.current, { 
        y: '0%', 
        duration: 1.2, 
        ease: 'power3.out' 
      });

      // 3. show home.png (starts at 1.0s)
      tl.to(bgRef.current, { 
        opacity: 1, 
        duration: 1.0,
        ease: 'power2.inOut'
      }, 1.0);

      // 4. home ann fades out (starts at 1.5s)
      tl.to(introImageRef.current, { 
        opacity: 0, 
        duration: 0.8,
        onComplete: () => {
          if (introImageRef.current) introImageRef.current.style.display = 'none';
        }
      }, 1.5);

      // 5. Backdrop reveal (starts at 1.5s)
      tl.to('.luxury-backdrop-overlay', { 
        opacity: 1, 
        duration: 1.0 
      }, 1.5);

      // 6. Content reveal (starts at 2.0s)
      // Responsive Y offsets
      const textY = isMobile ? 15 : 30;
      const cardY = isMobile ? 20 : 40;

      tl.to('.content-header', { opacity: 1, duration: 0.5 }, 2.0);
      tl.fromTo(['.luxury-subtitle', '.luxury-title', '.luxury-stat-line', '.hero-cta'], 
        { opacity: 0, y: textY },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          stagger: isMobile ? 0.05 : 0.1,
          ease: 'expo.out'
        }, 2.0);

      tl.to('.luxury-cards-container', {
        opacity: 1,
        duration: 0.8
      }, 2.2);

      tl.fromTo('.luxury-card', 
        { opacity: 0, y: cardY, rotateX: isMobile ? 5 : 15 },
        { opacity: 1, y: 0, rotateX: 0, duration: 1.2, stagger: isMobile ? 0.08 : 0.12, ease: 'expo.out' },
        2.3
      );

      tl.to('.luxury-footer', { opacity: 1, duration: 0.5 }, 2.6);

      // Numeric counting (Starts exactly as cards reveal)
      cards.forEach((card, index) => {
        const obj = { val: 0 };
        let el: HTMLElement | null = null;
        gsap.to(obj, {
          val: card.target || 0,
          duration: 2.5,
          ease: 'power3.out',
          delay: 2.4 + (index * 0.1),
          onStart: () => {
            el = document.getElementById(`stat-count-${card.id}`);
          },
          onUpdate: () => {
            if (el) el.innerText = `${Math.floor(obj.val)}${card.suffix || ''}`;
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [containerRef, introImageRef, bgRef, cards]);
};
