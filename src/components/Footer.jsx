import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-20 pt-10 border-t border-base-300/50">
      <div className="text-center">
        <p className="text-lg opacity-80 text-base-content mb-4">
          Made with <span className="text-red-500 animate-ping-slow">❤️</span> for Students Worldwide
        </p>

        {/* Prominent Company Card */}
        <a
          href="http://appriyo.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 backdrop-blur-sm rounded-2xl p-4 mb-4 border border-primary/20 max-w-md mx-auto">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">A</span>
              </div>
              <p className="text-base font-semibold text-base-content">
                Developed by{" "}

                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent hover:from-secondary hover:to-primary transition-all duration-300">
                  Appriyo
                </span>
              </p>
            </div>
            <p className="text-xs opacity-70 text-base-content/80">
              Innovative IT Solutions & Digital Transformation
            </p>
          </div>
        </a>
        <p className="text-sm opacity-60 text-base-content/80 mb-4">
          © {new Date().getFullYear()} Pookie Cover Pages • A Fun Academic Tool
        </p>
      </div>
    </footer>
  );
};

export default Footer;