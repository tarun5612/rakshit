
import React, { useState } from 'react';
import Section from './Section';
import { EXPANDED_ABOUT_BIO } from '../constants';

interface AboutProps {
  theme?: 'light' | 'dark';
}

const About: React.FC<AboutProps> = ({ theme = 'dark' }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Section id="about" className={`border-t py-24 md:py-48 relative overflow-hidden ${theme === 'light' ? 'border-zinc-200' : 'border-white/5'}`}>
      <div className={`absolute top-1/4 right-0 w-[600px] h-[600px] rounded-full blur-[140px] -translate-y-1/2 translate-x-1/2 pointer-events-none ${theme === 'light' ? 'bg-indigo-300/10' : 'bg-indigo-500/10'}`} />
      <div className={`absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none ${theme === 'light' ? 'bg-purple-300/10' : 'bg-purple-500/5'}`} />
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
        <div className="lg:col-span-5 relative group max-w-lg mx-auto lg:max-w-none lg:sticky lg:top-32">
          <div className={`absolute -inset-10 rounded-[4rem] blur-[120px] opacity-20 group-hover:opacity-60 transition duration-1000 ease-in-out ${theme === 'light' ? 'bg-gradient-to-tr from-indigo-300/30 via-purple-300/20 to-rose-300/30' : 'bg-gradient-to-tr from-indigo-500/30 via-purple-600/20 to-rose-500/30'}`}></div>
          
          <div className={`relative rounded-[3rem] md:rounded-[5rem] overflow-hidden border shadow-[0_64px_128px_-12px_rgba(0,0,0,0.5)] transition-all duration-700 p-2 ring-1 group-hover:ring-indigo-500/50 ${theme === 'light' ? 'bg-white border-zinc-200 ring-black/5 shadow-zinc-200/50' : 'bg-zinc-900 border-white/5 ring-white/10'}`}>
             <div className={`relative rounded-[2.5rem] md:rounded-[4.5rem] overflow-hidden ${theme === 'light' ? 'bg-zinc-100' : 'bg-zinc-950'}`}>
               <img 
                 src="https://yt3.googleusercontent.com/pRNTTle6RE-oXl4TNsP3BZLr_F82vqnPdGEv8i81iyyyE77lG_yoXITxi87U6fIV0GahotTlzw=s160-c-k-c0x00ffffff-no-rj" 
                 alt="Rakshit Sharma" 
                 className="w-full h-auto object-cover transition-all duration-1000 ease-out scale-110 group-hover:scale-100 brightness-75 group-hover:brightness-100"
                 onError={(e) => {
                   e.currentTarget.src = "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800";
                 }}
               />
               <div className={`absolute inset-0 opacity-60 group-hover:opacity-30 transition-opacity ${theme === 'light' ? 'bg-gradient-to-t from-white via-transparent' : 'bg-gradient-to-t from-zinc-950/80 via-transparent'}`} />
             </div>
          </div>
          
          <div className={`absolute -top-4 -left-4 backdrop-blur-2xl border px-6 py-3 rounded-2xl shadow-2xl animate-bounce ${theme === 'light' ? 'bg-white/80 border-zinc-200' : 'bg-white/5 border-white/10'}`} style={{animationDuration: '3s'}}>
            <span className="text-[10px] text-indigo-500 font-black uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" /> Verified
            </span>
          </div>

          <div className={`absolute -bottom-8 -right-4 md:-bottom-12 md:-right-8 border px-10 py-8 rounded-[2.5rem] shadow-2xl transform group-hover:-translate-y-6 group-hover:rotate-2 transition-all duration-700 ${theme === 'light' ? 'bg-white border-zinc-200 text-zinc-900' : 'bg-zinc-950 border-white/10 text-white'}`}>
            <div className="flex flex-col gap-1">
              <span className="text-base md:text-xl font-black uppercase tracking-[0.4em] leading-none">Rakshit</span>
              <span className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.3em]">Content Creator</span>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-7 space-y-12 relative z-10 lg:pt-8">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
               <div className="h-[2px] w-16 bg-gradient-to-r from-indigo-500 to-transparent rounded-full" />
               <span className="text-indigo-500 font-black tracking-[0.4em] uppercase text-[12px]">The Narrative</span>
            </div>
            <h2 className={`text-7xl md:text-8xl lg:text-[8rem] font-black tracking-tighter leading-[0.85] ${theme === 'light' ? 'text-zinc-900' : 'text-white'}`}>
              Beyond the <br />
              <span className="bg-gradient-to-r from-indigo-500 via-purple-400 to-rose-500 bg-clip-text text-transparent italic drop-shadow-2xl">Pixels.</span>
            </h2>
          </div>
          
          <div className="relative">
             <div className={`text-xl md:text-2xl font-light leading-relaxed transition-all duration-1000 ease-in-out ${isExpanded ? 'max-h-[3000px]' : 'max-h-[300px] md:max-h-[400px] overflow-hidden'} ${theme === 'light' ? 'text-zinc-600' : 'text-zinc-400'}`}>
                <div className="space-y-10 whitespace-pre-wrap">
                  <p className={`first-letter:text-9xl first-letter:font-black first-letter:mr-6 first-letter:float-left first-letter:leading-[0.7] ${theme === 'light' ? 'first-letter:text-zinc-900' : 'first-letter:text-white'}`}>
                    {EXPANDED_ABOUT_BIO}
                  </p>
                </div>
                
                {isExpanded && (
                  <div className={`mt-12 p-8 rounded-3xl border backdrop-blur-sm ${theme === 'light' ? 'bg-zinc-100 border-zinc-200' : 'bg-white/5 border-white/5'}`}>
                    <p className={`italic border-l-4 border-indigo-500 pl-6 text-2xl leading-relaxed ${theme === 'light' ? 'text-zinc-700' : 'text-zinc-300'}`}>
                      "I believe that creativity isn't just about making things; it's about making a difference through the stories we choose to tell and the platforms we choose to build."
                    </p>
                  </div>
                )}
             </div>
             
             {!isExpanded && (
               <div className={`absolute bottom-0 left-0 w-full h-40 pointer-events-none ${theme === 'light' ? 'bg-gradient-to-t from-white to-transparent' : 'bg-gradient-to-t from-zinc-950 to-transparent'}`} />
             )}
          </div>

          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className={`group flex items-center gap-8 font-black uppercase tracking-[0.4em] text-[11px] md:text-xs transition-all ${theme === 'light' ? 'text-zinc-700 hover:text-zinc-900' : 'text-zinc-300 hover:text-white'}`}
          >
            <div className={`w-20 h-20 rounded-full border flex items-center justify-center transition-all duration-700 group-hover:border-indigo-500 group-hover:bg-indigo-500 group-hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] group-hover:text-white ${theme === 'light' ? 'border-zinc-200' : 'border-white/10'}`}>
              <span className={`text-3xl transform transition-transform duration-1000 ${isExpanded ? 'rotate-180' : 'group-hover:translate-y-2'}`}>↓</span>
            </div>
            <div className="flex flex-col items-start gap-1">
              <span className="border-b-2 border-transparent group-hover:border-indigo-500 pb-1 transition-all">
                {isExpanded ? 'Compress Timeline' : 'Explore the Full Ecosystem'}
              </span>
              <span className="text-[10px] text-zinc-500 font-medium">Click to expand narrative</span>
            </div>
          </button>
        </div>
      </div>
    </Section>
  );
};

export default About;
