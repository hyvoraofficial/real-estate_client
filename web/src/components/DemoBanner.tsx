import React from 'react';
import { ExternalLink, Sparkles } from 'lucide-react';

export const DemoBanner: React.FC = () => {
  return (
    <aside aria-label="Demo notice" className="bg-gradient-to-r from-[#0d1527] via-[#111827] to-[#0d1527] text-white text-xs border-b border-primary/25 px-4 py-1.5 flex flex-wrap items-center justify-between gap-2 z-50 relative shadow-sm">
      <div className="flex items-center gap-2 mx-auto sm:mx-0">
        <span className="inline-flex items-center gap-1 bg-primary/20 text-primary px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase border border-primary/30">
          <Sparkles size={10} className="text-primary animate-pulse" />
          Interactive Demo
        </span>
        <span className="font-semibold text-gray-200">
          HYVORA Property Management
        </span>
        <span className="hidden md:inline text-gray-400">
          — All data shown is fictional and for demonstration purposes.
        </span>
      </div>

      <div className="flex items-center gap-3 text-[11px] mx-auto sm:mx-0">
        <span className="text-gray-400 hidden sm:inline">
          Powered by <strong className="text-white font-medium">HYVORA</strong>
        </span>
        <a
          href="https://hyvora.in"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-primary hover:text-white font-medium transition-colors underline-offset-2 hover:underline"
        >
          <span>Visit hyvora.in</span>
          <ExternalLink size={12} />
        </a>
      </div>
    </aside>
  );
};
