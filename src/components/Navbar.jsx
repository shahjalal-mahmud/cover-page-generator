import React from 'react';

const Navbar = ({ theme, onThemeToggle }) => {
  return (
    <header className="sticky top-0 z-[100] bg-base-100/70 backdrop-blur-lg shadow-lg border-b border-base-300/50">
      <div className="container mx-auto px-4 py-3 sm:py-4">
        <div className="flex justify-between items-center">
          {/* Title with Soft Gradient */}
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent transition-all duration-500 hover:from-secondary hover:to-primary">
              Generate Cover Pages
            </span>
            <span className="ml-2 text-3xl animate-bounce-slow">✨</span>
          </h1>

          {/* Pookie Theme Toggle - Fully Responsive */}
          <div className="tooltip tooltip-bottom" data-tip={theme === 'dark' ? 'Switch to Light Mode ☀️' : 'Switch to Dark Mode 🌙'}>
            <button
              onClick={onThemeToggle}
              className={`
                btn btn-circle btn-lg p-1 shadow-xl border-4
                ${theme === 'dark'
                  ? 'bg-neutral border-secondary/50 hover:bg-neutral-focus text-secondary'
                  : 'bg-yellow-100 border-primary/50 hover:bg-yellow-200 text-primary'
                }
                transition-all duration-500 transform hover:scale-110 active:scale-95
              `}
              aria-label="Toggle theme"
            >
              <span className="text-xl animate-spin-slow">
                {theme === 'dark' ? '🌙' : '☀️'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;