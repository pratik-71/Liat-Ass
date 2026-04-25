/**
 * Industry Standard Design System & Constants
 * Centralized source of truth for all luxury assets, timings, and themes.
 */

export const DESIGN_SYSTEM = {
  colors: {
    gold: '#C8A96A',
    goldLight: '#E5C27A',
    goldShimmer: 'linear-gradient(110deg, #E5C27A 40%, #FFF5D6 50%, #C8A96A 60%)',
    midnight: '#0A0A0A',
    glass: 'rgba(15, 15, 15, 0.7)',
    whiteMuted: 'rgba(255, 255, 255, 0.6)',
  },
  timings: {
    introFade: 0.8,
    cardStagger: 0.1,
    shimmerDuration: 3,
    transitionEase: 'power3.out',
    luxuryEase: 'cubic-bezier(0.23, 1, 0.32, 1)',
  },
  assets: {
    videoIntro: 'https://raw.githubusercontent.com/pratik-71/Liat-Ass/main/public/start_video.mp4',
    logoSplash: 'https://raw.githubusercontent.com/pratik-71/Liat-Ass/main/public/dubai_mall_start.png',
    bgHome: 'https://raw.githubusercontent.com/pratik-71/Liat-Ass/main/public/home.png',
    bgIntro: 'https://raw.githubusercontent.com/pratik-71/Liat-Ass/main/public/home%20ann.png',
  }
};

/**
 * MODULE REGISTRY
 * To add a new section, simply add its ID here.
 * The App will automatically handle the routing and dynamic loading.
 */
export const MODULE_REGISTRY = {
  dashboard: 'dashboard',
  retail: 'retail',
  attractions: 'attractions',
  luxury: 'luxury',
} as const;

export const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
  desktop: 1440,
};
