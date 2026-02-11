import React from "react";

const Footer = () => {
  return (
    <footer className="mt-24 relative">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
      
      <div className="bg-white/5 backdrop-blur-xl border-t border-white/10">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center space-y-8">
            {/* Brand Section */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 via-pink-400 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-2xl">📄</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white">
                  Cover<span className="text-yellow-300">Magic</span>
                </h2>
              </div>
              <p className="text-white/70 max-w-md mx-auto text-sm sm:text-base">
                The smartest way to create academic cover pages. Built by students, for students. 🎓
              </p>
            </div>

            {/* Developer Credit */}
            <div className="pt-6 border-t border-white/10">
              <a
                href="https://appriyo.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block group"
              >
                <div className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                  {/* Logo */}
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                    <span className="text-white font-black text-lg">A</span>
                  </div>

                  {/* Text */}
                  <div className="text-left">
                    <p className="text-xs text-white/50 font-semibold uppercase tracking-wider mb-0.5">
                      Crafted with ❤️ by
                    </p>
                    <p className="text-lg font-black text-white">
                      Appriyo
                    </p>
                    <p className="text-xs text-white/60">
                      IT Solutions & Digital Innovation
                    </p>
                  </div>
                </div>
              </a>
            </div>

            {/* Copyright */}
            <div className="text-white/50 text-xs sm:text-sm space-y-1">
              <p className="font-semibold">
                © {new Date().getFullYear()} CoverMagic • All rights reserved
              </p>
              <p className="text-white/30 uppercase tracking-widest text-[10px]">
                Free Academic Tool • Version 2.0
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;