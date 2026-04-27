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
        } else {
          // Optional: Pause video when not in view to save resources
          if (videoRef.current) {
            videoRef.current.pause();
          }
        }
      },
      { threshold: 0.1 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isInView && videoRef.current && props.autoPlay) {
      videoRef.current.play().catch(err => console.log("Auto-play blocked:", err));
    }
  }, [isInView, props.autoPlay]);

  return (
    <video
      ref={videoRef}
      className={className}
      {...props}
      preload="none"
    >
      {isInView && <source src={src} type="video/mp4" />}
    </video>
  );
};

export default LazyVideo;
