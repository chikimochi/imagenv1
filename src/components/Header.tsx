import React from 'react';
import { Sparkles } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="w-full py-6 px-4 border-b border-dark-700 bg-dark-800/50 backdrop-blur-md sticky top-0 z-10">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-brand-500 to-blue-600 rounded-lg shadow-lg shadow-brand-500/20">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">Gemini<span className="text-brand-500">Gen</span></h1>
            <p className="text-xs text-slate-400 font-medium">Powered by gemini-2.5-flash-image</p>
          </div>
        </div>
        
        <a 
          href="https://github.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hidden sm:block text-sm text-slate-400 hover:text-brand-400 transition-colors"
        >
          View Source
        </a>
      </div>
    </header>
  );
};

export default Header;