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

  return (
    <div className="fixed inset-0 z-[99999] bg-dark flex flex-col items-center justify-center overflow-y-auto">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#d4af37]/20 via-dark to-dark opacity-80"></div>
        {/* Simple floating hearts animation using CSS */}
        <div className="absolute top-10 left-10 text-[#d4af37] animate-bounce"><Heart size={32} fill="currentColor" /></div>
        <div className="absolute top-20 right-20 text-[#d4af37] animate-bounce" style={{ animationDelay: '0.5s' }}><Heart size={48} fill="currentColor" /></div>
        <div className="absolute bottom-20 left-1/4 text-[#d4af37] animate-bounce" style={{ animationDelay: '1s' }}><Heart size={24} fill="currentColor" /></div>
        <div className="absolute bottom-10 right-1/3 text-[#d4af37] animate-bounce" style={{ animationDelay: '1.5s' }}><Heart size={40} fill="currentColor" /></div>
      </div>

      <button 
        onClick={handleClose}
        className="absolute top-6 right-6 z-50 bg-dark-lighter hover:bg-[#d4af37] hover:text-dark text-white p-3 rounded-full transition-all duration-300 shadow-[0_0_15px_rgba(212,175,55,0.3)]"
      >
        <X size={28} />
      </button>

      <div className="relative z-10 max-w-5xl w-full px-4 py-12 flex flex-col items-center text-center space-y-10">
        <div className="space-y-4 animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-[#d4af37] drop-shadow-lg">
            Happy Anniversary!
          </h1>
          <h2 className="text-3xl md:text-5xl font-serif text-white mt-4">
            Sunil & Kavitha
          </h2>
          <p className="text-xl md:text-2xl text-grey-light italic mt-6 max-w-2xl mx-auto leading-relaxed">
            Wishing the visionary founders of SK Buildings a lifetime of love, joy, and continued success together.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <div className="w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden border-4 border-[#d4af37] shadow-[0_0_30px_rgba(212,175,55,0.4)] transform hover:scale-105 transition-transform duration-500">
            <img 
              src="/anniversary-1.jpg" 
              alt="Sunil and Kavitha" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden border-4 border-[#d4af37] shadow-[0_0_30px_rgba(212,175,55,0.4)] transform hover:scale-105 transition-transform duration-500">
            <img 
              src="/anniversary-2.jpg" 
              alt="Sunil and Kavitha" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <button 
          onClick={handleClose}
          className="mt-12 bg-gradient-to-r from-[#d4af37] to-[#a88c3a] hover:from-[#e5c354] hover:to-[#b89b43] text-dark font-bold text-lg py-4 px-12 rounded-full transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(212,175,55,0.5)] animate-pulse"
        >
          Enter Website
        </button>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out forwards;
          opacity: 0;
        }
      `}} />
    </div>
  );
};
