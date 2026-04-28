import { useState, useEffect, useRef } from 'react';

/**
 * Enterprise-grade Asset Preloader
 * Orchestrates the loading of high-resolution images to ensure
 * zero-jank transitions.
 *
 * PERFORMANCE NOTE: Videos are intentionally excluded from blocking
 * preload — they are streamed by the browser and handled by the
 * video element itself. Waiting for `loadeddata` on a remote video
 * (especially from a raw CDN) can block FCP by several seconds.
 */
export const useAssetPreloader = (assets: string[]) => {
  const [isReady, setIsReady] = useState(false);
  const [progress, setProgress] = useState(0);
  // Stable ref so the effect doesn't re-run on every render
  const assetsRef = useRef(assets);

  useEffect(() => {
    const imageAssets = assetsRef.current.filter((src) => !src.endsWith('.mp4') && !src.endsWith('.webm'));

    // If there are no images to preload, mark ready immediately
    if (imageAssets.length === 0) {
      setProgress(100);
      setIsReady(true);
      return;
    }

    let loadedCount = 0;
    const total = imageAssets.length;

    const onAssetLoad = () => {
      loadedCount++;
      setProgress((loadedCount / total) * 100);
      if (loadedCount === total) {
        setIsReady(true);
      }
    };

    imageAssets.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = onAssetLoad;
      img.onerror = onAssetLoad; // Continue even on failure
    });
  }, []); // empty dep array — assetsRef keeps the stable reference

  return { isReady, progress };
};
