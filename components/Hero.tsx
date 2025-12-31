
import React from 'react';

interface HeroProps {
  theme?: 'light' | 'dark';
}

const Hero: React.FC<HeroProps> = ({ theme = 'dark' }) => {
  return (
    <div className="min-h-[90vh] flex flex-col justify-center items-center text-center px-6 md:px-12 lg:px-24 max-w-7xl mx-auto relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-20 pointer-events-none">
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[120px] ${theme === 'light' ? 'bg-indigo-300/30' : 'bg-indigo-500/20'}`} />
      </div>

      <div className="relative z-10 animate-in fade-in zoom-in duration-1000 ease-out">
        <span className={`inline-flex items-center gap-2 px-5 py-2 rounded-full border text-indigo-500 font-bold tracking-[0.2em] uppercase text-[9px] md:text-[11px] mb-10 backdrop-blur-xl shadow-2xl ${theme === 'light' ? 'bg-white border-zinc-200' : 'bg-white/5 border-white/10'}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
          Content Creator • Visual Storyteller
        </span>
        
        <h1 className="text-7xl md:text-9xl lg:text-[12rem] font-black tracking-tighter leading-[0.8] mb-10 select-none">
          <span className={`inline-block bg-clip-text text-transparent transform hover:scale-[1.02] transition-transform duration-700 ${theme === 'light' ? 'bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-500' : 'bg-gradient-to-b from-white via-zinc-200 to-zinc-500'}`}>
            Rakshit <br />
            Sharma.
          </span>
        </h1>
        
        <p className={`text-lg md:text-2xl font-light max-w-2xl mx-auto leading-relaxed tracking-tight ${theme === 'light' ? 'text-zinc-600' : 'text-zinc-400'}`}>
          Crafting high-impact <span className={theme === 'light' ? 'text-zinc-900 font-medium' : 'text-white font-medium'}>Digital Narratives</span>, tech deep-dives, and cinematic experiences for a global audience.
        </p>
      </div>
      
      <div className="mt-24 animate-bounce flex flex-col items-center gap-3">
        <div className="w-[1px] h-12 bg-gradient-to-b from-indigo-500 to-transparent" />
        <span className={`text-[10px] font-black tracking-[0.4em] uppercase ${theme === 'light' ? 'text-zinc-400' : 'text-zinc-600'}`}>Explore</span>
      </div>
    </div>
  );
};

export default Hero;
