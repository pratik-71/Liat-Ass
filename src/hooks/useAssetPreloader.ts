import { useState, useEffect } from 'react';

/**
 * Enterprise-grade Asset Preloader
 * Orchestrates the loading of high-resolution images and videos
 * to ensure zero-jank transitions.
 */
export const useAssetPreloader = (assets: string[]) => {
  const [isReady, setIsReady] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let loadedCount = 0;
    const total = assets.length;

    const onAssetLoad = () => {
      loadedCount++;
      setProgress((loadedCount / total) * 100);
      if (loadedCount === total) {
        setIsReady(true);
      }
    };

    assets.forEach((src) => {
      if (src.endsWith('.mp4')) {
        const video = document.createElement('video');
        video.src = src;
        video.onloadeddata = onAssetLoad;
        video.onerror = onAssetLoad; // Continue even on failure
      } else {
        const img = new Image();
        img.src = src;
        img.onload = onAssetLoad;
        img.onerror = onAssetLoad;
      }
    });
  }, [assets]);

  return { isReady, progress };
};
