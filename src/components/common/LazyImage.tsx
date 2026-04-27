import React, { useState, useEffect, useRef } from 'react';

interface LazyImageProps {
  src: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
  isBackground?: boolean;
  children?: React.ReactNode;
}

const LazyImage: React.FC<LazyImageProps> = ({ 
  src, 
  alt = '', 
  className = '', 
  style = {}, 
  isBackground = false,
  children 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLDivElement | HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' } // Load slightly before it comes into view
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLoad = () => setIsLoaded(true);

  if (isBackground) {
    return (
      <div
        ref={imgRef as React.RefObject<HTMLDivElement>}
        className={`${className} transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        style={{
          ...style,
          backgroundImage: isInView ? `url('${src}')` : 'none',
        }}
      >
        {isInView && (
          <img 
            src={src} 
            alt="" 
            style={{ display: 'none' }} 
            onLoad={handleLoad} 
          />
        )}
        {children}
      </div>
    );
  }

  return (
    <img
      ref={imgRef as React.RefObject<HTMLImageElement>}
      src={isInView ? src : ''}
      alt={alt}
      className={`${className} transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      style={style}
      onLoad={handleLoad}
      loading="lazy"
    />
  );
};

export default LazyImage;
