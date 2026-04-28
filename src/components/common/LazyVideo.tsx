import React, { useState, useEffect, useRef } from 'react';

interface LazyVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
}

const LazyVideo: React.FC<LazyVideoProps> = ({ src, className, ...props }) => {
  const [isInView, setIsInView] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect(); // only trigger once
        }
      },
      { threshold: 0.1 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Once in view, set src → load → play
  useEffect(() => {
    const video = videoRef.current;
    if (!isInView || !video) return;

    // Attach source element if not already present
    if (!video.querySelector('source')) {
      const sourceEl = document.createElement('source');
      sourceEl.src = src;
      sourceEl.type = 'video/mp4';
      video.appendChild(sourceEl);
    }

    video.load();

    if (props.autoPlay) {
      video.play().catch((err) => console.log('Auto-play blocked:', err));
    }
  }, [isInView, src, props.autoPlay]);

  return (
    <video
      ref={videoRef}
      className={className}
      {...props}
      preload="none"
    />
  );
};

export default LazyVideo;
