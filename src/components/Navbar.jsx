import React from "react";

const Navbar = ({ theme, onThemeToggle }) => {
  const isDark = theme === "dark";

  return (
    <header
      className="
        sticky top-0 z-[100]
        backdrop-blur-xl
        border-b
        transition-all duration-300
        bg-white/60 dark:bg-black/40
        border-black/10 dark:border-white/10
      "
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">

          {/* Logo Section */}
          <div className="flex items-center gap-3 group cursor-pointer">
            <div
              className="
                w-10 h-10 sm:w-12 sm:h-12
                rounded-2xl
                bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600
                flex items-center justify-center
                shadow-lg
                transition-all duration-500
                group-hover:rotate-6 group-hover:scale-110
              "
            >
              <span className="text-xl sm:text-2xl">📄</span>
            </div>

            <div className="leading-tight">
              <h1 className="text-lg sm:text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                Cover<span className="text-yellow-500">Magic</span>
              </h1>
              <p className="hidden sm:block text-xs text-gray-500 dark:text-gray-400">
                Generate in 30 seconds ⚡
              </p>
            </div>
          </div>

          {/* Theme Toggle - Modern Slider */}
          <button
            onClick={onThemeToggle}
            aria-label="Toggle theme"
            className="relative group"
          >
            <div
              className={`
                relative w-16 sm:w-20 h-9 sm:h-10
                rounded-full
                flex items-center
                px-1
                transition-all duration-500
                shadow-inner
                ${
                  isDark
                    ? "bg-gradient-to-r from-indigo-700 to-purple-700"
                    : "bg-gradient-to-r from-yellow-400 to-orange-400"
                }
              `}
            >
              {/* Glow */}
              <div className="absolute inset-0 rounded-full blur-md opacity-40 group-hover:opacity-70 transition duration-500 bg-white/30" />

              {/* Sliding Knob */}
              <div
                className={`
                  relative z-10
                  w-7 h-7 sm:w-8 sm:h-8
                  rounded-full
                  bg-white
                  shadow-xl
                  flex items-center justify-center
                  text-lg
                  transition-all duration-500
                  transform
                  ${isDark ? "translate-x-7 sm:translate-x-10" : "translate-x-0"}
                `}
              >
                <span className="transition-transform duration-500">
                  {isDark ? "🌙" : "☀️"}
                </span>
              </div>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
