import React from "react";

const Navbar = () => {
  return (
    <header
      className="
        sticky top-0 z-[100]
        bg-black/60
        backdrop-blur-xl
        border-b border-white/10
        transition-all duration-300
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
                shadow-lg shadow-purple-500/30
                transition-all duration-500
                group-hover:rotate-6 group-hover:scale-110
              "
            >
              <span className="text-xl sm:text-2xl">📄</span>
            </div>

            <div className="leading-tight">
              <h1 className="text-lg sm:text-2xl font-extrabold tracking-tight text-white">
                Cover<span className="text-yellow-400">Magic</span>
              </h1>
              <p className="hidden sm:block text-xs text-gray-400">
                Generate in 30 seconds ⚡
              </p>
            </div>
          </div>

          {/* Optional Right Side (Future Buttons / Links) */}
          <div className="flex items-center gap-4">
            <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 backdrop-blur-md">
              Dark Mode
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Navbar;
