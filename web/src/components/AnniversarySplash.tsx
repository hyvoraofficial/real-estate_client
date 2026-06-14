import React, { useState, useEffect } from 'react';
import { X, Heart } from 'lucide-react';

export const AnniversarySplash: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show today/tomorrow, or just show if not dismissed in this session
    const hasSeen = sessionStorage.getItem('anniversary_seen');
    if (!hasSeen) {
      setIsVisible(true);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem('anniversary_seen', 'true');
  };

  if (!isVisible) return null;

  // Generate an array of random hearts
  const hearts = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    size: Math.random() * 30 + 15, // 15 to 45
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: `${Math.random() * 3}s`,
    duration: `${Math.random() * 2 + 2}s`,
    opacity: Math.random() * 0.5 + 0.3
  }));

  return (
    <div className="fixed inset-0 z-[99999] bg-white flex flex-col items-center justify-center overflow-y-auto">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#d4af37]/10 via-white to-white opacity-90"></div>
        
        {/* Many floating hearts animation using CSS */}
        {hearts.map((h) => (
          <div 
            key={h.id}
            className="absolute text-[#d4af37] animate-float"
            style={{ 
              left: h.left, 
              top: h.top, 
              animationDelay: h.delay,
              animationDuration: h.duration,
              opacity: h.opacity
            }}
          >
            <Heart size={h.size} fill="currentColor" />
          </div>
        ))}
      </div>

      <button 
        onClick={handleClose}
        className="absolute top-4 right-4 md:top-6 md:right-6 z-50 bg-white border border-slate-200 hover:bg-[#d4af37] hover:text-white text-slate-500 p-2 md:p-3 rounded-full transition-all duration-300 shadow-[0_0_15px_rgba(212,175,55,0.2)]"
      >
        <X size={24} className="md:w-7 md:h-7" />
      </button>

      <div className="relative z-10 max-w-5xl w-full px-4 pt-20 pb-8 md:py-12 flex flex-col items-center text-center space-y-6 md:space-y-10">
        <div className="space-y-2 md:space-y-4 animate-fade-in-up px-2">
          <h1 className="text-5xl md:text-8xl font-bold text-[#d4af37] drop-shadow-sm custom-love-font leading-tight">
            Happy Anniversary!!
          </h1>
          <h2 className="text-4xl md:text-7xl text-slate-800 mt-2 md:mt-4 custom-love-font flex items-center justify-center gap-2 md:gap-4 flex-wrap leading-tight">
            Sunil <Heart className="text-red-500 animate-pulse inline w-8 h-8 md:w-12 md:h-12" fill="currentColor" /> Kavitha
          </h2>
          <p className="text-lg md:text-2xl text-slate-500 italic mt-4 md:mt-8 max-w-2xl mx-auto leading-relaxed font-serif px-4">
            Wishing the visionary founders of <span className="brand-text text-sm md:text-lg">SK Buildings</span> a lifetime of love, joy, and continued success together.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 w-full animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <div className="w-56 h-56 md:w-80 md:h-80 rounded-2xl overflow-hidden border-4 border-[#d4af37] shadow-[0_0_30px_rgba(212,175,55,0.3)] transform hover:scale-105 transition-transform duration-500">
            <img 
              src="/anniversary-1.jpg" 
              alt="Sunil and Kavitha" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-56 h-56 md:w-80 md:h-80 rounded-2xl overflow-hidden border-4 border-[#d4af37] shadow-[0_0_30px_rgba(212,175,55,0.3)] transform hover:scale-105 transition-transform duration-500">
            <img 
              src="/anniversary-2.jpg" 
              alt="Sunil and Kavitha" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <button 
          onClick={handleClose}
          className="mt-12 bg-gradient-to-r from-[#d4af37] to-[#a88c3a] hover:from-[#e5c354] hover:to-[#b89b43] text-white font-bold text-xl py-4 px-12 rounded-full transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(212,175,55,0.4)] animate-pulse font-serif"
        >
          Enter Website
        </button>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');
        
        .custom-love-font {
          font-family: 'Great Vibes', cursive;
          line-height: 1.2;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out forwards;
          opacity: 0;
        }

        @keyframes float {
          0% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-20px) scale(1.1); }
          100% { transform: translateY(0px) scale(1); }
        }
        .animate-float {
          animation-name: float;
          animation-iteration-count: infinite;
          animation-timing-function: ease-in-out;
        }
      `}} />
    </div>
  );
};
