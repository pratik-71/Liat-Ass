import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

interface ModuleNavigationProps {
  moduleName: string;
  onBack: () => void;
}

const ModuleNavigation: React.FC<ModuleNavigationProps> = ({ moduleName }) => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[1000] flex items-center justify-between px-6 md:px-12 py-4 transition-all duration-500 ${
      isScrolled ? 'bg-black/80 backdrop-blur-2xl border-b border-[#C8A96A]/20' : 'bg-transparent border-b border-transparent'
    }`}>
      {/* Brand & Module Link - Hidden on Mobile */}
      <Link 
        to="/dashboard"
        className="hidden md:flex items-center gap-3 md:gap-4"
      >
        <span className="text-[9px] md:text-[10px] font-bold tracking-[0.4em] uppercase text-[#C8A96A] transition-all duration-500 group-hover:text-white group-hover:tracking-[0.5em] whitespace-nowrap">
          The Dubai Mall
        </span>
        <span className="opacity-40 text-white font-light tracking-normal">·</span>
        <span className="text-white/60 text-[9px] md:text-[10px] uppercase tracking-[0.2em] group-hover:text-[#E5C27A] transition-colors duration-500 font-medium whitespace-nowrap">
          {moduleName}
        </span>
      </Link>

      {/* Spacing for mobile when Link is hidden */}
      <div className="md:hidden flex-1" />

      {/* Back Button */}
      <button
        onClick={() => navigate('/dashboard')}
        className="group relative px-4 md:px-8 py-2 md:py-2.5 overflow-hidden text-[8px] md:text-[9px] font-bold tracking-[0.2em] md:tracking-[0.3em] uppercase transition-all duration-500 border border-[#C8A96A]/30 text-[#E5C27A] hover:text-black cursor-pointer"
      >
        <span className="relative z-10 transition-colors duration-500 flex items-center gap-2">
          <span className="hidden md:inline">←</span> Dashboard
        </span>
        <div className="absolute inset-0 bg-[#C8A96A] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
      </button>
    </nav>
  );
};

export default ModuleNavigation;
