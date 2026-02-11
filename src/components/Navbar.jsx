import React from 'react';

const Navbar = ({ theme, onThemeToggle }) => {
  return (
    <header className="sticky top-0 z-[100] bg-white/10 backdrop-blur-2xl border-b border-white/20 shadow-2xl">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 via-pink-400 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg transform hover:rotate-12 transition-transform duration-300">
              <span className="text-2xl">📄</span>
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-white drop-shadow-lg">
                Cover<span className="text-yellow-300">Magic</span>
              </h1>
              <p className="text-xs text-white/70 font-medium hidden sm:block">Generate in 30 seconds ⚡</p>
            </div>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={onThemeToggle}
            className="group relative w-16 h-16 flex items-center justify-center"
            aria-label="Toggle theme"
          >
            {/* Outer glow ring */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-400 to-purple-500 opacity-50 blur-md group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Button surface */}
            <div className={`
              relative w-14 h-14 rounded-full flex items-center justify-center
              border-2 border-white/30 shadow-xl
              transition-all duration-500 transform group-hover:scale-110 group-active:scale-95
              ${theme === 'dark'
                ? 'bg-gradient-to-br from-indigo-900 to-purple-900'
                : 'bg-gradient-to-br from-yellow-300 to-orange-400'
              }
            `}>
              <span className="text-3xl transform group-hover:rotate-12 transition-transform duration-300">
                {theme === 'dark' ? '🌙' : '☀️'}
              </span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;