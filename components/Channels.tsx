
import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import Section from './Section';
import { CHANNELS, ICON_MAP, PLAYLISTS, SOCIALS } from '../constants';
import { Gamepad2, PlayCircle, RefreshCcw, ArrowRight, Trophy } from 'lucide-react';

type Level = 'Easy' | 'Normal' | 'Hard';

const PIPE_WIDTH = 60; // Increased width for larger display
const BIRD_HITBOX_SIZE = 22; // Slightly larger hitbox for the bigger bird

const Game: React.FC<{ theme?: 'light' | 'dark' }> = ({ theme = 'dark' }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [birdPos, setBirdPos] = useState(200); // Start higher in taller screen
  const [pipes, setPipes] = useState<{ x: number; top: number; id: number }[]>([]);
  const [level, setLevel] = useState<Level>('Normal');
  const gameRef = useRef<HTMLDivElement>(null);
  const birdVelocity = useRef(0);
  
  // Game dimensions for the display
  const gameHeight = 500;
  const gameWidth = 600;

  const levelConfigs = useMemo(() => ({
    'Easy': { gravity: 0.25, jumpStrength: -5.8, pipeGap: 210, pipeSpeed: 2.2 },
    'Normal': { gravity: 0.35, jumpStrength: -6.8, pipeGap: 180, pipeSpeed: 3.5 },
    'Hard': { gravity: 0.45, jumpStrength: -7.5, pipeGap: 155, pipeSpeed: 5.2 }
  }), []);

  const { gravity, jumpStrength, pipeGap, pipeSpeed } = levelConfigs[level];

  const jump = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    
    if (!isPlaying) {
      setIsPlaying(true);
      setGameOver(false);
      setScore(0);
      setBirdPos(200);
      birdVelocity.current = jumpStrength;
      setPipes([]);
    } else if (!gameOver) {
      birdVelocity.current = jumpStrength;
    }
  }, [isPlaying, gameOver, jumpStrength]);

  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const gameLoop = setInterval(() => {
      setBirdPos((pos) => {
        birdVelocity.current += gravity;
        const newPos = pos + birdVelocity.current;
        // Check floor (height - birdSize) and ceiling
        if (newPos > gameHeight - 30 || newPos < 0) {
          setGameOver(true);
          setIsPlaying(false);
          return pos;
        }
        return newPos;
      });

      setPipes((prevPipes) => {
        const nextPipes = prevPipes
          .map((p) => ({ ...p, x: p.x - pipeSpeed }))
          .filter((p) => p.x > -PIPE_WIDTH);

        // Adjust spawn distance based on wider screen
        const spawnDistance = level === 'Hard' ? 240 : (level === 'Normal' ? 300 : 360);
        if (nextPipes.length === 0 || nextPipes[nextPipes.length - 1].x < spawnDistance) {
          nextPipes.push({
            x: gameWidth,
            top: Math.random() * (gameHeight - pipeGap - 100) + 50,
            id: Date.now(),
          });
        }

        return nextPipes;
      });
    }, 20);

    return () => clearInterval(gameLoop);
  }, [isPlaying, gameOver, gravity, pipeSpeed, pipeGap, level, gameHeight, gameWidth]);

  // Collision detection effect
  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const birdX = 80; // Pushed slightly further right for wider screen
    const birdSize = 32;
    const hitboxOffset = (birdSize - BIRD_HITBOX_SIZE) / 2;
    
    for (const p of pipes) {
      const birdLeft = birdX + hitboxOffset;
      const birdRight = birdX + birdSize - hitboxOffset;
      const birdTop = birdPos + hitboxOffset;
      const birdBottom = birdPos + birdSize - hitboxOffset;

      if (
        birdRight > p.x &&
        birdLeft < p.x + PIPE_WIDTH &&
        (birdTop < p.top || birdBottom > p.top + pipeGap)
      ) {
        setGameOver(true);
        setIsPlaying(false);
      } else if (p.x + pipeSpeed >= birdX && p.x < birdX) {
        setScore((s) => s + 1);
      }
    }
  }, [birdPos, pipes, isPlaying, gameOver, pipeGap, pipeSpeed]);

  return (
    <div 
      className={`relative w-full max-w-[600px] h-[500px] border rounded-[2.5rem] overflow-hidden cursor-pointer shadow-2xl mx-auto group transition-all duration-500 ${theme === 'light' ? 'bg-zinc-100 border-zinc-200 shadow-zinc-200' : 'bg-zinc-950 border-white/10 shadow-black'}`}
      onClick={() => jump()}
      ref={gameRef}
    >
      <div className={`absolute inset-0 bg-gradient-to-b from-indigo-500/10 to-transparent pointer-events-none`} />
      
      {/* Bird */}
      <div 
        className={`absolute w-[32px] h-[32px] rounded-xl transition-transform flex items-center justify-center border shadow-xl ${theme === 'light' ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-white border-white/20 text-black'}`}
        style={{ top: birdPos, left: 80, transform: `rotate(${Math.min(Math.max(birdVelocity.current * 3, -30), 40)}deg)` }}
      >
        <div className="w-full h-full relative">
          <div className={`absolute top-1 right-1 w-2.5 h-2.5 rounded-full ${theme === 'light' ? 'bg-white' : 'bg-black'}`} />
          <div className="absolute bottom-1 right-1 w-3 h-1.5 bg-orange-500 rounded-sm" />
        </div>
      </div>

      {/* Pipes */}
      {pipes.map((p) => (
        <React.Fragment key={p.id}>
          <div className={`absolute border-x border-b rounded-b-2xl shadow-lg transition-colors ${theme === 'light' ? 'bg-zinc-200 border-zinc-300' : 'bg-zinc-800 border-white/10'}`} style={{ left: p.x, top: 0, width: PIPE_WIDTH, height: p.top }}>
            <div className={`absolute bottom-0 left-0 w-full h-6 rounded-b-2xl opacity-30 ${theme === 'light' ? 'bg-zinc-400' : 'bg-zinc-700'}`} />
          </div>
          <div className={`absolute border-x border-t rounded-t-2xl shadow-lg transition-colors ${theme === 'light' ? 'bg-zinc-200 border-zinc-300' : 'bg-zinc-800 border-white/10'}`} style={{ left: p.x, top: p.top + pipeGap, width: PIPE_WIDTH, height: gameHeight - (p.top + pipeGap) }}>
            <div className={`absolute top-0 left-0 w-full h-6 rounded-t-2xl opacity-30 ${theme === 'light' ? 'bg-zinc-400' : 'bg-zinc-700'}`} />
          </div>
        </React.Fragment>
      ))}

      {/* Score Display */}
      <div className={`absolute top-10 left-1/2 -translate-x-1/2 text-7xl font-black select-none opacity-20 pointer-events-none ${theme === 'light' ? 'text-zinc-900' : 'text-white'}`}>
        {score}
      </div>

      {/* Overlay UI */}
      {!isPlaying && (
        <div 
          className={`absolute inset-0 backdrop-blur-md flex flex-col items-center justify-center text-center p-8 z-20 ${theme === 'light' ? 'bg-white/80' : 'bg-zinc-950/80'}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={`mb-6 p-6 rounded-3xl ${theme === 'light' ? 'bg-indigo-50 shadow-inner' : 'bg-indigo-500/10 shadow-indigo-500/5'}`}>
            <Gamepad2 className="w-14 h-14 text-indigo-500" />
          </div>
          <h4 className={`text-3xl font-black mb-3 tracking-tight ${theme === 'light' ? 'text-zinc-900' : 'text-white'}`}>{gameOver ? 'Game Over!' : 'Rakshit Bird'}</h4>
          
          <div className="flex gap-3 mb-8">
            {(['Easy', 'Normal', 'Hard'] as Level[]).map((lvl) => (
              <button 
                key={lvl}
                onClick={(e) => { e.stopPropagation(); setLevel(lvl); }}
                className={`px-5 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-widest border transition-all duration-300 ${level === lvl ? 'bg-indigo-500 text-white border-indigo-500 shadow-xl shadow-indigo-500/30 scale-105' : (theme === 'light' ? 'bg-zinc-100 border-zinc-200 text-zinc-600 hover:bg-zinc-200' : 'bg-white/5 border-white/10 text-zinc-400 hover:bg-white/10')}`}
              >
                {lvl}
              </button>
            ))}
          </div>

          <p className="text-xs text-zinc-500 mb-8 uppercase tracking-widest font-black opacity-80">
            {gameOver ? `Final Score: ${score}` : 'Tap or space to start your flight'}
          </p>
          <button 
            onClick={() => jump()}
            className={`px-12 py-5 font-black uppercase tracking-widest text-sm rounded-3xl flex items-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-2xl ${theme === 'light' ? 'bg-zinc-900 text-white' : 'bg-white text-black'}`}
          >
            {gameOver ? <RefreshCcw className="w-5 h-5" /> : <PlayCircle className="w-5 h-5" />}
            {gameOver ? 'Try Again' : 'Start Playing'}
          </button>
        </div>
      )}
    </div>
  );
};

const Channels: React.FC<{ theme?: 'light' | 'dark' }> = ({ theme = 'dark' }) => {
  return (
    <>
      <Section id="work" className={`border-t transition-colors duration-500 ${theme === 'light' ? 'border-zinc-200 bg-zinc-50' : 'border-white/5 bg-zinc-950/30'}`}>
        <div className="mb-20 text-center space-y-4">
           <span className="text-indigo-500 font-black tracking-[0.4em] uppercase text-[10px] block opacity-80">Curated Work</span>
           <h2 className={`text-5xl md:text-7xl font-black uppercase tracking-tighter ${theme === 'light' ? 'text-zinc-900' : 'text-white'}`}>Featured Playlists</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-32">
           {PLAYLISTS.map((playlist, i) => (
             <a 
              key={i} 
              href={playlist.url} 
              target="_blank" 
              className={`group relative p-8 backdrop-blur-2xl border rounded-[2rem] transition-all duration-500 flex flex-col gap-6 hover:-translate-y-2 shadow-2xl ${theme === 'light' ? 'bg-white border-zinc-200 hover:bg-zinc-100 shadow-zinc-200' : 'bg-zinc-900/40 border-white/5 hover:bg-zinc-900/60'}`}
             >
               <div className="flex items-center justify-between">
                 <div className="p-4 bg-indigo-500/10 text-indigo-500 rounded-2xl group-hover:bg-indigo-500 group-hover:text-white transition-all duration-500 shadow-inner">
                   {ICON_MAP[playlist.icon]}
                 </div>
                 <div className={`w-8 h-8 rounded-full border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0 duration-500 ${theme === 'light' ? 'border-zinc-300' : 'border-white/10'}`}>
                    <span className="text-xs">↗</span>
                 </div>
               </div>
               <div className="flex flex-col gap-1">
                 <span className={`font-black text-xl tracking-tight transition-colors ${theme === 'light' ? 'text-zinc-900 group-hover:text-indigo-600' : 'text-white group-hover:text-indigo-400'}`}>{playlist.title}</span>
                 <span className="text-[10px] text-zinc-500 uppercase font-black tracking-[0.2em]">Explore on YouTube</span>
               </div>
             </a>
           ))}
        </div>

        <div className="mb-20 flex flex-col items-center text-center space-y-6">
          <span className="text-indigo-500 font-black tracking-[0.4em] uppercase text-[10px]">The Ecosystem</span>
          <h2 className={`text-6xl md:text-9xl font-black tracking-tighter mb-4 leading-none ${theme === 'light' ? 'text-zinc-900' : 'text-white'}`}>What I Create.</h2>
          <p className={`text-lg md:text-xl max-w-2xl font-light ${theme === 'light' ? 'text-zinc-500' : 'text-zinc-400'}`}>Entertainment, high-fidelity tech analysis, and cinematic storytelling across my entire digital reach.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-32 px-2">
          {CHANNELS.map((channel, index) => (
            <a
              key={index}
              href={channel.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative overflow-hidden p-10 md:p-16 backdrop-blur-3xl rounded-[3rem] border transition-all duration-700 flex flex-col justify-between min-h-[350px] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.6)] ${theme === 'light' ? 'bg-white border-zinc-200 shadow-zinc-200/50 hover:border-indigo-200' : 'bg-zinc-900/50 border-white/5 hover:border-white/20'}`}
            >
              <div className={`absolute -top-20 -right-20 w-80 h-80 bg-gradient-to-br ${channel.accent} opacity-5 blur-[120px] group-hover:opacity-20 transition-opacity duration-1000`} />
              <div className="relative z-10">
                <div className={`inline-flex p-5 rounded-[1.5rem] bg-gradient-to-br ${channel.accent} text-white mb-10 shadow-2xl opacity-90 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                  {ICON_MAP[channel.icon]}
                </div>
                <h3 className={`text-4xl font-black mb-4 tracking-tighter ${theme === 'light' ? 'text-zinc-900' : 'text-white'}`}>{channel.title}</h3>
                <p className={`font-light leading-relaxed text-lg md:text-xl max-w-sm ${theme === 'light' ? 'text-zinc-600' : 'text-zinc-400'}`}>{channel.description}</p>
              </div>
              <div className="relative z-10 mt-16 flex items-center text-xs font-black tracking-[0.3em] uppercase text-indigo-500 group-hover:translate-x-3 transition-all duration-500">
                Explore The Channel <ArrowRight className="ml-4 w-4 h-4" />
              </div>
            </a>
          ))}
        </div>

        <div className={`py-32 px-6 border-t relative overflow-hidden ${theme === 'light' ? 'border-zinc-200' : 'border-white/5'}`}>
          <div className="max-w-4xl mx-auto space-y-16">
            <div className="space-y-8 relative z-10">
              <p className={`text-2xl md:text-4xl font-light leading-[1.6] text-center italic tracking-tight ${theme === 'light' ? 'text-zinc-600' : 'text-zinc-300'}`}>
                I don’t create just to participate in the noise or keep up with the pace of the internet; I create to bring intention into a space that often forgets to pause. Every piece of work I put out is shaped by care, clarity, and respect for the people on the other side of the screen, because attention is not something to steal, but something to earn. I’m drawn to collaborations where ideas are valued, the process is trusted, and the goal is not a moment of relevance but something that can quietly grow, resonate, and last. If you believe that good work takes time, that consistency is a form of integrity, and that meaning matters more than momentum, then there’s a strong chance we’re already aligned—and if that alignment feels familiar, it might be worth turning this shared understanding into something real.
              </p>
              <div className="pt-10 flex flex-col items-center gap-6">
                <div className="h-20 w-[1px] bg-gradient-to-b from-indigo-500 to-transparent" />
                <h4 className={`text-xl md:text-3xl font-black text-center bg-clip-text text-transparent max-w-2xl tracking-tighter ${theme === 'light' ? 'bg-gradient-to-r from-zinc-900 via-indigo-950 to-indigo-700' : 'bg-gradient-to-r from-white via-indigo-200 to-indigo-500'}`}>
                  Creativity isn't just content, it's the art of the process of content creation through shooting, editing and making your thoughts visible.
                </h4>
              </div>
            </div>
          </div>
        </div>

        <div id="chill-zone" className={`py-24 border-y relative overflow-hidden group transition-colors duration-500 ${theme === 'light' ? 'border-zinc-200 bg-zinc-100/50' : 'border-white/5 bg-white/[0.01]'}`}>
          <div className={`absolute inset-0 ${theme === 'light' ? 'bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.03),transparent_70%)]' : 'bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.05),transparent_70%)]'}`} />
          <div className="max-w-7xl mx-auto px-6 text-center space-y-12">
            <div className="space-y-4">
              <span className="text-indigo-500 font-black tracking-[0.4em] uppercase text-[10px]">Take a Break</span>
              <h2 className={`text-5xl md:text-7xl font-black tracking-tighter ${theme === 'light' ? 'text-zinc-900' : 'text-white'}`}>Chill Section.</h2>
              <p className="text-zinc-500 font-light text-lg">Sometimes the best ideas come when you stop thinking. Play a quick game.</p>
            </div>
            <div className="relative z-10 px-2">
              <Game theme={theme} />
            </div>
          </div>
        </div>

        <div id="much-more" className="relative mt-32 px-4 md:px-0">
          <div className="mb-20 text-center space-y-4">
            <span className="text-indigo-500 font-black tracking-[0.4em] uppercase text-[10px] block opacity-80">Final Destination</span>
            <h2 className={`text-6xl md:text-9xl font-black tracking-tighter leading-none mb-8 ${theme === 'light' ? 'text-zinc-900' : 'text-white'}`}>Connect Hub.</h2>
            <p className={`text-lg md:text-xl max-w-xl mx-auto font-light leading-relaxed ${theme === 'light' ? 'text-zinc-500' : 'text-zinc-400'}`}>
              Skip the noise. Head straight to the sources where the narrative continues.
            </p>
          </div>

          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[...CHANNELS, ...SOCIALS]
              .filter(item => {
                if ('title' in item) return item.title !== "Content Partner";
                return true;
              })
              .map((item, i) => (
                <a 
                  key={i} 
                  href={item.url} 
                  target="_blank" 
                  className={`group relative flex flex-col justify-between p-10 rounded-[2.5rem] border backdrop-blur-2xl transition-all duration-700 min-h-[220px] overflow-hidden shadow-2xl ${theme === 'light' ? 'bg-white border-zinc-200 hover:border-indigo-300 hover:shadow-indigo-500/10' : 'bg-zinc-900/30 border-white/5 hover:border-indigo-500/30 hover:bg-zinc-900/60'}`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                  
                  <div className="relative z-10 flex justify-between items-start">
                    <div className={`p-4 rounded-2xl transition-all duration-500 ${theme === 'light' ? 'bg-zinc-100 text-zinc-900 group-hover:bg-indigo-500 group-hover:text-white' : 'bg-white/5 group-hover:bg-indigo-500/10 group-hover:text-indigo-400'}`}>
                      {ICON_MAP['platform' in item ? item.icon : item.icon]}
                    </div>
                    <div className="text-[9px] font-black uppercase tracking-widest text-zinc-500 group-hover:text-indigo-500 transition-colors">
                      {'title' in item ? 'Official Media' : 'Social Core'}
                    </div>
                  </div>

                  <div className="relative z-10">
                    <h3 className={`text-2xl font-black tracking-tight mb-2 transition-colors ${theme === 'light' ? 'text-zinc-900 group-hover:text-indigo-600' : 'text-white group-hover:text-indigo-400'}`}>
                      {'title' in item ? item.title : item.platform}
                    </h3>
                    <div className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all ${theme === 'light' ? 'text-zinc-400 group-hover:text-zinc-900' : 'text-zinc-500 group-hover:text-white'}`}>
                      Visit Platform <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </a>
            ))}
          </div>

          <div className={`absolute -top-32 left-1/2 -translate-x-1/2 w-full h-[500px] blur-[120px] rounded-full pointer-events-none -z-10 ${theme === 'light' ? 'bg-indigo-300/10' : 'bg-indigo-500/5'}`} />
        </div>
      </Section>
    </>
  );
};

export default Channels;
