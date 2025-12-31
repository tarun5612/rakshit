
import React from 'react';
import { SOCIALS, ICON_MAP } from '../constants';

interface FooterProps {
  theme?: 'light' | 'dark';
}

const Footer: React.FC<FooterProps> = ({ theme = 'dark' }) => {
  return (
    <footer className={`py-20 border-t transition-colors duration-500 ${theme === 'light' ? 'bg-zinc-50 border-zinc-200' : 'border-zinc-900/50 bg-black/20'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="text-center md:text-left">
          <h3 className="text-3xl font-black tracking-tighter mb-4 bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
            RS STUDIOS.
          </h3>
          <p className={`text-sm font-medium tracking-wide ${theme === 'light' ? 'text-zinc-500' : 'text-zinc-600'}`}>
            © {new Date().getFullYear()} Rakshit Sharma. <br className="md:hidden" />
            Designed for impact.
          </p>
        </div>
        
        <div className="flex space-x-4">
          {SOCIALS.map((social, index) => (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-4 rounded-full border transition-all duration-500 active:scale-90 ${theme === 'light' ? 'bg-white border-zinc-200 text-zinc-500 hover:bg-zinc-900 hover:text-white' : 'bg-zinc-900 border-white/5 text-zinc-400 hover:bg-white hover:text-black'}`}
              aria-label={social.platform}
            >
              {ICON_MAP[social.icon]}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
