
import React, { useEffect, useState, useRef } from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Channels from './components/Channels';
import Footer from './components/Footer';
import { CHANNELS, SOCIALS, ICON_MAP, CONTACT, NAV_BIO } from './constants';
import { X, Sun, Moon } from 'lucide-react';

type NavTab = 'connect' | 'bio' | 'eco' | null;
type Theme = 'light' | 'dark';

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState<NavTab>(null);
  const [theme, setTheme] = useState<Theme>(() => {
    // Strictly default to dark mode for first-time visitors
    const saved = localStorage.getItem('rs-theme');
    if (saved === 'light' || saved === 'dark') {
      return saved as Theme;
    }
    return 'dark';
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    localStorage.setItem('rs-theme', theme);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [theme]);

  useEffect(() => {
    if (activeTab) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [activeTab]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  const renderPanelContent = () => {
    switch (activeTab) {
      case 'connect':
        return (
          <div className="space-y-10 animate-in fade-in slide-in-from-right-8 duration-500">
            <div className="space-y-2">
              <span className="text-indigo-500 font-black tracking-[0.4em] uppercase text-[10px]">Direct Access</span>
              <h2 className={`text-5xl font-black tracking-tighter ${theme === 'light' ? 'text-zinc-900' : 'text-white'}`}>Connect.</h2>
            </div>
            <div className="space-y-8">
              <a href={`mailto:${CONTACT.email}`} className={`flex items-center gap-6 p-6 rounded-[2rem] border transition-all group shadow-2xl ${theme === 'light' ? 'bg-zinc-100 border-zinc-200 hover:bg-indigo-600 hover:border-indigo-500 hover:text-white' : 'bg-white/[0.03] border-white/10 hover:bg-indigo-600 hover:border-indigo-500'}`}>
                <div className={`p-4 rounded-2xl transition-colors ${theme === 'light' ? 'bg-zinc-200 group-hover:bg-white/20' : 'bg-zinc-950 group-hover:bg-white/20'}`}>
                  {ICON_MAP.Mail}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className={`text-[10px] uppercase font-black opacity-50 tracking-widest mb-1 ${theme === 'light' ? 'text-zinc-600 group-hover:text-white' : ''}`}>Email Inquiry</span>
                  <span className="font-black text-lg tracking-tight break-all leading-tight">{CONTACT.email}</span>
                </div>
              </a>
              
              <div className={`relative p-8 rounded-[2rem] border backdrop-blur-sm overflow-hidden group ${theme === 'light' ? 'bg-indigo-50 border-indigo-100' : 'bg-indigo-500/5 border-indigo-500/10'}`}>
                 <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                 <p className={`relative z-10 text-lg font-medium italic leading-relaxed ${theme === 'light' ? 'text-indigo-900' : 'text-zinc-300'}`}>
                   "I am open for collaboration over diverse brands and products."
                 </p>
              </div>
            </div>
          </div>
        );
      case 'bio':
        return (
          <div className="space-y-10 animate-in fade-in slide-in-from-right-8 duration-500">
            <div className="space-y-2">
              <span className="text-indigo-500 font-black tracking-[0.4em] uppercase text-[10px]">The Narrative</span>
              <h2 className={`text-5xl font-black tracking-tighter ${theme === 'light' ? 'text-zinc-900' : 'text-white'}`}>Bio.</h2>
            </div>
            <div className={`relative p-8 rounded-[2rem] border ${theme === 'light' ? 'bg-zinc-100 border-zinc-200' : 'bg-white/[0.03] border-white/10'}`}>
              <div className="absolute top-0 right-0 p-6 opacity-10">
                <span className={`text-8xl font-black italic select-none ${theme === 'light' ? 'text-zinc-400' : 'text-white'}`}>"</span>
              </div>
              <p className={`text-xl font-light leading-relaxed relative z-10 ${theme === 'light' ? 'text-zinc-700' : 'text-zinc-300'}`}>
                {NAV_BIO}
              </p>
            </div>
          </div>
        );
      case 'eco':
        return (
          <div className="space-y-10 animate-in fade-in slide-in-from-right-8 duration-500">
            <div className="space-y-2">
              <span className="text-indigo-500 font-black tracking-[0.4em] uppercase text-[10px]">Media Hub</span>
              <h2 className={`text-5xl font-black tracking-tighter ${theme === 'light' ? 'text-zinc-900' : 'text-white'}`}>Eco.</h2>
            </div>
            <div className="grid gap-4">
              {CHANNELS.map((ch, i) => (
                <a key={i} href={ch.url} target="_blank" className={`flex items-center gap-5 p-5 rounded-[2rem] border transition-all group overflow-hidden ${theme === 'light' ? 'bg-zinc-100 border-zinc-200 hover:bg-zinc-200' : 'bg-white/[0.03] border-white/5 hover:bg-white/[0.06]'}`}>
                  <div className={`p-4 rounded-2xl bg-gradient-to-br ${ch.accent} shadow-xl group-hover:scale-110 transition-transform duration-500 text-white`}>
                    {ICON_MAP[ch.icon]}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className={`font-black text-lg truncate ${theme === 'light' ? 'text-zinc-900' : 'text-white'}`}>{ch.title}</span>
                    <span className="text-[9px] text-zinc-500 uppercase tracking-[0.2em]">Official Media</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`${theme === 'light' ? 'bg-[#f8fafc] text-zinc-900' : 'bg-[#050505] text-white'} min-h-screen selection:bg-indigo-500 selection:text-white overflow-x-hidden font-sans antialiased transition-colors duration-500`}>
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <div className={`absolute top-0 left-0 w-full h-full ${theme === 'light' ? 'bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.08),transparent_70%)]' : 'bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.12),transparent_70%)]'}`} />
        <div className={`absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[150px] animate-pulse ${theme === 'light' ? 'bg-indigo-400/5' : 'bg-indigo-600/5'}`} />
      </div>

      <nav className={`fixed top-0 left-0 w-full z-[90] transition-all duration-700 ${scrolled ? (theme === 'light' ? 'bg-white/80 border-zinc-200 shadow-sm' : 'bg-zinc-950/80 border-white/5 shadow-2xl') + ' backdrop-blur-2xl py-4 border-b' : 'bg-transparent py-8 md:py-12'}`}>
        <div className="max-w-[1400px] mx-auto px-4 md:px-10 flex justify-between items-center">
          <div className="group flex items-center gap-3 md:gap-4 flex-shrink-0 cursor-default">
            <div className={`w-8 h-8 md:w-10 md:h-10 flex items-center justify-center font-black rounded-lg md:rounded-xl group-hover:rotate-6 transition-all duration-500 shadow-2xl ${theme === 'light' ? 'bg-zinc-900 text-white' : 'bg-white text-black'}`}>RS</div>
            <div className="flex flex-col">
              <span className={`text-lg md:text-2xl font-black tracking-tighter leading-none ${theme === 'light' ? 'text-zinc-900' : 'text-white'}`}>RAKSHIT.</span>
            </div>
          </div>
          
          <div className="flex items-center gap-1.5 md:gap-4">
            <button 
              onClick={toggleTheme}
              className={`p-2 md:p-2.5 rounded-lg md:rounded-xl border transition-all ${theme === 'light' ? 'bg-zinc-100 border-zinc-200 text-zinc-900 hover:bg-zinc-200' : 'bg-white/5 border-white/10 text-white hover:bg-white/10'}`}
              title="Toggle Theme"
            >
              {theme === 'light' ? <Moon className="w-3.5 h-3.5 md:w-4 md:h-4" /> : <Sun className="w-3.5 h-3.5 md:w-4 md:h-4" />}
            </button>
            <div className={`h-5 md:h-6 w-[1px] ${theme === 'light' ? 'bg-zinc-200' : 'bg-white/10'}`} />
            {(['connect', 'bio', 'eco'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-2.5 py-1.5 md:px-4 md:py-2.5 rounded-lg md:rounded-2xl font-black uppercase tracking-[0.1em] md:tracking-[0.2em] text-[9px] md:text-xs transition-all border ${activeTab === tab ? (theme === 'light' ? 'bg-zinc-900 text-white border-zinc-900' : 'bg-white text-black border-white') : (theme === 'light' ? 'text-zinc-500 border-transparent hover:text-zinc-900 hover:bg-zinc-200/50' : 'text-zinc-500 border-transparent hover:text-white hover:bg-white/10')}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <div className={`fixed inset-0 z-[100] transition-all duration-500 ${activeTab ? 'visible' : 'invisible'}`}>
        <div 
          className={`absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-500 ${activeTab ? 'opacity-100' : 'opacity-0'}`} 
          onClick={() => setActiveTab(null)}
        />
        
        <div className={`absolute top-0 right-0 h-full w-full md:w-[480px] lg:w-[550px] border-l shadow-[-50px_0_100px_rgba(0,0,0,0.5)] transition-transform duration-500 ease-out ${theme === 'light' ? 'bg-white border-zinc-200' : 'bg-zinc-950/95 border-white/10'} backdrop-blur-[80px] ${activeTab ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="h-full flex flex-col p-8 md:p-12 overflow-y-auto">
            <div className="flex justify-end mb-12">
              <button 
                onClick={() => setActiveTab(null)}
                className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all group ${theme === 'light' ? 'border-zinc-200 hover:bg-zinc-900 hover:text-white' : 'border-white/10 hover:bg-white hover:text-black'}`}
              >
                <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500" />
              </button>
            </div>

            <div className="flex-1">
              {renderPanelContent()}
            </div>

            <div className="mt-12 pt-8 border-t border-white/5 flex justify-between items-center opacity-40">
              <span className={`text-[10px] font-black tracking-[0.3em] uppercase ${theme === 'light' ? 'text-zinc-900' : 'text-white'}`}>Rakshit Sharma Studios</span>
              <div className={`flex gap-4 ${theme === 'light' ? 'text-zinc-900' : 'text-white'}`}>
                {SOCIALS.map((s, i) => (
                  <a key={i} href={s.url} target="_blank" className="hover:text-indigo-500 transition-colors">
                    {ICON_MAP[s.icon]}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="relative z-10 pt-28 md:pt-36 lg:pt-44">
        <Hero theme={theme} />
        <About theme={theme} />
        <Channels theme={theme} />
      </main>

      <Footer theme={theme} />
    </div>
  );
};

export default App;
