import React, { useState, useEffect } from 'react';

interface ModuleNavigationProps {
  moduleName: string;
  onBack: () => void;
}

const ModuleNavigation: React.FC<ModuleNavigationProps> = ({ moduleName, onBack }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredBtn, setHoveredBtn] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav style={{
      position: 'fixed',
      top: 0, left: 0, right: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '16px 48px',
      zIndex: 1000,
      transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
      background: isScrolled ? 'rgba(5, 5, 5, 0.75)' : 'transparent',
      backdropFilter: isScrolled ? 'blur(20px) saturate(180%)' : 'none',
      borderBottom: isScrolled ? '1px solid rgba(200, 169, 106, 0.15)' : '1px solid transparent',
    }}>
      <div 
        onClick={onBack}
        className="cursor-pointer group flex items-center gap-4"
        style={{
          fontSize: '10px',
          fontWeight: 700,
          letterSpacing: '0.4em',
          textTransform: 'uppercase',
          color: '#C8A96A',
          transition: 'all 0.3s ease'
        }}
      >
        <span className="transition-all duration-500 group-hover:text-white group-hover:tracking-[0.5em]">
          The Dubai Mall
        </span>
        <span className="opacity-40 text-white font-light tracking-normal mx-2">·</span>
        <span className="text-white/60 group-hover:text-[#E5C27A] transition-colors duration-500 font-medium">
          {moduleName}
        </span>
      </div>

      <button
        onClick={onBack}
        onMouseEnter={() => setHoveredBtn('back')}
        onMouseLeave={() => setHoveredBtn(null)}
        className="group relative px-8 py-2.5 overflow-hidden text-[9px] font-bold tracking-[0.3em] uppercase transition-all duration-500"
        style={{
          border: '1px solid rgba(200, 169, 106, 0.3)',
          color: hoveredBtn === 'back' ? '#000' : '#E5C27A',
          cursor: 'pointer'
        }}
      >
        <span className="relative z-10 transition-colors duration-500">← Dashboard</span>
        <div 
          className={`absolute inset-0 bg-[#C8A96A] transition-transform duration-500 ease-out ${
            hoveredBtn === 'back' ? 'translate-y-0' : 'translate-y-full'
          }`}
        />
      </button>
    </nav>
  );
};

export default ModuleNavigation;
